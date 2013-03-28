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
Ext.namespace("Heron.utils");

/** api: (define)
 *  module = Heron.widgets
 *  class = FeatureInfoPanel
 *  base_link = `Ext.Panel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.Panel>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron FeatureInfoPanel.
 *  All regular ExtJS `Ext.Panel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.Panel>`_
 *  config params also apply.
 *  The ``infoFormat`` config parameter is the default ``INFO_FORMAT`` to be used for WMS GetFeatureInfo (GFI).
 *  This value can be overruled by an optional per-Layer ``infoFormat`` WMS Layer config parameter.
 *  GetFeatureInfo-response data may be displayed as a Grid, a Tree or formatted XML. The ``displayPanels``
 *  config option can be used to trigger a menu with display options. Note also the use of "GridCellRenderers".
 *  These allow you to render specific formatting of cell content within the feature grid. For example
 *  URL substitution to render external links in a new tab or browser window. You can even supply your own formatting
 *  function. This function is according to the ExtJS ColumnModel renderers (see e.g. http://snipplr.com/view/40942).
 *
 *  .. code-block:: javascript
 *
 *
 */

/** api: constructor
 *  .. class:: FeatureInfoToolip(config)
 *
 *  A Panel designed to hold WMS GetFeatureInfo (GFI) data for one or more WMS layers.
 *
 */
