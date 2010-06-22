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

GeoViewer.MainPanel = Ext.extend(
		Ext.Panel,
{
	mapPanel	 : null,

	initComponent : function() {

		var app = this;
		var options = {
			border	: false,
			layout	: 'border'
		};

		Ext.apply(this, options);

		GeoViewer.MainPanel.superclass.initComponent.call(this);

		var toolGroup = "toolGroup";

		this.mapPanel = new GeoExt.MapPanel({
			//title: GeoViewer.lang.txtTitle,
			id : "gv-map-panel",
			split : true,
			region : "center",
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
					new OpenLayers.Control.ZoomBox()
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
			tbar :new Ext.Toolbar({
				items : []
			})
		});

		// create a navigation history control
		this.historyControl = new OpenLayers.Control.NavigationHistory();
		this.mapPanel.map.addControl(this.historyControl);

		this.mapPanel.getTopToolbar().add(
				new GeoExt.Action({
					tooltip: GeoViewer.lang.txtFeatureInfo,
					iconCls: "icon-getfeatureinfo",
					enableToggle : true,
					control: new OpenLayers.Control.WMSGetFeatureInfo({
						maxFeatures	: GeoViewer.Map.options.MAX_FEATURES,
						queryVisible: true,
						infoFormat : "application/vnd.ogc.gml"
					}),
					map : app.mapPanel.map,
					pressed : false,
					id:"featureinfo",
					toggleGroup: toolGroup,
					scope: this
				}), "-",
				new GeoExt.Action({
					tooltip: GeoViewer.lang.txtPan,
					iconCls: "icon-pan",
					enableToggle: true,
					pressed: true,
					control: new OpenLayers.Control.Navigation(),
					id:"pan",
					map: app.mapPanel.map,
					toggleGroup: toolGroup
				}),
				new GeoExt.Action({
					tooltip: GeoViewer.lang.txtZoomIn,
					iconCls: "icon-zoom-in",
					enableToggle: true,
					pressed: false,
					control : new OpenLayers.Control.ZoomBox({title: GeoViewer.lang.txtZoomIn, out: false}),
					id: "zoomin",
					map: app.mapPanel.map,
					toggleGroup: toolGroup,
					scope: this
				}),
				new GeoExt.Action({
					tooltip: GeoViewer.lang.txtZoomOut,
					iconCls: "icon-zoom-out",
					enableToggle: true,
					pressed: false,
					control : new OpenLayers.Control.ZoomBox({title: GeoViewer.lang.txtZoomOut, out: true}),
					id: "zoomout",
					map: app.mapPanel.map,
					toggleGroup: toolGroup,
					scope: this
				}),
				new GeoExt.Action({
					tooltip: GeoViewer.lang.txtZoomToFullExtent,
					iconCls: "icon-zoom-visible",
					enableToggle: true,
					pressed: false,
					control : new OpenLayers.Control.ZoomToMaxExtent(),
					id: "zoomvisible",
					map: app.mapPanel.map,
					toggleGroup: toolGroup,
					scope: this
				}), "-",
				new GeoExt.Action({
					tooltip: GeoViewer.lang.txtZoomPrevious,
					iconCls: "icon-zoom-previous",
					disabled: true,
					pressed: false,
					control : this.historyControl.previous,
					id: "zoomprevious",
					map: app.mapPanel.map,
					toggleGroup: toolGroup,
					scope: this
				}),
				new GeoExt.Action({
					tooltip: GeoViewer.lang.txtZoomNext,
					iconCls: "icon-zoom-next",
					disabled: true,
					pressed: false,
					control : this.historyControl.next,
					id: "zoomnext",
					map: app.mapPanel.map,
					toggleGroup: toolGroup,
					scope: this
				}), "-",
				new GeoExt.Action({
					tooltip: GeoViewer.lang.txtMeasureLength,
					iconCls: "icon-measure-length",
					enableToggle: true,
					pressed: false,
					control : new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {persist: true}),
					id: "measurelength",
					map: app.mapPanel.map,
					toggleGroup: toolGroup,
					scope: this
				}),
				new GeoExt.Action({
					tooltip: GeoViewer.lang.txtMeasureArea,
					iconCls: "icon-measure-area",
					enableToggle: true,
					pressed: false,
					control : new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {persist: true}),
					id: "measurearea",
					map: app.mapPanel.map,
					toggleGroup: toolGroup,
					scope: this
				})
				);

		this.mapPanel.addListener("render", this.initMap);

		this.featureInfo = new GeoViewer.FeatureInfoPanel({
			region : "south",
			border : true,
			map : this.mapPanel.map,
			collapsible : true,
			collapsed : true,
			height : 205,
			split : true,
			maxFeatures	: GeoViewer.Map.options.MAX_FEATURES
		});


		this.add(
				new Ext.Panel({
					border : false,
					region : "center",
					layout : "border",
					items  : [this.mapPanel, this.featureInfo]
				}));
	},

	/**
	 * Set Map context, a combination of center, zoom and visible layers.
	 * @param id - a context id defined in Geoviewer.context config
	 */
	setMapContext : function(id) {
		var contexts = GeoViewer.contexts;
		var map = this.mapPanel.map;
		for (var i = 0; i < contexts.length; i++) {
			if (contexts[i].id == id) {
				map.setCenter(new OpenLayers.LonLat(contexts[i].x, contexts[i].y), contexts[i].zoom, false, true);

				if (contexts[i].layers) {
					var mapLayers = map.layers;
					var ctxLayers = contexts[i].layers;

					for (var n = 0; n < mapLayers.length; n++) {
						mapLayers[n].setVisibility(false);
						for (var m = 0; m < ctxLayers.length; m++) {
							if (mapLayers[n].name == ctxLayers[m]) {
								mapLayers[n].setVisibility(true);

								// TODO check if baselayer
								if (mapLayers[n].isBaseLayer) {
									map.setBaseLayer(mapLayers[n]);
								}
							}
						}
					}
				}
			}
		}
	},

	initMap : function() {
		this.map.addControl(new OpenLayers.Control.ZoomBox());

		this.map.setCenter(GeoViewer.Map.options.CENTER, 0);

		var onMouseMove = function(e) {
			var lonLat = this.getLonLatFromPixel(e.xy);

			if (this.displayProjection) {
				lonLat.transform(this.getProjectionObject(),
						this.displayProjection);
			}

			Ext.getCmp("x-coord").setText("X: " + lonLat.lon.toFixed(GeoViewer.Map.options.XY_PRECISION));
			Ext.getCmp("y-coord").setText("Y: " + lonLat.lat.toFixed(GeoViewer.Map.options.XY_PRECISION));
		};

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


		this.map.events.register("mousemove", this.map, onMouseMove);

		var controls = this.map.getControlsByClass("OpenLayers.Control.Measure");
		for (var i = 0; i < controls.length; i++) {
			controls[i].events.register("measure", this.map, onMeasurements);
			controls[i].events.register("measurepartial", this.map, onMeasurements);
		}
	}
});

