/*
This file contains definitions of Download Services
For each Download Service we need the following data:
- service provider 
- url
- theme
- feature type
- spatial extent (lat, lon ETRS89)
- whether the axes of the CRS have been switched (e.g. service provides (lon,lat) instead of (lat,lon)
*/

EC_DownloadServices = {
	WFS_NL_KAD_AU_AU:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(50.73,3.3,53.59,7.24)
		,axesSwitched: true
	}
	,WFS_FI_NLSF_AU_AU:{
		provider: EC_dataProviders["FI_NLSF"]
		,url: "/fgi/esdin/NLSFAU/services"
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(59.5,19.15,70.2,31.6)
		,axesSwitched: false
	}
	,WFS_NL_KAD_CP_CP:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "CP"
		,featureType: "cp:CadastralParcel"
		,spatialExtent: new rectangle(52.2,6.9,52.3,7)
		,axesSwitched: true
	}
	,WFS_NL_KAD_GN_NP:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,axesSwitched: true
	}
	,WFS_NL_KAD_HY_WC:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "HY"
		,featureType: "hy-p:Watercourse"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,axesSwitched: true
	}
	,WFS_NL_KAD_HY_SW:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,axesSwitched: true
	}
	,WFS_NL_KAD_TN_RL:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "TN"
		,featureType: "tn-ro:RoadLink"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,axesSwitched: true
	}
	,WFS_NL_KAD_TN_RA:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "TN"
		,featureType: "tn_ro:RoadArea"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,axesSwitched: true
	}
	,WFS_NL_KAD_TN_RWL:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "TN"
		,featureType: "to_ro:RailwayLink"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,axesSwitched: true
	}
	,WFS_NO_SK_GN_NP:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(50,10,75,17)
		,axesSwitched: true
	}
	,WFS_NO_SK_AU_AU:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnits"
		,spatialExtent: new rectangle(50,10,75,17)
		,axesSwitched: true
	}
	,WFS_NO_SK_AU_AB:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeBoundary"
		,spatialExtent: new rectangle(50,10,75,17)
		,axesSwitched: true
	}
	,WFS_NO_SK_HY_SW:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(50,10,75,17)
		,axesSwitched: true
	}
	,WFS_NO_SK_HY_WC:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "HY"
		,featureType: "hy-p:Watercourse"
		,spatialExtent: new rectangle(50,10,75,17)
		,axesSwitched: true
	}
	,WFS_NO_SK_HY_LWB:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "HY"
		,featureType: "hy-p:LandWaterBoundary"
		,spatialExtent: new rectangle(50,10,75,17)
		,axesSwitched: true
	}
	,WFS_SE_NLSS_GN_NP:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(58,10,61,14)
		,axesSwitched: true
	}
	,WFS_SE_NLSS_AU_AU:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(58,10,61,14)
		,axesSwitched: true
	}
	,WFS_SE_NLSS_AU_AB:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeBoundary"
		,spatialExtent: new rectangle(58,10,61,14)
		,axesSwitched: true
	}
	,WFS_SE_NLSS_HY_SW:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(58,10,61,14)
		,axesSwitched: true
	}
	,WFS_SE_NLSS_HY_WC:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "HY"
		,featureType: "hy-p:Watercourse"
		,spatialExtent: new rectangle(58,10,61,14)
		,axesSwitched: true
	}
	,WFS_SE_NLSS_HY_LWB:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "HY"
		,featureType: "hy-p:LandWaterBoundary"
		,spatialExtent: new rectangle(58,10,61,14)
		,axesSwitched: true
	}
}