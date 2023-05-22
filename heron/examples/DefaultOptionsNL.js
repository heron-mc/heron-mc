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

/** Heron Map Options (Dutch Maps and Overlays) */

Ext.namespace("Heron.options");
Ext.namespace("Heron.scratch");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
OpenLayers.DOTS_PER_INCH = 25.4 / 0.28;

Ext.BLANK_IMAGE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';

/**
 * Options for MapPanel
 * These will be assigned as "hropts" within the global config
 * "scratch" is just for convenience.
 *
 **/
Ext.namespace("Heron.options.map");
Ext.namespace("Heron.PDOK");

/** Use these in  services where the server has less resolutions than the Map, OL will "blowup" lower resolutions */
Heron.options.serverResolutions = {
    zoom_0_12: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840],
    zoom_0_13: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
    zoom_0_14: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210],
    zoom_0_15: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105],
    zoom_0_16: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525]
};

/**
 * Standard tiling "richtlijn" Netherlands:
 * upperleft: X=-285.401,920 Y=903.401,920;
 * lowerright: X=595.401,920 Y=22.598,080;
 * lowerleft: X=-285.401,920  Y=22.598,080;
 * This results in:
 * maxExtent: '-285401.920,22598.080,595401.920,903401.920'
 * on zoomLevel 2 more common for NL:
 * maxExtent: '-65200.96,242799.04,375200.96,683200.96',
 * but when using TMS all levels needed
 * scales:
 - 750
 - 1500
 - 3000
 - 6000
 - 12000
 - 24000
 - 48000
 - 96000
 - 192000
 - 384000
 - 768000
 - 1536000
 - 3072000
 - 6144000
 - 12288000
 * PDOK (follows tiling standard NL):
 *     baseURL: 'https://geodata.nationaalgeoregister.nl',
 *     TMS: 'https://geodata.nationaalgeoregister.nl/tiles/service/tms/',
 *     WMTS:  'https://geodata.nationaalgeoregister.nl/tiles/service/wmts',
 *     tileOriginLL: new OpenLayers.LonLat(-285401.920, 22598.080),
 *     tileOriginUL: new OpenLayers.LonLat(-285401.920, 903401.920),
 *     tileFullExtent:    new OpenLayers.Bounds(-285401.920, 22598.080, 595401.920, 903401.920),
 *     serverResolutions : [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
 */

Heron.options.map.settings = {
    projection: 'EPSG:28992',
    units: 'm',
    /** Using the PDOK/Geonovum NL Tiling rec. */
    resolutions: Heron.options.serverResolutions.zoom_0_16,
    maxExtent: '-285401.920, 22598.080, 595401.920, 903401.920',

//	resolutions: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
//	maxExtent: '-65200.96,242799.04,375200.96,683200.96',
    center: '155000,463000',
    xy_precision: 3,
    zoom: 2,
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

    /** You can always control which controls are to be added to the map. */
    /* controls : [
     new OpenLayers.Control.Attribution(),
     new OpenLayers.Control.ZoomBox(),
     new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: true}}),
     new OpenLayers.Control.LoadingPanel(),
     new OpenLayers.Control.PanPanel(),
     new OpenLayers.Control.ZoomPanel(),
     new OpenLayers.Control.OverviewMap(),
     new OpenLayers.Control.ScaleLine({geodesic: true, maxWidth: 200})
     ] */
};

Heron.scratch.urls = {
    ALTERRA_WMS: 'http://www.geodata.alterra.nl/topoxplorer/TopoXplorerServlet?',
    PDOK: 'https://geodata.nationaalgeoregister.nl',
    PDOK_SRV: 'https://service.pdok.nl',
    MAP5_TMS: 'https://s.map5.nl/map/gast/tms/',
    MAP5_WMS: 'https://s.map5.nl/map/gast/service?',
    GS2_OWS: 'https://ws.nlextract.nl/gs2/ows?',
    GWC_TMS: 'https://ws.nlextract.nl/gwc/service/tms/',
    KNMI_WMS_RADAR: 'http://geoservices.knmi.nl/cgi-bin/RADNL_OPER_R___25PCPRR_L3.cgi?',
    OPENBASISKAART_TMS: 'https://openbasiskaart.nl/mapcache/tms'
};

