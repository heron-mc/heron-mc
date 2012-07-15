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
 *  class = LayerTreePanel
 *  base_link = `Ext.tree.TreePanel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.tree.TreePanel>`_
 */


/** api: constructor
 *  .. class:: LayerTreePanel(config)
 *
 *  A panel designed to hold trees of Map Layers.
 */
Heron.widgets.LayerTreePanel = Ext.extend(Ext.tree.TreePanel, {
	initComponent : function() {
		var treeConfig;
		if (this.hropts && this.hropts.tree) {
			treeConfig = this.hropts.tree;
		} else {
			treeConfig = [
				{
					nodeType: "gx_baselayercontainer",
					text: __('Base Layers'),

					expanded: true /*,
					loader: {
						baseAttrs : {checkedGroup: 'gx_baselayer'}
					}  */
				},
				{
					nodeType: "gx_overlaylayercontainer",
					text: __('Overlays')
				}
			]
		}
		// https://groups.google.com/forum/?fromgroups#!topic/geoext-users-archive/KAHqjTgWm_E
//		createIconNode = function(attr) {
//		  var layer_name = ....;
//		  attr.icon = '/servicesproxy/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=' + layer_name;
//		  return GeoExt.tree.LayerLoader.prototype.createNode.call(this, attr);
//		};
//
//		And then the treepanel looks like:
//
//		{
//		  xtype: "treepanel",
//		  loader: new Ext.tree.TreeLoader({
//			applyLoader: false
//		  }),
//		  root: {
//			nodeType: "async",
//			children: {
//			  nodeType: "gx_overlaylayercontainer",
//			  text: 'Some Layers',
//			  layerStore: myLayerStore,
//			  leaf: false,
//			  expanded: true,
//			  loader: {
//				createNode: createIconNode
//			  }
//			}
//		  }
//		}


		// using OpenLayers.Format.JSON to create a nice formatted string of the
		// configuration for editing it in the UI
		treeConfig = new OpenLayers.Format.JSON().write(treeConfig, true);
		var options = {
			id: "hr-layer-browser",
			border: true,
			title : __('Layers'),
			// collapseMode: "mini",
			autoScroll: true,
			containerScroll: true,
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
			headerCls : 'hr-header-text',
			enableDD: true,
			lines: false
		};

		Ext.apply(this, options);
		Heron.widgets.LayerTreePanel.superclass.initComponent.call(this);
	}
});

/** api: xtype = hr_layertreepanel */
Ext.reg('hr_layertreepanel', Heron.widgets.LayerTreePanel);