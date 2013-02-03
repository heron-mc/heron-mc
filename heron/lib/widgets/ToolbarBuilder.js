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
Ext.namespace("Heron.widgets");

/** api: (define)
 *  module = Heron.widgets
 *  class = ToolbarBuilder
 */

Heron.widgets.ToolbarBuilder = {};

/** Measurements handling function for length/area. */

Heron.widgets.ToolbarBuilder.onMeasurementsActivate = function (event) {
	Ext.getCmp("measurelength").measureLastLength = 0.0;
};

Heron.widgets.ToolbarBuilder.onMeasurements = function (event) {
	var units = event.units;
	var measure = event.measure;
	var out = "";
	if (event.order == 1) {
		out += __('Length') + ": " + measure.toFixed(2) + " " + units;

		/* Show diff */
		var item = Ext.getCmp("measurelength");
// only works with option 'immediate: false' => static measurement
//		if (item.measureLastLength > 0) {
//			out += "  (" + __('Leg') + ": " + (measure - item.measureLastLength).toFixed(2) + "&nbsp;" + units + ")";
//		}
		item.measureLastLength = 0.0;


	} else {
		out += __('Area') + ": " + measure.toFixed(2) + " " + units + "&#178;";
	}
	Ext.getCmp("bbar_measure").setText(out);
};

Heron.widgets.ToolbarBuilder.onMeasurementsPartial = function (event) {
	var units = event.units;
	var measure = event.measure;
	var out = "";
	if (event.order == 1) {
		out += __('Length') + ": " + measure.toFixed(2) + " " + units;

		/* Show diff */
		var item = Ext.getCmp("measurelength");
// only works with option 'immediate: false' => static measurement
//		if (item.measureLastLength > 0) {
//			out += "  (" + __('Leg') + ": " + (measure - item.measureLastLength).toFixed(2) + "&nbsp;" + units + ")";
//		}
		item.measureLastLength = measure;

	} else {
		out += __('Area') + ": " + measure.toFixed(2) + " " + units + "&#178;";
	}
	Ext.getCmp("bbar_measure").setText(out);
};

Heron.widgets.ToolbarBuilder.onMeasurementsDeactivate = function (event) {
	Ext.getCmp("bbar_measure").setText("");
};

