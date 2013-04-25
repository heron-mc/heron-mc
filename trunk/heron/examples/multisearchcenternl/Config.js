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

Heron.examples.searchPanelConfig.hropts[0] = {
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
                dataIndex: "name",
                type: 'string'
            },
            {
                header: "Desc",
                width: 200,
                dataIndex: "cmt",
                type: 'string'
            }
        ],
        hropts: {
            zoomOnRowDoubleClick: true,
            zoomOnFeatureSelect: false,
            zoomLevelPointSelect: 8
        }
    }
};

