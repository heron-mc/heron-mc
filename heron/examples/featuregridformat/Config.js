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

Ext.namespace("Heron");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';


/** api: example[featuregridformat]
 *  Feature Grid Format
 *  -------------------
 *  Shows how to format cells within feature display grids such as from WMS GeoFeatureInfo or WFS.
 */

/**
 * Defines a minimal Heron app with configured WMS GetFeatureInfoPanel.
 *
 **/
Heron.layout = {

    /* Optional ExtJS Panel properties, see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',

    items: [
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
                    region: 'center',
                    collapsible: false,
                    border: false,
                    hropts: {
                        layers: [
                            new OpenLayers.Layer.WMS(
                                    "World image",
                                    'http://www2.demis.nl/wms/wms.ashx?WMS=BlueMarble',
                                    {layers: "Earth Image", format: 'image/png'},
                                    {singleTile: true, isBaseLayer: true, visibility: true, noLegend: true, transitionEffect: 'resize'}
                            ),
                            new OpenLayers.Layer.WMS(
                                    "USA States (OpenGeo)",
                                    'http://suite.opengeo.org/geoserver/ows?',
                                    {layers: "states", transparent: true, format: 'image/png'},
                                    {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: true, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize'}
                            ),

//							new OpenLayers.Layer.WMS(
//									"World schematic",
//									'http://www2.demis.nl/wms/wms.ashx?WMS=WorldMap',
//									{layers: "Countries,Borders,Coastlines", format: 'image/png'},
//									{singleTile: true, isBaseLayer: true, visibility: false, noLegend: true, transitionEffect: 'resize'}
//							),
                            new OpenLayers.Layer.WMS(
                                    "World Cities (OpenGeo)",
                                    'http://suite.opengeo.org/geoserver/ows?',
                                    {layers: "cities", transparent: true, format: 'image/png'},
                                    {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: true, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize'}
                            )
                        ],
                        toolbar: [
                            {type: "featureinfo", options: {
                                pressed: true,
                                popupWindow: {
                                    width: 480,
                                    height: 200,
                                    featureInfoPanel: {
                                        // Option values are 'Grid', 'Tree' and 'XML', default is 'Grid' (results in no display menu)
                                        showTopToolbar: true,
                                        displayPanels: ['Table'],
                                        // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                                        exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoJSON', 'WellKnownText'],
                                        maxFeatures: 10,
                                        /** Use this to have all columns displayed but only these specifically formatted per feature type. */
                                        gridCellRenderers: [
                                            {
                                                featureType: 'cities',
                                                attrName: 'City',
                                                renderer: {
                                                    fn: Heron.widgets.GridCellRenderer.directLink,
                                                    options: {
                                                        url: 'http://en.wikipedia.org/wiki/{City}',
                                                        target: '_new'
                                                    }
                                                }
                                            },
                                            {
                                                featureType: 'cities',
                                                attrName: 'Country',
                                                renderer: {
                                                    fn: Heron.widgets.GridCellRenderer.browserPopupLink,
                                                    options: {
                                                        url: 'http://en.wikipedia.org/wiki/{Country}',
                                                        winName: 'hrdemoWin',
                                                        bReopen: false,
                                                        hasMenubar: false,
                                                        hasToolbar: false,
                                                        hasAddressbar: false,
                                                        hasStatusbar: false,
                                                        hasScrollbars: true,
                                                        isResizable: true,
                                                        hasPos: true,
                                                        xPos: 10,
                                                        yPos: 20,
                                                        hasSize: true,
                                                        wSize: 400,
                                                        hSize: 800,
                                                        attrPreTxt: 'Wiki: '
                                                    }
                                                }
                                            },
                                            {   // Example for custom HTML, could use also with e.g. links
                                                featureType: 'cities',
                                                attrName: 'longitude',
                                                renderer: {
                                                    fn: Heron.widgets.GridCellRenderer.valueSubstitutor,
                                                    options: {
                                                        template: '<i>ll={latitude},{longitude}{empty}</i>'
                                                    }
                                                }
                                            },
                                            {
                                                // Example: supply your own function, parms as in ExtJS ColumnModel
                                                featureType: 'cities',
                                                attrName: 'population',
                                                renderer: {
                                                    fn: function (value, metaData, record, rowIndex, colIndex, store) {
                                                        // Custom formatting, may also use this.options if needed
                                                        return '<b>' + value + ' inh.</b>';
                                                    },
                                                    options: {

                                                    }
                                                }
                                            }
                                        ],
                                        /** Use this to have only specific columns displayed and formatted per feature type. */
                                        gridColumns: [
                                            {
                                                featureType: 'states',
                                                columns: [
                                                    {
                                                        header: "State Name",
                                                        width: 120,
                                                        dataIndex: "NAME10"
                                                    },
                                                    {
                                                        header: "Inhabitants",
                                                        width: 120,
                                                        dataIndex: "DP0010001"
                                                    },
                                                    {
                                                        header: "More Info",
                                                        width: 120,

                                                        renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                                                            var template = '<a target="_new" href="http://en.wikipedia.org/wiki/{STATE_NAME}">Wikipedia Info</a>';
                                                            var options = {attrNames: ['STATE_NAME']};
                                                            return Heron.widgets.GridCellRenderer.substituteAttrValues(template, options, record);
                                                        }
                                                    }

                                                ]
                                            }
                                        ]

                                    }
                                }
                            }},
                            {type: "-"} ,
                            {type: "pan"},
                            {type: "zoomin"},
                            {type: "zoomout"}
                        ]
                    }
                }

            ]
        }
    ]
};
