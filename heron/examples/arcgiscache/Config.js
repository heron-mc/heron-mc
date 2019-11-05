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

/** api: example[arcgistiles]
 *  ArcGIS Tiles
 *  ------------
 *  Use ArcGIS Cache tiles (AGS) within a Heron app.
 */

Ext.namespace("Heron");
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

/** Based on example: https://github.com/openlayers/ol2/blob/master/examples/arcgiscache_ags.html */
var layerInfo = {
    "currentVersion": 10.01,
    "serviceDescription": "This worldwide street map presents highway-level data for the world and street-level data for the United States, Canada, Japan, Southern Africa, and a number of countries in Europe and elsewhere. This comprehensive street map includes highways, major roads, minor roads, railways, water features, administrative boundaries, cities, parks, and landmarks, overlaid on shaded relief imagery for added context. The street map was developed by ESRI using ESRI basemap data, AND road data, USGS elevation data, and UNEP-WCMC parks and protected areas for the world, and Tele Atlas Dynamap� and Multinet� street data for North America and Europe. Coverage for street-level data in Europe includes Andorra, Austria, Belgium, Czech Republic, Denmark, France, Germany, Great Britain, Greece, Hungary, Ireland, Italy, Luxembourg, Netherlands, Northern Ireland (Belfast only), Norway, Poland, Portugal, San Marino, Slovakia, Spain, Sweden, and Switzerland. Coverage for street-level data elsewhere in the world includes China (Hong Kong only), Colombia, Egypt (Cairo only), Indonesia (Jakarta only), Japan, Mexico (Mexico City only), Russia (Moscow and St. Petersburg only), South Africa, Thailand, and Turkey (Istanbul and Ankara only). For more information on this map, visit us \u003ca href=\"http://goto.arcgisonline.com/maps/World_Street_Map \" target=\"_new\"\u003eonline\u003c/a\u003e.",
    "mapName": "Layers",
    "description": "This worldwide street map presents highway-level data for the world and street-level data for the United States, Canada, Japan, Southern Africa, most countries in Europe, and several other countries. This comprehensive street map includes highways, major roads, minor roads, one-way arrow indicators, railways, water features, administrative boundaries, cities, parks, and landmarks, overlaid on shaded relief imagery for added context. The map also includes building footprints for selected areas in the United States and Europe and parcel boundaries for much of the lower 48 states.\n\nThe street map was developed by ESRI using ESRI basemap data, DeLorme base map layers, AND road data, USGS elevation data, UNEP-WCMC parks and protected areas for the world, Tele Atlas Dynamap� and Multinet� street data for North America and Europe, and First American parcel data for the United States. Coverage for street-level data in Europe includes Andorra, Austria, Belgium, Czech Republic, Denmark, France, Germany, Great Britain, Greece, Hungary, Ireland, Italy, Luxembourg, Netherlands, Norway, Poland, Portugal, San Marino, Slovakia, Spain, Sweden, and Switzerland. Coverage for street-level data elsewhere in the world includes China (Hong Kong only), Colombia, Egypt (Cairo only), Indonesia (Jakarta only), Japan, Mexico, Russia, South Africa, Thailand, and Turkey (Istanbul and Ankara only). For more information on this map, visit us online at http://goto.arcgisonline.com/maps/World_Street_Map\n",
    "copyrightText": "Sources: ESRI, DeLorme, AND, Tele Atlas, First American, ESRI Japan, UNEP-WCMC, USGS, METI, ESRI Hong Kong, ESRI Thailand, Procalculo Prosis",
    "layers": [
        {
            "id": 0,
            "name": "World Street Map",
            "parentLayerId": -1,
            "defaultVisibility": true,
            "subLayerIds": null,
            "minScale": 0,
            "maxScale": 0
        }
    ],
    "tables": [],
    "spatialReference": {
        "wkid": 102100
    },
    "singleFusedMapCache": true,
    "tileInfo": {
        "rows": 256,
        "cols": 256,
        "dpi": 96,
        "format": "JPEG",
        "compressionQuality": 90,
        "origin": {
            "x": -20037508.342787,
            "y": 20037508.342787
        },
        "spatialReference": {
            "wkid": 102100
        },
        "lods": [
            {"level": 0, "resolution": 156543.033928, "scale": 591657527.591555},
            {"level": 1, "resolution": 78271.5169639999, "scale": 295828763.795777},
            {"level": 2, "resolution": 39135.7584820001, "scale": 147914381.897889},
            {"level": 3, "resolution": 19567.8792409999, "scale": 73957190.948944},
            {"level": 4, "resolution": 9783.93962049996, "scale": 36978595.474472},
            {"level": 5, "resolution": 4891.96981024998, "scale": 18489297.737236},
            {"level": 6, "resolution": 2445.98490512499, "scale": 9244648.868618},
            {"level": 7, "resolution": 1222.99245256249, "scale": 4622324.434309},
            {"level": 8, "resolution": 611.49622628138, "scale": 2311162.217155},
            {"level": 9, "resolution": 305.748113140558, "scale": 1155581.108577},
            {"level": 10, "resolution": 152.874056570411, "scale": 577790.554289},
            {"level": 11, "resolution": 76.4370282850732, "scale": 288895.277144},
            {"level": 12, "resolution": 38.2185141425366, "scale": 144447.638572},
            {"level": 13, "resolution": 19.1092570712683, "scale": 72223.819286},
            {"level": 14, "resolution": 9.55462853563415, "scale": 36111.909643},
            {"level": 15, "resolution": 4.77731426794937, "scale": 18055.954822},
            {"level": 16, "resolution": 2.38865713397468, "scale": 9027.977411},
            {"level": 17, "resolution": 1.19432856685505, "scale": 4513.988705}
        ]
    },
    "initialExtent": {
        "xmin": -20037507.0671618,
        "ymin": -20037507.0671618,
        "xmax": 20037507.0671618,
        "ymax": 20037507.0671619,
        "spatialReference": {
            "wkid": 102100
        }
    },
    "fullExtent": {
        "xmin": -20037507.0671618,
        "ymin": -19971868.8804086,
        "xmax": 20037507.0671618,
        "ymax": 19971868.8804086,
        "spatialReference": {
            "wkid": 102100
        }
    },
    "units": "esriMeters",
    "supportedImageFormatTypes": "PNG24,PNG,JPG,DIB,TIFF,EMF,PS,PDF,GIF,SVG,SVGZ,AI,BMP",
    "documentInfo": {
        "Title": "World Street Map",
        "Author": "ESRI",
        "Comments": "",
        "Subject": "streets, highways, major roads, railways, water features, administrative boundaries, cities, parks, protected areas, landmarks ",
        "Category": "transportation(Transportation Networks) ",
        "Keywords": "World, Global, 2009, Japan, UNEP-WCMC",
        "Credits": ""
    },
    "capabilities": "Map"
};

