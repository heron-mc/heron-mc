/*
This file contains various configuration setting for the ESDIN client

Author(s):
Frans Knibbe, Geodan (frans.knibbe@geodan.nl)
*/

// The title of this web application:
EC_title = document.title; // we use the page title (set in index.html)

// Frequently used URLs:
EC_urls = {
	NL_Kadaster_wms: "http://kademo.nl:80/gs2/inspire/ows"
	,NL_Kadaster_wfs: "/fgi/esdin/Kadaster/deegree3/services"
	,AU_BEV_wms: "http://esdin.fgi.fi/esdin/BEV/deegree-wms/services"
	,NO_SK_wfs: "/fgi/esdin/SK/skwms2/wms1/wfs.esdin"
	,NO_SK_wms_GN: "http://esdin.fgi.fi/esdin/SKv1/skwms1/wms.gn"
	,NO_SK_wms_HY: "http://esdin.fgi.fi/esdin/SKv2/skwms1/wms.hy_physical"
	,SE_NLSS_wfs: "/fgi/esdin/NLSS/lm-se250/wfs.esdin"
	//,SE_NLSS_wms: "http://esdin.fgi.fi/esdin/NLSSv/lm-wms/services"
	,SE_NLSS_wms: "http://www.metainfo.se/lm-wms/services"
	,AT_BEV_wms: "http://esdin.fgi.fi/esdin/BEVv/deegree-wms/services"
	,AT_BEV_wfs: "/fgi/esdin/BEV/deegree-wfs/services"
	,BE_NGI_wfs: "/fgi/esdin/IGNB/deegree3_IGNB/services"
	,DK_KMS_wfs: "/fgi/esdin/KMS/service"
	,FR_IGNF_wfs: "/fgi/esdin/IGNF/esdin/proxy"
	,HU_FOMI_wfs: "/fgi/FOMI/FOMI"
	,RO_ANCPI: "/fgi/esdin/ANCPI/services"
	,DE_BKG_ERM: "/fgi/esdin/ERM/wfs_erm_insp"
	,DE_BKG_EBM: "/fgi/esdin/ERM/wfs_ebm_insp"
	,DE_BKG_EGM: "/fgi/esdin/ERM/wfs_egm_insp"
}

// Data providers:
EC_dataProviders = {
	NL_Kadaster: {
		shortName: "Kadaster (NL)"  
		,longName: "Kadaster (The Netherlands)"
		,abbreviation: "NL_Kadaster"
	}
	,NO_SK: {
		shortName: "SK (NO)" 
		,longName: "Norwegian Mapping Authority"
		,abbreviation: "NO_SK"
	}
	,SE_NLSS: {
		shortName: "NLSS (SE)" 
		,longName: "Lantmäteriet (Sweden)"
		,abbreviation: "SE_NLSS"
	}
	,AT_BEV: {
		shortName: "BEV (AT)" 
		,longName: "Federal Office for Metrology and Survey(Austria)"
		,abbreviation: "AT_BEV"
	}
	,BE_NGI: {
		shortName: "NGI (BE)" 
		,longName: "National Geographical Institute(Belgium)"
		,abbreviation: "BE_NGI"
	}
	,DK_KMS: {
		shortName: "KMS (DK)" 
		,longName: "National Survey and Cadastre(Denmark)"
		,abbreviation: "DK_KMS"
	}
	,FI_NLSF: {
		shortName: "NLSF (FI)" 
		,longName: "National Land Survey of Finland"
		,abbreviation: "FI_NLSF"
	}
	,FR_IGNF: {
		shortName: "IGN (FR)" 
		,longName: "National Geographical Institute(France)"
		,abbreviation: "FR_IGN"
	}
	,HU_FOMI: {
		shortName: "FÖMI (HU)" 
		,longName: "Institute of Geodesy, Cartography and Remote Sensing (Hungary)"
		,abbreviation: "HU_FOMI"
	}
	,RO_ANCPI: {
		shortName: "ANCPI (RO)" 
		,longName: "National Agency for Cadastre and Land Registration (Romania)"
		,abbreviation: "RO_ANCPI"
	}
	,DE_BKG: {
		shortName: "BKG (DE)" 
		,longName: "Federal Agency for Cartography an Geodesy (Germany)"
		,abbreviation: "DE_BKG"
	}
}

// Define a rectangle class:
function rectangle(xMin,yMin,xMax,yMax){
	this.xMin = xMin;
	this.yMin = yMin;
	this.xMax = xMax;
	this.yMax = yMax;
}

