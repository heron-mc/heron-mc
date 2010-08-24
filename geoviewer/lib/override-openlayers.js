/*
 * Copyright (C) 2010 Geodan
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
 
 
/*
 * Overiding OpenLayers to add support for GML 3.2.1
 *
 */
OpenLayers.Util.extend(OpenLayers.Format.WFST.v1.prototype.namespaces,
{gml32: 'http://www.opengis.net/gml/3.2'});



/*OpenLayers.Util.extend(OpenLayers.Format.WFST.v1_1_0.prototype.readers,
{"gml32": OpenLayers.Format.GML.v3.prototype.readers["gml"]});
OpenLayers.Format.WFST.v1_0_0.prototype.namespaces.gml32 = 'http://www.opengis.net/gml/3.2';
*/