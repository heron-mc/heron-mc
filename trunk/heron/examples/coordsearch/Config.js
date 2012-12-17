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
/** This config assumes the DefaultOptionsNL.js to be included first!! */

/** api: example[coordsearch]
 *  Coordinate Search
 *  -----------------
 *  Go to point on map from coordinates entered in form.
 */

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "-"} ,
	{type: "coordinatesearch", options: {onSearchCompleteZoom: 8, localIconFile: 'bluepin.png', fieldLabelX: 'lon', fieldLabelY: 'lat'}}
];

Heron.layout = {
	xtype: 'panel',

	/* Optional ExtJS Panel properties, see ExtJS API docs. */
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
					xtype: 'hr_coordsearchpanel',
					id: 'hr-coordsearchpanel',
					height: 150,
					border: true,
					collapsible: true,
					collapsed: false,
					onSearchCompleteZoom : 6
				},
				{
					xtype: 'hr_coordsearchpanel',
					id: 'hr-coordsearchpanelRD',
					title: 'Go to Coordinates (Dutch RD)',
					height: 150,
					border: true,
					collapsible: true,
					collapsed: true,
					projection: 'EPSG:28992',
					onSearchCompleteZoom: 8,
					localIconFile: 'redpin.png',
					fieldLabelX: 'x (Dutch RD)',
					fieldLabelY: 'y (Dutch RD)'
				},
				{
					xtype: 'hr_layertreepanel'
				},
				{
					xtype: 'hr_htmlpanel',
					id: 'hr-info-west',
					html: '<div class="hr-html-panel-body"><p>Example of form to fill in coordinates to jump and zoom to a location</p>' +
							'<p>See <a href="Config.js" target="_new">Config,js</a> for the configuration of this example</p>' +
							'<a href="index-nl.html">Click here</a> to see the same example with Dutch layers and coordinates.</div>'
					,
					preventBodyReset: true,
					title: 'Info'
				}

			]
		},
		{
			xtype: 'panel',
			id :  'hr-map-and-info-container',
			layout : 'border',
			region: 'center',
			width : '100%',
			collapsible : true,
			split : true,
			border : false,
			items :
					[
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
