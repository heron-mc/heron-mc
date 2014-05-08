============
Heron Primer
============

This document explains the core concepts behind the Heron Mapping Client.
We recommend to first read :doc:`../tutorials/quickstart` to become acquainted with
the basics. Also check the  :doc:`../examples` and
`dive into the examples' code <http://code.google.com/p/geoext-viewer/source/browse/#svn%2Ftrunk%2Fheron%2Fexamples>`_.

What, Not How
=============

The central concept behind Heron is that we create a full, browser-based web mapping application
by telling it *what* to do, not *how* to do it. By specifying a *configuration* we tell Heron
which components (like map panels, toolbars, layer trees etc) to create, what they should look like (colors, width, height etc)
and what their layout should be (e.g. absolute or accordion).

We found that this concept, creating an app through a configuration, has a natural fit with browser-based web mapping applications
built with GeoExt/ExtJS:

#. GIS applications often require standard widgets like map panels, toolbars, layer trees that may only differ in specific settings
   like the specific layers, colors etc. We just tell which components we need without explicitly creating them.
#. ExtJS (and GeoExt) uses a powerful `Builder Pattern <http://en.wikipedia.org/wiki/Builder_pattern>`_ based on declaring (widget) components
   and any child widgets to be implicitly and recursively constructed and initialized by specifying a shorthand string called `xtype` with
   a set of component-specific properties.
#. Graphical User Interfaces (GUIs) are often layout and wired as a top-down tree
   following the `Composite Pattern <http://en.wikipedia.org/wiki/Composite_pattern>`_. Objects in JavaScript
   and JSON objects, allow specifying composite structures naturally with the added plus that additional behaviour
   (think of handler functions) can also be specified within the same JavaScript syntax.

Concluding, in Heron the configuration is the app and the app is the configuration.

.. note:: This programming style reminds somewhat of `Declarative Programming <http://en.wikipedia.org/wiki/Declarative_programming>`_,
	where we specify *what the program should accomplish, rather than describing how to go about accomplishing it*.
	Basically, HTML and CSS can be considered as declarative programming languages. There are also similarities with the technique of `Inversion of Control <http://en.wikipedia.org/wiki/Inversion_of_control>`_ and `Dependency Injection <http://en.wikipedia.org/wiki/Dependency_injection>`_, like found in the `Java Spring framework <http://www.springsource.org>`_.

This is not to say that with Heron you cannot do any programming and are bound to predefined components.
There are enough hooks in Heron (better to say: in ExtJS) to define your own components and/or
in special cases build Heron apps through explicit programming.

Not an Island
=============

One of the issues with web mapping applications is that these are not just about "showing a map".
More than often the web mapping components are part of a complete web application or (geo)portal.
Map widgets and "ordinary GUI widgets" need to be combined and integrated, just as the data behind them.
By building on GeoExt/ExtJS this can already be achieved, but we have also provided some high-level components
like the :doc:`../lib/Heron/jst/widgets/MenuPanel` in order that you can create a complete "geoportal" with dynamic content
with just a Heron configuration. See also the geoportal example within the :doc:`../examples`.


Configuration Concepts
======================

So how do we configure a Heron app ? The basics are explained here. If you are already familiar
with GeoExt and ExtJS you will grasp this even more quickly as the standard component
properties of these frameworks are used as well. Let's take it step-by-step.

The Layout Tree
---------------

A Heron configuration should have a skeleton as depicted below. This could be within a JavaScript
block in `index.html` or better as a JavaScript include like a file `Config.js`.

.. code-block:: html

    Ext.namespace("Heron");

    Heron.layout = {
        xtype: ...,
        layout: ...,
 		 .
		 .
        items: [
            {
                xtype: ...,
       	        layout: ...,
		          .
		          .
                items: [
					{
                       xtype: ...,
                         .
                         .
			        }
			    ]
		    }
		]
	};

At the top we declare the namespace "Heron" using the standard ExtJS convention.
Basically this defines a global JS object called Heron if not already defined.
Within this object we define the entire application through components (mostly widgets) and their properties.
Each component is defined by an `xtype` property, a shorthand notation for a specific ExtJS class or extended class
that is to be instantiated by ExtJS.

The layout follows a tree-like composite pattern: components can have child components
through an array of `items` where each item has an `xtype` etc. The `layout` defines
how the child components are layout within the parent component, e.g. as an accordion, a border layout
or absolute. `xtype`, `layout` and `items` are all ExtJS-specific GUI component properties
and found within the ExtJS documentation.
The leaf-components don't have a layout property as they have no child-items.

