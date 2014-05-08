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
/** This config assumes the DefaultOptionsNL.js to be included first!! */

Ext.namespace("Heron.options.map.settings");

/** api: example[layertree]
 *  LayerTree
 *  ---------
 *  Build a custom layer tree for base layers and thematic overlays.
 */

// Alter some map settings in order that parcels are displayed
Heron.options.map.settings.center = '118561,480615';
Heron.options.map.settings.zoom = 10;

// This is an example how to create arbitrary Layer trees within the Layer Browser
// See widgets/LayerTreePanel.js

// This is the default tree, used here just for reference
var treeDefault = [
    {
        nodeType: "gx_baselayercontainer",
        expanded: true
    },
    {
        nodeType: "gx_overlaylayercontainer",

        // render the nodes inside this container with a radio button,
        // and assign them the group "foo".
        loader: {
            baseAttrs: {
                /*radioGroup: "foo", */
                uiProvider: "layerNodeUI"
            }
        }
    }
];

// Define a minimal tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
var treeTheme = [
    {
        text: 'BaseLayers', expanded: true, children: [
        {nodeType: "gx_layer", layer: "TopRaster", text: 'TopoRaster' },
        {nodeType: "gx_layer", layer: "Luchtfoto (PDOK)", text: 'Luchtfoto (PDOK)' },
        {nodeType: "gx_layer", layer: "Blanco", text: 'Blanc' }
    ]
    },
    {
        text: 'Themes', children: [
        {
            text: 'Cadastral Maps (zoom > 8)', children: [
            {nodeType: "gx_layer", layer: "Kadastrale Vlakken", text: 'Cadastral Parcels' },
            {nodeType: "gx_layer", layer: "Kadastrale Gebouwen (tiled)", text: 'Buildings' }
            // hr_multilayer is phased out....
//            {nodeType: "hr_multilayer", layers: "Kadastrale Vlakken,Kadastrale Gebouwen (tiled)", text: 'Buildings+Parcels' }
        ]
        },
        {
            text: 'Weather', nodeType: 'hr_cascader',  children: [
            {nodeType: "gx_layer", layer: "KNMI Radar", text: 'Rain Radar', legend: true },
            {nodeType: "gx_layer", layer: "KNMI Radar Color", text: 'Rain Radar (Coloured)' , legend: true }
        ]
        }
//        ,
//        {
//            text: 'MultiTest', children: [
//            {nodeType: "hr_multilayer", layers: "KNMI Radar,KNMI Radar Color", text: 'Rain Radar (ALL)' }
//        ]
//        }

    ]
    }
];

// Replace default layer browser DefaultConfig.js
// Pass our theme tree config as an option
Ext.namespace("Heron.options.layertree");

Heron.options.layertree.tree = treeTheme;

