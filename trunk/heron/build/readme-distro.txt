README
======

This directory contains the distribution files of the Heron Mapping Client (Heron MC).
See http://heron-mc.org for details.

Directories
-----------

docs: all documentation
examples: example code
resources: Heron core images and css mainly
script: compressed versions of Heron and Heron User Extensions (ux) JavaScript files
cgi-bin: server-side CGI scripts for proxying (proxy.cgi) and advanced services like download (heron.cgi)
ux: User Extensions, component libraries maintained externally but directly integrated in Heron

Installation
------------
Best way to install is to copy this entire directory-tree to a directory
on a web server like Apache. Then test install by opening the examples via your browser, e.g.
http://localhost/heron/examples/default

When using the CGI scripts (see cgi-bin dir) put these in a directory where they
can be executed by the Python interpreter as standard CGI scripts.
Modify proxy.cgi for your proxy settings.
See more on http://heron-mc.org documentation.


