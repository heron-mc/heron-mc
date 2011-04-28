/*
 * Copyright (C) 2010  Het Kadaster - The Netherlands
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

Ext.namespace("GeoViewer");
Ext.namespace("GeoViewer.options.map");
Ext.namespace("GeoViewer.scratch");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

Ext.BLANK_IMAGE_URL = 'http://kademo.nl/lib/ext/3.3.1/resources/images/default/s.gif';

// START MapPanel OPTIONS

var MY_LOCATIONS = {
	TILBURG: '5.0850, 51.5639',
	LIMBURG: '5.891, 50.775',
	AMERSFOORT: '5.2861, 52.1613',
	LOSSER: '6.84, 52.30'
};

/** 1. Use INSPIRE projection/resolutions options. */
GeoViewer.options.map.settings = {
	projection: 'EPSG:4258',
	units: 'dd',
	resolutions: [0.017929030859375, 0.0089645154296875001, 0.0044822577148437501, 0.002241128857421875, 0.0011205644287109375, 0.00056028221435546876, 0.00028014110717773438, 0.00014007055358886719, 7.0035276794433595e-05, 3.5017638397216797e-05, 1.7508819198608399e-05, 8.7544095993041994e-06, 4.3772047996520997e-06, 2.1886023998260498e-06, 1.0943011999130249e-06, 5.4715059995651246e-07, 2.7357529997825623e-07, 1.3678764998912812e-07, 6.8393824994564058e-08, 3.4196912497282029e-08], //[860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	max_extent: '2.7984656, 50.6264231, 7.3882975, 53.9511147',
	center: MY_LOCATIONS.LOSSER,
	xy_precision: 6,
	zoom: 4,
	max_features: 10
};

/** 2. Define layers. */
GeoViewer.scratch.urls = {
	GS2_INSPIRE_WMS :  'http://kademo.nl/gs2/inspire/wms?',
	GS2_KADASTER_WMS :  'http://gis.kademo.nl/gs2/wms?',
	TILECACHE :  'http://gis.kademo.nl/cgi-bin/tilecache.cgi?',
	INTERACTIVE_INSTRUMENTS_WMS: 'http://services.interactive-instruments.de/exm-ni/cgi-bin/xs01-wms?',
	WHEREGROUP_WMS: 'http://osm.wheregroup.com/cgi-bin/osm_basic.xml?'
};

