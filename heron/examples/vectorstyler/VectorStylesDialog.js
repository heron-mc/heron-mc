/**
 * Copyright (c) 2008-2011 The Open Planning Project
 *
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/**
 * @require util.js
 * @require widgets/RulePanel.js
 * @require widgets/StylePropertiesDialog.js
 * @requires OpenLayers/Renderer/SVG.js
 * @requires OpenLayers/Renderer/VML.js
 * @requires OpenLayers/Renderer/Canvas.js
 * @require OpenLayers/Style2.js
 * @require OpenLayers/Format/SLD/v1_0_0_GeoServer.js
 * @require GeoExt/data/AttributeStore.js
 * @require GeoExt/widgets/WMSLegend.js
 * @require GeoExt/widgets/VectorLegend.js
 */

/** api: (define)
 *  module = gxp
 *  class = VectorStylesDialog
 *  base_link = `Ext.Container <http://extjs.com/deploy/dev/docs/?class=Ext.Container>`_
 */
Ext.namespace("gxp");

/** api: constructor
 *  .. class:: VectorStylesDialog(config)
 *
 *      Create a dialog for selecting and layer styles. If the WMS supports
 *      GetStyles, styles can also be edited. The dialog does not provide any
 *      means of writing modified styles back to the server. To save styles,
 *      configure the dialog with a :class:`gxp.plugins.StyleWriter` plugin
 *      and call the ``saveStyles`` method.
 *
 *      Note: when this component is included in a build,
 *      ``OpenLayers.Renderer.defaultSymbolizer`` will be set to the SLD
 *      defaults.  In addition, the OpenLayers SLD v1 parser will be patched
 *      to support vendor specific extensions added to SLD by GeoTools.
 */
