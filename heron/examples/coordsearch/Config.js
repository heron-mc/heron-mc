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

/** api: example[coordsearch]
 *  Coordinate Search
 *  -----------------
 *  Go to point on map from coordinates entered in form.
 */

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "-"} ,
	{type: "coordinatesearch", options: {

		// === Full demo configuration ===

				// see ToolbarBuilder.js
					  formWidth: 320
					, formPageX: 15
					, formPageY: 100
				// see CoordSearchPanel.js
					// , title: 'My title'
					, titleDescription: 'Please choose your input projection system...<br><br>Then enter the Lon/Lat-values (European area only) or the<br>X/Y-coordinates as requested.<br>&nbsp;<br>'
					, titleDescriptionStyle: 'font-size:11px; color:dimgrey;'
					, bodyBaseCls: 'x-form-back'
					, bodyItemCls: 'hr-html-panel-font-size-11'
					, bodyCls: 'hr-html-panel-font-size-11'
					, fieldMaxWidth: 200
					, fieldLabelWidth: 80
					, fieldStyle: 'color: red;'
					, fieldLabelStyle: 'color: darkblue'
					, layerName: 'Location Europe - Lon/Lat'
					, onProjectionIndex: 1
					, onZoomLevel: -1
					, showProjection: true
					, showZoom: true
					, showAddMarkers: true
					, checkAddMarkers: true
					, showHideMarkers: true
					, checkHideMarkers: false
					, showResultMarker: true
					, fieldResultMarkerStyle: 'color: green;'
					, fieldResultMarkerText: 'Marker position: '
					, fieldResultMarkerSeparator: ' | '
					, fieldResultMarkerPrecision: 4
					, removeMarkersOnClose: true
					, showRemoveMarkersBtn: true
					, buttonAlign: 'center'		// left, center, right
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
						*/
					, hropts: [
						{
							  projEpsg: 'EPSG:4326'
							, projDesc: 'EPSG:4326 - WGS 84'
							, fieldLabelX: 'Lon [Grad]'
							, fieldLabelY: 'Lat [Grad]'
							, fieldEmptyTextX: 'Please enter Lon value...'
							, fieldEmptyTextY: 'Please enter Lat value...'
							, fieldMinX: -180
							, fieldMinY: -90
							, fieldMaxX: 180
							, fieldMaxY: 90
							, fieldDecPrecision: 6
							, iconWidth: 32
							, iconHeight: 32
							, localIconFile: 'bluepin.png'
							, iconUrl: null
						}
						,
						{
							  projEpsg: 'EPSG:28992'
							, projDesc: 'EPSG:28992 - Amersfoort / RD New'
							, fieldLabelX: 'X [m]'
							, fieldLabelY: 'Y [m]'
							, fieldEmptyTextX: 'Please enter X-coordinate...'
							, fieldEmptyTextY: 'Please enter Y-coordinate...'
							, fieldMinX: 12628.0541
							, fieldMinY: 308179.0423
							, fieldMaxX: 283594.4779
							, fieldMaxY: 611063.1429
							, fieldDecPrecision: 2
							, iconWidth: 32
							, iconHeight: 32
							, localIconFile: 'redpin.png'
							, iconUrl: null
						}
					]

		// ====================================

	}}
];

Heron.layout = {
	xtype: 'panel',
	/* Optional ExtJS Panel properties, see ExtJS API docs. */
	id: 'hr-container-main',
	layout: 'border',
	items: [ {
			xtype: 'panel',
			id :  'hr-map-and-info-container',
			layout: 'border',
			region: 'center',
			width: '100%',
			collapsible: true,
			split: true,
			border: false,
			items: [ {
				xtype: 'hr_mappanel',
				id: 'hr-map',
				region: 'center',
				collapsible : false,
				border: false,
				hropts: Heron.options.map
			} ]
		},		
		{		
			xtype: 'panel',
			id: 'hr-menu-left-container',
			layout: 'accordion',
			region: "west",
			width: 270,
			collapsible: true,
			split: true,
			border: false,
			items: [ {
				xtype: 'hr_coordsearchpanel',
				id: 'hr-coordsearchpanel',
				title: 'Go to Coordinates (Lon/Lat)',
				height: 150,
				border: true,
				collapsible: true,
				collapsed: false,
				fieldLabelWidth: 50,
				onZoomLevel: 6,
				// showZoom: true,
				layerName: 'Location Europe - Lon/Lat',
				hropts: [ {
					fieldLabelX: 'Lon',
					fieldLabelY: 'Lat',
					fieldEmptyTextX: 'Enter Lon-coordinate...',
					fieldEmptyTextY: 'Enter Lat-coordinate...'
				} ]
			},
			{
				xtype: 'hr_coordsearchpanel',
				id: 'hr-coordsearchpanelRD',
				title: 'Go to Coordinates (Dutch RD)',
				height: 150,
				border: true,
				collapsible: true,
				collapsed: true,
				onZoomLevel: 8,
				showZoom: true,
				hropts: [ {
					projEpsg: 'EPSG:28992',
					projDesc: 'Amersfoort / RD New',
					localIconFile: 'redpin.png',
					fieldLabelX: 'x (Dutch RD)',
					fieldLabelY: 'y (Dutch RD)'
				} ]
				},
				{
					xtype: 'hr_layertreepanel'
				},
				{
					xtype: 'hr_htmlpanel',
					id: 'hr-info-west',
					html: '<div class="hr-html-panel-body"><p>Example of form to fill in coordinates to jump and zoom to a location</p>' +
							'<p>See <a href="Config.js" target="_new">Config,js</a> for the configuration of this example</p>' +
							'<a href="index-nl.html">Click here</a> to see the same example with Dutch layers and coordinates.</div>'
					,
					preventBodyReset: true,
					title: 'Info'
				}
			]
		}
	]
};
