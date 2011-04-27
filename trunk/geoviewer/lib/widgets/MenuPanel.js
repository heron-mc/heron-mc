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

GeoViewer.MenuHandler =
{
	options: null,

	init : function(options) {
		// Set the default content to show. Do this once only
		if (options && !GeoViewer.MenuHandler.options) {
			GeoViewer.MenuHandler.options = options;
			GeoViewer.MenuHandler.setActiveCard(options.defaultCard);
			GeoViewer.MenuHandler.loadPage(options.defaultPage);
		}
	},

	onSelect : function(item) {
		GeoViewer.MenuHandler.setActiveCard(item.card);
		GeoViewer.MenuHandler.loadPage(item.page);
	},

	loadPage : function(page) {
		if (page && GeoViewer.MenuHandler.options.pageContainer && GeoViewer.MenuHandler.options.pageRoot) {
			Ext.getCmp(GeoViewer.MenuHandler.options.pageContainer).load(
					GeoViewer.MenuHandler.options.pageRoot + '/' + page + '.html?t=' + new Date().getMilliseconds()
					);
		}
	},

	setActiveCard : function(card) {
		if (card && GeoViewer.MenuHandler.options.cardContainer) {
			Ext.getCmp(GeoViewer.MenuHandler.options.cardContainer).getLayout().setActiveItem(card);
		}
	}
};

/**
 * Panel with an embedded menubar.
 */
GeoViewer.MenuPanel = Ext.extend(
		Ext.Panel,
{
	/**
	 * Constructor: create and layout Menu from config. */

	initComponent : function() {
		this.addListener('afterrender', function() {
			if (this.options) {
				GeoViewer.MenuHandler.init(this.options);
			}
 		});
		GeoViewer.MenuPanel.superclass.initComponent.apply(this, arguments);
	}

});

/** api: xtype = gv_menupanel */
Ext.reg('gv_menupanel', GeoViewer.MenuPanel);

