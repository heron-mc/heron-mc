.. Sphinx 0.6.2 will support the 'title' directive.  See
    http://bitbucket.org/birkenfeld/sphinx/changeset/036f2d008240/


Web Mapping Made Easy
=====================

The Heron Mapping Client (MC) facilitates the creation of browser-based web mapping applications
with the `GeoExt <http://geoext.org>`_  JavaScript toolkit.
 
`GeoExt <http://geoext.org>`_ is a powerful toolkit that combines
the web mapping library `OpenLayers <http://openlayers.org>`_ with the user interface savvy of `Ext JS
<http://www.sencha.com/products/js/>`_ to help build powerful desktop style GIS apps on
the web with JavaScript. The Heron MC leverages these frameworks by providing high-level components
and a convention to quickly assemble applications merely through configuration ("Look ma no programming").

Using Heron
------------

See Heron in action.

.. cssclass:: execute

.. code-block:: javascript

	Heron.layout = {
	   xtype: 'window',
	   title: "Hello Heron",
	   height: 280, width: 450,

	   items: [
	    {
	       xtype: "gx_mappanel",
	       layers: [new OpenLayers.Layer.WMS("Global Imagery",
					"http://maps.opengeo.org/geowebcache/service/wms",
            		{layers: "bluemarble"})],
	       zoom: 1
	    }
	   ]
	};

This is a minimal Heron application. You can see that this app
is completely defined through a configuration object starting with `Heron.layout`.
Learn more about using Heron in your application by reading the
:doc:`documentation <docs>`.


Heron is Free Source
--------------------

Heron is available under the `GNU GPL v3 license <http://www.gnu.org/licenses/gpl.html>`_.


.. toctree::
    :hidden:

    docs
    tutorials/index
    primers/index
    examples
    developer/index
    lib/index
    downloads
