===============================================
Setting up heron.cgi under Windows using Apache
===============================================

This document explains how to get heron.cgi running under Windows and the Apache webserver.

Install ogr/gdal
================
``heron.cgi`` makes use of the ogr/gdal libraries. These are most easily installed using the OSGeo4W network installer. Probably you'll need the 64 bit version.

Configure Apache
================

Edit your Apache config file using your favourite text editor (it might be wise to backup the file first). Most
probably you'll find that this file is something like: 

``C:\Program Files (x86)\Apache Software Foundation\Apache2.2\conf\httpd.conf``

script-alias
------------

If not already done you need to set the ``ScriptAlias`` directive to the folder where your cgi programs are located. Eg:

``ScriptAlias /cgi-bin/ "D:/Services/htdocs/cgi-bin/"``

Be sure to have heron.cgi in this folder! (Most probably you'll want your ``proxy.cgi`` which also comes with Heron-mc there as well.)

ogr/gdal
--------
For ``heron.cgi`` being able to find the ogr/gdal libraries you'll need to set some environmental parameters:

``SetEnv GDAL_DATA "C:\OSGeo4W64/share/gdal"``

``SetEnv GDAL_DRIVER_PATH "C:\OSGeo4W64/bin/gdalplugins"``

Be sure to point these paths to the right folders which were created during ogr/gdal installation.

Configure heron.cgi
===================
To configure ``heron.cgi`` you need to edit ``heron.cgi`` using your favourite text editor. Of course you'll find ``heron.cgi`` in the folder you have configured using the ``ScriptAlias`` directive in the Apache configuration file.
 
For ``heron.cgi`` to work properly as a cgi-program it is useful to have the first line pointing to a working python installation:

``#!C:/Python25/python.exe -u``

``#!/usr/bin/env python``

``..``

Furthermore you'll have to point ``heron.cgi`` to the ogr2ogr executable which you have installed. For this you'll find a line starting with ``OGR2OGR_PROG``. Adapt the line so that this constant is refering to the right path:

``OGR2OGR_PROG = 'C:\OSGeo4W64/bin/ogr2ogr.exe'``



