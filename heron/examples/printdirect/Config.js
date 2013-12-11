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

/** api: example[printdirect]
 *  PrintDirect
 *  -----------
 *  Immediate printing of visible map area.
 */

Heron.options.map.settings.zoom = 12;

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
    {type: "featureinfo", options: {
        popupWindow: {
            width: 360,
            height: 200,
            featureInfoPanel: {
                showTopToolbar: true,

                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                exportFormats: ['CSV', 'XLS', 'GMLv2', 'GeoJSON', 'WellKnownText', 'Shapefile'],
                // Export to download file. Option values are 'CSV', 'XLS', default is no export (results in no export menu).
                // exportFormats: ['CSV', 'XLS'],
                maxFeatures: 10,

                // In case that the same layer would be requested more than once: discard the styles
                discardStylesForDups: true
            }
        }
    }},
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{type: "printdirect", options: {url: 'http://kademo.nl/print/pdf28992'
		// , mapTitle: 'My Header - Direct Print'
		// , mapTitleYAML: "mapTitle"		// MapFish - field name in config.yaml - default is: 'mapTitle'
		// , mapComment: 'My Comment - Direct Print'
		// , mapCommentYAML: "mapComment"	// MapFish - field name in config.yaml - default is: 'mapComment'
		// , mapFooter: 'My Footer - Direct Print'
		// , mapFooterYAML: "mapFooter"	    // MapFish - field name in config.yaml - default is: 'mapFooter'
		// , printAttribution: true         // Flag for printing the attribution
		// , mapAttribution: null           // Attribution text or null = visible layer attributions
		// , mapAttributionYAML: "mapAttribution" // MapFish - field name in config.yaml - default is: 'mapAttribution'
		// , mapPrintLayout: "A4"			// MapFish - 'name' entry of the 'layouts' array or Null (=> MapFish default)
		// , mapPrintDPI: "75"				// MapFish - 'value' entry of the 'dpis' array or Null (=> MapFish default)
		// , mapPrintLegend: true
		// , legendDefaults: {
		//     useScaleParameter : false,
		//     baseParams: {FORMAT: "image/png"}
		//   }
	}}
];

/**
 * Defines the entire layout of a Heron webapp using ExtJS-style.
 **/
Heron.layout = {
	xtype: 'panel',
	id: 'hr-container-main',
	layout: 'border',

	items: [
		{
			xtype: 'hr_layertreepanel',
            contextMenu: [
                {
                    xtype: 'hr_layernodemenulayerinfo'
                },
                {
                    xtype: 'hr_layernodemenuzoomextent'
                },
                {
                    xtype: 'hr_layernodemenuopacityslider'
                }
            ],
			region: 'west',
			border: false,
			hropts: Heron.options.layertree
		},
		{
			xtype: 'hr_mappanel',
			title: 'Print Direct',
			header: true,
			id: 'hr-map',
			region: 'center',
			border: false,
			hropts: Heron.options.map
		}
	]
};
