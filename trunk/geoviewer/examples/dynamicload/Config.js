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
Ext.namespace("GeoViewer.Map");
GeoViewer.Map.layers = [];
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
//See: http://wiki.geonovum.nl/index.php/Tiling for details on the dutch, PDOK tiling standard
GeoViewer.Map.options.TILE_ORIGIN_PDOK = new OpenLayers.LonLat(-285401.920, 22598.080);

Ext.namespace("GeoViewer.Catalog");
GeoViewer.Catalog.urls = [];
GeoViewer.Catalog.layers = [];
GeoViewer.Catalog.urls.PDOK_BASE = 'http://acceptatie.geodata.nationaalgeoregister.nl/';
GeoViewer.Catalog.urls.PDOK_TMS = GeoViewer.Catalog.urls.PDOK_BASE + 'tms/';
GeoViewer.Catalog.urls.TNO_GRONDWATERSTANDEN = 'http://www.dinoservices.nl/wms/dinomap/M07M0046?';
GeoViewer.Catalog.urls.TNO_BOORGATEN = 'http://www.dinoservices.nl/wms/dinomap/M07M0044?';


/**
 * Dummy layer, zal vervangen worden wanneer alle url's zijn ingevuld
 **/
GeoViewer.Catalog.layers.blanco = new OpenLayers.Layer.Image(
		"Blanco",
		Ext.BLANK_IMAGE_URL,
		GeoViewer.Map.options.MAX_EXTENT,
		new OpenLayers.Size(10, 10),
{
	resolutions: GeoViewer.Map.options.RESOLUTIONS,
	isBaseLayer: true,
	visibility: false,
	displayInLayerSwitcher: true
}
		);

/*
 * TNO
 * Grondwaterstanden
 * Lithologie (boorgaten)
 */

GeoViewer.Catalog.layers.tno_gw_putten = new OpenLayers.Layer.WMS(
		"TNO Grondwaterputten",
		GeoViewer.Catalog.urls.TNO_GRONDWATERSTANDEN,
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
		);
GeoViewer.Map.layers.push(GeoViewer.Catalog.layers.tno_gw_putten);

GeoViewer.Catalog.layers.tno_boorgaten = new OpenLayers.Layer.WMS(
		"TNO Boorgaten",
		GeoViewer.Catalog.urls.TNO_BOORGATEN,
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
		);
GeoViewer.Map.layers.push(GeoViewer.Catalog.layers.tno_boorgaten);

// PDOK START
GeoViewer.Catalog.layers.pdok_brtachtergrondkaart_tms = new OpenLayers.Layer.TMS(
		"Basisregistratie topografie",
		GeoViewer.Catalog.urls.PDOK_TMS,
{
	layername: 'brtachtergrondkaart',
	type: 'png',
	isBaseLayer: true,
	visibility: false,
	zoomOffset: 2,
	tileOrigin: GeoViewer.Map.options.TILE_ORIGIN_PDOK
}
		);
GeoViewer.Map.layers.push(GeoViewer.Catalog.layers.pdok_brtachtergrondkaart_tms);

// PDOK END

/**
 * Define themes
 *
 * Each theme contains FeatureTypes
 * FeatureTypes (with a geometry) contain (OpenLayers) Layers
 *
 * More aspects can be configured later.
 */
GeoViewer.Catalog.themes = {
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
		nodeType: 'gx_themenode',
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

// Replace default layer browser DefaultLayout.js
// Pass our theme tree config as an option
GeoViewer.layout.items[0].items[0] =
{
	xtype: 'gv_layerbrowserpanel',
	// Pass in our tree, if none specified the default config is used
	tree: GeoViewer.treeConfig
};


// See ToolbarBuilder.js : each string item points to a definition
// in GeoViewer.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
GeoViewer.Map.toolbar = [
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

