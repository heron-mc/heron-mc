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
		// Define as
		text:'Base layers', nodeType: "gx_baselayercontainer"
	},
	/*	{
	 id:'1',text:'BaseLayers', leaf: false, children:
	 [
	 {id:'11', nodeType: "gx_layer", layer: "World", text: 'World', leaf: true },
	 {id:'12', nodeType: "gx_layer", layer:"Euro Global Map" , text: 'Euro Global Map', leaf: true },
	 {id:'13', nodeType: "gx_layer", layer:"Euro Regional Map"  , text: 'Euro Regional Map', leaf: true },
	 {id:'14', nodeType: "gx_layer", layer: "Euro Boundary Map" , text: 'Euro Boundary Map', leaf: true }
	 ]
	 }
	 , */
	{
		nodeType: "gx_themenode",  theme: 'AU', children:
			[
				{nodeType: "gx_featurelayercontainer", featureType: 'AdministrativeBoundary'}
				,
				{nodeType: "gx_featurelayercontainer", featureType: 'AdministrativeUnit'}
				//,
				//{nodeType: "gx_featurelayercontainer", featureType: 'Condominium'}
			]
	},
	/*	,
	 {
	 id:'4',text:'Cadastral Parcels',  leaf: false, children:
	 [
	 {text:'CadastralParcel', checked: false, leaf: true, children:
	 [
	 { nodeType: "gx_layer", layer: "Finland: CP", text: 'Finland', leaf: true }
	 ]
	 }
	 ,
	 {text:'CadastralBoundary', leaf: true}
	 ]
	 } */
	{
		nodeType: "gx_themenode",  theme: 'CP', children:
			[
				{
					nodeType: "gx_featurelayercontainer", featureType: 'CadastralParcel'
				}
			]
	},
	{
		nodeType: "gx_themenode",  theme: 'GN', children:
			[
				{
					nodeType: "gx_featurelayercontainer", featureType: 'NamedPlace'
				}
			]
	}
	,
	{nodeType: "gx_themenode",  theme: 'HY', children:
			[
				{
					nodeType: "gx_featurelayercontainer", featureType: 'StandingWater'}
					,{nodeType: "gx_featurelayercontainer", featureType: 'Watercourse'}
					,{nodeType: "gx_featurelayercontainer", featureType: 'LandWaterBoundary'}
					,{nodeType: "gx_featurelayercontainer", featureType: 'Lock'
				}
			]
	}
	,
	{
		id:'8',text:'European topography (ExM)', leaf: false, children:
			[
				{text:'AdministrativeUnit', leaf: true}
				,
				{text:'NamedPlace', leaf: true}
				,
				{text:'DamOrWeir', leaf: true}
				,
				{text:'GlacierSnowfield', leaf: true}
				,
				{text:'LandWaterBoundary', leaf: true}
			]
	}
	,
	{
		id:'9',text:'Transport Networks (TN)', leaf: false, children:
			[
				{text:'RailwayTransport', leaf: true}
				,
				{text:'RoadTransport', leaf: true}
				,
				{text:'AirTransport', leaf: true}
				,
				{text:'WaterTransport', leaf: true}
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
			},
			{
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
					url: 'default-info.html',
					title: 'Info'
				}
			}
			/*
			 ,{
			 type: 'gv-search',
			 options: {
			 completeUrl: 'http://research.geodan.nl/esdin/autocomplete/complete.php'
			 }

			 }
			 */
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

/** Collect layers from catalog. */
GeoViewer.Map.layers = [
	// Base Layers
	GeoViewer.Catalog.layers.world
	,GeoViewer.Catalog.layers.ebm
	,GeoViewer.Catalog.layers.erm
	,GeoViewer.Catalog.layers.egm

	// Feature Layers
	,GeoViewer.Catalog.layers.ancpiAU
	,GeoViewer.Catalog.layers.ignfAU

	,GeoViewer.Catalog.layers.kmsAU
	,GeoViewer.Catalog.layers.skAU
	,GeoViewer.Catalog.layers.nlssAU
	,GeoViewer.Catalog.layers.nlsfAU
	,GeoViewer.Catalog.layers.ancpiAB	
	,GeoViewer.Catalog.layers.bevAB	
	,GeoViewer.Catalog.layers.nlsf_fgiCP
	,GeoViewer.Catalog.layers.kadasterCP
	,GeoViewer.Catalog.layers.skGN
	,GeoViewer.Catalog.layers.nlssGN
	,GeoViewer.Catalog.layers.kmsGN
	,GeoViewer.Catalog.layers.ignfGN
	,GeoViewer.Catalog.layers.ignbGN
	,GeoViewer.Catalog.layers.nlsf_fgiGN
	,GeoViewer.Catalog.layers.fomiGN
	,GeoViewer.Catalog.layers.nlssSW
	,GeoViewer.Catalog.layers.nlssLWB
	,GeoViewer.Catalog.layers.nlssL
	,GeoViewer.Catalog.layers.nlssWC
	,GeoViewer.Catalog.layers.geodan_egnGN
];

GeoViewer.Map.toolbar = [
	{
		type: "downloadfeatures",
		options: {
			tooltip: GeoViewer.lang.txtGetFeatures,
			iconCls: "icon-download",
			enableToggle : true,
			handler: function() {
				//Ext.MessageBox.alert('Information', 'Sorry, this does not work yet');
				if (!GeoViewer.FeatureTypeLayers) 
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
					var theme = GeoViewer.FeatureTypeLayers[ftLayerName].theme;
					var featureType = GeoViewer.FeatureTypeLayers[ftLayerName].featureType;
					GeoViewer.FeatureTypeLayers[ftLayerName].removeFeatures();
					for (layer in GeoViewer.Map.layers)
					{
						if (GeoViewer.Map.layers[layer].options.theme)
						{
							if (GeoViewer.Map.layers[layer].options.theme == theme.abbrev)
							{
								GeoViewer.Map.layers[layer].setVisibility(true);
								GeoViewer.Map.layers[layer].events.on({"featuresadded": this.featuresAdded});
								GeoViewer.Map.layers[layer].options.strategies[0].activate;
							}
						}
					}
				}
			},
			pressed : false,
			id:"downloadfeatures",
			toggleGroup: "toolGroup"
		},
		create: function(mapPanel, options) {
			return new Ext.Action(options);
		}
	},
	{type: "-"} ,
	{type: "featureinfo"},
	{type: "-"} ,
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
