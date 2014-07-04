-- This script prepares the data for searching for names in the ESDION client
-- NOTE: the process is not optimal because it is more a record of what was done than an optimized process.
-- 
-- Author: Frans Knibbe, Geodan (frans.knibbe@geodan.com)

/*
--------------------------------------------------------------------------------------------------
EuroGeoNames
--------------------------------------------------------------------------------------------------
*/

/*
The starting point is a dump from the EGN index database, containing the following columns 
from the table location_instance:
  geographic_identifier
  spatial_object_uid
  position

The dump file is imported in the public schema:
psql -d esdin -f egnnames.sql -U postgres -p 5433
*/

-- add ids for names to egnnames;
drop sequence egnnames_nameid_seq;
create sequence egnnames_nameid_seq;
alter table egnnames add column name_id bigint;
update egnnames set name_id = nextval('egnnames_nameid_seq');

-- create indexes:
create index egnname_nameid_idx on egnnames(name_id);
create index egnnames_souid_idx on egnnames(spatial_object_uid);

-- derive names from geographic_identifier:
alter table egnnames add column name text;
update egnnames set name = substring(geographic_identifier from 0 for (position(';' in geographic_identifier)));

-- derive country codes from geographic_identifier:
alter table egnnames add column country char(2);
update egnnames set country = substring(geographic_identifier from (position(';' in geographic_identifier) + 1) for 2);
create index egnnames_country_idx on egnnames(country);

-- now manually fix some problems (caused by names with ; characters)...
-- investigate invalid country codes, for instance start with:
-- select distinct country from egnnames
-- Note: XX is not an ivalid country code, it is used for exonyms.

create table geocoder.country (
	name text not null
	,alternate_names text
	,iso3166_1_2 char(2) primary key
  ,iso3166_1_3 char(3) not null
	,un_region text
);

-- import country data from csv
copy geocoder.country from 'D:/data/esdin/iso-3166.csv' delimiter ';' csv header
create index country_iso3166_1_2_idx on geocoder.country(iso3166_1_2);

create sequence geocoder.location_id;
create table geocoder.location (
  id bigint primary key default nextval('geocoder.location_id')
	,egn_spatial_object_uid text
);

insert into geocoder.location (
	egn_spatial_object_uid
)
select distinct
  spatial_object_uid
from egnnames;

create index location_suid_idx on geocoder.location(egn_spatial_object_uid);

alter table geocoder.location add column position geometry;
update geocoder.location 
	set position = 
	(
	select 
		position
	from
		egnnames
	where 
		egnnames.spatial_object_uid = geocoder.location.egn_spatial_object_uid
	limit 1
	);
alter table geocoder.location add constraint enforce_dims_geometry check (ndims(position) = 2);
alter table geocoder.location  add constraint enforce_srid_geometry check (srid(position) = 4258);
--create index location_position_sidx on geocoder.location using gist (position);

-- add ids for locations to egnnames;
alter table egnnames add column location_id bigint;
update egnnames set location_id = (select id from geocoder.location loc 
	where loc.egn_spatial_object_uid = egnnames.spatial_object_uid);
create index egnnames_location_id_idx on egnnames(location_id);

create sequence geocoder.geoname_id;
create table geocoder.geoname (
   id bigint primary key default nextval('geocoder.geoname_id')
	 ,name text not null
	 ,location bigint references geocoder.location (id)
	 ,country char(2) references geocoder.country (iso3166_1_2)
);

-- resolve XX names (exonyms) to country codes.
alter table geocoder.location add column country char(2);
update geocoder.location set country = (
 select distinct country from egnnames
 where geocoder.location.id = egnnames.location_id
 and country <> 'XX');

insert into geocoder.geoname (
	id
	,name
	,location
	,country
)
select 
	name_id
	,name
	,location_id
	,(select country from geocoder.location where geocoder.location.id = egnnames.location_id)
from egnnames;

create index geoname_location_idx on geocoder.geoname(location);


-- switch coordinates from lon.lat to lat,lon:
update geocoder.location set position = st_setsrid(st_point(st_y(position),st_x(position)),4258);

