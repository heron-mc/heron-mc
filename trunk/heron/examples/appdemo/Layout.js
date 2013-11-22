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

/** api: example[appdemo]
 *  Full App Demo
 *  -------------
 *  Full, self-contained, application demo showing basics of Hero configuration and styling/language options.
 */

Ext.namespace("Heron");
Ext.namespace("Heron.options");

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
 * http://docs.sencha.com/ext-js/3-4/#!/api
 *
 **/
Heron.layout = {
	xtype: 'panel',

	/* Optional ExtJS Panel properties, see ExtJS API docs. */
	id: 'hr-container-main',
    layout: 'border',

	items: [
		{
			xtype: 'panel',

			id: 'hr-menu-left-container',
			layout: 'accordion',
			region: "west",
			width: 240,
			collapsible: true,
			split: true,
			border: false,
			items: [
				{
					xtype: 'hr_layertreepanel',

                    contextMenu: [
                         {
                             xtype: 'hr_layernodemenulayerinfo'
                         },
                         {
                             xtype: 'hr_layernodemenuzoomextent'
                         },
                         {
                             xtype: 'hr_layernodemenuopacityslider'
                         }
                     ]
// Below is the default configuration for the LayerTreePanel widget
//					hropts: {tree: [
//						{
//							// Include all BaseLayers present in Map
//							text: __('BaseMaps'), nodeType: "gx_baselayercontainer",	expanded: true
//						},
//						{
//							// Include all OverlayLayers present in Map
//							text: __('Overlays'), nodeType: "gx_overlaylayercontainer", expanded: true
//						}
//
//					] }
				},


				/** Populates Layer tree from WMS GetCapabilities. */
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
					// See HTML content in Options.js
					html: Heron.options.info.html,
					preventBodyReset: true,
					title: 'Info'
				},
				{
					xtype: 'hr_bookmarkspanel',
					id: 'hr-bookmarks',
					/** The contexts (see Options.js) to create bookmarks in the bookmarks panel. */
					hropts: Heron.options.bookmarks
				}
			]
		},
		{
			xtype: 'panel',

			id: 'hr-map-and-info-container',
			layout: 'border',
			region: 'center',
			width: '100%',
			// collapsible: true,
			split	: true,
			border: false,
			items: [
				{
					// The Map
					xtype: 'hr_mappanel',
					id: 'hr-map',
					region: 'center',
					collapsible: false,
					border: false,
					// See Options.js
					hropts: Heron.options.map
				}/*,
				{
					xtype: 'hr_featureinfopanel',
					id: 'hr-feature-info',
					region: "south",
					border: true,
					collapsible: true,
					collapsed: true,
					height: 205,
					split: true,
					maxFeatures: 10
				} */
			]
		},
		{
			xtype: 'panel',

			id: 'hr-menu-right-container',
			layout: 'accordion',
			region: "east",
			width: 200,
			collapsible: true,
			collapsed: false,
			split: true,
			border: false,
			items: [
				{
					xtype: 'hr_layerlegendpanel',

                    bodyStyle: 'padding:10px 10px',
                    border: false,
					defaults: {
						// see GeoExt
						labelCls: 'hr-legend-panel-header',
	 	 				useScaleParameter: true,
		 				baseParams: {
		     				// Override default image/gif in WMS GetLegendGraphic
			 				FORMAT: 'image/png',
			 				// legend parameters
			 				LEGEND_OPTIONS: 'forceLabels:on;fontName=Verdana;fontSize:11'
		 				}
	 				},
					hropts: {
						// Preload Legends on initial startup
						// Will fire WMS GetLegendGraphic's for WMS Legends
						// Otherwise Legends will be loaded only when Layer
						// becomes visible. Default: false
						prefetchLegends: false
					}
				}
			]
		}
	]
};
