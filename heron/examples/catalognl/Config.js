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

/** api: example[catalognl]
 *  Catalog Dutch
 *  -------------
 *  Add Layers via various catalog services (WMS and CSW etc) from Dutch Layers and CSW to NGR.
 */

Ext.namespace("Heron");
Ext.namespace("Heron.options");
Ext.namespace("Heron.options.map");

/**
 * Defines settings for the Heron App layout wihtin Layout.js.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) and GeoExt and Heron MC components.
 * For convenience specific settings within this layout are defined here
 * for structuring and reuse purposes.
 *
 **/

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';

/** Use these in  services where the server has less resolutions than the Map, OL will "blowup" lower resolutions */
Heron.options.serverResolutions = {
    zoom_0_12: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840],
    zoom_0_13: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
    zoom_0_14: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210],
    zoom_0_15: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105],
    zoom_0_16: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525]
};

Heron.options.urls = {
    PDOK: 'http://geodata.nationaalgeoregister.nl',
    OPENBASISKAART_TMS: 'http://openbasiskaart.nl/mapcache/tms'
};

/*
 * Common settings for MapPanel
 * These will be assigned as "hropts" within the MapPanel config
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

};

/*
 * Layers to be added to the map.
 * Syntax is defined in OpenLayers Layer API.
 * ("isBaseLayer: true" means the layer will be added as base/background layer).
 */
Heron.options.map.layers = [
    /* OpenBasisKaart by www.opengeogroep.nl */
    ["OpenLayers.Layer.TMS", "OpenBasisKaart OSM",
        Heron.options.urls.OPENBASISKAART_TMS,
        {layername: 'osm@rd',
            type: "png",
            serverResolutions: Heron.options.serverResolutions.zoom_0_13,
            isBaseLayer: true,
            transparent: true,
            bgcolor: "0xffffff",
            visibility: true,
            singleTile: false,
            alpha: true,
            opacity: 1.0,
            attribution: "(C) <a href='http://openbasiskaart.nl'>OpenBasisKaart</a><br/>Data <a href='http://www.openstreetmap.org/copyright'>CC-By-SA</a> <a href='http://openstreetmap.org/'>OpenStreetMap</a> ",
            transitionEffect: 'resize', group: 'background'}],

    ["OpenLayers.Layer.TMS", "BRT Achtergrondkaart",
        Heron.options.urls.PDOK + '/tms/',
        {layername: 'brtachtergrondkaart',
            type: "png",
            serverResolutions: Heron.options.serverResolutions.zoom_0_14,
            isBaseLayer: true,
            transparent: true,
            bgcolor: "0xffffff",
            visibility: false,
            singleTile: false,
            alpha: true,
            opacity: 1.0,
            attribution: "Bron: BRT Achtergrondkaart, � <a href='http://openstreetmap.org/'>OpenStreetMap</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-By-SA</a>",
            transitionEffect: 'resize', group: 'background'}],
    /*
     * Areal images PDOK.
     */
    ["OpenLayers.Layer.TMS",
        "Luchtfoto (PDOK)",
        'http://geodata1.nationaalgeoregister.nl/luchtfoto/tms/',
        {layername: 'luchtfoto_EPSG28992', type: 'jpeg', serverResolutions: Heron.options.serverResolutions.zoom_0_13,
            isBaseLayer: true, visibility: false, group: 'background'}
    ],

    ["OpenLayers.Layer.Image",
        "Blanco",
        Ext.BLANK_IMAGE_URL,
        OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
        new OpenLayers.Size(10, 10),
        {resolutions: Heron.options.map.settings.resolutions, isBaseLayer: true, visibility: false, displayInLayerSwitcher: true, transitionEffect: 'resize', group: 'background'}
    ]


];

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. "-" denotes a separator item.
Heron.options.map.toolbar = [
    {type: "scale", options: {width: 110}},
    {type: "-"} ,
    {type: "featureinfo", options: {
        popupWindow: {
            width: 360,
            height: 200,
            featureInfoPanel: {
                showTopToolbar: true,

                // Should column-names be capitalized? Default true.
                columnCapitalize: true,

                // displayPanels option values are 'Table' and 'Detail', default is 'Table'
                // displayPanels: ['Table', 'Detail']
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoJSON', 'GeoPackage', 'WellKnownText'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                // exportFormats: ['CSV', 'XLS'],
                maxFeatures: 10
            }
        }
    }},
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "-"} ,
    {type: "help", options: {tooltip: 'Help and info for this example', contentUrl: '../catalog/help.html'}}
];


/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) components.
 * Each component is either a container of components (xtype: 'panel', i.e. an ExtJS Panel)
 * or a specific leaf component like a map panel (xtype: 'hr_mappanel') or simple HTML
 * panel (xtype: 'hr_htmlpanel'). Each component has a 'xtype' string and component-specific options.
 * The 'xtype' defines the component widget class.
 **/
