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
 * 
 * Author: Eddy Scheper, ARIS B.V./OGG
 */

// Define Heron namespaces.
Ext.namespace("Heron.options");
Ext.namespace("Heron.options.map");
Ext.namespace("Heron.options.layertree");
Ext.namespace("Heron.base");
Ext.namespace("Heron.data");

// Define the base urls for the layers.
Heron.base.urls = {
    PDOK : 'http://geodata.nationaalgeoregister.nl',
    GS2_OWS: 'http://kademo.nl/gs2/ows?',
    OPENBASISKAART: 'http://openbasiskaart.nl'
};

// Define the service urls for the layers.
Heron.data.urls = {
    OPENBASISKAARTTMS: Heron.base.urls.OPENBASISKAART + '/mapcache/tms',
    PDOKTMS: Heron.base.urls.PDOK + '/tms/',
    NATURA2000: Heron.base.urls.PDOK + '/natura2000/wms?',
    NATIONALEPARKEN: Heron.base.urls.PDOK + '/nationaleparken/wms?',
    WETLANDS: Heron.base.urls.PDOK + '/wetlands/wms?'
};

// Define the layers.
Heron.data.layermap = {

    /* ------------------------------
     * BRT
     * ------------------------------ */
    pdok_brtachtergrondkaart: new OpenLayers.Layer.TMS("BRT Achtergrondkaart",
        Heron.data.urls.PDOKTMS,
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
     * OpenBasisKaart
     * ------------------------------ */
    openbasiskaart_osm: ["OpenLayers.Layer.TMS", "OpenBasisKaart OSM",
      Heron.data.urls.OPENBASISKAARTTMS,
      {layername: 'osm@rd',
          type: "png",
          isBaseLayer: true,
          transparent: true,
          bgcolor: "0xffffff",
          visibility: true,
          singleTile: false,
          alpha: true,
          opacity: 1.0,
          attribution: "(C) <a href='http://openbasiskaart.nl'>OpenBasisKaart</a><br/>Data <a href='http://www.openstreetmap.org/copyright'>CC-By-SA</a> <a href='http://openstreetmap.org/'>OpenStreetMap</a> ",
          transitionEffect: 'resize'}],

    /* ------------------------------
     * Natura 2000
     * ------------------------------ */
    natura2000wms: new OpenLayers.Layer.WMS("Natura 2000",
            Heron.data.urls.NATURA2000,
            {'layers': 'natura2000', 'format': 'image/png', transparent: true},
            {'isBaseLayer': false, singleTile: true,
             visibility: false, featureInfoFormat: "application/vnd.ogc.gml",
             alpha:true, opacity: 0.7}),

    /* ------------------------------
     * Nationale Parken
     * ------------------------------ */
    nationaleparken: new OpenLayers.Layer.WMS("Nationale parken",
            Heron.data.urls.NATIONALEPARKEN,
            {'layers': 'nationaleparken', 'format': 'image/png', transparent: true},
            {'isBaseLayer': false, singleTile: true, 
             visibility: false, featureInfoFormat: "application/vnd.ogc.gml",
             alpha:true, opacity: 0.7}),

    /* ------------------------------
     * Wetlands
     * ------------------------------ */
    wetlands: new OpenLayers.Layer.WMS("Wetlands",
            Heron.data.urls.WETLANDS,
            {'layers': 'wetlands', 'format': 'image/png', transparent: true},
            {'isBaseLayer': false, singleTile: true,
             visibility: false, featureInfoFormat: "application/vnd.ogc.gml",
             alpha:true, opacity: 0.7})

};

// Create list of layers.
Heron.options.map.layers = [

    // The baselayers.
    Heron.data.layermap.openbasiskaart_osm,
    Heron.data.layermap.pdok_brtachtergrondkaart,

    // Theme layers.
    Heron.data.layermap.natura2000wms,
    Heron.data.layermap.nationaleparken,
    Heron.data.layermap.wetlands
];
