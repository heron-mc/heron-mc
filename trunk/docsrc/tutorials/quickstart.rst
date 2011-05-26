===================
 Heron QuickStart
===================

Welcome to Heron!  This document is intended to help you get started
with.  With Heron, you can start from nothing and have a rich
mapping application in seconds.


Getting Heron
==============

Heron is built on top of the robust GeoExt and OpenLayers JavaScript mapping
libraries and the rich graphical components of ExtJS.  For licensing
reasons, ExtJS cannot be included in the Heron download, so preparing
Heron for use on your own web pages is a multi-step process:

#.  Download Heron from the :doc:`downloads page </downloads>`. For the purposes
    of this quickstart, the development version will be fine.

#.  Place the unpacked Heron version in a directory that is published by your web
    server. For this tutorial, we will assume that this is the root of your web
    server, so that Heron.js is at http://localhost/Heron/script/Heron.js.
    We will also assume
    that your web page is stored at the root of the web server, e.g.
    http://localhost/quickstart.html.

#.  Now you're ready to use Heron in your application!

.. note:: For convenience we provide hosted versions of Heron, GeoExt and OpenLayers on
	http://lib.heron-mc.org but don't count on these for production purposes!


Basic Example
=============

Let's build a simple web page that just embeds a map with interactive
navigation.

#.  Include the ExtJS libraries in your web page.

    .. code-block:: html
    
	<link rel="stylesheet" type="text/css" href="http://extjs.cachefly.net/ext-3.3.1/resources/css/ext-all.css"/>
	<script type="text/javascript" src="http://extjs.cachefly.net/ext-3.3.1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="http://extjs.cachefly.net/ext-3.3.1/ext-all.js"></script>
	<script src="http://lib.heron-mc.org/openlayers/2.10/OpenLayers-min.js" type="text/javascript"></script>
	<script src="http://lib.heron-mc.org/geoext/1.0/GeoExt-min.js" type="text/javascript"></script>
	<script src="Heron/script/Heron.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="Heron/resources/css/default.css"></link>

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

    <title> A Basic Heron Page </title>
	<link rel="stylesheet" type="text/css" href="http://extjs.cachefly.net/ext-3.3.1/resources/css/ext-all.css"/>
	<script type="text/javascript" src="http://extjs.cachefly.net/ext-3.3.1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="http://extjs.cachefly.net/ext-3.3.1/ext-all.js"></script>
	<script src="http://lib.heron-mc.org/openlayers/2.10/OpenLayers-min.js" type="text/javascript"></script>
	<script src="http://lib.heron-mc.org/geoext/1.0/GeoExt-min.js" type="text/javascript"></script>
	<script src="Heron/script/Heron.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="Heron/resources/css/default.css"></link>

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

And that's it! From here you may want to explore and study the :ref:`Examples <examples>`.

Getting the Supporting Libs
===========================

The above example used minified so called *hosted* versions of GeoExt, OpenLayers and ExtJS. In production
environments and for debugging you will want to install these libraries on your own server. Here's where
to get them.

#.  Download GeoExt 1.0 or later from http://geoext.org.

#.  Download OpenLayers 2.10 or later from http://openlayers.org.

#.  Download the latest Ext 3.x from `the ExtJS website <http://www.sencha.com/learn/Ext_Version_Archives>`_.

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
:doc:`/lib/index`.

We also recommend reading :doc:`../primers/index` to become acquainted with the libraries that
form the foundation of Heron.

