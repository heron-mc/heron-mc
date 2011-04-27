/**
 * Defines the entire layout of the webapp using ExtJS-style.
 *
 * The layout specifies a hierarchy of ExtJS (Panel) components.
 * Each component is either a container of components (type: 'gv-container')
 * or a specific leaf component like a map panel (type: 'gv-map') or simple HTML
 * panel (type: 'gv-html'). Each component has a 'type' string and an 'options' object.
 * The 'type' defines the basic type and the 'options' the component-specific options.
 * For a container-type the options should include a 'layout' (like 'border' or 'card',
 * and an array of 'items' with each element being a component (container or leaf component).
 *
 * TODO use true ExtJS config style using 'xtype' and global registry of user-defined components
 **/

GeoViewer.layout = {
	type: 'gv-container',
	options : {
		id: 'gv-container-main',
		layout: 'border',
		renderTo : 'gv-mainpanel',
		width: '100%',
		height: '100%',
		forceLayout: true,
		bodyBorder: false,
		border: false,

		items :  [
			{
				type: 'gv-container',
				options : {
					id: 'gv-container-north',
					region: 'north',
					layout: 'border',
					width: '100%',
					height: 80,
					bodyBorder: false,
					border: false,
					items :  [
						{
							type: 'gv-html',
							options: {
								id: 'gv-logo-panel',
								region: 'center',
								bodyBorder: false,
								border: false,
								url: 'north-logo.html',
								height: 55
							}
						},
						{
							type: 'gv-menu',
							options: {
								id: 'gv-menu-panel',
								region: 'south',
								bodyBorder: false,
								border: false,
								height: 32,
								items: [
									GeoViewer.site.menuBar
								]
							}
						}
					]
				}
			},
			{
				type: 'gv-container',
				options : {
					id: 'gv-container-center',
					region: 'center',
					layout: 'card',
					border: false,
					header: false,
					activeItem: 'gv-content-main',
					width: '100%',

					items :  [
						{
							type: 'gv-html',
							options: {
								id: 'gv-content-main',
								html: '<div class="gv-html-panel-body">Dit is gv-content-main</div>',
								layout: 'fit',
								autoScroll: true,
								height: '100%',
								width: '100%',
								preventBodyReset: true,
								bodyBorder: false,
								border: false
							}
						},
						{
							type: 'gv-container',
							options: {
								id: 'gv-geo-main',
								layout: 'border',
								width: '100%',
								border: false,
								items: [
									{
										type: 'gv-container',
										options : {
											id: 'gv-menu-left-container',
											layout: 'accordion',
											region : "west",
											width: 240,
											collapsible: true,
											split	: true,
											border: false,
											items: [
												{
													type: 'gv-layer-browser'
												},

												{
													type: 'gv-html',
													options: {
														id: 'gv-info-west',
														html: '<div class="gv-html-panel-body"><p>Dit is de GeoViewer van Het Kadaster GEORZ Lab.' +
																'</p><br/><p>Deze viewer en in feite de gehele website is gemaakt met het Open Source' +
																' project <a href="http://code.google.com/p/geoext-viewer/" target="_new" >GeoExt Viewer</a>' +
																', o.a. in samenwerking met <a href="http://www.geodan.nl" target="_new">Geodan</a>. Deze op ' +
																'<a href="http://geoext.org">GeoExt</a>-gebaseerde Viewer is zeer flexibel en uitbreidbaar ' +
																'zodat deze gemakkelijk in meerdere projecten kan worden ingezet. Zie als voorbeeld ook de ' +
																'<a href="http://inspire.kademo.nl" target="_new">GeoViewer voor Kademo INSPIRE</a>.</p><br/></div>',
														preventBodyReset: true,
														title: 'Info'
													}
												},
												{
													type: 'gv-context-browser'
												},
												{
													type: 'gv-layer-legend'
												}
											]
										}

									},
									{
										type: 'gv-container',
										options : {
											id: 'gv-map-and-info-container',
											layout: 'border',
											region: 'center',
											width: '100%',
											collapsible: false,
											split	: true,
											border: false,
											items: [
												{
													type: 'gv-map',
													options: {
														id: 'gv-map',
														region: 'center',
														collapsible : false,
														border: false
													}
												},
												{
													type: 'gv-feature-info',
													options: {
														id: 'gv-feature-info',
														region: "south",
														border: true,
														collapsible: true,
														collapsed: true,
														height: 205,
														split: true,
														maxFeatures: 10
													}
												}
											]
										}
									}
								]
							}
						}
					]
				}
			}
		]
	}
};