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

// This is an example how to create themed Layer trees within the Layer Browser
// See ContainerPanel.js

GeoViewer.lang = GeoViewer.Catalog.lang.en;

/**
 * Define themes
 *
 * Each theme contains FeatureTypes
 * FeatureTypes (with a geometry) contain (OpenLayers) Layers
 *
 * More aspects can be configured later.
 */
GeoViewer.Catalog.themes = {
	KADMAP: {
		name: 'Cadastral Maps'
		,abbrev: 'KADMAP'
		,featureTypes: {
			Parcels: {
				name: 'Parcels (zoom > 6)',
				// Add layers realizing this feature type: a Layer object can be fetched
				// as GeoViewer.Catalog.layers['name']
				layers : ['lki_vlakken']
			},
			Buildings: {
				name: 'Buildings (zoom > 6)',
				// Add layers realizing this feature type: a Layer object can be fetched
				// as GeoViewer.Catalog.layers['name']
				layers : ['lki_gebouwen']
			},
			ParcelsAndBuildings: {
				name: 'Parcels and Buildings (zoom > 6)',
				// Add layers realizing this feature type: a Layer object can be fetched
				// as GeoViewer.Catalog.layers['name']
				layers : ['kadkaart_tiled']
			}
		}
	},
	METEO: {
		name: 'Meteorology'
		,abbrev: 'METEO'
		,featureTypes: {
			RainColored: {
				name: 'Rain (Colored)',
				// Add layers realizing this feature type: a Layer object can be fetched
				// as GeoViewer.Catalog.layers['name']
				layers : ['knmi_radar_color']
			},
			RainBW: {
				name: 'Rain (B&W)',
				// Add layers realizing this feature type: a Layer object can be fetched
				// as GeoViewer.Catalog.layers['name']
				layers : ['knmi_radar_bw']
			}
		}
	},
	ECOLOGY: {
		name: 'Ecology'
		,abbrev: 'ECO'
		,featureTypes: {
			EHS: {
				name: 'Ecologische Hoofdstructuur (EHS)',
				// Add layers realizing this feature type: a Layer object can be fetched
				// as GeoViewer.Catalog.layers['name']
				layers : ['ehs']
			}
		}
	}
};

GeoViewer.treeConfig = [
	{
		// Include all BaseLayers present in map
		text:'BaseLayers', nodeType: "gx_baselayercontainer"
	},

	{
		nodeType: "gx_themenode",  theme: 'KADMAP', children:
			[
				{
					nodeType: "gx_featuretypecontainer", featureType: 'Parcels'
				},
				{
					nodeType: "gx_featuretypecontainer", featureType: 'Buildings'
				}

			]
	},
	{
		nodeType: "gx_themenode",  theme: 'METEO', children:
			[
				{nodeType: "gx_featuretypecontainer", featureType: 'RainColored'}
				,
				{nodeType: "gx_featuretypecontainer", featureType: 'RainBW'}
			]
	},
	{
		nodeType: "gx_themenode",  theme: 'ECOLOGY', children:
			[
				{nodeType: "gx_featuretypecontainer", featureType: 'EHS'}
			]
	}
];

/** Collect layers from catalog. */
GeoViewer.Map.layers = [
	// Base Layers
	GeoViewer.Catalog.layers.osm
	,GeoViewer.Catalog.layers.blanco
	,GeoViewer.Catalog.layers.topraster

	// Feature Layers
	,GeoViewer.Catalog.layers.lki_vlakken
	,GeoViewer.Catalog.layers.lki_gebouwen
	,GeoViewer.Catalog.layers.kadkaart_tiled
	,GeoViewer.Catalog.layers.knmi_radar_color
	,GeoViewer.Catalog.layers.knmi_radar_bw
	,GeoViewer.Catalog.layers.ehs
];

// Replace west panel in DefaultConfig.js
// Pass our theme tree config as an option
GeoViewer.layout.west.panels = [
{
	type: 'gv-layer-browser',
	options: {
		// Pass in our tree, if none specified the default config is used
		tree: GeoViewer.treeConfig
	}
}];


/* Map Contexts. */
GeoViewer.contexts = undefined;

// Alter some map settings in order that parcels are displayed
GeoViewer.Catalog.optionsRD.CENTER = new OpenLayers.LonLat(118561, 480615);
GeoViewer.Catalog.optionsRD.ZOOM = 6;