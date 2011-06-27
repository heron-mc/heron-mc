# Makefile for Heron

# VERSION = r$(shell echo '$$Revision: 2438 $$' | tr -d "[:alpha:]$$ :")
VERSION = 0.62
LATEST_VERSION = latest
LIB_NAME = heron
ZIP_NAME = $(LIB_NAME)-$(VERSION).zip
PROD_DIR = kadmin@heron-mc.org:/var/www/heron-mc.org/lib/heron
LOCAL_DIR = /var/gworx/webapps/heron-mc.org/lib/heron

# CSS_DIR = $(LIB_NAME)/resources/css
# CSS_IMPORTS = $(shell cat ../resources/css/default.css | grep '@import' | sed 's/^@import "\(.*\)";/\1/')
# ALL_CSS = $(CSS_DIR)/default.css

.PHONEY: help clean ext examples lib zip dist

help:
	@echo "Please use 'make <target>' where <target> is one or more of"
	@echo "  clean    to clean up after building"
	@echo "  lib      to make a standalone dir of lib resources"
	@echo "  zip      to make a zip archive of a standalone lib"
	@echo "  dist     to make a zip archive of a standalone lib with examples"
	@echo
	@echo "Example use:"
	@echo "  make lib"
	@echo "  make lib LIB_NAME=MyLib"
	@echo "  make zip"
	@echo "  make zip ZIP_NAME=MyZip.zip"
	@echo "  make dist VERSION=0.5-rc1"

clean:
	-rm -rf $(LIB_NAME)
	-rm -f $(ZIP_NAME)

docs:
	ant -f ../../docsrc/build.xml
	mkdir -p $(LIB_NAME)/docs
	cp -Rf ../../docsrc/_build/html/* $(LIB_NAME)/docs

lib:
	@echo "Building the library."
	mkdir -p $(LIB_NAME)/script $(LIB_NAME)/resources/css
	
	jsbuild full.cfg -v -o $(LIB_NAME)/script/ -j Heron.js
	echo "Heron.version='$(VERSION)';" >> $(LIB_NAME)/script/Heron.js
	
	rsync -au --exclude=.svn `pwd`/../resources `pwd`/$(LIB_NAME)
	rsync -au --exclude=.svn `pwd`/../lib `pwd`/$(LIB_NAME)
	
#	for file in `find $(CSS_DIR) -name "*.css"`; do \
#	    csstidy $${file} --template=highest $${file} ; \
#	done ;
#	echo "" > $(ALL_CSS)
#	for filename in $(CSS_IMPORTS); do \
#	    cat $(CSS_DIR)/$${filename} >> $(ALL_CSS) ; \
#	done ;
#
	mkdir -p $(LIB_NAME)/examples
	rsync -au --exclude=.svn `pwd`/../examples `pwd`/$(LIB_NAME)

	for file in `find $(LIB_NAME)/examples -name "*.html"`; do \
		sed -i.bak "s/\.\.\/lib\/DynLoader\.js/\.\.\/script\/Heron\.js/g" $${file} ; \
		rm $${file}.bak ; \
	done;

	cp ../../license.txt $(LIB_NAME)

libraw:
	@echo "RAW Syncing the library."
	rsync -au --exclude=.svn `pwd`/../resources $(LOCAL_DIR)/latest
	rsync -au --exclude=.svn `pwd`/../lib $(LOCAL_DIR)/latest
	rsync -au --delete --exclude=.svn `pwd`/../examples $(LOCAL_DIR)/latest

zip: clean lib docs
	@echo "Archiving the library."
	-rm -f $(ZIP_NAME)
	find $(LIB_NAME) -name .svn | xargs rm -rf
	mv $(LIB_NAME) $(LIB_NAME)-$(VERSION)
	zip $(ZIP_NAME) -r $(LIB_NAME)-$(VERSION)
	mv $(LIB_NAME)-$(VERSION) $(LIB_NAME)


dist: zip

release: zip

sync-rel-prod: zip
	@echo "Syncing the library."
	mv $(LIB_NAME) $(VERSION)
	rsync -au --exclude=.svn $(VERSION) $(PROD_DIR)
	mv $(VERSION) $(LIB_NAME)

sync-rel-local: zip
	@echo "Syncing the library."
	mv $(LIB_NAME) $(VERSION)
	rsync -au --exclude=.svn $(VERSION) $(LOCAL_DIR)
	mv $(VERSION) $(LIB_NAME)

sync-lib-prod: lib
	@echo "Syncing only library."
	mv $(LIB_NAME) $(LATEST_VERSION)
	rsync -au --exclude=.svn $(LATEST_VERSION) $(PROD_DIR)
	mv $(LATEST_VERSION) $(LIB_NAME)

sync-lib-local: lib
	@echo "Syncing only library."
	mv $(LIB_NAME) $(LATEST_VERSION)
	rsync -au --exclude=.svn $(LATEST_VERSION) $(LOCAL_DIR)
	mv $(LATEST_VERSION) $(LIB_NAME)

sync-lib-local-debug: libraw
	@echo "Syncing only raw library."
