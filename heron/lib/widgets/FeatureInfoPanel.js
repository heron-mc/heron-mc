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
Ext.namespace("Heron.widgets");
Ext.namespace("Heron.utils");

/** api: (define)
 *  module = Heron.widgets
 *  class = FeatureInfoPanel
 *  base_link = `Ext.Panel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.Panel>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron FeatureInfoPanel.
 *  All regular ExtJS `Ext.Panel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.Panel>`_
 *  config params also apply.
 *  The ``infoFormat`` config parameter is the default ``INFO_FORMAT`` to be used for WMS GetFeatureInfo (GFI).
 *  This value can be overruled by an optional per-Layer ``infoFormat`` WMS Layer config parameter.
 *  GetFeatureInfo-response data may be displayed as a Grid, a Tree or formatted XML. The ``displayPanels``
 *  config option can be used to trigger a menu with display options. Note also the use of "GridCellRenderers".
 *  These allow you to render specific formatting of cell content within the feature grid. For example
 *  URL substitution to render external links in a new tab or browser window. You can even supply your own formatting
 *  function. This function is according to the ExtJS ColumnModel renderers (see e.g. http://snipplr.com/view/40942).
 *
 *  .. code-block:: javascript
 *
 *         {
 *			 xtype: 'hr_featureinfopanel',
 *			 id: 'hr-feature-info',
 *			 region: "south",
 *			 border: true,
 *			 collapsible: true,
 *			 collapsed: true,
 *			 height: 205,
 *			 split: true,
 *			 infoFormat: 'application/vnd.ogc.gml',
 *			 displayPanels: ['Grid', 'XML'],
 *			 exportFormats: ['CSV', 'XLS']
 *			 maxFeatures: 10
 *			 gridCellRenderers: [
 *						{
 *							featureType: 'cities',
 *							attrName: 'City',
 *							renderer: {
 *								fn : Heron.widgets.GridCellRenderer.directLink,
 *								options : {
 *									url: 'http://en.wikipedia.org/wiki/{City}',
 *									target: '_new'
 *								}
 *							}
 *						},
 *						{
 *							featureType: 'cities',
 *							attrName : 'Country',
 *							renderer :  {
 *								fn : Heron.widgets.GridCellRenderer.browserPopupLink,
 *								options : {
 *									url: 'http://en.wikipedia.org/wiki/{Country}',
 *									winName: 'demoWin',
 *									width: 400,
 *									height: 800,
 *									scrollbars: 'yes'
 *								}
 *							}
 *						},
 *						{   // Example for custom HTML, could use also with e.g. links
 *							featureType: 'cities',
 *							attrName : 'longitude',
 *							renderer :  {
 *								fn : Heron.widgets.GridCellRenderer.valueSubstitutor,
 *								options : {
 *									template: '<i>ll={latitude},{longitude}{empty}</i>'
 *								}
 *							}
 *						},
 *						{
 *							// Example: supply your own function, parms as in ExtJS ColumnModel
 *							featureType: 'cities',
 *							attrName : 'population',
 *							renderer :  {
 *								fn : function(value, metaData, record, rowIndex, colIndex, store) {
 *									// Custom formatting, may also use this.options if needed
 *									return '<b>' + value + ' inh.</b>';
 *								},
 *								options : {
 *
 *								}
 *							}
 *						}
 *
 *		 }
 *
 */

/** api: constructor
 *  .. class:: FeatureInfoPanel(config)
 *
 *  A Panel designed to hold WMS GetFeatureInfo (GFI) data for one or more WMS layers.
 *
 */
