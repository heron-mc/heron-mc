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

/** api: example[overviewmapnl]
 *  Overview Map Dutch
 *  ------------------
 *  Integrate the standard OpenLayers OverviewMapControl to determine/pan overall location (Dutch Projection).
 */

Ext.namespace("Heron.options.map.settings");


Heron.options.map.settings.zoom = 5;
Heron.options.map.settings.center = '155000, 465000';

Heron.options.map.toolbar.push({type: "-"});

Heron.options.map.toolbar.push(
    {
        type: "overviewmap",
        options: {
            // See OpenLayers ref: OpenLayers.Control.OverviewMap
            // Use first basemap
            overviewOptions: {
                size: new OpenLayers.Size(250, 150),
                maximized: true,
                minRectSize: 0,
                autoPan: true,
                mapOptions: {
                    projection: new OpenLayers.Projection("EPSG:28992"),
                    units: "m",
                    // Need these!
                    resolutions: [3440.640, 1720.320, 860.160, 430.080]
                    //numZoomLevels : 1 // this has no effect, the ov map still zooms in and out with the map
                }
            }
        }
    }
);
