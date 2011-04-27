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

/**
 * Defines the entire layout of the webapp using ExtJS-style.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) components.
 * Each component is either a container of components (type: 'gv-container')
 * or a specific leaf component like a map panel (type: 'gv-map') or simple HTML
 * panel (type: 'gv-html'). Each component has a 'type' string and an 'options' object.
 * The 'type' defines the basic type and the 'options' the component-specific options.
 * For a container-type the options should include a 'layout' (like 'border' or 'card',
 * and an array of 'items' with each element being a component (container or leaf component).
 *
 * TODO use true ExtJS config style using 'xtype' and global registry of user-defined components
 **/
GeoViewer.layout = {
	type: 'gv-container',
	options : {
		id: 'gv-container-main',
		layout: 'border',
		renderTo : 'gv-mainpanel',
		width: '100%',
		height: '100%',
		forceLayout: true,
		bodyBorder: false,
		border: false,

		items: [
			{
				type: 'gv-container',
				options : {
					id: 'gv-menu-left-container',
					layout: 'accordion',
					region : "west",
					width: 240,
					collapsible: true,
					split	: true,
					border: false,
					items: [
						{
							type: 'gv-layer-browser'
						},

						{
							type: 'gv-html',
							options: {
								id: 'gv-info-west',
								html: '<div class="gv-html-panel-body"><p>Dit is de GeoViewer van Het Kadaster GEORZ Lab.' +
										'</p><br/><p>Deze viewer en in feite de gehele website is gemaakt met het Open Source' +
										' project <a href="http://code.google.com/p/geoext-viewer/" target="_new" >GeoExt Viewer</a>' +
										', o.a. in samenwerking met <a href="http://www.geodan.nl" target="_new">Geodan</a>. Deze op ' +
										'<a href="http://geoext.org">GeoExt</a>-gebaseerde Viewer is zeer flexibel en uitbreidbaar ' +
										'zodat deze gemakkelijk in meerdere projecten kan worden ingezet. Zie als voorbeeld ook de ' +
										'<a href="http://inspire.kademo.nl" target="_new">GeoViewer voor Kademo INSPIRE</a>.</p><br/></div>',
								preventBodyReset: true,
								title: 'Info'
							}
						},
						{
							type: 'gv-context-browser'
						},
						{
							type: 'gv-layer-legend'
						}
					]
				}
			},
			{
				type: 'gv-container',
				options : {
					id: 'gv-map-and-info-container',
					layout: 'border',
					region: 'center',
					width: '100%',
					collapsible: true,
					split	: true,
					border: false,
					items: [
						{
							type: 'gv-map',
							options: {
								id: 'gv-map',
								region: 'center',
								collapsible : false,
								border: false
							}
						},
						{
							type: 'gv-feature-info',
							options: {
								id: 'gv-feature-info',
								region: "south",
								border: true,
								collapsible: true,
								collapsed: true,
								height: 205,
								split: true,
								maxFeatures: 10
							}
						}
					]
				}
			}
		]
	}
};
