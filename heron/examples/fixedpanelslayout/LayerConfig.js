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

// Define Heron namespaces.
Ext.namespace("Heron.options");
Ext.namespace("Heron.options.map");
Ext.namespace("Heron.options.layertree");
Ext.namespace("Heron.scratch");
Ext.namespace("Heron.PDOK");

// Define the base urls for the layers.
Heron.scratch.urls = {
	PDOK : 'http://geodata.nationaalgeoregister.nl'
};

// Define the PDOK urls for the layers.
Heron.PDOK.urls = {
	PDOKTMS: Heron.scratch.urls.PDOK + '/tms/',
	NATURA2000: Heron.scratch.urls.PDOK + '/natura2000/wms?',
	NATIONALEPARKEN: Heron.scratch.urls.PDOK + '/nationaleparken/wms?',
	WETLANDS: Heron.scratch.urls.PDOK + '/wetlands/wms?'
};

// Define the layers.
Heron.scratch.layermap = {

	/* ------------------------------
	 * BRT
	 * ------------------------------ */
	pdok_brtachtergrondkaart: new OpenLayers.Layer.TMS("BRT Achtergrondkaart",
			Heron.PDOK.urls.PDOKTMS,
			{layername: 'brtachtergrondkaart',
				type: "png",
				isBaseLayer: true,
				transparent: true,
				bgcolor: "0xffffff",
				visibility: false,
				singleTile: false,
				alpha:true,
				opacity: 1.0,
				attribution: "Bron: BRT Achtergrondkaart, <a href='http://openstreetmap.org/'>OpenStreetMap</a> <a href='http://creativecommons.org/licenses/by-sa/2.0/'>CC-By-SA</a>",
				transitionEffect: 'resize'}),

	/* ------------------------------
	 * Natura 2000
	 * ------------------------------ */
	natura2000wms: new OpenLayers.Layer.WMS("Natura 2000",
			Heron.PDOK.urls.NATURA2000,
			{'layers': 'natura2000', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,
			 visibility: false, featureInfoFormat: "application/vnd.ogc.gml",
			 alpha:true, opacity: 0.7}),

	/* ------------------------------
	 * Nationale Parken
	 * ------------------------------ */
	nationaleparken: new OpenLayers.Layer.WMS("Nationale parken",
			Heron.PDOK.urls.NATIONALEPARKEN,
			{'layers': 'nationaleparken', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true, 
			 visibility: false, featureInfoFormat: "application/vnd.ogc.gml",
			 alpha:true, opacity: 0.7}),

	/* ------------------------------
	 * Wetlands
	 * ------------------------------ */
	wetlands: new OpenLayers.Layer.WMS("Wetlands",
			Heron.PDOK.urls.WETLANDS,
			{'layers': 'wetlands', 'format': 'image/png', transparent: true},
			{'isBaseLayer': false, singleTile: true,
			 visibility: false, featureInfoFormat: "application/vnd.ogc.gml",
			 alpha:true, opacity: 0.7})
}

// Create list of layers.
Heron.options.map.layers = [

  // The baselayer.
	Heron.scratch.layermap.pdok_brtachtergrondkaart,

  // Theme layers.
	Heron.scratch.layermap.natura2000wms,
	Heron.scratch.layermap.nationaleparken,
	Heron.scratch.layermap.wetlands
];
