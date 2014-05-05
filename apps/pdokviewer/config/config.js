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

// No Pink Tiles
OpenLayers.Util.onImageLoadErrorColor = "transparent";

/** Proxy: required when non-image content is requested from other origins then this app. */
OpenLayers.ProxyHost = "proxy/proxy.cgi?url=";
//OpenLayers.ProxyHost = "../proxy/proxy.jsp?";


/** Defines the layout of the entire PDOK Viewer as a JSON struct.*/
Heron.layout = {
    xtype: 'panel',
    renderTo: 'mapdiv',
    height: 650,

    /* Specificeer hier het pad of remote URL naar merged of unmerged XML Heron Map Context file. */
    mapContextUrl: 'config/default.xml',

    /* Optional ExtJS Panel properties, see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',
    border: true,
    items: [
        {
            xtype: 'panel',
            id: 'hr-menu-left-container',
            layout: 'accordion',
            region: 'west',
            width: 200,
            collapsible: true,
            split: true,
            border: false,
            items: [
                {
                    /** Shows selected layers stacked */
                    xtype: 'hr_activelayerspanel',
                    // height: 200,
                    collapsed: true,
                    flex: 2,
                    hropts: {
                        /**
                         * Defines the custom component added
                         * under the standard layer node.
                         */
                        component: {
                            xtype: "gx_opacityslider",
                            showTitle: false,
                            plugins: new GeoExt.LayerOpacitySliderTip(),
                            width: 160,
                            inverse: false,
                            aggressive: false,
                            style: {
                                marginLeft: '18px'
                            }
                        }
                    }
                },
                {
                    /** Shows the tree structure for all Layers. */
                    xtype: 'hr_layertreepanel',
                    // height: 300,
                    id: 'hr_treelayer',
                    flex: 1,

                    // The LayerTree tree nodes appearance: default is ugly ExtJS document icons
                    // Other values are 'none' (no icons). May be overridden in specific 'gx_layer' type config.
                    layerIcons: 'bylayertype',

                    contextMenu: [
                        {
                            xtype: 'hr_layernodemenulayerinfo'
                        },
//                                {
//                                    xtype: 'hr_layernodemenuzoomextent'
//                                },
//                                {
//                                    xtype: 'hr_layernodemenustyle'
//                                },
                        {
                            xtype: 'hr_layernodemenuopacityslider'
                        }
                    ],

                    // LayerTree and Map config is taken from global Heron context
                    // See Heron.layout.mapContextUrl above.
                    useMapContext: true
                    /* LayerTree is populated from .xml config file(s). */
                    // hropts: Heron.options.layertree
                }
//                ,
//                {
//                    /** The TreePanel to be populated from a GetCapabilities request. */
//                    title: 'Capabilities',
//                    xtype: 'pdok_capabilitiestreepanel',
//                    useArrows: true,
//                    animate: true,
//                    hropts: {
//                        preload: false
//                    }
//                }
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
                    region: 'center',
                    collapsible: false,
                    border: false,

                    // MapOptions (settings+Layers) is populated from .xml config file(s).
                    // See Heron.layout.mapContextUrl above.
                    useMapContext: true,
                    hropts: {
                        toolbar: [
                            {
                                type: "featureinfo", options: {
                                popupWindow: {
                                    pressed: true,
                                    title: 'Objectinformatie',
                                    width: 500,
                                    height: 200,
                                    featureInfoPanel: {
                                        showTopToolbar: true,

                                        // Option values are 'Grid', 'Tree' and 'XML', default is 'Grid' (results in no display menu)
                                        displayPanels: ['Table', 'Detail'],
                                        // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                                        exportFormats: [],
                                        // exportFormats: ['CSV', 'XLS'],
                                        hideColumns: ['objectid', 'gid'],

                                        maxFeatures: 10,
                                        autoConfigMaxSniff: 10,

                                        discardStylesForDups: true
                                    }
                                }
                            }
                            },
                            {
                                type: "-"
                            },
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
                            },
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
                            },
                            {
                                type: "coordinatesearch",
                                options: {
                                    onSearchCompleteZoom: 10,
                                    localIconFile: 'redpin.png',
                                    fieldLabelX: 'x',
                                    fieldLabelY: 'y'
                                }
                            },
                            {
                                type: "namesearch",
                                // Optional options, see OpenLSSearchCombo.js
                                options: {
                                    xtype: 'hr_openlssearchcombo',
                                    id: "pdoksearchcombo",
                                    width: 200,
                                    listWidth: 400,
                                    minChars: 4,
                                    queryDelay: 240,
                                    zoom: 11,
                                    emptyText: __('Zoek een adres'),
                                    tooltip: __('Zoek een adres met de BAG Geocodeerservice'),
                                    url: 'http://geodata.nationaalgeoregister.nl/geocoder/Geocoder?max=5'
                                }
                            }
                        ]
                    }
                }
            ]
        },
        {
            xtype: 'panel',
            id: 'hr-menu-right-container',
            layout: 'accordion',
            region: 'east',
            width: 200,
            collapsible: true,
            split: true,
            border: false,
            items: [
                {
                    /** Shows Legends for selected Layers. */
                    xtype: 'hr_layerlegendpanel',
                    defaultStyleIsFirst: true,
                    flex: 3,
                    id: 'legend_panel',
                    collapsible: false,
                    hropts: {prefetchLegends: false}
                }
            ]
        }
    ]
};
