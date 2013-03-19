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

		(function () { // Creates and runs anonymous function, its result is assigned to Singleton

			// Any variable inside function becomes "private"

			/** Holds map contexts array. */
			var contexts = undefined;
			var map = undefined;
			var contextBrowserPanel = undefined;

			/** Private functions. */


			/** This is a definition of our Singleton, it is also private, but we will share it below */
			var instance = {
				init: function (hroptions) {
					// Set the default content to show. Do this once only.
					// if (hroptions && !contexts) {
					// 	contexts = hroptions;
					// }
				},

				/**
				 * Set Map context, a combination of center, zoom and visible layers.
				 * @param contextid - a context component
				 * @param id - a context id defined in Geoviewer.context config
				 */
				setMapContext: function (contextid, id) {

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
								else if (contexts[i].x && contexts[i].y && !contexts[i].zoom) {
									map.setCenter(new OpenLayers.LonLat(contexts[i].x, contexts[i].y), map.getZoom(), false, true);
								}
								// if zoom - then get position and zoom
								else if (!(contexts[i].x && contexts[i].y) && contexts[i].zoom) {
									map.setCenter(new OpenLayers.LonLat(map.center.lon, map.center.lat), contexts[i].zoom, false, true);
								}

								if (contexts[i].layers) {

									var mapLayers = map.layers;
									var ctxLayers = contexts[i].layers;
									var ctxName = contexts[i].name;

									// If the layer array is not empty => change to a new layer view
									// or
									// If the layer array is empty and the name is not emty => delete all overlays
									// else
									// do nothing => empty line
									if ((ctxLayers.length) || (!ctxLayers.length && ctxName.length)) {

										// Check if layers only should be added
										if (!contexts[i].addLayers) {
											// Make all layers invisible (without baselayers)
											for (var n = 0; n < mapLayers.length; n++) {
												if (mapLayers[n].getVisibility()) {

													// Only invisible if not a baselayer
													if (!mapLayers[n].isBaseLayer) {
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

										// Fix for displaying all changes in the legend panel
										// => set the actual baselayer
										if (map.baseLayer) {
											map.setBaseLayer(map.baseLayer);
										}

									}
								}
							}
						}
					}
				},
				removeShortcut: function (contextid, id) {
					// get element id
					var elmm = Ext.getCmp(contextid);
					elmm.removeShortcut(id);
				},

				//Anke: Added for use with shortcuts.
				setContextBrowserPanel : function(acontextbrowserPanel) {
					contextBrowserPanel = acontextbrowserPanel;
                },

				getContextBrowserPanel : function() {
                    return contextBrowserPanel;
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
 *      {
 *      xtype: 'hr_contextbrowserpanel',
 *      id: 'hr-contextbrowser',
 *      // The contexts to create shortcuts for in the context browser.
 *      hropts: [
 *      {
 *      id: 'shortcut_XXX',
 *      name: 'Change layers - jump - zoom',
 *      desc: 'Shortcut XXX - change + jump + zoom',
 *      addLayers: false,
 *      layers: ['XXX_baselayer','XXX_overlay1','XXX_overlay2']
 *      , x: 3796558,	y: 5830315
 *      , zoom: 16
 *      },
 *      {
 *      id: 'shortcut_XXX add',
 *      name: 'Add layers - jump - zoom',
 *      desc: 'Shortcut XXX - add + jump + zoom',
 *      addLayers: true,
 *      layers: ['XXX_overlay1','XXX_overlay2']
 *      , x: 3796558,	y: 5830315
 *      , zoom: 16
 *      },
 *      {
 *      id: 'shortcut_XXX_delete',
 *      name: 'Delete all overlays',
 *      desc: '',
 *      layers: []
 *      },
 *      {
 *      id: 'shortcut_empty_1',
 *      name: '',
 *      desc: '',
 *      layers: []
 *      },
 *      {
 *      id: 'shortcut_change_jump',
 *      name: 'Change layers - jump',
 *      desc: 'Shortcut XXX - change + jump',
 *      layers: ['XXX_baselayer','XXX_overlay1','XXX_overlay2']
 *      , x: 3796558,	y: 5830315
 *      },
 *      {
 *      id: 'shortcut_change_zoom',
 *      name: 'Change layers - zoom',
 *      desc: 'Shortcut XXX - change + zoom',
 *      layers: ['XXX_baselayer','XXX_overlay1','XXX_overlay2']
 *      , zoom: 16
 *      },
 *      {
 *      id: 'shortcut_empty_2',
 *      name: '',
 *      desc: '',
 *      layers: []
 *      },
 *      {
 *      id: 'shortcut_only_jump',
 *      name: 'Only - jump',
 *      desc: 'Shortcut XXX - jump',
 *      layers: []
 *      , x: 3796558,	y: 5830315
 *      },
 *      {
 *      id: 'shortcut_only_zoom',
 *      name: 'Only - zoom',
 *      desc: 'Shortcut XXX - zoom',
 *      layers: []
 *      , zoom: 16
 *      }
 *      ]
 *      },
 *
 *
 */
Heron.widgets.ContextBrowserPanel = Ext.extend(Heron.widgets.HTMLPanel, {

	initComponent: function () {
		// this.id = 'hr-context-browser';
		// !!! id from panel definition must be unique for search !!!

		Heron.widgets.ContextBrowserPanel.superclass.initComponent.call(this);
		if (!this.title) {
			// Default title, may be overriden
			this.title = __('Shortcuts');
		}

		var contexts = undefined;

		var localStorageShortcuts = this.getlocalStorageShortcuts();
		if (localStorageShortcuts) {
			contexts = this.hropts.concat(localStorageShortcuts);
		}
		else {
			contexts = this.hropts;
		}

		this.hropts = contexts;

		Heron.widgets.ContextBrowser.init(contexts);
		this.html = this.getHtml();

		// Set the global GeoExt contextbrowserPanel variable, some need it
		Heron.widgets.ContextBrowser.setContextBrowserPanel(this);

		//Already create the window.
		this.createAddShortcutWindow();
	},
	getHtml: function () {
		var IsFirstUserContext = true;
		var htmllines = '<div class="hr-html-panel-body">';

		var contexts = this.hropts;
		if (typeof(contexts) !== "undefined") {
			for (var i = 0; i < contexts.length; i++) {
				// write link with panel id and context id
				if (contexts[i].id.substr(0, 11) == "hr_shortcut") {
					//Positioning of link and tool floating. Width absolute, this only works as
					//long as the width of the container is absolute and 240 px!
					if (IsFirstUserContext) {
						htmllines += '<hr>';
						IsFirstUserContext = false;
					}
					htmllines += '<div style="float: left; width:210px;"><a href="#" id="' + contexts[i].id + '"title="' + contexts[i].desc + '" onclick="Heron.widgets.ContextBrowser.setMapContext(\'' + this.id + "','" + contexts[i].id + '\'); return false;">' + contexts[i].name + '</a></div>';
					htmllines += '<div class="x-tool x-tool-close" style="float: left; width:15px;" onclick="Heron.widgets.ContextBrowser.removeShortcut(\'' + this.id + "','" + contexts[i].id + '\')">&nbsp;</div>';
				}
				else {
					htmllines += '<div style="width:100%;"><a href="#" id="' + contexts[i].id + '"title="' + contexts[i].desc + '" onclick="Heron.widgets.ContextBrowser.setMapContext(\'' + this.id + "','" + contexts[i].id + '\'); return false;">' + contexts[i].name + '</a></div>';
				}
			}
		}
		htmllines += '</div>';
		return htmllines
	},
	updateHtml: function () {
		this.update(this.getHtml());

	},
	onAddShortcut: function () {
		if (this.supportsHtml5Storage()) {
			this.AddShortcutWindow.show();
		}
	},
	addShortcut: function () {

		var strShortcutMaxNr = localStorage.getItem("hr_shortcutMax");
		if (strShortcutMaxNr) {
			ShortcutMaxNr = Number(strShortcutMaxNr);
			if (ShortcutMaxNr !== NaN) {
				ShortcutMaxNr += 1;
			}
			else {
				ShortcutMaxNr = 1;
			}
		}
		else {
			ShortcutMaxNr = 1;
		}

		this.BMId = 'hr_shortcut' + ShortcutMaxNr;
		this.BMName = this.edName.getValue();
		this.BMDesc = this.edDesc.getValue();

		this.getMapContent();

		//Add the Heron-bookmark to localStorage
		localStorage.setItem(this.BMId, this.BMId + "," + this.BMName + "," + this.BMDesc + "," + this.BMX + "," + this.BMY + "," + this.BMZoom + "," + this.BMvisibleLayers.join());
		//Increase number of Heron-bookmarks
		localStorage.setItem("hr_shortcutMax", ShortcutMaxNr);

		//Add the Heron-bookmark to hropts
		this.hropts.push(
				{
					id: this.BMId,
					name: this.BMName,
					desc: this.BMDesc,
					layers: this.BMvisibleLayers,
					x: this.BMX,
					y: this.BMY,
					zoom: this.BMZoom
				});
		this.updateHtml();
	},
	removeShortcut: function (id) {
		//Remove the shortcut from localStorage
		localStorage.removeItem(id);

		//If this is the last shortcut, decrease max. number of Heron-shortcuts
		var strShortcutMaxNr = localStorage.getItem("hr_shortcutMax")
		ShortcutMaxNr = Number(strShortcutMaxNr)
		if (ShortcutMaxNr == Number(id.substr(4))) {
			ShortcutMaxNr -= 1
			localStorage.setItem("hr_shortcutMax", ShortcutMaxNr)
		}

		//Remove the shortcut from hropts.
		var contexts = this.hropts;
		var newcontexts = new Array();
		for (var i = 0; i < contexts.length; i++) {
			if (contexts[i].id !== id) {
				newcontexts.push(contexts[i]);
			}
		}
		this.hropts = newcontexts;

		//Refresh the panel
		this.updateHtml();

	},
	getlocalStorageShortcuts: function () {
		if (!this.supportsHtml5Storage()) {
			return null;
		}
		var ShortcutMaxNr = localStorage.getItem("hr_shortcutMax");
		if (ShortcutMaxNr) {
			var shortcuts = new Array();
			for (index = 1; index <= ShortcutMaxNr; index++) {
				var contextstr = localStorage.getItem("hr_shortcut" + index);
				if (contextstr) {
					var contextitems = contextstr.split(",");
					var contextlayers = new Array();
					for (i = 6; i < contextitems.length; i++) {
						contextlayers[i - 6] = contextitems[i];
					}

					var context = {
						id: contextitems[0],
						name: contextitems[1],
						desc: contextitems[2],
						layers: contextlayers,
						x: contextitems[3],
						y: contextitems[4],
						zoom: contextitems[5]
					};
					shortcuts.push(context);
				}
			}
			return shortcuts;
		}
		return null;
	},
	getMapContent: function () {
		var map = Heron.App.getMap();
		var MapCenter = map.getCenter();
		this.BMX = MapCenter.lon;
		this.BMY = MapCenter.lat;
		this.BMZoom = map.getZoom();
		var mapLayers = map.layers;
		this.BMvisibleLayers = new Array();
		for (var n = 0; n < mapLayers.length; n++) {
			if (mapLayers[n].getVisibility()) {
				this.BMvisibleLayers.push(mapLayers[n].name);
			}
		}

	},
	createAddShortcutWindow: function () {
		// Maak een formpanel.
		var labelWidth = 65;
		var fieldWidth = 300;

		var formPanel = new Ext.form.FormPanel({
			title: "",
			baseCls: 'x-plain',
			autoHeight: true,
			defaultType: "textfield",
			labelWidth: labelWidth,
			anchor: "100%",
			items: [
				{
					id: "ed_name",
					fieldLabel: __("Name"),
					displayField: "Name",
					width: fieldWidth,
					enableKeyEvents: true,
					listeners: {
						keyup: function (textfield, ev) {
							this.onNameKeyUp(textfield, ev);
						},
						scope: this
					}
				},
				{
					id: "ed_desc",
					fieldLabel: __("Description"),
					displayField: "Decription",
					width: fieldWidth
				}
			]
		});

		// Maak het formulier.
		this.AddShortcutWindow = new Ext.Window({
			title: "Add a bookmark",
			width: 400,
			autoHeight: true,
			plain: true,
			statefull: true,
			stateId: "ZoomToWindow",
			bodyStyle: "padding: 5px;",
			buttonAlign: "center",
			resizable: false,
			closeAction: "hide",     // klik op X geeft hide.
			items: [formPanel],
			listeners: {
				show: function () {
					this.onShowWindow();
				},
				scope: this
			},
			buttons: [
				{
					id: "btn_add",
					text: "Add",
					disabled: true,
					handler: function () {
						this.AddShortcutWindow.hide();
						this.addShortcut();
					},
					scope: this
				},
				{
					name: "btn_cancel",
					text: "Cancel",
					handler: function () {
						this.AddShortcutWindow.hide();
					},
					scope: this
				}
			]
		});
		this.edName = Ext.getCmp("ed_name");
		this.edDesc = Ext.getCmp("ed_desc");
		this.btnAdd = Ext.getCmp("btn_add");

	},
	onNameKeyUp: function (textfield, ev) {
		var value = this.edName.getValue();
		if (value) {
			this.btnAdd.enable();
		}
		else {
			this.btnAdd.disable();
		}

	},
	onShowWindow: function () {
		this.edName.setValue('');
		this.edDesc.setValue('');
		this.edName.focus(false, 200);
	},
	supportsHtml5Storage: function () {
		try {
			return 'localStorage' in window && window['localStorage'] !== null;
		} catch (e) {
			return false;
		}
	}
});

/** api: xtype = hr_contextbrowserpanel */
Ext.reg('hr_contextbrowserpanel', Heron.widgets.ContextBrowserPanel);

