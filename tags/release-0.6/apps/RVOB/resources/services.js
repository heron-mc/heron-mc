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
Ext.namespace("Heron.options");
Ext.namespace("Heron.options.map");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";


Heron.options.map.settings = {
	projection: 'EPSG:28992',
	units: 'm',
	resolutions: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	maxExtent: '-65200.96,242799.04,375200.96,683200.96',
	center: '155000,463000',
	xy_precision: 3,
	zoom: 2,
	allOverlays: true,
	theme: null
};

Heron.urls = {
	GS2_WMS :  'http://gis.kademo.nl/gs2/wms?',
	GWC_WMS :  'http://gis.kademo.nl/gwc/service/wms?',
	TILECACHE :  'http://gis.kademo.nl/cgi-bin/tilecache.cgi?'
};


/** Collect layers from above, these are actually added to the map.
 * One could also define the layer objects here immediately.
 * */
Heron.options.map.layers = [
	/*
	 * ==================================
	 *            BaseLayers
	 * ==================================
	 */


	/*
	 * Basemap openStreetMap TileCache+Mapnik
	 */
	new OpenLayers.Layer.WMS(
			"OpenStreetMap",
			Heron.urls.TILECACHE,
			{layers: "osm", format: "image/png", transparent: false},
			{singleTile: false, isBaseLayer: true,  visibility: true,  attribution: "Data CC-By-SA by <a href='http://openstreetmap.org/'>OpenStreetMap</a>"}
	),

	/*
	 * Combinatie top250/50/25
	 */
	new OpenLayers.Layer.WMS(
			"TopRaster",
			Heron.urls.GWC_WMS,
			{layers: "top_raster", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
			{singleTile: false, isBaseLayer: true,   visibility: false, noLegend: true}
	),

	new OpenLayers.Layer.WMS(
			"Top10NL (Geodan)",
			Heron.urls.GWC_WMS,
			{layers: "top10_geodan", format: "image/png", transparent: false, bgcolor: "0x99b3cc"},
			{singleTile: false,  isBaseLayer: true, visibility: false, noLegend: true}
	),

	new OpenLayers.Layer.WMS(
			"Luchtfoto (NLR)",
			Heron.urls.GWC_WMS,
			{layers: "luchtfoto_nlr", format: "image/jpeg", transparent: false, bgcolor: "0x99b3cc"},
			{singleTile: false,  isBaseLayer: true, visibility: false, noLegend: true}
	),

	/*
	 * Ecologische Hoofdstructuur (EHS)
	 */
	new OpenLayers.Layer.WMS("Ecologische Hoofdstructuur",
			Heron.urls.GS2_WMS,
			{'layers': 'ehs_alles', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7, noLegend: true,featureInfoFormat: "application/vnd.ogc.gml"}
	),

	/* ------------------------------
	 * LKI Kadastrale Vlakken
	 * ------------------------------ */
	new OpenLayers.Layer.WMS("Kadastrale Vlakken",
			Heron.urls.GS2_WMS,
			{layers: "lki_vlakken", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
				,featureInfoFormat: "application/vnd.ogc.gml"}
	),

	new OpenLayers.Layer.WMS(
			"Kadastrale Vlakken (tiled)",
			Heron.urls.GWC_WMS,
			{layers: "kadkaart_vlakken", format: "image/png", transparent: true},
			{singleTile: false, isBaseLayer: false,   visibility: false, noLegend: true}
	),

	new OpenLayers.Layer.WMS("Kadastrale Bebouwingen",
			Heron.urls.GS2_WMS,
			{layers: "lki_gebouwen", format: "image/png", transparent: true},
			{ isBaseLayer: false, singleTile: true,  visibility: false, alpha:true
				,featureInfoFormat: "application/vnd.ogc.gml"}
	),


	new OpenLayers.Layer.WMS(
			"Kadastrale Gebouwen (tiled)",
			Heron.urls.GWC_WMS,
			{layers: "kadkaart_gebouwen", format: "image/png", transparent: true},
			{singleTile: false, isBaseLayer: false, visibility: false, noLegend: true}
	),

	new OpenLayers.Layer.WMS("Kadastrale Teksten",
			Heron.urls.GS2_WMS,
			{layers: "lki_teksten", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true ,featureInfoFormat: "application/vnd.ogc.gml", noLegend: true}
	),

	new OpenLayers.Layer.WMS("Kadastrale Perceelnummers",
			Heron.urls.GS2_WMS,
			{layers: "lki_vlakken", format: "image/png", styles: "lki_perceelnrs", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, featureInfoFormat: "application/vnd.ogc.gml"}
	),

	new OpenLayers.Layer.WMS(
			"Perceel Nummers (tiled)",
			Heron.urls.GWC_WMS,
			{layers: "kadkaart_perceelnrs", format: "image/png", transparent: true},
			{singleTile: false, isBaseLayer: false,   visibility: false, noLegend: true}
	),

	new OpenLayers.Layer.WMS("Kadastrale Kaart Alles",
			Heron.urls.GS2_WMS,
			{layers: "kadkaart", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7}

	),

	new OpenLayers.Layer.WMS(
			"Kadastrale Kaart Alles (tiled)",
			Heron.urls.GWC_WMS,
			{layers: "kadkaart_alles", format: "image/png", transparent: true, bgcolor: "0x99b3cc"},
			{singleTile: false, isBaseLayer: false,  visibility: false, alpha:true, opacity: 0.7, noLegend: true}
	),

	new OpenLayers.Layer.WMS(
			"Hockeyclubs",
			Heron.urls.GS2_WMS,
			{layers: "hockeyclubs", format: "image/png", transparent: true},
			{isBaseLayer: false, singleTile: true,  visibility: false, alpha:true, opacity: 0.7
				,featureInfoFormat: "application/vnd.ogc.gml"}
	)
];


/** Values for ContextBrowser (shortcuts to jump to specific layers/zoom/center on map.   */
Ext.namespace("Heron.options.contextbrowser");
Heron.options.contextbrowser =
		[
			{
				id: 'r1',
				name: 'Voorbeeld',
				desc: 'een voorbeeld met EHS',
				layers: ['TopRaster', 'Ecologische Hoofdstructuur'],
				x: 253922,
				y: 574468,
				zoom: 5
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


// Define a minimal tree config to be instantiated as a Ext Tree with GeoExt (gx-layer) leaf nodes
// Use the Layer names to identify layers from Heron.options.map.layers above.
Ext.namespace("Heron.options.layertree");
Heron.options.layertree.tree = [
	{
		text: 'BaseMaps', expanded: true, children:
			[
				{nodeType: "gx_layer", layer: "OpenStreetMap" },
				{nodeType: "gx_layer", layer: "TopRaster" },
				{nodeType: "gx_layer", layer: "Luchtfoto (NLR)" }
			]
	},
	{
		text: 'Themes', children:
			[
				{
					text:'Cadastral Maps (zoom > 6)', children:
						[
							{nodeType: "gx_layer", layer: "Kadastrale Vlakken (tiled)" },
							{nodeType: "gx_layer", layer: "Kadastrale Gebouwen (tiled)" },
							{nodeType: "gx_layer", layer: "Kadastrale Teksten" }
						]
				},
				{
					text:'Ecology', children:
						[
							{nodeType: "gx_layer", layer: "Ecologische Hoofdstructuur" }
						]
				},
				{
					text:'Sport', children:
						[
							{nodeType: "gx_layer", layer: "Hockeyclubs" }
						]
				}

			]
	}
];

Heron.options.search = {
	protocol: new OpenLayers.Protocol.WFS({
				version: "1.1.0",
				url: "http://gis.kademo.nl/gs2/wfs?",
				srsName: "EPSG:28992",
				featureType: "hockeyclubs",
				featureNS: "http://innovatie.kadaster.nl"
			}),
	items: [
		{
			xtype: "textfield",
			name: "name",
			value: "Hurley",
			fieldLabel: "name"
		},
		{
			xtype: "textfield",
			name: "desc",
			value: "0206454468",
			fieldLabel: "desc"
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
	]
};