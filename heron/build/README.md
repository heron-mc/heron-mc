# Building Heron

This directory contains configuration files necessary for building Heron.
The build configuration is intended for use with the jsbuild
utility included in JSTools (http://github.com/whitmo/jstools).
Note: newer versions of JSTools (>0.2.2) sometimes give problems.
We will migrate to other JS building tools shortly.

## Brief instructions

This build dir contains a Makefile, which can be used to build Heron. The
build process requires a bash-like shell, make, sed, find and rsync. All this
should be available on well equipped development *nix and OS X boxes. In
addition, Python JSTools is required for the jsbuild command. Best is to use 'pip'
the standard package Python maintainer. You may need to use 'sudo' or use 'virtualenv'
depending on your environment. NB a Python 2.7 environment is needed!
JSTools: https://github.com/camptocamp/jstools.

    pip install jstools==0.2.2  (low version!)

In order to build also documentation, install:

    pip install jinja2==2.7.2
    pip install Spinhx

See [requirements.txt](requirements.txt) for complete list of Python deps.

So better: `pip install -r requirements.txt`

Change into the trunk/heron/build directory (the one containing the readme.txt
file you are reading right now), if you are not already here.
From here, you can build the library.

    $ make zip
    
Now you can take the resulting Heron.zip file and unpack it on your web
server. The library itself resides in the script folder, the resources folder
contains css files and images.
    
The Makefile has even more targets. Invoke make help to see them all.

    $ make help
