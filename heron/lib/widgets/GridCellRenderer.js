/** api: (define)
 *  module = Heron.widgets
 *  class = GridCellRenderer
 */


/** api: example
 *
 *  .. code-block:: javascript
 *
 *		 {
 *			 xtype: 'hr_featureinfopanel',
 *			 border: true,
 *			   .
 *			   .
 *		   hropts: {
 *			   infoFormat: 'application/vnd.ogc.gml',
 *			   displayPanels: ['Grid', 'XML'],
 *			   exportFormats: ['CSV', 'Excel'],
 *			   maxFeatures: 10,
 *			   gridCellRenderers: [
 *			  {
 *				featureType: 'contracts',
 *				attrName: 'contractId'
 *				renderer: {
 *				  fn : Heron.widgets.GridCellRenderer.directLink,
 *				  options : {
 *					url: 'http://resources.com/contracts/show?id={companyId}.{contractId}'
 *					target: '_new'
 *				  }
 *			  },
 *			  {
 *				attrName : 'planId',
 *				renderer :  {
 *				  fn : Heron.widgets.GridCellRenderer.browserPopupLink,
 *				  options : {
 *					url: 'http://resources.com/plans/show?id={planId}',
 *					winName: 'demoWin',
 *					width: 400,
 *					height: 800,
 *					scrollbars: 'yes'
 *				}
 *			   }
 *			 ]
 *			 }
 *		 }
 *
 */

Ext.namespace("Heron.widgets");

/** api: constructor
 *  .. class:: GridCellRenderer()
 *
 *  Functions for custom rendering of features within Grids like GetFeatureInfo.
 *
 * Global Singleton class.
 * See http://my.opera.com/Aux/blog/2010/07/22/proper-singleton-in-javascript
 *
 */
Heron.widgets.GridCellRenderer =

		(function() { // Creates and runs anonymous function, its result is assigned to Singleton

			// Any variable inside function becomes "private"

			/** Private functions. */

			/** Substitute actual values from record in template {attrName}'s in given template. */
			function substituteAttrValues(template, options, record) {
				// One-time parse out attr names (should use RegExp() but this is quick for now)
				if (!options.attrNames) {
					options.attrNames = new Array();
					var inAttrName = false;
					var attrName = '';
					for (var i = 0; i < template.length; i++) {
						var s = template.charAt(i);
						if (s == '{') {
							inAttrName = true;
							attrName = '';
						} else if (s == '}') {
							options.attrNames.push(attrName)
							inAttrName = false;
						} else if (inAttrName) {
							attrName += s;
						}
					}
				}
				var result = template;
				for (var j=0; j < options.attrNames.length; j++) {
					var name = options.attrNames[j];
					var value = record.data[name];
					if (!value) {
						// Default: remove at least when empty value
						value='';
					}
					var valueTemplate = '{' + name + '}';

					result = result.replace(valueTemplate, value);
				}
				return result;

			}

			/** This is a definition of our Singleton, it is also private, but we will share it below */
			var instance = {
				directLink : function(value, metaData, record, rowIndex, colIndex, store) {
					if (!this.options) {
						return value;
					}

					var options = this.options;

					var url = options.url;
					if (!url) {
						return value;
					}

					url = substituteAttrValues(url, options, record);

					var result = '<a href="' + url + '" target="{target}">' + value + '</a>';
					var target = options.target ? options.target : '_new';
					var targetTemplate = '{target}';

					return result.replace(targetTemplate, target);
				},

				/**
				 * Render with a link to a browser popup window "Explorer Window".
				 * @param value - the attribute (cell) value
				 */
				browserPopupLink : function(value, metaData, record, rowIndex, colIndex, store) {
					if (!this.options) {
						return value;
					}

					var options = this.options;

					var templateURL = options.url;
					if (!templateURL) {
						return value;
					}

					var winName = options.winName ? options.winName : 'herongridcellpopup';
					var url = substituteAttrValues(templateURL, options, record);

					// "<a href="#" onclick="Heron.Utils.openBrowserWindow('http://en.wikipedia.org/wiki/{Country}', false,'http://en.wikipedia.org/wiki/Peru')">Peru</a>"
					return '<a href="#" onclick="' + 'Heron.Utils.openBrowserWindow(\'' + winName + '\', false,\'' + url + '\'); return false">' + value + '</a>';
				},

				/**
				 * Custom rendering for any template.
				 * @param value - the attribute (cell) value
				 */
				valueSubstitutor : function(value, metaData, record, rowIndex, colIndex, store) {
					if (!this.options) {
						return value;
					}

					var options = this.options;

					var template = options.template;
					if (!template) {
						return value;
					}

					return substituteAttrValues(template, options, record);
				}

			};

			// Simple magic - global variable Singleton transforms into our singleton!
			return(instance);

		})();

