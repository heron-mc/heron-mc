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

/** api: example[formsearchbasic]
 *  Form Search Panel
 *  -----------------
 *  Embedded FormSearchPanel with backend (exact) WFS search and zoom to result.
 */

Heron.layout = {
    xtype: 'panel',

    /* Optional ExtJS Panel properties, see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',
    border: true,

    items: [
        {
            xtype: 'panel',

            id: 'hr-menu-left-container',
            layout: 'accordion',
            region: "west",
            width: 240,
            collapsible: true,
            split: false,
            border: false,
            items: [
                {
                    xtype: 'hr_formsearchpanel',
                    title: __('Search'),
                    bodyStyle: 'padding: 6px',
                    style: {
                        fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                        fontSize: '12px'
                    },
                    border: true,

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
                            html: 'Type name of an NL hockeyclub. Wildcard autoattached and case insenitive match.<br/>',
                            style: {
                                fontSize: '10px',
                                color: '#CCCCCC'
                            }
                        }
                    ],

                    hropts: {
                        onSearchCompleteZoom: 11,
                        autoWildCardAttach: true,
                        caseInsensitiveMatch: true,
                        logicalOperator: OpenLayers.Filter.Logical.AND,
                        // Optional: make these layers visible when search completes
                        layerOpts: [
                            { layerOn: 'Hockeyclubs', layerOpacity: 0.9 },
                            { layerOn: 'OpenStreetMap', layerOpacity: 1.0 }
                        ]
                    }
                },
                {
                    xtype: 'hr_layertreepanel',
                    contextMenu: [
                        {
                            xtype: 'hr_layernodemenulayerinfo'
                        },
                        {
                            xtype: 'hr_layernodemenuzoomextent'
                        },
                        {
                            xtype: 'hr_layernodemenuopacityslider'
                        }
                    ]
                }
            ]
        },
        {
            xtype: 'panel',
            id: 'hr-map-and-info-container',
            layout: 'border',
            region: 'center',
            width: '100%',
            collapsible: true,
            split: false,
            border: false,
            items: [
                {
                    xtype: 'hr_mappanel',
                    id: 'hr-map',
                    region: 'center',
                    collapsible: false,
                    border: false,
                    hropts: Heron.options.map
                }
            ]
        }
    ]
};