// https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=standaard&STYLE=default&TILEMATRIXSET=EPSG:28992&TILEMATRIX=6&TILEROW=34&TILECOL=30&FORMAT=image/png
Heron.PDOK.urls = {
    PDOKTMS: Heron.scratch.urls.PDOK + '/tiles/service/tms/',
    WMTS: Heron.scratch.urls.PDOK + '/tiles/service/wmts',
    WMTS_LUFO: Heron.scratch.urls.PDOK_SRV + '/hwh/luchtfotorgb/wmts/v1_0?',
    WMTS_BRT_A: Heron.scratch.urls.PDOK_SRV + '/brt/achtergrondkaart/wmts/v2_0?',
    ADRESSEN: Heron.scratch.urls.PDOK + '/inspireadressen/ows?',
    BAG: Heron.scratch.urls.PDOK + '/bag/ows?',
    KADKAART: Heron.scratch.urls.PDOK + '/kadastralekaartv3/ows?',
    NATURA2000: Heron.scratch.urls.PDOK + '/natura2000/wms?',
    NATURA2000WMTS: Heron.scratch.urls.PDOK + '/tiles/service/wmts/natura2000?',
    NWBWEGEN: Heron.scratch.urls.PDOK + '/nwbwegen/wms?',
    NWBVAARWEGEN: Heron.scratch.urls.PDOK + '/nwbvaarwegen/wms?',
    NWBSPOORWEGEN: Heron.scratch.urls.PDOK + '/nwbspoorwegen/wms?',
    NWBSPOORWEGENWFS: Heron.scratch.urls.PDOK + '/nwbspoorwegen/wfs?',
    DTB: Heron.scratch.urls.PDOK + '/digitaaltopografischbestand/wms?',
    NATIONALEPARKEN: Heron.scratch.urls.PDOK + '/nationaleparken/wms?',
    WETLANDS: Heron.scratch.urls.PDOK + '/wetlands/wms?',
    BESCHERMDENATUURMONUMENTEN: Heron.scratch.urls.PDOK + '/beschermdenatuurmonumenten/wms?',
    NHI: Heron.scratch.urls.PDOK + '/nhi/wms?',
    AHN25M: Heron.scratch.urls.PDOK + '/ahn25m/wms?',
    NOK: Heron.scratch.urls.PDOK + '/nok2010/wms?',
    VIN: Heron.scratch.urls.PDOK + '/vin/wms?',
    WEGGEG: Heron.scratch.urls.PDOK + '/weggeg/wms?',
    BESTUURLIJKEGRENZEN: Heron.scratch.urls.PDOK + '/bestuurlijkegrenzen/wms?',
    TOP10NL: Heron.scratch.urls.PDOK + '/top10nl/wms?',
    TOP10NLWMTS: Heron.scratch.urls.PDOK + '/tiles/service/wmts/top10nl?',
    TOP250RASTER: Heron.scratch.urls.PDOK + '/top250raster/wms?',
    TOP50RASTER: Heron.scratch.urls.PDOK + '/top50raster/wms?',
    TOP50VECTOR: Heron.scratch.urls.PDOK + '/top50vector/wms?',
    CULTGIS: Heron.scratch.urls.PDOK + '/cultgis/wms?',
    NOK2011: Heron.scratch.urls.PDOK + '/nok2011/wms?',
    BESTANDBODEMGEBRUIK2008: Heron.scratch.urls.PDOK + '/bestandbodemgebruik2008/wms?',
    BEVOLKINGSKERNEN2008: Heron.scratch.urls.PDOK + '/bevolkingskernen2008/wms?',
    AAN: Heron.scratch.urls.PDOK + '/aan/wms?',
    WIJKENBUURTEN2011: Heron.scratch.urls.PDOK + '/wijkenbuurten2011/wms?',
    WIJKENBUURTEN2010: Heron.scratch.urls.PDOK + '/wijkenbuurten2010/wms?',
    WIJKENBUURTEN2009: Heron.scratch.urls.PDOK + '/wijkenbuurten2009/wms?',
    CBSVIERKANTEN100m2010: Heron.scratch.urls.PDOK + '/cbsvierkanten100m2010/wms?',
    NOK2007: Heron.scratch.urls.PDOK + '/nok2007/wms?',
    LAWROUTES: Heron.scratch.urls.PDOK + '/landelijke-wandelroutes/wms?',
    LFROUTES: Heron.scratch.urls.PDOK + '/lfroutes/wms?',
    RDINFO: Heron.scratch.urls.PDOK + '/rdinfo/wms?',
    STREEKPADEN: Heron.scratch.urls.PDOK + '/streekpaden/wms?'
};

