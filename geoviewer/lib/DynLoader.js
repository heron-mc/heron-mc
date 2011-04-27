(function() {

	var singleFile = (typeof heron == "object" && heron.singleFile);

	/**
	 * Relative path of this script.
	 */
	var scriptName = (!singleFile) ? "lib/DynLoader.js" : "DynLoader.js";
	var jsFiles = window.heron;
	window.heron = {
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
			for (var i = 0, len = s.length; i < len; i++) {
				src = s[i].getAttribute('src');
				if (src) {
					var m = src.match(r);
					if (m) {
						l = m[1];
						break;
					}
				}
			}
			return (function() {
				return l;
			});
		})()
	};

	/**
	 * heron.singleFile is a flag indicating this file is being included
	 * in a Single File Library build of the heron Library.
	 *
	 * When we are *not* part of a SFL build we dynamically include the
	 * OpenLayers library code.
	 *
	 * When we *are* part of a SFL build we do not dynamically include the
	 * heron library code as it will be appended at the end of this file.
	 */
	if (!singleFile) {
		if (!jsFiles) {
			jsFiles = [
				"i18n.js",
				"override-openlayers.js",
				"ContainerPanel.js",
				"FeatureInfoPanel.js",
				"FeatureTypeContainer.js",
				"GeoViewer.js",
				"LoadingPanel.js",
				"MapPanel.js",
				"MenuPanel.js",
				"ThemeNode.js",
				"ToolbarBuilder.js"
			];
		}

		// use "parser-inserted scripts" for guaranteed execution order
		// http://hsivonen.iki.fi/script-execution/
		var scriptTags = new Array(jsFiles.length);
		var host = heron._getScriptLocation() + "lib/";
		for (var i = 0, len = jsFiles.length; i < len; i++) {
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
heron.VERSION_NUMBER = "TRUNK";
