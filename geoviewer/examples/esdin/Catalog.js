/*
 * Copyright (C) 2010  Het Kadaster
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Ext.namespace("GeoViewer.Catalog");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

// Extend the layer class to record the theme
OpenLayers.Layer.prototype.theme = null;

Ext.BLANK_IMAGE_URL = 'http://kademo.nl/lib/ext/3.1.0/resources/images/default/s.gif';

GeoViewer.Catalog.options4258 = {
	PROJECTION: 'EPSG:4258',
	UNITS: 'dd',
	//[860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	MAX_EXTENT: new OpenLayers.Bounds(-180, -90, 180, 90),
	CENTER: new OpenLayers.LonLat(6, 54),
	XY_PRECISION: 6,
	ZOOM: 5,
	MAX_FEATURES: 10
};

GeoViewer.Catalog.urls = {
	EDINA_ERM : 'https://esdin.edina.ac.uk:7111/cgi-mapserv/mapserv?map=mapfiles/esdin_erm.map&'
	,EDINA_EBM : 'https://esdin.edina.ac.uk:7111/cgi-mapserv/mapserv?map=mapfiles/esdin_ebm.map&'
	,EDINA_EGM : 'https://esdin.edina.ac.uk:7111/cgi-mapserv/mapserv?map=mapfiles/esdin_egm.map&'
	,KADASTER_WMS :  'http://gis.kademo.nl/gs2/wms?'
	,KADASTER_WFS : 'http://esdin.fgi.fi/esdin/Kadaster/deegree-wfs/services'
	,KADASTER_EGN : 'http://kadasteregn.geodan.nl/deegree-wfs/services'
	,EGN_WFS : 'http://www.eurogeonames.com:8080/gateway/gateto/VAR1-VAR1'
	,BEV_WMS : 'http://esdin.fgi.fi/esdin/BEVv/deegree-wms/services?'
	,BEV_WFS : 'http://esdin.fgi.fi/esdin/BEV/deegree-wfs/services?'
	,FOMI_WFS : 'http://esdin.fgi.fi/esdin/FOMI/esdin/esdin.exe?'
	,SK_WFS : 'http://esdin.fgi.fi/esdin/SK/skwms2/wms1/wfs.esdin'
	,IGNB_WFS : 'http://esdin.fgi.fi/esdin/IGNB/egn-wfs/services?'
	,NLSS_WFS: 'http://esdin.fgi.fi/esdin/NLSS/geoserver_esdin/wfs?'
	,GEOSERVER_TMS :  'http://geoserver.nl/tiles/tilecache.aspx?'
	,OPENGEO_WMS : 'http://maps.opengeo.org/geowebcache/service/wms'
	,NLSF_FGI_WFS_GN : 'http://esdin.fgi.fi/esdin/NLSFGN/transWFSgn?'
	,NLSF_FGI_WFS_CP : 'http://esdin.fgi.fi/esdin/NLSFCP/transWFS?'
	,KMS_WFS : 'http://esdin.fgi.fi/esdin/KMS/service?'
};

GeoViewer.Catalog.lang = {
	nl : {
		txtWarning : "Waarschuwing",
		txtLegend : "Legenda",
		txtNoLayerSelected : "Geen laag geselecteerd",
		txtSaveFeatures : "Bewaar objecten op harde schijf",
		txtGetFeatures : "Download objecten",
		txtFeatureInfo : "Objectinformatie",
		txtNoData : "Geen informatie gevonden",
		txtLayerNotAdded : "Kaartlaag nog niet toegevoegd",
		txtAttribute : "Attribuut",
		txtValue :"Waarde",
		txtMask : "Bezig met ophalen informatie...",
		txtLayers : "Lagen",
		txtNoMatch : "Gegevens laag niet gevonden",
		txtLoading : "Bezig met laden...",
		txtMapContexts : "Contexten",
		txtPlaces : "Plekken",
		txtTitleFeatureInfo : "Objectinformatie",
		txtTitleFeatureData : "Objectgegevens",
		txtLoadMask : "Bezig met opvragen gegevens...",
		txtUnknownFeatureType : "Onbekend",
		txtNoLayersWithFeatureInfo: 'De huidige kaart bevat geen lagen met objectinformatie.',
		txtPan : "Pan kaartbeeld",
		txtZoomIn : "Inzoomen door box te tekenen",
		txtZoomOut : "Uitzoomen door box te tekenen",
		txtZoomToFullExtent : "Uitzoomen naar volledige extent",
		txtZoomPrevious : "Naar vorige extent en zoom",
		txtZoomNext : "Naar volgende extent en zoom",
		txtMeasureLength: "Meet afstand (teken lijnstukken en dubbelklik bij laatste)",
		txtMeasureArea: "Meet oppervlakte (teken polygoon en dubbelklik bij laatste)",
		txtLength: "Lengte",
		txtArea: "Oppervlakte"
	}
	,en : {
		txtWarning : "Warning",
		txtLegend : "Legend",
		txtNoLayerSelected : "No layer selected",
		txtSaveFeatures : "Save features to disk",
		txtGetFeatures : "Download features",
		txtFeatureInfo : "Feature information",
		txtNoData : "No information found",
		txtLayerNotAdded : "Layer not yet added",
		txtAttribute : "Attribute",
		txtValue:"Value",
		txtMask : "Busy recieving data...",
		txtLayers : "Layers",
		txtNoMatch : "Layer data not found",
		txtLoading : "Loading...",
		txtMapContexts : "Contexts",
		txtPlaces : "Places",
		txtTitleFeatureInfo : "Feature info",
		txtTitleFeatureData : "Feature data",
		txtLoadMask : "Busy recieving data...",
		txtUnknownFeatureType : "Unknown",
		txtNoLayersWithFeatureInfo: "The current map doesn't contain layers with feature information.",
		txtPan : "Pan map",
		txtZoomIn : "Zoom in by drawing a box",
		txtZoomOut : "Zoom out by drawing a box",
		txtZoomToFullExtent : "Zoom to full extent",
		txtZoomPrevious : "Go to previous extent",
		txtZoomNext : "Go to next extent",
		txtMeasureLength: "Measure distance (draw linesegments and double click at the end)",
		txtMeasureArea: "Measure area (draw polygon and double click at the end)",
		txtLength: "Length",
		txtArea: "Area"
	}
};

GeoViewer.Catalog.layers = {
	/*
	 * ==================================
	 *            BaseLayers
	 * ==================================
	 */
	world : new OpenLayers.Layer.WMS(
		"World"
		,GeoViewer.Catalog.urls.GEOSERVER_TMS,
		{layers: "wp_wereld_topo", format: "image/jpeg", transparent: false},
		{singleTile: false,  visibility: true }
	)
	,egm: new OpenLayers.Layer.WMS(
		"Euro Global Map" 
		,GeoViewer.Catalog.urls.EDINA_EGM
		,{
			layers: "Shore"
			,format: "image/png"
			,transparent: "TRUE"
			,version: "1.1.1"
			,exceptions: "XML"
		}
		,{
			singleTile: true
			,visibility: true
			,isBaseLayer: true
		}
	)
	
			
	,erm: new OpenLayers.Layer.WMS(
		"Euro Regional Map" 
		,GeoViewer.Catalog.urls.EDINA_ERM
		,{
			layers: "EuroRegionalMap"
			,format: "image/png"
			,transparent: "TRUE"
			,version: "1.1.1"
			,exceptions: "XML"
		}
		,{
			singleTile: true
			,visibility: true
			,isBaseLayer: true
		}
	)
	,ebm: new OpenLayers.Layer.WMS(
		"Euro Boundary Map" 
		,GeoViewer.Catalog.urls.EDINA_EBM
		,{
			layers: "AdministrativeBoundarySS,AdministrativeBoundaryMS,AdministrativeBoundaryLS,AdministrativeBoundarySSTxt,AdministrativeBoundaryMSTxt,AdministrativeBoundaryLSTxt,AdministrativeBoundaryDSTxt"
			,format: "image/png"
			,transparent: "TRUE"
			,version: "1.1.1"
			,exceptions: "XML"
		}
		,{
			singleTile: true
			,visibility: true
			,isBaseLayer: true
		}
	)
	
	/*
	 * ==================================
	 *            INSPIRE theme AB
	 * ==================================
	 */	 
	 ,bevAB : new OpenLayers.Layer.WMS("Austria AB (no 4258) (wms)",
		GeoViewer.Catalog.urls.BEV_WMS,
		{layers: "esdin:AdministrativeBoundary_Line", format: "image/png", 
		transparent: true},
		{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"} 
			)
			
	/*
	 * ==================================
	 *            INSPIRE theme AD
	 * ==================================
	 */
	 ,kadasterAD_wms : new OpenLayers.Layer.WMS("the Netherlands AD (wms)",
			GeoViewer.Catalog.urls.KADASTER_WMS,
	{layers: "kad:ad_address", format: "image/png", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"} 
			)

	/*
	 * ==================================
	 *            INSPIRE theme CP
	 * ==================================
	 */
	,kadasterCP_wms : new OpenLayers.Layer.WMS("the Netherlands CP (wms)",
			GeoViewer.Catalog.urls.KADASTER_wms,
	{layers: "kad:cp_parcel", format: "image/png", transparent: true},
	{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
		,featureInfoFormat: "application/vnd.ogc.gml"} 
			)
	// THE NETHERLANDS
	,kadasterAD : new OpenLayers.Layer.Vector(
	"The Netherlands AD",
	{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,styleMap: GeoViewer.Styles.polyStyles
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.KADASTER_WFS
				,featurePrefix: "AD"
				,featureType: "Address"
				,featureNS: "urn:x-inspire:specification:gmlas:Addresses:3.0"
				,geometryName: "position/GeographicPosition/geometry"
				,maxFeatures: "50"
			}
		)
	}
	)

	,kadasterCP : new OpenLayers.Layer.Vector(
	"The Netherlands CP",
	{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,styleMap: GeoViewer.Styles.polyStyles
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.KADASTER_WFS
				,featurePrefix: "CP"
				,featureType: "CadastralParcel"
				,featureNS: "urn:x-inspire:specification:gmlas:CadastralParcels:3.0"
				,geometryName: "geometry"
				,maxFeatures: "50"
			}
		)
	}
	)
	
	//FINLAND
	,nlsf_fgiCP: new OpenLayers.Layer.Vector(
	"Finland: CP",
	{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
		,visibility: false
		,projection: new OpenLayers.Projection("EPSG:4258")
		,protocol: new OpenLayers.Protocol.WFS(
			{
				formatOptions: {xy: false} // xy=fsalse:  coordinates are switched
				,version: "1.1.0"
				,styleMap: GeoViewer.Styles.polyStyles
				,srsName: "urn:ogc:def:crs:EPSG::4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.NLSF_FGI_WFS_CP
				,featurePrefix: "CP"
				,featureType: "CadastralParcel"
				,featureNS: "urn:x-inspire:specification:gmlas:CadastralParcels:3.0"
				,geometryName: "geometry"
				,maxFeatures: "50"
			}
		)
	}
	)
	
	/*
	 * ==================================
	 *            INSPIRE theme GN
	 * ==================================
	 */
	 
	//HUNGARY
	,fomiGN : new OpenLayers.Layer.Vector(
	"Hungary: GN",
	{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		visibility: false,
		displayOutsideMaxExtent: false,
		maxExtent: new OpenLayers.Bounds(16.113350,45.737061,22.896570,48.585258),
		projection: new OpenLayers.Projection("EPSG:4326"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0"
			
			,srsName: "EPSG:4326",
			extractAttributes:true, 
			url: GeoViewer.Catalog.urls.FOMI_WFS,
			featurePrefix: "ms",
			featureType: "GN_Point",
			featureNS: "http://mapserver.gis.umn.edu/mapserver", //targetNamespace in appliation schema
			geometryName: "ms:msGeometry",
			schema: "http://esdin.fgi.fi/esdin/FOMI/cgi-bin-3/esdin.exe?service=WFS&version=1.1.0&request=DescribeFeatureType&typename=GN"
		})
	}
	)
	
	//NORWAY
	,skGN : new OpenLayers.Layer.Vector("Norway: GN",
		{
			strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
			displayOutsideMaxExtent: false,
			maxExtent: new OpenLayers.Bounds(4.432920,57.962582,31.168409,71.185509),
			visibility: false,
			projection: new OpenLayers.Projection("EPSG:4258"),
			protocol: new OpenLayers.Protocol.WFS({
				version: "1.1.0",
				outputFormat: "text/xml; subtype=gml/3.2.1",
				srsName: "EPSG:4258",
				extractAttributes:true, 
				url: GeoViewer.Catalog.urls.SK_WFS,
				featurePrefix: "gn",
				featureType: "NamedPlace",
				featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0",
				geometryName: "geometry",
				maxFeatures: "50",
				schema: "http://esdin.fgi.fi/esdin/SK/deegree2-wfs/services?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=GN:NamedPlace&namespace=xmlns=(GN=urn:x-inspire:specification:gmlas:GeographicalNames:3.0)"
			})
		}
	)
	
	//BELGIUM
	,ignbGN :  new OpenLayers.Layer.Vector(
	"Belgium: GN",
	{
		//strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})], // BBOX queries are not supported by this server
		strategies: [new OpenLayers.Strategy.Fixed],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0",
			srsName: "EPSG:4258",
			extractAttributes:true, 
			url: GeoViewer.Catalog.urls.IGNB,
			featurePrefix: "egn",
			featureType: "LocationInstance",
			featureNS: "http://www.eurogeonames.eu/egn",
			geometryName: "position",
			maxFeatures: "100",
			schema: "http://esdin.fgi.fi/esdin/IGNB/egn-wfs/services?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=egn:LocationInstance&namespace=xmlns(egn=http://www.eurogeonames.eu/egn)"
		})
	}
	)
	
	//SWEDEN
	,nlssGN : new OpenLayers.Layer.Vector(
	"Sweden: GN",
	{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		displayOutsideMaxExtent: false,
		maxExtent: new OpenLayers.Bounds(10.966100,55.336960,24.166340,69.059937),
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0",
			srsName: "EPSG:4258",
			outputFormat: "text/xml; subtype=gml/3.2.1",
			extractAttributes:true, 
			url: GeoViewer.Catalog.urls.NLSS_WFS,
			featurePrefix: "gn",
			featureType: "NamedPlace",
			featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0",
			geometryName: "geometry",
			maxFeatures: "50",
			schema: "http://esdin.fgi.fi/esdin/NLSS/lm-se250/wfs.esdin?service=WFS&REQUEST=DescribeFeatureType&typeName=gn:NamedPlace&version=1.1.0"
		})
	}
	)
	
	//FINLAND
	,nlsf_fgiGN: new OpenLayers.Layer.Vector("Finland: GN",
		{
			strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(20.548571,59.764881,31.586201,70.092308)
			,visibility: false
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS({
				formatOptions: {xy: false}, // xy=fsalse:  coordinates are switched
				version: "1.1.0",
				outputFormat: "text/xml; subtype=gml/3.2.1",
				srsName: "urn:ogc:def:crs:EPSG::4258",
				extractAttributes:true, 
				url: GeoViewer.Catalog.urls.NLSF_FGI_WFS_GN,
				featurePrefix: "gn",
				featureType: "NamedPlace",
				featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0",
				geometryName: "geometry",
				maxFeatures: "50",
				schema: "http://esdin.fgi.fi/esdin/NLSFGN/transWFSgn?service=WFS&REQUEST=DescribeFeatureType&typeName=gn:NamedPlace&version=1.1.0"
			})
		}
	)
	
	//DENMARK
	,kmsGN: new OpenLayers.Layer.Vector(
	"Denmark: GN",
		{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
			visibility: false,
			projection: new OpenLayers.Projection("EPSG:4258"),
			protocol: new OpenLayers.Protocol.WFS({
				version: "1.1.0",
				outputFormat: "text/xml; subtype=gml/3.2.1",
				srsName: "urn:ogc:def:crs:EPSG::4258",
				extractAttributes:true, 
				url: GeoViewer.Catalog.urls.KMS_WFS,
				featurePrefix: "gn",
				featureType: "NamedPlace",
				featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0",
				geometryName: "geometry",
				maxFeatures: "50",
				schema: "http://esdin.fgi.fi/esdin/KMS/service?service=WFS&REQUEST=DescribeFeatureType&typeName=gn:NamedPlace&version=1.1.0"
			})
		}
	)
	/*--------------------------------------
	 *                 EGN
	 *--------------------------------------*/
	,egn : new OpenLayers.Layer.Vector(
	"EuroGeoNames",
	{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
		,visibility: false
		,styleMap: GeoViewer.Styles.pointStyles
		,projection: new OpenLayers.Projection("EPSG:4258")
		,protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.EGN_WFS
				,featurePrefix: "egn"
				,featureType: "LocationInstanceName"
				,featureNS: "http://www.eurogeonames.eu/egn"
				,maxFeatures: "3"
				,geometryName: "egn:locationInstance/egn:LocationInstance/egn:position"
			}
		)
	}
	)
	
	,egnNL : new OpenLayers.Layer.Vector(
	"EuroGeoNames (NL)",
	{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
		,visibility: false
		,styleMap: GeoViewer.Styles.pointStyles
		,projection: new OpenLayers.Projection("EPSG:4258")
		,protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.KADASTER_EGN
				,featurePrefix: "egn"
				,featureType: "LocationInstanceName"
				,featureNS: "http://www.eurogeonames.eu/egn"
				,maxFeatures: "10"
				,geometryName: "egn:locationInstance/egn:LocationInstance/egn:position"
				
			}
		)
	}
	)
	
	
	/*
	 * ==================================
	 *            INSPIRE theme HY
	 * ==================================
	 */	 		
			
	,bevHY : new OpenLayers.Layer.Vector(
		"Austria: HY",
		{
			strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
			visibility: false,
			projection: new OpenLayers.Projection("EPSG:4258"),
			protocol: new OpenLayers.Protocol.WFS({
				version: "1.1.0",
				srsName: "EPSG:4258",
				extractAttributes:true, 
				url: GeoViewer.Catalog.urls.BEV_WFS,
				featurePrefix: "egn",
				featureType: "LocationInstanceName",
				featureNS: "http://www.eurogeonames.eu/egn",
				geometryName: "egn:locationInstance/egn:LocationInstance/egn:position",
				maxFeatures: "100",
				schema: "http://esdin.fgi.fi/esdin/BEV/deegree-wfs/services?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=app:Watercourse_Line&namespace=xmlns(egn=http://www.eurogeonames.eu/egn)"
			})
		}
	)
	
};


