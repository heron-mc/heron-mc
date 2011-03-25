/*
 * Copyright (C) 2010  Het Kadaster
 *
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

Ext.namespace("GeoViewer");

/**
 * Panel that creates and contains other Panels.
 */
GeoViewer.ContainerPanel = Ext.extend(
		Ext.Panel,
{
	createFeatureInfoPanel : function(options) {
		return new GeoViewer.FeatureInfoPanel(options);
	},

	createFeatureDataPanel : function(options) {
		return new Ext.TabPanel(options);
	},

	createHTMLPanel : function(options) {

		if (options.url) {
			options.autoLoad = {url: options.url}
		}

		options.listeners = {
			show: function() {
				this.loadMask = new Ext.LoadMask(this.body, {
					 msg: __('Loading...')
				});
			}
		};

		return new Ext.Panel(options);
	},

	createLayerBrowserPanel : function(options) {
		var treeConfig;

		if (options && options.tree) {
			treeConfig = options.tree;
		} else {
			treeConfig = [
				{
					nodeType: "gx_baselayercontainer",
					expanded: true
				},
				{
					nodeType: "gx_overlaylayercontainer",
					// render the nodes inside this container with a radio button,
					// and assign them the group "foo".
					loader: {
						baseAttrs: {
							/*radioGroup: "foo", */
							uiProvider: "layerNodeUI"
						}
					}
				}/*, {
				 nodeType: "gx_layer",
				 layer: "Tasmania (Group Layer)",
				 isLeaf: false,
				 // create subnodes for the layers in the LAYERS param. If we assign
				 // a loader to a LayerNode and do not provide a loader class, a
				 // LayerParamLoader will be assumed.
				 loader: {
				 param: "LAYERS"
				 }
				 }*/
			]
		}

		// using OpenLayers.Format.JSON to create a nice formatted string of the
		// configuration for editing it in the UI
		treeConfig = new OpenLayers.Format.JSON().write(treeConfig, true);

		// create the tree with the configuration from above
		return new Ext.tree.TreePanel({
			id: "gv-layer-browser",
			border: true,
			title : __('Layers'),
			// collapseMode: "mini",
			autoScroll: true,
			loader: new Ext.tree.TreeLoader({
				// applyLoader has to be set to false to not interfer with loaders
				// of nodes further down the tree hierarchy
				applyLoader: false,
				uiProviders: {
					"layerNodeUI": GeoExt.tree.LayerNodeUI
				}
			}),
			root: {
				nodeType: "async",
				// the children property of an Ext.tree.AsyncTreeNode is used to
				// provide an initial set of layer nodes. We use the treeConfig
				// from above, that we created with OpenLayers.Format.JSON.write.
				children: Ext.decode(treeConfig)
			},
			rootVisible: false,
			headerCls : 'gv-header-text',
			enableDD: true,
			lines: false
			/*,
			 bbar: [{
			 text: "Show/Edit Tree Config",
			 handler: function() {
			 treeConfigWin.show();
			 Ext.getCmp("treeconfig").setValue(treeConfig);
			 }
			 }]*/
		});
	},

	createLayerLegendPanel : function() {
	
		return new GeoExt.LegendPanel({
			id: 'gv-layer-legend',
			labelCls: 'mylabel',
			title		: __('Legend'),
			/* This allows optional suppression of WMS GetLegendGraphic that may be erroneous (500 err) for a Layer, fixes issue 3 */
			filter : function(record) {
				return !record.get("layer").noLegend;
			},
			bodyStyle: 'padding:5px',
			defaults   : {
				useScaleParameter : false
			}
		});
	},

	createSearchPanel : function(options) {
		//TODO: make this more flexible
		var ds = new Ext.data.Store({
			proxy: new Ext.data.ScriptTagProxy({
				url: 'http://research.geodan.nl/esdin/autocomplete/complete.php'
			}),
			reader: new Ext.data.JsonReader({
				root: 'data'
			},[
				{name: 'id', type: 'string'},
				{name: 'name', type: 'string'},
				{name: 'quality', type: 'string'}
			])
		});

		//TODO: make this more flexible
		return new Ext.form.FormPanel({
			title: options.title,
			hideLabels: true,
			method: 'GET',
			url: 'http://research.geodan.nl/esdin/autocomplete/geocode.php',
			
			frame:false,
			items: [
				new Ext.form.ComboBox({
					store        : ds,
					displayField : 'name',
					valueField	 : 'id',
					typeAhead    : true,
					allowBlank	 : false,
					hideTrigger:true,
				
					loadingText  : __('Searching...')
				})
			],
			layout: 'fit',
			//TODO: make this more flexible
			buttons: [
				{text:"search",
				type: 'submit',
				method: 'GET',
				url: 'http://research.geodan.nl/esdin/autocomplete/geocode.php',
				formBind: true,
				handler: function(){
				form=this.findParentByType('form').getForm();
				form.submit({
					url:'http://research.geodan.nl/esdin/autocomplete/geocode.php',
					method: 'GET',
					params:{'query':form.items.items[0].value},
					success:function(form, record) {
						var lat = record.result.data[0].latitude;
						var lon = record.result.data[0].longitude;
						GeoViewer.Map.layers[0].map.setCenter(new OpenLayers.LonLat(lon,lat),10);
						}
					})
				}}
			]
			

	   });
	},
	// TODO: make the search button work


	createMapPanel : function(options) {
		return new GeoViewer.MapPanel(options);
	},

	createContextBrowserPanel : function() {
		var options = {};
		options.id = 'gv-context-browser';
		options.title = __('Contexts');

		options.html = '<div class="gv-html-panel-body">';

		var contexts = GeoViewer.contexts;
		for (var i = 0; i < contexts.length; i++) {
			options.html += '<a href="#" title="' + contexts[i].desc + '" onclick="GeoViewer.main.setMapContext(\'' + contexts[i].id + '\'); return false;">' + contexts[i].name + '</a><br/>';
		}

		options.html += '</div>';

		return this.createHTMLPanel(options);
	},

	/**
	 * Factory method: create new Panel by type with options.
	 *
	 * @param type a Panel type gv-*
	 * @param options optional options to pass to Panel constructor
	 */
	createPanel : function(type, options) {
		switch (type) {
			case 'gv-context-browser':
				return this.createContextBrowserPanel();

			case 'gv-feature-info':
				return this.createFeatureInfoPanel(options);

			case 'gv-feature-data':
				return this.createFeatureDataPanel(options);

			case 'gv-html':
				// Standard HTML Panel
				return this.createHTMLPanel(options);

			case 'gv-layer-browser':
				return this.createLayerBrowserPanel(options);

			case 'gv-layer-legend':
				return this.createLayerLegendPanel();

			case 'gv-search':
				return this.createSearchPanel(options);

			case 'gv-map':
				return this.createMapPanel(options);

			case 'gv-user':
				// User-defined panel: anything goes
				return GeoViewer.User.createPanel(options);
		}
	},

	/**
	 * Constructor: create and layout Panels from config.
	 */
	initComponent : function() {
		Ext.apply(this, this.config.options);

		GeoViewer.ContainerPanel.superclass.initComponent.apply(this, arguments);

		var panels = this.config.panels;
		for (var i = 0; i < panels.length; i++) {
			this.add(this.createPanel(panels[i].type, panels[i].options));
		}
	}
});

