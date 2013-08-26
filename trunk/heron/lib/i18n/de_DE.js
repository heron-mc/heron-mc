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
	'Active Layers' : 'Aktive Layer',
	'Base Layer': 'Basis Layer',
	'Base Layers': 'Basis Layer',
	'BaseMaps': 'Basiskarten',
	'Choose a Base Layer': 'Wahl ein Basis Layer',
	'Legend': 'Legende',
	'Feature Info': 'Feature Info',
	'Feature Data': 'Feature Daten',
	'Feature(s)': 'Feature(s)',
	'No layer selected': 'Kein Layer ausgewï¿½hlt',
	'Save Features': 'Speichere Features',
	'Get Features': 'Zeige Features',
	'Feature information': 'Feature Information',
	'No Information found': 'Keine Information gefunden',
	'Layer not added': 'Kein Layer hinzugefï¿½gt',
	'Attribute': 'Attribut',
	'Value': 'Wert',
	'Recieving data':'Erhalte Daten',
	'Layers': 'Layer',
	'No match': 'Keine &#220;bereinstimmung',
	'Loading...': 'Laden...',
	'Bookmarks': 'Lesezeichen',
	'Places': 'Orte',
	'Unknown': 'Unbekannt',
	'Feature Info unavailable':'Feature Info nicht verfügbar.',
	'Pan': 'Ansicht verschieben<br>Linke Maustaste gedr&#252;ckt halten',
	'Measure length': 'L&#228;nge messen',
	'Measure area': 'Fl&#228;che messen',
	'Leg' : 'Teilstrecke',
	'Length': 'L&#228;nge',
	'Area': 'Fl&#228;che',
	'Result >' : 'Resultat >',
	'< Search' : '< Suche',
	'Search': 'Suche',
	'Search Nominatim': 'Suche (OSM) Daten mit Namen und Adresse',
	'Search OpenLS' : 'Suche mit OpenLS Service',
	'Search PDOK': 'Eingabe (parts of) deutsche nationale Addresse',
	'Searching...': 'Suche...',
	'Search Completed: ': 'Suche abgeschlossen: ',
	'services':'Dienste',
	'service':'Dienst',
	'Type Nominatim': 'Eingabe Ort oder Adresse...',
	'Overlays': 'Themenkarten',
	'Waiting for': 'Warte auf',
	'Warning': 'Warnung',
	'Zoom in': 'Hereinzoomen<br>Zoombox mit linker Maustaste<br>aufziehen oder Mausklick',
	'Zoom out': 'Herauszoomen<br>Zoombox mit linker Maustaste<br>aufziehen oder Mausklick',
	'Zoom to full extent':'Ansicht auf max. Ausdehnung',
	'Zoom previous': 'Vorherige Ansicht',
	'Zoom next': 'N&#228;chste Ansicht',

    // 0.68
	'Scale': 'Ma&#223;stab',
	'Resolution': 'Aufl&#246;sung',
	'Zoom': 'Zoom-Ebene',

    // 0.70
	'Export': 'Export',
	'Choose a Display Option' : 'Anzeigeformat w&#228;hlen',
	'Display' : 'Anzeige',
	'Grid' : 'Tabelle',
	'Tree' : 'Baum',
	'XML' : 'XML',
	'Invalid export format configured: ' : 'Kein g&#252;ltiges Exportformat gew&#228;hlt: ',
	'No features available or non-grid display chosen' : 'Kein Objekt gefunden oder keine Tabellen-Anzeige gew&#228;hlt',
	'Choose an Export Format' : 'Exportformat w&#228;hlen',
	'Print Visible Map Area Directly' : 'Direkter PDF-Druck des Karten-Ausschnitts',
	'Direct Print Demo' : 'Direktdruck - Ausschnitt',
	'This is a simple map directly printed.' : 'Direkt gedruckter Karten-Ausschnitt.',
	'Print Dialog Popup with Preview Map' : 'PDF-Druckdialog mit Karten-Vorschau',
	'Print Preview' : 'Druck-Vorschau',
	'Print Preview Demo' : 'Druck - Ausschnitt',
	'Error getting Print options from server: ' : 'Fehler bei der Ermittlung der Optionen des Druck-Servers: ',
	'Error from Print server: ' : 'Fehler des Druck-Servers: ',
	'No print provider url property passed in hropts.' : 'Keine Druck-Provider URL in hropts definiert.',
	'Create PDF...' : 'Erstelle PDF...',
	'Loading print data...' : 'Lade Druckdaten...',

	 // 0.71
	'Go to coordinates': 'Sprung zur Position mit Koordinaten',
	'Go!': 'Los!',
	'Pan and zoom to location': 'Navigiere zu den Koordinaten',
	'Enter coordinates to go to location on map': 'Koordinaten-Eingabe - Sprung<br>zur Position auf der Karte',
	'Active Themes': 'Aktive Themen',
	'Move up': 'Nach oben',
	'Move down': 'Nach unten',
	'Opacity': 'Tranzparenz',
	'Remove layer from list': 'Layer aus Liste entfernen',
	'Tools': 'Tools',
	'Removing': 'Entfernen',
	'Are you sure you want to remove the layer from your list of layers?': 'Sind Sie sicher, dass Sie den Layer aus der Liste entg&#252;ltig entfernen wollen?',
	'You are not allowed to remove the baselayer from your list of layers!': 'Sie sind nicht berechtigt, den Basislayer aus der Liste zu entfernen!',

	// 0.72
	'Draw Features': 'Geo-Objekte zeichnen',

    // 0.73
    'Spatial Search': 'R&#228;umliche Suche',
    'Search by Drawing': 'Suche nach gezeichneten Geometrien',
    'Select the Layer to query': 'Layer für Abfrage w&#228;hlen',
    'Choose a geometry tool and draw with it to search for objects that touch it.': 'W&#228;hlen Sie ein Geometrie-Werkzeug zum Zeichnen, um nach Objekten zu suchen, die es ber&#252;hren.',
    'Seconds': 'Sekunden',
    'Working on it...': 'In Bearbeitung...',
    'Still searching, please be patient...': 'Suche dauert an, bitte haben Sie Geduld...',
    'Still searching, have you selected an area with too many objects?': 'Suche dauert an, haben Sie einen Bereich mit zu vielen Objekten gew&#228;hlt?',
    'as': 'als',
    'Undefined (check your config)': 'Unbekannt (Konfiguration pr&#252;fen)',
    'Objects': 'Objekte',
    'objects': 'objekte',
    'Features': 'Features',
    'features': 'features',
    'Result': 'Ergebnis',
    'Results': 'Ergebnisse',
    'Using geometries from the result: ': 'Geometrien aus dem Ergebnis benutzen: ',
    'with': 'mit',
    'Too many geometries for spatial filter: ': 'Zu viele Geometrien für den Suchfilter: ',
    'Bookmark current map context (layers, zoom, extent)': 'Lesezeichen f&#252;r die aktuelle Ansicht<br>erstellen (Layer, Zoom, Bereich)',
    'Add a bookmark': 'Lesezeichen hinzuf&#252;gen',
    'Bookmark name cannot be empty': 'Lesezeichen-Name darf nicht leer sein',
    'Your browser does not support local storage for user-defined bookmarks': 'Ihr Browser unterst&#252;tzt nicht das lokale Abspeichern von Benutzer definierten Lesezeichen',
    'Return to map navigation': 'Zur&#252;ck zur Karten-Navigation',
    'Draw point': 'Zeichne Punkt',
    'Draw line': 'Zeichne Linie',
    'Draw polygon': 'Zeichne Polygon',
    'Draw circle (click and drag)': 'Zeichne Kreis (Klicken und Ziehen)',
    'Draw Rectangle (click and drag)': 'Zeichne Rechteck (Klicken und Ziehen)',
    'Sketch is saved for use in Search by Selected Features': 'Gezeichnete Geometrien wurden für die Auswahl gespeichert',
    'Select a search...': 'W&#228;hlen Sie die Suchmethode...',
    'Clear': 'Löschen',

    // 0.74
    'Project bookmarks': 'Projekt Lesezeichen',
    'Your bookmarks': 'Ihre Lesezeichen',
    'Name': 'Name',
    'Description': 'Bezeichnung',
    'Add': 'Hinzuf&#252;gen',
    'Cancel': 'Abbruch',
    'Remove bookmark:': 'Lesezeichen entfernen:',
    'Restore map context:': 'Ansicht wiederherstellen:',
    'Error: No \'BookmarksPanel\' found.': 'Fehler: Kein \'BookmarksPanel\' vorhanden.',
    'Input system': 'Eingabe-System',
    'Choose input system...': 'Eingabe-System wählen...',
    'Map system': 'Karten-System',
    'X': 'X',
    'Y': 'Y',
    'Enter X-coordinate...': 'Eingabe X-Koordinate...',
    'Enter Y-coordinate...': 'Eingabe Y-Koordinate...',
    'Choose scale...': 'Maßstab wählen...',
    'no zoom': 'kein Zoom',
    'Mode': 'Modus',
    'Remember locations': 'Positionen merken',
    'Hide markers on close': 'Marker beim Schließen verbergen',
    'Remove markers on close': 'Marker beim Schließen löschen',
    'Remove markers': 'Marker löschen',
    'Location': 'Position',
	'Marker position: ': 'Marker Position: ',
    'No features found': 'Keine Objekte gefunden',
    'Feature Info unavailable (you may need to make some layers visible)': 'Keine Objekt-Information verfügbar (möglicherweise müssen Sie weitere Layer einschalten).',
    'Search by Feature Selection': 'Suchen &#252;ber Objekt-Auswahl',
	'Download': 'Download',
	'Choose a Download Format': 'Bitte Download Format wählen',
	'Remove all results': 'Alle Ergebnisse entfernen',
	'Download URL string too long (max 2048 chars): ': 'Download URL Zeichenkette zu lang (max 2048 Zeichen): '

};
