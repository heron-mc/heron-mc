Ext.namespace("Heron.options");
Ext.namespace("Heron.options.map");
Ext.namespace("Heron.options.layertree");
Ext.namespace("PreviewApp");
Ext.namespace("PreviewApp.config");

PreviewApp.version = '1.0.4';

PreviewApp.config.parser = {
	includedLayers:[],
	parse:function (xml) {
		Heron.options.map.settings = this.parseMap(xml);

		Heron.options.layertree.tree = this.parseTree(xml);

		Heron.options.map.layers = this.blankLayer().concat (
				this.parseTMS(xml),
				this.parseWMTS(xml),
				this.parseWMS(xml),
				this.parseWFS(xml, Heron.options.map.settings.projection),
				this.parseAtom(xml),
				this.includedLayers
				);
	},

	blankLayer:function () {
		//blank layer to prevent problems in case the config contains no baselayers
		var result = new Array();
		var blank = new OpenLayers.Layer.Image(
				"Blank",
				"images/blank.gif",
				OpenLayers.Bounds.fromString(Heron.options.map.settings.maxExtent),
				new OpenLayers.Size(10, 10),
	        	{resolutions: Heron.options.map.settings.resolutions, 
				 isBaseLayer: true,
				 visibility: true,
				 displayInLayerSwitcher: true}
		);
		result.push(blank);	
		
		return result;
	},

	parseMap:function (xml) {
		var title = this.getTextContent('contextCollection > title', xml);
		var baseUrl = this.getTextContent('contextCollection > baseUrl', xml);
		var projection = this.getTextContent('projection', xml);
		var units = this.getTextContent('units', xml);
		var resolutions = this.getNumberArrayContent('resolutions', xml);
		var maxExtent = this.getTextContent('maxExtent', xml);
		var center = this.getTextContent('center', xml);
		var xyPrecision = this.getNumberContent('xyPrecision', xml);
		var zoom = this.getNumberContent('zoom', xml);
		var allOverlays = this.getBooleanContent('allOverlays', xml, true);

		var result = {
			title:title,
			baseUrl:baseUrl,
			projection:projection,
			units:units,
			resolutions:resolutions,
			maxExtent:maxExtent,
			center:center,
			xy_precision:xyPrecision,
			zoom:zoom,
			theme:null,
			allOverlays:allOverlays
		};

		return result;
	},

	parseWMTS:function (xml) {
		var result = new Array();
		var nodes = Ext.DomQuery.jsSelect('wmtsLayer', xml);
		for (var i = nodes.length - 1; i >= 0; i--) {
			// Generic
			var title = this.getTextContent('title', nodes[i]);
			var url = this.getLayerUrlContent('url', nodes[i]);
			var isBaseLayer = this.getBooleanContent('isBaseLayer', nodes[i]);
			var opacity = this.getNumberContent('opacity', nodes[i]);
			var isTransparent = this.getBooleanContent('isTransparent', nodes[i]);
			var isVisible = this.getBooleanContent('isVisible', nodes[i]);

			// WMTS specific
			var layer = this.getTextContent('layer', nodes[i]);
			var style = this.getTextContent('style', nodes[i]);
			var matrixSet = this.getTextContent('matrixSet', nodes[i]);
			var matrixIds = this.getTextArrayContent('matrixIds', nodes[i]);
			var format = this.getTextContent('format', nodes[i]);

			var config = {
				name:title,
				url:url,
				isBaseLayer:isBaseLayer,
				opacity:opacity,
				transparent:isTransparent,
				visibility:isVisible,
				layer:layer,
				style:style,
				matrixSet:matrixSet,
				matrixIds:matrixIds,
				format:format
			};

			this.addResolutions(config, nodes[i]);

			var wmtsLayer = new OpenLayers.Layer.WMTS(config);
			result.push(wmtsLayer);
		}
		return result;
	},

	parseTMS:function (xml) {
		var result = new Array();
				
		var nodes = Ext.DomQuery.jsSelect('tmsLayer', xml);
		for (var i = nodes.length - 1; i >= 0; i--) {
			// Generic
			var title = this.getTextContent('title', nodes[i]);
			var url = this.getLayerUrlContent('url', nodes[i]);
			var isBaseLayer = this.getBooleanContent('isBaseLayer', nodes[i]);
			var opacity = this.getNumberContent('opacity', nodes[i]);
			var isTransparent = this.getBooleanContent('isTransparent',
					nodes[i]);
			var isVisible = this.getBooleanContent('isVisible', nodes[i]);

			// TMS specific
			var layername = this.getTextContent('layername', nodes[i]);
			var type = this.getTextContent('type', nodes[i]);
			var bgColor = this.getTextContent('bgColor', nodes[i]);
			var isSingleTile = this.getBooleanContent('isSingleTile', nodes[i]);
			var isAlpha = this.getBooleanContent('isAlpha', nodes[i]);
			var config = {
				isBaseLayer:isBaseLayer,
				opacity:opacity,
				transparent:isTransparent,
				visibility:isVisible,
				layername:layername,
				type:type,
				bgcolor:bgColor,
				singleTile:isSingleTile,
				alpha:isAlpha
			};

			this.addResolutions(config, nodes[i]);

			var tmsLayer = new OpenLayers.Layer.TMS(title, url, config);
			result.push(tmsLayer);
		}
		return result;
	},

	parseWMS:function (xml) {
		var result = new Array();
		var nodes = Ext.DomQuery.jsSelect('wmsLayer', xml);
		for (var i = nodes.length - 1; i >= 0; i--) {
			// Generic
			var title = this.getTextContent('title', nodes[i]);
			var url = this.getLayerUrlContent('url', nodes[i]);
			var isBaseLayer = this.getBooleanContent('isBaseLayer', nodes[i]);
			var opacity = this.getNumberContent('opacity', nodes[i]);
			var isTransparent = this.getBooleanContent('isTransparent',
					nodes[i]);
			var isVisible = this.getBooleanContent('isVisible', nodes[i]);

			// WMS specific
			var layers = this.getTextContent('layers', nodes[i]);
			var format = this.getTextContent('format', nodes[i]);
			var featureInfoFormat = this.getTextContent('featureInfoFormat',
					nodes[i]);
			var isAlpha = this.getBooleanContent('isAlpha', nodes[i]);
			var isSingleTile = this.getBooleanContent('isSingleTile', nodes[i]);

			var config = {
				isBaseLayer:isBaseLayer,
				singleTile:isSingleTile,
				visibility:isVisible,
				alpha:isAlpha,
				opacity:opacity,
				featureInfoFormat:featureInfoFormat
			};
			this.addResolutions(config, nodes[i]);

			var wmsLayer = new OpenLayers.Layer.WMS(title, url, {
				layers:layers,
				format:format,
				transparent:isTransparent
			}, config);

			result.push(wmsLayer);
		}
		return result;
	},

	parseWFS:function (xml, srsName) {
		var result = new Array();
		var nodes = Ext.DomQuery.jsSelect('wfsLayer', xml);
		for (var i = nodes.length - 1; i >= 0; i--) {
			// Generic
			var title = this.getTextContent('title', nodes[i]);
			var url = this.getLayerUrlContent('url', nodes[i]);
			var isVisible = this.getBooleanContent('isVisible', nodes[i]);

			// WFS specific
			var wfsVersion = this.getTextContent('wfsVersion', nodes[i]);
			var wfsFeatureNamespace = this.getTextContent('wfsFeatureNamespace', nodes[i]);

			// Optioneel: featurePrefix
			var wfsFeaturePrefix = this.getTextContent('wfsFeaturePrefix', nodes[i]);
			var wfsFeatureType = this.getTextContent('wfsFeatureType', nodes[i]);
			var wfsMaxFeatures = this.getNumberContent('wfsMaxFeatures', nodes[i]);
			var wfsGeometryElement = this.getTextContent('wfsGeometryElement', nodes[i]);

			// Optioneel: outputFormat
			var wfsOutputFormat = this.getTextContent('wfsOutputFormat', nodes[i]);
			var styleMap = this.getStyleContent('styleMap', nodes[i]);

			// TODO: we moeten voor GML v3.2.1 (INSPIRE) de juiste reader configureren
			var readFormat = new OpenLayers.Format.GML.v3({
				featureType:this.featureType,
				featureNS:this.featureNS,
				geometryName:'wfsGeometryElement'
			});

			var config = {
				strategies:[new OpenLayers.Strategy.BBOX({ratio:1, resFactor:1}) ],
				projection:new OpenLayers.Projection(srsName),
				styleMap:styleMap,
				protocol:new OpenLayers.Protocol.WFS({
					version:wfsVersion,
					srsName:srsName,
					url:url,
					featureNS:wfsFeatureNamespace,
					featurePrefix:wfsFeaturePrefix,
					featureType:wfsFeatureType,
					maxFeatures:wfsMaxFeatures,
					geometryName:wfsGeometryElement,
					outputFormat:wfsOutputFormat
				}),
				visibility:isVisible
			};

			this.addResolutions(config, nodes[i]);

			var wfsLayer = new OpenLayers.Layer.Vector(title, config);

			result.push(wfsLayer);
		}
		return result;
	},

	parseAtom:function (xml) {
		var result = new Array();
		var nodes = Ext.DomQuery.jsSelect('atomLayer', xml);

		// Atom GeoRSS standard has coordinates in EPSG:4326 (lat/lon)
		var epsg4326 = new OpenLayers.Projection("EPSG:4326");

		for (var i = nodes.length - 1; i >= 0; i--) {
			// Generic options
			var title = this.getTextContent('title', nodes[i]);
			var url = this.getLayerUrlContent('url', nodes[i]);
			var isBaseLayer = this.getBooleanContent('isBaseLayer', nodes[i]);
			var isVisible = this.getBooleanContent('isVisible', nodes[i]);

			var config = {
					strategies:[new OpenLayers.Strategy.Fixed()],
					projection:epsg4326,
					protocol:new OpenLayers.Protocol.HTTP({
						url:url,
						format:new OpenLayers.Format.Atom()
					}),
					visibility:isVisible
				};
			
			this.addResolutions(config, nodes[i]);
		
			var atomLayer = new OpenLayers.Layer.Vector(title, config);

			// Create OpenLayers GeoRSS Layer for Atom URL
//			var atomLayer = new OpenLayers.Layer.GeoRSS(title, url, {
//				isBaseLayer : isBaseLayer,
//				visibility : isVisible,
//				projection: epsg4326
//			});

			result.push(atomLayer);
		}
		return result;
	},
	parseTree:function (xml) {
		var result = new Array();

		var rootNode = Ext.DomQuery.select('contextCollection', xml)[0];
		this.parseTreeNode(rootNode, result);

		return result;
	},

	parseTreeNode:function (node, tree) {
		var children = node.childNodes;
		for (var i = 0; i < children.length; i++) {
			var node = children[i];

			if (node.tagName == 'contextFolder') {
				var isExpanded = this.getBooleanContent('isExpanded', node);
				var folder = {
					text:this.getTextContent("title", node),
					expanded:isExpanded,
					children:new Array()
				};
				tree.push(folder);
				this.parseTreeNode(node, folder.children);

			} else if (node.tagName == 'context') {
				var url = Ext.DomQuery.jsSelect('>url', node);
				if (url.length) {
					var result = PreviewApp.config.configuration.load(this.getText(url[0]), true);
					var rootNode = Ext.DomQuery.select('contextCollection', result)[0];

					this.includedLayers = this.includedLayers.concat(
							this.parseTMS(result),
							this.parseWMTS(result),
							this.parseWMS(result),
							this.parseWFS(result, Heron.options.map.settings.projection),
							this.parseAtom(result));

					this.parseTreeNode(rootNode, tree);
				}
				else {
					var titles = Ext.DomQuery.jsSelect('title', node);
					var layers = new Array();
					for (var j = 1; j < titles.length; j++) {
						var layerType = titles[j].parentNode.nodeName;
						var layer = {
							nodeType:'gx_layer',
							iconCls: "hr-tree-node-icon-" + layerType,
							layer:this.getText(titles[j]),
							disabled:false
						};
						layers.push(layer);
					}
					var isExpanded = this.getBooleanContent('isExpanded', node);
					var folder = {
						text:this.getTextContent("title", node),
						expanded:isExpanded,
						children:layers
					};
					tree.push(folder);
				}
			}
		}
	},

	getText:function (node) {
		var result;
		if (window.ActiveXObject) {
			result = node.text;
		} else {
			result = node.textContent;
		}
		return result;
	},

	getTextContent:function (elementName, node) {
		var result;
		var child = Ext.DomQuery.selectNode(elementName, node);
		if (child) {
			result = this.getText(child);
		}
		return result;
	},

	getTextArrayContent:function (elementName, node) {
		var result = new Array();
		var text = this.getTextContent(elementName, node);
		if (text) {
			result = text.split(",");
		}
		return result;
	},

	getBooleanContent:function (elementName, node, defaultValue) {
		var result =  this.getTextContent(elementName, node);
		if (!result && defaultValue) {
			result = defaultValue;
		}
		return result === 'true';
	},

	getLayerUrlContent:function (elementName, node) {
		var result = this.getTextContent(elementName, node);
		if (result && result.indexOf("{baseUrl}") > -1) {
			var baseUrl = this.getTextContent("baseUrl", node.parentNode);
			if (baseUrl) {
				result = result.replace("{baseUrl}", baseUrl);
			} else if (Heron.options.map.settings && Heron.options.map.settings.baseUrl) {
				result = result.replace("{baseUrl}",
						Heron.options.map.settings.baseUrl);
			} else {
				alert("No base URL found for layer "
						+ this.getTextContent('title', node) + " in context "
						+ this.getTextContent('title', node.parentNode));
			}

		}
		return result;
	},

	getNumberContent:function (elementName, node) {
		var result;
		text = this.getTextContent(elementName, node);
		if (!isNaN(text)) {
			result = Number(text);
		}
		return result;
	},

	getNumberArrayContent:function (elementName, node) {
		var result = new Array();
		var text = this.getTextContent(elementName, node);
		if (text) {
			var array = text.split(",");
			for (var i = 0; i < array.length; i++) {
				result.push(Number(array[i]));
			}
		}
		return result;
	},

	getTextOrNumberContent:function (elementName, root) {
		var result;
		var text = this.getTextContent(elementName, root);
		if (isNaN(text)) {
			result = text;
		} else {
			result = Number(text);
		}
		return result;
	},

	getStyleContent:function (elementName, root) {
		var styleMapOptions = {};
		var node = Ext.DomQuery.selectNode(elementName, root);
		if (node) {
			var styleNodes = Ext.DomQuery.jsSelect('style', node);
			for (var i = 0; i < styleNodes.length; i++) {
				var styleName = this.getTextContent('name', styleNodes[i]);
				var propertyNodes = Ext.DomQuery.jsSelect('property',
						styleNodes[i]);
				var styleOptions = {};
				for (var j = 0; j < propertyNodes.length; j++) {
					var name = this.getTextContent('name', propertyNodes[j]);
					var value = this.getTextOrNumberContent('value',
							propertyNodes[j]);
					styleOptions[name] = value;
				}
				styleMapOptions[styleName] = new OpenLayers.Style(styleOptions);
			}
		}
		return new OpenLayers.StyleMap(styleMapOptions);
	},

	/*	addResolution : function(title, node) {
	 var mapResolutions = Heron.options.map.settings.resolutions;

	 var minResolution = this.getNumberContent('minResolution', node);
	 if (!minResolution)
	 {
	 minResolution = mapResolutions[mapResolutions.length - 1];
	 }

	 var maxResolution = this.getNumberContent('maxResolution', node);
	 if (!maxResolution)
	 {
	 maxResolution = mapResolutions[0];
	 }

	 PreviewApp.config.resolution.add(title, minResolution, maxResolution);
	 },  */
	addResolutions:function (properties, node) {
		var mapResolutions = Heron.options.map.settings.resolutions;

		var minResolution = this.getNumberContent('minResolution', node);
		if (!minResolution) {
			minResolution = mapResolutions[mapResolutions.length - 1];
		}
		properties['minResolution'] = minResolution;
		var maxResolution = this.getNumberContent('maxResolution', node);
		if (!maxResolution) {
			maxResolution = mapResolutions[0];
		}
		properties['maxResolution'] = maxResolution;
	}

};


