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

/** api: constructor
 *  .. class:: FeatureInfoPanel(config)
 *
 *  A tabbed panel designed to hold GetFeatureInfo for multiple layers
 */
Heron.widgets.FeatureInfoPanel = Ext.extend(Ext.Panel, {
			maxFeatures	: 5,
			tabPanel		: null,
			map		: null,
			displayPanel : null,
			lastEvt : null,
			olControl: null,

			initComponent : function() {
				var self = this;
				Ext.apply(this, {
							layout		: "fit",
							title		: __('Feature info'),
							tbar: [
								{
									text: 'Grid',
									toggleGroup: "featInfoGroup",
									enableToggle: true,
									pressed: true,
									handler: function(t) {
										self.display = self.displayGrid;
										self.handleGetFeatureInfo();
									}
								},
								{
									text: 'Tree',
									toggleGroup: "featInfoGroup",
									enableToggle: true,
									pressed: false,
									handler: function(t) {
										self.display = self.displayTree;
										self.handleGetFeatureInfo();
									}
								},
								{
									text: 'XML',
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
				}

				if (!this.olControl) {
					this.olControl = new OpenLayers.Control.WMSGetFeatureInfo({
								maxFeatures	: this.maxFeatures,
								queryVisible: true,
								infoFormat : "application/vnd.ogc.gml"
							});

					this.map.addControl(this.olControl);
				}

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
				this.olControl.url = null;
				this.olControl.drillDown = true;

				var layer;
				for (var index = 0; index < this.map.layers.length; index++) {
					layer = this.map.layers[index];
					if (layer.visibility && layer.featureInfoFormat) {
						this.olControl.layers.push(layer);
					}
				}

				if (this.olControl.layers.length == 0) {
					alert(__('Feature Info unavailable'));
					return;
				}

				this.lastEvt = null;
				this.expand();
				if (this.tabPanel != undefined) {
					this.tabPanel.removeAll();
				}
				this.mask.show();
			},

			handleGetFeatureInfo : function(evt) {
				this.mask.hide();
				if (evt) {
					this.lastEvt = evt;
				}

				if (!this.lastEvt) {
					return;
				}

				if (this.displayPanel) {
					this.remove(this.displayPanel);
				}

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

				for (var index = 0; index < evt.features.length; index++) {
					var rec = evt.features[index];

					// TODO: this is nasty and GeoServer specific ?
					var featureType = /[^\.]*/.exec(rec.fid);

					featureType = (featureType[0] != "null") ? featureType[0] :
							__('Unknown');

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
					for (var attrib in rec.attributes) {
						var new_attrib = attrib.replace(/\./g, "_");

						rec.attributes[new_attrib] = rec.attributes[attrib];

						if (attrib != new_attrib) {
							delete rec.attributes[attrib];
						}
					}

					// Populate columns and fields arrays
					if (type.records.length == 0) {
						for (var attrib in rec.attributes) {
							if (type.records.length == 0) {
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

				if (this.tabPanel != null) {
					this.remove(this.tabPanel);
					this.tabPanel = null;
				}

				while (types.length > 0) {
					// TODO : Link typename to layer name
					type = types.pop();
					if (type.records.length > 0) {
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

						if (this.tabPanel == null) {
							this.tabPanel = new Ext.TabPanel({
										border : false,
										autoDestroy : true,
										height : this.getHeight(),
										items : [grid],
										activeTab : 0
									});
						} else {
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
