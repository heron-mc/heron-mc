#!/bin/bash
#
# Update the entire heron-mc.org website
#
# Author: Just van den Broecke
#

# create the documentation (the documentation is the site!)
DOC_DIR=../../docsrc/
SITE_DIR=hadmin@sup.heron-mc.org:/var/www/heron-mc.org/home/

ant -f ${DOC_DIR}/build.xml

# clean out any .svn that causes error in cp
# find ${DOC_DIR}/_build -name .svn | xargs rm -rf

# overwrite site
scp -r ${DOC_DIR}/_build/html/* ${SITE_DIR}


