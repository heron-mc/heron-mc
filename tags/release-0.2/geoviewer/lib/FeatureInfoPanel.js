/*

 Copyright (c) 2009, OpenGeoGroep

 info@opengeogroep.nl
 http://www.opengeogroep.nl
 * 
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 * Neither the name of the OpenGeoGroep nor the names of its contributors
 may be used to endorse or promote products derived from this software
 without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 POSSIBILITY OF SUCH DAMAGE.

 */

Ext.namespace("GeoViewer");

/** api: constructor
 *  .. class:: FeatureInfoPanel(config)
 *
 *  A tabbed panel designed to hold GetFeatureInfo for multiple layers
 */
GeoViewer.FeatureInfoPanel = Ext.extend(Ext.Panel, {
	maxFeatures	: 5,
	tabs		: null,
	map		: null,

	initComponent : function() {
		Ext.apply(this, {
			layout		: "fit",
			title		: GeoViewer.lang.txtTitleFeatureInfo
		});

		GeoViewer.FeatureInfoPanel.superclass.initComponent.call(this);
		this.map = GeoViewer.main.getMap();
		
		/***
		 * Add a WMSGetFeatureInfo control to the map if it is not yet present
		 */
		var panel = this;

		var control = null;

		if (this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo").length > 0)
		{
			control = this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo")[0];
		}

		if (control == undefined)
		{
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
				function(c) {
					c.mask = new Ext.LoadMask(c.body, {msg:GeoViewer.lang.txtLoadMask})
				});
	},
	handleBeforeGetFeatureInfo : function(evt) {
		var control = control = this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo")[0];
		control.layers = [];

		var layer;
		for (var index = 0; index < this.map.layers.length; index++) {
			layer = this.map.layers[index];
			if (layer.visibility && layer.featureInfoFormat) {
				control.layers.push(layer);
			}
		}


		if (control.layers.length == 0) {
			alert(GeoViewer.lang.txtNoLayersWithFeatureInfo);
			return;
		}

		this.expand();
		if (this.tabs != undefined)
		{
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
						  GeoViewer.lang.txtUnknownFeatureType;

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

		while (types.length > 0)
		{
			// TODO : Link typename to layer name			
			type = types.pop();

			if (type.records.length > 0)
			{
				var grid = new Ext.grid.GridPanel({
					store : new Ext.data.JsonStore({
						autoDestroy : true,
						fields : type.fields,
						data : type.records
					}),
					columns : type.columns,
					autoScroll : true,
					title : type.featureType,
					listeners : {
						"render" : function(c) {
							c.doLayout();
						}
					}
				});

				if (this.tabs == null)
				{
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

		if (this.tabs)
		{
			this.tabs.doLayout();
		}

		if (this.getLayout())
		{
			this.getLayout().runLayout();
		}
	}
});

