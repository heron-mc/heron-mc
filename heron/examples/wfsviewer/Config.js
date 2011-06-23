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


/** api: example[wfsviewer]
 *  WFSViewer
 *  ---------
 *  View feature data from a WFS.
 */

Ext.namespace("Heron.options.map");


// 192507.036,466409.665,194311.401,468166.457
Heron.options.map.settings.center='145420,522519';
Heron.options.map.settings.zoom=10;

Heron.scratch.urls = {
	ALTERRA_WMS : 'http://www.geodata.alterra.nl/topoxplorer/TopoXplorerServlet?',
	GS2_WMS :  'http://local.kademo.nl/gs2/wms?',
	GWC_WMS :  'http://gis.kademo.nl/gwc/service/wms?',
	DEEGREE_INSPIRE_DEMO: 'http://sunda:8080/deegree-inspire-demo/services?',
	KNMI_WMS_RADAR :  'http://geoservices.knmi.nl/cgi-bin/RADNL_OPER_R___25PCPRR_L3.cgi?',
	TILECACHE :  'http://gis.kademo.nl/cgi-bin/tilecache.cgi?',
	TILECACHE_KLIC1 :  'http://kom.kademo.nl/tms/10G058512_1/index.cgi/'
};


Heron.options.map.layers = [

/*new OpenLayers.Layer.WMS("Parcels Apeldoorn",
			Heron.scratch.urls.GS2_WMS,
	{'layers': 'lki_vlakken', 'format': 'image/png'},
	{'isBaseLayer': true, singleTile: true,  visibility: true, alpha:true, opacity: 0.7, noLegend: true}
			)   */
	new OpenLayers.Layer.WMS("Parcels Hoorn",
			Heron.scratch.urls.DEEGREE_INSPIRE_DEMO,
	{'layers': 'cadastralparcels', 'format': 'image/png'},
	{'isBaseLayer': true, singleTile: true,  visibility: true, noLegend: true, featureInfoFormat: "application/vnd.ogc.gml"}
			),
	new OpenLayers.Layer.WMS("Addresses Hoorn",
			Heron.scratch.urls.DEEGREE_INSPIRE_DEMO,
	{'layers': 'addresses', 'format': 'image/png', transparent: true},
	{'isBaseLayer': false, singleTile: true,  visibility: true, noLegend: true, featureInfoFormat: "application/vnd.ogc.gml"}
			)

];
