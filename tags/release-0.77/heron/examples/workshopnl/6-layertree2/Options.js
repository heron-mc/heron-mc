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
Ext.namespace("Heron.options.map");
Ext.namespace("Heron.PDOK");
Ext.namespace("Heron.scratch");

/** Use these in  services where the server has less resolutions than the Map, OL will "blowup" lower resolutions */
Heron.options.serverResolutions = {
    zoom_0_12: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840],
    zoom_0_13: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
    zoom_0_14: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210],
    zoom_0_15: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105],
    zoom_0_16: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525]
};


// All Map settings
Heron.options.map.settings = {
    projection: 'EPSG:28992',
    units: 'm',
    /** Using the PDOK/Geonovum NL Tiling rec. */
    resolutions: Heron.options.serverResolutions.zoom_0_16,
    maxExtent: '-285401.920, 22598.080, 595401.920, 903401.920',
    center: '155000,463000',
    xy_precision: 3,
    zoom: 3
};

Heron.scratch.urls = {
    PDOK: 'http://geodata.nationaalgeoregister.nl',
    KADEMO_WFS: 'http://kademo.nl/gs2/wfs?',
    KADEMO_OWS: 'http://kademo.nl/gs2/ows?',
    KADEMO_GWC_TMS: 'http://kademo.nl/gwc/service/tms/',
    OPENBASISKAART_TMS: 'http://openbasiskaart.nl/mapcache/tms/',
    RO_WMS: 'http://afnemers.ruimtelijkeplannen.nl/afnemers/services?'
};

Heron.PDOK.urls = {
    BAGVIEWER: Heron.scratch.urls.PDOK + '/bagviewer/ows?',
    PDOKTMS: Heron.scratch.urls.PDOK + '/tms/',
    BESTUURLIJKEGRENZEN: Heron.scratch.urls.PDOK + '/bestuurlijkegrenzen/wms?',
    NATURA2000: Heron.scratch.urls.PDOK + '/natura2000/wms?'
};

