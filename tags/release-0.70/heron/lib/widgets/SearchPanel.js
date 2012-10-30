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
 *  Note that the fields in the items must follow the convention outlined in
 *  `GeoExt.form.SearchAction <http://geoext.org/lib/GeoExt/widgets/form/SearchAction.html>`_.
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
 *						autoWildCardAttach : true,
 *						onSearchCompleteZoom : 11,
 *						layerOpts: [
 *							{ layerOn: 'lki_staatseigendommen', layerOpacity: 0.4 },
 *							{ layerOn: 'bag_adres_staat_g', layerOpacity: 1.0 }
 *						]
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

	/** api: config[autoWildCardAttach]
	 *  Should search strings always be pre/postpended with a wildcard '*' character.
	 *  default value is false.
	 */
	autoWildCardAttach : false,

	/** api: config[layerOpts]
	 *  Options for layer activation when search successful.
	 */
	layerOpts : undefined,

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
				self.search(self);
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
		searchPanel.features = null;
		searchPanel.get(searchPanel.id + 'progresslabel').setText(__('Searching...'));

	},

	/** api: config[onSearchComplete]
	 *  Function to call when search is complete.
	 *  Default is to show "Search completed" with feature count on progress label.
	 */
	onSearchComplete : function(searchPanel, action) {
		// Restore old values, e.g. after wildcarding
		searchPanel.form.items.each(function(item) {
			if (searchPanel.autoWildCardAttach && item.oldValue) {
				item.setValue(item.oldValue);
			}
		});

		var progressLabel = searchPanel.get(searchPanel.id + 'progresslabel');
		if (action && action.response && action.response.success()) {
			var features = searchPanel.features = action.response.features;
			progressLabel.setText(__('Search Completed: ') + (features ? features.length : 0) + ' ' + __('Feature(s)'));
			if (searchPanel.onSearchCompleteAction) {
				searchPanel.onSearchCompleteAction(searchPanel, features);

				// GvS optional activation of layers
				// layerOpts: [
				//	 { layerOn: 'lki_staatseigendommen', layerOpacity: 0.4 },
				//	 { layerOn: 'bag_adres_staat_g', layerOpacity: 1.0 }
				// ]
				// If specified make those layers visible with optional layer opacity
				var lropts = searchPanel.layerOpts;
				if (lropts) {
					var map = Heron.App.getMap();
					for (var l = 0; l < lropts.length; l++) {
						if (lropts[l]['layerOn']) {
							// Get all layers from the map with the specified name
							var mapLayers = map.getLayersByName(lropts[l]['layerOn']);
							for (var n = 0; n < mapLayers.length; n++) {

								// Make layer visible
                                if (mapLayers[n].isBaseLayer) {
                                  map.setBaseLayer(mapLayers[n]);
                                } else {
								  mapLayers[n].setVisibility(true);
                                }

								// And set optional opacity
								if (lropts[l]['layerOpacity']) {
									mapLayers[n].setOpacity(lropts[l]['layerOpacity']);
								}
							}
						}
					}
				}
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
			searchPanel.notifyParentOnSearchComplete(searchPanel, features);
			return;
		}

		// All other cases: zoom to the extent (bounding box) of the features found. See issue 69.
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

		if (bbox) {
			Heron.App.getMap().zoomToExtent(bbox);
		}
		searchPanel.notifyParentOnSearchComplete(searchPanel, features);
	},

	/**
	 * private: method[notifyParentOnSearchComplete]
	 * Call to optionally notify parent component when search is complete.
	 */
	notifyParentOnSearchComplete: function(searchPanel, features) {
		if (searchPanel.parentId) {
			var parent = Ext.getCmp(searchPanel.parentId);
			if (parent.onSearchSuccess) {
				parent.onSearchSuccess(searchPanel, features);
			}
		}
	},

	/** api: method[search]
	 *  :param options: ``Object`` The options passed to the
	 *	  :class:`GeoExt.form.SearchAction` constructor.
	 *
	 *  Shortcut to the internal form's search method.
	 */
	search: function(searchPanel) {
		this.form.items.each(function(item) {
			var name = item.getName();
			if (searchPanel.autoWildCardAttach && name.indexOf('__like' || name.indexOf('__ilike'))) {
				item.oldValue = item.getValue();
				item.setValue('*' + item.getValue() + '*');
			}
		});

		Heron.widgets.SearchPanel.superclass.search.call(this, searchPanel);
	}
});

/** api: xtype = hr_searchpanel */
Ext.reg('hr_searchpanel', Heron.widgets.SearchPanel);

