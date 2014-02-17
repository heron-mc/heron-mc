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

/** api: example[vectorstyler]
 *  Vector Styler
 *  -------------
 *  Style Vector Layers interactively.
 */

/** Zoom into center Amersfoort. */
Heron.options.map.settings.zoom = 8;

/** Layers with local data files: Line, Polygon and Point Layer. */

var gpxLayer = new OpenLayers.Layer.Vector('GPX Track', {
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
        url: 'data/20110123.gpx',
        format: new OpenLayers.Format.GPX()
    }),
    style: {strokeColor: 'red', strokeWidth: 3, strokeOpacity: 0.8},
    /*styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style(null, {

            rules: [new OpenLayers.Rule({
                title: 'GPX',
                symbolizer: {
                    "Line": {
                        strokeColor: 'red',
                        strokeWidth: 2,
                        strokeOpacity: 0.8
                    }
                }
            })]
        })
    }),  */
    projection: new OpenLayers.Projection("EPSG:4326")
});

var parcelLayer = new OpenLayers.Layer.Vector('Parcels', {
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
        url: 'data/parcels.json',
        format: new OpenLayers.Format.GeoJSON()
    }),
//    style: {fillColor: '#382', strokeColor: 'yellow', strokeWidth: 3, strokeOpacity: 0.8},
    projection: new OpenLayers.Projection("EPSG:28992")
});

var addressLayer = new OpenLayers.Layer.Vector('Addresses', {
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
        url: 'data/addresspoints.json',
        format: new OpenLayers.Format.GeoJSON()
    }),
    styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style(null, {

            rules: [new OpenLayers.Rule({
                title: 'Address Point',
                symbolizer: {
                    "Point": {
                        fillColor: '#37f',
                        fillOpacity: 0.8,
                        graphicName: "circle",
                        strokeColor: '#03c',
                        strokeWidth: 2,
                        graphicZIndex: 1,
                        pointRadius: 5
                    }
                }
            })]
        })
    }),

    projection: new OpenLayers.Projection("EPSG:28992")
});

/* Vector layers for Drawing and Upload */
Ext.namespace("Heron.options.worklayers");
Heron.options.worklayers = {
    editor: new OpenLayers.Layer.Vector('DrawingLayer', {
        displayInLayerSwitcher: true, visibility: false, customStyling: true}),


    scratch: new OpenLayers.Layer.Vector('UploadLayer', {
        displayInLayerSwitcher: true, visibility: false})
};

