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


/** api: example[featureinfopopup]
 *  FeatureInfoPopup
 *  ----------------
 *  Show WMS GetFeatureInfo in popup Window when clicking the Map.
 */


// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
    {type: "featureinfo", options: {
        pressed: true,
        popupWindow: {
            width: 320,
            height: 200,
//            minimizable: true,
//            tools: [
//                {
//                    id: 'restore',
//                    hidden: true,
//                    handler: function (evt, toolEl, owner, tool) {
//                        var window = owner;
//                        window.expand('', false);
//                        window.setWidth(owner.winWidth);
//                        window.center();
//                        owner.isMinimized = false;
//                        this.show();
//                        // this.nextSibling().show();
//                    }
//                },
//                {
//                    id: 'minimize',
//                    handler: function (evt, toolEl, owner, tool) {
//                        var window = owner;
//                        window.collapse();
//                        owner.winWidth = window.getWidth();
//                        window.setWidth(150);
//                        window.alignTo(Ext.getBody(), 'bl-bl');
//                        this.hide();
//                        // this.previousSibling().show();
//                        owner.isMinimized = true;
//                    }
//                }
//            ],
            featureInfoPanel: {
                showTopToolbar: true,
                displayPanels: ['Table'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                //  exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoJSON', 'WellKnownText'],
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoJSON', 'WellKnownText'],
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
    {type: "-"}
];

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

