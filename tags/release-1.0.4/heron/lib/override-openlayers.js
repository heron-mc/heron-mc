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
 * Method: parseLocations
 * Parse the locations from an Atom entry or feed.
 *
 * Parameters:
 * node - {DOMElement} An Atom entry or feed node.
 *
 * Returns:
 * Array({<OpenLayers.Geometry>})
 */
OpenLayers.Format.Atom.prototype.parseLocations = function(node) {
	// NOTE: Just van den Broecke: 8.dec.2012. See
	// Fix for https://github.com/openlayers/openlayers/issues/789
	// on OpenLayers 2.12 (line 105 below)
     var georssns = this.namespaces.georss;

     var locations = {components: []};
     var where = this.getElementsByTagNameNS(node, georssns, "where");
     if (where && where.length > 0) {
         if (!this.gmlParser) {
             this.initGmlParser();
         }
         for (var i=0, ii=where.length; i<ii; i++) {
             this.gmlParser.readChildNodes(where[i], locations);
         }
     }

     var components = locations.components;
     var point = this.getElementsByTagNameNS(node, georssns, "point");
     if (point && point.length > 0) {
         for (var i=0, ii=point.length; i<ii; i++) {
             var xy = OpenLayers.String.trim(
                         point[i].firstChild.nodeValue
                         ).split(/\s+/);
             if (xy.length !=2) {
                 xy = OpenLayers.String.trim(
                             point[i].firstChild.nodeValue
                             ).split(/\s*,\s*/);
             }
             components.push(new OpenLayers.Geometry.Point(xy[1], xy[0]));
         }
     }

     var line = this.getElementsByTagNameNS(node, georssns, "line");
     if (line && line.length > 0) {
         var coords;
         var p;
         var points;
         for (var i=0, ii=line.length; i<ii; i++) {
             coords = OpenLayers.String.trim(
                             line[i].firstChild.nodeValue
                             ).split(/\s+/);
             points = [];
             for (var j=0, jj=coords.length; j<jj; j+=2) {
                 p = new OpenLayers.Geometry.Point(coords[j+1], coords[j]);
                 points.push(p);
             }
             components.push(
                 new OpenLayers.Geometry.LineString(points)
             );
         }
     }

     var polygon = this.getElementsByTagNameNS(node, georssns, "polygon");
     if (polygon && polygon.length > 0) {
         var coords;
         var p;
         var points;
         for (var i=0, ii=polygon.length; i<ii; i++) {
             coords = OpenLayers.String.trim(
                         polygon[i].firstChild.nodeValue
                         ).split(/\s+/);
             points = [];
             for (var j=0, jj=coords.length; j<jj; j+=2) {
                 p = new OpenLayers.Geometry.Point(coords[j+1], coords[j]);
                 points.push(p);
             }
             components.push(
                 new OpenLayers.Geometry.Polygon(
                     [new OpenLayers.Geometry.LinearRing(points)]
                 )
             );
         }
     }

     if (this.internalProjection && this.externalProjection) {
         for (var i=0, ii=components.length; i<ii; i++) {
             if (components[i]) {
                 components[i].transform(
                     this.externalProjection,
                     this.internalProjection
                 );
             }
         }
     }

     return components;
 };


/*OpenLayers.Util.extend(OpenLayers.Format.WFST.v1_1_0.prototype.readers,
 {"gml32": OpenLayers.Format.GML.v3.prototype.readers["gml"]});
 OpenLayers.Format.WFST.v1_0_0.prototype.namespaces.gml32 = 'http://www.opengis.net/gml/3.2';
 */

// do some overrides for OpenLayers to correctly use GetFeatureInfo from the TNO services
// http://trac.osgeo.org/openlayers/ticket/3176 (will be fixed in OL 2.11)

/* --- Fixed in OL 2.11 ---

OpenLayers.Control.WMSGetFeatureInfo.prototype.buildWMSOptions = function(url, layers, clickPosition, format) {
    var layerNames = [], styleNames = [];
    var i;
    for (i = 0,len = layers.length; i < len; i++) {
        layerNames = layerNames.concat(layers[i].params.LAYERS);
        styleNames = styleNames.concat(this.getStyleNames(layers[i]));
    }
    var firstLayer = layers[0];
    // use the firstLayer's projection if it matches the map projection -
    // this assumes that all layers will be available in this projection
    var projection = this.map.getProjection();
    var layerProj = firstLayer.projection;
    if (layerProj && layerProj.equals(this.map.getProjectionObject())) {
        projection = layerProj.getCode();
    }
    var params = OpenLayers.Util.extend({
        service: "WMS",
        version: firstLayer.params.VERSION,
        request: "GetFeatureInfo",
        layers: layerNames,
        query_layers: layerNames,
        styles: styleNames,
        bbox: this.map.getExtent().toBBOX(null,
            firstLayer.reverseAxisOrder()),
        feature_count: this.maxFeatures,
        height: this.map.getSize().h,
        width: this.map.getSize().w,
        format: format,
        info_format: firstLayer.params.INFO_FORMAT || this.infoFormat
    }, (parseFloat(firstLayer.params.VERSION) >= 1.3) ?
    {
        crs: projection,
        i: parseInt(clickPosition.x, 10),
        j: parseInt(clickPosition.y, 10)
    } :
{
        srs: projection,
        x: parseInt(clickPosition.x, 10),
        y: parseInt(clickPosition.y, 10)
    }
    );
    OpenLayers.Util.applyDefaults(params, this.vendorParams);
    return {
        url: url,
        params: OpenLayers.Util.upperCaseObject(params),
        callback: function(request) {
            this.handleResponse(clickPosition, request);
        },
        scope: this
    };
};
*/

