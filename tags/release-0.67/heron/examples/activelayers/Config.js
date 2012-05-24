/*
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


/** api: example[activelayers]
 *  Active Layers Panel
 *  -------------------
 *  Select layers into a stack of active layers and change opacity/stacking.
 */

/** This config assumes the DefaultOptions.js to be included first!! */

Heron.options.map.settings.allOverlays = true;
Heron.scratch.layermap.osm.setVisibility(true);
Heron.scratch.layermap.osm.setIsBaseLayer(false);
Heron.scratch.layermap.topraster.setIsBaseLayer(false);
Heron.scratch.layermap.luchtfotonlr.setIsBaseLayer(false);

// Define a minimal tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
var treeTheme = [
	{
		text:'BaseMaps', expanded: true, children:
			[
				{nodeType: "gx_layer", layer: "OpenStreetMap" },
				{nodeType: "gx_layer", layer: "TopRaster" },
				{nodeType: "gx_layer", layer: "Luchtfoto (NLR)" },
				{nodeType: "gx_layer", layer: "NL DEM Color" },
				{nodeType: "gx_layer", layer: "Blanco" }
			]
	},
	{
		text:'Themes', children:
			[
				{
					text:'Cadastral Maps (zoom > 6)', children:
						[
							{nodeType: "gx_layer", layer: "Kadastrale Vlakken (tiled)" },
							{nodeType: "gx_layer", layer: "Kadastrale Gebouwen (tiled)" },
							{nodeType: "gx_layer", layer: "Kadastrale Teksten" }
						]
				},
				{
					text:'Weather', children:
						[
							{nodeType: "gx_layer", layer: "KNMI Radar" },
							{nodeType: "gx_layer", layer: "KNMI Radar Color" }
						]
				},
				{
					text:'Ecology', children:
						[
							{nodeType: "gx_layer", layer: "Ecologische Hoofdstructuur" }
						]
				}

			]
	}
];

// Replace default layer browser DefaultConfig.js
// Pass our theme tree config as an option
Ext.namespace("Heron.options.layertree");

Heron.options.layertree.tree = treeTheme;

Heron.layout = {
	xtype: 'panel',

	/* Optional ExtJS Panel properties, see ExtJS API docs. */
	id: 'hr-container-main',
	layout: 'border',

	items: [
		{
			xtype: 'panel',

			id: 'hr-menu-left-container',
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
					xtype: 'hr_activelayerspanel',
					height: 240,
					flex: 3,
					hropts: {
						/** Defines the custom component added under the standard layer node. */
						component : {
							xtype: "gx_opacityslider",
							showTitle: false,
							plugins: new GeoExt.LayerOpacitySliderTip(),
							width: 160,
							inverse: false,
							aggressive: false,
							style: {
								marginLeft: '18px'
							}
						}
					}
				},
				{
					xtype: 'hr_layertreepanel',
					flex: 4,

					hropts: Heron.options.layertree
				}
		]

		},
		{
			xtype: 'panel',

			id: 'hr-map-and-info-container',
			layout: 'border',
			region: 'center',
			width: '100%',
			collapsible: false,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_mappanel',
					id: 'hr-map',
					region: 'center',
					collapsible : false,
					border: false,
					hropts: Heron.options.map
				},
				{
					xtype: 'hr_featureinfopanel',
					id: 'hr-feature-info',
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