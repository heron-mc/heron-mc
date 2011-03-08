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
		,description: "This test area shows matching administrative units and cadastral parcels."
		,bounds: new OpenLayers.Bounds(3776500,2807500,3810000,2857300)
	}
	,NO_SE:{
		shortName: "Border Norway-Sweden"
		,longName: "Southern border of Norway and Sweden"
		,description: "This area shows cross border continuity of hydrographic features."
		,bounds: new OpenLayers.Bounds(4060000,3520000,4180000,3650000)
	}
	,IGNB_AU: {
		shortName: "IGNB/AU:"
		,longName: "IGNB/AU"
		,description: ""
		,bounds: new OpenLayers.Bounds(3479333.8554922,2557416.66641451,3480236.81767229,2557327.40182586)
		}
	,IGNB_HY: {
		shortName: "IGNB/HY:"
		,longName: "IGNB/HY"
		,description: ""
		,bounds: new OpenLayers.Bounds(3759241.52805383,2752681.73481718,3756748.37226183,2752693.29064182)
	}
	,KMS: {
		shortName: "KMS"
		,longName: "KMS"
		,description: ""
		,bounds: new OpenLayers.Bounds(3513036.59392703,2933916.8664611,4429116.90504833,3520507.6479167)
	}
	,NLSF_GN: {
		shortName: "NLSF/GN: "
		,longName: "NLSF/GN"
		,description: ""
		,bounds: new OpenLayers.Bounds(4506720.19415607,3652534.57042606,4837956.21060977,4916885.71814814)
	}
	,NLSF_AU: {
		shortName: "NLSF/AU:"
		,longName: "NLSF/AU"
		,description: ""
		,bounds: new OpenLayers.Bounds(4499965.71504488,3635183.41530575,4839269.90470165,4916635.89279678)
	}
	,NLSF_HY: {
		shortName: "NLSF/HY:"
		,longName: "NLSF/HY"
		,description: ""
		,bounds: new OpenLayers.Bounds(4439833.6030561,3667573.62346813,4848602.84122309,4944278.73551987)
	}
	,NLSF_CP: {
		shortName: "NLSF/CP:"
		,longName: "NLSF/CP"
		,description: ""
		,bounds: new OpenLayers.Bounds(4506720.19415607,3652534.57042606,4837956.21060977,4916885.71814814)
	}
	,IGNF_GN_HY_TN: {
		shortName: "IGNF/GN,HY,TN:"
		,longName: "IGNF/GN,HY,TN"
		,description: ""
		,bounds: new OpenLayers.Bounds(3413335.31405078,2617805.95136335,3541374.92813995,2724387.05850205)
	}
	,IGNF_AU: {
		shortName: "IGNF/AU:"
		,longName: "IGNF/AU"
		,description: ""
		,bounds: new OpenLayers.Bounds(3380239.08651201,2479983.71645983,3621582.17202119,2717646.94938943)
	}
	,IGNF_CP: {
		shortName: "IGNF/CP:"
		,longName: "IGNF/CP"
		,description: ""
		,bounds: new OpenLayers.Bounds(3562881.23869999,2112883.31495731,3640887.66281843,2200375.99072869)
	}
	,FOMI_GN: {
		shortName: "FÖMI/GN:"
		,longName: "FÖMI/GN"
		,description: ""
		,bounds: new OpenLayers.Bounds(4492408.21364889,2352850.00247535,4535355.34943937,2388708.76395988)
	}
	,FOMI_AU: {
		shortName: "FÖMI/AU:"
		,longName: "FÖMI/AU"
		,description: ""
		,bounds: new OpenLayers.Bounds(4490822.50744019,2342462.56394953,4541422.51947886,2396134.69578433)
	}
	,FOMI_HY: {
		shortName: "FÖMI/HY:"
		,longName: "FÖMI/HY"
		,description: ""
		,bounds: new OpenLayers.Bounds(4492407.8287938,2352632.43191404,4535518.31140663,2389008.71534788)
	}
	,FOMI_TN: {
		shortName: "FÖMI/TN:"
		,longName: "FÖMI/TN"
		,description: ""
		,bounds: new OpenLayers.Bounds(4492493.75936767,2352663.39982925,4535510.8568008,2389016.11252799)
	}
	,KADASTER_GN: {
		shortName: "Kadaster/GN:"
		,longName: "Kadaster/GN"
		,description: ""
		,bounds: new OpenLayers.Bounds(3776623.25992571,2808502.91610031,3808152.62600581,2855379.07264128)
	}
	,KADASTER_AU: {
		shortName: "Kadaster/AU:"
		,longName: "Kadaster/AU"
		,description: ""
		,bounds: new OpenLayers.Bounds(3528426.0750477,2687868.78592162,3823207.68620862,2991700.38737653)
	}
	,KADASTER_HY: {
		shortName: "Kadaster/HY:"
		,longName: "Kadaster/HY"
		,description: ""
		,bounds: new OpenLayers.Bounds(3776564.49938924,2808753.45945145,3807071.27672883,2855843.07375076)
	}
	,KADASTER_TN: {
		shortName: "Kadaster/TN:"
		,longName: "Kadaster/TN"
		,description: ""
		,bounds: new OpenLayers.Bounds(3775897.0275095,2807881.61601945,3808421.24511651,2856057.816703)
	}
	,KADASTER_CP: {
		shortName: "Kadaster/CP:"
		,longName: "Kadaster/CP"
		,description: ""
		,bounds: new OpenLayers.Bounds(3796376.06281281,2826180.08205896,3806714.82181717,2836381.77531717)
	}
	,SK: {
		shortName: "SK"
		,longName: "SK"
		,description: ""
		,bounds: new OpenLayers.Bounds(3646150.21889404,3353124.81589105,4788074.07234291,5133109.68101451)
	}
	,SK_HY: {
		shortName: "SK/HY(LS):"
		,longName: "SK/HY(LS)"
		,description: ""
		,bounds: new OpenLayers.Bounds(4027671.2326377,3528564.7587656,4108740.25613707,3644200.84366539)
	}
	,ANCPI_AU: {
		shortName: "ANCPI/AU:"
		,longName: "ANCPI/AU"
		,description: ""
		,bounds: new OpenLayers.Bounds(4779929.32207341,2122402.8841247,4934221.58392407,2255109.26680253)
	}
	,ANCPI_HY: {
		shortName: "ANCPI/HY:"
		,longName: "ANCPI/HY"
		,description: ""
		,bounds: new OpenLayers.Bounds(4779929.32207341,2122402.8841247,4934221.58392407,2255109.26680253)
	}
	,NLSS: {
		shortName: "NLSS"
		,longName: "NLSS"
		,description: ""
		,bounds: new OpenLayers.Bounds(4033527.04260928,3517192.34013943,4179780.9930289,3670673.96510956)
	}
	,NLSS_SL1: {
		shortName: "NLSS (LS 1):"
		,longName: "NLSS (LS 1)"
		,description: ""
		,bounds: new OpenLayers.Bounds(4117234.57660633,3643376.15084872,4135373.31219307,3664747.37809487)
	}
	,NLSS_SL2: {
		shortName: "NLSS (LS 2):"
		,longName: "NLSS (LS 2)"
		,description: ""
		,bounds: new OpenLayers.Bounds(4061658.67055701,3642151.34189182,4135373.31219307,3664747.37809487)
	}
}