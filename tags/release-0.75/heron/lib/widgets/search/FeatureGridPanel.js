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
Ext.namespace("Heron.widgets.search");

/** api: (define)
 *  module = Heron.widgets.search
 *  class = FeatureGridPanel
 *  base_link = `GeoExt.form.FormPanel <http://www.geoext.org/lib/GeoExt/widgets/form/FormPanel.html>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron FeatureGridPanel. In this case
 *  a popup ExtJS Window is created with a single FeatureGridPanel (xtype: 'hr_featuregridpanel').
 *
 *  .. code-block:: javascript
 *
 *      Ext.onReady(function () {
 *          // create a panel and add the map panel and grid panel
 *          // inside it
 *          new Ext.Window({
 *              title: __('Click Map or Grid to Select - Double Click to Zoom to feature'),
 *              layout: "fit",
 *              x: 50,
 *              y: 100,
 *              height: 400,
 *              width: 280,
 *              items: [{
 *                      xtype: 'hr_featuregridpanel',
 *                      id: 'hr-featuregridpanel',
 *                      title: __('Parcels'),
 *                      header: false,
 *                      columns: [
 *                          {
 *                              header: "Fid",
 *                              width: 60,
 *                              dataIndex: "id",
 *                              type: 'string'
 *                          },
 *                          {
 *                              header: "ObjectNum",
 *                              width: 180,
 *                              dataIndex: "objectnumm",
 *                              type: 'string'
 *                          }
 *                      ],
 *                      hropts: {
 *                          storeOpts: {
 *                              proxy: new GeoExt.data.ProtocolProxy({
 *                                  protocol: new OpenLayers.Protocol.HTTP({
 *                                      url: 'data/parcels.json',
 *                                      format: new OpenLayers.Format.GeoJSON()
 *                                  })
 *                              }),
 *                              autoLoad: true
 *                          },
 *                          zoomOnRowDoubleClick: true,
 *                          zoomOnFeatureSelect: false,
 *                          zoomLevelPointSelect: 8,
 *                          separateSelectionLayer: true
 *                      }
 *                  }
 *              ]
 *          }).show();
 *      });
 *
 *
 */


/** api: constructor
 *  .. class:: FeatureGridPanel(config)
 *
 *  Show features both in a grid and on the map and have them selectable.
 */
