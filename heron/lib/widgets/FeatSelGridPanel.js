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

/** api: (define)
 *  module = Heron.widgets
 *  class = FeatSelGridPanel
 *  base_link = `GeoExt.form.FormPanel <http://www.geoext.org/lib/GeoExt/widgets/form/FormPanel.html>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron FeatSelGridPanel.
 *  This example uses the internal default progress messages and action (zoom).
 *
 *  .. code-block:: javascript
 *
 {
 xtype: 'hr_featselgridpanel',
 id: 'hr-featselgridpanel',
 title: __('Search'),
 header: false,
 columns: [
 {
 header: "Name",
 width: 100,
 dataIndex: "name",
 type: 'string'
 },
 {
 header: "Desc",
 width: 200,
 dataIndex: "cmt",
 type: 'string'
 }
 ]
 }
 */

/** api: constructor
 *  .. class:: FeatSelGridPanel(config)
 *
 *  A panel designed to hold features in both grid and on map.
 */
Heron.widgets.FeatSelGridPanel = Ext.extend(Ext.grid.GridPanel, {
	/** Zoom to feature (extent) when selected ? */
	zoomOnFeatureSelect : false,

	/** Zoom  level for point features when selected*/
	zoomLevelPointSelect : 10,

	initComponent: function() {
		// Define OL Vector Layer to display search result features
		var layer = this.layer = new OpenLayers.Layer.Vector(this.title);

		var map = Heron.App.getMap();

		// Heron-specific config (besides GridPanel config)
		Ext.apply(this, this.hropts);

		if (this.zoomOnFeatureSelect) {
			var zoomLevelPointSelect = this.zoomLevelPointSelect;

			// See http://www.geoext.org/pipermail/users/2011-March/002052.html
			layer.events.on({
				"featureselected": function(e) {
					var geometry = e.feature.geometry;
					if (!geometry) {
						return;
					}

					// For point features center map otherwise zoom to geom bounds
					if (geometry.getVertices().length == 1) {
						var point = geometry.getCentroid();
						map.setCenter(new OpenLayers.LonLat(point.x, point.y), zoomLevelPointSelect);
					} else {
						map.zoomToExtent(geometry.getBounds());
					}
				},
				"scope": layer
			});
		}

		map.addLayer(layer);

		// Prepare fields array for store from columns in Grid config.
		var storeFields = [];
		Ext.each(this.columns, function(column) {
			storeFields.push({name: column.dataIndex, type: column.type});
		});

		// Define the Store
		this.store = new GeoExt.data.FeatureStore({
			layer: layer,
			fields: storeFields
		});

		// Enables the interaction between fatures on the Map and Grid
		if (!this.sm) {
			this.sm = new GeoExt.grid.FeatureSelectionModel();
		}

		Heron.widgets.FeatSelGridPanel.superclass.initComponent.call(this);
	},

	/***
	 * Loads array of feature objects in store and shows them on grid and map.
	 */
	loadFeatures : function(features) {
		this.store.loadData(features);
	}
});

/** api: xtype = hr_featselgridpanel */
Ext.reg('hr_featselgridpanel', Heron.widgets.FeatSelGridPanel);

