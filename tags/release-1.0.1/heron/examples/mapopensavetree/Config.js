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


/** api: example[mapopensavetree]
 *  Map Open and Save Layertree
 *  ---------------------------
 *  Open and Save a Heron map based on Web Map Context for WMS and TMS layers.
 *  Layertree and TMS layer are saved extended to WMC.
 */

/** This config assumes the DefaultOptionsNL.js to be included first!! */

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
    {type: "featureinfo", options: {
        //pressed: true,
        popupWindow: {
            width: 460,
            height: 200,
            featureInfoPanel: {
                showTopToolbar: true,
                // Option values are 'Table' and 'Detail', default is 'Table'
                displayPanels: ['Detail','Table'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                //  exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoJSON', 'WellKnownText'],
                exportFormats: ['CSV', 'GeoJSON', 'WellKnownText'],
                hideColumns: ['objectid', 'gid'],
                maxFeatures: 10,
                autoConfigMaxSniff: 10,

                // In case that the same layer would be requested more than once: discard the styles
                discardStylesForDups: true
            }
        }
    }},
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "-"},
    {type: "mapopen"},
    {type: "mapsave", options : {
        mime: 'text/xml',
        fileName: 'heron_map',
        fileExt: '.cml'
    }}
];

// Define a minimal tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
var treeTheme = [
	{
		text:'BaseMaps', expanded: true, children:
			[
				{nodeType: "gx_layer", layer: "Luchtfoto (PDOK)" },
				{nodeType: "gx_layer", layer: "TopRaster" },
                {nodeType: "gx_layer", layer: "OpenBasisKaart OSM" },
				{nodeType: "gx_layer", layer: "BRT Achtergrondkaart" },
                {nodeType: "gx_layer", layer: "Blanco", text: 'None' }
			]
	},
	{
		text:'Themes', children:
			[
				{
					text:'Weather', children:
						[
							{nodeType: "gx_layer", layer: "KNMI Radar"},
							{nodeType: "gx_layer", layer: "KNMI Radar Color" }
						]
				},
                {
                    text:'Recreation', children:
                        [

                            {nodeType: "gx_layer", layer: "Landelijke Fietsroutes" },
                            {nodeType: "gx_layer", layer: "Lange Afstands Wandelroutes" },
                            {nodeType: "gx_layer", layer: "Streekpaden" }
                        ]
                },
                {
                    text:'Ecology', children:
                        [
                            {nodeType: "gx_layer", layer: "Natura 2000" }
                        ]
                }

			]
	}
];

// Replace default layer browser DefaultConfig.js
// Pass our theme tree config as an option
Ext.namespace("Heron.options.layertree");

Heron.options.layertree.tree = treeTheme;

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 **/
Heron.layout = {
    xtype: 'panel',
    id: 'hr-container-main',
    layout: 'border',
    border: true,

    items: [
        {
            xtype: 'panel',

            id: 'hr-menu-left-container',
            layout: 'accordion',
            region: "west",
            width: 240,
            collapsible: true,
            split: false,
            border: false,
            items: [
                {
                    xtype: 'hr_layertreepanel',
                    contextMenu: [
                        {
                            xtype: 'hr_layernodemenulayerinfo'
                        },
                        {
                            xtype: 'hr_layernodemenuzoomextent'
                        },
                        {
                            xtype: 'hr_layernodemenuopacityslider'
                        }
                    ],

                    hropts: Heron.options.layertree
                }
            ]
        },
        {
            xtype: 'panel',

            id: 'hr-map-container',
            layout: 'border',
            region: 'center',
            width: '100%',
            collapsible: false,
            split: false,
            border: false,
            items: [
                {
                    xtype: 'hr_mappanel',
                    title: '&nbsp;',
                    id: 'hr-map',
                    region: 'center',
                    collapsible: false,
                    border: false,
                    hropts: Heron.options.map
                }
            ]
        },
        {
            xtype: 'panel',

            id: 'hr-menu-right-container',
            layout: 'accordion',
            region: "east",
            width: 240,
            collapsible: true,
            split: false,
            border: false,
            items: [
                {
                    xtype: 'hr_layerlegendpanel',
                    id: 'hr-layerlegend-panel',
                    defaults: {
                        useScaleParameter: true,
                        baseParams: {
                            FORMAT: 'image/png'
                        }
                    },
                    hropts: {
                        // Preload Legends on initial startup
                        // Will fire WMS GetLegendGraphic's for WMS Legends
                        // Otherwise Legends will be loaded only when Layer
                        // becomes visible. Default: false
                        prefetchLegends: false
                    }
                }
            ]
        }
    ]
};