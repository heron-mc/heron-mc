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
 *  class = CoordSearchPanel
 *  base_link = `Ext.form.FormPanel <http://docs.sencha.com/ext-js/3-4/#!/api/Ext.form.FormPanel>`_
 */

Ext.namespace("Heron.widgets");

/** api: example
 *  Sample code showing how to use the CoordSearchPanel.
 *
 *  .. code-block:: javascript
 *
 *	  var panel = new Heron.widgets.CoordSearchPanel({
 *			  onSearchCompleteZoom: 11,
 *			  fieldLabelX: __('lon),
 *			  fieldLabelY: __('lat'),
 *			  onSearchCompleteZoom: 10,
 *			  iconWidth: 32,
 *			  iconHeight: 32,
 *			  localIconFile: 'bluepin.png'
 *		  }
 *	  });
 */

/** api: constructor
 *  .. class:: CoordSearchPanel(config)
 *
 *	  A specific ``Ext.form.FormPanel`` whose internal form is a
 *	  ``Ext.form.BasicForm``.
 *	  Use this form to do pan and zoom to a point in the map.
 *	  The coordinates are typed in by the user.
 */
Heron.widgets.CoordSearchPanel = Ext.extend(Ext.form.FormPanel, {
	title: __('Go to coordinates'),
	layout: 'form',
	bodyStyle: 'padding:5px',

	/** api: config[fieldLabelX]
	 *  label for X-coordinate, default is "X", may use e.g. "lon".
	 */
	fieldLabelX: __('X'),

	/** api: config[fieldLabelY]
	 *  label for Y-coordinate, default is "Y", may use e.g. "lat".
	 */
	fieldLabelY: __('Y'),

	/** api: config[onSearchCompleteZoom]
	 *  zoomlevel when moving to point, default 10.
	 */
	onSearchCompleteZoom: 10,

	/** api: config[iconWidth]
	 *  icon width when providing own icon, default 32.
	 */
	iconWidth: 32,

	/** api: config[iconHeight]
	 *  icon height when providing own icon, default 32.
	 */
	iconHeight: 32,

	/** api: config[localIconFile]
	 *  name of local heron map pin icon to use, default 'redpin.png'.
	 */
	localIconFile: 'redpin.png',

	/** api: config[iconUrl]
	 *  full URL or path for custom icon to use, default Null.
	 */
	iconUrl: null,

	initComponent: function() {
		var self = this;
		this.xLabel = new Ext.form.TextField({fieldLabel: this.fieldLabelX});
		this.yLabel = new Ext.form.TextField({fieldLabel: this.fieldLabelY});
		this.items = [
			{
				layout: 'form',
				colspan: 2,
				border: false,
				items: [self.xLabel]
			},
			{
				layout: 'form',
				colspan: 2,
				border: false,
				items: [self.yLabel]
			},
			{
				layout: 'column',
				border: false,
				items: [
					new Ext.Button({
						text: __('Go!'),
						align: 'right',
						tooltip: __('Pan and zoom to location'),
						handler: function () {
							self.panAndZoom(self);
						}
					})
				]
			}
		];

		this.keys = [
			{ key: [Ext.EventObject.ENTER],
				handler: function() {
					self.panAndZoom(self);
				}
			}
		];

		if (!this.iconURL) {
			this.iconUrl = Heron.Utils.getImageLocation(this.localIconFile);
		}
		Heron.widgets.CoordSearchPanel.superclass.initComponent.call(this);

	},

	panAndZoom: function(self) {
		if (this.layer) {
			this.layer.clearMarkers();
		}

		var x = self.xLabel.getValue();
		var y = self.yLabel.getValue();
		var zoom = self.onSearchCompleteZoom;
		var map = Heron.App.getMap();
		map.setCenter(new OpenLayers.LonLat(x, y), zoom);

		if (!this.layer) {
			this.layer = new OpenLayers.Layer.Markers(__('Locations'));
            map.addLayer(this.layer );
			var size = new OpenLayers.Size(this.iconWidth, this.iconHeight);
			var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
			this.icon = new OpenLayers.Icon(this.iconUrl, size, offset);
		}
		var marker = new OpenLayers.Marker(new OpenLayers.LonLat(x, y), this.icon);
		this.layer.addMarker(marker);
	}
});

/** api: xtype = gx_formpanel */
Ext.reg("hr_coordsearchpanel", Heron.widgets.CoordSearchPanel);


