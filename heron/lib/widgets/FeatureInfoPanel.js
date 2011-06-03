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

/** api: (define)
 *  module = Heron.widgets
 *  class = FeatureInfoPanel
 *  base_link = `Ext.Panel <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Panel>`_
 */

/** api: constructor
 *  .. class:: FeatureInfoPanel(config)
 *
 *  A tabbed panel designed to hold GetFeatureInfo for multiple layers
 */
Heron.widgets.FeatureInfoPanel = Ext.extend(Ext.Panel, {
	maxFeatures	: 5,
	tabs		: null,
	map		: null,

	initComponent : function() {
		Ext.apply(this, {
			layout		: "fit",
			title		: __('Feature info')
		});

		Heron.widgets.FeatureInfoPanel.superclass.initComponent.call(this);
		this.map = Heron.App.getMap();

		/***
		 * Add a WMSGetFeatureInfo control to the map if it is not yet present
		 */
		var panel = this;

		var control = null;

		if (this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo").length > 0) {
			control = this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo")[0];
		}

		if (control == undefined) {
			control = new OpenLayers.Control.WMSGetFeatureInfo({
				maxFeatures	: this.maxFeatures,
				queryVisible: true,
				infoFormat : "application/vnd.ogc.gml"
			});

			control.events.register("getfeatureinfo", this, this.handleGetFeatureInfo);
			control.events.register("beforegetfeatureinfo", this, this.handleBeforeGetFeatureInfo);

			// console.log(control);

			this.map.addControl(control);
		} else {
			control.events.register("getfeatureinfo", this, this.handleGetFeatureInfo);
			control.events.register("beforegetfeatureinfo", this, this.handleBeforeGetFeatureInfo);
		}

		this.on(
				"render",
				function() {
					this.mask = new Ext.LoadMask(this.body, {msg:__('Loading...')})
				});
	},
	handleBeforeGetFeatureInfo : function(evt) {
		var control = this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo")[0];
		control.layers = [];

		var layer;
		for (var index = 0; index < this.map.layers.length; index++) {
			layer = this.map.layers[index];
			if (layer.visibility && layer.featureInfoFormat) {
				control.layers.push(layer);
			}
		}


		if (control.layers.length == 0) {
			alert(__('Feature Info unavailable'));
			return;
		}

		this.expand();
		if (this.tabs != undefined) {
			this.tabs.removeAll();
		}
		this.mask.show();
	},
	/***
	 * Callback function for handling the result of an OpenLayers GetFeatureInfo request
	 */
	handleGetFeatureInfo : function(evt) {
		this.mask.hide();

		var types = new Array();

		for (var index = 0; index < evt.features.length; index++) {
			var rec = evt.features[index];

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
					colModel: new Ext.grid.ColumnModel({
						defaults: {
							width: 120,
							sortable: true
						},
						columns : type.columns,
						autoScroll : true,
						title : type.featureType,
						listeners : {
							"render" : function(c) {
								c.doLayout();
							}
						}
					})
				});

				if (this.tabs == null) {
					this.tabs = this.add(new Ext.TabPanel({
						border : false,
						autoDestroy : true,
						height : this.getHeight(),
						items : [grid],
						activeTab : 0
					}));
				} else {
					this.tabs.add(grid);

					this.tabs.setActiveTab(0);
				}
			}
		}

		if (this.tabs) {
			this.tabs.doLayout();
		}

		if (this.getLayout()) {
			this.getLayout().runLayout();
		}
	}
});

/** api: xtype = hr_featureinfopanel */
Ext.reg('hr_featureinfopanel', Heron.widgets.FeatureInfoPanel);

