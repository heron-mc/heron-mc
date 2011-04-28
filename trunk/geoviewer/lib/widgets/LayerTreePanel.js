/*
 * Copyright (C) 2011  Het Kadaster - The Netherlands
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

/** api: constructor
 *  .. class:: LayerTreePanel(config)
 *
 *  A panel designed to hold link shortcuts to map contexts (layers/zoom/center).
 */
GeoViewer.LayerTreePanel = Ext.extend(Ext.tree.TreePanel, {

	initComponent : function() {
		var treeConfig;

		if (this.hropts && this.hropts.tree) {
			treeConfig = this.hropts.tree;
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
		var options = {
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
		};

		Ext.apply(this, options);
		GeoViewer.LayerTreePanel.superclass.initComponent.call(this);
	}
});

/** api: xtype = gv_layertreepanel */
Ext.reg('gv_layertreepanel', GeoViewer.LayerTreePanel);

