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

Ext.namespace("PreviewApp.config");

/** THIS FILE IS OBSOLETE Since LayerTreePanel handles all LayerNode enabling/disabling.
 *
PreviewApp.config.resolution = (function() {
	var layerResolutions = {};
	var appliedResolution = 0.0;
	
	var instance = {
		add: function(name, min, max) {			
			layerResolutions[name] = {min: min, max: max};
		},

		applyNodeExpanded: function( node )
		{
			for (var i=0; i<node.childNodes.length; i++)
			{
				var child = node.childNodes[i];
				if (child.leaf)
				{
					this.setColor(child.ui.elNode, Heron.App.getMap().resolution);
				}
			}
		},
	
		applyMoveEnd: function() 
		{
			var map = Heron.App.getMap();
			if (map)
			{
				if (map.resolution != appliedResolution)
				{
					this.setColor(document, map.resolution);
					appliedResolution = map.resolution;
				}
			}
		},
		
		setColor: function(rootNode, resolution)
		{
			//var elements = rootNode.getElementsByClassName("x-tree-node-anchor");

			var elements = rootNode.getElementsByTagName('*');	
			for (var i=0; i<elements.length; i++)
			{
				if (elements[i].className == "x-tree-node-anchor")
				{
					var layerName = elements[i].innerText;
					if (!layerName) 
					{
						layerName = elements[i].textContent;
					}
											
					if (layerResolutions[layerName])
					{
						var color = "black";
						if (resolution < layerResolutions[layerName].min || resolution > layerResolutions[layerName].max)
						{
							color = "lightgray";
						}
						elements[i].children[0].style.color = color;		
					}
				}
			}
		}
	};
	return (instance);
})();

*/