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

Ext.namespace("GeoViewer.User");

var Pages = function() {
	return {
		showPage : function(pageName) {
			Pages.setActiveItem('gv-content-main');
			Pages.doLoad(pageName);
		},

		setActiveItem : function(elmId) {
			Ext.getCmp('gv-container-center').getLayout().setActiveItem(elmId);
		},

		showMapItem : function() {
            Pages.setActiveItem('gv-geo-main');
		},

		doLoad : function(pageName) {
			Ext.getCmp('gv-content-main').load(
				'content/' + pageName + '.html?t=' + new Date().getMilliseconds()
			);
		}
	};
}();

GeoViewer.User.createPanel = function(options) {
	var menuHandler = function(button) {
		Pages.showPage(button.page);
	};

	var menu;
	menu = new Ext.Toolbar({
		id: 'gv-main-menu',
		floating: false,
		items: [
			{
				xtype: 'tbspacer',
				width: 240
			},
			{
				xtype: 'tbbutton',
				text: 'Map',
				handler: Pages.showMapItem
			},
			{
				xtype: 'tbspacer'
			},
			{
				xtype: 'tbbutton',
				text: 'Projects',
				menu: [
					{
						text: 'INSPIRE',
						page: 'inspire',
						handler: menuHandler
					},
					{
						text: 'GEORZ Lab',
						page: 'georzlab',
						handler: menuHandler
					},
					{
						text: 'iFramed Content',
						page: 'iframed',
						handler: menuHandler
					},
					{
						text: 'Shibboleth'
					},
					{
						text: 'Klic Online Mobile'
					}
				]
			},
			{
				xtype: 'tbspacer'
			},
			{
				xtype: 'tbbutton',
				text: 'MoreMenu',
				menu: [
					{
						text: 'Item One'
					},
					{
						text: 'Item Two'
					},
					{
						text: 'Item Three'
					}
				]
			}
		]
	});


	var panel = new Ext.Panel(options);
	panel.add(menu);


	return panel;
};

/**
 * Show default page.
 */
Ext.onReady(function() {
	Pages.showPage('inspire');
}, Pages);
