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

/** api: example[querybuilder]
 *  Edit and execute WFS Queries
 *  ----------------------------
 *  Use the GXP QueryPanel to build and execute WFS spatial and filter-queries.
 */

/** This config assumes the DefaultOptionsWorld.js to be included first!! */
Heron.options.map.settings.zoom = 14;
Ext.namespace("Heron.examples");

/** Create a config for the search panel. This panel may be embedded into the accordion
 * or bound to the "find" button in the toolbar. Here we use the toolbar button.
 */
Heron.examples.searchPanelConfig = {
    xtype: 'hr_searchcenterpanel',
    id: 'hr-searchcenterpanel',
    height: 600,
    hropts: {
        searchPanel: {
            xtype: 'hr_gxpquerypanel',
            id: 'hr-hr_gxpquerypanel',
            header: false,
            border: false,
            bodyStyle: 'padding: 6px',
            style: {
                fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                fontSize: '12px'
            },
            hropts: {
                onSearchCompleteZoom: 10
            }
        },
        resultPanel: {
            xtype: 'hr_featuregridpanel',
            id: 'hr-featuregridpanel',
            header: false,
            border: false,
            autoConfig: true,
            hropts: {
                zoomOnRowDoubleClick: true,
                zoomOnFeatureSelect: false,
                zoomLevelPointSelect: 8,
                zoomToDataExtent: true
            }
        }
    }
};


// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. By providing a "create" function your own toolbar
// item can be added.
// For menu's and other standard ExtJS Toolbar items, the "any" type can be
// used. There you need only pass the options, similar as in the function
// ExtJS Toolbar.add().
Heron.options.map.toolbar = [
    {type: "featureinfo", options: {max_features: 20}},
    {type: "-"} ,
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"},
    {type: "-"},
    {
        type: "searchcenter",
        // Options for SearchPanel window
        options: {
            show: true,

            searchWindow: {
                title: __('Spatial Search'),
                x: 100,
                y: undefined,
                width: 380,
                height: 420,
                items: [
                    Heron.examples.searchPanelConfig
                ]
            }
        }
    }

];

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
Ext.namespace("Heron.widgets.gxp");

/** api: (define)
 *  module = Heron.widgets
 *  class = QueryPanel
 *  base_link = `GeoExt.form.FormPanel <http://www.geoext.org/lib/GeoExt/widgets/form/FormPanel.html>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron QueryPanel.
 *
 *  .. code-block:: javascript
 *
 Heron.examples.searchPanelConfig = {
		xtype: 'hr_searchcenterpanel',
		id: 'hr-searchcenterpanel',
		title: __('Search'),
		height: 600,
		hropts: {
			searchPanel: {
				xtype: 'hr_QueryPanel',
				id: 'hr-QueryPanel',
				header: false,
				bodyStyle: 'padding: 6px',
				style: {
					fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
					fontSize: '12px'
				},
				hropts: {
					layerFilter: function (map) {
						return map.getLayersByClass('OpenLayers.Layer.WMS');
					},
					onSearchCompleteZoom: 10
				}
			},
			resultPanel: {
				xtype: 'hr_featuregridpanel',
				id: 'hr-featuregridpanel',
				title: __('Search'),
				header: false,
				autoConfig: true,
				hropts: {
					zoomOnRowDoubleClick: true,
					zoomOnFeatureSelect: false,
					zoomLevelPointSelect: 8,
					zoomToDataExtent: true
				}
			}
		}
		};
 */

/** api: constructor
 *  .. class:: QueryPanel(config)
 *
 *  A panel designed to hold a spatial search .
 */
