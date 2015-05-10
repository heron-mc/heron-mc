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
 *  Show Google StreetView for clicked point in map. WORK IN PROGRESS!
 */
Heron.options.map.toolbar.push({type: "-"});

Heron.options.map.toolbar.push({
        options: {
            tooltip: __('Open new window in Google StreetView'),
            iconCls: "icon-streetview",
            enableToggle: true,
            pressed: false,
            id: "streetview",
            toggleGroup: "toolGroup",
            popupOptions: {
                title: __('Street View'),
                anchored: false,
                anchorPosition: 'auto',
                width: 300,
                height: 300,
                collapsible: true,
                draggable : true
            }
        },

        create: function (mapPanel, options) {

            var ClickControl = OpenLayers.Class(OpenLayers.Control, {

                defaults: {
                    pixelTolerance: 1,
                    stopSingle: true
                },

                initialize: function (options) {
                    this.handlerOptions = OpenLayers.Util.extend(
                        {}, this.defaults
                    );
                    OpenLayers.Control.prototype.initialize.apply(this, arguments);
                    this.handler = new OpenLayers.Handler.Click(
                        this, {click: this.trigger}, this.handlerOptions
                    );
                },

                trigger: function (event) {
                    openPopup(this.map.getLonLatFromViewPortPx(event.xy));
                }

            });

            var popup;

            function openPopup(location) {
                if (!location) {
                    location = mapPanel.map.getCenter();
                }
                if (popup && popup.anc) {
                    popup.close();
                }

                var popupOptions = {
                    location: location,
                    map: mapPanel,
                    items: [new gxp.GoogleStreetViewPanel()]
                };

                Ext.apply(popupOptions, options.popupOptions);
                popup = new GeoExt.Popup(popupOptions);
                popup.show();
            }

            options.control = new ClickControl({
                trigger: function (e) {
                    openPopup(this.map.getLonLatFromViewPortPx(e.xy));
                }
            });

            return new GeoExt.Action(options);
        }
    }
);


