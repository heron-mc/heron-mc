This is the Roadmap including all history. 
The file [CHANGES.md](https://github.com/heron-mc/heron-mc/blob/master/CHANGES.md) is a copy of the [roadmap in the Wiki](https://github.com/heron-mc/heron-mc/wiki/Roadmap).

In each Heron MC release a set of issues (bugs/features) implemented for that release is included. In GitHub a release is associated with a Milestone. A Milestone is a set of issues implemented/resolved (closed) for that Milestone.

# Unplanned Issues #
"Unplanned" means these issues have been identified and recognized but not yet assigned to a Milestone/release.

Basically this is the full feature list at
https://github.com/heron-mc/heron-mc/issues?q=no%3Amilestone+is%3Aissue+is%3Aopen
i.e. the features without Milestones attached.

# Releases #
## Release 1.0.7 -  UPCOMING VERSION ##
[issues within the Milestone for this release.](https://github.com/heron-mc/heron-mc/issues?utf8=%E2%9C%93&q=milestone%3ARelease-1.0.7+)

## Release 1.0.6 -  February 12, 2016 ##

This is the first Heron release after the migration from Google Code to GitHub. Starting this release GH Milestones will be used to assemble and identify issues for a release. This is also better automated.

See the [issues within the Milestone for this release.](https://github.com/heron-mc/heron-mc/issues?utf8=%E2%9C%93&q=milestone%3ARelease-1.0.6+).

Spatial thanks:

* SkyGeo via Marco Duiker sponsored the work on the WSGI version of heron.cgi via Pull Request [issue #433](https://github.com/heron-mc/heron-mc/issues/433)
* Gasunie sponsored completion of the Catalog widget via [issue #324](https://github.com/heron-mc/heron-mc/issues/324)

And offcourse thanks to all other contributors!

## Release 1.0.5 -  Dec 12, 2014 ##

Developed for PDOK:

  * [issue #405](https://github.com/heron-mc/heron-mc/issues/405) - Enhancement - 	GetFeatureInfo for WMTS Layers
  * [issue #406](https://github.com/heron-mc/heron-mc/issues/406) - Enhancement - 	Pre-configured per-layer legends in Heron Context XML/XSD

Translation updates

  * [issue #407](https://github.com/heron-mc/heron-mc/issues/407) 	Patch: Translation ca\_ES (Catalan) by Oriol.Carol (gràcies)

Other

  * fixed missing statusbar for measurements tool in statusbar example (from: Roberto Marzocchi)


## Release 1.0.4 -  October 31, 2014 ##

  * [issue #382](https://github.com/heron-mc/heron-mc/issues/382)	- Bug - OLeditor - regular polygon selection (IE issues)
  * [issue #383](https://github.com/heron-mc/heron-mc/issues/383)	- Bug - OLeditor - GPX export/import (OL NS issues for gpx: NS)
  * [issue #394](https://github.com/heron-mc/heron-mc/issues/394)	- Enhancement - Add buffer functionality to WFS search by feature panel (via DWITHIN Filter).

Developed for RVOB
  * [issue #403](https://github.com/heron-mc/heron-mc/issues/403) - Enhancement - Backport the Simple Time Slider
  * [issue #400](https://github.com/heron-mc/heron-mc/issues/400) - Enhancement - 	Implement Catalogue into Heron (via GXP FindLayers, CSW)

Updated es\_ES.js i18n language file (thanks Mauro).

## Release 1.0.3 -  July 4, 2014 ##

  * [issue #380](https://github.com/heron-mc/heron-mc/issues/380)	Downloading Shapefiles in IE fails
  * [issue #375](https://github.com/heron-mc/heron-mc/issues/375)	 geoportal example has dead links
  * [issue #376](https://github.com/heron-mc/heron-mc/issues/376)	 inspire example layers are not showing
  * [issue #377](https://github.com/heron-mc/heron-mc/issues/377)	 querybuilder fails with multiple attribute conditions
  * [issue #378](https://github.com/heron-mc/heron-mc/issues/378)	several WFS requests do not work in IE11 (OL NS encoding  issue)
  * [issue #389](https://github.com/heron-mc/heron-mc/issues/389):	Vector Styling: in some cases Rule Edit for WFS Layers does not open
  * [issue #390](https://github.com/heron-mc/heron-mc/issues/390):	CoordSearchPanel doesn't accept the 0 coordinate

Sponsored by Dutch Kadaster for PDOK

  * [issue #370](https://github.com/heron-mc/heron-mc/issues/370)	Backporting PDOKCapabilitiesPanel to Heron trunk (finalize)
  * [issue #391](https://github.com/heron-mc/heron-mc/issues/391)	Make Showing Load Mask for HeronMapContext optional

Added [Gallery](http://lib.heron-mc.org/heron/latest/docs/gallery.html) with Heron apps to Heron homepage.

## Release 1.0.2 -  May 8, 2014 ##

Sponsored items from Warwickshire County Council:

  * [issue #313](https://github.com/heron-mc/heron-mc/issues/313)	Save/Load bookmarks outside of a browser
  * [issue #332](https://github.com/heron-mc/heron-mc/issues/332)	Layer ordering toggle (bugfixes)
  * [issue #324](https://github.com/heron-mc/heron-mc/issues/324)	Implement Catalogue into Heron (Partly, see also 1.0.3)

Sponsored by N.V. Nederlandse Gasunie:

  * [issue #365](https://github.com/heron-mc/heron-mc/issues/365)	Integrate dateslider/timeslider in Heron

Sponsored by Dutch Kadaster for PDOK

  * [issue #370](https://github.com/heron-mc/heron-mc/issues/370)	Backporting PDOKCapabilitiesPanel to Heron trunk (first version, see 1.0.3)
  * [issue #366](https://github.com/heron-mc/heron-mc/issues/366)	Port and integrate PDOK XML config loader into Heron core
  * [issue #367](https://github.com/heron-mc/heron-mc/issues/367) 	LayerLegendPanel: fetch legendURL via Capabilities for some WMS-types
  * [issue #369](https://github.com/heron-mc/heron-mc/issues/369)	Add PDOKViewer to heron apps

Other:

  * [issue #341](https://github.com/heron-mc/heron-mc/issues/341) 	Support for **OGC GeoPackage (GPKG)** format for Vector feature up/download
  * [issue #344](https://github.com/heron-mc/heron-mc/issues/344)	en\_US - uncomma'd strings
  * [issue #345](https://github.com/heron-mc/heron-mc/issues/345)	Vector Styler - changes all styles when none selected.
  * [issue #346](https://github.com/heron-mc/heron-mc/issues/346)	MapFish - mapAttribution error - missing code
  * [issue #349](https://github.com/heron-mc/heron-mc/issues/349)	Attribute URL's not turned into links in DetailView
  * [issue #352](https://github.com/heron-mc/heron-mc/issues/352)	Tooltip example not working (JS typo error)
  * [issue #353](https://github.com/heron-mc/heron-mc/issues/353)	(Regression?) - tooltips not working with 1.0.1 (displayPanels['Grid'] not working)
  * [issue #371](https://github.com/heron-mc/heron-mc/issues/371)	Allow user via config to enable/disable moving layers in LayerTreePanel

Notes:
in FeaturePanel config: displayPanels['Grid'] is deprecated, use displayPanels['Table'] instead.

## Release 1.0.1 -  February 26, 2014 ##

This release will mainly include issues implemented via DevPlanDecJan1314, sponsored items from Warwickshire County Council:

  * [issue #189](https://github.com/heron-mc/heron-mc/issues/189)	Mapfish Print - Other output formats (fix to allow outputformat in printdirect)
  * [issue #317](https://github.com/heron-mc/heron-mc/issues/317)	FeatureInfo responses as a Vertical List
  * [issue #329](https://github.com/heron-mc/heron-mc/issues/329)	Enhanced Drawing Tools: detailed Vector Styling for Editor
  * [issue #331](https://github.com/heron-mc/heron-mc/issues/331)	Styling of subsets of data
  * [issue #332](https://github.com/heron-mc/heron-mc/issues/332):	Layer ordering toggle

Developed by  Warwickshire County Council:
  * [issue #333](https://github.com/heron-mc/heron-mc/issues/333):	AutoDetect FeatureInfo column width & Specify manual column width
  * [issue #306](https://github.com/heron-mc/heron-mc/issues/306):	Remove specified columns from featureInfo outputs

Other:
  * [issue #67](https://github.com/heron-mc/heron-mc/issues/67) 	Use post-commit hook to generate and deploy Heron unstable
  * [issue #103](https://github.com/heron-mc/heron-mc/issues/103) 	Legend configuration
  * [issue #127](https://github.com/heron-mc/heron-mc/issues/127) 	Allow Heron.widgets.MultiLayerNode to have children or create new ParentLayerNode with allowed children
  * [issue #170](https://github.com/heron-mc/heron-mc/issues/170) Layertree issue - non hr\_multilayer also triggers all layers
  * [issue #253](https://github.com/heron-mc/heron-mc/issues/253) 	Drawing/editing/redlining tools - delete a vertex
  * [issue #293](https://github.com/heron-mc/heron-mc/issues/293) 	Vector Styling - "Limit by Condition" infinite loads
  * [issue #307](https://github.com/heron-mc/heron-mc/issues/307)	OLEditor/style editor - features with changed style cannot be selected or deleted
  * [issue #322](https://github.com/heron-mc/heron-mc/issues/322)	MFP Other Outputformats: merge [issue #189](https://github.com/heron-mc/heron-mc/issues/189) solution into GeoExt
  * [issue #328](https://github.com/heron-mc/heron-mc/issues/328) 	Enable zoom to extent in Layer Context Menu for Layers with maxExtent configured
  * [issue #336](https://github.com/heron-mc/heron-mc/issues/336) 	Hungarian Locale in GXP

## Release 1.0.0 - Dec 22, 2013 ##

It is about time for a 1.0.0! This is also a more natural numbering. The first digit, "1" is a major version. "2" will be used e.g. when going to !ExtJS4 and GeoExt2.

This release will mainly include issues implemented via DevPlanDecJan1314, sponsored items from Warwickshire County Council:

  * [issue #189](https://github.com/heron-mc/heron-mc/issues/189) 	Mapfish Print - Other output formats

Other:
  * [issue #171](https://github.com/heron-mc/heron-mc/issues/171) 	Print dialog gets too big (by Wolfram Winter)
  * [issue #309](https://github.com/heron-mc/heron-mc/issues/309) 	Enhanced field display for Nominatim search combo
  * [issue #306](https://github.com/heron-mc/heron-mc/issues/306) 	Remove specified columns from featureInfo outputs (by WCC)
  * [issue #315](https://github.com/heron-mc/heron-mc/issues/315) 	 - 	 Enhancement	- Shape export/import fails with different projection (allow Upload in any projection)
  * [issue #319](https://github.com/heron-mc/heron-mc/issues/319):	MapFish - output with OL attributation infos  (by Wolfram Winter)
  * [issue #321](https://github.com/heron-mc/heron-mc/issues/321) - Usability - 	Add Python webserver to start webserver to run Heron
  * Added Serbian Latin locale for Serbia (thanks to Davorin Bajic)

## Release 0.77 - Nov 22, 2013 ##

Features sponsored by RVOB
  * [issue #289](https://github.com/heron-mc/heron-mc/issues/289)  - 	 Enhancement	- 	Unified download of Vector grid data, in particular Shapefiles

Other
  * [issue #288](https://github.com/heron-mc/heron-mc/issues/288) 	 - 	 Enhancement	- Feature Info hides column if value is null
  * [issue #297](https://github.com/heron-mc/heron-mc/issues/297)  - 	 Enhancement	- 	New Czech translations patch for cs\_CZ.js (Martin Kokes)
  * [issue #304](https://github.com/heron-mc/heron-mc/issues/304) - 	 Enhancement	- 	Patch for /trunk/heron/lib/i18n/cs\_CZ.js (,,) opacity
  * [issue #300](https://github.com/heron-mc/heron-mc/issues/300) - Enhancement - zoom to search result' bounding box in NominatimSearchCombo (contrib by Cesar Basurto)
  * [issue #296](https://github.com/heron-mc/heron-mc/issues/296) - Enhancement - 	Patch for /trunk/heron/lib/override-geoext.js - XYZ layer encoder for printing (Martin Kokes)
  * [issue #302](https://github.com/heron-mc/heron-mc/issues/302) - Bug - 	GridCellRenderers ignored in search ResultPanel
  * [issue #305](https://github.com/heron-mc/heron-mc/issues/305) - Enhancement -	Es\_es.js patch translating latest versions (Spanish)

## Release 0.76 - Nov 1, 2013 ##

  * [issue #208](https://github.com/heron-mc/heron-mc/issues/208) - Enhancement -	Make the bottom toolbar, 'bbar', in MapPanel configurable similar to the toptoolbar
  * [issue #255](https://github.com/heron-mc/heron-mc/issues/255):	-Enhancement -  Patch for /trunk/heron/lib/widgets/LayerLegendPanel.js (allow custom legendURL)
  * [issue #260](https://github.com/heron-mc/heron-mc/issues/260)	- Defect - GXP: Global OL defaultSymbolizer assignment in WMSStylesDialog creates conflict with OLEditor
  * [issue #280](https://github.com/heron-mc/heron-mc/issues/280) -Enhancement -	Context Menu Popup for Layer Nodes in Layer Tree Panels
  * [issue #281](https://github.com/heron-mc/heron-mc/issues/281)  -Enhancement -	Allow column config for FeatureInfoPanel
  * [issue #282](https://github.com/heron-mc/heron-mc/issues/282) - Defect - Missing columnCapitalize flag in FeatureInfoPanel
  * [issue #283](https://github.com/heron-mc/heron-mc/issues/283) -Enhancement -		Standard, extensible Help function in Toolbar

Dutch Kadaster - Sponsored new features:

  * [issue #241](https://github.com/heron-mc/heron-mc/issues/241)	 - Enhancement - Allow for interactive styling of Vector Layers
  * [issue #246](https://github.com/heron-mc/heron-mc/issues/246)	 - Enhancement - FormSearchPanel with hierarchical autofill (e.g. Address or Parcel search)

Other:
Help text facility (see [issue #283](https://github.com/heron-mc/heron-mc/issues/283)) started adding to all examples

## Release 0.75 - Sept 8, 2013 ##

  * [issue #250](https://github.com/heron-mc/heron-mc/issues/250) - Enhancement - 	Move hosted JS libs to CDN (GeoExt still awaiting Pull config)
  * [issue #259](https://github.com/heron-mc/heron-mc/issues/259)	- Defect - Support up/download of GPX and KML in Editor
  * [issue #262](https://github.com/heron-mc/heron-mc/issues/262):	- Defect -  Icon stays depressed when "id" is declared
  * [issue #268](https://github.com/heron-mc/heron-mc/issues/268) - Enhancement -	Allow for explicit WFS protocol configuration for GXP QueryPanel
  * [issue #269](https://github.com/heron-mc/heron-mc/issues/269)	Missing i18n strings in 'FeatureGridPanel.js'
  * [issue #271](https://github.com/heron-mc/heron-mc/issues/271)	- Enhancement - FeatureInfo, 'identify' for Vector/WFS Layers
  * [issue #274](https://github.com/heron-mc/heron-mc/issues/274)	FeatureInfoPanel with no response (trunk [r1036](https://code.google.com/p/geoext-viewer/source/detail?r=1036))
  * [issue #277](https://github.com/heron-mc/heron-mc/issues/277)	- Enhancement - Heron Layer configuration as true config

Other
  * Show Heron version and Service/Proxy URL info in JS console at startup
  * Made all examples UTF-8 and valid (X)HTML for http://validator.w3.org

Dutch Kadaster - Sponsored new features:

GetFeatureInfo/WFS Result Grid integration (solves these 3 issues):

  * [issue #239](https://github.com/heron-mc/heron-mc/issues/239)	- Enhancement - Integrate GFI Grid and FeatureGrid
  * [issue #240](https://github.com/heron-mc/heron-mc/issues/240)	 - Enhancement -  GFI: when WFS present and configured do WFS query i.s.o. WMS GFI
  * [issue #211](https://github.com/heron-mc/heron-mc/issues/211) -Enhancement -	Export GetFeatureInfo to additional formats like GML, GeoJSON and WKT

  * [issue #242](https://github.com/heron-mc/heron-mc/issues/242)	 - Enhancement - Allow importing of new vector Layers
  * [issue #243](https://github.com/heron-mc/heron-mc/issues/243)	 - Enhancement - Allow Editor as scratchlayer
  * [issue #244](https://github.com/heron-mc/heron-mc/issues/244)	 - Enhancement - Allow upload/import of advanced vector formats: CSV
  * [issue #245](https://github.com/heron-mc/heron-mc/issues/245)	 - Enhancement - Allow upload/import of advanced vector formats: ESRI Shapefiles

## Release 0.74  - July 17, 2013 ##

Mainly bugfixes and some minor enhancements on v0.73.

  * French translation contributed by Bruno Friedmann. Merci!
  * [issue #254](https://github.com/heron-mc/heron-mc/issues/254):	Patch for /trunk/heron/lib/i18n/cs\_CZ.js (by Martin Kokeš)

  * [issue #191](https://github.com/heron-mc/heron-mc/issues/191)  - Defect -  TMS maps mis-projected in when printing (GeoExt issue)
  * [issue #207](https://github.com/heron-mc/heron-mc/issues/207)	- Enhancement -Adding example with fixed panels layout (minor updates, see 0.73)
  * [issue #215](https://github.com/heron-mc/heron-mc/issues/215)	 - Defect -   Two layers with same data source show up wrong in Feature Info
  * [issue #225](https://github.com/heron-mc/heron-mc/issues/225)	  - Defect -  	  Layer list contains all layers
  * [issue #226](https://github.com/heron-mc/heron-mc/issues/226)	  - Defect -   Feature Information issues - no layers and no results.
  * [issue #227](https://github.com/heron-mc/heron-mc/issues/227)	  - Defect -   maxFeatures not being used
  * [issue #229](https://github.com/heron-mc/heron-mc/issues/229)	  - Defect -   	 Some quirks in the BookmarksPanel
  * [issue #234](https://github.com/heron-mc/heron-mc/issues/234) -  Defect - BaseLayerCombo - API params not working correct
  * [issue #235](https://github.com/heron-mc/heron-mc/issues/235) 	 - Defect -  hr\_formsearchpanel field sent even when empty
  * [issue #236](https://github.com/heron-mc/heron-mc/issues/236) 	 - Defect -  Line features rendered wrongly when selected as search results
  * [issue #238](https://github.com/heron-mc/heron-mc/issues/238) - Defect -      PrintMapPanel exception - related to [issue ##191](https://github.com/heron-mc/heron-mc/issues/#191)
  * [issue #247](https://github.com/heron-mc/heron-mc/issues/247) 	- Enhancement - CoordSearchPanel - defects and wishes
  * [issue #249](https://github.com/heron-mc/heron-mc/issues/249) - Enhancement -	Upgrade to Ext JS 3.4.1.1
  * [issue #250](https://github.com/heron-mc/heron-mc/issues/250) - Enhancement - 	Move hosted JS libs to CDN (partly: Ext JS done, GeoExt awaiting Pull)
  * [issue #255](https://github.com/heron-mc/heron-mc/issues/255):	Patch for /trunk/heron/lib/widgets/LayerLegendPanel.js (support legendURL in Layer)
  * [issue #256](https://github.com/heron-mc/heron-mc/issues/256):	Second drop-down not populated when using hr\_searchbyfeaturepanel

## Release 0.73 - June 7, 2013 ##

  * [issue #163](https://github.com/heron-mc/heron-mc/issues/163) - bug - ActiveThemes opacity box stays open
  * [issue #184](https://github.com/heron-mc/heron-mc/issues/184) - defect -	ActiveLayersPanel.js - shows temporary helpers from OpenLayers.Control.SelectFeature control
  * [issue #185](https://github.com/heron-mc/heron-mc/issues/185) - bug - Fix OL #[bug 3608](https://github.com/heron-mc/heron-mc/issues/608) - Layer.Vector.setOpacity won't work inside Vector.rootContainer
  * [issue #190](https://github.com/heron-mc/heron-mc/issues/190) - bug -	"print preview demo" in Printing
  * [issue #194](https://github.com/heron-mc/heron-mc/issues/194) - enhancement -	Move Override Ext Ajax Request with OpenLayers Ajax Request to Heron
  * [issue #197](https://github.com/heron-mc/heron-mc/issues/197) - bug - Switching GetFeatureInfo formats gives JS error
  * [issue #198](https://github.com/heron-mc/heron-mc/issues/198) - Examples issues -  a.o. blanc baselayer added
  * [issue #200](https://github.com/heron-mc/heron-mc/issues/200) - bug - Setting xy\_precision=0 in the configuration has no effect.
  * [issue #201](https://github.com/heron-mc/heron-mc/issues/201) - bug - Caption of FeatureInfoPanel doesn't change when using nl\_NL.js (and other lang's)
  * [issue #202](https://github.com/heron-mc/heron-mc/issues/202) - Enhancement - Custom formatting of MapPanel xy coordinate text
  * [issue #203](https://github.com/heron-mc/heron-mc/issues/203) - Enhancement -	MapPanel without a bottom status bar
  * [issue #204](https://github.com/heron-mc/heron-mc/issues/204) -	Enhancement - MapPanel bottom status bar without an EPSG element.
  * [issue #205](https://github.com/heron-mc/heron-mc/issues/205) - Enhancement - FeatureInfoPanel for MapServer specific featureType
  * [issue #206](https://github.com/heron-mc/heron-mc/issues/206) -	Enhancement - Adding example for MapPanel with no bottom status bar
  * [issue #207](https://github.com/heron-mc/heron-mc/issues/207) -	Enhancement - Adding example with fixed panels layout
  * [issue #212](https://github.com/heron-mc/heron-mc/issues/212):	PrintPreview.js isn't minified
  * [issue #221](https://github.com/heron-mc/heron-mc/issues/221):	Placement of cancel/search button assumption
  * [issue #219](https://github.com/heron-mc/heron-mc/issues/219):	Download file issues w/ 0.73rc3
  * [issue #230](https://github.com/heron-mc/heron-mc/issues/230):	allow multiple WFS URLs (Array)  configured in form search panel:

Project Warwickshire

  * [issue #179](https://github.com/heron-mc/heron-mc/issues/179) - Enhancement - Ability for Users to save "Bookmarks"
  * [issue #180](https://github.com/heron-mc/heron-mc/issues/180) - Enhancement - Tooltips for data
  * [issue #177](https://github.com/heron-mc/heron-mc/issues/177) - Enhancement - Advanced Selection Tools
  * [issue #178](https://github.com/heron-mc/heron-mc/issues/178) - Enhancement - Select by Existing Feature
  * [issue #175](https://github.com/heron-mc/heron-mc/issues/175) - Enhancement - Multiple Searches
  * [issue #181](https://github.com/heron-mc/heron-mc/issues/181) - Enhancement - Query functionality
  * [issue #199](https://github.com/heron-mc/heron-mc/issues/199) -	Issues in Advanced Editor (for 0.73 release)
  * [issue #176](https://github.com/heron-mc/heron-mc/issues/176) - add on - Enhancement - integrated "Draw Regular Polygons" (squares, triangles etc) into Editor/Redlining

## Release 0.72 - March 30, 2013 ##

Fixes on 0.71

  * [issue #162](https://github.com/heron-mc/heron-mc/issues/162) - bug -	'x-panel-header' height causes IE8 design defects
  * [issue #157](https://github.com/heron-mc/heron-mc/issues/157) -	Typo - "none-grid"
  * [issue #153](https://github.com/heron-mc/heron-mc/issues/153) -	Radio button issue with Active Layers
  * [issue #182](https://github.com/heron-mc/heron-mc/issues/182) - bug - FAO WMS Layers have been renamed, update Heron examples accordingly
  * [issue #186](https://github.com/heron-mc/heron-mc/issues/186) - bug - Missing option (for projection) in ToolbarBuilder.js

Project Warwickshire

  * [issue #176](https://github.com/heron-mc/heron-mc/issues/176) - Enhancement - Drawing tools - draw (annotate) on the map - Integrates/Enhances OpenLayers Editor:  See example: http://lib.heron-mc.org/heron/latest/examples/editorbasics/

Enhancements

  * [issue #164](https://github.com/heron-mc/heron-mc/issues/164) -	Feature Info - use Layer Name (Label) from Layer when possible
  * [issue #160](https://github.com/heron-mc/heron-mc/issues/160) -	heron.cgi location as a variable
  * [issue #168](https://github.com/heron-mc/heron-mc/issues/168) -	Popup window for WMS GetFeatureInfo (Identify)
  * [issue #169](https://github.com/heron-mc/heron-mc/issues/169) - ExtJs themeing - rev 708 - make "greenery theme" more genericly usable
  * [issue #183](https://github.com/heron-mc/heron-mc/issues/183) - (and [issue #187](https://github.com/heron-mc/heron-mc/issues/187)) Patch for Czech language i18n: i18n/cs\_CZ.js (Martin Kokeš)

Other

  * ExtJS theming with example: http://lib.heron-mc.org/heron/latest/examples/theming
  * make popup window for GetFeatureInfo the default in all examples
  * added example of the old/original embedded FeatureInfoPanel: http://lib.heron-mc.org/heron/latest/examples/featureinfopanel
  * provide global var Heron.App for browser debug access to OL Map object and actual widget layout
  * more extensive Toolbar example http://lib.heron-mc.org/heron/latest/examples/toolbar-item
  * make title of contextbrowser panel (shortcuts/bookmarks) configurable (bug)
  * FeatureInfoPanel should also show WFS layer features when clicked (and enabled)
  * i18n : updated Danish translations (tak Bo Victor Thomsen)

## Release 0.71  - December, 18, 2012 ##

  * [issue #131](https://github.com/heron-mc/heron-mc/issues/131)	 - Enhancement -  GoTo XY enhancement	(fill in coordinates to pan/zoom to location)
  * [issue #149](https://github.com/heron-mc/heron-mc/issues/149) - Enhancement - More flexibility for custom MapPanel Toolbar configuration, e.g. user-menus
    * i18n: updated German translations (thanks to Michael Räder)

Bugfixes on 0.70.

  * [issue #133](https://github.com/heron-mc/heron-mc/issues/133)	- Defect	- LayerTreePanel: causes NULL error in GeoExt module 'LayerNode.js' line 91
  * [issue #134](https://github.com/heron-mc/heron-mc/issues/134)	- Defect	- ActiveLayersPanel + ActiveThemesPanel: only one baselayer radiobutton is shown
  * [issue #135](https://github.com/heron-mc/heron-mc/issues/135)	 - Defect	- ActiveLayersPanel + ActiveThemesPanel: drag problems
  * [issue #136](https://github.com/heron-mc/heron-mc/issues/136) - Defect - default opacity changed on 0.70
  * [issue #142](https://github.com/heron-mc/heron-mc/issues/142) - Defect - FeatSelSearchPanel problems with Search Layer order and ActiveLayers with layerOn defined
  * [issue #144](https://github.com/heron-mc/heron-mc/issues/144) - Defect - 	Printing Vector Layer with Legends enabled gives GeoExt JS error
  * [issue #154](https://github.com/heron-mc/heron-mc/issues/154) 	Coordinate search does not work on epsg:900913 (enhancement: allow coordinate entry in any EPSG)

Enhancements for 0.70 Printing.
  * [issue #137](https://github.com/heron-mc/heron-mc/issues/137)	- Enhancement	 - Print Preview performance
  * [issue #138](https://github.com/heron-mc/heron-mc/issues/138)	- Enhancement  -Print Preview legends
  * [issue #139](https://github.com/heron-mc/heron-mc/issues/139)	- Enhancement	 - Print Direct Configuration
  * [issue #140](https://github.com/heron-mc/heron-mc/issues/140)	- Enhancement -  Print Preview Configuration
  * [issue #143](https://github.com/heron-mc/heron-mc/issues/143):	- Enhancement - Printing : render highlighted features

First Version of ActiveThemesPanel (may replace ActiveLayersPanel later), see example:
http://lib.heron-mc.org/heron/latest/examples/activethemes
by Wolfram Winter

PDOK PreviewApp: see http://apps.heron-mc.org/previewapp
  * [issue #147](https://github.com/heron-mc/heron-mc/issues/147)	 - Enhancement -  Add PDOK PreviewApp to Heron Subversion
  * [issue #146](https://github.com/heron-mc/heron-mc/issues/146)	 - Defect - PreviewApp does not load when index.html is used
  * [issue #145](https://github.com/heron-mc/heron-mc/issues/145)	- Enhancement - Port back and enhance scale-dependent LayerNode enabling/disabling

Bugfix on OpenLayers 2.12 for Atom Feed Polygon parsing via override:
https://github.com/openlayers/openlayers/issues/789

## Release 0.70  - October 30, 2012 ##
  * [issue #58](https://github.com/heron-mc/heron-mc/issues/58) - Enhancement- Use more general and free WMS services in all examples
  * [issue #88](https://github.com/heron-mc/heron-mc/issues/88) - Enhancement -	Permalink support
  * [issue #118](https://github.com/heron-mc/heron-mc/issues/118) - Enhancement - Make OpenLayers Map Controls configurable
  * [issue #123](https://github.com/heron-mc/heron-mc/issues/123)  - Enhancement - 	Integrate OpenLayers 2.12
  * [issue #129](https://github.com/heron-mc/heron-mc/issues/129) - bug - Overriding LayerLegendPanel default config has no effect

Czech i18N thanks to Martin Kokeš

Left overs from Deutsche Bahn issues (thanks Wolfram)
  * [issue # 125](https://github.com/heron-mc/heron-mc/issues/125) - Defect - ActiveLayersPanel: wrong layer dragging
  * [issue # 126](https://github.com/heron-mc/heron-mc/issues/126) - Defect - ActiveLayersPanel: double click fault
  * [issue #130](https://github.com/heron-mc/heron-mc/issues/130) - Defect - Tab items in the feature info panel disappear when shrinking the panel

Development sponsored by RVOB (thanks!), Printing:
  * [issue #15](https://github.com/heron-mc/heron-mc/issues/15) - Enhancement - Provide printing facilities

Development sponsored by RVOB (thanks!), GetFeatureInfo improvements:
  * [issue #23](https://github.com/heron-mc/heron-mc/issues/23) 	- Enhancement - automatically detect hyperlinks in getfeatureinfo
  * [issue #76](https://github.com/heron-mc/heron-mc/issues/76) - Enhancement -  Configurable hyperlink-substitution for dedicated columns in GetFeatureInfo results
  * [issue #80](https://github.com/heron-mc/heron-mc/issues/80) - Enhancement - Make different output formats GeoFeatureInfo Panel configurable
  * [issue #81](https://github.com/heron-mc/heron-mc/issues/81) - Enhancement - Make the output of GeoFeatureInfo exportable
  * [issue #82](https://github.com/heron-mc/heron-mc/issues/82) - Enhancement - Make text in grid for GetFeatureInfoPanel selectable
  * [issue #91](https://github.com/heron-mc/heron-mc/issues/91) - Enhancement - Add possibility to set title of featureinfo tab

## Release 0.68  - July 20, 2012 ##
  * i18n: German translations (thanks to Michael Räder)
  * [issue #90](https://github.com/heron-mc/heron-mc/issues/90) - Measure tools give incorrect values for geodesic projections
  * [issue #92](https://github.com/heron-mc/heron-mc/issues/92) - FeatureInfoPanel grid table shows "Unknown" label for raster/coverage (ESRI !) WMS
  * CapabilitiesTreePanel: optional config for OpenLayers Layer object: "layerOptions" and "layerParams" via hropts

Fixes and enhancements thanks to and integrated from contribs by Wolfram Winter (Deutsche Bahn):
  * [issue #93](https://github.com/heron-mc/heron-mc/issues/93) - Defect -	After clicking on the zoom-extend button in the toolbar the button remains deactivated
  * [issue #94](https://github.com/heron-mc/heron-mc/issues/94) - Enhancement -	Need a scale combo box in toolbar
  * [issue #95](https://github.com/heron-mc/heron-mc/issues/95) - Enhancement -	Add EPSG info bottom bar MapPanel
  * [issue #96](https://github.com/heron-mc/heron-mc/issues/96) - Enhancement -	Pan/Zoom buttons and style changes
  * [issue #104](https://github.com/heron-mc/heron-mc/issues/104) - Enhancement - override-openlayers.js contains code for issues in OL which are fixed in OL 2.11
  * [issue #105](https://github.com/heron-mc/heron-mc/issues/105) - Several i18n quirks - missing entries, wrong NL assignment, etc.
  * [issue #106](https://github.com/heron-mc/heron-mc/issues/106) -	Enhancements and fixes to measure tools
  * [issue # 107](https://github.com/heron-mc/heron-mc/issues/107) - Need a lean Heron demo for newbies showing a basic configuration
  * [issue #108](https://github.com/heron-mc/heron-mc/issues/108) - Zoom slider - is not using i18n
  * [issue #109](https://github.com/heron-mc/heron-mc/issues/109) - Move DefaultConfig.js and DefaultOptions.js files from the lib to the examples folder
  * [issue # 110](https://github.com/heron-mc/heron-mc/issues/110) - Typo in 'Feature Info' i18 Strings in Feature(Info)Panel.js
  * [issue #111](https://github.com/heron-mc/heron-mc/issues/111) - Putting the 'hr\_layerlegendpanel' inside a 'tabpanel' doesn't work correct
  * [issue #112](https://github.com/heron-mc/heron-mc/issues/112)  - Defect  - ContextBrowserPanel incorrect when changing baselayer
  * [issue #113](https://github.com/heron-mc/heron-mc/issues/113)  - Defect -  ActiveLayersPanel: active layer entries not deleted when 'hropts' undefined
  * [issue #114](https://github.com/heron-mc/heron-mc/issues/114)  - Defect -  ActiveLayersPanel : baselayers sort order incorrect when changing baselayer
  * [issue #115](https://github.com/heron-mc/heron-mc/issues/115)  - Defect - ActiveLayersPanel : baselayer tree entries not updated when changing baselayer from shortcuts or baselayer-combo
  * [issue # 117](https://github.com/heron-mc/heron-mc/issues/117) - Enhancement - Add BaseLayerComboBox
  * [issue # 119](https://github.com/heron-mc/heron-mc/issues/119) - Defect -  	 SearchPanel.js layeropts implementation does not switch Baselayers
  * [issue # 120](https://github.com/heron-mc/heron-mc/issues/120) - Enhancement -  ContextBrowserPanel enhancements (new shortcut types) and fixes
  * [issue # 121](https://github.com/heron-mc/heron-mc/issues/121) - Defect - Toolbar items in the map panel disappear when shrinking the panel
  * [issue # 122](https://github.com/heron-mc/heron-mc/issues/122) - Enhancement -  Need a 'real' WFS combobox for universal use.

## Release 0.67  - May 24, 2012 ##

  * [issue #22](https://github.com/heron-mc/heron-mc/issues/22) 	- Defect - Tame GetLegendPanel requests
  * [issue #74](https://github.com/heron-mc/heron-mc/issues/74) - 	WMS FeatureInfo JavaScript error when Image layers present
  * [issue #75](https://github.com/heron-mc/heron-mc/issues/75) - Defect - 	WFS search wildcard behaviour
  * [issue #83](https://github.com/heron-mc/heron-mc/issues/83) - Enhancement - 	Upgrade to GeoExt 1.1
  * [issue #86](https://github.com/heron-mc/heron-mc/issues/86) - Enhancent Request on WFS Searchpanel
  * i18n : Italian translations


## Release 0.66  - December, 2011 ##
  * [issue #55](https://github.com/heron-mc/heron-mc/issues/55) - Enhancement  - Enhance WFS SearchPanel with showing GetFeature results and zooming in
  * [issue #69](https://github.com/heron-mc/heron-mc/issues/69) 	- Enhancement - WFS search behaviour on collection
  * none - exclude Spanish from JS build (other Spanish is default lang)
  * [issue #71](https://github.com/heron-mc/heron-mc/issues/71) 	- Defect 	- Started  featureInfoFormat ignored in configutation
  * [issue #72](https://github.com/heron-mc/heron-mc/issues/72) 	- Enhancement - Upgrade all examples and documentation to use OpenLayers 2.11
  * [issue #73](https://github.com/heron-mc/heron-mc/issues/73) - Defect -	Many examples are broken

## Release 0.65  - August 18, 2011 ##
  * [issue #68](https://github.com/heron-mc/heron-mc/issues/68) 	- Defect - shortcuts screw up active layers panel

## Release 0.64 - July 19, 2011 ##
  * [issue #54](https://github.com/heron-mc/heron-mc/issues/54) - Defect - FeatureInfoPanel renders "Unknown" featuretype label
  * [issue #65](https://github.com/heron-mc/heron-mc/issues/65) 	- Defect - Layer opacity problems in ActiveLayersPanel
  * [issue #66](https://github.com/heron-mc/heron-mc/issues/66) 	- Defect - LoadingPanel shows too many services when using ActiveLayersPanel
  * website design changes + logo by Milo

## Release 0.63 - June 30, 2011 ##
  * [issue #49](https://github.com/heron-mc/heron-mc/issues/49) -	Defect- Drag and drop layer stacking in ActiveLayersPanel is incorrect
  * [issue #57](https://github.com/heron-mc/heron-mc/issues/57) -	Defect- Featureinfo on multiple layers not always working
  * [issue #59](https://github.com/heron-mc/heron-mc/issues/59) - Enhancement - onSearchCompleteAction - zoom to Bounds instead of center and zoom to fixed
  * [issue #60](https://github.com/heron-mc/heron-mc/issues/60) - Other - loading sequence for i18n documented wrong
  * [issue #61](https://github.com/heron-mc/heron-mc/issues/61) - Defect - Do not include Heron.i18n.dict in heron.js and DynLoader.js
  * [issue #62](https://github.com/heron-mc/heron-mc/issues/62) - Defect - i18n bug "Measure Area" should be "Measure area"
  * Danish translations thanks to Victor Thomsen

## Release 0.62 - June 27, 2011 ##
  * [issue #33](https://github.com/heron-mc/heron-mc/issues/33) 	- 	Enhancement	- Self-configuring layers from configured WMS URL
  * [issue #52](https://github.com/heron-mc/heron-mc/issues/52) - Enhancement - Multiple views for WMS FeatureInfo data
  * [issue #56](https://github.com/heron-mc/heron-mc/issues/56) -	Enhancement- Name search toolbar combobox using  OpenLS XLS FUL search protocol

## Release 0.61 - June 20, 2011 - Fixes Release ##
  * [issue #40](https://github.com/heron-mc/heron-mc/issues/40) 	- 	Enhancement 	- No sorting in getfeatureinfo grid   - Usability
  * [issue #49](https://github.com/heron-mc/heron-mc/issues/49) 	- Defect - Drag and drop layer stacking in ActiveLayersPanel is incorrect  - Usability
  * [issue #50](https://github.com/heron-mc/heron-mc/issues/50) - Defect  - FeatureInfoPanel : tabs don't show feature type (tab title) anymore
  * [issue #51](https://github.com/heron-mc/heron-mc/issues/51) - Defect - Loading Panel does not show text on Internet Explorer

## Release 0.6 - June 1, 2011 ##
  * [issue #29](https://github.com/heron-mc/heron-mc/issues/29) -	Task - 	Create technical documentation
  * [issue #47](https://github.com/heron-mc/heron-mc/issues/47) -  Defect 	- Opacity slider in ActiveLayersPanel takes over last opacity value
  * [issue #48](https://github.com/heron-mc/heron-mc/issues/48) -	Enhancement - SearchPanel should provide user with visual feedback   - Usability

## Release 0.5 - May 26, 2011 ##
  * [issue #6](https://github.com/heron-mc/heron-mc/issues/6) 	- Enhancement - Select a layer/theme to be 'active'
  * [issue #12](https://github.com/heron-mc/heron-mc/issues/12) 	- Enhancement - Enhance the layer manager   Usability
  * [issue #35](https://github.com/heron-mc/heron-mc/issues/35) 	- Enhancement - Build script for minified and debuggable JavaScript
  * [issue #36](https://github.com/heron-mc/heron-mc/issues/36) 	- Enhancement - Build script to create downloadable product   Usability
  * [issue #41](https://github.com/heron-mc/heron-mc/issues/41) 	- Enhancement -  Name change for geoext-viewer to Heron MC (Mapping Client)
  * [issue #42](https://github.com/heron-mc/heron-mc/issues/42) 	- Enhancement - Allow Heron MC map app embedding in div in page and provide an example
  * [issue #43](https://github.com/heron-mc/heron-mc/issues/43) 	- Enhancement - NameSearch via combobox   Usability
  * [issue #45](https://github.com/heron-mc/heron-mc/issues/45) 	- Enhancement - Default autolaunch Heron app and example for explicit launch
  * [issue #46](https://github.com/heron-mc/heron-mc/issues/46) 	- Enhancement - Make English (en\_US) the default language within i18n system  - Usability
  