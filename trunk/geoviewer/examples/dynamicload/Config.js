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

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
//Ext.BLANK_IMAGE_URL = 'resources/images/default/s.gif';

/** Define the options referenced in the GeoViewer layout. */
Ext.namespace("GeoViewer.options.map");

/** 1. Define Global Map Settings  **/
GeoViewer.options.map.settings = {
	projection: 'EPSG:28992',
	units: 'm',
	resolutions: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	max_extent: '-65200.96, 242799.04, 375200.96, 683200.96',
	center: '155000,463000',
	xy_precision: 3,
	zoom: 2
};

/** Some handy defines. */
Ext.namespace("GeoViewer.scratch");
GeoViewer.scratch.urls = {
	PDOK_TMS : 'http://acceptatie.geodata.nationaalgeoregister.nl/tms/',
	TNO_GRONDWATERSTANDEN : 'http://www.dinoservices.nl/wms/dinomap/M07M0046?',
	TNO_BOORGATEN : 'http://www.dinoservices.nl/wms/dinomap/M07M0044?'
};

GeoViewer.scratch.TILE_ORIGIN_PDOK = new OpenLayers.LonLat(-285401.920, 22598.080);

/** 12. Define Gthe array of OL Layer objects to be directly included in Map  **/
GeoViewer.options.map.layers = [

/**
 * Dummy layer, zal vervangen worden wanneer alle url's zijn ingevuld
 **/
	new OpenLayers.Layer.Image(
			"Blanco",
			Ext.BLANK_IMAGE_URL,
			OpenLayers.Bounds.fromString(GeoViewer.options.map.settings.max_extent),
			new OpenLayers.Size(10, 10),
	{
		resolutions: GeoViewer.options.map.settings.resolutions,
		isBaseLayer: true,
		visibility: false,
		displayInLayerSwitcher: true
	}
			),

	new OpenLayers.Layer.TMS(
			"Basisregistratie topografie",
			GeoViewer.scratch.urls.PDOK_TMS,
	{
		layername: 'brtachtergrondkaart',
		type: 'png',
		isBaseLayer: true,
		visibility: false,
		zoomOffset: 2,
		tileOrigin: GeoViewer.scratch.TILE_ORIGIN_PDOK
	}
			),

	/*
	 * TNO
	 * Grondwaterstanden
	 * Lithologie (boorgaten)
	 */
	new OpenLayers.Layer.WMS(
			"TNO Grondwaterputten",
			GeoViewer.scratch.urls.TNO_GRONDWATERSTANDEN,
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
			GeoViewer.scratch.urls.TNO_BOORGATEN,
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
			)
];
// Layers End

/** 3. Define the Toolbar to be shown within the Map. */
// See ToolbarBuilder.js : each string item points to a definition
// in GeoViewer.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
GeoViewer.options.map.toolbar = [
	{
		type: "featureinfo"
	},
	{
		type: "-"
	} ,
	{
		type: "pan"
	},
	{
		type: "zoomin"
	},
	{
		type: "zoomout"
	},
	{
		type: "zoomvisible"
	},
	{
		type: "-"
	} ,
	{
		type: "zoomprevious"
	},
	{
		type: "zoomnext"
	},
	{
		type: "-"
	},
	{
		type: "measurelength"
	},
	{
		type: "measurearea"
	}
];

// TODO find smart way to define themes without redefining layers

/**
 * Define themes
 *
 * Each theme contains FeatureTypes
 * FeatureTypes (with a geometry) contain (OpenLayers) Layers
 *
 * More aspects can be configured later.
 */
GeoViewer.scratch.themes = {
	TNO: {
		name: 'TNO'
		,
		abbrev: 'TNO'
		,
		featureTypes: {
			ZG: {
				name: 'Zuurgraad',
				layers: ['blanco']
			},
			BS: {
				name: 'Bodemsamenstelling',
				layers: ['blanco']
			},
			GW: {
				name: 'Grondwater',
				layers: ['tno_gw_putten']
			},
			BG: {
				name: 'Boorgaten',
				layers: ['tno_boorgaten']
			}
		}
	}
};

GeoViewer.treeConfig = [
	{
		// Include all BaseLayers present in map
		text:'Basis Kaarten',
		nodeType: "gx_baselayercontainer"
	},
	{
		nodeType: 'gv_themenode',
		theme: 'TNO',
		children:
				[
					{
						nodeType: "gx_featuretypecontainer",
						featureType: "ZG"
					},
					{
						nodeType: "gx_featuretypecontainer",
						featureType: "BS"
					},
					{
						nodeType: "gx_featuretypecontainer",
						featureType: "GW"
					},

					{
						nodeType: 'gx_featuretypecontainer',
						featureType: "BG"
					}
				]
	}
];

// Replace default layer browser DefaultOptions.js
// Pass our theme tree config as an option
/*GeoViewer.layout.items[0].items[0] =
 {
 xtype: 'gv_layerbrowserpanel',
 // Pass in our tree, if none specified the default config is used
 tree: GeoViewer.treeConfig
 };*/




