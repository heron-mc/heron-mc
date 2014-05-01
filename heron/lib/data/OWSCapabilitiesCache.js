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
Ext.namespace("Heron.data");


/** api: constructor
 *  .. class:: OWSCapabilitiesCache(options)
 *
 *  Manages OWS Capabilities documents. Allows notifying observers.
 */
Heron.data.OWSCapabilitiesCache = Ext.extend(Ext.util.Observable, {

    defaultOWSVersions: {
        WMS: '1.1.1',
        WFS: '1.1.0'
    },

    cache: {
        wms: {},
        wfs: {}
    },

    /** private: method[constructor]
     */
    constructor: function (options) {

        Ext.apply(this, options);

        this.addEvents(
            /** api: event[loaded]
             *  Fires when capabilities doc is loaded and cached.
             */
            "loaded",

            /** api: event[failure]
             *  Fires if the capabilities doc fails to load.
             */
            "failure"
        );
        Heron.data.OWSCapabilitiesCache.superclass.constructor.apply(this, arguments);
    },

    getWMSCapabilities: function (url, options) {
        options = options ? options : {};
        options.type = 'WMS';
        options.request = 'GetCapabilities';
        options.format = new OpenLayers.Format.WMSCapabilities();
        return this.getCapabilities(url, options.type, options);
    },

    getWMSLayerCapability: function (url, layerName, options) {
        var caps = this.getWMSCapabilities(url, options);
        var layers = caps.capability.layers;
        var result;
        for (var i = 0; i < layers.length; i++) {
            if (layerName == layers[i].name) {
                result = layers[i];
                break;
            }
        }

        return result;
    },

    getCapabilities: function (url, type, options) {
        // Already cached? return result immediately
        var result = this.getCache(type, url);
        if (result) {
            return result;
        }

        type = type.toUpperCase();
        var params = {
            SERVICE: type,
            REQUEST: options.request ? options.request : "GetCapabilities",
            VERSION: options.version ? options.version : this.defaultOWSVersions[type]
        };

        var self = this;
        OpenLayers.Request.GET({
            async: !!options.async === true,
            url: url,
            params: params,
            success: function (request) {
                var doc = request.responseXML;
                if (!doc || !doc.documentElement) {
                    doc = request.responseText;
                }

                result = self.putCache(type, url, options.format.read(doc));
            },
            failure: function () {
                console.error("Failed to retrieve capabilities from: " + url);
            }
        });
        return result;
    },

    getCache: function (type, url) {
        return this.cache[type.toLowerCase()][url.toLowerCase()];
    },

    putCache: function (type, url, doc) {
        this.cache[type.toLowerCase()][url.toLowerCase()] = doc;
        return doc;
    }
});

// Singleton
Heron.data.OWSCapabilitiesCache.getInstance = function () {
    var instance = Heron.data.OWSCapabilitiesCacheInstance;
    if (!instance) {
        instance = Heron.data.OWSCapabilitiesCacheInstance = new Heron.data.OWSCapabilitiesCache();
    }
    return instance;
};