gxp.VectorStylesDialog = Ext.extend(gxp.WMSStylesDialog, {

    /** private: method[initComponent]
     */
    initComponent: function () {
        gxp.VectorStylesDialog.superclass.initComponent.apply(this, arguments);

        // We cannot create/delete new styles for Vector Layers (StyleMap restriction)
        // this.items.removeAt(1);
        this.initialConfig.styleName = 'default';
        this.items.get(1).setDisabled(true);

        this.on({
            "styleselected": function (cmp, style) {
                var index = this.stylesStore.findExact("name", style.name);
                if (index !== -1) {
                    this.selectedStyle = this.stylesStore.getAt(index);
                }
            },
            "modified": function (cmp, style) {
                cmp.saveStyles();
            },
            "beforesaved": function () {
                this._saving = true;
            },
            "saved": function () {
                delete this._saving;
            },
            "savefailed": function () {
                Ext.Msg.show({
                    title: this.errorTitle,
                    msg: this.errorMsg,
                    icon: Ext.MessageBox.ERROR,
                    buttons: {ok: true}
                });
                delete this._saving;
            },
            "render": function () {
                gxp.util.dispatch([this.getStyles], function () {
                    this.enable();
                }, this);
            },
            scope: this
        });

    },


    /** private: method[editRule]
     */
    editRule: function () {
        var rule = this.selectedRule;
        var origRule = rule.clone();

        var ruleDlg = new this.dialogCls({
            title: String.format(this.ruleWindowTitle,
                    rule.title || rule.name || this.newRuleText),
            shortTitle: rule.title || rule.name || this.newRuleText,
            layout: "fit",
            width: 320,
            height: 450,
            modal: true,
            items: [
                {
                    xtype: "gxp_rulepanel",
                    ref: "rulePanel",
                    symbolType: this.symbolType,
                    rule: rule,
                    attributes: new GeoExt.data.AttributeStore({
                        url: this.layerDescription.owsURL,
                        baseParams: {
                            "SERVICE": this.layerDescription.owsType,
                            "REQUEST": "DescribeFeatureType",
                            "TYPENAME": this.layerDescription.typeName
                        },
                        method: "GET",
                        disableCaching: false
                    }),
                    autoScroll: true,
                    border: false,
                    defaults: {
                        autoHeight: true,
                        hideMode: "offsets"
                    },
                    listeners: {
                        "change": this.saveRule,
                        "tabchange": function () {
                            if (ruleDlg instanceof Ext.Window) {
                                ruleDlg.syncShadow();
                            }
                        },
                        scope: this
                    }
                }
            ],
            bbar: ["->", {
                text: this.cancelText,
                iconCls: "cancel",
                handler: function () {
                    this.saveRule(ruleDlg.rulePanel, origRule);
                    ruleDlg.destroy();
                },
                scope: this
            }, {
                text: this.saveText,
                iconCls: "save",
                handler: function () {
                    ruleDlg.destroy();
                }
            }]
        });
        this.showDlg(ruleDlg);
    },


    /** private: method[prepareStyle]
     *  :arg style: ``Style`` object to be cloned and prepared for GXP editing.
     */
    prepareStyle: function (layer, style, name) {
        var style = style.clone();
        style.isDefault = name == 'default' ? true : false;
        style.name = name;
        style.title = name + ' style';
        style.description = name + ' style for this layer';
        style.layerName = layer.name;

        if (style.rules && style.rules.length > 0) {
            for (var i = 0, len = style.rules.length; i < len; i++) {
                var rule = style.rules[i];
                rule.symbolizers = [];

                for (var symbol in rule.symbolizer) {
                    var symbolizer = rule.symbolizer[symbol];
                    if (symbolizer.CLASS_NAME && symbolizer.CLASS_NAME.indexOf('OpenLayers.Symbolizer.') > 0) {
                        ;
                    } else if (symbolizer instanceof Object) {
                        // In some cases the symbolizer may be a hash: create corresponding class object
                        symbolizer = Heron.Utils.createOLObject(['OpenLayers.Symbolizer.' + symbol, symbolizer]);
                    }
                    rule.symbolizers.push(symbolizer);
                }
                rule.symbolizer = undefined;
            }

        } else {
            // GXP Style Editing needs symbolizers array in Rule object
            // while Vector/Style drawing needs symbolizer hash...
            var symbolizers = [new OpenLayers.Symbolizer.Polygon(style.defaultStyle)];
            style.rules = [new OpenLayers.Rule({title: style.name, symbolizers: symbolizers})];
            style.defaultsPerSymbolizer = true;
        }
        return style;
    },

    /** private: method[getStyles]
     *  :arg callback: ``Function`` function that will be called when the
     *      request result was returned.
     */
    getStyles: function () {
        if (this.first) {
            return;
        }
        var layer = this.layerRecord.getLayer();
        if (this.editable === true) {
            this.first = true;
            var initialStyle = this.initialConfig.styleName;
            this.selectedStyle = this.stylesStore.getAt(
                    this.stylesStore.findExact("name", initialStyle));


            try {

                // add userStyle objects to the stylesStore
                var userStyles = [];

                // Some layers are styled via the "Style" config prop: convert to a StyleMap
                if (layer.style && layer.styleMap) {
                    OpenLayers.Util.extend(layer.styleMap.styles.default.defaultStyle, layer.style);
                    delete layer.style;
                }
                for (var styleName in layer.styleMap.styles) {
                    if (styleName == 'default' || styleName == 'select') {
                        userStyles.push(this.prepareStyle(layer, layer.styleMap.styles[styleName], styleName));
                    }
                }

                // our stylesStore comes from the layerRecord's styles - clear it
                // and repopulate from GetStyles
                this.stylesStore.removeAll();
                this.selectedStyle = null;

                var userStyle, record, index;
                for (var i = 0, len = userStyles.length; i < len; ++i) {
                    userStyle = userStyles[i];
                    // remove existing record - this way we replace styles from
                    // userStyles with inline styles.
                    index = this.stylesStore.findExact("name", userStyle.name);
                    index !== -1 && this.stylesStore.removeAt(index);
                    record = new this.stylesStore.recordType({
                        "name": userStyle.name,
                        "title": userStyle.title,
                        "abstract": userStyle.description,
                        "userStyle": userStyle
                    });
                    record.phantom = false;
                    this.stylesStore.add(record);
                    // set the default style if no STYLES param is set on the layer
                    if (!this.selectedStyle && (initialStyle === userStyle.name ||
                            (!initialStyle && userStyle.isDefault === true))) {
                        this.selectedStyle = record;
                    }
                }

                this.addRulesFieldSet();
                this.createLegend(this.selectedStyle.get("userStyle").rules);
                // this.createLegend();

                this.stylesStoreReady();
                this.markModified();
            }
            catch (e) {
                this.setupNonEditable();
            }
        } else {
            this.setupNonEditable();
        }
    },


    /** private: method[describeLayer]
     *  :arg callback: ``Function`` function that will be called when the
     *      request result was returned.
     */
    describeLayer: function (callback) {

        var layer = this.layerRecord.getLayer();
        this.layerDescription = {
            owsURL: 'http://gis.kademo.nl/gs2/ows',
            owsType: "WFS",
            typeName: 'lki_vlakken'

        };
        if (layer.protocol && layer.protocol.CLASS_NAME.indexOf('.WFS') > 0) {
            this.layerDescription.owsURL = layer.protocol.url.replace('?', '');
            this.layerDescription.typeName = layer.protocol.featureType;
        }
        this.editRule();

        // always return before calling callback

        return;

        if (this.layerDescription) {
            // always return before calling callback
            window.setTimeout(function () {
                callback.call(this);
            }, 0);
        } else {
            var layer = this.layerRecord.getLayer();
            var version = layer.params["VERSION"];
            if (parseFloat(version) > 1.1) {
                //TODO don't force 1.1.1, fall back instead
                version = "1.1.1";
            }
            Ext.Ajax.request({
                url: layer.url,
                params: {
                    "SERVICE": "WMS",
                    "VERSION": version,
                    "REQUEST": "DescribeLayer",
                    "LAYERS": [layer.params["LAYERS"]].join(",")
                },
                method: "GET",
                disableCaching: false,
                success: function (response) {
                    var result = new OpenLayers.Format.WMSDescribeLayer().read(
                            response.responseXML && response.responseXML.documentElement ?
                                    response.responseXML : response.responseText);
                    this.layerDescription = result[0];
                },
                callback: callback,
                scope: this
            });
        }
    },

    /** private: method[addStylesCombo]
     *
     *  Adds a combo box with the available style names found for the layer
     *  in the capabilities document to this component's stylesFieldset.
     */
    addStylesCombo: function () {
        if (this.combo) {
            return;
        }
        var store = this.stylesStore;
        this.combo = new Ext.form.ComboBox(Ext.apply({
            fieldLabel: this.chooseStyleText,
            store: store,
            editable: false,
            displayField: "title",
            valueField: "name",
            value: this.selectedStyle ? this.selectedStyle.get("title") : "default",
            disabled: !store.getCount(),
            mode: "local",
            typeAhead: true,
            triggerAction: "all",
            forceSelection: true,
            anchor: "100%",
            listeners: {
                "select": function (combo, record) {
                    this.changeStyle(record);
                    if (!record.phantom && !this._removing) {
                        this.fireEvent("styleselected", this, record.get("name"));
                    }
                },
                scope: this
            }
        }, this.initialConfig.stylesComboOptions));
        // add combo to the styles fieldset
        this.items.get(0).add(this.combo);
        this.doLayout();
    },

    /** private: method[createLegendImage]
     *  :return: ``GeoExt.LegendImage`` or undefined if none available.
     *
     *  Creates a legend image for the first style of the current layer. This
     *  is used when GetStyles is not available from the layer's WMS.
     */
    createLegendImage: function () {
        return new GeoExt.VectorLegend({
            showTitle: false,
            layerRecord: this.layerRecord,
            autoScroll: true
        });
    },

    /** private: method[updateStyleRemoveButton]
     *  We cannot remove styles for Vector styles so always disable remove.
     */
    updateStyleRemoveButton: function () {
        this.items.get(1).items.get(1).setDisabled(true);
    }


});

/** api: function[createGeoServerStylerConfig]
 *  :arg layerRecord: ``GeoExt.data.LayerRecord`` Layer record to configure the
 *      dialog for.
 *  :arg url: ``String`` Optional. Custaom URL for the GeoServer REST endpoint
 *      for writing styles.
 *
 *  Creates a configuration object for a :class:`gxp.VectorStylesDialog` with a
 *  :class:`gxp.plugins.GeoServerStyleWriter` plugin and listeners for the
 *  "styleselected", "modified" and "saved" events that take care of saving
 *  styles and keeping the layer view updated.
 */
gxp.VectorStylesDialog.createVectorStylerConfig = function (layerRecord) {
    return {
        xtype: "gxp_vectorstylesdialog",
        layerRecord: layerRecord,
        plugins: [
            {
                ptype: "gxp_vectorstylewriter"
            }
        ]
    };
};

/** api: xtype = gxp_vectorstylesdialog */
Ext.reg('gxp_vectorstylesdialog', gxp.VectorStylesDialog);
