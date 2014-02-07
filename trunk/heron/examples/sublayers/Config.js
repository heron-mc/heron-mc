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
/** This config assumes the DefaultOptionsWorld.js to be included first!! */

Ext.namespace("Heron.options.map.settings");

/** api: example[sublayers]
 *  Sublayers
 *  ---------
 *  Layers, each with data-subset via filtering from single WMS/WFS Layer.
 */

// Alter some map settings in order that USA is displayed in center
Heron.options.map.settings.center = '-100,40';
Heron.options.map.settings.zoom = 3;

/*
 * Add extra Layers to the config options in DefaultOptionsWorld.js. Each Layer shows a subset
 * of the Layer "USA States (Opengeo)" data based on the "population" attribute (called 'DP0010001')
 */
Heron.options.map.layers = [
    new OpenLayers.Layer.WMS("Global Imagery",
        "http://maps.opengeo.org/geowebcache/service/wms",
        {layers: "bluemarble"},
        {singleTile: false, isBaseLayer: true, visibility: true, noLegend: true, transitionEffect: 'resize'}),

    new OpenLayers.Layer.Image(
        "None",
        Ext.BLANK_IMAGE_URL,
        OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
        new OpenLayers.Size(10, 10),
        {resolutions: Heron.options.map.settings.resolutions, isBaseLayer: true, visibility: false, displayInLayerSwitcher: true, transitionEffect: 'resize'}
    ),
    new OpenLayers.Layer.WMS(
        "USA States (All)",
        'http://suite.opengeo.org/geoserver/ows?',
        {layers: "states", transparent: true, format: 'image/png'},
        {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false,
            featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize'
        }
    ),
    new OpenLayers.Layer.WMS(
        "USA States ",
        'http://suite.opengeo.org/geoserver/ows?',
        {layers: "states", transparent: true, format: 'image/png', 'CQL_FILTER': 'DP0010001 < 2000000'},
        {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: true,
            noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize', metadata: {
        }
        }
    ),
    new OpenLayers.Layer.WMS(
        "USA States (population 2M-4M)",
        'http://suite.opengeo.org/geoserver/ows?',
        {layers: "states", transparent: true, format: 'image/png', 'CQL_FILTER': 'DP0010001 BETWEEN 2000000 and 4000000'},
        {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false,
            noLegend: true, featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize', metadata: {
        }
        }
    ),
    new OpenLayers.Layer.WMS(
        "USA States (population > 4M)",
        'http://suite.opengeo.org/geoserver/ows?',
        {layers: "states", transparent: true, format: 'image/png', 'CQL_FILTER': 'DP0010001 > 4000000'},
        {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false,
            noLegend: true, featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize', metadata: {
        }
        }
    ),
    new OpenLayers.Layer.Vector("USA States WFS (all)", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        styleMap: new OpenLayers.StyleMap(
            {'strokeColor': '#222222', 'fillColor': '#eeeeee', graphicZIndex: 1, fillOpacity: 0.8}),
        visibility: false,
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://suite.opengeo.org/geoserver/ows?',
            featureType: "states",
            featureNS: 'http://census.gov'
        })
    }),
    new OpenLayers.Layer.Vector("USA States WFS (population < 2M)", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        styleMap: new OpenLayers.StyleMap(
            {'strokeColor': '#222222', 'fillColor': '#CCFFFF', graphicZIndex: 1, fillOpacity: 0.8}),
        visibility: false,
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://suite.opengeo.org/geoserver/ows?',
            featureType: "states",
            featureNS: 'http://census.gov'
        }),
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.LESS_THAN,
            property: "DP0010001",
            value: 2000000
        })
    }),
    new OpenLayers.Layer.Vector("USA States WFS (population 2M-4M)", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        styleMap: new OpenLayers.StyleMap(
            {'strokeColor': '#222222', 'fillColor': '#3399CC', graphicZIndex: 1, fillOpacity: 0.8}),
        visibility: false,
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://suite.opengeo.org/geoserver/ows?',
            featureType: "states",
            featureNS: 'http://census.gov'
        }),
        filter: new OpenLayers.Filter.Logical({
            type: OpenLayers.Filter.Logical.AND,
            filters: [
                new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.GREATER_THAN,
                    property: "DP0010001",
                    value: 2000000
                }),
                new OpenLayers.Filter.Comparison({
                    type: OpenLayers.Filter.Comparison.LESS_THAN,
                    property: "DP0010001",
                    value: 4000000
                })
            ]
        })
    }),
    new OpenLayers.Layer.Vector("USA States WFS (population > 4M)", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        styleMap: new OpenLayers.StyleMap(
            {'strokeColor': '#222222', 'fillColor': '#99FF99', graphicZIndex: 1, fillOpacity: 0.8}),
        visibility: false,
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://suite.opengeo.org/geoserver/ows?',
            featureType: "states",
            featureNS: 'http://census.gov'
        }),
        filter: new OpenLayers.Filter.Comparison({
            type: OpenLayers.Filter.Comparison.GREATER_THAN,
            property: "DP0010001",
            value: 4000000
        })
    })
];


// Define a minimal tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
// Replace default layer browser DefaultConfig.js
Ext.namespace("Heron.options.layertree");
Heron.options.layertree.tree = [
    {
        text: 'BaseLayers', expanded: true, children: [
        {nodeType: "gx_layer", layer: "Global Imagery", text: "Global Imagery" },
        {nodeType: "gx_layer", layer: "None", text: 'None' }
    ]
    },
    {
        text: 'Themes', expanded: true, children: [
        {
            text: 'USA States (WMS)', nodeType: 'hr_cascader', checked:false, expanded: true, children: [
            {nodeType: "gx_layer", layer: "USA States ", text: "Population < 2M" },
            {nodeType: "gx_layer", layer: "USA States (population 2M-4M)", text: "Population 2M-4M" },
            {nodeType: "gx_layer", layer: "USA States (population > 4M)", text: "Population > 4M" }
        ]
        },
        {
            text: 'USA States (WFS)', nodeType: 'hr_cascader', expanded: true, children: [
            {nodeType: "gx_layer", layer: "USA States WFS (population < 2M)", text: "Population < 2M"},
            {nodeType: "gx_layer", layer: "USA States WFS (population 2M-4M)", text: "Population 2M-4M"},
            {nodeType: "gx_layer", layer: "USA States WFS (population > 4M)", text: "Population > 4M"}
        ]
        },
        {
            text: 'USA States (Full sets)', nodeType: 'hr_cascader', expanded: false, children: [
            {nodeType: "gx_layer", layer: "USA States WFS (all)"},
            {nodeType: "gx_layer", layer: "USA States (All)", text: "USA States WMS (All)"}
        ]
        }
    ]
    }
];

// The content of the HTML info panel.
Ext.namespace("Heron.options.info");
Heron.options.info.html =
    '<div class="hr-html-panel-body">' +
        '<p>This is a demo app of the <a href="http://heron-mc.org" target="_new">Heron Mapping Client</a>.</p>' +
        '<p>See Help button for more info on this example.</p>' +
        '</div>';

/*
 * Values for BookmarksPanel (bookmarks to jump to specific
 * layers/zoom/center on map.
 */
Ext.namespace("Heron.options.bookmarks");
Heron.options.bookmarks =
    [
    ];
