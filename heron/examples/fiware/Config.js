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

/** api: example[fiware]
 *  FIWARE NGSI
 *  -----------
 *  Show FIWARE Entities from Orion Context Broker via NGSI10.
 */

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';

/*
 * Common settings for MapPanel
 * These will be assigned as "hropts" within the MapPanel config
 */
Ext.namespace("Heron.options.map");

/** All Layers including Fiware NGSI10 Entities Layer. */
Heron.options.map.layers = [

    new OpenLayers.Layer.WMS(
        "World schematic",
        'http://www2.demis.nl/worldmap/wms.asp?',
        {layers: "Bathymetry,Topography", format: 'image/png', version: '1.0.0'},
        {singleTile: true, isBaseLayer: true, visibility: true, noLegend: true, transitionEffect: 'resize'}
    ),

/** NGSI10 Entity Layer from Fiware Orion Context Broker. */
    new OpenLayers.Layer.Vector('Fiware Entities', {
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.NGSI10({
            url: 'http://sensors.geonovum.nl:1026/v1/queryContext',
            // url: 'http://orion.lab.fi-ware.org:1026/ngsi10/queryContext',
            // data: {"entities": [{"isPattern": "true", "id": "b"}]},
            // authToken: '<personal fiware auth token string>',
            refreshMillis: 4000,
            fiwareService: 'fiwareiot'
        }),
        styleMap: new OpenLayers.StyleMap({
            "default": new OpenLayers.Style(null, {

                rules: [new OpenLayers.Rule({
                    title: 'Entity',
                    symbolizer: {
                        "Point": {
                            fillColor: '#37f',
                            fillOpacity: 0.8,
                            graphicName: "circle",
                            strokeColor: '#03c',
                            strokeWidth: 2,
                            graphicZIndex: 1,
                            pointRadius: 5,
                            label: "${label} ${temperature}C",
                            fontColor: "#222222",
                            fontSize: "12px",
                            fontFamily: "Courier New, monospace",
                            fontWeight: "bold",
                            //labelAlign: "cm",
                            labelXOffset: "12",
                            labelYOffset: "12",
                            // labelOutlineColor: "white",
                            labelOutlineWidth: 2

                        }
                    }
                })]
            })
        }),

        projection: new OpenLayers.Projection("EPSG:4326")
    })
];

Heron.options.map.settings = {
    projection: 'EPSG:4326',
    units: 'dd',
    center: '5.37241, 52.152435',
    xy_precision: 3,
    max_features: 10,
    zoom: 8,
    theme: null
};

// See ToolbarBuilder.js : each string item points to a definition
var sthURL = 'http://sensors.geonovum.nl:8666';
var entityType = 'thing';
Heron.options.map.toolbar = [
    {
        type: "featureinfo", options: {
        pressed: true,
        enabled: true,
        popupWindow: {
            width: 380,
            height: 400,
            featureInfoPanel: {
                showTopToolbar: true,
                displayPanels: ['Detail'],

                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'GeoJSON', 'WellKnownText', 'Shapefile', 'GeoPackage'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                // exportFormats: ['CSV', 'XLS'],
                maxFeatures: 10,

                // In case that the same layer would be requested more than once: discard the styles
                discardStylesForDups: true,
                gridCellRenderers: [
                    {
                        // Example: supply your own function, parms as in ExtJS ColumnModel
                        featureType: 'Fiware Entities',
                        attrName: 'temperature',
                        renderer: {
                            // http://sensors.geonovum.nl:8666/STH/v1/contextEntities/type/thing/id/d/attributes/temperature?lastN
                            fn: function (value, metaData, record, rowIndex, colIndex, store) {
                                var args = '\'' + sthURL + '\', \'' + entityType + '\', \'' + record.data['id'] + '\', \'temperature\'';
                                return value + ' &nbsp;&nbsp;<a href="#" onClick="sthShowTimeseries(' + args + ')">[Show timeseries]</a>';
                            },
                            options: {}
                        }
                    },
                    {
                        // Example: supply your own function, parms as in ExtJS ColumnModel
                        featureType: 'Fiware Entities',
                        attrName: 'humidity',
                        renderer: {
                            // http://sensors.geonovum.nl:8666/STH/v1/contextEntities/type/thing/id/d/attributes/temperature?lastN
                            fn: function (value, metaData, record, rowIndex, colIndex, store) {
                                var args = '\'' + sthURL + '\', \'' + entityType + '\', \'' + record.data['id'] + '\', \'humidity\'';
                                return value + ' &nbsp;&nbsp;<a href="#" onClick="sthShowTimeseries(' + args + ')">[Show timeseries]</a>';
                            },
                            options: {}
                        }
                    },
                    {
                        // Example: supply your own function, parms as in ExtJS ColumnModel
                        featureType: 'Fiware Entities',
                        attrName: 'pm10',
                        renderer: {
                            // http://sensors.geonovum.nl:8666/STH/v1/contextEntities/type/thing/id/d/attributes/temperature?lastN
                            fn: function (value, metaData, record, rowIndex, colIndex, store) {
                                var args = '\'' + sthURL + '\', \'' + entityType + '\', \'' + record.data['id'] + '\', \'pm10\'';
                                return value + ' &nbsp;&nbsp;<a href="#" onClick="sthShowTimeseries(' + args + ')">[Show timeseries]</a>';
                            },
                            options: {}
                        }
                    },
                    {
                        // Example: supply your own function, parms as in ExtJS ColumnModel
                        featureType: 'Fiware Entities',
                        attrName: 'pm2_5',
                        renderer: {
                            // http://sensors.geonovum.nl:8666/STH/v1/contextEntities/type/thing/id/d/attributes/temperature?lastN
                            fn: function (value, metaData, record, rowIndex, colIndex, store) {
                                var args = '\'' + sthURL + '\', \'' + entityType + '\', \'' + record.data['id'] + '\', \'pm2_5\'';
                                return value + ' &nbsp;&nbsp;<a href="#" onClick="sthShowTimeseries(' + args + ')">[Show timeseries]</a>';
                            },
                            options: {}
                        }
                    }
                ]

            }
        }
    }
    },

    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},

    {type: "help", options: {tooltip: 'Help and info for this example', contentUrl: 'help.html'}}
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
            layout: 'vbox',
            layoutConfig: {
                align: 'stretch',
                pack: 'start'
            },
            region: "west",
            width: 240,
            collapsible: true,
            border: false,
            items: [
                {
                    xtype: 'hr_layertreepanel',
                    flex: 4,
                    expanded: true,
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
            xtype: 'hr_layerlegendpanel',
            region: "east",
            width: 240,
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
};
