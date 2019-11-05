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

/** api: example[arcgisrest]
 *  ArcGIS REST
 *  ----------
 *  ArcGIS REST (9.3+) raster maps with different projections.
 */

Ext.namespace("Heron");
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

/** Based on example: http://dev.openlayers.org/examples/arcgis93rest.html */


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
                    ]
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
                    hropts: {
                        settings:
                            {
                                projection: 'EPSG:900913',
                                displayProjection: new OpenLayers.Projection("EPSG:4326"),
                                units: 'm',
                                maxExtent: '-20037508.34, -20037508.34, 20037508.34, 20037508.34',
                                center: '-9766409, 4130860',
                                maxResolution: 'auto',
                                minResolution: 1.194328566955879,
                                xy_precision: 5,
                                zoom: 6,
                                theme: null
                            },

                        layers: [
                            /*
                             * Basemap OpenStreetMap
                             */
                            new OpenLayers.Layer.OSM('OpenStreetMap - Wikimedia', 'https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}.png'),
                            new OpenLayers.Layer.ArcGIS93Rest("ArcGIS REST ESRI Highways",
                                "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/export",
                                {
                                    layers: "show:0",
                                    transparent: true
                                },
                                {
                                    isBaseLayer: false,
                                    singleTile: true,
                                    layerProjection: new OpenLayers.Projection("EPSG:4326"),
                                    visibility: true
                                }
                            ),
                            new OpenLayers.Layer.ArcGIS93Rest("ArcGIS REST ESRI States",
                                "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/export",
                                {
                                    layers: "show:1",
                                    transparent: true
                                },
                                {
                                    isBaseLayer: false,
                                    singleTile: true,
                                    layerProjection: new OpenLayers.Projection("EPSG:4326"),
                                    visibility: true
                                }
                            ),
                            new OpenLayers.Layer.ArcGIS93Rest("ArcGIS REST ESRI Counties",
                                "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/export",
                                {
                                    layers: "show:2",
                                    transparent: true
                                },
                                {
                                    isBaseLayer: true,
                                    singleTile: true,
                                    layerProjection: new OpenLayers.Projection("EPSG:4326"),
                                    visibility: false
                                }
                            )
                        ],
                        toolbar: [
                            {
                                type: "featureinfo", options: {
                                    popupWindow: {
                                        width: 360,
                                        height: 200,
                                        featureInfoPanel: {
                                            showTopToolbar: true,
                                            displayPanels: ['Table'],

                                            // Should column-names be capitalized? Default true.
                                            columnCapitalize: true,

                                            // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                                            exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoJSON', 'WellKnownText'],
                                            // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                                            // exportFormats: ['CSV', 'XLS'],
                                            maxFeatures: 10
                                        }
                                    }
                                }
                            },
                            {type: "-"},
                            {type: "pan"},
                            {type: "zoomin"},
                            {type: "zoomout"},
                            {type: "zoomvisible"},
                            {type: "-"},
                            {type: "zoomprevious"},
                            {type: "zoomnext"},
                            {type: "-"},
                            {type: "measurelength", options: {geodesic: true}},
                            {type: "measurearea", options: {geodesic: true}}
                        ]
                    }
                },
                {
                    xtype: 'hr_htmlpanel',
                    id: 'hr-info-west',
                    region: 'east',
                    width: '20%',
                    html: '<p>Example ESRI ArcGIS REST raster.</p><p>See the <a href="Config.js">Config.js</a> how example is made.</p><p><strong>NB the ESRI Layers have a restricted image width of 2048, resize your window if you see pink tile.</strong></p>',
                    preventBodyReset: true,
                    title: 'Info'
                }
            ]
        }

    ]
};
