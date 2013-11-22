#!/bin/sh
# Merge an .xml PreviewApp config file with <url> refs
# into a single file
#
# Example ./merge.sh default.xml default-merged.xml
#
xsltproc merge.xslt $1 > $2
