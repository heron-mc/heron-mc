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



/** api: example[theming]
 *  Theming
 *  -------
 *  Use other ExtJS themes, this "Greenery" theme created through http://extbuilder.dynalias.com.
 */

// The content of the HTML info panel.
Ext.namespace("Heron.options.info");
Heron.options.info.html =
'<div class="hr-html-panel-body"><p>This shows a theming example.' +
							'</p><br/><p>The ExtJS default blue theme can be changed.' +
							' One quick way is to use the online <a href="http://extbuilder.dynalias.com" target="_new" >ExtJS Theme Builder</a>. This app ' +
							'allows you to select colours/fonts etc and export this as a CSS/image archive.' +
							'Only some minor css modification is needed, mainly for Heron default.css. See <a href="../../resources/css/default-theme-greenery.css" target="_new" >default-theme-greenery.css</a> to override some Heron-specific css.</p><br/></div>'
