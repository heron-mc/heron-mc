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

/** api: example[getfeaturesbydraw]
 *  Get Features by Drawing
 *  -----------------------
 *  Get, select and download Features by drawing on Map.
 */

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
 *  class = SearchPanel
 *  base_link = `GeoExt.form.FormPanel <http://www.geoext.org/lib/GeoExt/widgets/form/FormPanel.html>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron SearchPanel.
 *  This example uses the internal default progress messages and action (zoom).
 *  Note that the fields in the items must follow the convention outlined in
 *  `GeoExt.form.SearchAction <http://geoext.org/lib/GeoExt/widgets/form/SearchAction.html>`_.
 *
 *  .. code-block:: javascript
 *
 *                 {
 *					xtype: 'hr_spatialsearchpanel',
 *					id: 'hr-searchpanel',
 *					title: __('Search'),
 *					bodyStyle: 'padding: 6px',
 *					style: {
 *						fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
 *						fontSize: '12px'
 *					},
 *					protocol: new OpenLayers.Protocol.WFS({
 *								version: "1.1.0",
 *								url: "http://gis.kademo.nl/gs2/wfs?",
 *								srsName: "EPSG:28992",
 *								featureType: "hockeyclubs",
 *								featureNS: "http://innovatie.kadaster.nl"
 *							}),
 *					items: [
 *						{
 *							xtype: "textfield",
 *							name: "name__like",
 *							value: 'Hu*',
 *							fieldLabel: "  name"
 *						},
 *						{
 *							xtype: "label",
 *							id: "helplabel",
 *							html: 'Type name of an NL hockeyclub, use * as wildcard<br/>',
 *							style: {
 *								fontSize: '10px',
 *								color: '#CCCCCC'
 *							}
 *						}
 *					],
 *					hropts: {
 *						autoWildCardAttach : true,
 *						onSearchCompleteZoom : 11,
 *						layerOpts: [
 *							{ layerOn: 'lki_staatseigendommen', layerOpacity: 0.4 },
 *							{ layerOn: 'bag_adres_staat_g', layerOpacity: 1.0 }
 *						]
 *					}
 *				}
 */


Ext.namespace("Heron.widgets");

/** api: (define)
 *  module = Heron.widgets
 *  class = LayerCombo
 *  base_link = `Ext.form.ComboBox <http://dev.sencha.com/deploy/ext-3.4.0/docs/?class=Ext.form.ComboBox>`_
 */


/** api: constructor
 *  .. class:: SearchPanel(config)
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
			"searchfail": true,
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

		this.addListener("deactivate", function () {
			map.removeControl(this.editingControl);
			map.removeLayer(this.drawingLayer);
		}, this);

		this.addListener("layerselected", function () {

			this.drawingLayer = new OpenLayers.Layer.Vector("DrawSelection", {isBaseLayer: false});

			map.addLayers([this.drawingLayer]);
			var elm = document.getElementById('hr_drawselect');
			this.editingControl = new OpenLayers.Control.EditingToolbar(this.drawingLayer, {div: elm});
//			this.editingControl = new OpenLayers.Control.EditingToolbar(this.drawingLayer);
			map.addControl(this.editingControl);
			this.doLayout();
		}, this);

		this.addListener("searchissued", function () {
			this.features = null;
			this.updateProgressLabel(__('Searching...'));
		}, this);

		this.addListener("searchcomplete", function (result) {
			this.onSearchComplete(result);
		}, this);

	},

	updateProgressLabel: function (text) {
		this.getComponent('hr_progresslabel').setText(text);
	},

	/** api: config[onSearchComplete]
	 *  Function to call when search is complete.
	 *  Default is to show "Search completed" with feature count on progress label.
	 */
	onSearchComplete: function (result) {

		if (result && result.success()) {
			var features = this.features = result.features;
			this.updateProgressLabel(__('Search Completed: ') + (features ? features.length : 0) + ' ' + __('Feature(s)'));

			// Case: one Point feature found and onSearchCompleteZoom defined: zoom to Point
			if (features.length == 1 && features[0].geometry && features[0].geometry.getVertices().length == 1 && this.onSearchCompleteZoom) {
				var point = features[0].geometry.getCentroid();
				this.map.setCenter(new OpenLayers.LonLat(point.x, point.y), this.onSearchCompleteZoom);
				this.notifyParentOnSearchComplete(features);
				return;
			}

			// All other cases: zoom to the extent (bounding box) of the features found. See issue 69.
			var bbox;
			for (var i = 0; i < features.length; ++i) {
				if (features[i] && features[i].geometry) {
					if (!bbox) {
						bbox = features[i].geometry.getBounds();
					} else {
						bbox.extend(features[i].geometry.getBounds());
					}
				}
			}

			if (bbox) {
				this.map.zoomToExtent(bbox);
			}
			this.notifyParentOnSearchComplete(features);
		} else {
			this.updateProgressLabel(__('Search Failed'));
		}
	},

	/**
	 * private: method[notifyParentOnSearchComplete]
	 * Call to optionally notify parent component when search is complete.
	 */
	notifyParentOnSearchComplete: function (features) {
		if (this.parentId) {
			var parent = Ext.getCmp(this.parentId);
			if (parent.onSearchSuccess) {
				parent.onSearchSuccess(this, features);
			}
		}
	},

	/** api: method[search]
	 *  :param options: ``Object`` The options passed to the
	 *      :class:`GeoExt.form.SearchAction` constructor.
	 *
	 *  Shortcut to the internal form's search method.
	 */
	search: function () {
		var layer = this.drawingLayer;
		var searchLayer = this.layer;
		this.protocol = OpenLayers.Protocol.WFS.fromWMSLayer(searchLayer, {outputFormat: 'GML2'});

		var filter = new OpenLayers.Filter.Spatial({
			type: OpenLayers.Filter.Spatial.INTERSECTS,
			value: layer.features[0].geometry
		});

		// Set the cursor to "wait" to tell the user we're working.
		// OpenLayers.Element.addClass(this.map.viewPortDiv, "olCursorWait");
		this.drawingLayer.removeAllFeatures();

		var response = this.protocol.read({
			maxFeatures: this.single == true ? this.maxFeatures : undefined,
			filter: filter,
			callback: function (result) {
				this.fireEvent('searchcomplete', result);
			},
			scope: this
		});
		this.fireEvent('searchissued');
	}
});

/** api: xtype = hr_spatialsearchpanel */
Ext.reg('hr_spatialsearchpanel', Heron.widgets.SpatialSearchPanel);


/** This config assumes the DefaultOptionsWorld.js to be included first!! */
Heron.options.map.settings.zoom = 8;
Ext.namespace("Heron.examples");

/** Create a config for the search panel. This panel may be embedded into the accordion
 * or bound to the "find" button in the toolbar. Here we use the toolbar button.
 */
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
				zoomLevelPointSelect: 8
			}
		}
	}
};


// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. By providing a "create" function your own toolbar
// item can be added.
// For menu's and other standard ExtJS Toolbar items, the "any" type can be
// used. There you need only pass the options, similar as in the function
// ExtJS Toolbar.add().
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {max_features: 20}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{
		type: "searchpanel",
		// Options for SearchPanel window
		options: {
			show: true,

			searchWindow: {
				title: undefined,
				x: 100,
				y: undefined,
				width: 320,
				height: 400,
				items: [
					Heron.examples.searchPanelConfig
				]
			}
		}
	}

];
