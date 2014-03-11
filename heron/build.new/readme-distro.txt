README
======

This directory contains the distribution files of the Heron Mapping Client (Heron MC).
See http://heron-mc.org for details.

Directories
-----------

docs: all documentation
examples: example applications
resources: Heron core images and css mainly
script: compressed versions of Heron and Heron User Extensions (ux) JavaScript files
cgi-bin: server-side CGI scripts for proxying (proxy.cgi) and advanced services like download (heron.cgi)
ux: User Extensions, component libraries maintained externally but directly integrated in Heron

Installation
------------

Heron needs to be run from a webserver. The easiest way to run Heron on
your local machine is to use the script startheron.sh (Mac OSX, Linux, Unixes) or startheron.bat (Windows)
Then use your browser to go to the webpage: http://127.0.0.1:8000 and further browse
to 'examples'. For this you need at least to have Python installed. To use advanced
Download services you also need to install GDAL/OGR and set your PATH such that
GDAL binaries (ogr2ogr) can be found. Only for Windows this is somewhat more elaborate but
doable in under 10 mins. NB: startheron.* is not for production use!!

Windows-specific
................

If you see "'python` is not recognized as an internal or external command"
when clicking startheron.bat, you need to install Python or it is not in your PATH.

Python example setup:

- install version 2.7.6 from http://www.python.org/getit (no Python v3!)
- add C:\python27 to PATH via Control Panel | System | Advanced |Environment Variables
- OR uncomment line: SET PATH=C:\python27;C:\Program files\GDAL;%PATH% in startheron.bat

To also use advanced file download with conversion and reprojection install GDAL/OGR (www.gdal.org)

GDAL/OGR:

- Go to http://www.gisinternals.com/sdk/
- Select relevant version: e.g. release-1600-gdal-1-10-mapserver-6-4
- download/install "GDAL Core Components": gdal-110-1600-core.msi
- Add c:\Program Files\GDAL to your PATH (via Control Panel or in .bat file as below)
- set GDAL_DATA to c:\Program Files\GDAL\gdal-data (,, ,,)

You may also uncomment these lines:
SET PATH=C:\python27;C:\Program files\GDAL;%PATH%
SET GDAL_DATA=C:\Program files\GDAL\gdal-data

Mac OSX
.......

Python (v2) should be already on your system. If you don't have GDAL/OGR install from
your package manager (MacPorts, Fink, Homebrew) but many install from
Kyngchaos: http://www.kyngchaos.com/software/frameworks (GDAL Complete).

GDAL applications are run through the Mac OS X Terminal.
The first time you install the GDAL package there is one additional
step to make sure you can access these programs. Open the Terminal application and run the following commands:

echo 'export PATH=/Library/Frameworks/GDAL.framework/Programs:$PATH' >> ~/.bash_profile
source ~/.bash_profile

Linux
.....

Python (v2) should be already on your system. GDAL can usually be installed via Package management
as package 'gdal-bin'. For example on Ubuntu:
  sudo apt-get install gdal-bin

Tip: on Ubuntu use the Ubuntu-GIS PPA: https://wiki.ubuntu.com/UbuntuGIS

Other Ways
..........

If you already have Apache, Python and know about how to deal with Python CGI
you may use that environment. This is also an optimal environment for production.
Best way to install is to copy this entire directory-tree to a directory
on a web server like Apache. Then test install by opening the examples via your browser, e.g.
http://localhost/heron/examples/default

When using the CGI scripts (see cgi-bin dir) put these in a directory where they
can be executed by the Python interpreter as standard CGI scripts.
Modify proxy.cgi for your proxy settings.

See more on http://heron-mc.org documentation.


