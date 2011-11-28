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
 *				 {
 *					xtype: 'hr_featselgridpanel',
 *					id: 'hr-featselgridpanel',
 *					title: __('Search'),
 *					bodyStyle: 'padding: 6px',
 *					style: {
 *						fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
 *						fontSize: '12px'
 *					},
 *					protocol: new OpenLayers.Protocol.WFS({
 *								version: "1.1.0",
 *								url: "http://gis.kademo.nl/gs2/wfs?",
 *								srsName: "EPSG:28992",
 *								featureType: "hockeyclubs",
 *								featureNS: "http://innovatie.kadaster.nl"
 *							}),
 *					items: [
 *						{
 *							xtype: "textfield",
 *							name: "name__like",
 *							value: 'Hu*',
 *							fieldLabel: "  name"
 *						},
 *						{
 *							xtype: "label",
 *							id: "helplabel",
 *							html: 'Type name of an NL hockeyclub, use * as wildcard<br/>',
 *							style: {
 *								fontSize: '10px',
 *								color: '#CCCCCC'
 *							}
 *						}
 *					],
 *					hropts: {
 *						onSearchCompleteZoom : 11
 *					}
 *				}
 */

/** api: constructor
 *  .. class:: FeatSelGridPanel(config)
 *
 *  A panel designed to hold features in both grid and on map.
 */
Heron.widgets.FeatSelGridPanel = Ext.extend(Ext.grid.GridPanel, {

	initComponent: function() {
		// Define OL layer to display search result features
		this.layer = new OpenLayers.Layer.Vector(this.title);
		Heron.App.getMap().addLayer(this.layer);

		// Determine fields from columms in grid config
		var storeFields = [];
		// Check is progress label is supplied in config
		Ext.each(this.columns, function(column, index) {
			storeFields.push({name: column.dataIndex, type: column.type});
		});

		// Define the Store
		this.store = new GeoExt.data.FeatureStore({
			layer: this.layer,
			fields: storeFields
			});

		// Defines the interaction between Map and Grid
		this.sm = new GeoExt.grid.FeatureSelectionModel();

		Heron.widgets.FeatSelGridPanel.superclass.initComponent.call(this);
	},

	/***
	 * Display result grid.
	 */
	loadFeatures : function(features) {
		this.store.loadData(features);
	}

});

/** api: xtype = hr_featselgridpanel */
Ext.reg('hr_featselgridpanel', Heron.widgets.FeatSelGridPanel);

