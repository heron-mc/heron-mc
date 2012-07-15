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

/**
 * Defines settings for the Heron App layout wihtin Layout.js.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) and GeoExt and Heron MC components.
 * For convenience specific settings within this layout are defined here
 * for structuring and reuse purposes.
 *
 **/

/*
 * Common settings for MapPanel
 * These will be assigned as "hropts" within the MapPanel config
 */
Ext.namespace("Heron.options.map");
Heron.options.map.settings = {
	projection: 'EPSG:4326',
	units: 'dd',
	// resolutions: [860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525],
	maxExtent: '-180.0, -90.0, 180.0, 90.0',
	// center: '4.92, 52.35',
	xy_precision: 3,
	max_features: 10,
	zoom: 1,
	theme: null
};

/*
 * Layers to be added to the map.
 * Syntax is defined in OpenLayers Layer API.
 * ("isBaseLayer: true" means the layer will be added as base/background layer).
 */
Heron.options.map.layers = [

	/*
	 * ==================================
	 *            BaseLayers
	 * ==================================
	 */
//	May use new NASA WMTS : http://onearth.jpl.nasa.gov/wms.cgi?request=GetCapabilities

	new OpenLayers.Layer.WMS(
			"World image",
			'http://www2.demis.nl/wms/wms.ashx?WMS=BlueMarble',
			{layers: "Earth Image", format: 'image/png'},
			{singleTile: true, isBaseLayer: true, visibility: false, noLegend: true}
	),

	new OpenLayers.Layer.WMS(
			"World schematic",
			'http://www2.demis.nl/wms/wms.ashx?WMS=WorldMap',
			{layers: "Countries,Borders,Coastlines", format: 'image/png'},
			{singleTile: true, isBaseLayer: true, visibility: true, noLegend: true}
	),

	new OpenLayers.Layer.WMS("Global Imagery",
		"http://maps.opengeo.org/geowebcache/service/wms",
				  {layers: "bluemarble"},
			{singleTile: false, isBaseLayer: true, visibility: false, noLegend: true}),

	/*
	 * ==================================
	 *            Overlays
	 * ==================================
	 */
	new OpenLayers.Layer.WMS(
			"World Soil Resources (FAO)",
			'http://data.fao.org/geoserver/ows?',
			{layers: "GEONETWORK:1111_wsres25", transparent: true, format: 'image/png'},
			{singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: true, noLegend: false}
	),
	new OpenLayers.Layer.WMS(
			"Global Ecological Zones (FAO)",
			'http://data.fao.org/geoserver/ows?',
			{layers: "GEONETWORK:1255_eco_zone", transparent: true, format: 'image/png'},
			{singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false}
	),
	new OpenLayers.Layer.WMS(
			"World Cities (FAO)",
			'http://data.fao.org/geoserver/ows?',
			{layers: "GEONETWORK:12764_esri_cities", transparent: true, format: 'image/png'},
			{singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, featureInfoFormat: "application/vnd.ogc.gml"}
	)
];

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. "-" denotes a separator item.
Heron.options.map.toolbar = [
	{type: "scale", options: {width: 110}},
	{type: "-"} ,
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
];

// The content of the HTML info panel.
Ext.namespace("Heron.options.info");
Heron.options.info.html =
			'<div class="hr-html-panel-body">' +
			'<p>This is a demo app of the <a href="http://heron-mc.org" target="_new">Heron Mapping Client</a>.</p>' +
			'<p>A complete configuration is defined via two JS files: </p>' +
            '<ul>' +
				'<li><a href="../DefaultConfig.js" target="_new">DefaultConfig.js</a> : defines this page layout and its panels/widgets</li>' +
				'<li><a href="../DefaultOptionsWorld.js" target="_new">DefaultOptionsWorld.js</a> : defines options like Layers for that page layout</li>' +
			'</ul>' +
			'<p>This split (into layout/options) is just an example for a convenient way to structure a Heron layout.</p>' +
			'<p>Different (CSS) styles and languages for this same demo app can also be defined by overruling the default options, style and language. Examples:</p>' +
			'<ul>' +
				'<li><a href="index-nl.html">Same style with Dutch Language and Layers</a> using <a href="../DefaultOptionsNL.js" target="_new">DefaultOptionsNL.js</a></li>' +
			'</ul>' +
			'<p>Note: Feature Info, "I" button in toolbar, is only available for World Cities Layer.</p>' +
			'<p>Base WMS Layers provided by the <a href="http://www.demis.nl" target="_new">Demis (NL)</a></p>' +
			'<p>Overlay WMS Layers provided by the <a href="http://www.fao.org" target="_new">FAO</a></p>' +
			'<p><i>Thanks to Wolfram Winter from <a href="http://www.bahn.de" target="_new">Deutsche Bahn</a> for providing the initial version and drive for this demo.</i></p>' +
		'</div>';

/*
 * Values for ContextBrowser (shortcuts to jump to specific 
 * layers/zoom/center on map. 
 */
Ext.namespace("Heron.options.contextbrowser");
Heron.options.contextbrowser =
		[
			{
				id: 'id_world_europe',
				name: 'World image - Europe',
				desc: 'Europe',
				layers: ['World image'],
				x: 9.272,
				y: 50.142,
				zoom: 4
			},
			{
				id: 'id_world_northamerica',
				name: 'World image - North America',
				desc: 'North America',
				layers: ['World image'],
				x: -96.328,
				y: 47.461,
				zoom: 2
			}
		];