-- add latitude and longitude columsn to the names table
alter table geocoder.geoname add column latitude double precision;
alter table geocoder.geoname add column longitude double precision;

update geocoder.geoname gn set latitude = st_x(position) from geocoder.location lo
	where gn.location = lo.id;
update geocoder.geoname gn set longitude = st_y(position) from geocoder.location lo
	where gn.location = lo.id;

	
/*
--------------------------------------------------------------------------------------------------
geonames.org
--------------------------------------------------------------------------------------------------
*/
--Data are imported from the full CSV dump

drop table geonamesorg;
create table geonamesorg (
	 geonameid       int,
	 name            text,
	 asciiname       text,
	 alternatenames  text,
	 latitude        float,
	 longitude       float,
	 fclass  char(1),
	 fcode   varchar(10),
	 country varchar(2),
	 cc2 varchar(60),
	 admin1  varchar(20),
	 admin2  varchar(80),
	 admin3  varchar(20),
	 admin4  varchar(20),
	 population      bigint,
	 elevation       int,
	 gtopo30         int,
	 timezone varchar(40),
	 moddate         date
);

set CLIENT_ENCODING to 'utf8';
copy geonamesorg (geonameid,name,asciiname,alternatenames,latitude,longitude,fclass,fcode,country,cc2,admin1,admin2,admin3,admin4,population,elevation,gtopo30,timezone,moddate) from 'D:/data/esdin/allCountries.txt' null as '';

create index geonamesorg_country_idx on geonamesorg (country);

create table geonamesorg_names(
		name text
		,latitude double precision
		,longitude double precision
		,country char(2)
);

insert into geonamesorg_names (
	name
	,latitude
	,longitude
	,country
)
select 
	name
	,latitude
	,longitude
	,country
 from geonamesorg
 where country in (
  select distinct iso3166_1_2 from geocoder.country where un_region = 'Europe'
 );
 
/*
alter table geonamesorg_names add column position geometry;
update geonamesorg_names set position = st_setsrid(st_point(latitude,longitude),4258);
*/

/*
--------------------------------------------------------------------------------------------------
Merging EuroGeoNames and geonames.org data
--------------------------------------------------------------------------------------------------
*/

-- add names from geonames.org to names from EGN:
select setval ('geocoder.geoname_id', (select max(id) from geocoder.geoname) )
insert into geocoder.geoname (
	name
	,country
	,latitude
	,longitude
)
select 
	name
	,country
	,latitude
	,longitude
from geonamesorg_names;

/*
 Query optimalization 
*/

-- copy country names to names table
alter table geocoder.geoname add column country_name text;
update geocoder.geoname gn set country_name = 
(select name from geocoder.country c where c.iso3166_1_2 = gn.country);

-- copy spatial_object_uid to names table
alter table geocoder.geoname add column egn_spatial_object_uid text;
update geocoder.geoname gn set egn_spatial_object_uid = (
	select egn_spatial_object_uid from geocoder.location lo where lo.id = gn.location);
	
alter table geocoder.geoname add column name_lowercase text;
update geocoder.geoname set name_lowercase = lower(name);
create index geoname_name_lowercase_idx on geocoder.geoname(name_lowercase); 
create index geoname_name_lowercase_alt_idx on geocoder.geoname(name_lowercase varchar_pattern_ops); --Very important! (when locale <> C?).
vacuum full geocoder.geoname;

/*
example geocoder queries
*/

-- This takes too long,probably because of lower():
select name, country_name, latitude, longitude, egn_spatial_object_uid from geocoder.geoname where name_lowercase like lower('Amst%'); 

-- This is much faster (use a PHP/javscript/whatever function to convert to lower case.
select name, country_name, latitude, longitude, egn_spatial_object_uid from geocoder.geoname where name_lowercase like 'berli%';
select name, country_name, latitude, longitude, egn_spatial_object_uid from geocoder.geoname where name_lowercase like 'mnt%';
select name, country_name, latitude, longitude, egn_spatial_object_uid from geocoder.geoname where name_lowercase like 'ευ%';