Ext.namespace("Heron.options.wfs");
Heron.options.wfs.downloadFormats = [
    {
        name: 'CSV',
        outputFormat: 'csv',
        fileExt: '.csv'
    }
//    {
//        name: 'GML (version 2.1.2)',
//        outputFormat: 'text/xml; subtype=gml/2.1.2',
//        fileExt: '.gml'
//    },
//    {
//        name: 'ESRI Shapefile (zipped)',
//        outputFormat: 'SHAPE-ZIP',
//        fileExt: '.zip'
//    },
//    {
//        name: 'GeoJSON',
//        outputFormat: 'json',
//        fileExt: '.json'
//    }
];

// For WMTS layers in EPSG:28992
Heron.PDOK.scales = [750, 1500, 3000, 6000, 12000, 24000, 48000, 96000, 192000, 384000, 768000, 1536000, 3072000, 6144000, 12288000];
Heron.PDOK.matrixIds = new Array(15);
for (var i = 0; i < 15; ++i) {
    Heron.PDOK.matrixIds[i] = {
        identifier: "" + i,
        topLeftCorner: {lon: -285401.920, lat: 903401.920},
        matrixWidth: Math.pow(2, i),
        matrixHeight: Math.pow(2, i),
        scaleDenominator: Heron.PDOK.scales[14 - i],
        tileWidth: 256,
        tileHeight: 256
    };
}

