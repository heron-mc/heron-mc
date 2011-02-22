/*
This file contains definitions of test areas
For each test area we need the following data:
- short name: used as a label in the map
- long name: used as menu item
- description: used as tool tip in the menu and as pop up text in the map
- bounds: coordinates of the area rectangle, in map units. 

Author(s):
Frans Knibbe, Geodan (frans.knibbe@geodan.nl)
*/

EC_testAreas = {
	NL_DE:{
		shortName: "Border Netherlands-Germany"
		,longName: "Middle border of The Netherlands and Germany"
		,description: "This test area shows matching administrative units and cadastral parcels. It is a very interesting test area."
		,bounds: new OpenLayers.Bounds(3776500,2807500,3810000,2857300)
	}
	,NO_SE:{
		shortName: "Border Norway-Sweden"
		,longName: "Southern border of Norway and Sweden"
		,description: "This area shows cross border continuity of hydrographic features. It is a very interesting test area."
		,bounds: new OpenLayers.Bounds(4060000,3520000,4180000,3650000)
	}
}