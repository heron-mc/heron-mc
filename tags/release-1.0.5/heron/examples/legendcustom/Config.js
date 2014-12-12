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

Ext.namespace("Heron");


Ext.namespace("Heron.options.map");
Heron.options.map.settings = {
    projection: 'EPSG:4326',
    units: 'm',
//    maxExtent: '-104929,-56303,128235,113521',
    center: [-95.8506355, 37.163851],
    zoom: 15
};


/** api: example[legendcustom]
 *  Custom Legend
 *  -------------
 *  Demonstrates how to configure a custom legend image as URL for a Layer or hide the standard legend of the Layer.
 */

/**
 * Define a minimal Heron app: just a Map with LegendPanel. Ok, the legend image does not
 * really match the map...
 *
 **/
Heron.layout = {
    xtype: 'panel',

    /* Optional ExtJS Panel properties here, like "border", see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',
    border: false,
    items: [

        {
            xtype: 'hr_mappanel',
            region: "center",

            /** Below are Heron-specific settings for the MapPanel (xtype: 'hr_mappanel') */
            hropts: {
                settings: {
                    projection: 'EPSG:4326',
                    restrictedExtent: [-180, 10, -60, 80],
//                    maxExtent : [-180, 5, 0, 90],
                    center: [-120, 35],
                    zoom: 3
                },
                layers: [
                    // Using the new config method without "new"
                    ["OpenLayers.Layer.WMS", "World Map",
                        "http://www2.demis.nl/WMS/wms.asp?WMS=WorldMap",
                        {layers: 'Coastlines', format: 'image/png' },
                        { metadata: {
                            legend: {
                                // Hide the legend for this layer
                                hideInLegend: true
                            }
                        }
                        }
                    ],

                    new OpenLayers.Layer.WMTS({
                        name: "Earth (WMTS) ",
                        url: "http://demo.opengeo.org/geoserver/gwc/service/wmts?",
                        layer: "ne:NE1_HR_LC_SR_W_DR",
                        matrixSet: "EPSG:4326",
                        matrixIds: ["EPSG:4326:0", "EPSG:4326:1", "EPSG:4326:2", "EPSG:4326:3", "EPSG:4326:4", "EPSG:4326:5", "EPSG:4326:6", "EPSG:4326:7", "EPSG:4326:8", "EPSG:4326:9", "EPSG:4326:10", "EPSG:4326:11", "EPSG:4326:12", "EPSG:4326:13", "EPSG:4326:14", "EPSG:4326:15", "EPSG:4326:16", "EPSG:4326:17", "EPSG:4326:18", "EPSG:4326:19", "EPSG:4326:20", "EPSG:4326:21"],
                        format: "image/png",
                        visibility: true,
                        style: "_null",
                        opacity: 0.7,
                        isBaseLayer: false,
                        metadata: {
                            legend: {
                                // Use a fixed URL as legend
                                legendURL: 'earthlegend.png',
                                hideInLegend: false
                            }
                        }
                    }),

                    ["OpenLayers.Layer.WMS", "States",
                        "http://demo.opengeo.org/geoserver/ows?",
                        {
                            layers: 'topp:states',
                            format: 'image/png',
                            transparent: true
                        },
                        {
                            isBaseLayer: false,
                            visibility: true,
                            metadata: {
                                legend: {
                                    // Use a fixed URL as legend
                                    legendURL: 'statespopulationlegend.png',
                                    hideInLegend: false
                                }
                            }
                        }
                        ],

                    new OpenLayers.Layer.WMS(
                        "10m Places",
                        "http://demo.opengeo.org/geoserver/ows?",
                        {
                            layers: 'osm:ne_10m_populated_places',
                            format: 'image/png',
                            transparent: true
                        },
                        {
                            isBaseLayer: false,
                            visibility: true,
                            metadata: {
                                legend: {
                                    // Use a fixed URL as legend
                                    legendURL: 'legendCities.png',
                                    hideInLegend: false
                                }
                            }
                        }
                    )
                ]
            }
        },
        {
            xtype: 'hr_layerlegendpanel',
            region: "east",
            width: 240,
            collapsible: true,
            split: false,
            border: true,
            defaults: {
                useScaleParameter: true,
                baseParams: {
                    FORMAT: 'image/png'
                }
            },
            hropts: {
                // Preload Legends on initial startup
                // Will fetch legend images via WMS GetLegendGraphic's for WMS Legends
                // or custom URLs.
                // Otherwise Legends will be loaded only when Layer
                // becomes visible. Default: false
                prefetchLegends: true
            }
        }
    ]

};
