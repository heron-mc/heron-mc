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

// Ext.namespace("Heron.widgets");

/**
 * Class: OpenLayers.Protocol.NGSI10
 *
 * A basic NGSI10 OpenLayers Protocol class for NGSI10 Entity Layers.
 * General info on FIware at: https://www.fiware.org.
 * See https://fiware-orion.readthedocs.org/en/develop/index.html for info on the Fiware Orion
 * Context Broker which implements the NGSI10 protocol API.
 *
 * This Protocol was developed thanks to Geonovum within the http://sensors.geonovum.nl project.
 * See the related Heron Fiware example for usage and in the SOSPilot HeronViewer:
 * http://sensors.geonovum.nl/heronviewer
 */
OpenLayers.Protocol.NGSI10 = OpenLayers.Class(OpenLayers.Protocol.HTTP, {

    /**
     * APIProperty: headers
     * {Object} Initial headers to denote JSON exchange, do not change.
     */
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},

    /**
     * APIProperty: data
     * {Object} NGSI10 queryRequest body as JSON object, may be used as filter, e.g. specific Entity type.
     */
    data: {"entities": [{"isPattern": "true", "id": ".*"}]},

    /**
     * APIProperty: fiwareService
     * {String} the Fiware-service id, to be sent as HTTP header 'Fiware-service', e.g  'fiwareiot'.
     */
    fiwareService: null,

    /**
     * APIProperty: authToken
     * {String} only if authentication needed, will set HTTP headers in praticular 'X-Auth-Token'.
     */
    authToken:  null,

    /**
     * APIProperty: refreshMillis
     * {Long} how often (milliseconds) to refresh. Placeholder for later extension to NGSI subscriptions.
     */
    refreshMillis:  -1,

    initialize: function(options) {
        options = options || {};
        if (options.fiwareService) {
            this.headers['Fiware-service'] = options.fiwareService;
        }
        if (options.authToken) {
            this.headers['X-FI-WARE-OAuth-Header-Name'] = 'X-Auth-Token';
            this.headers['X-FI-WARE-OAuth-Token'] = 'true';
            this.headers['X-Auth-Token'] = options.authToken;
        }
        this.format = new OpenLayers.Format.JSON();
        OpenLayers.Protocol.prototype.initialize.apply(this, [options]);
    },

    /**
     * APIMethod: read
     * Construct a request for reading new features.
     *
     * Parameters:
     * options - {Object} Optional object for configuring the request.
     *     This object is modified and should not be reused.
     *
     * Valid options:
     * url - {String} Url for the request.
     * params - {Object} Parameters to get serialized as a query string.
     * headers - {Object} Headers to be set on the request.
     *
     * Returns:
     * {<OpenLayers.Protocol.Response>} A response object, whose "priv" property
     *     references the HTTP request, this object is also passed to the
     *     callback function when the request completes, its "features" property
     *     is then populated with the features received from the server.
     */
    read: function (options) {
        if (this.timeoutId) {
            return;
        }
        OpenLayers.Protocol.prototype.read.apply(this, arguments);
        OpenLayers.Util.applyDefaults(options, this.options);

        var resp = new OpenLayers.Protocol.Response({requestType: "read"});
        resp.priv = OpenLayers.Request.POST({
            url: options.url,
            callback: this.createCallback(this.handleRead, resp, options),
            data: new OpenLayers.Format.JSON().write(this.data),
            headers: this.headers
        });

        this.lastOptions = options;
        return resp;
    },

    onRefresh: function () {
        this.timeoutId = null;
        this.read(this.lastOptions);
    },

    /**
     * Method: parseFeatures
     * Read HTTP response body and return features.
     *
     * Parameters:
     * request - {XMLHttpRequest} The request object
     *
     * Returns:
     * {Array({<OpenLayers.Feature.Vector>})} or
     *     {<OpenLayers.Feature.Vector>} Array of features or a single feature.
     */
    parseFeatures: function (request) {
        var features = [];
        var doc = request.responseXML;
        if (!doc || !doc.documentElement) {
            doc = request.responseText;
        }
        if (!doc || doc.length <= 0) {
            return null;
        }
        var json = this.format.read(doc);

        // TODO: should really move to a OL NGSIFormat class like WFST etc.
        var contextResponses = json['contextResponses'];
        if (!contextResponses) {
            return null;
        }
        var feature_attrs = {}, feature_geom;
        for (var i = 0; i < contextResponses.length; i++) {
            var contextElement = contextResponses[i]['contextElement'];
            var attrs = contextElement.attributes;
            feature_geom = undefined;
            feature_attrs =  {id: contextElement['id'], label: contextElement['id']};
            for (var j = 0; j < attrs.length; j++) {
                var attr = attrs[j];
                if (attr['name'] == 'name' || attr['name'] == 'organization') {
                    feature_attrs['label'] = attr['value'];
                }
                if (attr['type'] == 'coords') {
                    var geom_str = attr['value'];
                    var coords = geom_str.split(',');
                    feature_geom = new OpenLayers.Geometry.Point(parseFloat(coords[1]), parseFloat(coords[0]));
                } else {
                    feature_attrs[attr['name']] = attr['value'];
                }
            }

            // Only create feature if there is a geometry
            if (feature_geom) {
                var feature = new OpenLayers.Feature.Vector(feature_geom, feature_attrs);
                features.push(feature);
            }
        }

        // TODO: should implement real NGSI subscriptions
        if (this.refreshMillis > 0) {
            this.timeoutId = setTimeout(
                OpenLayers.Function.bind(this.onRefresh, this),
                this.refreshMillis);
        }
        return features;
    },


    CLASS_NAME: "OpenLayers.Protocol.NGSI10"
});