Heron.widgets.GXP_QueryPanel = Ext.extend(gxp.QueryPanel, {
    description: '',

    fromLastResult: false,
    lastSearchName: null,
    filterFeatures: null,
    showFilterFeatures: true,
    maxFilterGeometries: 12,
    selectLayerStyle: {
        strokeColor: "#0000dd",
        strokeWidth: 1,
        fillOpacity: 0.2,
        fillColor: "#0000cc"},

    layout: {
        type: 'vbox',
        padding: '10',
        align: 'stretch'
    },

//	defaults: {margins: '0 0 5 0'},
    border: false,

    layerFilter: function (map) {
        // Select only those (WMS) layers that have a WFS attached
        // Note: WMS-layers should have the 'metadata.wfs' property configured,
        // either with a full OL WFS protocol object or the string 'fromWMSLayer'.
        // The latter means that a WMS has a related WFS (GeoServer usually).
        return map.getLayersBy('metadata',
                {
                    test: function (metadata) {
                        return metadata && metadata.wfs;
                    }
                }
        )
    },

    progressMessages: [
        __('Working on it...'),
        __('Still searching, please be patient...'),
        __('Still searching, have you selected an area with too many features?')
    ],

// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
    initComponent: function () {


        var map = this.map = Heron.App.getMap();
        var PDOK_URL = 'http://geodata.nationaalgeoregister.nl';
//        var vector = new OpenLayers.Layer.Vector("QueryResult", {visibility: true});
//        map.addLayers([vector]);
        var panel = this;
        var config = {
            title: "Query Panel",
//                renderTo: "query",
            width: 380,
            bodyStyle: "padding: 10px",
            map: map,
            layerStore: new Ext.data.JsonStore({
                data: {
                    layers: [
                        {
                            title: "PDOK - BAG Panden",
                            name: "pand",
                            url: PDOK_URL + '/bagviewer/wfs?outputformat',
                            schema: PDOK_URL + '/bagviewer/wfs?version=1.1.0&request=DescribeFeatureType&typeName=bagviewer:pand'
                        },
                        {
                            title: "PDOK - BAG Adressen",
                            name: "inspireadressen",
                            namespace: "http://inspireadressen.geonovum.nl",
                            url: PDOK_URL + '/inspireadressen/wfs',
                            schema: PDOK_URL + '/inspireadressen/wfs?version=1.1.0&request=DescribeFeatureType&typeName=inspireadressen:inspireadressen'
                        },
                        {
                            title: "PDOK - BAG Verblijfsobjecten",
                            name: "verblijfsobject",
                            url: PDOK_URL + '/bagviewer/wfs?outputformat',
                            schema: PDOK_URL + '/bagviewer/wfs?version=1.1.0&request=DescribeFeatureType&typeName=bagviewer:verblijfsobject'
                        }
                    ]
                },
                root: "layers",
                fields: ["title", "name", "namespace", "url", "schema"]
            }),
            bbar: ["->", {
                text: "Query",
                handler: function () {
                    panel.query();
                }
            }],
            listeners: {
                ready: function (panel, store) {
                    // store.proxy.protocol.options.outputFormat = 'GML2';
                },
                storeload: function (panel, store) {
//                    vector.destroyFeatures();
                    var features = [];
                    store.each(function (record) {
                        features.push(record.get("feature"));
                    });
                    this.fireEvent('searchsuccess', panel, features);

//                    vector.addFeatures(features);
                }
            }
        };
        Ext.apply(this, config);
        // Setup our own events
        this.addEvents({
            "searchissued": true,
            "searchcomplete": true,
            "searchfailed": true,
            "searchsuccess": true
        });

        Heron.widgets.GXP_QueryPanel.superclass.initComponent.call(this);

        this.addListener("searchissued", this.onSearchIssued, this);
        this.addListener("searchcomplete", this.onSearchComplete, this);
        this.addListener("beforedestroy", this.onBeforeDestroy, this);

        // ExtJS lifecycle events
        this.addListener("afterrender", this.onPanelRendered, this);

        if (this.ownerCt) {
            this.ownerCt.addListener("parenthide", this.onParentHide, this);
            this.ownerCt.addListener("parentshow", this.onParentShow, this);
        }
    },

    getFeatureType: function () {
        return this.targetLayer ? this.targetLayer.name : 'heron';
    },

    updateInfoPanel: function (text) {
        this.getComponent('hr_spatsearchinfopanel').body.update(text);
    },


    /** api: method[onLayerSelect]
     *  Called when Layer selected.
     */
    onLayerSelected: function () {
        if (!this.fromLastResult) {
            this.addDrawingToolbar();
            this.updateInfoPanel(__('Choose a geometry tool and draw with it to search for features that touch it.'));
        } else {
            if (!this.filterFeatures || this.filterFeatures.length == 0) {
                this.updateInfoPanel(__('No features found from last search.'));
                return;
            }
            if (this.filterFeatures.length > this.maxFilterGeometries) {
                this.updateInfoPanel(__('Too many geometries for spatial filter: ') + this.filterFeatures.length + ' ' + 'max: ' + this.maxFilterGeometries);
                return;
            }
            this.searchButton.enable();
            this.updateInfoPanel(__('Press the Search button to start your Search.'));
        }
    },

    /** api: method[onPanelRendered]
     *  Called when Panel has been rendered.
     */
    onPanelRendered: function () {
    },

    /** api: method[onParentShow]
     *  Called when parent Panel is shown in Container.
     */
    onParentShow: function () {

    },

    /** api: method[onParentHide]
     *  Called when parent Panel is hidden in Container.
     */
    onParentHide: function () {

    },


    /** api: method[onBeforeDestroy]
     *  Called just before Panel is destroyed.
     */
    onBeforeDestroy: function () {

    },

    /** api: method[onSearchIssued]
     *  Called when remote search (WFS) query has started.
     */
    onSearchIssued: function () {
        this.searchState = "searchissued";
        this.response = null;
        this.features = null;
        this.updateInfoPanel(__('Searching...'));

        // If search takes to long, give some feedback
        var self = this;
        var startTime = new Date().getTime() / 1000;
        this.timer = setInterval(function () {
            if (self.searchState != 'searchissued') {
                return;
            }

            // User feedback with seconds passed and random message
            self.updateInfoPanel(Math.floor(new Date().getTime() / 1000 - startTime) +
                    ' ' + __('Seconds') + ' - ' +
                    self.progressMessages[Math.floor(Math.random() * self.progressMessages.length)]);

        }, 4000);
    },

    /** api: method[onSearchComplete]
     *  Function to call when search is complete.
     *  Default is to show "Search completed" with feature count on progress label.
     */
    onSearchComplete: function (searchPanel, result) {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.searchState = "searchcomplete";

        if (this.selectionLayer) {
            // this.selectionLayer.removeAllFeatures();
        }

        // First check for failures
        if (!result || !result.success() || result.priv.responseText.indexOf('ExceptionReport') > 0) {
            this.fireEvent('searchfailed', searchPanel, result);
            this.updateInfoPanel(__('Search Failed') + ' details: ' + result.priv.responseText);
            return;
        }

        // All ok display result and notify listeners
        var features = this.features = this.filterFeatures = result.features;
        this.updateInfoPanel(__('Search Completed: ') + (features ? features.length : 0) + ' ' + __('Feature(s)'));
        this.fireEvent('searchsuccess', searchPanel, features);
    },

    /** api: method[searchFromFeatures]
     *
     *  Issue spatial search via WFS.
     */
    searchFromFeatures: function () {
        this.searchButton.disable();

        var geometries = [];
        for (var i = 0; i < this.filterFeatures.length; i++) {
            geometries.push(this.filterFeatures[i].geometry);
        }

        if (!this.search(geometries, {projection: this.targetLayer.projection, units: this.targetLayer.units})) {
            this.filterFeatures = null;
        }
    },

    /** api: method[searchFromFeatures]
     *
     *  Issue spatial search via WFS.
     */
    searchFromSketch: function () {
        // Protect against too many features returned in query (see wfs config options)
        var selectionLayer = this.selectionLayer;
        var geometry = selectionLayer.features[0].geometry;
        if (!this.search([geometry], {projection: selectionLayer.projection, units: selectionLayer.units})) {
            this.selectionLayer.removeAllFeatures();
        }
    },

    /** api: method[search]
     *
     *  Issue spatial search via WFS.
     */
    search: function (geometries, options) {
        var searchLayer = this.targetLayer;

        // Determine WFS protocol
        var wfsOptions = searchLayer.metadata.wfs;

        if (wfsOptions.protocol == 'fromWMSLayer') {
            // WMS has related WFS layer (usually GeoServer)
            this.protocol = OpenLayers.Protocol.WFS.fromWMSLayer(searchLayer, {outputFormat: 'GML2'});
        } else {
            // WFS via Regular OL WFS protocol object
            this.protocol = wfsOptions.protocol;
        }

        var geometry = geometries[0];
        // Create WFS Spatial Filter from Geometry
        var filter = new OpenLayers.Filter.Spatial({
            type: OpenLayers.Filter.Spatial.INTERSECTS,
            value: geometry
        });

        if (geometries.length > 1) {
            var filters = [];
            geometry = new OpenLayers.Geometry.Collection();
            Ext.each(geometries, function (g) {
                geometry.addComponent(g);
                filters.push(new OpenLayers.Filter.Spatial({
                    type: OpenLayers.Filter.Spatial.INTERSECTS,
                    value: g
                }));
            });

            filter = new OpenLayers.Filter.Logical({
                type: OpenLayers.Filter.Logical.OR,
                filters: filters
            });
        }
        if (geometry.CLASS_NAME.indexOf('LineString') > 0 && wfsOptions.maxQueryLength) {
            var length = Math.round(geometry.getGeodesicLength(options.projection));
            if (length > wfsOptions.maxQueryLength) {
                this.selectionLayer.removeAllFeatures();
                var units = options.units;
                Ext.Msg.alert(__('Warning - Line Length is ') + length + units, __('You drew a line with length above the layer-maximum of ') + wfsOptions.maxQueryLength + units);
                return;
            }
        }
        if (geometry.CLASS_NAME.indexOf('Polygon') > 0 && wfsOptions.maxQueryArea) {
            var area = Math.round(geometry.getGeodesicArea(options.projection));
            if (area > wfsOptions.maxQueryArea) {
                this.selectionLayer.removeAllFeatures();
                var areaUnits = options.units + '2';
                Ext.Msg.alert(__('Warning - Area is ') + area + areaUnits, __('You selected an area for this layer above its maximum of ') + wfsOptions.maxQueryArea + areaUnits);
                return;
            }
        }

        // Issue the WFS request
        this.response = this.protocol.read({
            maxFeatures: this.single == true ? this.maxFeatures : undefined,
            filter: filter,
            callback: function (result) {
                this.fireEvent('searchcomplete', this, result);
            },
            scope: this
        });
        this.fireEvent('searchissued', this);
    }
});

/** api: xtype = hr_QueryPanel */
Ext.reg('hr_gxpquerypanel', Heron.widgets.GXP_QueryPanel);
