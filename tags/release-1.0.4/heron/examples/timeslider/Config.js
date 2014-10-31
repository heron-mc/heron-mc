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
/** api: example[timeslider]
 *  TimeSlider
 *  ----------
 *  Show time-based Layer data via WMS Time using a timeslider.
 */

Ext.namespace("Heron");
Ext.namespace("Heron.options");
Ext.namespace("Heron.options.layertree");

/** Collect layers from above, these are actually added to the map.
 * One could also define the layer objects here immediately.
 * */
Heron.options.map.layers = [
    /*
     * ==================================
     *            BaseLayers
     * ==================================
     */
//	Heron.scratch.layermap.pdok_natura2000_wmts,
    Heron.scratch.layermap.openbasiskaart_osm,
    Heron.scratch.layermap.pdok_brtachtergrondkaart,
    Heron.scratch.layermap.topraster,
    Heron.scratch.layermap.top10nlgeodan,
    Heron.scratch.layermap.luchtfotopdok,
    Heron.scratch.layermap.blanco,

    /*
     * ==================================
     *            OVERLAYS
     * ==================================
     */

/** BAG PDOK. */
    Heron.scratch.layermap.bag_adressen,
    Heron.scratch.layermap.bag_panden,
    Heron.scratch.layermap.bag_panden_selected,
    Heron.scratch.layermap.bag_panden_wfs,
    Heron.scratch.layermap.bag_woonplaatsen_wfs,

    Heron.scratch.layermap.bag_verblijfsobjecten,
    Heron.scratch.layermap.nwb_wegen,
    Heron.scratch.layermap.lawroutes,
    Heron.scratch.layermap.streekpaden,
    Heron.scratch.layermap.lfroutes,

    Heron.scratch.layermap.knmi_radar_color,
    Heron.scratch.layermap.knmi_radar_bw,

    /* ------------------------------
     * DEM NL Colour Relief
     * ------------------------------ */
    Heron.scratch.layermap.ahndem2,

    /* ------------------------------
     * Hockeyclubs
     * ------------------------------ */
    Heron.scratch.layermap.hockeyclubs,
    Heron.scratch.layermap.aardbevingen,

    /* ------------------------------
     * RD info
     * ------------------------------ */
    Heron.scratch.layermap.rdinfopunten,
    Heron.scratch.layermap.rdinfostations,

    /* ------------------------------
     * Ecologische Hoofdstructuur (EHS)
     * ------------------------------ */
//	Heron.scratch.layermap.ehs,
    Heron.scratch.layermap.natura2000,
    Heron.scratch.layermap.natura2000tms,
    Heron.scratch.layermap.natura2000wmts,

    /* ------------------------------
     * LKI Kadastrale Vlakken
     * ------------------------------ */
    Heron.scratch.layermap.lki_vlakken,
    Heron.scratch.layermap.lki_gebouwen_tiled,
    Heron.scratch.layermap.kadkaart_tiled,

/** TNO **/
    Heron.scratch.layermap.tno_grondwaterstanden,
    Heron.scratch.layermap.tno_grondboorgaten

];

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 **/
Heron.layout = {
    xtype: 'panel',

    /* Optional ExtJS Panel properties here, like "border", see ExtJS API docs. */
    id: 'hr-container-main',
    layout: 'border',
    border: false,

    /** Any classes in "items" and nested items are automatically instantiated (via "xtype") and added by ExtJS. */
    items: [
        {
            xtype: 'panel',
            id: 'hr-menu-left-container',
            layout: 'accordion',
            region: "west",
            width: 240,
            collapsible: true,
            border: false,
            items: [
                {
                    xtype: 'hr_layertreepanel',
                    border: true,

                    // The LayerTree tree nodes appearance: default is ugly ExtJS document icons
                    // Other values are 'none' (no icons). May be overridden in specific 'gx_layer' type config.
                    layerIcons : 'bylayertype',

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
                    // Optional, use internal default if not set
                    hropts: Heron.options.layertree
                },

                {
                    xtype: 'hr_htmlpanel',
                    id: 'hr-info-west',
                    border: true,
                    html: Heron.options.info.html,
                    preventBodyReset: true,
                    title: 'Info'
                },
                {
                    xtype: 'hr_bookmarkspanel',
                    id: 'hr-bookmarks',
                    border: true,
                    /** The map contexts to show links for in the BookmarksPanel. */
                    hropts: Heron.options.bookmarks
                }
            ]
        },
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
                    title: '&nbsp;',
                    region: 'center',
                    collapsible: false,
                    border: false,
                    hropts: Heron.options.map
                },
                {
                    xtype: 'hr_timesliderpanel',
                    id: 'hr-timesliderpanel',
                    region: 'south',
                    html: '<div id="slider-container" style="margin-left:2px;width:100%;border:none;"><div id="sliderbar" style="position: relative; top: 0px;margin: 0px; h-align: center; width: 100%;height: 100%;border:none;"></div></div><form id="timeslide"><input type="hidden" id="datStart" value="x"/></form>',
                    layerNames: ['KNMI Aardbevingen'],
                    timelineStartYear: 2012,
                    timelineEndYear: 2014,
                    timelineCenterDate: '2013-07-01',
                    timelineDayWidth: 1,
                    timelineZoom: true,
                    filterTitle: 'Filter op periode:',
                    filterStartDate: '2013-07-01',
                    filterEndDate: '2013-08-01',
                    height: 45,
                    header: true,
                    collapsible: false,
                    collapsed: false,
                    padding: '0px'
                }

            ]
        },
        {
            xtype: 'panel',

            id: 'hr-menu-right-container',
            layout: 'accordion',
            region: "east",
            width: 240,
            collapsible: true,
            split: false,
            border: false,
            items: [
                {
                    xtype: 'hr_layerlegendpanel',
                    id: 'hr-layerlegend-panel',
                    border: true,
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
        }
    ]
};
