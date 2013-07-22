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

/** api: example[printvector]
 *  PrintVector
 *  -----------
 *  Printing with popup dialog for vector layer and selected features.
 */

/** Zoom into center Amersfoort. */
Heron.options.map.settings.zoom = 12;

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
    {type: "featureinfo", options: {
        popupWindow: {
            width: 360,
            height: 200,
            featureInfoPanel: {
                showTopToolbar: true,

                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'GeoJSON', 'WellKnownText'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                // exportFormats: ['CSV', 'XLS'],
                maxFeatures: 10,

                // In case that the same layer would be requested more than once: discard the styles
                discardStylesForDups: true
            }
        }
    }},
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "-"} ,
    {type: "printdialog", options: {url: 'http://kademo.nl/print/pdf28992'
        // , showTitle: true
        // , mapTitle: 'My Header - Print Dialog'
        // , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
        // , showComment: true
        // , mapComment: 'My Comment - Print Dialog'
        // , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
        // , showFooter: true
        // , mapFooter: 'My Footer - Print Dialog'
        // , mapFooterYAML: "mapFooter"	// MapFish - field name in config.yaml - default is: 'mapFooter'
        // , showRotation: true
        // , showLegend: true
        // , showLegendChecked: true
        // , mapLimitScales: false
    }}
];

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 **/
Heron.layout = {
    xtype: 'panel',
    id: 'hr-container-main',
    layout: 'border',

    items: [
        {
            xtype: 'panel',

            id: 'hr-menu-left-container',
            layout: 'accordion',
            region: "west",
            width: 240,
            collapsible: true,
            split: true,
            border: false,
            items: [
                {
                    xtype: 'hr_layertreepanel',
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
            collapsible: true,
            split: true,
            border: false,
            items: [
                {
                    xtype: 'hr_mappanel',
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
            split: true,
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


Ext.onReady(function () {
    // create a panel and add the map panel and grid panel
    // inside it
    new Ext.Window({
        title: __('Click Map or Grid to Select - Double Click to Zoom to feature'),
        layout: "fit",
        x: 50,
        y: 100,
        height: 400,
        width: 280,
        items: [
            {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                title: __('Parcels'),
                header: false,
                columns: [
                    {
                        header: "Fid",
                        width: 60,
                        dataIndex: "id",
                        xtype: 'numbercolumn',
                        format: '0'
                    },
                    {
                        header: "ObjectNum",
                        width: 180,
                        dataIndex: "objectnumm"
                    }
                ],
                hropts: {
                    storeOpts: {
                        proxy: new GeoExt.data.ProtocolProxy({
                            protocol: new OpenLayers.Protocol.HTTP({
                                url: 'data/parcels.json',
                                format: new OpenLayers.Format.GeoJSON()
                            })
                        }),
                        autoLoad: true
                    },
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    separateSelectionLayer: true
                }
            }
        ]
    }).show();
});

