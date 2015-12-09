#!/bin/bash
#
# Script to build minified GXP
cd git

rm externals > /dev/null 2>&1
rm -rf build > /dev/null 2>&1

# need toolkit but no need to checkin
ln -s ../../../../../external/gxp/gxp.justb4/justb4.git/externals  .

# build only the JS
ant buildjs

# Save minified for check-in
cp build/script/gxp.js ..

# cleanup
rm externals
rm -rf build
cd -
