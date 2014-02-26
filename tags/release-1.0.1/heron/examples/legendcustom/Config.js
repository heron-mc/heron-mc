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


/** api: example[legendcustom]
 *  Custom Legend
 *  -------------
 *  Demonstrates how to configure a custom legend image as URL for a Layer.
 */

/**
 * Define a minimal Heron app: just a Map with LegendPanel. Ok, the legend image does not
 * really match the map...
 *
 **/
Heron.layout = {
    xtype: 'panel',

    /* Optional ExtJS Panel properties here, like "border", see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',
    border: false,
    items: [

        {
            xtype: 'hr_mappanel',
            region: "center",

            /** Below are Heron-specific settings for the MapPanel (xtype: 'hr_mappanel') */
            hropts: {
                layers: [
                    // Using the new config method without "new"
                    ["OpenLayers.Layer.WMS", "World Map",
                        "http://www2.demis.nl/WMS/wms.asp?WMS=WorldMap",
                        {layers: 'Coastlines', format: 'image/png' },
                        { metadata: {
                            legend: {
                                // Use a fixed URL as legend
                                legendURL: 'legenda-t25raster.png',
                                hideInLegend: false
                            }
                        }
                        }
                    ]
                ]
            }},
        {
            xtype: 'hr_layerlegendpanel',
            region: "east",
            width: 240,
            collapsible: true,
            split: false,
            border: true,
            defaults: {
                useScaleParameter: true,
                baseParams: {
                    FORMAT: 'image/png'
                }
            },
            hropts: {
                // Preload Legends on initial startup
                // Will fetch legend images via WMS GetLegendGraphic's for WMS Legends
                // or custom URLs.
                // Otherwise Legends will be loaded only when Layer
                // becomes visible. Default: false
                prefetchLegends: true
            }
        }
    ]

};
