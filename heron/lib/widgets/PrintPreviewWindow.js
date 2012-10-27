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
 *  class = PrintPreviewWindow
 *  base_link = `Ext.Window <http://docs.sencha.com/ext-js/3-4/#!/api/Ext.Window>`_
 */

/** api: constructor
 *  .. class:: PrintPreviewWindow(config)
 *
 *  An ExtJS Window that contains a GeoExt.ux PrintPreview Container.
 *  PrintPreview is synced from https://github.com/GeoNode/PrintPreview.
 *
 * The Window can be opened through the Toolbar (see example) or directly.
 *
 *  .. code-block:: javascript
 *
 *			  {type: "printdirect", options: {url: 'http://kademo.nl/print/pdf28992'}}
 */
Heron.widgets.PrintPreviewWindow = Ext.extend(Ext.Window, {
	title: __('Print Preview'),
	printCapabilities: null,
	modal: true,
	border: false,
	resizable: false,
	width: 360,
	autoHeight: true,
	method : 'POST',
	mapTitle: __('PrintPreview Demo'),
	includeLegend: true,
	legendDefaults:{
		useScaleParameter : true,
		baseParams: {FORMAT: "image/png"}
	},

	initComponent : function() {
		if (this.hropts) {
			Ext.apply(this, this.hropts);
		}

		if (!this.url) {
			alert(__("No print provider url property passed in hrops"));
			return;
		}
		var self = this;
		Ext.Ajax.request({
			url : this.url + '/info.json',
			method: 'GET',
			params :null,
			success: function (result, request) {
				self.printCapabilities = Ext.decode(result.responseText);
				self.addItems();
			},
			failure: function (result, request) {
				alert(__('Error getting Print options from server: ') + this.url);
			}
		});

		Heron.widgets.PrintPreviewWindow.superclass.initComponent.call(this);
	},

	addItems : function() {
		// Hidden LegendPanel : needed to fetch active legends from
		var legendPanel = new GeoExt.LegendPanel({
			renderTo: document.body,
			hidden: true,
			width: 360,
			autoHeight: true,
			defaults: this.legendDefaults
		});

		var self = this;

		var item = new GeoExt.ux.PrintPreview({
			autoHeight: true,
			printMapPanel: {
				// limit scales to those that can be previewed
				limitScales: true,

				// no zooming on the map
				map: {controls: [
					new OpenLayers.Control.Navigation({
						zoomBoxEnabled: false,
						zoomWheelEnabled: false
					}),
					new OpenLayers.Control.PanPanel()
				]}
			},
			printProvider: {
				// using get for remote service access without same origin
				// restriction. For async requests, we would set method to "POST".
				method: this.method,
				//method: "POST",

				// capabilities from script tag in Printing.html.
				capabilities: this.printCapabilities,
				customParams: {
					mapTitle: this.mapTitle,
					comment: this.comment,
					footerText: 'My Footer'
				},

				listeners: {
					"print": function() {
						self.close();
					},
					/** api: event[printexception]
					 *  Triggered when using the ``POST`` method, when the print
					 *  backend returns an exception.
					 *
					 *  Listener arguments:
					 *
					 *  * printProvider - :class:`GeoExt.data.PrintProvider` this
					 *	PrintProvider
					 *  * response - ``Object`` the response object of the XHR
					 */
					"printexception": function(printProvider, result) {
						alert(__('Error from Print server: ') + result);
					}

				}
			},
			includeLegend: this.includeLegend,
			mapTitle: this.mapTitle,
			sourceMap: this.mapPanel,
			legend: legendPanel
		});
		this.add(item);
		this.doLayout();
		this.show();
		this.center();
	},

	// method[listeners]
	//  Force legends to become visible ...
	//  ... inside an activated TabPanel or inside an expanded (accordion) panel
	//
	//  ATTENTION:
	//  ----------
	//  This listener only gets the events of the panel in which it is located - if there is a
	//  further panel - higher above in the tree - you must define an additional / other listener
	//  function to support the redraw events!!!
	//
	listeners: {
		show: function(node) {
			//
		}
	}

});

/** api: xtype = hr_printpreviewwindow */
Ext.reg('hr_printpreviewwindow', Heron.widgets.PrintPreviewWindow);
