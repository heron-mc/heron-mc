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
 * .. class:: FeatureTypeContainer
 *
 * A layer container that collects all layers of a Feature type.
 * A Feature type is a child of a Theme (see ThemeNode.js) and contains
 * one or more OpenLayers Layers.
 *
 *	 To use this node type in ``TreePanel`` config, set nodeType to
 *	 "gx_featuretypecontainer".
 */
GeoExt.tree.FeatureTypeContainer = Ext.extend(GeoExt.tree.LayerContainer, {

	/** private: method[constructor]
	 *  Private constructor override.
	 */
	constructor: function(config) {

		config = Ext.applyIf(config || {}, {
			leaf: true,
			checked: false
		});

		// this.attributes.featureType will store featuretype name
		// featureTypename is index into theme in Catalog
		GeoExt.tree.FeatureTypeContainer.superclass.constructor.call(this, config);
	},

	/** private: method[getFeatureType]
	 */
	getFeatureType: function() {
		var theme = GeoViewer.Catalog.themes[this.attributes.themeId];
		return theme.featureTypes[this.attributes.featureType]
	},

	/** private: method[render]
	 *  :param bulkRender: ``Boolean``
	 */
	render: function(bulkRender) {
		// Store in attributes on first render, as we may switch parents through drag/drop
		if (!this.attributes.themeId) {
			this.attributes.themeId = this.parentNode.themeId;			
		}

		// Get the featureType object and use its name for text display
		this.text = this.getFeatureType().name;

		// Set callback when checked/unchecked
		this.on({
			"checkchange": this.onCheckChange, scope: this
		});

		GeoExt.tree.LayerNode.superclass.render.apply(this, arguments);
	},

	/** private: method[onCheckChange]
	 *  :param node: ``GeoExt.tree.LayerNode``
	 *  :param checked: ``Boolean``
	 *
	 *  Handler for checkchange events. Toggles layer visibility. 
	 */
	onCheckChange: function(node, checked) {
		var layers = this.getFeatureType().layers;
		for (var i = 0; i < layers.length; i++) {
			GeoViewer.Catalog.layers[layers[i]].setVisibility(checked);
		}
	}
});

/**
 * NodeType: gx_featuretypecontainer
 */
Ext.tree.TreePanel.nodeTypes.gx_featuretypecontainer = GeoExt.tree.FeatureTypeContainer;
