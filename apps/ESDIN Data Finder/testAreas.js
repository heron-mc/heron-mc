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
		,longName: "The Netherlands and Germany: Middle border"
		,description: "This test area shows matching administrative units and cadastral parcels."
		,bounds: new OpenLayers.Bounds(3750000,2807500,3810000,2857300)
	}
	,NO_SE:{
		shortName: "Border Norway-Sweden"
		,longName: "Norway and Sweden: Southern border"
		,description: "This area shows cross border continuity of hydrographic features."
		,bounds: new OpenLayers.Bounds(4060000,3520000,4180000,3650000)
	}
	,BE_NL:{
		shortName: "Border Belgium-Netherlands"
		,longName: "Belgium and The Netherlands: Middle border"
		,description: "This test area contains matching administrative units, plus hydrography in Belgium"
		,bounds: new OpenLayers.Bounds(3605000,2700000,3690000,2780000)
	}
	,NO_SE_FI:{
		shortName: "Northern Scandinavia"
		,longName: "Finland, Norway and Sweden: Northern border"
		,description: "This test area contains Administrative Units from Norway and Finland,"
		,bounds: new OpenLayers.Bounds(4550000,4330000,4800000,4990000)
	}
	,DK_DE_SE:{
		shortName: "West Baltic Sea"
		,longName: "Baltic Sea: Southwest"
		,description: "This test area contains Administrative Units from Denmark, Sweden and Germany"
		,bounds: new OpenLayers.Bounds(4000000,2950000,4400000,3330000)
	}
	,FR_BE:{
		shortName: "Border France-Belgium"
		,longName: "France and Belgium: Western border"
		,description: "This test area contains Administrative Units, Hydropgraphy and Geographical Names from France and Belgium"
		,bounds: new OpenLayers.Bounds(3450000,2640000,3530000,2750000)
	}
	,AT_HU:{
		shortName: "Border Austria-Hungary"
		,longName: "Austria and Hungary: Middle border"
		,description: "This test area contains Administrative Units, Hydrography, Geographical Names and Transport Netwokrs from Hungary"
		,bounds: new OpenLayers.Bounds(4492408,2352850,4535355,2388708)
	}
	,RO:{
		shortName: "Romania"
		,longName: "Romania: Part of border with Hungary and Serbia"
		,description: "This test area contains Administrative Units and Hydrography"
		,bounds: new OpenLayers.Bounds(4779929,2122402,4934221,2255109)
	}
	/*
	,IGNB_AU: {
		shortName: "IGNB/AU:"
		,longName: "IGNB/AU"
		,description: ""
		,bounds: new OpenLayers.Bounds(3479333,2557416,3480236,2557327)
		}
	,IGNB_HY: {
		shortName: "IGNB/HY:"
		,longName: "IGNB/HY"
		,description: ""
		,bounds: new OpenLayers.Bounds(3759241,2752681,3756748,2752693)
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
	*/
}