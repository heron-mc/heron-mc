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

Ext.namespace("Heron.options.map.settings");

/** api: example[streetview]
 *  StreetView
 *  ----------
 *  Show Google StreetView for clicked point in map.
 */
Heron.options.map.toolbar.push({type: "-"});

// See more options in ToolbarBuilder.js for "streetview" entry.
Heron.options.map.toolbar.push({ type: "streetview", options: {
            pressed: true
        }});

// All options:
//options: {
//    tooltip: __('Click on map to view location in Google StreetView'),
//    iconCls: "icon-streetview",
//    enableToggle: true,
//    pressed: false,
//    id: "streetview",
//    toggleGroup: "toolGroup",
//    popupOptions: {
//        title: __('Street View'),
//        anchored: false,
//        anchorPosition: 'auto',
//        width: 300,
//        height: 300,
//        collapsible: true,
//        draggable: true
//    }
//}
