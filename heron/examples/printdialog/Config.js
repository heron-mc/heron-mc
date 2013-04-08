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

/** api: example[printdialog]
 *  PrintDialog
 *  -----------
 *  Printing with popup dialog containing preview and print options.
 */

Heron.options.map.settings.zoom = 12;
Heron.options.map.settings.center = '193742,468919';


// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{type: "printdirect", options: {url: 'http://kademo.nl/print/pdf28992'
									// , mapTitle: 'My Header - Direct Print'
									// , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
									// , mapComment: 'My Comment - Direct Print'
									// , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
									// , mapFooter: 'My Footer - Direct Print'
									// , mapFooterYAML: "mapFooter"	// MapFish - field name in config.yaml - default is: 'mapFooter'
									// , mapPrintLayout: "A4"			// MapFish - 'name' entry of the 'layouts' array or Null (=> MapFish default)
									// , mapPrintDPI: "75"				// MapFish - 'value' entry of the 'dpis' array or Null (=> MapFish default)
									// , mapPrintLegend: true
									// , legendDefaults: {
									//     useScaleParameter : false,
									//     baseParams: {FORMAT: "image/png"}
									//   }
									}},
	{type: "printdialog", options: {url: 'http://kademo.nl/print/pdf28992', windowWidth: 360
									// , showTitle: true
									// , mapTitle: 'My Header - Print Dialog'
									// , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
									// , showComment: true
									// , mapComment: 'My Comment - Print Dialog'
									// , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
									// , showFooter: true
									// , mapFooter: 'My Footer - Print Dialog'
									// , mapFooterYAML: "mapFooter"	// MapFish - field name in config.yaml - default is: 'mapFooter'
									// , showRotation: true
									// , showLegend: true
									// , showLegendChecked: true
									// , mapLimitScales: false
									}}
];

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 **/
Heron.layout = {
	xtype: 'panel',
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
					xtype: 'hr_layertreepanel',
					hropts: Heron.options.layertree
				}
			]
		},
		{
			xtype: 'panel',

			id: 'hr-map-and-info-container',
			layout: 'border',
			region: 'center',
			width: '100%',
			collapsible: false,
			split	: false,
			border: false,
			items: [
				{
					xtype: 'hr_mappanel',
					title: '&nbsp;',
					id: 'hr-map',
					region: 'center',
					collapsible : false,
					border: false,
					hropts: Heron.options.map
				}
			]
		},
		{
			xtype: 'panel',

			id: 'hr-menu-right-container',
			layout: 'accordion',
			region : "east",
			width: 240,
			collapsible: true,
			split	: false,
			border: false,
			items: [
				{
					xtype: 'hr_layerlegendpanel',
					id: 'hr-layerlegend-panel',
					defaults: {
						useScaleParameter : true,
						baseParams: {
							FORMAT: 'image/png'
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

Ext.namespace("Heron.examples");

/** Create a config for the search panel. This panel may be embedded into the accordion
 * or bound to the "find" button in the toolbar. Here we use the toolbar button.
 */
Heron.examples.searchPanelConfig = {
	xtype: 'hr_searchcenterpanel',
	id: 'hr-searchcenterpanel',
	title: __('Search'),
	height: 600,
	border: false,
	hropts: {
		searchPanel: {
			xtype: 'hr_formsearchpanel',
			id: 'hr-searchpanel',
			header: false,
			border: false,
			bodyStyle: 'padding: 6px',
			style: {
				fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
				fontSize: '12px'
			},
			protocol: new OpenLayers.Protocol.WFS({
				version: "1.1.0",
				url: "http://kademo.nl/gs2/wfs?",
				srsName: "EPSG:28992",
				featureType: "hockeyclubs",
				featureNS: "http://innovatie.kadaster.nl"
			}),
			items: [
				{
					xtype: "textfield",
					name: "name__like",
					value: 'H.C.',
					fieldLabel: "  name"
				},
				{
					xtype: "label",
					id: "helplabel",
					html: 'Type name of an NL hockeyclub, wildcards are appended<br/>Any single letter will also yield results.<br/>',
					style: {
						fontSize: '10px',
						color: '#AAAAAA'
					}
				}
			],
			hropts: {
				onSearchCompleteZoom : 10,
				autoWildCardAttach : true
			}
		},
		resultPanel: {
			xtype: 'hr_featselgridpanel',
			id: 'hr-featselgridpanel',
			title: __('Search'),
			header: false,
			border: false,
			columns: [
				{
					header: "Name",
					width: 100,
					dataIndex: "name",
					type: 'string'
				},
				{
					header: "Desc",
					width: 200,
					dataIndex: "cmt",
					type: 'string'
				}
			],
			hropts: {
				zoomOnRowDoubleClick : true,
				zoomOnFeatureSelect : false,
				zoomLevelPointSelect : 8
			}
		}
	}
};

Heron.options.map.toolbar.push({type: "-"});

Heron.options.map.toolbar.push(
		{
			type: "searchcenter",
			// Options for SearchPanel window
			options : {
				searchWindow : {
					title: undefined,
					x: 100,
					y: undefined,
					width: 320,
					height: 400,
					items: [
					  Heron.examples.searchPanelConfig
					]
				}
			}
		}
);

