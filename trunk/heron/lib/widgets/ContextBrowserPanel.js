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

/**
 * Global ContextBrowser object, defined as Singleton.
 *
 * See http://my.opera.com/Aux/blog/2010/07/22/proper-singleton-in-javascript
 **/
Heron.widgets.ContextBrowser =

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
					// if (hroptions && !contexts) {
					// 	contexts = hroptions;
					// }
				},

				/**
				 * Set Map context, a combination of center, zoom and visible layers.
				 * @param id - a context id defined in Geoviewer.context config
				 */
				setMapContext : function(contextid, id) {

					// get element id
					var elmm = Ext.getCmp(contextid);
					contexts = elmm.hropts;

					if (contexts) {

						var map = Heron.App.getMap();
						for (var i = 0; i < contexts.length; i++) {
							if (contexts[i].id == id) {

								// if x, y and zoom - then jump to the new position and zoom
								if (contexts[i].x && contexts[i].y && contexts[i].zoom) {
									map.setCenter(new OpenLayers.LonLat(contexts[i].x, contexts[i].y), contexts[i].zoom, false, true);
								}
								// if x, y - then get zoom and jump to the new position
								else if (contexts[i].x && contexts[i].y && ! contexts[i].zoom ) {
									map.setCenter(new OpenLayers.LonLat(contexts[i].x, contexts[i].y), map.getZoom(), false, true);
								}
								// if zoom - then get position and zoom
								else if (! (contexts[i].x && contexts[i].y) && contexts[i].zoom ) {
									map.setCenter(new OpenLayers.LonLat(map.center.lon, map.center.lat), contexts[i].zoom, false, true);
								}

								if (contexts[i].layers) {

									var mapLayers = map.layers;
									var ctxLayers = contexts[i].layers;
									var ctxName   = contexts[i].name;

									// If the layer array is not empty => change to a new layer view
									// or
									// If the layer array is empty and the name is not emty => delete all overlays
									// else
									// do nothing => empty line
									if ((ctxLayers.length) || (! ctxLayers.length && ctxName.length)) {

										// Check if layers only should be added
										if (! contexts[i].addLayers) {
											// Make all layers invisible (without baselayers)
											for (var n = 0; n < mapLayers.length; n++) {
												if (mapLayers[n].getVisibility()) {

													// Only invisible if not a baselayer
													if (! mapLayers[n].isBaseLayer) {
														mapLayers[n].setVisibility(false);
													}

												}
											}
										}

										// Make only the layers in the context visible
										for (var m = 0; m < ctxLayers.length; m++) {
											// TODO make lookup more efficient
											for (n = 0; n < mapLayers.length; n++) {
												if (mapLayers[n].name == ctxLayers[m]) {

													// Set new baselayer if it is a baselayer
													if (mapLayers[n].isBaseLayer) {
														map.setBaseLayer(mapLayers[n]);
													}
													mapLayers[n].setVisibility(true);

												}
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


/** api: (define)
 *  module = Heron.widgets
 *  class = ContextBrowserPanel
 *  base_link = `Heron.widgets.HTMLPanel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.tree.TreePanel>`_
 */

/** api: constructor
 *  .. class:: ContextBrowserPanel(config)
 *
 *  A panel designed to hold link shortcuts to map contexts (layers/zoom/center).
 *  A map context is a set of layers to be activated, a zoomlevel to be zoomed into plus
 *  the point (x,y) where the map should be centered.
 *
 *  .. code-block:: javascript
 *
        {
                xtype: 'hr_contextbrowserpanel',
                id: 'hr-contextbrowser',
                // The contexts to create shortcuts for in the context browser.
                hropts: [
							{
								id: 'shortcut_XXX',
								name: 'Change layers - jump - zoom',
								desc: 'Shortcut XXX - change + jump + zoom',
								addLayers: false,
								layers: ['XXX_baselayer','XXX_overlay1','XXX_overlay2']
								, x: 3796558,	y: 5830315
								, zoom: 16
							},
							{
								id: 'shortcut_XXX add',
								name: 'Add layers - jump - zoom',
								desc: 'Shortcut XXX - add + jump + zoom',
								addLayers: true,
								layers: ['XXX_overlay1','XXX_overlay2']
								, x: 3796558,	y: 5830315
								, zoom: 16
							},
							{
								id: 'shortcut_XXX_delete',
								name: 'Delete all overlays',
								desc: '',
								layers: []
							},
							{
								id: 'shortcut_empty_1',
								name: '',
								desc: '',
								layers: []
							},
							{
								id: 'shortcut_change_jump',
								name: 'Change layers - jump',
								desc: 'Shortcut XXX - change + jump',
								layers: ['XXX_baselayer','XXX_overlay1','XXX_overlay2']
								, x: 3796558,	y: 5830315
							},
							{
								id: 'shortcut_change_zoom',
								name: 'Change layers - zoom',
								desc: 'Shortcut XXX - change + zoom',
								layers: ['XXX_baselayer','XXX_overlay1','XXX_overlay2']
								, zoom: 16
							},
							{
								id: 'shortcut_empty_2',
								name: '',
								desc: '',
								layers: []
							},
							{
								id: 'shortcut_only_jump',
								name: 'Only - jump',
								desc: 'Shortcut XXX - jump',
								layers: []
								, x: 3796558,	y: 5830315
							},
							{
								id: 'shortcut_only_zoom',
								name: 'Only - zoom',
								desc: 'Shortcut XXX - zoom',
								layers: []
								, zoom: 16
							}
            			]
        },
 *
 *
 */
Heron.widgets.ContextBrowserPanel = Ext.extend(Heron.widgets.HTMLPanel, {

	initComponent : function() {
		Heron.widgets.ContextBrowserPanel.superclass.initComponent.call(this);
		// this.id = 'hr-context-browser';
		// !!! id from panel definition must be unique for search !!!
		this.title = __('Shortcuts');

		this.html = '<div class="hr-html-panel-body">';

		var contexts = this.hropts;
		if (typeof(contexts) !== "undefined") {
			for (var i = 0; i < contexts.length; i++) {
				// write link with panel id and context id
				this.html += '<a href="#" title="' + contexts[i].desc + '" onclick="Heron.widgets.ContextBrowser.setMapContext(\'' + this.id + "','" + contexts[i].id + '\'); return false;">' + contexts[i].name + '</a><br/>';
			}
		}
		this.html += '</div>';

		Heron.widgets.ContextBrowser.init(contexts);
	}
});

/** api: xtype = hr_contextbrowserpanel */
Ext.reg('hr_contextbrowserpanel', Heron.widgets.ContextBrowserPanel);

