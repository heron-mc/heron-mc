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
Ext.namespace("Heron.widgets");

/** api: (define)
 *  module = Heron.widgets
 *  class = SpatialSearchPanel
 *  base_link = `Ext.Panel <http://docs.sencha.com/ext-js/3-4/#!/api/Ext.Panel>`_
 */

/** api: example
 *  See examples. Sample code showing how to configure a Heron SpatialSearchPanel.
 *
 *  .. code-block:: javascript

 Heron.examples.searchPanelConfig = {
            xtype: 'hr_searchcenterpanel',
            hropts: {
                searchPanel: {
                xtype: 'hr_spatialsearchpanel',
                    id: 'hr-spatialsearchpanel',
                    header: false,
                     border: false,
                    style: {
                        fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                        fontSize: '12px'
                    },
                     searchByFeature: {
                         active: true
                     },
                     searchByDraw: {
                         active: false,
                         sketchOnly: false,
                         cumulative: false
                     }
                },
                resultPanel: {
                    xtype: 'hr_featuregridpanel',
                    id: 'hr-featuregridpanel',
                    header: false,
                     border: false,
                    autoConfig: true,
                    hropts: {
                        zoomOnRowDoubleClick: true,
                        zoomOnFeatureSelect: false,
                        zoomLevelPointSelect: 8,
                        zoomToDataExtent: false
                    }
                }
            }
         };

 * And then enable the SpatialSearchPanel as a MapPanel toolbar item (type: 'searchcenter', icon: binoculars).
 *
 *  .. code-block:: javascript
 *
 Heron.options.map.toolbar = [
 {type: "featureinfo", options: {max_features: 20}},
 {type: "-"} ,
 {type: "pan"},
 {type: "zoomin"},
 {type: "zoomout"},
 {type: "zoomvisible"},
 {type: "-"} ,
 {type: "zoomprevious"},
 {type: "zoomnext"},
 {type: "-"},
 {
     type: "searchcenter",
     // Options for SearchPanel window
     options: {
         show: true,

         searchWindow: {
             title: __('Spatial Search'),
             x: 100,
             y: undefined,
             width: 360,
             height: 400,
             items: [
                 Heron.examples.searchPanelConfig
             ]
         }
     }
 }

 *
 */

/** api: constructor
 *  .. class:: SpatialSearchPanel(config)
 *
 *  A Panel to hold a spatial search either by drawing geometries and/or selecting features
 *  from another layer. Also can be initialized with features found through external search (see MultiSearchCenterPanel).
 *  Combines: https://code.google.com/p/geoext-viewer/issues/detail?id=177 and
 *  https://code.google.com/p/geoext-viewer/issues/detail?id=178 (like ArcGIS Search by Location).
 *
 *  The SpatialSearchPanel supports:
 *
 * - Search by Feature Selection:
 *   select from one or more source layers,
 *   add last result (geometries) to current selection,
 *   replace selection with last result (geoms),
 *   clear selection,
 *   use selection from drawn sketch (sketchOnly option in search by draw).
 *
 * - Search by Draw:
 *    draw features on map,
 *    option: sketchOnly: do not search but add to selection layer (switch to select by feature to use).
 */
