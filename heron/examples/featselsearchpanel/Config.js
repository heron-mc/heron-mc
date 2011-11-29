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
 *  Create a custom search panel with backend (exact) WFS search and show results on map and in grid.
 */

Heron.layout = {
	xtype: 'panel',

	/* Optional ExtJS Panel properties, see ExtJS API docs. */
	id: 'hr-container-main',
	layout: 'border',

	items: [
		{
			xtype: 'panel',

			id: 'hr-menu-left-container',
			layout: 'accordion',
			region : "west",
			width: 240,
			collapsible: true,
			split	: true,
			border: false,
			items: [
				{
					xtype: 'hr_featselsearchpanel',
					id: 'hr-featselsearchpanel',
					title: __('Search'),

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
									value: 'H.C',
									fieldLabel: "  name"
								},
								{
									xtype: "label",
									id: "helplabel",
									html: 'Type name of an NL hockeyclub, wildcards are appended<br/>',
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
				},
				{
					xtype: 'hr_layertreepanel'
				}
			]
		},
		{
			xtype: 'panel',
			id :  'hr-map-and-info-container',
			layout : 'border',
			region: 'center',
			width : '100%',
			collapsible : true,
			split : true,
			border : false,
			items :
					[
						{
							xtype: 'hr_mappanel',
							id: 'hr-map',
							region: 'center',
							collapsible : false,
							border: false,
							hropts: Heron.options.map
						},
						{
							xtype: 'hr_featureinfopanel',
							id: 'hr-feature-info',
							region: "south",
							border: true,
							collapsible: true,
							collapsed: true,
							height: 205,
							split: true,
							maxFeatures: 10
						}
					]
		}
	]
}
		;
