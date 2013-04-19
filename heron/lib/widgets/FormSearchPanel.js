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
Ext.namespace("Heron.widgets");

/** api: (define)
 *  module = Heron.widgets
 *  class = FormSearchPanel
 *  base_link = `GeoExt.form.FormPanel <http://www.geoext.org/lib/GeoExt/widgets/form/FormPanel.html>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron FormSearchPanel.
 *  This example uses the internal default progress messages and action (zoom).
 *  Note that the fields in the items must follow the convention outlined in
 *  `GeoExt.form.SearchAction <http://geoext.org/lib/GeoExt/widgets/form/SearchAction.html>`_.
 *
 *  .. code-block:: javascript

     {
     xtype: 'hr_formsearchpanel',
     id: 'hr-formsearchpanel',
     title: __('Search'),
     bodyStyle: 'padding: 6px',
     style: {
         fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
         fontSize: '12px'
     },
     protocol: new OpenLayers.Protocol.WFS({
                 version: "1.1.0",
                 url: "http://gis.kademo.nl/gs2/wfs?",
                 srsName: "EPSG:28992",
                 featureType: "hockeyclubs",
                 featureNS: "http://innovatie.kadaster.nl"
             }),
     items: [
         {
             xtype: "textfield",
             name: "name__like",
             value: 'Hu*',
             fieldLabel: "  name"
         },
         {
             xtype: "label",
             id: "helplabel",
             html: 'Type name of an NL hockeyclub, use * as wildcard<br/>',
             style: {
                 fontSize: '10px',
                 color: '#CCCCCC'
             }
         }
     ],
     hropts: {
        onSearchCompleteZoom: 10,
        autoWildCardAttach: true,
        caseInsensitiveMatch: true,
        logicalOperator: OpenLayers.Filter.Logical.AND,
        layerOpts: [
         { layerOn: 'lki_staatseigendommen', layerOpacity: 0.4 },
         { layerOn: 'bag_adres_staat_g', layerOpacity: 1.0 }
        ]
}
     }
 */

/** api: constructor
 *  .. class:: FormSearchPanel(config)
 *
 *  A panel designed to hold a (geo-)search form.
 */