GeoViewer.options.map.layers = [
	new OpenLayers.Layer.Image(
			"Blanc",
			Ext.BLANK_IMAGE_URL,
			OpenLayers.Bounds.fromString(GeoViewer.scratch.options4258.max_extent),
			new OpenLayers.Size(10, 10),
	{resolutions: GeoViewer.scratch.options4258.resolutions, isBaseLayer: true, noLegend: true}
			),

	new OpenLayers.Layer.WMS("Topo Raster",
			GeoViewer.scratch.urls.GS2_KADASTER_WMS,
	{layers: "top_raster", format: "image/jpeg", transparent: false, version: '1.3.0'},
	{singleTile: true,  isBaseLayer: true,   visibility: false, noLegend: true, yx: ['EPSG:4258']}
			),

	/*    wheregroupOSM: new OpenLayers.Layer.WMS(
	 "OpenStreetMapEU",
	 GeoViewer.scratch.urls.WHEREGROUP_WMS,
	 {layers: 'OSM_basic', format: 'image/png', transparent: false, version: '1.3.0', CRS: 'EPSG:4326'},
	 {singleTile: true, opacity: 0.2, isBaseLayer: true, visibility: false, attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>", noLegend: true, yx: ['EPSG:4258']}
	 ), */

	new OpenLayers.Layer.WMS(
			"OpenStreetMapNL",
			GeoViewer.scratch.urls.TILECACHE,
	{layers: "osm_4258", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
	{singleTile: false, isBaseLayer: true, visibility: true, attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>", noLegend: true}
			),



	new OpenLayers.Layer.WMS("INSPIRE Addresses",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "AD.Address", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),

	// START "Official INSPIRE Layers" (with appropriate Layer Naming)
	new OpenLayers.Layer.WMS("INSPIRE Admin Units (all)",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "AU.AdministrativeUnit", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),

	new OpenLayers.Layer.WMS("INSPIRE Admin Units (land)",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "AU.AdministrativeUnit.Order1", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),

	new OpenLayers.Layer.WMS("INSPIRE Admin Units (prov.)",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "AU.AdministrativeUnit.Order2", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),

	new OpenLayers.Layer.WMS("INSPIRE Admin Units (gem.)",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "AU.AdministrativeUnit.Order3", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),

	new OpenLayers.Layer.WMS(
			"ExM Administrative Units Lower Saxony",
			GeoViewer.scratch.urls.INTERACTIVE_INSTRUMENTS_WMS,
	{layers: 'AU.AdministrativeUnit', format: 'image/png', transparent: true, version: '1.3.0', exceptions: ''},
	{singleTile: true, opacity: 0.7, visibility: false, alpha:true, yx: ['EPSG:4258']}
			),

	new OpenLayers.Layer.WMS("INSPIRE Parcels",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "CP.CadastralParcel", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),


	new OpenLayers.Layer.WMS("INSPIRE NamedPlaces",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "GN.NamedPlace", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),


	new OpenLayers.Layer.WMS("INSPIRE NamedPlaces Func Geb",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:gn_functioneel_gebied", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),

	new OpenLayers.Layer.WMS("INSPIRE NamedPlaces Geogr Geb",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:gn_geografisch_gebied", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),


	new OpenLayers.Layer.WMS("INSPIRE NamedPlaces Inricht Elm",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:gn_inrichtings_element", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),


	new OpenLayers.Layer.WMS("INSPIRE NamedPlaces Wegdeel",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:gn_wegdeel_punt", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),


	new OpenLayers.Layer.WMS("INSPIRE Hydrography (Watercourse)",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:HY.Watercourse", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),


	new OpenLayers.Layer.WMS("INSPIRE Hydrography (StandingWater)",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "inspire:HY.StandingWater", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),

	new OpenLayers.Layer.WMS("INSPIRE TransportNetworks (RoadLink)",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "TN.RoadTransportNetwork.RoadLink", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),

	new OpenLayers.Layer.WMS("INSPIRE TransportNetworks (RoadArea)",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "TN.RoadTransportNetwork.RoadArea", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			),

	new OpenLayers.Layer.WMS("INSPIRE TransportNetworks (RailwayLink)",
			GeoViewer.scratch.urls.GS2_INSPIRE_WMS,
	{layers: "TN.RailTransportNetwork.RailwayLink", format: "image/png", transparent: true, version: '1.3.0'},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml", yx: ['EPSG:4258']}
			)

	// END "Official INSPIRE Layers" (with appropriate Layer Naming)

];

/** 3. Define Toolbar items. */
// See ToolbarBuilder.js : each string item points to a definition
// in GeoViewer.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
GeoViewer.options.map.toolbar = [
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
GeoViewer.scratch.themes = {
	AD: {
		name: 'Addresses'
		,abbrev: 'AD'
		,featureTypes: {
			Address: {
				name: 'Address',
				fields: new Array('text', 'language', 'nameStatus', 'nativeness'),

				// Add layers realizing this feature type: a Layer object can be fetched
				// as GeoViewer.scratch.layers['name']
				layers : ['inspireAD']
			}
			/*			,AddressAreaName: null
			 ,AdminUnitName: null
			 ,PostalDescriptor: null
			 ,ThoroughfareName: null  */
		}
	}
	,AU: {
		name: 'Administrative Units'
		,abbrev: 'AU'
		,featureTypes: {
			AdministrativeUnitEU: {
				name: 'AdministrativeUnit-XBorder',
				fields: new Array(''),
				layers : [
					'inspireAULand', 'inspireAUProv', 'inspireAUGem', 'inspireAUGermany'
				]
			},
			AdministrativeUnitNL: {
				name: 'AdministrativeUnit-NL',
				fields: new Array(''),
				layers : [
					'inspireAULand', 'inspireAUProv', 'inspireAUGem'
				]
			},
			AdministrativeUnitDE: {
				name: 'AdministrativeUnit-DE',
				fields: new Array(''),
				layers : [
					'inspireAUGermany'
				]
			},
			AdministrativeUnit1: {
				name: 'AdministrativeUnit-NL-1st',
				fields: new Array(''),
				layers : [
					'inspireAULand'
				]
			},
			AdministrativeUnit2: {
				name: 'AdministrativeUnit-NL-2nd',
				fields: new Array(''),
				layers : [
					'inspireAUProv'
				]
			},
			AdministrativeUnit3: {
				name: 'AdministrativeUnit-NL-3rd',
				fields: new Array(''),
				layers : [
					'inspireAUGem'
				]
			}
		}
	}
	,CP: {
		name: 'Cadastral Parcels'
		,abbrev: 'CP'
		,featureTypes: {
			CadastralParcel: {
				name: 'CadastralParcel',
				fields: new Array('text', 'language', 'nameStatus', 'nativeness'),
				layers : [
					'inspireCP'
				]
			}
			,CadastralBoundary: null
		}
	}
	,GN: {
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
Ext.namespace("GeoViewer.options.layertree");

GeoViewer.options.layertree.tree = [
	{
		// Include all BaseLayers present in Map
		text:'BaseLayers', nodeType: "gx_baselayercontainer"
	},

	{
		text:'Addresses', children:
			[
				{nodeType: 'gx_layer', layer: 'INSPIRE Addresses', text: 'Address' }
			]
	},
	{
		nodeType: "gv_themenode",  theme: 'AU', children:
			[
				{nodeType: "gx_featuretypecontainer", featureType: 'AdministrativeUnit1'}
				,
				{nodeType: "gx_featuretypecontainer", featureType: 'AdministrativeUnit2'}
				,
				{nodeType: "gx_featuretypecontainer", featureType: 'AdministrativeUnit3'}
				,
				{nodeType: "gx_featuretypecontainer", featureType: 'AdministrativeUnitDE'}
				,
				{nodeType: "gx_featuretypecontainer", featureType: 'AdministrativeUnitEU'}
			]
	},
	{
		nodeType: "gv_themenode",  theme: 'CP', children:
			[
				{nodeType: "gx_featuretypecontainer", featureType: 'CadastralParcel'}
			]
	},
	{
		nodeType: "gv_themenode",  theme: 'GN', children:
			[
				{nodeType: "gx_featuretypecontainer", featureType: 'NamedPlaceAll'},
				{nodeType: "gx_featuretypecontainer", featureType: 'NamedPlaceFG'},
				{nodeType: "gx_featuretypecontainer", featureType: 'NamedPlaceGG'},
				{nodeType: "gx_featuretypecontainer", featureType: 'NamedPlaceIE'},
				{nodeType: "gx_featuretypecontainer", featureType: 'NamedPlaceWD'}
			]
	},
	{
		nodeType: "gv_themenode",  theme: 'HY', children:
			[
				{nodeType: "gx_featuretypecontainer", featureType: 'StandingWater'},
				{nodeType: "gx_featuretypecontainer", featureType: 'Watercourse'},
				{nodeType: "gx_featuretypecontainer", featureType: 'All'}
			]
	},
	{
		nodeType: "gv_themenode",  theme: 'TN', children:
			[
				{nodeType: "gx_featuretypecontainer", featureType: 'RailwayTransport'},
				{nodeType: "gx_featuretypecontainer", featureType: 'RoadTransportPolygons'},
				{nodeType: "gx_featuretypecontainer", featureType: 'RoadTransportLines'},
				{nodeType: "gx_featuretypecontainer", featureType: 'RoadTransport'}
			]
	}
];


