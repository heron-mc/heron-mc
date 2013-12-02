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


/** api: example[formsearchcenter]
 *  Search + Feature Selection
 *  --------------------------
 *  Search using Form-based WFS query, showing selectable and downloadable results on map and table.
 */

Ext.namespace("Heron.examples");

/** Create a config for the search panel. This panel may be embedded into the accordion
 * or bound to the "find" button in the toolbar. Here we use the toolbar button.
 */
Heron.examples.searchPanelConfig = {
    xtype: 'hr_searchcenterpanel',
    id: 'hr-searchcenterpanel',
    height: 600,
    border: true,
    hropts: {
        searchPanel: {
            xtype: 'hr_formsearchpanel',
            header: false,
            border: false,
            protocol: new OpenLayers.Protocol.WFS({
                version: "1.1.0",
                url: ['http://kademo.nl/gs2/wfs?', 'http://kademo.nl/gs2/wfs?'],
                srsName: "EPSG:28992",
                featureType: "hockeyclubs",
                featureNS: "http://innovatie.kadaster.nl"
            }),
            downloadFormats: [],
            items: [
                {
                    xtype: "textfield",
                    name: "name__like",
                    value: 'hu',
                    fieldLabel: "  Name"
                },
//                {
//                     xtype: "textfield",
//                     name: "cmt__like",
//                     fieldLabel: "  Desc"
//                 },
                {
                    xtype: "label",
                    id: "helplabel",
                    html: 'Type name of an NL hockeyclub, wildcards are appended and matching is case insensitive.<br/>Any single letter will also yield results. <br/>See also the <a href="Config.js">Config.js here</a>',
                    style: {
                        fontSize: '10px',
                        color: '#AAAAAA'
                    }
                }
            ],
            hropts: {
                onSearchCompleteZoom: 10,
                autoWildCardAttach: true,
                caseInsensitiveMatch: true,
                logicalOperator: OpenLayers.Filter.Logical.AND,
                statusPanelOpts: {
                    html: '&nbsp;',
                    height: 'auto',
                    preventBodyReset: true,
                    bodyCfg: {
                        style: {
                            padding: '6px',
                            border: '0px'
                        }
                    },
                    style: {
                        marginTop: '2px',
                        paddingTop: '2px',
                        fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                        fontSize: '11px',
                        color: '#0000C0'
                    }
                }
            }
        },
        resultPanel: {
            xtype: 'hr_featuregridpanel',
            id: 'hr-featuregridpanel',
            header: false,
            border: false,
            columns: [
                {
                    header: "Name",
                    width: 100,
                    dataIndex: "name"
                },
                {
                    header: "Desc",
                    width: 200,
                    dataIndex: "cmt"
                }
            ],
            exportFormats: ['CSV', 'XLS', 'GMLv2',
                {
                    name: 'Esri Shapefile (Dutch RD EPSG:28992)',
                    formatter: 'OpenLayersFormatter',
                    format: 'OpenLayers.Format.GeoJSON',
                    targetFormat: 'ESRI Shapefile',
                    targetSrs: 'EPSG:28992',
                    fileExt: '.zip',
                    mimeType: 'application/zip'
                },
                {
                    name: 'Esri Shapefile (WGS84 EPSG:4326)',
                    formatter: 'OpenLayersFormatter',
                    format: 'OpenLayers.Format.GeoJSON',
                    targetFormat: 'ESRI Shapefile',
                    targetSrs: 'EPSG:4326',
                    fileExt: '.zip',
                    mimeType: 'application/zip'
                },
                'GeoJSON', 'WellKnownText'],
            hropts: {
                zoomOnRowDoubleClick: true,
                zoomOnFeatureSelect: false,
                zoomLevelPointSelect: 8
            }
        }
    }
};

Heron.options.map.toolbar.push({type: "-"});

Heron.options.map.toolbar.push(
        {
            type: "searchcenter",
            // Options for SearchPanel window
            options: {
                show: true,
                searchWindow: {
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
);
