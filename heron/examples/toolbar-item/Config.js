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
 *  Extend Map Toolbar
 *  ------------------
 *  Extend the toolbar with your own custom items/menu's and handlers.
 */

/** This config assumes the DefaultOptionsWorld.js to be included first!! */


// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. By providing a "create" function your own toolbar
// item can be added.
// For menu's and other standard ExtJS Toolbar items, the "any" type can be
// used. There you need only pass the options, similar as in the function
// ExtJS Toolbar.add().
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {max_features: 20}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
/** Content of "options" for type: "any" is directly passed to Toolbar.push() .
 * A Toolbar Menu is a standard ExtJS item.
 */
	{type: "any",
		options: {
			text: 'MyMenu',
			iconCls: 'bmenu',
			menu: {
				items: [
					{
						text: 'Choose me',
						handler: function () {
							alert('I like Heron');
						}
					},
					{
						text: 'Choose me too',
						handler: function () {
							alert('I like Heron too');
						}
					}
				]
			}
		}
	},
	{
		// Instead of an internal "type", or using the "any" type
		// provide a create factory function.
		// MapPanel and options (see below) are always passed
		create: function (mapPanel, options) {

			// A trivial handler
			options.handler = function () {
				alert(options.msg);
			};

			// Provide an ExtJS Action object
			// If you use an OpenLayers control, you need to provide a GeoExt Action object.
			return new Ext.Action(options);
		},

		/* Options to be passed to your create function. */
		options: {
			tooltip: 'My Item',
			iconCls: "icon-myitem",
			enableToggle: true,
			pressed: false,
			id: "myitem",
			toggleGroup: "toolGroup",
			msg: 'Hello from my toolbar item'
		}
	},
	{type: "-"},
	{
		// Instead of an internal "type", or using the "any" type
		// provide a create factory function.
		// MapPanel and options (see below) are always passed
		// From MapPanel we can access the OL Map to add Controls.
		create: function (mapPanel, options) {
			var map = mapPanel.getMap();

			// Define Vector Layer once (see Ext namespace def above)
			// Global var for Vector drawing features
			Ext.namespace("MyToolbarItems.vectorLayer");
			MyToolbarItems.vectorLayer = new OpenLayers.Layer.Vector("MyDrawing");
			map.addLayers([MyToolbarItems.vectorLayer]);

			return new GeoExt.Action({
				text: "draw line",
				control: new OpenLayers.Control.DrawFeature(
						MyToolbarItems.vectorLayer, OpenLayers.Handler.Path
				),
				map: map,
				// button options
				toggleGroup: "draw",
				allowDepress: false,
				tooltip: "draw line",
				// check item options
				group: "draw"
			})
		}
	},
	{
		// Instead of an internal "type", or using the "any" type
		// provide a create factory function.
		// MapPanel and options (see below) are always passed
		// From MapPanel we can access the OL Map to add Controls.
		create: function (mapPanel, options) {
			return new GeoExt.Action({
				text: "draw polygon",
				control: new OpenLayers.Control.DrawFeature(
						MyToolbarItems.vectorLayer, OpenLayers.Handler.Polygon
				),
				map: mapPanel.getMap(),
				// button options
				toggleGroup: "draw",
				allowDepress: false,
				tooltip: "draw polygon",
				// check item options
				group: "draw"
			})
		}
	},
	{
		// Instead of an internal "type", or using the "any" type
		// provide a create factory function.
		// MapPanel and options (see below) are always passed
		// From MapPanel we can access the OL Map to add Controls.
		create: function (mapPanel, options) {
			return new GeoExt.Action({
				text: "select",
				control: new OpenLayers.Control.SelectFeature(MyToolbarItems.vectorLayer, {
					type: OpenLayers.Control.TYPE_TOGGLE,
					hover: true
				}),
				map: mapPanel.getMap(),
				toggleGroup: "draw",
				// button options
				enableToggle: true,
				tooltip: "select drawn feature"
			})
		}
	}
];
