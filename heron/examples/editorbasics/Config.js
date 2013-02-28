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
		settings: {
			center: '545465.505, 6854552.133',
			zoom: 12
		},
		layers: [
			new OpenLayers.Layer.OSM()
		],
		toolbar: [
			{type: "zoomin"},
			{type: "zoomout"},
			{type: "-"},
			{
				/* Default options to be passed to create function below. */
				options: {
					tooltip: 'Draw Features',
					iconCls: "icon-mapedit",
					enableToggle: true,
					pressed: false,
					id: "mapedit",
					toggleGroup: "toolGroup"
				},

				// Instead of an internal "type", or using the "any" type
				// provide a create factory function.
				// MapPanel and options (see below) are always passed
				create: function (mapPanel, options) {

					// A trivial handler
					options.handler = function () {
						var map = mapPanel.getMap();
						if (!this.editor) {
							OpenLayers.Lang.setCode('en');
							this.editor = new OpenLayers.Editor(map, {
								activeControls: ['Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature', 'Separator'],
								featureTypes: ['polygon', 'path', 'point']
							});
							this.editor.startEditMode();
						} else {
							map.removeLayer(this.editor.editLayer);
							this.editor.stopEditMode();
							this.editor = null;
						}
					};

					// Provide an ExtJS Action object
					// If you use an OpenLayers control, you need to provide a GeoExt Action object.
					return new Ext.Action(options);
				}

			}
		]
	}
};