Heron.scratch.layermap = {
    /*
     * ==================================
     *            BaseLayers
     * ==================================
     */

    // pdok_brtachtergrondkaart: ["OpenLayers.Layer.TMS", "BRT Achtergrondkaart",
    //     Heron.PDOK.urls.PDOKTMS,
    //     {
    //         layername: 'brtachtergrondkaart/EPSG:28992',
    //         type: "png",
    //         serverResolutions: Heron.options.serverResolutions.zoom_0_14,
    //         isBaseLayer: true,
    //         transparent: true,
    //         bgcolor: "0xffffff",
    //         visibility: false,
    //         singleTile: false,
    //         alpha: true,
    //         opacity: 1.0,
    //         attribution: "Bron: BRT Achtergrondkaart, � <a href='http://openstreetmap.org/'>OpenStreetMap</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-By-SA</a>",
    //         transitionEffect: 'resize'
    //     }],

    pdok_brtachtergrondkaart: new OpenLayers.Layer.WMTS({
        name: "BRT Achtergrondkaart",
        url: Heron.PDOK.urls.WMTS_BRT_A,
        layer: "standaard",
        matrixSet: "EPSG:28992",
        matrixIds: Heron.PDOK.matrixIds,
        tileOrigin: new OpenLayers.LonLat(-285401.920, 903401.920),
        format: "image/png",
        visibility: false,
        style: "default",
        opacity: 1.0,
        isBaseLayer: true,
        attribution: "Bron: BRT Achtergrondkaart, � <a href='http://openstreetmap.org/'>OpenStreetMap</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-By-SA</a>",
        queryable: false
    }),

    openbasiskaart_osm: ["OpenLayers.Layer.TMS", "OpenBasisKaart OSM",
        Heron.scratch.urls.OPENBASISKAART_TMS,
        {
            layername: 'osm@rd',
            type: "png",
            serverResolutions: Heron.options.serverResolutions.zoom_0_13,
            isBaseLayer: true,
            transparent: true,
            bgcolor: "0xffffff",
            visibility: true,
            singleTile: false,
            alpha: true,
            opacity: 1.0,
            attribution: "(C) <a href='https://openbasiskaart.nl'>OpenBasisKaart</a><br/>Data <a href='http://www.openstreetmap.org/copyright'>CC-By-SA</a> <a href='http://openstreetmap.org/'>OpenStreetMap</a> ",
            transitionEffect: 'resize'
        }],

    /* Combinatie top250/50/25 via map5.nl */
    topraster: ["OpenLayers.Layer.TMS",
        "TopRaster Map5.nl",
        Heron.scratch.urls.MAP5_TMS,
        {
            layername: 'topraster/EPSG28992',
            type: "jpeg",
            isBaseLayer: true,
            transparent: false,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            serverResolutions: Heron.options.serverResolutions.zoom_0_16,
            alpha: true,
            opacity: 1.0,
            attribution: "CC by CA <a href='http://www.kadaster.nl'>Kadaster</a> <br/>Tiling <a href='http://map5.nl'>map5.nl</a>",
            transitionEffect: 'resize'
        }
    ],
    /* map5topo kaarten via map5.nl */
    opentopo: ["OpenLayers.Layer.TMS",
        "map5topo TMS (map5.nl)",
        Heron.scratch.urls.MAP5_TMS,
        {
            layername: 'map5topo/EPSG28992',
            type: "jpeg",
            isBaseLayer: true,
            transparent: false,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            serverResolutions: Heron.options.serverResolutions.zoom_0_16,
            alpha: true,
            opacity: 1.0,
            attribution: "CC by CA <a href='http://www.opentopo.nl'>opentopo.nl</a> <br/>Tiling <a href='http://map5.nl'>map5.nl</a>",
            transitionEffect: 'resize'
        }
    ],

    /*
     * Areal images PDOK.
     */
    luchtfotopdok: new OpenLayers.Layer.WMTS({
        name: "Luchtfoto (PDOK)",
        url: Heron.PDOK.urls.WMTS_LUFO,
        layer: "Actueel_orthoHR",
        matrixSet: "EPSG:28992",
        matrixIds: Heron.PDOK.matrixIds,
        tileOrigin: new OpenLayers.LonLat(-285401.920, 903401.920),
        format: "image/jpeg",
        visibility: false,
        style: "default",
        opacity: 1.0,
        isBaseLayer: true,
        attribution: "Bron: PDOK CC-By-SA",
        queryable: false
    }),

    blanco: ["OpenLayers.Layer.Image",
        "Blanco",
        Ext.BLANK_IMAGE_URL,
        OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
        new OpenLayers.Size(10, 10),
        {
            resolutions: Heron.options.map.settings.resolutions,
            isBaseLayer: true,
            visibility: false,
            displayInLayerSwitcher: true,
            transitionEffect: 'resize'
        }
    ],

    /** OVERLAYS **/

    /*
     * PDOK: BAG Adressen
     */
    bag_adressen: ["OpenLayers.Layer.WMS",
        "BAG - Adressen",
        Heron.PDOK.urls.ADRESSEN,
        {layers: "inspireadressen", format: "image/png", transparent: true},
        {
            maxResolution: 6.72, isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'inspireadressen',
                    featureNS: 'http://inspireadressen.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 1000000,
                    maxQueryLength: 10000
                }
            }
        }
    ],

    /*
     * PDOK: BagViewer Lagen
     */
    bag_panden: ["OpenLayers.Layer.WMS",
        "BAG - Panden",
        Heron.PDOK.urls.BAG,
        {layers: "pand", format: "image/png", transparent: true},
        {
            maxResolution: 1.68, isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            disallowPrinting: false,
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'pand',
                    featureNS: 'http://bag.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 1000000,
                    maxQueryLength: 10000
                }
            }
        }
    ],
    
    bag_panden_wfs: ["OpenLayers.Layer.Vector", "BAG - Panden (WFS)", {
        maxResolution: 0.84,
        strategies: [new OpenLayers.Strategy.BBOX()],
        visibility: false,
        styleMap: new OpenLayers.StyleMap(
            {'strokeColor': '#222222', 'fillColor': '#eeeeee', graphicZIndex: 1, fillOpacity: 0.8}),
        protocol: new OpenLayers.Protocol.WFS({
            url: Heron.PDOK.urls.BAG,
            featureType: "pand",
            featureNS: "http://bag.geonovum.nl",
            geometryName: 'geometrie'
        })
    }],

    bag_woonplaatsen_wfs: ["OpenLayers.Layer.Vector", "BAG - Woonplaatsen (WFS)", {
        maxResolution: 26.88,
        strategies: [new OpenLayers.Strategy.BBOX()],
        visibility: false,
        styleMap: new OpenLayers.StyleMap(
            {'strokeColor': '#222222', 'fillColor': '#cccccc', graphicZIndex: 1, fillOpacity: 0.6}),
        protocol: new OpenLayers.Protocol.WFS({
            url: Heron.PDOK.urls.BAG,
            featureType: "woonplaats",
            featureNS: "http://bag.geonovum.nl",
            geometryName: 'geometrie'
        })
    }],

    /*
     * PDOK: BagViewer Lagen
     */
    bag_verblijfsobjecten: ["OpenLayers.Layer.WMS",
        "BAG - Verblijfsobjecten",
        Heron.PDOK.urls.BAG,
        {layers: "verblijfsobject", format: "image/png", transparent: true},
        {
            maxResolution: 1.68, isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'verblijfsobject',
                    featureNS: 'http://bag.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 1000000,
                    maxQueryLength: 10000
                }
            }
        }
    ],

    /*
     * PDOK: NWB Wegen
     */
    nwb_wegen: ["OpenLayers.Layer.WMS",
        "NWB - Wegen",
        Heron.PDOK.urls.NWBWEGEN,
        {layers: "wegvakken", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'nwbwegen',
                    featureNS: 'http://nwbwegen.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 10000000,
                    maxQueryLength: 10000
                }
            }
        }
    ],

    /*
     * PDOK: Lange Afstands Wandelpaden
     */
    lawroutes: ["OpenLayers.Layer.WMS",
        "Lange Afstands Wandelroutes",
        Heron.PDOK.urls.LAWROUTES,
        {layers: "lawroutes", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'
        }
    ],

    /*
     * PDOK: Streekpaden
     */
    streekpaden: ["OpenLayers.Layer.WMS",
        "Streekpaden",
        Heron.PDOK.urls.STREEKPADEN,
        {layers: "streekpaden", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'
        }
    ],

    /*
     * PDOK: Landelijke Fietsroutes
     */
    lfroutes: ["OpenLayers.Layer.WMS",
        "Landelijke Fietsroutes",
        Heron.PDOK.urls.LFROUTES,
        {layers: "lfroutes", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'
        }
    ],

    /*
     * PDOK: RD Info Punten
     */
    rdinfopunten: ["OpenLayers.Layer.WMS",
        "RD Info - Punten",
        Heron.PDOK.urls.RDINFO,
        {layers: "punten", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'punten',
                    featureNS: 'http://rdinfo.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 750000000,
                    maxQueryLength: 500000
                }
            }
        }
    ],

    /*
     * PDOK: RD Info Stations
     */
    rdinfostations: ["OpenLayers.Layer.WMS",
        "RD Info - Stations",
        Heron.PDOK.urls.RDINFO,
        {layers: "stations", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'stations',
                    featureNS: 'http://rdinfo.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 750000000,
                    maxQueryLength: 500000
                }
            }
        }
    ],

    /*
     * PDOK: Natura 2000 (TMS + WMTS for testing)
     */
    natura2000: ["OpenLayers.Layer.WMS",
        "Natura 2000",
        Heron.PDOK.urls.NATURA2000,
        {layers: "natura2000", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'natura2000',
                    featureNS: 'http://natura2000.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats
                }
            }
        }
    ],

    natura2000wmts: new OpenLayers.Layer.WMTS({
        name: "Natura 2000 (WMTS)",
        url: Heron.PDOK.urls.NATURA2000WMTS,
        layer: "natura2000",
        matrixSet: "EPSG:28992",
        matrixIds: Heron.PDOK.matrixIds,
        tileOrigin: new OpenLayers.LonLat(-285401.920, 903401.920),
        format: "image/png",
        visibility: false,
        style: "_null",
        opacity: 0.7,
        isBaseLayer: false,
        featureInfoFormat: "application/vnd.ogc.gml",
        queryable: true
    }),

    /*
     * Historic overlays
     */
    bonne1865: ["OpenLayers.Layer.WMS", "Historische Topo Kaart (1865)",
        Heron.scratch.urls.ALTERRA_WMS,
        {'layers': 'BONNE_1865', 'format': 'image/png'},
        {
            'isBaseLayer': false,
            singleTile: true,
            visibility: false,
            alpha: true,
            opacity: 0.7,
            hideInLegend: true,
            transitionEffect: 'resize'
        }
    ],
    bonne1900: ["OpenLayers.Layer.WMS", "Historische Topo Kaart (1900)",
        Heron.scratch.urls.ALTERRA_WMS,
        {'layers': 'BONNE_1900', 'format': 'image/png'},
        {
            'isBaseLayer': false,
            singleTile: true,
            visibility: false,
            alpha: true,
            opacity: 0.7,
            hideInLegend: true,
            transitionEffect: 'resize'
        }
    ],
    bonne1915: ["OpenLayers.Layer.WMS", "Historische Topo Kaart (1915)",
        Heron.scratch.urls.ALTERRA_WMS,
        {'layers': 'BONNE_1915', 'format': 'image/png'},
        {
            'isBaseLayer': false,
            singleTile: true,
            visibility: false,
            alpha: true,
            opacity: 0.7,
            hideInLegend: true,
            transitionEffect: 'resize'
        }
    ],
    bonne1925: ["OpenLayers.Layer.WMS", "Historische Topo Kaart (1925)",
        Heron.scratch.urls.ALTERRA_WMS,
        {'layers': 'BONNE_1925', 'format': 'image/png'},
        {
            'isBaseLayer': false,
            singleTile: true,
            visibility: false,
            alpha: true,
            opacity: 0.7,
            hideInLegend: true,
            transitionEffect: 'resize'
        }
    ],

    bonne1949: ["OpenLayers.Layer.WMS", "Historische Topo Kaart (1949)",
        Heron.scratch.urls.ALTERRA_WMS,
        {'layers': 'BONNE_1949', 'format': 'image/png'},
        {
            'isBaseLayer': false,
            singleTile: true,
            visibility: false,
            alpha: true,
            opacity: 0.7,
            hideInLegend: true,
            transitionEffect: 'resize'
        }
    ],

    tmk1850: ["OpenLayers.Layer.WMS", "Militaire Kaart (1850)",
        Heron.scratch.urls.ALTERRA_WMS,
        {'layers': 'TMK_KLEUR_1850', 'format': 'image/png'},
        {
            'isBaseLayer': false,
            singleTile: true,
            visibility: false,
            alpha: true,
            opacity: 0.7,
            hideInLegend: true,
            transitionEffect: 'resize'
        }
    ],

    /*
     * AHN - Algemeen Hoogtebestand NL - DEM colour relief Netherlands
     */
    ahndem2: ["OpenLayers.Layer.WMS",
        "NL Height Map",
        Heron.PDOK.urls.AHN25M,
        {layers: "ahn25m", format: "image/png"},
        {
            isBaseLayer: false,
            singleTile: true,
            visibility: false,
            featureInfoFormat: "application/vnd.ogc.gml",
            transitionEffect: 'resize'
        }
    ],

    /*
     * Hockeyclubs
     */
    hockeyclubs: ["OpenLayers.Layer.WMS",
        "Hockeyclubs",
        Heron.scratch.urls.GS2_OWS,
        {layers: "hockeyclubs", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true, opacity: 0.7,
            maxExtent: new OpenLayers.Bounds(22000, 310000, 265000, 600000),
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'kad',
                    featureNS: 'http://innovatie.kadaster.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats
                }
            }
        }
    ],

    /*
     * Aardbevingen
     *  KNMI Aardbevingen: vanuit http://www.knmi.nl/seismologie/aardbevingen-nederland.html
     */
    aardbevingen: ["OpenLayers.Layer.WMS",
        "KNMI Aardbevingen",
        Heron.scratch.urls.GS2_OWS,
        {layers: "heron:knmi_aardbevingen_4326", format: "image/png", transparent: true},
        {
            isBaseLayer: false, singleTile: true, visibility: false, alpha: true, opacity: 0.7,

            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'heron',
                    featureNS: 'http://heron-mc.org',
                    downloadFormats: Heron.options.wfs.downloadFormats
                }
            }
        }
    ],

    /*
     * RD info
     */
    rdstations: ["OpenLayers.Layer.WMS",
        "RD stations",
        Heron.scratch.urls.GS2_OWS,
        {layers: "rdinfo_rdstations", format: "image/gif", transparent: true},
        {
            isBaseLayer: false,
            singleTile: true,
            visibility: false,
            featureInfoFormat: "application/vnd.ogc.gml",
            transitionEffect: 'resize'
        }
    ],

    /*
     * Ecologische Hoofdstructuur (EHS)
     */
    ehs: ["OpenLayers.Layer.WMS", "Ecologische Hoofdstructuur",
        Heron.scratch.urls.GS2_OWS,
        {'layers': 'ehs_alles', 'format': 'image/png', transparent: true},
        {
            'isBaseLayer': false,
            singleTile: true,
            visibility: false,
            alpha: true,
            opacity: 0.7,
            hideInLegend: true,
            transitionEffect: 'resize'
        }
    ],

    /** Natura 2000 (PDOK) */
    natura2000tms: ["OpenLayers.Layer.TMS", "Natura 2000 (TMS)",
        Heron.PDOK.urls.PDOKTMS,
        {
            layername: 'natura2000/EPSG:28992',
            type: 'png',
            isBaseLayer: false,
            transparent: true,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            transitionEffect: 'resize'
        }],

    /*
     * KNMI Radar
     */
    knmi_radar_bw: ["OpenLayers.Layer.WMS", "KNMI Radar",
        Heron.scratch.urls.KNMI_WMS_RADAR,
        {'layers': 'RADNL_OPER_R___25PCPRR_L3_KNMI', 'format': 'image/png', transparent: true},
        {'isBaseLayer': false, singleTile: true, visibility: false, transitionEffect: 'resize'}
    ],

    knmi_radar_color: ["OpenLayers.Layer.WMS", "KNMI Radar Color",
        Heron.scratch.urls.KNMI_WMS_RADAR,
        {'layers': 'RADNL_OPER_R___25PCPRR_L3_COLOR', 'format': 'image/png', transparent: true},
        {'isBaseLayer': false, singleTile: true, visibility: false, transitionEffect: 'resize'}
    ],

    // TODO
    // Add: http://geoservices.knmi.nl/cgi-bin/INTER_OPER_R___OBSERV__L3.cgi?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetCapabilities
    // (daily precipitation)

    /* ------------------------------
     * LKI Kadastrale Vlakken
     * ------------------------------ */
    lki_vlakken: ["OpenLayers.Layer.WMS", "Kadastrale Vlakken",
        Heron.PDOK.urls.KADKAART,
        {layers: "perceel", format: "image/png", transparent: true},
        {
            maxResolution: 0.84, isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
            featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize',
            metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'kadastralekaartv3',
                    featureNS: 'http://kadastralekaartv3.geonovum.nl',
                    downloadFormats: Heron.options.wfs.downloadFormats,
                    maxQueryArea: 10000000,
                    maxQueryLength: 10000
                }
            }
        }
    ],


    /*
     * Cadastral Parcels The Netherlands - current.
     */
    lki_vlakken_tiled: ["OpenLayers.Layer.TMS",
        "Kadastrale Vlakken (tiled)",
        Heron.PDOK.urls.PDOKTMS,
        {
            layername: 'kadastralekaartv3/EPSG:28992',
            type: "png",
            isBaseLayer: false,
            transparent: true,
            visibility: false
        }
    ],

    kadkaart: ["OpenLayers.Layer.WMS", "Kadastrale Kaart Alles",
        Heron.scratch.urls.GS2_OWS,
        {layers: "kadkaart", format: "image/png", transparent: true},
        {isBaseLayer: false, singleTile: true, visibility: false, alpha: true, opacity: 0.7, transitionEffect: 'resize'}

    ],

    kadkaart_tiled: ["OpenLayers.Layer.TMS",
        "Kadastrale Kaart Alles (tiled)",
        Heron.PDOK.urls.PDOKTMS,
        {
            layername: 'kadastralekaartv3/EPSG:28992',
            type: "png",
            maxResolution: 0.84,
            serverResolutions: Heron.options.serverResolutions.zoom_0_14,
            isBaseLayer: false,
            transparent: true,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            alpha: true, opacity: 0.7,
            transitionEffect: 'resize'
        }
    ]
};


