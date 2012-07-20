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


/** api: example[shortcuts]
 *  Shortcuts
 *  ---------
 *  Demonstrates the use of Shortcuts, a lightweight web mapping context.
 */

/**
 * Demonstrates the use of Shortcuts, a lightweight web mapping context.
 *
 **/
/** Values for ContextBrowser (shortcuts to jump to specific layers/zoom/center on map. */

/*
 See DefaultConfig.js where the context browser panel is added as follows:

				{
					xtype: 'hr_contextbrowserpanel',
					id: 'hr-contextbrowser',
					hropts: Heron.options.contextbrowser
				}
 */
Ext.namespace("Heron.options.contextbrowser");
Heron.options.contextbrowser =
		[
			{
				id: 'tno',
				name: 'TNO Boorgaten',
				desc: 'een voorbeeld van een TNO Dino Services',
				layers: ['OpenStreetMap', 'TNO Boorgaten'],
				x: 133993,
				y: 473167,
				zoom: 10
			},
			{
				id: 'debrug',
				name: 'Kadaster - De Brug',
				desc: 'een voorbeeld van een Place2',
				layers: ['Luchtfoto (NLR)'],
				x: 194194,
				y: 465873,
				zoom: 10
			}
		];