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
/** This config assumes the DefaultOptionsNL.js to be included first!! */

Ext.namespace("Heron.options.map.settings");

/** api: example[simpletimeslider]
 *  SimpleTimeSlider
 *  ----------------
 *  Visualize WMS Layers supporting WMS Time using a slider and/or explicit time setting.
 */

// Alter some map settings in order that parcels are displayed
Heron.options.map.settings.zoom = 2;
Heron.scratch.layermap.knmi_radar_color[4].visibility = true;

// Define a minimal tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
var treeTheme = [
    {
        text: 'BaseLayers', expanded: true, children: [
        {nodeType: "gx_layer", layer: "OpenBasisKaart OSM", text: 'OpenBasisKaart OSM' },
        {nodeType: "gx_layer", layer: "TopRaster", text: 'TopoRaster' },
        {nodeType: "gx_layer", layer: "Luchtfoto (PDOK)", text: 'Luchtfoto (PDOK)' },
        {nodeType: "gx_layer", layer: "Blanco", text: 'Blanc' }
    ]
    },
    {
        text: 'Weather', expanded: true, children: [
        {nodeType: "gx_layer", layer: "KNMI Radar Color", text: 'Rain Radar (Coloured)' },
        {nodeType: "gx_layer", layer: "KNMI Radar", text: 'Rain Radar' }
    ]
    }

];

// Replace default layer browser DefaultConfig.js
// Pass our theme tree config as an option
Ext.namespace("Heron.options.layertree");

Heron.options.layertree.tree = treeTheme;

Ext.namespace("Heron");
Ext.namespace("Heron.options");
Ext.namespace("Heron.options.layertree");


/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 *
 **/
Heron.layout = {
    xtype: 'panel',

    /* Optional ExtJS Panel properties here, like "border", see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',
    border: false,

    /** Any classes in "items" and nested items are automatically instantiated (via "xtype") and added by ExtJS. */
    items: [
        {
            xtype: 'panel',
            id: 'hr-menu-left-container',
            layout: 'accordion',
            region: "west",
            width: 240,
            collapsible: true,
            border: false,
            items: [
                {
                    xtype: 'hr_layertreepanel',
                    border: true,

                    // The LayerTree tree nodes appearance: default is ugly ExtJS document icons
                    // Other values are 'none' (no icons). May be overridden in specific 'gx_layer' type config.
                    layerIcons: 'bylayertype',

                    // Optional, use internal default if not set
                    hropts: Heron.options.layertree
                }
            ]
        },
        {
            xtype: 'panel',
            id: 'hr-map-and-info-container',
            layout: 'border',
            region: 'center',
            width: '100%',
            collapsible: false,
            split: false,
            border: false,
            items: [
                {
                    xtype: 'hr_mappanel',
                    id: 'hr-map',
                    title: '&nbsp;',
                    region: 'center',
                    collapsible: false,
                    border: false,
                    hropts: Heron.options.map
                }
            ]
        },
        {
            xtype: 'panel',

            id: 'hr-right-main',
            layout: 'border', //vertical box for left column
            collapsible: true,
            region: 'east',
            width: 320,
            border: false,
            items: [
                {
                    xtype: 'panel',
                    flex: 1, //gives precedence, and "flexes" to fill space
                    height: 140,
                    region: 'north',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'hr_simpletimesliderpanel',
                            title: 'Rain in the Netherlands since June 2014',
                            border: false,
                            startDateTime: '2014-06-01T00:00:00Z',
                            // endDateTime: '2014-09-01T00:00:00Z',  default is current time
                            stepTime: 'PT1H',
                            dateTime: '2014-08-08T16:00:00Z',
                            layerNames: ["KNMI Radar Color", "KNMI Radar"]
                        }
                    ]
                },
                {
                    xtype: 'hr_layerlegendpanel',
                    id: 'hr-layerlegend-panel',
                    region: 'center',
                    border: false,
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

