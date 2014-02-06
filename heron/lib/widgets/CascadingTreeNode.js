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

/** api: constructor
 *  .. class:: CascadingTreeNode(config)
 *
 *      A subclass of ``Ext.tree.AsyncTreeNode`` that recursively toggles its childnodes when checked/unchecked.
 *      Can be used to switch on/off on multiple Layers in child GeoExt LayerNodes..
 */
Heron.widgets.CascadingTreeNode = Ext.extend(Ext.tree.AsyncTreeNode, {


    /** private: method[constructor]
     *  Private constructor override.
     */
    constructor: function () {

        Heron.widgets.CascadingTreeNode.superclass.constructor.apply(this, arguments);
        this.on({
            "checkchange": this.onCheckChange,
            scope: this
        });

    },


    /** private: method[onCheckChange]
     *  :param node: ``GeoExt.tree.LayerNode``
     *  :param checked: ``Boolean``
     *
     *  handler for checkchange events
     */
    onCheckChange: function (node, checked) {
        node.cascade(function (child) {
            if (child == node) {
                return;
            }
            if (child.ui.rendered) {
                child.ui.toggleCheck(checked);
            } else {
                child.attributes.checked = checked;
            }
        }, null, null);
    }
});

/**
 * NodeType: hr_cascader
 */
Ext.tree.TreePanel.nodeTypes.hr_cascader = Heron.widgets.CascadingTreeNode;