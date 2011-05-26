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
 *  class = SearchPanel
 *  base_link = `Ext.form.ComboBox <http://dev.sencha.com/deploy/dev/docs/?class=Ext.form.ComboBox>`_
 */

/** api: constructor
 *  .. class:: SearchPanel(config)
 *
 *  A panel designed to hold a (geo-)search form.
 */
Heron.widgets.SearchPanel = Ext.extend(GeoExt.form.FormPanel, {

// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
	initComponent: function() {
		Ext.apply(this, this.hropts);
		Ext.apply(this.initialConfig, this.hropts);

		var self = this;

		this.listeners = {
			actioncomplete: function(form, action) {
				// this listener triggers when the search request
				// is complete, the OpenLayers.Protocol.Response
				// resulting from the request is available
				// in "action.response"
				self.action = action;

				if (self.searchComplete) {
					self.searchComplete(self, action);
				}
			}
		};

		Heron.widgets.SearchPanel.superclass.initComponent.call(this);

		this.addButton({
			text: __('Search'),
			handler: function() {
				self.action = null;
				self.search();
			},
			scope: self
		});
	}
});
/** api: xtype = hr_searchpanel */
Ext.reg('hr_searchpanel', Heron.widgets.SearchPanel);

