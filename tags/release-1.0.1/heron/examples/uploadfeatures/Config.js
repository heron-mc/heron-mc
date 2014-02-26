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


/** api: example[uploadfeatures]
 *  Upload Features
 *  ---------------
 *  Upload features from local file (GML, CSV etc) into a Layer.
 */

/** This config assumes the DefaultOptionsWorld.js to be included first!! */

/** For the example: support for uploading files in other projections
 * than the map projection.
 */
Proj4js.defs["EPSG:27700"] = "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717+x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs";

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. By providing a "create" function your own toolbar
// item can be added.
// For menu's and other standard ExtJS Toolbar items, the "any" type can be
// used. There you need only pass the options, similar as in the function
// ExtJS Toolbar.add().
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {max_features: 20, popupWindow: {}}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
    {type: "upload", options: {
        upload: {
             layerName: __('My Upload'),
             visibleOnUpload: true,
             url: Heron.globals.serviceUrl,
             params: {
                 action: 'upload',
                 mime: 'text/html',
                 encoding: 'escape'
             },
             formats: [
                 {name: 'Well-Known-Text (WKT)', fileExt: '.wkt', mimeType: 'text/plain', formatter: 'OpenLayers.Format.WKT'},
                 {name: 'Geographic Markup Language - v2 (GML2)', fileExt: '.gml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GML'},
                 {name: 'Geographic Markup Language - v3 (GML3)', fileExt: '.gml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GML.v3'},
                 {name: 'GeoJSON, WGS84/EPSG:4326', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                 {name: 'GeoJSON, Dutch RD EPSG:28992', fileExt: '.json', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', sourceSrs : 'EPSG:28992', targetSrs : 'EPSG:4326'},
                 {name: 'GPS Exchange Format (GPX)', fileExt: '.gpx', mimeType: 'text/xml', formatter: 'OpenLayers.Format.GPX'},
                 {name: 'Keyhole Markup Language (KML)', fileExt: '.kml', mimeType: 'text/xml', formatter: 'OpenLayers.Format.KML'},
                 {name: 'CSV (with X,Y)', fileExt: '.csv', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                 {name: 'ESRI Shapefile (zipped, WGS84/EPSG:4326)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON'},
                 {name: 'ESRI Shapefile (zipped, UK Grid EPSG:27700)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:27700')},
                 {name: 'ESRI Shapefile (zipped, Dutch RD EPSG:28992)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', fileProjection: new OpenLayers.Projection('EPSG:28992')},
                 {name: 'ESRI Shapefile (zipped, Any Projection)', fileExt: '.zip', mimeType: 'text/plain', formatter: 'OpenLayers.Format.GeoJSON', targetSrs : 'EPSG:4326'}
             ],
             // For custom projections use Proj4.js
             fileProjection: new OpenLayers.Projection('EPSG:4326')
         }

    }}
];
