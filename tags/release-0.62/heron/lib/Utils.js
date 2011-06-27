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
Ext.namespace("Heron.Utils");

/** api: (define)
 *  module = Heron
 *  class = Utils
 */

/** api: constructor
 *  .. class:: Utils()
 *
 *  Various utility functions.
 */
Heron.Utils = {
	/** Format a text string of XML into indented and optionally HTML-escaped text. */
	formatXml : function (xml, htmlEscape) {
		var reg = /(>)(<)(\/*)/g;
		var wsexp = / *(.*) +\n/g;
		var contexp = /(<.+>)(.+\n)/g;
		xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
		var pad = 0;
		var formatted = '';
		var lines = xml.split('\n');
		var indent = 0;
		var lastType = 'other';
		// 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions
		var transitions = {
			'single->single'	: 0,
			'single->closing'   : -1,
			'single->opening'   : 0,
			'single->other'	 : 0,
			'closing->single'   : 0,
			'closing->closing'  : -1,
			'closing->opening'  : 0,
			'closing->other'	: 0,
			'opening->single'   : 1,
			'opening->closing'  : 0,
			'opening->opening'  : 1,
			'opening->other'	: 1,
			'other->single'	 : 0,
			'other->closing'	: -1,
			'other->opening'	: 0,
			'other->other'	  : 0
		};

		for (var i = 0; i < lines.length; i++) {
			var ln = lines[i];
			var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
			var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
			var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)

			var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
			var fromTo = lastType + '->' + type;
			lastType = type;
			var padding = '';

			indent += transitions[fromTo];
			for (var j = 0; j < indent; j++) {
				padding += '    ';
			}

			if (htmlEscape) {
				ln = ln.replace('<', '&lt;');
				ln = ln.replace('>', '&gt;');
			}
			formatted += padding + ln + '\n';
		}

		return formatted;
	}
};