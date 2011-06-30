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

// custom layer node UI class
var LayerNodeUI = Ext.extend(
		GeoExt.tree.LayerNodeUI,
		new GeoExt.tree.TreeNodeUIEventMixin()
);

/** api: (define)
 *  module = Heron.widgets
 *  class = ActiveLayersPanel
 *  base_link = `Ext.tree.TreePanel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.tree.TreePanel>`_
 */

/** api: constructor
 *  .. class:: ActiveLayersPanel(config)
 *
 *  A panel designed to hold selected layers.
 */
Heron.widgets.ActiveLayersPanel = Ext.extend(Ext.tree.TreePanel, {

			applyStandardNodeOpts: function(opts, layer) {
				if (opts.component) {
					opts.component.layer = layer;
				}
				opts.layerId = layer.id;
			},

			initComponent : function() {
				var self = this;

				var options = {
					id: "hr-activelayers",
					border: true,
					title : __('Active Layers'),
					// collapseMode: "mini",
					autoScroll: true,
					enableDD: true,
					// apply the tree node component plugin to layer nodes
					plugins: [
						{
							ptype: "gx_treenodecomponent"
						}
					],
					loader: {
						applyLoader: false,
						uiProviders: {
							"custom_ui": LayerNodeUI
						}
					},
					root: {
						nodeType: "gx_layercontainer",
						loader: {
							baseAttrs: {
								uiProvider: "custom_ui",
								iconCls : 'gx-activelayer-drag-icon'
							},
							createNode: function(attr) {
								if (self.hropts) {
									Ext.apply(attr, self.hropts);
									self.applyStandardNodeOpts(attr, attr.layer);
								}
								return GeoExt.tree.LayerLoader.prototype.createNode.call(this, attr);
							},
							/**  Add only visible layers */
							filter: function(record) {
								var layer = record.getLayer();
								return layer.getVisibility();
							}

						}
					},
					rootVisible: false,
					lines: false
				};

				Ext.apply(this, options);
				Heron.widgets.ActiveLayersPanel.superclass.initComponent.call(this);

				// Delay processing, since the Map and Layers may not be available.
				this.addListener("afterrender", this.onAfterRender);

			},

			onAfterRender : function() {
				var self = this;
				var map = Heron.App.getMap();
				map.events.register('changelayer', null, function(evt) {
					var layer = evt.layer;
					var rootNode = self.getRootNode();

					var layerNode = rootNode.findChild('layerId', evt.layer.id);

					if (evt.property === "visibility") {
						// Quickfix issue 47: opacity should not be remembered
						layer.setOpacity(1.0);

						// Add or remove layer node dependent on visibility
						if (evt.layer.getVisibility() && !layerNode) {
							// Layer made visible: add if not yet in tree
							var attr = {};
							if (self.hropts) {
								Ext.apply(attr, self.hropts);
								self.applyStandardNodeOpts(attr, layer);
							}

							attr.uiProvider = LayerNodeUI;
							attr.layer = layer;
							attr.nodeType = "gx_layer";
							attr.iconCls = 'gx-activelayer-drag-icon';
							var newNode = new Ext.tree.TreePanel.nodeTypes[attr.nodeType](attr);

							// Remember current top layer node in stack before adding new node
							var topLayer;
							if (rootNode.firstChild) {
								topLayer = rootNode.firstChild.layer;
							}

							// Always insert new Node as first child, i.e. on top of the layer stack
							rootNode.insertBefore(newNode, rootNode.firstChild);

							// JvdB : Always raise the new layer to become top layer if it was already active before
							// Fixes issue #49 (stacking order incorrect sometimes)
							if (topLayer) {
								map.setLayerIndex(newNode.layer, map.getLayerIndex(topLayer) + 1);
							}

						} else if (!evt.layer.getVisibility() && layerNode) {
							layerNode.un("move", this.onChildMove, this);
							layerNode.remove();
							// Layer made invisible: remove from view
							//rootNode.removeChild(layerNode);
						}
						rootNode.reload();
					}
				});
			}
		});

/** api: xtype = hr_activelayerspanel */
Ext.reg('hr_activelayerspanel', Heron.widgets.ActiveLayersPanel);