Heron.widgets.ToolbarBuilder.defs = {

	baselayer: {
		options: {
			id: "baselayercombo"
		},

		create: function (mapPanel, options) {
			if (!options.initialConfig) {
				options.initialConfig = {};
			}
			options.initialConfig.map = mapPanel.getMap();
			return new Heron.widgets.BaseLayerCombo(options);
		}
	},

	geocoder: {
		options: {
			id: "geocodercombo"
		},

		create: function (mapPanel, options) {
			return new Heron.widgets.GeocoderCombo(options);
		}
	},

	scale: {
		options: {
			// width: 120,
			// emptyText: __('Scale'),
			// tooltip: __('Scale'),
			id: "scalecombo"
		},

		create: function (mapPanel, options) {
			return new Heron.widgets.ScaleSelectorCombo(options);
		}
	},

	featureinfo: {
		options: {
			tooltip: __('Feature information'),
			iconCls: "icon-getfeatureinfo",
			enableToggle: true,
			pressed: false,
			id: "featureinfo",
			toggleGroup: "toolGroup",
			max_features: 10,
			// Use "popupWindow" property to enable a popup i.s.o. Panel under Map.
			popupWindowDefaults: {
				title: __('FeatureInfo'),
				layout: 'fit',
				resizable: true,
				width: 600,
				height: 200,
				plain: true,
				pageX: 75,
				pageY: 75,
				closeAction: 'hide',
				items: [
					{
						xtype: 'hr_featureinfopanel',
						title: null,
						header: false,
						border: false,
						// Option values are 'Grid', 'Tree' and 'XML', default is 'Grid' (results in no display menu)
						displayPanels: ['Grid', 'XML', 'Tree'],
						// Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
						exportFormats: ['CSV', 'XLS'],
						maxFeatures: 10
					}
				]
			}
		},

		create: function (mapPanel, options) {
			options.control = new OpenLayers.Control.WMSGetFeatureInfo({
				maxFeatures: options.max_features,
				queryVisible: true,
				infoFormat: options.infoFormat ? options.infoFormat : "application/vnd.ogc.gml"
			});
			var self = this;
			var wmsGFIControl = options.control;
			if (options.popupWindow) {
				mapPanel.getMap().addControl(wmsGFIControl);
				var popupWindowProps = options.popupWindowDefaults;
				popupWindowProps = Ext.apply(popupWindowProps, options.popupWindow);
				popupWindowProps.items[0] = Ext.apply(popupWindowProps.items[0], options.popupWindow.featureInfoPanel);

				var createPopupWindow = function () {
					// Create only once
					if (!self.featurePopupWindow) {
						self.featurePopupWindow = new Ext.Window(popupWindowProps);
						wmsGFIControl.events.on(
							{'beforegetfeatureinfo': function () {
									if (!self.featurePopupWindow.isVisible()) {
										self.featurePopupWindow.show(self.featurePopupWindow)
									}
								}
							},
							{'nogetfeatureinfo': function () {
									self.featurePopupWindow.hide();
								}
							}
						);
						// self.featurePopupWindow.hide();
					}
				};

				// If enabled already create the window.
				if (options.pressed) {
					createPopupWindow();
				}
				options.handler = function () {
					createPopupWindow();
					self.featurePopupWindow.hide();
				};
			}
			return new GeoExt.Action(options);
		}
	},

	pan: {
		options: {
			tooltip: __('Pan'),
			iconCls: "icon-pan",
			enableToggle: true,
			pressed: true,
			control: new OpenLayers.Control.Navigation(),
			id: "pan",
			toggleGroup: "toolGroup"
		},

		create: function (mapPanel, options) {
			return new GeoExt.Action(options);
		}
	},

	zoomin: {
		options: {
			tooltip: __('Zoom in'),
			iconCls: "icon-zoom-in",
			enableToggle: true,
			pressed: false,
			control: new OpenLayers.Control.ZoomBox({
				title: __('Zoom in'),
				out: false
			}),
			id: "zoomin",
			toggleGroup: "toolGroup"
		},

		create: function (mapPanel, options) {
			return new GeoExt.Action(options);
		}
	},

	zoomout: {
		options: {
			tooltip: __('Zoom out'),
			iconCls: "icon-zoom-out",
			enableToggle: true,
			pressed: false,
			control: new OpenLayers.Control.ZoomBox({
				title: __('Zoom out'),
				out: true
			}),
			id: "zoomout",
			toggleGroup: "toolGroup"
		},

		create: function (mapPanel, options) {
			return new GeoExt.Action(options);
		}
	},

	zoomvisible: {
		options: {
			tooltip: __('Zoom to full extent'),
			iconCls: "icon-zoom-visible",
			enableToggle: false,
			pressed: false,
			control: new OpenLayers.Control.ZoomToMaxExtent(),
			id: "zoomvisible"
		},
		create: function (mapPanel, options) {
			return new GeoExt.Action(options);
		}
	},

	zoomprevious: {
		options: {
			tooltip: __('Zoom previous'),
			iconCls: "icon-zoom-previous",
			enableToggle: false,
			disabled: true,
			pressed: false,
			id: "zoomprevious"
		},

		create: function (mapPanel, options) {
			// create a navigation history control
			if (!mapPanel.historyControl) {
				mapPanel.historyControl = new OpenLayers.Control.NavigationHistory();
				mapPanel.getMap().addControl(mapPanel.historyControl);
			}
			options.control = mapPanel.historyControl.previous;

			return new GeoExt.Action(options);
		}
	},

	zoomnext: {
		options: {
			tooltip: __('Zoom next'),
			iconCls: "icon-zoom-next",
			enableToggle: false,
			disabled: true,
			pressed: false,
			id: "zoomnext"
		},

		create: function (mapPanel, options) {
			if (!mapPanel.historyControl) {
				mapPanel.historyControl = new OpenLayers.Control.NavigationHistory();
				mapPanel.getMap().addControl(mapPanel.historyControl);
			}
			options.control = mapPanel.historyControl.next;
			return new GeoExt.Action(options);
		}
	},

	measurelength: {
		options: {
			tooltip: __('Measure length'),
			iconCls: "icon-measure-length",
			enableToggle: true,
			pressed: false,
			measureLastLength: 0.0,
			control: new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
				persist: true,
				immediate: true,
				displayClass: "olControlMeasureDistance", // css-Cursor
				handlerOptions: {
					layerOptions: {styleMap: new OpenLayers.StyleMap({
						"default": new OpenLayers.Style(null, {
							rules: [new OpenLayers.Rule({
								symbolizer: {
									/*
									 "Point": {
									 pointRadius: 4,
									 graphicName: "square",
									 fillColor: "white",
									 fillOpacity: 1,
									 strokeWidth: 1,
									 strokeOpacity: 1,
									 strokeColor: "#333333"
									 },
									 "Line": {
									 strokeWidth: 2,
									 strokeOpacity: 1,
									 strokeColor: "#666666",
									 strokeDashstyle: "dash"
									 }
									 */
									"Point": {
										pointRadius: 10,
										graphicName: "square",
										fillColor: "white",
										fillOpacity: 0.25,
										strokeWidth: 1,
										strokeOpacity: 1,
										strokeColor: "#333333"
									},
									"Line": {
										strokeWidth: 1,
										strokeOpacity: 1,
										strokeColor: "#FF0000",
										strokeDashstyle: "solid"
										/* strokeDashstyle: "dot dash dashdot longdash longdashdot solid" */
									}
								}
							})]
						})
					})
					}
				}
			}),
			id: "measurelength",
			toggleGroup: "toolGroup"
		},

		create: function (mapPanel, options) {
			var action = new GeoExt.Action(options);
			var map = mapPanel.getMap();
			var controls = map.getControlsByClass("OpenLayers.Control.Measure");

			for (var i = 0; i < controls.length; i++) {
				// Only register for Distance measurements (otherwise may get events twice)
				// See http://code.google.com/p/geoext-viewer/issues/detail?id=106
				if (controls[i].displayClass == 'olControlMeasureDistance') {
					// Add optional property "geodesic" to cater for those projections
					// See http://code.google.com/p/geoext-viewer/issues/detail?id=90
					controls[i].geodesic = options.geodesic;
					controls[i].events.register("activate", map, Heron.widgets.ToolbarBuilder.onMeasurementsActivate);
					controls[i].events.register("measure", map, Heron.widgets.ToolbarBuilder.onMeasurements);
					controls[i].events.register("measurepartial", map, Heron.widgets.ToolbarBuilder.onMeasurementsPartial);
					controls[i].events.register("deactivate", map, Heron.widgets.ToolbarBuilder.onMeasurementsDeactivate);
					break;
				}
			}

			return action;
		}

	},

	measurearea: {
		options: {
			tooltip: __('Measure area'),
			iconCls: "icon-measure-area",
			enableToggle: true,
			pressed: false,
			control: new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
				persist: true,
				immediate: true,
				displayClass: "olControlMeasureArea", // css-Cursor
				handlerOptions: {
					layerOptions: {styleMap: new OpenLayers.StyleMap({
						"default": new OpenLayers.Style(null, {
							rules: [new OpenLayers.Rule({
								symbolizer: {
									/*
									 "Point": {
									 pointRadius: 4,
									 graphicName: "square",
									 fillColor: "white",
									 fillOpacity: 1,
									 strokeWidth: 1,
									 strokeOpacity: 1,
									 strokeColor: "#333333"
									 },
									 "Polygon": {
									 strokeWidth: 2,
									 strokeOpacity: 1,
									 strokeColor: "#666666",
									 fillColor: "white",
									 fillOpacity: 0.3
									 }
									 */
									"Point": {
										pointRadius: 10,
										graphicName: "square",
										fillColor: "white",
										fillOpacity: 0.25,
										strokeWidth: 1,
										strokeOpacity: 1,
										strokeColor: "#333333"
									},
									"Polygon": {
										strokeWidth: 1,
										strokeOpacity: 1,
										strokeColor: "#FF0000",
										strokeDashstyle: "solid",
										fillColor: "#FFFFFF",
										fillOpacity: 0.5
									}
								}
							})]
						})
					})
					}
				}
			}),
			id: "measurearea",
			toggleGroup: "toolGroup"
		},

		create: function (mapPanel, options) {
			var action = new GeoExt.Action(options);
			var map = mapPanel.getMap();
			var controls = map.getControlsByClass("OpenLayers.Control.Measure");
			for (var i = 0; i < controls.length; i++) {
				// Only register for Area measurements (otherwise may get events twice)
				// See http://code.google.com/p/geoext-viewer/issues/detail?id=106
				if (controls[i].displayClass == 'olControlMeasureArea') {
					// Add optional property "geodesic" to cater for those projections
					// See http://code.google.com/p/geoext-viewer/issues/detail?id=90
					controls[i].geodesic = options.geodesic;
					controls[i].events.register("activate", map, Heron.widgets.ToolbarBuilder.onMeasurementsActivate);
					controls[i].events.register("measure", map, Heron.widgets.ToolbarBuilder.onMeasurements);
					controls[i].events.register("measurepartial", map, Heron.widgets.ToolbarBuilder.onMeasurementsPartial);
					controls[i].events.register("deactivate", map, Heron.widgets.ToolbarBuilder.onMeasurementsDeactivate);
					break;
				}
			}

			return action;
		}

	},
	any: {
		/** Add your own stuff like a Menu config */
		options: {
			tooltip: __('Anything is allowed here'),
			text: __('Any valid Toolbar.add() config goes here')
		},

		create: function (mapPanel, options) {
			return options;
		}
	},
	search_nominatim: {
		/** DEPRECATED : PLEASE USE 'namesearch' with xtype: hr_nominatimsearchcombo' + options */
		options: {
			tooltip: __('Search Nominatim'),
			id: "search_nominatim"
		},

		create: function (mapPanel, options) {
			return new Heron.widgets.NominatimSearchCombo(options);
		}
	},

	namesearch: {
		options: {
			id: "namesearch"
		},

		create: function (mapPanel, options) {
			return Ext.create(options);
		}
	},

	searchpanel: {

		/* Options to be passed to your create function. */
		options: {
			id: "searchpanel",
			tooltip: __('Search'),
			iconCls: "icon-find",
			enableToggle: false,
			pressed: false,
			searchWindowDefault: {
				title: __('Search'),
				layout: "fit",
				closeAction: "hide",
				x: 100,
				width: 400,
				height: 400
			}
		},

		// Instead of an internal "type".
		// provide a create factory function.
		// MapPanel and options (see below) are always passed
		create: function (mapPanel, options) {

			// Handler to create Window with FeatSelSearchPanel
			options.handler = function () {
				if (!this.searchpanelWindow) {
					var windowOptions = options.searchWindowDefault;
					Ext.apply(windowOptions, options.searchWindow);
					this.searchpanelWindow = new Ext.Window(windowOptions);
				}
				this.searchpanelWindow.show();
			};

			// Provide an ExtJS Action object (invokes handler on click)
			return new Ext.Action(options);
		}
	},

	printdialog: {

		// Options to be passed to your create function. //
		options: {
			id: "hr_printdialog",
			title: __('Print Dialog'),
			tooltip: __('Print Dialog Popup with Preview Map'),
			iconCls: "icon-printer",
			enableToggle: false,
			pressed: false,
			windowTitle: __('Print Preview'),
			windowWidth: 400,
			method: 'POST',
			url: null, // 'http://kademo.nl/print/pdf28992',
			legendDefaults: {
				useScaleParameter: false,
				baseParams: {FORMAT: "image/png"}
			},
			showTitle: true,
			mapTitle: __('Print Preview Demo'),
			mapTitleYAML: "mapTitle", // MapFish - field name in config.yaml - default is: 'mapTitle'
			showComment: true,
			mapComment: null,
			mapCommentYAML: "mapComment", // MapFish - field name in config.yaml - default is: 'mapComment'
			showFooter: false,
			mapFooter: null,
			mapFooterYAML: "mapFooter", // MapFish - field name in config.yaml - default is: 'mapFooter'
			showRotation: true,
			showLegend: true,
			showLegendChecked: false,
			mapLimitScales: true
		},

		// Instead of an internal "type" provide a create factory function.
		// MapPanel and options (see below) are always passed.
		create: function (mapPanel, options) {

			// Show a popup Print Preview
			options.handler = function () {
				var printWindow = new Heron.widgets.PrintPreviewWindow({
					title: options.windowTitle,
					modal: true,
					border: false,
					resizable: false,
					width: options.windowWidth,
					autoHeight: true,

					hropts: {
						mapPanel: mapPanel,
						method: options.method,
						url: options.url,
						legendDefaults: options.legendDefaults,
						showTitle: options.showTitle,
						mapTitle: options.mapTitle,
						mapTitleYAML: options.mapTitleYAML,
						showComment: options.showComment,
						mapComment: options.mapComment,
						mapCommentYAML: options.mapCommentYAML,
						showFooter: options.showFooter,
						mapFooter: options.mapFooter,
						mapFooterYAML: options.mapFooterYAML,
						showRotation: options.showRotation,
						showLegend: options.showLegend,
						showLegendChecked: options.showLegendChecked,
						mapLimitScales: options.mapLimitScales
					}

				});
			};

			// Provide an ExtJS Action object
			// If you use an OpenLayers control, you need to provide a GeoExt Action object.
			return new Ext.Action(options);
		}
	},

	printdirect: {

		// Options to be passed to your create function. //
		options: {
			id: "printdirect",
			tooltip: __('Print Visible Map Area Directly'),
			iconCls: "icon-print-direct",
			enableToggle: false,
			pressed: false,
			method: 'POST',
			url: null,
			mapTitle: __('Print Preview Demo'),
			mapTitleYAML: "mapTitle", // MapFish - field name in config.yaml - default is: 'mapTitle'
			mapComment: __('This is a simple map directly printed.'),
			mapCommentYAML: "mapComment", // MapFish - field name in config.yaml - default is: 'mapComment'
			mapFooter: null,
			mapFooterYAML: "mapFooter", // MapFish - field name in config.yaml - default is: 'mapFooter'
			mapPrintLayout: "A4", // MapFish - 'name' entry of the 'layouts' array or Null (=> MapFish default)
			mapPrintDPI: "75", // MapFish - 'value' entry of the 'dpis' array or Null (=> MapFish default)
			mapPrintLegend: false,
			legendDefaults: {
				useScaleParameter: true,
				baseParams: {FORMAT: "image/png"}
			}
		},

		// Instead of an internal "type".
		// provide a create factory function.
		// MapPanel and options (see below) are always passed
		create: function (mapPanel, options) {

			// Handler to create Print dialog popup Window
			options.handler = function () {

				// Display loading panel
				var busyMask = new Ext.LoadMask(Ext.getBody(), { msg: __('Create PDF...') });
				busyMask.show();

				Ext.Ajax.request({
					url: options.url + '/info.json',
					method: 'GET',
					params: null,
					success: function (result, request) {

						var printCapabilities = Ext.decode(result.responseText);
						var printProvider = new GeoExt.data.PrintProvider({
							method: options.method, // "POST" recommended for production use
							capabilities: printCapabilities, // from the info.json script in the html
							customParams: { },
							listeners: {
								/** api: event[printexception]
								 *  Triggered when using the ``POST`` method, when the print
								 *  backend returns an exception.
								 *
								 *  Listener arguments:
								 *
								 *  * printProvider - :class:`GeoExt.data.PrintProvider` this
								 *    PrintProvider
								 *  * response - ``Object`` the response object of the XHR
								 */
								"printexception": function (printProvider, result) {
									alert(__('Error from Print server: ') + result.statusText);
								}
							}
						});

						// Dynamicly declare the MapFish names of the config.yaml output fields
						// for the 'customParams' of the 'printProvider'
						printProvider.customParams[options.mapTitleYAML] = (options.mapTitle) ? options.mapTitle : '';
						printProvider.customParams[options.mapCommentYAML] = (options.mapComment) ? options.mapComment : '';
						printProvider.customParams[options.mapFooterYAML] = (options.mapFooter) ? options.mapFooter : '';

						// Set print layout format
						if ((printProvider.layouts.getCount() > 1) && (options.mapPrintLayout)) {
							var index = printProvider.layouts.find('name', options.mapPrintLayout);
							if (index != -1) {
								printProvider.setLayout(printProvider.layouts.getAt(index));
							}
						}

						// Set print DPI format
						if ((printProvider.dpis.getCount() > 1) && (options.mapPrintDPI)) {
							var index = printProvider.dpis.find('value', options.mapPrintDPI);
							if (index != -1) {
								printProvider.setDpi(printProvider.dpis.getAt(index));
							}
						}

						// Only print the legend entries if:
						// - print legend request is true
						// - Layer is visible  AND
						// - it should not be hidden (hideInLegend == true) AND
						// - it has not been created
						// See doc for 'Heron.widgets.LayerLegendPanel'
						if (options.mapPrintLegend) {
							// Hidden LegendPanel : needed to fetch active legends
							var legendPanel = new Heron.widgets.LayerLegendPanel({
								renderTo: document.body,
								hidden: true,
								defaults: options.legendDefaults
							});
						}

						// The printProvider that connects us to the print service of our print page.
						// Tells the PrintProvider about the scale and center of our page.
						var printPage = new GeoExt.data.PrintPage({
							printProvider: printProvider
						});

						// Convenient way to fit the print page to the visible map area
						printPage.fit(mapPanel, true);

						// Print the page, optionally including the legend
						printProvider.print(mapPanel, printPage, options.mapPrintLegend && {legend: legendPanel});

						// Hide loading panel
						busyMask.hide();

					},
					failure: function (result, request) {
						// Hide loading panel
						busyMask.hide();
						alert(__('Error getting Print options from server: ') + options.url);
					}
				});

			};
			// Provide an ExtJS Action object (invokes handler on click)
			return new Ext.Action(options);
		}
	},
	coordinatesearch: {

		/* Options to be passed to your create function. */
		options: {
			id: "coordinatesearch",
			tooltip: __('Enter coordinates to go to location on map'),
			iconCls: "icon-map-pin",
			enableToggle: false,
			pressed: false,

			fieldLabelX: __('X'),
			fieldLabelY: __('Y'),

			onSearchCompleteZoom: 6,
			iconUrl: null,
			iconWidth: 32,
			iconHeight: 32,
			localIconFile: 'redpin.png'
		},

		// Instead of an internal "type".
		// provide a create factory function.
		// MapPanel and options (see below) are always passed
		create: function (mapPanel, options) {

			// A trivial handler
			options.handler = function () {
				if (!this.coordPopup) {
					// Create only once
					this.coordPopup = new Ext.Window({
						layout: 'fit',
						resizable: false,
						width: 280,
						height: 120,
						plain: true,
						pageX: 200,
						pageY: 75,
						closeAction: 'hide',
						title: __('Go to coordinates'),
						items: new Heron.widgets.CoordSearchPanel({
							deferredRender: false,
							border: false,
							header: false,
							title: null,
							onSearchCompleteZoom: options.onSearchCompleteZoom,
							iconUrl: options.iconUrl,
							iconWidth: options.iconWidth,
							iconHeight: options.iconHeight,
							localIconFile: options.localIconFile,
							fieldLabelX: options.fieldLabelX,
							fieldLabelY: options.fieldLabelY
						})
					});
				}

				// Toggle visibility
				if (this.coordPopup.isVisible()) {
					this.coordPopup.hide()
				} else {
					this.coordPopup.show(this);
				}
			};

			// Provide an ExtJS Action object
			// If you use an OpenLayers control, you need to provide a GeoExt Action object.
			return new Ext.Action(options);
		}
	}
};

