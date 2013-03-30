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
