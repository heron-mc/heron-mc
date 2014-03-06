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
