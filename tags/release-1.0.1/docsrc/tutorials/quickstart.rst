==================
 Heron QuickStart
==================

Welcome to Heron!  This document is intended to help you get kickstarted.
With Heron, you can have a rich mapping application in minutes.


Download and Go
===============

Heron is built on top of the robust GeoExt and OpenLayers JavaScript mapping
libraries and the rich graphical components of ExtJS.  For convenience the Heron
distribution contains a Python-based webserver, for getting up and running quickly in three steps.

#.  Download the latest Heron version .zip file from the :doc:`downloads page </downloads>`.

#.  Unpack the .zip file. Open a terminal/DOS-window and ``cd``
    to the  top-directory and start the Heron-included
    webserver with ``startheron.sh`` (Unix/Linux/MacOS)  or ``startheron.bat`` (Win*, may also work via double-click).
    If you see any errors you may have to install Python.
    See the readme.txt file in the top-directory how install Python and other dependencies for more
    advanced usage.

#.  Browse the examples at http://localhost:8000/examples

Alternatively, if you already have a running webserver, you may follow these steps after Step 1. download.

#.  Place the unpacked Heron version in a directory that is published by your web
    server. We assume that this is the root of your web
    server, so e.g. Heron.js is at http://localhost/heron-1.0.0/script/Heron.js.
    We will also assume
    that your web page is stored at the root of the web server, e.g.
    http://localhost/quickstart.html.

#.  For the supporting libraries GeoExt, OpenLayers, ExtJS and Proj4js
    we will use hosted versions from http://cdnjs.com,
    but you could also choose to download and install these
    frameworks on your local server. See below for download instructions.

#.  Now you're ready to use Heron in your application!

.. note:: For convenience we also provide hosted versions of Heron, GeoExt, OpenLayers and others on
        http://lib.heron-mc.org but don't count on these for production purposes!


Basic Example
=============

Let's build a simple web page that just embeds a map with interactive
navigation.

#.  Include all 4 required libraries (ExtJS v3, OpenLayers >= 2.12, GeoExt 1.1, Heron) and their CSS in your web page.

    .. code-block:: html
    
	<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/css/ext-all.css"/>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/ext-all.js"></script>

	<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/openlayers/2.12/theme/default/style.css"/>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/openlayers/2.12/OpenLayers.js" type="text/javascript"></script>

	<script src="http://cdnjs.cloudflare.com/ajax/libs/geoext/1.1/script/GeoExt.js" type="text/javascript"></script>

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
	<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/css/ext-all.css"/>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/ext-all.js"></script>
	<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/openlayers/2.12/theme/default/style.css"/>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/openlayers/2.12/OpenLayers.js" type="text/javascript"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/geoext/1.1/script/GeoExt.js" type="text/javascript"></script>
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

The above example used minified, so called *hosted*, versions of GeoExt, OpenLayers and ExtJS from from http://cdnjs.com,
including debug versions. This is the preferred way.

In certain production environments and for debugging you may want to install these libraries on your own server, although
CDNJS also provides debug versions of all libs. Here's where to get them.

#.  Download GeoExt 1.1 or later from http://geoext.org.

#.  Download OpenLayers 2.12 or later from http://openlayers.org.

#.  Download the latest Ext 3.x from `the ExtJS website <http://www.sencha.com/products/extjs3/>`_.
    Direct link to the latest 3.4.1.1 Ext JS version: http://cdn.sencha.com/ext/gpl/ext-3.4.1.1-gpl.zip

.. note:: For production environments, we recommend that
    you use compressed and minified builds of Heron, GeoExt, OpenLayers and ExtJS to
    optimize the download size of your page.  A generic minified build
    containing all of Heron is available from the
    :doc:`downloads page </downloads>`, but advanced users can build their
    own. If you use extensions with GXP, OLEditor and/or PrintPreview, you may use the
    bundled minified `script/Heron-with-ux.js` from the distribution.

Libraries via CDNJS
===================

As can be seen in the examples, more and more JavaScript libraries and their resources like CSS are available via http://cdnjs.com.
Best is to check there first, especially in production cases. A CDN is a Content Delivery Network and in general should
be fast and reliable. We are in the process of moving all libraries, including Heron to CDNJS so check there regularly.
At least ExtJS, OpenLayers, GeoExt and Proj4JS are on CDNJS. We may add Heron to CDNJS as well in the future.


Going Further
=============

From here, there are a wide variety of options available for making
customized, highly interactive mapping applications with Heron.  To
learn more take a look at :doc:`index`, :ref:`examples <examples>` and
:doc:`/lib/index`. In particular you can look at a simple but complete application example
`AppDemo <http://lib.heron-mc.org/heron/latest/examples/appdemo>`_. Use the "Info" panel box to see the config.

We also recommend reading :doc:`../primers/index` to become acquainted with the libraries that
form the foundation of Heron.

