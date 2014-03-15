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

/** api: example[catalog]
 *  Catalog
 *  -------
 *  Add Layers via various catalog services (WMS etc).
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

/*
 * Common settings for MapPanel
 * These will be assigned as "hropts" within the MapPanel config
 */
Heron.options.map.settings = {
    projection: 'EPSG:4326',
    units: 'dd',
    // resolutions: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
    maxExtent: '-180.0, -90.0, 180.0, 90.0',
    // center: '4.92, 52.35',
    xy_precision: 3,
    max_features: 10,
    zoom: 1,
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

    /*
     * ==================================
     *            BaseLayers
     * ==================================
     */
//	May use new NASA WMTS : http://onearth.jpl.nasa.gov/wms.cgi?request=GetCapabilities

    new OpenLayers.Layer.WMS("Global Imagery",
        "http://maps.opengeo.org/geowebcache/service/wms",
        {layers: "bluemarble"},
        {singleTile: false, isBaseLayer: true, visibility: true, noLegend: true, transitionEffect: 'resize', group: 'background'}),

    new OpenLayers.Layer.WMS(
        "World image",
        'http://www2.demis.nl/wms/wms.ashx?WMS=BlueMarble',
        {layers: "Earth Image", format: 'image/png'},
        {singleTile: true, isBaseLayer: true, visibility: false, noLegend: true, transitionEffect: 'resize', group: 'background'}
    ),


    new OpenLayers.Layer.Image(
        "None",
        Ext.BLANK_IMAGE_URL,
        OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
        new OpenLayers.Size(10, 10),
        {resolutions: Heron.options.map.settings.resolutions, isBaseLayer: true, visibility: false, displayInLayerSwitcher: true, transitionEffect: 'resize', group: 'background'}
    ),

    new OpenLayers.Layer.WMS(
            "World Cities (OpenGeo)",
            'http://suite.opengeo.org/geoserver/ows?',
            {layers: "cities", transparent: true, format: 'image/png'},
            {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, transitionEffect: 'resize', queryable: true})

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
    {type: "help", options: {tooltip: 'Help and info for this example', contentUrl: 'help.html'}}
];



/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) components.
 * Each component is either a container of components (xtype: 'panel', i.e. an ExtJS Panel)
 * or a specific leaf component like a map panel (xtype: 'hr_mappanel') or simple HTML
 * panel (xtype: 'hr_htmlpanel'). Each component has a 'xtype' string and component-specific options.
 * The 'xtype' defines the component widget class .
 * For a container-type (xtype: 'panel') the options should include a 'layout' (like 'border' or 'card',
 * and an array of 'items' with each element being a component (another container or a leaf widget component).
 *
 * In order to distinguish ExtJS-specific config options from those that are Heron-specific,
 * the later are prefixed with "hr". These are defined outside this file to allow quick custimization.
 *
 * Specific config options for ExtJS components can be found in the API docs:
 * http://docs.sencha.com/ext-js/3-4/#!/api
 *
 * This is the core config, mainly the layout of a Heron browser application for all examples.
 * Many of the options refer to Javascript variables that are defined within
 * the DefaultOptions*.js. In particular Layers and specific widgets. This has been done
 * to create a reusable config for all examples. Each example may also add a 3rd refinement
 * using a local Config.js file. The names of the config files and variables like Heron.options.bookmarks
 * don't matter. They are just a convenience as to break up a large configuration into
 * the more stable common parts and the more variable parts. As it is all JSON/JavaScript, we
 * can use variables, in our case namespaced, like "Heron.options.bookmarks" as to avoid conflicts in
 * the global JS namespace. (If we would have XML configs we would have to resort to xlinks).
 *
 **/
Heron.layout = {
    xtype: 'panel',

    /* Optional ExtJS Panel properties here, like "border", see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',
    border: false,
    title: '&nbsp;',

    /** Any classes in "items" and nested items are automatically instantiated (via "xtype") and added by ExtJS. */
    items: [

        {
            xtype: 'hr_gxplayerpanel',
            id: 'west',
            region: "west",
            border: false,
            layout: "fit",
            width: 200,
            // configuration of all tool plugins for this application
            tools: [
                {
                    // ptype: "gxp_layertree",
                    ptype: "gxp_layermanager",

                    outputConfig: {
                        id: "layertree",
                        border: true,
                        tbar: [] // we will add buttons to "tree.bbar" later
                    },
                    outputTarget: "west"
                },
                {
                    ptype: "gxp_addlayers",
                    actionTarget: "layertree.tbar",
                    addActionText: __('Add layers'),
                    templatedLayerGrid: true,
                    layerGridWidth: 440,
                    layerGridHeight: 600,
                    layerCardLegendWidth: 24,
                    layerCardLegendHeight: 24
                    /*,search: {selectedSource: "opengeosuite"}   */
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
//                {
//                    ptype: "gxp_layerproperties",
//                    id: "layerproperties",
//                    outputConfig: {defaults: {autoScroll: true}, width: 320},
//                    actionTarget: ["layertree.tbar", "layertree.contextMenu"],
//                    outputTarget: "layertree"
//                },
//                {
//                    ptype: "gxp_styler",
//                    id: "styler",
//                    outputConfig: {autoScroll: true, width: 320},
//                    actionTarget: ["layertree.tbar", "layertree.contextMenu"],
//                    outputTarget: "layertree"
//                },
                {
                    ptype: "gxp_zoomtolayerextent",
                    actionTarget: {target: "layertree.contextMenu", index: 0}
                }
            ],

            // layer sources
            defaultSourceType: "gxp_wmssource",
            sources: {
                opengeosuite: {
                    url: "http://suite.opengeo.org/geoserver/ows",
                    version: "1.1.1",
                    title: 'OpenGeo Suite WMS'
                },

                opengeogxp: {
                    url: "http://gxp.opengeo.org/geoserver/wms",
                    version: "1.1.1",
                    title: 'Boundless WMS'
                },
                warwickshire: {
                    url: "http://maps.warwickshire.gov.uk/gs/wms",
                    version: "1.1.1",
                    title: 'Warwickshire Historic Maps'
                },
                opengeotms: {
                    ptype: "gxp_tmssource",
                    url: "http://maps.opengeo.org/geowebcache/service/tms"
                },

                osm: {
                    ptype: "gxp_osmsource"
                },

//                dutchheights: {
//                    url: "http://geodata.nationaalgeoregister.nl/ahn2/wcs?",
//                    version: "1.1.1",
//                    title: 'PDOK AHN2'
//                },
                google: {
                    ptype: "gxp_googlesource"
                }/*,
                 pycsw: {
                 ptype: "gxp_cataloguesource",
                 url: "http://gxp.opengeo.org/pycsw",
                 title: "pycsw"
                 }   */
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

