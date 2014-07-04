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


//var removeLayerAction = new Ext.Action({
//    text: "Remove Layer",
//    icon: '../images/delete.png',
//    disabled: false,
//    tooltip: "Remove Layer",
//    handler: function () {
//        var node = layerTree.getSelectionModel().getSelectedNode();
//        if (node && node.layer) {
//            var layer = node.layer;
//            var store = node.layerStore;
//            store.removeAt(store.findBy(function (record) {
//                return record.get("layer") === layer
//            }))
//        }
//    }
//});


/** api: constructor
 *  .. class:: LayerTreePanel(config)
 *
 *  A panel designed to hold trees of Map Layers.
 */
Heron.widgets.LayerTreePanel = Ext.extend(Ext.tree.TreePanel, {

    /** api: config[title]
     *  default value is "Layers".
     */
    title: __('Layers'),

    /** api: config[textbaselayers]
     *  default value is "Base Layers".
     *  Only valid if not using the 'hropts' option
     */
    textbaselayers: __('Base Layers'),

    /** api: config[textoverlays]
     *  default value is "Overlays".
     *  Only valid if not using the 'hropts' option
     */
    textoverlays: __('Overlays'),

    /** api: config[lines]
     *  Flag for showing tree lines
     *  default value is "false".
     */
    lines: false,

    /** api: config[ordering]
     *  Ordering of layer in the map comparerd to custom layertree
     *  default value is "none" (behaviour as in older versions)
     *  valid values: 'TopBottom', 'none'
     */
    ordering: 'none',

    /** api: config[layerIcons]
     *  Which icons to use for Layers in LayerNodes. Values 'default' (use Ext JS standard icons), '
     *  bylayertype' (Layer-type specific icons, e.g. for raster and vector) or
     *  'none' (no, i.e. blanc icon). Default value is default'. Used, unless the Layer Nodes (gx_layer entries) are explicitly
     *  configured with an 'iconCls', 'cls' or 'icon' config attribute.
     */
    layerIcons: 'bylayertype',

    /** api: config[useMapContext]
     *  Use the Heron Map Context (HMC) provided by Heron.App. The HMC defines a LayerTree. Default value is false.
     */
    useMapContext: false,

    layerResolutions: {},
    appliedResolution: 0.0,
    autoScroll: true,
    enableDD: true,
    plugins: [
        {
            ptype: "gx_treenodecomponent"
        }
    ],

    /** api: config[contextMenu]
     *  Context menu (right-click) for layer nodes, for now instance of Heron.widgets.LayerNodeContextMenu. Default value is null.
     */
    contextMenu: null,
    blnCustomLayerTree: false,
    jsonTreeConfig: null,

    initComponent: function () {
        var layerTreePanel = this;
        var treeConfig;

        // Special case: loading from a global MapContext
        if (this.useMapContext) {
            var context = Heron.App.getMapContext();
            this.tree = context.layerTree;
        }

        // To deal with old/deprecated configs with hropts.tree
        Ext.apply(this, this.hropts);

        if (this.tree) {
            this.blnCustomLayerTree = true;
            treeConfig = this.tree;
        } else {
            treeConfig = [
                {
                    nodeType: "gx_baselayercontainer",
                    text: this.textbaselayers,
                    expanded: true
                    /*,
                     loader: {
                     baseAttrs : {checkedGroup: 'gx_baselayer'}
                     }
                     */
                },
                {
                    nodeType: "gx_overlaylayercontainer",
                    text: this.textoverlays
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
        this.jsonTreeConfig = new OpenLayers.Format.JSON().write(treeConfig, true);
        // custom layer node UI class
        var LayerNodeUI = Ext.extend(
            GeoExt.tree.LayerNodeUI,
            new GeoExt.tree.TreeNodeUIEventMixin()
        );

        var options = {
            // id: "hr-layer-browser",
            title: this.title,
            // collapseMode: "mini",
            autoScroll: true,
            containerScroll: true,
            loader: new Ext.tree.TreeLoader({
                // applyLoader has to be set to false to not interfere with loaders
                // of nodes further down the tree hierarchy
                applyLoader: false,
                uiProviders: {
                    "custom_ui": LayerNodeUI
                },

                createNode: function (attr) {
                    // Use our specialized createNode() function
                    return layerTreePanel.createNode(this, attr);
                }
            }),
            root: {
                nodeType: "async",
                baseAttrs: {
                    uiProvider: "custom_ui"
                },

                // the children property of an Ext.tree.AsyncTreeNode is used to
                // provide an initial set of layer nodes. We use the treeConfig
                // from above, that we created with OpenLayers.Format.JSON.write.
                children: Ext.decode(this.jsonTreeConfig)
            },
            rootVisible: false,
            // headerCls: 'hr-header-text',
            enableDD: this.enableDD,
            lines: this.lines,
            listeners: {
                contextmenu: function (node, e) {
                    node.select();
                    var cm = this.contextMenu;
                    if (cm) {
                        cm.contextNode = node;
                        cm.showAt(e.getXY());
                    }
                },
                beforemovenode: function (tree, node, oldParent, newParent, index) {
                    this.oldNodeNr = this.getNodePosition(tree, node);
                },
                movenode: function (tree, node, oldParent, newParent, index) {
                    this.newNodeNr = this.getNodePosition(tree, node);
                    //this.logMapLayers('before move');
                    if ((this.blnCustomLayerTree == true) &&
                        (this.ordering == 'TopBottom')) {
                        if (node.layer != undefined && node.attributes.checked == true) {
                            this.setLayerOrder(node);
                        } else {
                            //Determine whether we move up or down
                            var direction = this.oldNodeNr < this.newNodeNr ? 'down' : 'up';
                            this.setLayerOrderFolder(node, direction);
                        }
                    }
                    //tree, this.logMapLayers('after move');
                },
                checkchange: function (node, checked) {
                    if ((this.blnCustomLayerTree == true) &&
                        (this.ordering == 'TopBottom')) {
                        //this.logMapLayers('before check');
                        this.setLayerOrder(node);
                        //this.logMapLayers('after check');
                    }
                },
                scope: this
            }

        };

        if (this.contextMenu) {
            var cmArgs = this.contextMenu instanceof Array ? {items: this.contextMenu} : {};
            this.contextMenu = new Heron.widgets.LayerNodeContextMenu(cmArgs);
        }

        Ext.apply(this, options);
        Heron.widgets.LayerTreePanel.superclass.initComponent.call(this);

        // Delay processing, since the Map and Layers may not be available.
        this.addListener("beforedblclick", this.onBeforeDblClick);
        this.addListener("afterrender", this.onAfterRender);
        this.addListener("expandnode", this.onExpandNode);
    },

    createNode: function (treeLoader, attr) {
        // Nothing special to do: return Node immediately
        var mapPanel = Heron.App.getMapPanel();

        if (!mapPanel || !attr.layer || (this.layerIcons == 'default' && !attr.legend)) {
            return Ext.tree.TreeLoader.prototype.createNode.call(treeLoader, attr);
        }

        var layer = undefined;
        if (mapPanel && mapPanel.layers instanceof GeoExt.data.LayerStore) {
            var layerStore = mapPanel.layers;
            var layerIndex = layerStore.findExact('title', attr.layer);
            if (layerIndex >= 0) {
                var layerRecord = layerStore.getAt(layerIndex);
                layer = layerRecord.getLayer();
            }
        }

        if (this.layerIcons == 'none') {
            attr.iconCls = 'hr-tree-node-icon-none';
        }
        // Should we add specific icons for layers?
        if (layer) {
            var layerType = layer.CLASS_NAME.split('.').slice(-1)[0];

            if (this.layerIcons == 'bylayertype' && !(attr.iconCls || attr.cls || attr.icon)) {
                // Assign the LayerNode a CSS based on the broad Layer category (kind)

                // Default is raster, e.g. WMS, WMTS and TMS
                var layerKind = 'raster';
                if (layerType == 'Vector') {
                    layerKind = 'vector';

                    // Special case for Atom layers: is Vector Layer with Atom Format
                    if (layer.protocol
                        && layer.protocol.format
                        && layer.protocol.format.CLASS_NAME
                        && layer.protocol.format.CLASS_NAME.indexOf('Atom') > -1) {
                        layerKind = 'atom';
                    }
                }
                attr.iconCls = 'hr-tree-node-icon-layer-' + layerKind;
            }

            // Should a LayerLegend be added to the Node text?
            if (attr.legend) {

                // custom ui needed for evet/plugin interaction
                attr.uiProvider = "custom_ui";

                // WMS Legend (default) or Vector legend?
                var xtype = layerType == 'Vector' ? 'gx_vectorlegend' : 'gx_wmslegend';

                // add a WMS or Vector legend to each node created
                attr.component = {
                    xtype: xtype,
                    layerRecord: layerRecord,
                    showTitle: false,
                    // custom class for css positioning
                    cls: "hr-treenode-legend",
                    hidden: !layer.getVisibility()
                }
            }
        }
        return Ext.tree.TreeLoader.prototype.createNode.call(treeLoader, attr);
    },

    onBeforeDblClick: function (node, evt) {
        // @event beforedblclick
        // Fires before double click processing. Return false to cancel the default action.
        // @param {Node} this This node
        // @param {Ext.EventObject} e The event object
        return false;
    },

    onExpandNode: function (node) {
        for (var i = 0; i < node.childNodes.length; i++) {
            var child = node.childNodes[i];
            if (child.leaf) {
                this.setNodeEnabling(child, Heron.App.getMap());
            }
        }
    },

    onAfterRender: function () {
        var self = this;
        var map = Heron.App.getMap();
        self.applyMapMoveEnd();
        map.events.register('moveend', null, function (evt) {
            self.applyMapMoveEnd();
        });
        this.setInitialLayerOrder(this.root.attributes);
    },


    applyMapMoveEnd: function () {
        var map = Heron.App.getMap();
        if (map) {
            if (map.resolution != this.appliedResolution) {
                this.setNodeEnabling(this.getRootNode(), map);
                this.appliedResolution = map.resolution;
            }
        }
    },

    setNodeEnabling: function (rootNode, map) {
        rootNode.cascade(
            function (node) {
                var layer = node.layer;
                if (!layer) {
                    return;
                }
                var layerMinResolution = layer.minResolution ? layer.minResolution : map.resolutions[map.resolutions.length - 1];
                var layerMaxResolution = layer.maxResolution ? layer.maxResolution : map.resolutions[0];
                node.enable();
                if (map.resolution < layerMinResolution || map.resolution > layerMaxResolution) {
                    node.disable();
                }
            }
        );
    },
    logMapLayers: function (action) {
        // Log layers to console for debugging purposes ONLY
        console.log("Action: " + action);
        var map = Heron.App.getMap();
        for (var i = 0; i < map.layers.length; i++) {
            console.log(i + ": " + map.layers[i].name);
        }
    },
    getBaseLayerCount: function (map) {
        var intBaseLayers = 0;
        for (var i = 0; i < map.layers.length; i++) {
            if (map.layers[i].isBaseLayer) {
                intBaseLayers++;
            }
        }
        return intBaseLayers;
    },
    setInitialLayerOrder: function () {
        if ((this.blnCustomLayerTree == true) &&
            (this.ordering == 'TopBottom')) {
            if (this.root != null) {
                this.intLayer = -1;
                //this.logMapLayers('before setInitialLayerOrder');
                this.setVisibleLayersOrder(this.root.attributes);
                //this.logMapLayers('before setInitialLayerOrder');
            }
        }
    },
    setVisibleLayersOrder: function (child) {
        // after loading/rendering the layertree the nodes are not all accessable yet
        // so we have to find the visible layers from attributes as loaded from
        // the initial treeConfig
        var map = Heron.App.getMap();
        if (child.layer != undefined) {
            if (child.checkedGroup != "gx_baselayer") {
                var intLayerNew = 0;
                if (child.checked == true) {
                    this.intLayer++;
                    intLayerNew = map.layers.length - this.intLayer - 1;
                } else {
                    // Place unchecked layers just above baselayers
                    intLayerNew = this.getBaseLayerCount(map);
                }
                //console.log ('layer ' + child.layer + ' to position: ' + intLayerNew);
                map.setLayerIndex(map.getLayersByName(child.layer)[0], intLayerNew);
                //this.logMapLayers('after setVisibleLayersOrder');
            }
        } else if (child.children.length > 0) {
            for (var i = 0; i < child.children.length; i++) {
                this.setVisibleLayersOrder(child.children[i]);
            }
        }
    },
    setLayerOrder: function (node) {
        var map = Heron.App.getMap();
        var intLayerNr = 0;
        if (node.attributes.checked == true) {
            intLayerNr = this.getLayerNrInTree(node.layer.name);
            intLayerNr = map.layers.length - intLayerNr;
        } else {
            // Place unchecked layers just above baselayers
            intLayerNr = this.getBaseLayerCount(map);
        }
        //console.log ('layer ' + node.layer.name + ' to position: ' + intLayerNr);
        map.setLayerIndex(node.layer, intLayerNr);
        //this.logMapLayers('after setLayerOrder');

    },
    setLayerOrderFolder: function (node, direction) {
        if (node.layer != undefined && node.attributes.checked == true) {
            this.setLayerOrder(node);
        } else {
            if (direction == 'up') {
                for (var i = 0; i < node.childNodes.length; i++) {
                    this.setLayerOrderFolder(node.childNodes[i]);
                }
            } else {
                for (var j = node.childNodes.length - 1; j >= 0; j--) {
                    this.setLayerOrderFolder(node.childNodes[j]);
                }
            }
        }

    },
    getLayerNrInTree: function (layerName) {
        var treePanel = Heron.App.topComponent.findByType('hr_layertreepanel')[0];
        this.intLayer = -1;
        var blnFound = false;
        if (treePanel != null) {
            var treeRoot = treePanel.root;
            if (treeRoot.childNodes.length > 0) {
                for (var intTree = 0; intTree < treeRoot.childNodes.length; intTree++) {
                    if (blnFound == false) {
                        blnFound = this.findLayerInNode(layerName, treeRoot.childNodes[intTree], blnFound)
                    }
                }
            }
        }
        return blnFound ? this.intLayer : -1;
    },
    findLayerInNode: function (layerName, node, blnFound) {
        if (blnFound == false) {
            if (node.layer != undefined) {
                if (node.attributes.checked) {
                    // Only count visible layers otherwise legend index gets mixed up
                    this.intLayer++;
                }
                if (node.layer == layerName || node.layer.name == layerName) {
                    blnFound = true;
                }
            } else {
                for (var i = 0; i < node.childNodes.length; i++) {
                    blnFound = this.findLayerInNode(layerName, node.childNodes[i], blnFound);
                }
            }
        }
        return blnFound;
    },
    getNodePosition: function (tree, node) {
        this.NodeNr = -1;
        this.findNodePosition(tree.root, node.id, false);
        return this.NodeNr;
    },
    findNodePosition: function (node, id, blnFound) {
        if (blnFound == false) {
            this.NodeNr++;
            if (node.id == id) {
                blnFound = true;
            } else if (node.childNodes != 'undefined') {
                for (var i = 0; i < node.childNodes.length; i++) {
                    blnFound = this.findNodePosition(node.childNodes[i], id, blnFound);
                }
            }
        }
        return blnFound;
    }
});

/** api: xtype = hr_layertreepanel */
Ext.reg('hr_layertreepanel', Heron.widgets.LayerTreePanel);
