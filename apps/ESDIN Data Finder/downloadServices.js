/*
This file contains definitions of Download Services
For each Download Service we need the following data:
- service provider 
- url
- theme
- feature type
- spatial extent (latitude, longitude ETRS89)
- name of the SRS (typically "urn:ogc:def:crs:EPSG::4258" or "EPSG:4258")
- whether the axes of the CRS have been switched (e.g. service provides (lon,lat) instead of (lat,lon))

Author(s):
Frans Knibbe, Geodan (frans.knibbe@geodan.nl)
*/

EC_DownloadServices = {
	WFS_NL_KAD_AU_AU:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(50.73,3.3,53.59,7.24)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_FI_NLSF_AU_AU:{
		provider: EC_dataProviders["FI_NLSF"]
		,url: "/fgi/esdin/NLSFAU/services"
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(59.5,19.15,70.2,31.6)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: false
	}
	,WFS_NL_KAD_CP_CP:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "CP"
		,featureType: "cp:CadastralParcel"
		,spatialExtent: new rectangle(52.2,6.9,52.3,7)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NL_KAD_GN_NP:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NL_KAD_HY_WC:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "HY"
		,featureType: "hy-p:Watercourse"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NL_KAD_HY_SW:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NL_KAD_TN_RL:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "TN"
		,featureType: "tn-ro:RoadLink"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NL_KAD_TN_RA:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "TN"
		,featureType: "tn_ro:RoadArea"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NL_KAD_TN_RWL:{
		provider: EC_dataProviders["NL_Kadaster"]
		,url: EC_urls.NL_Kadaster_wfs
		,theme: "TN"
		,featureType: "to_ro:RailwayLink"
		,spatialExtent: new rectangle(52,6.6,52.5,7)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NO_SK_GN_NP:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(50,10,75,17)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NO_SK_AU_AU:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnits"
		,spatialExtent: new rectangle(50,10,75,17)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NO_SK_AU_AB:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeBoundary"
		,spatialExtent: new rectangle(50,10,75,17)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NO_SK_HY_SW:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(50,10,75,17)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NO_SK_HY_WC:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "HY"
		,featureType: "hy-p:Watercourse"
		,spatialExtent: new rectangle(50,10,75,17)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_NO_SK_HY_LWB:{
		provider: EC_dataProviders["NO_SK"]
		,url: EC_urls.NO_SK_wfs
		,theme: "HY"
		,featureType: "hy-p:LandWaterBoundary"
		,spatialExtent: new rectangle(50,10,75,17)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_SE_NLSS_GN_NP:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(58,10,61,14)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_SE_NLSS_AU_AU:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(58,10,61,14)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_SE_NLSS_AU_AB:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeBoundary"
		,spatialExtent: new rectangle(58,10,61,14)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_SE_NLSS_HY_SW:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(58,10,61,14)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_SE_NLSS_HY_WC:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "HY"
		,featureType: "hy-p:Watercourse"
		,spatialExtent: new rectangle(58,10,61,14)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_SE_NLSS_HY_LWB:{
		provider: EC_dataProviders["SE_NLSS"]
		,url: EC_urls.SE_NLSS_wfs
		,theme: "HY"
		,featureType: "hy-p:LandWaterBoundary"
		,spatialExtent: new rectangle(58,10,61,14)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: true
	}
	,WFS_AT_BEV_GN_NP:{
		provider: EC_dataProviders["AT_BEV"]
		,url: EC_urls.AT_BEV_wfs
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(46.25,9.4,49,48)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_AT_BEV_AU_AU:{
		provider: EC_dataProviders["AT_BEV"]
		,url: EC_urls.AT_BEV_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(46.25,9.4,49,48)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_AT_BEV_AU_AB:{
		provider: EC_dataProviders["AT_BEV"]
		,url: EC_urls.AT_BEV_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeBoundary"
		,spatialExtent: new rectangle(46.25,9.4,49,48)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_AT_BEV_HY_WC:{
		provider: EC_dataProviders["AT_BEV"]
		,url: EC_urls.AT_BEV_wfs
		,theme: "HY"
		,featureType: "hy-p:Watercourse"
		,spatialExtent: new rectangle(46.25,9.4,49,48)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_AT_BEV_HY_SW:{
		provider: EC_dataProviders["AT_BEV"]
		,url: EC_urls.AT_BEV_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(46.25,9.4,49,48)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_AT_BEV_HY_SW:{
		provider: EC_dataProviders["AT_BEV"]
		,url: EC_urls.AT_BEV_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(46.25,9.4,49,48)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_AT_BEV_HY_C:{
		provider: EC_dataProviders["AT_BEV"]
		,url: EC_urls.AT_BEV_wfs
		,theme: "HY"
		,featureType: "hy-p:Crossing"
		,spatialExtent: new rectangle(46.25,9.4,49,48)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_AT_BEV_HY_L:{
		provider: EC_dataProviders["AT_BEV"]
		,url: EC_urls.AT_BEV_wfs
		,theme: "HY"
		,featureType: "hy-p:Lock"
		,spatialExtent: new rectangle(46.25,9.4,49,48)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_AT_BEV_HY_DOW:{
		provider: EC_dataProviders["AT_BEV"]
		,url: EC_urls.AT_BEV_wfs
		,theme: "HY"
		,featureType: "hy-p:DamOrWeir"
		,spatialExtent: new rectangle(46.25,9.4,49,48)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_BE_NGI_GN_NP:{
		provider: EC_dataProviders["BE_NGI"]
		,url: "/fgi/esdin/IGNBGN/transWFSgnIGNB"
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(49.4,2.5,51.5,6.5)
		,axesSwitched: false
	}
	,WFS_BE_NGI_AU_AU:{
		provider: EC_dataProviders["BE_NGI"]
		,url: EC_urls.BE_NGI_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(49.4,2.5,51.5,6.5)
		,axesSwitched: false
	}
	,WFS_BE_NGI_AU_AB:{
		provider: EC_dataProviders["BE_NGI"]
		,url: EC_urls.BE_NGI_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeBoundary"
		,spatialExtent: new rectangle(49.4,2.5,51.5,6.5)
		,axesSwitched: false
	}
	,WFS_BE_NGI_HY_WC:{
		provider: EC_dataProviders["BE_NGI"]
		,url: EC_urls.BE_NGI_wfs
		,theme: "HY"
		,featureType: "hy-p:Watercourse"
		,spatialExtent: new rectangle(49.4,2.5,51.5,6.5)
		,axesSwitched: false
	}
	,WFS_BE_NGI_HY_SW:{
		provider: EC_dataProviders["BE_NGI"]
		,url: EC_urls.BE_NGI_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(49.4,2.5,51.5,6.5)
		,axesSwitched: false
	}
	,WFS_BE_NGI_HY_SC:{
		provider: EC_dataProviders["BE_NGI"]
		,url: EC_urls.BE_NGI_wfs
		,theme: "HY"
		,featureType: "hy-p:ShorelineConstruction"
		,spatialExtent: new rectangle(49.4,2.5,51.5,6.5)
		,axesSwitched: false
	}
	,WFS_BE_NGI_HY_L:{
		provider: EC_dataProviders["BE_NGI"]
		,url: EC_urls.BE_NGI_wfs
		,theme: "HY"
		,featureType: "hy-p:Lock"
		,spatialExtent: new rectangle(49.4,2.5,51.5,6.5)
		,axesSwitched: false
	}
	,WFS_BE_NGI_HY_DOW:{
		provider: EC_dataProviders["BE_NGI"]
		,url: EC_urls.BE_NGI_wfs
		,theme: "HY"
		,featureType: "hy-p:DamOrWeir"
		,spatialExtent: new rectangle(49.4,2.5,51.5,6.5)
		,axesSwitched: false
	}
	,WFS_DK_KMS_GN_NP:{
		provider: EC_dataProviders["DK_KMS"]
		,url: EC_urls.DK_KMS_wfs
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(53,2.47,58.5,17.56)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: false
	}
	,WFS_DK_KMS_AU_AU:{
		provider: EC_dataProviders["DK_KMS"]
		,url: EC_urls.DK_KMS_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(53,2.47,58.5,17.56)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: false
	}
	,WFS_DK_KMS_TN_RL:{
		provider: EC_dataProviders["DK_KMS"]
		,url: EC_urls.DK_KMS_wfs
		,theme: "TN"
		,featureType: "tn-ro:RoadLink"
		,spatialExtent: new rectangle(53,2.47,58.5,17.56)
		,srsName: "urn:ogc:def:crs:EPSG::4258"
		,axesSwitched: false
	}
	,WFS_FI_NLSF_GN_NP:{
		provider: EC_dataProviders["FI_NLSF"]
		,url: "/fgi/esdin/NLSFGN/transWFSgn"
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(59.5,20,70.1,31.8)
		,srsName: "EPSG:4258"
		,axesSwitched: false
	}
	,WFS_FI_NLSF_AU_AU:{
		provider: EC_dataProviders["FI_NLSF"]
		,url: "/fgi/esdin/NLSFAU/services"
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(59.5,20,70.1,31.8)
		,srsName: "EPSG:4258"
		,axesSwitched: false
	}
	,WFS_FI_NLSF_AU_AB:{
		provider: EC_dataProviders["FI_NLSF"]
		,url: "/fgi/esdin/NLSFAU/services"
		,theme: "AU"
		,featureType: "au:AdministrativBoundary"
		,spatialExtent: new rectangle(59.5,20,70.1,31.8)
		,srsName: "EPSG:4258"
		,axesSwitched: false
	}
	,WFS_FI_NLSF_CP_BPU:{
		provider: EC_dataProviders["FI_NLSF"]
		,url: "/fgi/esdin/NLSFCP/transWFS"
		,theme: "CP"
		,featureType: "cp:BasicPropertyUnit"
		,spatialExtent: new rectangle(59.5,20,70.1,31.8)
		,srsName: "EPSG:4258"
		,axesSwitched: false
	}
	,WFS_FI_NLSF_CP_CP:{
		provider: EC_dataProviders["FI_NLSF"]
		,url: "/fgi/esdin/NLSFCP/transWFS"
		,theme: "CP"
		,featureType: "cp:CadastralParcel"
		,spatialExtent: new rectangle(59.5,20,70.1,31.8)
		,srsName: "EPSG:4258"
		,axesSwitched: false
	}
	,WFS_FR_IGNF_GN_NP:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_AU_AU:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_AU_AB:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeBoundary"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_HY_C:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "HY"
		,featureType: "hy-p:Crossing"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_HY_DOW:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "HY"
		,featureType: "hy-p:DamOrWeir"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_HY_DB:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "HY"
		,featureType: "hy-p:DrainageBasin"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_HY_F:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "HY"
		,featureType: "hy-p:Falls"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_HY_L:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "HY"
		,featureType: "hy-p:Lock"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_HY_SW:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_HY_HN:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "HY"
		,featureType: "hy-n:HydroNode"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_HY_W:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "HY"
		,featureType: "hy-p:Watercourse"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_HY_WL:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "HY"
		,featureType: "hy-n:WatercourseLink"
		,spatialExtent: new rectangle(50.05,1.558,50.999,3.237)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_HY_WLS:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "HY"
		,featureType: "hy-n:WatercourseLinkSequence"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_TN_ER:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "TN"
		,featureType: "tn-ro:ERoad"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_TN_RwL:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "TN"
		,featureType: "tn-ra:RailwayLine"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_TN_RwLk:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "TN"
		,featureType: "tn-ra:RailwayLink"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_TN_RwN:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "TN"
		,featureType: "tn-ra:RailwayNode"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_TN_RwSN:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "TN"
		,featureType: "tn-ra:RailwayStationNode"
		,spatialExtent: new rectangle(50.131,1.609,50.953,3.06)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_TN_RwYN:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "TN"
		,featureType: "tn-ra:RailwayYardNode"
		,spatialExtent: new rectangle(50.131,1.609,50.953,3.06)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_TN_R:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "TN"
		,featureType: "tn-ro:Road"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_TN_RL:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "TN"
		,featureType: "tn-ro:RoadLink"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_TN_RN:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "TN"
		,featureType: "tn-ro:RoadNode"
		,spatialExtent: new rectangle(40.67,-5,51.55,9.92)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_FR_IGNF_TN_CP:{
		provider: EC_dataProviders["FR_IGNF"]
		,url: EC_urls.FR_IGNF_wfs
		,theme: "CP"
		,featureType: "cp:CadastralParcel"
		,spatialExtent: new rectangle(45.452,4.244,46.304,5.178)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_HU_FOMI_GN_NP:{
		provider: EC_dataProviders["HU_FOMI"]
		,url: EC_urls.HU_FOMI_wfs
		,theme: "GN"
		,featureType: "gn:NamedPlace"
		,spatialExtent: new rectangle(47.62,16.78,47.92,17.42)
		,srsName: "EPSG:4258"
		,axesSwitched: false
	}
	,WFS_HU_FOMI_TN_RL:{
		provider: EC_dataProviders["HU_FOMI"]
		,url: EC_urls.HU_FOMI_wfs
		,theme: "TN"
		,featureType: "tn-ro:RoadLink"
		,spatialExtent: new rectangle(47.62,16.78,47.92,17.42)
		,srsName: "EPSG:4258"
		,axesSwitched: false
	}
	,WFS_HU_FOMI_HY_SW:{
		provider: EC_dataProviders["HU_FOMI"]
		,url: EC_urls.HU_FOMI_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(47.62,16.78,47.92,17.42)
		,srsName: "EPSG:4258"
		,axesSwitched: false
	}
	,WFS_HU_FOMI_HY_Wc:{
		provider: EC_dataProviders["HU_FOMI"]
		,url: EC_urls.HU_FOMI_wfs
		,theme: "HY"
		,featureType: "hy-p:Watercourse"
		,spatialExtent: new rectangle(47.627,16.78,47.92,17.42)
		,srsName: "EPSG:4258"
		,axesSwitched: false
	}
	,WFS_HU_FOMI_AU_AU:{
		provider: EC_dataProviders["HU_FOMI"]
		,url: EC_urls.HU_FOMI_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(47.53,16.75,47.98,17.52)
		,srsName: "EPSG:4258"
		,axesSwitched: false
	}
	,WFS_RO_ANCPI_AU_AU:{
		provider: EC_dataProviders["RO_ANCPI"]
		,url: EC_urls.RO_ANCPI_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeUnit"
		,spatialExtent: new rectangle(45.1933,20.2635,46.190,22.553)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_RO_ANCPI_AU_AB:{
		provider: EC_dataProviders["RO_ANCPI"]
		,url: EC_urls.RO_ANCPI_wfs
		,theme: "AU"
		,featureType: "au:AdministrativeBoundary"
		,spatialExtent: new rectangle(45.1933,20.2635,46.190,22.553)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_RO_ANCPI_AU_NR:{
		provider: EC_dataProviders["RO_ANCPI"]
		,url: EC_urls.RO_ANCPI_wfs
		,theme: "AU"
		,featureType: "au:NUTSRegion"
		,spatialExtent: new rectangle(45.1933,20.2635,46.190,22.553)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_RO_ANCPI_HY_SW:{
		provider: EC_dataProviders["RO_ANCPI"]
		,url: EC_urls.RO_ANCPI_wfs
		,theme: "HY"
		,featureType: "hy-p:StandingWater"
		,spatialExtent: new rectangle(45.1933,20.2635,46.190,22.553)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_RO_ANCPI_HY_Wc:{
		provider: EC_dataProviders["RO_ANCPI"]
		,url: EC_urls.RO_ANCPI_wfs
		,theme: "HY"
		,featureType: "hy-p:Watercourse"
		,spatialExtent: new rectangle(45.1933,20.2635,46.190,22.553)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_RO_ANCPI_HY_LWB:{
		provider: EC_dataProviders["RO_ANCPI"]
		,url: EC_urls.RO_ANCPI_wfs
		,theme: "HY"
		,featureType: "hy-p:LandWaterBoundary"
		,spatialExtent: new rectangle(45.1933,20.2635,46.190,22.553)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_RO_ANCPI_HY_DOW:{
		provider: EC_dataProviders["RO_ANCPI"]
		,url: EC_urls.RO_ANCPI_wfs
		,theme: "HY"
		,featureType: "hy-p:DamOrWeir"
		,spatialExtent: new rectangle(45.1933,20.2635,46.190,22.553)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_RO_ANCPI_HY_C:{
		provider: EC_dataProviders["RO_ANCPI"]
		,url: EC_urls.RO_ANCPI_wfs
		,theme: "HY"
		,featureType: "hy-p:Crossing"
		,spatialExtent: new rectangle(45.1933,20.2635,46.190,22.553)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_RO_ANCPI_HY_L:{
		provider: EC_dataProviders["RO_ANCPI"]
		,url: EC_urls.RO_ANCPI_wfs
		,theme: "HY"
		,featureType: "hy-p:Lock"
		,spatialExtent: new rectangle(45.1933,20.2635,46.190,22.553)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_RO_ANCPI_HY_WcL:{
		provider: EC_dataProviders["RO_ANCPI"]
		,url: EC_urls.RO_ANCPI_wfs
		,theme: "HY"
		,featureType: "hy-n:WatercourseLink"
		,spatialExtent: new rectangle(45.1933,20.2635,46.190,22.553)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
	,WFS_RO_ANCPI_HY_WcSC:{
		provider: EC_dataProviders["RO_ANCPI"]
		,url: EC_urls.RO_ANCPI_wfs
		,theme: "HY"
		,featureType: "hy-p:WatercourseSeparatedCrossing"
		,spatialExtent: new rectangle(45.1933,20.2635,46.190,22.553)
		,srsName: "EPSG:4258"
		,axesSwitched: true
	}
}