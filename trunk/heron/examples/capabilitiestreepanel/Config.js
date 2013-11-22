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

/** This config assumes the DefaultOptionsNL.js to be included first!! */


/** api: example[capabilitiestreepanel]
 *  CapabilitiesTreePanel
 *  ---------------------
 *  Populate a layer tree from a WMS GetCapabilties result.
 */


OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

Ext.BLANK_IMAGE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/images/default/s.gif';

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) components.
 * Each component is either a container of components (xtype: 'panel', i.e. an ExtJS Panel)
 * or a specific leaf component like a map panel (xtype: 'hr_mappanel') or simple HTML
 * panel (xtype: 'hr_htmlpanel'). Each component has a 'xtype' string and component-specific options.
 * The 'xtype' defines the component widget class .
 * For a container-type (xtype: 'panel') the options should include a 'layout' (like 'border' or 'card',
 * and an array of 'items' with each element being a component (another container or a leaf widget component).
 *
 * In order to distinguish ExtJS-specific config options from those that are Heron-specific,
 * the later are prefixed with "hr". These are defined outside this file to allow quick custimization.
 *
 * Specific config options for ExtJS components can be found in the API docs:
 * http://dev.sencha.com/deploy/ext-3.4.0/docs
 *
 **/
Ext.namespace("Heron.layout");
Heron.layout = {
	xtype: 'panel',

	/* Optional ExtJS Panel properties, see ExtJS API docs. */
	id: 'hr-container-main',
	layout: 'border',
	border: true,

	items: [
		{
			xtype: 'panel',

			id: 'hr-menu-left-container',
			layout: 'accordion',
			region : "west",
			width: 240,
			collapsible: true,
			split	: false,
			border: false,
			items: [
				{
					/** The TreePanel populated from a GetCapabilities request. */
					title: 'TreePanel : Demis',
					xtype: 'hr_capabilitiestreepanel',
					autoScroll: true,
					useArrows: true,
					animate: true,
					hropts: {
						text: 'Demis WMS Layers',
						preload: true,
						url: 'http://www2.demis.nl/WMS/wms.asp?'
					}
				},
/*				{
					title: 'FAO WMS',
					xtype: 'hr_capabilitiestreepanel',
					autoScroll: true,
					useArrows: true,
					animate: true,
					hropts: {
						text: 'FAO WMS Layers',
						preload: true,
						url: 'http://data.fao.org/geo/wms?'
					}
				}, */

				{
					xtype: 'hr_htmlpanel',
					id: 'hr-info-west',
					html: '<div class="hr-html-panel-body"><p>This is an example for populating a Layer Tree from a GetCapabilities request</p>' +
							'<p>See the config here: <a href="Config.js" target="_new">Config.js</a></p></div>',
					preventBodyReset: true,
					title: 'Info'
				}
			]
		},
		{
			/** The MapPanel */
			xtype: 'hr_mappanel',
			title: '&nbsp;',
			id: 'hr-map',
			region: 'center',
			collapsible : false,
			border: false,
			hropts: {
				settings: {
					allOverlays: true,
					theme: null
				},
				layers: null
			}
		}
	]
};
