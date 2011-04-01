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

GeoViewer.layout = {
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
					html: '<div class="gv-html-panel-body"><p>Dit is de GeoViewer van Het Kadaster GEORZ Lab.' +
                                            '</p><br/><p>Deze viewer en in feite de gehele website is gemaakt met het Open Source'+
                                            ' project <a href="http://code.google.com/p/geoext-viewer/" target="_new" >GeoExt Viewer</a>' +
                                            ', o.a. in samenwerking met <a href="http://www.geodan.nl" target="_new">Geodan</a>. Deze op '+
                                            '<a href="http://geoext.org">GeoExt</a>-gebaseerde Viewer is zeer flexibel en uitbreidbaar ' +
                                            'zodat deze gemakkelijk in meerdere projecten kan worden ingezet. Zie als voorbeeld ook de '+
                                            '<a href="http://inspire.kademo.nl" target="_new">GeoViewer voor Kademo INSPIRE</a>.</p><br/></div>',
					preventBodyReset: true,
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
	GeoViewer.Catalog.layers.lki_vlakken_tiled,
	GeoViewer.Catalog.layers.lki_gebouwen_tiled,
	GeoViewer.Catalog.layers.lki_teksten,
	GeoViewer.Catalog.layers.lki_perceelnrs_tiled,
	GeoViewer.Catalog.layers.kadkaart_tiled,

	GeoViewer.Catalog.layers.kadastervestigingen
];

// See ToolbarBuilder.js : each string item points to a definition
// in GeoViewer.ToolbarBuilder.defs. Extra options and even an item create function 
// can be passed here as well.
GeoViewer.Map.toolbar = [
	{type: "featureinfo"},
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
