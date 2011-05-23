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
Ext.namespace("Heron.geoportal");

/**
 * Describes the menu layout and links to content items.
 * This config object is included in the Layout config below.
 *
 */
Heron.geoportal.menuItems = [
	{
		id: 'gv-menu-bar',
		xtype: 'toolbar',
		floating: false,
		items:[
			{
				xtype: 'tbspacer',
				width: 240
			},
			{
				xtype: 'tbbutton',
				text: 'Map',
				card: 'gv-geo-main',
				handler: Heron.MenuHandler.onSelect
			},
			{
				xtype: 'tbspacer'
			},
			{
				xtype: 'tbbutton',
				text: 'Projects',
				menu: [
					{
						text: 'INSPIRE',
						card: 'gv-content-main',
						page: 'inspire',
						handler: Heron.MenuHandler.onSelect
					},
					{
						text: 'GEORZ Lab',
						card: 'gv-content-main',
						page: 'georzlab',
						handler: Heron.MenuHandler.onSelect
					},
					{
						text: 'iFramed Content',
						card: 'gv-content-main',
						page: 'iframed',
						handler: Heron.MenuHandler.onSelect
					},
					{
						text: 'Shibboleth'
					},
					{
						text: 'Klic Online Mobile'
					}
				]
			},
			{
				xtype: 'tbspacer'
			},
			{
				xtype: 'tbbutton',
				text: 'Help',
				menu: [
					{
						text: 'Item One'
					},
					{
						text: 'Item Two'
					},
					{
						text: 'Item Three'
					}
				]
			}
		]
	}
];

/** Map contexts: will be embedded as hropts below. */
Heron.geoportal.contexts = [
	{
		id: 'klic',
		name: 'KLIC Voorbeeld',
		desc: 'een voorbeeld van een KLIC',
		layers: ['OpenStreetMap', 'KLIC1-GBKN', 'KLIC1-KPN'],
		x: 253922,
		y: 574468,
		zoom: 11
	},
	{
		id: 'debrug',
		name: 'Kadaster - De Brug',
		desc: 'een voorbeeld van een Place2',
		layers: ['Luchtfoto (NLR)'],
		x: 194194,
		y: 465873,
		zoom: 10
	}
];

/**
 * Defines the entire layout of the webapp using ExtJS-style.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) components.
 * Each component is either a container of components (xtype: 'panel', i.e. an ExtJS Panel)
 * or a specific leaf component like a map panel (xtype: 'gv_mappanel') or simple HTML
 * panel (xtype: 'gv_htmlpanel'). Each component has a 'xtype' string and component-specific options.
 * The 'xtype' defines the component widget class .
 * For a container-type (xtype: 'panel') the options should include a 'layout' (like 'border' or 'card',
 * and an array of 'items' with each element being a component (another container or a leaf widget component).
 *
 * In order to distinguish ExtJS-specific config options from those that are Heron-specific,
 * the later are prefixed with "hr".
 *
 * Specific config options for ExtJS components can be found in the API docs:
 * http://dev.sencha.com/deploy/ext-3.3.1/docs
 *
 **/
Heron.layout = {
	/** Top Panel: fills entire browser window. */
	xtype: 'panel',
	id: 'gv-container-main',
	layout: 'border',

	items :  [
		{
			/** North container: fixed banner plus Menu. */
			xtype: 'panel',
			id: 'gv-container-north',
			region: 'north',
			layout: 'border',
			width: '100%',
			height: 80,
			bodyBorder: false,
			border: false,
			items :  [
				{
					xtype: 'gv_htmlpanel',
					id: 'gv-logo-panel',
					region: 'center',
					bodyBorder: false,
					border: false,
					autoLoad: {
						url: 'resources/north-logo.html'
					},
					height: 55

				},
				{
					xtype: 'gv_menupanel',
					id: 'gv-menu-panel',
					region: 'south',
					bodyBorder: false,
					border: false,
					height: 32,
					/** Menu options, see widgets/MenuPanel */
					hropts: {
						pageRoot: 'content/',
						cardContainer: 'gv-container-center',
						pageContainer: 'gv-content-main',
						defaultCard: 'gv-content-main',
						defaultPage: 'inspire'
					},
					/** See above for the items. */
					items: Heron.geoportal.menuItems
				}
			]
		},
		{
			/**
			 * Content area: either map + navigation or plain (HTML) content driven by Menu.
			 * An ExtJS Card Layout is used to swap between Map view and HTML content views.
			 **/
			xtype: 'panel',
			id: 'gv-container-center',
			region: 'center',
			layout: 'card',
			border: false,
			header: false,
			activeItem: 'gv-content-main',
			width: '100%',

			items :  [
				{
					/** HTML content area in which HTML fragments from content/ dir are placed. */
					xtype: 'gv_htmlpanel',
					id: 'gv-content-main',
					layout: 'fit',
					autoScroll: true,
					height: '100%',
					width: '100%',
					preventBodyReset: true,
					bodyBorder: false,
					border: false
				},
				{
					/** "Geo" content area, i.e. the Map and the Accordion widgets on the left. */
					xtype: 'panel',
					id: 'gv-geo-main',
					layout: 'border',
					width: '100%',
					border: false,
					items: [
						{
							/** "Geo" navigation area, i.e. the left widgets in Accordion layout. */
							xtype: 'panel',
							id: 'gv-geo-left-container',
							layout: 'accordion',
							region : "west",
							width: 240,
							collapsible: true,
							split	: true,
							border: false,
							items: [
								{
									xtype: 'gv_layertreepanel'
								},
								{
									xtype: 'gv_htmlpanel',
									id: 'gv-info-west',
									html: '<div class="gv-html-panel-body"><p>Dit is de Heron Mapping Client.' +
											'</p><br/><p>Deze viewer en in feite de gehele website is gemaakt met het Open Source' +
											' project <a href="http://code.google.com/p/geoext-viewer/" target="_new" >GeoExt Viewer</a>' +
											', o.a. in samenwerking met <a href="http://www.geodan.nl" target="_new">Geodan</a>. Deze op ' +
											'<a href="http://geoext.org">GeoExt</a>-gebaseerde Viewer is zeer flexibel en uitbreidbaar ' +
											'zodat deze gemakkelijk in meerdere projecten kan worden ingezet. Zie als voorbeeld ook de ' +
											'<a href="http://inspire.kademo.nl" target="_new">Heron voor Kademo INSPIRE</a>.</p><br/></div>',
									preventBodyReset: true,
									title: 'Info'
								},
								{
									xtype: 'gv_contextbrowserpanel',
									/** See above. */
									hropts: Heron.geoportal.contexts
								},
								{
									xtype: 'gv_layerlegendpanel'
								}
							]
						},
						{
							/** Map and Feature Info panel area. */
							xtype: 'panel',
							id: 'gv-map-and-info-container',
							layout: 'border',
							region: 'center',
							width: '100%',
							collapsible: false,
							split	: true,
							border: false,
							items: [
								{
									xtype: 'gv_mappanel',
									id: 'gv-map',
									region: 'center',
									collapsible : false,
									border: false,
									hropts: Heron.options.map
								},
								{
									xtype: 'gv_featureinfopanel',
									id: 'gv-feature-info',
									region: "south",
									border: true,
									collapsible: true,
									collapsed: true,
									height: 205,
									split: true,
									maxFeatures: 10
								}
							]
						}
					]
				}
			]
		}
	]
};
