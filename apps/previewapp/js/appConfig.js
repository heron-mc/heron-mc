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
Ext.namespace("PDOK.config");
Ext.namespace("Heron.widgets");
Ext.namespace("Heron.utils");

OpenLayers.Util.onImageLoadErrorColor = "transparent";
OpenLayers.ProxyHost = "../proxy/proxy.cgi?url=";
//OpenLayers.ProxyHost = "../../proxy/proxy.jsp?";

PDOK.config.appConfiguration = {
	load:function () {
		console.log('Loading application configuration');
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

		Heron.layout = {
			xtype:'panel',

			/* Optional ExtJS Panel properties, see ExtJS API docs. */
			id:'hr-container-main',
			layout:'border',
			border: true,
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
							xtype:'hr_layertreepanel',
							// height: 300,
							id:'hr_treelayer',
							flex:1,
							hropts:Heron.options.layertree/*,
							//TNO
							listeners:{
								expandnode:function (node) {
									PDOK.config.resolution.applyNodeExpanded(node);
								}
							}      */
						},
						{
							xtype:'hr_layerlegendpanel',
							defaultStyleIsFirst:true,
							flex:3,
							id:'legend_panel',
							hropts:{prefetchLegends:false}
						},
						{
							// The TreePanel to be populated from a GetCapabilities request.

							title:'Capabilities',
							xtype:'pdok_capabilitiestreepanel',
							autoScroll:true,
							useArrows:true,
							animate:true,
							hropts:{
								text:''
							}
						},
						{
							xtype:'hr_htmlpanel',
							id:'hr-info-htmlpanel',
							autoLoad: {
								url: 'config/info.html'
							},
							preventBodyReset:true,
							title:'Info',
							height: 100,
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
							xtype:'hr_htmlpanel',
							id:'hr-info-configpanel2',
							region:'north',
							preventBodyReset:true,
							title:Heron.options.map.settings.title,
							width:'100%'
						},
						{
							xtype:'hr_mappanel',
							id:'hr-map',
							region:'center',
							collapsible:false,
							border:false,
							hropts:Heron.options.map
							/*,
							//TNO
							mapListeners:{
								moveend:function () {
									PDOK.config.resolution.applyMoveEnd();
								}
							} */
						},
						{
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

	}
};