/** For showing timeseries via Short Term Historic FIWARE component. See example how to config. */
function sthShowTimeseries(sthURL, entityType, id, attr) {
    // var url = 'http://sensors.geonovum.nl:8666/STH/v1/contextEntities/type/thing/id/' + id + '/attributes/' + attr + '?lastN=50';
    var pageSize = 15;
    var pageNum = 0;
    // var sthURL= 'http://sensors.geonovum.nl:8666';
    var urlBase = sthURL + '/STH/v1/contextEntities/type/' + entityType + '/id/' + id + '/attributes/' + attr;
    var urlFirstN = urlBase + '?hLimit=' + pageSize + '&hOffset=0';
    var urlNextN = urlBase + '?hLimit=' + pageSize + '&hOffset=' + pageNum;
    var urlLastN = urlBase + '?lastN=15';

    var store = new Ext.data.JsonStore({
        autoDestroy: true,
        root: 'contextResponses[0].contextElement.attributes[0].values',
        fields: [
            {
                name: 'attrType',
                type: 'string'
            },
            {
                name: 'attrValue',
                type: 'string'
            },
            {
                name: 'recvTime',
                type: 'string'
            }]
    });

    var grid = new Ext.grid.GridPanel({
        store: store,
        loadMask: true,
        //renderTo:Ext.getBody(),
        columns: [{
            header: 'Date',
            dataIndex: 'recvTime'
        }, {
            header: 'Value',
            dataIndex: 'attrValue'
        }],
        viewConfig: {
            forceFit: true
        }
    });

    var winBaseTitle = attr + ' timeseries for ' + id;

    var window = new Ext.Window({
        title: winBaseTitle + ' - last ' + pageSize,
        height: 400,
        width: 400,
        layout: "fit",
        items: [
            grid
        ],
        bbar: [
            {
                text: '|&lt;',
                handler: function (btn) {
                    fetchData(false, urlFirstN);
                    window.setTitle(winBaseTitle + ' - first ' + pageSize);
                }
            },
            {
                text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;',
                handler: function (btn) {
                    pageNum++;
                    fetchData(false, urlNextN + pageNum);
                    window.setTitle(winBaseTitle);
                }
            },
            '->',
            {
                text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;',
                handler: function (btn) {
                    pageNum--;
                    if (pageNum < 0) {
                        pageNum = 0;
                    }
                    fetchData(false, urlNextN + pageNum);
                    window.setTitle(winBaseTitle);
                }
            },
            {
                text: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;|',
                handler: function (btn) {
                    fetchData(false, urlLastN);
                    window.setTitle(winBaseTitle + ' - last ' + pageSize);
                }
            }
        ]
    });

    function fetchData(winOpen, url) {
        OpenLayers.Request.GET({
            async: true,
            url: url,
            headers: {
                "FIWARE-service": 'fiwareiot',
                "FIWARE-servicepath": '/'
            },
            // params: params,
            success: function (request) {
                var jsonText = request.responseText;
                var format = new OpenLayers.Format.JSON();
                var result = format.read(jsonText);

                // var myData = result.contextResponses[0].contextElement.attributes[0].values;

                store.loadData(result);

                if (winOpen) {
                    window.show();
                }
            },
            failure: function () {
                console.error("Failed to retrieve timeseries from: " + url);
            }
        });
    }

    fetchData(true, urlLastN);
}