The `xtype` can have four possible value ranges each denoting a source framework:

#. ExtJS components like `panel`, `window` etc,
#. GeoExt components. xtype values values start with `gx_`, like `gx_mappanel`
#. Heron components. xtype values start with `hr_` like `hr_layertreepanel`
#. Your own components ! Using the standard ExtJS xtype convention you can plug in your own custom components

.. note:: The ExtJS component xtypes are hard to find within ExtJS documentation. With googling
   you may find `xtype lists as here <http://www.delphifaq.com/faq/javascript/extjs/f3555.shtml>`_.

Which Properties ?
------------------

The overall layout of a Heron app is thus defined by its `xtypes`, the `layout` and `items` ExtJS properties.
But each component may also have its own properties. For example the Heron LayerTreePanel is derived (extends from) an ExtJS
TreePanel, which itself is derived from an ExtJS Panel. As we did not want to redo the entire ExtJS (and GeoExt)
properties convention and documentation, a simple convention is in place here:

#. components derived (extended) from ExtjS or GeoExt components have the standard properties defined for those components
#. properties specific to the Heron component are named `hropts`

See the example below.

.. code-block:: html

	Heron.layout = {
		xtype: 'hr_mappanel',
		renderTo: 'mapdiv',
		height: 400,
		width: 600,

		/* More optional ExtJS Panel properties here, see ExtJS API docs */

		/** Below are Heron-specific settings for the Heron MapPanel (xtype: 'hr_mappanel') */
		hropts: {
			layers: [
				new OpenLayers.Layer.WMS( "World Map",
				  "http://tilecache.osgeo.org/wms-c/Basic.py?", {layers: 'basic', format: 'image/png' } )
			]
		}
	};

The Heron-specific properties should be documented in the :doc:`../lib/index`.

Fill, Embed or Float
--------------------

The default and most often used Heron layout is to fill the browser window with the
top level (often `Panel`) component from a `Heron.layout` as seen in most examples. Underneath
this uses an ExtJS `ViewPort` panel, a `Panel` that fills the body page element.

But there are two other main "modes" through which we can structure a Heron app:

#. *Embed* - by specifying a `renderTo` property with the value of a page div for a top level (Panel) component we can embed a Heron app within any <div> component within a web page

    .. code-block:: html

	Heron.layout = {
		xtype: 'hr_mappanel',
		renderTo: 'mapdiv',  // your HTML page should have a div with this id
		height: 400,
		width: 600,

		/** Below are Heron-specific settings for the Heron MapPanel (xtype: 'hr_mappanel') */
		hropts: {
			layers: [
				new OpenLayers.Layer.WMS( "World Map",
				  "http://tilecache.osgeo.org/wms-c/Basic.py?", {layers: 'basic', format: 'image/png' } )
			]
		}
	};

#. *Float* - we can define the top level component to be an ExtJS Window, such that we can embed the Heron app within a floating window on top of any page content
    .. code-block:: html

	Heron.layout = {
		xtype: 'window',
		title: "Hello Heron",
		height: 280,
		width: 450,
		layout: "fit",
		closeAction: "hide",

		/** Below are Heron-specific settings for the Heron MapPanel (xtype: 'hr_mappanel') */
		items: [
			{
				xtype: "gx_mappanel",
				layers: [new OpenLayers.Layer.WMS("World Map",
						"http://tilecache.osgeo.org/wms-c/Basic.py?", {layers: 'basic', format: 'image/png' })],
				zoom: 1
			}
		]
	};


In some cases where you want explicit control over the application instantation and lifecycle you can
always revert to explicit programming by creating a Heron app with a layout config explicitly.  See the example below
where we instantiate a Heron app when a Button is pressed.

.. code-block:: html

	Heron.layout = {
		xtype: 'hr_mappanel',
		renderTo: 'mapdiv',
		height: 400,
		width: 600,

		/** Below are Heron-specific settings for the Heron MapPanel (xtype: 'hr_mappanel') */
		hropts: {
			layers: [
				new OpenLayers.Layer.WMS("World Map",
						"http://tilecache.osgeo.org/wms-c/Basic.py?", {layers: 'basic', format: 'image/png' })
			]
		}
	};

	/** Our control code: a button that explicitly creates and shows the heron app. */
	Ext.onReady(function() {
		var button = new Ext.Button({
			text: "Launch Heron App !",
			handler: function() {
				Heron.App.create();
				Heron.App.show();
			 }
		});
		var container = Ext.Element.get('buttondiv');
		container.setHeight(35, {callback: function() {button.render(container)}});
	});

