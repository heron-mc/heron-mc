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


/** api: example[nolaunch]
 *  NoLaunch
 *  --------
 *  Take control over Heron initialization using the NoLaunch.js import.
 */

/**
 * Defines the most minimal Heron layout: just a Map with a zoomslider.
 *
 **/
Heron.layout = {
	xtype: 'hr_mappanel',
	renderTo: 'mapdiv',
	height: 400,
	width: 600,

	/** Below are Heron-specific settings for the Heron MapPanel (xtype: 'hr_mappanel') */
	hropts: {
		layers: [new OpenLayers.Layer.WMS("Global Imagery",
								  "http://maps.opengeo.org/geowebcache/service/wms",
				  {layers: "bluemarble"})]
	}
};

/** Our control code: a button that explicitly creates and shows the heron app. */
Ext.onReady(function() {
    var button = new Ext.Button({
        text: "Launch Heron App !",
        handler: function() {
			Heron.App.create();
			Heron.App.show();
         }
    });
    var container = Ext.Element.get('buttondiv');
    container.setHeight(35, {callback: function() {button.render(container)}});
});