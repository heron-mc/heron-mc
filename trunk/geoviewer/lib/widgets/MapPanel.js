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

Ext.namespace("GeoViewer");

GeoViewer.MapPanelOptsDefaults = {
	center:  '0,0',

	map : {
		zoom: 1,
		allOverlays: false,
		fractionalZoom : false,

		resolutions: [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125, 8.58306884765625e-05, 4.291534423828125e-05, 2.1457672119140625e-05, 1.0728836059570312e-05, 5.3644180297851562e-06, 2.6822090148925781e-06, 1.3411045074462891e-06],

		controls : [
			new OpenLayers.Control.Attribution(),
			new OpenLayers.Control.ZoomBox(),
			new OpenLayers.Control.LoadingPanel(),
			new OpenLayers.Control.Navigation()
		]

	}

};

/** api: constructor
 *  .. class:: FeatureInfoPanel(config)
 *
 *  A wrapper Panel for a GeoExt MapPanel.
 */
GeoViewer.MapPanel = Ext.extend(
		GeoExt.MapPanel,
{
	initComponent : function() {

		var gxMapPanelOptions = {
			id : "gx-map-panel",
			split : false,

			layers : this.hropts.layers,

			items: [
				{
					xtype: "gx_zoomslider",
					vertical: true,
					height: 220,
					x: 10,
					y: 20,
					plugins: new GeoExt.ZoomSliderTip()
				}
			],

			bbar : {
				items: [
					{
						id : 'x-coord',
						text		 : "X:",
						width : 100,
						xtype: "tbtext"
					},
					{
						id : 'y-coord',
						text : "Y:",
						width : 100,
						xtype: "tbtext"
					},
					{
						id : 'bbar_measure',
						text : "",
						width : 200,
						xtype: "tbtext"
					}

				]
			},

			/* Start with empty toolbar and fill through config. */
			tbar: new Ext.Toolbar({items: []})
		};

		Ext.apply(gxMapPanelOptions, GeoViewer.MapPanelOptsDefaults);

		if (this.hropts.settings) {
			Ext.apply(gxMapPanelOptions.map, this.hropts.settings);

			if (typeof gxMapPanelOptions.map.maxExtent == "string") {
				gxMapPanelOptions.map.maxExtent = OpenLayers.Bounds.fromString(gxMapPanelOptions.map.maxExtent);
			}

			if (typeof gxMapPanelOptions.map.extent == "string") {
				gxMapPanelOptions.map.extent = OpenLayers.Bounds.fromString(gxMapPanelOptions.map.extent);
				gxMapPanelOptions.extent = gxMapPanelOptions.map.extent;
			}

			if (typeof gxMapPanelOptions.map.center == "string") {
				gxMapPanelOptions.map.center = OpenLayers.LonLat.fromString(gxMapPanelOptions.map.center);
				gxMapPanelOptions.center = gxMapPanelOptions.map.center;
			}

			if (gxMapPanelOptions.map.zoom) {
				gxMapPanelOptions.zoom = gxMapPanelOptions.map.zoom;
			}
		}

		// Somehow needed, otherwise OL exception with get projectionObject()
		gxMapPanelOptions.map.layers = this.hropts.layers;

		Ext.apply(this, gxMapPanelOptions);

		GeoViewer.MapPanel.superclass.initComponent.call(this);

		// Set the global OpenLayers map variable, everyone needs it
		GeoViewer.App.setMap(this.getMap());

		// Set the global GeoExt MapPanel variable, some need it
		GeoViewer.App.setMapPanel(this);

		// Build top toolbar (if specified)
		GeoViewer.ToolbarBuilder.build(this, this.hropts.toolbar);

		this.addListener("afterrender", this.initMap);

	},

	getMap : function() {
		return this.map;
	},

	initMap : function() {

		var xy_precision = 3;
		if (this.hropts && this.hropts.settings && this.hropts.settings.xy_precision) {
			xy_precision = this.hropts.settings.xy_precision;
		}

		var onMouseMove = function(e) {
			var lonLat = this.getLonLatFromPixel(e.xy);

			if (this.displayProjection) {
				lonLat.transform(this.getProjectionObject(),
						this.displayProjection);
			}

			Ext.getCmp("x-coord").setText("X: " + lonLat.lon.toFixed(xy_precision));
			Ext.getCmp("y-coord").setText("Y: " + lonLat.lat.toFixed(xy_precision));
		};

		this.getMap().events.register("mousemove", this.getMap(), onMouseMove);
	}
});

/** api: xtype = gv_mappanel */
Ext.reg('gv_mappanel', GeoViewer.MapPanel);


