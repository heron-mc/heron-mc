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
Ext.namespace("Heron");
Ext.namespace("Heron.options.map");
Ext.namespace("Heron.scratch");


/** api: example[inspire]
 *  INSPIRE
 *  -------
 *  Visualize INSPIRE layers with a custom LayerTree for INSPIRE data themes.
 */

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';

// START MapPanel OPTIONS
Heron.scratch.locations = {
	TILBURG: '5.0850, 51.5639',
	LIMBURG: '5.891, 50.775',
	AMERSFOORT: '5.2861, 52.1613',
	LOSSER: '6.84, 52.30'
};

/** 1. Use INSPIRE projection/resolutions options. */
Heron.options.map.settings = {
	projection: 'EPSG:4258',
	units: 'dd',
	resolutions: [0.017929030859375, 0.0089645154296875001, 0.0044822577148437501, 0.002241128857421875, 0.0011205644287109375, 0.00056028221435546876, 0.00028014110717773438, 0.00014007055358886719, 7.0035276794433595e-05, 3.5017638397216797e-05, 1.7508819198608399e-05, 8.7544095993041994e-06, 4.3772047996520997e-06, 2.1886023998260498e-06, 1.0943011999130249e-06, 5.4715059995651246e-07, 2.7357529997825623e-07, 1.3678764998912812e-07, 6.8393824994564058e-08, 3.4196912497282029e-08], //[860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	maxExtent: '2.7984656, 50.6264231, 7.3882975, 53.9511147',
	center: Heron.scratch.locations.LOSSER,
	xy_precision: 6,
	zoom: 4,
	max_features: 10
};

/** 2. Define layers. */
Heron.scratch.urls = {
	GS2_INSPIRE_WMS :  'http://kademo.nl/gs2/inspire/wms?',
	GS2_KADASTER_WMS :  'http://gis.kademo.nl/gs2/wms?',
	TILECACHE :  'http://gis.kademo.nl/cgi-bin/tilecache.cgi?',
	INTERACTIVE_INSTRUMENTS_WMS: 'http://services.interactive-instruments.de/exm-ni/cgi-bin/xs01-wms?',
	WHEREGROUP_WMS: 'http://osm.wheregroup.com/cgi-bin/osm_basic.xml?'
};

