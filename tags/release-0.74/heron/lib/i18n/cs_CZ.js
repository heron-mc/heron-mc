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
 * Maintained by: Martin Kokeš and Heron devs
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
	'No layer selected': 'Nebyla vybrána žádná vrstva',
	'Save Features': 'Uložit prvky',
	'Get Features': 'Získat prvky',
	'Feature information': 'Informace o prvku',
	'No Information found': 'Nenalezeny žádné informace',
	'Layer not added': 'Vrstva nebyla přidána',
	'Attribute': 'Atribut',
	'Value': 'Hodnota',
	'Recieving data': 'Přijímám data',
	'Layers': 'Vrstvy',
	'No match': 'Žádná shoda',
	'Loading...': 'Načítání...',
	'Bookmarks': 'Záložky',
	'Places': 'Místa',
	'Unknown': 'Neznámý',
	'Feature Info unavailable': 'Informace o prvku nejsou k dispozici',
	'Pan': '<b>Posuv</b><br>Držení levého tlačítka myši nad mapou posouvá aktuální<br>pohled; kolečko myši a pozice kurzoru nad mapou<br>zároveň ovládá přiblížení (i v jiných režimech než Posuv)',
	'Measure length': '<b>Měření délky</b><br>Každé klepnutí na levé tlačítko myši nad mapou vytvoří<br>bod měřeného úseku, dvojité klepnutí měření ukončí',
	'Measure area': '<b>Měření plochy</b><br>Každé klepnutí na levé tlačítko myši nad mapou vytvoří<br>bod měřeného polygonu, dvojité klepnutí měření ukončí',
	'Leg': 'Úsek',
	'Length': 'Délka',
	'Area': 'Plocha',
	'Result >': 'Výsledek >',
	'< Search': '< Hledat',
	'Search': 'Hledat',
	'Search Nominatim': 'Hledat (pomocí OSM Nominatim) podle názvu a adresy',
	'Search OpenLS': 'Hledat pomocí služby OpenLS',
	'Search PDOK': 'Vložit (část) české národní adresy',
	'Searching...': 'Hledání...',
	'Search Completed: ': 'Hledání dokončeno: ',
	'services': 'služby',
	'service': 'službu',
	'Type Nominatim': 'Zadejte název místa nebo adresu...',
	'Overlays': 'Překryvné vrstvy',
	'Waiting for': 'Čekám na',
	'Warning': 'Varování',
	'Zoom in': '<b>Přiblížit</b><br>Po klepnutí na levé tlačítko myši na mapě přiblíží pohled,<br>držením tlačítka a táhnutím lze označit plochu pro přiblížení',
	'Zoom out': '<b>Oddálit</b><br>Po klepnutí na levé tlačítko myši na mapě oddálí pohled',
	'Zoom to full extent': '<b>Oddálit na plný rozsah</b><br>Oddálí pohled pro plné zobrazení povoleného rozsahu mapy',
	'Zoom previous': '<b>Předchozí pohled</b><br>Přejde na předchozí pohled (zvětšení i rozsah)',
	'Zoom next': '<b>Další pohled</b><br>Přejde na další pohled (zvětšení i rozsah)',
	'Zoom': 'Přiblížení',

	// 0.68
	'Scale': 'Měřítko',
	'Resolution': 'Rozlišení',
	'Zoom': 'Přiblížení',
	'Create PDF': 'Vytvořit PDF',
	'Print': 'Tisk',
	'Print Dialog Popup': 'Dialog tisku',
	'Print Visible Map Area': 'Tisk viditelné plochy mapy',

	// 0.70
	'Export': 'Exportovat',
	'Choose a Display Option': 'Vyberte si možnost zobrazení',
	'Display': 'Zobrazení',
	'Grid': 'Tabulka',
	'Tree': 'Strom',
	'XML': 'XML',
	'Invalid export format configured: ': 'Nastaven neplatný formát exportu: ',
	'No features available or none-grid display chosen': 'Nejsou k dispozici žádné prvky nebo nebylo vybráno zobrazení Tabulka',
	'Choose an Export Format': 'Vyberte si formát pro export',
	'Print Visible Map Area Directly': 'Přímý tisk viditelné plochy mapy',
	'Direct Print Demo': 'Demo Přímý tisk',
	'This is a simple map directly printed.': 'Toto je jednoduchá přímo vytištěná mapa.',
	'Print Dialog Popup with Preview Map': '<b>Tisk</b><br>Otevře okno s náhledem a nastavením tisku',
	'Print Preview': 'Náhled tisku',
	'Print Preview Demo': 'Demo Náhled tisku',
	'Error getting Print options from server: ': 'Chyba při získávání nastavení tisku ze serveru: ',
	'Error from Print server: ': 'Chyba tiskového serveru: ',
	'No print provider url property passed in hropts.': 'V hropts není nadefinován url tiskového serveru.',
	'Create PDF...': 'Vytvořit PDF...',
	'Loading print data...': 'Nahrávání tiskových dat...',

	// 0.71
	'Go to coordinates': 'Přejít na souřadnice',
	'Go!': 'Přejít!',
	'Pan and zoom to location': 'Posunout a přiblížit na pozici',
	'Enter coordinates to go to location on map': 'Vložte souřadnice pro přechod na pozici na mapě',
	'Active Themes': 'Aktivní Témata',
	'Move up': 'Posunout nahoru',
	'Move down': 'Posunout dolů',
	'Opacity': 'Neprůhlednost',
	'Remove layer from list': 'Odebrat vrstvu ze seznamu',
	'Tools': 'Nástroje',
	'Removing': 'Odebírám',
	'Are you sure you want to remove the layer from your list of layers?': 'Jste si jisti, že chcete odstranit vrstvu z vašeho seznamu vrstev?',
	'You are not allowed to remove the baselayer from your list of layers!': 'Nemáte dovoleno odstranit základní vrstvu z vašeho seznamu vrstev!',
  // 0.72
  'Draw Features': 'Kreslit prvky',

  // 0.73
  'Spatial Search': 'Prostorové vyhledávání',
  'Search by Drawing': 'Hledání podle kresby',
  'Select the Layer to query': 'Vyberte vrstvu na dotaz',
  'Choose a geometry tool and draw with it to search for objects that touch it.': 'Vyberte nástroj pro vytvoření geometrie a použijte jej pro hledání objektů, které se jí dotýkají.',
  'Seconds': 'Sekundy',
  'Working on it...': 'Pracuji na tom...',
  'Still searching, please be patient...': 'Stále hledám, prosím o chvilku strpení...',
  'Still searching, have you selected an area with too many objects?': 'Stále hledám, nevybrali jste oblast s příliš mnoha objekty?',
  'as': 'jako',
  'Undefined (check your config)': 'Nedefinován (zkontrolujte konfiguraci)',
  'Objects': 'Objekty',
  'objects': 'objektů',
  'Features': 'Prvky',
  'features': 'prvků',
  'Result': 'Výsledek',
  'Results': 'Výsledky',
  'Using geometries from the result: ': 'Pomocí geometrií z výsledku: ',
  'with': 's',
  'Too many geometries for spatial filter: ': 'Příliš mnoho geometrií pro prostorový filtr: ',
  'Bookmark current map context (layers, zoom, extent)': '<b>Vytvořit záložku</b><br>Vytvoří záložku aktuální mapy (vrstvy, přiblížení, rozsah)',
  'Add a bookmark': 'Vytvořit záložku',
  'Bookmark name cannot be empty': 'Název záložky nesmí být prázdný',
  'Your browser does not support local storage for user-defined bookmarks': 'Váš prohlížeč neumožňuje lokální úložiště pro uživatelsky definované záložky',
  'Return to map navigation': 'Zpět na navigaci v mapě',
  'Draw point': 'Kreslit bod',
  'Draw line': 'Kreslit linii',
  'Draw polygon': 'Kreslit polygon',
  'Draw circle (click and drag)': 'Kreslit kruh (klepnutím a tažením)',
  'Draw Rectangle (click and drag)': 'Kreslit pravoúhelník (klepnutím a tažením)',
  'Sketch is saved for use in Search by Selected Features': 'Skica byla uložena pro použití při vyhledávání podle vybraných prvků',
  'Select a search...': 'Vybrat vyhledávání...',
  'Clear': 'Vyčistit',

  // 0.74
  'Project bookmarks': 'Záložky projektu',
  'Your bookmarks': 'Vaše záložky',
  'Name': 'Jméno',
  'Description': 'Popis',
  'Add': 'Přidat',
  'Cancel': 'Storno',
  'Remove bookmark:': 'Odstranit záložku:',
  'Restore map context:': 'Obnovit kontext mapy:',
  'Error: No \'BookmarksPanel\' found.': 'Chyba: Nenalezen \'BookmarksPanel\'.',
  'Input system': 'Souřadnicový systém',
  'Choose input system...': 'Vyberte souřadnicový systém...',
  'Map system': 'Souřadnicový systém',
  'X': 'X',
  'Y': 'Y',
  'Enter X-coordinate...': 'Vložte koordinát X...',
  'Enter Y-coordinate...': 'Vložte koordinát Y...',
  'Choose scale...': 'Vyberte měřítko...',
  'no zoom': 'žádné přiblížení',
  'Mode': 'Režim',
  'Remember locations': 'Pamatovat si místa',
  'Hide markers on close': 'Při zavření skrýt značky',
  'Remove markers on close': 'Při zavření odstranit značky',
  'Remove markers': 'Odstranit značky',
  'Location': 'Umístění',
  'Marker position: ': 'Pozice značky: ',
  'No features found': 'Nenalezeny žádné prvky',
  'Feature Info unavailable (you may need to make some layers visible)': 'Informace o prvcích nejsou k dispozici (možná budete muset zviditelnit některé vrstvy)',
  'Search by Feature Selection': 'Vyhledávání výběrem prvků'  
};
