/*
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

/**
 * Settings for Duth National SDI "PDOK" services
 * See http://nieuwsinkaart.nl/pdok for most actual ones.
 */
Ext.namespace("Heron.options");
Ext.namespace("Heron.pdok");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';
OpenLayers.DOTS_PER_INCH=25.4/0.28;

/**
 * Options for MapPanel
 * These will be assigned as "hropts" within the global config
 * "pdok" is just for convenience.
 *
 **/
Ext.namespace("Heron.options.map");

/** Richtlijn tiling Nederland: linksboven: X=-285.401,920 Y=903.401,920;
 * rechtsonder: X=595.401,920 Y=22.598,080;
 * This results in:
 * maxExtent: '-285401.920,22598.080,595401.920,903401.920'
 * on zoomLevel 2 more common for NL: maxExtent: '-65200.96,242799.04,375200.96,683200.96', but when using TMS all levels needed
 */

Heron.options.map.settings = {
	projection: 'EPSG:28992',
	units: 'm',
	resolutions: [3440.640,1720.320,860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	maxExtent: '-285401.920,22598.080,595401.920,903401.920',
	center: '155000,463000',
	xy_precision: 3,
	zoom: 3,
	theme: null,

	/**
	 * Useful to always have permalinks enabled. default is enabled with these settings.
	 * MapPanel.getPermalink() returns current permalink
	 *
	 **/
	permalinks: {
		/** The prefix to be used for parameters, e.g. map_x, default is 'map' */
		paramPrefix: 'map',

		/** Encodes values of permalink parameters ? default false*/
		encodeType: false,
		/** Use Layer names i.s.o. OpenLayers-generated Layer Id's in Permalinks */
		prettyLayerNames: true
	}

};

// Base of all services for PDOK
Heron.pdok.baseurl = 'http://geodata.nationaalgeoregister.nl';

Heron.pdok.urls = {
	PDOKTMS: Heron.pdok.baseurl + '/tms/',
	NATURA2000: Heron.pdok.baseurl + '/natura2000/wms?',
	NATURA2000WMTS:  Heron.pdok.baseurl + '/tiles/service/wmts/natura2000?',
	NWBWEGEN: Heron.pdok.baseurl + '/nwbwegen/wms?',
	NWBVAARWEGEN: Heron.pdok.baseurl + '/nwbvaarwegen/wms?',
	NWBSPOORWEGEN: Heron.pdok.baseurl + '/nwbspoorwegen/wms?',
	NWBSPOORWEGENWFS: Heron.pdok.baseurl + '/nwbspoorwegen/wfs?',
	DTB: Heron.pdok.baseurl + '/digitaaltopografischbestand/wms?',
	NATIONALEPARKEN: Heron.pdok.baseurl + '/nationaleparken/wms?',
	WETLANDS: Heron.pdok.baseurl + '/wetlands/wms?',
	BESCHERMDENATUURMONUMENTEN: Heron.pdok.baseurl + '/beschermdenatuurmonumenten/wms?',
	NHI: Heron.pdok.baseurl + '/nhi/wms?',
	AHN25M: Heron.pdok.baseurl + '/ahn25m/wms?',
	NOK: Heron.pdok.baseurl + '/nok2010/wms?',
	VIN: Heron.pdok.baseurl + '/vin/wms?',
	WEGGEG: Heron.pdok.baseurl + '/weggeg/wms?',
	BESTUURLIJKEGRENZEN: Heron.pdok.baseurl + '/bestuurlijkegrenzen/wms?',
	TOP10NL: Heron.pdok.baseurl + '/top10nl/wms?',
	TOP10NLWMTS: Heron.pdok.baseurl + '/tiles/service/wmts/top10nl?',
	TOP250RASTER: Heron.pdok.baseurl + '/top250raster/wms?',
	TOP50RASTER: Heron.pdok.baseurl + '/top50raster/wms?',
	TOP50VECTOR: Heron.pdok.baseurl + '/top50vector/wms?',
	CULTGIS: Heron.pdok.baseurl + '/cultgis/wms?',
	NOK2011: Heron.pdok.baseurl + '/nok2011/wms?',
	BESTANDBODEMGEBRUIK2008: Heron.pdok.baseurl + '/bestandbodemgebruik2008/wms?',
	BEVOLKINGSKERNEN2008: Heron.pdok.baseurl + '/bevolkingskernen2008/wms?',
	AAN: Heron.pdok.baseurl + '/aan/wms?',
	WIJKENBUURTEN2011: Heron.pdok.baseurl + '/wijkenbuurten2011/wms?',
	WIJKENBUURTEN2010: Heron.pdok.baseurl + '/wijkenbuurten2010/wms?',
	WIJKENBUURTEN2009: Heron.pdok.baseurl + '/wijkenbuurten2009/wms?',
	CBSVIERKANTEN100m2010: Heron.pdok.baseurl + '/cbsvierkanten100m2010/wms?',
	NOK2007: Heron.pdok.baseurl + '/nok2007/wms?'
};


// WFS options for PDOK
Heron.pdok.maxFeatures = '250';
var wfsStrategies = [new OpenLayers.Strategy.BBOX()];

Heron.pdok.styleMap = new OpenLayers.StyleMap({
	"default": new OpenLayers.Style({
		pointRadius: "6",
		fillColor: "#ffcc66",
		strokeColor: "#ff9933",
		strokeWidth: 2,
		graphicZIndex: 1
	}),
	"select": new OpenLayers.Style({
		fillColor: "#66ccff",
		strokeColor: "#3399ff",
		graphicZIndex: 2
	})
});

// For WMTS layers in EPSG:28992
Heron.pdok.matrixIds = new Array(15);
for (var i = 0; i < 15; ++i) {
	Heron.pdok.matrixIds[i] = "EPSG:28992:" + i;
}

Heron.pdok.layermap = {
	/*
	 * ==================================
	 *            BaseLayers
	 * ==================================
	 */

	achtergrondkaart: new OpenLayers.Layer.TMS("Achtergrondkaart",
			Heron.pdok.urls.PDOKTMS,
			{layername: 'brtachtergrondkaart',
				type: "png",
				isBaseLayer: true,
				transparent: true,
				bgcolor: "0xffffff",
				visibility: true,
				singleTile: false,
				alpha:true,
				opacity: 1.0,
				attribution: "Bron: BRT Achtergrondkaart, � <a href='http://openstreetmap.org/'>OpenStreetMap</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-By-SA</a>"}),

	blanco: new OpenLayers.Layer.Image(
			"Blanco",
			Ext.BLANK_IMAGE_URL,
			OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
			new OpenLayers.Size(10, 10),
			{resolutions: Heron.options.map.settings.resolutions,
				isBaseLayer: true, visibility:
					false, displayInLayerSwitcher: true}),

	/* ------------------------------
	 * Natura 2000
	 * ------------------------------ */
	natura2000wms: new OpenLayers.Layer.WMS("Natura 2000 (WMS)",
			Heron.pdok.urls.NATURA2000,
			{'layers': 'natura2000', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,
				visibility: false, alpha:true, opacity: 0.7,
				featureInfoFormat: "application/vnd.ogc.gml"}),

	natura2000wmts: new OpenLayers.Layer.WMTS({
		name: "Natura 2000 (WMTS)",
		url: Heron.pdok.urls.NATURA2000WMTS,
		layer: "natura2000",
		matrixSet: "EPSG:28992",
		matrixIds: Heron.pdok.matrixIds,
		format: "image/png",
		visibility: false,
		style: "_null",
		opacity: 0.7,
		isBaseLayer: false
	}),

	natura2000tms: new OpenLayers.Layer.TMS("Natura 2000 (TMS)",
			"http://geodata.nationaalgeoregister.nl/tms/",
			{layername: 'natura2000', type:'png', isBaseLayer: false, transparent: true, bgcolor: "0xffffff", visibility: false, singleTile: false}),

	/* ------------------------------
	 * NWB Wegen
	 * ------------------------------ */
	nwb_hectopunten: new OpenLayers.Layer.WMS("Hectopunten wegen",
			Heron.pdok.urls.NWBWEGEN,
			{'layers': 'hectopunten', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	nwb_wegvakken: new OpenLayers.Layer.WMS("Wegvakken",
			Heron.pdok.urls.NWBWEGEN,
			{'layers': 'wegvakken', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * NWB Vaarwegen
	 * ------------------------------ */
	nwbvw_kmmarkeringen: new OpenLayers.Layer.WMS("Kilometermarkeringen",
			Heron.pdok.urls.NWBVAARWEGEN,
			{'layers': 'kmmarkeringen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	nwbvw_vaarwegvakken: new OpenLayers.Layer.WMS("Vaarwegvakken",
			Heron.pdok.urls.NWBVAARWEGEN,
			{'layers': 'vaarwegvakken', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * NWB Spoorwegen
	 * ------------------------------ */
	nwbsw_hectopunten: new OpenLayers.Layer.WMS("Hectopunten spoor",
			Heron.pdok.urls.NWBSPOORWEGEN,
			{'layers': 'hectopunten', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	nwbsw_overgangen: new OpenLayers.Layer.WMS("Overgangen",
			Heron.pdok.urls.NWBSPOORWEGEN,
			{'layers': 'overgangen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	nwbsw_oversteken: new OpenLayers.Layer.WMS("Oversteken",
			Heron.pdok.urls.NWBSPOORWEGEN,
			{'layers': 'oversteken', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	nwbsw_spoorvakken: new OpenLayers.Layer.WMS("Spoorvakken",
			Heron.pdok.urls.NWBSPOORWEGEN,
			{'layers': 'spoorvakken', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	nwbsw_treinstations: new OpenLayers.Layer.WMS("Treinstations",
			Heron.pdok.urls.NWBSPOORWEGEN,
			{'layers': 'treinstations', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	// WFS layers
	nwbsw_treinstationswfs: new OpenLayers.Layer.Vector("Treinstations (WFS)", {
		strategies: wfsStrategies,
		projection: new OpenLayers.Projection("EPSG:28992"),
		styleMap: Heron.pdok.styleMap,
		protocol: new OpenLayers.Protocol.WFS({
			version: "1.0.0",
			srsName: "EPSG:28992",
			url: Heron.pdok.urls.NWBSPOORWEGENWFS,
			featureNS :  "http://nwbspoorwegen.geonovum.nl",
			featureType: "treinstations",
			maxFeatures: Heron.pdok.maxFeatures,
			geometryName: "geom"
		}),
		visibility: false
	}),
	/* nwbsw_spoorvakkenwfs: new OpenLayers.Layer.Vector("Spoorvakken (WFS)", {
	 strategies: wfsStrategies,
	 projection: new OpenLayers.Projection("EPSG:28992"),
	 styleMap: Heron.pdok.styleMap,
	 protocol: new OpenLayers.Protocol.WFS({
	 version: "1.0.0",
	 srsName: "EPSG:28992",
	 url: Heron.pdok.urls.NWBSPOORWEGENWFS,
	 featureNS :  "http://nwbspoorwegen.geonovum.nl",
	 featureType: "spoorvakken",
	 maxFeatures: Heron.pdok.maxFeatures,
	 geometryName: "geom"
	 }),
	 visibility: false
	 }), */

	/* ------------------------------
	 * DTB
	 * ------------------------------ */
	dtb_lijnen: new OpenLayers.Layer.WMS("DTB Lijnen",
			Heron.pdok.urls.DTB,
			{'layers': 'lijnen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	dtb_punten: new OpenLayers.Layer.WMS("DTB Punten",
			Heron.pdok.urls.DTB,
			{'layers': 'lijnen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	dtb_vlakken: new OpenLayers.Layer.WMS("DTB Vlakken",
			Heron.pdok.urls.DTB,
			{'layers': 'vlakken', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	/* ------------------------------
	 * Nationale Parken
	 * ------------------------------ */
	nationaleparken: new OpenLayers.Layer.WMS("Nationale parken",
			Heron.pdok.urls.NATIONALEPARKEN,
			{'layers': 'nationaleparken', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	/* ------------------------------
	 * Wetlands
	 * ------------------------------ */
	wetlands: new OpenLayers.Layer.WMS("Wetlands",
			Heron.pdok.urls.WETLANDS,
			{'layers': 'wetlands', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	/* ------------------------------
	 * Beschermde natuurmonumenten
	 * ------------------------------ */
	beschermdenatuurmonumenten: new OpenLayers.Layer.WMS("Beschermde natuurmonumenten",
			Heron.pdok.urls.BESCHERMDENATUURMONUMENTEN,
			{'layers': 'beschermdenatuurmonumenten', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	/* ------------------------------
	 * NHI
	 * ------------------------------ */
	nhi_dmlinks: new OpenLayers.Layer.WMS("NHI DM Links",
			Heron.pdok.urls.NHI,
			{'layers': 'dmlinks', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	nhi_dmnodes: new OpenLayers.Layer.WMS("NHI DM Nodes",
			Heron.pdok.urls.NHI,
			{'layers': 'dmnodes', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * AHN 25m
	 * ------------------------------ */
	ahn25m_ahn25m: new OpenLayers.Layer.WMS("AHN 25m",
			Heron.pdok.urls.AHN25M,
			{'layers': 'ahn25m', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	ahn25m_bladindex: new OpenLayers.Layer.WMS("AHN bladindex",
			Heron.pdok.urls.AHN25M,
			{'layers': 'bladindex', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	ahn25m_puntdichtheidgebieden: new OpenLayers.Layer.WMS("AHN puntdichtheidgebieden",
			Heron.pdok.urls.AHN25M,
			{'layers': 'puntdichtheidgebieden', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	ahn25m_stadspolygonen: new OpenLayers.Layer.WMS("AHN stadspolygonen",
			Heron.pdok.urls.AHN25M,
			{'layers': 'stadspolygonen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	ahn25m_vlieglijnen: new OpenLayers.Layer.WMS("AHN vlieglijnen",
			Heron.pdok.urls.AHN25M,
			{'layers': 'vlieglijnen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * NOK
	 * ------------------------------ */
	nok_bblbuitenbegrenzing: new OpenLayers.Layer.WMS("BBL buitenbegrenzing",
			Heron.pdok.urls.NOK,
			{'layers': 'bblbuitenbegrenzing', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	nok_ehs: new OpenLayers.Layer.WMS("EHS",
			Heron.pdok.urls.NOK,
			{'layers': 'ehs', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	nok_rods: new OpenLayers.Layer.WMS("RODS",
			Heron.pdok.urls.NOK,
			{'layers': 'rods', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	/* ------------------------------
	 * VIN
	 * ------------------------------ */
	vin_bevaarbaarheid: new OpenLayers.Layer.WMS("Bevaarbaarheid",
			Heron.pdok.urls.VIN,
			{'layers': 'bevaarbaarheid', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * WEGGEG
	 * ------------------------------ */
	weggeg_weggegaantalrijbanen: new OpenLayers.Layer.WMS("Aantal rijbanen",
			Heron.pdok.urls.WEGGEG,
			{'layers': 'weggegaantalrijbanen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	weggeg_weggegmaximumsnelheden: new OpenLayers.Layer.WMS("Maximum snelheden",
			Heron.pdok.urls.WEGGEG,
			{'layers': 'weggegmaximumsnelheden', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * Thijs: toevoegingen 17 en 19 januari 2012
	 * Thijs: 19 mei 2012: grenzen_buurten en grenzen_wijken worden niet meer aangeboden, andere kaartlagen hebben andere layernames gekregen
	 * ------------------------------ */
	/* ------------------------------
	 * BESTUURLIJKE GRENZEN
	 * ------------------------------ */
	/*
	 grenzen_buurten: new OpenLayers.Layer.WMS("CBS buurten",
	 Heron.pdok.urls.BESTUURLIJKEGRENZEN,
	 {'layers': 'buurten', 'format': 'image/png', transparent: true},
	 {'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	 grenzen_wijken: new OpenLayers.Layer.WMS("CBS wijken",
	 Heron.pdok.urls.BESTUURLIJKEGRENZEN,
	 {'layers': 'wijken', 'format': 'image/png', transparent: true},
	 {'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),
	 */
	grenzen_gemeenten2012: new OpenLayers.Layer.WMS("Gemeente grenzen 2012",
			Heron.pdok.urls.BESTUURLIJKEGRENZEN,
			{'layers': 'gemeenten_2012', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	grenzen_provincies2012: new OpenLayers.Layer.WMS("Provincie grenzen 2012",
			Heron.pdok.urls.BESTUURLIJKEGRENZEN,
			{'layers': 'provincies_2012', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	grenzen_landsgrens2012: new OpenLayers.Layer.WMS("Landsgrens 2012",
			Heron.pdok.urls.BESTUURLIJKEGRENZEN,
			{'layers': 'landsgrens_2012', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top10nl_wegdeelvlakken: new OpenLayers.Layer.WMS("TOP10NL wegdeelvlakken",
			Heron.pdok.urls.TOP10NL,
			{'layers': 'wegdeelvlakken', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top10nl_terreinen: new OpenLayers.Layer.WMS("TOP10NL terreinen",
			Heron.pdok.urls.TOP10NL,
			{'layers': 'terreinen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top10nl_gebouwen: new OpenLayers.Layer.WMS("TOP10NL gebouwen",
			Heron.pdok.urls.TOP10NL,
			{'layers': 'gebouwen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top10nl_inrichtingselementlijnen: new OpenLayers.Layer.WMS("TOP10NL inrichtingselementlijnen",
			Heron.pdok.urls.TOP10NL,
			{'layers': 'inrichtingselementlijnen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top10nl_inrichtingselementpunten: new OpenLayers.Layer.WMS("TOP10NL inrichtingselementpunten",
			Heron.pdok.urls.TOP10NL,
			{'layers': 'inrichtingselement_punten', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top10nl_spoorbaandeel_lijnen: new OpenLayers.Layer.WMS("TOP10NL spoorbaandeellijnen",
			Heron.pdok.urls.TOP10NL,
			{'layers': 'spoorbaandeel_lijnen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top10nl_waterdeel_vlakken: new OpenLayers.Layer.WMS("TOP10NL waterdeelvlakken",
			Heron.pdok.urls.TOP10NL,
			{'layers': 'waterdeel_vlakken', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top10nl_waterdeellijnen: new OpenLayers.Layer.WMS("TOP10NL waterdeellijnen",
			Heron.pdok.urls.TOP10NL,
			{'layers': 'waterdeellijnen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top10nl_geo_labels: new OpenLayers.Layer.WMS("TOP10NL geografische namen",
			Heron.pdok.urls.TOP10NL,
			{'layers': 'geo_labels', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top10nl_functioneelgebied_labels: new OpenLayers.Layer.WMS("TOP10NL functioneelgebied labels",
			Heron.pdok.urls.TOP10NL,
			{'layers': 'functioneelgebied_labels', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top10nlwmts: new OpenLayers.Layer.WMTS({
		name: "TOP10NL alle lagen (WMTS)",
		url: Heron.pdok.urls.TOP10NLWMTS,
		layer: "top10nl",
		matrixSet: "EPSG:28992",
		matrixIds: Heron.pdok.matrixIds,
		format: "image/png",
		visibility: false,
		style: "_null",
		opacity: 0.7,
		isBaseLayer: false
	}),

	/* ------------------------------
	 * Thijs: toevoegingen 27 maart 2012
	 * ------------------------------ */
	/* ------------------------------
	 * Basisregistratie topografie
	 * ------------------------------ */
	top250raster_top250raster: new OpenLayers.Layer.WMS("TOP250Raster",
			Heron.pdok.urls.TOP250RASTER,
			{'layers': 'top250raster', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top50raster_top50raster: new OpenLayers.Layer.WMS("TOP50Raster",
			Heron.pdok.urls.TOP50RASTER,
			{'layers': 'top50raster', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top50vector_vlakken: new OpenLayers.Layer.WMS("TOP50Vector Vlakken",
			Heron.pdok.urls.TOP50VECTOR,
			{'layers': 'vlakken', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top50vector_huizen: new OpenLayers.Layer.WMS("TOP50Vector Huizen",
			Heron.pdok.urls.TOP50VECTOR,
			{'layers': 'huizen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top50vector_symline: new OpenLayers.Layer.WMS("TOP50Vector Symline",
			Heron.pdok.urls.TOP50VECTOR,
			{'layers': 'symline', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top50vector_sympoint: new OpenLayers.Layer.WMS("TOP50Vector Sympoint",
			Heron.pdok.urls.TOP50VECTOR,
			{'layers': 'sympoint', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	top50vector_lijnen: new OpenLayers.Layer.WMS("TOP50Vector Lijnen",
			Heron.pdok.urls.TOP50VECTOR,
			{'layers': 'lijnen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * CultGIS
	 * ------------------------------ */

	cultgis_aandachtsgebied: new OpenLayers.Layer.WMS("aandachtsgebied",
			Heron.pdok.urls.CULTGIS,
			{'layers': 'aandachtsgebied', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	cultgis_deellandschap: new OpenLayers.Layer.WMS("deellandschap",
			Heron.pdok.urls.CULTGIS,
			{'layers': 'deellandschap', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	cultgis_elementen: new OpenLayers.Layer.WMS("elementen",
			Heron.pdok.urls.CULTGIS,
			{'layers': 'elementen', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	cultgis_landschap: new OpenLayers.Layer.WMS("landschap",
			Heron.pdok.urls.CULTGIS,
			{'layers': 'landschap', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	cultgis_regios: new OpenLayers.Layer.WMS("regio's",
			Heron.pdok.urls.CULTGIS,
			{'layers': 'regios', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * NOK2011
	 * ------------------------------ */

	nok2011_begrenzing: new OpenLayers.Layer.WMS("begrenzing",
			Heron.pdok.urls.NOK2011,
			{'layers': 'begrenzing', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	nok2011_planologischeehs: new OpenLayers.Layer.WMS("planologische EHS",
			Heron.pdok.urls.NOK2011,
			{'layers': 'planologischeehs', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	nok2011_verwervinginrichting: new OpenLayers.Layer.WMS("verwervinginrichting",
			Heron.pdok.urls.NOK2011,
			{'layers': 'verwervinginrichting', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * Thijs: toevoegingen 1 mei 2012
	 * ------------------------------ */
	/* ------------------------------
	 * BESTAND BODEMGEBRUIK 2008
	 * ------------------------------ */

	bestandbodemgebruik_bbg2008: new OpenLayers.Layer.WMS("bbg2008",
			Heron.pdok.urls.BESTANDBODEMGEBRUIK2008,
			{'layers': 'bbg2008', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	bestandbodemgebruik_bbg2008_hoofdgroep: new OpenLayers.Layer.WMS("bbg2008_hoofdgroep",
			Heron.pdok.urls.BESTANDBODEMGEBRUIK2008,
			{'layers': 'bbg2008_hoofdgroep', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * BEVOLKINGSKERNEN 2008
	 * ------------------------------ */
	bevolkingskernen2008_cbsbevolkingskernen2008: new OpenLayers.Layer.WMS("cbsbevolkingskernen2008",
			Heron.pdok.urls.BEVOLKINGSKERNEN2008,
			{'layers': 'cbsbevolkingskernen2008', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	bevolkingskernen2008_gemeentegrens_generalisatie_2008: new OpenLayers.Layer.WMS("gemeentegrens_generalisatie_2008",
			Heron.pdok.urls.BEVOLKINGSKERNEN2008,
			{'layers': 'gemeentegrens_generalisatie_2008', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	bevolkingskernen2008_naamgeving_kernen_40k_plus: new OpenLayers.Layer.WMS("naamgeving_kernen_40k_plus",
			Heron.pdok.urls.BEVOLKINGSKERNEN2008,
			{'layers': 'naamgeving_kernen_40k_plus', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	bevolkingskernen2008_naamgeving_kernen_alles: new OpenLayers.Layer.WMS("naamgeving_kernen_alles",
			Heron.pdok.urls.BEVOLKINGSKERNEN2008,
			{'layers': 'naamgeving_kernen_alles', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	bevolkingskernen2008_provgrens_generalisatie_2008: new OpenLayers.Layer.WMS("provgrens_generalisatie_2008",
			Heron.pdok.urls.BEVOLKINGSKERNEN2008,
			{'layers': 'provgrens_generalisatie_2008', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * Agrarisch Areaal Nederland (AAN)
	 * ------------------------------ */
	aan_aan: new OpenLayers.Layer.WMS("aan",
			Heron.pdok.urls.AAN,
			{'layers': 'aan', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * Wijken Buurten 2011
	 * ------------------------------ */
	wijkenbuurten2011_cbs_buurten_2011: new OpenLayers.Layer.WMS("cbs_buurten_2011",
			Heron.pdok.urls.WIJKENBUURTEN2011,
			{'layers': 'cbs_buurten_2011', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	wijkenbuurten2011_cbs_wijken_2011_dichtheid: new OpenLayers.Layer.WMS("Thema: cbs_wijken_2011 bevolkingsdichtheid inwoners per km2",
			Heron.pdok.urls.WIJKENBUURTEN2011,
			{'layers': 'cbs_wijken_2011', 'format': 'image/png', transparent: true, styles: 'wijkenbuurten2011_thema_wijken2011_bevolkingsdichtheid_inwoners_per_km2'},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml",opacity: 0.5}),

	wijkenbuurten2011_cbs_wijken_2011_huishoudsgrootte: new OpenLayers.Layer.WMS("Thema: cbs_wijken_2011 huishoudsgrootte",
			Heron.pdok.urls.WIJKENBUURTEN2011,
			{'layers': 'cbs_wijken_2011', 'format': 'image/png', transparent: true, styles: 'wijkenbuurten2011_thema_wijken2011_gemiddelde_huishoudsgrootte'},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml",opacity: 0.5}),


	wijkenbuurten2011_cbs_wijken_2011: new OpenLayers.Layer.WMS("cbs_wijken_2011",
			Heron.pdok.urls.WIJKENBUURTEN2011,
			{'layers': 'cbs_wijken_2011', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	wijkenbuurten2011_gemeenten2011: new OpenLayers.Layer.WMS("gemeenten2011",
			Heron.pdok.urls.WIJKENBUURTEN2011,
			{'layers': 'gemeenten2011', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * Wijken Buurten 2010
	 * ------------------------------ */
	wijkenbuurten2010_cbs_buurten_2010: new OpenLayers.Layer.WMS("cbs_buurten_2010",
			Heron.pdok.urls.WIJKENBUURTEN2010,
			{'layers': 'cbs_buurten_2010', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	wijkenbuurten2010_cbs_wijken_2010: new OpenLayers.Layer.WMS("cbs_wijken_2010",
			Heron.pdok.urls.WIJKENBUURTEN2010,
			{'layers': 'cbs_wijken_2010', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	wijkenbuurten2010_gemeenten2010: new OpenLayers.Layer.WMS("gemeenten2010",
			Heron.pdok.urls.WIJKENBUURTEN2010,
			{'layers': 'gemeenten2010', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * Wijken Buurten 2009
	 * ------------------------------ */
	wijkenbuurten2009_cbs_buurten_2009: new OpenLayers.Layer.WMS("cbs_buurten_2009",
			Heron.pdok.urls.WIJKENBUURTEN2009,
			{'layers': 'cbs_buurten_2009', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	wijkenbuurten2009_cbs_wijken_2009: new OpenLayers.Layer.WMS("cbs_wijken_2009",
			Heron.pdok.urls.WIJKENBUURTEN2009,
			{'layers': 'cbs_wijken_2009', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	wijkenbuurten2009_gemeenten2009: new OpenLayers.Layer.WMS("gemeenten2009",
			Heron.pdok.urls.WIJKENBUURTEN2009,
			{'layers': 'gemeenten2009', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}),

	/* ------------------------------
	 * NOK 2007
	 * ------------------------------ */
	nok2007_bblbuitenbegrenzing: new OpenLayers.Layer.WMS("NOK 2007 bblbuitenbegrenzing",
			Heron.pdok.urls.NOK2007,
			{'layers': 'bblbuitenbegrenzing', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	nok2007_ehs: new OpenLayers.Layer.WMS("NOK 2007 EHS",
			Heron.pdok.urls.NOK2007,
			{'layers': 'ehs', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	nok2007_rods: new OpenLayers.Layer.WMS("NOK 2007 RODS",
			Heron.pdok.urls.NOK2007,
			{'layers': 'rods', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_inwoners_2000_per_hectare: new OpenLayers.Layer.WMS("CBS inwoners 2000 per hectare",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_inwoners_2000_per_hectare', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_inwoners_2001_per_hectare: new OpenLayers.Layer.WMS("CBS inwoners 2001 per hectare",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_inwoners_2001_per_hectare', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_inwoners_2002_per_hectare: new OpenLayers.Layer.WMS("CBS inwoners 2002 per hectare",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_inwoners_2002_per_hectare', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_inwoners_2003_per_hectare: new OpenLayers.Layer.WMS("CBS inwoners 2003 per hectare",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_inwoners_2003_per_hectare', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_inwoners_2004_per_hectare: new OpenLayers.Layer.WMS("CBS inwoners 2004 per hectare",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_inwoners_2004_per_hectare', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_inwoners_2005_per_hectare: new OpenLayers.Layer.WMS("CBS inwoners 2005 per hectare",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_inwoners_2005_per_hectare', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_inwoners_2006_per_hectare: new OpenLayers.Layer.WMS("CBS inwoners 2006 per hectare",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_inwoners_2006_per_hectare', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_inwoners_2007_per_hectare: new OpenLayers.Layer.WMS("CBS inwoners 2007 per hectare",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_inwoners_2007_per_hectare', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_inwoners_2008_per_hectare: new OpenLayers.Layer.WMS("CBS inwoners 2008 per hectare",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_inwoners_2008_per_hectare', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_inwoners_2009_per_hectare: new OpenLayers.Layer.WMS("CBS inwoners 2009 per hectare",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_inwoners_2009_per_hectare', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_inwoners_2010_per_hectare: new OpenLayers.Layer.WMS("CBS inwoners 2010 per hectare",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_inwoners_2010_per_hectare', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_cbs_verandering_inwoners_2000_2010: new OpenLayers.Layer.WMS("CBS verandering inwoners 2000-2010",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'cbs_verandering_inwoners_2000_2010', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_gem_2010_generalisatie: new OpenLayers.Layer.WMS("CBS gemeente 2010 generalisatie",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'gem_2010_generalisatie', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7}),

	cbsvierkanten_prov_2010_generalisatie: new OpenLayers.Layer.WMS("CBS provincie 2010 generalisatie",
			Heron.pdok.urls.CBSVIERKANTEN100m2010,
			{'layers': 'prov_2010_generalisatie', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml", alpha:true, opacity: 0.7})

};


/** WFS
 * Code for creating popups
 * */
Heron.pdok.layermap.nwbsw_treinstationswfs.events.register("click", Heron.pdok.layermap.nwbsw_treinstationswfs, function(e) {
	this.div.style.cursor = "default";
	var feature = this.getFeatureFromEvent(e);
	if (feature) {
		// add a popup
		onFeatureSelect(feature, true, createPopup(feature)); // full=true
		feature.popupFix = true;
	}
});

/* */

/** Collect layers from above, these are actually added to the map.
 * One could also define the layer objects here immediately.
 * */
Heron.options.map.layers = [

	/*
	 * ==================================
	 *            BaseLayers
	 * ==================================
	 */
	Heron.pdok.layermap.achtergrondkaart,
	Heron.pdok.layermap.blanco,

	/*
	 * ==================================
	 *            OVERLAYS
	 * ==================================
	 */

	/* ------------------------------
	 * Natura 2000
	 * ------------------------------ */
	Heron.pdok.layermap.natura2000wms,
	Heron.pdok.layermap.natura2000wmts,
	Heron.pdok.layermap.natura2000tms,

	/* ------------------------------
	 * NWB Wegen
	 * ------------------------------ */
	Heron.pdok.layermap.nwb_hectopunten,
	Heron.pdok.layermap.nwb_wegvakken,

	/* ------------------------------
	 * NWB Vaarwegen
	 * ------------------------------ */
	Heron.pdok.layermap.nwbvw_kmmarkeringen,
	Heron.pdok.layermap.nwbvw_vaarwegvakken,

	/* ------------------------------
	 * NWB Spoorwegen
	 * ------------------------------ */
	Heron.pdok.layermap.nwbsw_hectopunten,
	Heron.pdok.layermap.nwbsw_overgangen,
	Heron.pdok.layermap.nwbsw_oversteken,
	Heron.pdok.layermap.nwbsw_spoorvakken,
	Heron.pdok.layermap.nwbsw_treinstations,

	Heron.pdok.layermap.nwbsw_treinstationswfs,
	// Heron.pdok.layermap.nwbsw_spoorvakkenwfs,

	/* ------------------------------
	 * DTB
	 * ------------------------------ */
	Heron.pdok.layermap.dtb_lijnen,
	Heron.pdok.layermap.dtb_punten,
	Heron.pdok.layermap.dtb_vlakken,

	/* ------------------------------
	 * Nationale parken
	 * ------------------------------ */
	Heron.pdok.layermap.nationaleparken,

	/* ------------------------------
	 * Wetlands
	 * ------------------------------ */
	Heron.pdok.layermap.wetlands,

	/* ------------------------------
	 * Beschermde natuurmonumenten
	 * ------------------------------ */
	Heron.pdok.layermap.beschermdenatuurmonumenten,

	/* ------------------------------
	 * NHI
	 * ------------------------------ */
	Heron.pdok.layermap.nhi_dmlinks,
	Heron.pdok.layermap.nhi_dmnodes,

	/* ------------------------------
	 * AHN25m
	 * ------------------------------ */
	Heron.pdok.layermap.ahn25m_ahn25m,
	Heron.pdok.layermap.ahn25m_bladindex,
	Heron.pdok.layermap.ahn25m_puntdichtheidgebieden,
	Heron.pdok.layermap.ahn25m_stadspolygonen,
	Heron.pdok.layermap.ahn25m_vlieglijnen,

	/* ------------------------------
	 * NOK
	 * ------------------------------ */
	Heron.pdok.layermap.nok_bblbuitenbegrenzing,
	Heron.pdok.layermap.nok_ehs,
	Heron.pdok.layermap.nok_rods,

	/* ------------------------------
	 * VIN
	 * ------------------------------ */
	Heron.pdok.layermap.vin_bevaarbaarheid,

	/* ------------------------------
	 * WEGGEG
	 * ------------------------------ */
	Heron.pdok.layermap.weggeg_weggegaantalrijbanen,
	Heron.pdok.layermap.weggeg_weggegmaximumsnelheden,


	/* ------------------------------
	 * Thijs: toevoegingen 17 en 19 januari 2012
	 * ------------------------------ */

	/* ------------------------------
	 * Bestuurlijke grenzen WMS
	 * ------------------------------ */
	/* Heron.pdok.layermap.grenzen_buurten,
	 Heron.pdok.layermap.grenzen_wijken, */
	Heron.pdok.layermap.grenzen_gemeenten2012,
	Heron.pdok.layermap.grenzen_provincies2012,
	Heron.pdok.layermap.grenzen_landsgrens2012,

	/* ------------------------------
	 * TOP10NL WMS en WMTS
	 * ------------------------------ */
	Heron.pdok.layermap.top10nl_wegdeelvlakken,
	Heron.pdok.layermap.top10nl_terreinen,
	Heron.pdok.layermap.top10nl_gebouwen,
	Heron.pdok.layermap.top10nl_inrichtingselementlijnen,
	Heron.pdok.layermap.top10nl_inrichtingselementpunten,
	Heron.pdok.layermap.top10nl_spoorbaandeel_lijnen,
	Heron.pdok.layermap.top10nl_waterdeel_vlakken,
	Heron.pdok.layermap.top10nl_waterdeellijnen,
	Heron.pdok.layermap.top10nl_geo_labels,
	Heron.pdok.layermap.top10nl_functioneelgebied_labels,
	Heron.pdok.layermap.top10nlwmts,

	/* ------------------------------
	 * Thijs: toevoegingen 27 maart 2012
	 * ------------------------------ */

	/* ------------------------------
	 * Basisregsitratie Topografie
	 * ------------------------------ */
	Heron.pdok.layermap.top250raster_top250raster,
	Heron.pdok.layermap.top50raster_top50raster,
	Heron.pdok.layermap.top50vector_vlakken,
	Heron.pdok.layermap.top50vector_huizen,
	Heron.pdok.layermap.top50vector_symline,
	Heron.pdok.layermap.top50vector_lijnen,
	Heron.pdok.layermap.top50vector_sympoint,

	/* ------------------------------
	 * Cultgis
	 * ------------------------------ */
	Heron.pdok.layermap.cultgis_aandachtsgebied,
	Heron.pdok.layermap.cultgis_deellandschap,
	Heron.pdok.layermap.cultgis_elementen,
	Heron.pdok.layermap.cultgis_landschap,
	Heron.pdok.layermap.cultgis_regios,

	/* ------------------------------
	 * NOK2011
	 * ------------------------------ */
	Heron.pdok.layermap.nok2011_begrenzing,
	Heron.pdok.layermap.nok2011_planologischeehs,
	Heron.pdok.layermap.nok2011_verwervinginrichting,


	/* ------------------------------
	 * Bestand Bodemgebruik 2008
	 * ------------------------------ */
	Heron.pdok.layermap.bestandbodemgebruik_bbg2008,
	Heron.pdok.layermap.bestandbodemgebruik_bbg2008_hoofdgroep,

	/* ------------------------------
	 * CBS bevolkingskernen 2008
	 * ------------------------------ */
	Heron.pdok.layermap.bevolkingskernen2008_cbsbevolkingskernen2008,
	Heron.pdok.layermap.bevolkingskernen2008_gemeentegrens_generalisatie_2008,
	Heron.pdok.layermap.bevolkingskernen2008_naamgeving_kernen_40k_plus,
	Heron.pdok.layermap.bevolkingskernen2008_naamgeving_kernen_alles,
	Heron.pdok.layermap.bevolkingskernen2008_provgrens_generalisatie_2008,

	/* ------------------------------
	 * Agrarisch Areaal Nederland
	 * ------------------------------ */
	Heron.pdok.layermap.aan_aan,

	/* ------------------------------
	 * CBS Wijken en buurten 2011
	 * ------------------------------ */
	Heron.pdok.layermap.wijkenbuurten2011_cbs_buurten_2011,
	Heron.pdok.layermap.wijkenbuurten2011_cbs_wijken_2011,
	Heron.pdok.layermap.wijkenbuurten2011_gemeenten2011,
	Heron.pdok.layermap.wijkenbuurten2011_cbs_wijken_2011_dichtheid,
	Heron.pdok.layermap.wijkenbuurten2011_cbs_wijken_2011_huishoudsgrootte,

	/* ------------------------------
	 * CBS Wijken en buurten 2010
	 * ------------------------------ */
	Heron.pdok.layermap.wijkenbuurten2010_cbs_buurten_2010,
	Heron.pdok.layermap.wijkenbuurten2010_cbs_wijken_2010,
	Heron.pdok.layermap.wijkenbuurten2010_gemeenten2010,

	/* ------------------------------
	 * CBS Wijken en buurten 2009
	 * ------------------------------ */
	Heron.pdok.layermap.wijkenbuurten2009_cbs_buurten_2009,
	Heron.pdok.layermap.wijkenbuurten2009_cbs_wijken_2009,
	Heron.pdok.layermap.wijkenbuurten2009_gemeenten2009,


	/* ------------------------------
	 * Natuurmeting op kaart 2007
	 * ------------------------------ */
	Heron.pdok.layermap.nok2007_bblbuitenbegrenzing,
	Heron.pdok.layermap.nok2007_ehs,
	Heron.pdok.layermap.nok2007_rods,


	/* ------------------------------
	 * CBS Vierkanten 100m 2010
	 * ------------------------------ */
	Heron.pdok.layermap.cbsvierkanten_cbs_inwoners_2000_per_hectare,
	Heron.pdok.layermap.cbsvierkanten_cbs_inwoners_2001_per_hectare,
	Heron.pdok.layermap.cbsvierkanten_cbs_inwoners_2002_per_hectare,
	Heron.pdok.layermap.cbsvierkanten_cbs_inwoners_2003_per_hectare,
	Heron.pdok.layermap.cbsvierkanten_cbs_inwoners_2004_per_hectare,
	Heron.pdok.layermap.cbsvierkanten_cbs_inwoners_2005_per_hectare,
	Heron.pdok.layermap.cbsvierkanten_cbs_inwoners_2006_per_hectare,
	Heron.pdok.layermap.cbsvierkanten_cbs_inwoners_2007_per_hectare,
	Heron.pdok.layermap.cbsvierkanten_cbs_inwoners_2008_per_hectare,
	Heron.pdok.layermap.cbsvierkanten_cbs_inwoners_2009_per_hectare,
	Heron.pdok.layermap.cbsvierkanten_cbs_inwoners_2010_per_hectare,
	Heron.pdok.layermap.cbsvierkanten_cbs_verandering_inwoners_2000_2010,
	Heron.pdok.layermap.cbsvierkanten_gem_2010_generalisatie,
	Heron.pdok.layermap.cbsvierkanten_prov_2010_generalisatie

];

/**
 *
 * Initialize GUI and tree
 *
 */

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {
		popupWindow: {
			width: 320,
			height: 200,
			featureInfoPanel: {
                // displayPanels option values are 'Table' and 'Detail', default is 'Table'
                // displayPanels: ['Table', 'Detail']
				// Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoJSON', 'WellKnownText'],
				// Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
				// exportFormats: ['CSV', 'XLS'],
				maxFeatures: 10
			}
		}
	}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{type: "zoomprevious"},
	{type: "zoomnext"},
	{type: "-"},
	{type: "measurelength"},
	{type: "measurearea"},
	/* Thijs: added namedsearch at 27 march 2012 */
	{type: "namesearch",
		// Optional options, see OpenLSSearchCombo.js
		options : {
			xtype : 'hr_openlssearchcombo',
			id: "pdoksearchcombo",
			width: 320,
			listWidth: 400,
			minChars: 4,
			queryDelay: 240,
			zoom: 11,
			url: 'http://geodata.nationaalgeoregister.nl/geocoder/Geocoder?max=5'
		}
/*			emptyText: __('Zoek een adres met de BAG Geocodeerservice'),
			tooltip: __('Zoek een adres met de BAG Geocodeerservice'),    */

	}
];

Heron.pdok.layermap.achtergrondkaart.setVisibility(true);
Heron.pdok.layermap.achtergrondkaart.setIsBaseLayer(false);

// Define a minimal tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
var treeTheme = [
	{
		// Achtergrondkaart is not yet totally publicly available, so do not use it now.
		text:'Achtergrond', expanded: false, children:
			[
				{nodeType: "gx_layer", layer: "Achtergrondkaart", disabled: false }
			]
	},
	{
		text:'PDOK Services zonder restricties', expanded: true, children:
			[
				{
					text:'Agrarisch Areaal Nederland (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "aan" }
						]
				},
				{
					text:'AHN 25m (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "AHN 25m" },
							{nodeType: "gx_layer", layer: "AHN bladindex" },
							{nodeType: "gx_layer", layer: "AHN puntdichtheidgebieden" },
							{nodeType: "gx_layer", layer: "AHN stadspolygonen" },
							{nodeType: "gx_layer", layer: "AHN vlieglijnen" }
						]
				},
				{
					text:'Basisregistratie Topografie (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "TOP50Vector Sympoint" },
							{nodeType: "gx_layer", layer: "TOP50Vector Symline" },
							{nodeType: "gx_layer", layer: "TOP50Vector Lijnen" },
							{nodeType: "gx_layer", layer: "TOP50Vector Huizen" },
							{nodeType: "gx_layer", layer: "TOP50Vector Vlakken" },
							{nodeType: "gx_layer", layer: "TOP50Raster" },
							{nodeType: "gx_layer", layer: "TOP250Raster" }
						]
				},
				{
					text:'Bestand Bodemgebruik 2008 (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "bbg2008" },
							{nodeType: "gx_layer", layer: "bbg2008_hoofdgroep" }
						]
				},
				{
					text:'Bestuurlijke Grenzen (WMS)', children:
						[
							/* {nodeType: "gx_layer", layer: "CBS buurten" },
							 {nodeType: "gx_layer", layer: "CBS wijken" }, */
							{nodeType: "gx_layer", layer: "Gemeente grenzen 2012" },
							{nodeType: "gx_layer", layer: "Provincie grenzen 2012" },
							{nodeType: "gx_layer", layer: "Landsgrens 2012" }
						]
				},
				{
					text:'CBS Bevolkingskernen 2008 (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "cbsbevolkingskernen2008" },
							{nodeType: "gx_layer", layer: "gemeentegrens_generalisatie_2008" },
							{nodeType: "gx_layer", layer: "naamgeving_kernen_40k_plus" },
							{nodeType: "gx_layer", layer: "naamgeving_kernen_alles" },
							{nodeType: "gx_layer", layer: "provgrens_generalisatie_2008" }
						]
				},
				{
					text:'CBS Vierkanten 100m 2010 (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "CBS inwoners 2000 per hectare" },
							{nodeType: "gx_layer", layer: "CBS inwoners 2001 per hectare" },
							{nodeType: "gx_layer", layer: "CBS inwoners 2002 per hectare" },
							{nodeType: "gx_layer", layer: "CBS inwoners 2003 per hectare" },
							{nodeType: "gx_layer", layer: "CBS inwoners 2004 per hectare" },
							{nodeType: "gx_layer", layer: "CBS inwoners 2005 per hectare" },
							{nodeType: "gx_layer", layer: "CBS inwoners 2006 per hectare" },
							{nodeType: "gx_layer", layer: "CBS inwoners 2007 per hectare" },
							{nodeType: "gx_layer", layer: "CBS inwoners 2008 per hectare" },
							{nodeType: "gx_layer", layer: "CBS inwoners 2009 per hectare" },
							{nodeType: "gx_layer", layer: "CBS inwoners 2010 per hectare" },
							{nodeType: "gx_layer", layer: "CBS verandering inwoners 2000-2010" },
							{nodeType: "gx_layer", layer: "CBS gemeente 2010 generalisatie" },
							{nodeType: "gx_layer", layer: "CBS provincie 2010 generalisatie" }
						]
				},
				{
					text:'CBS Wijken en Buurten 2011 (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "cbs_buurten_2011" },
							{nodeType: "gx_layer", layer: "cbs_wijken_2011" },
							{nodeType: "gx_layer", layer: "gemeenten2011" },
							{nodeType: "gx_layer", layer: "Thema: cbs_wijken_2011 bevolkingsdichtheid inwoners per km2" },
							{nodeType: "gx_layer", layer: "Thema: cbs_wijken_2011 huishoudsgrootte" }
						]
				},
				{
					text:'CBS Wijken en Buurten 2010 (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "cbs_buurten_2010" },
							{nodeType: "gx_layer", layer: "cbs_wijken_2010" },
							{nodeType: "gx_layer", layer: "gemeenten2010" }
						]
				},
				{
					text:'CBS Wijken en Buurten 2009 (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "cbs_buurten_2009" },
							{nodeType: "gx_layer", layer: "cbs_wijken_2009" },
							{nodeType: "gx_layer", layer: "gemeenten2009" }
						]
				},
				{
					text:'CultGIS (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "aandachtsgebied" },
							{nodeType: "gx_layer", layer: "deellandschap" },
							{nodeType: "gx_layer", layer: "elementen" },
							{nodeType: "gx_layer", layer: "landschap" },
							{nodeType: "gx_layer", layer: "regio's" }
						]
				},
				{
					text:'Digitaal Topografisch Bestand (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "DTB Lijnen" },
							{nodeType: "gx_layer", layer: "DTB Punten" },
							{nodeType: "gx_layer", layer: "DTB Vlakken" }
						]
				},
				{
					text:'Hydrologisch Instrumentarium (NHI) (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "NHI DM Links" },
							{nodeType: "gx_layer", layer: "NHI DM Nodes" }
						]
				},
				{
					text:'Nationale parken (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "Nationale parken" }
						]
				},
				{
					text:'Natura 2000', children:
						[
							{nodeType: "gx_layer", layer: "Natura 2000 (WMS)" },
							{nodeType: "gx_layer", layer: "Natura 2000 (WMTS)" },
							{nodeType: "gx_layer", layer: "Natura 2000 (TMS)" }
						]
				},
				{
					text:'Nulmeting Op Kaart 2007 (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "NOK 2007 bblbuitenbegrenzing" },
							{nodeType: "gx_layer", layer: "NOK 2007 EHS" },
							{nodeType: "gx_layer", layer: "NOK 2007 RODS" }
						]
				},
				{
					text:'Natuurmeting Op Kaart 2010 (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "BBL buitenbegrenzing" },
							{nodeType: "gx_layer", layer: "EHS" },
							{nodeType: "gx_layer", layer: "RODS" }
						]
				},
				{
					text:'Natuurmeting Op Kaart 2011 (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "begrenzing" },
							{nodeType: "gx_layer", layer: "planologische EHS" },
							{nodeType: "gx_layer", layer: "verwervinginrichting" }
						]
				},
				{
					text:'NWB Spoorwegen (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "Hectopunten spoor" },
							{nodeType: "gx_layer", layer: "Overgangen" },
							{nodeType: "gx_layer", layer: "Oversteken" },
							{nodeType: "gx_layer", layer: "Spoorvakken" },
							{nodeType: "gx_layer", layer: "Treinstations" }
						]
				},
				{
					text:'NWB Spoorwegen (WFS)', children:
						[
							// {nodeType: "gx_layer", layer: "Spoorvakken (WFS)" },
							{nodeType: "gx_layer", layer: "Treinstations (WFS)" }
						]
				},
				{
					text:'NWB Vaarwegen (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "Kilometermarkeringen" },
							{nodeType: "gx_layer", layer: "Vaarwegvakken" }
						]
				},
				{
					text:'NWB Wegen (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "Hectopunten wegen" },
							{nodeType: "gx_layer", layer: "Wegvakken" }
						]
				},
				{
					text:'TOP10NL', children:
						[
							{nodeType: "gx_layer", layer: "TOP10NL alle lagen (WMTS)" },
							{nodeType: "gx_layer", layer: "TOP10NL terreinen"},
							{nodeType: "gx_layer", layer: "TOP10NL wegdeelvlakken"},
							{nodeType: "gx_layer", layer: "TOP10NL gebouwen"},
							{nodeType: "gx_layer", layer: "TOP10NL waterdeelvlakken"},
							{nodeType: "gx_layer", layer: "TOP10NL waterdeellijnen"},
							{nodeType: "gx_layer", layer: "TOP10NL spoorbaandeellijnen"},
							{nodeType: "gx_layer", layer: "TOP10NL inrichtingselementlijnen"},
							{nodeType: "gx_layer", layer: "TOP10NL inrichtingselementpunten"},
							{nodeType: "gx_layer", layer: "TOP10NL geografische namen"},
							{nodeType: "gx_layer", layer: "TOP10NL functioneelgebied labels"}

						]
				},
				{
					text:'VIN Bevaarbaarheid (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "Bevaarbaarheid" }
						]
				},
				{
					text:'WegGeg (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "Aantal rijbanen" },
							{nodeType: "gx_layer", layer: "Maximum snelheden" }
						]
				},
				{
					text:'Wetlands (WMS)', children:
						[
							{nodeType: "gx_layer", layer: "Wetlands" }
						]
				}
			]
	}
];

// The content of the HTML info panel.
Ext.namespace("Heron.options.info");
Heron.options.info.html =
'<div class="hr-html-panel-body"><p>This is the Heron Mapping Client.' +
							'</p><br/><p>This viewer and in fact the entire website has been made with the Open Source' +
							' project <a href="http://heron-mc.org" target="_new" >Heron Mapping Client</a>. This on ' +
							'<a href="http://geoext.org">GeoExt</a>-based Viewer is very flexible and extensible ' +
							'See examples like <a href="http://inspire.kademo.nl" target="_new">Heron MC for Kademo INSPIRE</a>.</p><br/></div>'

// Replace default layer browser DefaultConfig.js
// Pass our theme tree config as an option
Ext.namespace("Heron.options.layertree");

Heron.options.layertree.tree = treeTheme;
