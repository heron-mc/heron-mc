Building Heron
===============

This directory contains configuration files necessary for building Heron.
The build configuration is intended for use with the jsbuild
utility included in JSTools (http://github.com/whitmo/jstools).

Brief instructions
------------------

This build dir contains a Makefile, which can be used to build Heron. The
build process requires a bash-like shell, make, sed, find and rsync. All this
should be available on well equipped development *nix and OS X boxes. In
addition, JSTools is required.

To install JSTools, python-setuptools is required. This is available as
python-setuptools package on debian-style linux systems.

    $ sudo aptitude install python-setuptools
    
Now you can easily install JSTools.

    $ sudo easy_install jstools

Change into the trunk/heron/build directory (the one containing the readme.txt
file you are reading right now), if you are not already here.
From here, you can build the library.

    $ make zip
    
Now you can take the resulting Heron.zip file and unpack it on your web
server. The library itself resides in the script folder, the resources folder
contains css files and images.
    
The Makefile has even more targets. Invoke make help to see them all.

    $ make help
