/*
 * Copyright (C) 2010  Het Kadaster - The Netherlands
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


/**
 * 
 */
Ext.namespace("GeoExt.tree");

/** api: (define)
 *  module = GeoExt.tree
 *  class = ThemeNode
 */

/** api: (extends)
 * Ext/widgets/tree/AsyncTreeNode.js
 */

/** api: constructor
 * .. class:: ThemeNode
 *
 *	 Represents a single Theme from the Catalog. A Theme
 *   is a container for Feature types. Each Feature may contain one or more Layers.
 *   (see FeatureLayerContainer).
 *
 *	 To use this node type in ``TreePanel`` config, set nodeType to
 *	 "gx_themenode".
 */
GeoExt.tree.ThemeNode = Ext.extend(Ext.tree.AsyncTreeNode, {

	themeId: null,
	theme: null,

	/** private: method[constructor]
	 *  Private constructor override.
	 */
	constructor: function(config) {
		// Assign the theme entry from the catalog
		this.themeId = config.theme;
		this.theme = GeoViewer.Catalog.themes[this.themeId];

		config = Ext.applyIf(config || {}, {
			// Use the theme name as configured in Catalog
			text: this.theme.name
		});

		GeoExt.tree.ThemeNode.superclass.constructor.call(this, config);
	}
});

/**
 * NodeType: gx_themenode
 */
Ext.tree.TreePanel.nodeTypes.gx_themenode = GeoExt.tree.ThemeNode;
