/**
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** Using the ExtJS-way to override single methods of classes. */
Ext.override(GeoExt.WMSLegend, {

    /*  NOTE (JvdB): override the WMSLegend.getLegendUrl() method: to allow baseParams, in particular FORMAT=
     *  to be merged in via Heron config
     *  the version below taken from GeoExt GitHub on 27.sept.2012
     */

    /** api: (define)
     *  module = GeoExt
     *  class = WMSLegend
     */
    /**
     * @param layerName
     * @param layerNames
     */
    /** private: method[getLegendUrl]
     *  :param layerName: ``String`` A sublayer.
     *  :param layerNames: ``Array(String)`` The array of sublayers,
     *      read from this.layerRecord if not provided.
     *  :return: ``String`` The legend URL.
     *
     *  Get the legend URL of a sublayer.
     */
    getLegendUrl: function (layerName, layerNames) {
        var rec = this.layerRecord;
        var url;
        var styles = rec && rec.get("styles");
        var layer = rec.getLayer();
        layerNames = layerNames || [layer.params.LAYERS].join(",").split(",");

        var styleNames = layer.params.STYLES &&
                [layer.params.STYLES].join(",").split(",");
        var idx = layerNames.indexOf(layerName);
        var styleName = styleNames && styleNames[idx];
        // check if we have a legend URL in the record's
        // "styles" data field
        if (styles && styles.length > 0) {
            if (styleName) {
                Ext.each(styles, function (s) {
                    url = (s.name == styleName && s.legend) && s.legend.href;
                    return !url;
                });
            } else if (this.defaultStyleIsFirst === true && !styleNames && !layer.params.SLD && !layer.params.SLD_BODY) {
                url = styles[0].legend && styles[0].legend.href;
            }
        }
        if (!url) {
            url = layer.getFullRequestString({
                REQUEST: "GetLegendGraphic",
                WIDTH: null,
                HEIGHT: null,
                EXCEPTIONS: "application/vnd.ogc.se_xml",
                LAYER: layerName,
                LAYERS: null,
                STYLE: (styleName !== '') ? styleName : null,
                STYLES: null,
                SRS: null,
                FORMAT: null,
                TIME: null
            });
        }
        var params = Ext.apply({}, this.baseParams);
        if (layer.params._OLSALT) {
            // update legend after a forced layer redraw
            params._OLSALT = layer.params._OLSALT;
        }
        url = Ext.urlAppend(url, Ext.urlEncode(params));
        if (url.toLowerCase().indexOf("request=getlegendgraphic") != -1) {
            if (url.toLowerCase().indexOf("format=") == -1) {
                url = Ext.urlAppend(url, "FORMAT=image%2Fgif");
            }
            // add scale parameter - also if we have the url from the record's
            // styles data field and it is actually a GetLegendGraphic request.
            if (this.useScaleParameter === true) {
                var scale = layer.map.getScale();
                url = Ext.urlAppend(url, "SCALE=" + scale);
            }
        }

        return url;
    }
});

/*  NOTE (WW): override the GeoExt.tree.LayerNodeUI.enforceOneVisible() method:
 *  to prevent null pointer assignment in 'this.node.getOwnerTree().getChecked()' when
 *  using the 'hr_layertreepanel' panel without the 'hropts' option
 *
 *  Version below taken from GeoExt GitHub on 01.nov.2012
 */
Ext.override(GeoExt.tree.LayerNodeUI, {

    /** private: method[enforceOneVisible]
     *
     *  Makes sure that only one layer is visible if checkedGroup is set.
     */
    enforceOneVisible: function () {
        var attributes = this.node.attributes;
        var group = attributes.checkedGroup;
        // If we are in the baselayer group, the map will take care of
        // enforcing visibility.
        if (group && group !== "gx_baselayer") {
            var layer = this.node.layer;
// --- WW ---
            if (attributes.checked) {
// ----------
                var checkedNodes = this.node.getOwnerTree().getChecked();
                var checkedCount = 0;
                // enforce "not more than one visible"
                Ext.each(checkedNodes, function (n) {
                    var l = n.layer;
                    if (!n.hidden && n.attributes.checkedGroup === group) {
                        checkedCount++;
                        if (l != layer && attributes.checked) {
                            l.setVisibility(false);
                        }
                    }
                });
                // enforce "at least one visible"
                if (checkedCount === 0 && attributes.checked == false) {
                    layer.setVisibility(true);
                }
// ----------
            }
// ----------
        }
    }

});

