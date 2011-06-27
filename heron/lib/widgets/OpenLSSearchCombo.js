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
 *  class = OpenLSSearchCombo
 *  base_link = `Ext.form.ComboBox <http://dev.sencha.com/deploy/dev/docs/?class=Ext.form.ComboBox>`_
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
 *						{type: "zoomout"},
 *						{type: "-"},
 *						{type: "namesearch",
 *							// Optional options, see OpenLSSearchCombo.js
 *							options : {
 *								zoom: 11,
 *								xtype : 'hr_openlssearchcombo',
 *								emptyText: __('Search PDOK'),
 *								tooltip: __('Search PDOK'),
 *								url: 'http://dutch.geocoder.url/geocoder/Geocoder?',
 *								 id: "pdoksearchcombo"
 *							}
 *					]
 *				  }
 *				};
 *
 */

/** api: constructor
 *  .. class:: OpenLSSearchCombo(config)
 *
 *  Create a ComboBox that provides a "search and zoom" function using OGC OpenLS XLS search.
 *  To use this class you need to include additional JS files in your page.
 *  See also the example HTML file under examples/namesearch.
 *
 *  #. If your map is not in EPSG:4326 (WGS84) you need to import Proj4JS, e.g.
 *	 http://lib.heron-mc.org/proj4js/1.0.1/lib/proj4js-compressed.js
 *
 *  #. Since ExtJS does not support proxies you need to include the GeoExt Ajax overrides:
 *	 http://lib.heron-mc.org/geoext/1.0/lib/overrides/override-ext-ajax.js
 *	 Plus you need a proxy server that should proxy the domain `open.mapquestapi.com`.
 */
Heron.widgets.OpenLSSearchCombo = Ext.extend(Ext.form.ComboBox, {

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
			 *  default value is 350.
			 */
			width: 350,

			/** api: config[listWidth]
			 *  See http://www.dev.sencha.com/deploy/dev/docs/source/Combo.html#cfg-Ext.form.ComboBox-listWidth,
			 *  default value is 350.
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
			emptyText: __('Search Geozet'),

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
			 *  search occurs, defaults to 1.
			 */
			minChars: 4,

			/** api: config[queryDelay]
			 *  ``Number`` Delay before the search occurs, defaults to 50 ms.
			 */
			queryDelay: 200,

			/** api: config[maxRows]
			 *  `String` The maximum number of rows in the responses, defaults to 20,
			 *  maximum allowed value is 1000.
			 *  See: http://www.geonames.org/export/geonames-search.html
			 */
			maxRows: '10',


			/** config: property[url]
			 *  Url of the Geozet service default: http://geodata.nationaalgeoregister.nl/geocoder/Geocoder
			 *  e.g.  http://geodata.nationaalgeoregister.nl/geocoder/Geocoder?zoekterm=Den,Helder,Schapendijkje&max=5
			 *  You must be IP-whitelisted and have a proxy defined to pass through to the domain like `open.mapquestapi.com`
			 */
			url: 'http://geodata.nationaalgeoregister.nl/geocoder/Geocoder?max=5',

			/** noapi: config[tpl]
			 *  ``Ext.XTemplate or String`` Template for presenting the result in the
			 *  list (see http://www.dev.sencha.com/deploy/dev/docs/output/Ext.XTemplate.html),
			 *  if not set a default value is provided.
			 */
			// tpl: '<tpl for="."><div class="x-combo-list-item"><h1>{name}<br></h1>{fcodeName} - {countryName}</div></tpl>',

			/** api: config[lang]
			 *  ``String`` Place name and country name will be returned in the specified
			 *  language. Default is English (en). See: http://www.geonames.org/export/geonames-search.html
			 */
			/** private: property[lang]
			 *  ``String``
			 */
			lang: 'en',

			/** api: config[charset]
			 *  `String` Defines the encoding used for the document returned by
			 *  the web service, defaults to 'UTF8'.
			 *  See: http://www.geonames.org/export/geonames-search.html
			 */
			/** private: property[charset]
			 *  ``String``
			 */
			charset: 'UTF8',

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
			forceSelection: true,

			/** private: property[queryParam]
			 *  Query parameter.
			 */
			queryParam: 'zoekterm',

			typeAhead: true,

			/** private: method[constructor]
			 *  Construct the component.
			 */
			initComponent: function() {
				Heron.widgets.OpenLSSearchCombo.superclass.initComponent.apply(this, arguments);
				this.store = new Ext.data.Store({
							proxy : new Ext.data.HttpProxy({
										url: this.url,
										method: 'GET'
									}),
							fields : [
								{name: "lon", type: "number"},
								{name: "lat", type: "number"},
								"text"
							],

							reader: new Ext.data.OpenLSReader()
						});

				// a searchbox for names
				// see http://khaidoan.wikidot.com/extjs-combobox
				if (this.zoom > 0) {
					this.on("select", function(combo, record, index) {
						this.setValue(record.data.text); // put the selected name in the box
						var position = new OpenLayers.LonLat(record.data.lon, record.data.lat);

						// Reproject (if required)
						position.transform(
								new OpenLayers.Projection("EPSG:28992"),
								this.map.getProjectionObject()
						);

						// zoom in on the location
						this.map.setCenter(position, this.zoom);
						// close the drop down list
						this.collapse();
					}, this);
				}
			}
		});

