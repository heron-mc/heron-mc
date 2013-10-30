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
 * Some Heron components derive from GXP classes.
 * This would  require the entire GXP lib to be included.
 * This file is needed when NOT using GXP or Heron-GXP-derived classes
 * such that including GXP is not required.
 */

Ext.namespace("gxp");
if (!gxp.QueryPanel) {
    // Just make a null def for the query Panel
    gxp.QueryPanel = function () {
    };
} else {
    /** GXP is used. Below fixes that did not make it into the Boundless GXP Master branch. */

    /** Using the ExtJS-way to override single methods of classes. */
    Ext.override(gxp.data.WFSProtocolProxy, {

                /** api: constructor
                 *  .. class:: WFSProtocolProxy
                 *
                 *      A data proxy for use with ``OpenLayers.Protocol.WFS`` objects.
                 *
                 *      This is mainly to extend Ext 3.0 functionality to the
                 *      GeoExt.data.ProtocolProxy.  This could be simplified by having
                 *      the ProtocolProxy support writers (implement doRequest).
                 */
                constructor: function (config) {

                    Ext.applyIf(config, {

                        /** api: config[version]
                         *  ``String``
                         *  WFS version.  Default is "1.1.0".
                         */
                        version: "1.1.0"

                        /** api: config[maxFeatures]
                         *  ``Number``
                         *  Optional limit for number of features requested in a read.  No
                         *  limit set by default.
                         */

                        /** api: config[multi]
                         *  ``Boolean`` If set to true, geometries will be casted to Multi
                         *  geometries before writing. No casting will be done for reading.
                         */

                    });

                    // create the protocol if none provided
                    if (!(this.protocol && this.protocol instanceof OpenLayers.Protocol)) {
                        config.protocol = new OpenLayers.Protocol.WFS(Ext.apply({
                            version: config.version,
                            srsName: config.srsName,
                            url: config.url,
                            featureType: config.featureType,
                            featureNS: config.featureNS,
                            geometryName: config.geometryName,
                            schema: config.schema,
                            filter: config.filter,
                            maxFeatures: config.maxFeatures,
                            /** JvdB: VERY VERY NASTY FIX for PDOK: but otherwise the default of GML3 won't work. */
                            outputFormat: config.url.indexOf('nationaalgeoregister') > 0 ? 'GML2' : undefined,
                            multi: config.multi
                        }, config.protocol));
                    }

                    gxp.data.WFSProtocolProxy.superclass.constructor.apply(this, arguments);
                }
            }
    )

}
