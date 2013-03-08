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
 *  class = Heron.i18n.dict (cs_CZ)
 *  base_link = `Ext.form.ComboBox <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.form.ComboBox>`_
 */

/**
 * Define dictionary for the CZ locale.
 * Maintained by: martin.kokes and Heron devs
 */
Heron.i18n.dict = {
	// 0.67
	'Active Layers': 'Aktivní vrstvy',
	'Base Layer': 'Základní vrstva',
	'Base Layers': 'Základní vrstvy',
	'BaseMaps': 'Základní mapy',
	'Choose a Base Layer': 'Vyberte základní vrstvu',
	'Legend': 'Legenda',
	'Feature Info': 'Informace o prvku',
	'Feature Data': 'Data prvku',
	'Feature(s)': 'Prvky',
	'No layer selected': 'Nebyla vybrána ?ádná vrstva',
	'Save Features': 'Ulo?it prvky',
	'Get Features': 'Získat prvky',
	'Feature information': 'Informace o prvku',
	'No Information found': 'Nenalezeny ?ádné informace',
	'Layer not added': 'Vrstva nebyla p?idána',
	'Attribute': 'Atribut',
	'Value': 'Hodnota',
	'Recieving data': 'P?ijímám data',
	'Layers': 'Vrstvy',
	'No match': '?ádná shoda',
	'Loading...': 'Na?ítání...',
	'Shortcuts': 'Zálo?ky',
	'Places': 'Místa',
	'Unknown': 'Neznám?',
	'Feature Info unavailable': 'Informace o prvku nejsou k dispozici',
	'Pan': '<b>Posuv</b><br>Dr?ení levého tla?ítka my?i nad mapou posouvá aktuální<br>pohled; kole?ko my?i a pozice kurzoru nad mapou<br>zárove? ovládá p?iblí?ení (i v jin?ch re?imech ne? Posuv)',
	'Measure length': '<b>M??ení délky</b><br>Ka?dé klepnutí na levé tla?ítko my?i nad mapou vytvo?í<br>bod m??eného úseku, dvojité klepnutí m??ení ukon?í',
	'Measure area': '<b>M??ení plochy</b><br>Ka?dé klepnutí na levé tla?ítko my?i nad mapou vytvo?í<br>bod m??eného polygonu, dvojité klepnutí m??ení ukon?í',
	'Leg': 'Úsek',
	'Length': 'Délka',
	'Area': 'Plocha',
	'Result >': 'V?sledek >',
	'< Search': '< Hledat',
	'Search': 'Hledat',
	'Search Nominatim': 'Hledat (pomocí OSM Nominatim) podle názvu a adresy',
	'Search OpenLS': 'Hledat pomocí slu?by OpenLS',
	'Search PDOK': 'Vlo?it (?ást) ?eské národní adresy',
	'Searching...': 'Hledání...',
	'Search Completed: ': 'Hledání dokon?eno: ',
	'services': 'slu?by',
	'service': 'slu?bu',
	'Type Nominatim': 'Zadejte název místa nebo adresu...',
	'Overlays': 'P?ekryvné vrstvy',
	'Waiting for': '?ekám na',
	'Warning': 'Varování',
	'Zoom in': '<b>P?iblí?it</b><br>Po klepnutí na levé tla?ítko my?i na map? p?iblí?í pohled,<br>dr?ením tla?ítka a táhnutím lze ozna?it plochu pro p?iblí?ení',
	'Zoom out': '<b>Oddálit</b><br>Po klepnutí na levé tla?ítko my?i na map? oddálí pohled',
	'Zoom to full extent': '<b>Oddálit na pln? rozsah</b><br>Oddálí pohled pro plné zobrazení povoleného rozsahu mapy',
	'Zoom previous': '<b>P?edchozí pohled</b><br>P?ejde na p?edchozí pohled (zv?t?ení i rozsah)',
	'Zoom next': '<b>Dal?í pohled</b><br>P?ejde na dal?í pohled (zv?t?ení i rozsah)',

	// 0.68
	'Scale': 'M??ítko',
	'Resolution': 'Rozli?ení',
	'Zoom': 'P?iblí?ení',
	'Create PDF': 'Vytvo?it PDF',
	'Print': 'Tisk',
	'Print Dialog Popup': 'Dialog tisku',
	'Print Visible Map Area': 'Tisk viditelné plochy mapy',

	// 0.70
	'Export': 'Exportovat',
	'Choose a Display Option': 'Vyberte si mo?nost zobrazení',
	'Display': 'Zobrazení',
	'Grid': 'Tabulka',
	'Tree': 'Strom',
	'XML': 'XML',
	'Invalid export format configured: ': 'Nastaven neplatn? formát exportu: ',
	'No features available or none-grid display chosen': 'Nejsou k dispozici ?ádné prvky nebo nebylo vybráno zobrazení Tabulka',
	'Choose an Export Format': 'Vyberte si formát pro export',
	'Print Visible Map Area Directly': 'P?ím? tisk viditelné plochy mapy',
	'Direct Print Demo': 'Demo P?ím? tisk',
	'This is a simple map directly printed.': 'Toto je jednoduchá p?ímo vyti?t?ná mapa.',
	'Print Dialog Popup with Preview Map': '<b>Tisk</b><br>Otev?e okno s náhledem a nastavením tisku',
	'Print Preview': 'Náhled tisku',
	'Print Preview Demo': 'Demo Náhled tisku',
	'Error getting Print options from server: ': 'Chyba p?i získávání nastavení tisku ze serveru: ',
	'Error from Print server: ': 'Chyba tiskového serveru: ',
	'No print provider url property passed in hropts.': 'V hropts není nadefinován url tiskového serveru.',
	'Create PDF...': 'Vytvo?it PDF...',
	'Loading print data...': 'Nahrávání tiskov?ch dat...',

	// 0.71
	'Go to coordinates': 'P?ejít na sou?adnice',
	'Go!': 'P?ejít!',
	'Pan and zoom to location': 'Posunout a p?iblí?it na pozici',
	'Enter coordinates to go to location on map': 'Vlo?te sou?adnice pro p?echod na pozici na map?',
	'Active Themes': 'Aktivní Témata',
	'Move up': 'Posunout nahoru',
	'Move down': 'Posunout dol?',
	'Opacity': 'Nepr?hlednost',
	'Remove layer from list': 'Odebrat vrstvu ze seznamu',
	'Tools': 'Nástroje',
	'Removing': 'Odebírám',
	'Are you sure you want to remove the layer from your list of layers?': 'Jste si jisti, ?e chcete odstranit vrstvu z va?eho seznamu vrstev?',
	'You are not allowed to remove the baselayer from your list of layers!': 'Nemáte dovoleno odstranit základní vrstvu z va?eho seznamu vrstev!'

};