Heron.layout = {
    xtype: 'panel',

    /* Optional ExtJS Panel properties here, like "border", see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',
    border: false,
//    title: '&nbsp;',

    /** Any classes in "items" and nested items are automatically instantiated (via "xtype") and added by ExtJS. */
    items: [

        {
            xtype: 'hr_gxplayerpanel',
            id: 'gxplayerpanel',
            region: "west",
            border: false,
            header: false,
            autoScroll: true,
            width: 320,
            // configuration of all tool plugins for this application
            tools: [
                {
                    // ptype: "gxp_layertree",
                    ptype: "gxp_layermanager",

                    outputConfig: {
                        id: "layertree",
                        title: __('Layers'),
                        border: false,
                        tbar: [] // we will add buttons to "tree.bbar" later
                    },
                    outputTarget: "gxplayerpanel"
                },
                {
                    ptype: "gxp_addlayers",
                    actionTarget: "layertree.tbar",
                    addActionText: __('Add layers'),
                    templatedLayerGrid: true,
                    layerGridWidth: 440,
                    layerGridHeight: 540,
                    layerPreviewWidth: 40,
                    layerPreviewHeight: 40,
                    owsPreviewStrategies: ['attributionlogo', 'getlegendgraphic', 'randomcolor'],

                    // Catalog panel settings
                    searchText: "Find in Dutch National Geo-register (via CSW)",
                    catalogPanelWidth: 440,

                    defaultSrs: 'EPSG:28992',
                    search: {selectedSource: "nationaalgeoregister"}
                },
                {
                    ptype: "gxp_removelayer",
                    actionTarget: "layertree.tbar",
                    removeActionText: __('Remove layer')
                },
                {
                    ptype: "gxp_removelayer",
                    actionTarget: "layertree.contextMenu"
                },
                {
                    ptype: "gxp_layerproperties",
                    outputConfig: {defaults: {autoScroll: true}, width: 400, autoHeight: true},
                    actionTarget: ["layertree.tbar", "layertree.contextMenu"]
                },
                {
                    ptype: "gxp_styler",
                    outputConfig: {autoScroll: true, width: 320},
                    actionTarget: ["layertree.tbar", "layertree.contextMenu"]
                },
                {
                    ptype: "gxp_zoomtolayerextent",
                    actionTarget: {target: "layertree.contextMenu", index: 0}
                },
                {
                    ptype: "gxp_opacityslider",
                    actionTarget: ["layertree.tbar", "layertree.contextMenu"]
                }
            ],

            // layer sources
            defaultSourceType: "gxp_wmssource",
            sources: {
                pdok_streekpaden_wms: {
                    url: Heron.options.urls.PDOK + '/streekpaden/wms',
                    version: "1.1.1",
                    title: 'PDOK Streekpaden WMS'
                },
                pdok_fietsknooppunten_wms: {
                    url: Heron.options.urls.PDOK + '/fietsknooppuntennetwerk/wms',
                    version: "1.1.0",
                    title: 'PDOK Fietsknooppunten WMS'
                },
                pdok_bagviewer_wms: {
                    ptype: "gxp_wmssource",
                    url: Heron.options.urls.PDOK + '/bagviewer/wms',
                    version: "1.1.0",
                    title: 'PDOK BAGViewer WMS',
                    owsPreviewStrategies: ['getlegendgraphic']  // or 'no preview available' if empty array
                },
                pdok_bagviewer_wfs: {
                    ptype: "gxp_wfssource",
                    url: Heron.options.urls.PDOK + '/bagviewer/wfs',
                    version: "1.1.0",
                    title: 'PDOK BAGViewer WFS',
                    owsPreviewStrategies: ['randomcolor']  // or 'no preview available' if empty array
                },
                pdok_bag_wms: {
                    ptype: "gxp_wmssource",
                    url: Heron.options.urls.PDOK + '/bag/wms',
                    version: "1.1.0",
                    title: 'PDOK BAG WMS',
                    owsPreviewStrategies: ['getlegendgraphic']  // or 'no preview available' if empty array
                },
                pdok_bag_wfs: {
                    ptype: "gxp_wfssource",
                    url: Heron.options.urls.PDOK + '/bag/wfs',
                    version: "1.1.0",
                    title: 'PDOK BAG WFS',
                    owsPreviewStrategies: ['randomcolor']  // or 'no preview available' if empty array
                },
                pdok_nwbspoorwegen_wfs: {
                    ptype: "gxp_wfssource",
                    url: Heron.options.urls.PDOK + '/nwbspoorwegen/wfs',
                    version: "1.1.0",
                    title: 'PDOK NWB Spoorwegen WFS',
                    owsPreviewStrategies: ['randomcolor']  // or 'no preview available' if empty array
                },
                pdok_tms: {
                    ptype: "gxp_tmssource",
                    url: Heron.options.urls.PDOK + '/tms/',
                    isBaseLayer: true,  // default is true
                    group: 'background' // 'background' or 'default', default value is 'background'
                },
                geodan_tms: {
                     ptype: "gxp_tmssource",
                     url: 'http://services.geodan.nl/tms/',
                     isBaseLayer: true,  // default is true
                     group: 'background' // 'background' or 'default', default value is 'background'
                 }
//                osm: {
//                    ptype: "gxp_osmsource"
//                }
//                dutchheights: {
//                    url: "http://geodata.nationaalgeoregister.nl/ahn2/wcs?",
//                    version: "1.1.1",
//                    title: 'PDOK AHN2'
//                },
//                google: {
//                    ptype: "gxp_googlesource"
//                }
                ,
                nationaalgeoregister: {
                    ptype: "gxp_cataloguesource",
                    url: "http://www.nationaalgeoregister.nl/geonetwork/srv/dut/csw",
                    fullMetadataUrlTpl: 'http://www.nationaalgeoregister.nl/geonetwork/srv/dut/search?uuid={id}',
//                    url: 'http://geomatics.nlr.nl/excat/csw',
//                    url: 'http://www.provinciaalgeoregister.nl/pgr-csw/services',
                    title: "Nationaal Georegister"
                }
            }
        },

        {
            xtype: 'hr_mappanel',
            id: 'hr-map',
            region: 'center',
            collapsible: false,
            border: true,
            hropts: Heron.options.map
        }
    ]
};

