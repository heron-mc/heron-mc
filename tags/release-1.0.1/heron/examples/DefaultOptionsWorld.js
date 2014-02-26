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
Ext.namespace("Heron.options.map");
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

// TODO see how we can set/override Map OpenLayers Controls
//Heron.options.map.controls = [new OpenLayers.Control.ZoomBox(),
//			new OpenLayers.Control.ScaleLine({geodesic: true, maxWidth: 200})];
Ext.namespace("Heron.options.wfs");
Heron.options.wfs.downloadFormats = [
    {
        name: 'CSV',
        outputFormat: 'csv',
        fileExt: '.csv'
    },
    {
        name: 'GML (version 2.1.2)',
        outputFormat: 'text/xml; subtype=gml/2.1.2',
        fileExt: '.gml'
    },
//    {
//        name: 'ESRI Shapefile (zipped)',
//        outputFormat: 'SHAPE-ZIP',
//        fileExt: '.zip'
//    },
    {
        name: 'GeoJSON',
        outputFormat: 'json',
        fileExt: '.json'
    }
];

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
            {singleTile: false, isBaseLayer: true, visibility: true, noLegend: true, transitionEffect: 'resize'}),

    new OpenLayers.Layer.WMS(
            "World image",
            'http://www2.demis.nl/wms/wms.ashx?WMS=BlueMarble',
            {layers: "Earth Image", format: 'image/png'},
            {singleTile: true, isBaseLayer: true, visibility: false, noLegend: true, transitionEffect: 'resize'}
    ),

    new OpenLayers.Layer.WMS(
            "World schematic",
            'http://www2.demis.nl/wms/wms.ashx?WMS=WorldMap',
            {layers: "Countries,Borders,Coastlines", format: 'image/png'},
            {singleTile: true, isBaseLayer: true, visibility: false, noLegend: true, transitionEffect: 'resize'}
    ),

    new OpenLayers.Layer.WMS(
            "Meteosat Baselayer",
            'http://msgcpp-ogc-realtime.knmi.nl/msgrt.cgi?',
            {layers: "baselayer", transparent: true, format: 'image/png'},
            {singleTile: true, opacity: 0.9, isBaseLayer: true, visibility: false, noLegend: false, transitionEffect: 'resize'}
    ),

    new OpenLayers.Layer.Image(
            "None",
            Ext.BLANK_IMAGE_URL,
            OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
            new OpenLayers.Size(10, 10),
            {resolutions: Heron.options.map.settings.resolutions, isBaseLayer: true, visibility: false, displayInLayerSwitcher: true, transitionEffect: 'resize'}
    ),

    /*
     * ==================================
     *            Overlays
     * ==================================
     */
    new OpenLayers.Layer.WMS(
            "World Soil Resources (FAO)",
            'http://data.fao.org/geoserver/ows?',
            {layers: "GEONETWORK:wsres25_1111", transparent: true, format: 'image/png'},
            {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, transitionEffect: 'resize', metadata: {
                wfs: {
                    protocol: 'fromWMSLayer'
                }
            }}
    ),
    new OpenLayers.Layer.WMS(
            "Global Ecological Zones (FAO)",
            'http://data.fao.org/geoserver/ows?',
            {layers: "GEONETWORK:eco_zone_1255", transparent: true, format: 'image/png'},
            {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, transitionEffect: 'resize'}
    ),
    new OpenLayers.Layer.WMS(
            "World Cities (FAO)",
            'http://data.fao.org/geoserver/ows?',
            {layers: "GEONETWORK:esri_cities_12764", transparent: true, format: 'image/png'},
            {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: true, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize', metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    downloadFormats: Heron.options.wfs.downloadFormats
                }
            }}
    ),
    new OpenLayers.Layer.WMS(
            "World Cities (OpenGeo)",
            'http://suite.opengeo.org/geoserver/ows?',
            {layers: "cities", transparent: true, format: 'image/png'},
            {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize',
                metadata: {
                    wfs: {
                        protocol: 'fromWMSLayer',
                        featurePrefix: 'world',
                        featureNS: 'http://opengeo.org',
                        downloadFormats: Heron.options.wfs.downloadFormats
                    }
                }}
    ),
    new OpenLayers.Layer.Vector("USA States (OpenGeo, WFS)", {
        minScale: 15000000,
        strategies: [new OpenLayers.Strategy.BBOX()],
        styleMap: new OpenLayers.StyleMap(
                {'strokeColor': '#222222', 'fillColor': '#eeeeee', graphicZIndex: 1, fillOpacity: 0.8}),
        visibility: true,
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://suite.opengeo.org/geoserver/ows?',
            featureType: "states",
            featureNS: 'http://census.gov'
        })
    }),
    new OpenLayers.Layer.WMS(
            "USA States (OpenGeo)",
            'http://suite.opengeo.org/geoserver/ows?',
            {layers: "states", transparent: true, format: 'image/png'},
            {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize', metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'usa',
                    featureNS: 'http://census.gov',
                    downloadFormats: Heron.options.wfs.downloadFormats
                }
            }
            }
    ),
    /* No feature info, strange GML response from KNMI...ESRI? */
    new OpenLayers.Layer.WMS(
            "Meteosat Precipitation",
            'http://msgcpp-ogc-realtime.knmi.nl/msgrt.cgi?',
            {layers: "lwe_precipitation_rate", transparent: true, format: 'image/png'},
            {singleTile: true, opacity: 0.6, isBaseLayer: false, visibility: false, noLegend: false, transitionEffect: 'resize'}
    )
    /* FOR DEBUGGING ESRI GFI !,
     new OpenLayers.Layer.WMS(
     "Coastal Conditions",
     'http://arcserve.lawr.ucdavis.edu/arcgis/services/CSMW/Coastal_Conditions/MapServer/WMSServer?',
     {layers: "Coastal Conditions", transparent: true, format: 'image/png'},
     {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, featureInfoFormat: 'application/vnd.esri.wms_featureinfo_xml', transitionEffect: 'resize'}
     ) */



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
    {type: "coordinatesearch", options: {onSearchCompleteZoom: 8, fieldLabelX: 'lon', fieldLabelY: 'lat'}},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"},
    {type: "-"},
    {type: "measurelength", options: {geodesic: true}},
    {type: "measurearea", options: {geodesic: true}},
    {type: "-"},
    {type: "addbookmark"},
    {type: "help", options: {tooltip: 'Help and info for this example', contentUrl: 'help.html'}}
];

