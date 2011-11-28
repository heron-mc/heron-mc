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
 *  class = FeatSelSearchPanel
 *  base_link = `GeoExt.form.FormPanel <http://www.geoext.org/lib/GeoExt/widgets/form/FormPanel.html>`_
 */

/** api: example
 *  Sample code showing how to configure a Heron FeatSelSearchPanel.
 *  This example uses the internal default progress messages and action (zoom).
 *
 *  .. code-block:: javascript
 *
 *				 {
 *					xtype: 'hr_featselsearchpanel',
 *					id: 'hr-featselsearchpanel',
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
 *						onSearchCompleteZoom : 11
 *					}
 *				}
 */

/** api: constructor
 *  .. class:: FeatSelSearchPanel(config)
 *
 *  A panel designed to hold a (geo-)search form plus results (features) in grid and on map.
 */
Heron.widgets.FeatSelSearchPanel = Ext.extend(Ext.Panel, {
	initComponent: function() {
		// Couple Searchpanel to ourselves (see onSearchSuccess)
		this.hropts.searchPanel.parentId = this.id;

		var self = this;

		Ext.apply(this, {
			layout:'card',
			title		: __('Search'),
			activeItem:0,
			bbar: [
				{
					text: __('< Search'),
					ref:'../prevButton',
					disabled:true,
					handler: function() {
						self.showSearchPanel(self);
					}
				},
				'->',
				{
					text: __('Result >'),
					ref:'../nextButton',
					disabled:true,
					handler: function() {
						self.showResultGridPanel(self);
					}
				}
			],
			items:[
				self.hropts.searchPanel
			]

		});


		Heron.widgets.FeatSelSearchPanel.superclass.initComponent.call(this);
	},
	/***
	 * Display search form.
	 */
	showSearchPanel : function(self) {
		self.getLayout().setActiveItem(0);
		self.prevButton.disable();
		self.nextButton.enable();
	},

	/***
	 * Display result grid.
	 */
	showResultGridPanel : function(self) {
		self.getLayout().setActiveItem(1);
		self.prevButton.enable();
		self.nextButton.disable();
	},

	/***
	 * Display result grid.
	 */
	onSearchSuccess : function(searchPanel, features) {
		var resultPanel = this.items.get(1);
		if (!resultPanel) {
			resultPanel = new Heron.widgets.FeatSelGridPanel(this.hropts.resultPanel);
			this.add(resultPanel);
		}
		resultPanel.loadFeatures(features);
		this.showResultGridPanel(this);
	}

});

/** api: xtype = hr_featselsearchpanel */
Ext.reg('hr_featselsearchpanel', Heron.widgets.FeatSelSearchPanel);

