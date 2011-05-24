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

// TODO check if we still require this class, most can now be done with MultiLayerNode

/** api: (define)
 *  module = Heron.tree
 *  class = ThemeNode
 */

/** api: constructor
 * .. class:: ThemeNode
 *
 *	 Represents a single Theme from the Catalog. A Theme
 *   is a container for Feature types. Each Feature may contain one or more Layers.
 *   (see FeatureLayerContainer).
 *
 *	 To use this node type in ``TreePanel`` config, set nodeType to
 *	 "hr_themenode".
 */
Heron.tree.ThemeNode = Ext.extend(Ext.tree.AsyncTreeNode, {

	themeId: null,
	theme: null,

	/** private: method[constructor]
	 *  Private constructor override.
	 */
	constructor: function(config) {
		// Assign the theme entry from the catalog
		this.themeId = config.theme;
		this.theme = Heron.Catalog.themes[this.themeId];

		config = Ext.applyIf(config || {}, {
			// Use the theme name as configured in Catalog
			text: this.theme.name
		});

		Heron.tree.ThemeNode.superclass.constructor.call(this, config);
	}
});

/**
 * NodeType: hr_themenode
 */
Ext.tree.TreePanel.nodeTypes.hr_themenode = Heron.tree.ThemeNode;
