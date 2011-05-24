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
Ext.namespace("Heron");

/**
 * Global MenuHandler object, defined as Singleton.
 *
 * See http://my.opera.com/Aux/blog/2010/07/22/proper-singleton-in-javascript
 **/
Heron.ContextBrowser =

		(function() { // Creates and runs anonymous function, its result is assigned to Singleton

			// Any variable inside function becomes "private"

			/** Holds map contexts array. */
			var contexts = undefined;
			var map = undefined;

			/** Private functions. */


			/** This is a definition of our Singleton, it is also private, but we will share it below */
			var instance = {
				init : function(hroptions) {
					// Set the default content to show. Do this once only.
					if (hroptions && !contexts) {
						contexts = hroptions;
					}
				},

				/**
				 * Set Map context, a combination of center, zoom and visible layers.
				 * @param id - a context id defined in Geoviewer.context config
				 */
				setMapContext : function(id) {
					var map = Heron.App.getMap();
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
				}
			};

			// Simple magic - global variable Singleton transforms into our singleton!
			return(instance);

		})();


/** api: constructor
 *  .. class:: ContextBrowserPanel(config)
 *
 *  A panel designed to hold link shortcuts to map contexts (layers/zoom/center).
 */
Heron.ContextBrowserPanel = Ext.extend(Heron.HTMLPanel, {

	initComponent : function() {
		Heron.ContextBrowserPanel.superclass.initComponent.call(this);
		this.id = 'hr-context-browser';
		this.title = __('Shortcuts');

		this.html = '<div class="hr-html-panel-body">';

		var contexts = this.hropts;
		if (typeof(contexts) !== "undefined") {
			for (var i = 0; i < contexts.length; i++) {
				this.html += '<a href="#" title="' + contexts[i].desc + '" onclick="Heron.ContextBrowser.setMapContext(\'' + contexts[i].id + '\'); return false;">' + contexts[i].name + '</a><br/>';
			}
		}
		this.html += '</div>';

		Heron.ContextBrowser.init(contexts);
	}
});

/** api: xtype = hr_contextbrowserpanel */
Ext.reg('hr_contextbrowserpanel', Heron.ContextBrowserPanel);

