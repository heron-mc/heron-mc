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

// This is an example how to create arbitrary Layer trees within the Layer Browser
// See ContainerPanel.js

// This is the default tree, used here just for reference
var treeDefault = [
	{
		nodeType: "gx_baselayercontainer",
		expanded: true
	},
	{
		nodeType: "gx_overlaylayercontainer",

		// render the nodes inside this container with a radio button,
		// and assign them the group "foo".
		loader: {
			baseAttrs: {
				/*radioGroup: "foo", */
				uiProvider: "layerNodeUI"
			}
		}
	}
];


// Define a tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
var treeThemes1 = [
	{
		id:'1',text:'BaseLayers', leaf: false, children:
			[
				{id:'11', nodeType: "gx_layer", layer: "OpenStreetMap", text: 'OpenStreetMap', leaf: true },
				{id:'12', nodeType: "gx_layer", layer: "TopRaster", text: 'TopoRaster', leaf: true },
				{id:'13', nodeType: "gx_layer", layer: "Luchtfoto (NLR)", text: 'Luchtfoto (NLR)', leaf: true },
				{id:'14', nodeType: "gx_layer", layer: "Blanco", text: 'Blanc', leaf: true }
			]
	},
	{
		id:'2',text:'Themes', leaf: false, expanded: true, children:
			[
				{
					id:'21',text:'Cadastral Maps (zoom > 6)', leaf: false, children:
                        [
                            {id:'211', nodeType: "gx_layer", layer: "Kadastrale Vlakken (tiled)", text: 'Cadastral Parcels', leaf: true },
                            {id:'212', nodeType: "gx_layer", layer: "Kadastrale Gebouwen (tiled)", text: 'Buildings', leaf: true },
                            {id:'213', nodeType: "gx_layer", layer: "Kadastrale Teksten", text: 'Texts (House Numbers)', leaf: true }
                        ]
				},
				{
					id:'22',text:'Weather', leaf: false, children:
						[
							{id:'221', nodeType: "gx_layer", layer: "KNMI Radar", text: 'Rain Radar', leaf: true },
							{id:'222', nodeType: "gx_layer", layer: "KNMI Radar Color", text: 'Rain Radar (Coloured)', leaf: true }
						]
				}
			]
	}
];

// Define a tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
var treeThemes2 = [
	{
		id:'1',text:'BaseLayers', leaf: false, children:
			[
				{id:'11', nodeType: "gx_layer", layer: "OpenStreetMap", text: 'OpenStreetMap', leaf: true },
				{id:'12', nodeType: "gx_layer", layer: "TopRaster", text: 'TopoRaster', leaf: true },
				{id:'13', nodeType: "gx_layer", layer: "Luchtfoto (NLR)", text: 'Luchtfoto (NLR)', leaf: true },
				{id:'14', nodeType: "gx_layer", layer: "Blanco", text: 'Blanc', leaf: true }
			]
	},
	{
		id:'2',text:'Themes', leaf: false, children:
			[
				{
					id:'21',text:'Cadastral Maps (zoom > 6)', leaf: false, children:
						[
							{id:'211', nodeType: "gx_layer", layer: "Kadastrale Vlakken (tiled)", text: 'Cadastral Parcels', leaf: true },
							{id:'212', nodeType: "gx_layer", layer: "Kadastrale Gebouwen (tiled)", text: 'Buildings', leaf: true },
							{id:'213', nodeType: "gx_layer", layer: "Kadastrale Teksten", text: 'Texts (House Numbers)', leaf: true }
						]
				},
				{
					id:'22',text:'Weather', leaf: false, children:
						[
							{id:'221', nodeType: "gx_layer", layer: "KNMI Radar", text: 'Rain Radar', leaf: true },
							{id:'222', nodeType: "gx_layer", layer: "KNMI Radar Color", text: 'Rain Radar (Coloured)', leaf: true }
						]
				}
			]
	}
];

// Replace default layer browser DefaultConfig.js
// Pass our theme tree config as an option
GeoViewer.layout.options.items[0].options.items[0] =
{
	type: 'gv-layer-browser',
	options: {
		// Pass in our tree, if none specified the default config is used
		tree: treeThemes1
	}
};

// Alter some map settings in order that parcels are displayed
GeoViewer.Map.options.CENTER =  new OpenLayers.LonLat(118561, 480615);
GeoViewer.Map.options.ZOOM = 10;