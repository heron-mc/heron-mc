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
 *			  onSearchCompleteZoom: 11
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
	id: 'hr-coordsearchpanel',
	layout: 'form',
	bodyStyle: 'padding:5px',
	fieldLabelX: __('X'),
	fieldLabelY: __('Y'),
	onSearchCompleteZoom: 10,

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

		Heron.widgets.CoordSearchPanel.superclass.initComponent.call(this);

	},

	panAndZoom: function(self) {
		if (this.layer) {
			this.layer.removeAllFeatures();
			this.layer.refresh();
		}

		var x = self.xLabel.getValue();
		var y = self.yLabel.getValue();
		var zoom = self.onSearchCompleteZoom;
		var map = Heron.App.getMap();
		map.setCenter(new OpenLayers.LonLat(x, y), zoom);

		if (!this.layer) {
			this.layer = new OpenLayers.Layer.Vector(__('Locations'), {
				style: OpenLayers.Feature.Vector.style["default"]
			});
			map.addLayer(this.layer);
		}

		var point = new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Point(x, y));

		this.layer.addFeatures([point]);

	}
});

/** api: xtype = gx_formpanel */
Ext.reg("hr_coordsearchpanel", Heron.widgets.CoordSearchPanel);