/** api: xtype = hr_openlssearchcombo */
Ext.reg('hr_openlssearchcombo', Heron.widgets.OpenLSSearchCombo);

Ext.data.OpenLSReader = function(meta, recordType) {
	meta = meta || {};


	Ext.applyIf(meta, {
				idProperty: meta.idProperty || meta.idPath || meta.id,
				successProperty: meta.successProperty || meta.success
			});

	Ext.data.OpenLSReader.superclass.constructor.call(this, meta, recordType || meta.fields);
};

Ext.extend(Ext.data.OpenLSReader, Ext.data.XmlReader, {

			addOptXlsText: function(format, text, node, tagname, sep) {
				var elms = format.getElementsByTagNameNS(node, "http://www.opengis.net/xls", tagname);
				if (elms) {
					Ext.each(elms, function(elm, index) {
						var str = format.getChildValue(elm);
						if (str) {
							text = text + sep + str;
						}
					});
				}

				return text;
			},

			readRecords : function(doc) {

				this.xmlData = doc;

				var root = doc.documentElement || doc;

				var records = this.extractData(root);

				return {
					success : true,
					records : records,
					totalRecords : records.length
				};
			},

			extractData: function(root) {
				var opts = {
					/**
					 * Property: namespaces
					 * {Object} Mapping of namespace aliases to namespace URIs.
					 */
					namespaces: {
						gml: "http://www.opengis.net/gml",
						xls: "http://www.opengis.net/xls"
					}
				};

				var records = [];
				var format = new OpenLayers.Format.XML(opts);
				var addresses = format.getElementsByTagNameNS(root, "http://www.opengis.net/xls", 'GeocodedAddress');

				// Create record for each address
				var recordType = Ext.data.Record.create([
					{name: "lon", type: "number"},
					{name: "lat", type: "number"},
					"text"
				]);
				var reader = this;

				Ext.each(addresses, function(address, index) {
					var pos = format.getElementsByTagNameNS(address, "http://www.opengis.net/gml", 'pos');
					var xy = '';
					if (pos && pos[0]) {
						xy = format.getChildValue(pos[0]);
					}

					var xyArr = xy.split(' ');

					var text = '';

					/**
					 *		 <xls:GeocodedAddress>
					 <gml:Point srsName="EPSG:28992">
					 <gml:pos dimension="2">121684.0 487802.0</gml:pos>
					 </gml:Point>
					 <xls:Address countryCode="NL">
					 <xls:StreetAddress>
					 <xls:Street>Damrak</xls:Street>
					 </xls:StreetAddress>
					 <xls:Place type="MunicipalitySubdivision">AMSTERDAM</xls:Place>
					 <xls:Place type="Municipality">AMSTERDAM</xls:Place>
					 <xls:Place type="CountrySubdivision">NOORD-HOLLAND</xls:Place>
					 </xls:Address>
					 </xls:GeocodedAddress>
					 *
					 */
					text = reader.addOptXlsText(format, text, address, 'Street', '');
					text = reader.addOptXlsText(format, text, address, 'Place', ',');
					var values = {
						lon : parseFloat(xyArr[0]),
						lat : parseFloat(xyArr[1]),
						text : text
					};
					var record = new recordType(values, index);
					records.push(record);
				});
				return records;
			}
		});
