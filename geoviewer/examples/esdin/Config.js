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
		text:'BaseLayers', nodeType: "gx_baselayercontainer"
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
		nodeType: "gx_themenode",  theme: 'AD', children:
			[
				{
					nodeType: "gx_featurelayercontainer", featureType: 'Address'
				}
			]
	},
	{
		id:'2',text:'Adminstrative Units', leaf: false, children:
			[
				{text:'AdministrativeBoundary', leaf: true}
				,
				{text:'AdministrativeUnit', leaf: true}
				,
				{text:'Condominium', leaf: true}
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
/*	{
		id:'5',text:'Geographical Names',  leaf: false, children:
			[
				{
					id: '51', text:'NamedPlace', checked: false, leaf: true, children:
						[
							{ id: '511', nodeType: "gx_layer", layer: "Hungary: GN", text: 'Hungary', leaf: true },
							{ id: '512', nodeType: "gx_layer", layer: "Norway: GN", text: 'Norway', leaf: true },
							{ id: '513', nodeType: "gx_layer", layer: "Sweden: GN", text: 'Sweden', leaf: true },
							{ id: '514', nodeType: "gx_layer", layer: "Finland: GN", text: 'Finland', leaf: true }
						]
				}
			]
	}  */
	,
	{
		nodeType: "gx_themenode",  theme: 'GN', children:
			[
				{
					nodeType: "gx_featurelayercontainer", featureType: 'NamedPlace'
				}
			]
	}
	,
	{
		id:'6',text:'Hydrography', leaf: false, children:
			[
				{text:'SurfaceWater', leaf: true}
				,
				{text:'StandingWater', leaf: true}
			]
	}

	,
	{
		id:'7',text:'Protected Sites', leaf: false, children:
			[
				{text:'ProtectesSite', leaf: true}
			]
	}

	,
	{
		id:'8',text:'European topography', leaf: false, children:
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
		id:'9',text:'Transport Networks', leaf: false, children:
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
			height: 80,
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
				type: 'gv-feature-info',
				options: {
					region : "south",
					border : true,
					collapsible : true,
					collapsed : true,
					height : 205,
					split : true,
					maxFeatures	: 10
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
	,GeoViewer.Catalog.layers.kadasterAD
	,GeoViewer.Catalog.layers.nlsf_fgiCP
	,GeoViewer.Catalog.layers.kadasterCP
	,GeoViewer.Catalog.layers.skGN
	,GeoViewer.Catalog.layers.nlssGN
	,GeoViewer.Catalog.layers.kmsGN
	,GeoViewer.Catalog.layers.nlsf_fgiGN
	,GeoViewer.Catalog.layers.fomiGN
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
