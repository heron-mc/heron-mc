/*
This file contains OpenLayers map layers definitions.
It is foreseen that these will be only View Services (WMSs)
*/

// Assign all layers to the EC_layers collection:
EC_layers = {
	/*
	wms_world: new OpenLayers.Layer.WMS(
		"World map" //name
		,"http://geoserver.nl/tiles/tilecache.aspx?" //url
		,{ 
			layers: "wp_wereld_topo"
			,format: "image/jpeg"
			,transparent: false
		 } // parameters for GetMap query
		,{ 
			singleTile: false
			,isBaseLayer: true
			,visibility: true
			,attribution: "Provided by Geodan"
		 } //options
	)
	,
	*/
	wms_erm_NO: new OpenLayers.Layer.WMS(
		"Euro Regional Map" //name
		,"http://wms.geonorge.no/skwms1/wms.erm" //url
		,{
			layers: "ERM"
			,format: "image/png"
			,transparent: "TRUE"
			,version: "1.1.1"
			,exceptions: "XML"
			,sld: 'http://wms.geonorge.no/sld/ERMSLD.xml'
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,isBaseLayer: true
			,attribution: "EuroRegionalMap © EuroGeographics"
		} // options
	)
	,WMS_NL_KAD_AU_AU: new OpenLayers.Layer.WMS(
		"Kadaster (NL)" //name
		,EC_urls.NL_Kadaster_wms //url
		,{
			layers: "inspire:AU.AdministrativeUnit.Order3"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "AU"
			,featureType: "au:AdministrativeUnit"
		}
	)
	,WMS_NL_KAD_CP_CP: new OpenLayers.Layer.WMS(
		"Kadaster (NL)" //name
		,EC_urls.NL_Kadaster_wms //url
		,{
			layers: "inspire:CP.CadastralParcel"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "CP"
			,featureType: "cp:CadastralParcel"
		}
	)
	,WMS_NL_KAD_HY_SW: new OpenLayers.Layer.WMS(
		"Kadaster (NL)" //name
		,EC_urls.NL_Kadaster_wms //url
		,{
			layers: "inspire:HY.StandingWater"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "HY"
			,featureType: "hy-p:StandingWater"
		}
	)
	,WMS_NL_KAD_HY_WC: new OpenLayers.Layer.WMS(
		"Kadaster (NL)" //name
		,EC_urls.NL_Kadaster_wms //url
		,{
			layers: "inspire:HY.Watercourse"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "HY"
			,featureType: "hy-p:Watercourse"
		}
	)
	,WMS_NL_KAD_GN_NP: new OpenLayers.Layer.WMS(
		"Kadaster (NL)" //name
		,EC_urls.NL_Kadaster_wms //url
		,{
			layers: "inspire:gn_geografisch_gebied"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "GN"
			,featureType: "gn:NamedPlace"
		} // options
	)
	,WMS_NL_KAD_GN_NP: new OpenLayers.Layer.WMS(
		"Kadaster (NL)" //name
		,EC_urls.NL_Kadaster_wms //url
		,{
			layers: "inspire:gn_geografisch_gebied"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "GN"
			,featureType: "gn:NamedPlace"
		} // options
	)
	,WMS_NL_KAD_CP_CP: new OpenLayers.Layer.WMS(
		"Kadaster (NL)" //name
		,EC_urls.NL_Kadaster_wms //url
		,{
			layers: "inspire:CP.CadastralParcel"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "CP"
			,featureType: "cp:CadastralParcel"
		} // options
	)
	,WMS_NL_KAD_TN_RWL: new OpenLayers.Layer.WMS(
		"Kadaster (NL)" //name
		,EC_urls.NL_Kadaster_wms //url
		,{
			layers: "inspire:TN.RailTransportNetwork.RailwayLink"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "TN"
			,featureType: "tn-ro:RailwayLink"
		} // options
	)
	,WMS_NL_KAD_TN_RA: new OpenLayers.Layer.WMS(
		"Kadaster (NL)" //name
		,EC_urls.NL_Kadaster_wms //url
		,{
			layers: "inspire:TN.RoadTransportNetwork.RoadArea"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "TN"
			,featureType: "tn-ro:RoadArea"
		} // options
	)
	,WMS_NL_KAD_TN_RL: new OpenLayers.Layer.WMS(
		"Kadaster (NL)" //name
		,EC_urls.NL_Kadaster_wms //url
		,{
			layers: "inspire:TN.RoadTransportNetwork.RoadLink"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "TN"
			,featureType: "tn-ro:RoadLink"
		} // options
	)
	,WMS_SE_NLSS_HY_SW: new OpenLayers.Layer.WMS(
		"Lantmäteriet (SE)" //name
		,EC_urls.SE_NLSS_wms //url
		,{
			layers: "HY.PhysicalWaters.Waterbodies"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "HY"
			,featureType: "hy-p:StandingWater"
		} // options
	)
	,WMS_SE_NLSS_HY_LWB: new OpenLayers.Layer.WMS(
		"Lantmäteriet (SE)" //name
		,EC_urls.SE_NLSS_wms //url
		,{
			layers: "HY.PhysicalWaters.LandWaterBoundary"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "HY"
			,featureType: "hy-p:LandWaterBoundary"
		} // options
	)
	,WMS_SE_NLSS_HY_WC: new OpenLayers.Layer.WMS(
		"Lantmäteriet (SE)" //name
		,EC_urls.SE_NLSS_wms //url
		,{
			layers: "Watercourse"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "HY"
			,featureType: "hy-p:Watercourse"
		} // options
	)
	,WMS_SE_NLSS_GN_NP: new OpenLayers.Layer.WMS(
		"Lantmäteriet (SE)" //name
		,EC_urls.SE_NLSS_wms //url
		,{
			layers: "GN.NamedPlace"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "GN"
			,featureType: "gn:NamedPlace"
		} // options
	)
	,WMS_SE_NLSS_AU_AU: new OpenLayers.Layer.WMS(
		"Lantmäteriet (SE)" //name
		,EC_urls.SE_NLSS_wms //url
		,{
			layers: "AU.AdministrativeUnits"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "AU"
			,featureType: "au:AdministrativeUnit"
		} // options
	)
	,WMS_NO_SK_ExM_GN: new OpenLayers.Layer.WMS(
		"Statens Kartverk (NO)" //name
		,"http://esdin.fgi.fi/esdin/SKv1/skwms1/wms.gn" //url
		,{
			layers: "ExM.Large.GN"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "ExM"
			,featureType: "xgn:NamedPlace"
		} // options
	)
	/*
	,WMS_AT_BEV_AU_AU: new OpenLayers.Layer.WMS(
		"BEV (AT)" //name
		,EC_urls.AT_BEV_wms //url
		,{
			layers: "esdin:AdministrativeUnit"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "AU"
			,featureType: "au:AdministrativeUnit"
		} // options
	)
	,WMS_AT_BEV_AU_AB: new OpenLayers.Layer.WMS(
		"BEV (AT)" //name
		,EC_urls.AT_BEV_wms //url
		,{
			layers: "esdin:AdministrativeBoundary"
			,format: "image/png"
			,transparent: "TRUE"
			,exceptions: "XML"
		} // parameters for GetMap query
		,{
			visibility: false
			,singleTile: true
			,themeId: "AU"
			,featureType: "au:AdministrativeBoundary"
		} // options
	)
	*/
}

