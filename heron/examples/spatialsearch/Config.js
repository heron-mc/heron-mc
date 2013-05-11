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

/** api: example[spatialsearch]
 *  Search features with Spatial Searches
 *  -------------------------------------
 *  Ala ArcGIS search by Location. Get, select and download Features by drawing on Map and or selecting from other layers.
 */

Heron.options.map.layers = [

    /*
     * ==================================
     *            BaseLayers
     * ==================================
     */
//	May use new NASA WMTS : http://onearth.jpl.nasa.gov/wms.cgi?request=GetCapabilities

    new OpenLayers.Layer.WMS("Global Imagery",
            "http://maps.opengeo.org/geowebcache/service/wms",
            {layers: "bluemarble"},
            {singleTile: false, isBaseLayer: true, visibility: true, noLegend: true, transitionEffect: 'resize'}),

    /*
     * ==================================
     *            Overlays
     * ==================================
     */

    new OpenLayers.Layer.WMS(
            "World Cities (FAO)",
            'http://data.fao.org/geoserver/ows?',
            {layers: "GEONETWORK:esri_cities_12764", transparent: true, format: 'image/png'},
            {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: true, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize', metadata: {
                wfs: {
                    protocol: 'fromWMSLayer'
                }
            }}
    ),
    new OpenLayers.Layer.WMS(
            "World Cities (OpenGeo)",
            'http://suite.opengeo.org/geoserver/ows?',
            {layers: "cities", transparent: true, format: 'image/png'},
            {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize',
                metadata: {
                    wfs: {
                        protocol: 'fromWMSLayer',
                        featurePrefix: 'world',
                        featureNS: 'http://world.opengeo.org'
                    }
                }}
    ),
    new OpenLayers.Layer.WMS(
            "USA States (OpenGeo)",
            'http://suite.opengeo.org/geoserver/ows?',
            {layers: "states", transparent: true, format: 'image/png'},
            {singleTile: true, opacity: 0.9, isBaseLayer: false, visibility: false, noLegend: false, featureInfoFormat: 'application/vnd.ogc.gml', transitionEffect: 'resize', metadata: {
                wfs: {
                    protocol: 'fromWMSLayer',
                    featurePrefix: 'usa',
                    featureNS: 'http://usa.opengeo.org'
                }
            }}
    )


];

/** This config assumes the DefaultOptionsWorld.js to be included first!! */
Heron.options.map.settings.zoom = 4;
Heron.options.map.settings.center = '-98,40';
Ext.namespace("Heron.examples");

/** Create a config for the search panel. This panel may be embedded into the accordion
 * or bound to the "find" button in the toolbar. Here we use the toolbar button.
 */
Heron.examples.searchPanelConfig = {
	xtype: 'hr_searchcenterpanel',
	hropts: {
		searchPanel: {
		xtype: 'hr_spatialsearchpanel',
			id: 'hr-spatialsearchpanel',
			header: false,
            border: false,
			style: {
				fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
				fontSize: '12px'
			},
            searchByFeature: {
                active: false
            },
            searchByDraw: {
                active: true,
                sketchOnly: false,
                cumulative: false
            }
		},
		resultPanel: {
			xtype: 'hr_featuregridpanel',
			id: 'hr-featuregridpanel',
			header: false,
            border: false,
			autoConfig: true,
			hropts: {
				zoomOnRowDoubleClick: true,
				zoomOnFeatureSelect: false,
				zoomLevelPointSelect: 8,
				zoomToDataExtent: false
			}
		}
	}
};


// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well. By providing a "create" function your own toolbar
// item can be added.
// For menu's and other standard ExtJS Toolbar items, the "any" type can be
// used. There you need only pass the options, similar as in the function
// ExtJS Toolbar.add().
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {max_features: 20}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{type: "zoomprevious"},
	{type: "zoomnext"},
	{type: "-"},
	{
		type: "searchcenter",
		// Options for SearchPanel window
		options: {
			show: true,

			searchWindow: {
				title: __('Spatial Search'),
				x: 100,
				y: undefined,
				width: 360,
				height: 400,
				items: [
					Heron.examples.searchPanelConfig
				]
			}
		}
	}

];
