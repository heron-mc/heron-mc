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

Ext.BLANK_IMAGE_URL = 'http://kademo.nl/lib/ext/3.1.0/resources/images/default/s.gif';

var MY_LOCATIONS = {
	TILBURG: new OpenLayers.LonLat(5.0850, 51.5639),
	LIMBURG: new OpenLayers.LonLat(5.891, 50.775),
	AMERSFOORT: new OpenLayers.LonLat(5.2861, 52.1613)
};

GeoViewer.Catalog.optionsRD = {
	PROJECTION: 'EPSG:28992',
	UNITS: 'm',
	RESOLUTIONS: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	MAX_EXTENT: new OpenLayers.Bounds(-65200.96, 242799.04, 375200.96, 683200.96),
	CENTER: new OpenLayers.LonLat(155000, 463000),
	XY_PRECISION: 3,
	ZOOM: 2,
	MAX_FEATURES: 10,
	MAX_EXTENT_KLIC1: new OpenLayers.Bounds(253865,574237,253960,574727)
};

GeoViewer.Catalog.options4258 = {
	PROJECTION: 'EPSG:4258',
	UNITS: 'dd',
	//[860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	MAX_EXTENT: new OpenLayers.Bounds(-180, -90, 180, 90),
	// CENTER: new OpenLayers.LonLat(5.387, 52.155),
	CENTER: MY_LOCATIONS.AMERSFOORT,
	XY_PRECISION: 6,
	ZOOM: 5,
	MAX_FEATURES: 10
};


GeoViewer.Catalog.urls = {	
	KADASTER_WMS :  'http://gis.kademo.nl/gs2/wms?'
	,KADASTER_WFS : 'http://esdin.geodan.nl/fgi/Kadaster/deegree-wfs/services'
	,KADASTER_EGN : 'http://kadasteregn.geodan.nl/deegree-wfs/services'
	,EGN_WFS : 'http://www.eurogeonames.com:8080/gateway/gateto/VAR1-VAR1'
	,BEV_WMS : 'http://esdin.geodan.nl/fgi/BEVv/deegree-wms/services?'
	,BEV_WFS : 'http://esdin.geodan.nl/fgi/BEV/deegree-wfs/services?'
	,FOMI_WFS : 'http://esdin.geodan.nl/fgi/FOMI/esdin/esdin.exe?'
	,SK_WFS : 'http://esdin.geodan.nl/fgi/SK/skwms2/wms1/wfs.esdin'
	,IGNB_WFS : 'http://esdin.geodan.nl/fgi/IGNB/egn-wfs/services?'
	,NLSS_WFS: 'http://esdin.geodan.nl/fgi/NLSS/geoserver_esdin/wfs?'
	,GEOSERVER_TMS :  'http://geoserver.nl/tiles/tilecache.aspx?'
	,OPENGEO_WMS : 'http://maps.opengeo.org/geowebcache/service/wms'
	,NLSF_FGI_WFS_GN : 'http://esdin.geodan.nl/fgi/NLSFGN/transWFSgn?'
	,NLSF_FGI_WFS_CP : 'http://esdin.geodan.nl/fgi/NLSFCP/transWFS?'
	,KMS_WFS : 'http://esdin.geodan.nl/fgi/KMS/service?'
};