// http://trac.osgeo.org/openlayers/ticket/3177 (might be fixed in OL 2.11)

/* --- Fixed in OL 2.11 ---

OpenLayers.Format.WMSGetFeatureInfo.prototype.read_FeatureInfoResponse = function(data) {
    var response = [];
    var featureNodes = this.getElementsByTagNameNS(data, '*',
        'FIELDS');
    var i;
    var len;
    for (i = 0,len = featureNodes.length; i < len; i++) {
        var featureNode = featureNodes[i];
        var geom = null;

        // attributes can be actual attributes on the FIELDS tag, or FIELD children
        var attributes = {};
        var j;
        var jlen = featureNode.attributes.length;
        if (jlen > 0) {
            for (j = 0; j < jlen; j++) {
                var attribute = featureNode.attributes[j];
                attributes[attribute.nodeName] = attribute.nodeValue;
            }
        } else {
            var nodes = featureNode.childNodes;
            var _featureType = "";
            for (j = 0,jlen = nodes.length; j < jlen; ++j) {
                var node = nodes[j];
                if (node.nodeType !== 3) {
                    //Dirty fix for dino name needs to be stripped as it consists of 3 parts
                    var dino_name = node.getAttribute("name");
                    var _feat = dino_name.split(".");
                    if(_feat[0] === "DINO_DBA"){
                        attributes[_feat[2]] = node.getAttribute("value");
                        _featureType = _feat[1];
                    } else {
                        attributes[node.getAttribute("name")] = node.getAttribute("value");
                    }
                }
            }
        }
        _feature = new OpenLayers.Feature.Vector(geom, attributes, null);

        if(_featureType !== ""){
            // Dirty fix for dino to maintain reference to layer
            _feature.gml = {};
            _feature.gml.featureType = _featureType;
            _feature.fid = _featureType + "." + len;
            _feature.layer = _featureType;
        }
        response.push(_feature);
    }
    return response;
};
*/

/**
 * Method: read_FeatureInfoResponse
 * Parse FeatureInfoResponse nodes.
 *
 * Parameters:
 * data - {DOMElement}
 *
 * Returns:
 * {Array}
 */
/* OpenLayers.Format.WMSGetFeatureInfo.prototype.read_FeatureInfoResponse = function(data) {
    var response = [];
    var featureNodes = this.getElementsByTagNameNS(data, '*',
        'FIELDS');
	if (featureNodes.length == 0) {
		featureNodes = this.getElementsByTagNameNS(data, '*', 'Field');
	}
    for(var i=0, len=featureNodes.length;i<len;i++) {
        var featureNode = featureNodes[i];
        var geom = null;

        // attributes can be actual attributes on the FIELDS tag,
        // or FIELD children
        var attributes = {};
        var j;
        var jlen = featureNode.attributes.length;
        if (jlen > 0) {
            for(j=0; j<jlen; j++) {
                var attribute = featureNode.attributes[j];
                attributes[attribute.nodeName] = attribute.nodeValue;
            }
        } else {
            var nodes = featureNode.childNodes;
            for (j=0, jlen=nodes.length; j<jlen; ++j) {
                var node = nodes[j];
                if (node.nodeType != 3) {
                    attributes[node.getAttribute("name")] =
                        node.getAttribute("value");
                }
            }
        }

        response.push(
            new OpenLayers.Feature.Vector(geom, attributes, null)
        );
    }
    return response;
};
*/
// JvdB 11.05.2011 Taken from OpenLayers 2.10 to fix this issue:
// http://code.google.com/p/geoext-viewer/issues/detail?id=39

/**
 * Function: modifyDOMElement
 *
 * Modifies many properties of a DOM element all at once.  Passing in
 * null to an individual parameter will avoid setting the attribute.
 *
 * Parameters:
 * id - {String} The element id attribute to set.
 * px - {<OpenLayers.Pixel>} The left and top style position.
 * sz - {<OpenLayers.Size>}  The width and height style attributes.
 * position - {String}       The position attribute.  eg: absolute,
 *                           relative, etc.
 * border - {String}         The style.border attribute.  eg:
 *                           solid black 2px
 * overflow - {String}       The style.overview attribute.
 * opacity - {Float}         Fractional value (0.0 - 1.0)
 */
OpenLayers.Util.modifyDOMElement = function(element, id, px, sz, position,
    border, overflow, opacity) {

    if (id) {
        element.id = id;
    }
    if (px) {
        if (!px.x) {
            // JvdB: fix for IE who cannot deal with NaN
            px.x = 0;
        }
        if (!px.y) {
            // JvdB: fix for IE who cannot deal with NaN
            px.y = 0;
        }
        element.style.left = px.x + "px";
        element.style.top = px.y + "px";
    }
    if (sz) {
        element.style.width = sz.w + "px";
        element.style.height = sz.h + "px";
    }
    if (position) {
        element.style.position = position;
    }
    if (border) {
        element.style.border = border;
    }
    if (overflow) {
        element.style.overflow = overflow;
    }
    if (parseFloat(opacity) >= 0.0 && parseFloat(opacity) < 1.0) {
        element.style.filter = 'alpha(opacity=' + (opacity * 100) + ')';
        element.style.opacity = opacity;
    } else if (parseFloat(opacity) == 1.0) {
        element.style.filter = '';
        element.style.opacity = '';
    }
};


/**
 * Donald Kerr's fix to label outlines (Halo's) in IE8
 * http://trac.osgeo.org/openlayers/ticket/2965
 https://github.com/openlayers/openlayers/pull/140
 */
// Later: does not seem to work now...


