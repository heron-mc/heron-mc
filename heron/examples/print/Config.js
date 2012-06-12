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

// See ToolbarBuilder.js : each string item points to a definition
// in Heron.ToolbarBuilder.defs. Extra options and even an item create function
// can be passed here as well.
Heron.options.map.toolbar = [
	{type: "featureinfo", options: {max_features: 20}},
	{type: "-"} ,
	{type: "pan"},
	{type: "zoomin"},
	{type: "zoomout"},
	{type: "zoomvisible"},
	{type: "-"} ,
	{type: "zoomprevious"},
	{type: "zoomnext"},
	{type: "-"},
/** Use "geodesic: true" for non-linear/Mercator projections like Google, Bing etc */
	{type: "measurelength", options: {geodesic: false}},
	{type: "measurearea", options: {geodesic: false}},
	{type: "-"} ,
	{type: "printdialog", options: {
		capabilities: {
			"scales":[
				{"name":"1:25,000","value":"19049"},
				{"name":"1:50,000","value":"38098"},
				{"name":"1:100,000","value":"76195"},
				{"name":"1:200,000","value":"152391"},
				{"name":"1:500,000","value":"304781"},
				{"name":"1:1,000,000","value":"609563"},
				{"name":"1:2,000,000","value":"1219125"},
				{"name":"1:4,000,000","value":"2438250"}
			],
			"dpis":[
				{"name":"75","value":"75"},
				{"name":"150","value":"150"},
				{"name":"300","value":"300"}
			],
			"layouts":[
				{"name":"A4 portrait","map":{"width":440,"height":483},"rotation":true},
				{"name":"Legal","map":{"width":440,"height":483},"rotation":false}
			],
			"printURL":"http://local.kademo.nl/gs2/pdf/print.pdf",
			"createURL":"http://local.kademo.nl/gs2/pdf/create.json"}
	}}
];

