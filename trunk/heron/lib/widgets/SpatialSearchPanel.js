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
 *
	Heron.examples.searchPanelConfig = {
	xtype: 'hr_featselsearchpanel',
	id: 'hr-featselsearchpanel',
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
			xtype: 'hr_featselgridpanel',
			id: 'hr-featselgridpanel',
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
 *  A panel designed to hold a (geo-)search form.
 */
Heron.widgets.SpatialSearchPanel = Ext.extend(Ext.Panel, {

	layout: {
		type: 'vbox',
		padding: '10',
		align: 'stretch'
	},

//	defaults: {margins: '0 0 5 0'},
	border: false,

	layerFilter: function (map) {
		return map.getLayersByClass('OpenLayers.Layer.WMS');
	},

// See also: http://ian01.geog.psu.edu/geoserver_docs/apps/gaz/search.html
	initComponent: function () {

		Ext.apply(this, this.hropts);

		this.items = [
			{
				xtype: "hr_layercombo",
				id: "hr_layercombo",

				layerFilter: this.layerFilter
			},
			{
				xtype: "hr_htmlpanel",
				html: '<div id="hr_drawselect" class="olControlEditingToolbar olControlNoSelect">drawselect</div>',
				height: 40,
				preventBodyReset: true,
				style: {
					marginTop: '24px',
					fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
					color: '#0000C0',
					fontSize: '12px'
				}
			},
			{
				xtype: "label",
				id: "hr_progresslabel",
				text: __('Select Layer and draw geometry'),
				height: 40,
				style: {
					paddingTop: '24px',
					marginLeft: '6px',
					fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
					color: '#0000C0',
					fontSize: '12px'
				}
			},
			{
				xtype: "button",
				text: __('Search'),
				enabled: false,
				width: 120,
				style: {
					paddingTop: '24px',
					marginLeft: '6px',
					fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
					color: '#0000C0',
					fontSize: '12px'
				},
				handler: function () {
					this.action = null;
					this.search();
				},
				scope: this
			}
		];

		// Setup our own events
		this.addEvents({
			"layerselected": true,
			"drawmethodselected": true,
			"drawingcomplete": true,
			"searchissued": true,
			"searchcomplete": true,
			"searcherror": true,
			"searchfailed": true,
			"searchsuccess": true
		});

		Heron.widgets.SpatialSearchPanel.superclass.initComponent.call(this);

		var map = this.map = Heron.App.getMap();

		this.addListener("afterrender", function () {
			this.getComponent("hr_layercombo").on('selectlayer', function (layer) {
				this.layer = layer;
				this.fireEvent('layerselected');
			}, this);

		}, this);

//		this.addListener("deactivate", function () {
//			map.removeControl(this.editingControl);
//			map.removeLayer(this.sketchLayer);
//		}, this);

		this.addListener("layerselected", function () {
			this.addDrawingToolbar();
		}, this);

		this.addListener("searchissued", function () {
			this.features = null;
			this.updateProgressLabel(__('Searching...'));
		}, this);

		this.addListener("searchcomplete", function (searchPanel, result) {
			this.onSearchComplete(searchPanel, result);
		}, this);

	},

	addDrawingToolbar: function () {
		if (!this.sketchLayer) {
			this.sketchLayer = new OpenLayers.Layer.Vector("DrawSelection", {displayInLayerSwitcher: false, hideInLegend: true, isBaseLayer: false});
			this.map.addLayers([this.sketchLayer]);
			this.editingControl = new OpenLayers.Control.EditingToolbar(this.sketchLayer, {div: document.getElementById('hr_drawselect')});
			this.map.addControl(this.editingControl);
		}
	},

	updateProgressLabel: function (text) {
		this.getComponent('hr_progresslabel').setText(text);
	},

	/** api: method[onSearchComplete]
	 *  Function to call when search is complete.
	 *  Default is to show "Search completed" with feature count on progress label.
	 */
	onSearchComplete: function (searchPanel, result) {
		if (result && result.success()) {
			var features = this.features = result.features;
			this.updateProgressLabel(__('Search Completed: ') + (features ? features.length : 0) + ' ' + __('Feature(s)'));
			this.fireEvent('searchsuccess', searchPanel, features);
		} else {
			this.fireEvent('searchfailed', searchPanel, result);
			this.updateProgressLabel(__('Search Failed') + ' details: ' + result.priv.responseText);
		}
	},

	/** api: method[search]
	 *  :param options: ``Object`` The options passed to the
	 *      :class:`GeoExt.form.SearchAction` constructor.
	 *
	 *  Shortcut to the internal form's search method.
	 */
	search: function () {
		var sketchLayer = this.sketchLayer;
		var searchLayer = this.layer;

		this.protocol = OpenLayers.Protocol.WFS.fromWMSLayer(searchLayer, {outputFormat: 'GML2'});

		var filter = new OpenLayers.Filter.Spatial({
			type: OpenLayers.Filter.Spatial.INTERSECTS,
			value: sketchLayer.features[0].geometry
		});

		// Set the cursor to "wait" to tell the user we're working.
		// OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait");
		this.sketchLayer.removeAllFeatures();

		var response = this.protocol.read({
			maxFeatures: this.single == true ? this.maxFeatures : undefined,
			filter: filter,
			callback: function (result) {
				this.fireEvent('searchcomplete', this, result);
			},
			scope: this
		});
		this.fireEvent('searchissued');
	}
});

/** api: xtype = hr_spatialsearchpanel */
Ext.reg('hr_spatialsearchpanel', Heron.widgets.SpatialSearchPanel);
