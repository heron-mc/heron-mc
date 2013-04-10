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
 *
 {
	xtype: 'hr_multisearchcenterpanel',
	hropts: {


		}
	}
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
        this.hropts.searchPanel = searchPanel;
        this.hropts.resultPanel = resultPanel;
    },

    /**
     * Set the Search and Result Panels to be displayed.
     */
    switchPanels: function (searchPanel, resultPanel) {
        this.setPanels(searchPanel, resultPanel);

        if (this.searchPanel) {
            this.lastSearchName = this.searchPanel.name;
            this.remove(this.searchPanel, true);
        }

        if (this.resultPanel) {
            this.resultPanel.cleanup();
            this.remove(this.resultPanel, true);
            this.resultPanel = null;
        }

        if (this.hropts.searchPanel.hropts.fromLastResult) {
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


