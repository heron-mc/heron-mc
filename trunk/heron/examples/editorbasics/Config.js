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
			zoom: 14
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
					pressed: true,
					id: "mapeditor",
					toggleGroup: "toolGroup",

					// Options for OLE Editor
					activeControls: ['ExportFeature', 'Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature', 'Separator'],
					featureTypes: ['polygon', 'path', 'point'],
					language: 'en',
					ExportFeature: {
						url: Heron.globals.serviceUrl,
						params: {
							action: 'download',
							mime : 'text/xml',
							filename: 'editor.xml',
							encoding: 'urlencoded'
						}
					}
					// save: function() {alert('saved')}
				},

				// Instead of an internal "type", or using the "any" type
				// provide a create factory function.
				// MapPanel and options (see below) are always passed
				create: function (mapPanel, options) {
					OpenLayers.Lang.setCode(options.language);
					var map = mapPanel.getMap();

					this.editor = new OpenLayers.Editor(map, options);

					this.startEditor = function (self) {
						self.editor.startEditMode();
					};

					this.stopEditor = function (self) {
						var editor = self.editor;
						if (!editor) {
							return;
						}
						if (editor.editLayer) {
							// map.removeLayer(editor.editLayer);
							// editor.editLayer.eraseFeatures();
						}
					editor.stopEditMode();
				};

				// A trivial handler
					var self = this;
					options.handler = function () {
						if (!self.editor.editMode) {
							self.startEditor(self);
						} else {
							self.stopEditor(self);
						}
					};

					if (options.pressed) {
						this.startEditor(self);
					}

					// Provide an ExtJS Action object
					// If you use an OpenLayers control, you need to provide a GeoExt Action object.
					return new Ext.Action(options);
				}
			}
		]
	}
};
