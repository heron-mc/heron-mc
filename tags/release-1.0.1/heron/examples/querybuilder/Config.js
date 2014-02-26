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

/** api: example[querybuilder]
 *  Edit and execute WFS Queries
 *  ----------------------------
 *  Use the GXP QueryPanel to build and execute WFS spatial and filter-queries.
 */

/** This config assumes the DefaultOptionsWorld.js to be included first!! */
Heron.options.map.settings.zoom = 3;
Heron.options.map.settings.center = '-98,40';

Ext.namespace("Heron.examples");

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. By providing a "create" function your own toolbar
// item can be added.
// For menu's and other standard ExtJS Toolbar items, the "any" type can be
// used. There you need only pass the options, similar as in the function
// ExtJS Toolbar.add().
Heron.options.map.toolbar = [
    {type: "featureinfo", options: {
        popupWindow: {
            width: 360,
            height: 200,
            featureInfoPanel: {
                displayPanels: ['Table'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'GeoJSON', 'WellKnownText', 'Shapefile'],
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
    {type: "coordinatesearch", options: {onSearchCompleteZoom: 8}},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"},
    {type: "-"},
    {
        type: "searchcenter",
        // Options for SearchPanel window
        options: {
            show: true,

            searchWindow: {
                title: __('Query Builder'),
                x: 100,
                y: undefined,
                layout: 'fit',
                width: 380,
                height: 420,
                items: [
                    {
                        xtype: 'hr_searchcenterpanel',
                        id: 'hr-searchcenterpanel',
                        hropts: {
                            searchPanel: {
                                xtype: 'hr_gxpquerypanel',
                                header: false,
                                border: false,
                                spatialQuery: true,
                                attributeQuery: true,
                                caseInsensitiveMatch: true,
                                autoWildCardAttach: true
                            },
                            resultPanel: {
                                xtype: 'hr_featuregridpanel',
                                id: 'hr-featuregridpanel',
                                header: false,
                                border: false,
                                autoConfig: true,
                                exportFormats: ['CSV', 'XLS', 'GMLv2', 'GeoJSON', 'WellKnownText', 'Shapefile'],
                                hropts: {
                                    zoomOnRowDoubleClick: true,
                                    zoomOnFeatureSelect: false,
                                    zoomLevelPointSelect: 8,
                                    zoomToDataExtent: true
                                }
                            }
                        }
                    }
                ]
            }
        }
    }
];

