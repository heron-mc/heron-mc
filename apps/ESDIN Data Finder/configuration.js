/*
This file contains various configuration setting for the ESDIN client
*/

// The title of this web application:
EC_title = "ESDIN Data Finder";

// Frequently used URLs:
EC_urls = {
	NL_Kadaster_wms: "http://kademo.nl:80/gs2/inspire/ows"
	//,NL_Kadaster_wfs: "http://esdin.fgi.fi/esdin/Kadaster/deegree3/services"
	,NL_Kadaster_wfs: "/fgi/esdin/Kadaster/deegree3/services"
	,AU_BEV_wms: "http://esdin.fgi.fi/esdin/BEV/deegree-wms/services"
	,NO_SK_wfs: "/fgi/esdin/SK/skwms2/wms1/wfs.esdin"
	,SE_NLSS_wfs: "/fgi/esdin/NLSS/lm-se250/wfs.esdin"
	,SE_NLSS_wms: "http://esdin.fgi.fi/esdin/NLSSv/lm-wms/services"
	,AT_BEV_wms: "http://esdin.fgi.fi/esdin/BEVv/deegree-wms/services"
};

// Data providers:
EC_dataProviders = {
	NL_Kadaster: {
		shortName: "Kadaster" 
		,longName: "Kadaster (The Netherlands)"
	}
	,FI_NLSF: {
		shortName: "NLSF" 
		,longName: "National Land Survey of Finland"
	}
	,NO_SK: {
		shortName: "SK" 
		,longName: "Norwegian Mapping Authority"
	}
	,SE_NLSS: {
		shortName: "NLSS" 
		,longName: "Lantmäteriet (Sweden)"
	}
	,AT_BEV: {
		shortName: "BEV" 
		,longName: "Federal Office for Metrology and Survey(Austria)"
	}
};

// Define a rectangle class:
function rectangle(latMin,lonMin,latMax,lonMax){
	this.latMin = latMin;
	this.lonMin = lonMin;
	this.latMax = latMax;
	this.lonMax = lonMax;
}

// Themes (INSPIRE and/or others):
// To do: merge themes and feature types, there is soem redundancy now.
EC_themes = {
	AU: {
		name: "Administrative Units"
		,id: "AU"
		,featureTypes: {
			AB: {
				id: "au:AdministrativeBoundary"
				,friendlyName: "Administrative boundaries"
			}
			,AU: {
				id: "au:AdministrativeUnit"
				,friendlyName: "Administrative units"
			}
		}
	}
	,CP: {
		name: "Cadastral Parcels"
		,id: "CP"
		,featureTypes: {
			CP : {
				id: "cp:CadastralParcel"
				,friendlyName: "Cadastral parcels"
			}
		}
	}
	,HY: {
		name: "Hydrography"
		,id: "HY"
		,featureTypes: {
			WC : {
				id: "hy-p:Watercourse"
				,friendlyName: "Watercourses"
			}
			,SW : {
				id: "hy-p:StandingWater"
				,friendlyName: "Standing waters"
			}
			,LWB : {
				id: "hy-p:LandWaterBoundary"
				,friendlyName: "Land-water boundaries"
			}
		}
	}
	,TN: {
		name: "Transport Networks"
		,id: "TN"
		,featureTypes: {
			RL: {
				id: "tn-ro:RoadLink"
				,friendlyName: "Road links"
			}
			,RA: {
				id: "tn-ro:RoadArea"
				,friendlyName: "Road areas"
			}
			,RWL: {
				id: "tn-ro:RailwayLink"
				,friendlyName: "Railway links"
			}
		}
	}
	,GN: {
		name: "Geographical Names"
		,id: "GN"
		,namespace: "xmlns%28GN=urn:x-inspire:specification:gmlas:GeographicalNames:3.0%29"
		,featureTypes: {
			GN: {
				id: "gn:NamedPlace"
				,friendlyName: "Named places"
			}
		}
	}
	,ExM: {
		name: "European topography (ExM)"
		,id: "ExM"
		,featureTypes: {
			GN: {
				id: "xgn:NamedPlace"
				,friendlyName: "Geographical names"
			}
		}
	}
};

/*
var EC_featureTypes = {
	"AU_AB": {
		themeId : "AU"
		,id: "au:AdministrativeBoundary"
		,friendlyName: "Administrative boundaries"
	}
	,"AU_AU" : {
		themeId : "AU"
		,id: "au:AdministrativeUnit"
		,friendlyName: "Administrative units"
	}
	,"HY_WC" : {
		themeId : "HY"
		,id: "hy-p:Watercourse"
		,friendlyName: "Watercourses"
	}
	,"HY_SW" : {
		themeId : "HY"
		,id: "hy-p:StandingWater"
		,friendlyName: "Standing waters"
	}
	,"HY_LWB" : {
		themeId : "HY"
		,id: "hy-p:LandWaterBoundary"
		,friendlyName: "Land-water boundaries"
	}
	,"CP_CP" : {
		themeId : "CP"
		,id: "cp:CadastralParcel"
		,friendlyName: "Cadastral parcels"
	}
	,"GN_GN" : {
		themeId : "GN"
		,id: "gn:NamedPlace"
		,friendlyName: "Named places"
	}
	,"TN_RL" : {
		themeId : "TN"
		,id: "tn-ro:RoadLink"
		,friendlyName: "Road links"
	}
	,"TN_RA" : {
		themeId : "TN"
		,id: "tn-ro:RoadArea"
		,friendlyName: "Road areas"
	}
	,"TN_RWL" : {
		themeId : "TN"
		,id: "tn-ro:RailwayLink"
		,friendlyName: "Railway links"
	}
	,"ExM_GN" : {
		themeId : "ExM"
		,id: "xgn:NamedPlace"
		,friendlyName: "Geographical names"
	}
};

*/