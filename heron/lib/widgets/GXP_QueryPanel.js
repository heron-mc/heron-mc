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

/** api: (define)
 *  module = Heron.widgets
 *  class = GXP_QueryPanel
 *  base_link = `gxp.QueryPanel <http://gxp.opengeo.org/master/doc/lib/widgets/QueryPanel.html>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron GXP_QueryPanel.
 *
 *  .. code-block:: javascript
 *
 */

/** api: constructor
 *  .. class:: GXP_QueryPanel(config)
 *
 *  Wrap and configure a GXP QueryPanel.
 */
Heron.widgets.GXP_QueryPanel = Ext.extend(gxp.QueryPanel, {
    description: __('Ready'),
    wfsVersion: '1.1.0',
    title: __('Query Panel'),
    bodyStyle: 'padding: 12px',

    wfsLayers: undefined,

    layerFilter: function (map) {
        // Select only those (WMS) layers that have a WFS attached.
        // Note: WMS-layers should have the 'metadata.wfs' property configured,
        // either with a full OL WFS protocol object or the string 'fromWMSLayer'.
        // The latter means that a WMS has a related WFS (GeoServer usually).
        return map.getLayersBy('metadata',
                {
                    test: function (metadata) {
                        // no BBOX: some GeoServer WFS-es seem to hang on BBOX queries, so skip
                        return metadata && metadata.wfs && !metadata.wfs.noBBOX;
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
        var self = this;

        // WFS Layers may be preconfigured or from WMS derived (e.g. GeoServer)
        var wfsLayers = this.getWFSLayers();

        // Initial config for QueryPanel
        var config = {
            map: map,
            layerStore: new Ext.data.JsonStore({
                data: {
                    layers: wfsLayers
                },
                root: "layers",
                fields: ["title", "name", "namespace", "url", "schema"]
            }),
            listeners: {
                ready: function (panel, store) {
                    store.addListener("exception", this.onQueryException, this);
                },
                beforequery: function (panel, store) {
                },
                query: function (panel, store) {
                    this.fireEvent('searchissued', this);
                },
                storeload: function (panel, store) {
                    var features = [];
                    store.each(function (record) {
                        features.push(record.get("feature"));
                    });
                    this.fireEvent('searchcomplete', panel, features);
                    store.removeListener("exception", this.onQueryException, this);
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

        this.infoPanel = this.add({
            xtype: "hr_htmlpanel",
            html: this.description,
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
        });

        this.searchButton = this.addButton({
            text: __('Search'),
            disabled: false,
            handler: function () {
                self.search();
            },
            scope: this
        });

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

    getWFSLayers: function() {
        var self = this;

        // Preconfigured: return immediately
        if (this.wfsLayers) {
            return this.wfsLayers;
        }

        var wmsLayers = this.layerFilter(this.map);
        var wfsLayers = [];
        Ext.each(wmsLayers, function (wmsLayer) {
            // Determine WFS options
            var wfsOpts = wmsLayer.metadata.wfs;

            // protocol is either 'fromWMSLayer' or a full OL WFS Protocol object
            var protocol = wfsOpts.protocol;
            if (wfsOpts.protocol === 'fromWMSLayer') {
                protocol = OpenLayers.Protocol.WFS.fromWMSLayer(wmsLayer);
            }

            var url = protocol.url.indexOf('?') == protocol.url.length - 1 ? protocol.url.slice(0, -1) : protocol.url;
            var featureType = protocol.featureType;
            var featurePrefix = wfsOpts.featurePrefix;
            var fullFeatureType = featurePrefix ? featurePrefix + ':' + featureType : featureType;
            var wfsVersion = protocol.version ? protocol.version : self.version;

            var wfsLayer = {
                title: wmsLayer.name,
                name: featureType,
                namespace: wfsOpts.featureNS,
                url: url,
                schema: url + '?service=WFS&version=' + wfsVersion +'&request=DescribeFeatureType&typeName=' + fullFeatureType
            };
            wfsLayers.push(wfsLayer);
        });
        return wfsLayers;
    },

    getFeatureType: function () {
        return this.targetLayer ? this.targetLayer.name : 'heron';
    },

    updateInfoPanel: function (text) {
        this.infoPanel.body.update(text);
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
    onQueryException: function (type, action, obj, response_error, o_records) {
        // First check for failures
//        if (!result || !result.success() || result.priv.responseText.indexOf('ExceptionReport') > 0) {
//            this.fireEvent('searchfailed', searchPanel, result);
//            this.updateInfoPanel(__('Search Failed') + ' details: ' + result.priv.responseText);
//            return;
//        }
        this.searchButton.enable();
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.updateInfoPanel(__('Search Failed'));

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
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.searchButton.disable();
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
    onSearchComplete: function (searchPanel, features) {
        this.searchButton.enable();
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.searchState = "searchcomplete";

        // All ok display result and notify listeners
        this.updateInfoPanel(__('Search Completed: ') + (features ? features.length : 0) + ' ' + __('Feature(s)'));
        this.fireEvent('searchsuccess', searchPanel, features);
    },

    /** api: method[search]
     *
     *  Issue query via GXP QueryPanel.
     */
    search: function () {
        this.query();
    }
});

/** api: xtype = hr_gxpquerypanel */
Ext.reg('hr_gxpquerypanel', Heron.widgets.GXP_QueryPanel);
