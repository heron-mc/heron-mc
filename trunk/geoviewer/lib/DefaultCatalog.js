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

Ext.namespace("GeoViewer.Catalog");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

Ext.BLANK_IMAGE_URL = 'http://kademo.nl/lib/ext/3.1.0/resources/images/default/s.gif';

GeoViewer.Catalog.optionsRD = {
	PROJECTION: 'EPSG:28992',
	UNITS: 'm',                    
	RESOLUTIONS: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	MAX_EXTENT: new OpenLayers.Bounds(-65200.96, 242799.04, 375200.96, 683200.96),
	CENTER: new OpenLayers.LonLat(155000, 463000),
	XY_PRECISION: 3,
	ZOOM: 2,
	MAX_EXTENT_KLIC1: new OpenLayers.Bounds(253865,574237,253960,574727)
};

GeoViewer.Catalog.urls = {
	ALTERRA_WMS : 'http://www.geodata.alterra.nl/topoxplorer/TopoXplorerServlet?',
	GS2_WMS :  'http://gis.kademo.nl/gs2/wms?',
	GWC_WMS :  'http://gis.kademo.nl/gwc/service/wms?',
	KNMI_WMS_RADAR :  'http://geoservices.knmi.nl/cgi-bin/RADNL_OPER_R___25PCPRR_L3.cgi?',
	TILECACHE :  'http://gis.kademo.nl/cgi-bin/tilecache.cgi?',
	TILECACHE_KLIC1 :  'http://kom.kademo.nl/tms/10G058512_1/index.cgi/'
};

GeoViewer.Catalog.lang = {
	nl : {
		txtWarning : "Waarschuwing",
		txtLegend : "Legenda",
		txtNoLayerSelected : "Geen laag geselecteerd",
		txtSaveFeatures : "Bewaar objecten op harde schijf",
		txtGetFeatures : "Download objecten",
		txtFeatureInfo : "Objectinformatie",
		txtNoData : "Geen informatie gevonden",
		txtLayerNotAdded : "Kaartlaag nog niet toegevoegd",
		txtAttribute : "Attribuut",
		txtValue :"Waarde",
		txtMask : "Bezig met ophalen informatie...",
		txtLayers : "Lagen",
		txtNoMatch : "Gegevens laag niet gevonden",
		txtLoading : "Bezig met laden...",
		txtMapContexts : "Contexten",
		txtPlaces : "Plekken",
		txtTitleFeatureInfo : "Objectinformatie",
		txtTitleFeatureData : "Objectgegevens",
		txtLoadMask : "Bezig met opvragen gegevens...",
		txtUnknownFeatureType : "Onbekend",
		txtNoLayersWithFeatureInfo: 'De huidige kaart bevat geen lagen met objectinformatie.',
		txtPan : "Pan kaartbeeld",
		txtZoomIn : "Inzoomen door box te tekenen",
		txtZoomOut : "Uitzoomen door box te tekenen",
		txtZoomToFullExtent : "Uitzoomen naar volledige extent",
		txtZoomPrevious : "Naar vorige extent en zoom",
		txtZoomNext : "Naar volgende extent en zoom",
		txtMeasureLength: "Meet afstand (teken lijnstukken en dubbelklik bij laatste)",
		txtMeasureArea: "Meet oppervlakte (teken polygoon en dubbelklik bij laatste)",
		txtLength: "Lengte",
		txtArea: "Oppervlakte"
	}
	,en : {
		txtWarning : "Warning",
		txtLegend : "Legend",
		txtNoLayerSelected : "No layer selected",
		txtSaveFeatures : "Save features to disk",
		txtGetFeatures : "Download features",
		txtFeatureInfo : "Feature information",
		txtNoData : "No information found",
		txtLayerNotAdded : "Layer not yet added",
		txtAttribute : "Attribute",
		txtValue:"Value",
		txtMask : "Busy recieving data...",
		txtLayers : "Layers",
		txtNoMatch : "Layer data not found",
		txtLoading : "Loading...",
		txtMapContexts : "Contexts",
		txtPlaces : "Places",
		txtTitleFeatureInfo : "Feature info",
		txtTitleFeatureData : "Feature data",
		txtLoadMask : "Busy recieving data...",
		txtUnknownFeatureType : "Unknown",
		txtNoLayersWithFeatureInfo: "The current map doesn't contain layers with feature information.",
		txtPan : "Pan map",
		txtZoomIn : "Zoom in by drawing a box",
		txtZoomOut : "Zoom out by drawing a box",
		txtZoomToFullExtent : "Zoom to full extent",
		txtZoomPrevious : "Go to previous extent",
		txtZoomNext : "Go to next extent",
		txtMeasureLength: "Measure distance (draw linesegments and double click at the end)",
		txtMeasureArea: "Measure area (draw polygon and double click at the end)",
		txtLength: "Length",
		txtArea: "Area"
	}
};

