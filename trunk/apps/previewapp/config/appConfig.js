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
Ext.namespace("PreviewApp.config");
Ext.namespace("Heron.widgets");
Ext.namespace("Heron.utils");
Ext.namespace("Heron.globals");

OpenLayers.Util.onImageLoadErrorColor = "transparent";

/** Proxy: required when non-image content is requested from other origins then this app. */
OpenLayers.ProxyHost = "../proxy/proxy.cgi?url=";
//OpenLayers.ProxyHost = "../../proxy/proxy.jsp?";

PreviewApp.config.appConfiguration = {
	/** We use a load-function as the .xml context config is read via async Ajax...*/
	load:function () {
		console.log('Loading application configuration for Heron version: ' + Heron.globals.version);

		/** Defines the layout of the entire PreviewApp as a JSON struct.*/
		Heron.layout = {
			xtype:'panel',

			/* Optional ExtJS Panel properties, see ExtJS API docs. */
			id:'hr-container-main',
			layout:'border',
			border:true,
			items:[
				{
					xtype:'panel',

					id:'hr-menu-left-container',
					layout:'accordion',
					layoutConfig:{
						align:'stretch',
						pack:'start'
					},
					region:'west',
					width:280,
					collapsible:true,
					border:false,
					items:[
						{
							/** Shows selected layers stacked */
							xtype:'hr_activelayerspanel',
							// height: 200,
							collapsed:true,
							flex:2,
							hropts:{
								/**
								 * Defines the custom component added
								 * under the standard layer node.
								 */
								component:{
									xtype:"gx_opacityslider",
									showTitle:false,
									plugins:new GeoExt.LayerOpacitySliderTip(),
									width:160,
									inverse:false,
									aggressive:false,
									style:{
										marginLeft:'18px'
									}
								}
							}
						},
						{
							/** Shows the tree structure for all Layers. */
							xtype:'hr_layertreepanel',
							// height: 300,
							id:'hr_treelayer',
							flex:1,
							/* LayerTree is populated from .xml config file(s). */
							hropts:Heron.options.layertree
						},
						{
							/** Shows Legends for selected Layers. */
							xtype:'hr_layerlegendpanel',
							defaultStyleIsFirst:true,
							flex:3,
							id:'legend_panel',
							hropts:{prefetchLegends:false}
						},
						{
							/** The TreePanel to be populated from a GetCapabilities request. */
							title:'Capabilities',
							xtype:'pdok_capabilitiestreepanel',
							useArrows:true,
							animate:true,
							hropts:{
								preload: false
							}
						},
						{
							/** Standard HTML Panel showing general app info. */
							xtype:'hr_htmlpanel',
							id:'hr-info-htmlpanel',
							autoLoad:{
								url:'config/info.html'
							},
							preventBodyReset:true,
							autoScroll:true,
							title:'Info',
							height:100,
							width:'100%'
						}
					]
				},
				{
					xtype:'panel',
					id:'hr-map-and-info-container',
					layout:'border',
					region:'center',
					width:'100%',
					collapsible:false,
					split:true,
					border:false,
					items:[
						{
							xtype:'hr_mappanel',
							title: Heron.options.map.settings.title,
							id:'hr-map',
							region:'center',
							collapsible:false,
							border:false,
							/* MapOptions (settings+Layers) is populated from .xml config file(s). */
							hropts:Heron.options.map
						},
						{
							/** Shows Vector Feature information from WMS FeatureInfo, WFS or Atom. */
							xtype:'hr_featureinfopanel',
							id:'hr-feature-info',
							region:"south",
							border:true,
							collapsible:true,
							collapsed:true,
							height:205,
							split:true,
							maxFeatures:20,
							width:'100%'
						}
					]
				}
			]
		};

		/** Toolbar on top of MapPanel. */
		Heron.options.map.toolbar = [
			{
				type:"featureinfo",
				options:{
					seperateRequestForLayers:true,
					max_features:20
				}
			},
			{
				type:"-"
			},
			{
				type:"pan"
			},
			{
				type:"zoomin"
			},
			{
				type:"zoomout"
			},
			{
				type:"zoomvisible"
			},
			{
				type:"-"
			},
			{
				type:"zoomprevious"
			},
			{
				type:"zoomnext"
			},
			{
				type:"-"
			},
			{
				type:"measurelength"
			},
			{
				type:"measurearea"
			},
			{
				type:"namesearch",
				// Optional options, see OpenLSSearchCombo.js
				options:{
					xtype:'hr_openlssearchcombo',
					id:"pdoksearchcombo",
					width:320,
					listWidth:400,
					minChars:4,
					queryDelay:240,
					zoom:11,
					emptyText:__('Zoek een adres met de BAG Geocodeerservice'),
					tooltip:__('Zoek een adres met de BAG Geocodeerservice'),
					url:'http://geodata.nationaalgeoregister.nl/geocoder/Geocoder?max=5'
				}
			}
		];
	}
};
