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
 *					url: 'http://resources.com/contracts/show?id={contractId}'
 *					target: '_new'
 *				  }
 *			  },
 *			  {
 *				attrName : 'planId',
 *				renderer :  {
 *				  fn : Heron.widgets.GridCellRenderer.browserPopupLink,
 *				  options : {
 *					url: 'http://resources.com/plans/show?id={planId}',
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

					var valueTemplate = '{' + this.dataIndex + '}';

					url = url.replace(valueTemplate, value);
					var result = '<a href="'+ url + '" target="{target}">' + value + '</a>';
					var target = options.target ? options.target : '_new';
					var targetTemplate = '{target}';
 
					result = result.replace(targetTemplate, target);
					return result;
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

					var url = options.url;
					if (!url) {
						return value;
					}

					var valueTemplate = '{' + this.dataIndex + '}';

					url = url.replace(valueTemplate, value);
					// "<a href="#" onclick="Heron.Utils.openBrowserWindow('http://en.wikipedia.org/wiki/{Country}', false,'http://en.wikipedia.org/wiki/Peru')">Peru</a>"
					var result = '<a href="#" onclick="' + 'Heron.Utils.openBrowserWindow(\'' + options.url + '\', false,\'' + url + '\'); return false">' + value + '</a>';
					return result;
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

					var valueTemplate = '{' + this.dataIndex + '}';

					value = template.replace(valueTemplate, value);
					return value;
				}

			};

			// Simple magic - global variable Singleton transforms into our singleton!
			return(instance);

		})();