Heron.widgets.SpatialSearchPanel = Ext.extend(Ext.Panel, {
    layout: 'form',
    bodyStyle: 'padding: 24px 12px 12px 12px',
    border: false,

    /** api: config[name]
     *  ``String``
     *  Name, e.g. for multiple searches combo.
     */
    name: __('Spatial Search'),

    /** api: config[description]
     *  ``String``
     *  Default description in status area.
     */
    description: '',

    /** api: config[filterFeatures]
     *  ``Array``
     *  Features from last external Search.
     *  Default null
     */
    fromLastResult: false,

    /** api: config[lastSearchName]
     *  ``String``
     *  Name of last Search (UNUSED).
     *  Default null
     */
    lastSearchName: null,

    /** api: config[filterFeatures]
     *  ``Array``
     *  Features from last external Search.
     *  Default null
     */
    filterFeatures: null,

    showFilterFeatures: true,

    /** api: config[maxFilterGeometries]
     *  ``Integer``
     *  Max features to use for Search selection.
     *  Default 24
     */
    maxFilterGeometries: 24,

    /** api: config[selectLayerStyle]
     *  ``Object``
     *  OpenLayers Style config to use for features Selection Layer.
     *  Default reddish
     */
    selectLayerStyle: {
        pointRadius: 10,
        strokeColor: "#dd0000",
        strokeWidth: 1,
        fillOpacity: 0.4,
        fillColor: "#cc0000"
    },

    /** api: config[layerSortOrder]
     *  ``String``
     *  How should the layer names be sorted in the selector, 'ASC', 'DESC' or null (as Map order)?
     *  default value is 'ASC' (Alphabetically Ascending).
     */
    layerSortOrder: 'ASC',

    /** api: config[layerFilter]
     *  ``Function``
     *  Filter for OpenLayer getLayersBy(), to filter out WFS-enabled Layers from Layer array.
     *  Default: only Layers that have metadata.wfs (see OpenLayers Layer spec and examples) set.
     */
    layerFilter: function (map) {
        /* Select only those (WMS) layers that have a WFS attached
         * Note: WMS-layers should have the 'metadata.wfs' property configured,
         * either with a full OL WFS protocol object or the string 'fromWMSLayer'.
         * The latter means that a WMS has a related WFS (GeoServer usually).
         */
        return map.getLayersBy('metadata',
                {
                    test: function (metadata) {
                        return metadata && metadata.wfs;
                    }
                }
        )
    },

    progressMessages: [
        __('Working on it...'),
        __('Still searching, please be patient...'),
        __('Still searching, have you selected an area with too many objects?')
    ],

// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
    initComponent: function () {

        this.addEvents(this.getEvents());

        Heron.widgets.SpatialSearchPanel.superclass.initComponent.call(this);

        this.map = Heron.App.getMap();
        this.addSelectionLayer();

        this.addListener("selectionlayerupdate", this.onSelectionLayerUpdate, this);
        this.addListener("targetlayerselected", this.onTargetLayerSelected, this);
        this.addListener("drawingcomplete", this.onDrawingComplete, this);
        this.addListener("searchissued", this.onSearchIssued, this);
        this.addListener("searchcomplete", this.onSearchComplete, this);
        this.addListener("beforedestroy", this.onBeforeDestroy, this);

        // ExtJS lifecycle events
        this.addListener("afterrender", this.onPanelRendered, this);

        if (this.ownerCt) {
            this.ownerCt.addListener("parenthide", this.onParentHide, this);
            this.ownerCt.addListener("parentshow", this.onParentShow, this);
        }
    },

    addSelectionLayer: function () {
        if (this.selectionLayer) {
            return;
        }
        this.selectionLayer = new OpenLayers.Layer.Vector(__('Selection'), {
            style: this.selectLayerStyle,
            displayInLayerSwitcher: false,
            hideInLegend: false,
            isBaseLayer: false
        });
        this.map.addLayers([this.selectionLayer]);
    },

    getEvents: function () {
        // Setup our own events
        return {
            "selectionlayerupdate": true,
            "targetlayerselected": true,
            "drawingcomplete": true,
            "searchissued": true,
            "searchcomplete": true,
            "searchfailed": true,
            "searchsuccess": true
        };

    },

    createStatusPanel: function () {

        var infoText = __('Select the Layer to query') + '<p>' + this.description + '</p>';
        if (this.lastSearchName) {
            infoText += '<p>' + __('Using geometries from the result: ') + '<br/>' + this.lastSearchName;
            if (this.filterFeatures) {
                infoText += '<br/>' + __('with') + ' ' + this.filterFeatures.length + ' ' + __('features');
            }
            infoText += '</p>';
        }

        this.statusPanel = new Heron.widgets.HTMLPanel({
            html: infoText,
            preventBodyReset: true,
            bodyCfg: {
                style: {
                    padding: '6px',
                    border: '1px'
                }
            },
            style: {
                marginTop: '10px',
                marginBottom: '10px',
                fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                fontSize: '11px',
                color: '#0000C0'
            }
        });

        return this.statusPanel;
    },

    createDrawToolPanel: function (config) {
        var defaultConfig = {
            html: '<div class="olControlEditingToolbar olControlNoSelect">&nbsp;</div>',
            preventBodyReset: true,
            style: {
                marginTop: '32px',
                marginBottom: '24px'
            },
            listeners: {
                afterrender: function (htmlPanel) {
                    var div = htmlPanel.body.dom.firstChild;
                    if (!div) {
                        Ext.Msg.alert('Warning', 'Cannot render draw controls');
                        return;
                    }
                    this.addDrawControls(div);
                    this.activateDrawControl();
                },
                scope: this
            }
        };
        config = Ext.apply(defaultConfig, config);

        return this.drawToolPanel = new Heron.widgets.HTMLPanel(config);
    },

    addDrawControls: function (div) {
        this.drawControl = new OpenLayers.Control.EditingToolbar(this.selectionLayer, {div: div});

        // Bit a hack but we want tooltips for the drawing controls.
        this.drawControl.controls[0].panel_div.title = __('Return to map navigation');
        this.drawControl.controls[1].panel_div.title = __('Draw point');
        this.drawControl.controls[2].panel_div.title = __('Draw line');
        this.drawControl.controls[3].panel_div.title = __('Draw polygon');

        var drawCircleControl = new OpenLayers.Control.DrawFeature(this.selectionLayer,
                OpenLayers.Handler.RegularPolygon, {
                    title: __('Draw circle (click and drag)'),
                    displayClass: 'olControlDrawCircle',
                    handlerOptions: {
                        citeCompliant: this.drawControl.citeCompliant,
                        sides: 30,
                        irregular: false
                    }
                }
        );
        this.drawControl.addControls([drawCircleControl]);

        // Add extra rectangle draw
        var drawRectangleControl = new OpenLayers.Control.DrawFeature(this.selectionLayer,
                OpenLayers.Handler.RegularPolygon, {
                    displayClass: 'olControlDrawRectangle',
                    title: __('Draw Rectangle (click and drag)'),
                    handlerOptions: {
                        citeCompliant: this.drawControl.citeCompliant,
                        sides: 4,
                        irregular: true
                    }
                }
        );
        this.drawControl.addControls([drawRectangleControl]);

        this.map.addControl(this.drawControl);
        this.activeControl = drawRectangleControl;
    },

    removeDrawControls: function () {
        if (this.drawControl) {
            var self = this;
            Ext.each(this.drawControl.controls, function (control) {
                self.map.removeControl(control);
            });
            this.map.removeControl(this.drawControl);
            this.drawControl = null;
        }
    },

    activateDrawControl: function () {
        if (!this.drawControl || this.drawControlActive) {
            return;
        }
        var self = this;
        Ext.each(this.drawControl.controls, function (control) {
            control.events.register('featureadded', self, self.onFeatureDrawn);
            control.deactivate();
            // If we have a saved active control: activate it
            if (self.activeControl && control == self.activeControl) {
                control.activate();
            }
        });
        this.drawControlActive = true;
    },

    deactivateDrawControl: function () {

        if (!this.drawControl) {
            return;
        }
        var self = this;
        Ext.each(this.drawControl.controls, function (control) {
            control.events.unregister('featureadded', self, self.onFeatureDrawn);

            // Deactivate all controls and save the active control (see onParentShow)
            if (control.active) {
                self.activeControl = control;
            }
            control.deactivate();
        });
        this.updateStatusPanel();
        this.drawControlActive = false;
    },

    onFeatureDrawn: function () {

    },

    createTargetLayerCombo: function (config) {
        var defaultConfig = {
            xtype: "hr_layercombo",
//            anchor: '100%',
            fieldLabel: __('Search in'),
            sortOrder: this.layerSortOrder,
            layerFilter: this.layerFilter,
            selectFirst: true,
            listeners: {
                selectlayer: function (layer) {
                    this.targetLayer = layer;
                    this.fireEvent('targetlayerselected');
                },
                scope: this
            }
        };

        config = Ext.apply(defaultConfig, config);
        return this.targetLayerCombo = new Heron.widgets.LayerCombo(config);
    },

    getFeatureType: function () {
        return this.targetLayer ? this.targetLayer.name : 'heron';
    },

    updateStatusPanel: function (text) {
        if (!text) {
            text = '&nbsp;';
        }
        if (this.statusPanel.body) {
            this.statusPanel.body.update(text);
        } else {
            this.statusPanel.html = text;
        }
    },

    /** api: method[onDrawingComplete]
     *  Called when feature drawn selected.
     */
    onDrawingComplete: function (searchPanel, selectionLayer) {
    },

    /** api: method[onLayerSelect]
     *  Called when Layer selected.
     */
    onTargetLayerSelected: function () {

    },

    /** api: method[onLayerSelect]
     *  Called when Layer selected.
     */
    onSelectionLayerUpdate: function () {

    },

    /** api: method[onSearchIssued]
     *  Called when remote search (WFS) query has started.
     */
    onSearchIssued: function () {
        this.searchState = "searchissued";
        this.response = null;
        this.features = null;
        this.updateStatusPanel(__('Searching...'));

        // If search takes to long, give some feedback
        var self = this;
        var startTime = new Date().getTime() / 1000;
        this.timer = setInterval(function () {
            if (self.searchState != 'searchissued') {
                return;
            }

            // User feedback with seconds passed and random message
            self.updateStatusPanel(Math.floor(new Date().getTime() / 1000 - startTime) +
                    ' ' + __('Seconds') + ' - ' +
                    Heron.Utils.randArrayElm(self.progressMessages));
        }, 4000);
    },

    /** api: method[onSearchComplete]
     *  Function to call when search is complete.
     *  Default is to show "Search completed" with feature count on progress label.
     */
    onSearchComplete: function (searchPanel, result) {
        this.protocol = null;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        if (this.sketch) {
            this.selectionLayer.removeAllFeatures();
            this.sketch = false;
        }
        this.fireEvent('selectionlayerupdate');

        if (this.searchState == 'searchCanceled') {
            this.fireEvent('searchfailed', searchPanel, olResponse);
            this.updateStatusPanel(__('Search Canceled'));
            return;
        }

        this.searchState = "searchcomplete";

        // First check for failures
        var olResponse = result.olResponse;
        if (!olResponse || !olResponse.success() || olResponse.priv.responseText.indexOf('ExceptionReport') > 0) {
            this.fireEvent('searchfailed', searchPanel, olResponse);
            this.updateStatusPanel(__('Search Failed') + ' details: ' + olResponse.priv.responseText);
            return;
        }

        // All ok display result and notify listeners, subclass may override
        this.onSearchSuccess(searchPanel, result);
    },

    /** api: method[onSearchSuccess]
     *  Function called when search is complete and succesful.
     *  Default is to show "Search completed" with feature count on progress label.
     */
    onSearchSuccess: function (searchPanel, result) {

        // All ok display result and notify listeners
        var features = this.features = this.filterFeatures = result.olResponse.features;
        var featureCount = features ? features.length : 0;
        this.updateStatusPanel(__('Search Completed: ') + featureCount + ' ' + (featureCount != 1 ? __('Results') : __('Result')));
        this.fireEvent('searchsuccess', searchPanel, result);
    },

    /** api: method[search]
     *
     *  Issue spatial search via WFS.
     */
    search: function (geometries, options) {
        var targetLayer = options.targetLayer;

        // Determine WFS protocol
        var wfsOptions = targetLayer.metadata.wfs;

        if (wfsOptions.protocol == 'fromWMSLayer') {
            // WMS has related WFS layer (usually GeoServer)
            this.protocol = OpenLayers.Protocol.WFS.fromWMSLayer(targetLayer, {outputFormat: 'GML2'});

            // In rare cases may we have a WMS with multiple URLs n Array (for loadbalancing)
            // Take a random URL. Note: this should really be implemented in OpenLayers Protocol read()
            if (this.protocol.url instanceof Array) {
                this.protocol.url = Heron.Utils.randArrayElm(this.protocol.url);
                this.protocol.options.url = this.protocol.url;
            }
        } else {
            // WFS via Regular OL WFS protocol object
            this.protocol = wfsOptions.protocol;
        }

        var geometry = geometries[0];

        // Create WFS Spatial Filter from Geometry
        var spatialFilterType = options.spatialFilterType || OpenLayers.Filter.Spatial.INTERSECTS;
        var filter = new OpenLayers.Filter.Spatial({
            type: spatialFilterType,
            value: geometry
        });

        if (geometries.length > 1) {
            var filters = [];
            geometry = new OpenLayers.Geometry.Collection();
            Ext.each(geometries, function (g) {
                geometry.addComponent(g);
                filters.push(new OpenLayers.Filter.Spatial({
                    type: OpenLayers.Filter.Spatial.INTERSECTS,
                    value: g
                }));
            });

            filter = new OpenLayers.Filter.Logical({
                type: OpenLayers.Filter.Logical.OR,
                filters: filters
            });
        }
        if (geometry.CLASS_NAME.indexOf('LineString') > 0 && wfsOptions.maxQueryLength) {
            var length = Math.round(geometry.getGeodesicLength(options.projection));
            if (length > wfsOptions.maxQueryLength) {
                this.selectionLayer.removeAllFeatures();
                var units = options.units;
                Ext.Msg.alert(__('Warning - Line Length is ') + length + units, __('You drew a line with length above the layer-maximum of ') + wfsOptions.maxQueryLength + units);
                return false;
            }
        }
        if (geometry.CLASS_NAME.indexOf('Polygon') > 0 && wfsOptions.maxQueryArea) {
            var area = Math.round(geometry.getGeodesicArea(options.projection));
            if (area > wfsOptions.maxQueryArea) {
                this.selectionLayer.removeAllFeatures();
                var areaUnits = options.units + '2';
                Ext.Msg.alert(__('Warning - Area is ') + area + areaUnits, __('You selected an area for this layer above its maximum of ') + wfsOptions.maxQueryArea + areaUnits);
                return false;
            }
        }

        var filterFormat = new OpenLayers.Format.Filter.v1_1_0({srsName: this.protocol.srsName});
        var filterStr = OpenLayers.Format.XML.prototype.write.apply(
                filterFormat, [filterFormat.write(filter)]
        );

        //        filterStr ='<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"><ogc:Intersects><ogc:PropertyName/><gml:Polygon xmlns:gml="http://www.opengis.net/gml" srsName="EPSG:4326"><gml:exterior><gml:LinearRing><gml:posList>-107.0966796875 31.03515625 -107.0966796875 46.416015625 -85.5634765625 46.416015625 -85.5634765625 31.03515625 -107.0966796875 31.03515625</gml:posList></gml:LinearRing></gml:exterior></gml:Polygon></ogc:Intersects></ogc:Filter>';
        //        filterStr ='<ogc:Filter xmlns:ogc="http://www.opengis.net/ogc"><ogc:Intersects><ogc:PropertyName/><gml:Polygon xmlns:gml="http://www.opengis.net/gml" srsName="EPSG:4326"><gml:exterior><gml:LinearRing><gml:posList>-96.9013671875 32.529296875 -96.9013671875 32.96875 -96.4619140625 32.96875 -96.4619140625 32.529296875 -96.9013671875 32.529296875</gml:posList></gml:LinearRing></gml:exterior></gml:Polygon></ogc:Intersects></ogc:Filter>';
        // Heron.data.DataExporter.directDownload(url);

        // document.body.appendChild(iframe);
//        if (!targetLayer.metadata.wfs.store) {
//            targetLayer.metadata.wfs.store = new GeoExt.data.WFSCapabilitiesStore({
//                url: OpenLayers.Util.urlAppend(downloadInfo.url, 'SERVICE=WFS&REQUEST=GetCapabilities&VERSION=1.1.0'),
//                autoLoad: true
//            });
//            targetLayer.metadata.wfs.store.load();
//        }

        // Issue the WFS request
        var maxFeatures = this.single == true ? this.maxFeatures : undefined;
        this.response = this.protocol.read({
            maxFeatures: maxFeatures,
            filter: filter,
            callback: function (olResponse) {
                var downloadInfo = {
                    type: 'wfs',
                    url: this.protocol.options.url,
                    downloadFormats: wfsOptions.downloadFormats,
                    params: {
                        typename: this.protocol.featureType,
                        maxFeatures: maxFeatures,
                        "Content-Disposition": "attachment",
                        filename: targetLayer.name,
                        srsName: this.protocol.srsName,
                        service: "WFS",
                        version: "1.1.0",
                        request: "GetFeature",
                        filter: filterStr
                    }
                };
                var result = {
                    olResponse: olResponse,
                    downloadInfo: downloadInfo,
                    layer: targetLayer
                };
                this.fireEvent('searchcomplete', this, result);
            },
            scope: this
        });
        this.fireEvent('searchissued', this);

        return true;
    },

    /** api: method[searchAbort]
     *
     *  Abort/cancel spatial search via WFS.
     */
    searchAbort: function () {
        if (this.protocol) {
            this.protocol.abort(this.response);
        }
        this.protocol = null;
    }
});

