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

/** api: example[overviewmap]
 *  Overview Map
 *  ------------
 *  Integrate the standard OpenLayers OverviewMapControl to determine/pan overall location.
 */

/*
 * Overrule (OpenLayers) Map settings for MapPanel
 */
Ext.namespace("Heron.options.map.settings");

Heron.options.map.settings.zoom = 5;
Heron.options.map.settings.center = '4.92, 52.35';

Heron.options.map.toolbar.push({type: "-"});

// Add overview map button to toolbar
Heron.options.map.toolbar.push(
    {
        type: "overviewmap",
        // NB options"can be completely left out: the basemap is taken. Leaving out options does not work with
        // other projections like Dutch RD!
        options: {
            // See http://dev.openlayers.org/apidocs/files/OpenLayers/Control/OverviewMap-js.html for options
            overviewOptions: {
                layers: [
                    new OpenLayers.Layer.WMS(
                        "Meteosat Baselayer",
                        'http://msgcpp-ogc-realtime.knmi.nl/msgrt.cgi?',
                        {layers: "baselayer", transparent: true, format: 'image/png'},
                        {
                            singleTile: true,
                            opacity: 0.9,
                            isBaseLayer: true,
                            visibility: false,
                            noLegend: false,
                            transitionEffect: 'resize'
                        }
                    )

                ],
                autoActivate: true,
                // autoPan: true,
                maximized: true,
                minRatio: 16,
                maxRatio: 64,
                mapOptions: {
                    projection: new OpenLayers.Projection("EPSG:4326")
                }
            }
        }
    }
);

