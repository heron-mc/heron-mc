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

// No Pink Tiles
OpenLayers.Util.onImageLoadErrorColor = "transparent";

/** Proxy: required when non-image content is requested from other origins then this app. */
//OpenLayers.ProxyHost = "proxy/proxy.cgi?url=";
//OpenLayers.ProxyHost = "../proxy/proxy.jsp?";

function is_mobile(a) { 
		return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)); 
}
if (is_mobile(navigator.userAgent)) {
	console.log("Mobile");
	/** Defines the layout of the entire PDOK Viewer as a JSON struct.*/
	Heron.layout = {
		xtype: 'panel',
		renderTo: 'mapdiv',
		height: 650,
		
		/* Specificeer hier het pad of remote URL naar merged of unmerged XML Heron Map Context file. */
		mapContextUrl: 'config/default.xml',
		mapContextOptions: {
			// mapContextOptions: 'options for loading the xml defined in mapContextUrl'
				showLoadMask: false
				// showLoadMask: 'show a load mask while loading the xml defined in mapContextUrl, default is true',
			},

		/* Optional ExtJS Panel properties, see ExtJS API docs. */
		id: 'hr-container-main',
		layout: 'border',
		border: true,
		items: [
			{	xtype: 'panel',
				id: 'hr-container-north',
				region: 'north',
				layout: 'border',
				width: '100%',
				height: 166,
				bodyBorder: false,
				border: false,
				items: [
					{
						xtype: 'hr_htmlpanel',
						id: 'hr-logo-panel',
						region: 'center',
						bodyBorder: false,
						border: false,
						autoLoad: 
						{
							url: 'header.html'
						},
						height: 166
					}
				]
			},
			{
				xtype: 'panel',
				id: 'hr-menu-left-container',
				layout: 'accordion',
				region: 'west',
				width: 285,
				collapsible: true,
				split: true,
				border: false,
				items: [
					{
						/** Shows selected layers stacked */
						xtype: 'hr_activelayerspanel',
						collapsed: true,
						flex: 2,
						hropts: {
							/**
							 * Defines the custom component added
							 * under the standard layer node.
							 */
							component: {
								xtype: "gx_opacityslider",
								showTitle: false,
								plugins: new GeoExt.LayerOpacitySliderTip(),
								width: 160,
								inverse: false,
								aggressive: false,
								style: {
									marginLeft: '18px'
								}
							}
						}
					},
					{
						/** Shows the tree structure for all Layers. */
						xtype: 'hr_layertreepanel',
						id: 'hr_treelayer',
						flex: 1,

						// The LayerTree tree nodes appearance: default is ugly ExtJS document icons
						// Other values are 'none' (no icons). May be overridden in specific 'gx_layer' type config.
						layerIcons: 'bylayertype',

						contextMenu: [
							{
								xtype: 'hr_layernodemenulayerinfo'
							},
	//                                {
	//                                    xtype: 'hr_layernodemenuzoomextent'
	//                                },
	//                                {
	//                                    xtype: 'hr_layernodemenustyle'
	//                                },
							{
								xtype: 'hr_layernodemenuopacityslider'
							}
						],

						// LayerTree and Map config is taken from global Heron context
						// See Heron.layout.mapContextUrl above.
						useMapContext: true
						/* LayerTree is populated from .xml config file(s). */
						// hropts: Heron.options.layertree
					}
					,
					{
						/** The TreePanel to be populated from a GetCapabilities request. */
						title: 'Capabilities',
						xtype: 'hr_capabilitiesviewpanel',
						useArrows: true,
						animate: true,
						hropts: {
							preload: false
						}
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
				split: false,
				border: false,
				items: [
					{
						xtype: 'hr_mappanel',
						id: 'hr-map',
						region: 'center',
						collapsible: false,
						border: false,

						// MapOptions (settings+Layers) is populated from .xml config file(s).
						// See Heron.layout.mapContextUrl above.
						useMapContext: true,

						hropts: {
							toolbar: [
								{
									type: "featureinfo", options: {
									popupWindow: {
										pressed: true,
										title: 'Objectinformatie',
										width: 500,
										height: 200,
										featureInfoPanel: {
											showTopToolbar: true,

											// Option values are 'Grid', 'Tree' and 'XML', default is 'Grid' (results in no display menu)
											displayPanels: ['Detail', 'Table'],
											// Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
											exportFormats: [],
											// exportFormats: ['CSV', 'XLS'],
											hideColumns: [],

											maxFeatures: 10,
											autoConfigMaxSniff: 10,

											discardStylesForDups: true
										}
									}
								}
								},
								{
									type: "-"
								},
								{
									type: "pan"
								},
								{
									type: "zoomin"
								},
								{
									type: "zoomout"
								},
								{
									type: "zoomvisible"
								},
								{
									type: "-"
								},
								{
									type: "zoomprevious"
								},
								{
									type: "zoomnext"
								},
								{
									type: "-"
								},
								{
									type: "measurelength"
								},
								{
									type: "measurearea"
								},
								{type: "coordinatesearch", options: {

									// === Full demo configuration ===

									// see ToolbarBuilder.js
									formWidth: 320,
									formPageX: 15,
									formPageY: 100
									// see CoordSearchPanel.js
									// , title: 'My title'
									,titleDescription: 'Kies eventueel een projectie systeem.<br>Voer dan X/Y-coordinaten (RD) of Lon/Lat-waarden in.<br>&nbsp;<br>',
									titleDescriptionStyle: 'font-size:11px; color:dimgrey;',
									bodyBaseCls: 'x-form-back',

									bodyItemCls: 'hr-html-panel-font-size-11',
									bodyCls: 'hr-html-panel-font-size-11',
									fieldMaxWidth: 200,
									fieldLabelWidth: 80,
									fieldStyle: 'color: 0x333333;',
									fieldLabelStyle: 'color: darkblue',
									layerName: 'Locatie NL - RD',
									onProjectionIndex: 1,
									onZoomLevel: -1,
									showProjection: true,
									showZoom: true,
									showAddMarkers: true,
									checkAddMarkers: true,
									showHideMarkers: true,
									checkHideMarkers: false,
									removeMarkersOnClose: true,
									showRemoveMarkersBtn: true,
									buttonAlign: 'center'		// left, center, right
									/*
									 http://spatialreference.org/ref/epsg/4326/
									 EPSG:4326
									 WGS 84
									 WGS84 Bounds: -180.0000, -90.0000, 180.0000, 90.0000
									 Projected Bounds: -180.0000, -90.0000, 180.0000, 90.0000

									 http://spatialreference.org/ref/epsg/28992/
									 EPSG:28992
									 Amersfoort / RD New
									 WGS84 Bounds: 3.3700, 50.7500, 7.2100, 53.4700
									 Projected Bounds: 12628.0541, 308179.0423, 283594.4779, 611063.1429
									 */, hropts: [
										{
											projEpsg: 'EPSG:4326', projDesc: 'EPSG:4326 - WGS 84', fieldLabelX: 'Lon [Graden]', fieldLabelY: 'Lat [Graden]', fieldEmptyTextX: 'Voer lengtegraad (x.yz) in...', fieldEmptyTextY: 'Voer breedtegraad (x.yz) in...', fieldMinX: 3.3700, fieldMinY: 50.7500, fieldMaxX: 7.2100, fieldMaxY: 53.4700, iconWidth: 32, iconHeight: 32, localIconFile: 'bluepin.png', iconUrl: null
										},
										{
											projEpsg: 'EPSG:28992', projDesc: 'EPSG:28992 - NL RD', fieldLabelX: 'X [m]', fieldLabelY: 'Y [m]', fieldEmptyTextX: 'Voer X-coordinaat in...', fieldEmptyTextY: 'Voer Y-coordinaat in...', fieldMinX: -285401.920, fieldMinY: 22598.080, fieldMaxX: 595401.920, fieldMaxY: 903401.920, iconWidth: 32, iconHeight: 32, localIconFile: 'redpin.png', iconUrl: null
										}
									]

									// ====================================

								}},
								{
									type: "namesearch",
									// Optional options, see LocatieserverSearchCombo.js
									options: {
										xtype: 'hr_locatieserversearchcombo',
										id: "pdoksearchcombo_ls",
										width: 200,
										listWidth: 400,
										minChars: 2,
										queryDelay: 240,
										zoom: 11,
										emptyText: 'Zoek een adres',
										tooltip: 'Zoek een adres met de Locatieservice',
										url: 'https://geodata.nationaalgeoregister.nl/locatieserver/suggest?wt=xml',
										lookupUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/lookup?wt=xml'
									}
								}
							]
						}
					}
				]
			},
			{
				xtype: 'panel',
				id: 'hr-menu-right-container',
				layout: 'accordion',
				region: 'east',
				width: 285,
				collapsible: true,
				split: true,
				border: false,
				items: [
					{
						/** Shows Legends for selected Layers. */
						xtype: 'hr_layerlegendpanel',
						defaultStyleIsFirst: true,
						flex: 3,
						id: 'legend_panel',
						collapsible: false,
						hropts: {prefetchLegends: false}
					}
				]
			}
		]
	};
} else {
	console.log("Non-Mobile");
			/** Defines the layout of the entire PDOK Viewer as a JSON struct.*/
	Heron.layout = {
		xtype: 'panel',
		height: 650,
		
		/* Specificeer hier het pad of remote URL naar merged of unmerged XML Heron Map Context file. */
		mapContextUrl: 'config/default.xml',
		mapContextOptions: {
			// mapContextOptions: 'options for loading the xml defined in mapContextUrl'
				showLoadMask: false
				// showLoadMask: 'show a load mask while loading the xml defined in mapContextUrl, default is true',
			},

		/* Optional ExtJS Panel properties, see ExtJS API docs. */
		id: 'hr-container-main',
		layout: 'border',
		border: true,
		items: [
			{	xtype: 'panel',
				id: 'hr-container-north',
				region: 'north',
				layout: 'border',
				width: '100%',
				height: 166,
				bodyBorder: false,
				border: false,
				items: [
					{
						xtype: 'hr_htmlpanel',
						id: 'hr-logo-panel',
						region: 'center',
						bodyBorder: false,
						border: false,
						autoLoad: 
						{
							url: 'header.html'
						},
						height: 166
					}
				]
			},
			{
				xtype: 'panel',
				id: 'hr-menu-left-container',
				layout: 'accordion',
				region: 'west',
				width: 285,
				collapsible: true,
				split: true,
				border: false,
				items: [
					{
						/** Shows selected layers stacked */
						xtype: 'hr_activelayerspanel',
						collapsed: true,
						flex: 2,
						hropts: {
							/**
							 * Defines the custom component added
							 * under the standard layer node.
							 */
							component: {
								xtype: "gx_opacityslider",
								showTitle: false,
								plugins: new GeoExt.LayerOpacitySliderTip(),
								width: 160,
								inverse: false,
								aggressive: false,
								style: {
									marginLeft: '18px'
								}
							}
						}
					},
					{
						/** Shows the tree structure for all Layers. */
						xtype: 'hr_layertreepanel',
						id: 'hr_treelayer',
						flex: 1,

						// The LayerTree tree nodes appearance: default is ugly ExtJS document icons
						// Other values are 'none' (no icons). May be overridden in specific 'gx_layer' type config.
						layerIcons: 'bylayertype',

						contextMenu: [
							{
								xtype: 'hr_layernodemenulayerinfo'
							},
	//                                {
	//                                    xtype: 'hr_layernodemenuzoomextent'
	//                                },
	//                                {
	//                                    xtype: 'hr_layernodemenustyle'
	//                                },
							{
								xtype: 'hr_layernodemenuopacityslider'
							}
						],

						// LayerTree and Map config is taken from global Heron context
						// See Heron.layout.mapContextUrl above.
						useMapContext: true
						/* LayerTree is populated from .xml config file(s). */
						// hropts: Heron.options.layertree
					}
					,
					{
						/** The TreePanel to be populated from a GetCapabilities request. */
						title: 'Capabilities',
						xtype: 'hr_capabilitiesviewpanel',
						useArrows: true,
						animate: true,
						hropts: {
							preload: false
						}
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
				split: false,
				border: false,
				items: [
					{
						xtype: 'hr_mappanel',
						id: 'hr-map',
						region: 'center',
						collapsible: false,
						border: false,

						// MapOptions (settings+Layers) is populated from .xml config file(s).
						// See Heron.layout.mapContextUrl above.
						useMapContext: true,

						hropts: {
							toolbar: [
								{
									type: "featureinfo", options: {
									popupWindow: {
										pressed: true,
										title: 'Objectinformatie',
										width: 500,
										height: 200,
										featureInfoPanel: {
											showTopToolbar: true,

											// Option values are 'Grid', 'Tree' and 'XML', default is 'Grid' (results in no display menu)
											displayPanels: ['Detail', 'Table'],
											// Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
											exportFormats: [],
											// exportFormats: ['CSV', 'XLS'],
											hideColumns: [],

											maxFeatures: 10,
											autoConfigMaxSniff: 10,

											discardStylesForDups: true
										}
									}
								}
								},
								{
									type: "-"
								},
								{
									type: "pan"
								},
								{
									type: "zoomin"
								},
								{
									type: "zoomout"
								},
								{
									type: "zoomvisible"
								},
								{
									type: "-"
								},
								{
									type: "zoomprevious"
								},
								{
									type: "zoomnext"
								},
								{
									type: "-"
								},
								{
									type: "measurelength"
								},
								{
									type: "measurearea"
								},
								{type: "coordinatesearch", options: {

									// === Full demo configuration ===

									// see ToolbarBuilder.js
									formWidth: 320,
									formPageX: 15,
									formPageY: 100
									// see CoordSearchPanel.js
									// , title: 'My title'
									,titleDescription: 'Kies eventueel een projectie systeem.<br>Voer dan X/Y-coordinaten (RD) of Lon/Lat-waarden in.<br>&nbsp;<br>',
									titleDescriptionStyle: 'font-size:11px; color:dimgrey;',
									bodyBaseCls: 'x-form-back',

									bodyItemCls: 'hr-html-panel-font-size-11',
									bodyCls: 'hr-html-panel-font-size-11',
									fieldMaxWidth: 200,
									fieldLabelWidth: 80,
									fieldStyle: 'color: 0x333333;',
									fieldLabelStyle: 'color: darkblue',
									layerName: 'Locatie NL - RD',
									onProjectionIndex: 1,
									onZoomLevel: -1,
									showProjection: true,
									showZoom: true,
									showAddMarkers: true,
									checkAddMarkers: true,
									showHideMarkers: true,
									checkHideMarkers: false,
									removeMarkersOnClose: true,
									showRemoveMarkersBtn: true,
									buttonAlign: 'center'		// left, center, right
									/*
									 http://spatialreference.org/ref/epsg/4326/
									 EPSG:4326
									 WGS 84
									 WGS84 Bounds: -180.0000, -90.0000, 180.0000, 90.0000
									 Projected Bounds: -180.0000, -90.0000, 180.0000, 90.0000

									 http://spatialreference.org/ref/epsg/28992/
									 EPSG:28992
									 Amersfoort / RD New
									 WGS84 Bounds: 3.3700, 50.7500, 7.2100, 53.4700
									 Projected Bounds: 12628.0541, 308179.0423, 283594.4779, 611063.1429
									 */, hropts: [
										{
											projEpsg: 'EPSG:4326', projDesc: 'EPSG:4326 - WGS 84', fieldLabelX: 'Lon [Graden]', fieldLabelY: 'Lat [Graden]', fieldEmptyTextX: 'Voer lengtegraad (x.yz) in...', fieldEmptyTextY: 'Voer breedtegraad (x.yz) in...', fieldMinX: 3.3700, fieldMinY: 50.7500, fieldMaxX: 7.2100, fieldMaxY: 53.4700, iconWidth: 32, iconHeight: 32, localIconFile: 'bluepin.png', iconUrl: null
										},
										{
											projEpsg: 'EPSG:28992', projDesc: 'EPSG:28992 - NL RD', fieldLabelX: 'X [m]', fieldLabelY: 'Y [m]', fieldEmptyTextX: 'Voer X-coordinaat in...', fieldEmptyTextY: 'Voer Y-coordinaat in...', fieldMinX: -285401.920, fieldMinY: 22598.080, fieldMaxX: 595401.920, fieldMaxY: 903401.920, iconWidth: 32, iconHeight: 32, localIconFile: 'redpin.png', iconUrl: null
										}
									]

									// ====================================

								}},
								{
									type: "namesearch",
									// Optional options, see LocatieserverSearchCombo.js
									options: {
										xtype: 'hr_locatieserversearchcombo',
										id: "pdoksearchcombo_ls",
										width: 200,
										listWidth: 400,
										minChars: 2,
										queryDelay: 240,
										zoom: 11,
										emptyText: 'Zoek een adres',
										tooltip: 'Zoek een adres met de Locatieservice',
										url: 'https://geodata.nationaalgeoregister.nl/locatieserver/suggest?wt=xml',
										lookupUrl: 'https://geodata.nationaalgeoregister.nl/locatieserver/lookup?wt=xml'
									}
								}
							]
						}
					}
				]
			},
			{
				xtype: 'panel',
				id: 'hr-menu-right-container',
				layout: 'accordion',
				region: 'east',
				width: 285,
				collapsible: true,
				split: true,
				border: false,
				items: [
					{
						/** Shows Legends for selected Layers. */
						xtype: 'hr_layerlegendpanel',
						defaultStyleIsFirst: true,
						flex: 3,
						id: 'legend_panel',
						collapsible: false,
						hropts: {prefetchLegends: false}
					}
				]
			}
		]
	};
}
