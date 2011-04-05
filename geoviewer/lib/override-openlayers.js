/*
 * Copyright (C) 2010 Geodan
 *
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
 
 
/*
 * Overiding OpenLayers to add support for GML 3.2.1
 *
 */
OpenLayers.Util.extend(OpenLayers.Format.WFST.v1.prototype.namespaces,
{gml32: 'http://www.opengis.net/gml/3.2'});



/*OpenLayers.Util.extend(OpenLayers.Format.WFST.v1_1_0.prototype.readers,
{"gml32": OpenLayers.Format.GML.v3.prototype.readers["gml"]});
OpenLayers.Format.WFST.v1_0_0.prototype.namespaces.gml32 = 'http://www.opengis.net/gml/3.2';
*/

// do some overrides for OpenLayers to correctly use GetFeatureInfo from the TNO services
// http://trac.osgeo.org/openlayers/ticket/3176 (will be fixed in OL 2.11)
OpenLayers.Control.WMSGetFeatureInfo.prototype.buildWMSOptions = function(url, layers, clickPosition, format) {
    var layerNames = [], styleNames = [];
    var i;
    for (i = 0, len = layers.length; i < len; i++) {
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
        i: parseInt(clickPosition.x,10),
        j: parseInt(clickPosition.y,10)
    } :
{
        srs: projection,
        x: parseInt(clickPosition.x,10),
        y: parseInt(clickPosition.y,10)
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

// http://trac.osgeo.org/openlayers/ticket/3177 (might be fixed in OL 2.11)
OpenLayers.Format.WMSGetFeatureInfo.prototype.read_FeatureInfoResponse = function(data) {
    var response = [];
    var featureNodes = this.getElementsByTagNameNS(data, '*',
        'FIELDS');
    var i;
    for(i=0, len=featureNodes.length;i<len;i++) {
        var featureNode = featureNodes[i];
        var geom = null;

        // attributes can be actual attributes on the FIELDS tag, or FIELD children
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
                if (node.nodeType !== 3) {
                    attributes[node.getAttribute("name")] = node.getAttribute("value");
                }
            }
        }
        response.push(
            new OpenLayers.Feature.Vector(geom, attributes, null)
            );
    }
    return response;
};
