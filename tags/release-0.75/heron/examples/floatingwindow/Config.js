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


/** api: example[floatingwindow]
 *  Floating Window
 *  ---------------
 *  Demonstrates Heron app within floating Ext JS Window.
 */

/**
 * Defines the most minimal Heron layout: just a Map with a zoomslider.
 *
 **/
Heron.layout = {
	xtype: 'window',
	title: "Hello Heron",
	height: 280,
	width: 450,
	layout: "fit",
	closeAction: "hide",

	/** Below are Heron-specific settings for the Heron MapPanel (xtype: 'hr_mappanel') */
	items: [
		{
			xtype: "gx_mappanel",
			layers: [new OpenLayers.Layer.WMS("Global Imagery",
									  "http://maps.opengeo.org/geowebcache/service/wms",
					  {layers: "bluemarble"})],
			zoom: 1
		}
	]
};
