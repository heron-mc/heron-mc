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

/*
 var removeLayerAction = new Ext.Action({
 text: "Remove Layer",
 icon: '../images/delete.png',
 disabled: false,
 tooltip: "Remove Layer",
 handler: function () {
 var node = layerTree.getSelectionModel().getSelectedNode();
 if (node && node.layer) {
 var layer = node.layer;
 var store = node.layerStore;
 store.removeAt(store.findBy(function (record) {
 return record.get("layer") === layer
 }))
 }
 }
 });
 */

/** api: constructor
 *  .. class:: LayerTreePanel(config)
 *
 *  A panel designed to hold trees of Map Layers.
 */
Heron.widgets.LayerTreePanel = Ext.extend(Ext.tree.TreePanel, {

	/** api: config[title]
	 *  default value is "Layers".
	 */
	title:__('Layers'),

	/** api: config[textbaselayers]
	 *  default value is "Base Layers".
	 *  Only valid if not using the 'hropts' option
	 */
	textbaselayers:__('Base Layers'),

	/** api: config[textoverlays]
	 *  default value is "Overlays".
	 *  Only valid if not using the 'hropts' option
	 */
	textoverlays:__('Overlays'),

	/** api: config[lines]
	 *  Flag for showing tree lines
	 *  default value is "false".
	 */
	lines:false,

	layerResolutions:{},
	appliedResolution:0.0,
	autoScroll: true,

	initComponent:function () {
		var treeConfig;
		if (this.hropts && this.hropts.tree) {
			treeConfig = this.hropts.tree;
		} else {
			treeConfig = [
				{
					nodeType:"gx_baselayercontainer",
					text:this.textbaselayers,
					expanded:true
					/*,
					 loader: {
					 baseAttrs : {checkedGroup: 'gx_baselayer'}
					 }
					 */
				},
				{
					nodeType:"gx_overlaylayercontainer",
					text:this.textoverlays
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
		var layerTree = this;
		var options = {
			// id: "hr-layer-browser",
			border:true,
			title:this.title,
			// collapseMode: "mini",
			autoScroll:true,
			containerScroll:true,
			loader:new Ext.tree.TreeLoader({
				// applyLoader has to be set to false to not interfere with loaders
				// of nodes further down the tree hierarchy
				applyLoader:false,
				uiProviders:{
					"layerNodeUI":GeoExt.tree.LayerNodeUI
				}
			}),
			root:{
				nodeType:"async",
				// the children property of an Ext.tree.AsyncTreeNode is used to
				// provide an initial set of layer nodes. We use the treeConfig
				// from above, that we created with OpenLayers.Format.JSON.write.
				children:Ext.decode(treeConfig)
			},
			rootVisible:false,
			// headerCls: 'hr-header-text',
			enableDD:true,
			lines:this.lines

			/*
			 , listeners: {
			 contextmenu: function (node, e) {
			 node.select();
			 var c = node.getOwnerTree().contextMenu;
			 c.contextNode = node;
			 c.showAt(e.getXY())
			 },
			 scope: this
			 },
			 contextMenu: new Ext.menu.Menu({
			 items: [
			 {
			 text: "Zoom to Layer Extent",
			 iconCls: "icon-find",
			 // icon: '../images/arrow_out.png',
			 handler: function () {
			 var node = layerTree.getSelectionModel().getSelectedNode();
			 if (node && node.layer) {
			 this.map.zoomToExtent(node.layer.maxExtent)
			 }
			 },
			 scope: this
			 },
			 {
			 text: "Metadata",
			 icon: '../images/grid.png',
			 handler: function () {
			 if (!winContext) {
			 var node = layerTree.getSelectionModel().getSelectedNode();
			 var layername = node.text;
			 var winContext = new Ext.Window({
			 title: '<span style="color:#000000; font-weight:bold;">Metadaten: </span>' + layername,
			 layout: 'fit',
			 text: layername,
			 width: 800,
			 height: 500,
			 closeAction: 'hide',
			 plain: true,
			 items: [tabsMetadata],
			 buttons: [
			 {
			 text: 'Schlie&szlig;en',
			 handler: function () {
			 winContext.hide()
			 }
			 }
			 ]
			 })
			 }
			 winContext.show(this)
			 },
			 scope: this
			 },
			 removeLayerAction,
			 {
			 text: "Zusatzlayer hinzuf&uuml;gen",
			 icon: '../images/add.png',
			 handler: function () {
			 if (!capabiltieswin) {
			 var capabiltieswin = new Ext.Window({
			 title: "WMS Layer hinzuf&uuml;gen",
			 layout: 'fit',
			 width: '600',
			 height: 'auto',
			 border: false,
			 closable: true,
			 collapsible: true,
			 x: 450,
			 y: 100,
			 resizable: true,
			 closeAction: 'hide',
			 plain: true,
			 tbar: [tabsMetadata]
			 })
			 }
			 capabiltieswin.show(this)
			 }
			 }
			 ]
			 })
			 */

		};

		Ext.apply(this, options);
		Heron.widgets.LayerTreePanel.superclass.initComponent.call(this);

		// Delay processing, since the Map and Layers may not be available.
		this.addListener("beforedblclick", this.onBeforeDblClick);
		this.addListener("afterrender", this.onAfterRender);
		this.addListener("expandnode", this.onExpandNode);
	},

	onBeforeDblClick:function (node, evt) {
		// @event beforedblclick
		// Fires before double click processing. Return false to cancel the default action.
		// @param {Node} this This node
		// @param {Ext.EventObject} e The event object
		return false;
	},

	onExpandNode:function (node) {
		for (var i = 0; i < node.childNodes.length; i++) {
			var child = node.childNodes[i];
			if (child.leaf) {
				this.setNodeEnabling(child, Heron.App.getMap());
			}
		}
	},

	onAfterRender:function () {
		var self = this;
		var map = Heron.App.getMap();
		self.applyMapMoveEnd();
		map.events.register('moveend', null, function (evt) {
			self.applyMapMoveEnd();
		});
	},

	applyMapMoveEnd:function () {
		var map = Heron.App.getMap();
		if (map) {
			if (map.resolution != this.appliedResolution) {
				this.setNodeEnabling(this.getRootNode(), map);
				this.appliedResolution = map.resolution;
			}
		}
	},

	setNodeEnabling:function (rootNode, map) {
		rootNode.cascade(
				function(node) {
					var layer = node.layer;
					if (!layer) {
						return;
					}
					var layerMinResolution = layer.minResolution ?  layer.minResolution : map.resolutions[map.resolutions.length - 1];
					var layerMaxResolution = layer.maxResolution ?  layer.maxResolution : map.resolutions[0];
					node.enable();
					if (map.resolution < layerMinResolution || map.resolution > layerMaxResolution) {
						node.disable();
					} 
				}
		);
	}
});

/** api: xtype = hr_layertreepanel */
Ext.reg('hr_layertreepanel', Heron.widgets.LayerTreePanel);
