/*
 * Copyright (C) 2011  Het Kadaster - The Netherlands
 *
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

Ext.namespace("GeoViewer");

/** api: constructor
 *  .. class:: ContextBrowserPanel(config)
 *
 *  A panel designed to hold link shortcuts to map contexts (layers/zoom/center).
 */
GeoViewer.ContextBrowserPanel = Ext.extend(GeoViewer.HTMLPanel, {

	initComponent : function() {
		GeoViewer.ContextBrowserPanel.superclass.initComponent.call(this);
		this.id = 'gv-context-browser';
		this.title = __('Shortcuts');

		this.html = '<div class="gv-html-panel-body">';

		var contexts = GeoViewer.contexts;
		if (typeof(contexts) !== "undefined") {
			for (var i = 0; i < contexts.length; i++) {
				this.html += '<a href="#" title="' + contexts[i].desc + '" onclick="GeoViewer.main.setMapContext(\'' + contexts[i].id + '\'); return false;">' + contexts[i].name + '</a><br/>';
			}
		}
		this.html += '</div>';
	}
});

/** api: xtype = gv_contextbrowserpanel */
Ext.reg('gv_contextbrowserpanel', GeoViewer.ContextBrowserPanel);

