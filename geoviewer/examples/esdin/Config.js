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
var treeThemes1 = [
	{
		id:'1',text:'BaseLayers', leaf: false, children:
			[
				{id:'11', nodeType: "gx_layer", layer: "World", text: 'World', leaf: true },
				{id:'12', nodeType: "gx_layer", layer:"Euro Global Map" , text: 'Euro Global Map', leaf: true },
				{id:'13', nodeType: "gx_layer", layer:"Euro Regional Map"  , text: 'Euro Regional Map', leaf: true },
				{id:'14', nodeType: "gx_layer", layer: "Euro Boundary Map" , text: 'Euro Boundary Map', leaf: true }
			]
	},
	
	
	
	{
		id:'2',text:'Themes', leaf: false, expanded:true, children:
			[
	/*			{
					id:'21',text:'Administrative Boundary', leaf: false, children:
						[
							{id:'211', nodeType: "gx_layer", layer: "Austria AB (no 4258) (wms)", text: 'Austria', leaf: true }
						]
				}
				,{
					id:'22',text:'Address', leaf: false, children:
						[
							{id:'221', nodeType: "gx_layer", layer: "the Netherlands AD (wms)", text: 'the Netherlands', leaf: true }
							
						]
				}
				,*/{
					id:'23',text:'Cadastral Parcels', checked: false, leaf: true, onClick: "function(){alert('foo');}", children:
						[
							//{id:'231', nodeType: "gx_layer", layer: "The Netherlands CP", text: 'the Netherlands', leaf: true }
							{id:'232', nodeType: "gx_layer", layer: "Finland: CP", text: 'Finland', leaf: true }
						]
				}
				,{
					id:'24',text:'Geographical Names', checked: false, leaf: false, children:
						[
							{id:'241', nodeType: "gx_layer", layer: "Hungary: GN", text: 'Hungary', leaf: true }
							,{id:'242', nodeType: "gx_layer", layer: "Norway: GN", text: 'Norway', leaf: true }
							//,{id:'243', nodeType: "gx_layer", layer: "Belgium GN", text: 'Belgium', leaf: true }
							,{id:'244', nodeType: "gx_layer", layer: "Sweden: GN", text: 'Sweden', leaf: true }
							,{id:'245', nodeType: "gx_layer", layer: "Finland: GN", text: 'Finland', leaf: true }
							//,{id:'246', nodeType: "gx_layer", layer: "Denmark: GN", text: 'Denmark', leaf: true }
						]
				}
			]
	}
];
GeoViewer.layout = {
	center : {
		options : {
			layout: 'border',
			width: '100%',
			collapsible: true,
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
					tree: treeThemes1
				}
			}
			,{
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
	GeoViewer.Catalog.layers.world
	,GeoViewer.Catalog.layers.egm
	,GeoViewer.Catalog.layers.erm
	,GeoViewer.Catalog.layers.ebm
	,GeoViewer.Catalog.layers.nlsf_fgiCP
	,GeoViewer.Catalog.layers.skGN
	,GeoViewer.Catalog.layers.nlssGN
	,GeoViewer.Catalog.layers.kmsGN
	,GeoViewer.Catalog.layers.nlsf_fgiGN
	,GeoViewer.Catalog.layers.fomiGN
];

/* Map Contexts. */
GeoViewer.contexts =
[
];
