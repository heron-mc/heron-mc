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
Ext.namespace("GeoViewer.Map");

GeoViewer.lang = GeoViewer.Catalog.lang.en;

GeoViewer.layout = {
	/* north : {
		options : {
			layout: 'border',
			width: '100%',
			bodyBorder: false,
			border: false,
			height: 60
		},
		panels: [
			{
				type: 'gv-html',
				options: {
					id: 'gv-north-panel',
					region: 'center',
					bodyBorder: false,
					border: false,
					url: '/lib/geoext-viewer/trunk/geoviewer/resources/html/default-north.html'
				}
			}
		]
	},   */

	/*	east : {
	 options : {
	 layout: 'accordion',
	 width: 200,
	 collapsible: true,
	 split	: true,
	 border: false
	 },
	 panels: [
	 {
	 type: 'gv-html',
	 options: {
	 id: 'gv-info-east',
	 url: '/lib/geoext-viewer/trunk/geoviewer/resources/html/default-east.html',
	 title: 'Info'
	 }
	 }
	 ]
	 },   */

	center : {
		options : {
			layout: 'border',
			width: '100%',
			collapsible: true,
			split	: true,
			border: false
		},
		panels: [
			{
				type: 'gv-map',
				options: {
					region: 'center',
					collapsible : false,
					border: false
				}
			},
			{
				type: 'gv-feature-info',
				options: {
					region : "south",
					border : true,
					collapsible : true,
					collapsed : true,
					height : 205,
					split : true,
					maxFeatures	: 10
				}
			}
		]
	},
	west : {
		options : {
			layout: 'accordion',
			width: 240,
			collapsible: true,
			split	: true,
			border: false
		},
		panels: [
			{
				type: 'gv-layer-browser'
			},

			{
				type: 'gv-html',
				options: {
					id: 'gv-info-west',
					url: 'default-info.html',
					title: 'Info'
				}
			},

			{
				type: 'gv-layer-legend'
			}
		]
	}
};

/** Use NL RD projection/resolutions options. */
GeoViewer.Map.options = GeoViewer.Catalog.options4258;

/** Collect layers from catalog. */
GeoViewer.Map.layers = [

	/*
	 * ==================================
	 *            BaseLayers
	 * ==================================
	 */
	GeoViewer.Catalog.layers.world
	,GeoViewer.Catalog.layers.blanco

	/*
	 * ==================================
	 *            OVERLAYS
	 * ==================================
	 */
	
	/*----------------------------------
	 *  INSPIRE THEME AB
	 *----------------------------------*/
	 ,GeoViewer.Catalog.layers.bevAB

	/*----------------------------------
	 *  INSPIRE THEME AD
	 *----------------------------------*/
	 ,GeoViewer.Catalog.layers.kadasterAD_wms
	 /*----------------------------------
	 *  INSPIRE THEME CP
	 *----------------------------------*/
	 ,GeoViewer.Catalog.layers.kadasterCP
	 ,GeoViewer.Catalog.layers.nlsf_fgiCP
	 /*----------------------------------
	 *  INSPIRE THEME GN
	 *----------------------------------*/
	 ,GeoViewer.Catalog.layers.fomiGN
	 ,GeoViewer.Catalog.layers.skGN
	 ,GeoViewer.Catalog.layers.ignbGN
	 ,GeoViewer.Catalog.layers.nlssGN
	 ,GeoViewer.Catalog.layers.egn
	 ,GeoViewer.Catalog.layers.egnNL
	 ,GeoViewer.Catalog.layers.kmsGN
	 ,GeoViewer.Catalog.layers.nlsf_fgiGN

	 /*----------------------------------
	 *  INSPIRE THEME HY
	 *----------------------------------*/
	 ,GeoViewer.Catalog.layers.bevHY
];

/* Map Contexts. */
GeoViewer.contexts =
[

	
];
