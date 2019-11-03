#!/bin/bash
#
# Tag trunk with release number
# example: tag-release.sh release-0.4
#
# Author: Just van den Broecke
#

rel=$1
git tag $rel
git push --tags
