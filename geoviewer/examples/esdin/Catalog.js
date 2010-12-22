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
 
/*
About Catalog.js: The purpose of this file is to configure basic values
that are used throughout the web client.

Items configured in this file are:
+ Map properties like extent and projection.
+ URLs of data sources.
+ Map layers.
+ Text strings for communication with the user, in multiple languages.

For specific purposes (example applications), other items can be configured
too, using the GeoViewer.Catalog namespace.
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
	EDINA_ERM : 'https://esdin.edina.ac.uk:7111/geowebcache/service/wms'
	,EDINA_EBM : 'https://esdin.edina.ac.uk:7111/geowebcache/service/wms'
	,EDINA_EGM : 'https://esdin.edina.ac.uk:7111/geowebcache/service/wms'
	,KADASTER_WMS :  'http://gis.kademo.nl/gs2/wms?'
	,KADASTER_WFS : 'http://esdin.fgi.fi/esdin/Kadaster/deegree3/services'
	,KADASTER_EGN : 'http://kadasteregn.geodan.nl/deegree-wfs/services'
	,EGN_WFS : 'http://www.eurogeonames.com:8080/gateway/gateto/VAR1-VAR1'
	,BEV_WMS : 'http://esdin.fgi.fi/esdin/BEVv/deegree-wms/services?'
	,BEV_WFS : 'http://esdin.fgi.fi/esdin/BEV/geoserver/ows?'
	,FOMI_WFS : 'http://esdin.fgi.fi/esdin/FOMI/esdin/esdin.exe?'
	,SK_WFS : 'http://esdin.fgi.fi/esdin/SK/skwms2/wms1/wfs.esdin'
	,IGNB_WFS : 'http://esdin.fgi.fi/esdin/IGNBGN/transWFSgnIGNB?'
	,IGNF_WFS : 'http://esdin.fgi.fi/esdin/IGNF_POST/IGNF/IGNF?'
	,NLSS_WFS: 'http://esdin.fgi.fi/esdin/NLSS/lm-se250/wfs.esdin?'
	,GEOSERVER_TMS :  'http://geoserver.nl/tiles/tilecache.aspx?'
	,OPENGEO_WMS : 'http://maps.opengeo.org/geowebcache/service/wms'
	,NLSF_FGI_WFS_GN : 'http://esdin.fgi.fi/esdin/NLSFGN/transWFSgn?'
	,NLSF_FGI_WFS_AU : 'http://esdin.fgi.fi/esdin/NLSFAU/services?'
	,NLSF_FGI_WFS_CP : 'http://esdin.fgi.fi/esdin/NLSFCP/transWFS?'
	,KMS_WFS : 'http://esdin.fgi.fi/esdin/KMS/service?'
	,ANCPI_WFS: 'http://esdin.fgi.fi/esdin/ANCPI/services?'
	,GEODAN_EGN_GN: "http://esdin.geodan.nl/deegree-wfs-gn/services?"
	,GEODAN_IGNB: "http://research.geodan.nl/deegree3_IGNB/services?"
	,NLSS_ExM: "http://esdin.fgi.fi/esdin/NLSS/lm-ggd/wfs.esdin?"
	,geonorge_wms: "http://wms.geonorge.no/skwms1/wms.erm"
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
		txtNoFeatureTypesChecked: "Er zijn nog geen objecttypes aangevinkt",
		txtAttribute : "Attribuut",
		txtValue :"Waarde",
		txtMask : "Bezig met ophalen informatie...",
		txtLayers : "Diensten",
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
		txtNoFeatureTypesChecked: "No feature types have been selected yet.<br>First select one or more feature types in the <i>Map layers</i> panel.",
		txtAttribute : "Attribute",
		txtValue:"Value",
		txtMask : "Busy recieving data...",
		txtLayers : "Map layers",
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
		txtMeasureLength: "Measure distance (draw line segments and double click at the end)",
		txtMeasureArea: "Measure area (draw polygon and double click at the end)",
		txtLength: "Length",
		txtArea: "Area"
	}
};

/**
Define ESDIN/INSPIRE themes
Each theme can contain one or more FeatureTypes
FeatureTypes can contain a list of attributes that can be added to a Ext.DataStore

To Do:
1) use language dependent text for the theme and attribute names
 */
