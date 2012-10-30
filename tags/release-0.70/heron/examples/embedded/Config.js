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

/** api: example[embedded]
 *  Embedded
 *  --------
 *  Embed a Heron app within any page div element.
 */

/**
 * Defines the most minimal Heron app: just a Map with a zoomslider.
 *
 **/
Heron.layout = {
	xtype: 'hr_mappanel',
	renderTo: 'mapdiv',
	height: 400,
	width: 600,

	/* More optional ExtJS Panel properties here, see ExtJS API docs */

	/** Below are Heron-specific settings for the Heron MapPanel (xtype: 'hr_mappanel') */
	hropts: {
		layers: [new OpenLayers.Layer.WMS("Global Imagery",
								  "http://maps.opengeo.org/geowebcache/service/wms",
				  {layers: "bluemarble"})]
	}
};
