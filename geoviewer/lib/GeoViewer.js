/*
 * Copyright (C) 2010  Het Kadaster
 *
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

Ext.namespace("GeoViewer");

GeoViewer.main = function()
{
	var viewport;
	var totalPanel;
	var allPanels = [];
	var map;

	return {
		create : function() {
			// Map+Feature info panels in one
			Ext.QuickTips.init();

			// Create all panels
			this.createPanels();

			totalPanel = new Ext.Panel({
				region : "center",
				renderTo :"gv-mainpanel",
				layout : "border",
				forceLayout: true,
				items: allPanels
			});

			return totalPanel;
		},

		createPanels : function() {
			if (GeoViewer.layout.center) {
				allPanels.push(this.createPanel('center'));
			}

			if (GeoViewer.layout.north) {
				allPanels.push(this.createPanel('north'));
			}

			if (GeoViewer.layout.south) {
				allPanels.push(this.createPanel('south'));
			}

			if (GeoViewer.layout.east) {
				allPanels.push(this.createPanel('east'));
			}

			if (GeoViewer.layout.west) {
				allPanels.push(this.createPanel('west'));
			}
		},

		showFullScreen : function() {
			viewport = new Ext.Viewport({
				id	:"gv-viewport",
				layout: "fit",
				hideBorders: true,

				items: [totalPanel]
			});

			viewport.show();
		},

		createPanel : function(region) {
			var config = GeoViewer.layout[region];

			var panel = new GeoViewer.ContainerPanel({
				id		: 'gv-' + region + '-panel',
				config	: config,
				collapsible: config.collapsible
			});

			panel.region = region;

			return panel;
		},

		getMap : function() {
			return map;
		},

		setMap : function(aMap) {
			map = aMap;
		},

		/**
		 * Set Map context, a combination of center, zoom and visible layers.
		 * @param id - a context id defined in Geoviewer.context config
		 */
		setMapContext : function(id) {
			var contexts = GeoViewer.contexts;
			for (var i = 0; i < contexts.length; i++) {
				if (contexts[i].id == id) {
					map.setCenter(new OpenLayers.LonLat(contexts[i].x, contexts[i].y), contexts[i].zoom, false, true);

					if (contexts[i].layers) {
						var mapLayers = map.layers;
						var ctxLayers = contexts[i].layers;

						for (var n = 0; n < mapLayers.length; n++) {
							mapLayers[n].setVisibility(false);
							for (var m = 0; m < ctxLayers.length; m++) {
								if (mapLayers[n].name == ctxLayers[m]) {
									mapLayers[n].setVisibility(true);

									// TODO check if baselayer
									if (mapLayers[n].isBaseLayer) {
										map.setBaseLayer(mapLayers[n]);
									}
								}
							}
						}
					}
				}
			}
		},

		getTotalPanel : function() {
			return totalPanel;
		},

		doLayout : function() {
			if (viewport) {
				viewport.doLayout(true, false);
			}
		}
	};
}();

