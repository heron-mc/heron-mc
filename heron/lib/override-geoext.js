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
    initComponent: function() {
        if(this.sourceMap instanceof GeoExt.MapPanel) {
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

        if(!(this.printProvider instanceof GeoExt.data.PrintProvider)) {
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
        Ext.each(this.sourceMap.layers, function(layer) {
            layer.getVisibility() === true && this.layers.push(layer.clone());
        }, this);

        this.extent = this.sourceMap.getExtent();

        GeoExt.PrintMapPanel.superclass.initComponent.call(this);
    }
});