GeoViewer.Catalog.lang = {
	nl : {
		txtWarning : "Waarschuwing",
		txtLegend : "Legenda",
		txtSearch : "Zoeken", 
		txtNoLayerSelected : "Geen laag geselecteerd",
		txtFeatureInfo : "Objectinformatie",
		txtNoData : "Geen informatie gevonden",
		txtLayerNotAdded : "Kaartlaag nog niet toegevoegd",
		txtAttribute : "Attribuut",
		txtValue		:"Waarde",
		txtMask : "Bezig met ophalen informatie...",
		txtLayers : "Lagen",
		txtNoMatch : "Gegevens laag niet gevonden",
		txtLoading : "Bezig met laden...",
		txtMapContexts : "Contexten",
		txtPlaces : "Plekken",

		txtTitleFeatureInfo	 : "Objectinformatie",
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
		txtSearch : "Search", 
		txtNoLayerSelected : "No layer selected",
		txtFeatureInfo : "Feature information",
		txtNoData : "No information found",
		txtLayerNotAdded : "Layer not yet added",
		txtAttribute : "Attribute",
		txtValue		:"Value",
		txtMask : "Busy recieving data...",
		txtLayers : "Layers",
		txtNoMatch : "Layer data not found",
		txtLoading : "Loading...",
		txtMapContexts : "Contexts",
		txtPlaces : "Places",

		txtTitleFeatureInfo	 : "Feature info",
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
	blanco : new OpenLayers.Layer.Image(
			"Blank",
			Ext.BLANK_IMAGE_URL,
			GeoViewer.Catalog.options4258.MAX_EXTENT,
			new OpenLayers.Size(10, 10),
				{resolutions: GeoViewer.Catalog.options4258.RESOLUTIONS, isBaseLayer: true, displayInLayerSwitcher: true}
			)

	,world : new OpenLayers.Layer.WMS("World", 
			GeoViewer.Catalog.urls.GEOSERVER_TMS,
			
			{layers: "wp_wereld_topo", format: "image/jpeg", transparent: false},
			{singleTile: false,  visibility: false }
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
	,kadasterCP : new OpenLayers.Layer.Vector(
	"The Netherlands: CP",
	{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})],
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
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,styleMap: GeoViewer.Styles.polyStyles
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.NLSF_FGI_CP
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
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})],
		visibility: true,
		styleMap: GeoViewer.Styles.pointStyles,
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
	,skGN : new OpenLayers.Layer.Vector("Norway GN",
		{
		//maxExtent: new OpenLayers.Bounds(5,58,10,62),
		//displayOutsideMaxExtent: false,
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})],
			visibility: true,
			styleMap: GeoViewer.Styles.pointStyles,
			
			projection: new OpenLayers.Projection("EPSG:4258"),
			protocol: new OpenLayers.Protocol.WFS({
				formatOptions: {xy: false}, //Set to false for latitude longitude order
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
				schema: "http://esdin.geodan.nl/fgi/SK/deegree2-wfs/services?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=GN:NamedPlace&namespace=xmlns=(GN=urn:x-inspire:specification:gmlas:GeographicalNames:3.0)"
			})
		}
	)
	
	//BELGIUM
	,ignbGN :  new OpenLayers.Layer.Vector(
	"Belgium GN",
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
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:30800"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0",
			srsName: "EPSG:30800",
			extractAttributes:true, 
			url: GeoViewer.Catalog.urls.NLSS_WFS,
			featurePrefix: "esdin",
			featureType: "NamedPlace",
			featureNS: "http://www.metainfo.se/esdin",
			geometryName: "SHAPE",
			schema: "http://esdin.geodan.nl/fgi/NLSS/geoserver_esdin/wfs?&request=DescribeFeatureType&version=1.1.0&typeName=esdin:geographicalNames"
		})
	}
	)
	
	//FINLAND
	,nlsf_fgiGN: new OpenLayers.Layer.Vector("Finland: GN",
		{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})],
			visibility: true,
			projection: new OpenLayers.Projection("EPSG:4258"),
			protocol: new OpenLayers.Protocol.WFS({
				version: "1.1.0",
				outputFormat: "text/xml; subtype=gml/3.2.1",
				srsName: "EPSG:4258",
				extractAttributes:true, 
				url: GeoViewer.Catalog.urls.NLSF_FGI_WFS_GN,
				featurePrefix: "gn",
				featureType: "NamedPlace",
				featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0",
				geometryName: "geometry",
				maxFeatures: "50",
				schema: "http://esdin.geodan.nl/fgi/NLSFGN/transWFSgn?service=WFS&REQUEST=DescribeFeatureType&typeName=gn:NamedPlace&version=1.1.0"
			})
		}
	)
	
	//DENMARK
	,kmsGN: new OpenLayers.Layer.Vector(
	"Denmark: GN",
		{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})],
			visibility: true,
			projection: new OpenLayers.Projection("EPSG:4258"),
			protocol: new OpenLayers.Protocol.WFS({
				version: "1.1.0",
				outputFormat: "text/xml; subtype=gml/3.2.1",
				srsName: "EPSG:4258",
				extractAttributes:true, 
				url: GeoViewer.Catalog.urls.KMS_WFS,
				featurePrefix: "gn",
				featureType: "NamedPlace",
				featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0",
				geometryName: "geometry",
				maxFeatures: "50",
				schema: "http://esdin.geodan.nl/fgi/KMS/service?service=WFS&REQUEST=DescribeFeatureType&typeName=gn:NamedPlace&version=1.1.0"
			})
		}
	)
	/*--------------------------------------
	 *                 EGN
	 *--------------------------------------*/
	,egn : new OpenLayers.Layer.Vector(
	"EuroGeoNames",
	{
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})]
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
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})]
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
			strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1})],
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
