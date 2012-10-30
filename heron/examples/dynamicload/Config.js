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


OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
//Ext.BLANK_IMAGE_URL = 'resources/images/default/s.gif';

/** Define the options referenced in the Heron layout. */
Ext.namespace("Heron.options.map");

/** 1. Define Global Map Settings  **/
Heron.options.map.settings = {
	projection: 'EPSG:28992',
	units: 'm',
	resolutions: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	maxExtent: '-65200.96, 242799.04, 375200.96, 683200.96',
	center: '155000,463000',
	xy_precision: 3,
	theme: null,
	zoom: 2
};

/** Some handy defines. */
Ext.namespace("Heron.scratch");
Heron.scratch.urls = {
	PDOK_TMS : 'http://geodata.nationaalgeoregister.nl/tms/',
	TNO_GRONDWATERSTANDEN : 'http://www.dinoservices.nl/wms/dinomap/M07M0046?',
	TNO_BOORGATEN : 'http://www.dinoservices.nl/wms/dinomap/M07M0044?',
	KAD_TILECACHE :  'http://gis.kademo.nl/cgi-bin/tilecache.cgi?',
	KNMI_WMS_RADAR :  'http://geoservices.knmi.nl/cgi-bin/RADNL_OPER_R___25PCPRR_L3.cgi?'
};

Heron.scratch.TILE_ORIGIN_PDOK = new OpenLayers.LonLat(-285401.920, 22598.080);

/** 2. Define the array of OL Layer objects to be directly included in Map  **/
Heron.options.map.layers = [

	/*
	 * Basemap openStreetMap TileCache+Mapnik
	 */
	new OpenLayers.Layer.WMS(
			"OpenStreetMap",
			Heron.scratch.urls.KAD_TILECACHE,
	{layers: "osm", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
	{singleTile: false, isBaseLayer: true,  visibility: false,  attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>"}
			),

/**
 * Dummy layer, zal vervangen worden wanneer alle url's zijn ingevuld
 **/
	new OpenLayers.Layer.Image(
			"Blanco",
			Ext.BLANK_IMAGE_URL,
			OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
			new OpenLayers.Size(10, 10),
	{
		resolutions: Heron.options.map.settings.resolutions,
		isBaseLayer: true,
		visibility: false,
		displayInLayerSwitcher: true
	}
			),

/*	new OpenLayers.Layer.TMS(
			"Basisregistratie topografie",
			Heron.scratch.urls.PDOK_TMS,
	{
		layername: 'brtachtergrondkaart',
		type: 'png',
		isBaseLayer: true,
		visibility: false,
		zoomOffset: 2,
		tileOrigin: Heron.scratch.TILE_ORIGIN_PDOK
	}
			),  */



	/*
	 * TNO
	 * Grondwaterstanden
	 * Lithologie (boorgaten)
	 */
	new OpenLayers.Layer.WMS(
			"TNO Grondwaterputten",
			Heron.scratch.urls.TNO_GRONDWATERSTANDEN,
	{
		layers: 'Grondwaterputten',
		format: "image/png",
		transparent: true,
		info_format: 'text/xml'
	},

	{
		isBaseLayer: false,
		singleTile: true,
		visibility: false,
		featureInfoFormat: 'text/xml'
	}
			),

	new OpenLayers.Layer.WMS(
			"TNO Boorgaten",
			Heron.scratch.urls.TNO_BOORGATEN,
	{
		layers: 'Boringen',
		format: "image/png",
		transparent: true,
		info_format: 'text/xml'
	},

	{
		isBaseLayer: false,
		singleTile: true,
		visibility: false,
		featureInfoFormat: 'text/xml'
	}
			),

	/*
	 * KNMI Radar
	 */
	new OpenLayers.Layer.WMS("KNMI Radar",
			Heron.scratch.urls.KNMI_WMS_RADAR,
	{'layers': 'RADNL_OPER_R___25PCPRR_L3_KNMI', 'format': 'image/png', transparent: true},
	{'isBaseLayer': false, singleTile: true,  visibility: false}
			),

	new OpenLayers.Layer.WMS("KNMI Radar Color",
			Heron.scratch.urls.KNMI_WMS_RADAR,
	{'layers': 'RADNL_OPER_R___25PCPRR_L3_COLOR', 'format': 'image/png', transparent: true},
	{'isBaseLayer': false, singleTile: true,  visibility: false}
			)

];
// Layers End

/** 3. Define the Toolbar to be shown within the Map. */
// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
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

// Replace default layer browser DefaultConfig.js
// Pass our theme tree config as an option
Ext.namespace("Heron.options.layertree");

// Define a minimal tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
// "layer:" properties should be the name of the OL Layer objects above.
Heron.options.layertree.tree = [
	{
		// Include all BaseLayers present in map
		text:'Basis Kaarten',
		nodeType: "gx_baselayercontainer"
	},
	{
		text:'Themas', children:
			[
				{
					text:'TNO', children:
						[
							{nodeType: "gx_layer", layer: "TNO Grondwaterputten", text: 'Grondwater' },
							{nodeType: "gx_layer", layer: "TNO Boorgaten", text: 'Boorgaten' }						]
				},
				{
					text:'KNMI', children:
						[
							{nodeType: "gx_layer", layer: "KNMI Radar", text: 'BuienRadar (Z/W)' },
							{nodeType: "gx_layer", layer: "KNMI Radar Color", text: 'BuienRadar (Kleur)' }
						]
				}
			]
	}
];