// https://code.google.com/p/geoext-viewer/issues/detail?id=185
// Integrate from OL patch.
// http://trac.osgeo.org/openlayers/ticket/3608
// Milestone: 2.13
// setOpacity won't work on a vector layer, if the vector layer is with other vector
// layers in a SelectFeature-Control (the SelectFeature-Control has than a Vect.rootContainer).
// With the following it will work:
// REMOVE/CHECK for OL 2.13 !!
OpenLayers.Layer.Vector.prototype.setOpacity = function(opacity) {
	if (opacity != this.opacity) {
		this.opacity = opacity;
		var element = this.renderer.root;
		OpenLayers.Util.modifyDOMElement(element, null, null, null, null,
				null, null, opacity);
		if (this.map != null) {
			this.map.events.triggerEvent("changelayer", {
				layer : this,
				property : "opacity"
			});
		}
	}
};

// 18.2.14 Solve issues with PrintPreview not cloning all properties for Vector features
// in particular not showing OLE text labels with renderIntent defaultLabel.
// https://code.google.com/p/geoext-viewer/issues/detail?id=331
/**
  * Method: clone
  * Create a clone of this vector feature.  Does not set any non-standard
  *     properties.
  *
  * Returns:
  * {<OpenLayers.Feature.Vector>} An exact clone of this vector feature.
  */
OpenLayers.Feature.Vector.prototype.clone = function () {
     var clone = new OpenLayers.Feature.Vector(
         this.geometry ? this.geometry.clone() : null,
         this.attributes,
         this.style);

    clone.renderIntent = this.renderIntent;
    return clone;
 };


// Solve issues with feature selection for features that have individual styles.
/**
 * Method: highlight
 * Redraw feature with the select style.
 *
 * Parameters:
 * feature - {<OpenLayers.Feature.Vector>}
 */
OpenLayers.Control.SelectFeature.prototype.highlight = function(feature) {
    var layer = feature.layer;
    var cont = this.events.triggerEvent("beforefeaturehighlighted", {
        feature : feature
    });
    if(cont !== false) {
        feature._prevHighlighter = feature._lastHighlighter;
        feature._lastHighlighter = this.id;

        // Solve issues with feature selection for features that have individual styles.
        // Use the Layer select style in that case
        if (feature.style && !this.selectStyle && layer.styleMap) {
            var styleMap = layer.styleMap;
            var selectStyle = styleMap.styles['select'];
            if (selectStyle) {
                var defaultStyle = styleMap.styles['default'].clone();
                this.selectStyle = OpenLayers.Util.extend(defaultStyle.defaultStyle, selectStyle.defaultStyle);
            }
        }
        var style = this.selectStyle || this.renderIntent;

        layer.drawFeature(feature, style);
        this.events.triggerEvent("featurehighlighted", {feature : feature});
    }
};


//
// 13.2.2014 - CHANGES for WMSGetFeatureInfo
//
// Version from GitHub (OL 2.12+2.13 are same for these funcs)
// * change: new config param 'requestPerLayer': do not bundle requests for same URL
// * change: allow per-layer vendor params
// Changes indicated on lines with 'JvdB'.
// Changes were required to allow  GFI for WMS "sublayers" based on CQL (or other query lang).
// See example: http://lib.heron-mc.org/heron/latest/examples/sublayers
//
/* Copyright (c) 2006-2012 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */



/**
 * Class: OpenLayers.Control.WMSGetFeatureInfo
 * The WMSGetFeatureInfo control uses a WMS query to get information about a point on the map.  The
 * information may be in a display-friendly format such as HTML, or a machine-friendly format such
 * as GML, depending on the server's capabilities and the client's configuration.  This control
 * handles click or hover events, attempts to parse the results using an OpenLayers.Format, and
 * fires a 'getfeatureinfo' event with the click position, the raw body of the response, and an
 * array of features if it successfully read the response.
 *
 * Inherits from:
 *  - <OpenLayers.Control>
 */

/**
 * Method: buildWMSOptions
 * Build an object with the relevant WMS options for the GetFeatureInfo request
 *
 * Parameters:
 * url - {String} The url to be used for sending the request
 * layers - {Array(<OpenLayers.Layer.WMS)} An array of layers
 * clickPosition - {<OpenLayers.Pixel>} The position on the map where the mouse
 *     event occurred.
 * format - {String} The format from the corresponding GetMap request
 */
OpenLayers.Control.WMSGetFeatureInfo.prototype.buildWMSOptions = function (url, layers, clickPosition, format) {
    var layerNames = [], styleNames = [];
    var time;
    for (var i = 0, len = layers.length; i < len; i++) {
        if (layers[i].params.LAYERS != null) {
            layerNames = layerNames.concat(layers[i].params.LAYERS);
            styleNames = styleNames.concat(this.getStyleNames(layers[i]));
        }
        if (layers[i].params.TIME != null) {
            this.vendorParams.time = layers[i].params.TIME;
        }
    }
    var firstLayer = layers[0];
    // use the firstLayer's projection if it matches the map projection -
    // this assumes that all layers will be available in this projection
    var projection = this.map.getProjection();
    var layerProj = firstLayer.projection;
    if (layerProj && layerProj.equals(this.map.getProjectionObject())) {
        projection = layerProj.getCode();
    }
    var params = OpenLayers.Util.extend({
            service: "WMS",
            version: firstLayer.params.VERSION,
            request: "GetFeatureInfo",
            exceptions: firstLayer.params.EXCEPTIONS,
            bbox: this.map.getExtent().toBBOX(null,
                firstLayer.reverseAxisOrder()),
            feature_count: this.maxFeatures,
            height: this.map.getSize().h,
            width: this.map.getSize().w,
            format: format,
            info_format: firstLayer.params.INFO_FORMAT || this.infoFormat
        }, (parseFloat(firstLayer.params.VERSION) >= 1.3) ?
    {
        crs: projection,
        i: parseInt(clickPosition.x),
        j: parseInt(clickPosition.y)
    } :
    {
        srs: projection,
        x: parseInt(clickPosition.x),
        y: parseInt(clickPosition.y)
    }
    );
    if (layerNames.length != 0) {
        params = OpenLayers.Util.extend({
            layers: layerNames,
            query_layers: layerNames,
            styles: styleNames
        }, params);
    }

    // JvdB : Apply per-layer vendor params like CQL if present
    OpenLayers.Util.applyDefaults(params, firstLayer.params.vendorParams);

    OpenLayers.Util.applyDefaults(params, this.vendorParams);
    return {
        url: url,
        params: OpenLayers.Util.upperCaseObject(params),
        callback: function (request) {
            this.handleResponse(clickPosition, request, url);
        },
        scope: this
    };
};

