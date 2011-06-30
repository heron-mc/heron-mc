
/*
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
Ext.namespace("Heron.options");
Ext.namespace("Heron.scratch");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

Ext.BLANK_IMAGE_URL = 'http://extjs.cachefly.net/ext-3.3.1/resources/images/default/s.gif';


var size = new OpenLayers.Size(12, 15);
var calculateOffset = function(size) {
	return new OpenLayers.Pixel(-(size.w / 2), -size.h);
};
var icon = new OpenLayers.Icon("/media/logo_kadasterK_klein.GIF", size, null, calculateOffset);

/**
 * Options for MapPanel
 * These will be assigned as "hropts" within the global config
 * "scratch" is just for convenience.
 *
 **/
Ext.namespace("Heron.options.map");

Heron.options.map.settings = {
	projection: 'EPSG:28992',
	units: 'm',
	resolutions: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	maxExtent: '-65200.96,242799.04,375200.96,683200.96',
	center: '155000,463000',
	xy_precision: 3,
	zoom: 2,
	theme: null
};

Heron.scratch.urls = {
	ALTERRA_WMS : 'http://www.geodata.alterra.nl/topoxplorer/TopoXplorerServlet?',
	GS2_WMS :  'http://gis.kademo.nl/gs2/wms?',
	GWC_WMS :  'http://gis.kademo.nl/gwc/service/wms?',
	KNMI_WMS_RADAR :  'http://geoservices.knmi.nl/cgi-bin/RADNL_OPER_R___25PCPRR_L3.cgi?',
	TILECACHE :  'http://gis.kademo.nl/cgi-bin/tilecache.cgi?',
	TILECACHE_KLIC1 :  'http://kom.kademo.nl/tms/10G058512_1/index.cgi/'
};