var resolutions = [];
for (var i = 0; i < layerInfo.tileInfo.lods.length; i++) {
    resolutions.push(layerInfo.tileInfo.lods[i].resolution);
}

//Max extent from layerInfo above
var layerMaxExtent = new OpenLayers.Bounds(
    layerInfo.fullExtent.xmin,
    layerInfo.fullExtent.ymin,
    layerInfo.fullExtent.xmax,
    layerInfo.fullExtent.ymax
);

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
                                units: (layerInfo.units === "esriFeet") ? 'ft' : 'm',
                                maxExtent: '-20037508.34, -20037508.34, 20037508.34, 20037508.34',
                                center: '594576, 6831611',
                                maxResolution: 'auto',
                                xy_precision: 5,
                                zoom: 6,
                                theme: null
                            },

                        layers: [
                            /*
                             * Basemap OpenStreetMap
                             */
                            new OpenLayers.Layer.OSM('OpenStreetMap - Wikimedia', 'https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}.png'),
                            new OpenLayers.Layer.ArcGISCache("ArcGISCache",
                                "http://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer", {
                                    isBaseLayer: true,

                                    // From layerInfo above, but could be explicit
                                    resolutions: resolutions,
                                    tileSize: new OpenLayers.Size(layerInfo.tileInfo.cols, layerInfo.tileInfo.rows),
                                    tileOrigin: new OpenLayers.LonLat(layerInfo.tileInfo.origin.x, layerInfo.tileInfo.origin.y),
                                    maxExtent: layerMaxExtent,
                                    projection: 'EPSG:' + layerInfo.spatialReference.wkid
                                })
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
                }
            ]
        }
    ]
};
