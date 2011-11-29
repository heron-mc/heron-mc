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
/** This config assumes the DefaultOptions.js to be included first!! */


/** api: example[featselsearchpanel]
 *  Search + Feature Selection
 *  --------------------------
 *  Search window with WFS search and show results on map and in grid (use binoculars button from toolbar).
 */

Ext.namespace("Heron.examples");

/** Create a config for the search panel. This panel may be embedded into the accordion
 * or bound to the "find" button in the toolbar. Here we use the toolbar button.
 */
Heron.examples.searchPanelConfig = {
	xtype: 'hr_featselsearchpanel',
	id: 'hr-featselsearchpanel',
	title: __('Search'),
	height: 600,
	hropts: {
		searchPanel: {
			xtype: 'hr_searchpanel',
			id: 'hr-searchpanel',
			header: false,
			bodyStyle: 'padding: 6px',
			style: {
				fontFamily: 'Verdana, Arial, Helvetica, sans-serif',
				fontSize: '12px'
			},
			protocol: new OpenLayers.Protocol.WFS({
				version: "1.1.0",
				url: "http://kademo.nl/gs2/wfs?",
				srsName: "EPSG:28992",
				featureType: "hockeyclubs",
				featureNS: "http://innovatie.kadaster.nl"
			}),
			items: [
				{
					xtype: "textfield",
					name: "name__like",
					value: 'H.C. A',
					fieldLabel: "  name"
				},
				{
					xtype: "label",
					id: "helplabel",
					html: 'Type name of an NL hockeyclub, wildcards are appended<br/>Any single letter will also yield results.<br/>',
					style: {
						fontSize: '10px',
						color: '#AAAAAA'
					}
				}
			],
			hropts: {
				onSearchCompleteZoom : 10
			}
		},
		resultPanel: {
			xtype: 'hr_featselgridpanel',
			id: 'hr-featselgridpanel',
			title: __('Search'),
			header: false,
			columns: [
				{
					header: "Name",
					width: 100,
					dataIndex: "name",
					type: 'string'
				},
				{
					header: "Desc",
					width: 200,
					dataIndex: "cmt",
					type: 'string'
				}
			],
			hropts: {
				zoomOnFeatureSelect : true,
				zoomLevelPointSelect : 8
			}
		}
	}
};

Heron.options.map.toolbar.push({type: "-"});

Heron.options.map.toolbar.push(
		{
			type: "searchpanel",
			// Options for SearchPanel window
			options : {
				searchWindow : {
					title: undefined,
					x: 100,
					y: undefined,
					width: 320,
					height: 400,
					items: [
					  Heron.examples.searchPanelConfig
					]
				}
			}
		}
);

