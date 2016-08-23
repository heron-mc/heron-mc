The philosophy of Heron is to use only standardized, viz OGC web-services
like WMS, WFS and the like. But in several cases we will still need custom
web services, mainly to overcome browser limitations or security bounds.

This directory contains some custom scripts for advanced Heron usage:

- proxy.cgi
Standard proxy script that should be used to overcome browser limitations
for cross-domain Ajax calls, most notably all info and feature vector requests.
Examples WMS GetFeatureInfo, WFS requests, Capabilities and DescribeFaetureType requests etc.
Used by OpenLayers AJAX calls (and ExtJS Ajax, as that is overriden to use OpenLayers Ajax).

In your Heron config use something like :

OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

- heron.cgi (or heron.py, see below)

A custom script to help with some other browser limitations, i.e.
where there is no other real alternative to use server-side functions.
The most notable are "upload" and "download" of Vector data:

download examples:
- export from FeaturePanel after WFS or WMS GFI requests
- download drawing from Editor (redlining tool)

In case of download we need an HTTP "Attachment" header to trigger a
"Save as.." popup in browser.

upload examples
- Editor: upload Vector data
- upload Vector data into scratch layer (upload button in toolbar)

In case of upload we cannot directly select a local file and read this into the browser.
A "trick" is used whereby the data is uploaded to the server (via
a form-submit), but the server merely
echoes back the data. The client will capture this data as the result of a form submit.

In addition this script can also do format and coordinate transformation.

Script parameters. All CGI query parameters are common, with (o) is optional:

mime: mimetype to set in response
encoding: (o)  base64 or EMPTY
source_format: (o) source OGR format
target_format: (o) target OGR format
assign_srs: (o) assign SRS to result
source_srs: (o) source data SRS
target_srs: (o) target data SRS
action: what script should  do, value "upload" or "download"

heron.cgi uses ogr2ogr for processing optional transforms.

See test dir for examples of parameters.

# NOTE: heron.cgi is now equal to heron.py (because of WSGI conventions for some containers)
# heron.cgi will be phased out soon and only heron.py will remain!  The default URL in App.js
# will also be adapted.

Installation Guidelines

Ubuntu

On Ubuntu with Apache2 heron.cgi requires the following packages besides apache2:
libapache2-mod-wsgi (when using heron.py as wsgi) python-gdal gdal-bin

In order for Apache2 to find the heron.cgi and proxy.cgi scripts you may do the following
(thanks to Roberto M.):

ln -s /var/www/html/webservice/heron-1.0.6/cgi-bin/heron.cgi /usr/lib/cgi-bin

And in Apache conf file (or use the Heron cgi-dir directly):

ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
<Directory "/usr/lib/cgi-bin/">
     AllowOverride None
     Options +ExecCGI -MultiViews +FollowSymLinks
     Order allow,deny
     Allow from all
</Directory>
