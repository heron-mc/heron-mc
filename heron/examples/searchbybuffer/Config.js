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

/** api: example[search by buffer]
 *  Search by Buffer
 *  ----------------
 *  Search by buffer on vector or wfs layers
 */

Ext.namespace("Heron");
serverURL=''; 
Heron.globals.serviceUrl=serverURL+'/cgi-bin/heron.cgi';
OpenLayers.ProxyHost = serverURL+'/cgi-bin/proxy.cgi?url=';

Ext.namespace("Heron.examples");

/** Create a config for the search panel. This panel may be embedded into the accordion
 * or bound to the "find" button in the toolbar. Here we use the toolbar button.
 */
Heron.examples.searchPanelConfig = {
	xtype: 'hr_searchcenterpanel',
	hropts: {
		searchPanel: {
		xtype: 'hr_searchbybufferpanel',
			id: 'hr-searchbybuffer',
			header: false,
            border: false,
			style: {
				fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
				fontSize: '12px'
			}
		},
		resultPanel: {
			xtype: 'hr_featuregridpanel',
			id: 'hr-featuregridpanel',
			header: false,
            border: false,
			autoConfig: true,
            exportFormats: ['CSV', 'XLS', 'GMLv2', 'GeoJSON', 'WellKnownText', 'Shapefile'],
			hropts: {
				zoomOnRowDoubleClick: true,
				zoomOnFeatureSelect: false,
				zoomLevelPointSelect: 8,
				zoomToDataExtent: false
			}
		}
	}
};

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 **/
Heron.layout = {
	xtype: 'panel',
	id: 'hr-container-main',
	layout: 'border',

	items: [
		{
			xtype: 'panel',

			id: 'hr-menu-left-container',
			layout: 'accordion',
			region : "west",
			width: 240,
			collapsible: true,
			split	: true,
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
				}
			]
		},
		{
			xtype: 'panel',

			id: 'hr-map-and-info-container',
			layout: 'border',
			region: 'center',
			width: '100%',
			collapsible: true,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_mappanel',
					id: 'hr-map',
					region: 'center',
					collapsible : false,
					border: false,
					hropts: {
						settings :
						{
							projection: 'EPSG:900913',
							displayProjection: new OpenLayers.Projection("EPSG:4326"),
							units: 'm',
							maxExtent: '-20037508.34, -20037508.34, 20037508.34, 20037508.34',
							center: '-11000000, 5000000',
							maxResolution: 'auto',
							xy_precision: 5,
							zoom: 4,
							theme: null
						},

						layers : [
							/*
							 * Google Maps
							 */

							new OpenLayers.Layer.Google(
									"Google Satellite",
									{type: google.maps.MapTypeId.SATELLITE, visibility: true},
									{singleTile: false, buffer: 0, isBaseLayer: true}

							),

                            new OpenLayers.Layer.Google(
                     									"Google Streets", // the default
                     									{type: google.maps.MapTypeId.ROADMAP, visibility: false},
                     									{singleTile: false, buffer: 0, isBaseLayer: true}
                     							),
							new OpenLayers.Layer.Google(
									"Google Terrain",
									{type: google.maps.MapTypeId.TERRAIN, visibility: false},
									{singleTile: false, buffer: 0, isBaseLayer: true}
							),

							/*
							 * Basemap OpenStreetMap
							 */
							new OpenLayers.Layer.OSM(),
							new OpenLayers.Layer.WMS(
									"USA States (Boundless)",
									'http://demo.boundlessgeo.com/geoserver/ows?',
									{layers: "states", transparent: true, format: 'image/png'},
									{singleTile: false, opacity: 0.9, isBaseLayer: false, visibility: true, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize', metadata: {
										wfs: {
											protocol: 'fromWMSLayer',
											featurePrefix: 'topp',
											featureNS: 'http://www.openplans.org/topp'//,
											//downloadFormats: Heron.options.wfs.downloadFormats
										}
									}
									}
							),
                            new OpenLayers.Layer.WMS(
                                    "World Cities (Boundless)",
                                    'http://demo.boundlessgeo.com/geoserver/ows?',
                                    {layers: "cities", transparent: true, format: 'image/png'},
                                    {singleTile: false, opacity: 0.9, isBaseLayer: false, visibility: false,
                                        noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize',metadata: {
											wfs: {
												protocol: 'fromWMSLayer',
												featurePrefix: 'topp',
												featureNS: 'http://www.openplans.org/topp'//,
												//downloadFormats: Heron.options.wfs.downloadFormats
											}
										}
                                     }
                            )
						],
						toolbar: [
                            {type: "featureinfo", options: {
                                popupWindow: {
                                    width: 360,
                                    height: 200,
                                    featureInfoPanel: {
                                        showTopToolbar: true,
                                        displayPanels: ['Table'],

                                        // Should column-names be capitalized? Default true.
                                        columnCapitalize: true,

                                        // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                                        exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoJSON', 'WellKnownText'],
                                        // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                                        // exportFormats: ['CSV', 'XLS'],
                                        maxFeatures: 10
                                    }
                                }
                            }},
							{type: "-"} ,
							{type: "pan"},
							{type: "zoomin"},
							{type: "zoomout"},
							{type: "zoomvisible"},
							{type: "-"} ,
							{type: "zoomprevious"},
							{type: "zoomnext"},
							{type: "-"},
							{type: "measurelength", options: {geodesic: true}},
							{type: "measurearea", options: {geodesic: true}},
							{type: "oleditor", options: {
								pressed: true,
								// Options for OLEditor
								olEditorOptions: {
										activeControls: ['UploadFeature', 'DownloadFeature', 'Separator', 'Navigation', 'SnappingSettings', 'CADTools', 'Separator', 'DeleteAllFeatures', 'DeleteFeature', 'DragFeature', 'SelectFeature', 'Separator', 'DrawHole', 'ModifyFeature', 'Separator'],
										featureTypes: ['text', 'regular', 'polygon', 'path', 'point'],
										language: 'en',
										DownloadFeature: {
												url: serverURL+'/cgi-bin/heron.cgi',
												formats: [
														{name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
														//{name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
														{name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML', fileProjection: new OpenLayers.Projection('EPSG:4326')},
														//{name: 'ESRI Shapefile (zipped, WGS84)', fileExt: '.zip', mimeType: 'application/zip', formatter: 'OpenLayers.Format.GeoJSON', targetFormat: 'ESRI Shapefile', fileProjection: new OpenLayers.Projection('EPSG:4326')}
												],
												// For custom projections use Proj4.js
												fileProjection: new OpenLayers.Projection('EPSG:4326')
										},
										UploadFeature: {
												url: serverURL+'/cgi-bin/heron.cgi',
												formats: [
														{name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
														//{name: 'GeoJSON', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
														{name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML', fileProjection: new OpenLayers.Projection('EPSG:4326')},
														//{name: 'ESRI Shapefile (zipped, WGS84)', fileExt: '.zip', mimeType: 'application/zip', formatter: 'OpenLayers.Format.GeoJSON', targetFormat: 'ESRI Shapefile', fileProjection: new OpenLayers.Projection('EPSG:4326')}
												],
												// For custom projections use Proj4.js
												fileProjection: new OpenLayers.Projection('EPSG:4326')
										}
									}
								}
							 },
							 {
								type: "searchcenter",
								// Options for SearchPanel window
								options: {
									show: true,

									searchWindow: {
										title: __('Select by Buffer'),
										x: 100,
										y: undefined,
										width: 360,
										height: 400,
										items: [
											Heron.examples.searchPanelConfig
										]
									}
								}
							},
							{type: "help", options: {tooltip: 'Help and info for this example', contentUrl: 'help.html'}}
						]
					}
				}
			]
		}
	]
};
