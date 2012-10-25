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

/** custom layer node UI class  */
var ActiveThemesNodeUI = Ext.extend(
		GeoExt.tree.LayerNodeUI,
		new GeoExt.tree.TreeNodeUIEventMixin()
);

/**
* NodeType: hr_activethemes
*/

Ext.tree.TreePanel.nodeTypes.hr_activethemes = GeoExt.tree.LayerNode;

/** api: (define)
 *  module = Heron.widgets
 *  class = ActiveThemesPanel
 *  base_link = `Ext.tree.TreePanel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.tree.TreePanel>`_
 */

/** api: constructor
 *  .. class:: ActiveThemesPanel(config)
 *
 *  Displays a stack of selected layers from the map.
 *  The main purpose is to enable to change layer stacking (display) order, supported
 *  by standard drag-and-drop, plus manipulating individual layer opacity.
 *
 *  Example config with a per layer opacity-slider.
 *
 *  .. code-block:: javascript
 *
 *      {
 *	 		xtype: 'hr_activethemespanel',
 *	 		height: 240,
 *	 		flex: 3
 *	 	}
 *
 *
 */
Heron.widgets.ActiveThemesPanel = Ext.extend(Ext.tree.TreePanel, {

    /** api: config[title]
     *  default value is "Active Themes".
     */
	title : __('Active Themes'),

    /** api: config[qtip_up]
     *  default value is "Move up".
     */
	qtip_up: __('Move up'),

    /** api: config[qtip_down]
     *  default value is "Move down".
     */
	qtip_down: __('Move down'),

    /** api: config[qtip_remove]
     *  default value is "Remove layer from list".
     */
	qtip_remove: __('Remove layer from list'),

    /** api: config[qtip_tools]
     *  default value is "Remove layer from layer list".
     */
	qtip_tools: __('Tools'),

	applyStandardNodeOpts: function(opts, layer) {
		if (opts.component) {
			opts.component.layer = layer;
		}
		opts.layerId = layer.id;
	},

	initComponent : function() {
		var self = this;

		var options = {
			// id: "hr-activethemes",
			border: true,
			title: this.title,
			autoScroll: true,
			enableDD: true,
			// apply the tree node component plugin to layer nodes
			plugins: [
				{
					ptype: "gx_treenodeactions",
					listeners: {
            			action: this.onAction
        			}
				}
			],
			root: {
				nodeType: "gx_layercontainer",
				loader: {
					applyLoader: false,
					baseAttrs: {
						radioGroup: "radiogroup",
						uiProvider: ActiveThemesNodeUI
					},
					createNode: function(attr) {
						return self.createNode(self, attr);
					},
					// Add only visible layers
					filter: function(record) {
						return record.getLayer().getVisibility();
					}
				}
			},
			rootVisible: false,
			lines: false
		};

		Ext.apply(this, options);
		Heron.widgets.ActiveThemesPanel.superclass.initComponent.call(this);

		// Delay processing, since the Map and Layers may not be available.
		this.addListener("afterrender", this.onAfterRender);
		this.addListener("beforedblclick", this.onBeforeDblClick);
		this.addListener("beforenodedrop", this.onBeforeNodeDrop);
	},

	createNode : function(self, attr) {
		if (self.hropts) {
			Ext.apply(attr, self.hropts);
		} else {
			Ext.apply(attr, {} );
		}
		self.applyStandardNodeOpts(attr, attr.layer);
		attr.uiProvider = ActiveThemesNodeUI;
		attr.nodeType = "hr_activethemes";
		attr.iconCls = 'gx-activethemes-drag-icon';
		attr.actions= [
						{	action: "up",
							qtip: this.qtip_up,
							update: function(el) {
								// "this" references the tree node
	                            var layer = this.layer, map = layer.map;
	                            if (map.getLayerIndex(layer) == map.layers.length - 1) {
	                                el.addClass('disabled');
	                            } else {
	                                el.removeClass('disabled');
	                            }
	                        }
	                    }
	                    ,
						{	action: "down",
							qtip: this.qtip_down,
							update: function(el) {
								// "this" references the tree node
								var layer = this.layer, map = layer.map;
								if (map.getLayerIndex(layer) == 1) {
									el.addClass('disabled');
								} else {
									el.removeClass('disabled');
								}
							}
						}
						,
						{	action: "remove",
							qtip: this.qtip_remove
						}
						,
						{	action: "tools",
							qtip: this.qtip_tools,
							update: function(el) {
								// "this" references the tree node
								var layer = this.layer, map = layer.map;
							}
						}
					];

		return GeoExt.tree.LayerLoader.prototype.createNode.call(self, attr);
	},

	onBeforeDblClick : function(node, evt) {
		// @event beforedblclick
		// Fires before double click processing. Return false to cancel the default action.
		// @param {Node} this This node
		// @param {Ext.EventObject} e The event object
		return false;
	},

	onBeforeNodeDrop : function(dropEvt) {
		// @event beforenodedrop
		// @param {dropEvt} drop event
		// dropEvt properties:
		// tree - The TreePanel
		// target - The node being targeted for the drop
		// data - The drag data from the drag source
		// point - The point of the drop - append, above or below
		// source - The drag source
		// rawEvent - Raw mouse event
		// dropNode - Drop node(s) provided by the source OR you can supply node(s) to be inserted by setting them on this object.
		// cancel - Set this to true to cancel the drop.
		// dropStatus - If the default drop action is cancelled but the drop is valid, setting this to true will prevent the animated 'repair' from appearing.
		if (dropEvt) {
			switch(dropEvt.point) {
				case "above":
					return true;
					break;
				case "below":
					// No drop below a baselayer node
					var layer = dropEvt.target.layer;
					if (!layer.isBaseLayer) {
						return true;
					}
					break;
			}
		}
		return false;
	},

	// this function takes action based on the "action" parameter
	// it is used as a listener to layer nodes' "action" events
	onAction : function(node, action, evt) {

		var layer = node.layer;
		var actLayerId = layer.map.getLayerIndex(layer);

		switch(action) {

			case "up":
				// Look for previous node
				if (!layer.isBaseLayer) {
					var prevNode = node.previousSibling;
					if (prevNode) {
						// OL - layer index correction - push stack up
						var prevLayer = prevNode.layer;
						var prevLayerId = prevLayer.map.getLayerIndex(prevLayer);
						if (prevLayerId > actLayerId ) {
							layer.map.raiseLayer(layer, prevLayerId - actLayerId);
						}
					}
				}
				break;

			case "down":
				if (!layer.isBaseLayer) {
					// Look for next node
					var nextNode = node.nextSibling;
					if (nextNode) {
						// OL - layer index correction - push stack down
						var nextLayer = nextNode.layer;
						var nextLayerId = nextLayer.map.getLayerIndex(nextLayer);
						if (nextLayerId < actLayerId ) {
							if (!nextLayer.isBaseLayer) {
								layer.map.raiseLayer(layer, nextLayerId - actLayerId);
							}
						}
					}
				}
				break;

			case "remove":
				// Remove layer
				if (!layer.isBaseLayer) {

					// Set own text and default button style
					Ext.MessageBox.buttonText.yes = 'Remove';
					Ext.MessageBox.buttonText.no = '<span style="text-decoration:underline;font-weight:bold;color:#FF0000">Do nothing</>';

					// Set default button to receive focus when underlying window loses/regains focus
					Ext.MessageBox.getDialog().defaultButton = 2;	// default - NO

					Ext.MessageBox.show({
						title: String.format('Removing "{0}"', layer.name),
						msg: String.format('Are you sure you want to remove the layer "{0}" '+
										   'from your list of layers?', '<i><b>' + layer.name + '</b></i>'),
						buttons: Ext.Msg.YESNO,
						fn: function (btn) {
								if (btn == 'yes') {
									layer.setVisibility(false);
									layer.destroy();
								}
						},
						scope: this,
						icon: Ext.MessageBox.QUESTION,
						maxWidth: 300
					});

				} else {

					Ext.MessageBox.show({
						title: String.format('Removing "{0}"', layer.name),
						msg: String.format('You are not allowed to remove the baselayer "{0}" '+
										   'from your list of layers!', '<i><b>' + layer.name + '</b></i>'),
						buttons: Ext.Msg.OK,
						fn: function (btn) {
								if(btn == 'ok'){	}
						},
						icon: Ext.MessageBox.ERROR,
						maxWidth: 300
					});

				}
				break;

			case "tools":
				// Tools dialog
				var id = layer.map.getLayerIndex(layer);
				var num_id = layer.map.getNumLayers();

					Ext.MessageBox.show({
						title: String.format('Tools "{0}"', layer.name),
						msg: String.format('Here should be a form for "{0}" containing' +
										   ' infos, opacity slider, etc.!<br>' +

"<br>Layer: " + node + "<br>" + layer.name + "<br>" + layer.id + "<br>OL-LayerId: " + id + " (" + num_id + ")"

										   , '<i><b>' + layer.name + '</b></i>'),
						buttons: Ext.Msg.OK,
						fn: function (btn) {
								if(btn == 'ok'){
								}
						},
						icon: Ext.MessageBox.INFO,
						maxWidth: 300
					});

				break;
		}
	},

	onAfterRender : function() {
		var self = this;
		var map = Heron.App.getMap();

		map.events.register('changelayer', null, function(evt) {

			var layer = evt.layer;
			var rootNode = self.getRootNode();
			var layerNode = rootNode.findChild('layerId', evt.layer.id);

			if (evt.property === "visibility") {

				// Add layer node dependent on visibility and if not in tree
				if (evt.layer.getVisibility() && !layerNode) {

					// Create new layer node
					var newNode = self.createNode(self, {layer: layer});
					var newLayerId = layer.map.getLayerIndex(layer);

 					// Add layer node
					if (layer.isBaseLayer) {
						// baselayer
 						// Remember current bottom layer node in stack before adding new node
						var bottomLayer;
						var bottomLayerId;
						if (rootNode.lastChild) {
							bottomLayer = rootNode.lastChild.layer;
							if (bottomLayer) {
	 							bottomLayerId = bottomLayer.map.getLayerIndex(bottomLayer);
							}
						}
						// Always insert baselayer as last child, i.e. to bottom of the layer stack
						rootNode.appendChild(newNode);
						// OL - layer index correction - push to bottom of the layer stack
						if (bottomLayer) {
							if (newLayerId > bottomLayerId) {
								layer.map.raiseLayer(layer, bottomLayerId - newLayerId);
							}
						}
					} else {
						// layer
 						// Remember current top layer node in stack before adding new node
						var topLayer;
						var topLayerId;
						if (rootNode.firstChild) {
							topLayer = rootNode.firstChild.layer;
							if (topLayer) {
	 							topLayerId = topLayer.map.getLayerIndex(topLayer);
							}
						}
						// Always insert new node as first child, i.e. on top of the layer stack
						rootNode.insertBefore(newNode, rootNode.firstChild);
						// OL - layer index correction - push on top of the layer stack
						if (topLayer) {
							if (topLayerId > newLayerId ) {
								layer.map.raiseLayer(layer, topLayerId - newLayerId);
							}
						}
					}

				} else if (!evt.layer.getVisibility() && layerNode) {
					layerNode.un("move", self.onChildMove, self);
					layerNode.remove();
				}
			}
		});
	}
});

/** api: xtype = hr_activethemespanel */
Ext.reg('hr_activethemespanel', Heron.widgets.ActiveThemesPanel);
