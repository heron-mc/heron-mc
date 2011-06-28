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
 *  base_link = `Ext.Panel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.Panel>`_
 */

Heron.widgets.ToolbarBuilder = {};

/** Measurements handling function for length/area. */
Heron.widgets.ToolbarBuilder.onMeasurements = function (event) {
	var units = event.units;
	var measure = event.measure;
	var out = "";
	if (event.order == 1) {
		out += __('Length') + ": " + measure.toFixed(3) + " " + units;
	} else {
		out += __('Area') + ": " + measure.toFixed(3) + " " + units + "2";
	}
	Ext.getCmp("bbar_measure").setText(out);
};

Heron.widgets.ToolbarBuilder.defs = {
	featureinfo : {

		options : {
			tooltip: __('Feature information'),
			iconCls: "icon-getfeatureinfo",
			enableToggle : true,
			pressed : false,
			id:"featureinfo",
			toggleGroup: "toolGroup",
			max_features: 10
		},

		create : function(mapPanel, options) {
			options.control = new OpenLayers.Control.WMSGetFeatureInfo({
				maxFeatures	: options.max_features,
				queryVisible: true,
				infoFormat : "application/vnd.ogc.gml"
			});

			return new GeoExt.Action(options);
		}
	},

	pan : {
		options : {
			tooltip: __('Pan'),
			iconCls: "icon-pan",
			enableToggle: true,
			pressed: true,
			control: new OpenLayers.Control.Navigation(),
			id:"pan",
			toggleGroup: "toolGroup"
		},

		create : function(mapPanel, options) {
			return new GeoExt.Action(options);
		}
	},
	zoomin : {
		options : {
			tooltip: __('Zoom in'),
			iconCls: "icon-zoom-in",
			enableToggle: true,
			pressed: false,
			control : new OpenLayers.Control.ZoomBox({
				title: __('Zoom in'),
				out: false
			}),
			id: "zoomin",
			toggleGroup: "toolGroup"

		},

		create : function(mapPanel, options) {
			return new GeoExt.Action(options);
		}
	},

	zoomout : {
		options : {
			tooltip: __('Zoom out'),
			iconCls: "icon-zoom-out",
			enableToggle: true,
			pressed: false,
			control : new OpenLayers.Control.ZoomBox({
				title: __('Zoom out'),
				out: true
			}),
			id: "zoomout",
			toggleGroup: "toolGroup"
		},

		create : function(mapPanel, options) {
			return new GeoExt.Action(options);
		}
	},
	zoomvisible : {
		options : {
			tooltip: __('Zoom to full extent'),
			iconCls: "icon-zoom-visible",
			enableToggle: true,
			pressed: false,
			control : new OpenLayers.Control.ZoomToMaxExtent(),
			id: "zoomvisible",

			toggleGroup: "toolGroup"

		},
		create : function(mapPanel, options) {
			return new GeoExt.Action(options);
		}
	},
	zoomprevious : {
		options : {
			tooltip: __('Zoom previous'),
			iconCls: "icon-zoom-previous",
			disabled: true,
			pressed: false,
			id: "zoomprevious",

			toggleGroup: "toolGroup"

		},

		create : function(mapPanel, options) {
			// create a navigation history control
			if (!mapPanel.historyControl) {
				mapPanel.historyControl = new OpenLayers.Control.NavigationHistory();
				mapPanel.getMap().addControl(mapPanel.historyControl);
			}
			options.control = mapPanel.historyControl.previous;

			return new GeoExt.Action(options);
		}
	},
	zoomnext : {
		options :
		{
			tooltip: __('Zoom next'),
			iconCls: "icon-zoom-next",
			disabled: true,
			pressed: false,
			id: "zoomnext",

			toggleGroup: "toolGroup"

		},

		create : function(mapPanel, options) {
			if (!mapPanel.historyControl) {
				mapPanel.historyControl = new OpenLayers.Control.NavigationHistory();
				mapPanel.getMap().addControl(mapPanel.historyControl);
			}
			options.control = mapPanel.historyControl.next;
			return new GeoExt.Action(options);
		}
	},
	measurelength : {
		options :
		{
			tooltip: __('Measure length'),
			iconCls: "icon-measure-length",
			enableToggle: true,
			pressed: false,
			control : new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {
				persist: true
			}),
			id: "measurelength",

			toggleGroup: "toolGroup"

		},
		create : function(mapPanel, options) {
			var action = new GeoExt.Action(options);
			var map = mapPanel.getMap();
			var controls = map.getControlsByClass("OpenLayers.Control.Measure");
			for (var i = 0; i < controls.length; i++) {
				controls[i].events.register("measure", map, Heron.widgets.ToolbarBuilder.onMeasurements);
				controls[i].events.register("measurepartial", map, Heron.widgets.ToolbarBuilder.onMeasurements);
			}

			return action;
		}
	},
	measurearea : {
		options :
		{
			tooltip: __('Measure area'),
			iconCls: "icon-measure-area",
			enableToggle: true,
			pressed: false,
			control : new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {
				persist: true
			}),
			id: "measurearea",

			toggleGroup: "toolGroup"

		} ,
		create : function(mapPanel, options) {
			var action = new GeoExt.Action(options);
			var map = mapPanel.getMap();
			var controls = map.getControlsByClass("OpenLayers.Control.Measure");
			for (var i = 0; i < controls.length; i++) {
				controls[i].events.register("measure", map, Heron.widgets.ToolbarBuilder.onMeasurements);
				controls[i].events.register("measurepartial", map, Heron.widgets.ToolbarBuilder.onMeasurements);
			}

			return action;
		}
	}, search_nominatim : {
		/** DEPRECATED : PLEASE USE 'namesearch' with xtype: hr_nominatimsearchcombo' + options */
		options :
		{
			tooltip: __('Search Nominatim'),
			id: "search_nominatim"
		},

		create : function(mapPanel, options) {
			return new Heron.widgets.NominatimSearchCombo(options);
		}
	}, namesearch : {
		options :
		{
			id: "namesearch"
		},

		create : function(mapPanel, options) {
			return Ext.create(options);
		}

	}
};

Heron.widgets.ToolbarBuilder.setItemDef = function(type, createFun, defaultOptions) {
	Heron.widgets.ToolbarBuilder.defs[type].create = createFun;
	Heron.widgets.ToolbarBuilder.defs[type].options = defaultOptions ? defaultOptions : {};
};

Heron.widgets.ToolbarBuilder.build = function(mapPanel, config) {
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
				map : mapPanel.getMap(),
				scope : mapPanel
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

