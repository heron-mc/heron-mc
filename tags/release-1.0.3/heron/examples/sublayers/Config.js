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

/** Define RULE values for GetLegendGraphic using RULE= parm sublayer legend and tree icons. */
Heron.options.popStateRules = {
    rule_lt2M: 'Population < 2M',
    rule_2_4M: 'Population 2M-4M',
    rule_gt4M: '> 4M'
};

/*
 * Add extra Layers to the config options in DefaultOptionsWorld.js. Each Layer shows a subset
 * of the Layer "USA States (Opengeo)" data based on the "population" attribute (called 'DP0010001').
 * SLD RULEs are selected together with CQL.
 * The SLD for states is at
 * https://github.com/boundlessgeo/suite-data/blob/master/default/styles/states.sld
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
        "USA States (population < 2M)",
        'http://suite.opengeo.org/geoserver/ows?',
        {layers: "states", transparent: true, format: 'image/png', 'CQL_FILTER': 'DP0010001 < 2000000',
            RULE: Heron.options.popStateRules.rule_lt2M},
        {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: true,
            noLegend: true, featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize', metadata: {
        }
        }
    ),
    new OpenLayers.Layer.WMS(
        "USA States (population 2M-4M)",
        'http://suite.opengeo.org/geoserver/ows?',
        {layers: "states", transparent: true, format: 'image/png', 'CQL_FILTER': 'DP0010001 BETWEEN 2000000 and 4000000',
            RULE: Heron.options.popStateRules.rule_2_4M},
        {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false,
            noLegend: true, featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize', metadata: {
        }
        }
    ),
    new OpenLayers.Layer.WMS(
        "USA States (population > 4M)",
        'http://suite.opengeo.org/geoserver/ows?',
        {layers: "states", transparent: true, format: 'image/png', 'CQL_FILTER': 'DP0010001 > 4000000',
            RULE: Heron.options.popStateRules.rule_gt4M},
        {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false,
            noLegend: true, featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize', metadata: {
        }
        }
    ),
    new OpenLayers.Layer.Vector("USA States WFS (all)", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        styleMap: new OpenLayers.StyleMap({
            "default": new OpenLayers.Style(null, {
                rules: [new OpenLayers.Rule({
                    title: 'All',
                    symbolizer: {
                        "Polygon": {
                            'strokeColor': '#222222', 'fillColor': '#eeeeee', graphicZIndex: 1, fillOpacity: 0.8
                        }
                    }
                })]
            })}),
        visibility: false,
        protocol: new OpenLayers.Protocol.WFS({
            url: 'http://suite.opengeo.org/geoserver/ows?',
            featureType: "states",
            featureNS: 'http://census.gov'
        })
    }),
    new OpenLayers.Layer.Vector("USA States WFS (population < 2M)", {
        strategies: [new OpenLayers.Strategy.BBOX()],
        styleMap: new OpenLayers.StyleMap({
            "default": new OpenLayers.Style(null, {
                rules: [new OpenLayers.Rule({
                    title: '< 2M',
                    symbolizer: {
                        "Polygon": {
                            'strokeColor': '#222222', 'fillColor': '#CCFFFF', graphicZIndex: 1, fillOpacity: 0.8
                        }
                    }
                })]
            })}),
        visibility: false,
        noLegend: true,
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
        styleMap: new OpenLayers.StyleMap({
            "default": new OpenLayers.Style(null, {
                rules: [new OpenLayers.Rule({
                    title: '< 2M',
                    symbolizer: {
                        "Polygon": {
                            'strokeColor': '#222222', 'fillColor': '#3399CC', graphicZIndex: 1, fillOpacity: 0.8
                        }
                    }
                })]
            })}),
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
        styleMap: new OpenLayers.StyleMap({
            "default": new OpenLayers.Style(null, {
                rules: [new OpenLayers.Rule({
                    title: '> 4M',
                    symbolizer: {
                        "Polygon": {
                            'strokeColor': '#222222', 'fillColor': '#99FF99', graphicZIndex: 1, fillOpacity: 0.8
                        }
                    }
                })]
            })}),
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


/** Define icons from GetLegendGraphic using RULE= parm for each sublayer legend. */
Heron.options.legendBase = 'http://suite.opengeo.org/geoserver/ows?TRANSPARENT=TRUE&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetLegendGraphic&LAYER=states&FORMAT=image%2Fpng&SCALE=27683990.15625&RULE=';
Heron.options.legends = {
    l_lt2M: Heron.options.legendBase + Heron.options.popStateRules.rule_lt2M,
    l_2_4M: Heron.options.legendBase + Heron.options.popStateRules.rule_2_4M,
    l_gt4M: Heron.options.legendBase + Heron.options.popStateRules.rule_gt4M
};

