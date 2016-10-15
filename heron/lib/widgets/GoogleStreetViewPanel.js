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

/**
 * Adapted (mainly namespaces) for Heron from the original version at:
 * https://github.com/boundlessgeo/gxp/blob/master/src/script/widgets/GoogleStreetViewPanel.js
 * Original license:
 *
 * Copyright (c) 2008-2011 The Open Planning Project
 *
 * Published under the GPL license.
 * See https://github.com/opengeo/gxp/raw/master/license.txt for the full text
 * of the license.
 */

/** api: (define)
 *  module = Heron.widgets
 *  class = GoogleStreetViewPanel
 *  base_link = `Ext.Panel <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Panel>`_
 */
// Ext.namespace("gxp");
Ext.namespace("Heron.widgets");

Heron.widgets.GoogleStreetViewPanel = Ext.extend(Ext.Panel, {

    /** private: property[panorama]
     *  ``google.maps.StreetViewPanorama``  The panorama object.
     */
    panorama: null,

    /** api: config[heading]
     *  ``Number``  The camera heading in degrees relative to true north. True north
     *  is 0 degrees, east is 90 degrees, south is 180 degrees, west is 270
     *  degrees.
     */
    /** private: property[heading]
     *  ``Number``  Camera heading.
     */
    heading: 0,

    /** api: config[pitch]
     *  ``Number``  The camera pitch in degrees, relative to the street view
     *  vehicle. Ranges from 90 degrees (directly upwards) to -90 degrees
     *  (directly downwards).
     */
    /** private: property[pitch]
     *  ``Number``  Camery pitch
     */
    pitch: 0,

    /** api: config[zoom]
     *  ``Number``  The zoom level. Fully zoomed-out is level 0, zooming in
     *  increases the zoom level.
     */
    /** private: property[zoom]
     *  ``Number``  Panorama zoom level
     */
    zoom: 0,

    /** api: config[location]
     *  ``OpenLayers.LonLat``  The panorama location
     */
    /** private: property[location]
     *  ``OpenLayers.LonLat``  Panorama location
     */
    location: null,

    /** private: method[initComponent]
     *  Private initComponent override.
     */
    initComponent: function () {
        var defConfig = {
            plain: true,
            border: false
        };

        Ext.applyIf(this, defConfig);
        return Heron.widgets.GoogleStreetViewPanel.superclass.initComponent.call(this);
    },

    /** private: method[afterRender]
     *  Private afterRender override.
     */
    afterRender: function () {
        var owner = this.ownerCt;
        if (owner) {
            var size = owner.getSize();
            Ext.applyIf(this, size);
            if (!this.location) {
                // try to derive location from owner (e.g. popup)
                if (GeoExt.Popup) {
                    this.bubble(function (cmp) {
                        if (cmp instanceof GeoExt.Popup) {
                            this.location = cmp.location.clone().transform(
                                cmp.map.getProjectionObject(),
                                new OpenLayers.Projection("EPSG:4326")
                            );
                            return false;
                        }
                    }, this);
                }
            }
            owner.addListener("resize", this.onResize, this);
        }
        Heron.widgets.GoogleStreetViewPanel.superclass.afterRender.call(this);

        // Configure panorama and associate methods and parameters to it
        // https://developers.google.com/maps/documentation/javascript/3.17/reference#StreetViewPanoramaOptions
        var options = {
            position: new google.maps.LatLng(this.location.lat, this.location.lon),
            pov: {
                heading: this.heading,
                pitch: this.pitch,
                zoom: this.zoom
            }
        };

        var panorama = this.panorama = new google.maps.StreetViewPanorama(
            this.body.dom, options
        );

        google.maps.event.addListener(panorama, 'position_changed', function () {
            var pos = panorama.getPosition();
        });
        google.maps.event.addListener(panorama, 'pov_changed', function () {
            var pov = panorama.getPov();
            var heading = pov.heading;
            var pitch = pov.pitch;
        });

    },

    /** private: method[beforeDestroy]
     *  Destroy Street View Panorama instance and navigation tools
     *
     */
    beforeDestroy: function () {
        var i = 0;

        delete this.panorama;
        Heron.widgets.GoogleStreetViewPanel.superclass.beforeDestroy.apply(this, arguments);
    },

    /** private: method[onResize]
     *  Resize Street View Panorama
     *  :param w: ``Number`` Width
     *  :param h: ``Number`` Height
     */
    onResize: function (w, h) {
        Heron.widgets.GoogleStreetViewPanel.superclass.onResize.apply(this, arguments);
        if (this.panorama) {
            if (typeof this.panorama == "object") {
                google.maps.event.trigger(this.panorama, "resize");
            }
        }
    },

    /** private: method[setSize]
     *  Set size of Street View Panorama
     */
    setSize: function (width, height, animate) {
        Heron.widgets.GoogleStreetViewPanel.superclass.setSize.apply(this, arguments);
        if (this.panorama) {
            if (typeof this.panorama == "object") {
                google.maps.event.trigger(this.panorama, "resize");
            }
        }
    }
});

/** api: xtype = hr_googlestreetviewpanel */
Ext.reg("hr_googlestreetviewpanel", Heron.widgets.GoogleStreetViewPanel);
