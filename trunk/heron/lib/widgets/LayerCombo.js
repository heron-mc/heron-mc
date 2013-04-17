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
 *  class = LayerCombo
 *  base_link = `Ext.form.ComboBox <http://dev.sencha.com/deploy/ext-3.4.0/docs/?class=Ext.form.ComboBox>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron LayerCombo.
 *  Note the main config layerFilter, a function to select a subset of Layers from the Map.
 *  Default is all Map Layers. When a Layer is selected the 'selectlayer' event is fired.
 *
 *  .. code-block:: javascript

    {
        xtype: "hr_layercombo",
        id: "hr_layercombo",

        layerFilter: function (map) {
            return map.getLayersByClass('OpenLayers.Layer.WMS');
        }
    }

 */

/**
 *
 * A combo box to select a Layer from a Layer set.
 *
 * @constructor
 * @extends Ext.form.ComboBox
 *
 */
Heron.widgets.LayerCombo = Ext.extend(Ext.form.ComboBox, {

	/** api: config[map]
	 *  ``OpenLayers.Map or Object``  A configured map or a configuration object
	 *  for the map constructor, required only if :attr:`zoom` is set to
	 *  value greater than or equal to 0.
	 */
	/** private: property[map]
	 *  ``OpenLayers.Map``  The map object.
	 */
	map: null,

	/** api: config[store]
	 *  ``GeoExt.data.LayerStore`` A configured LayerStore
	 */
	/** private: property[store]
	 *  ``GeoExt.data.LayerStore``  The layer store of the map.
	 */
	store: null,

	/** api: config[width]
	 *  See http://www.dev.sencha.com/deploy/dev/docs/source/BoxComponent.html#cfg-Ext.BoxComponent-width,
	 *  default value is 140.
	 */
	width: 'auto',

	/** api: config[listWidth]
	 *  See http://www.dev.sencha.com/deploy/dev/docs/source/Combo.html#cfg-Ext.form.ComboBox-listWidth,
	 *  default value is 140.
	 */
	listWidth: 'auto',

	/** api: config[emptyText]
	 *  See http://www.dev.sencha.com/deploy/dev/docs/source/TextField.html#cfg-Ext.form.TextField-emptyText,
	 *  default value is "Choose a Base Layer".
	 */
	emptyText: __('Choose a Layer'),

	/** api: config[tooltip]
	 *  See http://www.dev.sencha.com/deploy/dev/docs/source/TextField.html#cfg-Ext.form.TextField-emptyText,
	 *  default value is "Basemaps".
	 */
	tooltip: __('Choose a Layer'),

	/** private: property[hideTrigger]
	 *  Hide trigger of the combo.
	 */
	hideTrigger: false,

	/** private: property[layerFilter]
	 *  layerFilter - function that takes subset of all layers, e.g. all visible or baselayers
	 */
	layerFilter: function (map) {
		return map.layers;
	},

	/** private: property[displayField]
	 *  Display field name
	 */
	displayField: 'name',

	/** private: property[forceSelection]
	 *  Force selection.
	 */
	forceSelection: true,

	/** private: property[triggerAction]
	 *  trigger Action
	 */
	triggerAction: 'all',

	/** private: property[mode]
	 *  mode
	 */
	mode: 'local',

	/** private: property[editable]
	 *  editable
	 */
	editable: false,

	/** private: constructor
	 */
	initComponent: function () {
		Heron.widgets.LayerCombo.superclass.initComponent.apply(this, arguments);

		if (!this.map) {
			this.map = Heron.App.getMap();
		}

		// Setup our own events
		this.addEvents({
			'selectlayer': true
		});

		// create layer store with possibly filtered layerset
		this.store = new GeoExt.data.LayerStore({
			layers: this.layerFilter(this.map)
		});

		// set the display field
		this.displayField = this.store.fields.keys[1];

		// set an initial value if available (e.g. from subclass
		if (this.initialValue) {
			this.setValue(this.initialValue);
		}

		// The ComboBox select handler, when item  selected
		this.on('select', function (combo, record, idx) {
			//record.getLayer(idx).setVisibility(true);
			this.fireEvent('selectlayer', record.getLayer(idx));
		}, this);
	},

	/** method[listeners]
	 *  Show qtip
	 */
	listeners: {
		render: function (c) {
			c.el.set({qtip: this.tooltip});
			c.trigger.set({qtip: this.tooltip});
		}
	}
});

/** api: xtype = hr_layercombo */
Ext.reg('hr_layercombo', Heron.widgets.LayerCombo);
