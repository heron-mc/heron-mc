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
Ext.namespace("Heron.options.map");

// All Layers
Heron.options.layers = [
    ["OpenLayers.Layer.TMS", "OpenBasisKaart",
        'http://openbasiskaart.nl/mapcache/tms',
        {layername: 'osm@rd',
            type: "png",
            isBaseLayer: true,
            attribution: "<a href='http://www.openbasiskaart.nl'>OpenBasisKaart - OpenGeoGroep</a><br/>Data: <a href='http://openstreetmap.org/'>© OpenStreetMap contributors</a> <a href='http://www.openstreetmap.org/copyright'>ODbL</a><br/>Gemaakt met <a href='http://heron-mc.org/'>Heron MC</a> ",
            transitionEffect: 'resize'}]
];

// All Map settings
Heron.options.settings = {
    // Standard OpenLayers Map config settings
    projection: 'EPSG:28992',
    units: 'm',

    /* Using the PDOK/Geonovum NL Tiling rec. */
    resolutions: [3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720, 3.360, 1.680, 0.840, 0.420],
    maxExtent: '-285401.920, 22598.080, 595401.920, 903401.920',
    center: '155000,463000',
    zoom: 3
};

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.toolbar = [
    {type: "pan"},
    {type: "zoomin"},
    {type: "zoomout"},
    {type: "zoomvisible"},
    {type: "-"} ,
    {type: "zoomprevious"},
    {type: "zoomnext"}
];

// All Map settings bundled
Heron.options.map = {
    settings: Heron.options.settings,
    layers: Heron.options.layers,
    toolbar: Heron.options.toolbar
};
