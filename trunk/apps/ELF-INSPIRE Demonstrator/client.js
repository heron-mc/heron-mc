/*
This file contains the core application code for the ESDIN client

Author(s):
Frans Knibbe, Geodan (frans.knibbe@geodan.nl)
*/

/*
Start Auxiliary functions
*/
// Do two rectangles overlap?

// A rectangle is defined by having xMin, yMax, xMin and yMax
// for logic see http://beradrian.wordpress.com/2010/08/02/overlapping-rectangles/
function overlap (rectA, rectB)
{
	var v1 = Math.max(rectA.xMin,rectB.xMin);
	var w1 = Math.max(rectA.yMin,rectB.yMin);
	var v2 = Math.min(rectA.xMax,rectB.xMax);
	var w2 = Math.min(rectA.yMax,rectB.yMax);
	return (!((v1 > v2) ||  (w1 > w2)));
}

// Get the index of an item in an array (starts with 0)
Array.prototype.findIndex = function(value){
	var returnValue = null;
	for (var i=0; i < this.length; i++) {
		if (this[i] == value) {
			return i;c
		}
	}
	return returnValue;
};
/*
End Auxiliary functions
*/

/* 
Initalization for OpenLayers
*/
// Create the map 
map = new OpenLayers.Map({
	maxExtent: new OpenLayers.Bounds(2100000.2378,820000.9292,6300000.4541,5021872.0731) // extent of epsg:3034 projection (Europe)
	,projection: "EPSG:3034"
	//,maxResolution: 16413.559156 // width of the mapExtent divided by width of a map tile in pixels (usually 256)
	,maxResolution: 16406.2508449 // width of the mapExtent divided by width of a map tile in pixels (usually 256)
	,units: "m"
	,controls: [ // We leave out the blue OpenLayers panzoom control, we use the GeoExt zoom slider instead
		new OpenLayers.Control.Navigation()
		,new OpenLayers.Control.ArgParser()
		,new OpenLayers.Control.Attribution()
	]
});

// set CRSs 
Proj4js.defs["EPSG:3034"] = "+proj=lcc +lat_1=35 +lat_2=65 +lat_0=52 +lon_0=10 +x_0=4000000 +y_0=2800000 +ellps=GRS80 +units=m +no_defs";
Proj4js.defs["EPSG:4258"] = "+proj=longlat +ellps=GRS80 +no_defs";
var dataCrs = new Proj4js.Proj("EPSG:4258");
var mapCrs = new Proj4js.Proj("EPSG:3034");

// Add all layers from layers.js to the map
for (layer in EC_layers)
{
	map.addLayer(EC_layers[layer]);
}

// Create a layer for the download area (da)
var daLayer = new OpenLayers.Layer.Vector("Download area");
map.addLayer(daLayer);

// Capture the coordinates when the mouse moves
var onMouseMove = function(e) {
	var lonLat = this.getLonLatFromPixel(e.xy);
	Ext.getCmp("coordinates").setText("Coordinates (ETRS LCC / EPSG:3034): " + lonLat.lat.toFixed(0) + ", " + lonLat.lon.toFixed(0));
};
this.map.events.register("mousemove", this.map, onMouseMove);

// Make a custom control for defining the download area
var rectangleControl = new OpenLayers.Control();
OpenLayers.Util.extend(rectangleControl, {
	draw: function () {
		this.box = new OpenLayers.Handler.Box(
			rectangleControl
			,{"done": this.addOrReplace}
			,{keyMask: OpenLayers.Handler.MOD_ALT}
		);
		this.box.activate();
	}
	,addOrReplace: function (bounds) {
		var ll = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.left, bounds.bottom)); 
		var ur = map.getLonLatFromPixel(new OpenLayers.Pixel(bounds.right, bounds.top)); 
		downloadArea = new OpenLayers.Feature.Vector(
			new OpenLayers.Bounds(ll.lon.toFixed(0),ll.lat.toFixed(0),ur.lon.toFixed(0),ur.lat.toFixed(0)).toGeometry()
		);
		daLayer.removeAllFeatures();
		daLayer.addFeatures([downloadArea]);
	}
});
map.addControl(rectangleControl);

