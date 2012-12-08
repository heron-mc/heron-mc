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
Ext.namespace("Heron.i18n");

/** api: (define)
 *  module = Heron.i18n
 *  class = Heron.i18n.dict (de_DE)
 *  base_link = `Ext.form.ComboBox <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.form.ComboBox>`_
 */

/**
 * Define dictionary for the DE locale.
 * Maintained by: Heron devs
 */
Heron.i18n.dict = {
    // 0.67
	'Active Layers' : 'Aktivní vrstvy',
	'Base Layer': 'Základní vrstva',
	'Base Layers': 'Základní vrstvy',
	'BaseMaps': 'Základní mapy',
	'Choose a Base Layer': 'Vyberte základní vrstvu',
	'Legend': 'Legenda',
	'Feature Info': 'Informace o prvku',
	'Feature Data': 'Data prvku',
	'Feature(s)': 'Prvky',
	'No layer selected': 'Nebyla vybrána žádná vrstva',
	'Save Features': 'Uložit prvky',
	'Get Features': 'Získat prvky',
	'Feature information': 'Informace o prvku',
	'No Information found': 'Nenalezeny žádné informace',
	'Layer not added': 'Vrstva nebyla p?idána',
	'Attribute': 'Atribut',
	'Value': 'Hodnota',
	'Recieving data':'P?ijímám data',
	'Layers': 'Vrstvy',
	'No match': 'Žádná shoda',
	'Loading...': 'Na?ítání...',
	'Shortcuts': 'Záložky',
	'Places': 'Místa',
	'Unknown': 'Neznámý',
	'Feature Info unavailable':'Informace o prvku nejsou k dispozici',
	'Pan': '<b>Posuv</b><br>Držení levého tla?ítka myši nad mapou posouvá aktuální<br>pohled; kole?ko myši a pozice kurzoru nad mapou<br>zárove? ovládá p?iblížení (i v jiných režimech než Posuv)',
	'Measure length': '<b>M??ení délky</b><br>Každé klepnutí na levé tla?ítko myši nad mapou vytvo?í<br>bod m??eného úseku, dvojité klepnutí m??ení ukon?í',
	'Measure area': '<b>M??ení plochy</b><br>Každé klepnutí na levé tla?ítko myši nad mapou vytvo?í<br>bod m??eného polygonu, dvojité klepnutí m??ení ukon?í',
	'Leg' : 'Úsek',
	'Length': 'Délka',
	'Area': 'Plocha',
	'Result >' : 'Výsledek >',
	'< Search' : '< Hledat',
	'Search': 'Hledat',
	'Search Nominatim': 'Hledat (pomocí OSM Nominatim) podle názvu a adresy',
	'Search OpenLS' : 'Hledat pomocí služby OpenLS',
	'Search PDOK': 'Vložit (?ást) ?eské národní adresy',
	'Searching...': 'Hledání...',
	'Search Completed: ': 'Hledání dokon?eno: ',
	'services':'služby',
	'service':'službu',
	'Type Nominatim': 'Zadejte název místa nebo adresu...',
	'Overlays': 'P?ekryvné vrstvy',
	'Waiting for': '?ekám na',
	'Warning': 'Varování',
	'Zoom in': '<b>P?iblížit</b><br>Po klepnutí na levé tla?ítko myši na map? p?iblíží pohled,<br>držením tla?ítka a táhnutím lze ozna?it plochu pro p?iblížení',
	'Zoom out': '<b>Oddálit</b><br>Po klepnutí na levé tla?ítko myši na map? oddálí pohled',
	'Zoom to full extent':'<b>Oddálit na plný rozsah</b><br>Oddálí pohled pro plné zobrazení povoleného rozsahu mapy',
	'Zoom previous': '<b>P?edchozí pohled</b><br>P?ejde na p?edchozí pohled (zv?tšení i rozsah)',
	'Zoom next': '<b>Další pohled</b><br>P?ejde na další pohled (zv?tšení i rozsah)',

    // 0.68
	'Scale': 'M??ítko',
	'Resolution': 'Rozlišení',
	'Zoom': 'P?iblížení',

    // 0.70
	// 'Export': 'Export',
	// 'Choose a Display Option' : 'Choose a Display Option',
	// 'Display' : 'Display',
	// 'Grid' : 'Grid',
	// 'Tree' : 'Tree',
	// 'XML' : 'XML',
	// 'Invalid export format configured: ' : 'Invalid export format configured: ',
	// 'No features available or none-grid display chosen' : 'No features available or none-grid display chosen',
	// 'Choose an Export Format' : 'Choose an Export Format',
	// 'Print Visible Map Area Directly' : 'Print Visible Map Area Directly',
	// 'Direct Print Demo' : 'Direct Print Demo',
	// 'This is a simple map directly printed.' : 'This is a simple map directly printed.',
	// 'Print Dialog Popup with Preview Map' : 'Print Dialog Popup with Preview Map',
	// 'Print Preview' : 'Print Preview',
	// 'Print Preview Demo' : 'Print Preview Demo',
	// 'Error getting Print options from server: ' : 'Error getting Print options from server: ',
	// 'Error from Print server: ' : 'Error from Print server: ',
	// 'No print provider url property passed in hropts.' : 'No print provider url property passed in hropts.',
	// 'Create PDF...' : 'Create PDF...',
	// 'Loading print data...' : 'Loading print data...'


};
