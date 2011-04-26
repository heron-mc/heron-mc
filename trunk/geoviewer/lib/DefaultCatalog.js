/*
 * Copyright (C) 2010  Het Kadaster
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/*
About Catalog.js: The purpose of this file is to configure basic values
that are used throughout the web client.

Items configured in this file are:
+ Map properties like extent and projection.
+ URLs of data sources.
+ Map layers.
+ Text strings for communication with the user, in multiple languages.

For specific purposes (example applications), other items can be configured
too, using the GeoViewer.Catalog namespace.
*/

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
var size = new OpenLayers.Size(12, 15);
var calculateOffset = function(size) {
	return new OpenLayers.Pixel(-(size.w / 2), -size.h);
};
var icon = new OpenLayers.Icon("/media/logo_kadasterK_klein.GIF", size, null, calculateOffset);

Ext.BLANK_IMAGE_URL = 'http://kademo.nl/lib/ext/3.1.0/resources/images/default/s.gif';

Ext.namespace("GeoViewer.Map");
GeoViewer.Map.options = {
	PROJECTION: 'EPSG:28992',
	UNITS: 'm',
	RESOLUTIONS: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	MAX_EXTENT: new OpenLayers.Bounds(-65200.96, 242799.04, 375200.96, 683200.96),
	TILE_ORIGIN: new OpenLayers.LonLat(-65200.96, 242799.04),
	CENTER: new OpenLayers.LonLat(155000, 463000),
	XY_PRECISION: 3,
	ZOOM: 2,
	MAX_EXTENT_KLIC1: new OpenLayers.Bounds(253865, 574237, 253960, 574727)
};


Ext.namespace("GeoViewer.Catalog");
GeoViewer.Catalog.urls = {
	ALTERRA_WMS : 'http://www.geodata.alterra.nl/topoxplorer/TopoXplorerServlet?',
	GS2_WMS :  'http://gis.kademo.nl/gs2/wms?',
	GWC_WMS :  'http://gis.kademo.nl/gwc/service/wms?',
	KNMI_WMS_RADAR :  'http://geoservices.knmi.nl/cgi-bin/RADNL_OPER_R___25PCPRR_L3.cgi?',
	TILECACHE :  'http://gis.kademo.nl/cgi-bin/tilecache.cgi?',
	TILECACHE_KLIC1 :  'http://kom.kademo.nl/tms/10G058512_1/index.cgi/'
};

