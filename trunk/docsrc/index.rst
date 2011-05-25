.. Sphinx 0.6.2 will support the 'title' directive.  See
    http://bitbucket.org/birkenfeld/sphinx/changeset/036f2d008240/


Web Mapping Made Easy
=====================

The Heron Mapping Client (MC) facilitates the creation of web mapping applications
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
		xtype: 'hr_mappanel',
		renderTo: 'mapdiv',
		height: 400,
		width: 600,
		hropts: {
			layers: [
				new OpenLayers.Layer.WMS( "World Map",
				  "http://tilecache.osgeo.org/wms-c/Basic.py?", {layers: 'basic', format: 'image/png' } )
			]
		}
	};


This is the most minimal Heron application. You can see that the app
is completely defined through the configuration starting with `Heron.layout`.
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
