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
 *  class = CapabilitiesViewPanel
 *  base_link = `Ext.tree.TreePanel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.tree.TreePanel>`_
 */

/** api: example
 *  Sample code showing how to include a CapabilitiesViewPanel that automatically configures a layer tree
 *  from a WMS URL by doing a GetCapabilities and using the result to build the layertree.
 *
 *  .. code-block:: javascript
 *
 *         .
 *         .
 *         {
 *			 xtype: 'panel',
 *
 *			 id: 'hr-menu-left-container',
 *				 .
 *				 .
 *			 items: [
 *				 {
 *					 // The TreePanel to be populated from a GetCapabilities request.
 *					 title: 'Layers',
 *					 xtype: 'hr_capabilitiesviewpanel',
 *					 autoScroll: true,
 *					 useArrows: true,
 *					 animate: true,
 *					 hropts: {
 *						 text: 'GetCaps Tree Panel',
 *						 preload: true,
 *						 url: 'http://eusoils.jrc.ec.europa.eu/wrb/wms_Landuse.asp?'
 *					 }},
 *
 *				 {
 *					.
 *					.
 *				 }
 *			 ]
 *		 },
 *         {
 *			 // The MapPanel
 *			 xtype: 'hr_mappanel',
 *			 id: 'hr-map',
 *			 region: 'center',
 *			 .
 *			 .
 */

/**
 * Copyright (c) 2008-2010 The Open Source Geospatial Foundation
 *
 * Published under the BSD license. See
 * http://svn.geoext.org/core/trunk/geoext/license.txt for the full text of the
 * license.
 */

Ext.namespace("GeoExt.tree");

/**
 * api: (define) module = GeoExt.tree class = WMSCapabilitiesLoader base_link =
 * `Ext.tree.TreeLoader
 * <http://www.extjs.com/deploy/dev/docs/?class=Ext.tree.TreeLoader>`_
 */

/**
 * api: constructor .. class:: WMSCapabilitiesLoader
 *
 * A loader that will load all layers of a Web Map Service (WMS).
 */
GeoExt.tree.WMSCapabilitiesLoader = function (config) {
    Ext.apply(this, config);
    GeoExt.tree.WMSCapabilitiesLoader.superclass.constructor.call(this);
};

Ext.extend(GeoExt.tree.WMSCapabilitiesLoader, Ext.tree.TreeLoader, {
    url: null,

    requestMethod: 'GET',

    getParams: function (node) {
        return {
            'service': 'WMS',
            'request': 'GetCapabilities',
            'format': 'text/XML'
        };
    },

    processResponse: function (response, node, callback, scope) {
        console.log('processResponse');
        if (!response.responseXML) {

            if (window.ActiveXObject) {
                var resp = new ActiveXObject('Microsoft.XMLDOM');
                doc.async = 'false';
                doc.loadXML(response.responseText);
            } else {

                var parser = new DOMParser();
                var resp = parser.parseFromString(response.responseText,
                    'text/xml');
            }
        } else {
            resp = response.responseXML;
        }

        var capabilities = new OpenLayers.Format.WMSCapabilities().read(resp);

        node.appendChild(this.processLayer(resp, false));
        if (typeof callback == "function") {
            callback.apply(scope || node, [ node ]);
        }
    },

    processLayer: function (XmlEl, prevLink) {
        console.log('processLayer');
        if (XmlEl == null) {
            var result = new Ext.tree.TreeNode({
                text: "Error getting data."
            });
            return result;
        }

        // Text is nodeValue to text node, otherwise it's the tag name
        var t = ((XmlEl.nodeType == 3) ? XmlEl.nodeValue : XmlEl.tagName);
        var link = false;
        if (prevLink) {
            t = "<a onclick='window.open(\"" + t + "\")'>" + t + "</a>";
        }

        if (XmlEl.tagName == "inspire_common:URL"
            || XmlEl.tagName == "xlink:href" || XmlEl.tagName == "href") {
            link = true;
        }

        // No text, no node.
        if (t == undefined || t.replace(/\s/g, '').length == 0) {
            if (XmlEl.childNodes.length == 0) {
                return null;
            }
            t = this.url;
        }
        var result = new Ext.tree.TreeNode({
            text: t
        });
        var self = this;

        // For Elements, process attributes and children
        Ext.each(XmlEl.attributes, function (a) {
            var text = a.nodeValue;
            if (a.nodeName == "inspire_common:URL"
                || a.nodeName == "xlink:href" || a.nodeName == "href") {
                text = "<a onclick='window.open(\"" + text + "\")'>" + text
                    + "</a>";
            }

            var c = new Ext.tree.TreeNode({
                text: a.nodeName
            });
            c.appendChild(new Ext.tree.TreeNode({
                text: text
            }));
            result.appendChild(c);
        });
        Ext.each(XmlEl.childNodes, function (el) {
            // Only process Elements and TextNodes
            if ((el.nodeType == 1) || (el.nodeType == 3)) {
                var c = self.processLayer(el, link);
                if (c) {
                    result.appendChild(c);
                }
            }
        });

        return result;
    }

});