PreviewApp.config.configuration = {
	getQueryString:function () {
		var queryString = {};
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			pair[0] = decodeURIComponent(pair[0]);
			pair[1] = decodeURIComponent(pair[1]);
			if (typeof queryString[pair[0]] === "undefined") {
				queryString[pair[0]] = pair[1];
			} else if (typeof queryString[pair[0]] === "string") {
				queryString[pair[0]] = [ queryString[pair[0]], pair[1] ];
			} else {
				queryString[pair[0]].push(pair[1]);
			}
		}
		return queryString;
	},

	getName:function () {
		var name = this.getQueryString()['config'];
		if (!name) {
			name = 'default';
		}
		return name;
	},

	parseName:function (name) {
		var url;
		if (name.indexOf('http://') == 0) {
			// Name points to a remote config file hosted by a web server
			url = window.location.search;
			url = url.replace(/\?config=/, "");
			url = decodeURIComponent(url);
			// Not required as OpenLayers GET handles this
			//			if (OpenLayers.ProxyHost) {
			//				url = OpenLayers.Request.makeSameOrigin(url, OpenLayers.ProxyHost);
			//			}
		} else {
			// Only a namestring (non-URL) given: this normally expands into the file: config/name.xml
			// unless a full path given
			url = "http://" + location.host + location.pathname;
			url = url.replace(/\/index.html/, "/");
			var configFile = 'config/' + name + '.xml';

			// Also allow a complete path to the config .xml file
			if (name.search(/\.xml/i) > 0) {
				configFile = name;
			}
			url = url + configFile;
		}
		return url;
	},

