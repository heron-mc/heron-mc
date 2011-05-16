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

/** This config assumes the DefaultOptions.js to be included first!! */

GeoViewer.options.map.settings.allOverlays = true;
GeoViewer.scratch.layermap.osm.setVisibility(true);

// Define a minimal tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
var treeTheme = [
	{
		text:'BaseMaps', expanded: true, children:
			[
				{nodeType: "gx_layer", layer: "OpenStreetMap", text: 'OpenStreetMap' },
				{nodeType: "gx_layer", layer: "TopRaster", text: 'TopoRaster' },
				{nodeType: "gx_layer", layer: "Luchtfoto (NLR)", text: 'Luchtfoto (NLR)' },
				{nodeType: "gx_layer", layer: "Blanco", text: 'Blanc' }
			]
	},
	{
		text:'Themes', children:
			[
				{
					text:'Cadastral Maps (zoom > 6)', children:
						[
							{nodeType: "gx_layer", layer: "Kadastrale Vlakken (tiled)", text: 'Cadastral Parcels' },
							{nodeType: "gx_layer", layer: "Kadastrale Gebouwen (tiled)", text: 'Buildings' },
							{nodeType: "gx_layer", layer: "Kadastrale Teksten", text: 'Texts (House Numbers)' },
							{nodeType: "gv_multilayer", layers: "Kadastrale Vlakken (tiled),Kadastrale Gebouwen (tiled)", text: 'Buildings+Parcels' }
						]
				},
				{
					text:'Weather', children:
						[
							{nodeType: "gx_layer", layer: "KNMI Radar", text: 'Rain Radar' },
							{nodeType: "gx_layer", layer: "KNMI Radar Color", text: 'Rain Radar (Coloured)' }
						]
				},
				{
					text:'MultiTest', children:
						[
							{nodeType: "gv_multilayer", layers: "KNMI Radar,KNMI Radar Color", text: 'Rain Radar (ALL)' }
						]
				}

			]
	}
];

// Replace default layer browser DefaultConfig.js
// Pass our theme tree config as an option
Ext.namespace("GeoViewer.options.layertree");

GeoViewer.options.layertree.tree = treeTheme;

GeoViewer.layout = {
	xtype: 'panel',

	/* Optional ExtJS Panel properties, see ExtJS API docs. */
	id: 'gv-container-main',
	layout: 'border',

	items: [
		{
			xtype: 'panel',

			id: 'gv-menu-left-container',
			layout: 'vbox',
			layoutConfig: {
				align : 'stretch',
				pack  : 'start'
			},
			region : "west",
			width: 240,
			collapsible: true,
			border: false,
			items: [
				{
					xtype: 'gv_activelayerspanel',
					height: 240,
					flex: 3

				},
				{
					xtype: 'gv_layertreepanel',
					flex: 4,

					hropts: GeoViewer.options.layertree
				}
			]

		},
		{
			xtype: 'panel',

			id: 'gv-map-and-info-container',
			layout: 'border',
			region: 'center',
			width: '100%',
			collapsible: false,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'gv_mappanel',
					id: 'gv-map',
					region: 'center',
					collapsible : false,
					border: false,
					hropts: GeoViewer.options.map
				},
				{
					xtype: 'gv_featureinfopanel',
					id: 'gv-feature-info',
					region: "south",
					border: true,
					collapsible: true,
					collapsed: true,
					height: 205,
					split: true,
					maxFeatures: 10
				}
			]
		}
	]
};