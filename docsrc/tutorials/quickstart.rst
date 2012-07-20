===================
 Heron QuickStart
===================

Welcome to Heron!  This document is intended to help you get started
with.  With Heron, you can start from nothing and have a rich
mapping application in seconds.


Getting Heron
==============

Heron is built on top of the robust GeoExt and OpenLayers JavaScript mapping
libraries and the rich graphical components of ExtJS.  Preparing
Heron for use on your own web pages is a multi-step process:

#.  Download Heron from the :doc:`downloads page </downloads>`. For the purposes
    of this quickstart, the development version will be fine.

#.  Place the unpacked Heron version in a directory that is published by your web
    server. For this tutorial, we will assume that this is the root of your web
    server, so that Heron.js is at http://localhost/heron/script/Heron.js.
    We will also assume
    that your web page is stored at the root of the web server, e.g.
    http://localhost/quickstart.html.

#.  For GeoExt, OpenLayers and ExtJS we will use hosted versions, but you could also choose to download and install these
    frameworks on your local server. See below for download instructions.

#.  Now you're ready to use Heron in your application!

.. note:: For convenience we provide hosted versions of Heron, GeoExt, OpenLayers and others on
	http://lib.heron-mc.org but don't count on these for production purposes!


Basic Example
=============

Let's build a simple web page that just embeds a map with interactive
navigation.

#.  Include all 4 required libraries (ExtJS v3, OpenLayers >= 2.11, GeoExt 1.0 or 1.1, Heron) and their CSS in your web page.

    .. code-block:: html
    
	<link rel="stylesheet" type="text/css" href="http://extjs.cachefly.net/ext-3.4.0/resources/css/ext-all.css"/>
	<script type="text/javascript" src="http://extjs.cachefly.net/ext-3.4.0/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="http://extjs.cachefly.net/ext-3.4.0/ext-all.js"></script>

	<link rel="stylesheet" type="text/css" href="http://lib.heron-mc.org/openlayers/2.11/theme/default/style.css"/>
	<script src="http://lib.heron-mc.org/openlayers/2.11/OpenLayers.js" type="text/javascript"></script>

	<script src="http://lib.heron-mc.org/geoext/1.1/script/GeoExt.js" type="text/javascript"></script>

	<script src="heron/script/Heron.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="heron/resources/css/default.css"></link>

#.  Define a Heron *layout* through a JavaScript object:

    .. code-block:: html 
    
        <script type="text/javascript">
			Heron.layout = {
				xtype: 'hr_mappanel',
				hropts: {
					layers: [
						new OpenLayers.Layer.WMS( "World Map",
						  "http://tilecache.osgeo.org/wms-c/Basic.py?", {layers: 'basic', format: 'image/png' } )
					]
				}
			};
        </script>

The entire source of your page should look something like:

.. code-block:: html

    <html>
    <head>

    <title>A Basic Heron Page</title>
	<link rel="stylesheet" type="text/css" href="http://extjs.cachefly.net/ext-3.4.0/resources/css/ext-all.css"/>
	<script type="text/javascript" src="http://extjs.cachefly.net/ext-3.4.0/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="http://extjs.cachefly.net/ext-3.4.0/ext-all.js"></script>
	<link rel="stylesheet" type="text/css" href="http://lib.heron-mc.org/openlayers/2.11/theme/default/style.css"/>
	<script src="http://lib.heron-mc.org/openlayers/2.11/OpenLayers.js" type="text/javascript"></script>
	<script src="http://lib.heron-mc.org/geoext/1.1/script/GeoExt.js" type="text/javascript"></script>
	<script src="heron/script/Heron.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="heron/resources/css/default.css"></link>

    <script type="text/javascript">
		Heron.layout = {
			xtype: 'hr_mappanel',
			hropts: {
				layers: [
					new OpenLayers.Layer.WMS( "World Map",
					  "http://tilecache.osgeo.org/wms-c/Basic.py?", {layers: 'basic', format: 'image/png' } )
				]
			}
		};
	</script>
    </head>
    <body>
    </body>
    </html>

And that's it! This example also illustrates the main concept behind Heron: we *declare* an application
by telling it *what* to do through a *configuration*. In a Heron application
the `Heron.layout` is the central configuration JavaScript object that defines which JavaScript components (by `xtype`, e.g. a map panel)  need to be created,
their parameters (e.g. map layers) and how they are wired and layout together to form the application.
The JavaScript components can be ExtJS, GeoExt or Heron components and use the standard ExtJS factory pattern where 'xtype'
denotes a registered class.

From here you may want to explore and study the :ref:`Examples <examples>`.

Getting the Supporting Libs
===========================

The above example used minified, so called *hosted*, versions of GeoExt, OpenLayers and ExtJS. In production
environments and for debugging you will want to install these libraries on your own server. Here's where
to get them.

#.  Download GeoExt 1.1 or later from http://geoext.org.

#.  Download OpenLayers 2.11 or later from http://openlayers.org.

#.  Download the latest Ext 3.x from `the ExtJS website <http://www.sencha.com/products/extjs3/>`_.

.. note:: For production environments, we recommend that
    you use compressed and minified builds of Heron, GeoExt, OpenLayers and ExtJS to
    optimize the download size of your page.  A generic minified build
    containing all of Heron is available from the
    :doc:`downloads page </downloads>`, but advanced users can build their
    own.

Going Further
=============

From here, there are a wide variety of options available for making
customized, highly interactive mapping applications with Heron.  To
learn more take a look at :doc:`index`, :ref:`examples <examples>` and
:doc:`/lib/index`. In particular you can look at a simple but complete application example
`AppDemo <http://lib.heron-mc.org/heron/latest/examples/appdemo>`_. Use the "Info" panel box to see the config.

We also recommend reading :doc:`../primers/index` to become acquainted with the libraries that
form the foundation of Heron.

