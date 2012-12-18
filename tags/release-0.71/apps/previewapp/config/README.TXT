Below are configurations to populate the layertree and its layers. By default the file "default.xml" is taken.
Other configs can be loaded by passing a config= parameter to index.html e.g. index.html?config=thematic.xml

This application is being developed mainly from requirements within the Dutch PDOK project (www.pdok.nl)
and TNO DINO Services (www.tno.nl).

Basic Installation:
This application should run out of the box (except for proxy settings)
- drop this directory into your webserver
- all the config files are under config/ dir
- optionally adapt Proxy setting (OpenLayers.ProxyHost) in config/appConfig.js

Advanced, replacing/adding layers
- the file config/default.xml specifies the basis layer tree layout
- each context entry refers to a dataset config in subdir, e.g. mixed/aan refers to mixed/aan.xml
- see config.xsd how the xml files should be structured

More Advanced - Change/Replace Layout
- the overall webapp layout/components are specified in config/appConfig.js
- adapt config/appConfig.js for custom components according to Heron/ExtJS/GeoExt conventions
- be sure to keep the MapPanel (Heron.options.map) and LayerTreePanel (Heron.options.layertree) settings intact


