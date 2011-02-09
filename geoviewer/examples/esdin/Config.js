/*
 * Copyright (C) 2010  Het Kadaster
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
Ext.namespace("GeoViewer.Map");

GeoViewer.lang = GeoViewer.Catalog.lang.en;

GeoViewer.treeConfig = [
	{
		text:'Background topography', nodeType: "gx_baselayercontainer"
	}
	,{
		nodeType: "gx_themenode",  theme: 'GN', children:
			[
				{
					nodeType: "gx_featurelayercontainer", featureType: 'NamedPlace'
				}
			]
	}
	,{
		nodeType: "gx_themenode",  theme: 'HY', children:
			[
				{nodeType: "gx_featurelayercontainer", featureType: 'StandingWater'}
				,{nodeType: "gx_featurelayercontainer", featureType: 'Watercourse'}
				,{nodeType: "gx_featurelayercontainer", featureType: 'LandWaterBoundary'}
				,{nodeType: "gx_featurelayercontainer", featureType: 'Lock'}
				,{nodeType: "gx_featurelayercontainer", featureType: 'DamOrWeir'}
			]
	}
	,{
		nodeType: "gx_themenode",  theme: 'TN', children:
			[
				{nodeType: "gx_featurelayercontainer", featureType: 'RoadArea'}
				,{nodeType: "gx_featurelayercontainer", featureType: 'RoadLink'}
				,{nodeType: "gx_featurelayercontainer", featureType: 'RoadNode'}
			]
	}
	,{
		nodeType: "gx_themenode",  theme: 'AU', children:
			[
				{nodeType: "gx_featurelayercontainer", featureType: 'AdministrativeBoundary'}
				,{nodeType: "gx_featurelayercontainer", featureType: 'AdministrativeUnit'}
			]
	}
	,{
		nodeType: "gx_themenode",  theme: 'CP', children:
			[
				{
					nodeType: "gx_featurelayercontainer", featureType: 'CadastralParcel'
				}
			]
	}
	,{
		nodeType: "gx_themenode",  theme: 'ExM', children:
			[
				{text:'DamOrWeir', leaf: true}
				,{text:'GlacierSnowfield', leaf: true}
				,{text:'LandWaterBoundary', leaf: true}
			]
	}

];

GeoViewer.layout = {
	north: {
		options : {
			layout: 'border',
			width: '100%',
			height: 60,
			bodyBorder: false,
			border: false
		},
		panels: [
			{
				type: 'gv-html',
				options: {
					id: 'gv-logo-panel',
					region: 'center',
					bodyBorder: false,
					border: false,
					url: 'viewer-north.html',
					height: 55
				}
			}/*,
			 {
			 type: 'gv-user',
			 options: {
			 id: 'gv-menu-panel',
			 region: 'south',
			 bodyBorder: false,
			 border: false,
			 height: 25
			 }
			 } */
		]
	},
	center : {
		options : {
			layout: 'border',
			width: '100%',
			collapsible: false,
			split	: true,
			border: false
		},
		panels: [
			{
				type: 'gv-map',
				options: {
					region: 'center',
					collapsible : false,
					border: false
				}
			}
			/*
			,{
				type: 'gv-feature-data'
				,options: {
					id: 'gv-feature-data'
					,region : "south"
					,border : true
					,collapsible : true
					,collapsed : false
					,height : 196
					,split : true
					,autoScroll: true
					,deferredRender : false
				}
			}
			*/
		]
	},
	west : {
		options : {
			layout: 'accordion',
			width: 240,
			collapsible: true,
			split	: true,
			border: false
		}
		,panels: [
			{
				type: 'gv-layer-browser',
				options: {
					// Pass in our tree, if none specified the default config is used
					tree: GeoViewer.treeConfig
				}
			}
			,
			{
				type: 'gv-html',
				options: {
					id: 'gv-info-west',
					autoLoad: 'information.html',
					preventBodyReset: true, // prevent ExtJS disabling browser styles
					title: 'Information'
				}
			}
			,
			{
				type: 'gv-html',
				options: {
					id: 'gv-help-west',
					autoLoad: 'help.html',
					preventBodyReset: true, // prevent ExtJS disabling browser styles
					title: 'Help'
				}
			}
			
			 ,{
			 type: 'gv-search',
			 options: {
				title: 'Search for location'
			// completeUrl: 'http://research.geodan.nl/esdin/autocomplete/complete.php'
			 }

			 }
			 
			/*
			 ,{
			 type: 'gv-layer-legend'
			 }
			 */
		]
	}
};

/** Use epsg: 4258 projection/resolutions options. */
GeoViewer.Map.options = GeoViewer.Catalog.options4258;

// load all layers from the catalog:
GeoViewer.Map.layers = [];
for (layer in GeoViewer.Catalog.layers)
{
	GeoViewer.Map.layers.push(GeoViewer.Catalog.layers[layer]);
}

GeoViewer.Map.toolbar = [
	{
		type: "downloadfeatures",
		options: {
			tooltip: GeoViewer.lang.txtGetFeatures
			,iconCls: "icon-download"
			,enableToggle : false
			,handler: function() {
				if (!GeoViewer.FeatureTypeLayers) // To do: Do not check if feature layers exist, but if they are visible
				{
					Ext.MessageBox.alert('Information', GeoViewer.lang.txtNoFeatureTypesChecked);
					return;
				}
				if (GeoViewer.FeatureTypeLayers.length == 0) 
				{
					Ext.MessageBox.alert('Information', GeoViewer.lang.txtNoFeatureTypesChecked);
					return;
				}
				for (ftLayerName in GeoViewer.FeatureTypeLayers)
				{
					// remove features and turn source layers back on
					var theme = GeoViewer.FeatureTypeLayers[ftLayerName].themeId;
					var featureType = GeoViewer.FeatureTypeLayers[ftLayerName].featureType;
					if (GeoViewer.FeatureTypeLayers[ftLayerName].getVisibility())
					{
						GeoViewer.FeatureTypeLayers[ftLayerName].removeFeatures(); // which one?
						GeoViewer.FeatureTypeLayers[ftLayerName].destroyFeatures(); // which one?
						for (layer in GeoViewer.Map.layers)
						{
							if (GeoViewer.Map.layers[layer].options)
							{
								if (GeoViewer.Map.layers[layer].options.themeId)
								{
									if (GeoViewer.Map.layers[layer].options.themeId == theme)
									{
										GeoViewer.Map.layers[layer].setVisibility(true);
										GeoViewer.Map.layers[layer].events.on({"featuresadded": this.featuresAdded});
										GeoViewer.Map.layers[layer].options.strategies[0].activate;
									}
								}
							}
						}
					}
				}
			}
			,pressed : false
			,id:"downloadfeatures"
			//,toggleGroup: "toolGroup"
		},
		create: function(mapPanel, options) {
			return new Ext.Action(options);
		}
	},
	{type: "-"} ,
	//{type: "featureinfo"},
	//{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{type: "zoomprevious"},
	{type: "zoomnext"},
	{type: "-"},
	{type: "measurelength"},
	{type: "measurearea"}
];


/* Map Contexts. */
GeoViewer.contexts = [];


/**
 * Invokes GeoViewer as full screen app.
 */
Ext.onReady(function() {
	GeoViewer.main.create();
	GeoViewer.main.showFullScreen();
}, GeoViewer.main);
