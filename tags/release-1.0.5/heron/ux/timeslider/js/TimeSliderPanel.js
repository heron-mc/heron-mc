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
Ext.namespace("Heron.widgets");

/** api: (define)
 *  module = Heron.widgets
 *  class = TimeSliderPanel
 *  base_link = `Ext.Panel <http://dev.sencha.com/deploy/ext-3.3.1/docs/?class=Ext.Panel>`_
 */

/** api: constructor
 *  .. class:: Heron.widgets.TimeSliderPanel(config)
 *
 *  A panel designed to hold HTML content.
 */
Heron.widgets.TimeSliderPanel = Ext.extend(Ext.Panel, {
    /** api: config[filterTitle]
     *  ``String``
     *  
     *  Title of the timeslider
     */
    filterTitle: 'Date Filter',

    /** api: config[layerNames]
     *  ``String Array``
     *  
     *  Names of layers (WMS-T) to be filtered on date/time
     *  http://dev.openlayers.org/releases/OpenLayers-2.13.1/examples/wmst.html
     * 
     *   If null, the timeslider will not have any effect.
     * 
     *  e.g. layerNames: ['KNMI Aardbevingen']
     */
    layerNames: null,
    
    /** api: config[timelineStartYear]
     *   ``Integer``
     * 
     *   First year on the timeline
     */
    timelineStartYear: 2013,
    
    /** api: config[timelineEndYear]
     *   ``Integer``
     * 
     *   Last year on the timeline
     */
    timelineEndYear: 2014,
    
    /** api: config[timelineCenterDate]
     *   ``Date``
     * 
     *   Date centered on visible timeline
     */
    timelineCenterDate: '2013-06-01',
     
    /** api: config[timelineDayWidth]
     *   ``Number``
     * 
     *   Width of a day in the timeline, results in intitial zoom of timeline
     *   Changing this value to (extreme) values may result in unexpected behaviour
     */
    timelineDayWidth: 1,
  
    /** api: config[timelineZoom]
     *   ``Boolean``
     * 
     *   Enable or disable the zoom in / zoom out control on the timeline
     */
    timelineZoom: false,
    
    /** api: config[filterStartDate]
     *   ``Date``
     * 
     *   Filter from date ('YYYY-MMM-DD' or 'YYYY-MM-DD')
     *   e.g. '2013-May-01' or '2013-05-01'
     */
    filterStartDate: '2013-Jul-01',
    
    /** api: config[filterEndDate]
     *   ``Date``
     * 
     *   Filter up to and including date ('YYYY-MMM-DD' or 'YYYY-MM-DD')
     *   e.g. '2013-May-01' or '2013-05-01'
     */
    filterEndDate: '2013-Sep-01',    
     
    initComponent: function () {
        this.dateSlider = null;

        Heron.widgets.TimeSliderPanel.superclass.initComponent.call(this);

        this.addListener('render', function () {

            this.loadMask = new Ext.LoadMask (
                this.body, {
                    msg: __('Loading...')
                }
            );
        });

        this.addListener('afterRender', function () {
            var map = Heron.App.getMap();
            var timeLayers = [];
            for (var i = 0; i < this.layerNames.length; i++) {
                timeLayers[i] = map.getLayersByName(this.layerNames[i])[0];

                // For now, for example
                timeLayers[i].setVisibility(true);
            }
            var l_oOptions = {
                dragHandles: true,
                dayWidth: this.timelineDayWidth,
                zoom: this.timelineZoom,
                centerDate: this.timelineCenterDate,
                onEnd: function (obj) {
                    try {
                        // filterTitle is out of scope, get it from the component
                        var filterTitle = Ext.getCmp('hr-timesliderpanel').filterTitle;
                        Ext.getCmp('hr-timesliderpanel').setTitle(filterTitle + ' ' + obj.startDate + ' - ' + obj.endDate);

                        // Dates are strings here, future development:  use real dates and ...Date.toString(format);
                        var startYear = obj.startDate.substr(6);
                        var startMonth = obj.startDate.substr(3, 2);
                        var startDay = obj.startDate.substr(0, 2);

                        var endYear = obj.endDate.substr(6);
                        var endMonth = obj.endDate.substr(3, 2);
                        var endDay = obj.endDate.substr(0, 2);

                        var ol_filter = new OpenLayers.Filter.Logical ({
                            type: OpenLayers.Filter.Logical.AND,
                            filters: [
                                new OpenLayers.Filter.Comparison({
                                    type: OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
                                    property: "taskstartdate",
                                    value: obj.startDate
                                }),
                                new OpenLayers.Filter.Comparison({
                                    type: OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO,
                                    property: "taskenddate",
                                    value: obj.endDate
                                })
                            ]   
                        });

                        var timeFilter = startYear + '-' + startMonth + '-' + startDay + 'T00:00:00.0Z/' + endYear + '-' + endMonth + '-' + endDay + 'T23:59:59.999Z';
                         for (var i = 0; i < timeLayers.length; i++) {
                            timeLayers[i].mergeNewParams({'time': timeFilter});
                            timeLayers[i].redraw();
                        }
                    }
                    catch (err) {
                        alert('Error: ' + err.message);
                    }
                }
            };
            try {
                var startDate = Date.parse(this.filterStartDate);
                var endDate = Date.parse(this.filterEndDate);
                this.dateSlider = new DateSlider('sliderbar', startDate, endDate, this.timelineStartYear, this.timelineEndYear, l_oOptions);

                // Call onEnd to set the timeLayers with the right filter
                var l_obj = new Object();
                l_obj.startDate = startDate.toString('dd-MM-yyyy');
                l_obj.endDate = endDate.toString('dd-MM-yyyy');
                this.dateSlider.options.onEnd (l_obj);
            }
            catch (err) {
                alert(err.message);
            }

        });
    }
});

/** api: xtype = hr_timesliderpanel */
Ext.reg('hr_timesliderpanel', Heron.widgets.TimeSliderPanel);

