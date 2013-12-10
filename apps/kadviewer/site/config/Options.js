/** Heron Map Options (Dutch Maps and Overlays) */

Ext.namespace("Heron.options");
OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;

Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';
GeoExt.Lang.set("nl");

//        new Ext.data.Store({
//      proxy: new Ext.data.HttpProxy({url: '/testapp/poptype.json',method:'GET'}),
//      reader: new Ext.data.JsonReader({
//      root: 'rows',
//      fields: [ {name: 'myId'},{name: 'displayText'}]
//      })
//  });
Heron.options.downloadFormats = [
//                    {
//                        name: 'CSV',
//                        outputFormat: 'csv',
//                        fileExt: '.csv'
//                    }
//                    {
//                        name: 'GML (version 2.1.2)',
//                        outputFormat: 'text/xml; subtype=gml/2.1.2',
//                        fileExt: '.gml'
//                    },
//                    {
//                        name: 'ESRI Shapefile (zipped)',
//                        outputFormat: 'SHAPE-ZIP',
//                        fileExt: '.zip'
//                    },
//                    {
//                        name: 'GeoJSON',
//                        outputFormat: 'json',
//                        fileExt: '.json'
//                    }
];

// Een export format kan een referentie (String) zijn of een compleet Object
Heron.options.exportFormats = ['CSV', 'XLS', 'GMLv2',
    {
        name: 'Esri Shapefile (RD)',
        formatter: 'OpenLayersFormatter',
        format: 'OpenLayers.Format.GeoJSON',
        targetFormat: 'ESRI Shapefile',
        targetSrs: 'EPSG:28992',
        fileExt: '.zip',
        mimeType: 'application/zip'
    },
    {
        name: 'Esri Shapefile (WGS84)',
        formatter: 'OpenLayersFormatter',
        format: 'OpenLayers.Format.GeoJSON',
        targetFormat: 'ESRI Shapefile',
        targetSrs: 'EPSG:4326',
        fileExt: '.zip',
        mimeType: 'application/zip'
    },
    'GeoJSON', 'WellKnownText'];


/** Create a config for the search panel. This panel may be embedded into the accordion
 * or bound to the "find" button in the toolbar. Here we use the toolbar button.
 */