Heron.widgets.FormSearchPanel = Ext.extend(GeoExt.form.FormPanel, {

    /** api: config[onSearchCompleteZoom]
     *  Zoomlevel to zoom into when feature(s) found and panned to feature.
     *  default value is 11.
     */
    onSearchCompleteZoom: 11,

    /** api: config[autoWildCardAttach]
     *  Should search strings (LIKE comparison only) always be pre/postpended with a wildcard '*' character.
     *  default value is false.
     */
    autoWildCardAttach: false,

    /** api: config[caseInsensitiveMatch]
     *  Should search strings (LIKE and EQUALS comparison only) be matched case insensitive?
     *  default value is false.
     */
    caseInsensitiveMatch: false,

    /** api: config[logicalOperator]
     *  The logical operator to use when combining multiple fields into a filter expresssion.
     *  Values can be OpenLayers.Filter.Logical.OR ('||') or OpenLayers.Filter.Logical.AND ('&&')
     *  default value is OpenLayers.Filter.Logical.AND.
     */
    logicalOperator: OpenLayers.Filter.Logical.AND,

    /** api: config[layerOpts]
     *  Options for layer activation when search successful.
     */
    layerOpts: undefined,

    /** private: property[defaultProgressLabel]
     *  Label item config when none supplied in items within hropts.
     */
    infoPanel: {
        xtype: "hr_htmlpanel",
        id: 'hr_info' + Math.floor(Math.random() * 10000),
        html: '&nbsp;',
        height: 132,
        preventBodyReset: true,
        bodyCfg: {
            style: {
                padding: '6px',
                border: '0px'
            }
        },
        style: {
            marginTop: '24px',
            paddingTop: '24px',
            fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
            fontSize: '11px',
            color: '#0000C0'
        }
    },

    progressMessages: [
        __('Working on it...'),
        __('Still searching, please be patient...')
    ],

    header: true,
    bodyStyle: 'padding: 6px',
    style: {
        fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
        fontSize: '12px'
    },

// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
    initComponent: function () {

        // Setup our own events
        this.addEvents({
            "searchissued": true,
            "searchcomplete": true,
            "searchfailed": true,
            "searchsuccess": true
        });

        this.infoPanelId = this.infoPanel.id;
        this.items.push(this.infoPanel);

        var hropts = this.hropts;
        Ext.apply(this, hropts);

        Heron.widgets.FormSearchPanel.superclass.initComponent.call(this);

        this.addButton({
            text: __('Search'),
            handler: function () {
                this.action = null;
                this.search();
            },
            scope: this
        });

        this.addListener("searchissued", this.onSearchIssued, this);
        this.addListener("actioncomplete", this.onSearchComplete, this);
    },

    updateInfoPanel: function (text) {
        this.getComponent(this.infoPanelId).body.update(text);
    },

    getFeatureType: function () {
        return this.protocol ? this.protocol.featureType : 'heron';
    },

    /** api: config[onSearchInProgress]
     *  Function to call when search is starting.
     *  Default is to show "Searching..." on progress label.
     */
    onSearchIssued: function () {
        this.searchState = "searchissued";
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

    /** api: config[onSearchComplete]
     *  Function to call when search is complete.
     *  Default is to show "Search completed" with feature count on progress label.
     */
    onSearchComplete: function (form, action) {
        this.searchState = "searchcomplete";

        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        this.fireEvent('searchcomplete', this, action.response);

        if (action && action.response && action.response.success()) {
            var features = this.features = action.response.features;
            this.updateInfoPanel(__('Search Completed: ') + (features ? features.length : 0) + ' ' + __('Feature(s)'));

            if (this.onSearchCompleteAction) {

                // GvS optional activation of layers
                // layerOpts: [
                //	 { layerOn: 'lki_staatseigendommen', layerOpacity: 0.4 },
                //	 { layerOn: 'bag_adres_staat_g', layerOpacity: 1.0 }
                // ]
                // If specified make those layers visible with optional layer opacity
                var lropts = this.layerOpts;
                if (lropts) {
                    var map = Heron.App.getMap();
                    for (var l = 0; l < lropts.length; l++) {
                        if (lropts[l]['layerOn']) {
                            // Get all layers from the map with the specified name
                            var mapLayers = map.getLayersByName(lropts[l]['layerOn']);
                            for (var n = 0; n < mapLayers.length; n++) {

                                // Make layer visible
                                if (mapLayers[n].isBaseLayer) {
                                    map.setBaseLayer(mapLayers[n]);
                                } else {
                                    mapLayers[n].setVisibility(true);
                                }

                                // And set optional opacity
                                if (lropts[l]['layerOpacity']) {
                                    mapLayers[n].setOpacity(lropts[l]['layerOpacity']);
                                }
                            }
                        }
                    }
                }
                this.onSearchCompleteAction(features);
                this.fireEvent('searchsuccess', this, features);
            }
        } else {
            this.fireEvent('searchfailed', this, action.response);
            this.updateInfoPanel(__('Search Failed') + ' details: ' + action.response.priv.responseText);
        }
    },

    /** api: config[onSearchCompleteAction]
     *  Function to call to perform action when search is complete.
     *  Either zoom to single Point feature or zoom to extent (bbox) of multiple features
     */
    onSearchCompleteAction: function (features) {
        // Safeguard
        if (!features || features.length == 0) {
            return;
        }

        var map = Heron.App.getMap();
        if (features.length == 1 && features[0].geometry.CLASS_NAME == "OpenLayers.Geometry.Point" && this.onSearchCompleteZoom) {
            // Case: one Point feature found and onSearchCompleteZoom defined: zoom to Point
            var point = features[0].geometry.getCentroid();
            map.setCenter(new OpenLayers.LonLat(point.x, point.y), this.onSearchCompleteZoom);
        } else {
            // All other cases: zoom to the extent (bounding box) of the features found. See issue 69.
            var geometryCollection = new OpenLayers.Geometry.Collection();
            for (var i = 0; i < features.length; i++) {
                geometryCollection.addComponent(features[i].geometry);
            }
            geometryCollection.calculateBounds();
            map.zoomToExtent(geometryCollection.getBounds());
        }
    },

    /** api: method[search]
     *  :param options: ``Object`` The options passed to the
     *      :class:`GeoExt.form.SearchAction` constructor.
     *
     *  Interceptor to the internal form's search method.
     */
    search: function () {
        Heron.widgets.FormSearchPanel.superclass.search.call(this, {
            wildcard: this.autoWildCardAttach ? GeoExt.form.CONTAINS : -1,
            matchCase: !this.caseInsensitiveMatch,
            logicalOp: this.logicalOperator
        });
        this.fireEvent('searchissued', this);
    }
});

/** api: xtype = hr_formsearchpanel */
Ext.reg('hr_formsearchpanel', Heron.widgets.FormSearchPanel);

// For compatibility with pre v0.73. Heron.widgets.SearchPanel was renamed to Heron.widgets.FormSearchPanel
/** api: xtype = hr_searchpanel */
Ext.reg('hr_searchpanel', Heron.widgets.FormSearchPanel);


