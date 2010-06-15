/*
 * Copyright (C) 2010  Het Kadaster
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

GeoViewer.main = function()
{
	var viewport;
	var mainPanel;
	var totalPanel;
	var allPanels = [];

	return {
		create : function() {
			// Map+Feature info panels in one
			this.createMainPanel();

			// NSWE panels
			this.createSidePanels();

			totalPanel = new Ext.Panel({
				region : "center",
				renderTo :"gv-mainpanel",
				layout : "border",
				forceLayout: true,
				items: allPanels
			});

			return totalPanel;
		},

		createMainPanel : function() {
			Ext.QuickTips.init();

			mainPanel = new GeoViewer.MainPanel({id: 'gv-center-panel', region:"center"});
			allPanels.push(mainPanel);

			return mainPanel;
		},

		createSidePanels : function() {
			if (GeoViewer.layout.north) {
				allPanels.push(this.createSidePanel('north'));
			}

			if (GeoViewer.layout.south) {
				allPanels.push(this.createSidePanel('south'));
			}

			if (GeoViewer.layout.east) {
				allPanels.push(this.createSidePanel('east'));
			}

			if (GeoViewer.layout.west) {
				allPanels.push(this.createSidePanel('west'));
			}
		},

		showFullScreen : function() {
			viewport = new Ext.Viewport({
				id	:"gv-viewport",
				layout: "fit",
				hideBorders: true,

				items: [totalPanel]
			});

			viewport.show();
		},

		createSidePanel : function(region) {
			var config = GeoViewer.layout[region];

			var panel = new GeoViewer.SidePanel({
				id		: 'gv-' + region + '-panel',
				config	: config,
				collapsible: config.collapsible,
				map		: mainPanel.mapPanel.map
			});

			panel.region = region;

			return panel;
		},

		getMainPanel : function() {
			return mainPanel;
		},

		getMap : function() {
			return mainPanel.mapPanel.map;
		},

		getTotalPanel : function() {
			return totalPanel;
		},

		doLayout : function() {
			if (viewport) {
				viewport.doLayout(true, false);
			}
		}
	};
}();