Ext.namespace("Heron.widgets");
/**
 * api: constructor .. class:: CapabilitiesViewPanel(config)
 *
 * A panel designed to hold a tree with WMS capabilities of all layers in a map.
 */
Heron.widgets.CapabilitiesViewPanel = Ext.extend(Ext.tree.TreePanel, {
    eventRegistered: false,
    autoScroll: true,
    containerScroll: true,

    initComponent: function () {
        console.log('initComponent');
        console.log(this);
        this.initTree();

        Heron.widgets.CapabilitiesViewPanel.superclass.initComponent.call(this);

        // Delay processing, since the Map and Layers may not be available.
        this.addListener("afterrender", this.onAfterRender);
        //this.registerEvent();
    },
    onAfterRender: function () {
        console.log('onAfterRender');
        var map = Heron.App.getMap();

        if (map == undefined || map == null) {
            return;
        }
        this.updateViewTree();

        map.events.register("changelayer", this,
            this.updateViewTree);
    },
    updateViewTree: function () {
        this.addLayers2Tree();

        if (this.doLayout) {
            this.doLayout();
        }
    },
    addedUrl: [],

    initTree: function() {
        var root = new Ext.tree.TreeNode({
            text: "WMS Capabilities",
            expanded: true
        });

        this.options = {
            root: root,
            listeners: {
                // Add layers to the map when checked, remove
                // when unchecked.
                // Note that this does not take care of
                // maintaining the layer
                // order on the map.
                'checkchange': function (node, checked) {

                }
            }
        };

        Ext.apply(this, this.options);

    },
    addLayers2Tree: function () {
        //for (var layer in Heron.options.map.layers) {
        //layer = Heron.options.map.layers[layer];
        console.log('addLayers2Tree');
        var map = Heron.App.getMap();
        if (map !== undefined) {
            for (var i=0; i <  map.layers.length; i++) {
                var layer = map.layers[i];

                // Skip non WMS layers and layers already added
                if (!(layer instanceof OpenLayers.Layer.WMS)
                    || this.addedUrl.indexOf(layer.url) != -1) {
                    continue;
                }
                this.addedUrl.push(layer.url);

                var url = layer.url;

                this.root.appendChild(new Ext.tree.AsyncTreeNode(
                    {
                        text: this.getPath(layer.url),
                        expanded: this.hropts.preload,
                        loader: new GeoExt.tree.WMSCapabilitiesLoader(
                            {
                                url: url
                            })
                    }));
            }
            this.doLayout();
        }
    },
//    listeners: {
//        activate: function (node) {
//            this.registerEvent();
//        },
//        expand: function (node) {
//            this.registerEvent();
//        }
//    },
    getPath: function (url) {
        var reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
        return reg.exec(url)[1];
    }

});

/** api: xtype = hr_capabilitiesviewpanel */
Ext.reg('hr_capabilitiesviewpanel', Heron.widgets.CapabilitiesViewPanel);