/**
 * Method: request
 * Sends a GetFeatureInfo request to the WMS
 *
 * Parameters:
 * clickPosition - {<OpenLayers.Pixel>} The position on the map where the
 *     mouse event occurred.
 * options - {Object} additional options for this method.
 *
 * Valid options:
 * - *hover* {Boolean} true if we do the request for the hover handler
 */
OpenLayers.Control.WMSGetFeatureInfo.prototype.request = function (clickPosition, options) {
    var layers = this.findLayers();
    if (layers.length == 0) {
        this.events.triggerEvent("nogetfeatureinfo");
        // Reset the cursor.
        OpenLayers.Element.removeClass(this.map.viewPortDiv, "olCursorWait");
        return;
    }

    options = options || {};
    if (this.drillDown === false) {
        var wmsOptions = this.buildWMSOptions(this.url, layers,
            clickPosition, layers[0].params.FORMAT);
        var request = OpenLayers.Request.GET(wmsOptions);

        if (options.hover === true) {
            this.hoverRequest = request;
        }
    } else {
        this._requestCount = 0;
        this._numRequests = 0;
        this.features = [];
        // group according to service url to combine requests
        var services = {}, url;
        for (var i = 0, len = layers.length; i < len; i++) {
            var layer = layers[i];
            var service, found = false;
            url = OpenLayers.Util.isArray(layer.url) ? layer.url[0] : layer.url;
            if (url in services) {
                services[url].push(layer);
            } else {
                this._numRequests++;
                services[url] = [layer];
            }
        }
        var layers;
        for (var url in services) {
            layers = services[url];
            // JvdB: in some sames the client does not want to bundle requests
            // for multiple Layers from same server, e.g. with CQL-based requests
            // the responses need to be tied to the CQL sublayer.
            if (this.requestPerLayer) {
                for (var l = 0, len = layers.length; l < len; l++) {
                    var wmsOptions = this.buildWMSOptions(url, [layers[l]],
                        clickPosition, layers[0].params.FORMAT);
                    var req = OpenLayers.Request.GET(wmsOptions);

                    // Tie the Layer to the request as we can determine
                    // to which Layer a response belongs
                    req.layer = layers[l];
                }
                // Increment request-count as we had 1 req per url above
                this._numRequests += layers.length - 1;
            } else {
                var wmsOptions = this.buildWMSOptions(url, layers,
                    clickPosition, layers[0].params.FORMAT);
                OpenLayers.Request.GET(wmsOptions);
            }
        }
    }
};


/**
 * Method: handleResponse
 * Handler for the GetFeatureInfo response.
 *
 * Parameters:
 * xy - {<OpenLayers.Pixel>} The position on the map where the
 *     mouse event occurred.
 * request - {XMLHttpRequest} The request object.
 * url - {String} The url which was used for this request.
 */
OpenLayers.Control.WMSGetFeatureInfo.prototype.handleResponse = function (xy, request, url) {

    var doc = request.responseXML;
    if (!doc || !doc.documentElement) {
        doc = request.responseText;
    }
    var features = this.format.read(doc);

    // JvdB remember the Layer e.g. to discern Layer subsets (via CQL)
    if (request.layer && features) {
        for (var f = 0; f < features.length; f++) {
            features[f].layer = request.layer;
        }
    }
    if (this.drillDown === false) {
        this.triggerGetFeatureInfo(request, xy, features);
    } else {
        this._requestCount++;
        if (this.output === "object") {
            this._features = (this._features || []).concat(
                {url: url, features: features}
            );
        } else {
            this._features = (this._features || []).concat(features);
        }
        if (this._requestCount === this._numRequests) {
            this.triggerGetFeatureInfo(request, xy, this._features.concat());
            delete this._features;
            delete this._requestCount;
            delete this._numRequests;
        }
    }
};


// Added 11.8.2014 - JvdB
// Solve Capabilities parsing issues in IE: XML DOM uses  validation by default, i.e.
// fetching DTDs. In many cases the validation fails (even if the document is vald it seems).
// https://code.google.com/p/geoext-viewer/issues/detail?id=324
// Also not fixed in OL 2.13!
// See https://github.com/openlayers/openlayers/issues/1379
// We need the same implementation as OL XMLHttpRequest.js
//            oDocument    = new window.ActiveXObject("Microsoft.XMLDOM");
//            oDocument.async                = false;
//            oDocument.validateOnParse    = false;
//            oDocument.loadXML(sResponse);

/**
 * APIMethod: read
 * Deserialize a XML string and return a DOM node.
 *
 * Parameters:
 * text - {String} A XML string

 * Returns:
 * {DOMElement} A DOM node
 */
