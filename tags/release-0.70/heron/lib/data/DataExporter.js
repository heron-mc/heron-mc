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
 *  class = DataExporter
 *  base_link = `Ext.DomHelper <http://docs.sencha.com/ext-js/3-4/#!/api/Ext.DomHelper>`_
 */

/**
 * Define functions to help with data export.
 */
Heron.data.DataExporter = {

	/** Format data using Ext.ux.Exporter. */
	formatStore : function(store, config, base64Encode) {
		var formatter = new Ext.ux.Exporter[config.formatter]();
		var data = formatter.format(store, config);
		if (base64Encode) {
			data = Base64.encode(data);
		}
		return data;
	},

	/** Trigger file download by submitting data to a server script. */
	download : function(data, config) {
		// See also http://www.sencha.com/forum/showthread.php?81897-FYI-Very-simple-approach-to-JS-triggered-file-downloads
		try {
			// Cleanup previous form if required
			Ext.destroy(Ext.get('hr_uploadForm'));
		}
		catch(e) {
		}

		var form = Ext.DomHelper.append(
				document.body,
				{
					tag : 'form',
					id: 'hr_uploadForm',
					method : 'post',
					/** Heron CGI URL, see /services/heron.cgi. */
					action : Heron.globals.serviceUrl,
					children: [
						{tag: 'input', type:'hidden', name: 'data', value: data},
						// Server sends HTTP Header: Content-Disposition: attachment; filename="%s"' % filename
						{tag: 'input', type:'hidden', name: 'filename', value: config.fileName},
						{tag: 'input', type:'hidden', name: 'mime', value: config.mimeType}
					]
				}
		);

		// Add Form to document and submit
		document.body.appendChild(form);
		form.submit();
	}
};
