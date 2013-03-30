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
 *  class = FeaturePanel
 *  base_link = `Ext.Panel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.Panel>`_
 */

/** api: constructor
 *  .. class:: FeaturePanel(config)
 *
 *  A tabbed panel designed to hold Features for multiple layers. Don't use! Was used for TESTING.
 */
Heron.widgets.FeaturePanel = Ext.extend(Ext.Panel, {
			maxFeatures	: 5,
			tabs		: null,
			map		: null,

			initComponent : function() {
				Ext.apply(this, {
							layout		: "fit",
							title		: __('Feature Info')
						});

				Heron.widgets.FeaturePanel.superclass.initComponent.call(this);
				this.addListener("afterrender", this.setupGrid);
			},

			/***
			 * Callback function for handling the result of an OpenLayers GetFeatureInfo request
			 */
			setupGrid : function(evt) {
				this.add(this.getGrid());
			},
			getGrid : function() {
				// create map instance
				var map = Heron.App.getMap();

				// create vector layer
				var vecLayer = new OpenLayers.Layer.Vector("vector");
				map.addLayers([vecLayer]);


				// create feature store, binding it to the vector layer
				var store = new GeoExt.data.FeatureStore({
							layer: vecLayer,
							fields: [
								{name: 'objectnumm', type: 'string'}
							],
							proxy: new GeoExt.data.ProtocolProxy({
										protocol: new OpenLayers.Protocol.HTTP({
													url: 'http://local.kademo.nl/gs2/wfs?request=GetFeature&typeName=kad:lki_vlakken&maxFeatures=10&version=1.0.0',
													format: new OpenLayers.Format.WFS({}, vecLayer)
												})
									}),
							autoLoad: true
						});

				// create grid panel configured with feature store
				var gridPanel = new Ext.grid.GridPanel({
							title: "Feature Grid",
							store: store,
							columns: [
								{
									header: "Object",
									width: 200,
									dataIndex: "objectnumm"
								}
							],
							sm: new GeoExt.grid.FeatureSelectionModel()
						});

				return gridPanel;
			}
		});

/** api: xtype = hr_featurepanel */
Ext.reg('hr_featurepanel', Heron.widgets.FeaturePanel);