GeoViewer.Catalog.layers = {
	/*
	 * ==================================
	 *            BaseLayers
	 * ==================================
	 */


	/* ------------------------------
	 * Basemap openStreetMap TileCache+Mapnik
	 * ------------------------------ */
	osm: new OpenLayers.Layer.WMS(
			"OpenStreetMap",
			GeoViewer.Catalog.urls.TILECACHE,
	{layers: "osm", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
	{singleTile: false, isBaseLayer: true,  visibility: false}
			),

	/* ------------------------------
	 * Combinatie top250/50/25
	 * ------------------------------ */
	topraster: new OpenLayers.Layer.WMS(
			"TopRaster",
			GeoViewer.Catalog.urls.GWC_WMS,
	{layers: "top_raster", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
	{singleTile: false, isBaseLayer: true,   visibility: false}
			),

	top10nlgeodan: new OpenLayers.Layer.WMS(
			"Top10NL (Geodan)",
			GeoViewer.Catalog.urls.GWC_WMS,
	{layers: "top10_geodan", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
	{singleTile: false,  isBaseLayer: true, visibility: false, noLegend: true}
			),

	/*GeoViewer.Catalog.layers.push(new OpenLayers.Layer.WMS(
	 "Satelliet (Geodan)",
	 GeoViewer.Catalog.urls.GWC_WMS,
	 {layers: "landsat_geodan", format: "image/jpeg", transparent: false, bgcolor: "0x99b3cc"},
	 {singleTile: false,  visibility: false}
	 ));   */

	luchtfotonlr: new OpenLayers.Layer.WMS(
			"Luchtfoto (NLR)",
			GeoViewer.Catalog.urls.GWC_WMS,
	{layers: "luchtfoto_nlr", format: "image/jpeg", transparent: false, bgcolor: "0x99b3cc"},
	{singleTile: false,  isBaseLayer: true, visibility: false}
			),

	blanco: new OpenLayers.Layer.Image(
			"Blanco",
			Ext.BLANK_IMAGE_URL,
			GeoViewer.Catalog.optionsRD.MAX_EXTENT,
			new OpenLayers.Size(10, 10),
	{resolutions: GeoViewer.Catalog.optionsRD.RESOLUTIONS, isBaseLayer: true, visibility: false, displayInLayerSwitcher: true}
			),


	/*
	 * ==================================
	 *            OVERLAYS
	 * ==================================
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
	/* ------------------------------
	 * Historische Kaarten (Bonnebladen)
	 * ------------------------------ */
	bonne1865: new OpenLayers.Layer.WMS("Historische Topo Kaart (1865)",
			GeoViewer.Catalog.urls.ALTERRA_WMS,
	{'layers': 'BONNE_1865', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7}
			),

	bonne1900: new OpenLayers.Layer.WMS("Historische Topo Kaart (1900)",
			GeoViewer.Catalog.urls.ALTERRA_WMS,
	{'layers': 'BONNE_1900', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7}
			),

	bonne1915: new OpenLayers.Layer.WMS("Historische Topo Kaart (1915)",
			GeoViewer.Catalog.urls.ALTERRA_WMS,
	{'layers': 'BONNE_1915', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7}
			),

	bonne1925: new OpenLayers.Layer.WMS("Historische Topo Kaart (1925)",
			GeoViewer.Catalog.urls.ALTERRA_WMS,
	{'layers': 'BONNE_1925', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7}
			),

	bonne1949: new OpenLayers.Layer.WMS("Historische Topo Kaart (1949)",
			GeoViewer.Catalog.urls.ALTERRA_WMS,
	{'layers': 'BONNE_1949', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7}
			),

	tmk1850: new OpenLayers.Layer.WMS("Militaire Kaart (1850)",
			GeoViewer.Catalog.urls.ALTERRA_WMS,
	{'layers': 'TMK_KLEUR_1850', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7}
			),

	/* ------------------------------
	 * Hockeyclubs
	 * ------------------------------ */
	hockeyclubs: new OpenLayers.Layer.WMS(
			"Hockeyclubs",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "hockeyclubs", format: "image/png", transparent: true},
	{GEORZLABSecured: false, isBaseLayer: false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7
		,featureInfoFormat: "application/vnd.ogc.gml"} //alpha true is for PNG hacks, but causes problems on transparency...
			),

	/* ------------------------------
	 * RD info
	 * ------------------------------ */
	rdstations: new OpenLayers.Layer.WMS(
			"RD stations",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "rdinfo_rdstations", format: "image/gif", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}
		// see http://openlayers.org/pipermail/dev/2006-November/000088.html
			),

	/* ------------------------------
	 * Ecologische Hoofdstructuur (EHS)
	 * ------------------------------ */
	ehs: new OpenLayers.Layer.WMS("Ecologische Hoofdstructuur",
			GeoViewer.Catalog.urls.GS2_WMS,
	{'layers': 'ehs_alles', 'format': 'image/png', transparent: true},
	{'isBaseLayer': false, singleTile: true,  visibility: false}
			),

	/* ------------------------------
	 * KNMI Radar
	 * ------------------------------ */
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


	/* ------------------------------
	 * LKI Kadastrale Vlakken
	 * ------------------------------ */
	lki_vlakken: new OpenLayers.Layer.WMS("Kadastrale Vlakken",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "lki_vlakken", format: "image/png", transparent: true},
	{GEORZLABSecured: false, isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"} //alpha true is for PNG hacks, but causes problems on transparency...
			),

	lki_vlakken_tiled: new OpenLayers.Layer.WMS(
			"Kadastrale Vlakken (tiled)",
			GeoViewer.Catalog.urls.GWC_WMS,
	{layers: "kadkaart_vlakken", format: "image/png", transparent: true},
	{singleTile: false, isBaseLayer: false,   visibility: false}
	),

	lki_gebouwen: new OpenLayers.Layer.WMS("Kadastrale Bebouwingen",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "lki_gebouwen", format: "image/png", transparent: true},
	{GEORZLABSecured: false, isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"} //alpha true is for PNG hacks, but causes problems on transparency...
			),


	lki_gebouwen_tiled: new OpenLayers.Layer.WMS(
			"Kadastrale Gebouwen (tiled)",
			GeoViewer.Catalog.urls.GWC_WMS,
	{layers: "kadkaart_gebouwen", format: "image/png", transparent: true},
	{singleTile: false, isBaseLayer: false,   visibility: false}
	),

	lki_teksten: new OpenLayers.Layer.WMS("Kadastrale Teksten",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "lki_teksten", format: "image/png", transparent: true},
	{GEORZLABSecured: false, isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"} //alpha true is for PNG hacks, but causes problems on transparency...
			),

	lki_perceelnrs: new OpenLayers.Layer.WMS("Kadastrale Perceelnummers",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "lki_perceelnrs", format: "image/png", transparent: true},
	{GEORZLABSecured: false, isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"} //alpha true is for PNG hacks, but causes problems on transparency...
			),

	kadkaart: new OpenLayers.Layer.WMS("Kadastrale Kaart Alles",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "kadkaart", format: "image/png", transparent: true},
	{GEORZLABSecured: false, isBaseLayer: false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7}
		//alpha true is for PNG hacks, but causes problems on transparency...
			),

	kadkaart_tiled: new OpenLayers.Layer.WMS(
			"Kadastrale Kaart Alles (tiled)",
			GeoViewer.Catalog.urls.GWC_WMS,
	{layers: "kadkaart_alles", format: "image/png", transparent: true, bgcolor: "0x99b3cc"},
	{singleTile: false, isBaseLayer: false,   visibility: false, alpha:true, opacity: 0.7}
			),

	inspire_parcel_test: new OpenLayers.Layer.WMS("inspire_parcel_test",
			GeoViewer.Catalog.urls.GS2_WMS,
	{layers: "inspire_test:cp_parcel", format: "image/png", transparent: true},
	{GEORZLABSecured: false, isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"} //alpha true is for PNG hacks, but causes problems on transparency...
			)
};

// override default Icon for RSS feeds
// var url = "../img/favicon.ico";
var size = new OpenLayers.Size(12, 15);
var calculateOffset = function(size) {
	return new OpenLayers.Pixel(-(size.w / 2), -size.h);
};
var icon = new OpenLayers.Icon("/media/logo_kadasterK_klein.GIF", size, null, calculateOffset);

// add the vestigingen RSS Layer.
GeoViewer.Catalog.layers.kadastervestigingen = new OpenLayers.Layer.GeoRSS("GeoRSS",
		"/data/kadaster-vestigingen.xml",
{icon: icon, popupSize: new OpenLayers.Size(150, 55), isBaseLayer: false, singleTile: true,  visibility: false,
	alpha:true, opacity: 0.7}
		);

/*
 WMSLayers.layers.push({
 description : "OpenStreetMap",
 url: "http://osm.kaartenbalie.nl/wms/mapserver?request=GetCapabilities&service=wms&version=1.1.1",
 layerProperties: { ratio: 1, singleTile: true, isBaseLayer: true, gutter: 15, visibility: false, transitionEffect: 'resize'}
 });

 WMSLayers.layers.push({
 description : "Kademo Tiles",
 url: "http://kademo.nl/gwc/service/wms?request=GetCapabilities&service=wms&version=1.1.1",
 expanded: false,
 layerProperties: { ratio: 1, singleTile: false, transitionEffect: 'resize', opacity: 1.0 }
 });

 WMSLayers.layers.push({
 description : "NLR Luchtfoto",
 url: "http://gdsc.nlr.nl/wms/dkln2006?request=GetCapabilities&service=WMS&version=1.1.1",
 expanded: false,
 layerProperties: {ratio: 1, singleTile: true, transitionEffect: 'resize', opacity: 1.0 }
 });


 //http://gdsc.nlr.nl/wms/dkln2006?request=GetCapabilities&service=WMS&version=1.1.1
 // url: "http://gis2.WMSLayers.org/kaartenbalie/layers/0a24c88dfb750116e6590ef973b95879?request=GetCapabilities&service=wms&version=1.1.1",


 WMSLayers.layers.push({
 description : "RVOB",
 url: "http://gis2.WMSLayers.org/kaartenbalie/layers/5d14f4575a7cbc97cae8f218405be98d?request=GetCapabilities&service=wms&version=1.1.1",
 expanded: true,
 layerProperties: { ratio: 1, singleTile: true, transitionEffect: 'resize'}
 });




 WMSLayers.layers.push({
 description : "DLG-EHS2005",
 url: "http://gis2.WMSLayers.org/kaartenbalie/layers/2b5fb004cfaaa6229caa229af5a1f461?request=GetCapabilities&service=wms&version=1.1.1",
 layerProperties: { ratio: 1, singleTile: false, transitionEffect: 'resize' }
 });


 WMSLayers.layers.push({
 description : "DLG-Natura2000",
 url: "http://gis2.WMSLayers.org/kaartenbalie/layers/ef4d09d486c18e8fcaccde8e270a9cd5?request=GetCapabilities&service=wms&version=1.1.1",
 layerProperties: { ratio: 1, singleTile: false }
 });


 WMSLayers.layers.push({
 description : "DLG-PrOMT2009",
 url: "http://gis2.WMSLayers.org/kaartenbalie/layers/6cf12972b52ea853669e00bb06a4dd4a?request=GetCapabilities&service=wms&version=1.1.1",
 layerProperties: { ratio: 1, singleTile: true, transitionEffect: 'resize' }
 });

 WMSLayers.layers.push({
 description : "Rijkswaterstaat NWB",
 url: "http://gis2.WMSLayers.org/kaartenbalie/layers/79379642dd911a3bac70b96f747a6033?request=GetCapabilities&service=wms&version=1.1.1",
 layerProperties: { ratio: 1, singleTile: true, transitionEffect: 'resize' }
 });


 WMSLayers.layers.push({
 description : "Kadaster LKI",
 url: "http://gis2.WMSLayers.org/kaartenbalie/layers/a2ed370a9cc8c3f33285c2bb912a05d1?request=GetCapabilities&service=wms&version=1.1.1",
 layerProperties: { ratio: 1, singleTile: true, transitionEffect: 'resize' }
 });


 WMSLayers.layers.push({
 description : "LKI via RVOB",
 url: "http://gis2.WMSLayers.org/kaartenbalie/layers/99e9cd6fb29167aa211a3957733bdf5b?request=GetCapabilities&service=wms&version=1.1.1",
 layerProperties: { ratio: 1, singleTile: true, transitionEffect: 'resize' }
 });


 WMSLayers.layers.push({
 description : "Rijksmonumenten",
 url: "http://gis2.WMSLayers.org/kaartenbalie/layers/bcfd0b3270209b9788a094d044acd911?request=GetCapabilities&service=wms&version=1.1.1",
 layerProperties: { ratio: 1, singleTile: true, transitionEffect: 'resize' }
 });


 WMSLayers.layers.push({
 description : "Nieuwe Kaart NL",
 url: "http://gis2.WMSLayers.org/kaartenbalie/layers/3ee1be23a2284514c66bad3eee79ef66?request=GetCapabilities&service=wms&version=1.1.1",
 layerProperties: { ratio: 1, singleTile: true, transitionEffect: 'resize' }
 });
 */