/*  NOTE (WW): append the GeoExt.tree.LayerNode.renderX() method:
 *  to prevent problems with the 'checkedGroup' flag for creating radiobuttons when
 *  using the 'hr_activelayerspanel' or 'hr_activethemespanel' panel - instead of a
 *  'baselayer radiobutton' a 'disabled baselayer checkbox' is shown
 *
 *  Version below taken from GeoExt GitHub on 01.nov.2012
 */
Ext.override(GeoExt.tree.LayerNode, {

    /** private: method[renderX]
     *  :param bulkRender: ``Boolean``
     */
    renderX: function (bulkRender) {
        var layer = this.layer instanceof OpenLayers.Layer && this.layer;
        if (!layer) {
            // guess the store if not provided
            if (!this.layerStore || this.layerStore == "auto") {
                this.layerStore = GeoExt.MapPanel.guess().layers;
            }
            // now we try to find the layer by its name in the layer store
            var i = this.layerStore.findBy(function (o) {
                return o.get("title") == this.layer;
            }, this);
            if (i != -1) {
                // if we found the layer, we can assign it and everything
                // will be fine
                layer = this.layerStore.getAt(i).getLayer();
            }
        }
        if (!this.rendered || !layer) {
            var ui = this.getUI();

            if (layer) {
                this.layer = layer;
                // no DD and radio buttons for base layers
                if (layer.isBaseLayer) {
                    this.draggable = false;
// --- WW ---
                    // Don't use 'checkedGroup' argument

                    // Ext.applyIf(this.attributes, {
                    // checkedGroup: "gx_baselayer"
                    // });

                    // Disabled baselayer checkbox
                    this.disabled = true;
// ----------
                }

                //base layers & alwaysInRange layers should never be auto-disabled
                this.autoDisable = !(this.autoDisable === false || this.layer.isBaseLayer || this.layer.alwaysInRange);

                if (!this.text) {
                    this.text = layer.name;
                }

                ui.show();
                this.addVisibilityEventHandlers();
            } else {
                ui.hide();
            }

            if (this.layerStore instanceof GeoExt.data.LayerStore) {
                this.addStoreEventHandlers(layer);
            }
        }
        GeoExt.tree.LayerNode.superclass.render.apply(this, arguments);
    }

});

// Allow for case insensitive LIKE and EQUALS in OpenLayers Filters for WFS search
// v0.73 18.4.2013 JvdB
Ext.override(GeoExt.form.SearchAction, {
    /** private: method[run]
     }
     *  Run the action.
     */
    run: function () {
        var o = this.options;
        var f = GeoExt.form.toFilter(this.form, o);
        if (o.clientValidation === false || this.form.isValid()) {

            if (o.abortPrevious && this.form.prevResponse) {
                o.protocol.abort(this.form.prevResponse);
            }

            this.form.prevResponse = o.protocol.read(
                    Ext.applyIf({
                        filter: f,
                        callback: this.handleResponse,
                        scope: this
                    }, o)
            );

        } else if (o.clientValidation !== false) {
            // client validation failed
            this.failureType = Ext.form.Action.CLIENT_INVALID;
            this.form.afterAction(this, false);
        }
    }
});

GeoExt.form.toFilter = function (form, options) {
    // JvdB: use options to pass extra filter options
    var wildcard = options.wildcard;
    var logicalOp = options.logicalOp;
    var matchCase = options.matchCase;

    if (form instanceof Ext.form.FormPanel) {
        form = form.getForm();
    }
    var filters = [], values = form.getValues(false);
    for (var prop in values) {
        var s = prop.split("__");

        var value = values[prop], type;

        if (s.length > 1 &&
                (type = GeoExt.form.toFilter.FILTER_MAP[s[1]]) !== undefined) {
            prop = s[0];
        } else {
            type = OpenLayers.Filter.Comparison.EQUAL_TO;
        }

        if (type === OpenLayers.Filter.Comparison.LIKE) {
            // JvdB fix issue https://code.google.com/p/geoext-viewer/issues/detail?id=235
            // Do not send wildcards for empty or null values.
            if (wildcard && (!value || value.length == 0)) {
                continue;
            }

            switch (wildcard) {
                case GeoExt.form.ENDS_WITH:
                    value = '.*' + value;
                    break;
                case GeoExt.form.STARTS_WITH:
                    value += '.*';
                    break;
                case GeoExt.form.CONTAINS:
                    value = '.*' + value + '.*';
                    break;
                default:
                    // do nothing, just take the value
                    break;
            }
        }

        filters.push(
                new OpenLayers.Filter.Comparison({
                    type: type,
                    value: value,
                    property: prop,
                    matchCase: matchCase
                })
        );
    }

    return filters.length == 1 && logicalOp != OpenLayers.Filter.Logical.NOT ?
            filters[0] :
            new OpenLayers.Filter.Logical({
                type: logicalOp || OpenLayers.Filter.Logical.AND,
                filters: filters
            });
};

