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

/** api: example[vectorstyler]
 *  Vector Styler
 *  -------------
 *  Style Vector Layers interactively.
 */
/** Zoom into center Amersfoort. */
Heron.options.map.settings.zoom = 8;

var gpxLayer = new OpenLayers.Layer.Vector('GPX Track', {
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
        url: 'data/20110123.gpx',
        format: new OpenLayers.Format.GPX()
    }),
    style: {strokeColor: 'red', strokeWidth: 3, strokeOpacity: 0.8},
    projection: new OpenLayers.Projection("EPSG:4326")
});

var parcelLayer = new OpenLayers.Layer.Vector('Parcels', {
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
        url: 'data/parcels.json',
        format: new OpenLayers.Format.GeoJSON()
    }),
    projection: new OpenLayers.Projection("EPSG:28992")
});

var addressLayer = new OpenLayers.Layer.Vector('Addresses', {
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
        url: 'data/addresspoints.json',
        format: new OpenLayers.Format.GeoJSON()
    }),
    styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style(null, {

            rules: [new OpenLayers.Rule({
                title: 'Address Point',
                symbolizer: {
                    "Point": {
                        fillColor: '#07f',
                        fillOpacity: 0.8,
                        graphicName: "circle",
                        strokeColor: '#037',
                        strokeWidth: 2,
                        graphicZIndex: 1,
                        pointRadius: 5
                    }
                }
            })]
        })
    }),

    projection: new OpenLayers.Projection("EPSG:28992")
});

Heron.options.map.layers.push(gpxLayer);
Heron.options.map.layers.push(parcelLayer);
Heron.options.map.layers.push(addressLayer);

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
    {type: "featureinfo", options: {
        popupWindow: {
            width: 360,
            height: 200,
            featureInfoPanel: {
                showTopToolbar: true,

                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'GeoJSON', 'WellKnownText'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                // exportFormats: ['CSV', 'XLS'],
                maxFeatures: 10,

                // In case that the same layer would be requested more than once: discard the styles
                discardStylesForDups: true
            }
        }
    }},

    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"}
];

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 **/
Heron.layout = {
    xtype: 'panel',
    id: 'hr-container-main',
    layout: 'border',

    items: [

        {
            xtype: 'panel',

            id: 'hr-menu-left-container',
            layout: 'vbox',
            layoutConfig: {
                align: 'stretch',
                pack: 'start'
            },
            region: "west",
            width: 240,
            collapsible: true,
            border: false,
            items: [
                {
                    xtype: 'hr_activethemespanel',
                    height: 240,
                    flex: 3,
                    contextMenu: 'defaults',
                    hropts: {
                        // Defines the custom components added with the standard layer node.
                        showOpacity: false, // true - layer opacity icon / function
                        showTools: false, // true - layer tools icon / function (not jet completed)
                        showRemove: false        // true - layer remove icon / function
                    }
                },
                {
                    xtype: 'hr_layertreepanel',
                    flex: 4,
                    contextMenu: [
                        {
                            xtype: 'hr_layernodemenulayerinfo'
                        },
                        {
                            xtype: 'hr_layernodemenuzoomextent'
                        },
                        {
                            xtype: 'hr_layernodemenustyle'
                        },
                        {
                            xtype: 'hr_layernodemenuopacityslider'
                        }
                    ],
                    expanded: true,
                    hropts: Heron.options.layertree
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
            split: true,
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
        },
        {
            xtype: 'hr_layerlegendpanel',
            region: "east",
            width: 240,
            defaults: {
                useScaleParameter: true,
                baseParams: {
                    FORMAT: 'image/png'
                }
            },
            hropts: {
                // Preload Legends on initial startup
                // Will fire WMS GetLegendGraphic's for WMS Legends
                // Otherwise Legends will be loaded only when Layer
                // becomes visible. Default: false
                prefetchLegends: false
            }
        }
    ]
};
