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

/** This config assumes the DefaultOptionsNL.js to be included first!! */

// Make an all overlay map
//Heron.options.map.settings.allOverlays = true;
//Heron.scratch.layermap.pdok_brtachtergrondkaart.setVisibility(true);
//Heron.scratch.layermap.pdok_brtachtergrondkaart.setIsBaseLayer(false);
//Heron.scratch.layermap.osm.setVisibility(false);
//Heron.scratch.layermap.osm.setIsBaseLayer(false);
//Heron.scratch.layermap.topraster.setIsBaseLayer(false);
//Heron.scratch.layermap.topraster.setVisibility(false);
//Heron.scratch.layermap.luchtfotonlr.setIsBaseLayer(false);
//Heron.scratch.layermap.luchtfotonlr.setVisibility(false);
//Heron.scratch.layermap.top10nlgeodan.setIsBaseLayer(false);
//Heron.scratch.layermap.top10nlgeodan.setVisibility(false);
//Heron.scratch.layermap.blanco.setIsBaseLayer(false);
//Heron.scratch.layermap.blanco.setVisibility(false);

// Define a minimal tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
var treeTheme = [
	{
		text:'BaseMaps', expanded: true, children:
			[
				{nodeType: "gx_layer", layer: "Luchtfoto (PDOK)" },
				{nodeType: "gx_layer", layer: "TopRaster" },
                {nodeType: "gx_layer", layer: "OpenBasisKaart OSM" },
				{nodeType: "gx_layer", layer: "BRT Achtergrondkaart" }
			]
	},
	{
		text:'Themes', children:
			[
				{
					text:'Weather', children:
						[
							{nodeType: "gx_layer", layer: "KNMI Radar"},
							{nodeType: "gx_layer", layer: "KNMI Radar Color" }
						]
				},
				{
					text:'Ecology', children:
						[
							{nodeType: "gx_layer", layer: "Natura 2000 (TMS)" }
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
	border: true,

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
                    contextMenu: [
                         {
                             xtype: 'hr_layernodemenulayerinfo'
                         },
                         {
                             xtype: 'hr_layernodemenuzoomextent'
                         },
                         {
                             xtype: 'hr_layernodemenuopacityslider'
                         }
                     ],
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
				}
//				,
//				{
//					xtype: 'hr_activethemespanel',
//					height: 240,
//					flex: 3
//
//				}
				,
				{
					xtype: 'hr_layertreepanel',
					flex: 4,
                    contextMenu: [
                        {
                            xtype: 'hr_layernodemenulayerinfo'
                        },
                        {
                            xtype: 'hr_layernodemenuzoomextent'
                        },
                        {
                            xtype: 'hr_layernodemenuopacityslider'
                        }
                    ],

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
			split	: false,
			border: false,
			items: [
				{
					xtype: 'hr_mappanel',
					id: 'hr-map',
					title: '&nbsp;',
					region: 'center',
					collapsible : false,
					border: false,
					hropts: Heron.options.map
				}
			]
		}
	]
};