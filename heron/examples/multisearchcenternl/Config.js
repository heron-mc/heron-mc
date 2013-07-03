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

/** api: example[multisearchcenternl]
 *  Choose from multiple searches (Dutch/PDOK layers)
 *  -------------------------------------------------
 *  Select a search from a list of predefined form- or spatial queries or your own queries.
 */

/** This config assumes the DefaultOptionsNL.js to be included first!! */
Heron.options.map.settings.zoom = 10;
Heron.options.map.settings.center = '155000,463000';
Ext.namespace("Heron.examples");

Heron.examples.searchPanelConfig.hropts[3] = {
    searchPanel: {
        xtype: 'hr_formsearchpanel',
        name: 'Search Hockey Clubs',
        header: false,
        protocol: new OpenLayers.Protocol.WFS({
            version: "1.1.0",
            url: "http://kademo.nl/gs2/wfs?",
            srsName: "EPSG:28992",
            featureType: "hockeyclubs",
            featureNS: "http://innovatie.kadaster.nl"
        }),
        downloadFormats: [
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
             {
                 name: 'ESRI Shapefile (zipped)',
                 outputFormat: 'SHAPE-ZIP',
                 fileExt: '.zip'
             },
             {
                 name: 'GeoJSON',
                 outputFormat: 'json',
                 fileExt: '.json'
             }
         ],
        items: [
            {
                xtype: "textfield",
                name: "name__like",
                value: 'hu',
                fieldLabel: "  name"
            },
            {
                xtype: "label",
                id: "helplabel",
                html: 'Type name of an NL hockeyclub, wildcards are appended and match is case-insensitive.<br/>Almost any single letter will yield results.<br/>',
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
            logicalOperator: OpenLayers.Filter.Logical.AND
        }
    },
    resultPanel: {
        xtype: 'hr_featuregridpanel',
        id: 'hr-featuregridpanel',
        header: false,
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
        exportFormats: ['XLS', 'WellKnownText'],
        hropts: {
            zoomOnRowDoubleClick: true,
            zoomOnFeatureSelect: false,
            zoomLevelPointSelect: 8
        }
    }
};

Heron.examples.searchPanelConfig.hropts.push({
    searchPanel: {
        xtype: 'hr_formsearchpanel',
        name: 'Search Dutch Roads (NWB)',
        header: false,
        protocol: new OpenLayers.Protocol.WFS({
            version: "1.1.0",
            url: "http://geodata.nationaalgeoregister.nl/nwbwegen/wfs?",
            srsName: "EPSG:28992",
            featureType: "wegvakken",
            featureNS: "http://nwbwegen.geonovum.nl",
            outputFormat: "GML2"
        }),
        downloadFormats: [
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
             {
                 name: 'ESRI Shapefile (zipped)',
                 outputFormat: 'SHAPE-ZIP',
                 fileExt: '.zip'
             },
             {
                 name: 'GeoJSON',
                 outputFormat: 'json',
                 fileExt: '.json'
             }
         ],
        items: [
            {
                xtype: "textfield",
                name: "stt_naam__like",
                value: 'Stationsplein',
                fieldLabel: "  Street"
            },
            {
                 xtype: "textfield",
                 name: "gme_naam__like",
                 value: 'Amersfoort',
                 fieldLabel: "  City"
             },
            {
                xtype: "label",
                id: "helplabel",
                html: 'Type name of a street and city, wildcards are appended and match is case-insensitive.<br/>E.g. "Kapelweg" "Amersfoort"<br/>',
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
            logicalOperator: OpenLayers.Filter.Logical.AND
        }
    },
    resultPanel: {
        xtype: 'hr_featuregridpanel',
        id: 'hr-featuregridpanel',
        header: false,
        columns: [
            {
                header: "Street",
                width: 100,
                dataIndex: "stt_naam"
            },
            {
                header: "City",
                width: 200,
                dataIndex: "gme_naam"
            }
        ],
        exportFormats: ['XLS', 'WellKnownText'],
        hropts: {
            zoomOnRowDoubleClick: true,
            zoomOnFeatureSelect: false,
            zoomLevelPointSelect: 8
        }
    }
});