/** api: xtype = hr_spatialsearchpanel */
Ext.reg('hr_spatialsearchpanel', Heron.widgets.SpatialSearchPanel);


Heron.widgets.SearchByDrawPanel = Ext.extend(Heron.widgets.SpatialSearchPanel, {

    /** api: config[name]
     *  ``String``
     *  Name, e.g. for multiple searches combo.
     */
    name: __('Search by Drawing'),

    /** api: config[searchByDraw]
     *  ``Object``
     *  Search by draw options.
     *  Default reddish
     */
    sketchOnly: false,
    cumulative: false,

// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
    initComponent: function () {

        this.items = [
            this.createTargetLayerCombo(),
            this.createDrawToolPanel(),
            /*            {
             xtype: "spacer"
             },
             {
             xtype: 'checkbox',
             fieldLabel: __('Sketch only'),
             checked: this.sketchOnly,
             listeners: {
             afterrender: function (obj) {
             new Ext.ToolTip({
             target: obj.id,
             html: __('Tooltip for checkbox')
             });
             },
             check: function (c, checked) {
             this.sketchOnly = checked;
             },
             scope: this
             }
             }, */
            this.createStatusPanel()
        ];
        Heron.widgets.SearchByDrawPanel.superclass.initComponent.call(this);
    },

    /** api: method[onDrawingComplete]
     *  Called when feature drawn selected.
     */
    onDrawingComplete: function (searchPanel, selectionLayer) {
        this.searchFromSketch();
    },

    onFeatureDrawn: function () {
        if (!this.sketchOnly) {
            this.fireEvent('drawingcomplete', this, this.selectionLayer);
        }
    },

    /** api: method[onPanelRendered]
     *  Called when Panel has been rendered.
     */
    onPanelRendered: function () {
        this.activateDrawControl();
        this.updateStatusPanel(__('Select a drawing tool and draw to search immediately.'));

        // Select the first layer
        this.targetLayer = this.targetLayerCombo.selectedLayer;
        if (this.targetLayer) {
            this.fireEvent('targetlayerselected', this.targetLayer);
        }
    },

    /** api: method[onParentShow]
     *  Called when parent Panel is shown in Container.
     */
    onParentShow: function () {
        this.activateDrawControl();
    },

    /** api: method[onParentHide]
     *  Called when parent Panel is hidden in Container.
     */
    onParentHide: function () {
        this.deactivateDrawControl();
    },


    /** api: method[onBeforeDestroy]
     *  Called just before Panel is destroyed.
     */
    onBeforeDestroy: function () {
        this.deactivateDrawControl();
        if (this.selectionLayer) {
            this.selectionLayer.removeAllFeatures();
            this.map.removeLayer(this.selectionLayer);
        }

    },

    /** api: method[searchFromFeatures]
     *
     *  Issue spatial search via WFS.
     */
    searchFromSketch: function () {
        // Protect against too many features returned in query (see wfs config options)
        var selectionLayer = this.selectionLayer;
        var geometry = selectionLayer.features[0].geometry;
        if (!this.search([geometry], {projection: selectionLayer.projection, units: selectionLayer.units, targetLayer: this.targetLayer})) {
        }
        this.sketch = true;
    }

});


