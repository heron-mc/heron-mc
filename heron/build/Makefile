# Makefile for all of Heron

# VERSION = r$(shell echo '$$Revision: 2438 $$' | tr -d "[:alpha:]$$ :")
VERSION = 1.0.8dev
LATEST_VERSION = latest
LIB_NAME = heron
ZIP_NAME = $(LIB_NAME)-$(VERSION).zip
PROD_DIR = hadmin@sup.heron-mc.org:/var/www/heron-mc.org/lib/heron
PROD_CGI_DIR = root@heron-mc.org:/var/www/heron-mc.org/cgi-bin
PROD_DOWNLOAD_DIR = $(PROD_DIR)/../download
LOCAL_PROD_DIR = /var/www/heron-mc.org/lib/heron
LOCAL_PROD_CGI_DIR = $(LOCAL_PROD_DIR)/../../cgi-bin
LOCAL_PROD_DOWNLOAD_DIR = $(LOCAL_PROD_DIR)/../download
LOCAL_DIR = /var/gworx/webapps/heron-mc.org/lib/heron
LOCAL_CGI_DIR = $(LOCAL_DIR)/../../cgi-bin
SRC_DIR = ..

# CSS_DIR = $(LIB_NAME)/resources/css
# CSS_IMPORTS = $(shell cat ../resources/css/default.css | grep '@import' | sed 's/^@import "\(.*\)";/\1/')
# ALL_CSS = $(CSS_DIR)/default.css

.PHONEY: help clean ext examples lib zip dist sync-lib-local-raw

help:
	@echo "Please use 'make <target>' where <target> is one or more of"
	@echo "  clean	to clean up after building"
	@echo "  lib	  to make a standalone dir of lib resources"
	@echo "  zip	  to make a zip archive of a standalone lib"
	@echo "  dist	 to make a zip archive of a standalone lib with examples"
	@echo
	@echo "Example use:"
	@echo "  make lib"
	@echo "  make lib LIB_NAME=MyLib"
	@echo "  make zip"
	@echo "  make zip ZIP_NAME=MyZip.zip"
	@echo "  make dist VERSION=1.0.7"

clean:
	-rm -rf $(LIB_NAME)
	-rm -f $(ZIP_NAME)

