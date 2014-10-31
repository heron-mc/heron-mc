#!/bin/bash
#
# Tag trunk with release number
# example: tag-release.sh release-0.4
#
# Author: Just van den Broecke
#

rel=$1
svn=https://geoext-viewer.googlecode.com/svn
cmd="svn copy ${svn}/trunk/ ${svn}/tags/${rel} -m \"${rel}\""
echo ${cmd}
${cmd}
