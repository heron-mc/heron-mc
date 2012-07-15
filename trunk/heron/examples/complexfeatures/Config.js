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


/** api: example[complexfeatures]
 *  WFSViewer
 *  ---------
 *  View complex feature data from a WFS (WORK IN PROGRESS !!).
 */

Ext.namespace("Heron.options.map");


// 192507.036,466409.665,194311.401,468166.457
Heron.options.map.settings.center='145420,522519';
Heron.options.map.settings.zoom=10;

Heron.scratch.urls = {
	INSPIRE_WMS: 'http://inspire.kademo.nl/deegree3/services?'
};


Heron.options.map.layers = [

/*new OpenLayers.Layer.WMS("Parcels Apeldoorn",
			Heron.scratch.urls.GS2_WMS,
	{'layers': 'lki_vlakken', 'format': 'image/png'},
	{'isBaseLayer': true, singleTile: true,  visibility: true, alpha:true, opacity: 0.7, noLegend: true}
			)   */
	new OpenLayers.Layer.WMS("Parcels Hoorn",
			Heron.scratch.urls.INSPIRE_WMS,
	{'layers': 'cp:CadastralParcel', 'format': 'image/png'},
	{'isBaseLayer': true, singleTile: true,  visibility: true, noLegend: true, featureInfoFormat: "application/vnd.ogc.gml"}
			),
	new OpenLayers.Layer.WMS("Addresses Hoorn",
			Heron.scratch.urls.INSPIRE_WMS,
	{'layers': 'ad.Address', 'format': 'image/png', transparent: true},
	{'isBaseLayer': false, singleTile: true,  visibility: true, noLegend: true, featureInfoFormat: "application/vnd.ogc.gml"}
			)

];
