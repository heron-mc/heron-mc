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

	createHTMLPanel : function(options) {

		if (options.url) {
			options.autoLoad = {url: options.url}
		}

		options.listeners = {
			show: function() {
				this.loadMask = new Ext.LoadMask(this.body, {
					msg: GeoViewer.lang.txtLoading
				});
			}
		};

		return new Ext.Panel(options);
	},

	createLayerBrowserPanel : function() {
		var layerRoot = new Ext.tree.TreeNode();
		// add base layers (WMS)
		layerRoot.appendChild(new GeoExt.tree.BaseLayerContainer({
			expanded: true
			,text: "Background layer"
		}));
		// add thematic layers
		for (aTheme in themes)
		{
			var themeNode = new Ext.tree.TreeNode(
				{
					text: themes[aTheme].name
					,expanded: true
				}
			);
			layerRoot.appendChild(themeNode);
			for (aFeatureType in themes[aTheme].featuretypes)
			{
				themeNode.appendChild(
					new GeoExt.tree.LayerContainer(
						{
							text: aFeatureType
							,leaf: false
							,expanded: true
							,loader: {
								filter: function(record) {
									alert("theme: " + themes[aTheme].name + ", featureType: " + aFeatureType);
									return (record.get("layer").theme == themes[aTheme]
										&& record.get("layer").options.protocol.featureType == aFeatureType);
								}
							}
						}
					)
				)
			};
		};
		return new Ext.tree.TreePanel(
			{
				title: GeoViewer.lang.txtLayers
				,region: "west"
				,width: 200
				,split: true
				,collapsible: true
				,collapseMode: "mini"
				,autoScroll: true
				,rootVisible: false
				,root: layerRoot
				,enableDD: true
			}
		);
	},

	createLayerLegendPanel : function() {
		return new GeoExt.LegendPanel({
			id: 'gv-layer-legend',
			labelCls: 'mylabel',
			title		: GeoViewer.lang.txtLegend,
			/* This allows optional suppression of WMS GetLegendGraphic that may be erroneous (500 err) for a Layer, fixes issue 3 */
			filter : function(record) {
				return !record.get("layer").noLegend;
			},			
			bodyStyle: 'padding:5px'
		});
	},
	
	createSearchPanel : function(options) {
		
		if (options.completeUrl) {
			return new Ext.form.FormPanel({
				id: "gv-search",
				url:options.completeUrl,
				method: 'POST',
				title		: GeoViewer.lang.txtSearch,
				items: [
					new Ext.form.ComboBox({
						id : 'searchfield',
						store: new Ext.data.JsonStore({
							url: options.completeUrl,
							root: 'data',
							idProperty: 'id',
							 fields: ['id','name']
						}),
						displayField:'name',
						typeAhead: true,
						hideLabel: true,
						mode: 'remote',
						queryParam: 'query',  //contents of the field sent to server.
						hideTrigger: true,    //hide trigger so it doesn't look like a combobox.
						selectOnFocus:true,
						width: 200
					})
				],
			buttons: [
				{text:"Search"
				,formBind:true
				
				}
				
			]
		});
	}
	},
// TODO: make the search button work
	

	createMapPanel : function(options) {
		return new GeoViewer.MapPanel(options);
	},
	
	createContextBrowserPanel : function() {
		var options = {};
		options.id = 'gv-context-browser';
		options.title = GeoViewer.lang.txtMapContexts;

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

			case 'gv-html':
				// Standard HTML Panel
				return this.createHTMLPanel(options);

			case 'gv-layer-browser':
				return this.createLayerBrowserPanel();

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

