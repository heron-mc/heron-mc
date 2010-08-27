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
 * @requires GeoExt/widgets/tree/LayerContainer.js
 */
Ext.namespace("GeoExt.tree");

/** api: (define)
 *  module = GeoExt.tree
 *  class = OverlayLayerContainer
 */

/** api: (extends)
 * GeoExt/widgets/tree/LayerContainer.js
 */

/** api: constructor
 * .. class:: OverlayLayerContainer
 *
 *	 A layer container that will collect all overlay layers of an OpenLayers
 *	 map. Only layers that have displayInLayerSwitcher set to true will be
 *	 included.
 *
 *	 To use this node type in ``TreePanel`` config, set nodeType to
 *	 "gx_overlaylayercontainer".
 */
GeoExt.tree.ThemeNode = Ext.extend(Ext.tree.AsyncTreeNode, {

	theme: null,

	/** private: method[constructor]
	 *  Private constructor override.
	 */
	constructor: function(config) {
		// Assign the theme entry from the catalog
		this.theme = GeoViewer.Catalog.themes[config.theme];

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