Heron.widgets.ToolbarBuilder.setItemDef = function (type, createFun, defaultOptions) {
	Heron.widgets.ToolbarBuilder.defs[type].create = createFun;
	Heron.widgets.ToolbarBuilder.defs[type].options = defaultOptions ? defaultOptions : {};
};

Heron.widgets.ToolbarBuilder.build = function (mapPanel, config) {
	var toolbarItems = [];
	if (typeof(config) !== "undefined") {
		for (var i = 0; i < config.length; i++) {
			var itemDef = config[i];

			// Check for separators (ExtJS convention to use "-")
			if (itemDef.type == "-") {
				toolbarItems.push("-");
				continue;
			}

			// Determine toolbar (Action) item cretae function
			// Default is from the above config, but a user can supply a function
			var createFun;
			var defaultItemDef = Heron.widgets.ToolbarBuilder.defs[itemDef.type];
			if (itemDef.create) {
				createFun = itemDef.create;
			} else if (defaultItemDef && defaultItemDef.create) {
				createFun = defaultItemDef.create;
			}

			// No use to proceed if no function to create item
			if (!createFun) {
				continue;
			}

			// Determine options
			var coreOptions = {
				// 1. Always needed but available here
				map: mapPanel.getMap(),
				scope: mapPanel
			};

			// 2. Default configured options
			var defaultItemOptions = {};
			if (defaultItemDef && defaultItemDef.options) {
				defaultItemOptions = defaultItemDef.options;
			}

			// 3. User supplied options
			var extraOptions = itemDef.options ? itemDef.options : {};

			// Assemble all options into a single struct
			var options = Ext.apply(coreOptions, extraOptions, defaultItemOptions);

			// Finally try to create the item if ok
			var item = createFun(mapPanel, options);
			if (item) {
				toolbarItems.push(item);
			}
		}
	}

	// Add created items to the toolbar
	mapPanel.getTopToolbar().add(toolbarItems);
};

