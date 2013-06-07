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


/** api: example[featureinfopopup]
 *  FeatureInfoPopup
 *  ----------------
 *  Show WMS GetFeatureInfo in popup Window when clicking the Map.
 */


// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {
        pressed: true,
		popupWindow: {
			width: 320,
			height: 200,
			featureInfoPanel: {
				// Option values are 'Grid', 'Tree' and 'XML', default is 'Grid' (results in no display menu)
				displayPanels: ['Grid'],
				// Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
				exportFormats: [],
				// exportFormats: ['CSV', 'XLS'],
				maxFeatures: 10
			}
		}
	}},
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"}
];

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 **/
Heron.layout = {
	xtype: 'panel',
	id: 'hr-container-main',
	layout: 'border',
	border: true,

	items: [
		{
			xtype: 'panel',

			id: 'hr-menu-left-container',
			layout: 'accordion',
			region: "west",
			width: 240,
			collapsible: true,
			split: false,
			border: false,
			items: [
				{
					xtype: 'hr_layertreepanel',
					hropts: Heron.options.layertree
				}
			]
		},
		{
			xtype: 'panel',

			id: 'hr-map-container',
			layout: 'border',
			region: 'center',
			width: '100%',
			collapsible: false,
			split: false,
			border: false,
			items: [
				{
					xtype: 'hr_mappanel',
					title: '&nbsp;',
					id: 'hr-map',
					region: 'center',
					collapsible: false,
					border: false,
					hropts: Heron.options.map
				}
			]
		},
		{
			xtype: 'panel',

			id: 'hr-menu-right-container',
			layout: 'accordion',
			region: "east",
			width: 240,
			collapsible: true,
			split: false,
			border: false,
			items: [
				{
					xtype: 'hr_layerlegendpanel',
					id: 'hr-layerlegend-panel',
					defaults: {
						useScaleParameter: true,
						baseParams: {
							FORMAT: 'image/png'
						}
					},
					hropts: {
						// Preload Legends on initial startup
						// Will fire WMS GetLegendGraphic's for WMS Legends
						// Otherwise Legends will be loaded only when Layer
						// becomes visible. Default: false
						prefetchLegends: false
					}
				}
			]
		}
	]
};

