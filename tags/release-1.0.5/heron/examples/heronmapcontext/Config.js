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
Ext.namespace("Heron.options");
Ext.namespace("Heron.options.map");

/** api: example[heronmapcontext]
 *  Heron Map Context
 *  -----------------
 *  Configure Layers and Layertree from a local or remote context XML file.
 */



OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

/*
 * Common settings for MapPanel
 * These will be assigned as "hropts" within the MapPanel config
 */
Heron.options.map.toolbar = [
    {type: "scale", options: {width: 110}},
    {type: "-"} ,
    {type: "featureinfo", options: {
        popupWindow: {
            width: 360,
            height: 200,
            featureInfoPanel: {
                showTopToolbar: true,

                // Should column-names be capitalized? Default true.
                columnCapitalize: true,

                // displayPanels option values are 'Table' and 'Detail', default is 'Table'
                // displayPanels: ['Table', 'Detail']
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                // 'GeoPackage' needs heron.cgi with GDAL 1.1+ !!
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoPackage', 'GeoJSON', 'WellKnownText'],
                maxFeatures: 10
            }
        }
    }},
    {type: "-"} ,
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
//    {type: "coordinatesearch", options: {onSearchCompleteZoom: 8, fieldLabelX: 'lon', fieldLabelY: 'lat'}},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"},
//    {type: "-"},
//    {type: "measurelength", options: {geodesic: true}},
//    {type: "measurearea", options: {geodesic: true}},
    {type: "-"},
//    {type: "addbookmark"},
    {type: "help", options: {tooltip: 'Help and info for this example', contentUrl: 'help.html'}}
];


/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 * Note the 'mapContextUrl' and 'useMapContext' settings for LayerTreePanel and MapPanel. These
 * are indicators to load the Map Context from an XML file given by 'mapContextUrl'.
 *
 **/
Heron.layout = {
    xtype: 'panel',

    // Define the Heron Map Context (HMC): the file containing Map settings and LayerTree.
    mapContextUrl: 'context/pdok-merged.xml',
    // mapContextUrl: 'context/pdok-thematic-unmerged.xml',
    // mapContextUrl:  'http://pdokviewer.pdok.nl/config/default.xml',

    mapContextOptions: {
    // mapContextOptions: 'options for loading the xml defined in mapContextUrl'
        showLoadMask: true
        // showLoadMask: 'show a load mask while loading the xml defined in mapContextUrl, default is true',
    },

    /* Optional ExtJS Panel properties here, like "border", see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',
    border: false,
    title: 'Heron Map Context - Click (?) Button for Help',

    /** Any classes in "items" and nested items are automatically instantiated (via "xtype") and added by ExtJS. */
    items: [
        {
            xtype: 'panel',
            id: 'hr-menu-left-container',
            layout: 'accordion',
            region: "west",
            width: 320,
            collapsible: false,
            border: false,
            split: false,

            items: [
                {
                    xtype: 'hr_activethemespanel',
                    title: __('Active Layers'),
                    border: true,
                    height: 140,
                    collapsed: true,
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
                    ],

                    hropts: {
                        // Defines the custom components added with the standard layer node.
                        showOpacity: true, // true - layer opacity icon / function
                        showTools: false, // true - layer tools icon / function (not jet completed)
                        showRemove: false        // true - layer remove icon / function
                    }
                },
                {
                    xtype: 'hr_layertreepanel',
                    border: true,

                    // The LayerTree tree nodes appearance: default is ugly ExtJS document icons
                    // Other values are 'none' (no icons). May be overridden in specific 'gx_layer' type config.
                    layerIcons: 'bylayertype',

                    // LayerTree is taken from global Heron context
                    useMapContext: true
                }
            ]
        },
        {
            xtype: 'hr_mappanel',
            id: 'hr-map',
            title: null,
            split: false,
            region: 'center',
            width: '100%',
            collapsible: false,
            border: false,
            // Map settings and Layers are taken from the Heron.App Context
            useMapContext: true,
            hropts: {
                toolbar: Heron.options.map.toolbar
            }
        },
        {
            /** Shows Legends for selected Layers. */
            xtype: 'hr_layerlegendpanel',
            width: '240',
            split: false,
            collapsible: false,
            border: false,
            region: 'east',
            hropts: {prefetchLegends: false}
        }
    ]
};
