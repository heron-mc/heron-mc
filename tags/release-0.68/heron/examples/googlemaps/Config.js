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

/** api: example[googlemaps]
 *  Google Maps
 *  -----------
 *  Use Google Maps within a Heron app.
 */

Ext.namespace("Heron");

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
					xtype: 'hr_layertreepanel'
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
							center: '594576, 6831611',
							maxResolution: 'auto',
							xy_precision: 5,
							zoom: 8,
							theme: null
						},

						layers : [
							/*
							 * Google Maps
							 */
							new OpenLayers.Layer.Google(
									"Google Streets", // the default
									{type: google.maps.MapTypeId.ROADMAP, visibility: true},
									{singleTile: false, buffer: 0, isBaseLayer: true}
							),

							new OpenLayers.Layer.Google(
									"Google Satellite",
									{type: google.maps.MapTypeId.SATELLITE, visibility: false},
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
							new OpenLayers.Layer.OSM()
						],
						toolbar: [
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
							{type: "measurelength", options: {geodesic: true}},
							{type: "measurearea", options: {geodesic: true}}
						]
					}
				}
			]
		}
	]
};
