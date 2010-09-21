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
GeoExt.tree.FeatureLayerContainer = Ext.extend(GeoExt.tree.LayerContainer, {
	featureType : null,
	/** private: method[constructor]
	 *  Private constructor override.
	 */
	constructor: function(config) {
		// Assign the feature type string name (is index into theme in Catalog)
		this.featureType = config.featureType;
		config = Ext.applyIf(config || {}, {
			leaf: true,
			checked: false
		});
		GeoExt.tree.FeatureLayerContainer.superclass.constructor.call(this, config);
	},
	/** private: method[render]
	 *  :param bulkRender: ``Boolean``
	 */
	render: function(bulkRender) {
		// Get the featureType object from the theme (original from the Catalog)
		this.featureType = this.parentNode.theme.featureTypes[this.featureType];
		this.text = this.featureType.name;
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
	 *  handler for checkchange events
	 */
	onCheckChange: function(node, checked) {
		var layers = this.featureType.layers;
		//TODO: create/destroy featuretype-store
		createDataStore(node, checked);
		for (var i = 0; i < layers.length; i++) {
			GeoViewer.Catalog.layers[layers[i]].setVisibility(checked);
			//TODO: check if the eventlisteners already exist
			GeoViewer.Catalog.layers[layers[i]].events.on({"featuresadded":  this.featuresAdded});
			GeoViewer.Catalog.layers[layers[i]].events.on({"featuresremoved":  this.featuresRemoved});
		}
	},
	//Function called when features have been added to the map
	//Once features have been added to the map, these features have to be applied to the correct datastore
	// TODO: I've not yet figured out how to pass the catalog-name of the layer (or the layer as a whole) to the event listener
	// So now you are stuck with an object where you know the layer name, but have to parse the catalog to find it. You need
	// to know its catalog name to be able to find out what featuretype it is, which will give you the datastore
	featuresAdded: function(e) {
		// e is a layer. We need to know its theme and feature type to get its data store.
		var theTheme = null;
		var theFeatureType = null;
		var theLayer = this;
		for (aTheme in GeoViewer.Catalog.themes)
			{
				var agasg = 1; // temporary variable for setting a breakpoint
				for (aFeatureType in GeoViewer.Catalog.themes[aTheme].featureTypes)
				{
					var agasg2 = aFeatureType; // temporary variable for setting a breakpoint
					for (aLayer in GeoViewer.Catalog.themes[aTheme].featureTypes[aFeatureType].layers)
					{
						var agasg3 = GeoViewer.Catalog.themes[aTheme].featureTypes[aFeatureType].layers[aLayer]; // temporary variable for setting a breakpoint
						if (aLayer == this)
						{
							var agasg = 1; // temporary variable for setting a breakpoint
							theTheme = aTheme;
							theFeatureType = aFeatureType;
						}
					}
				}
			}
		//for (var i=GeoViewer.Catalog.themes.length-1; i>=0; --i ){
		//	if (GeoViewer.Catalog.themes[i]. == ) {
		//	}
		//}
		var name = this.name;
		var features = e.features;
		var agasg = 1; // temporary variable for setting a breakpoint
	},
	//Function called when features have been removed from the map
	//
	featuresRemoved: function(e) {
		//alert('false');
		var agasg = 3; // temporary variable for setting a breakpoint
	}
});

	// Function to create DataStores for each enabled FeatureType
	function createDataStore(node, checked) {
		var storeName = node.parentNode.attributes.theme + "_" + node.attributes.featureType; 
		if(checked) {
			Ext.namespace("GeoViewer.Stores");
			// find the right theme
			var theTheme = null;
			for (aTheme in GeoViewer.Catalog.themes)
			{
				if (aTheme == node.parentNode.attributes.theme) {
					theTheme = aTheme;
				}
			}
			if(!GeoViewer.Stores[storeName]) {
				GeoViewer.Stores[storeName] = new GeoExt.data.FeatureStore({
					Fields: GeoViewer.Catalog.themes[theTheme].featureTypes[node.attributes.featureType].fields
				});
			}
			var agasg = 2; // temporary variable for setting a breakpoint
		}
		else {
			GeoViewer.Stores[storeName].destroy();
		}
	};
	

/**
 * NodeType: gx_FeatureLayerContainer
 */
Ext.tree.TreePanel.nodeTypes.gx_featurelayercontainer = GeoExt.tree.FeatureLayerContainer;