// Themes and feature types (INSPIRE, ELF and/or others):
// Note: The pictogram values refer to CSS classes (see client.css)
// Possible feature type specifications: INSPIRE, ExM
EC_themes = {
	GN: {
		name: "Geographical names"
		,pictogram: "pictogramGN"
		,description: "INSPIRE theme: Places having one or more names"
		,namespace: "xmlns%28GN=urn:x-inspire:specification:gmlas:GeographicalNames:3.0%29"
		,featureTypes: {
			GN: {
				id: "gn:NamedPlace"
				,friendlyName: "Named places"
			}
		}
	}
	,HY: {
		name: "Hydrography"
		,description: "INSPIRE theme: Sea, lakes, rivers and other waters, and their phenomena"
		,pictogram: "pictogramHY"
		,featureTypes: {
			WC: {
				id: "hy-p:Watercourse"
				,friendlyName: "Watercourses"
				,specifications: ["INSPIRE","ExM"]
			}
			,SW: {
				id: "hy-p:StandingWater"
				,friendlyName: "Standing waters"
				,specifications: ["INSPIRE","ExM"]
			}
			,LWB: {
				id: "hy-p:LandWaterBoundary"
				,friendlyName: "Land-water boundaries"
				,specifications: ["INSPIRE","ExM"]
			}
			,DOW: {
				id: "hy-p:DamOrWeir"
				,friendlyName: "Dams or weirs"
				,specifications: ["INSPIRE","ExM"]
			}
			,Cr: {
				id: "hy-p:Crossing"
				,friendlyName: "Crossings"
				,specifications: ["INSPIRE","ExM"]
			}
			,Lo: {
				id: "hy-p:Lock"
				,friendlyName: "Locks"
				,specifications: ["INSPIRE","ExM"]
			}
			,SC: {
				id: "hy-p:ShorelineConstruction"
				,friendlyName: "Shoreline constructions"
				,specifications: ["INSPIRE","ExM"]
			}
		}
	}
	,AU: {
		name: "Administrative units"
		,description: "INSPIRE theme: Units of administration dividing areas, separated by administrative boundaries"
		,pictogram: "pictogramAU"
		,featureTypes: {
			AB: {
				id: "au:AdministrativeBoundary"
				,friendlyName: "Administrative boundaries"
				,specifications: ["INSPIRE","ExM"]
			}
			,AU: {
				id: "au:AdministrativeUnit"
				,friendlyName: "Administrative units"
				,specifications: ["INSPIRE","ExM"]
			}
			,NR: {
				id: "au:NUTSRegion"
				,friendlyName: "NUTS regions"
				,specifications: ["INSPIRE","ExM"]
			}
		}
	}
	,CP: {
		name: "Cadastral parcels"
		,description: "INSPIRE theme: Real property areas and boundaries"
		,pictogram: "pictogramCP"
		,featureTypes: {
			CP : {
				id: "cp:CadastralParcel"
				,friendlyName: "Cadastral parcels"
			}
		}
	}
	,TN: {
		name: "Transport networks"
		,description: "INSPIRE theme: Topographic features that are related to transport by road, rail, water, and air"
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
	,POP: {
		name: "Settlements"
		,description: "ExM theme: Populated places"
		,pictogram: "pictogramPOP"
		,featureTypes: {
			BA: {
				id: "xpop:BuiltupArea"
				,friendlyName: "Built-up areas"
				,specifications: ["ExM"]
			}
			,Ca: {
				id: "xpop:PopulatedPlace"
				,friendlyName: "Populated places"
				,specifications: ["ExM"]
			}
		}
	}
	,VEG: {
		name: "Vegetation and soil"
		,description: "ExM theme: Vegetation and soil"
		,pictogram: "pictogramVEG"
		,featureTypes: {
			AA: {
				id: "xveg:AgriculturalArea"
				,friendlyName: "Agricultural Areas"
				,specifications: ["ExM"]
			}
			,Pl: {
				id: "xveg:Plantation"
				,friendlyName: "Plantations"
				,specifications: ["ExM"]
			}
			,SSR: {
				id: "xmisc:SoilSurfaceRegion"
				,friendlyName: "Soil surface regions"
				,specifications: ["ExM"]
			}
			,WF: {
				id: "xmisc:WoodForest"
				,friendlyName: "Wood forests"
				,specifications: ["ExM"]
			}
		}
	}
	,MISC: {
		name: "Miscellaneous"
		,description: "ExM theme: Things that do not belong in one of the other themes"
		,pictogram: "pictogramMISC"
		,featureTypes: {
			AP: {
				id: "xmisc:AmusementPark"
				,friendlyName: "Amusement parks"
				,specifications: ["ExM"]
			}
			,Ca: {
				id: "xmisc:Cave"
				,friendlyName: "Caves"
				,specifications: ["ExM"]
			}
			,MM: {
				id: "xmisc:MemorialMonument"
				,friendlyName: "Memorial monuments"
				,specifications: ["ExM"]
			}
			,St: {
				id: "xmisc:Stadium"
				,friendlyName: "Stadiums"
				,specifications: ["ExM"]
			}
		}
	}
}