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

/** api: example[fixedpanelslayout]
 *  FixedPanelsLayout
 *  -----------------
 *  An application with an alternative layout containing a fixed height
 *  LayerPanel and LegendPanel.
 */

/*****************************************************************************
 * OPENLAYER SETTINGS
 *****************************************************************************/

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;

/*****************************************************************************
 * EXTJS SETTINGS
 *****************************************************************************/

Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';

/*****************************************************************************
 * LAYERTREE
 * - With hidden baselayer container.
 *****************************************************************************/

Heron.options.layertree = {
    border: false,
    tree: [
        {
            nodeType: "gx_baselayercontainer",
            text: "Achtergrond laag",
            expanded: false,
            hidden: true
        },
        {
            nodeType: "gx_overlaylayercontainer",
            text: "Thema's",
            expanded: true
        }
    ]
}

/*****************************************************************************
 * MAP - GENERAL SETTINGS
 *****************************************************************************/

Heron.options.map.settings = {
    projection: 'EPSG:28992',
    units: 'm',
    resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
    maxExtent: '-285401.920, 22598.080, 595401.920, 903401.920',
    center: '155000,463000',
    xy_precision: 0,
    zoom: 2,
    theme: null,
    // Custom formatting of x coordinate text.
    formatX: function (lon, precision) {
        var s = '';
        if (precision > 0)
            s = ',' + '000000000000000000'.slice(0, precision);
        return 'x: ' + Ext.util.Format.number(lon, '0.000' + s + '/i');
    },
    // Custom formatting of y coordinate text.
    formatY: function (lat, precision) {
        var s = '';
        if (precision > 0)
            s = ',' + '000000000000000000'.slice(0, precision);
        return 'y: ' + Ext.util.Format.number(lat, '0.000' + s + '/i') + ' m.';
    },

    // Useful to always have permalinks enabled. Default is enabled with these settings.
    // MapPanel.getPermalink() returns current permalink.
    permalinks: {
        // The prefix to be used for parameters, e.g. map_x, default is 'map'.
        paramPrefix: 'map',
        // Encodes values of permalink parameters ? default false.
        encodeType: false,
        // Use Layer names i.s.o. OpenLayers-generated Layer Id's in Permalinks.
        prettyLayerNames: true
    }
};

/*****************************************************************************
 * MAP TOOLBAR
 * - FeatureInfo - only Grid panel, no export.
 *****************************************************************************/

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
    {type: "featureinfo", options: {
        hover: false,
        drillDown: true,
        popupWindow: {
            width: 320,
            height: 200,
            featureInfoPanel: {
                displayPanels: ['Table'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: [],
                maxFeatures: 10
            }
        }
    }},
    {type: "-"} ,
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"}
];

/*****************************************************************************
 * MAP STATUSBAR
 * - hide default mappanel bottom status bar.
 *****************************************************************************/

Heron.options.map.statusbar = null;

/*****************************************************************************
 * MAIN LAYOUT
 * - custom title bar with help link.
 * - fixed height LayerPanel.
 * - fixed height LegendPanel.
 * - alternative status bar.
 *****************************************************************************/

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) components.
 * Each component is either a container of components (xtype: 'panel', i.e. an ExtJS Panel)
 * or a specific leaf component like a map panel (xtype: 'hr_mappanel') or simple HTML
 * panel (xtype: 'hr_htmlpanel'). Each component has a 'xtype' string and component-specific options.
 * The 'xtype' defines the component widget class .
 * For a container-type (xtype: 'panel') the options should include a 'layout' (like 'border' or 'card',
 * and an array of 'items' with each element being a component (another container or a leaf widget component).
 *
 * In order to distinguish ExtJS-specific config options from those that are Heron-specific,
 * the later are prefixed with "hr". These are defined outside this file to allow quick custimization.
 *
 * Specific config options for ExtJS components can be found in the API docs:
 * http://docs.sencha.com/ext-js/3-4/#!/api
 *
 **/

Heron.layout = {
    xtype: 'panel',

    id: 'hr-container-main',
    layout: 'border',
    border: true,

    items: [
        {
            // Top panel.
            xtype: 'panel',
            region: "north",
            height: 50,
            layout: 'hbox',
            layoutConfig: {
                align: 'stretch',
                pack: 'start'
            },
            items: [
                {
                    // Logo.
                    xtype: 'panel',
                    width: 60,
                    border: false,
                    html: '<img  id="viewer_north_img" src="resources/logo.png" alt="Heron-mc"/>'
                },
                {
                    // Title.
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    html: '<div id="viewer_north_text">Heron Example - Fixed Panels Layout</div>'
                },
                {
                    // Help link.
                    xtype: 'panel',
                    flex: 1,
                    border: false,
                    html: '<a href="#" id="viewer_north_help" onclick="App.btn_HelpClicked()">Help</a>'
                }
            ]
        },
        {
            // Left panel.
            xtype: 'panel',
            id: 'hr-menu-left-container',
            layout: 'vbox',
            margins: '0',
            region: "west",
            width: 240,
            border: false,
            items: [
                { xtype: "panel",
                    flex: 1,
                    title: "&nbsp;",
                    layout: 'vbox',
                    width: "100%",
                    border: false,
                    items: [
                        {
                            // LayerTree.
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
                            region: 'north',
                            title: "Kaart thema's",
                            flex: 1,
                            width: "100%",
                            border: false,
                            // Optional, use internal default if not set.
                            hropts: Heron.options.layertree
                        },
                        {
                            // Legend.
                            xtype: 'hr_layerlegendpanel',
                            region: 'center',
                            flex: 1,
                            width: "100%",
                            id: 'hr-layerlegend-panel',
                            defaults: {
                                useScaleParameter: true,
                                baseParams: {
                                    FORMAT: 'image/png'
                                }
                            },
                            hropts: {
                                // Preload Legends on initial startup.
                                // Will fire WMS GetLegendGraphic's for WMS Legends.
                                // Otherwise Legends will be loaded only when Layer.
                                // becomes visible. Default: false.
                                prefetchLegends: false
                            }
                        }
                    ]
                }
            ]
        },
        {
            // Center panel.
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
                    // Map.
                    xtype: 'hr_mappanel',
                    id: 'hr-map2',
                    title: '&nbsp;',
                    region: 'center',
                    collapsible: false,
                    border: false,
                    hropts: Heron.options.map
                }
            ]
        },
        {
            // Bottom panel.
            xtype: 'panel',
            id: 'hr-menu-south-container',
            region: 'south',
            border: false,
            bodyStyle: (Ext.isIE) ? 'display:none;' : '',
            bbar: {
                xtype: 'toolbar',
                items: [
                    '->',
                    {
                        // X coordinate.
                        xtype: 'tbtext',
                        id: 'x-coord',
                        text: 'x: 0',
                        width: 60
                    }, {
                        // Y coordinate.
                        xtype: 'tbtext',
                        id: 'y-coord',
                        text: 'y: 0 m.',
                        width: 80
                    }, {
                        // Use a dummy text item due to the resize-handle in FF.
                        xtype: 'tbtext',
                        width: 10,
                        text: '&nbsp; &nbsp;'
                    }
                ]
            }
        }
    ]
};