Heron.widgets.FeatureInfoPanel = Ext.extend(Ext.Panel, {
    /** api: config[maxFeatures]
     *  ``int``
     *  Default GFI MAX_FEATURES parameter. Will be ``5`` if not set.
     */
    maxFeatures: 5,

    /** api: config[displayPanels]
     *  ``String Array``
     *
     * String array  of types of Panels to display GFI info in, default value is ['Grid'],  a grid table. Other values are 'XML' and 'Tree'.
     * If multiple display values are given a menu will be shown to switch display types.
     */
    displayPanels: ['Grid'],

    /** api: config[exportFormats]
     *  ``String Array``
     *
     * Array of document formats to be used when exporting the content of a GFI response. This requires the server-side CGI script
     * ``heron.cgi`` to be installed. Exporting results in a download of a document with the contents of the (Grid) Panel.
     * For example when 'XLS' is configured, exporting will result in the Excel (or compatible) program to be
     * started with the GFI data in an Excel worksheet.
     * Option values are 'CSV' and/or 'XLS', default is, ``null``, meaning no export (results in no export menu).
     * The value ['CSV', 'XLS'] configures a menu to choose from a ``.csv`` or ``.xls`` export document format.
     */
    exportFormats: null,

    /** api: config[infoFormat]
     *  ``String``
     *  Default GFI INFO_FORMAT parameter, may be overruled per Layer object infoFormat WMS param. If not set
     *  the value ``application/vnd.ogc.gml`` will be used.
     */
    infoFormat: 'application/vnd.ogc.gml',

    /** api: config[hover]
     *  ``Boolean``
     *  Show features on hovering.
     */
    hover: false,

    /** api: config[drillDown]
     *  ``Boolean``
     *  Show features from all visible layers that are queryable.
     */
    drillDown: true,

    /** api: config[layer]
     *  ``string``
     *  The layer to get feature information from. Parameter value will be ``""`` if not set.
     *  If not set, all visible layers of the map will be searched. In case the drillDown
     *  parameter is ``false``, the topmost visible layer will searched.
     */
    layer: "",

    /** Internal vars */
    tabPanel: null,
    map: null,
    displayPanel: null,
    lastEvt: null,
    olControl: null,
    tb: null,

    initComponent: function () {
        // For closures ("this" is not valid in callbacks)
        var self = this;

        Ext.apply(this, {
            layout: "fit",
            title: __('Feature Info')
        });

        this.display = this.displayGrid;

        // Handy structure to select dsiplay options for toolbar or just single Panel
        // based on configured "displays", e.g. displays = ['Grid', 'XML'] only shows
        // 2 tabs
        var displayOpts = {
            Grid: {
                Fun: this.displayGrid,
                Item: {
                    text: __('Grid'),
                    group: "featInfoGroup",
                    checked: true,
                    checkHandler: function (t) {
                        self.display = self.displayGrid;
                        self.handleGetFeatureInfo();
                    }
                }
            },
            Tree: {
                Fun: this.displayTree,
                Item: {
                    text: __('Tree'),
                    group: "featInfoGroup",
                    checked: false,
                    checkHandler: function (t) {
                        self.display = self.displayTree;
                        self.handleGetFeatureInfo();
                    }
                }
            },
            XML: {
                Fun: this.displayXML,
                Item: {
                    text: __('XML'),
                    group: "featInfoGroup",
                    checked: false,
                    checkHandler: function (t) {
                        self.display = self.displayXML;
                        self.handleGetFeatureInfo();
                    }
                }
            }
        };

        // Configure display panel based on options configured
        // using the handy structure displayOpts
        var displayType;
        if (this.displayPanels.length == 1) {
            // Only one display type configured: no need for toolbar tabs
            displayType = this.displayPanels[0];
            if (displayOpts[displayType]) {
                this.display = displayOpts[displayType].Fun;
            }
        } else {
            // Multiple display types configured: add toolbar tabs
            // var displayMenuItems = ['<b class="menu-title">' + __('Choose a Display Option') + '</b>'];
            var displayMenuItems = [];
            for (var i = 0; i < this.displayPanels.length; i++) {
                displayType = this.displayPanels[i];
                if (displayOpts[displayType]) {
                    displayMenuItems.push(displayOpts[displayType].Item);
                }
            }

            var displayMenu = new Ext.menu.Menu({
                id: 'displayMenu',
                style: {
                    overflow: 'visible'	 // For the Combo popup
                },
                items: displayMenuItems
            });

            this.tb = new Ext.Toolbar();

            this.tb.add({
                text: __('Display'),
                cls: 'x-btn-text-icon',
                iconCls: 'icon-table',
                tooltip: __('Choose a Display Option'),
                menu: displayMenu  // assign menu by instance
            });
        }

        if (this.exportFormats && this.exportFormats.length > 0) {
            // Multiple display types configured: add toolbar tabs
            // var exportMenuItems = ['<b class="menu-title">' + __('Choose an Export Format') + '</b>'];
            var exportMenuItems = [];
            for (var j = 0; j < this.exportFormats.length; j++) {
                var exportFormat = this.exportFormats[j];
                var item = {
                    text: __('Export') + ' ' + exportFormat,
                    cls: 'x-btn',
                    iconCls: 'icon-table-export',
                    exportFormat: exportFormat,
                    gfiPanel: self,
                    handler: self.exportData
                };
                exportMenuItems.push(item);
            }

            var exportMenu = new Ext.menu.Menu({
                id: 'exportMenu',
                style: {
                    overflow: 'visible'	 // For the Combo popup
                },
                items: exportMenuItems
            });

            if (!this.tb) {
                this.tb = new Ext.Toolbar();
            }

            this.tb.add('->');
            this.tb.add({
                text: __('Export'),
                cls: 'x-btn-text-icon',
                iconCls: 'icon-table-save',
                tooltip: __('Choose an Export Format'),
                menu: exportMenu  // assign menu by instance
            });

        }

        // Toolbar defined ?
        if (this.tb) {
            // Add toolbar tabs for different representations
            Ext.apply(this, {
                        tbar: this.tb
                    }
            );
        }

        Heron.widgets.FeatureInfoPanel.superclass.initComponent.call(this);
        this.map = Heron.App.getMap();

        /***
         * Add a WMSGetFeatureInfo control to the map if it is not yet present
         * The control could already have been set. If not try and find
         * the control in the map.
         */
        if (!this.olControl) {
            var controls = this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo");
            if (controls && controls.length > 0) {
                for (var index = 0; index < controls.length; index++) {
                    //Control should not be the one used for tooltips.
                    if (controls[index].id !== "hr-feature-info-hover") {
                        this.olControl = controls[index];
                        // Overrule with our own info format and max features
                        this.olControl.infoFormat = this.infoFormat;
                        this.olControl.maxFeatures = this.maxFeatures;
                        this.olControl.hover = this.hover;
                        this.olControl.drillDown = this.drillDown;
                        break;
                    }
                }
            }

            // No GFI control present: create new and add to Map
            if (!this.olControl) {
                this.olControl = new OpenLayers.Control.WMSGetFeatureInfo({
                    maxFeatures: this.maxFeatures,
                    queryVisible: true,
                    infoFormat: this.infoFormat,
                    hover: this.hover,
                    drillDown: this.drillDown
                });

                this.map.addControl(this.olControl);
            }
        }
        // Register interceptors
        this.olControl.events.register("getfeatureinfo", this, this.handleGetFeatureInfo);
        this.olControl.events.register("beforegetfeatureinfo", this, this.handleBeforeGetFeatureInfo);

        // Register a click event on WFS layers.
        for (var index = 0; index < this.map.layers.length; index++) {
            var layer = this.map.layers[index];
            if (layer.protocol) // Only Vector layers.
            {
                layer.events.register("click", layer, function (evt) {
                    self.handleVectorFeatureInfo(evt, this, self);
                });
            }
        }
        this.on(
                "render",
                function () {
                    this.mask = new Ext.LoadMask(this.body, {msg: __('Loading...')})
                });
    },

    handleBeforeGetFeatureInfo: function (evt) {
        //If the event was not triggered from this.olControl, do nothing
        if (evt.object !== this.olControl) {
            return;
        }

        this.olControl.layers = [];

        // Needed to force accessing multiple WMS-es when multiple layers are visible
        this.olControl.url = null;
        this.olControl.drillDown = this.drillDown;

        // Select WMS layers that are visible and enabled (via featureInfoFormat or Layer info_format (capitalized by OL) prop)
        var layer;
        //If a layer is specified, try and find the layer in the map.
        if (this.layer) {
            var layers = this.map.getLayersByName(this.layer);
            if (layers) {
                //Add the first layer found with name layer
                layer = layers[0];
                this.olControl.layers.push(layer);
            }
        }
        //If not layer was specified or the specified layer was not found,
        //assign the visible WMS-layers to the olControl.
        if (this.olControl.layers.length == 0) {
            for (var index = 0; index < this.map.layers.length; index++) {
                layer = this.map.layers[index];

                // Skip non-WMS layers
                if (!layer instanceof OpenLayers.Layer.WMS || !layer.params) {
                    continue;
                }

                // Enable layers for GFI that have a GFI mime param specified
                if (layer.visibility && (layer.featureInfoFormat || layer.params.INFO_FORMAT)) {

                    // Backward compatible with old configs that have only featureInfoFormat
                    // set to a mime type like "text/xml". layer.params.INFO_FORMAT determines the mime
                    // requested from WMS server.
                    if (!layer.params.INFO_FORMAT && layer.featureInfoFormat) {
                        layer.params.INFO_FORMAT = layer.featureInfoFormat;
                    }
                    this.olControl.layers.push(layer);
                }
            }
        }

        this.lastEvt = null;
        this.expand();
        if (this.tabPanel != undefined) {
            this.tabPanel.removeAll();
        }

        // Show loading mask
        if (this.mask) {
            this.mask.show();
        }

        // TODO this really should be done by subscribing to the "nogetfeatureinfo"  event
        // of OpenLayers.Control.WMSGetFeatureInfo
        // No layers with GFI available: display message
        if (this.olControl.layers.length == 0) {
            // Hide loading mask
            if (this.mask) {
                this.mask.hide();
            }
            if (this.displayPanel) {
                this.remove(this.displayPanel);
            }
            // Delegate to info panel (Grid, Tree, XML)
            this.displayPanel = this.displayInfo(__('Feature Info unavailable'));

            this.add(this.displayPanel);
            this.displayPanel.doLayout();
        }
    },

    handleGetFeatureInfo: function (evt) {
        // If the event was not triggered from this.olControl, do nothing
        if (evt && evt.object !== this.olControl) {
            return;
        }

        // Hide the loading mask
        if (this.mask) {
            this.mask.hide();
        }

        // Save result e.g. when changing views
        if (evt) {
            this.lastEvt = evt;
        }

        if (!this.lastEvt) {
            return;
        }

        if (this.displayPanel) {
            this.remove(this.displayPanel);
        }

        // Delegate to current display panel (Grid, Tree, XML)
        this.displayPanel = this.display(this.lastEvt);

        if (this.displayPanel) {
            this.add(this.displayPanel);
            this.displayPanel.doLayout();
        }

        if (this.getLayout() instanceof Object) {
            this.getLayout().runLayout();
        }
    },

    handleVectorFeatureInfo: function (evt, layer, self) {
        var feature = layer.getFeatureFromEvent(evt);

        if (feature) {
//			var html = '<ul>';
//
//			for (var attrName in feature.attributes) {
//				html += '<li><pre>' + attrName + ': '
//						+ JSON.stringify(feature.attributes[attrName], null, '\t')
//						+ '</pre></li>';
//			}
//
//			html += '</ul>';
//
//			self.wfsHtml = html;
//			self.expand();
//
//			if (self.tabPanel != undefined) {
//				self.tabPanel.removeAll();
//			}
//
//			// Show loading mask
//			self.mask.show();
//
//			self.display = self.displayWFS;
            self.handleGetFeatureInfo(evt);
        }
    },

    /***
     * Callback function for handling the result of an OpenLayers GetFeatureInfo request (display as grid)
     */
    displayGrid: function (evt) {
        var types = new Array();
        var featureType;

        for (var index = 0; index < evt.features.length; index++) {
            var rec = evt.features[index];

            // Reset featureType
            featureType = null;

            // If GFI returned GML, OL has may have parsed out the featureType
            // http://code.google.com/p/geoext-viewer/issues/detail?id=92
            if (rec.gml && rec.gml.featureType) {
                featureType = rec.gml.featureType;
            }

            // GeoServer-specific
            if (!featureType && rec.fid && rec.fid.indexOf('undefined') < 0) {
                // TODO: this is nasty and GeoServer specific ?
                // We may check the FT e.g. from the GML tag(s) available in the evt
                // More specific, we need to. Because now with multiple layers, all are assigned to
                // unknown and you get strange column results when the featuretypes are mixed..
                featureType = /[^\.]*/.exec(rec.fid);

                featureType = (featureType[0] != "null") ? featureType[0] : null;
            }

            // ESRI-specific
            if (!featureType && rec.attributes['_LAYERID_']) {
                // Try ESRI WMS GFI returns layername/featureType as attribute '_LAYERID_'  !
                // See http://webhelp.esri.com/arcims/9.3/general/mergedprojects/wms_connect/wms_connector/get_featureinfo.htm
                // See e.g. http://svn.flamingo-mc.org/trac/changeset/648/flamingo/trunk/fmc/OGWMSConnector.as
                featureType = rec.attributes['_LAYERID_'];
            }

            // TNO/DINO-specific
            if (!featureType && rec.attributes['DINO_DBA.MAP_SDE_GWS_WELL_W_HEADS_VW.DINO_NR']) {
                // TODO find better way to determine and fix for DINO services
                //			var nodes = featureNode.childNodes;
                //			 var _featureType = "";
                //			 for (j = 0,jlen = nodes.length; j < jlen; ++j) {
                //				 var node = nodes[j];
                //				 if (node.nodeType !== 3) {
                //					 //Dirty fix for dino name needs to be stripped as it consists of 3 parts
                //					 var dino_name = node.getAttribute("name");
                //					 var _feat = dino_name.split(".");
                //					 if(_feat[0] === "DINO_DBA"){
                //						 attributes[_feat[2]] = node.getAttribute("value");
                //						 _featureType = _feat[1];
                //					 } else {
                //						 attributes[node.getAttribute("name")] = node.getAttribute("value");
                //					 }
                //				 }
                //			 }
                //		 }
                //		 _feature = new OpenLayers.Feature.Vector(geom, attributes, null);
                //
                //		 if(_featureType !== ""){
                //			 // Dirty fix for dino to maintain reference to layer
                //			 _feature.gml = {};
                //			 _feature.gml.featureType = _featureType;
                //			 _feature.fid = _featureType + "." + len;
                //			 _feature.layer = _featureType;
                //		 }
                //	var _feat = dino_name.split(".");
                //					 if(_feat[0] === "DINO_DBA"){
                //						 attributes[_feat[2]] = node.getAttribute("value");
                //						 _featureType = _feat[1];
                //					 } else {
                //						 attributes[node.getAttribute("name")] = node.getAttribute("value");
                //					 }
                // rec.attributes[0]
                featureType = 'TNO_DINO_WELLS';
            }
            // TNO/DINO-specific  (see above)
            if (!featureType && rec.attributes['DINO_DBA.MAP_SDE_BRH_BOREHOLE_RD_VW.DINO_NR']) {
                featureType = 'TNO_DINO_BOREHOLES';
            }

            if (!featureType) {
                featureType = __('Unknown');
            }

            var found = false;
            var type = null;

            for (var j = 0; j < types.length; j++) {
                type = types[j];

                if (type.featureType == featureType) {
                    found = true;
                }
            }

            if (!found) {
                // Fall back to featureType if we can't find the name
                var layerName = featureType;

                // WMS/WFS GetFeature results don't return the Human Friendly name.
                // So we get it from the layer declaration here and use this for the tab titles.
                // Resolves Enhancement #164 - JM, 2013.01.30
                var layers = this.map.layers;
                for (var l = 0; l < layers.length; l++) {
                    var nextLayer = layers[l];

                    // Skip non-WMS layers
                    if (!nextLayer.params) {
                        continue;
                    }

                    // Ensure cases match by making all lowerCase. May not otherwise.
                    if (featureType.toLowerCase() == /([^:]*$)/.exec(nextLayer.params.LAYERS)[0].toLowerCase()) {
                        layerName = nextLayer.name;
                    }
                }

                type = {
                    featureType: featureType,
                    title: layerName,
                    columns: new Array(),
                    fields: new Array(),
                    records: new Array()
                };

                types.push(type);
            }

            /***
             * Go through attributes and modify where needed:
             * - hyperlinks clickable
             * - illegal field names (with dots)
             * - custom hyperlinks
             */
            var attrName;
            for (attrName in rec.attributes) {

                // Check for hyperlinks
                // Simple fix for issue 23
                // http://code.google.com/p/geoext-viewer/issues/detail?id=23
                var attrValue = rec.attributes[attrName];
                if (attrValue && attrValue.indexOf("http://") >= 0) {
                    // Display value as HTML hyperlink
                    rec.attributes[attrName] = '<a href="' + attrValue + '" target="_new">' + attrValue + '</a>';
                }

                // GetFeatureInfo response may contain dots in the fieldnames, these are not allowed in ExtJS store fieldnames.
                // Use a regex to replace the dots /w underscores.
                if (attrName.indexOf(".") >= 0) {
                    var newAttrName = attrName.replace(/\./g, "_");

                    rec.attributes[newAttrName] = rec.attributes[attrName];

                    if (attrName != newAttrName) {
                        delete rec.attributes[attrName];
                    }
                }
            }

            // Populate columns and fields arrays
            if (type.records.length == 0) {
                for (attrName in rec.attributes) {
                    if (type.records.length == 0) {
                        //
                        var column = {
                            header: attrName,
                            width: 100,
                            dataIndex: attrName
                        };

                        // Look for custom rendering
                        if (this.gridCellRenderers) {
                            var gridCellRenderer;
                            for (var k = 0; k < this.gridCellRenderers.length; k++) {
                                gridCellRenderer = this.gridCellRenderers[k];
                                if (gridCellRenderer.attrName && attrName == gridCellRenderer.attrName) {
                                    if (gridCellRenderer.featureType && featureType == gridCellRenderer.featureType || !gridCellRenderer.featureType) {
                                        column.options = gridCellRenderer.renderer.options;
                                        column.renderer = gridCellRenderer.renderer.fn;
                                    }
                                }
                            }
                        }

                        // Add new column definition and the field name
                        type.columns.push(column);
                        type.fields.push(attrName);
                    }
                }
            }


            type.records.push(rec.attributes);
        }

        // Remove any existing panel
        if (this.tabPanel != null) {
            this.remove(this.tabPanel);
            this.tabPanel = null;
        }

        // Run through FTs
        while (types.length > 0) {
            // TODO : Link typename to layer name
            type = types.pop();
            if (type.records.length > 0) {
                // Create the table grid
                var store = new Ext.data.JsonStore({
                    autoDestroy: true,
                    fields: type.fields,
                    data: type.records
                });


                var grid = new Ext.grid.GridPanel({
                    store: store,
                    title: type.title,
                    featureType: type.featureType,

                    colModel: new Ext.grid.ColumnModel({
                        defaults: {
                            width: 120,
                            sortable: true
                        },
                        columns: type.columns,
                        autoScroll: true,
                        listeners: {
                            "render": function (c) {
                                c.doLayout();
                            }
                        }
                    })
                });

                // Create tab panel for the first FT and add additional tabs for each FT
                if (this.tabPanel == null) {
                    this.tabPanel = new Ext.TabPanel({
                        border: false,
                        autoDestroy: true,
                        enableTabScroll: true,
                        //height: this.getHeight(),
                        items: [grid],
                        activeTab: 0
                    });
                } else {
                    // Add to existing tab panel
                    this.tabPanel.add(grid);
                    this.tabPanel.setActiveTab(0);
                }
            }
        }
        return this.tabPanel;
    },

    /***
     * Callback function for handling the result of an OpenLayers GetFeatureInfo request (display as Tree)
     */
    displayTree: function (evt) {
        var panel = new Heron.widgets.XMLTreePanel();

        panel.xmlTreeFromText(panel, evt.text);

        return panel;
    },

    /***
     * Callback function for handling the result of an OpenLayers GetFeatureInfo request (display as XML)
     */
    displayXML: function (evt) {
        var opts = {
            html: '<div class="hr-html-panel-body"><pre>' + Heron.Utils.formatXml(evt.text, true) + '</pre></div>',
            preventBodyReset: true,
            autoScroll: true
        };

        return new Ext.Panel(opts);
    },

    /***
     * Display info panel.
     */
    displayInfo: function (infoStr) {
        var opts = {
            html: '<div class="hr-html-panel-body"><pre>' + infoStr + '</pre></div>',
            preventBodyReset: true,
            autoScroll: true
        };

        return new Ext.Panel(opts);
    },

    /***
     * Callback handler function for exporting the data to specified format.
     */
    exportData: function (evt) {
        var self = evt.gfiPanel;
        if (!self.tabPanel || !self.tabPanel.activeTab) {
            alert(__('No features available or non-grid display chosen'));
            return;
        }

        var featureType = self.tabPanel.activeTab.featureType;
        var store = self.tabPanel.activeTab.store;

        var exportConfig = {
            CSV: {
                formatter: 'CSVFormatter',
                fileName: featureType + '.csv',
                mimeType: 'text/csv'
            },
            XLS: {
                formatter: 'ExcelFormatter',
                fileName: featureType + '.xls',
                mimeType: 'application/vnd.ms-excel'
            }
        };
        var config = exportConfig[evt.exportFormat];
        if (!config) {
            alert(__('Invalid export format configured: ' + evt.exportFormat));
            return;
        }

        var data = Heron.data.DataExporter.formatStore(store, config, true);
        Heron.data.DataExporter.download(data, config)
    }

});

/** api: xtype = hr_featureinfopanel */
Ext.reg('hr_featureinfopanel', Heron.widgets.FeatureInfoPanel);
