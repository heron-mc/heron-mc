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
Heron.options.map.layers.push(
    new OpenLayers.Layer.WMS(
        "USA States ",
        'http://suite.opengeo.org/geoserver/ows?',
        {layers: "states", transparent: true, format: 'image/png', 'CQL_FILTER': 'DP0010001 < 2000000'},
        {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: true,
            noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize', metadata: {
        }
        }
    ));

Heron.options.map.layers.push(
    new OpenLayers.Layer.WMS(
        "USA States (population 2M-4M)",
        'http://suite.opengeo.org/geoserver/ows?',
        {layers: "states", transparent: true, format: 'image/png', 'CQL_FILTER': 'DP0010001 BETWEEN 2000000 and 4000000'},
        {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false,
            noLegend: true, featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize', metadata: {
        }
        }
    ));

Heron.options.map.layers.push(
    new OpenLayers.Layer.WMS(
        "USA States (population > 4M)",
        'http://suite.opengeo.org/geoserver/ows?',
        {layers: "states", transparent: true, format: 'image/png', 'CQL_FILTER': 'DP0010001 > 4000000'},
        {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false,
            noLegend: true, featureInfoFormat: 'application/vnd.ogc.gml',
            transitionEffect: 'resize', metadata: {
        }
        }
    ));


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
            text: 'USA States (WMS)', expanded: true, children: [
            {nodeType: "gx_layer", layer: "USA States ", text: "Population < 2M" },
            {nodeType: "gx_layer", layer: "USA States (population 2M-4M)", text: "Population 2M-4M" },
            {nodeType: "gx_layer", layer: "USA States (population > 4M)", text: "Population > 4M" },
            {nodeType: "gx_layer", layer: "USA States (OpenGeo)", text: "USA States (All)" }


            /* ,
             {nodeType: "hr_multilayer", layers: "USA States (OpenGeo)", text: "USA States (OpenGeo)" }  */
        ]
        }/*,
        {
            text: 'USA States (WFS)', expanded: true, children: [
//							{nodeType: "hr_multilayer", layers: "USA States (OpenGeo, WFS)", text: "USA States (OpenGeo, WFS)" }
        ]
        }         */

    ]
    }
];