/**
 * Define themes
 *
 * Each theme contains FeatureTypes
 * FeatureTypes (with a geometry) contain (OpenLayers) Layers
 *
 * More aspects can be configured later.
 */
GeoViewer.Catalog.themes = {
	AD: {
		name: 'Addresses'
		,featureTypes: {
			Address: {
				name: 'Address',
				fields: new Array('text','language','nameStatus','nativeness'),

				// Add layers realizing this feature type: a Layer object can be fetched
				// as GeoViewer.Catalog.layers['name']
				layers : ['kadasterAD']
			}
			,AddressAreaName: null
			,AdminUnitName: null
			,PostalDescriptor: null
			,ThoroughfareName: null
		}
	}
	,AU: {
		name: 'Adminstrative Units'
		,featureTypes: {
			AdministrativeBoundary: null
			,AdministrativeUnit: null
			,Condominium: null
		}
	}
	,CP: {
		name: 'Cadastral Parcels'
		,featureTypes: {
			CadastralParcel: {
				name: 'CadastralParcel',
					fields: new Array('text','language','nameStatus','nativeness'),

					// Add layers realizing this feature type: a Layer object can be fetched
					// as GeoViewer.Catalog.layers['name']
					layers : ['nlsf_fgiCP','kadasterCP']				
			}
			,CadastralBoundary: null
		}
	}

	,HY: {
		name: 'Hydrography'
		,featureTypes: {
			SurfaceWater: null
			,StandingWater: null
		}
	}
	,PS: {
		name: 'Protected Sites'
		,featureTypes: {
			ProtectesSite: null
		}
	}
	,TN: {
		name: 'Transport Networks'
		,featureTypes: {
			RailwayTransport: null
			,RoadTransport: null
			,AirTransport: null
			,WaterTransport: null
		}
	}
	,ExM: {
		name: 'European topography'
		,featureTypes: {
			AdministrativeUnit: null
			,NamedPlace: null
			,DamOrWeir: null
			,GlacierSnowfield: null
			,LandWaterBoundary: null
		}
	}
	,GN: {
		name: 'Geographical Names'
		,featureTypes: {
			NamedPlace: {
				name: 'NamedPlace',
				fields: new Array('text','language','nameStatus','nativeness'),

				// Add layers realizing this feature type: a Layer object can be fetched
				// as GeoViewer.Catalog.layers['name']
				layers : ['skGN','nlssGN','kmsGN','nlsf_fgiGN','fomiGN']
			}
		}
	}
};
