/*
 * Copyright (C) 2010  Het Kadaster
 *
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
Ext.namespace("GeoViewer.Resources");

GeoViewer.MapPanel = Ext.extend(
		Ext.Panel,
{
	gxMapPanel	 : null,

	initComponent : function() {

		var app = this;
		var options = {
			layout	: 'fit'
		};

		Ext.apply(this, options);

		GeoViewer.MapPanel.superclass.initComponent.call(this);

		var gxMapPanelOptions = {
			//title: GeoViewer.lang.txtTitle,
			id : "gv-map-panel",
			split : false,
			mapOptions : {
				"projection": GeoViewer.Map.options.PROJECTION
			},

			center:  GeoViewer.Map.options.CENTER,
			zoom: GeoViewer.Map.options.ZOOM,
			layers : GeoViewer.Map.layers,

			map : {
				"allOverlays": false,
				"projection": GeoViewer.Map.options.PROJECTION,
				"units": GeoViewer.Map.options.UNITS,
				"maxExtent":  GeoViewer.Map.options.MAX_EXTENT,
				"resolutions": GeoViewer.Map.options.RESOLUTIONS,
				"fractionalZoom" : false,
				"controls" : [
					new OpenLayers.Control.Attribution(),
					new OpenLayers.Control.ZoomBox(),
					new OpenLayers.Control.LoadingPanel()
				]
			},
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
			/* STart with empty toolbar and fill through config. */
			tbar: new Ext.Toolbar({items: []})
		};

		this.gxMapPanel = new GeoExt.MapPanel(gxMapPanelOptions);

		// Create toolbar above Map from toolbar config
		this.createToolbar();

		this.gxMapPanel.addListener("render", this.initMap);

        this.add(this.gxMapPanel);

		// Set the global OpenLayers map variable, everyone needs it
		GeoViewer.main.setMap(this.gxMapPanel.map);

	},

	createToolbar : function() {

		GeoViewer.ToolbarBuilder.build(this, GeoViewer.Map.toolbar);

		// TODO
		// this below needs to move to ToolbarBuilder as it depends on the presence
		// of measurement (length/area) controls.
		var onMeasurements = function (event) {
			var units = event.units;
			var measure = event.measure;
			var out = "";
			if (event.order == 1) {
				out += GeoViewer.lang.txtLength + ": " + measure.toFixed(3) + " " + units;
			} else {
				out += GeoViewer.lang.txtArea + ": " + measure.toFixed(3) + " " + units + "2";
			}
			Ext.getCmp("bbar_measure").setText(out);
		};

		var map = this.getMap();
		var controls = map.getControlsByClass("OpenLayers.Control.Measure");
		for (var i = 0; i < controls.length; i++) {
			controls[i].events.register("measure", map, onMeasurements);
			controls[i].events.register("measurepartial", map, onMeasurements);
		}
	},

	getMap : function() {
		return this.gxMapPanel.map;
	},

	initMap : function() {
		var onMouseMove = function(e) {
			var lonLat = this.getLonLatFromPixel(e.xy);

			if (this.displayProjection) {
				lonLat.transform(this.getProjectionObject(),
						this.displayProjection);
			}

			Ext.getCmp("x-coord").setText("X: " + lonLat.lon.toFixed(GeoViewer.Map.options.XY_PRECISION));
			Ext.getCmp("y-coord").setText("Y: " + lonLat.lat.toFixed(GeoViewer.Map.options.XY_PRECISION));
		};

		this.map.events.register("mousemove", this.map, onMouseMove);
	}
});

