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
}

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
}

// Define a rectangle class:
function rectangle(latMin,lonMin,latMax,lonMax){
	this.latMin = latMin;
	this.lonMin = lonMin;
	this.latMax = latMax;
	this.lonMax = lonMax;
}

// Themes and feature types (INSPIRE, ELF and/or others):
// Note: The pictogram values refer to CSS classes (see client.css)
EC_themes = {
	AU: {
		name: "Administrative units"
		,description: "Units of administration dividing areas, separated by administrative boundaries"
		,pictogram: "pictogramAU"
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
		name: "Cadastral parcels"
		,description: "Real property areas and boundaries"
		,pictogram: "pictogramCP"
		,featureTypes: {
			CP : {
				id: "cp:CadastralParcel"
				,friendlyName: "Cadastral parcels"
			}
		}
	}
	,HY: {
		name: "Hydrography"
		,description: "Sea, lakes, rivers and other waters, and their phenomena"
		,pictogram: "pictogramHY"
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
		name: "Transport networks"
		,description: "Topographic features that are related to transport by road, rail, water, and air"
		,pictogram: "pictogramTN"
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
		name: "Geographical names"
		,pictogram: "pictogramGN"
		,description: "Places having one or more names"
		,namespace: "xmlns%28GN=urn:x-inspire:specification:gmlas:GeographicalNames:3.0%29"
		,featureTypes: {
			GN: {
				id: "gn:NamedPlace"
				,friendlyName: "Named places"
			}
		}
	}
	,POP: {
		name: "Settlements"
		,description: "Populated places"
		,pictogram: "pictogramPOP"
		,featureTypes: {
		}
	}
	,VEG: {
		name: "Vegetation and soil"
		,description: "Vegetation and soil"
		,pictogram: "pictogramVEG"
		,featureTypes: {
		}
	}
	,MISC: {
		name: "Miscellaneous"
		,description: "Things that do not belong in one og the other themes"
		,pictogram: "pictogramMISC"
		,featureTypes: {
		}
	}
}