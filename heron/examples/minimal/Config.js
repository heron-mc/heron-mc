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
Ext.namespace("Heron");


/** api: example[minimal]
 *  Minimal
 *  -------
 *  The "Hello World" app, the most minimal config to define a Heron app.
 */

/**
 * Defines the most minimal Heron app: just a Map with default controls.
 *
 **/
Heron.layout = {
    xtype: 'hr_mappanel',

    /* Optional MapPanel ExtJS Panel properties here, see ExtJS API docs */

    /** Below are Heron-specific settings for the MapPanel (xtype: 'hr_mappanel') */
    hropts: {
        layers: [
            // Using the new config method without "new"
            ["OpenLayers.Layer.WMS", "World Map",
                "http://www2.demis.nl/WMS/wms.asp?WMS=WorldMap",
                {layers: 'Coastlines', format: 'image/png' }]
        ]
    }
};
