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

GeoViewer.layout.north = {
	options : {
		layout: 'border',
		width: '100%',
		height: 80,
		bodyBorder: false,
		border: false
	},
	panels: [
		{
			type: 'gv-html',
			options: {
				id: 'gv-logo-panel',
				region: 'center',
				bodyBorder: false,
				border: false,
				url: 'north-logo.html',
				height: 55
			}
		},
		{
			type: 'gv-user',
			options: {
				id: 'gv-menu-panel',
				region: 'south',
				bodyBorder: false,
				border: false,
				height: 25
			}
		}
	]
};

var Pages = function() {
	return {
		showPage : function(pageName) {
			Pages.hideMap();
			Pages.doLoad(pageName);
			Ext.get('gv-page').show();
		},

		hideMap : function() {
			Ext.get('gv-west-panel').hide();
			Ext.get('gv-center-panel').hide();
		},

		showMap : function() {
			Ext.get('gv-page').hide();
			Ext.get('gv-west-panel').show();
			Ext.get('gv-center-panel').show();
			// GeoViewer.main.doLayout();
		},

		doLoad : function(pageName) {
			Ext.get('gv-page').load({
				url: 'content/' + pageName + '.html?t=' + new Date().getMilliseconds()
			});
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
				handler: Pages.showMap
			},
			{
				xtype: 'tbspacer'
			},
			{
				xtype: 'tbbutton',
				text: 'Projecten',
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
}


/**
 * Invokes GeoViewer as full screen app.
 */
Ext.onReady(function() {
	GeoViewer.main.create();
	GeoViewer.main.showFullScreen();
}, GeoViewer.main);