/** Collect layers from above, these are actually added to the map.
 * One could also define the layer objects here immediately.
 * */
Heron.options.map.layers = [
    /*
     * ==================================
     *            BaseLayers
     * ==================================
     */
//	Heron.scratch.layermap.pdok_natura2000_wmts,
    Heron.scratch.layermap.openbasiskaart_osm,
    Heron.scratch.layermap.pdok_brtachtergrondkaart,
    Heron.scratch.layermap.topraster,
    Heron.scratch.layermap.opentopo,
    Heron.scratch.layermap.luchtfotopdok,
    Heron.scratch.layermap.blanco,

    /*
     * ==================================
     *            OVERLAYS
     * ==================================
     */

    /** BAG PDOK. */
    Heron.scratch.layermap.bag_adressen,
    Heron.scratch.layermap.bag_panden,
    // Heron.scratch.layermap.bag_panden_selected,
    Heron.scratch.layermap.bag_panden_wfs,
    Heron.scratch.layermap.bag_woonplaatsen_wfs,

    Heron.scratch.layermap.bag_verblijfsobjecten,
    Heron.scratch.layermap.nwb_wegen,
    Heron.scratch.layermap.lawroutes,
    Heron.scratch.layermap.streekpaden,
    Heron.scratch.layermap.lfroutes,

    Heron.scratch.layermap.knmi_radar_color,
    Heron.scratch.layermap.knmi_radar_bw,

    /* ------------------------------
     * DEM NL Colour Relief
     * ------------------------------ */
    Heron.scratch.layermap.ahndem2,

    /* ------------------------------
     * Hockeyclubs
     * ------------------------------ */
    Heron.scratch.layermap.hockeyclubs,

    /* ------------------------------
     * RD info
     * ------------------------------ */
    Heron.scratch.layermap.rdinfopunten,
    Heron.scratch.layermap.rdinfostations,

    /* ------------------------------
     * Ecologische Hoofdstructuur (EHS)
     * ------------------------------ */
//	Heron.scratch.layermap.ehs,
    Heron.scratch.layermap.natura2000,
    Heron.scratch.layermap.natura2000tms,
    Heron.scratch.layermap.natura2000wmts,

    /* ------------------------------
     * LKI Kadastrale Vlakken
     * ------------------------------ */
    Heron.scratch.layermap.lki_vlakken,
    Heron.scratch.layermap.kadkaart_tiled

];

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
    /*	{type: "scale"},   Leave out: see https://github.com/heron-mc/heron-mc/issues/116 */
    {
        type: "featureinfo", options: {
        popupWindow: {
            width: 360,
            height: 200,
            featureInfoPanel: {
                showTopToolbar: true,
                displayPanels: ['Table'],
                // Should column-names be capitalized? Default true.
                columnCapitalize: true,
                hideColumns: ['objectid', 'gid'],

                // Export to download file. Option values are 'CSV', 'XLS', or a Formatter object (see FeaturePanel) , default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile',
                    {
                        name: 'Esri Shapefile (WGS84)',
                        formatter: 'OpenLayersFormatter',
                        format: 'OpenLayers.Format.GeoJSON',
                        targetFormat: 'ESRI Shapefile',
                        targetSrs: 'EPSG:4326',
                        fileExt: '.zip',
                        mimeType: 'application/zip'
                    },
                    {
                        // Try this with PDOK Streekpaden and Fietsroutes :-)
                        name: 'GPS File (GPX)',
                        formatter: 'OpenLayersFormatter',
                        format: 'OpenLayers.Format.GeoJSON',
                        targetSrs: 'EPSG:4326',
                        targetFormat: 'GPX',
                        fileExt: '.gpx',
                        mimeType: 'text/plain'
                    },
                    {
                        name: 'OGC GeoPackage (EPSG:28992)',
                        formatter: 'OpenLayersFormatter',
                        format: 'OpenLayers.Format.GeoJSON',
                        targetFormat: 'GPKG',
                        fileExt: '.gpkg',
                        mimeType: 'application/binary'
                    },
                    {
                        name: 'OGC GeoPackage (WGS84)',
                        formatter: 'OpenLayersFormatter',
                        format: 'OpenLayers.Format.GeoJSON',
                        targetFormat: 'GPKG',
                        targetSrs: 'EPSG:4326',
                        fileExt: '.gpkg',
                        mimeType: 'application/binary'
                    },
                    'GeoJSON', 'WellKnownText'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                // exportFormats: ['CSV', 'XLS'],
                maxFeatures: 10,

                // In case that the same layer would be requested more than once: discard the styles
                discardStylesForDups: true
            }
        }
    }
    },
    {type: "-"},
    {type: "pan"},
