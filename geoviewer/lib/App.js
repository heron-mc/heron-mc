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
Ext.namespace("GeoViewer");

GeoViewer.App = function() {
	var viewport, map, mapPanel;

	return {
		create : function() {
			// Map+Feature info panels in one
			Ext.QuickTips.init();
		},

		showFullScreen : function() {
			viewport = new Ext.Viewport({
				id	:"gv-viewport",
				layout: "fit",
				hideBorders: true,

				// This creates the entire layout from the config !
				items: [GeoViewer.layout]
			});
			viewport.show();
		},

		getMap : function() {
			return map;
		},

		setMap : function(aMap) {
			map = aMap;
		},

		getMapPanel : function() {
			return mapPanel;
		},

		setMapPanel : function(aMapPanel) {
			mapPanel = aMapPanel;
		},

		doLayout : function() {
			if (viewport) {
				viewport.doLayout(true, false);
			}
		}
	};
}();

