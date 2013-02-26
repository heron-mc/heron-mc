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
Ext.namespace("Heron");


/** api: example[editorbasics]
 *  Feature Editor Basics
 *  ---------------------
 *  Show basic tools and operations using Geops OLE: https://github.com/geops/ole.
 */

/**
 * Defines the most minimal Heron app: just a Map with a zoomslider.
 *
 **/
Heron.layout = {
	xtype: 'hr_mappanel',

	/* Optional MapPanel ExtJS Panel properties here, see ExtJS API docs */

	/** Below are Heron-specific settings for the MapPanel (xtype: 'hr_mappanel') */
	hropts: {
		layers: [
			new OpenLayers.Layer.WMS("World Map",
					"http://www2.demis.nl/WMS/wms.asp?WMS=WorldMap", {layers: 'Countries,Borders,Coastlines', format: 'image/png' })
		],
		toolbar: [
			{type: "zoomin"},
			{type: "zoomout"},
			{type: "-"},
			{
				// Instead of an internal "type", or using the "any" type
				// provide a create factory function.
				// MapPanel and options (see below) are always passed
				create: function (mapPanel, options) {

					// A trivial handler
					options.handler = function () {

						var map = mapPanel.getMap(), editor;
						OpenLayers.Lang.setCode('en');

//						map = new OpenLayers.Map('map');
//						map.addLayer(new OpenLayers.Layer.OSM());
//						map.setCenter(new OpenLayers.LonLat(10, 50), 5);

						editor = new OpenLayers.Editor(map, {
							activeControls: ['Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature', 'Separator'],
							featureTypes: ['polygon', 'path', 'point']
						});
						editor.startEditMode();

					};

					// Provide an ExtJS Action object
					// If you use an OpenLayers control, you need to provide a GeoExt Action object.
					return new Ext.Action(options);
				},

				/* Options to be passed to your create function. */
				options: {
					tooltip: 'Draw Features',
					iconCls: "icon-mapedit",
					enableToggle: true,
					pressed: false,
					id: "mapedit",
					toggleGroup: "toolGroup"
				}
			}
		]
	}
};
