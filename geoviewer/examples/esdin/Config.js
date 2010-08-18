/*
 * Copyright (C) 2010  Het Kadaster
 *
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
Ext.namespace("GeoViewer.Map");

GeoViewer.lang = GeoViewer.Catalog.lang.en;

GeoViewer.layout = {
	center : {
		options : {
			layout: 'border',
			width: '100%',
			collapsible: true,
			split	: true,
			border: false
		},
		panels: [
			{
				type: 'gv-map',
				options: {
					region: 'center',
					collapsible : false,
					border: false
				}
			},
			{
				type: 'gv-feature-info',
				options: {
					region : "south",
					border : true,
					collapsible : true,
					collapsed : true,
					height : 205,
					split : true,
					maxFeatures	: 10
				}
			}
		]
	},
	west : {
		options : {
			layout: 'accordion',
			width: 240,
			collapsible: true,
			split	: true,
			border: false
		},
		panels: [
			{
				type: 'gv-layer-browser'
			},
			{
				type: 'gv-html',
				options: {
					id: 'gv-info-west',
					url: 'default-info.html',
					title: 'Info'
				}
			},
			{
				type: 'gv-search',
				options: {
					completeUrl: 'http://research.geodan.nl/esdin/autocomplete/complete.php'
				}
				
			},
			{
				type: 'gv-layer-legend'
			}
		]
	}
};

/** Use NL RD projection/resolutions options. */
GeoViewer.Map.options = GeoViewer.Catalog.options4258;

/** Collect layers from catalog. */
GeoViewer.Map.layers = [
	GeoViewer.Catalog.layers.world
	,GeoViewer.Catalog.layers.erm
	,GeoViewer.Catalog.layers.nlsf_fgiCP
	,GeoViewer.Catalog.layers.skGN
	,GeoViewer.Catalog.layers.kmsGN
	,GeoViewer.Catalog.layers.nlsf_fgiGN
];

/* Map Contexts. */
GeoViewer.contexts =
[

	
];
