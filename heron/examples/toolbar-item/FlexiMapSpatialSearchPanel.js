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
Ext.namespace("Heron.widgets.search");

/** api: (define)
 *  module = Heron.widgets.search
 *  class = FlexiMapSpatialSearchPanel
 *  base_link = `Heron.widgets.search.SearchByDrawPanel <SearchByDrawPanel.html>`_
 */

// Extra OL function to determine radius of a circle approximation through polygon
// From: https://gist.github.com/lydonchandra/4499081
OpenLayers.Geometry.LinearRing.prototype.getRadius = function () {
    //http://gis.stackexchange.com/questions/20982/how-to-get-the-radius-of-a-circle-in-openlayers
    //Use the formula for the area of a regular polygon.
    //With a radius of r and k vertices (where in practice k typically varies from 4 through 360),
    //the area now is A = r^2 * k Sin(360 / k) / 2. Solving for r yields r = Sqrt(2 A / (k Sin(360/k))).
    //For k = 40 that's r = 0.565352 * Sqrt(A).
    var area = Math.abs(this.getArea());
    var polygonSides = 100;
    return Math.sqrt(2 * area / (polygonSides * Math.sin(2 * Math.PI / polygonSides)));
};

/** api: constructor
 *  .. class:: FlexiMapSpatialSearchPanel(config)
 *
 *  A specialized SearchByDrawPanel to capture a drawn geometry and perform a Bentley FlexiMap Info Request.
 */
Heron.widgets.search.FlexiMapSpatialSearchPanel = Ext.extend(Heron.widgets.search.SearchByDrawPanel, {

    /** Constructor */
    initComponent: function () {

        this.items = [
            this.createDrawToolPanel()
        ];

        this.addListener("drawcontroladded", this.activateDrawControl, this);
        Heron.widgets.search.SearchByDrawPanel.superclass.initComponent.call(this);
    },

    createDrawToolPanel: function (config) {
        var defaultConfig = {
            html: '<div class="olControlEditingToolbar olControlNoSelect">&nbsp;</div>',
            preventBodyReset: true,
            style: {
                marginTop: '-20px',
                marginBottom: '0px'
            },
            activateControl: true,
            listeners: {
                afterrender: function (htmlPanel) {
                    var div = htmlPanel.body.dom.firstChild;
                    if (!div) {
                        Ext.Msg.alert(__('Warning'), __('Cannot render draw controls'));
                        return;
                    }
                    this.addDrawControls(div);
                    if (this.activateControl) {
                        this.activateDrawControl();
                    }
                },
                scope: this
            }
        };
        config = Ext.apply(defaultConfig, config);

        return this.drawToolPanel = new Heron.widgets.HTMLPanel(config);
    },

    /** api: method[onDrawingComplete]
     *  Called when feature drawn selected.
     */
    onDrawingComplete: function (searchPanel, selectionLayer) {
        this.searchFromSketch();
    },

    /** api: method[onDrawingComplete]
     *  Called when feature drawn selected (overridden).
     */
    onFeatureDrawn: function () {
        this.fireEvent('drawingcomplete', this, this.selectionLayer);
    },

    /** api: method[onPanelRendered]
     *  Called when Panel has been rendered.
     */
    onPanelRendered: function () {
        // Overidden - keep empty
    },

    onSearchCanceled: function (searchPanel) {
        // Overidden - keep empty
    },

    onSearchComplete: function (searchPanel, result) {
        console.log('Search Complete');

        // Remove the drawing
        this.selectionLayer.removeAllFeatures();
    },

    /** api: method[searchFromSketch]
     *
     *  Issue spatial search via FlexiMap Info Request using the drawn geometry.
     */
    searchFromSketch: function () {
        // Get the Featrue and geometry drawn from the drawing layer (first Feature in this.selectionLayer Vector Layer)
        var feature = this.selectionLayer.features[0];
        var geometry = feature.geometry;

        // Fetch the WKT string from the Feature (circle will be Polygon with 20 edges)
        var wktFormat = new OpenLayers.Format.WKT();
        var wktString = wktFormat.write(feature);

        // Only for circle determine midpoint and radius.
        if (geometry.components
            && geometry.components[0].CLASS_NAME == "OpenLayers.Geometry.LinearRing"
            && geometry.components[0].components.length == 31) {

            // Get center and radius
            var midPoint = geometry.components[0].getCentroid();
            var x = midPoint.x;
            var y = midPoint.y;
            var radius = geometry.components[0].getRadius();

            // Create WKT for Circle (though CIRCLE is not an official WKT!)
            wktString = 'CIRCLE (....)';
        }

        this.sketch = true;

        // Do the FlexiMap Info Search here
        console.log('searchFromSketch: ' + wktString);

        // Call this in callback from FlexiMap Info Search (clears drawing)
        this.fireEvent('searchcomplete', this);
    },

    updateStatusPanel: function (text) {
        // Overidden - keep empty
    }

});

/** api: xtype = hr_searchbydrawpanel */
Ext.reg('hr_fleximapspatialsearchpanel', Heron.widgets.search.FlexiMapSpatialSearchPanel);
