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

/** api: example[appgxpviewer]
 *  Apps - GXP Viewer
 *  -----------------
 *  Heron apps, as-is integration of Boundless GXP Viewer in Heron.
 */

Heron.app =
{
    // The app type, ExtJS class, registered in Heron already via
    // Ext.reg('gxp_viewer', gxp.Viewer);
    xtype: 'gxp_viewer',

    // The standard GXP Viewer config see  http://gxp.opengeo.org/master/examples/
    proxy: "/cgi-bin/proxy.cgi?url=",
    portalConfig: {
        id: 'portal',
        renderTo: document.body,
        layout: "border",
        width: 650,
        height: 465,

        // by configuring items here, we don't need to configure portalItems
        // and save a wrapping container
        items: [
            {
                // a TabPanel with the map and a dummy tab
                id: "centerpanel",
                xtype: "tabpanel",
                region: "center",
                activeTab: 0, // map needs to be visible on initialization
                border: true,
                items: ["mymap", {title: "Dummy Tab"}]
            },
            {
                // container for the FeatureGrid
                id: "south",
                xtype: "container",
                layout: "fit",
                region: "south",
                height: 150
            },
            {
                // container for the queryform
                id: "west",
                xtype: "container",
                layout: "fit",
                region: "west",
                width: 200
            },
            {
                xtype: 'hr_htmlpanel',
                region: "east",
                border: true,
                html: '<div class="hr-html-panel-body"><p>Example of GXP integration in Heron, ' +
                    'see config file <a target="_new" href="Config.js">Config.js</a>. Heron widgets like this HTMLPanel ' +
                    'can be integrated (currently with some limitations, e.g. Heron Toolbar). </p><p>The main config uses the standard GXP Viewer configuration API ' +
                    'as documented in the <a target="_new" href="http://gxp.opengeo.org/master/doc/">GXP API docs</a></p>' +
                    '<p>See also the <a target="_new" href="http://gxp.opengeo.org/master/examples/">GXP examples</a> ' +
                    'for many more gxp.Viewer example configs.</p></div>',
                width: 180,
                preventBodyReset: true,
                title: 'Info'
            }
        ],
        bbar: {id: "mybbar"}
    },

// configuration of all tool plugins for this application
    tools: [
        {
            ptype: "gxp_loadingindicator"
        },
        {
            ptype: "gxp_layertree",
            outputConfig: {
                id: "tree",
                border: true,
                tbar: [] // we will add buttons to "tree.bbar" later
            },
            outputTarget: "west"
        },
        {
            ptype: "gxp_addlayers",
            actionTarget: "tree.tbar"
        },
        {
            ptype: "gxp_removelayer",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        },
        {
            ptype: "gxp_layerproperties",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        },
        {
            ptype: "gxp_zoomtoextent",
            actionTarget: "map.tbar"
        },
        {
            ptype: "gxp_zoom",
            actionTarget: "map.tbar"
        },
        {
            ptype: "gxp_navigationhistory",
            actionTarget: "map.tbar"
        },
        {
            ptype: "gxp_wmsgetfeatureinfo",
            outputConfig: {
                width: 400,
                height: 200
            },
            actionTarget: "map.tbar", // this is the default, could be omitted
            toggleGroup: "layertools"
        },
        {
            ptype: "gxp_mapproperties",
            outputConfig: {
                title: 'Map properties'
            }
        },
        {
            // shared FeatureManager for feature editing, grid and querying
            ptype: "gxp_featuremanager",
            id: "featuremanager",
            maxFeatures: 20
        },
        {
            ptype: "gxp_featureeditor",
            featureManager: "featuremanager",
            autoLoadFeature: true, // no need to "check out" features
            outputConfig: {panIn: false},
            toggleGroup: "layertools"
        },
        {
            ptype: "gxp_featuregrid",
            featureManager: "featuremanager",
            outputConfig: {
                id: "featuregrid"
            },
            outputTarget: "south"
        },
        {
            ptype: "gxp_queryform",
            featureManager: "featuremanager",
            outputConfig: {
                title: "Query",
                width: 320
            },
            actionTarget: ["featuregrid.bbar", "tree.contextMenu"],
            appendActions: false
        },
        {
            // not a useful tool - just a demo for additional items
            actionTarget: "portal.mybbar", // ".bbar" would also work
            actions: [
                {text: "Click me - I'm a tool on the portal's bbar"}
            ]
        }
    ],

// layer sources
    defaultSourceType: "gxp_wmssource",
    sources: {
        opengeosuite: {
            url: "http://suite.opengeo.org/geoserver/ows",
            version: "1.1.1",
            title: 'OpenGeo Suite WMS'
        },

//        opengeogxp: {
//            url: "http://gxp.opengeo.org/geoserver/wms",
//            version: "1.1.1",
//            title: 'Boundless WMS'
//        },
        warwickshire: {
            url: "http://maps.warwickshire.gov.uk/gs/wms",
            version: "1.1.1",
            title: 'Warwickshire Historic Maps'
        },
        opengeotms: {
            ptype: "gxp_tmssource",
            url: "http://maps.opengeo.org/geowebcache/service/tms"
        },
        mapquest: {
            ptype: "gxp_mapquestsource"
        },
        ol: {
            ptype: "gxp_olsource"
        },

        osm: {
            ptype: "gxp_osmsource"
        },
        google: {
            ptype: "gxp_googlesource"
        }
    },

// map and layers
    map: {
        id: "mymap", // id needed to reference map in portalConfig above
        title: "Map",
        projection: "EPSG:900913",
        units: "m",
        maxExtent: [-20037508.34, -20037508.34, 20037508.34, 20037508.34],
        center: [-10764594.758211, 4523072.3184791],
        zoom: 3,
        controls: [
            new OpenLayers.Control.Zoom(),
            new OpenLayers.Control.Attribution(),
            new OpenLayers.Control.Navigation()
        ],
        layers: [
            {
                source: "ol",
                type: "OpenLayers.Layer",
                args: ["Blank"],
                visibility: false,
                group: "background"
            },
            {
                source: "mapquest",
                name: "osm",
                group: "background"
            },
            {
                source: "opengeosuite",
                name: "usa:states",
                title: "States, USA - Population",
                queryable: true,
                bbox: [-13884991.404203, 2870341.1822503, -7455066.2973878, 6338219.3590349],
                selected: true
            }
        ]
    }
};