// All Layers
Heron.options.map.layers = [
    /*
     * ==================================
     *            BaseLayers
     * ==================================
     */

    new OpenLayers.Layer.TMS("BRT Achtergrondkaart",
            Heron.PDOK.urls.PDOKTMS,
            {layername: 'brtachtergrondkaart',
                type: "png",
                isBaseLayer: true,
                transparent: true,
                bgcolor: "0xffffff",
                visibility: true,
                singleTile: false,
                serverResolutions: Heron.options.serverResolutions.zoom_0_13,
                alpha: true,
                opacity: 1.0,
                attribution: "Bron: <a href='https://www.pdok.nl/nl/service/wmts-brt-achtergrondkaart'>BRT Achtergrondkaart</a> en <a href='http://openstreetmap.org/'>OpenStreetMap</a> <a href='http://www.openstreetmap.org/copyright'>ODbL</a>",
                transitionEffect: 'resize'}),

    new OpenLayers.Layer.TMS("OpenBasisKaart OSM",
            Heron.scratch.urls.OPENBASISKAART_TMS,
            {layername: 'osm@rd',
                type: "png",
                isBaseLayer: true,
                transparent: true,
                bgcolor: "0xffffff",
                visibility: false,
                singleTile: false,
                serverResolutions: Heron.options.serverResolutions.zoom_0_13,
                alpha: true,
                opacity: 1.0,
                attribution: "(C) <a href='http://openbasiskaart.nl'>OpenBasisKaart</a><br/>Data <a href='http://www.openstreetmap.org/copyright'>ODbL</a> <a href='http://openstreetmap.org/'>OpenStreetMap</a> ",
                transitionEffect: 'resize'}),


    /*
     * Areal images PDOK.
     */
    new OpenLayers.Layer.TMS(
            "Luchtfoto (PDOK)",
            'http://geodata1.nationaalgeoregister.nl/luchtfoto/tms/',
            {layername: 'luchtfoto_EPSG28992', type: 'jpeg',
                serverResolutions: Heron.options.serverResolutions.zoom_0_13, isBaseLayer: true, visibility: false }
    ),

    new OpenLayers.Layer.Image(
            "Blanco",
            Ext.BLANK_IMAGE_URL,
            OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
            new OpenLayers.Size(10, 10),
            {resolutions: Heron.options.map.settings.resolutions, isBaseLayer: true, visibility: false, displayInLayerSwitcher: true, transitionEffect: 'resize'}
    ),

    /*
     * PDOK: BagViewer Lagen
     */
    new OpenLayers.Layer.WMS(
            "BAG - Woonplaatsen",
            Heron.PDOK.urls.BAGVIEWER,
            {layers: "woonplaats", format: "image/png", transparent: true},
            {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
                featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'
            }
    ),
    /*
     * PDOK: BagViewer Lagen
     */
    new OpenLayers.Layer.WMS(
            "BAG - Panden",
            Heron.PDOK.urls.BAGVIEWER,
            {layers: "pand", format: "image/png", transparent: true},
            {isBaseLayer: false, singleTile: true, visibility: false, alpha: true,
                featureInfoFormat: "application/vnd.ogc.gml", transitionEffect: 'resize'
            }
    ),

    /*
     * PDOK: Bestuurlijke Grenzen
     */
    new OpenLayers.Layer.WMS(
            "Bestuurlijke Grenzen - Gemeenten",
            Heron.PDOK.urls.BESTUURLIJKEGRENZEN,
            {layers: "gemeenten_2012", format: "image/png8", transparent: true, info_format: 'application/vnd.ogc.gml'},
            {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),
    new OpenLayers.Layer.WMS(
            "Bestuurlijke Grenzen - Provincies",
            Heron.PDOK.urls.BESTUURLIJKEGRENZEN,
            {layers: "provincies_2012", format: "image/png8", transparent: true, info_format: 'application/vnd.ogc.gml'},
            {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    ),
    new OpenLayers.Layer.WMS(
            "Bestuurlijke Grenzen - Land",
            Heron.PDOK.urls.BESTUURLIJKEGRENZEN,
            {layers: "landsgrens_2012", format: "image/png8", transparent: true, info_format: 'application/vnd.ogc.gml'},
            {isBaseLayer: false, singleTile: true, visibility: false, alpha: true}
    )

];

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"}
];

/*
 * Define the Layer tree (shown in left menu)
 * Use the exact Open Layers Layer names to identify layers ("layer" attrs) from Heron.options.map.settings.layers above.
 * The text with each node is determined by the WMS Layer name, but may be overruled with a "text" attribute.
 *
 **/
Ext.namespace("Heron.options.layertree");
Heron.options.layertree.tree = [
    {
        text: 'Basis Kaarten', expanded: true, children: [
        {nodeType: "gx_layer", layer: "BRT Achtergrondkaart", text: "BRT (PDOK)" },
        {nodeType: "gx_layer", layer: "OpenBasisKaart OSM"},
        {nodeType: "gx_layer", layer: "Luchtfoto (PDOK)" },
        {nodeType: "gx_layer", layer: "Blanco"}
    ]
    },
     {
        text: 'PDOK', expanded: false, children: [
        {
            text: 'BAG', expanded: false, children: [
            {nodeType: "gx_layer", layer: "BAG - Woonplaatsen", text: "BAG Woonplaatsen" },
            {nodeType: "gx_layer", layer: "BAG - Panden", text: "BAG Panden" }
        ]
        },
        {
            text: 'Bestuurlijke Grenzen', expanded: false, children: [
            /*							{nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Buurten", text: "Buurten" },
             {nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Wijken", text: "Wijken" },  */
            {nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Gemeenten", text: "Gemeenten" },
            {nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Provincies", text: "Provincies" },
            {nodeType: "gx_layer", layer: "Bestuurlijke Grenzen - Land", text: "Land" }
        ]
        }
     ]
    }
];