GeoViewer.Catalog.themes = {
	AU: {
		name: 'Administrative Units (AU)'
		,id: 'AU'
		,featureTypes: {
			AdministrativeBoundary: {
				name: 'AdministrativeBoundary'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "nationalCode",displayName: "National code", type: "string"}
					,{name: "nationalLevel",displayName: "National level", type: "string"}
					,{name: "country",displayName: "Country code", type: "string"}
				]
				,layers: []
			}
			,AdministrativeUnit: {
				name: 'AdministrativeUnit'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "nationalCode",displayName: "National code", type: "string"}
					,{name: "nationalLevel",displayName: "National level", type: "string"}
					,{name: "country",displayName: "Country code", type: "string"}
				]
				,layers: []
			}
		}
	}
	,CP: {
		name: 'Cadastral Parcels (CP)'
		,id: 'CP'
		,featureTypes: {
			CadastralParcel: {
				name: 'CadastralParcel'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "nationalCadastralReference",displayName: "National cadastral reference", type: "string"}
				]
				,layers: []
			}
		}
	}
	,HY: {
		name: 'Hydrography (HY)'
		,id: 'HY'
		,featureTypes: {
			DamOrWeir: {
				name: 'DamOrWeir'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
				]
				,layers: []
			},
			StandingWater: {
				name: 'StandingWater'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "surfaceArea",displayName: "Surface area", type: "string"}
					,{name: "origin",displayName: "Origin", type: "string"}
					,{name: "persistence",displayName: "Persistence", type: "string"}
				]
				,layers: []
			}
			,Watercourse: {
				name: 'Watercourse'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "origin",displayName: "Origin", type: "string"}
					,{name: "persistence",displayName: "Persistence", type: "string"}
					,{name: "condition",displayName: "Condition", type: "string"}
					,{name: "tidal",displayName: "Tidal?", type: "string"}
				]
				,layers: []
			}
			,LandWaterBoundary: {
				name: 'LandWaterBoundary'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "origin",displayName: "Origin", type: "string"}
					,{name: "waterLevelCategory",displayName: "Water level category", type: "string"}
				]
				,layers: []
			}
			,Lock: {
				name: 'Lock'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
				]
				,layers: []
			}
		}
	}
	,TN: {
		name: 'Transport Networks (TN)'
		,id: 'TN'
		,featureTypes: {
			RoadArea: {
				name: 'RoadArea'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "text",displayName: "Name", type: "string"}
				]
				,layers: []
			}
			,RoadLink: {
				name: 'RoadLink'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "text",displayName: "Name", type: "string"}
				]
				,layers: []
			}
			,RoadNode: {
				name: 'RoadNode'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "text",displayName: "Name", type: "string"}
				]
				,layers: []
			}
			,AirTransport: null
			,WaterTransport: null
			,RailwayTransport: null
		}
	}
	,ExM: {
		name: 'European topography (ExM)'
		,id: 'ExM'
		,featureTypes: {
			AdministrativeUnit: {
				name: 'AdministrativeUnit'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "nationalCode",displayName: "National code", type: "string"}
					,{name: "nationalLevel",displayName: "National level", type: "string"}
					,{name: "country",displayName: "Country code", type: "string"}
				]
				,layers: []
			}
			,NamedPlace: {
				name: 'NamedPlace'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "text",displayName: "Name", type: "string"}
					,{name: "language",displayName: "Language", type: "string"}
					,{name: "nameStatus",displayName: "Status", type: "string"}
					,{name: "nativeness",displayName: "Nativeness", type: "string"}
					,{name: "type",displayName: "Feature type", type: "string"}
				]
				,layers: []
			}
			,DamOrWeir: null
			,GlacierSnowfield: null
			,LandWaterBoundary: null
		}
	}
	,GN: {
		name: 'Geographical Names (GN)'
		,id: 'GN'
		,featureTypes: {
			NamedPlace: {
				name: 'NamedPlace'
				,attributes: [
					{name: "namespace",displayName: "Identifier: Namespace", type: "string"}
					,{name: "localId",displayName: "Identifier: Local ID", type: "string"}
					,{name: "text",displayName: "Name", type: "string"}
					,{name: "language",displayName: "Language", type: "string"}
					,{name: "nameStatus",displayName: "Status", type: "string"}
					,{name: "nativeness",displayName: "Nativeness", type: "string"}
					,{name: "type",displayName: "Feature type", type: "string"}
				]
				,layers: []
			}
		}
	}
};

