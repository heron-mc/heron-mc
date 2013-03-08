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
	'Active Layers': 'Aktivn� vrstvy',
	'Base Layer': 'Z�kladn� vrstva',
	'Base Layers': 'Z�kladn� vrstvy',
	'BaseMaps': 'Z�kladn� mapy',
	'Choose a Base Layer': 'Vyberte z�kladn� vrstvu',
	'Legend': 'Legenda',
	'Feature Info': 'Informace o prvku',
	'Feature Data': 'Data prvku',
	'Feature(s)': 'Prvky',
	'No layer selected': 'Nebyla vybr�na ?�dn� vrstva',
	'Save Features': 'Ulo?it prvky',
	'Get Features': 'Z�skat prvky',
	'Feature information': 'Informace o prvku',
	'No Information found': 'Nenalezeny ?�dn� informace',
	'Layer not added': 'Vrstva nebyla p?id�na',
	'Attribute': 'Atribut',
	'Value': 'Hodnota',
	'Recieving data': 'P?ij�m�m data',
	'Layers': 'Vrstvy',
	'No match': '?�dn� shoda',
	'Loading...': 'Na?�t�n�...',
	'Shortcuts': 'Z�lo?ky',
	'Places': 'M�sta',
	'Unknown': 'Nezn�m?',
	'Feature Info unavailable': 'Informace o prvku nejsou k dispozici',
	'Pan': '<b>Posuv</b><br>Dr?en� lev�ho tla?�tka my?i nad mapou posouv� aktu�ln�<br>pohled; kole?ko my?i a pozice kurzoru nad mapou<br>z�rove? ovl�d� p?ibl�?en� (i v jin?ch re?imech ne? Posuv)',
	'Measure length': '<b>M??en� d�lky</b><br>Ka?d� klepnut� na lev� tla?�tko my?i nad mapou vytvo?�<br>bod m??en�ho �seku, dvojit� klepnut� m??en� ukon?�',
	'Measure area': '<b>M??en� plochy</b><br>Ka?d� klepnut� na lev� tla?�tko my?i nad mapou vytvo?�<br>bod m??en�ho polygonu, dvojit� klepnut� m??en� ukon?�',
	'Leg': '�sek',
	'Length': 'D�lka',
	'Area': 'Plocha',
	'Result >': 'V?sledek >',
	'< Search': '< Hledat',
	'Search': 'Hledat',
	'Search Nominatim': 'Hledat (pomoc� OSM Nominatim) podle n�zvu a adresy',
	'Search OpenLS': 'Hledat pomoc� slu?by OpenLS',
	'Search PDOK': 'Vlo?it (?�st) ?esk� n�rodn� adresy',
	'Searching...': 'Hled�n�...',
	'Search Completed: ': 'Hled�n� dokon?eno: ',
	'services': 'slu?by',
	'service': 'slu?bu',
	'Type Nominatim': 'Zadejte n�zev m�sta nebo adresu...',
	'Overlays': 'P?ekryvn� vrstvy',
	'Waiting for': '?ek�m na',
	'Warning': 'Varov�n�',
	'Zoom in': '<b>P?ibl�?it</b><br>Po klepnut� na lev� tla?�tko my?i na map? p?ibl�?� pohled,<br>dr?en�m tla?�tka a t�hnut�m lze ozna?it plochu pro p?ibl�?en�',
	'Zoom out': '<b>Odd�lit</b><br>Po klepnut� na lev� tla?�tko my?i na map? odd�l� pohled',
	'Zoom to full extent': '<b>Odd�lit na pln? rozsah</b><br>Odd�l� pohled pro pln� zobrazen� povolen�ho rozsahu mapy',
	'Zoom previous': '<b>P?edchoz� pohled</b><br>P?ejde na p?edchoz� pohled (zv?t?en� i rozsah)',
	'Zoom next': '<b>Dal?� pohled</b><br>P?ejde na dal?� pohled (zv?t?en� i rozsah)',

	// 0.68
	'Scale': 'M??�tko',
	'Resolution': 'Rozli?en�',
	'Zoom': 'P?ibl�?en�',
	'Create PDF': 'Vytvo?it PDF',
	'Print': 'Tisk',
	'Print Dialog Popup': 'Dialog tisku',
	'Print Visible Map Area': 'Tisk viditeln� plochy mapy',

	// 0.70
	'Export': 'Exportovat',
	'Choose a Display Option': 'Vyberte si mo?nost zobrazen�',
	'Display': 'Zobrazen�',
	'Grid': 'Tabulka',
	'Tree': 'Strom',
	'XML': 'XML',
	'Invalid export format configured: ': 'Nastaven neplatn? form�t exportu: ',
	'No features available or none-grid display chosen': 'Nejsou k dispozici ?�dn� prvky nebo nebylo vybr�no zobrazen� Tabulka',
	'Choose an Export Format': 'Vyberte si form�t pro export',
	'Print Visible Map Area Directly': 'P?�m? tisk viditeln� plochy mapy',
	'Direct Print Demo': 'Demo P?�m? tisk',
	'This is a simple map directly printed.': 'Toto je jednoduch� p?�mo vyti?t?n� mapa.',
	'Print Dialog Popup with Preview Map': '<b>Tisk</b><br>Otev?e okno s n�hledem a nastaven�m tisku',
	'Print Preview': 'N�hled tisku',
	'Print Preview Demo': 'Demo N�hled tisku',
	'Error getting Print options from server: ': 'Chyba p?i z�sk�v�n� nastaven� tisku ze serveru: ',
	'Error from Print server: ': 'Chyba tiskov�ho serveru: ',
	'No print provider url property passed in hropts.': 'V hropts nen� nadefinov�n url tiskov�ho serveru.',
	'Create PDF...': 'Vytvo?it PDF...',
	'Loading print data...': 'Nahr�v�n� tiskov?ch dat...',

	// 0.71
	'Go to coordinates': 'P?ej�t na sou?adnice',
	'Go!': 'P?ej�t!',
	'Pan and zoom to location': 'Posunout a p?ibl�?it na pozici',
	'Enter coordinates to go to location on map': 'Vlo?te sou?adnice pro p?echod na pozici na map?',
	'Active Themes': 'Aktivn� T�mata',
	'Move up': 'Posunout nahoru',
	'Move down': 'Posunout dol?',
	'Opacity': 'Nepr?hlednost',
	'Remove layer from list': 'Odebrat vrstvu ze seznamu',
	'Tools': 'N�stroje',
	'Removing': 'Odeb�r�m',
	'Are you sure you want to remove the layer from your list of layers?': 'Jste si jisti, ?e chcete odstranit vrstvu z va?eho seznamu vrstev?',
	'You are not allowed to remove the baselayer from your list of layers!': 'Nem�te dovoleno odstranit z�kladn� vrstvu z va?eho seznamu vrstev!'

};
