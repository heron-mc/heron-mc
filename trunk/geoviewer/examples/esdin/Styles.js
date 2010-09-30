/*
 * Copyright (C) 2010  Geodan
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

Ext.namespace("GeoViewer.Styles");

GeoViewer.Styles.Default = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				pointRadius: "4", 
				fillColor: "grey",
				strokeColor: "black",
				strokeWidth: 2, 
				strokeOpacity: 0.7,
				fillOpacity: 0.5
			}
		),
		"select": new OpenLayers.Style(
			{
				graphicName: "star",
				pointRadius: "10", 
				fillOpacity: 1,
				strokeOpacity: 1,
				fillColor: "yellow",
				strokeColor: "orange"
			}
		)
	}
);
GeoViewer.Styles.GN_NamedPlace = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				pointRadius: "4", 
				fillColor: "red",
				strokeColor: "blue",
				strokeWidth: 2, 
				strokeOpacity: 0.7,
				fillOpacity: 0.5
			}
		),
		"select": new OpenLayers.Style(
			{
				graphicName: "star",
				pointRadius: "10", 
				fillOpacity: 1,
				strokeOpacity: 1,
				fillColor: "orange",
				strokeColor: "red"
			}
		)
	}
);
GeoViewer.Styles.pointStyles = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				pointRadius: "4", 
				fillColor: "red",
				strokeColor: "blue",
				strokeWidth: 2, 
				strokeOpacity: 0.7,
				fillOpacity: 0.5
			}
		),
		"select": new OpenLayers.Style(
			{
				graphicName: "star",
				pointRadius: "10", 
				fillOpacity: 1,
				strokeOpacity: 1,
				fillColor: "orange",
				strokeColor: "red"
			}
		)
	}
);
GeoViewer.Styles.gnStyles = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				pointRadius: "4", 
				fillColor: "red",
				strokeColor: "blue",
				strokeWidth: 2, 
				strokeOpacity: 0.7,
				fillOpacity: 0.5
			}
		),
		"select": new OpenLayers.Style(
			{
				graphicName: "star",
				pointRadius: "10", 
				fillOpacity: 1,
				strokeOpacity: 1,
				fillColor: "orange",
				strokeColor: "red"
			}
		)
	}
);
GeoViewer.Styles.lineStyles = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{ 
				strokeColor: "red",
				strokeWidth: 2, 
				strokeOpacity: 0.7
			}
		),
		"select": new OpenLayers.Style(
			{
				fillOpacity: 1,
				strokeOpacity: 1,
				strokeWidth: 10,
				strokeColor: "orange"
			}
		)
	}
);
GeoViewer.Styles.polyStyles = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{ 
				fillColor: "orange",
				strokeColor: "blue",
				strokeWidth: 2, 
				strokeOpacity: 0.7,
				fillOpacity: 0.5
			}
		),
		"select": new OpenLayers.Style(
			{
				fillOpacity: 1,
				strokeOpacity: 1,
				strokeWidth: 10,
				fillColor: "orange",
				strokeColor: "red"
			}
		)
	}
);