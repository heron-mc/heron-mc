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

Heron.options.printURL = 'http://kademo.nl/print/pdf28992';

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {max_features: 20}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{type: "zoomprevious"},
	{type: "zoomnext"},
	{type: "-"},
/** Use "geodesic: true" for non-linear/Mercator projections like Google, Bing etc */
	{type: "measurelength", options: {geodesic: false}},
	{type: "measurearea", options: {geodesic: false}},
	{type: "-"} ,
	{type: "printdirect", options: {url: Heron.options.printURL}},
	{type: "-"} ,
	{type: "printdialog", options: {
		printProvider:
		{
			customParams: {
				mapTitle: "Heron Printing Demo",
				comment: "This is a simple map printed from GeoExt."
			},

			capabilities: {
				"scales":[
					{"name":"1:750","value":"750"},
					{"name":"1:1500","value":"1500"},
					{"name":"1:3000","value":"3000"},
					{"name":"1:6000","value":"6000"},
					{"name":"1:12000","value":"12000"},
					{"name":"1:24000","value":"24000"},
					{"name":"1:48000","value":"48000"},
					{"name":"1:96000","value":"96000"},
					{"name":"1:192000","value":"192000"},
					{"name":"1:384000","value":"384000"},
					{"name":"1:768000","value":"768000"},
					{"name":"1:1536000","value":"1536000"},
					{"name":"1:3072000","value":"3072000"},
					{"name":"1:6144000","value":"6144000"},
					{"name":"1:12288000","value":"12288000"}
				],
				"dpis":[
					{"name":"300","value":"300"},
					{"name":"150","value":"150"},
					{"name":"75","value":"75"}
				],
				"layouts":[
					{"name":"A4 portrait","map":{"width":440,"height":483},"rotation":true},
					{"name":"Legal","map":{"width":440,"height":483},"rotation":false}
				],
				"printURL":Heron.options.printURL + "/print.pdf",
				"createURL":Heron.options.printURL + "/create.json"}
		}
	}
	}
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
		}
	]
};
