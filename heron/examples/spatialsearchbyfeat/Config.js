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

/** api: example[spatialsearchbyfeat]
 *  Spatial search using geometries of other search
 *  -----------------------------------------------
 *  Do a spatial search using the results of any other form- or spatial search.
 */

/** This config assumes the DefaultOptionsWorld.js to be included first!! */
Heron.options.map.settings.zoom = 9;
Heron.options.map.settings.center = '118500,481500';

Ext.namespace("Heron.examples");

/** Create a config for a MultiSearchCenterPanel. Note that each Search must have a Name attribute.
 */
Heron.examples.searchPanelConfig = {
    xtype: 'hr_multisearchcenterpanel',
    height: 600,
    hropts: [
        {
            searchPanel: {
                xtype: 'hr_formsearchpanel',
                name: 'Form: Search Kadasteral Parcels',
                header: false,
                border: false,
                protocol: new OpenLayers.Protocol.WFS({
                    version: "1.1.0",
                    url: "http://kademo.nl/gs2/wfs?",
                    srsName: "EPSG:28992",
                    featureType: "lki_vlakken",
                    featureNS: "http://innovatie.kadaster.nl",
                    geometryName: "the_geom"
                }),
                items: [
                    {
                        xtype: "textfield",
                        name: "objectnumm__eq",
                        value: 'ASV00V 00776G0000',
                        fieldLabel: "  Object"
                    },
                    {
                        xtype: "label",
                        id: "helplabel",
                        html: 'Type name of an object number or just press Search, wildcards are not appended<br/>. After search select "Spatial: use geometries from last result" from Search selector. Use there e.g. the layer "BAG Adressen" to find/see the addresses within the parcel polygon<br/>',
                        style: {
                            fontSize: '10px',
                            color: '#AAAAAA'
                        }
                    }
                ],
                hropts: {
                    onSearchCompleteZoom: 8,
                    autoWildCardAttach: false,
                    caseInsensitiveMatch: false,
                    logicalOperator: OpenLayers.Filter.Logical.AND
                }
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                border: false,
                autoConfig: true,
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8
                }
            }
        },
        {
            searchPanel: {
                xtype: 'hr_spatialsearchpanel',
                name: __('Spatial: search by drawing'),
                header: false,
                border: false,
                bodyStyle: 'padding: 6px',
                style: {
                    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                    fontSize: '12px'
                },
                hropts: {
                    selectFirst: true
                }
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                border: false,
                autoConfig: true,
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    zoomToDataExtent: false
                }
            }
        },
        {
            searchPanel: {
                xtype: 'hr_spatialsearchpanel',
                name: __('Spatial: use geometries from last result'),
                description: 'This search uses the feature-geometries of the last result to construct and perform a spatial search.',
                header: false,
                border: false,
                bodyStyle: 'padding: 6px',
                style: {
                    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                    fontSize: '12px'
                },
                hropts: {
                    fromLastResult: true,
                    maxFilterGeometries: 50,
                    selectFirst: false
                }
            },
            resultPanel: {
                xtype: 'hr_featuregridpanel',
                id: 'hr-featuregridpanel',
                header: false,
                border: false,
                autoConfig: true,
                hropts: {
                    zoomOnRowDoubleClick: true,
                    zoomOnFeatureSelect: false,
                    zoomLevelPointSelect: 8,
                    zoomToDataExtent: false
                }
            }
        }
    ]
};


// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. By providing a "create" function your own toolbar
// item can be added.
// For menu's and other standard ExtJS Toolbar items, the "any" type can be
// used. There you need only pass the options, similar as in the function
// ExtJS Toolbar.add().
Heron.options.map.toolbar = [
    {type: "featureinfo", options: {max_features: 20}},
    {type: "-"} ,
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
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
                title: __('Multiple Searches'),
                x: 100,
                y: undefined,
                width: 320,
                height: 400,
                items: [
                    Heron.examples.searchPanelConfig
                ]
            }
        }
    }

];
