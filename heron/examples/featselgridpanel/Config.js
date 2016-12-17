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


/** api: example[featselgridpanel]
 *  Grid with Feature Selection
 *  ---------------------------
 *  Grid panel with mutually selectable features on both map and in grid.
 */

Ext.namespace("Heron.examples");

/** Zoom into center Amersfoort. */
Heron.options.map.settings.zoom = 10;

Ext.onReady(function() {
	// create a panel and add the map panel and grid panel
	// inside it: fixed column layout
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
						header: "Number",
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
					zoomLevelPointSelect : 12,
					separateSelectionLayer: false
				}
			}
		]
	}).show();

	//
	// Alternatively: a more programmatic approah:
	// features can be read and passed in constructor of FeaturePanel and
	// then passed to the Window. The column layout is automatic (autoConfig: true).
	//

	function createFeaturePanelPopup(features) {
		// Create the FeaturePanel
		var featurePanel = new Heron.widgets.search.FeaturePanel({
			id: 'hr-featuregridpanel',
			title: __('Addresses'),
			features: features,
			header: false,
			autoConfig: true,
			hropts: {
				zoomOnRowDoubleClick : true,
				zoomOnFeatureSelect : true,
				zoomLevelPointSelect : 13,
				separateSelectionLayer: true
			}
		});

		new Ext.Window({
			title: __('Click Map or Grid to Select - Double Click to Zoom to feature'),
			layout: "fit",
			x: 280,
			y: 100,
			height: 400,
			width: 360,
			items: [featurePanel]
		}).show();

		// FeaturePanel (now) needs explicit loading when no "store" configured
		featurePanel.loadFeatures(features, features[0]['type']);
	}

	// HTTP endpoint: results are parsed as GeoJSON and formatted in JS object.
	var http = new OpenLayers.Protocol.HTTP({
		format: new OpenLayers.Format.GeoJSON()
	});

	// Async callback from Ajax XmlHttpRequest
	var httpCallback = function (resp) {
		if (resp.code == OpenLayers.Protocol.Response.SUCCESS) {
			// Get Feature arrays from parsed response
			var features = resp.features;

			// Create the FeaturePanel
			createFeaturePanelPopup(features);
		} else {
			alert('Error retrieving features');
		}
	};

	// Invoke HTTP GET to read features from server
	// Request is async: pass result to callback function
	http.read({
		url: 'data/addresses.json',
		callback: httpCallback
	});
});