OpenLayers.Format.XML.prototype.read = function(text) {

        var index = text.indexOf('<');
        if(index > 0) {
            text = text.substring(index);
        }
        var node = OpenLayers.Util.Try(
            OpenLayers.Function.bind((
                function() {
                    var xmldom;
                    /**
                     * Since we want to be able to call this method on the prototype
                     * itself, this.xmldom may not exist even if in IE.
                     */
                    if(window.ActiveXObject && !this.xmldom) {
                        xmldom = new ActiveXObject("Microsoft.XMLDOM");
                    } else {
                        xmldom = this.xmldom;

                    }
                    xmldom.validateOnParse = false;
                    xmldom.loadXML(text);
                    return xmldom;
                }
            ), this),
            function() {
                return new DOMParser().parseFromString(text, 'text/xml');
            },
            function() {
                var req = new XMLHttpRequest();
                req.open("GET", "data:" + "text/xml" +
                         ";charset=utf-8," + encodeURIComponent(text), false);
                if(req.overrideMimeType) {
                    req.overrideMimeType("text/xml");
                }
                req.send(null);
                return req.responseXML;
            }
        );

        if(this.keepData) {
            this.data = node;
        }

        return node;
};

// TMSCapabilities: needed for GXP plugin gxp_tmssource
// Remove when upgrading to OL 2.13

/* Copyright (c) 2006-2013 by OpenLayers Contributors (see authors.txt for
 * full list of contributors). Published under the 2-clause BSD license.
 * See license.txt in the OpenLayers distribution or repository for the
 * full text of the license. */

/**

 */

/**
 * Class: OpenLayers.Format.TMSCapabilities
 * Parse TMS Capabilities.
 * See http://wiki.osgeo.org/wiki/Tile_Map_Service_Specification
 *
 * Inherits from:
 *  - <OpenLayers.Format.XML>
 */
OpenLayers.Format.TMSCapabilities = OpenLayers.Class(
    OpenLayers.Format.XML, {

    /**
     * Property: defaultPrefix
     */
    defaultPrefix: "tms",

    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "tms": {
            "Services": function(node, obj) {
                obj.services = [];
                this.readChildNodes(node, obj);
            },
            "TileMapService": function(node, obj) {
                if (obj.services) {
                    obj.services.push({
                        service: 'TMS',
                        version: node.getAttribute("version"),
                        title: node.getAttribute("title"),
                        href: node.getAttribute("href")
                    });
                } else {
                    this.readChildNodes(node, obj);
                }
            },
            "TileMaps": function(node, obj) {
                obj.tileMaps = [];
                this.readChildNodes(node, obj);
            },
            "TileMap": function(node, obj) {
                if (obj.tileMaps) {
                    obj.tileMaps.push({
                        href: node.getAttribute("href"),
                        srs: node.getAttribute("srs"),
                        title: node.getAttribute("title"),
                        profile: node.getAttribute("profile")
                    });
                } else {
                    obj.version =  node.getAttribute("version");
                    obj.tileMapService = node.getAttribute("tilemapservice");
                    this.readChildNodes(node, obj);
                }
            },
            "Title": function(node, obj) {
                obj.title = this.getChildValue(node);
            },
            "Abstract": function(node, obj) {
                obj['abstract'] = this.getChildValue(node);
            },
            "SRS": function(node, obj) {
                obj.srs = this.getChildValue(node);
            },
            "BoundingBox": function(node, obj) {
                obj.bbox = new OpenLayers.Bounds(
                    node.getAttribute("minx"),
                    node.getAttribute("miny"),
                    node.getAttribute("maxx"),
                    node.getAttribute("maxy"));
            },
            "Origin": function(node, obj) {
                obj.origin = new OpenLayers.LonLat(
                    node.getAttribute("x"),
                    node.getAttribute("y"));
            },
            "TileFormat": function(node, obj) {
                obj.tileFormat = {
                    width: parseInt(node.getAttribute("width"), 10),
                    height: parseInt(node.getAttribute("height"), 10),
                    mimeType: node.getAttribute("mime-type"),
                    extension: node.getAttribute("extension")
                };
            },
            "TileSets": function(node, obj) {
                obj.tileSets = [];
                this.readChildNodes(node, obj);
            },
            "TileSet": function(node, obj) {
                obj.tileSets.push({
                    href: node.getAttribute("href"),
                    unitsPerPixel: parseFloat(node.getAttribute("units-per-pixel")),
                    order: parseInt(node.getAttribute("order"), 10)
                });
            },
            "TileMapServerError": function(node, obj) {
                obj.error = true;
            },
            "Message": function(node, obj) {
                obj.message = this.getChildValue(node);
            }
        }
    },

    /**
     * APIMethod: read
     * Read TMS capabilities data from a string, and return a list of tilesets.
     *
     * Parameters:
     * data - {String} or {DOMElement} data to read/parse.
     *
     * Returns:
     * {Object} Information about the services served by this TMS instance.
     */
    read: function(data) {
        if(typeof data == "string") {
            data = OpenLayers.Format.XML.prototype.read.apply(this, [data]);
        }
        var raw = data;
        if(data && data.nodeType == 9) {
            data = data.documentElement;
        }
        var capabilities = {};
        this.readNode(data, capabilities);
        return capabilities;
    },

    CLASS_NAME: "OpenLayers.Format.TMSCapabilities"

});


// 15.4.2014 - read() method in OpenLayers.Protocol.CSW.v2_0_2
// Problem: the filters are not expanded in the request
// taken from GXP version

/**
 * Method: read
 * Construct a request for reading new records from the Catalogue.
 */
OpenLayers.Protocol.CSW.v2_0_2.prototype.read = function (options) {
    options = OpenLayers.Util.extend({}, options);
    OpenLayers.Util.applyDefaults(options, this.options || {});
    var response = new OpenLayers.Protocol.Response({requestType: "read"});

    // JvdB : this line differs with OL 2.12 !!
    var data = this.format.write(options.params || options);

    response.priv = OpenLayers.Request.POST({
        url: options.url,
        callback: this.createCallback(this.handleRead, response, options),
        params: options.params,
        headers: options.headers,
        data: data
    });

    return response;
};