Heron.options.searchPanelConfig = {
    xtype: 'hr_multisearchcenterpanel',
    height: 600,
    hropts: [
        {
            searchPanel: {
                xtype: 'hr_formsearchpanel',
                name: 'Formulier: Kadastrale Percelen',
                header: false,
                protocol: new OpenLayers.Protocol.WFS({
                    version: "1.1.0",
                    url: "http://kademo.nl/gs2/wfs?",
                    srsName: "EPSG:28992",
                    featureType: "lki_vlakken",
                    featureNS: "http://innovatie.kadaster.nl",
                    outputFormat: 'GML2',
                    maxFeatures: 500
                }),

                listeners: {
                    'beforeaction': function (form) {
                        // Aanvullen voorloopnullen perceelnummer
                        // TODO: zou eigenlijk in DB lki_vlakken tabel moeten met int-veld !
                        var perceelField = form.items.items[2];
                        var perceelNum = perceelField.getValue();
                        // Is niet nodig indien leeg of bij wildcard
                        if (!perceelNum || perceelNum == '' || perceelNum.indexOf('*') > -1) {
                            return;
                        }

                        // Aanvullen tot char(5) met voorloopnullen
                        perceelNum = "0000" + perceelNum;
                        perceelNum = perceelNum.substr(perceelNum.length-5);
                        perceelField.setValue(perceelNum);
                    },
                    scope: this
                },
                downloadFormats: Heron.options.downloadFormats,
                items: [
//                    {
//                        xtype: "textfield",
//                        name: "gemeente__eq",
//                        value: 'OTL02',
//                        fieldLabel: "  gemeente"
//                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Gemeente',
                        hiddenName: 'gemeente',
                        enableKeyEvents: true,
                        editable: true,
                        autoSelect: true,
                        forceSelection: true,
                        typeAhead: false,
                        caseSensitive: false,
                        lazyInit: true,
                        emptyText: 'Selecteer Gemeente',
                        loadingText: 'Gemeenten ophalen..',
                        minChars: 1,
                        width: 200,
                        mode: 'local',
                        store: new Ext.data.JsonStore({
                            autoLoad: true,

                            proxy: new Ext.data.HttpProxy({
                                url: 'data/kadgem.json',
                                method: 'GET'
                            }),
                            idProperty: 'kadnaamcode',
                            root: 'features',
                            successProperty: null,
                            totalProperty: null,
                            fields: [
                                {name: 'kadcode', mapping: 'properties.kadcode'},
                                {name: 'kadnaam', mapping: 'properties.kadnaam'},
                                {name: 'kadnaamcode', mapping: 'properties.kadnaamcode'}
                            ]
                        }),

//                        store: new GeoExt.data.FeatureStore({
//                            autoLoad: true,
//                            proxy: new GeoExt.data.ProtocolProxy({
//                                protocol: new OpenLayers.Protocol.WFS({
//                                    url: Heron.scratch.urls.KADEMO_OWS,
//                                    featureType: "lki_kadgem",
//                                    featureNS: "http://innovatie.kadaster.nl",
//                                    geometryName: 'the_geom'
//                                })
//                            }),
//                            fields: [
//                                {name: 'kadcode'},
//                                {name: 'kadnaam'},
//                                {name: 'kadnaamcode'}
//                            ]}),
                        valueField: 'kadcode',
                        displayField: 'kadnaamcode',
                        triggerAction: 'all',
                        selectOnFocus: true,
                        listeners: {
                            'select': function (cb, rec) {
                                // Sets the value into the filter of "Sectie" combo
                                // TODO: need more elegant way of doing this, like "observer"
                                var sectieCB = Ext.getCmp('sectie_cb');
                                sectieCB.clearValue();
                                sectieCB.store.proxy.protocol.filter.value = cb.value;
                                sectieCB.store.load();
                            },
                            'beforequery': function (queryPlan) {
                                var combo = queryPlan.combo;
                                // combo.store.clearFilter(true);
                                var searchValue = queryPlan.query;
                                if (combo.lastQuery != searchValue) {
                                    combo.store.filter('kadnaamcode', searchValue, true, false);
                                    combo.lastQuery = searchValue;
                                    combo.onLoad();
                                    // console.log('searchValue=' + searchValue);
                                }
                                return false;
                            },
                            scope: this
                        }
                    },

                    {
                        xtype: 'combo',
                        id: 'sectie_cb',
                        fieldLabel: 'Sectie',
                        width: 200,
                        hiddenName: 'sectie',
                        loadingText: 'Secties ophalen..',
                        store: new GeoExt.data.FeatureStore({

                            proxy: new GeoExt.data.ProtocolProxy({
                                protocol: new OpenLayers.Protocol.WFS({
                                    url: Heron.scratch.urls.KADEMO_OWS,
                                    featureType: "lki_kadgem_sectie",
                                    featureNS: "http://innovatie.kadaster.nl",
                                    geometryName: 'the_geom',
                                    filter: new OpenLayers.Filter.Comparison({
                                        type: OpenLayers.Filter.Comparison.EQUAL_TO,
                                        property: "kadcode",
                                        value: "EDE01"
                                    })
                                })


                            }),
                            fields: [
                                {name: 'kadcode'},
                                {name: 'kadnaam'},
                                {name: 'sectie'}
                            ]}),
                        valueField: 'sectie',
                        displayField: 'sectie',
                        triggerAction: 'all',
                        emptyText: 'Selecteer Sectie',
                        selectOnFocus: true,
                        editable: false
                    },
                    {
                        xtype: "textfield",
                        name: "perceel__like",
                        width: 200,
                        value: '',
                        fieldLabel: "  Perceelnr"
                    },
                    {
                        xtype: "label",
                        id: "helplabel",
                        html: 'Zoeken in LKI Perceelvlakken<br/>Voer kadastrale gemeente, sectie en perceelnummer in. ' +
                                'Gemeente kan code of naam zijn (autosuggest). Perceel is getal (met of zonder voorloopnullen) bijv 322, of wildcard met * bijv *322, of mag leeg (alle percelen in sectie tot max 500).<br/>' +
                                'NB alle gegevens zijn uit 2009.',
                        style: {
                            fontSize: '10px',
                            color: '#AAAAAA'
                        }
                    }
                ],
                hropts: {
                    onSearchCompleteZoom: 11,
                    autoWildCardAttach: true,
                    caseInsensitiveMatch: false,
                    logicalOperator: OpenLayers.Filter.Logical.AND
                }
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                columns: [
                    {
                        header: "Gem",
                        width: 50,
                        dataIndex: "gemeente"
                    },
                    {
                        header: "Sectie",
                        width: 40,
                        dataIndex: "sectie"
                    },
                    {
                        header: "Perceel",
                        width: 54,
                        dataIndex: "perceel"
                    },
                    {
                        header: "Toev",
                        width: 50,
                        dataIndex: "toevoeg"
                    },
                    {
                        header: "Objectnummer",
                        width: 120,
                        dataIndex: "objectnumm"
                    }
                ],
                exportFormats: Heron.options.exportFormats,
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8
                }
            }
        },
        {
            searchPanel: {
                xtype: 'hr_searchbydrawpanel',
                name: __('Search by Drawing'),
                description: 'Kies een laag en een tekentool. Teken een geometrie om objecten daarbinnen te zoeken.',
                header: false,
                downloadFormats: Heron.options.downloadFormats
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                autoConfig: true,
                autoConfigMaxSniff: 150,
                exportFormats: Heron.options.exportFormats,
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    zoomToDataExtent: false
                }
            }
        },
        {
            searchPanel: {
                xtype: 'hr_gxpquerypanel',
                name: 'Maak eigen zoekopdrachten',
                description: 'Zoek objecten binnen kaart-extent en/of eigen zoek-criteria',
                header: false,
                border: false,
                caseInsensitiveMatch: true,
                autoWildCardAttach: true,
                downloadFormats: Heron.options.downloadFormats
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                border: false,
                autoConfig: true,
                autoConfigMaxSniff: 150,
                exportFormats: Heron.options.exportFormats,
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    zoomToDataExtent: true
                }
            }
        },
        {
            searchPanel: {
                xtype: 'hr_searchbyfeaturepanel',
                name: 'Zoeken via object-selectie',
                description: 'Selecteer objecten uit een laag en gebruik hun geometrieën om in een andere laag te zoeken',
                header: false,
                border: false,
                bodyStyle: 'padding: 6px',
                style: {
                    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                    fontSize: '12px'
                },
                downloadFormats: Heron.options.downloadFormats
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                border: false,
                autoConfig: true,
                autoConfigMaxSniff: 150,
                exportFormats: Heron.options.exportFormats,
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    zoomToDataExtent: false
                }
            }
        }

    ]
};

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
    {type: "scale"},
    /* Leave out: see http://code.google.com/p/geoext-viewer/issues/detail?id=116 */
    {type: "featureinfo", options: {
        popupWindow: {
            width: 360,
            height: 200,
            featureInfoPanel: {
                showTopToolbar: true,

                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: Heron.options.exportFormats,
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                // exportFormats: ['CSV', 'XLS'],
                maxFeatures: 10,

                // In case that the same layer would be requested more than once: discard the styles
                discardStylesForDups: true
            }
        }
    }},
    {type: "-"} ,
    {type: "pan"},
