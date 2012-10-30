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

/** api: example[printdialog]
 *  PrintDialog
 *  -----------
 *  Printing with popup dialog containing preview and print options.
 */

Heron.options.map.settings.zoom = 12;
Heron.options.map.settings.center = '193742,468919';


// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{type: "printdirect", options: {url: 'http://kademo.nl/print/pdf28992'}},
	{type: "printdialog", options: {url: 'http://kademo.nl/print/pdf28992'}}
];

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 **/
Heron.layout = {
	xtype: 'panel',
	id: 'hr-container-main',
	layout: 'border',

	items: [
		{
			xtype: 'panel',

			id: 'hr-menu-left-container',
			layout: 'accordion',
			region : "west",
			width: 240,
			collapsible: true,
			split	: true,
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

			id: 'hr-map-and-info-container',
			layout: 'border',
			region: 'center',
			width: '100%',
			collapsible: true,
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
				}
			]
		},
		{
			xtype: 'panel',

			id: 'hr-menu-right-container',
			layout: 'accordion',
			region : "east",
			width: 240,
			collapsible: true,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_layerlegendpanel',
					id: 'hr-layerlegend-panel',
					defaults: {
						useScaleParameter : true,
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
