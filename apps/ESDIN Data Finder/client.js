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
			return i;
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
	maxExtent: new OpenLayers.Bounds(2122254, 1164627, 5955457, 5021872) // extent of epsg:3034 projection (Europe)
	,projection: "EPSG:3034"
	,maxResolution: 9000
	,units: "m"
	,controls: [ // We leave out the blue OpenLayers panzoom control, we use the GeoExt zoom slider instead
		new OpenLayers.Control.Navigation()
		,new OpenLayers.Control.ArgParser()
		,new OpenLayers.Control.Attribution()
	]
});

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
	Ext.getCmp("coordinates").setText(lonLat.lon.toFixed(0) + ", " + lonLat.lat.toFixed(0));
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

var styleMap = new OpenLayers.StyleMap(
new OpenLayers.Style({
        label: "${getLabel}"
        // your other symbolizer properties here
    }, {context: {
        getLabel: function(feature) {
            if(feature.layer.map.getZoom() < 12) {
                return feature.attributes.label;
            }
        }
    }}
));

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
var selectCtrl = new OpenLayers.Control.SelectFeature(testAreasLayer);
function createPopup(feature) {
	popup = new GeoExt.Popup({
			title: "Test area description"
			,location: feature
			,width: 300
			,height: 100
			,html: "<div><p><ul>" + feature.attributes.description + "</ul></p></div>"
			/*
			,items: [{
				frame: true
				,preventBodyReset: true // prevent ExtJS disabling browser styles
			}]
			*/
			//,maximizable: true
			//,collapsible: true
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
map.addControl(selectCtrl);
selectCtrl.activate();

/* 
End Initalization for OpenLayers
*/

Ext.onReady(function() {
	Ext.QuickTips.init(); // This is needed for tool tips
	
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
		//,triggerAction: "all"
		,emptyText: "Type a geographical name..."
		//,blankText: "Type a geographical name..."
		//,listEmptyText: "No matching names found"
		//,selectOnFocus: false
		,width: 300
		,minChars: 4 //default value: 4
		//,iconCls: "pictogramFindByName"
		//,hideTrigger: true
		,loadingText: 'Searching...'
		,onSelect: function(record) {
			this.setValue(record.data.name); // put the selected name in the box
			var lat = record.data.latitude;
			var lon = record.data.longitude;
			map.setCenter(new OpenLayers.LonLat(lon,lat),10); // zoom in on the location
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
				,handler: function(b) {
					map.zoomToExtent(b.bounds);
				}
			}
		);
	}
	
	/*
	var downloadButtonHandler2 = function(button, event) {
		//var request = "https://esdin.edina.ac.uk:7111/deegree-wfs-erm/services?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=xgn:NamedPlace&OUTPUTFORMAT=text/xml;%20subtype=gml/3.2.1&MAXFEATURES=10"
		var request = "https://esdin.fgi.fi/esdin/EGM/wfs_egm_insp?service=WFS&request=GetFeature&version=1.1.0&typename=xau:AdministrativeUnit&OUTPUTFORMAT=text/xml;%20subtype=gml/3.2.1&MAXFEATURES=2"

		//window.open(request,'Download features');
		window.location = request;
	}	
	*/
	
	var downloadButtonHandler = function(button, event) {
		// Check if a download area has been defined:
		if (daLayer.features.length == 0) {
			Ext.MessageBox.alert("Information", "An area of interest has not been defined yet. Draw a rectangle on the map while pressing the 'Alt' key do define an area of interest." );
			return;
		}
		// Check if at least one feature type is selected:
		var visibleFeatureTypes = [];
		var visibleThemes = [];
		for (var i=0;i<map.layers.length;i++) {
			if (map.layers[i].visibility) {
				if (map.layers[i].options.featureType != null) {
					visibleFeatureTypes.push(map.layers[i].options.featureType);
					visibleThemes.push(map.layers[i].options.themeId);
				}
			}
		}
		if (visibleFeatureTypes.length == 0) {
			Ext.MessageBox.alert("Information", "Please select at least one feature type to download." );
			return;
		}
		var daBounds = daLayer.features[0].geometry.bounds;
		var downloadArea = new rectangle (daBounds.bottom,daBounds.left,daBounds.top,daBounds.right); // uses map coordinates 
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
				var request = EC_DownloadServices[service].url + "?service=WFS&version=1.1.0&request=GetFeature&outputformat=text/xml;%20subtype=gml/3.2.1";
				if (EC_DownloadServices[service].axesSwitched) {
					request += "&bbox=" + downloadArea.lonMin + "," + downloadArea.latMin + "," + downloadArea.lonMax + "," + downloadArea.latMax;
				}
				else {
					request += "&bbox=" + downloadArea.latMin + "," + downloadArea.lonMin + "," + downloadArea.latMax + "," + downloadArea.lonMax;
				}
				request += "&typename=" + EC_DownloadServices[service].featureType;
				request += "&filename=" + EC_DownloadServices[service].featureType.replace(":","_") + "_" + EC_DownloadServices[service].provider.shortName + ".gml";
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
			/*
			{
				text: "Download features (Shibb)"
			 ,iconCls: "pictogramDownloadFeatures"
			 ,tooltip: "Test button for Shibboleth authenticated download"
			 ,handler: downloadButtonHandler2
			}
			,
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
				text: "Test areas"
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
			,tbar: toolbar
			,bbar : {
				items: [
					{
						id : 'CRS'
						,text : "Coordinates (ETRS LCC / EPSG:3034): "
						,width : 191
						,xtype: "tbtext"
					}
					,{
						id : 'coordinates'
						,text : ""
						,width : 100
						,xtype: "tbtext"
					}
					,{
						id : 'status',
						text : "",
						//width : 800,
						xtype: "tbtext"
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
	var layerRoot = new Ext.tree.TreeNode(
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
			var node = new GeoExt.tree.LayerContainer({ // extends Ext.tree.AsyncTreeNode
				text: EC_themes[theme].featureTypes[featureType].friendlyName
				,layerStore: mapPanel.layers
				,leaf: false
				,expanded: false
				,checked: false
				,loader:
					{
						featureType: EC_themes[theme].featureTypes[featureType].id // assign the featureType to the loader
						,filter: function(record){return (record.get('layer').options.featureType == this.featureType)}
						,baseAttrs:{iconCls: "pictogramWMSLayer"}
					}
				,listeners: {
					'checkchange': function(node, checked)
					{
						// If a parent node is unchecked, uncheck all the children
						// (Each node needs to be expanded one time before the checkbox functions correctly)
						if (node.getUI().isChecked()) {
							node.expand();
							node.eachChild(function(child){
								child.ui.toggleCheck(true);
							});
						}
						if (!node.getUI().isChecked())
						{
							node.expand();
							node.eachChild(function(child) {
								child.ui.toggleCheck(false);
							});
							node.collapse();
						}
					}
				}
			});
			themeNodes[theme].appendChild(node);
		}
	}

	// Add base layers node to the root node
	layerRoot.appendChild(
		// use the BaseLayerContainer (all layers that have isBaseLayer=true)
		new GeoExt.tree.BaseLayerContainer(
			{
				text: "Background topography"
				,iconCls: "pictogram"
				,map: map
				,expanded: true
				,qtip: "The background topography is always visible in the map. Other layer will be drawn on top of this layer."
				,loader: 
				{
					baseAttrs:{iconCls: "pictogramWMSLayer"}
				}
			}
		)
	);
	
	// Add test areas to the root node
	layerRoot.appendChild(
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
	
	// Add thematic layer nodes to the root node
	for (themeNode in themeNodes) {
		layerRoot.appendChild(themeNodes[themeNode]);
	}
	
	var layerTree = new Ext.tree.TreePanel(
		{
			title: "Map layers"
			,region: "west"
			,width: 200
			,split: true
			,collapsible: true
			,collapseMode: "mini"
			,autoScroll: true
			,rootVisible: false
			,root: layerRoot
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
				items: [mapPanel,layerTree]
			}
		}
	);
});