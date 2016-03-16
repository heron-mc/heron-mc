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
            overviewOptions: {
                // See http://dev.openlayers.org/apidocs/files/OpenLayers/Control/OverviewMap-js.html for options
                layers: [
                    new OpenLayers.Layer.WMS(
                        "Meteosat Baselayer",
                        Heron.scratch.urls.MAP5_WMS,
                        {layers: "opentopo", transparent: true, format: 'image/jpeg'},
                        {
                            singleTile: true,
                            opacity: 1.0,
                            isBaseLayer: true,
                            visibility: false,
                            noLegend: false,
                            transitionEffect: 'resize'
                        }
                    )

                ],
                autoActivate: true,
                autoPan: true,
                maximized: true,
                size: new OpenLayers.Size(240, 300),
                minRatio: 16,
                maxRatio: 64,
                mapOptions: {
                    // See http://andresherreracali.blogspot.nl/2012/03/overviewmap-control-widget-for-heron-mc.html
                    // Somehow cannot use EPSG:28992 here
                    projection: new OpenLayers.Projection("EPSG:900913"),
                    units: 'm'
                }
            }
        }
    }
);