/*	getXmlHttpRequest:function () {
		var activeXObjects = [ "Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0",
			"Msxml2.XMLHTTP" ];
		var request = null;
		try {
			request = new XMLHttpRequest();
		} catch (u) {
			for (var i = 0; i < activeXObjects.length; ++i) {
				try {
					request = new ActiveXObject(activeXObjects[i]);
					break;
				} catch (u) {
				}
			}
		}
		return request;
	},

	load:function (name, returnData) {

		if (name == null) {
			name = this.getName();
		}
		name = this.parseName(name);

		console.log('Loading map configuration: ' + name);

		var url = name;
		var request = this.getXmlHttpRequest();
		if (!request) {
			alert("Sorry, but AJAX is not supported by this browser");
			return null;
		}
		request.open("GET", url, false);
		request.send(null);

		if (request.status == 200) {
			if (request.responseXML == null) {
				text = 'The specified configuration (' + name
						+ ') does not contain XML data';

				alert(text);

				return null;
			}
			if (returnData) {
				return request.responseXML;
			}

			PreviewApp.config.parser.parse(request.responseXML);

			return true;
		} else {
			var text = "The specified configuration (" + name
					+ ") could not be loaded (" + request.status + ")";
			alert(text);
			return null;
		}
	},   */

	handleResponse:function (url, request) {
		var responseXML = null;
		if (request.status == 200) {
			responseXML = request.responseXML;
			if (!responseXML) {
				text = 'The specified configuration (' + url
						+ ') does not contain any XML data';

				alert(text);
			}
		} else {
			var text = "The configuration (" + url
					+ ") could not be loaded (" + request.status + ")";
			alert(text);
		}
		return responseXML;
	},

	load:function (name, returnData) {
		if (name == null) {
			name = this.getName();
		}
		var url = this.parseName(name);

		// Use OpenLayers AJAX routine, calls Proxy if required
		// http://docs.openlayers.org/library/request.html
		console.log('Loading (OL) map configuration: ' + name);

		var self = this;
		self.request = null;
		OpenLayers.Request.GET({
			url: url,
			async: false,
			callback: function(request) {
				self.request = request;
			}
		});

		// Get response XML object
		var responseXML = self.handleResponse(url, self.request);
		if (!responseXML) {
			return;
		}
		if (returnData) {
			return responseXML;
		}

		PreviewApp.config.parser.parse(responseXML);
		PreviewApp.config.appConfiguration.load();
	}
};

// Bootstrap the configuration logic
Ext.onReady(function () {
	if (typeof console === 'undefined') {
		console = { log:function (s) {}}
	}
	console.log('Starting PreviewApp v' + PreviewApp.version + ' Heron v' + Heron.globals.version);

	PreviewApp.config.configuration.load(null, false);
});
