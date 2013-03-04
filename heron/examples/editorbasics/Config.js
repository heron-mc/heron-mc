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

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;


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
						// formatter: new OpenLayers.Format.GPX(),
						// formatter: new OpenLayers.Format.GML.v2(),
						formatter: new OpenLayers.Format.WKT(),
						// For custom projections use Proj4.js
						externalProjection: new OpenLayers.Projection('EPSG:4326'),
						internalProjection: new OpenLayers.Projection('EPSG:900913'),
						params: {
							action: 'download',
							mime: 'text/plain',
							filename: 'editor_wkt.txt',
							encoding: 'none'
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
			},
			{type: "printdirect", options: {url: 'http://kademo.nl/print/pdf28992', mapTitle: 'Editor - Direct Print'
				// , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
				// , mapComment: 'My Comment - Direct Print'
				// , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
				// , mapFooter: 'My Footer - Direct Print'
				// , mapFooterYAML: "mapFooter"	// MapFish - field name in config.yaml - default is: 'mapFooter'
				// , mapPrintLayout: "A4"			// MapFish - 'name' entry of the 'layouts' array or Null (=> MapFish default)
				, mapPrintDPI: "127",				// MapFish - 'value' entry of the 'dpis' array or Null (=> MapFish default)
				// , mapPrintLegend: true
				// , legendDefaults: {
				//     useScaleParameter : false,
				//     baseParams: {FORMAT: "image/png"}
				//   }
			}}
		]
	}
};
var p = {"units": "m", "srs": "EPSG:900913", "layout": "A4 landscape", "dpi": 127, "mapTitle": "Editor - Direct Print", "mapComment": "This is a simple map directly printed.", "mapFooter": "", "layers": [
	{"baseURL": "http://a.tile.openstreetmap.org/", "opacity": 1, "singleTile": false, "type": "OSM", "maxExtent": [-20037508.34, -20037508.34, 20037508.34, 20037508.34], "tileSize": [256, 256], "extension": "png", "resolutions": [156543.03390625, 78271.516953125, 39135.7584765625, 19567.87923828125, 9783.939619140625, 4891.9698095703125, 2445.9849047851562, 1222.9924523925781, 611.4962261962891, 305.74811309814453, 152.87405654907226, 76.43702827453613, 38.218514137268066, 19.109257068634033, 9.554628534317017, 4.777314267158508, 2.388657133579254, 1.194328566789627, 0.5971642833948135]},
	{"type": "Vector", "styles": {"1": {"fillColor": "#07f", "fillOpacity": 0.8, "strokeColor": "#037", "strokeWidth": 2, "graphicZIndex": 1, "pointRadius": 5}}, "styleProperty": "_gx_style", "geoJson": {"type": "FeatureCollection", "features": [
		{"type": "Feature", "properties": {"_gx_style": 1}, "geometry": {"type": "Polygon", "coordinates": [
			[
				[546903.47659441, 6856582.4915635],
				[546721.93865226, 6854604.6834569],
				[548747.51990154, 6855216.1796831],
				[548995.94024343, 6855741.6842525],
				[546903.47659441, 6856582.4915635]
			]
		]}},
		{"type": "Feature", "properties": {"_gx_style": 1}, "geometry": {"type": "Polygon", "coordinates": [
			[
				[541056.04393141, 6855942.3314517],
				[544505.2648323, 6855646.1379672],
				[544667.69351738, 6856754.4748772],
				[544209.07134774, 6857050.6683617],
				[541056.04393141, 6855942.3314517]
			]
		]}},
		{"type": "Feature", "properties": {"_gx_style": 1}, "geometry": {"type": "Polygon", "coordinates": [
			[
				[538485.84885568, 6856563.3823065],
				[539861.71536462, 6856467.8360211],
				[539603.7403942, 6854843.5491703],
				[538466.73959861, 6854910.43157],
				[538485.84885568, 6856563.3823065]
			]
		]}},
		{"type": "Feature", "properties": {"_gx_style": 1}, "geometry": {"type": "Polygon", "coordinates": [
			[
				[549464.11704161, 6854671.5658567],
				[550811.31966495, 6855885.0036805],
				[551117.06777805, 6853859.4224313],
				[549406.7892704, 6853219.2623195],
				[549464.11704161, 6854671.5658567]
			]
		]}},
		{"type": "Feature", "properties": {"_gx_style": 1}, "geometry": {"type": "Polygon", "coordinates": [
			[
				[549406.7892704, 6853219.2623195],
				[549406.7892704, 6853219.2623195]
			]
		]}}
	]}, "name": "Editor", "opacity": 1}
], "pages": [
	{"center": [545465.505, 6854552.133], "scale": 96000, "rotation": 0}
]};