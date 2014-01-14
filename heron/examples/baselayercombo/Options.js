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


/** api: example[baselayercombo]
 *  BaseLayerCombo
 *  --------------
 *  Shows use of the BaseLayerCombo to select Base Layers.
 */

/** Use a Layer tree with just Overlay Layers as we select Base Layer through BaseLayerCombo */
Heron.layout.items[0].items[0].hropts = {};
Heron.layout.items[0].items[0].hropts.tree = [
    {
        nodeType: "gx_overlaylayercontainer",
        text: __('Overlays'),
        expanded: true
    }
];

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
    // Add BaseLayerCombo
    {type: "baselayer", options: {width: 150, listWidth: 160}},
    {type: "scale"},
    {type: "featureinfo", options: {
        pressed: false,
        popupWindow: {
            width: 320,
            height: 200,
            featureInfoPanel: {
                displayPanels: ['Table'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: [],
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
/** Use "geodesic: true" for non-linear/Mercator projections like Google, Bing etc */
    {type: "measurelength", options: {geodesic: true}},
    {type: "measurearea", options: {geodesic: true}}
];