//    {type: "pan", options: {iconCls: "icon-hand"}},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "coordinatesearch", options: {onSearchCompleteZoom: 8}},
    {type: "-"},
    {type: "zoomprevious"},
    {type: "zoomnext"},
    {type: "-"},
    /** Use "geodesic: true" for non-linear/Mercator projections like Google, Bing etc */
    {type: "measurelength", options: {geodesic: false}},
    {type: "measurearea", options: {geodesic: false}},
    {type: "-"},
    {type: "addbookmark"},
    {type: "help", options: {tooltip: 'Help and info for this example', contentUrl: 'help.html'}}
];

// The content of the HTML info panel.
Ext.namespace("Heron.options.info");
Heron.options.info.html =
    '<div class="hr-html-panel-body"><p>This is the Heron Mapping Client.' +
    '</p><br/><p>This viewer and in fact the entire website has been made with the Open Source' +
    ' project <a href="http://heron-mc.org" target="_new" >Heron Mapping Client</a>. This on ' +
    '<a href="http://geoext.org">GeoExt</a>-based Viewer is very flexible and extensible ' +
    'See examples like <a href="http://inspire.kademo.nl" target="_new">Heron MC for Kademo INSPIRE</a>.</p><br/></div>';

/** Values for BookmarksPanel (bookmarks to jump to specific layers/zoom/center on map. */
Ext.namespace("Heron.options.bookmarks");
Heron.options.bookmarks =
    [
        {
            id: 'tno',
            name: 'Natura 2000 (TMS)',
            desc: 'een voorbeeld van een bookmark',
            layers: ['OpenBasisKaart OSM', 'Natura 2000 (TMS)'],
            x: 133993,
            y: 473167,
            zoom: 8
        },
        {
            id: 'debrug',
            name: 'Kadaster - De Brug',
            desc: 'een voorbeeld van een Place2',
            layers: ['Luchtfoto (PDOK)'],
            x: 194194,
            y: 465873,
            zoom: 13
        }
    ];