/**
 * START Heron issue 378 (Namespaces IE11):
 * https://code.google.com/p/geoext-viewer/issues/detail?id=378
 * bug with IE11: an extra NS1 namespace is inserted in the WFS-request XML.
 * This extra namespace is not valid and causes an error on execution.
 * If multiple operations are send in a single operation namespaces NS2, NS3 and so on, are
 * generated by IE11. The fixes below (by Bart vd E) take care of this.
 *
 * Fixed in OpenLayers (due v 2.14):
 * https://github.com/openlayers/openlayers/commit/821975c1f500e26c6663584356db5d65b57f70d9
 * Fix for three protocols: SOS, CSW and WFS (3 versions)
 */

/** CSW **/

/*
 * Overriding OpenLayers to add xmlns NS
 *
 */
OpenLayers.Util.extend(OpenLayers.Format.CSWGetRecords.v2_0_2.prototype.namespaces,
    {
        xmlns: "http://www.w3.org/2000/xmlns/"
    });


/**
 * Method: write
 * Given an configuration js object, write a CSWGetRecords request.
 *
 * Parameters:
 * options - {Object} A object mapping the request.
 *
 * Returns:
 * {String} A serialized CSWGetRecords request.
 */
OpenLayers.Format.CSWGetRecords.v2_0_2.prototype.write = function (options) {
    var node = this.writeNode("csw:GetRecords", options);
    this.setAttributeNS(
        node, this.namespaces.xmlns,
        "xmlns:gmd", this.namespaces.gmd
    );
    return OpenLayers.Format.XML.prototype.write.apply(this, [node]);
};

/** SOS **/

/*
 * Overriding OpenLayers to add xmlns NS
 *
 */
OpenLayers.Util.extend(OpenLayers.Format.SOSGetObservation.prototype.namespaces,
    {
        xmlns: "http://www.w3.org/2000/xmlns/"
    });

/**
 * Method: write
 * Given an configuration js object, write a CSWGetRecords request.
 *
 * Parameters:
 * options - {Object} A object mapping the request.
 *
 * Returns:
 * {String} A serialized CSWGetRecords request.
 */
OpenLayers.Format.SOSGetObservation.prototype.write = function (options) {
    var node = this.writeNode("sos:GetObservation", options);
    this.setAttributeNS(
        node, this.namespaces.xmlns,
        "xmlns:om", this.namespaces.om
    );
    this.setAttributeNS(
        node, this.namespaces.xmlns,
        "xmlns:ogc", this.namespaces.ogc
    );
    this.setAttributeNS(
        node, this.namespaces.xsi,
        "xsi:schemaLocation", this.schemaLocation
    );
    return OpenLayers.Format.XML.prototype.write.apply(this, [node]);
};

/** WFS v1 **/

/*
 * Overriding OpenLayers to add xmlns NS (needed once for all WFS formatters)
 * Overiding OpenLayers to add support for GML 3.2.1
 *
 */
OpenLayers.Util.extend(OpenLayers.Format.WFST.v1.prototype.namespaces,
    {
        xmlns: "http://www.w3.org/2000/xmlns/",
        gml32: "http://www.opengis.net/gml/3.2"
    });

/**
 * Property: writers
 * As a compliment to the readers property, this structure contains public
 *     writing functions grouped by namespace alias and named like the
 *     node names they produce.
 */