/** Defines layer array automatically added to the Map. */
Heron.options.map.layers = [

	new OpenLayers.Layer.WMS(
			"OpenStreetMapNL",
			Heron.scratch.urls.TILECACHE,
	{layers: "osm_4258", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
	{singleTile: false, isBaseLayer: true, visibility: true, attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>", noLegend: true}
			),

	new OpenLayers.Layer.WMS("Topo Raster",
			Heron.scratch.urls.GS2_KADASTER_WMS,
	{layers: "top_raster", format: "image/jpeg", transparent: false, version: '1.3.0'},
	{singleTile: true,  isBaseLayer: true,   visibility: false, noLegend: true, yx: {'EPSG:4258': true}}
			),

	/*    wheregroupOSM: new OpenLayers.Layer.WMS(
	 "OpenStreetMapEU",
	 Heron.scratch.urls.WHEREGROUP_WMS,
	 {layers: 'OSM_basic', format: 'image/png', transparent: false, version: '1.3.0', CRS: 'EPSG:4326'},
	 {singleTile: true, opacity: 0.2, isBaseLayer: true, visibility: false, attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>", noLegend: true, yx: {'EPSG:4258': true}}
	 ), */


	new OpenLayers.Layer.Image(
			"Blanc",
			Ext.BLANK_IMAGE_URL,
			OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
			new OpenLayers.Size(10, 10),
	{resolutions: Heron.options.map.settings.resolutions, isBaseLayer: true, noLegend: true}
			),

	/** INSPIRE Layers */

	new OpenLayers.Layer.WMS("AD.Address",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "AD.Address", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),

	// START "Official INSPIRE Layers" (with appropriate Layer Naming)
	new OpenLayers.Layer.WMS("AU.AdministrativeUnit",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "AU.AdministrativeUnit", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),

	new OpenLayers.Layer.WMS("AU.AdministrativeUnit.Order1",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "AU.AdministrativeUnit.Order1", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),

	new OpenLayers.Layer.WMS("AU.AdministrativeUnit.Order2",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "AU.AdministrativeUnit.Order2", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),

	new OpenLayers.Layer.WMS("AU.AdministrativeUnit.Order3",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "AU.AdministrativeUnit.Order3", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),

	new OpenLayers.Layer.WMS(
			"ExM.AdministrativeUnit.Lower.Saxony",
			Heron.scratch.urls.INTERACTIVE_INSTRUMENTS_WMS,
	{layers: 'AU.AdministrativeUnit', format: 'image/png', transparent: true, version: '1.3.0', exceptions: ''},
	{singleTile: true, opacity: 0.7, visibility: false, alpha:true, yx: {'EPSG:4258': true}}
			),

	new OpenLayers.Layer.WMS("CP.CadastralParcel",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "CP.CadastralParcel", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258' : true}}
			),


	new OpenLayers.Layer.WMS("GN.NamedPlace",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "GN.NamedPlace", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),


	new OpenLayers.Layer.WMS("gn_functioneel_gebied",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:gn_functioneel_gebied", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),

	new OpenLayers.Layer.WMS("gn_geografisch_gebied",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:gn_geografisch_gebied", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),


	new OpenLayers.Layer.WMS("gn_inrichtings_element",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:gn_inrichtings_element", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),


	new OpenLayers.Layer.WMS("gn_wegdeel_punt",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:gn_wegdeel_punt", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),


	new OpenLayers.Layer.WMS("HY.Watercourse",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:HY.Watercourse", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),


	new OpenLayers.Layer.WMS("HY.StandingWater",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:HY.StandingWater", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),

	new OpenLayers.Layer.WMS("TN.RoadTransportNetwork.RoadLink",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "TN.RoadTransportNetwork.RoadLink", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),

	new OpenLayers.Layer.WMS("TN.RoadTransportNetwork.RoadArea",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "TN.RoadTransportNetwork.RoadArea", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			),

	new OpenLayers.Layer.WMS("TN.RailTransportNetwork.RailwayLink",
			Heron.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "TN.RailTransportNetwork.RailwayLink", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: {'EPSG:4258': true}}
			)

	// END "Official INSPIRE Layers" (with appropriate Layer Naming)

];

/** 3. Define Toolbar items. */
// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "featureinfo"},
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

// END MapPanel OPTIONS

// START Layer Tree (
/**
 * Define themes
 *
 * Each theme contains FeatureTypes
 * FeatureTypes (with a geometry) contain (OpenLayers) Layers
 *
 * More aspects can be configured later.
 */
Heron.scratch.themes = {
GN: {
		name: 'Geographical Names'
		,abbrev: 'GN'
		,featureTypes: {
			NamedPlaceAll: {
				name: 'NamedPlace',
				layers : [
					'inspireGN'
				]
			},
			NamedPlaceFG: {
				name: 'NamedPlace - Functional Area',
				layers : [
					'inspireGNFunGeb'
				]
			},
			NamedPlaceGG: {
				name: 'NamedPlace - Geographic Area',
				layers : [
					'inspireGNGeoGeb'
				]
			},
			NamedPlaceIE: {
				name: 'NamedPlace - Inrichtings Element',
				layers : [
					'inspireGNInrElm'
				]
			},
			NamedPlaceWD: {
				name: 'NamedPlace - Road',
				layers : [
					'inspireGNWegDeelPunt'
				]
			}

		}
	}
	,HY: {
		name: 'Hydrography'
		,abbrev: 'HY'
		,featureTypes: {
			StandingWater: {
				name: 'StandingWater',
				layers: ['inspireHYWaterdeelVlak']
			}
			,Watercourse: {
				name: 'WaterCourse',
				layers: ['inspireHYWaterdeelLijn']
			}
			,All: {
				name: 'All',
				layers: ['inspireHYWaterdeelVlak','inspireHYWaterdeelLijn']
			}
		}
	}

	,TN: {
		name: 'Transport Networks'
		,abbrev: 'TN'
		,featureTypes: {
			RailwayTransport:  {
				name: 'RailwayLink',
				layers: ['inspireTNSpoorbaandeelLijn']
			}
			,RoadTransportPolygons:  {
				name: 'RoadArea',
				layers: ['inspireTNWegdeelVlak']
			}
			,RoadTransportLines:  {
				name: 'RoadLink',
				layers: ['inspireTNWegdeelLijn']
			}
			,RoadTransport:  {
				name: 'Roads (All)',
				layers: ['inspireTNWegdeelVlak','inspireTNWegdeelLijn']
			}
		}
	}

};


// Replace default layer browser DefaultConfig.js
// Pass our theme tree config as an option
Ext.namespace("Heron.options.layertree");

Heron.options.layertree.tree = [
	{
		// Include all BaseLayers present in Map
		text:'BaseLayers', nodeType: "gx_baselayercontainer"
	},

	{
		text:'Addresses', children:
			[
				{nodeType: 'gx_layer', layer: 'AD.Address', text: 'Addresses' }
			]
	},
	{
		text:'Administrative Units', children:
			[
				{nodeType: 'gx_layer', layer: 'AU.AdministrativeUnit.Order1', text: 'AdministrativeUnit1 (country)' },
				{nodeType: 'gx_layer', layer: 'AU.AdministrativeUnit.Order2', text: 'AdministrativeUnit2 (provinces)' },
				{nodeType: 'gx_layer', layer: 'AU.AdministrativeUnit.Order3', text: 'AdministrativeUnit3 (municipalities)' },
				{nodeType: 'gx_layer', layer: 'AU.AdministrativeUnit', text: 'AdministrativeUnit (all)' },
				{nodeType: 'gx_layer', layer: 'ExM.AdministrativeUnit.Lower.Saxony', text: 'ExM.AdministrativeUnit.Lower.Saxony' }
			]
	},
	{
		text:'CadastralParcels', children:
			[
				{nodeType: 'gx_layer', layer: 'CP.CadastralParcel', text: 'CadastralParcels' }
			]
	},
	{
		text:'Geographical Names', children:
			[
				{nodeType: 'gx_layer', layer: 'GN.NamedPlace', text: 'NamedPlaces (all)' },
				{nodeType: 'gx_layer', layer: 'gn_functioneel_gebied', text: 'NamedPlaces (func. areas)' },
				{nodeType: 'gx_layer', layer: 'gn_geografisch_gebied', text: 'NamedPlaces (geogr. areas)' },
				{nodeType: 'gx_layer', layer: 'gn_inrichtings_element', text: 'NamedPlaces (inr elm)' },
				{nodeType: 'gx_layer', layer: 'gn_wegdeel_punt', text: 'NamedPlaces (road point' }
			]
	},

	{
		text:'Hydrography', children:
			[
				{nodeType: 'gx_layer', layer: 'HY.Watercourse', text: 'Watercourses' },
				{nodeType: 'gx_layer', layer: 'HY.StandingWater', text: 'StandingWater' }
			]
	},

	{
		text:'RoadTransportNetwork', children:
			[
				{nodeType: 'gx_layer', layer: 'TN.RoadTransportNetwork.RoadLink', text: 'RoadLinks' },
				{nodeType: 'gx_layer', layer: 'TN.RoadTransportNetwork.RoadArea', text: 'RoadAreas' },
				{nodeType: 'gx_layer', layer: 'TN.RailTransportNetwork.RailwayLink', text: 'RailwayLinks' }
            ]
	}
];
/** Values for BookmarksPanel (bookmarks to jump to specific layers/zoom/center on map. */
Ext.namespace("Heron.options.bookmarks");
Heron.options.bookmarks = [
	{
		id: 'tilburg',
		name: 'Show Addresses (Tilburg)',
		desc: 'Pan and zoom to show Addresses',
		layers: ['OpenStreetMapNL', 'AD.Address', 'CP.CadastralParcel'],
		x: 5.0850,
		y: 51.5639,
		zoom: 12
	},
	/*	{
	 id: 'limburg',
	 name: 'Show Cadastral Parcels (Limburg)',
	 desc: 'Pan and zoom to Cadastral Parcels',
	 layers: ['OpenStreetMap', 'INSPIRE Addresses', 'INSPIRE Parcels'],
	 x: 5.891,
	 y: 50.775,
	 zoom: 11
	 },    */
	{
		id: 'losser',
		name: 'Show Cadastral Parcels (Losser)',
		desc: 'Pan and zoom to Cadastral Parcels',
		layers: ['OpenStreetMapNL', 'CP.CadastralParcel'],
		x: 7.0377,
		y: 52.2633,
		zoom: 9
	}

];