// add a scale bar
scaleLine = new OpenLayers.Control.ScaleLine();
map.addControl(scaleLine);

// prepare the test areas layer:
var testAreaStyleMap = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{ 
				fillColor: '#aaeeff'
				,strokeColor: '#667788'
				,strokeWidth: 2
				,strokeOpacity: 0.7
				,fillOpacity: 0.2
				,label: "${shortName}"
				,fontFamily: "Helvetica"
				,fontSize: "10px"
				,fontColor: "#662200"
				,labelAlign: "cm"
				
			}
			,{context: {
        getLabel: function(feature) {
					if(feature.layer.map.getZoom() < 6) {
						return feature.attributes.label;
					}
        }
			}}
		),
		"select": new OpenLayers.Style(
			{
				fillColor: '#ddeeff'
				,strokeColor: '#667744'
				,strokeWidth: 2
				,strokeOpacity: 0.9
				,fillOpacity: 0.7
				,label: "${shortName}"
				,fontFamily: "Helvetica"
				,fontSize: "12px"
				,fontWeight: "bold"
				,fontColor: "#662200"
				,labelAlign: "cm"
			}
		)
	}
);
var testAreasLayer = new OpenLayers.Layer.Vector(
	"test Areas"
	,{
		styleMap: testAreaStyleMap
		,visibility: false
	} // options
);
for (area in EC_testAreas) {
 	newTestArea = new OpenLayers.Feature.Vector(EC_testAreas[area].bounds.toGeometry());
	newTestArea.attributes = {
		shortName: EC_testAreas[area].shortName
		,longName: EC_testAreas[area].longName
		,description: EC_testAreas[area].description
	};
	testAreasLayer.addFeatures([newTestArea]);
}
var selectCtrl = new OpenLayers.Control.SelectFeature(
	testAreasLayer
	,{
		//hover: true
	}
);
function createPopup(feature) {
	popup = new GeoExt.Popup({ // Extends Ext.Window
			title: "Test area description"
			,location: feature
			,width: 300
			,height: 100
			,unpinnable: false
			,popupCls: "testAreaPopup"
			//,html: '<div><p style="padding-left:5px;padding-top:5px;">' + feature.attributes.description + '</p></div>'
			,html: '<div><p style="padding:5px">' + feature.attributes.description + '</p></div>'
			,margins: "{top:0, right:0, bottom:0, left:100}"
	});
	// unselect feature when the popup is closed
	popup.on(
		{
			close: function() {
				if(OpenLayers.Util.indexOf(testAreasLayer.selectedFeatures, this.feature) > -1)
				{
					selectCtrl.unselect(this.feature);
				}
			}
		}
	);
	popup.show();
}
testAreasLayer.events.on({
	featureselected: function(e) {
		createPopup(e.feature);
	}
});
map.addLayer(testAreasLayer);
selectCtrl.handlers.feature.stopDown = false; // This is needed to allow panning in the test areas.
map.addControl(selectCtrl);
selectCtrl.activate();

/* 
End Initalization for OpenLayers
*/

