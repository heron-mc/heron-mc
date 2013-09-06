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

#.  Hosted versions of external libs GeoExt, ExtJS and OpenLayers is via http://cdnjs.com

#.  Run Heron examples


Server Components
=================

Heron is a client-only library mainly supported by a server-backend of OGC standard webservices (WMS, WFS) etc.
In the future CSW and WPS will be added. No Heron-specific back-end components are required except for
two small CGI scripts. This also depends on which widgets and web services your app uses. For example
for pure WMS and tiling, no back-ends are required. Only Vector-info based services require the CGI scripts
described next. Printing requires a MapFish print server.

AJAX Proxy
----------

WMS GetFeatureInfo and WFS use AJAX calls. When using server domains other then the one your Heron App is hosted from
you need "A Proxy". This is sometimes a misty subject. This is not specific to Heron but data on the web in genereal.
OpenLayers is catered for proxied services but we need:

#. a proxy script
#. install the proxy on your webserver
#. configure the proxy in your Heron config

Ad 1) See an example Proxy script here
http://geoext-viewer.googlecode.com/svn/trunk/heron/services/proxy.cgi
You need to adapt it for the hosts you are allowing. Don't allow an open proxy!!

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

The proxy protocol is just a convention. You may have your own implementation in PHP, Java Servlet/JSP or other.

Up/download/transformation Services
-----------------------------------

The `heron.cgi` script is used for advanced services dealing with enforcing
download (e.g. from FeatureInfoPanel and Editor) and upload (Editor)
to/from local files and some conversion services, for example to allow ESRI Shapefile upload as a .zip file.

The script: http://geoext-viewer.googlecode.com/svn/trunk/heron/services/heron.cgi

The script URL is pre-configured with default in Heron `App.js` but can be overridden in your config ::

      /** REST Services specific to Heron. */
      Heron.globals = {
	  serviceUrl: '/cgi-bin/heron.cgi',

Note: in time more "geoprocessing" remote services will be moved to use WPS.

Advanced: Printing
------------------

Heron can use the MapFish Print server module (deployed as a Java .war).
See http://www.mapfish.org for details. This is a whole subject by itself. Try to build/install
the latest MapFish Print version from GitHub, usually not the one bundled with e.g. GeoServer.

Heron with GeoExt components take care to follow the print protocol. If you need nice examples of YAML files
(Mapfish config files to specify print layouts), see here: http://kademo.nl/print (YAML config).


Documentation
=============

For Heron the site http://heron-mc.org is the main documentation site.

These reference docs are tended to be used the most:

- Heron: http://heron-mc.org/lib/index.html
- GeoExt: http://geoext.org/lib/index.html
- OpenLayers: http://dev.openlayers.org/docs/files/OpenLayers-js.html
- ExtJS (not 4.0!): http://docs.sencha.com/ext-js/3-4/#!/api

Heron Configuration Concepts
============================

Heron's main asset is to build a single-page web app through configuration. This configuration specifies mainly two
things:

- the overall (ExtJS) layout of the components (Panels) in the app's webpage
- the components/widgets (xtype's) and their properties within the layout

The configuration is build as a single JavaScript (JSON) hierarchical structure. The top-level variable should be called
`Heron.layout`. See this most minimal config (example: `minimal`) with a default layout ::

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


There is sometimes some confusion around file names like Config.js/Layout.js and Options.js . `The filenames don't
matter`! It is just a convenience to split up a complex config and to reuse more or less static
parts like an overall layout. This is also true for `Heron.options.` or `Heron.*.scratch.` names.

The config structure follows ExtJS conventions:

- component types are defined via their `xtype` (ExtJS connvention)
- general component properties follow below the `xtype` property
- `xtypes` starting with `hr_` denote Heron components
- `xtypes` starting with `gx_` denote GeoExt components
- all other `xtypes` are ExtJS base components
- properties may be specific for an ExtJS, GeoExt or Heron-component, dependent where the component is defined
- Heron-specific properties are `hropts` structure (though this will be phased out in the future)

Layouts are documented in ExtJS docs. The specific components are each documented in the ExtJS, GeoExt or
Heron reference docs (see above).

Study the example AppDemo: http://lib.heron-mc.org/heron/latest/examples/appdemo with the Layout.js
http://lib.heron-mc.org/heron/latest/examples/appdemo/Layout.js and its Options.js
http://lib.heron-mc.org/heron/latest/examples/appdemo/Options.js.

Like said the distinction between Layout and Options JS files is just a convention. Often
one needs a single layout with different options like Layers, specific Buttons and Search panels etc.
Then it is easier to maintain a single Layout.js (or Config.js) which hardly changes and multiple Options.js
for specific apps. In fact all Heron examples are structured this way. There is one DefaultConfig.js :

http://lib.heron-mc.org/heron/latest/examples/DefaultConfig.js and specific Options files for World (WGS84) specific
examples http://lib.heron-mc.org/heron/latest/examples/DefaultOptionsWorld.js and Dutch projection/Layers examples
http://lib.heron-mc.org/heron/latest/examples/DefaultOptionsNL.js. Also in some examples these files are overridden.

If you are building multiple Heron Apps within your organisation, it is wise to make your own config convention.

How Heron Works
===============

Understanding a framework === understanding its bootstrap ("follow the main()").

This is also true for Heron. The default "main" for Heron is in `Launcher.js`  ::

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

`Ext.onReady()` is called by ExtJS when all JS files have loaded and ExtJS is ready to start. This is the standard
ExtJS-way to bootstrap any ExtJS App. (btw You are not obliged to use Heron via config, you may also program with Heron
like with ExtJS and GeoExt via `Heron.noAutoLaunch` disabling the Heron init via a config.).

Heron is started by calling `Heron.App.create()` and `Heron.App.show()`.
Ok and what about `Heron.App.*` ? See App.js ::

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

What happens here is that `Heron.App.create()` will use your `Heron.layout` object to
create a full widget tree with all your configured components. Next the entire app becomes visible by
`Heron.App.show()` that calls `show()` on the top-component usually a Panel. ExtJS will percolate
`show()` to all components in the tree. That is all!

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
		<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/css/ext-all.css"/>
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
