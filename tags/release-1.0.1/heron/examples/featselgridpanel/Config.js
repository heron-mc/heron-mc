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
/** This config assumes the DefaultOptionsNL.js to be included first!! */


/** api: example[featuregridpanel]
 *  Grid with Feature Selection
 *  ---------------------------
 *  Grid panel with mutually selectable features on both map and in grid.
 */

Ext.namespace("Heron.examples");

/** Zoom into center Amersfoort. */
Heron.options.map.settings.zoom = 10;

Ext.onReady(function() {
	// create a panel and add the map panel and grid panel
	// inside it
	new Ext.Window({
		title: __('Click Map or Grid to Select - Double Click to Zoom to feature'),
		layout: "fit",
		x: 50,
		y: 100,
		height: 400,
		width: 280,
		items: [
			{
				xtype: 'hr_featuregridpanel',
				id: 'hr-featuregridpanel',
				title: __('Parcels'),
				header: false,
				columns: [
					{
						header: "Fid",
						width: 60,
						dataIndex: "id",
						xtype: 'numbercolumn',
                        format: '0'
					},
					{
						header: "ObjectNum",
						width: 180,
						dataIndex: "objectnumm"
					}
				],
				hropts: {
					storeOpts:  {
						proxy: new GeoExt.data.ProtocolProxy({
							protocol: new OpenLayers.Protocol.HTTP({
								url: 'data/parcels.json',
								format: new OpenLayers.Format.GeoJSON()
							})
						}),
						autoLoad: true
					},
					zoomOnRowDoubleClick : true,
					zoomOnFeatureSelect : false,
					zoomLevelPointSelect : 8,
					separateSelectionLayer: false
				}
			}
		]
	}).show();
});

