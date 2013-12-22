by: Just van den Broecke

A short note how the heron-mc.org website is setup and updated.

Concept
-------

The entire website including API and examples documention is completely built
with Sphinx +  JSTools. We greatly thank the GeoExt developers (www.geoext.irg) for showing us
from their project how to do this. We used their setup as a starting point.
This also means that to update website the documention has to be rebuilt
(is a matter of seconds). Also the website is tied to a specific version of Heron.
Updating the website requires making changes in SVN first and then build and copy
the generated docs to the website dir.

How to Update Content
---------------------

All content is updated via SVN:

- regular Sphinx docs (.rst) under docsrc directory
- API docs by adding info in the JS files
- examples are automatically added by adding meta info in their JS file (e.g. Config.js)


How to Build and Deploy
-----------------------

To build you need to have Ant, Sphinx (1.0.6 or later) and JSTools (0.2.2 or later).
On the deploy machine go to de dir deploy/svn/project/geoext-viewer/trunk (will be renamed to heron)
and then:

svn update # be sure to have latest doc
cd docsrc
ant doc

Docs are under _build/html. Copy these to the website directory.

Handy shorthand for all this: see tools/build/update-website.sh

