/**
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/** Using the ExtJS-way to override single methods of classes. */
Ext.override(GeoExt.WMSLegend, {

	/*  NOTE (JvdB): override the WMSLegend.getLegendUrl() method: to allow baseParams, in particular FORMAT=
	 *  to be merged in via Heron config
	 *  the version below taken from GeoExt GitHub on 27.sept.2012
	 */

	/** api: (define)
	 *  module = GeoExt
	 *  class = WMSLegend
	 */
	/**
	 * @param layerName
	 * @param layerNames
	 */
    /** private: method[getLegendUrl]
     *  :param layerName: ``String`` A sublayer.
     *  :param layerNames: ``Array(String)`` The array of sublayers,
     *      read from this.layerRecord if not provided.
     *  :return: ``String`` The legend URL.
     *
     *  Get the legend URL of a sublayer.
     */
    getLegendUrl: function(layerName, layerNames) {
        var rec = this.layerRecord;
        var url;
        var styles = rec && rec.get("styles");
        var layer = rec.getLayer();
        layerNames = layerNames || [layer.params.LAYERS].join(",").split(",");

        var styleNames = layer.params.STYLES &&
                             [layer.params.STYLES].join(",").split(",");
        var idx = layerNames.indexOf(layerName);
        var styleName = styleNames && styleNames[idx];
        // check if we have a legend URL in the record's
        // "styles" data field
        if(styles && styles.length > 0) {
            if(styleName) {
                Ext.each(styles, function(s) {
                    url = (s.name == styleName && s.legend) && s.legend.href;
                    return !url;
                });
            } else if(this.defaultStyleIsFirst === true && !styleNames &&
                      !layer.params.SLD && !layer.params.SLD_BODY) {
                url = styles[0].legend && styles[0].legend.href;
            }
        }
        if(!url) {
            url = layer.getFullRequestString({
                REQUEST: "GetLegendGraphic",
                WIDTH: null,
                HEIGHT: null,
                EXCEPTIONS: "application/vnd.ogc.se_xml",
                LAYER: layerName,
                LAYERS: null,
                STYLE: (styleName !== '') ? styleName: null,
                STYLES: null,
                SRS: null,
                FORMAT: null,
                TIME: null
            });
        }
        var params = Ext.apply({}, this.baseParams);
        if (layer.params._OLSALT) {
            // update legend after a forced layer redraw
            params._OLSALT = layer.params._OLSALT;
        }
        url = Ext.urlAppend(url, Ext.urlEncode(params));
        if (url.toLowerCase().indexOf("request=getlegendgraphic") != -1) {
            if (url.toLowerCase().indexOf("format=") == -1) {
                url = Ext.urlAppend(url, "FORMAT=image%2Fgif");
            }
            // add scale parameter - also if we have the url from the record's
            // styles data field and it is actually a GetLegendGraphic request.
            if (this.useScaleParameter === true) {
                var scale = layer.map.getScale();
                url = Ext.urlAppend(url, "SCALE=" + scale);
            }
        }

        return url;
    }
});

/*  NOTE (WW): override the GeoExt.tree.LayerNodeUI.enforceOneVisible() method:
 *  to prevent null pointer assignment in 'this.node.getOwnerTree().getChecked()' when
 *  using the 'hr_layertreepanel' panel without the 'hropts' option
 *
 *  Version below taken from GeoExt GitHub on 01.nov.2012
 */
Ext.override(GeoExt.tree.LayerNodeUI, {

    /** private: method[enforceOneVisible]
     *
     *  Makes sure that only one layer is visible if checkedGroup is set.
     */
    enforceOneVisible: function() {
        var attributes = this.node.attributes;
        var group = attributes.checkedGroup;
        // If we are in the baselayer group, the map will take care of
        // enforcing visibility.
        if(group && group !== "gx_baselayer") {
            var layer = this.node.layer;
// --- WW ---
			if (attributes.checked) {
// ----------
            var checkedNodes = this.node.getOwnerTree().getChecked();
            var checkedCount = 0;
            // enforce "not more than one visible"
            Ext.each(checkedNodes, function(n){
                var l = n.layer;
                if(!n.hidden && n.attributes.checkedGroup === group) {
                    checkedCount++;
                    if(l != layer && attributes.checked) {
                        l.setVisibility(false);
                    }
                }
            });
            // enforce "at least one visible"
            if(checkedCount === 0 && attributes.checked == false) {
                layer.setVisibility(true);
            }
// ----------
			}
// ----------
        }
    }

});

/*  NOTE (WW): append the GeoExt.tree.LayerNode.renderX() method:
 *  to prevent problems with the 'checkedGroup' flag for creating radiobuttons when
 *  using the 'hr_activelayerspanel' or 'hr_activethemespanel' panel - instead of a
 *  'baselayer radiobutton' a 'disabled baselayer checkbox' is shown
 *
 *  Version below taken from GeoExt GitHub on 01.nov.2012
 */
Ext.override(GeoExt.tree.LayerNode, {

    /** private: method[renderX]
     *  :param bulkRender: ``Boolean``
     */
    renderX: function(bulkRender) {
        var layer = this.layer instanceof OpenLayers.Layer && this.layer;
        if(!layer) {
            // guess the store if not provided
            if(!this.layerStore || this.layerStore == "auto") {
                this.layerStore = GeoExt.MapPanel.guess().layers;
            }
            // now we try to find the layer by its name in the layer store
            var i = this.layerStore.findBy(function(o) {
                return o.get("title") == this.layer;
            }, this);
            if(i != -1) {
                // if we found the layer, we can assign it and everything
                // will be fine
                layer = this.layerStore.getAt(i).getLayer();
            }
        }
        if (!this.rendered || !layer) {
            var ui = this.getUI();

            if(layer) {
                this.layer = layer;
                // no DD and radio buttons for base layers
                if(layer.isBaseLayer) {
					this.draggable = false;
// --- WW ---
					// Don't use 'checkedGroup' argument

					// Ext.applyIf(this.attributes, {
					// checkedGroup: "gx_baselayer"
					// });

					// Disabled baselayer checkbox
					this.disabled = true;
// ----------
                }

                //base layers & alwaysInRange layers should never be auto-disabled
                this.autoDisable = !(this.autoDisable===false || this.layer.isBaseLayer || this.layer.alwaysInRange);

                if(!this.text) {
                    this.text = layer.name;
                }

                ui.show();
                this.addVisibilityEventHandlers();
            } else {
                ui.hide();
            }

            if(this.layerStore instanceof GeoExt.data.LayerStore) {
                this.addStoreEventHandlers(layer);
            }
        }
        GeoExt.tree.LayerNode.superclass.render.apply(this, arguments);
    }

});

