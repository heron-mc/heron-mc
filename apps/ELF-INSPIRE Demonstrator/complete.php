<?php
/**
* Simple script to quickly return a list of names which start with a given string
*/
$link = pg_connect('host=localhost dbname=esdin user=postgres password=postgres') or die('Could not connect: ' . pg_last_error());
pg_query($link, "SET NAMES utf8;");
$str = mb_convert_case( $_GET['query'], MB_CASE_LOWER, "UTF-8"); 
$sql = "SELECT name, id, country_name, egn_spatial_object_uid, latitude, longitude FROM geocoder.geoname WHERE name_lowercase LIKE '" . $str. "%' order by name;";
$result = pg_query($sql) or die('Query failed: ' . pg_last_error());
header("Content-Type: application/json; charset=utf-8");
echo $_GET['callback'] . "(";
echo "{ data:[";
while ($data = pg_fetch_array($result, null, PGSQL_ASSOC)) {
if ($data['egn_spatial_object_uid']){
echo "{ 'id': '" . $data['id'] . "', 'name': '" . addslashes($data['name']) . ", " .  $data['country_name'] . " (EuroGeoNames)', 'esdinid': '" . $data['egn_spatial_object_uid']. "','latitude': '" . $data['latitude'] . "','longitude': '" . $data['longitude'] . "'},";
}
else {
echo "{ 'id': '" . $data['id'] . "', 'name': '" . addslashes($data['name']) . ", " .  $data['country_name'] . " (geonames.org)','latitude': '" . $data['latitude'] . "','longitude': '" . $data['longitude'] . "'},";
}
}
echo "{}]})";
pg_free_result($result);
pg_close($link);
?>