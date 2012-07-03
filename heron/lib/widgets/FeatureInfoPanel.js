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
 *  Sample code showing how to configure a Heron FeatureInfoPanel. All regular ExtJS `Ext.Panel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.Panel>`_
 *  config params also apply.
 *  The ``infoFormat`` config parameter is the default ``INFO_FORMAT`` to be used for WMS GetFeatureInfo (GFI).
 *  This value can be overruled by an optional per-Layer ``infoFormat`` WMS config parameter.
 *
 *  .. code-block:: javascript
 *
 *		 {
 *			 xtype: 'hr_featureinfopanel',
 *			 id: 'hr-feature-info',
 *			 region: "south",
 *			 border: true,
 *			 collapsible: true,
 *			 collapsed: true,
 *			 height: 205,
 *			 split: true,
 *			 infoFormat: 'application/vnd.ogc.gml',
 *			 maxFeatures: 10
 *		 }
 *
 */

/** api: constructor
 *  .. class:: FeatureInfoPanel(config)
 *
 *  A tabbed panel designed to hold GetFeatureInfo for multiple layers.
 */
Heron.widgets.FeatureInfoPanel = Ext.extend(Ext.Panel, {
	/** api: config[maxFeatures]
	 *  ``String``
	 *  Default GFI MAX_FEATURES parameter Will be ``5`` if not set.
	 */
	maxFeatures	: 5,

	/** api: config[infoFormat]
	 *  ``String``
	 *  Default GFI INFO_FORMAT parameter, may be overruled per Layer object infoFormat WMS param. If not set
	 *  the value ``application/vnd.ogc.gml`` will be used.
	 */
	infoFormat: 'application/vnd.ogc.gml',

	tabPanel : null,
	map		: null,
	displayPanel : null,
	lastEvt : null,
	olControl: null,


	initComponent : function() {
		// For closures ("this" is not valid in callbacks)
		var self = this;

		Ext.apply(this, {
			layout		: "fit",
			title		: __('Feature info'),
			tbar: [
				{
					text: __('Grid'),
					toggleGroup: "featInfoGroup",
					enableToggle: true,
					pressed: true,
					handler: function(t) {
						self.display = self.displayGrid;
						self.handleGetFeatureInfo();
					}
				},
				{
					text: __('Tree'),
					toggleGroup: "featInfoGroup",
					enableToggle: true,
					pressed: false,
					handler: function(t) {
						self.display = self.displayTree;
						self.handleGetFeatureInfo();
					}
				},
				{
					text: __('XML'),
					toggleGroup: "featInfoGroup",
					enableToggle: true,
					pressed: false,
					handler: function(t) {
						self.display = self.displayXML;
						self.handleGetFeatureInfo();
					}
				}
			]
		});

		Heron.widgets.FeatureInfoPanel.superclass.initComponent.call(this);
		this.map = Heron.App.getMap();
		this.display = this.displayGrid;

		/***
		 * Add a WMSGetFeatureInfo control to the map if it is not yet present
		 */
		var controls = this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo");
		if (controls && controls.length > 0) {
			this.olControl = controls[0];

			// Overrule with our own info format and max features
			this.olControl.infoFormat = this.infoFormat;
			this.olControl.maxFeatures = this.maxFeatures;
		}

		// No GFI control present: create new and add to Map
		if (!this.olControl) {
			this.olControl = new OpenLayers.Control.WMSGetFeatureInfo({
				maxFeatures	: this.maxFeatures,
				queryVisible: true,
				infoFormat : this.infoFormat
			});

			this.map.addControl(this.olControl);
		}

		// Register interceptors
		this.olControl.events.register("getfeatureinfo", this, this.handleGetFeatureInfo);
		this.olControl.events.register("beforegetfeatureinfo", this, this.handleBeforeGetFeatureInfo);

		this.on(
				"render",
				function() {
					this.mask = new Ext.LoadMask(this.body, {msg:__('Loading...')})
				});
	},

	handleBeforeGetFeatureInfo : function(evt) {
		this.olControl.layers = [];

		// Needed to force accessing multiple WMS-es when multiple layers are visible
		this.olControl.url = null;
		this.olControl.drillDown = true;

		// Select WMS layers that are visible and enabled (via featureInfoFormat or Layer info_format (capitalized by OL) prop)
		var layer;
		for (var index = 0; index < this.map.layers.length; index++) {
			layer = this.map.layers[index];

			// Skip non-WMS layers
			if (!layer.params) {
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

		// TODO this really should be done by subscribing to the "nogetfeatureinfo"  event
		// of OpenLayers.Control.WMSGetFeatureInfo
		if (this.olControl.layers.length == 0) {
			alert(__('Feature Info unavailable'));
			return;
		}

		this.lastEvt = null;
		this.expand();
		if (this.tabPanel != undefined) {
			this.tabPanel.removeAll();
		}

		// Show loading mask
		this.mask.show();
	},

	handleGetFeatureInfo : function(evt) {
		// Hide the loading mask
		this.mask.hide();

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

		if (this.getLayout()) {
			this.getLayout().runLayout();
		}
	},

	/***
	 * Callback function for handling the result of an OpenLayers GetFeatureInfo request (display as grid)
	 */
	displayGrid : function(evt) {
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
				type = {
					featureType : featureType,
					columns		: new Array(),
					fields		: new Array(),
					records		: new Array()
				};

				types.push(type);
			}

			/***
			 * GetFeatureInfo response can contain dots in the fieldnames, these are not allowed in ExtJS store fieldnames.
			 *
			 * Use a regex to replace the dots /w underscores.
			 */
			var attrib;
			for (attrib in rec.attributes) {
				var new_attrib = attrib.replace(/\./g, "_");

				rec.attributes[new_attrib] = rec.attributes[attrib];

				if (attrib != new_attrib) {
					delete rec.attributes[attrib];
				}
			}

			// Populate columns and fields arrays
			if (type.records.length == 0) {
				for (attrib in rec.attributes) {
					if (type.records.length == 0) {
						// New column
						type.columns.push({
							header : attrib,
							width : 100,
							dataIndex : attrib
						});


						type.fields.push(attrib);
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
				var grid = new Ext.grid.GridPanel({
					store : new Ext.data.JsonStore({
						autoDestroy : true,
						fields : type.fields,
						data : type.records
					}),
					title : type.featureType,
					colModel: new Ext.grid.ColumnModel({
						defaults: {
							width: 120,
							sortable: true
						},
						columns : type.columns,
						autoScroll : true,
						listeners : {
							"render" : function(c) {
								c.doLayout();
							}
						}
					})
				});

				// Create tab panel for the first FT and add additional tabs for each FT
				if (this.tabPanel == null) {
					this.tabPanel = new Ext.TabPanel({
						border : false,
						autoDestroy : true,
						height : this.getHeight(),
						items : [grid],
						activeTab : 0
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
	displayTree : function(evt) {
		var panel = new Heron.widgets.XMLTreePanel();

		panel.xmlTreeFromText(panel, evt.text);

		return panel;
	},

	/***
	 * Callback function for handling the result of an OpenLayers GetFeatureInfo request (display as XML)
	 */
	displayXML : function(evt) {
		var opts = {
			html: '<div class="hr-html-panel-body"><pre>' + Heron.Utils.formatXml(evt.text, true) + '</pre></div>',
			preventBodyReset: true,
			autoScroll: true
		};

		return new Ext.Panel(opts);
	}
});

/** api: xtype = hr_featureinfopanel */
Ext.reg('hr_featureinfopanel', Heron.widgets.FeatureInfoPanel);