docs:
	cd ../../docsrc && make -f Makefile html
	mkdir -p $(LIB_NAME)/docs
	cp -Rf ../../docsrc/_build/html/* $(LIB_NAME)/docs

lib:
	@echo "Building the library."
	mkdir -p $(LIB_NAME)/script $(LIB_NAME)/resources/css

	jsbuild full.cfg -v -o $(LIB_NAME)/script/ -j Heron.js
	echo "Heron.version='$(VERSION)';" >> $(LIB_NAME)/script/Heron.js

	rsync -au --exclude=.git --exclude=.gitmodules  `pwd`/../resources `pwd`/$(LIB_NAME)
	rsync -au --exclude=.git --exclude=.gitmodules  `pwd`/../lib `pwd`/$(LIB_NAME)
	rsync -au --exclude=.git --exclude=.gitmodules  `pwd`/../cgi-bin `pwd`/$(LIB_NAME)
	rsync -au --exclude=.git --exclude=.gitmodules  `pwd`/../ux `pwd`/$(LIB_NAME)

#	jsbuild gxp.cfg -v -o ../ux/gxp/ -j gxp-min.js
	jsbuild printpreview.cfg -v -o $(LIB_NAME)/ux/printpreview/ -j printpreview.min.js

	cat ../ux/oleditor/license.txt ../ux/oleditor/ole/ole.min.js \
		../ux/gxp/license.txt ../ux/gxp/gxp.js \
		../ux/printpreview/license.txt $(LIB_NAME)/ux/printpreview/printpreview.min.js \
		$(LIB_NAME)/script/Heron.js > $(LIB_NAME)/script/Heron-with-ux.js

	cat ../ux/oleditor/license.txt ../ux/oleditor/ole/ole.min.js \
		../ux/gxp/license.txt ../ux/gxp/gxp.js \
		../ux/printpreview/license.txt $(LIB_NAME)/ux/printpreview/printpreview.min.js \
		> $(LIB_NAME)/script/Heron-ux-only.js

#	for file in `find $(CSS_DIR) -name "*.css"`; do \
#		csstidy $${file} --template=highest $${file} ; \
#	done ;
#	echo "" > $(ALL_CSS)
#	for filename in $(CSS_IMPORTS); do \
#		cat $(CSS_DIR)/$${filename} >> $(ALL_CSS) ; \
#	done ;
#
	mkdir -p $(LIB_NAME)/examples
	rsync -au --exclude=.git --exclude=.gitmodules  `pwd`/../examples `pwd`/$(LIB_NAME)

	for file in `find $(LIB_NAME)/examples -name "*.html"`; do \
		sed -i.bak "s/\.\.\/lib\/DynLoader\.js/\.\.\/script\/Heron\.js/g" $${file} ; \
		rm $${file}.bak ; \
	done;

	cp ../../license.txt $(LIB_NAME)
	cp ../../CHANGES.md $(LIB_NAME)
	cp ../startheron.* $(LIB_NAME)
	chmod +x $(LIB_NAME)/startheron.*

	cp readme-distro.txt $(LIB_NAME)/readme.txt
	echo "Heron version is $(VERSION)" >> $(LIB_NAME)/version.txt

libextern:
	@echo "Building the external libraries."
	jsbuild gxp.cfg -v -o ../ux/gxp/ -j gxp-min.js
	echo "gxp.version='$(VERSION)';" >> ../ux/gxp/gxp-min.js

zip: clean lib docs
	@echo "Archiving the library."
	-rm -f $(ZIP_NAME)
	find $(LIB_NAME) -name .git | xargs rm -rf
	find $(LIB_NAME) -name .gitmodules | xargs rm -rf
#	find $(LIB_NAME)/ux/gxp/git/externals | xargs rm -rf
	mv $(LIB_NAME) $(LIB_NAME)-$(VERSION)
	zip $(ZIP_NAME) -r $(LIB_NAME)-$(VERSION)
	mv $(LIB_NAME)-$(VERSION) $(LIB_NAME)

dist: zip

release: zip

sync-cgi-bin-local:
	@echo "Syncing `pwd`/../cgi-bin/ to $(LOCAL_CGI_DIR)"
	rsync -auv --exclude=.git --exclude=.gitmodules  `pwd`/../cgi-bin/* $(LOCAL_CGI_DIR)
	chmod +x $(LOCAL_CGI_DIR)/*.cgi

sync-cgi-bin-prod:
	@echo "Syncing `pwd`/../cgi-bin/ to $(PROD_CGI_DIR)"
	rsync -auv --executability --exclude=.git --exclude=.gitmodules  `pwd`/../cgi-bin/* $(PROD_CGI_DIR)

sync-cgi-bin-local-prod:
	@echo "Syncing `pwd`/../cgi-bin/ to $(LOCAL_PROD_CGI_DIR)"
	rsync -auv --executability --exclude=.git --exclude=.gitmodules  `pwd`/../cgi-bin/* $(LOCAL_PROD_CGI_DIR)
	chmod +x $(LOCAL_PROD_CGI_DIR)/*.cgi

sync-rsc-local-raw: sync-cgi-bin-local
	@echo "Syncing `pwd`/../resources to $(LOCAL_DIR)/latest"
	rsync -auv --exclude=.git --exclude=.gitmodules  `pwd`/../resources $(LOCAL_DIR)/latest

sync-lib-local-raw:  sync-rsc-local-raw
	@echo "sync-lib-local-raw: Syncing `pwd`/.. to $(LOCAL_DIR)/latest"
	find $(LOCAL_DIR)/latest/examples -name *.html | xargs /bin/rm
	rsync -auv --exclude=.git --exclude=.gitmodules  `pwd`/../examples $(LOCAL_DIR)/latest
	rsync -auv --exclude=.git --exclude=.gitmodules  `pwd`/../lib $(LOCAL_DIR)/latest
	rsync -auv --exclude=.git --exclude=.gitmodules  `pwd`/../ux $(LOCAL_DIR)/latest
	rsync -auv --exclude=.git /Users/just/project/heron/contrib/just/ole-editor/ole.git/client/  /var/gworx/webapps/heron-mc.org/lib/openlayers-editor/justs.ole.git/client/
	rsync -auv --exclude=.git /Users/just/project/heron/contrib/just/gxp/justb4.git/src/script/  /var/gworx/webapps/heron-mc.org/lib/gxp/git/src/script/

sync-rel-prod: zip
	@echo "Syncing the library."
	mv $(LIB_NAME) $(VERSION)
	rsync -au --exclude=.git --exclude=.gitmodules  $(VERSION) $(PROD_DIR)
	mv $(VERSION) $(LIB_NAME)
	scp $(ZIP_NAME) $(PROD_DOWNLOAD_DIR)

sync-rel-local: zip
	@echo "Syncing the library."
	mv $(LIB_NAME) $(VERSION)
	rsync -au --exclude=.git --exclude=.gitmodules  $(VERSION) $(LOCAL_DIR)
	mv $(VERSION) $(LIB_NAME)

sync-lib-prod: lib  sync-cgi-bin-prod
	@echo "Syncing current library."
	mv $(LIB_NAME) $(LATEST_VERSION)
	rsync -au --exclude=.git --exclude=.gitmodules  $(LATEST_VERSION) $(PROD_DIR)
	mv $(LATEST_VERSION) $(LIB_NAME)
	@echo "Syncing `pwd`/../resources to $(PROD_DIR)/latest"
	rsync -auv --exclude=.git --exclude=.gitmodules  `pwd`/../resources $(PROD_DIR)/latest
	rsync -auv --exclude=.git --exclude=.gitmodules  `pwd`/../ux $(PROD_DIR)/latest

sync-all-local-prod: zip sync-cgi-bin-local-prod
	@echo "Syncing current library locally."
	mv $(LIB_NAME) $(LATEST_VERSION)
	rsync -au --exclude=.git --exclude=.gitmodules  $(LATEST_VERSION) $(LOCAL_PROD_DIR)
	mv $(LATEST_VERSION) $(LIB_NAME)
	@echo "Syncing `pwd`/../resources to $(LOCAL_PROD_DIR)/latest"
	rsync -auv --exclude=.git --exclude=.gitmodules  `pwd`/../resources $(LOCAL_PROD_DIR)/latest
	@echo "Syncing `pwd`/../ux to $(LOCAL_PROD_DIR)/latest"
	rsync -auv --exclude=.git --exclude=.gitmodules  `pwd`/../ux $(LOCAL_PROD_DIR)/latest
	@echo "Copy version $(ZIP_NAME) to $(LOCAL_PROD_DIR)/latest/heron-unstable.zip"
	cp $(ZIP_NAME) $(LOCAL_PROD_DIR)/latest/heron-unstable.zip
	-rm -f $(LOCAL_PROD_DIR)/$(VERSION)
	ln -s $(LOCAL_PROD_DIR)/latest $(LOCAL_PROD_DIR)/$(VERSION)

sync-lib-local: lib sync-cgi-bin-local
	@echo "Syncing only library."
	mv $(LIB_NAME) $(LATEST_VERSION)
	rsync -au --exclude=.git --exclude=.gitmodules  $(LATEST_VERSION) $(LOCAL_DIR)
	mv $(LATEST_VERSION) $(LIB_NAME)

