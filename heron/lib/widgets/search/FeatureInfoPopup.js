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
Ext.namespace("Heron.widgets.search");
Ext.namespace("Heron.utils");

/** api: (define)
 *  module = Heron.widgets.search
 *  class = FeatureInfoPopup
 *  base_link = `GeoExt.Popup <http://geoext.org/lib/GeoExt/widgets/Popup.html>`_
 */

/** api: example
 *  This class can be configured via the Toolbar. It is usually not created explicitly.
 *  It can be either a regular 'featureinfo' or 'tooltips' widget button.
 *  A FeatureInfoPopup can be triggered by clcking or hovering, dependent on the config, both shown below.
 *  Below two sample configs for the toolbar.
 *
 *  .. code-block:: javascript

     {type: "featureinfo", options: {
            pressed: true,
            getfeatureControl: {
                hover: true,
                drillDown: false,
                maxFeatures: 1
            },
            popupWindow: {
                width: 320,
                height: 200,
                anchored: false,
                featureInfoPanel: {
                    // Option values are 'Grid', 'Tree' and 'XML', default is 'Grid' (results in no display menu)
                    displayPanels: ['Grid'],
                    // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                    exportFormats: [],
                    // exportFormats: ['CSV', 'XLS'],
                    maxFeatures: 1
                }
            }
        }},

     {type: "tooltips", options: {
            // Pressed cannot be true when anchored is true!
            pressed: false,
            getfeatureControl: {
                hover: true,
                drillDown: false,
                maxFeatures: 1
            },
            popupWindow: {
                title: "Information",
                hideonmove: false,
                anchored: true,
                //layer: "World Cities (FAO)",
                featureInfoPanel: {
                    // Option values are 'Grid', 'Tree' and 'XML', default is 'Grid' (results in no display menu)
                    displayPanels: ['Grid'],
                    // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                    exportFormats: []
                    // exportFormats: ['CSV', 'XLS'],
                }
            }
        }}

 */

/** api: constructor
 *  .. class:: FeatureInfoPopup(config)
 *
 *  A Popup to hold the Panel designed to hold WMS GetFeatureInfo (GFI) data for one or more WMS layers.
 *
 */
Heron.widgets.search.FeatureInfoPopup = Ext.extend(GeoExt.Popup, {

    title: __('FeatureInfo popup'),
    layout: 'fit',
    resizable: true,
    width: 320,
    height: 200,
    anchorPosition: "auto",
    panIn: false,
    draggable: true,
    unpinnable: false,
    maximizable: false,
    collapsible: false,
    closeAction: 'hide',
    olControl: null,

    /** api: config[anchored]
     *  ``boolean``
     *  The popup will show where the the clicked or where the mouse stopped.
     *  Will be ``true`` if not set.
     */
    anchored: true,

    /** api: config[hideonmove]
     *  ``boolean``
     *  The popup will hide if hideonmove parameter is ``true``. Will be ``false`` if not set.
     *  This parameter only applies when hover is ``true``.
     */
    hideonmove: false,

    /** api: config[layer]
     *  ``string``
     *  The layer to get feature information from. Parameter value will be ``""`` if not set.
     *  If not set, all visible layers of the map will be searched. In case the drillDown
     *  parameter is ``false``, the topmost visible layer will searched.
     */
    layer: "",

    initComponent: function () {
        this.map = Heron.App.getMap();

        //If hideonmove = true, the anchorPosition cannot be "auto"
        //because the popup will not show in FireFox.
        if (this.hideonmove) {
            this.anchorPosition = "bottom-left";
        }

        Heron.widgets.search.FeatureInfoPopup.superclass.initComponent.call(this);

        // For closures ("this" is not valid in callbacks)
        var self = this;

        //Set the olControl properties
        var controlProps = {
            hover: false,
            drillDown: true,
            maxFeatures: 5,
            queryVisible: true,
            infoFormat: 'application/vnd.ogc.gml'
        };

        controlProps = Ext.apply(controlProps, this.controlDefaults);

        //Try and find a WMSGetFeatureInfo control with id: hr-feature-info-hover
        if (!this.olControl) {
            var controls = this.map.getControlsByClass("OpenLayers.Control.WMSGetFeatureInfo");
            if (controls && controls.length > 0) {
                for (var index = 0; index < controls.length; index++) {
                    this.olControl = controls[index];
                    // Overrule with our own info format and max features
                    this.olControl.infoFormat = controlProps.infoFormat;
                    this.olControl.maxFeatures = controlProps.maxFeatures;
                    break;
                }
            }
            //Create a new GFI control
            if (!this.olControl) {
                this.olControl = new OpenLayers.Control.WMSGetFeatureInfo({
                    //id: controlID,
                    maxFeatures: controlProps.maxFeatures,
                    queryVisible: true,
                    hover: controlProps.hover,
                    infoFormat: controlProps.infoFormat
                });

                this.map.addControl(this.olControl);
            }
        }
        // Register interceptors
        this.olControl.events.register("getfeatureinfo", this, this.handleGetFeatureInfo);
        this.olControl.events.register("beforegetfeatureinfo", this, this.handleBeforeGetFeatureInfo);

        // Hide tooltip if mouse moves again.
        if (this.hideonmove) {
            if (this.olControl.handler) {
                if (this.olControl.handler.callbacks.move) {
                    this.olControl.handler.callbacks.move = function () {
                        self.olControl.cancelHover();
                        self.hide();
                    }
                }
            }
        }

        //Set the properties of the featureinfoPanel.
        var fiPanel = [
            {
                xtype: 'hr_featureinfopanel',
                title: null,
                header: false,
                border: false,
                // Option values are 'Grid', 'Tree' and 'XML', default is 'Grid' (results in no display menu)
                displayPanels: ['Grid'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: [],
                maxFeatures: controlProps.maxFeatures,
                hover: controlProps.hover,
                drillDown: controlProps.drillDown,
                infoFormat: controlProps.infoFormat,
                layer: this.layer,
                olControl: this.olControl
            }
        ];

        fiPanel[0] = Ext.apply(fiPanel[0], this.featureinfopanelProps);

        this.add(fiPanel);

    },

    handleBeforeGetFeatureInfo: function (evt) {
        if (evt.object !== this.olControl) {
            this.hide();
        }
    },

    handleGetFeatureInfo: function (evt) {
        //If the event was not triggered from this.olControl, do nothing
        if (evt.object !== this.olControl) {
            return;
        }
        // Don't show popup when no features found in in tooltips (anchored mode)
        if ((!evt.features || evt.features.length == 0) && this.anchored && this.olControl.hover) {
            this.hide();
            return;
        }
        // Features available: popup at geo-location
        this.location = this.map.getLonLatFromPixel(evt.xy);
        this.show();
    },
    deactivate: function () {
        this.hide();
    }


});

/** api: xtype = hr_featureinfopopup */
Ext.reg('hr_featureinfopopup', Heron.widgets.search.FeatureInfoPopup);
