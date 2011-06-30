#!/bin/bash
#
# Update the entire heron-mc.org website
#
# Author: Just van den Broecke
#

# create the documention (the documentation is the site!)
DOC_DIR=../../docsrc/
SITE_DIR=kadmin@heron-mc.org:/var/www/heron-mc.org/site/

ant -f ${DOC_DIR}/build.xml

# clean out any .svn that causes error in cp
find ${DOC_DIR}/_build -name .svn | xargs rm -rf

# overwrite site
scp -r ${DOC_DIR}/_build/html/* ${SITE_DIR}