Note that the JS file `NoLaunch.js <http://lib.heron-mc.org/heron/latest/lib/NoLaunch.js>`_ needs to be included first
to suppress autolaunching.

Structuring Your Config
-----------------------

Having one big `Heron.layout` tree may be complex and error-prone to maintain.
As we are dealing with a standard JavaScript object, you can structure
your `Heron.layout` by defining complex/large objects such as map layer arrays as
separate objects and include them in the `Heron.layout` by reference.

By seperating layout-specific objects and content-specific object into separate JS files
you can for example create a kind of "viewer template", to be reused with different specific content.

In fact most of the examples use this pattern by using either the
`DefaultConfig.js <http://lib.heron-mc.org/heron/latest/examples/DefaultConfig.js>`_ and/or
`DefaultOptionsWorld.js <http://lib.heron-mc.org/heron/latest/examples/DefaultOptionsWorld.js>`_.
Now we can use this same basic layout with Dutch (NL) projection and layers by using
`DefaultOptionsNL.js <http://lib.heron-mc.org/heron/latest/examples/DefaultOptionsNL.js>`_.

In particular you can look at a simple but complete application example
`AppDemo <http://lib.heron-mc.org/heron/latest/examples/appdemo>`_. Use the "Info" panel box to see the config.

What to Include
---------------

When using Heron JavaScript files in your app, the most optimal is to use the minified version found under
`script/Heron.js`. The CSS file you need to include is `resources/css/default.css`, unless you need to override CSS.

A basic HTML header using hosted versions, mainly from http://cdnjs.com of all libs could be

.. code-block:: html

	<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/resources/css/ext-all.css"/>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/adapter/ext/ext-base.js"></script>
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/extjs/3.4.1-1/ext-all.js"></script>

	<link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/openlayers/2.12/theme/default/style.css"/>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/openlayers/2.12/OpenLayers.js" type="text/javascript"></script>

	<script src="http://cdnjs.cloudflare.com/ajax/libs/geoext/1.1/script/GeoExt.js" type="text/javascript"></script>

	<script src="http://lib.heron-mc.org/heron/latest/script/Heron.js" type="text/javascript"></script>
	<link rel="stylesheet" type="text/css" href="http://lib.heron-mc.org/heron/latest/resources/css/default.css"></link>

For debugging you can include a Heron script, the DynLoader, that dynamically loads the required JS files as follows:

.. code-block:: html

          .
          .
    <script src="http://lib.heron-mc.org/heron/latest/lib/DynLoader.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="http://lib.heron-mc.org/heron/latest/resources/css/default.css"></link>

Some advanced functions will need additional JavaScript libraries like Proj4js, GXP and OLEditor.
See the examples to see what is needed.

Internationalization - i18n
---------------------------

Heron has basic support for Internationalization (i18n), for simple strings like
labels. See the module i18n.

The i18n support works as follows:

#. The `i18n module <http://lib.heron-mc.org/heron/latest/lib/i18n>`_ contains string definitions (translation tags).
   Heron translation tags are written in English in a form like __('This is a tag that can be translated'). The i18n
   module can searh i18n dictionaries for translation. If no dictionary is included and/or no translation is found, 
   the tag itself is shown. This is why human readable tags are used.
   
   Currently, the following languages are supported:

       Czech:        i18n/cs_CZ.js
       Danish:       i18n/da_DK.js
       Dutch:        i18n/nl_NL.js
       English (US): i18n/en_US.js
       French:       i18n/fr_FR.js
       German:       i18n/de_DE.js
       Italian:      i18n/it_IT.js
       Spanish:      i18n/es_ES.js

   If you want your locale supported, please use en_US as the template and prime your own. If you want your localization
   implemented in Heron, contact us and we can add it to the project.

#. When defining a label or text somewhere in your config or code use the shortcut `__(labelname)` like in

    .. code-block:: html

    	title : __('Layers'),

To overrule for the default (f.i. with the Dutch nl_NL locale), place a include to the translation before loading Heron.

.. code-block:: html

    <script type="text/javascript" src="http://lib.heron-mc.org/heron/latest/lib/i18n/nl_NL.js"></script>
	<script type="text/javascript" src="http://lib.heron-mc.org/heron/latest/script/Heron.js"></script>
	
			.
			.

To Be Continued
---------------

This document is not yet ready and needs to be finalized.....