Ext.onReady(function() {
	Ext.QuickTips.init(); // This is needed for tool tips
	
	// This enables QuickTips for menu items:
	Ext.menu.BaseItem.prototype.onRender = function(container){
		this.el = Ext.get(this.el);
		container.dom.appendChild(this.el.dom);
		if (this.tooltip) {
			this.el.dom.qtip = this.tooltip;
		}
	};
	
	// data store for geographical names
	var namesStore = new Ext.data.Store({
		proxy: new Ext.data.ScriptTagProxy({url: 'http://research.geodan.nl/esdin/autocomplete/complete.php'})
		,reader: new Ext.data.JsonReader(
			{root: "data"}
			,[
				{name: "id", type: 'string'}
				,{name: "name", type: 'string'}
				,{name: "latitude", type: "number"}
				,{name: "longitude", type: "number"}
			]
		)
	});
	
	// a searchbox for names
	var searchBox = new Ext.form.ComboBox({
		store: namesStore
		,displayField: "name"
		,typeAhead: true
		,hideTrigger: true
		,emptyText: "Type a geographical name..."
		,width: 300
		,minChars: 4 //default value: 4
		,loadingText: 'Searching...'
		,onSelect: function(record) {
			this.setValue(record.data.name); // put the selected name in the box
			var center = new OpenLayers.Geometry.Point(record.data.longitude,record.data.latitude);
			Proj4js.transform(dataCrs,mapCrs,center);
			var lonlat = new OpenLayers.LonLat(center.x,center.y);
			map.setCenter(lonlat,8); // zoom in on the location
			this.collapse();// close the drop down list
		}
  });
	
	// Help for the user
	// Help content comes from plain HMTL files, making it easy to edit by anyone.
	var helpMenu = new Ext.menu.Menu({
		id: "helpMenu" 
		,items: [
			{
				text: "Map control"
				,handler: function() {
					navHelpWindow = new Ext.Window(
						{
							layout: "fit"
							,width: 460
							,height: 420
							,autoScroll:true
							,title: "Map control"
							,items: [{
								autoLoad: "helpControl.html"
								,frame: true
								,preventBodyReset: true // prevent ExtJS disabling browser styles
							}]
						}
					);
					navHelpWindow.show(this);
				}
			}
			,{
				text: "Working with the " + EC_title
				,handler: function() {
					aboutWindow = new Ext.Window(
						{
							layout: "fit"
							,autoScroll: true
							,width: 400
							,height: 300
							,title: "Working with the "  + EC_title + "..."
							,items: [{
								autoLoad: "helpWorking.html"
								,frame: true
								,preventBodyReset: true // prevent ExtJS disabling browser styles
							}]
						}
					);
					aboutWindow.show(this);
				}
			}
			,{
				text: "Test Areas"
				,handler: function() {
					aboutWindow = new Ext.Window(
						{
							layout: "fit"
							,autoScroll: true
							,width: 400
							,height: 300
							,title: "Test Areas"
							,items: [{
								autoLoad: "helpTestAreas.html"
								,frame: true
								,preventBodyReset: true // prevent ExtJS disabling browser styles
							}]
						}
					);
					aboutWindow.show(this);
				}
			}
			,{
				text: "About the " + EC_title
				,handler: function() {
					aboutWindow = new Ext.Window(
						{
							layout: "fit"
							,autoScroll: true
							,width: 400
							,height: 200
							,title: "About the "  + EC_title + "..."
							,items: [{
								autoLoad: "about.html"
								,frame: true
								,preventBodyReset: true // prevent ExtJS disabling browser styles
							}]
						}
					);
					aboutWindow.show(this);
				}
			}
		]
	})
	
	var testAreaMenu = new Ext.menu.Menu({id: "testAreaMenu"});
	for (area in EC_testAreas) {
		testAreaMenu.addItem(
			{
				text: EC_testAreas[area].longName
				,bounds: EC_testAreas[area].bounds
			  ,tooltip: EC_testAreas[area].description
				,qtip: EC_testAreas[area].description
				,handler: function(b) {
					map.zoomToExtent(b.bounds);
				}
			}
		);
	}
	
	var downloadButtonHandler = function(button, event) {
		// Check if a download area has been defined:
		if (daLayer.features.length == 0) {
			Ext.MessageBox.alert("Information", "An area of interest has not been defined yet. Draw a rectangle on the map while pressing the 'Alt' key do define an area of interest." );
			return;
		}
		// Get the visible feature types
		var visibleFeatureTypes = [];
		for (var i = 0; i < window.layerRoot.childNodes.length; i++) {
			for (var j = 0; j < window.layerRoot.childNodes[i].childNodes.length; j++) {
				if (window.layerRoot.childNodes[i].childNodes[j].attributes.checked == true) {
					//visibleFeatureTypes.push(window.layerRoot.childNodes[i].childNodes[j].attributes.featureType)
					visibleFeatureTypes = visibleFeatureTypes.concat(window.layerRoot.childNodes[i].childNodes[j].attributes.featureTypes);
				}
			}
		}
		if (visibleFeatureTypes.length == 0) {
			Ext.MessageBox.alert("Information", "Please select at least one feature type to download." );
			return;
		}
		var daBounds = daLayer.features[0].geometry.bounds;
		var llCorner = new OpenLayers.Geometry.Point(daBounds.left,daBounds.bottom);
		var urCorner =  new OpenLayers.Geometry.Point(daBounds.right,daBounds.top);
		Proj4js.transform(mapCrs,dataCrs,llCorner);
		Proj4js.transform(mapCrs,dataCrs,urCorner);
		var downloadArea = new rectangle (llCorner.y,llCorner.x,urCorner.y,urCorner.x) // use the right axis order!
		// loop through all defined Download Services and request features for those with matching
		// theme and feature type and overlapping extent
		var matches = 0;
		for (service in EC_DownloadServices) {
			// Does the feature type match?
			if (visibleFeatureTypes.findIndex(EC_DownloadServices[service].featureType) == null) {
				continue;
			}
			// Does the extent of the service overlap with the download area?
			if (overlap(downloadArea,EC_DownloadServices[service].spatialExtent)) {
				matches++;
				// Now we can build a WFS request..
				var request = EC_DownloadServices[service].url + "?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&OUTPUTFORMAT=text/xml;%20subtype=gml/3.2.1";
				if (EC_DownloadServices[service].axesSwitched) {
					request += "&BBOX=" + downloadArea.yMin + "," + downloadArea.xMin + "," + downloadArea.yMax + "," + downloadArea.xMax;
				}
				else {
					request += "&BBOX=" + downloadArea.xMin + "," + downloadArea.yMin + "," + downloadArea.xMax + "," + downloadArea.yMax;
				}
				request += "&SRSNAME=" + EC_DownloadServices[service].srsName;
				request += "&TYPENAME=" + EC_DownloadServices[service].featureType;
				request += "&filename=" + EC_DownloadServices[service].featureType.replace(":","_") + "_" + EC_DownloadServices[service].provider.abbreviation + ".gml";
				// execute the request: 
				window.location = request;
			}
		}
		if (matches == 0) {
			Ext.MessageBox.alert("Information", "No matching Download Services have been found." );
			return;
		}
	}

	// The toolbar help the user deal with the map
	var toolbar = new Ext.Toolbar({
		items:[
			/*
			{
				text: "Define area"
			 ,iconCls: "pictogramDefineArea"
			 ,tooltip : "Draw a rectangle on the map to define the download area"
			}
			*/
			{
				text: "Download features"
			 ,iconCls: "pictogramDownloadFeatures"
			 ,tooltip: "Download features from selected feature types"
			 ,handler: downloadButtonHandler
			}
			,{xtype: 'tbspacer', width: 20}
			,searchBox
			,{xtype: 'tbfill'} // justify right from here
			,{
				text: "Test Areas"
				,iconCls: "pictogramZoomToTestArea"
				,menu: testAreaMenu
				,tooltip : "Zoom to a predefined test area"
			}
			,{xtype: 'tbspacer', width: 10}
			,{
				text: "Help"
				,iconCls: "pictogramHelp"
				,menu: helpMenu
				,tooltip : "Look here for help on using the " + EC_title
			}
			,{xtype: 'tbspacer', width: 20}
		]
	})
	
	var mapPanel = new GeoExt.MapPanel(
		{
			region: "center"
			,map: map
			,zoom: 2
			,tbar: toolbar
			,bbar : {
				items: [
					{
						id : 'coordinates'
						,text : "Coordinates (ETRS LCC / EPSG:3034): "
						,width : 240
						,xtype: "tbtext"
					}
				]
			}
			,items: [
				{
					xtype: "gx_zoomslider"
					,vertical: true
					,height: 180
					,x: 10
					,y: 20
					,plugins: new GeoExt.ZoomSliderTip()
				}
				,{
					xtype: "gx_opacityslider"
					,layer: map.baseLayer
					,aggressive: true
					,vertical: true
					,height: 100
					,x: 50
					,y: 20
					,plugins: new GeoExt.LayerOpacitySliderTip({template: '<div>Opacity of background: {opacity}%</div>'})
				}
			]
		}
	);
	
	// The layer tree:
	// Create a root node (which will be made invisible)
	window.layerRoot = new Ext.tree.TreeNode(
		{
			text: "All Layers"
			,expanded: true
		}
	);
	
	// Create theme nodes
	var themeNodes = new Object();
	
	for (theme in EC_themes)
	{
	  themeNodes[theme] = (
			new Ext.tree.TreeNode(
				{
					text: EC_themes[theme].name
					,expanded: false
					,iconCls: EC_themes[theme].pictogram
					,qtip: EC_themes[theme].description
				}
			)
		);
	}
	
	// Create feature type nodes and theme nodes, make feature type nodes children of theme nodes
	for (theme in EC_themes)
	{
		for (featureType in EC_themes[theme].featureTypes)
		{
			var node = new Ext.tree.AsyncTreeNode({ 
				text: EC_themes[theme].featureTypes[featureType].friendlyName
				,featureTypes: EC_themes[theme].featureTypes[featureType].identifiers
				//,layerStore: mapPanel.layers
				,leaf: true
				,expanded: false
				,checked: false
				,iconCls: "pictogramWMSLayer"
				,qtip: "Use the check box to show this feature type on the map and to select it for downloading features"
				,listeners: {
					'checkchange': function(node, checked)
					{
						// switch visibility of all map layers with a matching feature type:
						var a = 1;
						for (var i=0;i<map.layers.length;i++) {
							if (node.attributes.featureTypes.findIndex(map.layers[i].options.featureType) != null)
							{
								map.layers[i].setVisibility(node.getUI().isChecked());
							}
						}							
					}
				}
			}			);
			themeNodes[theme].appendChild(node);
		}
	}
	
	// Add test areas to the root node
	window.layerRoot.appendChild(
		new GeoExt.tree.LayerNode(
			{
				text: "Test Areas"
				,iconCls: "pictogramZoomToTestArea"
				,layer: testAreasLayer
				,map: map
				,qtip: "Preconfigured test areas"
			}
		)
	);

	// Add base layers node to the root node
	window.layerRoot.appendChild(
		// use the BaseLayerContainer (all layers that have isBaseLayer=true)
		new GeoExt.tree.BaseLayerContainer(
			{
				text: "Background topography"
				,iconCls: "pictogramBackgroundTopography"
				,map: map
				,expanded: false
				,qtip: "The background topography is always visible in the map. Other layers will be drawn on top of this layer."
				,loader: 
				{
					baseAttrs:{iconCls: "pictogramWMSLayer"}
				}
			}
		)
	);
	
	// Add thematic layer nodes to the root node
	for (themeNode in themeNodes) {
		window.layerRoot.appendChild(themeNodes[themeNode]);
	}
	
	window.layerTree = new Ext.tree.TreePanel(
		{
			title: "Map layers"
			,region: "west"
			,width: 200
			,split: true
			,collapsible: true
			,collapseMode: "mini"
			,autoScroll: true
			,rootVisible: false
			,root: window.layerRoot
			//,enableDD: true
		}
	);
	
	// Create a ViewPort containing all previously defined elements
	new Ext.Viewport(
		{
			layout: "fit",
			hideBorders: true,
			items:
			{
				layout: "border",
				deferredRender: false,
				items: [mapPanel,window.layerTree]
			}
		}
	);
});