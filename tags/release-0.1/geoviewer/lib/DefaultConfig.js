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

GeoViewer.lang = GeoViewer.Catalog.lang.nl;

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
					url: '/lib/geoviewer/latest/resources/html/default-north.html'
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
	 url: '/lib/geoviewer/latest/resources/html/default-east.html',
	 title: 'Info'
	 }
	 }
	 ]
	 },   */

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
					url: '/lib/geoviewer/latest/resources/html/default-info.html',
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
};

/** Use NL RD projection/resolutions options. */
GeoViewer.Map.options = GeoViewer.Catalog.optionsRD;

/** Collect layers from catalog. */
GeoViewer.Map.layers = [

	/*
	 * ==================================
	 *            BaseLayers
	 * ==================================
	 */
	GeoViewer.Catalog.layers.osm,
	GeoViewer.Catalog.layers.topraster,
	GeoViewer.Catalog.layers.top10nlgeodan,
	GeoViewer.Catalog.layers.luchtfotonlr,
	GeoViewer.Catalog.layers.blanco,

	/*
	 * ==================================
	 *            OVERLAYS
	 * ==================================
	 */
	GeoViewer.Catalog.layers.klic1_gbkn,
	GeoViewer.Catalog.layers.klic1_liggingen,
	GeoViewer.Catalog.layers.klic1_kpn,
	GeoViewer.Catalog.layers.klic1_ziggo,
	GeoViewer.Catalog.layers.klic1_enexis1,
	GeoViewer.Catalog.layers.knmi_radar_color,
	GeoViewer.Catalog.layers.knmi_radar_bw,
		
	/* ------------------------------
	 * Historische Kaarten (Bonnebladen)
	 * ------------------------------ */
	GeoViewer.Catalog.layers.bonne1865,
	GeoViewer.Catalog.layers.bonne1900,
	GeoViewer.Catalog.layers.bonne1915,
	GeoViewer.Catalog.layers.bonne1925,
	GeoViewer.Catalog.layers.bonne1949,
	GeoViewer.Catalog.layers.tmk1850,

	/* ------------------------------
	 * Hockeyclubs
	 * ------------------------------ */
	GeoViewer.Catalog.layers.hockeyclubs,

	/* ------------------------------
	 * RD info
	 * ------------------------------ */
	GeoViewer.Catalog.layers.rdstations,

	/* ------------------------------
	 * Ecologische Hoofdstructuur (EHS)
	 * ------------------------------ */
	GeoViewer.Catalog.layers.ehs,


	/* ------------------------------
	 * LKI Kadastrale Vlakken
	 * ------------------------------ */
	GeoViewer.Catalog.layers.lki_vlakken,
	GeoViewer.Catalog.layers.lki_gebouwen,
	GeoViewer.Catalog.layers.lki_teksten,
	GeoViewer.Catalog.layers.lki_perceelnrs,
	GeoViewer.Catalog.layers.kadkaart,

	GeoViewer.Catalog.layers.kadastervestigingen
];

/* Map Contexts. */
GeoViewer.contexts =
[

	{
		id: 'klic',
		name: 'KLIC Voorbeeld',
		desc: 'een voorbeeld van een KLIC',
		layers: ['OpenStreetMap', 'KLIC1-GBKN', 'KLIC1-KPN'],
		x: 253922,
		y: 574468,
		zoom: 11
	},
	{
		id: 'debrug',
		name: 'Kadaster - De Brug',
		desc: 'een voorbeeld van een Place2',
		layers: ['Luchtfoto (NLR)'],
		x: 194194,
		y: 465873,
		zoom: 10
	}
];