OpenLayers.Format.WFST.v1.prototype.writers =
{
    "wfs": {
        "GetFeature": function (options) {
            var node = this.createElementNSPlus("wfs:GetFeature", {
                attributes: {
                    service: "WFS",
                    version: this.version,
                    handle: options && options.handle,
                    outputFormat: options && options.outputFormat,
                    maxFeatures: options && options.maxFeatures,
                    "xsi:schemaLocation": this.schemaLocationAttr(options)
                }
            });
            if (typeof this.featureType == "string") {
                this.writeNode("Query", options, node);
            } else {
                for (var i = 0, len = this.featureType.length; i < len; i++) {
                    options.featureType = this.featureType[i];
                    this.writeNode("Query", options, node);
                }
            }
            return node;
        },
        "Transaction": function (obj) {
            obj = obj || {};
            var options = obj.options || {};
            var node = this.createElementNSPlus("wfs:Transaction", {
                attributes: {
                    service: "WFS",
                    version: this.version,
                    handle: options.handle
                }
            });
            var i, len;
            var features = obj.features;
            if (features) {
                // temporarily re-assigning geometry types
                if (options.multi === true) {
                    OpenLayers.Util.extend(this.geometryTypes, {
                        "OpenLayers.Geometry.Point": "MultiPoint",
                        "OpenLayers.Geometry.LineString": (this.multiCurve === true) ? "MultiCurve" : "MultiLineString",
                        "OpenLayers.Geometry.Polygon": (this.multiSurface === true) ? "MultiSurface" : "MultiPolygon"
                    });
                }
                var name, feature;
                for (i = 0, len = features.length; i < len; ++i) {
                    feature = features[i];
                    name = this.stateName[feature.state];
                    if (name) {
                        this.writeNode(name, {
                            feature: feature,
                            options: options
                        }, node);
                    }
                }
                // switch back to original geometry types assignment
                if (options.multi === true) {
                    this.setGeometryTypes();
                }
            }
            if (options.nativeElements) {
                for (i = 0, len = options.nativeElements.length; i < len; ++i) {
                    this.writeNode("wfs:Native",
                        options.nativeElements[i], node);
                }
            }
            return node;
        },
        "Native": function (nativeElement) {
            var node = this.createElementNSPlus("wfs:Native", {
                attributes: {
                    vendorId: nativeElement.vendorId,
                    safeToIgnore: nativeElement.safeToIgnore
                },
                value: nativeElement.value
            });
            return node;
        },
        "Insert": function (obj) {
            var feature = obj.feature;
            var options = obj.options;
            var node = this.createElementNSPlus("wfs:Insert", {
                attributes: {
                    handle: options && options.handle
                }
            });
            this.srsName = this.getSrsName(feature);
            this.writeNode("feature:_typeName", feature, node);
            return node;
        },
        "Update": function (obj) {
            var feature = obj.feature;
            var options = obj.options;
            var node = this.createElementNSPlus("wfs:Update", {
                attributes: {
                    handle: options && options.handle,
                    typeName: (this.featureNS ? this.featurePrefix + ":" : "") +
                        this.featureType
                }
            });
            if (this.featureNS) {
                this.setAttributeNS(
                    node, this.namespaces.xmlns,
                    "xmlns:" + this.featurePrefix, this.featureNS
                );
            }

            // add in geometry
            var modified = feature.modified;
            if (this.geometryName !== null && (!modified || modified.geometry !== undefined)) {
                this.srsName = this.getSrsName(feature);
                this.writeNode(
                    "Property", {name: this.geometryName, value: feature.geometry}, node
                );
            }

            // add in attributes
            for (var key in feature.attributes) {
                if (feature.attributes[key] !== undefined &&
                    (!modified || !modified.attributes ||
                        (modified.attributes && (key in modified.attributes)))) {
                    this.writeNode(
                        "Property", {name: key, value: feature.attributes[key]}, node
                    );
                }
            }

            // add feature id filter
            this.writeNode("ogc:Filter", new OpenLayers.Filter.FeatureId({
                fids: [feature.fid]
            }), node);

            return node;
        },
        "Property": function (obj) {
            var node = this.createElementNSPlus("wfs:Property");
            this.writeNode("Name", obj.name, node);
            if (obj.value !== null) {
                this.writeNode("Value", obj.value, node);
            }
            return node;
        },
        "Name": function (name) {
            return this.createElementNSPlus("wfs:Name", {value: name});
        },
        "Value": function (obj) {
            var node;
            if (obj instanceof OpenLayers.Geometry) {
                node = this.createElementNSPlus("wfs:Value");
                var geom = this.writeNode("feature:_geometry", obj).firstChild;
                node.appendChild(geom);
            } else {
                node = this.createElementNSPlus("wfs:Value", {value: obj});
            }
            return node;
        },
        "Delete": function (obj) {
            var feature = obj.feature;
            var options = obj.options;
            var node = this.createElementNSPlus("wfs:Delete", {
                attributes: {
                    handle: options && options.handle,
                    typeName: (this.featureNS ? this.featurePrefix + ":" : "") +
                        this.featureType
                }
            });
            if (this.featureNS) {
                this.setAttributeNS(
                    node, this.namespaces.xmlns,
                    "xmlns:" + this.featurePrefix, this.featureNS
                );
            }
            this.writeNode("ogc:Filter", new OpenLayers.Filter.FeatureId({
                fids: [feature.fid]
            }), node);
            return node;
        }
    }
};

/** WFS v1.0.0 **/


/**
 * Property: writers
 * As a compliment to the readers property, this structure contains public
 *     writing functions grouped by namespace alias and named like the
 *     node names they produce.
 */
OpenLayers.Format.WFST.v1_0_0.prototype.writers = {
    "wfs": OpenLayers.Util.applyDefaults({
        "Query": function (options) {
            options = OpenLayers.Util.extend({
                featureNS: this.featureNS,
                featurePrefix: this.featurePrefix,
                featureType: this.featureType,
                srsName: this.srsName,
                srsNameInQuery: this.srsNameInQuery
            }, options);
            var prefix = options.featurePrefix;
            var node = this.createElementNSPlus("wfs:Query", {
                attributes: {
                    typeName: (prefix ? prefix + ":" : "") +
                        options.featureType
                }
            });
            if (options.srsNameInQuery && options.srsName) {
                node.setAttribute("srsName", options.srsName);
            }
            if (options.featureNS) {
                this.setAttributeNS(
                    node, this.namespaces.xmlns,
                    "xmlns:" + prefix, options.featureNS
                );
            }
            if (options.propertyNames) {
                for (var i = 0, len = options.propertyNames.length; i < len; i++) {
                    this.writeNode(
                        "ogc:PropertyName",
                        {property: options.propertyNames[i]},
                        node
                    );
                }
            }
            if (options.filter) {
                this.setFilterProperty(options.filter);
                this.writeNode("ogc:Filter", options.filter, node);
            }
            return node;
        }
    }, OpenLayers.Format.WFST.v1.prototype.writers["wfs"]),
    "gml": OpenLayers.Format.GML.v2.prototype.writers["gml"],
    "feature": OpenLayers.Format.GML.v2.prototype.writers["feature"],
    "ogc": OpenLayers.Format.Filter.v1_0_0.prototype.writers["ogc"]
};

/** WFS v1.1.0 **/

/* NS already added in v1. */

/**
 * Property: writers
 * As a compliment to the readers property, this structure contains public
 *     writing functions grouped by namespace alias and named like the
 *     node names they produce.
 */