GeoViewer.Catalog.layers = {
	/*
	 * ==================================
	 *            BaseLayers
	 * ==================================
	 */


	/*
	 * Basemap openStreetMap TileCache+Mapnik
	 */
	osm: new OpenLayers.Layer.WMS(
		"OpenStreetMap",
		GeoViewer.Catalog.urls.TILECACHE,
		{layers: "osm", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
		{singleTile: false, isBaseLayer: true,  visibility: false,  attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>"}
	),

	/*
	 * Combinatie top250/50/25
	 */
	topraster: new OpenLayers.Layer.WMS(
		"TopRaster",
		GeoViewer.Catalog.urls.GWC_WMS,
		{layers: "top_raster", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
		{singleTile: false, isBaseLayer: true,   visibility: false, noLegend: true}
	),

	top10nlgeodan: new OpenLayers.Layer.WMS(
		"Top10NL (Geodan)",
		GeoViewer.Catalog.urls.GWC_WMS,
		{layers: "top10_geodan", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
		{singleTile: false,  isBaseLayer: true, visibility: false, noLegend: true}
	),

	luchtfotonlr: new OpenLayers.Layer.WMS(
		"Luchtfoto (NLR)",
		GeoViewer.Catalog.urls.GWC_WMS,
		{layers: "luchtfoto_nlr", format: "image/jpeg", transparent: false, bgcolor: "0x99b3cc"},
		{singleTile: false,  isBaseLayer: true, visibility: false, noLegend: true}
	),

	blanco: new OpenLayers.Layer.Image(
		"Blanco",
		Ext.BLANK_IMAGE_URL,
		GeoViewer.Map.options.MAX_EXTENT,
		new OpenLayers.Size(10, 10),
		{resolutions: GeoViewer.Map.options.RESOLUTIONS, isBaseLayer: true, visibility: false, displayInLayerSwitcher: true}
	),


	/*
	 * KLIC overlays
	 */
	klic1_gbkn: new OpenLayers.Layer.TMS(
		"KLIC1-GBKN",
		GeoViewer.Catalog.urls.TILECACHE_KLIC1,
		{layername: "GBKN", type: "png", maxResolution: 0.420, isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false}
	),

	klic1_liggingen: new OpenLayers.Layer.TMS(
		"KLIC1-LiggingsInfo",
		GeoViewer.Catalog.urls.TILECACHE_KLIC1,
		{layername: "LiggingsInfo", type: "png", maxResolution: 0.420, isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false}
	),

	klic1_kpn: new OpenLayers.Layer.TMS(
		"KLIC1-KPN",
		GeoViewer.Catalog.urls.TILECACHE_KLIC1,
		{layername: "KPN", type: "png", maxResolution: 0.420, isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false}
	),

	klic1_ziggo: new OpenLayers.Layer.TMS(
		"KLIC1-LG_ZIGGO",
		GeoViewer.Catalog.urls.TILECACHE_KLIC1,
		{layername: "Ziggo", type: "png", maxResolution: 0.420, isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false}
	),

	klic1_enexis1: new OpenLayers.Layer.TMS(
		"KLIC1-ENEXIS_GAS",
		GeoViewer.Catalog.urls.TILECACHE_KLIC1,
		{layername: "Enexis", type: "png", maxResolution: 0.420, isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false}
	),

	/* 
	 * Historic overlays
	 */
	bonne1865: new OpenLayers.Layer.WMS("Historische Topo Kaart (1865)",
		GeoViewer.Catalog.urls.ALTERRA_WMS,
		{'layers': 'BONNE_1865', 'format': 'image/png'},
		{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
	),
	bonne1900: new OpenLayers.Layer.WMS("Historische Topo Kaart (1900)",
		GeoViewer.Catalog.urls.ALTERRA_WMS,
		{'layers': 'BONNE_1900', 'format': 'image/png'},
		{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
	),
	bonne1915: new OpenLayers.Layer.WMS("Historische Topo Kaart (1915)",
		GeoViewer.Catalog.urls.ALTERRA_WMS,
		{'layers': 'BONNE_1915', 'format': 'image/png'},
		{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
	),
	bonne1925: new OpenLayers.Layer.WMS("Historische Topo Kaart (1925)",
		GeoViewer.Catalog.urls.ALTERRA_WMS,
		{'layers': 'BONNE_1925', 'format': 'image/png'},
		{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
	),

	bonne1949: new OpenLayers.Layer.WMS("Historische Topo Kaart (1949)",
		GeoViewer.Catalog.urls.ALTERRA_WMS,
		{'layers': 'BONNE_1949', 'format': 'image/png'},
		{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
	),

	tmk1850: new OpenLayers.Layer.WMS("Militaire Kaart (1850)",
		GeoViewer.Catalog.urls.ALTERRA_WMS,
		{'layers': 'TMK_KLEUR_1850', 'format': 'image/png'},
		{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
	),

	/*
	 * Hockeyclubs
	 */
	hockeyclubs: new OpenLayers.Layer.WMS(
		"Hockeyclubs",
		GeoViewer.Catalog.urls.GS2_WMS,
		{layers: "hockeyclubs", format: "image/png", transparent: true},
		{GEORZLABSecured: false, isBaseLayer: false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7
		,featureInfoFormat: "application/vnd.ogc.gml"} 
	),

	/*
	 * RD info
	 */
	rdstations: new OpenLayers.Layer.WMS(
		"RD stations",
		GeoViewer.Catalog.urls.GS2_WMS,
		{layers: "rdinfo_rdstations", format: "image/gif", transparent: true},
		{isBaseLayer: false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}
	),

	/*
	 * Ecologische Hoofdstructuur (EHS)
	 */
	ehs: new OpenLayers.Layer.WMS("Ecologische Hoofdstructuur",
		GeoViewer.Catalog.urls.GS2_WMS,
		{'layers': 'ehs_alles', 'format': 'image/png', transparent: true},
		{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
	),

	/*
	 * KNMI Radar
	 */
	knmi_radar_bw: new OpenLayers.Layer.WMS("KNMI Radar",
		GeoViewer.Catalog.urls.KNMI_WMS_RADAR,
		{'layers': 'RADNL_OPER_R___25PCPRR_L3_KNMI', 'format': 'image/png', transparent: true},
		{'isBaseLayer': false, singleTile: true,  visibility: false}
	),

	knmi_radar_color: new OpenLayers.Layer.WMS("KNMI Radar Color",
		GeoViewer.Catalog.urls.KNMI_WMS_RADAR,
		{'layers': 'RADNL_OPER_R___25PCPRR_L3_COLOR', 'format': 'image/png', transparent: true},
		{'isBaseLayer': false, singleTile: true,  visibility: false}
	),

	// TODO
	// Add: http://geoservices.knmi.nl/cgi-bin/INTER_OPER_R___OBSERV__L3.cgi?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities
	// (daily precipitation)

	/* ------------------------------
	 * LKI Kadastrale Vlakken
	 * ------------------------------ */
	lki_vlakken: new OpenLayers.Layer.WMS("Kadastrale Vlakken",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "lki_vlakken", format: "image/png", transparent: true},
	{GEORZLABSecured: false, isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"} 
			),

	lki_vlakken_tiled: new OpenLayers.Layer.WMS(
			"Kadastrale Vlakken (tiled)",
			GeoViewer.Catalog.urls.GWC_WMS,
	{layers: "kadkaart_vlakken", format: "image/png", transparent: true},
	{singleTile: false, isBaseLayer: false,   visibility: false, noLegend: true}
			),

	lki_gebouwen: new OpenLayers.Layer.WMS("Kadastrale Bebouwingen",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "lki_gebouwen", format: "image/png", transparent: true},
	{GEORZLABSecured: false, isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"} 
			),


	lki_gebouwen_tiled: new OpenLayers.Layer.WMS(
			"Kadastrale Gebouwen (tiled)",
			GeoViewer.Catalog.urls.GWC_WMS,
	{layers: "kadkaart_gebouwen", format: "image/png", transparent: true},
	{singleTile: false, isBaseLayer: false, visibility: false, noLegend: true}
			),

	lki_teksten: new OpenLayers.Layer.WMS("Kadastrale Teksten",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "lki_teksten", format: "image/png", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true ,featureInfoFormat: "application/vnd.ogc.gml", noLegend: true}
			),

	lki_perceelnrs: new OpenLayers.Layer.WMS("Kadastrale Perceelnummers",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "lki_vlakken", format: "image/png", styles: "lki_perceelnrs", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}
			),

	lki_perceelnrs_tiled: new OpenLayers.Layer.WMS(
			"Perceel Nummers (tiled)",
			GeoViewer.Catalog.urls.GWC_WMS,
	{layers: "kadkaart_perceelnrs", format: "image/png", transparent: true},
	{singleTile: false, isBaseLayer: false,   visibility: false, noLegend: true}
			),

	kadkaart: new OpenLayers.Layer.WMS("Kadastrale Kaart Alles",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "kadkaart", format: "image/png", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7}
		
			),

	kadkaart_tiled: new OpenLayers.Layer.WMS(
			"Kadastrale Kaart Alles (tiled)",
			GeoViewer.Catalog.urls.GWC_WMS,
	{layers: "kadkaart_alles", format: "image/png", transparent: true, bgcolor: "0x99b3cc"},
	{singleTile: false, isBaseLayer: false,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
			),

	inspire_parcel_test: new OpenLayers.Layer.WMS("inspire_parcel_test",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "inspire_test:cp_parcel", format: "image/png", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"} 
			)
};

// add the vestigingen RSS Layer.
GeoViewer.Catalog.layers.kadastervestigingen = new OpenLayers.Layer.GeoRSS("GeoRSS",
		"/data/kadaster-vestigingen.xml",
{icon: icon, popupSize: new OpenLayers.Size(150, 55), isBaseLayer: false, singleTile: true,  visibility: false,
	alpha:true, opacity: 0.7}
		);