/** api: xtype = hr_searchbydrawpanel */
Ext.reg('hr_searchbydrawpanel', Heron.widgets.SearchByDrawPanel);

Heron.widgets.SearchByFeaturePanel = Ext.extend(Heron.widgets.SpatialSearchPanel, {

    /** api: config[name]
     *  ``String``
     *  Name, e.g. for multiple searches combo.
     */
    name: __('Search by Feature Selection'),

    /** api: config[targetLayerFilter]
     *  ``Function``
     *  Filter for OpenLayer getLayersBy(), to filter out WFS-enabled Layers from Layer array except the source selection layer.
     *  Default: only Layers that have metadata.wfs (see OpenLayers Layer spec and examples) set.
     */
    targetLayerFilter: function (map) {
        /* Select only those (WMS) layers that have a WFS attached
         * Note: WMS-layers should have the 'metadata.wfs' property configured,
         * either with a full OL WFS protocol object or the string 'fromWMSLayer'.
         * The latter means that a WMS has a related WFS (GeoServer usually).
         */
        return map.getLayersBy('metadata',
                {
                    test: function (metadata) {
                        return metadata && metadata.wfs && !metadata.isSourceLayer;
                    }
                }
        )
    },

// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
    initComponent: function () {


        this.searchByFeatureFieldset = new Ext.form.FieldSet({
            xtype: "fieldset",
//            title: __('Search by Selected Features'),
            checkboxToggle: false,
//            collapsed: !this.searchByFeature.active,
//            anchor: "100%",
            items: [
                //                {
//                    xtype: 'buttongroup',
//                    fieldLabel: __('Selection'),
//                    anchor: "100%",
//                    title: null,
//                    border: false,
//                    items: [
//                        {
//                            text: 'Clear',
//                            tooltip: __('Remove all selected features'),
//                            listeners: {
//                                click: function () {
//                                    if (this.features && this.features.length > 0) {
//                                        this.features[0].hradded = false;
//                                    }
//                                    this.selectionLayer.removeAllFeatures();
//                                },
//                                scope: this
//                            }
//
//                        },
//                        {
//                            text: 'Add Result',
//                            tooltip: __('Add all features of search result to selected features'),
//                            listeners: {
//                                click: function () {
//                                    if (this.features && this.features.length > 0) {
//                                        if (this.features[0].hradded) {
//                                            Ext.Msg.alert('Info', 'You have already added this result');
//                                            return;
//                                        }
//                                        this.features[0].hradded = true;
//                                        this.selectionLayer.addFeatures(this.features);
//                                    }
//                                },
//                                scope: this
//                            }
//                        },
//                        {
//                            text: 'Use Result',
//                            tooltip: __('Replace selected features with features of search result'),
//                            listeners: {
//                                click: function () {
//                                    if (this.features && this.features.length > 0) {
//                                        if (this.features[0].hradded) {
//                                            Ext.Msg.alert('Info', 'You have already added this result');
//                                            return;
//                                        }
//                                        this.selectionLayer.removeAllFeatures();
//                                        this.selectionLayer.addFeatures(this.features);
//                                        this.features[0].hradded = true;
//                                    }
//                                },
//                                scope: this
//                            }
//                        }
//                    ]
//                },
//                this.searchButton
            ]
        });
        this.resetButton = new Ext.Button({
            anchor: "20%",
            text: 'Reset',
            tooltip: __('Start a new search'),
            listeners: {
                click: function () {
                    this.resetForm();
                },
                scope: this
            }

        });

        this.items = [
            this.createSourceLayerCombo(),
            this.createDrawFieldSet(),
            this.createTargetLayerCombo({selectFirst: false}),
            this.createSearchTypeCombo(),
            this.createActionButtons(),
            this.createStatusPanel(),
            this.resetButton
        ];
        Heron.widgets.SearchByFeaturePanel.superclass.initComponent.call(this);
    },

    activateSearchByFeature: function () {
        this.deactivateSearchByFeature();
        this.sourceLayerCombo.addListener('selectlayer', this.onSourceLayerSelect, this);
        this.selectionLayer.events.register('featureadded', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.register('featuresadded', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.register('featureremoved', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.register('featuresremoved', this, this.onSelectionLayerUpdate);
    },

    deactivateSearchByFeature: function () {
        this.sourceLayerCombo.removeListener('selectlayer', this.onSourceLayerSelect, this);
        this.selectionLayer.events.unregister('featureadded', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.unregister('featuresadded', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.unregister('featureremoved', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.unregister('featuresremoved', this, this.onSelectionLayerUpdate);
    },

    resetForm: function () {
        this.selectionLayer.removeAllFeatures();
        this.searchButton.disable();
        this.sourceLayerCombo.reset();
        this.targetLayerCombo.reset();
        this.spatialFilterType = OpenLayers.Filter.Spatial.INTERSECTS;

        this.drawFieldSet.hide();
        this.selectionStatusField.hide();
        this.targetLayerCombo.hide();
        this.searchTypeCombo.hide();
        this.actionButtons.hide();
        this.updateStatusPanel(__('Select a source Layer and then draw to select objects from that layer. <br/>Then select a target Layer to search in using the geometries of the selected objects.'));
    },

    createActionButtons: function () {
        this.searchButton = new Ext.Button({
            text: __('Search'),
            tooltip: __('Search in target layer using the feature-geometries from the selection'),
            disabled: true,
            handler: function () {
                this.searchFromFeatures();
            },
            scope: this
        });

        this.cancelButton = new Ext.Button({
            text: 'Cancel',
            tooltip: __('Cancel ongoing search'),
            disabled: true,
            listeners: {
                click: function () {
                    this.resetForm();
                    this.searchState = 'searchCanceled';
                    this.searchAbort();
                },
                scope: this
            }

        });
        return this.actionButtons = new Ext.ButtonGroup({
            fieldLabel: __('Actions'),
            anchor: "100%",
            title: null,
            border: false,
            items: [
                this.cancelButton,
                this.searchButton
            ]});
    },

    createDrawFieldSet: function () {

        this.selectionStatusField = new Heron.widgets.HTMLPanel({
            html: __('No objects selected'),
            preventBodyReset: true,
            bodyCfg: {
                style: {
                    padding: '2px',
                    border: '0px'
                }
            },
            style: {
                marginTop: '2px',
                marginBottom: '2px',
                fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                fontSize: '11px',
                color: '#0000C0'
            }
        });

        return this.drawFieldSet = new Ext.form.FieldSet(
                {
                    xtype: "fieldset",
                    title: null,
                    anchor: "100%",
                    items: [
                        this.createDrawToolPanel({
                                    style: {
                                        marginTop: '12px',
                                        marginBottom: '12px'
                                    }}
                        ),
                        this.selectionStatusField
                    ]
                }
        );
    },
    createSearchTypeCombo: function () {
        var store = new Ext.data.ArrayStore({
            fields: ['name', 'value'],
            data: [
                ['INTERSECTS (default)', OpenLayers.Filter.Spatial.INTERSECTS],
                ['WITHIN', OpenLayers.Filter.Spatial.WITHIN]
            ]
        });
        return this.searchTypeCombo = new Ext.form.ComboBox({
            mode: 'local',
//            anchor: "100%",
            listWidth: 160,
            value: store.getAt(0).get("name"),
            fieldLabel: __('Type of Search'),
            store: store,
            displayField: 'name',
            valueField: 'value',
            forceSelection: true,
            triggerAction: 'all',
            editable: false,
            // all of your config options
            listeners: {
                select: function (cb, record) {
                    this.spatialFilterType = record.data['value'];
                },
                scope: this
            }
        });
    },

    createSourceLayerCombo: function () {
        return this.sourceLayerCombo = new Heron.widgets.LayerCombo(
                {
//                    anchor: "100%",
//                    listWidth: 160,
                    fieldLabel: __('Choose Layer to select with'),
                    emptyText: __('Choose a Layer'),
                    sortOrder: this.layerSortOrder,
                    layerFilter: this.layerFilter
                }
        );
    },

    updateSelectionStatusField: function (text) {
        if (this.selectionStatusField.body) {
            this.selectionStatusField.body.update(text);
        } else {
            this.selectionStatusField.html = text;
        }
    },

    onFeatureDrawn: function (evt) {

        // Protect against too many features returned in query (see wfs config options)
        var selectionLayer = this.selectionLayer;
        selectionLayer.removeAllFeatures();
        selectionLayer.addFeatures(evt.feature);
        var geometries = [selectionLayer.features[0].geometry];
        if (!this.search(geometries, {targetLayer: this.sourceLayer, projection: this.selectionLayer.projection, units: this.selectionLayer.units})) {
            return;
        }
        this.searchSelect = true;
        this.searchButton.enable();
        this.cancelButton.disable();
    },

    onSourceLayerSelect: function (layer) {
        if (this.sourceLayer && this.sourceLayer.metadata) {
            this.sourceLayer.metadata.isSourceLayer = false;
        }
        this.sourceLayer = layer;
        if (this.sourceLayer && this.sourceLayer.metadata) {
            this.sourceLayer.metadata.isSourceLayer = true;
        }
        this.searchButton.enable();
        this.cancelButton.disable();
        this.drawFieldSet.show();
        this.selectionStatusField.show();
        this.updateStatusPanel();
        this.updateSelectionStatusField(__('Select a draw tool and draw to select objects from') + (this.sourceLayer ? '<br/>"' + this.sourceLayer.name + '"' : ''));
    },

    /** api: method[onLayerSelect]
     *  Called when Layer selected.
     */
    onSelectionLayerUpdate: function () {
//        this.searchButton.disable();
//
//        if (this.selectionLayer.features.length == 0) {
//            this.updateSelectionStatusField(__('No objects selected.'));
//            return;
//        }
//        if (this.selectionLayer.features.length > this.maxFilterGeometries) {
//            this.updateSelectionStatusField(__('Too many geometries for spatial filter: ') + this.selectionLayer.features.length + ' ' + 'max: ' + this.maxFilterGeometries);
//            return;
//        }
//        this.searchButton.enable();
//        this.updateStatusPanel(__('Press the Search button to start your Search.'));
    },

    /** api: method[onLayerSelect]
     *  Called when Layer selected.
     */
    onTargetLayerSelected: function () {
        this.searchTypeCombo.show();
        this.actionButtons.show();
        this.searchButton.enable();
        this.cancelButton.disable();

        this.doLayout();
        this.updateStatusPanel(__('Select the spatial operator (optional) and use the Search button to start your search.'));
    },

    /** api: method[onPanelRendered]
     *  Called when Panel has been rendered.
     */
    onPanelRendered: function () {
        if (this.fromLastResult && this.filterFeatures) {
            this.selectionLayer.addFeatures(this.filterFeatures);
        }
        this.activateSearchByFeature();
        this.resetForm();
    },

    /** api: method[onParentShow]
     *  Called when parent Panel is shown in Container.
     */
    onParentShow: function () {
        this.activateSearchByFeature();
    },

    /** api: method[onParentHide]
     *  Called when parent Panel is hidden in Container.
     */
    onParentHide: function () {
        this.deactivateSearchByFeature();
        this.resetForm();
    },


    /** api: method[onBeforeDestroy]
     *  Called just before Panel is destroyed.
     */
    onBeforeDestroy: function () {
        this.deactivateSearchByFeature();
        if (this.selectionLayer) {
            this.selectionLayer.removeAllFeatures();
            this.map.removeLayer(this.selectionLayer);
        }
    },

    /** api: method[onSearchSuccess]
     *  Function called when search is complete and succesful.
     *  Default is to show "Search completed" with feature count on progress label.
     */
    onSearchSuccess: function (searchPanel, result) {
        // All ok display result and notify listeners
        var features = this.features = this.filterFeatures = result.olResponse.features;
        this.selectionLayer.removeAllFeatures();
        this.searchButton.enable();
        this.cancelButton.disable();
        if (this.searchSelect) {

            this.selectionLayer.addFeatures(features);
            this.targetLayerCombo.hide();
            this.updateStatusPanel();
            if (this.selectionLayer.features.length == 0) {
                this.updateSelectionStatusField(__('No objects selected.'));
                return;
            }
            if (this.selectionLayer.features.length > this.maxFilterGeometries) {
                this.updateSelectionStatusField(__('Too many geometries for spatial filter: ') + this.selectionLayer.features.length + ' ' + 'max: ' + this.maxFilterGeometries);
                return;
            }
            this.searchSelect = false;

            // Replace the initial layers with all but the source layer
            this.targetLayerCombo.setLayers(this.targetLayerFilter(this.map));

            this.targetLayerCombo.show();
            var text = this.selectionLayer.features.length + ' ' + __('objects selected from "') + (this.sourceLayer ? this.sourceLayer.name : '') + '"';
            this.updateSelectionStatusField(text);
            this.updateStatusPanel(__('Select a target layer to search using the geometries of the selected objects'));
        } else {
            // Usually regular search
            Heron.widgets.SearchByFeaturePanel.superclass.onSearchSuccess.call(this, searchPanel, result);
        }
    },

    /** api: method[searchFromFeatures]
     *
     *  Issue spatial search via WFS.
     */
    searchFromFeatures: function () {
        var geometries = [];
        var features = this.selectionLayer.features;
        for (var i = 0; i < features.length; i++) {
            geometries.push(features[i].geometry);
        }
        this.searchButton.disable();
        this.cancelButton.enable();
        if (!this.search(geometries, {spatialFilterType: this.spatialFilterType, targetLayer: this.targetLayer,
            projection: this.selectionLayer.projection, units: this.selectionLayer.units})) {
            this.selectionLayer.removeAllFeatures();
        }
    }
});


/** api: xtype = hr_searchbydrawpanel */
Ext.reg('hr_searchbyfeaturepanel', Heron.widgets.SearchByFeaturePanel);