GeoViewer.Catalog.layers = {
	/*
	 * ==============================================
	 *            Base Layers (WMS / View Services)
	 * ==============================================
	 */

	world: new OpenLayers.Layer.WMS(
		"World"
		,GeoViewer.Catalog.urls.GEOSERVER_TMS,
		{layers: "wp_wereld_topo", format: "image/jpeg", transparent: false},
		{singleTile: false,  visibility: true }
	)
	,
	egm: new OpenLayers.Layer.WMS(
		"Euro Global Map"
		,GeoViewer.Catalog.urls.EDINA_EGM
		,{
			layers: "EuroGlobalMap"
			,format: "image/png"
			,transparent: "TRUE"
			,version: "1.1.1"
			,exceptions: "XML"
		}
		,{
			visibility: false
			,isBaseLayer: true
			,opacity: 1
		}
	)
	,
	erm: new OpenLayers.Layer.WMS(
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
			visibility: true
			,isBaseLayer: true
			,opacity: 1
		}
	)
	,
	ebm: new OpenLayers.Layer.WMS(
		"Euro Boundary Map" 
		,GeoViewer.Catalog.urls.EDINA_EBM
		,{
			layers: "EuroBoundaryMap"
			,format: "image/png"
			,transparent: "TRUE"
			,version: "1.1.1"
			,exceptions: "XML"
		}
		,{
			visibility: false
			,isBaseLayer: true
			,opacity: 1
		}
	),
	
	erm_NO: new OpenLayers.Layer.WMS(
		"Euro Regional Map (Geonorge)"
		,GeoViewer.Catalog.urls.geonorge_wms
		,{
			layers: "ERM"
			,format: "image/png"
			,transparent: "TRUE"
			,version: "1.1.1"
			,exceptions: "XML"
			,sld: 'http://wms.geonorge.no/sld/ERMSLD.xml'
		},{
			visibility: false
			,isBaseLayer: true
			,opacity: 1
		}
	)
	/*
	* ===================================================
	*            Overlay Layers (WFS / Download Services)
	* ===================================================
	*/
	/*
	 * ==================================
	 *            INSPIRE theme AU
	 * ==================================
	 */	 
	/*
	Romanian WFS gives the following error for both AB and AU:
	<?xml version="1.0" encoding="UTF-8"?><ows:ExceptionReport version="1.1.0" xmlns:ows="http://www.opengis.net/ows"><ows:Exception exceptionCode="InvalidParameterValue" locator="unknown"><ows:ExceptionText>PropertyName "geometry" cannot be resolved: step 0 ("geometry") is invalid. Feature type "au:AdministrativeUnit (au=urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0)" has no property with name "geometry".</ows:ExceptionText></ows:Exception></ows:ExceptionReport>
Also the GetFeature response returns a MultiSurface, I don't know whether OpenLayers supports it
	*/
	,ancpiAU : new OpenLayers.Layer.Vector(
	"Romania AU",
	{
		themeId: 'AU'
		,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
		,visibility: false
		,projection: new OpenLayers.Projection("EPSG:4258")
		,protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				//,formatOptions: {xy: false} // xy=fsalse:  coordinates are switched
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.ANCPI_WFS
				,featurePrefix: "AU"
				,featureType: "AdministrativeUnit"
				,featureNS: "urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0"
				,geometryName: "au:geometry"
				,maxFeatures: "50"
			}
		)
	}
	)
	,ancpiAB : new OpenLayers.Layer.Vector(
	"Romania AB",
	{
		themeId: 'AU'
		,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
		,visibility: false
		,projection: new OpenLayers.Projection("EPSG:4258")
		,protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.ANCPI_WFS
				,featurePrefix: "au"
				,themeId: 'AU'
				,featureType: "AdministrativeBoundary"
				,featureNS: "urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0"
				,geometryName: "au:geometry"
				,maxFeatures: "50"
			}
		)
	}
	)	
	,nlsfAU : new OpenLayers.Layer.Vector(
	"Finnish AU",
	{
		themeId: 'AU',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.NLSF_FGI_WFS_AU
				,featurePrefix: "AU"
				,featureType: "AdministrativeUnit"
				,featureNS: "urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0"
				,geometryName: "geometry"
				//,maxFeatures: "50"
			}
		)
	}
	)
	/*
	Austrian WFS gives the following error:
<?xml version="1.0" encoding="UTF-8"?>
<ows:ExceptionReport version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/ows http://egntest.bev.gv.at:80/geoserver/schemas/ows/1.0.0/owsExceptionReport.xsd"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ows="http://www.opengis.net/ows">
  <ows:Exception exceptionCode="NoApplicableCode">
    <ows:ExceptionText>Could not locate {urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0}AdministrativeBoundary in catalog.</ows:ExceptionText>
  </ows:Exception>
</ows:ExceptionReport>


I tried different schemas to no effect
	*/
	,bevAB : new OpenLayers.Layer.Vector(
	"Austrian AB",
	{
		themeId: 'AU',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "EPSG:4258"
				,extractAttributes: true
				,url: GeoViewer.Catalog.urls.BEV_WFS
				,featurePrefix: "AU"
				,featureType: "AdministrativeBoundary"
				,featureNS: "urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0"
				,geometryName: "geometry"
				,maxFeatures: "50"
			}
		)
	}
	)	
	/*
	French WFS returns this error:
	
	Some unexpected error occurred. Error text was: HTTP Error 500: Erreur Interne de Servlet

	*/
	,ignfAU : new OpenLayers.Layer.Vector(
	"French AU",
	{
	  themeId: 'AU',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS(
			{
				formatOptions: {xy: false} // xy=false:  coordinates are switched
				,version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.IGNF_WFS
				,featurePrefix: "AU"
				,featureType: "AdministrativeUnit"
				,featureNS: "urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0"
				,geometryName: "geometry"
				//,maxFeatures: "5"
			}
		)
	}
	)
	
	,kmsAU : new OpenLayers.Layer.Vector(
	"DE (KMS): Administrative units",
	{
		themeId: 'AU'
		,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
		,displayOutsideMaxExtent: false
		,maxExtent: new OpenLayers.Bounds(8,54.6,12.8,58)
		,visibility: false
		,projection: new OpenLayers.Projection("EPSG:4258")
		,protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.KMS_WFS
				,featurePrefix: "AU"
				,featureType: "AdministrativeUnit"
				,featureNS: "urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0"
				,geometryName: "geometry"
				,maxFeatures: "50"
				,formatOptions: {xy: false} // xy=false:  coordinates are switched
			}
		)
	}
	)
	
	,skAU : new OpenLayers.Layer.Vector(
	"Norway AU",
	{
		themeId: 'AU',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		//strategies: [new OpenLayers.Strategy.Fixed()],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.SK_WFS
				,featurePrefix: "AU"
				,featureType: "AdministrativeUnit"
				,featureNS: "urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0"
				,geometryName: "geometry"
				//,maxFeatures: "10"
			}
		)
	}
	)
	,nlssAU : new OpenLayers.Layer.Vector(
	"Swedish AU",
	{
		themeId: 'AU',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				//,styleMap: GeoViewer.Styles.polyStyles
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.NLSS_WFS
				,featurePrefix: "AU"
				,featureType: "AdministrativeUnit"
				,featureNS: "urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0"
				,geometryName: "geometry"
				//,maxFeatures: "50"
			}
		)
	}
	)
	,ignb_AU_AU : new OpenLayers.Layer.Vector(
	"AU AdministrativeUnit IGNB",
	{
		themeId: 'AU',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS(
			{
				formatOptions: {xy: false} // xy=false:  coordinates are switched
				,version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.GEODAN_IGNB
				,featurePrefix: "AU"
				,featureType: "AdministrativeUnit"
				,featureNS: "urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0"
				,geometryName: "geometry"
				,maxFeatures: "50"
			}
		)
	}
	)
	
  ,NL_KAD_AU_AU : new OpenLayers.Layer.Vector(
	"The Netherlands (Kadaster): Administrative Units",
	{
		themeId: 'AU'
		,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
		,visibility: false
		,displayOutsideMaxExtent: false
		,maxExtent: new OpenLayers.Bounds(3.33,50.6,7.30,53.8)
		,projection: new OpenLayers.Projection("EPSG:4258")
		,protocol: new OpenLayers.Protocol.WFS(
			{
				version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.KADASTER_WFS
				,featurePrefix: "AU"
				,featureType: "AdministrativeUnit"
				,featureNS: "urn:x-inspire:specification:gmlas:AdministrativeUnits:3.0"
				,geometryName: "geometry"
				,maxFeatures: "50"
			}
		)
	}
	)

	/*
	 * ==================================
	 *            INSPIRE theme CP
	 * ==================================
	 */
	// THE NETHERLANDS

	,kadasterCP : new OpenLayers.Layer.Vector(
		"The Netherlands CP",
		{
			themeId: 'CP'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,visibility: false
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(3.33,50.6,7.30,53.8)
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "EPSG:4258"
					,extractAttributes:true
					/* ,url: 'http://85.158.254.91/CP/INSPIRE' */
					,url: GeoViewer.Catalog.urls.KADASTER_WFS
					,featurePrefix: "CP"
					,featureType: "CadastralParcel"
					,featureNS: "urn:x-inspire:specification:gmlas:CadastralParcels:3.0"
					,geometryName: "geometry"
					,maxFeatures: "100"
				}
			)
		}
	)
	
	//FINLAND
	,nlsf_fgiCP: new OpenLayers.Layer.Vector(
	"Finland: CP",
	{
		themeId: 'CP'
		,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
		,visibility: false
		,projection: new OpenLayers.Projection("EPSG:4258")
		,protocol: new OpenLayers.Protocol.WFS(
			{
				formatOptions: {xy: false} // xy=false:  coordinates are switched
				,version: "1.1.0"
				//,styleMap: GeoViewer.Styles.polyStyles
				,srsName: "urn:ogc:def:crs:EPSG::4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.NLSF_FGI_WFS_CP
				,featurePrefix: "CP"
				,featureType: "CadastralParcel"
				,featureNS: "urn:x-inspire:specification:gmlas:CadastralParcels:3.0"
				,geometryName: "geometry"
				//,maxFeatures: "100"
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
	  themeId: 'GN',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		visibility: false,
		displayOutsideMaxExtent: false,
		maxExtent: new OpenLayers.Bounds(16.113350,45.737061,22.896570,48.585258),
		projection: new OpenLayers.Projection("EPSG:4326"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0"
			,srsName: "EPSG:4326"
			,extractAttributes:true
			,url: GeoViewer.Catalog.urls.FOMI_WFS
			,featurePrefix: "ms"
			,featureType: "GN_Point"
			,featureNS: "http://mapserver.gis.umn.edu/mapserver" //targetNamespace in appliation schema
			,geometryName: "ms:msGeometry"
			,schema: "http://esdin.fgi.fi/esdin/FOMI/cgi-bin-3/esdin.exe?service=WFS&version=1.1.0&request=DescribeFeatureType&typename=GN"
		})
	}
	)
	
	,kadasterGN : new OpenLayers.Layer.Vector(
		"The Netherlands GN",
		{
			themeId: 'GN'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,visibility: false
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(3.33,50.6,7.30,53.8)
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "EPSG:4258"
					,extractAttributes:true
					,url: GeoViewer.Catalog.urls.KADASTER_WFS
					,featurePrefix: "GN"
					,featureType: "NamedPlace"
					,featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0"
					,geometryName: "geometry"
					,maxFeatures: "200"
				}
			)
		}
	)
		//NORWAY
	,skGN : new OpenLayers.Layer.Vector("Norway: GN",
		{
			themeId: 'GN',
			strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
			displayOutsideMaxExtent: false,
			maxExtent: new OpenLayers.Bounds(4.432920,57.962582,31.168409,71.185509),
			visibility: false,
			projection: new OpenLayers.Projection("EPSG:4258"),
			protocol: new OpenLayers.Protocol.WFS({
				version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.SK_WFS
				,featurePrefix: "gn"
				,featureType: "NamedPlace"
				,featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0"
				,geometryName: "geometry"
				,maxFeatures: "50"
				,schema: "http://esdin.fgi.fi/esdin/SK/deegree2-wfs/services?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=GN:NamedPlace&namespace=xmlns=(GN=urn:x-inspire:specification:gmlas:GeographicalNames:3.0)"
			})
		}
	)
	
	//BELGIUM
	,ignbGN :  new OpenLayers.Layer.Vector(
	"Belgium: GN",
	{
		themeId: 'GN',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1,ratio:1})], // BBOX queries are not supported by this server
		//strategies: [new OpenLayers.Strategy.Fixed],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS({
			formatOptions: {xy: false} // xy=fsalse:  coordinates are switched
			,version: "1.1.0"
			,outputFormat: "text/xml; subtype=gml/3.2.1"
			,srsName: "EPSG:4258"
			,extractAttributes:true
			,url: GeoViewer.Catalog.urls.IGNB_WFS
			,featurePrefix: "gn"
			,featureType: "NamedPlace"
			,featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0"
			,geometryName: "geometry"
			,maxFeatures: "100"
		})
	}
	)
	/* Swedish WFS produces this error:
	<?xml version="1.0" encoding="UTF-8"?>
<ows:ExceptionReport version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/ows http://www.metainfo.se:80/geoserver_esdin/schemas/ows/1.0.0/owsExceptionReport.xsd"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ows="http://www.opengis.net/ows">
  <ows:Exception exceptionCode="InvalidParameterValue">
    <ows:ExceptionText>Illegal property name: geometry</ows:ExceptionText>
  </ows:Exception>
</ows:ExceptionReport>

	*/
	
	//SWEDEN
	,nlssGN : new OpenLayers.Layer.Vector(
	"Sweden: GN",
	{
		themeId: 'GN',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		displayOutsideMaxExtent: false,
		maxExtent: new OpenLayers.Bounds(10.966100,55.336960,24.166340,69.059937),
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0"
			,srsName: "EPSG:4258"
			,outputFormat: "text/xml; subtype=gml/3.2.1"
			,extractAttributes:true
			,url: GeoViewer.Catalog.urls.NLSS_WFS
			,featurePrefix: "gn"
			,featureType: "NamedPlace"
			,featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0"
			,geometryName: "geometry"
			,maxFeatures: "50"
			,schema: "http://esdin.fgi.fi/esdin/NLSS/lm-se250/wfs.esdin?service=WFS&REQUEST=DescribeFeatureType&typeName=gn:NamedPlace&version=1.1.0"
		})
	}
	)
	
	/*
	French WFS returns this error:
	
	Some unexpected error occurred. Error text was: HTTP Error 500: Erreur Interne de Servlet
	*/
	//FRANCE
	,ignfGN : new OpenLayers.Layer.Vector(
	"France: GN",
	{
		themeId: 'GN',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS({
			formatOptions: {xy: false} // xy=false:  coordinates are switched
			,version: "1.1.0"
			,srsName: "EPSG:4258"
			,outputFormat: "text/xml; subtype=gml/3.2.1"
			,extractAttributes:true
			,url: GeoViewer.Catalog.urls.IGNF_WFS
			,featurePrefix: "gn"
			,featureType: "NamedPlace"
			,featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0"
			,geometryName: "geometry"
			,maxFeatures: "50"
		})
	}
	)
	
	//FINLAND
	,nlsf_fgiGN: new OpenLayers.Layer.Vector("Finland: GN",
		{
			themeId: 'GN'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(20.548571,59.764881,31.586201,70.092308)
			,visibility: false
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS({
				formatOptions: {xy: false} // xy=false:  coordinates are switched
				,version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "urn:ogc:def:crs:EPSG::4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.NLSF_FGI_WFS_GN
				,featurePrefix: "gn"
				,featureType: "NamedPlace"
				,featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0"
				,geometryName: "geometry"
				,maxFeatures: "100"
				,schema: "http://esdin.fgi.fi/esdin/NLSFGN/transWFSgn?service=WFS&REQUEST=DescribeFeatureType&typeName=gn:NamedPlace&version=1.1.0"
			})
		}
	)
	
	/*
	The danish service seems to not support POST requests..
	*/
	
	//DENMARK
	,kmsGN: new OpenLayers.Layer.Vector(
	"Denmark: GN",
		{
		themeId: 'GN',
			strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
			visibility: false,
			projection: new OpenLayers.Projection("EPSG:4258"),
			protocol: new OpenLayers.Protocol.WFS({
				version: "1.1.0"
				,outputFormat: "text/xml; subtype=gml/3.2.1"
				,srsName: "urn:ogc:def:crs:EPSG::4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.KMS_WFS
				,featurePrefix: "gn"
				,featureType: "NamedPlace"
				,featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0"
				,geometryName: "geometry"
				,maxFeatures: "50"
				,schema: "http://esdin.fgi.fi/esdin/KMS/service?service=WFS&REQUEST=DescribeFeatureType&typeName=gn:NamedPlace&version=1.1.0"
			})
		}
	)
	
	//EGN as GN via Geodan
	,geodan_egnGN: new OpenLayers.Layer.Vector(
		"EGN: GN"
		,{
			themeId: 'GN'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(0,20,40,70)
			,visibility: false
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					formatOptions: {xy: true} // xy=false:  coordinates are switched
					,version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "urn:ogc:def:crs:EPSG::4258"
					,extractAttributes:true
					,url: GeoViewer.Catalog.urls.GEODAN_EGN_GN
					,featurePrefix: "gn"
					,featureType: "NamedPlace"
					,featureNS: "urn:x-inspire:specification:gmlas:GeographicalNames:3.0"
					,geometryName: "geometry"
					,maxFeatures: "100"
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
			themeId: 'HY',
			strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
			visibility: false,
			projection: new OpenLayers.Projection("EPSG:4258"),
			protocol: new OpenLayers.Protocol.WFS({
				version: "1.1.0"
				,srsName: "EPSG:4258"
				,extractAttributes:true
				,url: GeoViewer.Catalog.urls.BEV_WFS
				,featurePrefix: "egn"
				,featureType: "LocationInstanceName"
				,featureNS: "http://www.eurogeonames.eu/egn"
				,geometryName: "egn:locationInstance/egn:LocationInstance/egn:position"
				//,maxFeatures: "100"
				,schema: "http://esdin.fgi.fi/esdin/BEV/deegree-wfs/services?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=app:Watercourse_Line&namespace=xmlns(egn=http://www.eurogeonames.eu/egn)"
			})
		}
	)

	,nlssWC : new OpenLayers.Layer.Vector(
	"Sweden: WC",
	{
		themeId: 'HY',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		displayOutsideMaxExtent: false,
		maxExtent: new OpenLayers.Bounds(10.966100,55.336960,24.166340,69.059937),
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0"
			,srsName: "EPSG:4258"
			,outputFormat: "text/xml; subtype=gml/3.2.1"
			,extractAttributes:true
			,url: GeoViewer.Catalog.urls.NLSS_WFS
			,featurePrefix: "hy-p"
			,featureType: "Watercourse"
			,featureNS: "urn:x-inspire:specification:gmlas:HydroPhysicalWaters:3.0"
			,geometryName: "geometry"
			,maxFeatures: "200"
		})
	}
	)
	
	,nlssLWB : new OpenLayers.Layer.Vector(
	"Sweden: LWB",
	{
		themeId: 'HY',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		displayOutsideMaxExtent: false,
		maxExtent: new OpenLayers.Bounds(10.966100,55.336960,24.166340,69.059937),
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0"
			,srsName: "EPSG:4258"
			,outputFormat: "text/xml; subtype=gml/3.2.1"
			,extractAttributes:true
			,url: GeoViewer.Catalog.urls.NLSS_WFS
			,featurePrefix: "hy-p"
			,featureType: "LandWaterBoundary"
			,featureNS: "urn:x-inspire:specification:gmlas:HydroPhysicalWaters:3.0"
			,geometryName: "geometry"
			,maxFeatures: "200"
		})
	}
	)
	,nlssL : new OpenLayers.Layer.Vector(
	"Sweden:L",
	{
		themeId: 'HY',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		displayOutsideMaxExtent: false,
		maxExtent: new OpenLayers.Bounds(10.966100,55.336960,24.166340,69.059937),
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0"
			,srsName: "EPSG:4258"
			,outputFormat: "text/xml; subtype=gml/3.2.1"
			,extractAttributes:true
			,url: GeoViewer.Catalog.urls.NLSS_WFS
			,featurePrefix: "hy-p"
			,featureType: "Lock"
			,featureNS: "urn:x-inspire:specification:gmlas:HydroPhysicalWaters:3.0"
			,geometryName: "geometry"
			,maxFeatures: "200"
		})
	}
	)
	,nlssSW : new OpenLayers.Layer.Vector(
	"Sweden: SW",
	{
		themeId: 'HY',
		strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})],
		displayOutsideMaxExtent: false,
		maxExtent: new OpenLayers.Bounds(10.966100,55.336960,24.166340,69.059937),
		visibility: false,
		projection: new OpenLayers.Projection("EPSG:4258"),
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.1.0"
			,srsName: "EPSG:4258"
			,outputFormat: "text/xml; subtype=gml/3.2.1"
			,extractAttributes:true
			,url: GeoViewer.Catalog.urls.NLSS_WFS
			,featurePrefix: "hy-p"
			,featureType: "StandingWater"
			,featureNS: "urn:x-inspire:specification:gmlas:HydroPhysicalWaters:3.0"
			,geometryName: "geometry"
			,maxFeatures: "200"
		})
	}
	)
	
	,kadasterHY_DW : new OpenLayers.Layer.Vector(
		"The Netherlands HY DamOrWeir",
		{
			themeId: 'HY'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,visibility: false
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(3.33,50.6,7.30,53.8)
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "EPSG:4258"
					,extractAttributes:true
					,url: GeoViewer.Catalog.urls.KADASTER_WFS
					,featurePrefix: "hy-p"
					,featureType: "DamOrWeir"
					,featureNS: "urn:x-inspire:specification:gmlas:HydroPhysicalWaters:3.0"
					,geometryName: "geometry"
					,maxFeatures: "100"
				}
			)
		}
	)
	,kadasterHY_L : new OpenLayers.Layer.Vector(
		"The Netherlands HY Lock",
		{
			themeId: 'HY'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,visibility: false
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(3.33,50.6,7.30,53.8)
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "EPSG:4258"
					,extractAttributes:true
					,url: GeoViewer.Catalog.urls.KADASTER_WFS
					,featurePrefix: "hy-p"
					,featureType: "Lock"
					,featureNS: "urn:x-inspire:specification:gmlas:HydroPhysicalWaters:3.0"
					,geometryName: "geometry"
					,maxFeatures: "200"
				}
			)
		}
	)
	,kadasterHY_SW : new OpenLayers.Layer.Vector(
		"The Netherlands HY StandingWater",
		{
			themeId: 'HY'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,visibility: false
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(3.33,50.6,7.30,53.8)
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "EPSG:4258"
					,extractAttributes:true
					,url: GeoViewer.Catalog.urls.KADASTER_WFS
					,featurePrefix: "hy-p"
					,featureType: "StandingWater"
					,featureNS: "urn:x-inspire:specification:gmlas:HydroPhysicalWaters:3.0"
					,geometryName: "geometry"
					,maxFeatures: "100"
				}
			)
		}
	)
	,kadasterHY_WC : new OpenLayers.Layer.Vector(
		"The Netherlands HY Watercourse",
		{
			themeId: 'HY'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,visibility: false
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(3.33,50.6,7.30,53.8)
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "EPSG:4258"
					,extractAttributes:true
					,url: GeoViewer.Catalog.urls.KADASTER_WFS
					,featurePrefix: "HY-P"
					,featureType: "Watercourse"
					,featureNS: "urn:x-inspire:specification:gmlas:HydroPhysicalWaters:3.0"
					,geometryName: "geometry"
					,maxFeatures: "100"
				}
			)
		}
	)

	,NO_SK_HY_SW : new OpenLayers.Layer.Vector(
		"Norway: SW"
		,{
			themeId: 'HY'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(4.432920,57.962582,31.168409,71.185509)
			,visibility: false
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,srsName: "EPSG:4258"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,extractAttributes: true
					,url: GeoViewer.Catalog.urls.SK_WFS
					,featurePrefix: "hy-p"
					,featureType: "StandingWater"
					,featureNS: "urn:x-inspire:specification:gmlas:HydroPhysicalWaters:3.0"
					,geometryName: "geometry"
					,maxFeatures: "200"
				}
			)
		}
	)
	
	,NO_SK_HY_WC : new OpenLayers.Layer.Vector(
		"Norway: SW"
		,{
			themeId: 'HY'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(4.432920,57.962582,31.168409,71.185509)
			,visibility: false
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,srsName: "EPSG:4258"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,extractAttributes: true
					,url: GeoViewer.Catalog.urls.SK_WFS
					,featurePrefix: "hy-p"
					,featureType: "Watercourse"
					,featureNS: "urn:x-inspire:specification:gmlas:HydroPhysicalWaters:3.0"
					,geometryName: "geometry"
					,maxFeatures: "200"
				}
			)
		}
	)

	/*
	 * ==================================
	 *            INSPIRE theme TN
	 * ==================================
	 */
	,kadasterTN_RA : new OpenLayers.Layer.Vector(
		"The Netherlands TN Road Area",
		{
			themeId: 'TN'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,visibility: false
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(3.33,50.6,7.30,53.8)
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "EPSG:4258"
					,extractAttributes:true
					,url: GeoViewer.Catalog.urls.KADASTER_WFS
					,featurePrefix: "TN-RO"
					,featureType: "RoadArea"
					,featureNS: "urn:x-inspire:specification:gmlas:RoadTransportNetwork:3.0"
					,geometryName: "geometry"
					,maxFeatures: "100"
				}
			)
		}
	)
	,kadasterTN_RL : new OpenLayers.Layer.Vector(
		"The Netherlands TN RoadLink",
		{
			themeId: 'TN'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,visibility: false
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(3.33,50.6,7.30,53.8)
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "EPSG:4258"
					,extractAttributes:true
					,url: GeoViewer.Catalog.urls.KADASTER_WFS
					,featurePrefix: "TN-RO"
					,featureType: "RoadLink"
					,featureNS: "urn:x-inspire:specification:gmlas:RoadTransportNetwork:3.0"
					,geometryName: "geometry"
					,maxFeatures: "100"
				}
			)
		}
	)
	,kadasterTN_RN : new OpenLayers.Layer.Vector(
		"The Netherlands TN RoadNode",
		{
			themeId: 'TN'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,visibility: false
			,displayOutsideMaxExtent: false
			,maxExtent: new OpenLayers.Bounds(3.33,50.6,7.30,53.8)
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "EPSG:4258"
					,extractAttributes:true
					,url: GeoViewer.Catalog.urls.KADASTER_WFS
					,featurePrefix: "TN-RO"
					,featureType: "RoadNode"
					,featureNS: "urn:x-inspire:specification:gmlas:RoadTransportNetwork:3.0"
					,geometryName: "net:geometry"
					,maxFeatures: "200"
				}
			)
		}
	)
	
	/*
	=======================================
	ExM
	=======================================
	*/
	,nlssExM_GN : new OpenLayers.Layer.Vector(
		"Swedish ExM GN",
		{
			themeId: 'ExM'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,visibility: false
			,displayOutsideMaxExtent: false
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "EPSG:4258"
					,extractAttributes:true
					,url: GeoViewer.Catalog.urls.NLSS_ExM
					,featurePrefix: "xgn"
					,featureType: "NamedPlace"
					,featureNS: "urn:x-exm:specification:gmlas:ExM_GeographicalNames:1.2"
					,geometryName: "gn:geometry"
					,maxFeatures: "200"
				}
			)
		}
	)
	,nlssExM_AU : new OpenLayers.Layer.Vector(
		"Swedish ExM AU",
		{
			themeId: 'ExM'
			,strategies: [new OpenLayers.Strategy.BBOX({resFactor: 1, ratio: 1})]
			,visibility: false
			,displayOutsideMaxExtent: false
			,projection: new OpenLayers.Projection("EPSG:4258")
			,protocol: new OpenLayers.Protocol.WFS(
				{
					version: "1.1.0"
					,outputFormat: "text/xml; subtype=gml/3.2.1"
					,srsName: "EPSG:4258"
					,extractAttributes:true
					,url: GeoViewer.Catalog.urls.NLSS_ExM
					,featurePrefix: "xau"
					,featureType: "AdministrativeUnit"
					,featureNS: "urn:x-exm:specification:gmlas:ExM_AdministrativeUnits:1.2"
					,geometryName: "au:geometry"
					,maxFeatures: "200"
				}
			)
		}
	)
};

var layer, featureType, theme;
// attach layers to feature types in themes:
for (layer in GeoViewer.Catalog.layers)
{
	if (GeoViewer.Catalog.layers[layer].options.themeId)
	{
		for (theme in GeoViewer.Catalog.themes) 
		{ 
			if (GeoViewer.Catalog.themes[theme].id == GeoViewer.Catalog.layers[layer].options.themeId)
			{
				for (featureType in GeoViewer.Catalog.themes[theme].featureTypes)
				{
					if (!GeoViewer.Catalog.themes[theme].featureTypes[featureType]) {
						continue;
					}
					
					if (GeoViewer.Catalog.themes[theme].featureTypes[featureType].name ==  GeoViewer.Catalog.layers[layer].options.protocol.options.featureType)
					{
						GeoViewer.Catalog.themes[theme].featureTypes[featureType].layers.push(GeoViewer.Catalog.layers[layer]);
					}
				}
			}
		}
	}
}