Heron.widgets.search.FeatureGridPanel = Ext.extend(Ext.grid.GridPanel, {
    /** api: config[downloadable]
     *  ``Boolean``
     *  Should the features in the grid be downloadble?
     *  Download can be effected in 3 ways:
     *  1. via Grid export (CSV and XLS only)
     *  2. downloading the original feature format (GML2)
     *  3. (GeoServer only) requesting the server for a triggered download (all Geoserver WFS formats)
     */
    downloadable: true,

    /** api: config[exportFormats]
     *  ``String Array``
     *
     * Array of document formats to be used when exporting the content of a GFI response. This requires the server-side CGI script
     * ``heron.cgi`` to be installed. Exporting results in a download of a document with the contents of the (Grid) Panel.
     * For example when 'XLS' is configured, exporting will result in the Excel (or compatible) program to be
     * started with the GFI data in an Excel worksheet.
     * Option values are 'CSV' and/or 'XLS', default is, ``null``, meaning no export (results in no export menu).
     * The value ['CSV', 'XLS'] configures a menu to choose from a ``.csv`` or ``.xls`` export document format.
     */
    exportFormats: ['CSV', 'XLS', 'GMLv2', 'GeoJSON', 'WellKnownText'],

    /** api: config[columnCapitalize]
     *  ``Boolean``
     *  Should the column names be capitalized when autoconfig is true?
     */
    columnCapitalize: true,

    /** api: config[showTopToolbar]
     *  ``Boolean``
     *  Should a top toolbar with feature count, clear button and download combo be shown? Default ``true``.
     */
    showTopToolbar: true,

    /** api: config[showGeometries]
     *  ``Boolean``
     *  Should the feature geometries be shown? Default ``true``.
     */
    showGeometries: true,

    /** api: config[featureSelection]
     *  ``Boolean``
     *  Should the feature geometries that are shown be selectable in grid and map? Default ``true``.
     */
    featureSelection: true,

    loadMask: true,

//	bbar: new Ext.PagingToolbar({
//		pageSize: 25,
//		store: store,
//		displayInfo: true,
//		displayMsg: 'Displaying objects {0} - {1} of {2}',
//		emptyMsg: "No objects to display"
//	}),

    /** api: config[exportConfigs]
     *  ``Object``
     *  The supported configs for formatting and exporting feature data. Actual presented download options
     *  are configured with exportFormats.
     */
    exportConfigs: {
        CSV: {
            formatter: 'CSVFormatter',
            fileExt: '.csv',
            mimeType: 'text/csv'
        },
        XLS: {
            formatter: 'ExcelFormatter',
            fileExt: '.xls',
            mimeType: 'application/vnd.ms-excel'
        },
        GMLv2: {
            formatter: 'OpenLayersFormatter',
            format: new OpenLayers.Format.GML.v2({featureType: 'heronfeat', featureNS: 'http://heron-mc.org'}),
            fileExt: '.gml',
            mimeType: 'text/xml'
        },
        GeoJSON: {
            formatter: 'OpenLayersFormatter',
            format: 'OpenLayers.Format.GeoJSON',
            fileExt: '.json',
            mimeType: 'text/plain'
        },
        WellKnownText: {
            formatter: 'OpenLayersFormatter',
            format: 'OpenLayers.Format.WKT',
            fileExt: '.wkt',
            mimeType: 'text/plain'
        }
    },

    /** api: config[separateSelectionLayer]
     *  ``Boolean``
     *  Should selected features be managed in separate overlay Layer (handy for printing) ?.
     */
    separateSelectionLayer: false,

    /** api: config[zoomOnFeatureSelect]
     *  ``Boolean``
     *  Zoom to feature (extent) when selected ?.
     */
    zoomOnFeatureSelect: false,

    /** api: config[zoomOnRowDoubleClick]
     *  ``Boolean``
     *  Zoom to feature (extent) when row is double clicked ?.
     */
    zoomOnRowDoubleClick: true,

    /** api: config[zoomLevelPointSelect]
     *  ``Integer``
     *  Zoom level for point features when selected, default ``10``.
     */
    zoomLevelPointSelect: 10,

    /** api: config[zoomLevelPoint]
     *  ``Integer``
     *  Zoom level when layer is single point feature, default ``10``.
     */
    zoomLevelPoint: 10,

    /** api: config[zoomToDataExtent]
     *  ``Boolean``
     *  Zoom to layer data extent when loaded ?.
     */
    zoomToDataExtent: false,

    /** api: config[autoConfig]
     *  ``Boolean``
     *  Should the store and grid columns autoconfigure from loaded features?.
     */
    autoConfig: true,

    /** api: config[vectorLayerOptions]
     *  ``Object``
     *  Options to be passed on Vector constructors.
     */
    vectorLayerOptions: {noLegend: true, displayInLayerSwitcher: false},

    initComponent: function () {
        // If columns specified we don't do autoconfig (column guessing from features)
        if (this.columns) {
            this.autoConfig = false;
        }

        // Heron-specific config (besides GridPanel config)
        Ext.apply(this, this.hropts);

        // If we have feature selection enabled we must show geometries
        if (this.featureSelection) {
            this.showGeometries = true;
        }

        if (this.showGeometries) {
            // Define OL Vector Layer to display search result features
            var layer = this.layer = new OpenLayers.Layer.Vector(this.title, this.vectorLayerOptions);

            this.map = Heron.App.getMap();
            this.map.addLayer(this.layer);

            var self = this;
            if (this.featureSelection && this.zoomOnFeatureSelect) {
                // See http://www.geoext.org/pipermail/users/2011-March/002052.html
                layer.events.on({
                    "featureselected": function (e) {
                        self.zoomToFeature(self, e.feature.geometry);
                    },
                    "dblclick": function (e) {
                        self.zoomToFeature(self, e.feature.geometry);
                    },
                    "scope": layer
                });
            }

            // May zoom to feature when grid row is double-clicked.
            if (this.zoomOnRowDoubleClick) {
                this.on('celldblclick', function (grid, rowIndex, columnIndex, e) {
                    var record = grid.getStore().getAt(rowIndex);
                    var feature = record.getFeature();
                    self.zoomToFeature(self, feature.geometry);
                });
            }

            if (this.separateSelectionLayer) {
                this.selLayer = new OpenLayers.Layer.Vector(this.title + '_Sel', {noLegend: true, displayInLayerSwitcher: false});
                // selLayer.style = layer.styleMap.styles['select'].clone();
                this.selLayer.styleMap.styles['default'] = layer.styleMap.styles['select'];
                this.selLayer.style = this.selLayer.styleMap.styles['default'].defaultStyle;
                // this.selLayer.style = layer.styleMap.styles['select'].clone();
                layer.styleMap.styles['select'] = layer.styleMap.styles['default'].clone();
                layer.styleMap.styles['select'].defaultStyle.fillColor = 'white';
                layer.styleMap.styles['select'].defaultStyle.fillOpacity = 0.0;
                this.map.addLayer(this.selLayer);
                this.map.setLayerIndex(this.selLayer, this.map.layers.length - 1);
                this.layer.events.on({
                    featureselected: this.updateSelectionLayer,
                    featureunselected: this.updateSelectionLayer,
                    scope: this
                });
            }
        }

        this.setupStore(this.features);

        // Will take effort to support paging...
        // http://dev.sencha.com/deploy/ext-3.3.1/examples/grid/paging.html
        /*		this.bbar = new Ext.PagingToolbar({
         pageSize: 25,
         store: this.store,
         displayInfo: true,
         displayMsg: 'Displaying objects {0} - {1} of {2}',
         emptyMsg: "No objects to display"
         });
         */

        // Enables the interaction between features on the Map and Grid
        if (this.featureSelection && !this.sm) {
            this.sm = new GeoExt.grid.FeatureSelectionModel();
        }

        if (this.showTopToolbar) {
            this.tbar = this.createTopToolbar();
        }

        Heron.widgets.search.FeatureGridPanel.superclass.initComponent.call(this);

        // ExtJS lifecycle events
        this.addListener("afterrender", this.onPanelRendered, this);
        this.addListener("show", this.onPanelShow, this);
        this.addListener("hide", this.onPanelHide, this);
    },


    /** api: method[createTopToolbar]
     * Create the top toolbar.
     */
    createTopToolbar: function () {

        // Top toolbar text, keep var for updating
        var tbarItems = [this.tbarText = new Ext.Toolbar.TextItem({text: __(' ')})];
        tbarItems.push('->');

        if (this.downloadable) {

            // Multiple display types configured: add toolbar tabs
            // var downloadMenuItems = ['<b class="menu-title">' + __('Choose an Export Format') + '</b>'];
            var downloadMenuItems = [];
            var item;
            for (var j = 0; j < this.exportFormats.length; j++) {
                var exportFormat = this.exportFormats[j];
                item = {
                    text: __('as') + ' ' + exportFormat,
                    cls: 'x-btn',
                    iconCls: 'icon-table-export',
                    scope: this,
                    exportFormat: exportFormat,
                    handler: function (evt) {
                        this.exportData(evt.exportFormat);
                    }
                };
                downloadMenuItems.push(item);
            }

            if (this.downloadInfo && this.downloadInfo.downloadFormats) {
                var downloadFormats = this.downloadInfo.downloadFormats;
                for (var k = 0; k < downloadFormats.length; k++) {
                    var downloadFormat = downloadFormats[k];
                    item = {
                        text: __('as') + ' ' + downloadFormat.name,
                        cls: 'x-btn',
                        iconCls: 'icon-table-export',
                        downloadFormat: downloadFormat.outputFormat,
                        fileExt: downloadFormat.fileExt,
                        scope: this,
                        handler: function (evt) {
                            this.downloadData(evt.downloadFormat, evt.fileExt);
                        }
                    };
                    downloadMenuItems.push(item);
                }
            }

            if (downloadMenuItems.length > 0) {
                /* Add to toolbar. */
                tbarItems.push({
                    text: __('Download'),
                    cls: 'x-btn-text-icon',
                    iconCls: 'icon-table-save',
                    tooltip: __('Choose a Download Format'),
                    menu: new Ext.menu.Menu({
                        style: {
                            overflow: 'visible'	 // For the Combo popup
                        },
                        items: downloadMenuItems
                    })
                });
            }
        }

        tbarItems.push('->');
        tbarItems.push({
            text: __('Clear'),
            cls: 'x-btn-text-icon',
            iconCls: 'icon-table-clear',
            tooltip: __('Remove all results'),
            scope: this,
            handler: function () {
                this.removeFeatures();
            }
        });

        return new Ext.Toolbar({enableOverflow: true, items: tbarItems});
    },

    /** api: method[loadFeatures]
     * Loads array of feature objects in store and shows them on grid and map.
     */
    loadFeatures: function (features, featureType) {
        this.removeFeatures();
        this.featureType = featureType;

        // Defensive programming
        if (!features || features.length == 0) {
            return;
        }

        this.showLayer();
        this.store.loadData(features);
        this.updateTbarText();

        // Whenever Paging is supported...
        // http://dev.sencha.com/deploy/ext-3.3.1/examples/grid/paging.html
        // this.store.load({params:{start:0, limit:25}});

        if (this.zoomToDataExtent) {
            if (features.length == 1 && features[0].geometry.CLASS_NAME == "OpenLayers.Geometry.Point") {
                var point = features[0].geometry.getCentroid();
                this.map.setCenter(new OpenLayers.LonLat(point.x, point.y), this.zoomLevelPoint);
            } else if (this.layer) {
                this.map.zoomToExtent(this.layer.getDataExtent());
            }
        }
    },

    /** api: method[hasFeatures]
     * Does this Panel have features?.
     */
    hasFeatures: function () {
        return this.store && this.store.getCount() > 0;
    },

    /** api: method[removeFeatures]
     * Removes all feature objects from store .
     */
    removeFeatures: function () {
        if (this.store) {
            this.store.removeAll(false);
        }
        if (this.selLayer) {
            this.selLayer.removeAllFeatures({silent: true});
        }
        this.updateTbarText();
    },

    /** api: method[showLayer]
     * Show the layer with features on the map.
     */
    showLayer: function () {
        // this.removeFeatures();
        if (this.layer) {
            if (this.selLayer) {
                this.map.setLayerIndex(this.selLayer, this.map.layers.length - 1);
                this.map.setLayerIndex(this.layer, this.map.layers.length - 2);
            } else {
                this.map.setLayerIndex(this.layer, this.map.layers.length - 1);
            }
            if (!this.layer.getVisibility()) {
                this.layer.setVisibility(true);
            }
            if (this.selLayer && !this.selLayer.getVisibility()) {
                this.selLayer.setVisibility(true);
            }
        }
    },

    /** api: method[hideLayer]
     * Hide the layer with features on the map.
     */
    hideLayer: function () {
        // this.removeFeatures();
        if (this.layer && this.layer.getVisibility()) {
            this.layer.setVisibility(false);
        }
        if (this.selLayer && this.selLayer.getVisibility()) {
            this.selLayer.setVisibility(false);
        }
    },

    /** api: method[hideLayer]
     * Hide the layer with features on the map.
     */
    zoomToFeature: function (self, geometry) {
        if (!geometry) {
            return;
        }

        // For point features center map otherwise zoom to geometry bounds
        if (geometry.getVertices().length == 1) {
            var point = geometry.getCentroid();
            self.map.setCenter(new OpenLayers.LonLat(point.x, point.y), self.zoomLevelPointSelect);
        } else {
            self.map.zoomToExtent(geometry.getBounds());
        }
    },

    zoomButtonRenderer: function () {
        var id = Ext.id();

        (function () {
            new Ext.Button({
                renderTo: id,
                text: 'Zoom'
            });

        }).defer(25);

        return (String.format('<div id="{0}"></div>', id));
    },

    /** private: method[setupStore]
     *  :param features: ``Array`` optional features.
     */
    setupStore: function (features) {
        if (this.store && !this.autoConfig) {
            return;
        }

        // Prepare fields array for store from columns in Grid config.
        var storeFields = [];
        if (this.autoConfig && features) {
            this.columns = [];

            for (var i = 0; i < features.length; i++) {
                var feature = features[i];
                var fieldName;
                for (fieldName in feature.attributes) {
                    // Capitalize header names
                    var column = {
                        header: this.columnCapitalize ? fieldName.substr(0, 1).toUpperCase() + fieldName.substr(1).toLowerCase() : fieldName,
                        width: 100,
                        dataIndex: fieldName,
                        sortable: true
                    };

                    // Look for custom rendering
                    if (this.gridCellRenderers && this.featureType) {
                        var gridCellRenderer;
                        for (var k = 0; k < this.gridCellRenderers.length; k++) {
                            gridCellRenderer = this.gridCellRenderers[k];
                            if (gridCellRenderer.attrName && fieldName == gridCellRenderer.attrName) {
                                if (gridCellRenderer.featureType && this.featureType == gridCellRenderer.featureType || !gridCellRenderer.featureType) {
                                    column.options = gridCellRenderer.renderer.options;
                                    column.renderer = gridCellRenderer.renderer.fn;
                                }
                            }
                        }
                    }

                    this.columns.push(column);
                    storeFields.push({name: column.dataIndex});
                }
                break;
            }
        } else {
            Ext.each(this.columns, function (column) {
                if (column.dataIndex) {
                    storeFields.push({name: column.dataIndex, type: column.type});
                }
                column.sortable = true;
            });
        }

        // this.columns.push({ header: 'Zoom', width: 60, sortable: false, renderer: self.zoomButtonRenderer });

        // Define the Store
        var storeConfig = { layer: this.layer, fields: storeFields};

        // Optional extra store options in config
        Ext.apply(storeConfig, this.hropts.storeOpts);

        this.store = new GeoExt.data.FeatureStore(storeConfig);
    },

    /** private: method[updateSelectionLayer]
     *  :param evt: ``Object`` An object with a feature property referencing
     *                         the selected or unselected feature.
     */
    updateSelectionLayer: function (evt) {
        if (!this.showGeometries) {
            return;
        }
        this.selLayer.removeAllFeatures({silent: true});
        var features = this.layer.selectedFeatures;
        for (var i = 0; i < features.length; i++) {
            var feature = features[i].clone();
            this.selLayer.addFeatures(feature);
        }
    },

    /** api: method[onPanelRendered]
     *  Called when Panel has been rendered.
     */
    onPanelRendered: function () {
        if (this.ownerCt) {
            this.ownerCt.addListener("parenthide", this.onParentHide, this);
            this.ownerCt.addListener("parentshow", this.onParentShow, this);
        }
    },

    /** private: method[onPanelShow]
     * Called after our panel is shown.
     */
    onPanelShow: function () {
        if (this.selModel && this.selModel.selectControl) {
            this.selModel.selectControl.activate();
        }
    },

    /** private: method[onPanelHide]
     * Called  before our panel is hidden.
     */
    onPanelHide: function () {
        if (this.selModel && this.selModel.selectControl) {
            this.selModel.selectControl.deactivate();
        }
    },

    /** private: method[onParentShow]
     * Called usually before our panel is created.
     */
    onParentShow: function () {
        this.showLayer();
    },

    /** private: method[onParentHide]
     * Cleanup usually before our panel is hidden.
     */
    onParentHide: function () {
        this.removeFeatures();
        this.hideLayer();
    },

    /** private: method[cleanup]
     * Cleanup usually before our panel is destroyed.
     */
    cleanup: function () {
        this.removeFeatures();
        if (this.selModel && this.selModel.selectControl) {
            this.selModel.selectControl.deactivate();
            this.selModel = null;
        }

        if (this.layer) {
            this.map.removeLayer(this.layer);
        }

        if (this.selLayer) {
            this.map.removeLayer(this.selLayer);
        }
        return true;
    },

    /** private: method[updateTbarText]
     * Update text message in top toolbar.
     */
    updateTbarText: function () {
        if (!this.tbarText) {
            return;
        }
        var objCount = this.store ? this.store.getCount() : 0;
        this.tbarText.setText(objCount + ' ' + (objCount != 1 ? __('Results') : __('Result')));
    },

    /** private: method[exportData]
     * Callback handler function for exporting and downloading the data to specified format.
     */
    exportData: function (exportFormat) {

        var store = this.store;

        // Get config from preconfigured configs
        var config = this.exportConfigs[exportFormat];
        if (!config) {
            Ext.Msg.alert(__('Warning'), __('Invalid export format configured: ' + exportFormat));
            return;
        }

        // Create the filename for download
        var featureType = this.featureType ? this.featureType : 'heron';
        config.fileName = featureType + config.fileExt;

        // Use only the columns from the original data, not the internal feature store columns
        // 'fid', 'state' and the feature object itthis, see issue 181. These are the first 3 fields in
        // a GeoExt FeatureStore.
        config.columns = (store.fields && store.fields.items && store.fields.items.length > 3) ? store.fields.items.slice(3) : null;

        // Format the feature or grid data to chosen format and force user-download
        var data = Heron.data.DataExporter.formatStore(store, config, true);
        Heron.data.DataExporter.download(data, config);
    },

    /** private: method[downloadData]
     * Callback handler function for direct downloading the data in specified format.
     */
    downloadData: function (downloadFormat, fileExt) {

        var downloadInfo = this.downloadInfo;
        downloadInfo.params.outputFormat = downloadFormat;
        downloadInfo.params.filename = downloadInfo.params.typename + fileExt;

        var paramStr = OpenLayers.Util.getParameterString(downloadInfo.params);

        var url = OpenLayers.Util.urlAppend(downloadInfo.url, paramStr);
        if (url.length > 2048) {
            Ext.Msg.alert(__('Warning'), __('Download URL string too long (max 2048 chars): ') + url.length);
            return;
        }

        // Force user-download
        Heron.data.DataExporter.directDownload(url);
    }

});

/** api: xtype = hr_featuregridpanel */
Ext.reg('hr_featuregridpanel', Heron.widgets.search.FeatureGridPanel);

/** Old, compat with pre-0.72 name. */
Ext.reg('hr_featselgridpanel', Heron.widgets.search.FeatureGridPanel);

