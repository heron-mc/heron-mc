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
		var theme = this.parentNode.theme.id;
		var featureType = this.featureType;
		var featureTypeLayerName = theme + "_" + featureType.name;
		Ext.namespace("GeoViewer.FeatureTypeLayers");
		// Create a new FeatureType layer (if it does not exist) that will contain the combined features
		// of all the layers of this feature type.
		if(!GeoViewer.FeatureTypeLayers[featureTypeLayerName])
		{
			var style = GeoViewer.Styles.Default;
			if (GeoViewer.Styles[featureTypeLayerName])
			{
				style = GeoViewer.Styles[featureTypeLayerName];
			}
			GeoViewer.FeatureTypeLayers[featureTypeLayerName] = new OpenLayers.Layer.Vector(
				featureTypeLayerName
				,{
					strategies: [new OpenLayers.Strategy.Refresh]
					,styleMap: style
					,visibility: true
					,displayOutsideMaxExtent: false
					,projection: new OpenLayers.Projection("EPSG:4326")
					,themeId: theme
					,featureType: featureType
				}
			);
			GeoViewer.main.getMap().addLayer(GeoViewer.FeatureTypeLayers[featureTypeLayerName]);
			for (var i = 0; i < layers.length; i++) {
				layers[i].setVisibility(checked);
				layers[i].events.on({"featuresadded":  this.featuresAdded});
				layers[i].events.on({"featuresremoved":  this.featuresRemoved});
			}
		}
		//Switch the visibility of the layer on or off
		GeoViewer.FeatureTypeLayers[featureTypeLayerName].setVisibility(checked);
		manageDataStore(node, checked);
	},
	
	//Function called when features have been added to the map
	//Once features have been added to the map, these features have to be applied to the correct datastore
	// TODO: I've not yet figured out how to pass the catalog-name of the layer (or the layer as a whole) to the event listener
	// So now you are stuck with an object where you know the layer name, but have to parse the catalog to find it. You need
	// to know its catalog name to be able to find out what featuretype it is, which will give you the datastore
	featuresAdded: function(e) {
		// the current object (this) is a layer
		// This event should not occur with FeatureTypeLayers!
		if (!this.options.themeId)
		{
			return;
		}
		var theme = this.options.themeId;
		var featureType = this.options.protocol.featureType;
		var featureTypeLayerName = theme + "_" + featureType;
		GeoViewer.FeatureTypeLayers[featureTypeLayerName].addFeatures(this.features);
		// Now that features are copied to the FeatureTypeLayer we can hide the source layer(s)
		for (layer in GeoViewer.Map.layers)
		{
			if (GeoViewer.Map.layers[layer].options)
			{
				if (GeoViewer.Map.layers[layer].options.themeId)
				{
					if (GeoViewer.Map.layers[layer].options.themeId == theme)
					{
						GeoViewer.Map.layers[layer].setVisibility(false);
						GeoViewer.Map.layers[layer].options.strategies[0].deactivate();
					}
				}
			}
		}
		/*
		this.setVisibility(false);
		// Deactive the layer strategy (BBOX), so no new features will be requested
		this.options.strategies[0].deactivate;
		*/
		GeoViewer.FeatureTypeLayers[featureTypeLayerName].redraw();
	},
	
	//Function called when features have been removed from the map
	featuresRemoved: function(e) {
		var theme = this.options.themeId;
		var featureType = this.options.protocol.featureType;
		var featureTypeLayerName = theme + "_" + featureType;
		GeoViewer.FeatureTypeLayers[featureTypeLayerName].destroyFeatures(this.features);
	}
});

// create a new field for a DataStore
function storeField(name,type)
{
	this.name=name;
	this.type=type;
}

// create a new column for a GridPanel
function gridColumn(header,dataIndex)
{
	this.header=header;
	this.dataIndex=dataIndex;
}

// Function to create or destroy a DataStore and GridPanel for the selected node in the layer tree
function manageDataStore(node, checked) {
        var gridPanel;
        var tabName;
	var theme = node.parentNode.attributes.theme;
	var featureType = node.attributes.featureType;
	var storeName = theme + "_" + featureType;
	var featureTypeLayerName = theme + "_" + featureType;
	var tabPanel = Ext.getCmp('gv-feature-data');
	if(checked) {
		gridPanel = Ext.getCmp("gridPanel_" + featureTypeLayerName);
		tabName = "tab_" + featureTypeLayerName;
		// if the gridPanel alrady exists we only have to unhide it
		if (gridPanel)
		{
			tabPanel.unhideTabStripItem(tabName);
			gridPanel.show();
		}
		else
		{
			Ext.namespace("GeoViewer.Stores");
			var storeFields = new Array();
			var gridColumns = [new Ext.grid.RowNumberer({width:30})]; // the first column is always a record count
			//var gridColumns = [new Ext.grid.RowNumberer()]; // the first column is always a record count
			var name;
			var type;
			for (attribute in GeoViewer.Catalog.themes[theme].featureTypes[node.attributes.featureType].attributes)
			{
				name = GeoViewer.Catalog.themes[theme].featureTypes[node.attributes.featureType].attributes[attribute].name;
				type = GeoViewer.Catalog.themes[theme].featureTypes[node.attributes.featureType].attributes[attribute].type;
				displayName = GeoViewer.Catalog.themes[theme].featureTypes[node.attributes.featureType].attributes[attribute].displayName;
				storeFields.push(new storeField(name,type));
				gridColumns.push(new gridColumn(displayName, name));
			}
			if(!GeoViewer.Stores[storeName]) 
			{
				GeoViewer.Stores[storeName] = new GeoExt.data.FeatureStore(
					{
						layer: GeoViewer.FeatureTypeLayers[featureTypeLayerName]
						,fields: storeFields
					}
				);
			}
			// add a GridPanel to the feature data panel
			gridPanel = new Ext.grid.GridPanel(
				{
					id: "gridPanel_" + featureTypeLayerName
					,autoWidth: true
					,autoHeight: false // If this is set to true we won't have a scrollbar
					,autoScroll: true
					,viewConfig: {forceFit: true}
					,collapsible: false
					,collapseMode: "mini"
					,store: GeoViewer.Stores[storeName]
					,sm: new GeoExt.grid.FeatureSelectionModel()
					,cm: new Ext.grid.ColumnModel(
						{
							defaults: {
								sortable: true
							}
							,columns: gridColumns
						}
					)
				}
			);
			if (!Ext.getCmp(tabName)) {
				var tab = tabPanel.add(
					{
						title: theme + ": " + node.attributes.featureType
						,id: tabName
						,iconCls: 'tabs'
						,closable: false
						,layout: 'fit'
						,items: gridPanel
					}
				)
			}
			else 
			{
				tab = Ext.getCmp(tabName);
			}
			tabPanel.setActiveTab(tab);
			tabPanel.doLayout();
			tabPanel.show();
		}
	}
	else {
		// We hide the tab and the grid panel, in case the user makes the feature type visible again.
		gridPanel = Ext.getCmp("gridPanel_" + featureTypeLayerName);
		tabName = "tab_" + featureTypeLayerName;
		tabPanel.hideTabStripItem(tabName);
		gridPanel.hide();
	}
}

/**
 * NodeType: gx_FeatureLayerContainer
 */
Ext.tree.TreePanel.nodeTypes.gx_featurelayercontainer = GeoExt.tree.FeatureLayerContainer;