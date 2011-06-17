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

/** api: example[toolbar-item]
 *  Extend Toolbar
 *  --------------
 *  Extend the toolbar with your own custom item and handler.
 */

/** This config assumes the DefaultOptions.js to be included first!! */

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. By providing a "create" function your own toolbar
// item can be added.
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
	{type: "measurelength"},
	{type: "measurearea"},
	{
		// Instead of an internal "type".
		// provide a create factory function.
		// MapPanel and options (see below) are always passed
		create : function(mapPanel, options) {

			// A trivial handler
			options.handler = function() {
				alert(options.msg);
			};

			// Provide an ExtJS Action object
			// If you use an OpenLayers control, you need to provide a GeoExt Action object.
			return new Ext.Action(options);
		},

		/* Options to be passed to your create function. */
		options : {
			tooltip: 'My Item',
			iconCls: "icon-myitem",
			enableToggle : true,
			pressed : false,
			id: "myitem",
			toggleGroup: "toolGroup",
			msg: 'Hello from my toolbar item'
		}
	}
];
