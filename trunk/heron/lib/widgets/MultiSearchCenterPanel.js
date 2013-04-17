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
 *  class = MultiSearchCenterPanel
 *  base_link = `GeoExt.form.FormPanel <http://www.geoext.org/lib/GeoExt/widgets/form/FormPanel.html>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron MultiSearchCenterPanel.
 *  Note that the  config contains an array of objects with each a Search and a ResultPanel.
 *
 *  .. code-block:: javascript

     {
         xtype: 'hr_multisearchcenterpanel',
         height: 600,
         hropts: [
             {
                 searchPanel: {
                     xtype: 'hr_formsearchpanel',
                     name: 'Search Hockey Clubs',
                     header: false,
                     protocol: new OpenLayers.Protocol.WFS({
                         version: "1.1.0",
                         url: "http://kademo.nl/gs2/wfs?",
                         srsName: "EPSG:28992",
                         featureType: "hockeyclubs",
                         featureNS: "http://innovatie.kadaster.nl"
                     }),
                     items: [
                         {
                             xtype: "textfield",
                             name: "name__like",
                             value: 'H.C.',
                             fieldLabel: "  name"
                         },
                         {
                             xtype: "label",
                             id: "helplabel",
                             html: 'Type name of an NL hockeyclub, wildcards are appended<br/>Any single letter will also yield results.<br/>',
                             style: {
                                 fontSize: '10px',
                                 color: '#AAAAAA'
                             }
                         }
                     ],
                     hropts: {
                         onSearchCompleteZoom: 10,
                         autoWildCardAttach: true
                     }
                 },
                 resultPanel: {
                     xtype: 'hr_featuregridpanel',
                     id: 'hr-featuregridpanel',
                     header: false,
                     columns: [
                         {
                             header: "Name",
                             width: 100,
                             dataIndex: "name",
                             type: 'string'
                         },
                         {
                             header: "Desc",
                             width: 200,
                             dataIndex: "cmt",
                             type: 'string'
                         }
                     ],
                     hropts: {
                         zoomOnRowDoubleClick: true,
                         zoomOnFeatureSelect: false,
                         zoomLevelPointSelect: 8
                     }
                 }
             },
             {
                 searchPanel: {
                     xtype: 'hr_spatialsearchpanel',
                     name: __('Spatial Search'),
                     id: 'hr-spatialsearchpanel',
                     header: false,
                     bodyStyle: 'padding: 6px',
                     style: {
                         fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                         fontSize: '12px'
                     },
                     hropts: {
                         onSearchCompleteZoom: 10
                     }
                 },
                 resultPanel: {
                     xtype: 'hr_featuregridpanel',
                     id: 'hr-featuregridpanel',
                     header: false,
                     autoConfig: true,
                     hropts: {
                         zoomOnRowDoubleClick: true,
                         zoomOnFeatureSelect: false,
                         zoomLevelPointSelect: 8,
                         zoomToDataExtent: true
                     }
                 }
             },
             {
                 searchPanel: {
                     xtype: 'hr_spatialsearchpanel',
                     name: __('Spatial: use geometries from last result'),
                     description: 'This search uses the feature-geometries of the last result to construct and perform a spatial search.',
                     header: false,
                     border: false,
                     bodyStyle: 'padding: 6px',
                     style: {
                         fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
                         fontSize: '12px'
                     },
                     hropts: {
                         fromLastResult: true,
                         maxFilterGeometries: 50,
                         onSearchCompleteZoom: 10
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
                         zoomToDataExtent: true
                     }
                 }
             },
             {
                 searchPanel: {
                     xtype: 'hr_gxpquerypanel',
                     name: __('Spatial and Attributes: build your own queries'),
                     description: 'This search uses both search within Map extent and/or your own attribute criteria',
                     header: false,
                     border: false
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
                         zoomToDataExtent: true
                     }
                 }
             }
         ]
     }
 */

/** api: constructor
 *  .. class:: MultiSearchCenterPanel(config)
 *
 *  A panel designed to hold a multiple Search/ResultPanel combinations and a
 *  combobox selector to select a specific Search.
 */
Heron.widgets.MultiSearchCenterPanel = Ext.extend(Heron.widgets.SearchCenterPanel, {

    config: [],

    initComponent: function () {
        this.config = this.hropts;

        var searchNames = [];
        Ext.each(this.config, function (item) {
            searchNames.push(item.searchPanel.name ? item.searchPanel.name : __('Undefined (check your config)'));
        });

        this.combo = new Ext.form.ComboBox({
            store: searchNames, //direct array data
            value: searchNames[0],
            editable: false,
            typeAhead: false,
            triggerAction: 'all',
            emptyText: 'Select a search...',
            selectOnFocus: true,
            width: 250,
            listeners: {
                scope: this,
                'select': this.onSearchSelect
            }

        });

        this.tbar = [
            {'text': __('Search: ')},
            this.combo
        ];

        this.setPanels(this.config[0].searchPanel, this.config[0].resultPanel);
        Heron.widgets.MultiSearchCenterPanel.superclass.initComponent.call(this);
    },


    /** api: method[onSearchSelect]
     *  Called when search selected in combo box.
     */
    onSearchSelect: function (comboBox) {
        var self = this;
        Ext.each(this.config, function (item) {
            if (item.searchPanel.name == comboBox.value) {
                self.switchPanels(item.searchPanel, item.resultPanel);
            }
        });
        this.showSearchPanel(this);
    },

    /***
     * Callback from SearchPanel on successful search.
     */
    onSearchSuccess: function (searchPanel, features) {
        Heron.widgets.MultiSearchCenterPanel.superclass.onSearchSuccess.call(this, searchPanel, features);
        this.lastResultFeatures = features;
    },

    /**
     * Set the Search and Result Panels to be displayed.
     */
    setPanels: function (searchPanel, resultPanel) {
        if (this.hropts.searchPanel && this.hropts.searchPanel.name === searchPanel.name) {
            return false;
        }
        this.hropts.searchPanel = searchPanel;
        this.hropts.resultPanel = resultPanel;
        return true;
    },

    /**
     * Set the Search and Result Panels to be displayed.
     */
    switchPanels: function (searchPanel, resultPanel) {
        if (!this.setPanels(searchPanel, resultPanel)) {
            return;
        }

        if (this.searchPanel) {
            this.lastSearchName = this.searchPanel.name;
            this.remove(this.searchPanel, true);
        }

        if (this.resultPanel) {
            this.resultPanel.cleanup();
            this.remove(this.resultPanel, true);
            this.resultPanel = null;
        }

        if (this.hropts.searchPanel.hropts && this.hropts.searchPanel.hropts.fromLastResult) {
            this.hropts.searchPanel.hropts.filterFeatures = this.lastResultFeatures;
            this.hropts.searchPanel.hropts.lastSearchName = this.lastSearchName;
        }

        this.searchPanel = Ext.create(this.hropts.searchPanel);
        this.add(this.searchPanel);
        this.searchPanel.show();

        this.getLayout().setActiveItem(this.searchPanel);
        this.onRendered();
    }
});

/** api: xtype = hr_multisearchcenterpanel */
Ext.reg('hr_multisearchcenterpanel', Heron.widgets.MultiSearchCenterPanel);


