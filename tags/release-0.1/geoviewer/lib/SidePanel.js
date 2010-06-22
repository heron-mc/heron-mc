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

GeoViewer.SidePanel = Ext.extend(
		Ext.Panel,
{
	map : null,

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
		// using OpenLayers.Format.JSON to create a nice formatted string of the
		// configuration for editing it in the UI
		var treeConfig = new OpenLayers.Format.JSON().write([
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
		], true);

		// create the tree with the configuration from above
		return new Ext.tree.TreePanel({
			id: "gv-layer-browser",
			border: true,
			title : GeoViewer.lang.txtLayers,
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
			title		: GeoViewer.lang.txtLegend,
			bodyStyle: 'padding:5px'
		});
	},

	createContextBrowserPanel : function() {
		var options = {};
		options.id = 'gv-context-browser';
		options.title = GeoViewer.lang.txtMapContexts;

		options.html = '<div class="gv-html-panel-body">';

		var contexts = GeoViewer.contexts;
		for (var i = 0; i < contexts.length; i++) {
			options.html += '<a href="#" title="' + contexts[i].desc + '" onclick="GeoViewer.main.getMainPanel().setMapContext(\'' + contexts[i].id + '\'); return false;">' + contexts[i].name + '</a><br/>';
		}

		options.html += '</div>';

		return this.createHTMLPanel(options);
	},

	createPanel : function(type, options) {
		switch (type) {
			case 'gv-layer-browser':
				return this.createLayerBrowserPanel();

			case 'gv-layer-legend':
				return this.createLayerLegendPanel();

			case 'gv-html':
				// Standard HTML Panel
				return this.createHTMLPanel(options);

			case 'gv-context-browser':
				return this.createContextBrowserPanel();

			case 'gv-user':
				// User-defined panel: anything goes
				return GeoViewer.User.createPanel(options);
		}
	},

	initComponent : function() {
		Ext.apply(this, this.config.options);

		GeoViewer.SidePanel.superclass.initComponent.apply(this, arguments);

		var panels = this.config.panels;
		for (var i = 0; i < panels.length; i++) {
			this.add(this.createPanel(panels[i].type, panels[i].options));
		}
	}
});

