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

/** api: (define)
 *  module = Heron.widgets.search
 *  class = CoordSearchPanel
 *  base_link = `Ext.form.FormPanel <http://docs.sencha.com/ext-js/3-4/#!/api/Ext.form.FormPanel>`_
 */


/** api: example
 *  Sample code showing how to use the CoordSearchPanel.
 *
 *  .. code-block:: javascript
 *
 *      var panel = new Heron.widgets.search.CoordSearchPanel({
 *              onSearchCompleteZoom: 11,
 *              fieldLabelX: __('lon),
 *              fieldLabelY: __('lat'),
 *              baseCls: 'x-form-back',
 *              bodyStyle: 'padding:10px 10px',
 *              labelAlign: 'top',
 *              onSearchCompleteZoom: 10,
 *              iconWidth: 32,
 *              iconHeight: 32,
 *              localIconFile: 'bluepin.png'
 *          }
 *      });
 */

/** api: constructor
 *  .. class:: CoordSearchPanel(config)
 *
 *      A specific ``Ext.form.FormPanel`` whose internal form is a
 *      ``Ext.form.BasicForm``.
 *      Use this form to do pan and zoom to a point in the map.
 *      The coordinates are typed in by the user.
 */
Heron.widgets.search.CoordSearchPanel = Ext.extend(Ext.form.FormPanel, {

	/** api: config[title]
	 *  title of the panel
     *  default value is 'Go to coordinates'.
	 */
	title: __('Go to coordinates'),

    /** api: config[titleDescription]
     *  description line under the title line
     *  default value is "null".
     */
	titleDescription: null,

	/** api: config[titleDescriptionStyle]
	 *  title description style (e.g. 'font-size: 11px;') or null
     *  default value is "null".	 
	 */
	titleDescriptionStyle: null,

	/** api: config[fieldLabelX]
	 *  label for X-coordinate, default is "X", may use e.g. "lon".
     *  default value is 'X'.
	 */
	fieldLabelX: __('X'),

	/** api: config[fieldLabelY]
	 *  label for Y-coordinate, default is "Y", may use e.g. "lat".
     *  default value is 'Y'.
	 */
	fieldLabelY: __('Y'),

	/** api: config[fieldEmptyTextX]
	 *  field empty text for the X-input field or null
     *  default value is 'Enter X-coordinate...'.
	 */
	fieldEmptyTextX: __('Enter X-coordinate...'), 

	/** api: config[fieldEmptyTextY]
	 *  field empty text for the X-input field or null
     *  default value is 'Enter Y-coordinate...'.
	 */
	fieldEmptyTextY: __('Enter Y-coordinate...'), 

	/** api: config[fieldWidth]
	 *  field width for the X-/Y-input fields
     *  default value is '100%'.
	 */
	fieldWidth: '100%',

	/** api: config[fieldLabelWidth]
	 *  field label width for the X-/Y-input fields
     *  default value is '100%'.
	 */
	fieldLabelWidth: '100%',

	/** api: config[fieldStyle]
	 *  field style (e.g. 'font-size: 11px;') or null
     *  default value is "null".	 
	 */
	fieldStyle: null,

	/** api: config[fieldLabelStyle]
	 *  field label style (e.g. 'font-size: 11px;') or null
     *  default value is "null".	 
	 */
	fieldLabelStyle: null, 

	/** api: config[bodyBaseCls]
	 *  body base cls
     *  default value is 'x-panel'.
	 */
	// bodyBaseCls: 'x-plain',
	bodyBaseCls: 'x-panel',

	/** api: config[bodyStyle]
	 *  body style of form
     *  default value is 'padding:5px'.
	 */
	bodyStyle: 'padding:5px',

	/** api: config[fieldMinX]
	 *  min X value for input area check or null
	 *  for the area check all 4 check fields must be declared
     *  default value is "null".	 
	 */
	fieldMinX: null,

	/** api: config[fieldMinY]
	 *  min Y value for input area check or null
	 *  for the area check all 4 check fields must be declared
     *  default value is "null".	 
	 */
	fieldMinY: null,

	/** api: config[fieldMaxX]
	 *  max X value for input area check or null
	 *  for the area check all 4 check fields must be declared
     *  default value is "null".	 
	 */
	fieldMaxX: null,

	/** api: config[fieldMaxY]
	 *  max Y value for input area check or null
	 *  for the area check all 4 check fields must be declared
     *  default value is "null".	 
	 */
	fieldMaxY: null,

	/** api: config[onSearchCompleteZoom]
	 *  zoomlevel when moving to point.
     *  default value is 10.
	 */
	onSearchCompleteZoom: 10,

	/** api: config[iconWidth]
	 *  icon width when providing own icon, default 32.
     *  default value is 32.
	 */
	iconWidth: 32,

	/** api: config[iconHeight]
	 *  icon height when providing own icon, default 32.
     *  default value is 32.
	 */
	iconHeight: 32,

	/** api: config[localIconFile]
	 *  name of local heron map pin icon to use.
     *  default value is 'redpin.png'.
	 */
	localIconFile: 'redpin.png',

	/** api: config[iconUrl]
	 *  full URL or path for custom icon to use.
     *  default value is null.
	 */
	iconUrl: null,

	/** api: config[projection]
	 *  custom projection (EPSG string) to enter coordinates if different from Map projection.
     *  default value is null.
	 */
	projection: null,

	/** api: config[layerName]
	 *  layer name of the location marker.
	 */
	layerName: __('Location'),

	initComponent:function () {

		var self = this;
	
		this.tLabel = new Ext.form.Label({
								html: this.titleDescription,
								style: this.titleDescriptionStyle
							});
							
		this.xField = new Ext.form.NumberField({
								fieldLabel: this.fieldLabelX,
								emptyText: this.fieldEmptyTextX, 
								width: this.fieldWidth,
								style: this.fieldStyle,
								labelStyle: this.fieldLabelStyle,
								enableKeyEvents: true,
									listeners: {
										keyup: function (numberfield, ev) {
											this.onNumberKeyUp(numberfield, ev);
										},
									scope: this
									}
							});
		this.yField = new Ext.form.NumberField({
								fieldLabel: this.fieldLabelY,
								emptyText: this.fieldEmptyTextY, 
								width: this.fieldWidth,
								style: this.fieldStyle,
								labelStyle: this.fieldLabelStyle,
								enableKeyEvents: true,
									listeners: {
										keyup: function (numberfield, ev) {
											this.onNumberKeyUp(numberfield, ev);
										},
									scope: this
									}
							});

		this.gButton = new Ext.Button({
								text: __('Go!'),
								align: 'right',
								tooltip: __('Pan and zoom to location'),
								minWidth: 75,
								disabled: true,
								handler: function () {
									self.panAndZoom(self);
								}
							});

		this.items = [
			{
				layout: 'form',
				autoHeight: true,
				border: false,
				labelWidth: this.fieldLabelWidth,
				baseCls: this.bodyBaseCls,
				buttonAlign: 'left',
				items: [self.tLabel,
						self.xField, 
						self.yField, 
						self.gButton
				]
			}
		];

		this.keys = [
			{ key: [Ext.EventObject.ENTER],
				handler: function () {
					if (!self.gButton.disabled) {
						self.panAndZoom(self);
					}
				}
			}
		];

		if (!this.iconURL) {
			this.iconUrl = Heron.Utils.getImageLocation(this.localIconFile);
		}

		// Custom projection e.g. EPSG:4326 for e.g. Google/OSM projection
		// Need to include proj4js in that case !
		if (this.projection) {
			this.olProjection = new OpenLayers.Projection(this.projection);
		}
		Heron.widgets.search.CoordSearchPanel.superclass.initComponent.call(this);

	},

	onNumberKeyUp: function (numberfield, ev) {
		var valueX = parseFloat(this.xField.getValue());
		var valueY = parseFloat(this.yField.getValue());
		// check value input
		if (valueX && valueY) {
			if (this.fieldMinX && this.fieldMinY && this.fieldMaxX && this.fieldMaxY) {
				// check input aerea
				if (((valueX >= parseFloat(this.fieldMinX)) && (valueX <= parseFloat(this.fieldMaxX))) &&
				    ((valueY >= parseFloat(this.fieldMinY)) && (valueY <= parseFloat(this.fieldMaxY)))) {
					this.gButton.enable();
				} else {
					this.gButton.disable();
				}
			} else {
				this.gButton.enable();
			}
		}
		else {
			this.gButton.disable();
		}
	},

	panAndZoom:function (self) {

		var map = Heron.App.getMap();

		// search marker layer by name
		var MarkerLayer = map.getLayersByName(this.layerName);

		// if marker layer found, remove existing marker
		if (MarkerLayer[0]) {
			MarkerLayer[0].clearMarkers();
		}

		var x = self.xField.getValue();
		var y = self.yField.getValue();
		var zoom = self.onSearchCompleteZoom;
		var position = new OpenLayers.LonLat(x, y);

		if (this.olProjection) {
			// Reproject (if required)
			position.transform(
					this.olProjection,
					map.getProjectionObject()
			);
		}

		map.setCenter(position, zoom);

		// if marker layer not found, create
		if (!MarkerLayer[0]) {
			this.layer = new OpenLayers.Layer.Markers(this.layerName);
			map.addLayer(this.layer);
			var size = new OpenLayers.Size(this.iconWidth, this.iconHeight);
			var offset = new OpenLayers.Pixel(-(size.w / 2), -size.h);
			this.icon = new OpenLayers.Icon(this.iconUrl, size, offset);
			MarkerLayer = map.getLayersByName(this.layerName);
		}
		
		// create marker and set in marker layer
		var marker = new OpenLayers.Marker(position, this.icon);
		MarkerLayer[0].addMarker(marker);
		MarkerLayer[0].setVisibility(true);
		
	}
});

/** api: xtype = gx_formpanel */
Ext.reg("hr_coordsearchpanel", Heron.widgets.search.CoordSearchPanel);


