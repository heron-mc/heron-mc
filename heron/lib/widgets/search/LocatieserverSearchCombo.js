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

Ext.namespace("Heron.widgets.search");

/** api: (define)
 *  module = Heron.widgets.search
 *  class = LocatieserverSearchCombo
 *  base_link = `Ext.form.ComboBox <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.form.ComboBox>`_
 */


/** api: example
 *  Sample code showing how to include the Dutch national address (GEOZET, PDOK) search in your MapPanel toolbar.
 *
 *  .. code-block:: javascript
 *
 *			Heron.layout = {
 *				 xtype: 'hr_mappanel',
 *
 *				 hropts: {
 *					 layers: [
 *						 new OpenLayers.Layer.WMS( "World Map",
 *						   "http://tilecache.osgeo.org/wms-c/Basic.py?", {layers: 'basic', format: 'image/png' } )
 *					 ],
 *					toolbar : [
 *						{type: "pan"},
 *						{type: "zoomin"},
 *					       .
 *					       .
 *						{type: "namesearch",
 *							// Optional options, see LocatieserverSearchCombo.js
 *							options : {
 *								 xtype : 'hr_locatieserversearchcombo',
 *								 id: "pdoksearchcombo",
 *								 width: 320,
 *								 listWidth: 400,
 *								 minChars: 5,
 *								 queryDelay: 240,
 *								 zoom: 11,
 *								 emptyText: __('Search PDOK'),
 *								 tooltip: __('Search PDOK'),
 *								 url: 'http://localhost:8081/geocoder/Geocoder?max=5'
 *							}
 *					]
 *				  }
 *				};
 *
 */

/** api: constructor
 *  .. class:: LocatieserverSearchCombo(config)
 *
 *  Create a ComboBox that provides a "search and zoom" function using OGC OpenLS XLS search.
 *  To use this class you need to include additional JS files in your page.
 *  See also the example HTML file under examples/namesearch.
 *
 *  #. If your map is not in EPSG:4326 (WGS84) you need to import Proj4JS, e.g.
 *	 http://cdnjs.cloudflare.com/ajax/libs/proj4js/1.1.0/proj4js-compressed.js
 *
 *  #. You need a proxy server that should proxy the domain `open.mapquestapi.com`.
 */
Heron.widgets.search.LocatieserverSearchCombo = Ext.extend(Ext.form.ComboBox, {

			/** api: config[map]
			 *  ``OpenLayers.Map or Object``  A configured map or a configuration object
			 *  for the map constructor, required only if :attr:`zoom` is set to
			 *  value greater than or equal to 0.
			 */

			/** private: property[map]
			 *  ``OpenLayers.Map``  The map object.
			 */
			map: null,

			/** api: config[width]
			 *  See http://www.dev.sencha.com/deploy/dev/docs/source/BoxComponent.html#cfg-Ext.BoxComponent-width,
			 *  default value is 240.
			 */
			width: 240,

			/** api: config[listWidth]
			 *  See http://www.dev.sencha.com/deploy/dev/docs/source/Combo.html#cfg-Ext.form.ComboBox-listWidth,
			 *  default value is 400.
			 */
			listWidth: 400,

			/** api: config[loadingText]
			 *  See http://www.dev.sencha.com/deploy/dev/docs/source/Combo.html#cfg-Ext.form.ComboBox-loadingText,
			 *  default value is "Search in Geozet...".
			 */
			loadingText: __('Searching...'),

			/** api: config[emptyText]
			 *  See http://www.dev.sencha.com/deploy/dev/docs/source/TextField.html#cfg-Ext.form.TextField-emptyText,
			 *  default value is "Search location in Geozet".
			 */
			emptyText: __('Search with OpenLS'),

			/** api: config[zoom]
			 *  ``Number`` Zoom level for recentering the map after search, if set to
			 *  a negative number the map isn't recentered, defaults to 8.
			 */
			/** private: property[zoom]
			 *  ``Number``
			 */
			zoom: 8,

			/** api: config[minChars]
			 *  ``Number`` Minimum number of characters to be typed before
			 *  search occurs, defaults to 2.
			 */
			minChars: 2,

			/** api: config[queryDelay]
			 *  ``Number`` Delay before the search occurs, defaults to 200 ms.
			 */
			queryDelay: 200,

			/** api: config[maxRows]
			 *  `String` The maximum number of rows in the responses, defaults to 10,
			 *  no maximum value.
			 */
			maxRows: '10',

			/** config: property[url]
			 *  URL of the Locatieserver suggest service.
			 */
			url: 'http://geodata.nationaalgeoregister.nl/locatieserver/suggest?wt=xml',
			
			/** config property[lookupUrl]
			 *  URL of the Locatieserver lookup service.
			 */
			lookupUrl: 'http://geodata.nationaalgeoregister.nl/locatieserver/lookup?wt=xml',

			/** private: property[hideTrigger]
			 *  Hide trigger of the combo.
			 */
			hideTrigger: true,

			/** private: property[displayField]
			 *  Display field name
			 */
			displayField: 'text',

			/** private: property[forceSelection]
			 *  Force selection.
			 */
			forceSelection: false,

			/** private: property[autoSelect]
			 *  true to select the first result gathered by the data store (defaults to false). A false value would require a manual selection
			 *  from the dropdown list to set the components value unless the value of (typeAheadDelay) were true..
			 */
			autoSelect: false,

			/** private: property[queryParam]
			 *  Query parameter.
			 */
			queryParam: 'q',
			
			/** private: method[constructor]
			 *  Construct the component.
			 */
			initComponent: function() {
				Heron.widgets.search.LocatieserverSearchCombo.superclass.initComponent.apply(this, arguments);
				this.store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										url: this.url,
										method: 'GET'
									}),
							fields : [
								"id",
								"type",
								"baseText",
								"text"
							],

							reader: new Heron.data.LocatieserverReader()
						});

				// a searchbox for names
				// see http://khaidoan.wikidot.com/extjs-combobox
				if (this.zoom > 0) {
					this.on("select", function(combo, record, index) {
						this.setValue(record.data.baseText); // put the selected name in the box
						lookupUrl = this.lookupUrl + "&id=" + record.data.id;
						
						// These variables are used in a callback function below, so they must be kept local
						map = this.map;
						zoom = this.zoom;
						
						Ext.Ajax.request({
							url: lookupUrl,
							method: 'GET',
							success: function(conn, response, options, eOpts) {
								var doc = conn.responseXML;
								var root = doc.documentElement || doc;
								var opts = { namespaces: {} };
								var format = new OpenLayers.Format.XML(opts);
								var elms = format.getElementsByTagNameNS(root, '', 'str');
								Ext.each(elms, function(elm, index) {
									var name = format.getAttributeNS(elm, '', "name");
									if (name == "centroide_rd") {
										// Parse centroid and zoom to it
										var str = format.getChildValue(elm);
										matches = str.match(/POINT\((.+) (.+)\)/);
										var position = new OpenLayers.LonLat(parseFloat(matches[1]), parseFloat(matches[2]));

										// zoom in on the location
										map.setCenter(position, zoom);
									}
								});
								
							},
							failure: function(conn, response, options, eOpts) {
								//Packt.util.Util.showErrorMsg(conn.responseText);
								console.log("Fout: " + conn.responseText);
							}
						});
						
						// close the drop down list
						this.collapse();
					}, this);
				}
			}
		});

/** api: xtype = hr_locatieserversearchcombo */
Ext.reg('hr_locatieserversearchcombo', Heron.widgets.search.LocatieserverSearchCombo);
