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
				strokeWidth: 1, 
				strokeOpacity: 0.7,
				fillOpacity: 0.5
			}
		),
		"select": new OpenLayers.Style(
			{
				graphicName: "star",
				pointRadius: "10", 
				fillOpacity: 0.8,
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
GeoViewer.Styles.AU_AdministrativeUnit = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				fillColor: "#E4BD8A",
				strokeColor: "#9C6E31",
				strokeWidth: 1, 
				strokeOpacity: 0.7,
				fillOpacity: 0.4
			}
		),
		"select": new OpenLayers.Style(
			{
				fillColor: "orange",
				strokeColor: "red",
				strokeWidth: 2, 
				strokeOpacity: 0.8,
				fillOpacity: 0.5
			}
		)
	}
);
GeoViewer.Styles.CP_CadastralParcel = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				fillColor: "#AC58FA",
				strokeColor: "#5F04B4",
				strokeWidth: 1, 
				strokeOpacity: 0.7,
				fillOpacity: 0.4
			}
		),
		"select": new OpenLayers.Style(
			{
				fillColor: "orange",
				strokeColor: "red",
				strokeWidth: 2, 
				strokeOpacity: 0.8,
				fillOpacity: 0.5
			}
		)
	}
);
GeoViewer.Styles.HY_StandingWater = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				fillColor: "#81BEF7",
				strokeColor: "#045FB4",
				strokeWidth: 1, 
				strokeOpacity: 0.7,
				fillOpacity: 0.4
			}
		),
		"select": new OpenLayers.Style(
			{
				fillColor: "orange",
				strokeColor: "red",
				strokeWidth: 2, 
				strokeOpacity: 0.8,
				fillOpacity: 0.5
			}
		)
	}
);
GeoViewer.Styles.HY_Watercourse = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				strokeColor: "#045FB4"
				,strokeWidth: 2
				,strokeOpacity: 0.7
			}
		),
		"select": new OpenLayers.Style(
			{
				strokeColor: "orange"
				,strokeWidth: 5 
				,strokeOpacity: 0.7
			}
		)
	}
);
GeoViewer.Styles.HY_LandWaterBoundary = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				strokeColor: "#088A85"
				,strokeWidth: 2
				,strokeOpacity: 0.6
			}
		),
		"select": new OpenLayers.Style(
			{
				strokeColor: "orange"
				,strokeWidth: 5 
				,strokeOpacity: 0.7
			}
		)
	}
);
GeoViewer.Styles.HY_DamOrWeir = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				strokeColor: "black"
				,strokeWidth: 2
				,strokeOpacity: 0.6
			}
		),
		"select": new OpenLayers.Style(
			{
				strokeColor: "orange"
				,strokeWidth: 5 
				,strokeOpacity: 0.7
			}
		)
	}
);
GeoViewer.Styles.HY_Lock = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				strokeColor: "black"
				,strokeWidth: 2
				,strokeOpacity: 0.6
			}
		),
		"select": new OpenLayers.Style(
			{
				strokeColor: "orange"
				,strokeWidth: 5 
				,strokeOpacity: 0.7
			}
		)
	}
);
GeoViewer.Styles.TN_RoadArea = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				strokeColor: "red"
				,strokeWidth: 2
				,strokeOpacity: 0.6
			}
		),
		"select": new OpenLayers.Style(
			{
				strokeColor: "yellow"
				,strokeWidth: 5 
				,strokeOpacity: 0.7
			}
		)
	}
);
GeoViewer.Styles.TN_RoadLink = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				strokeColor: "red"
				,strokeWidth: 2
				,strokeOpacity: 0.6
			}
		),
		"select": new OpenLayers.Style(
			{
				strokeColor: "yellow"
				,strokeWidth: 5 
				,strokeOpacity: 0.7
			}
		)
	}
);
GeoViewer.Styles.TN_RoadNode = new OpenLayers.StyleMap(
	{
		"default": new OpenLayers.Style(
			{
				strokeColor: "red"
				,strokeWidth: 2
				,strokeOpacity: 0.6
			}
		),
		"select": new OpenLayers.Style(
			{
				strokeColor: "yellow"
				,strokeWidth: 5 
				,strokeOpacity: 0.7
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