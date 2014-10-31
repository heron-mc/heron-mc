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


/** api: example[bookmarks]
 *  Bookmarks
 *  ---------
 *  Lightweight web mapping context manager. Add and persist current map context (layers, zoom, extent etc).
 */

/**
 * Demonstrates the use of Bookmarks, a lightweight web mapping context.
 *
 **/
/** Values for BookmarksPanel (A bookmark link can jump to specific layers/zoom/center on map. */

/*
 See DefaultConfig.js where the bookmarks panel is added as follows:

				{
					xtype: 'hr_bookmarkspanel',
					id: 'hr-bookmarks',
					hropts: Heron.options.bookmarks
				}
 */
Ext.namespace("Heron.options");

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {
		popupWindow: {
			width: 360,
			height: 200,
			featureInfoPanel: {
                displayPanels: ['Table'],
				// Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'Shapefile', 'GeoJSON', 'WellKnownText'],
				// Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
				// exportFormats: ['CSV', 'XLS'],
				maxFeatures: 10
			}
		}
	}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "coordinatesearch", options: {onSearchCompleteZoom: 8}},
	{type: "-"} ,
	{type: "zoomprevious"},
	{type: "zoomnext"},
	{type: "-"},
	{type: "addbookmark"}
];

Heron.options.bookmarks =
		[
			{
				id: 'tnotoch',
				name: 'TNO Boorgaten',
				desc: 'een voorbeeld van een TNO Dino Services',
				layers: ['OpenStreetMap', 'TNO Boorgaten'],
				x: 133993,
				y: 473167,
				zoom: 10
			},
			{
				id: 'debrughaha',
				name: 'Kadaster - De Brug',
				desc: 'een voorbeeld van een Place2',
				layers: ['Luchtfoto (PDOK)'],
				x: 194194,
				y: 465873,
				zoom: 13
			}
		];