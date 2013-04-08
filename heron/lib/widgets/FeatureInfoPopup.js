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
 *  class = FeatureInfoTooltip
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
 *  .. class:: FeatureInfoPopup(config)
 *
 *  A Popup to hold the Panel designed to hold WMS GetFeatureInfo (GFI) data for one or more WMS layers.
 *
 */
Heron.widgets.FeatureInfoPopup = Ext.extend(GeoExt.Popup, {

	title: __('FeatureInfo popup'),
	layout: 'fit',
	resizable: true,
	width: 320,
	height: 200,
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

		Heron.widgets.FeatureInfoPopup.superclass.initComponent.call(this);
		
		// For closures ("this" is not valid in callbacks)
		var self = this;

		//Set the olControl properties
		var controlProps= {
			hover: false,
			drillDown: true,
			maxFeatures: 5,
			queryVisible: true,
			infoFormat: 'application/vnd.ogc.gml'	
		}
		
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
		var fiPanel = [{
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
		this.hide();
	},

	handleGetFeatureInfo: function (evt) {
		//If the event was not triggered from this.olControl, do nothing
		if (evt.object !== this.olControl) {
			return;
		}
		// Don't show popup when no features found
		if (!evt.features || evt.features.length == 0) {
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
Ext.reg('hr_featureinfopopup', Heron.widgets.FeatureInfoPopup);
