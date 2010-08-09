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

		var toolGroup = "toolGroup";

		this.gxMapPanel = new GeoExt.MapPanel({
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
		this.gxMapPanel.map.addControl(this.historyControl);

		this.gxMapPanel.getTopToolbar().add(
				new Ext.Action({
					tooltip: GeoViewer.lang.txtSaveFeatures,
					iconCls: "icon-save-features",
					enableToggle : true,
					handler: function(){
						Ext.MessageBox.alert('Information', 'Sorry, this does not work yet');
					},
					pressed : false,
					id:"savefeatures",
					toggleGroup: toolGroup,
					scope: this
				}), "-",
				new GeoExt.Action({
					tooltip: GeoViewer.lang.txtFeatureInfo,
					iconCls: "icon-getfeatureinfo",
					enableToggle : true,
					control: new OpenLayers.Control.WMSGetFeatureInfo({
						maxFeatures	: GeoViewer.Map.options.MAX_FEATURES,
						queryVisible: true,
						infoFormat : "application/vnd.ogc.gml"
					}),
					map : app.gxMapPanel.map,
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
					map: app.gxMapPanel.map,
					toggleGroup: toolGroup
				}),
				new GeoExt.Action({
					tooltip: GeoViewer.lang.txtZoomIn,
					iconCls: "icon-zoom-in",
					enableToggle: true,
					pressed: false,
					control : new OpenLayers.Control.ZoomBox({title: GeoViewer.lang.txtZoomIn, out: false}),
					id: "zoomin",
					map: app.gxMapPanel.map,
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
					map: app.gxMapPanel.map,
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
					map: app.gxMapPanel.map,
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
					map: app.gxMapPanel.map,
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
					map: app.gxMapPanel.map,
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
					map: app.gxMapPanel.map,
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
					map: app.gxMapPanel.map,
					toggleGroup: toolGroup,
					scope: this
				})
				);

		this.gxMapPanel.addListener("render", this.initMap);

		this.add(
				new Ext.Panel({
					border : false,
					layout : "fit",
					items  : [this.gxMapPanel]
				}));

		// Set the global OpenLayers map variable, everone needs it
		GeoViewer.main.setMap(this.gxMapPanel.map);
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

