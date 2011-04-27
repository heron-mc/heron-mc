/*
 * Copyright (C) 2011  Het Kadaster - The Netherlands
 *
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

Ext.namespace("GeoViewer");

/** api: constructor
 *  .. class:: SearchPanel(config)
 *
 *  A panel designed to hold a (geo-)search form.
 */
GeoViewer.SearchPanel = Ext.extend(Ext.form.FormPanel, {
	// TODO: this component needs entire redoing !!!

	initComponent : function() {
		//TODO: make this more flexible
		var ds = new Ext.data.Store({
			proxy: new Ext.data.ScriptTagProxy({
				url: 'http://research.geodan.nl/esdin/autocomplete/complete.php'
			}),
			reader: new Ext.data.JsonReader({
				root: 'data'
			}, [
				{name: 'id', type: 'string'},
				{name: 'name', type: 'string'},
				{name: 'quality', type: 'string'}
			])
		});

		//TODO: make this more flexible
		var options = {
			title: options.title,
			hideLabels: true,
			method: 'GET',
			url: 'http://research.geodan.nl/esdin/autocomplete/geocode.php',

			frame:false,
			items: [
				new Ext.form.ComboBox({
					store		: ds,
					displayField : 'name',
					valueField	 : 'id',
					typeAhead	: true,
					allowBlank	 : false,
					hideTrigger:true,

					loadingText  : __('Searching...')
				})
			],
			layout: 'fit',
			//TODO: make this more flexible
			buttons: [
				{text:"search",
					type: 'submit',
					method: 'GET',
					url: 'http://research.geodan.nl/esdin/autocomplete/geocode.php',
					formBind: true,
					handler: function() {
						form = this.findParentByType('form').getForm();
						form.submit({
							url:'http://research.geodan.nl/esdin/autocomplete/geocode.php',
							method: 'GET',
							params:{'query':form.items.items[0].value},
							success:function(form, record) {
								var lat = record.result.data[0].latitude;
								var lon = record.result.data[0].longitude;
								GeoViewer.Map.layers[0].map.setCenter(new OpenLayers.LonLat(lon, lat), 10);
							}
						})
					}}
			]


		};

		Ext.apply(this, options);

		GeoViewer.SearchPanel.superclass.initComponent.call(this);

	}
});

/** api: xtype = gv_searchpanel */
Ext.reg('gv_searchpanel', GeoViewer.SearchPanel);

