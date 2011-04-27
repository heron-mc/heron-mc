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

Ext.namespace("GeoViewer.site");

var menuHandler = function(button) {
	if (button.card) {
		Ext.getCmp('gv-container-center').getLayout().setActiveItem(button.card);
	}

	if (button.page) {
		Ext.getCmp('gv-content-main').load(
				'content/' + button.page + '.html?t=' + new Date().getMilliseconds()
				);
	}
};

GeoViewer.site.menuBar = {
	id: 'gv-menu-bar',
	xtype: 'toolbar',
	floating: false,
	items:[
		{
			xtype: 'tbspacer',
			width: 240
		},
		{
			xtype: 'tbbutton',
			text: 'Map',
			card: 'gv-geo-main',
			handler: menuHandler
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
					card: 'gv-content-main',
					page: 'inspire',
					handler: menuHandler
				},
				{
					text: 'GEORZ Lab',
					card: 'gv-content-main',
					page: 'georzlab',
					handler: menuHandler
				},
				{
					text: 'iFramed Content',
					card: 'gv-content-main',
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
};


/**
 * Show default page.

 Ext.onReady(function() {
 Pages.showPage('inspire');
 }, Pages);
 */