OpenLayers.Format.WFST.v1_1_0.prototype.writers = {
    "wfs": OpenLayers.Util.applyDefaults({
        "GetFeature": function (options) {
            var node = OpenLayers.Format.WFST.v1.prototype.writers["wfs"]["GetFeature"].apply(this, arguments);
            options && this.setAttributes(node, {
                resultType: options.resultType,
                startIndex: options.startIndex,
                count: options.count
            });
            return node;
        },
        "Query": function (options) {
            options = OpenLayers.Util.extend({
                featureNS: this.featureNS,
                featurePrefix: this.featurePrefix,
                featureType: this.featureType,
                srsName: this.srsName
            }, options);
            var prefix = options.featurePrefix;
            var node = this.createElementNSPlus("wfs:Query", {
                attributes: {
                    typeName: (prefix ? prefix + ":" : "") +
                        options.featureType,
                    srsName: options.srsName
                }
            });
            if (options.featureNS) {
                this.setAttributeNS(node, this.namespaces.xmlns,
                    "xmlns:" + prefix, options.featureNS);
            }
            if (options.propertyNames) {
                for (var i = 0, len = options.propertyNames.length; i < len; i++) {
                    this.writeNode(
                        "wfs:PropertyName",
                        {property: options.propertyNames[i]},
                        node
                    );
                }
            }
            if (options.filter) {
                OpenLayers.Format.WFST.v1_1_0.prototype.setFilterProperty.call(this, options.filter);
                this.writeNode("ogc:Filter", options.filter, node);
            }
            return node;
        },
        "PropertyName": function (obj) {
            return this.createElementNSPlus("wfs:PropertyName", {
                value: obj.property
            });
        }
    }, OpenLayers.Format.WFST.v1.prototype.writers["wfs"]),
    "gml": OpenLayers.Format.GML.v3.prototype.writers["gml"],
    "feature": OpenLayers.Format.GML.v3.prototype.writers["feature"],
    "ogc": OpenLayers.Format.Filter.v1_1_0.prototype.writers["ogc"]
};

/** END fix for issue 378 (Namespaces IE11) */

// -------------------------------------------
// Fix issue 383: OLeditor - GPX export/import
// -------------------------------------------
// Code from OL 2.12 - GPX.js
// -------------------------------------------
//
// !!! NOTE: Wolfram Winter - 20124-07-29
// !!! This code fix must be removed, if using OL >= 2.13
//
// See:
// https://github.com/openlayers/openlayers/blob/master/notes/2.13.md#formatgpx-no-more-prefixes
//
// No 'gpx:' prefix is added in the XML tags anymore when writing
// GPX from OpenLayers features. It seems like it is not supported
// by most of the tools that are able to read GPX.
// -------------------------------------------
OpenLayers.Format.GPX.prototype.buildMetadataNode = function(metadata) {
        var types = ['name', 'desc', 'author'],
            node = this.createElementNS(this.namespaces.gpx, 'metadata');
        for (var i=0; i < types.length; i++) {
            var type = types[i];
            if (metadata[type]) {
                var n = this.createElementNS(this.namespaces.gpx, type);
                n.appendChild(this.createTextNode(metadata[type]));
                node.appendChild(n);
            }
        }
        return node;
    };

OpenLayers.Format.GPX.prototype.buildFeatureNode = function(feature) {
        var geometry = feature.geometry;
            geometry = geometry.clone();
        if (this.internalProjection && this.externalProjection) {
            geometry.transform(this.internalProjection,
                               this.externalProjection);
        }
        if (geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
            var wpt = this.buildWptNode(geometry);
            this.appendAttributesNode(wpt, feature);
            return wpt;
        } else {
            var trkNode = this.createElementNS(this.namespaces.gpx, "trk");

            this.appendAttributesNode(trkNode, feature);
            var trkSegNodes = this.buildTrkSegNode(geometry);
            trkSegNodes = OpenLayers.Util.isArray(trkSegNodes) ?
                trkSegNodes : [trkSegNodes];
            for (var i = 0, len = trkSegNodes.length; i < len; i++) {
                trkNode.appendChild(trkSegNodes[i]);
            }
            return trkNode;
        }
    };

OpenLayers.Format.GPX.prototype.buildTrkSegNode = function(geometry) {
        var node,
            i,
            len,
            point,
            nodes;
        if (geometry.CLASS_NAME == "OpenLayers.Geometry.LineString" ||
            geometry.CLASS_NAME == "OpenLayers.Geometry.LinearRing") {
            node = this.createElementNS(this.namespaces.gpx, "trkseg");
            for (i = 0, len=geometry.components.length; i < len; i++) {
                point = geometry.components[i];
                node.appendChild(this.buildTrkPtNode(point));
            }
            return node;
        } else {
            nodes = [];
            for (i = 0, len = geometry.components.length; i < len; i++) {
                nodes.push(this.buildTrkSegNode(geometry.components[i]));
            }
            return nodes;
        }
    };

OpenLayers.Format.GPX.prototype.buildTrkPtNode = function(point) {
        var node = this.createElementNS(this.namespaces.gpx, "trkpt");
        node.setAttribute("lon", point.x);
        node.setAttribute("lat", point.y);
        return node;
    };

OpenLayers.Format.GPX.prototype.buildWptNode = function(geometry) {
        var node = this.createElementNS(this.namespaces.gpx, "wpt");
        node.setAttribute("lon", geometry.x);
        node.setAttribute("lat", geometry.y);
        return node;
    };

OpenLayers.Format.GPX.prototype.appendAttributesNode = function(node, feature) {
        var name = this.createElementNS(this.namespaces.gpx, 'name');
        name.appendChild(this.createTextNode(
            feature.attributes.name || feature.id));
        node.appendChild(name);
        var desc = this.createElementNS(this.namespaces.gpx, 'desc');
        desc.appendChild(this.createTextNode(
            feature.attributes.description || this.defaultDesc));
        node.appendChild(desc);
        // TBD - deal with remaining (non name/description) attributes.
    };
// -------------------------------------------
// END fix issue 383
// -------------------------------------------

