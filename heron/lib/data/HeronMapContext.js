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
 *  .. class:: HeronMapContext(config)
 *
 *    Manages global map context loading/saving and notifying observers.
 */
Heron.data.HeronMapContext = Ext.extend(Ext.util.Observable, {

    name: 'default',
    baseUrl: '',
    async: true,
    showLoadMask: true,

    /** private: method[constructor]
     */
    constructor: function (config) {

        Ext.apply(this, config);
        Ext.apply(this, config.options);
        this.setName(this.name);

        this.addEvents(
            /** api: event[loaded]
             *  Fires when mapcontext is loaded.
             */
            "loaded",

            /** api: event[failure]
             *  Fires if the context fails to load.
             */
            "failure"
        );

        Heron.data.HeronMapContext.superclass.constructor.apply(this, arguments);
    },

    // https://github.com/sdc/xerte/blob/master/mapstraction/mapstraction.htm
    getQueryString: function (key, defaultVal) {
        key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + key + "=([^&#]*)");
        var qs = regex.exec(window.location.href);
        if (qs == null) {
            return defaultVal;
        }
        else {
            return qs[1];
        }
    },

    setName: function (name) {
        if (!name) {
            name = 'default';
        }

        // Always overrule a name if a 'context' or 'config' query param specified
        // 'config' is deprecated but some installations may use it.
        if (this.getQueryString('config', null) || this.getQueryString('context', null)) {
            name = this.getQueryString('config', null);
            if (!name) {
                name = this.getQueryString('context', null);
            }
        }

        this.name = name;
        this.setUrl(this.name);
        this.setBaseUrl(this.url);
    },

    setBaseUrl: function (url) {
        this.baseUrl = url.slice(0, url.lastIndexOf("/") + 1);
    },

    setUrl: function (name) {
        var url;
        if (name.indexOf('http://') == 0) {
            url = name;
        } else {
            // Also allow a complete path to the config .xml file
            url = this.baseUrl + name;
            if (name.search(/\.xml/i) < 0) {
                url += '.xml';
            }
        }
        this.url = url;
    },

    handleResponse: function (request) {
        var responseXML = null;
        if (request.status == 200) {
            if (request.responseXML) {
                responseXML = request.responseXML;
            }
            else {
                var parser;
                try {
                    request.responseType = 'msxml-document';
                    parser = new DOMParser();
                    responseXML = parser.parseFromString(request.responseText, 'text/xml');
                    //console.log("responseXML: " + responseXML);
                } catch (e) {
                    // console.log(e);
                    parser = new DOMParser();
                    responseXML = parser.parseFromString(request.responseText, 'text/xml');
                }
            }

            if (!responseXML) {
                this.errorText = 'Configuration at (' + this.url + ') does not contain XML data';

                Ext.Msg.alert('Load Context', this.errorText);
            }
        } else {
            this.errorText = "Configuration at (" + this.url + ") could not be loaded (" + request.status + ")";
            Ext.Msg.alert('Load Context', this.errorText);
        }
        return responseXML;
    },

    /** api: method[load]
    *  Load a Heron Map Context (HMC) from a resource (filepath or URL).
    *  :Object config: config options
    *  :return data: XML DOM Document with HMC
    */
    load: function (config) {
        if (config) {
            Ext.apply(this, config);
            this.setUrl(this.name);
        }

        console.log('Loading (OL) map configuration ' + this.name + ' from url: ' + this.url);

        if (this.showLoadMask) {
            // Show a load mask
            var msg = __('Loading map context from:') + '<br> ' + this.url;
            if (!this.loadMask) {
                this.loadMask = new Ext.LoadMask(Ext.getBody(), {msg: msg});
            } else {
                this.loadMask.msg = msg;
            }
            this.loadMask.show();
        }

        // Use OpenLayers AJAX routine, calls Proxy if required
        // http://docs.openlayers.org/library/request.html
        var self = this;
        self.request = null;
        var responseXML;
        OpenLayers.Request.GET({
            url: this.url,
            async: this.async,
            callback: function (request) {
                self.request = request;

                if (self.loadMask) {
                    self.loadMask.hide();
                }

                // Get response XML object
                responseXML = self.handleResponse(self.request);

                if (self.async === true) {
                    if (!responseXML) {
                        self.fireEvent('failure', this.errorText);
                        return;
                    }
                    self.context = Heron.data.MapContextParser.parse(responseXML, self);
                    self.fireEvent('loaded', self.context);
                }
            }
        });

        return responseXML;
    }
});

