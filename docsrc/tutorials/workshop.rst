==============
Heron Workshop
==============

Below are various notes and subjects from Heron workshops. This follows a hands-on approach.

Intro Slides
============

We start with some high level overview.

See these slides here: http://www.slideshare.net/justb4/the-heron-mapping-client-15675598

Quickstart
==========

Get our hands dirty right away: follow the steps in the :doc:`../tutorials/quickstart`, in short:

#.  Download Heron from the :doc:`downloads page </downloads>`

#.  Install on a local webserver

#.  Hosted versions on http://lib.heron-mc.org of external libs GeoExt, ExtJS and OpenLayers

#.  Run Heron examples


Server Components
=================

Though Heron is a client-only library mainly geared at OGC standard webservices (WMS, WFS) etc) standardized services and without any server-side storage.

But for several reasons
and functions some small server-side scripts are required, also dependent on the widgets in your Heron App.

AJAX Proxy
----------

WMS GetFeatureInfo and WFS use AJAX calls. When using server domains other then the one your Heron App is hosted from
you need "A Proxy". This is sometimes a misty subject.  OpenLayers is catered for proxied services but we need:

#. a proxy script
#. install the proxy on your webserver
#. configure the proxy in your Heron config

Ad 1) See an example script here
http://geoext-viewer.googlecode.com/svn/trunk/heron/services/proxy.cgi

Ad 2) adapt proxy.cgi for your hosts put in dir e.g. `/var/www/heron-mc.org/cgi-bin`. This is server-dependent, e.g. on Apache something like  ::

    ScriptAlias /cgi-bin/ /var/www/heron-mc.org/cgi-bin/
    <Directory "/var/www/heron-mc.org/cgi-bin/">
         AllowOverride None
         Options +ExecCGI -MultiViews +SymLinksIfOwnerMatch
         Order allow,deny
         Allow from all
    </Directory>

Ad 3)  configure in Heron. See examples/DefaultOptionsWorld.js   ::

     OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

Printing
--------

MapFish print module (Java .war). See http://www.mapfish.org

Up/download Services
--------------------

The `heron.cgi` script is used for advanced services dealing with enforcing
download (e.g. from FeatureInfoPanel and Editor) and upload (Editor)
to/from local files.

The script: http://geoext-viewer.googlecode.com/svn/trunk/heron/services/heron.cgi

Pre-configured with default in Heron `App.js` but can be overridden ::

      /** REST Services specific to Heron. */
      Heron.globals = {
	  serviceUrl: '/cgi-bin/heron.cgi',

Documentation
=============

For Heron the site http://heron-mc.org is the main documentation site.

The reference docs are tended to be used the most:

- Heron: http://heron-mc.org/lib/index.html
- GeoExt: http://geoext.org/lib/index.html
- OpenLayers: http://dev.openlayers.org/docs/files/OpenLayers-js.html
- ExtJS (not 4.0!): http://docs.sencha.com/ext-js/3-4/#!/api

Heron Configuration Concepts
============================

Heron's main asset is to build an app through configuration.

The configuration is build as a JavaScript (JSON) hierarchical structure. The to level is
`Heron.layout`. See this most minimal config (example: `minimal`) ::

	Heron.layout = {
		xtype: 'hr_mappanel',

		/* Optional MapPanel ExtJS Panel properties here, see ExtJS API docs */

		/** Below are Heron-specific settings for the MapPanel (xtype: 'hr_mappanel') */
		hropts: {
			layers: [
				new OpenLayers.Layer.WMS( "World Map",
				  "http://www2.demis.nl/WMS/wms.asp?WMS=WorldMap", {layers: 'Coastlines', format: 'image/png' } )
			]
		}
	};


There is sometimes some confusion around file names like Config.js/Layout.js and Options.js . ``The filenames don't
matter``! It is just a convenience to split up a complex config and to reuse more or less static
parts like an overall layout. This is also true for `Heron.options.` or `Heron.*.scratch.` names.

Study the example AppDemo.

How Heron Works
===============

Understanding a framework === understanding its bootstrap ("the main").

This is with Heron. The default "main" is in `Launcher.js`  ::

	/**
	 * Autolaunches Heron as app.
	 * To prevent this and control explicitly include NoLaunch.js before App.js
	 */
	Ext.onReady(function() {

		if (!Heron.noAutoLaunch) {
			Heron.App.create();
			Heron.App.show();
		}
	}, Heron.App);

Ok and what about Heron.App? See App.js ::

	Ext.namespace("Heron.App");
	Heron.App = function() {

		return {
			create : function() {
				Ext.QuickTips.init();

				if (Heron.layout.renderTo || Heron.layout.xtype == 'window') {
					// Render topComponent into a page div element or floating window
					Heron.App.topComponent = Ext.create(Heron.layout);
				} else {
					// Default: render top component into an ExtJS ViewPort (full screen)
					Heron.App.topComponent = new Ext.Viewport({
						id	:"hr-topComponent",
						layout: "fit",
						hideBorders: true,

						// This creates the entire layout from the config !
						items: [Heron.layout]
					});
				}
			},

			show : function() {
				Heron.App.topComponent.show();
			},

			getMap : function() {
				return Heron.App.map;
			},

			setMap : function(aMap) {
				Heron.App.map = aMap;
			},

			getMapPanel : function() {
				return Heron.App.mapPanel;
			},

			setMapPanel : function(aMapPanel) {
				Heron.App.mapPanel = aMapPanel;
			}
		};
	}();

What happens here is that `Heron.App.create()` will use your Heron.layout object to
create a full widget tree with all your configured components. Next the entire app becomes visible by
`Heron.App.show()`. That is all!

Some variants is where you can control auto-launching by including `NoLaunch.js`.

Theming
=======

Basic ExtJS themes can be created using an online ExtJS theme-builder: http://extbuilder.dynalias.com.

To work with Heron and for some tweaks, each theme below will have a corresponding file
"default-theme-<theme name>.css" e.g. default-theme-greenery.css under heron/resources/css.

Making a new theme is two steps:

- create a theme using http://extbuilder.dynalias.com
- put the generated directory with css and images dirs under this dir with the name of the theme
- create a default-theme-<theme name>.css under heron/resources/css, starting with a copy of an existing theme css like default-theme-gray.css

To include a theme in your app, see examples/theming/index.html
Example online: http://lib.heron-mc.org/heron/latest/examples/theming

Example index.html head content.  ::

	<!-- 1) under ext CSS  -->
		<link rel="stylesheet" type="text/css" href="http://lib.heron-mc.org/ext/3.4.1.1/resources/css/ext-all.css"/>
		<link rel="stylesheet" type="text/css" href="....resources/themes/greenery/css/xtheme-greenery.css" media="all" />
		<!--[if IE 6]>
		<link rel="stylesheet" type="text/css" media="all" href="resources/themes/greenery/css/xtheme-greenery_ie6.css" />
		 <![endif]-->
	.
	.
	<!-- 1) under Heron default CSS  -->
		<link rel="stylesheet" type="text/css" href="resources/css/default.css"/>

		<!-- Need to override some Heron-CSS -->
		<link rel="stylesheet" type="text/css" href="resources/css/default-theme-greenery.css"/>
