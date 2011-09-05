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
 *  class = SearchPanel
 *  base_link = `GeoExt.form.FormPanel <http://www.geoext.org/lib/GeoExt/widgets/form/FormPanel.html>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron SearchPanel.
 *  This example uses the internal default progress messages and action (zoom).
 *
 *  .. code-block:: javascript
 *
 *				 {
 *					xtype: 'hr_searchpanel',
 *					id: 'hr-searchpanel',
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
 *  .. class:: SearchPanel(config)
 *
 *  A panel designed to hold a (geo-)search form.
 */
Heron.widgets.SearchPanel = Ext.extend(GeoExt.form.FormPanel, {

	/** api: config[onSearchCompleteZoom]
	 *  Zoomlevel to zoom into when feature(s) found and panned to feature.
	 *  default value is 11.
	 */
	onSearchCompleteZoom : 11,

	/** private: property[defaultProgressLabel]
	 *  Label item config when none supplied in items within hropts.
	 */
	defaultProgressLabel: {
		xtype: "label",
		id: "progresslabel",
		style: {
			marginLeft: '6px',
			fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
			color: '#0000C0',
			fontSize: '12px'
		}
	},

	getProgressLabelId: function() {
		return this.id + "progresslabel";
	},

	getProgressLabel: function() {
		this.get(this.getProgressLabelId());
	},

// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
	initComponent: function() {
		var foundLabel = false;

		var hropts = this.hropts;

		// Check is progress label is supplied in config
		Ext.each(this.items, function(item, index) {
			if (item.id && item.id == 'progresslabel') {
				item.id = this.getProgressLabelId(this);
				foundLabel = true;
			}
		});

		if (!foundLabel) {
			// Not supplied: use our default progress label
			this.defaultProgressLabel.id = this.getProgressLabelId();
			this.items.push(this.defaultProgressLabel);
		}

		/*				Ext.apply(this, {
		 layout		: "fit",
		 tbar: [
		 {
		 text: 'Search',
		 toggleGroup: "searchGroup",
		 enableToggle: true,
		 pressed: true,
		 handler: function(t) {
		 self.display = self.displayGrid;
		 self.handleGetFeatureInfo();
		 }
		 },
		 {
		 text: 'Result',
		 toggleGroup: "searchGroup",
		 enableToggle: true,
		 pressed: false,
		 handler: function(t) {
		 self.display = self.displayTree;
		 self.handleGetFeatureInfo();
		 }
		 }
		 ]
		 });    */
		Ext.apply(this, hropts);
		Ext.apply(this.initialConfig, hropts);

		var self = this;

		this.listeners = {
			actioncomplete: function(form, action) {
				// this listener triggers when the search request
				// is complete, the OpenLayers.Protocol.Response
				// resulting from the request is available
				// in "action.response"
				self.action = action;

				if (self.onSearchComplete) {
					self.onSearchComplete(self, action);
				}
			}
		};

		Heron.widgets.SearchPanel.superclass.initComponent.call(this);

		this.addButton({
			text: __('Search'),
			handler: function() {
				self.action = null;
				self.search();
				if (self.onSearchInProgress) {
					self.onSearchInProgress(self);
				}
			},
			scope: self
		});
	},

	/** api: config[onSearchInProgress]
	 *  Function to call when search is starting.
	 *  Default is to show "Searching..." on progress label.
	 */
	onSearchInProgress : function(searchPanel) {
		searchPanel.get(searchPanel.id + 'progresslabel').setText(__('Searching...'));
	},

	/** api: config[onSearchComplete]
	 *  Function to call when search is complete.
	 *  Default is to show "Search completed" with feature count on progress label.
	 */
	onSearchComplete : function(searchPanel, action) {
		var progressLabel = searchPanel.get(searchPanel.id + 'progresslabel');
		if (action && action.response && action.response.success()) {
			var features = action.response.features;
			progressLabel.setText(__('Search Completed: ') + (features ? features.length : 0) + ' ' + __('Feature(s)'));
			if (searchPanel.onSearchCompleteAction) {
				searchPanel.onSearchCompleteAction(searchPanel, features);
			}
		} else {
			progressLabel.setText(__('Search Failed'));
		}
	}
	,

	/** api: config[onSearchCompleteAction]
	 *  Function to call to perform action when search is complete.
	 *  Either zoom to single Point feature or zoom to extent (bbox) of multiple features
	 */
	onSearchCompleteAction: function(searchPanel, features) {
		// Case: one Point feature found and onSearchCompleteZoom defined: zoom to Point
		if (features.length == 1 && features[0].geometry && features[0].geometry.getVertices().length == 1 && searchPanel.onSearchCompleteZoom) {
			var point = features[0].geometry.getCentroid();
			Heron.App.getMap().setCenter(new OpenLayers.LonLat(point.x, point.y), searchPanel.onSearchCompleteZoom);
			return;
		}

		// All other cases: zoom to the extent (bounding box) of the features found
		var bbox;
		for (var i = 0; i < features.length; ++i) {
			if (features[i] && features[i].geometry) {
				if (!bbox) {
					bbox = features[i].geometry.getBounds();
				} else {
					bbox.extend(features[i].geometry.getBounds());
				}
			}
		}

		Heron.App.getMap().zoomToExtent(bbox);
	}
});

/** api: xtype = hr_searchpanel */
Ext.reg('hr_searchpanel', Heron.widgets.SearchPanel);

