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

// Define here for now as this file is always included but we need a better way
Proj4js.defs["EPSG:28992"] = "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.999908 +x_0=155000 +y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812 +no_defs";

Heron.App = function() {
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
				items: [Heron.layout]
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