Heron.scratch.layermap = {
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
			Heron.scratch.urls.TILECACHE,
	{layers: "osm", format: "image/png", transparent: false},
	{singleTile: false, isBaseLayer: true,  visibility: false,  attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>"}
			),

	/*
	 * Combinatie top250/50/25
	 */
	topraster: new OpenLayers.Layer.WMS(
			"TopRaster",
			Heron.scratch.urls.GWC_WMS,
	{layers: "top_raster", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
	{singleTile: false, isBaseLayer: true,   visibility: false, noLegend: true}
			),

	top10nlgeodan: new OpenLayers.Layer.WMS(
			"Top10NL (Geodan)",
			Heron.scratch.urls.GWC_WMS,
	{layers: "top10_geodan", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
	{singleTile: false,  isBaseLayer: true, visibility: false, noLegend: true}
			),

	luchtfotonlr: new OpenLayers.Layer.WMS(
			"Luchtfoto (NLR)",
			Heron.scratch.urls.GWC_WMS,
	{layers: "luchtfoto_nlr", format: "image/jpeg", transparent: false, bgcolor: "0x99b3cc"},
	{singleTile: false,  isBaseLayer: true, visibility: false, noLegend: true}
			),

	blanco: new OpenLayers.Layer.Image(
			"Blanco",
			Ext.BLANK_IMAGE_URL,
			OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
			new OpenLayers.Size(10, 10),
	{resolutions: Heron.options.map.settings.resolutions, isBaseLayer: true, visibility: false, displayInLayerSwitcher: true}
			),

	/*
	 * KLIC overlays
	 */
	klic1_gbkn: new OpenLayers.Layer.TMS(
			"KLIC1-GBKN",
			Heron.scratch.urls.TILECACHE_KLIC1,
	{layername: "GBKN", type: "png", maxResolution: 0.420, isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false}
			),

	klic1_liggingen: new OpenLayers.Layer.TMS(
			"KLIC1-LiggingsInfo",
			Heron.scratch.urls.TILECACHE_KLIC1,
	{layername: "LiggingsInfo", type: "png", maxResolution: 0.420, isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false}
			),

	klic1_kpn: new OpenLayers.Layer.TMS(
			"KLIC1-KPN",
			Heron.scratch.urls.TILECACHE_KLIC1,
	{layername: "KPN", type: "png", maxResolution: 0.420, isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false}
			),

	klic1_ziggo: new OpenLayers.Layer.TMS(
			"KLIC1-LG_ZIGGO",
			Heron.scratch.urls.TILECACHE_KLIC1,
	{layername: "Ziggo", type: "png", maxResolution: 0.420, isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false}
			),

	klic1_enexis1: new OpenLayers.Layer.TMS(
			"KLIC1-ENEXIS_GAS",
			Heron.scratch.urls.TILECACHE_KLIC1,
	{layername: "Enexis", type: "png", maxResolution: 0.420, isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false}
			),

	/*
	 * Historic overlays
	 */
	bonne1865: new OpenLayers.Layer.WMS("Historische Topo Kaart (1865)",
			Heron.scratch.urls.ALTERRA_WMS,
	{'layers': 'BONNE_1865', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
			),
	bonne1900: new OpenLayers.Layer.WMS("Historische Topo Kaart (1900)",
			Heron.scratch.urls.ALTERRA_WMS,
	{'layers': 'BONNE_1900', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
			),
	bonne1915: new OpenLayers.Layer.WMS("Historische Topo Kaart (1915)",
			Heron.scratch.urls.ALTERRA_WMS,
	{'layers': 'BONNE_1915', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
			),
	bonne1925: new OpenLayers.Layer.WMS("Historische Topo Kaart (1925)",
			Heron.scratch.urls.ALTERRA_WMS,
	{'layers': 'BONNE_1925', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
			),

	bonne1949: new OpenLayers.Layer.WMS("Historische Topo Kaart (1949)",
			Heron.scratch.urls.ALTERRA_WMS,
	{'layers': 'BONNE_1949', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
			),

	tmk1850: new OpenLayers.Layer.WMS("Militaire Kaart (1850)",
			Heron.scratch.urls.ALTERRA_WMS,
	{'layers': 'TMK_KLEUR_1850', 'format': 'image/png'},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
			),

	/*
	 * AHN - Algemeen Hoogtebestand NL - DEM colour relief Netherlands
	 */
	ahndem2: new OpenLayers.Layer.WMS(
			"NL DEM Color",
			Heron.scratch.urls.GS2_WMS,
	{layers: "ahn-nl-dem2", format: "image/jpeg"},
	{isBaseLayer: false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}
			),

	/*
	 * Hockeyclubs
	 */
	hockeyclubs: new OpenLayers.Layer.WMS(
			"Hockeyclubs",
			Heron.scratch.urls.GS2_WMS,
	{layers: "hockeyclubs", format: "image/png", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7,
		featureInfoFormat: "application/vnd.ogc.gml"}
			),

	/*
	 * RD info
	 */
	rdstations: new OpenLayers.Layer.WMS(
			"RD stations",
			Heron.scratch.urls.GS2_WMS,
	{layers: "rdinfo_rdstations", format: "image/gif", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}
			),

	/*
	 * Ecologische Hoofdstructuur (EHS)
	 */
	ehs: new OpenLayers.Layer.WMS("Ecologische Hoofdstructuur",
			Heron.scratch.urls.GS2_WMS,
	{'layers': 'ehs_alles', 'format': 'image/png', transparent: true},
	{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
			),

	/*
	 * KNMI Radar
	 */
	knmi_radar_bw: new OpenLayers.Layer.WMS("KNMI Radar",
			Heron.scratch.urls.KNMI_WMS_RADAR,
	{'layers': 'RADNL_OPER_R___25PCPRR_L3_KNMI', 'format': 'image/png', transparent: true},
	{'isBaseLayer': false, singleTile: true,  visibility: false}
			),

	knmi_radar_color: new OpenLayers.Layer.WMS("KNMI Radar Color",
			Heron.scratch.urls.KNMI_WMS_RADAR,
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
			Heron.scratch.urls.GS2_WMS,
	{layers: "lki_vlakken", format: "image/png", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"}
			),

	lki_vlakken_tiled: new OpenLayers.Layer.WMS(
			"Kadastrale Vlakken (tiled)",
			Heron.scratch.urls.GWC_WMS,
	{layers: "kadkaart_vlakken", format: "image/png", transparent: true},
	{singleTile: false, isBaseLayer: false,   visibility: false, noLegend: true}
			),

	lki_gebouwen: new OpenLayers.Layer.WMS("Kadastrale Bebouwingen",
			Heron.scratch.urls.GS2_WMS,
	{layers: "lki_gebouwen", format: "image/png", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"}
			),


	lki_gebouwen_tiled: new OpenLayers.Layer.WMS(
			"Kadastrale Gebouwen (tiled)",
			Heron.scratch.urls.GWC_WMS,
	{layers: "kadkaart_gebouwen", format: "image/png", transparent: true},
	{singleTile: false, isBaseLayer: false, visibility: false, noLegend: true}
			),

	lki_teksten: new OpenLayers.Layer.WMS("Kadastrale Teksten",
			Heron.scratch.urls.GS2_WMS,
	{layers: "lki_teksten", format: "image/png", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true ,featureInfoFormat: "application/vnd.ogc.gml", noLegend: true}
			),

	lki_perceelnrs: new OpenLayers.Layer.WMS("Kadastrale Perceelnummers",
			Heron.scratch.urls.GS2_WMS,
	{layers: "lki_vlakken", format: "image/png", styles: "lki_perceelnrs", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}
			),

	lki_perceelnrs_tiled: new OpenLayers.Layer.WMS(
			"Perceel Nummers (tiled)",
			Heron.scratch.urls.GWC_WMS,
	{layers: "kadkaart_perceelnrs", format: "image/png", transparent: true},
	{singleTile: false, isBaseLayer: false,   visibility: false, noLegend: true}
			),

	kadkaart: new OpenLayers.Layer.WMS("Kadastrale Kaart Alles",
			Heron.scratch.urls.GS2_WMS,
	{layers: "kadkaart", format: "image/png", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7}

			),

	kadkaart_tiled: new OpenLayers.Layer.WMS(
			"Kadastrale Kaart Alles (tiled)",
			Heron.scratch.urls.GWC_WMS,
	{layers: "kadkaart_alles", format: "image/png", transparent: true, bgcolor: "0x99b3cc"},
	{singleTile: false, isBaseLayer: false,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
			),

	inspire_parcel_test: new OpenLayers.Layer.WMS("inspire_parcel_test",
			Heron.scratch.urls.GS2_WMS,
	{layers: "inspire_test:cp_parcel", format: "image/png", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"}
			),

	// add the vestigingen RSS Layer.
	kadastervestigingen : new OpenLayers.Layer.GeoRSS("GeoRSS",
			"/data/kadaster-vestigingen.xml",
	{icon: icon, popupSize: new OpenLayers.Size(150, 55), isBaseLayer: false, singleTile: true,  visibility: false,
		alpha:true, opacity: 0.7}
			)
};


/** Collect layers from above, these are actually added to the map. 
 * One could also define the layer objects here immediately.
 * */
Heron.options.map.layers = [

	/*
	 * ==================================
	 *            BaseLayers
	 * ==================================
	 */
	Heron.scratch.layermap.osm,
	Heron.scratch.layermap.topraster,
	Heron.scratch.layermap.top10nlgeodan,
	Heron.scratch.layermap.luchtfotonlr,
	Heron.scratch.layermap.blanco,

	/*
	 * ==================================
	 *            OVERLAYS
	 * ==================================
	 */
	Heron.scratch.layermap.klic1_gbkn,
	Heron.scratch.layermap.klic1_liggingen,
	Heron.scratch.layermap.klic1_kpn,
	Heron.scratch.layermap.klic1_ziggo,
	Heron.scratch.layermap.klic1_enexis1,
	Heron.scratch.layermap.knmi_radar_color,
	Heron.scratch.layermap.knmi_radar_bw,

	/* ------------------------------
	 * DEM NL Colour Relief
	 * ------------------------------ */
	Heron.scratch.layermap.ahndem2,

	/* ------------------------------
	 * Hockeyclubs
	 * ------------------------------ */
	Heron.scratch.layermap.hockeyclubs,

	/* ------------------------------
	 * RD info
	 * ------------------------------ */
	Heron.scratch.layermap.rdstations,

	/* ------------------------------
	 * Ecologische Hoofdstructuur (EHS)
	 * ------------------------------ */
	Heron.scratch.layermap.ehs,


	/* ------------------------------
	 * LKI Kadastrale Vlakken
	 * ------------------------------ */
	Heron.scratch.layermap.lki_vlakken_tiled,
	Heron.scratch.layermap.lki_gebouwen_tiled,
	Heron.scratch.layermap.lki_teksten,
	Heron.scratch.layermap.lki_perceelnrs_tiled,
	Heron.scratch.layermap.kadkaart_tiled,

	Heron.scratch.layermap.kadastervestigingen
];

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {max_features: 20}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{type: "zoomprevious"},
	{type: "zoomnext"},
	{type: "-"},
	{type: "measurelength"},
	{type: "measurearea"}
];

/** Values for ContextBrowser (shortcuts to jump to specific layers/zoom/center on map. */
Ext.namespace("Heron.options.contextbrowser");
Heron.options.contextbrowser =
		[
			{
				id: 'klic',
				name: 'KLIC Voorbeeld',
				desc: 'een voorbeeld van een KLIC',
				layers: ['OpenStreetMap', 'KLIC1-GBKN', 'KLIC1-KPN'],
				x: 253922,
				y: 574468,
				zoom: 11
			},
			{
				id: 'debrug',
				name: 'Kadaster - De Brug',
				desc: 'een voorbeeld van een Place2',
				layers: ['Luchtfoto (NLR)'],
				x: 194194,
				y: 465873,
				zoom: 10
			}
		];