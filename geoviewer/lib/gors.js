(function() {

	var singleFile = (typeof gors == "object" && gors.singleFile);
	   
	/**
	 * Relative path of this script.
	 */
    	var scriptName = (!singleFile) ? "lib/gors.js" : "gors.js";
	var jsFiles = window.gors;
    	window.gors = {
        /**
         * Method: _getScriptLocation
         * Return the path to this script. This is also implemented in
         * OpenLayers/SingleFile.js
         *
         * Returns:
         * {String} Path to this script
         */
        _getScriptLocation: (function() {
            var r = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)"),
                s = document.getElementsByTagName('script'),
                src, m, l = "";
            for(var i=0, len=s.length; i<len; i++) {
                src = s[i].getAttribute('src');
                if(src) {
                    var m = src.match(r);
                    if(m) {
                        l = m[1];
                        break;
                    }
                }
            }
            return (function() { return l; });
        })()
    };

    /**
     * gors.singleFile is a flag indicating this file is being included
     * in a Single File Library build of the gors Library.
     * 
     * When we are *not* part of a SFL build we dynamically include the
     * OpenLayers library code.
     * 
     * When we *are* part of a SFL build we do not dynamically include the 
     * gors library code as it will be appended at the end of this file.
     */
    if(!singleFile) {
        if (!jsFiles) {
            jsFiles = [
		"i18n.js",
		"FeatureInfoPanel.js",
		"LoadingPanel.js",
		"MapPanel.js",
		"ContainerPanel.js",
		"ToolbarBuilder.js",
		"GeoViewer.js",
		"ThemeNode.js",
		"FeatureTypeContainer.js"
            ]; // etc.
        }

        // use "parser-inserted scripts" for guaranteed execution order
        // http://hsivonen.iki.fi/script-execution/
        var scriptTags = new Array(jsFiles.length);
        var host = gors._getScriptLocation() + "lib/";
        for (var i=0, len=jsFiles.length; i<len; i++) {
            scriptTags[i] = "<script src='" + host + jsFiles[i] +
                                   "'></script>"; 
        }
        if (scriptTags.length > 0) {
            document.write(scriptTags.join(""));
        }
    }
})();

/**
 * Constant: VERSION_NUMBER
 */
gors.VERSION_NUMBER="0.3";