// Define a minimal tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
// Replace default layer browser DefaultConfig.js
Heron.options.createLegendImg = function (type) {
    return '<img src="' + Heron.options.legends[type] + '" style="vertical-align:middle" width="18" height="18"/>';
};
Heron.options.legendImages = {
    l_lt2M: Heron.options.createLegendImg('l_lt2M'),
    l_2_4M: Heron.options.createLegendImg('l_2_4M'),
    l_gt4M: Heron.options.createLegendImg('l_gt4M')
}

Ext.namespace("Heron.options.layertree");

Heron.options.layertree.tree = [
    {
        text: 'BaseLayers', expanded: true, children: [
        {nodeType: "gx_layer", layer: "Global Imagery", text: "Global Imagery" },
        {nodeType: "gx_layer", layer: "None", text: 'None' }
    ]
    },
    {
        text: 'USA States (WMS)', nodeType: 'hr_cascader', checked: false, expanded: true, children: [
        {nodeType: "gx_layer", layer: "USA States (population < 2M)", text: Heron.options.legendImages.l_lt2M + "Population < 2M", legend: false },
        {nodeType: "gx_layer", layer: "USA States (population 2M-4M)", text: Heron.options.legendImages.l_2_4M + "Population 2M-4M", legend: false },
        {nodeType: "gx_layer", layer: "USA States (population > 4M)", text: Heron.options.legendImages.l_gt4M + "Population > 4M ", legend: false }
    ]
    },
    {
        text: 'USA States (WFS)', nodeType: 'hr_cascader', expanded: true, children: [
        {nodeType: "gx_layer", layer: "USA States WFS (population < 2M)", text: "Population < 2M", legend: true},
        {nodeType: "gx_layer", layer: "USA States WFS (population 2M-4M)", text: "Population 2M-4M", legend: true},
        {nodeType: "gx_layer", layer: "USA States WFS (population > 4M)", text: "Population > 4M", legend: true}
    ]
    },
    {
        text: 'USA States (Full sets)', nodeType: 'hr_cascader', expanded: false, children: [
        {nodeType: "gx_layer", layer: "USA States (All)", text: "USA States WMS (All)", legend: true},
        {nodeType: "gx_layer", layer: "USA States WFS (all)", legend: true}
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

    /** Any classes in "items" and nested items are automatically instantiated (via "xtype") and added by ExtJS. */
    items: [
        {
            xtype: 'panel',
            id: 'hr-menu-left-container',
            layout: 'accordion',
            region: "west",
            width: 240,
            collapsible: true,
            border: false,
            items: [
                {
                    xtype: 'hr_layertreepanel',
                    border: true,

                    // The LayerTree tree nodes appearance: default is ugly ExtJS document icons
                    // Other values are 'none' (no icons). May be overridden in specific 'gx_layer' type config.
                    layerIcons: 'none',
//                    layerIcons: 'bylayertype',

                    contextMenu: [
                        {
                            xtype: 'hr_layernodemenulayerinfo'
                        },
                        {
                            xtype: 'hr_layernodemenuzoomextent'
                        },
                        {
                            xtype: 'hr_layernodemenustyle'
                        },
                        {
                            xtype: 'hr_layernodemenuopacityslider'
                        }
                    ],
                    // Optional, use internal default if not set
                    hropts: Heron.options.layertree
                },

                {
                    xtype: 'hr_htmlpanel',
                    id: 'hr-info-west',
                    border: true,
                    html: Heron.options.info.html,
                    preventBodyReset: true,
                    title: 'Info'
                }
            ]
        },
        {
            xtype: 'panel',
            id: 'hr-map-and-info-container',
            layout: 'border',
            region: 'center',
            width: '100%',
            collapsible: false,
            split: false,
            border: false,
            items: [
                {
                    xtype: 'hr_mappanel',
                    id: 'hr-map',
                    title: '&nbsp;',
                    region: 'center',
                    collapsible: false,
                    border: false,
                    hropts: Heron.options.map
                }
            ]
        }
    ]
};