// Add Layers to Map already present in default config
Heron.options.map.layers.push(gpxLayer);
Heron.options.map.layers.push(parcelLayer);
Heron.options.map.layers.push(addressLayer);
Heron.options.map.layers.push(Heron.options.worklayers.editor);
Heron.options.map.layers.push(Heron.options.worklayers.scratch);

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
                displayPanels: ['Table'],

                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'GeoJSON', 'WellKnownText', 'Shapefile'],
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
    {type: "oleditor", options: {
        pressed: true,

        // Options for OLEditor
        olEditorOptions: {
            editLayer: Heron.options.worklayers.editor,
            activeControls: ['StyleFeature', 'UploadFeature', 'DownloadFeature', 'Separator', 'Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteAllFeatures', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature', 'Separator'],
            // activeControls: ['UploadFeature', 'DownloadFeature', 'Separator', 'Navigation', 'DeleteAllFeatures', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'ModifyFeature', 'Separator'],
            featureTypes: ['text', 'polygon', 'path', 'point'],
            language: 'en',
            options: {
                StyleFeature: {
                    pageX: 200,
                    pageY: 100
                }},
            DownloadFeature: {
                url: Heron.globals.serviceUrl,
                formats: [
                    {name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
                    {name: 'Geographic Markup Language - v2 (GML2)', fileExt: '.gml', mimeType: 'text/xml', formatter: new OpenLayers.Format.GML.v2({featureType: 'oledit', featureNS: 'http://geops.de'})},
                    {name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                    {name: 'GPS Exchange Format (GPX)', fileExt: '.gpx', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GPX', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                    {name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                    {name: 'ESRI Shapefile (zipped, RD)', fileExt: '.zip', mimeType: 'application/zip', formatter: 'OpenLayers.Format.GeoJSON', targetFormat: 'ESRI Shapefile', fileProjection: new OpenLayers.Projection('EPSG:28992')},
//                    {name: 'ESRI Shapefile (zipped, ETRS89)', fileExt: '.zip', mimeType: 'application/zip', formatter: 'OpenLayers.Format.GeoJSON', targetFormat: 'ESRI Shapefile', fileProjection: new OpenLayers.Projection('EPSG:4258')},
                    {name: 'ESRI Shapefile (zipped, WGS84)', fileExt: '.zip', mimeType: 'application/zip', formatter: 'OpenLayers.Format.GeoJSON', targetFormat: 'ESRI Shapefile', fileProjection: new OpenLayers.Projection('EPSG:4326')}
                ],
                // For custom projections use Proj4.js
                fileProjection: new OpenLayers.Projection('EPSG:28992')
            },
            UploadFeature: {
                url: Heron.globals.serviceUrl,
                formats: [
                    {name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
                    {name: 'Geographic Markup Language - v2 (GML2)', fileExt: '.gml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GML'},
                    {name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                    {name: 'GPS Exchange Format (GPX)', fileExt: '.gpx', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GPX', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                    {name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                    {name: 'CSV (alleen RD-punten, moet X,Y kolom hebben)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:28992')},
                    {name: 'CSV (idem, punten in WGS84)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                    {name: 'ESRI Shapefile (1 laag, gezipped in RD)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
//                    {name: 'ESRI Shapefile (1 laag, gezipped in ETRS89)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:4258')},
                    {name: 'ESRI Shapefile (1 laag, gezipped in WGS84)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:4326')}
                ],
                // For custom projections use Proj4.js
                fileProjection: new OpenLayers.Projection('EPSG:28992')
            }
        }
    }
    },
    {type: "upload", options: {
        upload: {
            layerName: 'UploadLayer',
            url: Heron.globals.serviceUrl,
            formats: [
                {name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
                {name: 'Geographic Markup Language - v2 (GML2)', fileExt: '.gml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GML'},
                {name: 'Geographic Markup Language - v3 (GML3)', fileExt: '.gml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GML.v3'},
                {name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                {name: 'GPS Exchange Format (GPX)', fileExt: '.gpx', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GPX', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                {name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                {name: 'CSV (alleen RD-punten, moet X,Y kolom hebben)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:28992')},
                {name: 'CSV (idem, punten in WGS84)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:4326')},
                {name: 'ESRI Shapefile (1 laag, gezipped in RD)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
//                {name: 'ESRI Shapefile (1 laag, gezipped in ETRS89)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:4258')},
                {name: 'ESRI Shapefile (1 laag, gezipped in WGS84)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:4326')}
            ],
            // For custom projections use Proj4.js
            fileProjection: new OpenLayers.Projection('EPSG:28992')
        }
    }},
    {type: "printdirect", options: {url: 'http://kademo.nl/print/pdf28992'
        // , mapTitle: 'My Header - Direct Print'
        // , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
        // , mapComment: 'My Comment - Direct Print'
        // , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
        // , mapFooter: 'My Footer - Direct Print'
        // , mapFooterYAML: "mapFooter"	    // MapFish - field name in config.yaml - default is: 'mapFooter'
        // , printAttribution: true         // Flag for printing the attribution
        // , mapAttribution: null           // Attribution text or null = visible layer attributions
        // , mapAttributionYAML: "mapAttribution" // MapFish - field name in config.yaml - default is: 'mapAttribution'
        // , mapPrintLayout: "A4"			// MapFish - 'name' entry of the 'layouts' array or Null (=> MapFish default)
        // , mapPrintDPI: "75"				// MapFish - 'value' entry of the 'dpis' array or Null (=> MapFish default)
        // , mapPrintOutputFormat: null // By default uses PDF ('pdf'), but may use e.g. 'jpeg' or 'bmp' see your YAML File
        // , mapPrintLegend: true
        // , legendDefaults: {
        //     useScaleParameter : false,
        //     baseParams: {FORMAT: "image/png"}
        //   }
    }},
    {type: "printdialog", options: {url: 'http://kademo.nl/print/pdf28992', windowWidth: 360
        // , showTitle: true
        // , mapTitle: 'My Header - Print Dialog'
        // , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
        // , showComment: true
        // , mapComment: 'My Comment - Print Dialog'
        // , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
        // , showFooter: true
        // , mapFooter: 'My Footer - Print Dialog'
        // , mapFooterYAML: "mapFooter"	    // MapFish - field name in config.yaml - default is: 'mapFooter'
		// , printAttribution: true         // Flag for printing the attribution
		// , mapAttribution: null           // Attribution text or null = visible layer attributions
		// , mapAttributionYAML: "mapAttribution" // MapFish - field name in config.yaml - default is: 'mapAttribution'
        , showOutputFormats: true
        // , showRotation: true
        // , showLegend: true
        // , showLegendChecked: true
        // , mapLimitScales: false
        , mapPreviewAutoHeight: true // Adapt height of preview map automatically, if false mapPreviewHeight is used.
        // , mapPreviewHeight: 400
    }},
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
                    xtype: 'hr_activethemespanel',
                    height: 240,
                    flex: 3,
                    contextMenu: 'defaults',
                    hropts: {
                        // Defines the custom components added with the standard layer node.
                        showOpacity: false, // true - layer opacity icon / function
                        showTools: false, // true - layer tools icon / function (not jet completed)
                        showRemove: false        // true - layer remove icon / function
                    }
                },
                {
                    xtype: 'hr_layertreepanel',
                    flex: 4,
                    contextMenu: [
                        {
                            xtype: 'hr_layernodemenulayerinfo'
                        },
                        {
                            xtype: 'hr_layernodemenuzoomextent'
                        },
                        {
                            xtype: 'hr_layernodemenustyle'
                        },
                        {
                            xtype: 'hr_layernodemenuopacityslider'
                        }
                    ],
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
