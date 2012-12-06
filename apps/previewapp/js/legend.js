/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

Ext.namespace("PDOK.config");

PDOK.config.legend = (function() {

	var urlCache = {};
	var capCache = {};
	
	var instance = {
			
		setLegendUrl: function(serviceUrl, layerName, styleName, record) {
			
			var url = null;
			var key = serviceUrl + layerName + styleName;
			if (urlCache[key])
			{
				url = urlCache[key];
			}
			else
			{
				var cap = capCache[serviceUrl];
				if (!cap)
				{
					cap = this.getCapabilities(serviceUrl);
					capCache[serviceUrl] = cap;
				}
				var layers = cap.capability.layers;			
				for (var i=0; i<layers.length; i++)
				{
					if (layerName == layers[i].name)
					{
						try
						{
							var styles = layers[i].styles;
							for (var j=0; j<styles.length; j++)
							{
								if (styleName == styles[j].name)
								{
									url = styles[j].legend.href;
									break;
								}
							}				
						}
						catch(e)
						{
							//do nothing
						}
						break;
					}
				}
				urlCache[key] = url;
				if (!url)
				{
					console.log("No legendURL found in capabilities for layer "+ layerName + " and style " + styleName );
				}
			}
			record.set("legendURL", url);
		},
		
		getCapabilities: function(url) {
			var result = null;
		    OpenLayers.Request.GET({
		    	async: false,
		        url: url,
		        params: {
		            SERVICE: "WMS",
//		            VERSION: "1.3.0",
		            REQUEST: "GetCapabilities"
		        },
		        success: function(request) {
		            var doc = request.responseXML;
		            if (!doc || !doc.documentElement) {
		                doc = request.responseText;
		            }
		            var format = new OpenLayers.Format.WMSCapabilities();
		            result = format.read(doc);         
		        }, 
		        failure: function() {            
		            console.error("Failed to retrieve capabilities from: "+url);
		        }
		    });			
			return result;
		}
	};
	return (instance);
})();