Heron.data.MapContextParser = {
    includedLayers: [],

    context: {
        map: {
            settings: {},
            layers: []
        },
        layerTree: {}
    },

    parse: function (xml, loader) {
        this.loader = loader;

        this.context.map.settings = this.parseMap(xml);

        this.context.layerTree = this.parseTree(xml);

        this.context.map.layers = this.context.map.layers.concat(
            this.parseTMS(xml),
            this.parseImage(xml),
            this.parseWMTS(xml),
            this.parseWMS(xml),
            this.parseWFS(xml, this.context.map.settings.projection),
            this.parseAtom(xml),
            this.includedLayers

        );
        return this.context;
    },

    blankLayer: function () {
        //blank layer to prevent problems in case the context contains no baselayers
        var result = [];
        var blank = new OpenLayers.Layer.Image(
            "Blank",
            "data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
            OpenLayers.Bounds.fromString(this.context.map.settings.maxExtent),
            new OpenLayers.Size(10, 10),
            {resolutions: this.context.map.settings.resolutions,
                isBaseLayer: true,
                visibility: true,
                displayInLayerSwitcher: true}
        );
        result.push(blank);

        return result;
    },

    parseMap: function (xml) {
        //console.log(this);
        var title = this.getTextContent('contextCollection > title', xml);
        var baseUrl = this.getTextContent('contextCollection > baseUrl', xml);
        var projection = this.getTextContent('projection', xml);
        var units = this.getTextContent('units', xml);
        var resolutions = this.getNumberArrayContent('resolutions', xml);
        var maxExtent = this.getTextContent('maxExtent', xml);
        var center = this.getTextContent('center', xml);
        var xyPrecision = this.getNumberContent('xyPrecision', xml);
        var zoom = this.getNumberContent('zoom', xml);
        var allOverlays = this.getBooleanContent('allOverlays', xml, true);

        var result = {
            title: title,
            baseUrl: baseUrl,
            projection: projection,
            units: units,
            resolutions: resolutions,
            maxExtent: maxExtent,
            center: center,
            xy_precision: xyPrecision,
            zoom: zoom,
            theme: null,
            allOverlays: allOverlays
        };

        return result;
    },

    parseImage: function (xml) {
        var result = [];

        var nodes = Ext.DomQuery.jsSelect('imageLayer', xml);
        for (var i = nodes.length - 1; i >= 0; i--) {
            // Generic
            var title = this.getTextContent('title', nodes[i]);
            var url = this.getLayerUrlContent('url', nodes[i]);
            var isBaseLayer = this.getBooleanContent('isBaseLayer', nodes[i]);
            var isVisible = this.getBooleanContent('isVisible', nodes[i]);
            var isTransparent = this.getBooleanContent('isTransparent', nodes[i]);

            // ImageLayer specific
            var size = this.getNumberArrayContent('size', nodes[i]);
            var config = {
                // resolutions: this.context.map.settings.resolutions,
                isBaseLayer: isBaseLayer,
                visibility: isVisible,
                transparent: isTransparent,
                displayInLayerSwitcher: true
            };

            var imageLayer = new OpenLayers.Layer.Image(
                title,
                url,
                OpenLayers.Bounds.fromString(this.context.map.settings.maxExtent),
                new OpenLayers.Size(size[0], size[1]),
                config
            );
            result.push(imageLayer);
        }
        return result;
    },

    parseWMTS: function (xml) {
        var result = [];
        var nodes = Ext.DomQuery.jsSelect('wmtsLayer', xml);
        for (var i = nodes.length - 1; i >= 0; i--) {
            // Generic
            var title = this.getTextContent('title', nodes[i]);
            var url = this.getLayerUrlContent('url', nodes[i]);
            var isBaseLayer = this.getBooleanContent('isBaseLayer', nodes[i]);
            var opacity = this.getNumberContent('opacity', nodes[i]);
            var isTransparent = this.getBooleanContent('isTransparent', nodes[i]);
            var isVisible = this.getBooleanContent('isVisible', nodes[i]);
            var attribution = this.getTextContent('attribution', nodes[i]);
            var serverResolutions = this.getNumberArrayContent('serverResolutions', nodes[i]);
            var metadata = this.parseMetadata(nodes[i]);

            // WMTS specific
            var layer = this.getTextContent('layer', nodes[i]);
            var style = this.getTextContent('style', nodes[i]);
            var matrixSet = this.getTextContent('matrixSet', nodes[i]);
            var matrixIds = this.getTextArrayContent('matrixIds', nodes[i]);
            var format = this.getTextContent('format', nodes[i]);
            var queryable = this.getBooleanContent('queryable', nodes[i]);
            var featureInfoFormat = this.getTextContent('featureInfoFormat',
                nodes[i]);

            var config = {
                name: title,
                url: url,
                isBaseLayer: isBaseLayer,
                opacity: opacity,
                transparent: isTransparent,
                visibility: isVisible,
                layer: layer,
                style: style,
                matrixSet: matrixSet,
                matrixIds: matrixIds,
                attribution: attribution,
                format: format,
                serverResolutions: serverResolutions.length > 0 ? serverResolutions : undefined,
                queryable: queryable,
                featureInfoFormat: featureInfoFormat,
                metadata: metadata
            };

            this.addResolutions(config, nodes[i]);

            var wmtsLayer = new OpenLayers.Layer.WMTS(config);
            result.push(wmtsLayer);
        }
        return result;
    },

    parseTMS: function (xml) {
        var result = [];

        var nodes = Ext.DomQuery.jsSelect('tmsLayer', xml);
        for (var i = nodes.length - 1; i >= 0; i--) {
            // Generic
            var title = this.getTextContent('title', nodes[i]);
            var url = this.getLayerUrlContent('url', nodes[i]);
            var isBaseLayer = this.getBooleanContent('isBaseLayer', nodes[i]);
            var opacity = this.getNumberContent('opacity', nodes[i]);
            var isTransparent = this.getBooleanContent('isTransparent',
                nodes[i]);
            var isVisible = this.getBooleanContent('isVisible', nodes[i]);
            var metadata = this.parseMetadata(nodes[i]);

            // TMS specific
            var layername = this.getTextContent('layername', nodes[i]);
            var type = this.getTextContent('type', nodes[i]);
            var bgColor = this.getTextContent('bgColor', nodes[i]);
            var isSingleTile = this.getBooleanContent('isSingleTile', nodes[i]);
            var attribution = this.getTextContent('attribution', nodes[i]);
            var isAlpha = this.getBooleanContent('isAlpha', nodes[i]);
            var serverResolutions = this.getNumberArrayContent('serverResolutions', nodes[i]);
            var config = {
                isBaseLayer: isBaseLayer,
                opacity: opacity,
                transparent: isTransparent,
                visibility: isVisible,
                layername: layername,
                type: type,
                bgcolor: bgColor,
                singleTile: isSingleTile,
                attribution: attribution,
                alpha: isAlpha,
                serverResolutions: serverResolutions.length > 0 ? serverResolutions : undefined,
                metadata: metadata
            };

            this.addResolutions(config, nodes[i]);

            var tmsLayer = new OpenLayers.Layer.TMS(title, url, config);

            result.push(tmsLayer);
        }
        return result;
    },

    parseWMS: function (xml) {
        var result = [];
        var nodes = Ext.DomQuery.jsSelect('wmsLayer', xml);
        for (var i = nodes.length - 1; i >= 0; i--) {
            // Generic
            var title = this.getTextContent('title', nodes[i]);
            var url = this.getLayerUrlContent('url', nodes[i]);
            var isBaseLayer = this.getBooleanContent('isBaseLayer', nodes[i]);
            var opacity = this.getNumberContent('opacity', nodes[i]);
            var isTransparent = this.getBooleanContent('isTransparent',
                nodes[i]);
            var isVisible = this.getBooleanContent('isVisible', nodes[i]);
            var attribution = this.getTextContent('attribution', nodes[i]);
            var metadata = this.parseMetadata(nodes[i]);

            // WMS specific
            var layers = this.getTextContent('layers', nodes[i]);
            var format = this.getTextContent('format', nodes[i]);
            var featureInfoFormat = this.getTextContent('featureInfoFormat',
                nodes[i]);
            var isAlpha = this.getBooleanContent('isAlpha', nodes[i]);
            var isSingleTile = this.getBooleanContent('isSingleTile', nodes[i]);

            var config = {
                isBaseLayer: isBaseLayer,
                singleTile: isSingleTile,
                visibility: isVisible,
                alpha: isAlpha,
                opacity: opacity,
                attribution: attribution,
                featureInfoFormat: featureInfoFormat,
                metadata: metadata
            };
            this.addResolutions(config, nodes[i]);

            var wmsLayer = new OpenLayers.Layer.WMS(title, url, {
                layers: layers,
                format: format,
                transparent: isTransparent
            }, config);

            result.push(wmsLayer);
        }
        return result;
    },

    parseWFS: function (xml, srsName) {
        var result = [];
        var nodes = Ext.DomQuery.jsSelect('wfsLayer', xml);
        for (var i = nodes.length - 1; i >= 0; i--) {
            // Generic
            var title = this.getTextContent('title', nodes[i]);
            var url = this.getLayerUrlContent('url', nodes[i]);
            var isVisible = this.getBooleanContent('isVisible', nodes[i]);
            var attribution = this.getTextContent('attribution', nodes[i]);

            // WFS specific
            var wfsVersion = this.getTextContent('wfsVersion', nodes[i]);
            var wfsFeatureNamespace = this.getTextContent('wfsFeatureNamespace', nodes[i]);

            // Optioneel: featurePrefix
            var wfsFeaturePrefix = this.getTextContent('wfsFeaturePrefix', nodes[i]);
            var wfsFeatureType = this.getTextContent('wfsFeatureType', nodes[i]);
            var wfsMaxFeatures = this.getNumberContent('wfsMaxFeatures', nodes[i]);
            var wfsGeometryElement = this.getTextContent('wfsGeometryElement', nodes[i]);

            // Optioneel: outputFormat
            var wfsOutputFormat = this.getTextContent('wfsOutputFormat', nodes[i]);
            var styleMap = this.getStyleContent('styleMap', nodes[i]);

            // TODO: we moeten voor GML v3.2.1 (INSPIRE) de juiste reader configureren
            var readFormat = new OpenLayers.Format.GML.v3({
                featureType: this.featureType,
                featureNS: this.featureNS,
                geometryName: 'wfsGeometryElement'
            });

            var config = {
                strategies: [new OpenLayers.Strategy.BBOX({ratio: 1, resFactor: 1}) ],
                projection: new OpenLayers.Projection(srsName),
                styleMap: styleMap,
                protocol: new OpenLayers.Protocol.WFS({
                    version: wfsVersion,
                    srsName: srsName,
                    url: url,
                    featureNS: wfsFeatureNamespace,
                    featurePrefix: wfsFeaturePrefix,
                    featureType: wfsFeatureType,
                    maxFeatures: wfsMaxFeatures,
                    geometryName: wfsGeometryElement,
                    outputFormat: wfsOutputFormat
                }),
                attribution: attribution,
                visibility: isVisible
            };

            this.addResolutions(config, nodes[i]);

            var wfsLayer = new OpenLayers.Layer.Vector(title, config);

            result.push(wfsLayer);
        }
        return result;
    },

    parseAtom: function (xml) {
        var result = [];
        var nodes = Ext.DomQuery.jsSelect('atomLayer', xml);

        // Atom GeoRSS standard has coordinates in EPSG:4326 (lat/lon)
        var epsg4326 = new OpenLayers.Projection("EPSG:4326");

        for (var i = nodes.length - 1; i >= 0; i--) {
            // Generic options
            var title = this.getTextContent('title', nodes[i]);
            var url = this.getLayerUrlContent('url', nodes[i]);
            var isBaseLayer = this.getBooleanContent('isBaseLayer', nodes[i]);
            var isVisible = this.getBooleanContent('isVisible', nodes[i]);

            var config = {
                strategies: [new OpenLayers.Strategy.Fixed()],
                projection: epsg4326,
                protocol: new OpenLayers.Protocol.HTTP({
                    url: url,
                    format: new OpenLayers.Format.Atom()
                }),
                visibility: isVisible
            };

            this.addResolutions(config, nodes[i]);

            var atomLayer = new OpenLayers.Layer.Vector(title, config);

            result.push(atomLayer);
        }
        return result;
    },

    parseMetadata: function (node) {
        var metadataXML = Ext.DomQuery.jsSelect('metadata', node);
        if (metadataXML.length === 0) {
            //No metadata specified
            return undefined;
        }

        var legendUrl = this.getTextContent('legendUrl', metadataXML);
        var hideInLegend = this.getBooleanContent('hideInLegend', metadataXML);

        return {
            legend: {
                legendURL: legendUrl,
                    hideInLegend: hideInLegend
            }
        }
    },

    parseTree: function (xml) {
        var result = [];

        var rootNode = Ext.DomQuery.select('contextCollection', xml)[0];
        this.parseTreeNode(rootNode, result);

        return result;
    },

    parseTreeNode: function (node, tree) {
        var children = node.childNodes;
        for (var i = 0; i < children.length; i++) {
            var node = children[i];

            if (node.tagName == 'contextFolder') {
                var isExpanded = this.getBooleanContent('isExpanded', node);
                var folder = {
                    text: this.getTextContent("title", node),
                    expanded: isExpanded,
                    children: []
                };
                tree.push(folder);
                this.parseTreeNode(node, folder.children);

            } else if (node.tagName == 'context') {
                var url = Ext.DomQuery.jsSelect('>url', node);
                if (url.length) {
                    // Context references a context file via 'url'
                    // Fetch and parse the context tree node
                    url = this.getText(url[0]);
                    var result = this.loader.load({name: url, async: false});
                    if (!result) {
                        Ext.Msg.alert('parseTreeNode', 'Cannot load: ' + url);
                        return;
                    }

                    // Loaded ok, get/parse the context collection
                    var rootNode = Ext.DomQuery.select('contextCollection', result)[0];

                    this.includedLayers = this.includedLayers.concat(
                        this.parseImage(result),
                        this.parseTMS(result),
                        this.parseWMTS(result),
                        this.parseWMS(result),
                        this.parseWFS(result, this.context.map.settings.projection),
                        this.parseAtom(result));

                    // Recurse (see 'else')
                    this.parseTreeNode(rootNode, tree);
                }
                else {
                    // No url: embedded context
                    var titles = Ext.DomQuery.jsSelect('title', node);
                    var layers = [];
                    for (var j = 1; j < titles.length; j++) {
                        var layerType = titles[j].parentNode.nodeName;
                        var layer = {
                            nodeType: 'gx_layer',
//							iconCls: "hr-tree-node-icon-" + layerType,
                            layer: this.getText(titles[j]),
                            disabled: false
                        };
                        layers.push(layer);
                    }
                    var isExpanded = this.getBooleanContent('isExpanded', node);
                    var folder = {
                        text: this.getTextContent("title", node),
                        expanded: isExpanded,
                        children: layers
                    };
                    tree.push(folder);
                }
            }
        }
    },

    getText: function (node) {
        var result;
        if (window.ActiveXObject) {
            //result = node.text;
            result = node.firstChild.nodeValue;
            //console.log("window.ActiveXObject result: " + result);
        } else {
            //console.log("no activeX: " + node);
            result = node.textContent;
        }
        return result;
    },

    getTextContent: function (elementName, node) {
        var result;
        var child = Ext.DomQuery.selectNode(elementName, node);
        if (child) {
            result = this.getText(child);
            //console.log("child.nodeName: " + child.nodeName);
        }
        return result;
    },

    getTextArrayContent: function (elementName, node) {
        var result = [];
        var text = this.getTextContent(elementName, node);
        if (text) {
            result = text.split(",");
        }
        return result;
    },

    getBooleanContent: function (elementName, node, defaultValue) {
        var result = this.getTextContent(elementName, node);
        if (!result && defaultValue) {
            result = defaultValue;
        }
        return result === 'true';
    },

    getLayerUrlContent: function (elementName, node) {
        var result = this.getTextContent(elementName, node);
        if (result && result.indexOf("{baseUrl}") > -1) {
            var baseUrl = this.getTextContent("baseUrl", node.parentNode);
            if (baseUrl) {
                result = result.replace("{baseUrl}", baseUrl);
            } else if (this.context.map.settings && this.context.map.settings.baseUrl) {
                result = result.replace("{baseUrl}",
                    this.context.map.settings.baseUrl);
            } else {
                Ext.Msg.alert('getLayerUrlContent', "No base URL found for layer "
                    + this.getTextContent('title', node) + " in context "
                    + this.getTextContent('title', node.parentNode));
            }

        }
        return result;
    },

    getNumberContent: function (elementName, node) {
        var result;
        var text = this.getTextContent(elementName, node);
        if (!isNaN(text)) {
            result = Number(text);
        }
        return result;
    },

    getNumberArrayContent: function (elementName, node) {
        var result = [];
        var text = this.getTextContent(elementName, node);
        if (text) {
            var array = text.split(",");
            for (var i = 0; i < array.length; i++) {
                result.push(Number(array[i]));
            }
        }
        return result;
    },

    getTextOrNumberContent: function (elementName, root) {
        var result;
        var text = this.getTextContent(elementName, root);
        if (isNaN(text)) {
            result = text;
        } else {
            result = Number(text);
        }
        return result;
    },

    getStyleContent: function (elementName, root) {
        var styleMapOptions = {};
        var node = Ext.DomQuery.selectNode(elementName, root);
        if (node) {
            var styleNodes = Ext.DomQuery.jsSelect('style', node);
            for (var i = 0; i < styleNodes.length; i++) {
                var styleName = this.getTextContent('name', styleNodes[i]);
                var propertyNodes = Ext.DomQuery.jsSelect('property',
                    styleNodes[i]);
                var styleOptions = {};
                for (var j = 0; j < propertyNodes.length; j++) {
                    var name = this.getTextContent('name', propertyNodes[j]);
                    var value = this.getTextOrNumberContent('value',
                        propertyNodes[j]);
                    styleOptions[name] = value;
                }
                styleMapOptions[styleName] = new OpenLayers.Style(styleOptions);
            }
        }
        return new OpenLayers.StyleMap(styleMapOptions);
    },

    /*	addResolution : function(title, node) {
     var mapResolutions = this.context.map.settings.resolutions;

     var minResolution = this.getNumberContent('minResolution', node);
     if (!minResolution)
     {
     minResolution = mapResolutions[mapResolutions.length - 1];
     }

     var maxResolution = this.getNumberContent('maxResolution', node);
     if (!maxResolution)
     {
     maxResolution = mapResolutions[0];
     }

     Heron.config.resolution.add(title, minResolution, maxResolution);
     },  */
    addResolutions: function (properties, node) {
        if (properties['serverResolutions']) {
            return;
        }
        var mapResolutions = this.context.map.settings.resolutions;

        var minResolution = this.getNumberContent('minResolution', node);
        if (!minResolution) {
            minResolution = mapResolutions[mapResolutions.length - 1];
        } else {
            properties['minResolution'] = minResolution;
        }

        var maxResolution = this.getNumberContent('maxResolution', node);
        if (!maxResolution) {
            maxResolution = mapResolutions[0];
        } else {
            properties['maxResolution'] = maxResolution;
        }
    }

};

