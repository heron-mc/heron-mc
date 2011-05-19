#!/bin/bash
#
# Converts WMS capabilities to Heron Layer JavaScript objects
#
# Author: Just van den Broecke
#

url=$1
caps=caps.xml
xsl=wmscaps2layerjs.xsl

# Transformation
function transform() {
	echo "wget $url"
    wget -O $caps $url
    echo "xsltproc $xsl $caps"

	xsltproc $xsl $caps
}


transform




