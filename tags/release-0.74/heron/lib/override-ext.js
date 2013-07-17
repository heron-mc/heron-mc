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

/**
 * To make grid cell text by default selectable, see http://www.sencha.com/learn/grid-faq/
 * See also default.css for GridView cell Template CSS definition for "x-selectable".
 * Issue: http://code.google.com/p/geoext-viewer/issues/detail?id=82
 */
if (!Ext.grid.GridView.prototype.templates) {
   Ext.grid.GridView.prototype.templates = {};
}
Ext.grid.GridView.prototype.templates.cell = new Ext.Template(
   '<td class="x-grid3-col x-grid3-cell x-grid3-td-{id} x-selectable {css}" style="{style}" tabIndex="0" {cellAttr}>',
   '<div class="x-grid3-cell-inner x-grid3-col-{id}" {attr}>{value}</div>',
   '</td>'
);

/**
 * Override Ext.Ajax, For Ajax compat with OpenLayers and e.g. OpenLayers proxy, taken from GeoExt 1.1 override-ext-ajax.js,
 * otherwise it needed to included separately as
 * it was not built into GeoExt 1.1.
 */

/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** api: override = Ext.Ajax */
(function() {

    /** private: function[createComplete]
     *  ``Function``
     */
    var createComplete = function(fn, cb) {
        return function(request) {
            if(cb && cb[fn]) {
                cb[fn].call(cb.scope || window, Ext.applyIf({
                    argument: cb.argument
                }, request));
            }
        };
    };

    Ext.apply(Ext.lib.Ajax, {
        /** private: method[request]
         */
        request: function(method, uri, cb, data, options) {
            options = options || {};
            method = method || options.method;
            var hs = options.headers;
            if(options.xmlData) {
                if(!hs || !hs["Content-Type"]) {
                    hs = hs || {};
                    hs["Content-Type"] = "text/xml";
                }
                method = method || "POST";
                data = options.xmlData;
            } else if(options.jsonData) {
                if(!hs || !hs["Content-Type"]) {
                    hs = hs || {};
                    hs["Content-Type"] = "application/json";
                }
                method = method || "POST";
                data = typeof options.jsonData == "object" ?
                       Ext.encode(options.jsonData) : options.jsonData;
            }
            // if POST method, options.form or options.params means
            // form-encoded data, so change content-type
            if ((method && method.toLowerCase() == "post") &&
               (options.form || options.params) &&
               (!hs || !hs["Content-Type"])) {
                hs = hs || {};
                hs["Content-Type"] = "application/x-www-form-urlencoded";
            }
            return OpenLayers.Request.issue({
                success: createComplete("success", cb),
                failure: createComplete("failure", cb),
                method: method,
                headers: hs,
                data: data,
                url: uri
            });
        },

        /** private: method[isCallInProgress]
         *  :params request: ``Object`` The XHR object.
         */
        isCallInProgress: function(request) {
            // do not prevent our caller from calling abort()
            return true;
        },

        /** private: method[abort]
         *  :params request: ``Object`` The XHR object.
         */
        abort: function(request) {
            request.abort();
        }
    });
})();