// The content of the HTML info panel.
Ext.namespace("Heron.options.info");
Heron.options.info.html =
        '<div class="hr-html-panel-body">' +
                '<p>This is a demo app of the <a href="http://heron-mc.org" target="_new">Heron Mapping Client</a>.</p>' +
                '<p>A complete configuration is defined via two JS files: </p>' +
                '<ul>' +
                '<li><a href="../DefaultConfig.js" target="_new">DefaultConfig.js</a> : defines this page layout and its panels/widgets</li>' +
                '<li><a href="../DefaultOptionsWorld.js" target="_new">DefaultOptionsWorld.js</a> : defines options like Layers for that page layout</li>' +
                '</ul>' +
                '<p>This split (into layout/options) is just an example for a convenient way to structure a Heron layout.</p>' +
                '<p>Different (CSS) styles and languages for this same demo app can also be defined by overruling the default options, style and language. Examples:</p>' +
                '<ul>' +
                '<li><a href="../defaultnl/index.html">Same style with Dutch Language and Layers</a> using <a href="../DefaultOptionsNL.js" target="_new">DefaultOptionsNL.js</a></li>' +
                '</ul>' +
                '<p>Note: Feature Info, "I" button in toolbar, is only available for World Cities Layer.</p>' +
                '<p>Base WMS Layers provided by the <a href="http://www.demis.nl" target="_new">Demis (NL)</a></p>' +
                '<p>Overlay WMS/WFS Layers provided by the <a href="http://www.fao.org" target="_new">FAO</a></p>' +
                '<p>Various WMS/WFS Layers provided by the <a href="http://opengeo.org" target="_new">OpenGeo</a></p>' +
                '<p><i>Thanks to Wolfram Winter from <a href="http://www.bahn.de" target="_new">Deutsche Bahn</a> for providing the initial version and drive for this demo.</i></p>' +
                '</div>';

/*
 * Values for BookmarksPanel (bookmarks to jump to specific
 * layers/zoom/center on map. 
 */
Ext.namespace("Heron.options.bookmarks");
Heron.options.bookmarks =
        [
            {
                id: 'id_world_europe',
                name: 'World schematic+cities',
                desc: 'Europe',
                layers: ['World schematic', 'World Cities (FAO)'],
                x: 9.272,
                y: 50.142,
                zoom: 4
            },
            {
                id: 'id_world_northamerica',
                name: 'World image - North America',
                desc: 'North America',
                layers: ['World image'],
                x: -96.328,
                y: 47.461,
                zoom: 2
            }
        ];
