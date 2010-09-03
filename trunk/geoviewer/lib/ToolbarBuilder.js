/*
 * Copyright (C) 2010  Het Kadaster - The Netherlands
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

Ext.namespace("GeoViewer.ToolbarBuilder");

GeoViewer.ToolbarBuilder.defs = {
	featureinfo : {

		options : {
			tooltip: GeoViewer.lang.txtFeatureInfo,
			iconCls: "icon-getfeatureinfo",
			enableToggle : true,
			pressed : false,
			id:"featureinfo",
			toggleGroup: "toolGroup"
		},

		create : function(mapPanel, options) {
			options.control = new OpenLayers.Control.WMSGetFeatureInfo({
				maxFeatures	: GeoViewer.Map.options.MAX_FEATURES,
				queryVisible: true,
				infoFormat : "application/vnd.ogc.gml"
			});

			return new GeoExt.Action(options);
		}
	},

	pan : {
		options : {
			tooltip: GeoViewer.lang.txtPan,
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
			tooltip: GeoViewer.lang.txtZoomIn,
			iconCls: "icon-zoom-in",
			enableToggle: true,
			pressed: false,
			control : new OpenLayers.Control.ZoomBox({title: GeoViewer.lang.txtZoomIn, out: false}),
			id: "zoomin",
			toggleGroup: "toolGroup"

		},

		create : function(mapPanel, options) {
			return new GeoExt.Action(options);
		}
	},

	zoomout : {
		options : {
			tooltip: GeoViewer.lang.txtZoomOut,
			iconCls: "icon-zoom-out",
			enableToggle: true,
			pressed: false,
			control : new OpenLayers.Control.ZoomBox({title: GeoViewer.lang.txtZoomOut, out: true}),
			id: "zoomout",
			toggleGroup: "toolGroup"
		},

		create : function(mapPanel, options) {
			return new GeoExt.Action(options);
		}
	},
	zoomvisible : {
		options : {
			tooltip: GeoViewer.lang.txtZoomToFullExtent,
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
			tooltip: GeoViewer.lang.txtZoomPrevious,
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
			tooltip: GeoViewer.lang.txtZoomNext,
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
			tooltip: GeoViewer.lang.txtMeasureLength,
			iconCls: "icon-measure-length",
			enableToggle: true,
			pressed: false,
			control : new OpenLayers.Control.Measure(OpenLayers.Handler.Path, {persist: true}),
			id: "measurelength",

			toggleGroup: "toolGroup"

		},
		create : function(mapPanel, options) {
			return new GeoExt.Action(options);
		}
	},
	measurearea : {
		options :
		{
			tooltip: GeoViewer.lang.txtMeasureArea,
			iconCls: "icon-measure-area",
			enableToggle: true,
			pressed: false,
			control : new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon, {persist: true}),
			id: "measurearea",

			toggleGroup: "toolGroup"

		}  ,
		create : function(mapPanel, options) {
			return new GeoExt.Action(options);
		}
	}
};

GeoViewer.ToolbarBuilder.setItemDef = function(type, createFun, defaultOptions) {
	GeoViewer.ToolbarBuilder.defs[type].create = createFun;
	GeoViewer.ToolbarBuilder.defs[type].options = defaultOptions ? defaultOptions : {};
};

GeoViewer.ToolbarBuilder.build = function(mapPanel, config) {
	var toolbarItems = [];
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
		var defaultItemDef = GeoViewer.ToolbarBuilder.defs[itemDef.type];
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

	// Add created items to the toolbar
	mapPanel.gxMapPanel.getTopToolbar().add(toolbarItems);

	// We really would like to create a Toolbar and add to MapPanel
	// but this is tricky
	//var tb = new Ext.Toolbar(toolbarItems);
	//mapPanel.elements += ',tbar';
	//mapPanel.add(tb);
	// mapPanel.doLayout(); 

	// return toolbarItems;
};