/** private: constant[FILTER_MAP]
 *  An object mapping operator strings as found in field names to
 *      ``OpenLayers.Filter.Comparison`` types.
 */
GeoExt.form.toFilter.FILTER_MAP = {
    "eq": OpenLayers.Filter.Comparison.EQUAL_TO,
    "ne": OpenLayers.Filter.Comparison.NOT_EQUAL_TO,
    "lt": OpenLayers.Filter.Comparison.LESS_THAN,
    "le": OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO,
    "gt": OpenLayers.Filter.Comparison.GREATER_THAN,
    "ge": OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
    "like": OpenLayers.Filter.Comparison.LIKE
};

GeoExt.form.ENDS_WITH = 1;
GeoExt.form.STARTS_WITH = 2;
GeoExt.form.CONTAINS = 3;


// Copy resolutions for PrintPreview in PrintMapPanel.
// https://code.google.com/p/geoext-viewer/issues/detail?id=191
// GeoExt issue: http://trac.geoext.org/ticket/306
// Somehow not solved in geoExt 1.1, by copying resolutions from
// main Map this works.
// v0.74 11.06.2013 JvdB
Ext.override(GeoExt.PrintMapPanel, {
    /**
     * private: method[initComponent]
     * private override
     */
    initComponent: function () {
        if (this.sourceMap instanceof GeoExt.MapPanel) {
            this.sourceMap = this.sourceMap.map;
        }

        if (!this.map) {
            this.map = {};
        }
        Ext.applyIf(this.map, {
            projection: this.sourceMap.getProjection(),
            maxExtent: this.sourceMap.getMaxExtent(),
            maxResolution: this.sourceMap.getMaxResolution(),
            // ADDED by JvdB: copy resolutions if any from source map, otherwiswe keep original
            resolutions: this.sourceMap.resolutions ? this.sourceMap.resolutions.slice(0) : this.map.resolutions,
            units: this.sourceMap.getUnits()
        });

        if (!(this.printProvider instanceof GeoExt.data.PrintProvider)) {
            this.printProvider = new GeoExt.data.PrintProvider(
                    this.printProvider);
        }
        this.printPage = new GeoExt.data.PrintPage({
            printProvider: this.printProvider
        });

        this.previewScales = new Ext.data.Store();
        this.previewScales.add(this.printProvider.scales.getRange());

        this.layers = [];
        var layer;
        Ext.each(this.sourceMap.layers, function (layer) {
            layer.getVisibility() === true && this.layers.push(layer.clone());
        }, this);

        this.extent = this.sourceMap.getExtent();

        GeoExt.PrintMapPanel.superclass.initComponent.call(this);
    }
});


