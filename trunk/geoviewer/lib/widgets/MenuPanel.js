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
Ext.namespace("Heron");

/**
 * Global MenuHandler object, defined as Singleton.
 *
 * See http://my.opera.com/Aux/blog/2010/07/22/proper-singleton-in-javascript
 **/
Heron.MenuHandler =

		(function() { // Creates and runs anonymous function, its result is assigned to Singleton

			// Any variable inside function becomes "private"

			/** Holds menu handler options like pageroot dir and content container. */
			var options = null;

			/** Private functions. */

			/** Load page from content root into page container element/component. */
			function loadPage(page) {
				if (page && options.pageContainer && options.pageRoot) {
					Ext.getCmp(options.pageContainer).load(
							options.pageRoot + '/' + page + '.html?t=' + new Date().getMilliseconds()
							);
				}
			}

			/** Set a Panel (card) in card layout to become active. */
			function setActiveCard(card) {
				if (card && options.cardContainer) {
					Ext.getCmp(options.cardContainer).getLayout().setActiveItem(card);
				}
			}

			/** This is a definition of our Singleton, it is also private, but we will share it below */
			var instance = {

				init : function(hroptions) {
					// Set the default content to show. Do this once only.
					if (hroptions && !options) {
						options = hroptions;
						setActiveCard(options.defaultCard);
						loadPage(options.defaultPage);
					}
				},

				onSelect : function(item) {
					setActiveCard(item.card);
					loadPage(item.page);
				}

			};

			// Simple magic - global variable Singleton transforms into our singleton!
			return(instance);

		})();

/**
 * Panel with an embedded menubar.
 */
Heron.MenuPanel = Ext.extend(
		Ext.Panel,
{
	/**
	 * Constructor: create and layout Menu from config.
	 **/
	initComponent : function() {
		// All other components like content panels have to be created, so do this after rendering
		this.addListener('afterrender', function() {
			if (this.hropts) {
				// Init global singleton menu handler
				// TODO if we ever need more handlers we may put them in a global map
				Heron.MenuHandler.init(this.hropts);
			}
		});
		Heron.MenuPanel.superclass.initComponent.apply(this, arguments);
	}
});

/** api: xtype = gv_menupanel */
Ext.reg('gv_menupanel', Heron.MenuPanel);

