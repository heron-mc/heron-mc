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

Ext.namespace("Heron.tree");

/** api: (define)
 *  module = Heron.tree
 *  class = UserLayerContainer
 *  base_link = `GeoExt.MapPanel <http://geoext.org/lib/GeoExt/widgets/tree/LayerContainer.html>`_
 */

/** api: constructor
 * .. class:: UserLayerContainer
 *
 *     A layer container that will collect user-added layers of an OpenLayers
 *     map. Only layers with a record attribute "source" will be
 *     included. The childrens' iconCls defaults to
 *     "hr-tree-node-icon-layer-raster" and this node' text defaults to "User-Added" Layers.
 *
 *     To use this node type in ``TreePanel`` config, set nodeType to
 *     "hr_userlayercontainer".
 *
 *  Example config.
 *
 *  .. code-block:: javascript
 *
 *     Heron.options.layertree.tree = [
     {
    		text:'User-Added Layers', nodeType: 'hr_userlayercontainer', expanded: true, children: []
     },
 	 {
 		text:'Current Maps', expanded: true, children: [
 			{nodeType: "gx_layer", layer: "Ordnance Survey"},
 			{nodeType: "gx_layer", layer: "Ordnance Survey - Rasters"},

 */
Heron.tree.UserLayerContainer = Ext.extend(GeoExt.tree.LayerContainer, {

    /** private: property[text]
     *  ``String`` The text for this node.
     */
    text: __('User-Added Layers'),

    /** private: property[initialLoad]
     *  ``Boolean`` Has initial loading of the layer tree been performed?
     */
    initialLoad: false,

    /** private: method[constructor]
     *  Private constructor override.
     */
    constructor: function (config) {
        config = Ext.applyIf(config || {}, {
            text: this.text,
            loader: {}
        });
        var self = this;
        config.loader = Ext.applyIf(config.loader, {
            baseAttrs: Ext.applyIf(config.loader.baseAttrs || {}, {
                iconCls: 'hr-tree-node-icon-layer-raster'
            }),
            filter: function (record) {
                var layer = record.getLayer();

                // Only hide if not yet first time loaded
                if (this.initialLoad === false) {
                    self.ui.hide();
                }

                // For now only add records with a "source" attribute, i.e. loaded from
                // a dynamic source. TODO: make smarter
                var hasSource = record.data.source;
                if (hasSource !== undefined) {
                    self.ui.show();
                    this.initialLoad = true;
                    return true;
                }
                return false;
            }
        });

        Heron.tree.UserLayerContainer.superclass.constructor.call(this, config);

        // Initially hidden. TODO: how to display as folder icon
        if (this.ui) {
            this.ui.hide();
        }
    }
});

/**
 * NodeType: hr_userlayercontainer
 */
Ext.tree.TreePanel.nodeTypes.hr_userlayercontainer = Heron.tree.UserLayerContainer;