Heron.widgets.FeatureInfoTooltip = Ext.extend(Heron.widgets.FeatureInfoPanel, {
	/** api: config[hideonmove]
	 *  ``boolean``
	 *  The tooltip will hide if hideonmove parameter is ``true``. Will be ``false`` if not set.
	 */
        hideonmove: false,
        
	/** api: config[hover]
	 *  ``boolean``
	 *  The tooltip will show on mousestop if hover parameter is ``true``. If hover parameter is 
         *  ``false`` then the tooltip will show on mouseclick. Parameter value will be ``true`` if not set.
         *  The tooltip will only show if feature information was found.
	 */
        hover: true,
        
	/** api: config[drillDown]
	 *  ``boolean``
	 *  Only feature information in the topmost layer will be searched if drillDown parameter is ``false``.
         *  Parameter value will be ``false`` if not set.
	 */
        drillDown: false,
        
	/** api: config[layer]
	 *  ``string``
	 *  The layer to get feature information from. Parameter value will be ``""`` if not set.
         *  If not set, all visible layers of the map will be searched. In case the drillDown
         *  parameter is ``false``, the topmost visible layer will searched.
	 */
        layer: "",
        
        popupWindowProps: {
                title: "FeatureInfo tooltip",
                layout: 'fit',
                width: 320,
                height: 200,
                maximizable: false,
                collapsible: false,
                unpinnable: false,
                anchored: true,
                map: undefined
        },

	initComponent: function () {
		// For closures ("this" is not valid in callbacks)
		var self = this;

		this.map = Heron.App.getMap();


                //Try and find a WMSGetFeatureInfo control with id: hr-feature-info-hover
                var controlID = "hr-feature-info-hover";
		var controls = this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo");
		if (controls && controls.length > 0) {
                    for (var index = 0; index < controls.length; index++) {
                        if (controls[index].id == controlID) {
                            this.olControl = controls[index];
                            // Overrule with our own info format and max features
                            this.olControl.infoFormat = this.infoFormat;
                            this.olControl.maxFeatures = this.maxFeatures;
                            break;
                        }
                    }
                }
                //Create a new GFI control 
		if (!this.olControl || (this.olControl && this.olControl.id !== controlID)) {
                    this.olControl = new OpenLayers.Control.WMSGetFeatureInfo({
                            id: controlID,
                            maxFeatures: this.maxFeatures,
                            queryVisible: true,
                            hover: true,
                            infoFormat: this.infoFormat
                    });

                    this.map.addControl(this.olControl);
		}
                
		// Register interceptors
		this.olControl.events.register("getfeatureinfo", this, this.handleGetFeatureInfo);
		this.olControl.events.register("beforegetfeatureinfo", this, this.handleBeforeGetFeatureInfo);
                
                // Hide tooltip if mouse moves again.
                if (this.hideonmove) {
                    if (this.olControl.handler) {
                        if (this.olControl.handler.callbacks.move) {
                            this.olControl.handler.callbacks.move = function() {
                                self.olControl.cancelHover();
                                if (self.featurePopupWindow) {
                                    self.featurePopupWindow.hide();
                                }
                            }
                        }
                    }
                }

		Heron.widgets.FeatureInfoTooltip.superclass.initComponent.call(this);
                
		this.on(
				"render",
				function () {
					this.mask = new Ext.LoadMask(this.body, {msg: __('Loading...')})
				});
	},

	handleBeforeGetFeatureInfo: function (evt) {
                
                this.createPopupWindow();
                
                if (this.featurePopupWindow) {
                        this.featurePopupWindow.hide();
                }
                
                //If the event was not triggered from this.olControl, do nothing
                if (evt.object !== this.olControl) {
                    return;
                }
                
		this.olControl.layers = [];

		// Needed to force accessing multiple WMS-es when multiple layers are visible
		this.olControl.url = null;
                //Anke
		this.olControl.drillDown = false;
                this.olControl.maxFeatures = this.maxFeatures;

		var layer;
                //If a layer is specified, try and find the layer in the map.
                if (this.layer) {
                    var layers = this.map.getLayersByName(this.layer);
                    if (layers) {
                        //Add the first layer found with name layer
                        layer = layers[0];
                        this.olControl.layers.push(layer);
                    }
                }
                else {
                    // Select WMS layers that are visible and enabled (via featureInfoFormat or Layer info_format (capitalized by OL) prop)
                    for (var index = 0; index < this.map.layers.length; index++) {
                            layer = this.map.layers[index];

                            // Skip non-WMS layers
                            if (!layer instanceof OpenLayers.Layer.WMS || !layer.params) {
                                    continue;
                            }

                            // Enable layers for GFI that have a GFI mime param specified
                            if (layer.visibility && (layer.featureInfoFormat || layer.params.INFO_FORMAT)) {

                                    // Backward compatible with old configs that have only featureInfoFormat
                                    // set to a mime type like "text/xml". layer.params.INFO_FORMAT determines the mime
                                    // requested from WMS server.
                                    if (!layer.params.INFO_FORMAT && layer.featureInfoFormat) {
                                            layer.params.INFO_FORMAT = layer.featureInfoFormat;
                                    }
                                    this.olControl.layers.push(layer);
                            }
                    }
                }
                
		this.lastEvt = null;
		this.expand();
		if (this.tabPanel != undefined) {
			this.tabPanel.removeAll();
		}

		// Show loading mask
		if (this.mask) {
			this.mask.show();
		}

		// TODO this really should be done by subscribing to the "nogetfeatureinfo"  event
		// of OpenLayers.Control.WMSGetFeatureInfo
		// No layers with GFI available: display message
		if (this.olControl.layers.length == 0) {
			// Hide loading mask
			if (this.mask) {
				this.mask.hide();
			}
			if (this.displayPanel) {
				this.remove(this.displayPanel);
			}
			// Delegate to info panel (Grid, Tree, XML)
			this.displayPanel = this.displayInfo(__('Feature Info unavailable'));

			this.add(this.displayPanel);
			this.displayPanel.doLayout();
		}
	},

	handleGetFeatureInfo: function (evt) {
                //If the event was not triggered from this.olControl, do nothing
                if (evt.object !== this.olControl) {
                    return;
                }
                // 
		// Hide the loading mask
                if (this.mask) {
                        this.mask.hide();
                }

		// Save result e.g. when changing views
		if (evt) {
			this.lastEvt = evt;
		}

		if (!this.lastEvt) {
			return;
		}

		if (this.displayPanel) {
			this.remove(this.displayPanel);
		}

                // Delegate to current display panel (Grid, Tree, XML)
		this.displayPanel = this.display(this.lastEvt);

		if (this.displayPanel) {
			this.add(this.displayPanel);
			this.displayPanel.doLayout();
                        //If feature info was found, show the tooltip.
                        if (this.featurePopupWindow) {
                            var loc = this.featurePopupWindow.map.getLonLatFromPixel(evt.xy);
                            this.featurePopupWindow.location = loc;
                            this.featurePopupWindow.doLayout();
                            this.featurePopupWindow.show();
                        }
		}
                else {
                    //If no feature info was found, hide the tooltip.
                        if (this.featurePopupWindow) {
                            this.featurePopupWindow.hide();
                        }
                }
                if (this.featurePopupWindow) {
                    //If tooltip is hidden do not do runLayout.
                    if (this.featurePopupWindow.hidden) {
                        return;
                    }
                }

		if (this.getLayout()) {
			this.getLayout().runLayout();
		}
	},
        createPopupWindow: function() {
            
                if (!this.featurePopupWindow) {
                        this.popupWindowProps.map = Heron.App.getMap();
                        this.featurePopupWindow = new GeoExt.Popup(this.popupWindowProps);
                        this.featurePopupWindow.add(this);
                }
        },
        deactivate: function() {
                if (this.featurePopupWindow) {
                    this.featurePopupWindow.hide();
                }
        }
            

});

/** api: xtype = hr_featureinfopopup */
Ext.reg('hr_featureinfotooltip', Heron.widgets.FeatureInfoTooltip);
