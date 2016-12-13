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

Ext.namespace("Heron.data");

/** api: (define)
 *  module = Heron.data
 *  class = LocatieserverReader
 *  base_link = `Ext.data.XmlReader <http://dev.sencha.com/deploy/ext-3.3.1/docs?class=Ext.data.XmlReader>`_
 */

Heron.data.LocatieserverReader = function(meta, recordType) {
	meta = meta || {};


	Ext.applyIf(meta, {
				idProperty: meta.idProperty || meta.idPath || meta.id,
				successProperty: meta.successProperty || meta.success
			});

	Heron.data.LocatieserverReader.superclass.constructor.call(this, meta, recordType || meta.fields);
};

Ext.extend(Heron.data.LocatieserverReader, Ext.data.XmlReader, {

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
				gml: "http://www.opengis.net/gml"
			}
		};

		var records = [];
		var format = new OpenLayers.Format.XML(opts);
		var addresses = format.getElementsByTagNameNS(root, '', 'doc');

		// Create record for each address
		var recordType = Ext.data.Record.create([
			"id",
			"type",
			"baseText",
			"text"
		]);
		var reader = this;

		Ext.each(addresses, function(address, index) {
			
			var values = {
				id : "",
				type : "",
				baseText : "",
				text : ""
			};
			
			var elms = format.getElementsByTagNameNS(address, '', "str");
			if (elms) {
				Ext.each(elms, function(elm, index) {
					var str = format.getChildValue(elm);
					var name = format.getAttributeNS(elm, '', "name");
					if (str) {
						switch(name) {
						case "weergavenaam":
							values["baseText"] = str;
							break;
						default:
							if (name in values) {
								values[name] = str;
							}
							break;
						}
					}
				});
			}

			// Get highlight element
			var elms = format.getElementsByTagNameNS(root, '', "lst");
			if (elms) {
				Ext.each(elms, function(elm, index) {
					name = format.getAttributeNS(elm, '', "name");
					if (name == values["id"]) {
						strElem = format.getElementsByTagNameNS(elm, '', "str")[0];
						values["text"] = format.getChildValue(strElem);
					}
				});
			}
			
			var record = new recordType(values, index);
			records.push(record);
		});
		return records;
	}
});