// Taken from https://raw.github.com/geoext/geoext/master/lib/GeoExt/data/PrintProvider.js
// on oct 6, 2013.
// Includes Heron-fix (see "Heron") fix for Fixes tileOrigin setting for TMS
// Heron fix JvdB 6 oct 2013
// Add tileOrigin otherwise MapFish Print will be confused.
// https://github.com/mapfish/mapfish-print/issues/68
Ext.override(GeoExt.data.PrintProvider, {
    /** private: property[encoders]
     *  ``Object`` Encoders for all print content
     */
    encoders: {
        "layers": {
            "Layer": function (layer) {
                var enc = {};
                if (layer.options && layer.options.maxScale) {
                    enc.minScaleDenominator = layer.options.maxScale;
                }
                if (layer.options && layer.options.minScale) {
                    enc.maxScaleDenominator = layer.options.minScale;
                }
                return enc;
            },
            "WMS": function (layer) {
                var enc = this.encoders.layers.HTTPRequest.call(this, layer);
                enc.singleTile = layer.singleTile;
                Ext.apply(enc, {
                    type: 'WMS',
                    layers: [layer.params.LAYERS].join(",").split(","),
                    format: layer.params.FORMAT,
                    styles: [layer.params.STYLES].join(",").split(","),
                    singleTile: layer.singleTile
                });
                var param;
                for (var p in layer.params) {
                    param = p.toLowerCase();
                    if (layer.params[p] != null && !layer.DEFAULT_PARAMS[param] &&
                            "layers,styles,width,height,srs".indexOf(param) == -1) {
                        if (!enc.customParams) {
                            enc.customParams = {};
                        }
                        enc.customParams[p] = layer.params[p];
                    }
                }
                return enc;
            },
            "OSM": function (layer) {
                var enc = this.encoders.layers.TileCache.call(this, layer);
                return Ext.apply(enc, {
                    type: 'OSM',
                    baseURL: enc.baseURL.substr(0, enc.baseURL.indexOf("$")),
                    extension: "png"
                });
            },
            "TMS": function (layer) {
                var enc = this.encoders.layers.TileCache.call(this, layer);
                return Ext.apply(enc, {
                    type: 'TMS',
                    format: layer.type
                });
            },
            "TileCache": function (layer) {
                var enc = this.encoders.layers.HTTPRequest.call(this, layer);
                // Heron fix JvdB 6 oct 2013
                // Add tileOrigin otherwise MapFish Print will be confused.
                // https://github.com/mapfish/mapfish-print/issues/68
                var maxExtent = layer.maxExtent.toArray();
                var tileOriginX = layer.tileOrigin ? layer.tileOrigin.lon : maxExtent[0];
                var tileOriginY = layer.tileOrigin ? layer.tileOrigin.lat : maxExtent[1];
                return Ext.apply(enc, {
                    type: 'TileCache',
                    layer: layer.layername,
                    maxExtent: maxExtent,
                    tileOrigin: {x: tileOriginX, y: tileOriginY},
                    tileSize: [layer.tileSize.w, layer.tileSize.h],
                    extension: layer.extension,
                    resolutions: layer.serverResolutions || layer.resolutions
                });
            },
            "WMTS": function (layer) {
                var enc = this.encoders.layers.HTTPRequest.call(this, layer);
                enc = Ext.apply(enc, {
                    type: 'WMTS',
                    layer: layer.layer,
                    version: layer.version,
                    requestEncoding: layer.requestEncoding,
                    style: layer.style,
                    dimensions: layer.dimensions,
                    params: layer.params,
                    matrixSet: layer.matrixSet
                });
                if (layer.matrixIds) {
                    if (layer.requestEncoding == "KVP") {
                        enc.format = layer.format;
                    }
                    enc.matrixIds = []
                    Ext.each(layer.matrixIds, function (matrixId) {
                        enc.matrixIds.push({
                            identifier: matrixId.identifier,
                            matrixSize: [matrixId.matrixWidth,
                                matrixId.matrixHeight],
                            resolution: matrixId.scaleDenominator * 0.28E-3
                                    / OpenLayers.METERS_PER_INCH
                                    / OpenLayers.INCHES_PER_UNIT[layer.units],
                            tileSize: [matrixId.tileWidth, matrixId.tileHeight],
                            topLeftCorner: [matrixId.topLeftCorner.lon,
                                matrixId.topLeftCorner.lat]
                        });
                    })
                    return enc;
                }
                else {
                    return Ext.apply(enc, {
                        formatSuffix: layer.formatSuffix,
                        tileOrigin: [layer.tileOrigin.lon, layer.tileOrigin.lat],
                        tileSize: [layer.tileSize.w, layer.tileSize.h],
                        maxExtent: (layer.tileFullExtent != null) ? layer.tileFullExtent.toArray() : layer.maxExtent.toArray(),
                        zoomOffset: layer.zoomOffset,
                        resolutions: layer.serverResolutions || layer.resolutions
                    });
                }
            },
            "KaMapCache": function (layer) {
                var enc = this.encoders.layers.KaMap.call(this, layer);
                return Ext.apply(enc, {
                    type: 'KaMapCache',
                    // group param is mandatory when using KaMapCache
                    group: layer.params['g'],
                    metaTileWidth: layer.params['metaTileSize']['w'],
                    metaTileHeight: layer.params['metaTileSize']['h']
                });
            },
            "KaMap": function (layer) {
                var enc = this.encoders.layers.HTTPRequest.call(this, layer);
                return Ext.apply(enc, {
                    type: 'KaMap',
                    map: layer.params['map'],
                    extension: layer.params['i'],
                    // group param is optional when using KaMap
                    group: layer.params['g'] || "",
                    maxExtent: layer.maxExtent.toArray(),
                    tileSize: [layer.tileSize.w, layer.tileSize.h],
                    resolutions: layer.serverResolutions || layer.resolutions
                });
            },
            "HTTPRequest": function (layer) {
                var enc = this.encoders.layers.Layer.call(this, layer);
                return Ext.apply(enc, {
                    baseURL: this.getAbsoluteUrl(layer.url instanceof Array ?
                            layer.url[0] : layer.url),
                    opacity: (layer.opacity != null) ? layer.opacity : 1.0
                });
            },
            "Image": function (layer) {
                var enc = this.encoders.layers.Layer.call(this, layer);
                return Ext.apply(enc, {
                    type: 'Image',
                    baseURL: this.getAbsoluteUrl(layer.getURL(layer.extent)),
                    opacity: (layer.opacity != null) ? layer.opacity : 1.0,
                    extent: layer.extent.toArray(),
                    pixelSize: [layer.size.w, layer.size.h],
                    name: layer.name
                });
            },
            "Vector": function (layer) {
                if (!layer.features.length) {
                    return;
                }

                var encFeatures = [];
                var encStyles = {};
                var features = layer.features;
                var featureFormat = new OpenLayers.Format.GeoJSON();
                var styleFormat = new OpenLayers.Format.JSON();
                var nextId = 1;
                var styleDict = {};
                var feature, style, dictKey, dictItem, styleName;
                for (var i = 0, len = features.length; i < len; ++i) {
                    feature = features[i];
                    style = feature.style || layer.style ||
                            layer.styleMap.createSymbolizer(feature,
                                    feature.renderIntent);

                    // don't send unvisible features
                    if (style.display == 'none') {
                        continue;
                    }

                    dictKey = styleFormat.write(style);
                    dictItem = styleDict[dictKey];
                    if (dictItem) {
                        //this style is already known
                        styleName = dictItem;
                    } else {
                        //new style
                        styleDict[dictKey] = styleName = nextId++;
                        if (style.externalGraphic) {
                            encStyles[styleName] = Ext.applyIf({
                                externalGraphic: this.getAbsoluteUrl(
                                        style.externalGraphic)}, style);
                        } else {
                            encStyles[styleName] = style;
                        }
                    }
                    var featureGeoJson = featureFormat.extract.feature.call(
                            featureFormat, feature);

                    featureGeoJson.properties = OpenLayers.Util.extend({
                        _gx_style: styleName
                    }, featureGeoJson.properties);

                    encFeatures.push(featureGeoJson);
                }
                var enc = this.encoders.layers.Layer.call(this, layer);
                return Ext.apply(enc, {
                    type: 'Vector',
                    styles: encStyles,
                    styleProperty: '_gx_style',
                    geoJson: {
                        type: "FeatureCollection",
                        features: encFeatures
                    },
                    name: layer.name,
                    opacity: (layer.opacity != null) ? layer.opacity : 1.0
                });
            },
            "Markers": function (layer) {
                var features = [];
                for (var i = 0, len = layer.markers.length; i < len; i++) {
                    var marker = layer.markers[i];
                    var geometry = new OpenLayers.Geometry.Point(marker.lonlat.lon, marker.lonlat.lat);
                    var style = {externalGraphic: marker.icon.url,
                        graphicWidth: marker.icon.size.w, graphicHeight: marker.icon.size.h,
                        graphicXOffset: marker.icon.offset.x, graphicYOffset: marker.icon.offset.y};
                    var feature = new OpenLayers.Feature.Vector(geometry, {}, style);
                    features.push(feature);
                }
                var vector = new OpenLayers.Layer.Vector(layer.name);
                vector.addFeatures(features);
                var output = this.encoders.layers.Vector.call(this, vector);
                vector.destroy();
                return output;
            }
        },
        "legends": {
            "gx_wmslegend": function (legend, scale) {
                var enc = this.encoders.legends.base.call(this, legend);
                var icons = [];
                for (var i = 1, len = legend.items.getCount(); i < len; ++i) {
                    var url = legend.items.get(i).url;
                    if (legend.useScaleParameter === true &&
                            url.toLowerCase().indexOf(
                                    'request=getlegendgraphic') != -1) {
                        var split = url.split("?");
                        var params = Ext.urlDecode(split[1]);
                        params['SCALE'] = scale;
                        url = split[0] + "?" + Ext.urlEncode(params);
                    }
                    icons.push(this.getAbsoluteUrl(url));
                }
                enc[0].classes[0] = {
                    name: "",
                    icons: icons
                };
                return enc;
            },
            "gx_wmtslegend": function (legend, scale) {
                return this.encoders.legends.gx_urllegend.call(this, legend);
            },
            "gx_urllegend": function (legend) {
                var enc = this.encoders.legends.base.call(this, legend);
                enc[0].classes.push({
                    name: "",
                    icon: this.getAbsoluteUrl(legend.items.get(1).url)
                });
                return enc;
            },
            "base": function (legend) {
                return [
                    {
                        name: legend.getLabel(),
                        classes: []
                    }
                ];
            }
        }
    }

});