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

/** api: (define)
 *  module = Heron.widgets
 *  class = GXP_LayerPanel
 *  base_link = `Ext.Panel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.Container>`_
 */

Ext.namespace("Heron.widgets");

/** api: example
 *
 *
 *  .. code-block:: javascript
 *

 *
 *
 *
 */

Heron.widgets.GXP_LayerPanel_Empty = Ext.extend(Ext.Container, {});

/** api: constructor
 *  .. class:: LayerRecord
 *
 *      A record that represents an ``OpenLayers.Layer``. This record
 *      will always have at least the following fields:
 *
 *      * title ``String``
 */
GeoExt.data.LayerRecord.prototype.fields.add(new Ext.data.Field({name: "group", type: "string", mapping: "group"}));

//= Ext.data.Record.create([
//    {name: "layer"},
//    {name: "title", type: "string", mapping: "name"},
//    {name: "group", type: "string", mapping: "group"}
//]);

/** api: constructor
 *  .. class:: GXP_LayerPanel(config)
 *
 *  Wrap and configure an OpenGeo `GXP LayerTree <http://gxp.opengeo.org/master/doc/lib/widgets/QueryPanel.html>`_.
 */
Heron.widgets.GXP_LayerPanel = Ext.extend(Ext.Container, {

    /** api: config[layerSortOrder]
     *  ``String``
     *  How should the layer names be sorted in the selector, 'ASC', 'DESC' or null (as Map order)?
     *  default value is 'ASC' (Alphabetically Ascending).
     */
    layerSources: {},

// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
    initComponent: function () {
                // pass on any proxy config to OpenLayers
        if (OpenLayers.ProxyHost) {
            this.proxy = OpenLayers.ProxyHost;
        }

        // var lr = GeoExt.data.LayerRecord;
        this.initTools();

        //
        this.addListener("afterrender", this.onAfterRender);

        // add any custom application events
        this.addEvents(
            /** api: event[ready]
             *  Fires when application is ready for user interaction.
             */
            "ready",

            /** api: event[portalready]
             *  Fires after the portal is initialized.
             */
            "portalready",
            /** api: event[beforelayerselectionchange]
             *  Fired before the selected set of layers changes.  Listeners
             *  can return ``false`` to stop the selected layers from being
             *  changed.
             *
             *  Listeners arguments:
             *
             *  * layerRecord - ``GeoExt.data.LayerRecord`` the record of the
             *    selected layer, or null if no layer is selected.
             */
            "beforelayerselectionchange",

            /** api: event[layerselectionchange]
             *  Fired when the selected set of layers changes.
             *
             *  Listeners arguments:
             *
             *  * layerRecord - ``GeoExt.data.LayerRecord`` the record of the
             *    selected layer, or null if no layer is selected.
             */
            "layerselectionchange"

        );

        Heron.widgets.GXP_LayerPanel.superclass.initComponent.call(this);
    },

    onAfterRender: function () {
        // initialize all layer source plugins
        var config, queue = [];
        for (var key in this.sources) {
            queue.push(this.createSourceLoader(key));
        }
        gxp.util.dispatch(queue, this.activate, this);
        this.fireEvent("portalready");

    },

    activate: function () {
        // initialize tooltips
        Ext.QuickTips.init();

        // add any layers from config
        // this.addLayers();

        // respond to any queued requests for layer records
        // this.checkLayerRecordQueue();

        // broadcast ready state
        this.fireEvent("ready");
    },

    initTools: function () {
        // this.tools = {};
        if (this.tools && this.tools.length > 0) {
            var tool;
            for (var i = 0, len = this.tools.length; i < len; i++) {
                try {
                    tool = Ext.ComponentMgr.createPlugin(
                        this.tools[i], this.defaultToolType
                    );
                } catch (err) {
                    throw new Error("Could not create tool plugin with ptype: " + this.tools[i].ptype);
                }
                tool.init(this);
            }
        }
    },

    createSourceLoader: function (key) {
        var map = this.map = Heron.App.getMap();
        this.mapPanel = Heron.App.getMapPanel();
        return function (done) {
            var config = this.sources[key];
            config.projection = map.projection;
            this.addLayerSource({
                id: key,
                config: config,
                callback: done,
                fallback: function (source, msg, details) {
                    // TODO: log these issues somewhere that the app can display
                    // them after loading.
                    // console.log(arguments);
                    done();
                },
                scope: this
            });
        };
    },

    /** api: method[isAuthorized]
     *  :arg roles: ``String|Array`` optional, default is "ROLE_ADMINISTRATOR".
     *       If an array is provided, this method will return if any of the
     *       roles in the array is authorized.
     *  :returns: ``Boolean`` The user is authorized for the given role.
     *
     *  Returns true if the client is authorized with the provided role.
     *  In cases where the application doesn't explicitly handle authentication,
     *  the user is assumed to be authorized for all roles.  This results in
     *  authentication challenges from the browser when an action requires
     *  credentials.
     */
    isAuthorized: function(roles) {
        /**
         * If the application doesn't support authentication, we expect
         * authorizedRoles to be undefined.  In this case, from the UI
         * perspective, we treat the user as if they are authorized to do
         * anything.  This will result in just-in-time authentication challenges
         * from the browser where authentication credentials are needed.
         * If the application does support authentication, we expect
         * authorizedRoles to be a list of roles for which the user is
         * authorized.
         */
        var authorized = true;
        if (this.authorizedRoles) {
            authorized = false;
            if (!roles) {
                roles = "ROLE_ADMINISTRATOR";
            }
            if (!Ext.isArray(roles)) {
                roles = [roles];
            }
            for (var i=roles.length-1; i>=0; --i) {
                if (~this.authorizedRoles.indexOf(roles[i])) {
                    authorized = true;
                    break;
                }
            }
        }
        return authorized;
    },

    addLayerSource: function (options) {
        var id = options.id || Ext.id(null, "gxp-source-");
        var source;
        var config = options.config;
        config.id = id;
        try {
            source = Ext.ComponentMgr.createPlugin(
                config, this.defaultSourceType
            );
        } catch (err) {
            throw new Error("Could not create new source plugin with ptype: " + options.config.ptype);
        }
        source.on({
            ready: {
                fn: function () {
                    var callback = options.callback || Ext.emptyFn;
                    callback.call(options.scope || this, id);
                },
                scope: this,
                single: true
            },
            failure: {
                fn: function () {
                    var fallback = options.fallback || Ext.emptyFn;
                    delete this.layerSources[id];
                    fallback.apply(options.scope || this, arguments);
                },
                scope: this,
                single: true
            }
        });
        this.layerSources[id] = source;
        source.init(this);

        return source;
    },

    /** api:method[getSource]
      *  :arg layerRec: ``GeoExt.data.LayerRecord`` the layer to get the
      *      source for.
      */
     getSource: function(layerRec) {
         return layerRec && this.layerSources[layerRec.get("source")];
     },

    /** api: method[selectLayer]
      *  :arg record: ``GeoExt.data.LayerRecord``` Layer record.  Call with no
      *      layer record to remove layer selection.
      *  :returns: ``Boolean`` Layers were set as selected.
      *
      *  TODO: change to selectLayers (plural)
      */
     selectLayer: function(record) {
         record = record || null;
         var changed = false;
         var allow = this.fireEvent("beforelayerselectionchange", record);
         if (allow !== false) {
             changed = true;
             if (this.selectedLayer) {
                 this.selectedLayer.set("selected", false);
             }
             this.selectedLayer = record;
             if (this.selectedLayer) {
                 this.selectedLayer.set("selected", true);
             }
             this.fireEvent("layerselectionchange", record);
         }
         return changed;
     }


});

/** api: xtype = hr_gxplayerpanel */
Ext.reg('hr_gxplayerpanel', Heron.widgets.GXP_LayerPanel);
