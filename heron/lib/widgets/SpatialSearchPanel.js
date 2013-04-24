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
 *  base_link = `GeoExt.form.FormPanel <http://www.geoext.org/lib/GeoExt/widgets/form/FormPanel.html>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron SpatialSearchPanel.
 *
 *  .. code-block:: javascript

 Heron.examples.searchPanelConfig = {
            xtype: 'hr_searchcenterpanel',
            id: 'hr-searchcenterpanel',
            title: __('Search'),
            height: 600,
            hropts: {
                searchPanel: {
                    xtype: 'hr_spatialsearchpanel',
                    id: 'hr-spatialsearchpanel',
                    header: false,
                    bodyStyle: 'padding: 6px',
                    style: {
                        fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                        fontSize: '12px'
                    },
                    hropts: {
                        layerFilter: function (map) {
                            return map.getLayersByClass('OpenLayers.Layer.WMS');
                        },
                        onSearchCompleteZoom: 10
                    }
                },
                resultPanel: {
                    xtype: 'hr_featuregridpanel',
                    id: 'hr-featuregridpanel',
                    title: __('Search'),
                    header: false,
                    autoConfig: true,
                    hropts: {
                        zoomOnRowDoubleClick: true,
                        zoomOnFeatureSelect: false,
                        zoomLevelPointSelect: 8,
                        zoomToDataExtent: true
                    }
                }
            }
            };
 */

/** api: constructor
 *  .. class:: SpatialSearchPanel(config)
 *
 *  A panel designed to hold a spatial search .
 */
Heron.widgets.SpatialSearchPanel = Ext.extend(Ext.Panel, {
    name: __('Spatial Search'),
    description: '',

    fromLastResult: false,
    lastSearchName: null,
    filterFeatures: null,
    showFilterFeatures: true,
    maxFilterGeometries: 12,
    selectLayerStyle: {
        strokeColor: "#dd0000",
        strokeWidth: 1,
        fillOpacity: 0.4,
        fillColor: "#cc0000"
    },
    selectByFeature: true,
    selectByDraw: false,
    layout: 'form',
//    layout: {
//        type: 'vbox',
//        padding: '10',
//        align: 'stretch'
//    },
    bodyStyle: 'padding: 12px 8px 0px 8px',
    border: false,

    /** api: config[layerSortOrder]
     *  ``String``
     *  How should the layer names be sorted in the selector, 'ASC', 'DESC' or null (as Map order)?
     *  default value is 'ASC' (Alphabetically Ascending).
     */
    layerSortOrder: 'ASC',

    layerFilter: function (map) {
        // Select only those (WMS) layers that have a WFS attached
        // Note: WMS-layers should have the 'metadata.wfs' property configured,
        // either with a full OL WFS protocol object or the string 'fromWMSLayer'.
        // The latter means that a WMS has a related WFS (GeoServer usually).
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
        __('Still searching, have you selected an area with too many features?')
    ],

// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
    initComponent: function () {

        Ext.apply(this, this.hropts);

        var infoText = __('Select the Layer to query') + '<p>' + this.description + '</p>';
        if (this.lastSearchName) {
            infoText += '<p>' + __('Using geometries from the result: ') + '<br/>' + this.lastSearchName;
            if (this.filterFeatures) {
                infoText += '<br/>' + __('with') + ' ' + this.filterFeatures.length + ' ' + __('features');
            }
            infoText += '</p>';
        }

        // Setup our own events
        this.addEvents({
            "selectionlayerupdate": true,
            "layerselected": true,
            "drawingcomplete": true,
            "searchissued": true,
            "searchcomplete": true,
            "searchfailed": true,
            "searchsuccess": true
        });

        this.selectionStatusField = new Ext.form.TextField({
            fieldLabel: __('Selected'),
            readOnly: true,
            anchor: "100%",
            value: __('No features selected')
        });

        this.searchButton = new Ext.Button({
            text: __('Search'),
            disabled: true,
            handler: function () {
                this.searchFromFeatures();
            },
            scope: this
        });

        this.items = [
            {
                xtype: "hr_layercombo",
                id: "hr_targetlayercombo",
                anchor: '95%',
                height: 120,
                fieldLabel: __('Search in'),
                sortOrder: this.layerSortOrder,
                layerFilter: this.layerFilter,
                selectFirst: true,

                listWidth: 140,
                listeners: {
                    selectlayer: function (layer) {
                        this.targetLayer = layer;
                        this.fireEvent('layerselected');
                    },
                    scope: this
                }
            },
            {
                xtype: "fieldset",
                title: __('Search by Drawing'),
                checkboxToggle: true,
                collapsed: !this.selectByDraw,
                anchor: '95%',
                items: [
                    {
                        xtype: "hr_htmlpanel",
                        id: "hr_drawtoolpanel",
                        html: '<div id="hr_drawselect" class="olControlEditingToolbar olControlNoSelect">&nbsp;</div>',
                        height: 32,
                        preventBodyReset: true,
                        style: {
                            marginTop: '24px',
                            marginBottom: '24px',
                            fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                            color: '#0000C0',
                            fontSize: '12px'
                        }
                    }
                ],
                listeners: {
                    collapse: function () {
                        this.selectByDraw = false;
                    },
                    expand: function () {
                        this.selectByDraw = true;
                        this.deactivateSelectByFeature();
                        this.addDrawingToolbar();
                    },
                    scope: this
                }
            },
            {
                xtype: "fieldset",
                title: __('Search by Feature Selection'),
                checkboxToggle: true,
                collapsed: !this.selectByFeature,
                anchor: "95%",
                items: [
                    {
                        xtype: "hr_layercombo",
                        id: "hr_sourcelayercombo",
                        fieldLabel: __('From'),
                        emptyText: __('Choose Source Layer'),
                        sortOrder: this.layerSortOrder,
                        layerFilter: this.layerFilter
                    },
                    this.selectionStatusField,
                    {
                        xtype: 'buttongroup',
                        fieldLabel: __('Selection'),

                        title: null,
                        width: '100%',
                        padding: 2,
                        items: [
                            {
                                text: 'Clear', listeners: {
                                click: function () {
                                    this.selectionLayer.removeAllFeatures();
                                },
                                scope: this
                            }

                            },
                            {
                                text: 'Add Result', listeners: {
                                click: function () {
                                    if (this.features) {
                                        this.selectionLayer.addFeatures(this.features);
                                    }
                                },
                                scope: this
                            }
                            },
                            {
                                text: 'Use Result', listeners: {
                                click: function () {
                                    this.selectionLayer.removeAllFeatures();
                                    if (this.features) {
                                        this.selectionLayer.addFeatures(this.features);
                                    }
                                },
                                scope: this
                            }
                            }
                        ]
                    },
                    this.searchButton
                ],
                listeners: {
                    collapse: function () {
                        this.deactivateSelectByFeature();
                    },
                    expand: function () {
                        this.activateSelectByFeature();
                    },
                    scope: this
                }
            },
            {
                xtype: "hr_htmlpanel",
                id: "hr_spatsearchinfopanel",
                html: infoText,
                height: 132,
                preventBodyReset: true,
                bodyCfg: {
                    style: {
                        padding: '6px',
                        border: '0px'
                    }
                },
                style: {
                    marginTop: '24px',
                    paddingTop: '24px',
                    fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                    fontSize: '11px',
                    color: '#0000C0'
                }
            }
        ];

        Heron.widgets.SpatialSearchPanel.superclass.initComponent.call(this);

        this.targetLayerCombo = this.getComponent("hr_targetlayercombo");
        this.sourceLayerCombo = this.find('id', 'hr_sourcelayercombo')[0];


        this.map = Heron.App.getMap();

//		this.addListener("deactivate", function () {
//			map.removeControl(this.drawControl);
//			map.removeLayer(this.selectionLayer);
//		}, this);

        this.addListener("selectionlayerupdate", this.onSelectionLayerUpdate, this);
        this.addListener("layerselected", this.onTargetLayerSelected, this);
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

    addDrawingToolbar: function () {
        if (this.selectByDraw && !this.drawControl) {
            var div = document.getElementById('hr_drawselect');
            if (!div) {
                this.getComponent('hr_drawtoolpanel').addListener("afterrender", this.addDrawingToolbar, this);
                return;
            }
            this.addDrawControls(div);
        }
    },

    removeDrawingToolbar: function () {
        this.removeDrawControls();
    },

    addDrawControls: function (div) {
        this.drawControl = new OpenLayers.Control.EditingToolbar(this.selectionLayer, {div: div});

        // Add extra rectangle draw
        var drawRectangleControl = new OpenLayers.Control.DrawFeature(this.selectionLayer,
                OpenLayers.Handler.RegularPolygon, {
                    displayClass: 'olControlDrawRectangle',
                    handlerOptions: {
                        citeCompliant: this.drawControl.citeCompliant,
                        sides: 4,
                        irregular: true
                    }
                }
        );

        this.drawControl.addControls([drawRectangleControl]);

        this.map.addControl(this.drawControl);

        var self = this;
        Ext.each(this.drawControl.controls, function (control) {
            control.deactivate();
            control.events.register('featureadded', self, function () {
                this.fireEvent('drawingcomplete', this, this.selectionLayer);
            });
        });
        drawRectangleControl.activate();
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

    activateSelectByFeature: function () {

        this.deactivateSelectByFeature();
        this.sourceLayerCombo.addListener('selectlayer', this.onSourceLayerSelect, this);
        this.selectByFeature = true;
        this.updateInfoPanel(__('Select a Source layer and click/drag to select features.'));
    },

    onSourceLayerSelect: function (layer) {
        var control = new OpenLayers.Control.GetFeature({
            protocol: OpenLayers.Protocol.WFS.fromWMSLayer(layer, {outputFormat: 'GML2'}),
            box: true,
            hover: false,
            multipleKey: "shiftKey",
            toggleKey: "ctrlKey"
        });
        control.events.register("featureselected", this, function (e) {
            this.selectionLayer.addFeatures([e.feature]);
            this.fireEvent('selectionlayerupdate');
        });
        control.events.register("featureunselected", this, function (e) {
            this.selectionLayer.removeFeatures([e.feature]);
            this.fireEvent('selectionlayerupdate');
        });
        this.map.addControl(control);
        control.activate();
        this.fireEvent('selectionlayerupdate');
        this.sourceSelectControl = control;
    },

    deactivateSelectByFeature: function () {
        this.sourceLayerCombo.removeListener('selectlayer', this.onSourceLayerSelect, this);
        if (this.sourceSelectControl) {
            this.sourceSelectControl.deactivate();
            this.map.removeControl(this.sourceSelectControl);
            this.sourceSelectControl = null;
        }
        this.selectByFeature = false;
    },

    addSelectionLayer: function () {
        if (this.selectionLayer) {
            return;
        }
        this.selectionLayer = new OpenLayers.Layer.Vector("Selection", {
            style: this.selectLayerStyle,
            displayInLayerSwitcher: false,
            hideInLegend: true,
            isBaseLayer: false
        });
        this.map.addLayers([this.selectionLayer]);

        this.selectionLayer.events.register('featureadded', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.register('featuresadded', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.register('featureremoved', this, this.onSelectionLayerUpdate);
        this.selectionLayer.events.register('featuresremoved', this, this.onSelectionLayerUpdate);
    },

    getFeatureType: function () {
        return this.targetLayer ? this.targetLayer.name : 'heron';
    },

    updateInfoPanel: function (text) {
        var infoPanel = this.getComponent('hr_spatsearchinfopanel');
        if (infoPanel.body) {
            infoPanel.body.update(text);
        } else {
            infoPanel.html = text;
        }
    },

    /** api: method[onDrawingComplete]
     *  Called when feature drawn selected.
     */
    onDrawingComplete: function (searchPanel, selectionLayer) {
        this.searchFromSketch();
    },

    /** api: method[onLayerSelect]
     *  Called when Layer selected.
     */
    onTargetLayerSelected: function () {
//        if (!this.fromLastResult) {
//            this.updateInfoPanel(__('Choose a geometry tool and draw with it to search for features that touch it.'));
//        } else {
//            this.onSelectionLayerUpdate();
//        }
    },

    /** api: method[onLayerSelect]
     *  Called when Layer selected.
     */
    onSelectionLayerUpdate: function () {
        this.searchButton.disable();
        this.selectionStatusField.setValue(this.selectionLayer.features.length + ' ' + __('features'));
        if (this.selectionLayer.features.length == 0) {
            this.updateInfoPanel(__('No features selected.'));
            return;
        }
        if (this.selectionLayer.features.length > this.maxFilterGeometries) {
            this.updateInfoPanel(__('Too many geometries for spatial filter: ') + this.selectionLayer.features.length + ' ' + 'max: ' + this.maxFilterGeometries);
            return;
        }
        this.searchButton.enable();
        this.updateInfoPanel(__('Press the Search button to start your Search.'));
    },

    /** api: method[onPanelRendered]
     *  Called when Panel has been rendered.
     */
    onPanelRendered: function () {
        this.addSelectionLayer();

        if (this.fromLastResult && this.filterFeatures) {
            this.selectionLayer.addFeatures(this.filterFeatures);
        }

        if (this.selectByFeature) {
            this.activateSelectByFeature();
        }

        // Select the first layer
        this.targetLayer = this.targetLayerCombo.selectedLayer;
        if (this.targetLayer) {
            this.fireEvent('layerselected', this.targetLayer);
        }
    },

    /** api: method[onParentShow]
     *  Called when parent Panel is shown in Container.
     */
    onParentShow: function () {
        // Ext.Msg.alert('Parent Show');
        if (this.selectByDraw && this.drawControl) {
            var self = this;
            Ext.each(this.drawControl.controls, function (control) {
                // If we have a saved active control: activate it
                if (self.activeControl && control == self.activeControl) {
                    control.activate();
                    self.activeControl = null;
                }
            });
        }
    },

    /** api: method[onParentHide]
     *  Called when parent Panel is hidden in Container.
     */
    onParentHide: function () {
        // this.removeDrawingToolbar();
        // Ext.Msg.alert('Parent Hide');
        if (this.selectByDraw && this.drawControl) {
            var self = this;
            Ext.each(this.drawControl.controls, function (control) {
                // Deactivate all controls and save the active control (see onParentShow)
                if (control.active) {
                    self.activeControl = control;
                }
                control.deactivate();
            });
            this.updateInfoPanel(__('Select a geometry and draw it to start the search'));
        }
    },


    /** api: method[onBeforeDestroy]
     *  Called just before Panel is destroyed.
     */
    onBeforeDestroy: function () {
        if (this.selectionLayer) {
            this.selectionLayer.removeAllFeatures();
            this.map.removeLayer(this.selectionLayer);
        }
    },

    /** api: method[onSearchIssued]
     *  Called when remote search (WFS) query has started.
     */
    onSearchIssued: function () {
        this.searchState = "searchissued";
        this.response = null;
        this.features = null;
        this.updateInfoPanel(__('Searching...'));

        // If search takes to long, give some feedback
        var self = this;
        var startTime = new Date().getTime() / 1000;
        this.timer = setInterval(function () {
            if (self.searchState != 'searchissued') {
                return;
            }

            // User feedback with seconds passed and random message
            self.updateInfoPanel(Math.floor(new Date().getTime() / 1000 - startTime) +
                    ' ' + __('Seconds') + ' - ' +
                    Heron.Utils.randArrayElm(self.progressMessages));
        }, 4000);
    },

    /** api: method[onSearchComplete]
     *  Function to call when search is complete.
     *  Default is to show "Search completed" with feature count on progress label.
     */
    onSearchComplete: function (searchPanel, result) {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.searchState = "searchcomplete";
        this.fireEvent('selectionlayerupdate');

        // First check for failures
        if (!result || !result.success() || result.priv.responseText.indexOf('ExceptionReport') > 0) {
            this.fireEvent('searchfailed', searchPanel, result);
            this.updateInfoPanel(__('Search Failed') + ' details: ' + result.priv.responseText);
            return;
        }

        // All ok display result and notify listeners
        var features = this.features = this.filterFeatures = result.features;
        this.updateInfoPanel(__('Search Completed: ') + (features ? features.length : 0) + ' ' + __('Feature(s)'));
        this.fireEvent('searchsuccess', searchPanel, features);
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
        if (!this.search(geometries, {projection: this.targetLayer.projection, units: this.targetLayer.units})) {
            // this.filterFeatures = null;
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
        if (!this.search([geometry], {projection: selectionLayer.projection, units: selectionLayer.units})) {
        }
        this.selectionLayer.removeAllFeatures();
    },

    /** api: method[search]
     *
     *  Issue spatial search via WFS.
     */
    search: function (geometries, options) {
        var targetLayer = this.targetLayer;

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
        var filter = new OpenLayers.Filter.Spatial({
            type: OpenLayers.Filter.Spatial.INTERSECTS,
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

        // Issue the WFS request
        this.response = this.protocol.read({
            maxFeatures: this.single == true ? this.maxFeatures : undefined,
            filter: filter,
            callback: function (result) {
                this.fireEvent('searchcomplete', this, result);
            },
            scope: this
        });
        this.fireEvent('searchissued', this);
        return true;
    }
});

/** api: xtype = hr_spatialsearchpanel */
Ext.reg('hr_spatialsearchpanel', Heron.widgets.SpatialSearchPanel);