//    {type: "pan", options: {iconCls: "icon-hand"}},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"},
    {type: "-"},
/** Use "geodesic: true" for non-linear/Mercator projections like Google, Bing etc */
    {type: "measurelength", options: {geodesic: false}},
    {type: "measurearea", options: {geodesic: false}},
    {type: "-"},
    {type: "printdialog", options: {url: 'http://kademo.nl/print/pdf28992.kadviewer'}},
    {type: "-"},
    {type: "oleditor", options: {
        pressed: false,

        // Options for OLEditor
        olEditorOptions: {
            editLayer: Heron.options.worklayers.editor,
            activeControls: ['UploadFeature', 'DownloadFeature', 'Separator', 'Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteAllFeatures', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature', 'Separator'],
            // activeControls: ['UploadFeature', 'DownloadFeature', 'Separator', 'Navigation', 'DeleteAllFeatures', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'ModifyFeature', 'Separator'],
            featureTypes: ['text', 'polygon', 'path', 'point'],
            language: 'nl',
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
            layerName: 'Kladlaag',
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
    {type: "-"},
//    {type: "coordinatesearch", options: {onSearchCompleteZoom: 8, localIconFile: 'redpin.png', projection: 'EPSG:28992', fieldLabelX: 'X', fieldLabelY: 'Y'}},
    {type: "coordinatesearch", options: {

        // === Full demo configuration ===

        // see ToolbarBuilder.js
        formWidth: 320, formPageX: 15, formPageY: 100
        // see CoordSearchPanel.js
        // , title: 'My title'
        , titleDescription: 'Kies eventueel een projectie systeem.<br>Voer dan X/Y-coordinaten (RD) of Lon/Lat-waarden in.<br>&nbsp;<br>', titleDescriptionStyle: 'font-size:11px; color:dimgrey;', bodyBaseCls: 'x-form-back', bodyItemCls: 'hr-html-panel-font-size-11', bodyCls: 'hr-html-panel-font-size-11', fieldMaxWidth: 200, fieldLabelWidth: 80, fieldStyle: 'color: red;', fieldLabelStyle: 'color: darkblue', layerName: 'Locatie NL - RD', onProjectionIndex: 1, onZoomLevel: -1, showProjection: true, showZoom: true, showAddMarkers: true, checkAddMarkers: true, showHideMarkers: true, checkHideMarkers: false, removeMarkersOnClose: true, showRemoveMarkersBtn: true, buttonAlign: 'center'		// left, center, right
        /*
         http://spatialreference.org/ref/epsg/4326/
         EPSG:4326
         WGS 84
         WGS84 Bounds: -180.0000, -90.0000, 180.0000, 90.0000
         Projected Bounds: -180.0000, -90.0000, 180.0000, 90.0000

         http://spatialreference.org/ref/epsg/28992/
         EPSG:28992
         Amersfoort / RD New
         WGS84 Bounds: 3.3700, 50.7500, 7.2100, 53.4700
         Projected Bounds: 12628.0541, 308179.0423, 283594.4779, 611063.1429
         */, hropts: [
            {
                projEpsg: 'EPSG:4326', projDesc: 'EPSG:4326 - WGS 84', fieldLabelX: 'Lon [Graden]', fieldLabelY: 'Lat [Graden]', fieldEmptyTextX: 'Voer lengtegraad (x.yz) in...', fieldEmptyTextY: 'Voer breedtegraad (x.yz) in...', fieldMinX: 3.3700, fieldMinY: 50.7500, fieldMaxX: 7.2100, fieldMaxY: 53.4700, iconWidth: 32, iconHeight: 32, localIconFile: 'bluepin.png', iconUrl: null
            },
            {
                projEpsg: 'EPSG:28992', projDesc: 'EPSG:28992 - Amersfoort / RD New', fieldLabelX: 'X [m]', fieldLabelY: 'Y [m]', fieldEmptyTextX: 'Voer X-coordinaat in...', fieldEmptyTextY: 'Voer Y-coordinaat in...', fieldMinX: -285401.920, fieldMinY: 22598.080, fieldMaxX: 595401.920, fieldMaxY: 903401.920, iconWidth: 32, iconHeight: 32, localIconFile: 'redpin.png', iconUrl: null
            }

        ]

        // ====================================

    }},
    {
        type: "searchcenter",
        // Options for SearchPanel window
        options: {
            show: false,

            searchWindow: {
                title: null, //__('Multiple Searches'),
                x: 100,
                y: undefined,
                width: 360,
                height: 440,
                items: [
                    Heron.options.searchPanelConfig
                ]
            }
        }
    },
    {
        type: "namesearch",
        // Optional options, see OpenLSSearchCombo.js
        options: {
            xtype: 'hr_openlssearchcombo',
            id: "pdoksearchcombo",
            width: 240,
            listWidth: 400,
            minChars: 4,
            queryDelay: 200,
            zoom: 11,
            emptyText: 'Zoek adres met PDOK GeoCoder',
            tooltip: 'Zoek adres met PDOK GeoCoder',
            url: 'http://geodata.nationaalgeoregister.nl/geocoder/Geocoder?max=10'
        }
    },
    {type: "addbookmark"},
    {type: "help", options: {contentUrl: 'content/help.html', popupWindow: { width: 640, height: 540}}}
];

/** Values for BookmarksPanel (bookmarks to jump to specific layers/zoom/center on map. */
Ext.namespace("Heron.options.bookmarks");
Heron.options.bookmarks =
        [
            {
                id: 'degrift',
                name: 'Kadaster - De Grift',
                desc: 'Vestiging De Grift Apeldoorn',
                layers: ['BRT Achtergrondkaart'],
                x: 194322,
                y: 469474,
                zoom: 13
            },
            {
                id: 'debrug',
                name: 'Kadaster - De Brug',
                desc: 'Vestiging De Brug Apeldoorn',
                layers: ['Luchtfoto (PDOK)'],
                x: 194194,
                y: 465873,
                zoom: 13
            },
            {
                id: 'debrugbrt',
                name: 'Kadaster - De Brug met BRT',
                desc: 'Vestiging De Brug Apeldoorn',
                layers: ['BRT Achtergrondkaart'],
                x: 194194,
                y: 465873,
                zoom: 13
            }
        ];