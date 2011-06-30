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
/** This config assumes the DefaultOptions.js to be included first!! */






/*
OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

// 192507.036,466409.665,194311.401,468166.457
Ext.namespace("Heron.options.map");

Heron.options.map.settings = {
	projection: 'EPSG:28992',
	units: 'm',
	resolutions: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	maxExtent: '-65200.96,242799.04,375200.96,683200.96',
	center: '193535,467000',
	xy_precision: 3,
	allOverlays: true,
	zoom: 6,
	theme: null
};
Ext.namespace("Heron.scratch");
Heron.scratch.urls = {
	GS2_WMS: 'http://local.kademo.nl/gs2/wms?'
};

Heron.options.map.layers = [

	new OpenLayers.Layer.WMS(
				"Hockeyclubs",
				Heron.scratch.urls.GS2_WMS,
		{layers: "hockeyclubs", format: "image/png", transparent: true},
		{isBaseLayer: false, singleTile: true,  visibility: true, alpha:true, opacity: 0.7,
			featureInfoFormat: "application/vnd.ogc.gml"}
				),

		new OpenLayers.Layer.WMS("Vlakken",
			Heron.scratch.urls.GS2_WMS,
	{'layers': 'lki_vlakken', 'format': 'image/png', transparent: true},
	{'isBaseLayer': false, singleTile: true,  visibility: true, alpha:true, opacity: 0.7,
			featureInfoFormat: "application/vnd.ogc.gml"}
		)
];

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {max_features: 20}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{type: "zoomprevious"},
	{type: "zoomnext"},
	{type: "-"},
	{type: "measurelength"},
	{type: "measurearea"}
];

*/


/** api: example[searchpanel]
 *  Search Panel
 *  ------------
 *  Create a custom search panel with backend (exact) WFS search and zoom to result.
 */

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
			region : "west",
			width: 240,
			collapsible: true,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_layertreepanel'
				},
				{
					xtype: 'hr_searchpanel',
					id: 'hr-searchpanel',
					title: __('Search'),
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
							value: 'Hu*',
							fieldLabel: "  name"
						},
						{
							xtype: "label",
							id: "helplabel",
							html: 'Type name of an NL hockeyclub, use * as wildcard<br/>',
							style: {
								fontSize: '10px',
								color: '#CCCCCC'
							}
						}
					],
					hropts: {
						onSearchCompleteZoom : 11
					}
				}
			]
		},
		{
			xtype: 'panel',
			id :  'hr-map-and-info-container',
			layout : 'border',
			region: 'center',
			width : '100%',
			collapsible : true,
			split : true,
			border : false,
			items :
					[
						{
							xtype: 'hr_mappanel',
							id: 'hr-map',
							region: 'center',
							collapsible : false,
							border: false,
							hropts: Heron.options.map
						},
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
						}
					]
		}
	]
}
		;
