/* Original from: http://geoservices.knmi.nl/adaguc_portal/extgui.js
 * Their license conditions follow:
 *
 * Graphical user interface to control WebMapJS.js
 * Copyright (C) 2011, Royal Netherlands Meteorological Institute (KNMI)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or any
 * later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 //============================================================================
 //Name        : extgui.js
 //Author      : MaartenPlieger (plieger at knmi.nl)
 //Version     : 0.5 (October 2011)
 //Description : This is the graphical user interface to control WebMapJS.js
 //============================================================================

 * This original was adapted by Just van den Broecke, initially for the Heron Client in the
 * SOS Pilot project, see http://sensors.geonovum.nl/heronclient and then integrated into
 * the Heron core.
 */
Ext.namespace("Heron.widgets");

/** api: (define)
 *  module = Heron.widgets
 *  class = SimpleTimeSliderPanel
 *  base_link = `Ext.Panel <http://docs.sencha.com/extjs/3.4.0/#!/api/Ext.Panel>`_
 */


/** api: example
 * Panel with a simple slider and date/time fields to manipulate WMS Layers with Time Dimension.
 * Given a time range (start/end time)
 * the slider can be used to set a specific date/time. Layers configured for this Panel
 * will need to support WMS-Dimension Time. When a date/time is set, all Layers
 * are updated (mergeNewParams). This widget originally appeared in the HeronClient app
 * within the Geonovum SOS Pilot project, see http://sensors.geonovum.nl/heronclient.
 *
 * This widget is called SimpleTimeSliderPanel, as there is also a more advanced Heron TimeSlider Panel
 * see heron/ux/timeslider. Th e SimpleTimeSliderPanel can be configured with a starttime and an optional endtime.
 * If the latter is not present the current date and time is taken. The steptime can be specified. All date/times are in
 * ISO8601 notation. A steptime of one hour is e.g. PT1H'. In addition the Layer names need to be configured as
 * only WMS (dimension) time-aware layers can be used.  Below is an example config as used in the related example.
 *
 *  .. code-block:: javascript
        {
            xtype: 'hr_simpletimesliderpanel',
            title: 'Rain in the Netherlands since June 2014',
            startDateTime: '2014-06-01T00:00:00Z',
            // endDateTime: '2014-09-01T00:00:00Z',  default is current time
            stepTime: 'PT1H',
            dateTime: '2014-08-08T16:00:00Z',
            layerNames: ["KNMI Radar Color", "KNMI Radar"]
        }

 * @extends Ext.Panel
 *
 */

 /**
   IE8 doesn't support .toISOString()
   http://stackoverflow.com/questions/12907862/ie8-date-compatibility-error
   https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/toISOString
   Wolfram Winter
 */
 if ( !Date.prototype.toISOString ) {
    (function() {
        function pad(number) {
            var r = String(number);
            if ( r.length === 1 ) {
                r = '0' + r;
            }
            return r;
        }
        Date.prototype.toISOString = function() {
            return this.getUTCFullYear()
                + '-' + pad( this.getUTCMonth() + 1 )
                + '-' + pad( this.getUTCDate() )
                + 'T' + pad( this.getUTCHours() )
                + ':' + pad( this.getUTCMinutes() )
                + ':' + pad( this.getUTCSeconds() )
                + '.' + String( (this.getUTCMilliseconds()/1000).toFixed(3) ).slice( 2, 5 )
                + 'Z';
        };
    }() );
}

/** api: constructor
 *  .. class:: SimpleTimeSliderPanel(config)
 *
 * Panel with a simple slider and date/time fields to manipulate WMS Layers with Time Dimension.
 *
 */
Heron.widgets.SimpleTimeSliderPanel = Ext.extend(Ext.Panel, {
    /** api: config[title]
     *  title of the panel
     *  default value is "Simple Time Slider".
     */
    title: __('Simple Time Slider'),

    /** api: config[timeLayers]
     *  Array of names, of the WMS Layers that should be refreshed with Time parameters whever the time changes.
     *  The WMS Layers must support WMS Dimension for the dimensionName (default 'time') parameter.
     */
    timeLayers: [],

    /** api: config[startDateTime]
     *  Start date and time for slider start in ISO8601 notation. Example: '2014-06-01T00:00:00Z'.
     *  Default is current date and time.
     */
    startDateTime: new Date().toISOString(),

    /** api: config[endDateTime]
     *  End date and time for slider end in ISO8601 notation. Example: '2014-12-14T00:00:00Z'.
     *  Default is current date and time.
     */
    endDateTime: new Date().toISOString(),

    /** api: config[stepTime]
     *  Time step in slider and spinner widgets in ISO8601/OGC notation. Example: 'PT4H'.
     *  Default is 'PT1H'.
     */
    stepTime: 'PT1H',

    /** api: config[dateTime]
     *  Actual date and time for slider in ISO8601 notation. Example: '2014-10-14T00:00:00Z'.
     *  Default is current date and time.
     */
    dateTime: new Date().toISOString(),

    /** api: config[dimensionName]
     *  The OGC WMS name for the Dimension to use as WMS Layer parameter. Default is 'time'
     */
    dimensionName: 'time',

    /** api: config[dimensionUnits]
     *  The units for Dimension values. Default is ''ISO8601'
     */
    dimensionUnits: 'ISO8601',

    initComponent: function () {
        // Create end interval date from current date for timeseries slider config.
        this.dimension = {
            name: this.dimensionName,
            currentValue: this.dateTime,
            defaultValue: this.dateTime,
            units: this.dimensionUnits,
            values: this.startDateTime + '/' + this.endDateTime + '/' + this.stepTime
        };

        var _this = this;
        _this.isDateRefreshing = false;

        // _this.isAnimating=false;
        _this.getCurrentValue = function () {
            return _this.getDateString();
        };

        _this.panelType = 'Range';
        _this.prevPanel = new Ext.Panel({
            region: 'west',
            width: 30,
            layout: 'form',
            border: false,
            items: [ new Ext.Button({
                width: 30,
                text: '&lt;',
                hideLabel: true,
                listeners: {
                    'click': function (e) {
                        _this.slider.setValue(_this.slider.getValue() - 1);
                    }
                }
            }) ]
        });
        _this.nextPanel = new Ext.Panel({
            region: 'east',
            width: 30,
            layout: 'form',
            border: false,
            items: [ new Ext.Button({
                width: 30,
                text: '&gt;',
                hideLabel: true,
                listeners: {
                    'click': function (e) {
                        _this.slider.setValue(_this.slider.getValue() + 1);
                    }
                }
            }) ]
        });
        _this.slider = new Ext.Slider({
            value: 50,
            increment: 1,
            minValue: 0,
            maxValue: 100,
            listeners: {
                change: {
                    fn: function (a) {
                        _this.animateCheckBox.setValue(false);
                        _this.refreshCheckBox.setValue(false);
                        _this.sliderChanged();
                    }
                }
            }
        });


        _this.slider.mySetValue = function (v) {
            //error("mySetValue = "+v);
            _this.slider.suspendEvents();
            // _this.slider.setMaxValue(_this.slider.maxValue);
            _this.slider.setValue(v);
            _this.sliderChanged();
            _this.slider.resumeEvents();
        };

        _this.sliderPanel = new Ext.Panel({
            layout: 'form',
            region: 'center',
            items: [ _this.slider ],
            border: false

        });

        _this.sliderPNPanel = new Ext.Panel({
            layout: 'border',
            region: 'center',
            items: [ _this.prevPanel, _this.sliderPanel, _this.nextPanel ],
            border: false,
            frame: true

        });

        // This is the date selector
        _this.dateSetMinMaxWindow = new Ext.Window({
            modal: true,
            labelWidth: 125,
            frame: true,
            layout: 'form',
            title: 'Date Range',
            closeAction: 'hide',
            bodyStyle: 'padding:5px 5px 0',
            width: 350,
            defaults: {
                width: 175
            },
            defaultType: 'datefield',
            bbar: [
                {
                    xtype: 'button',
                    text: 'Reset start and end dates',
                    handler: function () {
                        var minValue = _this.timeRange.getDateAtTimeStep(0);
                        var maxValue = _this.timeRange.getDateAtTimeStep(_this.timeRange.timeSteps);
                        _this.slider.setMinValue(0);
                        _this.slider.setMaxValue(_this.timeRange.timeSteps);
                        _this.sliderChanged();
                        var startdt = _this.dateSetMinMaxWindow.getComponent('startdt');
                        var enddt = _this.dateSetMinMaxWindow.getComponent('enddt');
                        startdt.setMinValue(minValue);
                        enddt.setMaxValue(maxValue);
                    }
                }
            ],
            items: [
                {
                    fieldLabel: 'Start Date',
                    name: 'startdt',
                    itemId: 'startdt',
                    vtype: 'daterange',
                    format: 'Y-m-d\\TH:i:s\\Z',
                    listeners: {
                        valid: {
                            fn: function (a) {
                                if (a.getValue()) {
                                    try {
                                        _this.slider.setMinValue(_this.timeRange.getTimeStepFromDate(a.getValue()));
                                        _this.sliderChanged();
                                    } catch (e) {
                                        error(e);
                                    }
                                }
                            }
                        }
                    }
                },
                {
                    fieldLabel: 'End Date',
                    name: 'enddt',
                    itemId: 'enddt',
                    vtype: 'daterange',
                    format: 'Y-m-d\\TH:i:s\\Z',
                    listeners: {
                        valid: {
                            fn: function (a) {
                                if (a.getValue()) {
                                    try {
                                        _this.slider.setMaxValue(_this.timeRange.getTimeStepFromDate(a.getValue()));
                                        _this.sliderChanged();
                                    } catch (e) {
                                        error(e);
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        });
        // This is the date selector
        _this.dateMinMaxSelector = new Ext.Button({
            iconCls: 'date-trigger',
            width: '24',
            region: 'east',
            handler: function (b) {
                var startdt = _this.dateSetMinMaxWindow.getComponent('startdt');
                var enddt = _this.dateSetMinMaxWindow.getComponent('enddt');
                startdt.endDateField = enddt;
                enddt.startDateField = startdt;
                var minValue = _this.timeRange.getDateAtTimeStep(0);
                var maxValue = _this.timeRange.getDateAtTimeStep(_this.timeRange.timeSteps);

                startdt.myMin = minValue;
                startdt.myMax = maxValue;
                enddt.myMin = minValue;
                enddt.myMax = maxValue;
                var pos = b.getPosition();
                _this.dateSetMinMaxWindow.setPosition(pos[0], pos[1]);
                _this.dateSetMinMaxWindow.show(b);
                if (!startdt.getValue() || !enddt.getValue()) {
                    startdt.setValue(minValue);
                    enddt.setValue(maxValue);
                } else {
                    var date = _this.timeRange.getDateAtTimeStep(_this.slider.getPosition());
                    if (date > minValue)
                        startdt.setMinValue(date);
                    else
                        startdt.setMinValue(minValue);
                    if (date < maxValue)
                        enddt.setMinValue(date);
                    else
                        enddt.setMaxValue(maxValue);
                }
            }
        });

        // Date field
        _this.getDateString = function () {
            return _this.dateFieldYear.getValue() + "-" +
                _this.dateFieldMonth.getValue() + "-" +
                _this.dateFieldDay.getValue() + "T" +
                _this.dateFieldHour.getValue() + ":" +
                _this.dateFieldMinute.getValue() + ":" +
                _this.dateFieldSecond.getValue() + "Z";
        };

        _this.setDateString = function (dateString) {

            _this.skipEvents = true;
            _this.dateFieldYear.setValue(dateString.substring(0, 4));
            _this.dateFieldMonth.setValue(dateString.substring(5, 7));
            _this.dateFieldDay.setValue(dateString.substring(8, 10));
            _this.dateFieldHour.setValue(dateString.substring(11, 13));
            _this.dateFieldMinute.setValue(dateString.substring(14, 16));
            _this.dateFieldSecond.setValue(dateString.substring(17, 19));
            // JvdB mainMap.map.setDimension(_this.dim.name, dateString);
            _this.skipEvents = false;
        };

        /*  var YYYYMMDDExpr = /[\d]{4}-?[\d]{2}-?[\d]{2}T-?[\d]{2}:?[\d]{2}:?[\d]{2}Z/;
         _this.dateField = new Ext.form.TextField({
         hideLabel : true,

         region : 'center',
         disabled : false,
         emptyText : 'YYYY-MM-DDThh:mm:ssZ',
         allowBlank : false,
         invalidText : 'The format is wrong, it should be like : \'2009-03-23T16:05:00Z\'',
         validator : function(value){
         return YYYYMMDDExpr.test(value);
         },
         listeners : {
         valid : {
         fn : function(a){

         var timeStep = 0;
         try {
         timeStep = _this.timeRange.getTimeStepFromISODate(_this.getDateString());
         } catch (e) {
         error("Invalid date entered!");
         return;
         }
         // debug("valid"+timeStep);

         _this.slider.setValue(timeStep);// TODO CHECK this!

         }
         }
         }
         });*/
        var NumberExpr2digits = /[\d]{2}/;
        var NumberExpr4digits = /[\d]{4}/;
        var DateFieldDialog = Ext.extend(Ext.form.TextField, {
            initComponent: function () {
                var d = this;
                Ext.apply(this, {

                    height: 12, listeners: {
                        valid: {
                            fn: function (a) {
                                if (_this.skipEvents)return;
                                var timeStep = 0;
                                try {
                                    timeStep = _this.timeRange.getTimeStepFromISODate(_this.getDateString());
                                } catch (e) {
                                    error("Invalid date entered!");
                                    return;
                                }
                                // debug("valid"+timeStep);

                                _this.slider.setValue(timeStep);// TODO CHECK this!

                            }
                        },
                        //Try to make a valid text, by adding a "0" in front of the value.
                        specialkey: {fn: function (t, e) {
                            if (e.getKey() == e.ENTER) {
                                var v = t.getValue();
                                if (isNumber(v)) {
                                    if (v < 10) {
                                        v = "0" + v;
                                        if (t.validator(v)) {
                                            t.setValue(v);
                                        }
                                    }
                                }
                            }
                        }}
                    }
                });
                DateFieldDialog.superclass.initComponent.apply(this, arguments);
            }
        });

        function isNumber(o) {
            return !isNaN(o - 0);
        }

        var DateFieldSpinnerDialog = Ext.extend(Ext.ux.form.SmallSpinnerField, {
            initComponent: function () {
                //var d = this;
                this._width = this.width;

                this.doLayout = function () {
                    this.spinner.doResize(this._width, 0);
                }
                Ext.apply(this, {
                    height: 22, margins: '0 0 0 0', listeners: {
                        valid: {
                            fn: function (a) {
                                if (_this.skipEvents)return;
                                var timeStep = 0;
                                try {
                                    timeStep = _this.timeRange.getTimeStepFromISODate(_this.getDateString());
                                } catch (e) {
                                    error("Invalid date entered!");
                                    return;
                                }
                                // debug("valid"+timeStep);

                                _this.slider.setValue(timeStep);// TODO CHECK this!

                            }
                        },
                        //Try to make a valid text, by adding a "0" in front of the value.
                        specialkey: {fn: function (t, e) {
                            if (e.getKey() == e.ENTER) {
                                var v = t.getValue();
                                if (isNumber(v)) {
                                    if (v < 10) {
                                        v = "0" + v;
                                        if (t.validator(v)) {
                                            t.setValue(v);
                                        }
                                    }
                                }
                            }
                        }}


                    }
                });
                DateFieldSpinnerDialog.superclass.initComponent.apply(this, arguments);
            }
        });

        _this.dateChooser = new Ext.Button({
            iconCls: 'date-trigger',
            width: '24',
            region: 'east', frame: false, border: false,
            handler: function (b) {
                var d = new Ext.Window({
                    items: [new Ext.DatePicker({
                        listeners: {
                            'select': function (m, date) {
                                d.hide();
                                _this.skipEvents = true;
                                _this.dateFieldYear.setValue(date.getUTCFullYear());
                                _this.dateFieldMonth.setValue(date.getUTCMonth() + 1);
                                _this.skipEvents = false;
                                _this.dateFieldDay.setValue(date.getUTCDate() + 1);
                            }
                        }
                    })
                    ]
                });
                d.show();
            }
        });


        _this.dateFieldYear = new DateFieldSpinnerDialog({fieldLabel: 'Year', width: 45, validator: function (value) {
            return  NumberExpr4digits.test(value);
        }});
        _this.dateFieldMonth = new DateFieldSpinnerDialog({fieldLabel: 'Month', width: 34, validator: function (value) {
            return  NumberExpr2digits.test(value);
        }});
        _this.dateFieldDay = new DateFieldSpinnerDialog({fieldLabel: 'Day', width: 34, validator: function (value) {
            return  NumberExpr2digits.test(value);
        }});
        _this.dateFieldHour = new DateFieldSpinnerDialog({fieldLabel: 'Hour', width: 34, validator: function (value) {
            return  NumberExpr2digits.test(value);
        }});
        _this.dateFieldMinute = new DateFieldSpinnerDialog({fieldLabel: 'Minute', width: 34, validator: function (value) {
            return  NumberExpr2digits.test(value);
        }});
        _this.dateFieldSecond = new DateFieldSpinnerDialog({fieldLabel: 'Second', width: 34, validator: function (value) {
            return  NumberExpr2digits.test(value);
        }});

        /*
         * _this.dateField = new Ext.form.TextField({ hideLabel:true,
         *
         * region:'center',
         * disabled:false,emptyText:'YYYY-MM-DDThh:mm:ssZ',allowBlank:false,
         * invalidText: 'The format is wrong, it should be like :
         * \'2009-03-23T16:05:00Z\'', validator: function(value){ return
         * YYYYMMDDExpr.test(value); }, listeners:{valid:{fn:function(a) { var
         * timeStep=0; try{
         * timeStep=_this.timeRange.getTimeStepFromISODate(_this.getDateString()); }
         * catch(e){ error("Invalid date entered!"); return; }

         * _this.slider.setValue(timeStep);//TODO CHECK this!
         *
         * }}} });
         *
         * , _this.dateMinMaxSelector
         */

        _this.leftDatePanel = new Ext.Panel({
            layout: 'hbox',
            width: 400,
            layoutConfig: {
                pack: 'start'

            },

            ctCls: 'x-toolbar',
            items: [
                {xtype: 'label', text: 'Date: ', margins: '5px 0px 5px 0px'},
                _this.dateFieldYear,
                {xtype: 'label', text: ' - ', margins: '5px 0px 5px 0px'},
                _this.dateFieldMonth,
                {xtype: 'label', text: ' - ', margins: '5px 0px 5px 0px'},
                _this.dateFieldDay,
                {xtype: 'label', text: '  Time: ', margins: '5px 0px 5px 5px'},
                _this.dateFieldHour,
                {xtype: 'label', text: ' : ', margins: '5px 0px 5px 0px'},
                _this.dateFieldMinute,
                {xtype: 'label', text: ' : ', margins: '5px 0px 5px 0px'},
                _this.dateFieldSecond
            ],
            border: false, frame: true

        });
        _this.isDateRefreshRunning = false;
        _this.refreshCheckBox = new Ext.form.Checkbox({
            checked: false,
            boxLabel: 'auto update',
            tooltip: '',
            listeners: {
                check: {
                    fn: function (a, checked) {
                        if (checked) {
                            _this.isDateRefreshing = true;
                            if (!_this.refreshTimer) {
                                _this.refreshTimer = new Timer();
                            }
                            _this.refreshTFunc = function () {
                                if (_this.refreshCheckBox.getValue() == false) {
                                    _this.isDateRefreshRunning = false;
                                    return;
                                }
                                _this.refresh();
                                _this.isDateRefreshRunning = true;
                                _this.refreshTimer.InitializeTimer(60 * 60, _this.refreshTFunc);
                            }
                            if (_this.isDateRefreshRunning == false)
                                _this.refreshTFunc();
                        } else
                            _this.isDateRefreshing = false;
                    }
                }
            }
        });
        var numberOfAnimationFrames = 12;
        _this.startAnimation = function () {

            /*
             * var endDate = _this.getDateString(); var startStep =
             * _this.timeRange.getTimeStepFromISODate(endDate)-12;
             * if(startStep<0)startStep=0; var startDate =
             * _this.timeRange.getDateAtTimeStep(startStep).toISO8601();
             * var newTime = startDate+"/"+endDate;
             * mainMap.map.setDimension('time',newTime);
             * mainMap.map.draw();
             */
            // return;
            if (!_this.animationTimer) {
                _this.animationTimer = new Timer();
            }
            _this.loopDates = new Array();
            //var endDate = _this.getDateString();

            // JvdB var endDate = mainMap.map.getDimension(_this.dim.name).currentValue;
            var endDate = _this.dimension.currentValue;
            var endStep;
            if (endDate == 'current') {
                endStep = _this.timeRange.timeSteps;
            } else {
                endStep = _this.timeRange.getTimeStepFromISODate(endDate);
            }
            _this.animateCheckBox.origStepBeforeAnimation = endStep;
            var numSteps = numberOfAnimationFrames;
            if (numSteps > endStep)
                numSteps = endStep;
            if (numSteps <= 1) {
                alert("Cannot animate: there is only one timestep available.");
                _this.animateCheckBox.setValue(false);
                _this.refreshCheckBox.setValue(false);
                return;
            }
            var startStep = endStep - (numSteps - 1);
            if (startStep < 0)startStep = 0;
            // Make a list of dates we would like to loop.
            for (var j = 0; j < numSteps; j++) {
                _this.loopDates[j] = _this.timeRange.getDateAtTimeStep(startStep + j).toISO8601();
            }

            _this.currentAnimationStep = 0;
            // mainMap.map.setSwapBufferCount(numSteps);

            _this.busy = 0;

            _this.drawNext = function () {
                var curStep = _this.currentAnimationStep;
                var curDate = _this.loopDates[curStep];
                _this.loop();
                // mainMap.map.setDimension(_this.dim.name, _this.loopDates[_this.currentAnimationStep]);
                // error(_this.currentAnimationStep);
                // mainMap.map.addListener('onmapready', _this.loop, false);
                // mainMap.map.draw("startAnimation", _this.currentAnimationStep);
                // if(_this.loopDates[_this.currentAnimationStep]!=_this.getDateString()){_this.setDateString(_this.loopDates[_this.currentAnimationStep]);}
            }

            _this.loop = function () {
                if (_this.animateCheckBox.getValue() == false) {
                    return;
                }
                _this.isAnimating = true;
                var timeStep;
                try {
                    timeStep = _this.timeRange.getTimeStepFromISODate(_this.loopDates[_this.currentAnimationStep]);
                } catch (e) {
                    error(e);
                    error('_this.currentAnimationStep=' + _this.currentAnimationStep + ' numSteps=' + numSteps);
                }

                if (_this.currentAnimationStep == 0) {
                    // mainMap.map.resetSwapBuffers();
                    _this.animationTimer.InitializeTimer(50, _this.drawNext);
                } else {
                    if (_this.currentAnimationStep + 1 >= numberOfAnimationFrames || _this.currentAnimationStep + 1 >= numSteps) {
                        _this.currentAnimationStep = 0;
                        _this.animationTimer.InitializeTimer(200, _this.drawNext);
                    } else
                        _this.animationTimer.InitializeTimer(50, _this.drawNext);
                }
                _this.currentAnimationStep++;
            }
            _this.loop();
            // mainMap.map.draw();
        }
        _this.animateCheckBox = new Ext.form.Checkbox({
            // region:'east',
            checked: false,
            boxLabel: 'animate',
            tooltip: 'Loops 12 steps: From ' + numberOfAnimationFrames + ' steps back in time until provided time',
            listeners: {

                check: {
                    fn: function (a, checked) {
                        if (checked) {
                            _this.startAnimation();
                        } else {
                            _this.isAnimating = false;
                            if (_this.animateCheckBox.origStepBeforeAnimation) {
                                _this.slider.setValue(_this.animateCheckBox.origStepBeforeAnimation);
                            }
                            _this.sliderChanged();
                        }
                    }
                }
            }
        });
        _this.datePanel = new Ext.Panel({
            height: 36,

            layout: 'fit',
            region: 'north',
            items: [ _this.leftDatePanel ],
            border: false, frame: false

        });
        _this.sliderChanged = function () {

            if (_this.animateCheckBox.getValue() == false) {
                // JvdB mainMap.map.setSwapBufferCount(2);
                _this.setNewStep(_this.slider.getValue());
                // alert('changed');
            } else {
                _this.setNewStep(_this.slider.getValue());

                _this.startAnimation();
            }
            var dateString = _this.timeRange.getDateAtTimeStep(_this.slider.getValue()).toISO8601();

            _this.setLayersDimension(dateString);
        };

        _this.setLayersDimension = function (dateString) {
            try {
                // filterTitle is out of scope, get it from the component
                for (var i = 0; i < this.timeLayers.length; i++) {
                    this.timeLayers[i].mergeNewParams({'time': dateString});
                    this.timeLayers[i].redraw();
                }
            }
            catch (err) {
                alert('Error: ' + err.message);
            }
        };

        _this.setNewStep = function (step) {
            //error("setNewStep = '"+step+"' isNaN(step): "+isNaN(step));
            if (isNaN(step)) {
                return;
            }

            function setNewDimValue() {

                var dateToSet = _this.timeRange.getDateAtTimeStep(step).toISO8601();
                _this.setDateString(dateToSet);

                /*_this.slider.suspendEvents();
                 _this.slider.setValue(step);
                 _this.slider.resumeEvents();*/


                //if( mainMap.map.getDimension(_this.dim.name).currentValue==dateToSet)return;//Already up to date.

                // mainMap.map.setDimension(_this.dim.name, _this.getDateString());

                // mainMap.map.draw("setNewStep " + step);
                // _this.isUptoDate=true;
                // legendWindow.loadLegendGraphic();

                //if (getFeatureInfoWindow.isVisible()) {
                //    if (mainMap.map.isMapPinVisible() == true) {
                //        var mapPinXY = mainMap.map.getMapPinXY();
                //        mainMap.map.getFeatureInfo(mapPinXY[0], mapPinXY[1]);
                //    }
                // }
            }

            setNewDimValue();
            /*if (!_this.timer) {
             setNewDimValue();
             _this.timer = new Timer();
             }
             _this.timer.InitializeTimer(2, function(){
             _this.timer = undefined;
             setNewDimValue();
             });*/

        }

        _this.setDimension = function (dim) {
            _this.dimension = dim;

            // Create a slider on basis of time
            function setSlider(isodate) {

                _this.timeRange = new parseISOTimeRangeDuration(isodate);
                _this.slider.maxValue = _this.timeRange.timeSteps;

                // if(_this.slider.maxValue==0)_this.slider.maxValue=1;
            }

            setSlider(_this.dimension.values);

//            if (!_this.dim) {
//                _this.dim = dim;
//                setSlider(_this.dim.values);
//            } else {
//                if (_this.dim.values != dim.values) {
//                    _this.dim = dim;
//
//                    setSlider(_this.dim.values);
//                    // _this.animateCheckBox.setValue(false);
//                    // _this.refreshCheckBox.setValue(false);
//                }
//            }

            var timeStep = 0;
            _this.isAnimating = _this.animateCheckBox.getValue();
            var isRefreshing = _this.refreshCheckBox.getValue();
//  JvdB          if (_this.dim.parentLayer.jumpToDimEnd == true) {
//
//                // Set latest value
//                _this.slider.mySetValue(_this.slider.maxValue);// TODO
//                _this.dim.parentLayer.jumpToDimEnd = false;
//
//            } else {
            // Set closest value
            if (_this.isAnimating == false) {
                // var currentValue = _this.getDateString();
                // JvdB currentValue = mainMap.map.getDimension(dim.name).currentValue;
                var currentValue = _this.getDateString();
                _this.setDateString(currentValue);

                timeStep = 0;
                try {
                    timeStep = _this.timeRange.getTimeStepFromISODate(currentValue);
                } catch (e) {
                    error("Unable to find closest timestep, trying to set default value " + dim.defaultValue);
                    try {
                        timeStep = _this.timeRange.getTimeStepFromISODate(dim.defaultValue);
                    } catch (e) {
                        error("Unable to set default value");
                    }
                }
                // if(timeStep==_this.slider.getValue())_this.setNewStep(timeStep);

                _this.slider.mySetValue(timeStep);

            }

            if (isRefreshing) {
                _this.refreshCheckBox.setValue(true);
            }
            if (_this.isAnimating) {
                _this.animateCheckBox.setValue(true);
            }

            // _this.slider.render();
        };

        _this.refresh = function () {

            //We need to refresh all layers.
            _this.dim.parentLayer.jumpToDimEnd = true;
            //doGetCapabilities(mainMap.map.getActiveLayer().service, mainMap.map.getActiveLayer().title, true);

            var layers = mainMap.map.getLayers();
            for (var l = 0; l < layers.length; l++) {
                doGetCapabilities(layers[l].service, layers[l].title, true, layers[l]);
            }
        }
        // JvdB _this.datePanel.setTitle("Dimension '" + _this.dimension.name + "' with units '" + _this.dimension.units + "'");
        _this.datePanel.setTitle("Dimension '" + _this.dimension.name + "' with units '" + _this.dimension.units + "'");

        Ext.apply(this, {
            height: 95,
            // title: _this.dimension.name,
            layout: 'border',
            items: [ _this.datePanel, _this.sliderPNPanel ],
//            bbar:
//                [
//                    new Ext.Button({
//                iconCls: 'button_refresh',
//                //text : 'refresh',
//                tooltip: 'Reloads the getcapabilities file, the slider will be updated with the new latest time available. ',
//                handler: _this.refresh
//            }),
//            {
//                xtype: 'tbseparator'
//            },
//            _this.refreshCheckBox,
//            {
//                xtype: 'tbseparator'
//            },
//            _this.animateCheckBox ],
            listeners: {
                activate: {
                    fn: function () {
                        // There us a bug in ext, when the tabpanel is invisible, the slider position is not updated.
                        // Here we reset it by setting it to zero and reassigning its original value on tabpanel activation.
                        var a = _this.slider.getValue();
                        _this.slider.suspendEvents();
                        _this.slider.setValue(0, false);
                        _this.slider.setValue(a, false);
                        _this.slider.resumeEvents();
                    }
                },
                collapse: {
                    fn: function () {
                        // alert('fireEvent');
                    }
                }
            }
        });


        this.setDimension(this.dimension);
        this.setDateString(this.dateTime);
        Heron.widgets.SimpleTimeSliderPanel.superclass.initComponent.apply(this, arguments);
    },
    /** method[listeners]
     *  Further initialization.
     */
    listeners: {
        afterrender: function (c) {

            // Assemble the time-based layers from the names in the config
            var map = Heron.App.getMap();
            for (var i = 0; i < this.layerNames.length; i++) {
                this.timeLayers[i] = map.getLayersByName(this.layerNames[i])[0];
            }

            // Render layers with initial time value
            this.setLayersDimension(this.dateTime);
        }
    }
});

function Timer() {
    var timerID = null;
    var timerRunning = false;
    var delay = 10;
    var secs;
    var initsecs;
    var timehandler = '';
    var self = this;
    this.InitializeTimer = function (secstime, functionhandler) {
        // Set the length of the timer, in seconds
        secs = secstime;
        initsecs = secs;
        timehandler = functionhandler;
        StopTheClock();
        if (secs > 0)StartTheTimer();
    }
    this.ResetTimer = function () {
        secs = initsecs;
    }
    this.StopTimer = function () {
        StopTheClock();
    }
    function StopTheClock() {
        if (timerRunning)clearTimeout(timerID);
        timerRunning = false;
    }

    function TimeEvent() {
        if (timehandler != '')timehandler();
    }

    function StartTheTimer() {
        if (secs == 0) {
            StopTheClock();
            TimeEvent();
        }
        else {
            secs = secs - 1;
            timerRunning = true;
            timerID = setTimeout(function () {
                StartTheTimer();
            }, delay);
        }
    }
}

/** api: xtype = hr_simpletimesliderpanel*/
Ext.reg('hr_simpletimesliderpanel', Heron.widgets.SimpleTimeSliderPanel);

//============================================================================
// Name        : ISO8601_datefunctions.js
// Author      : MaartenPlieger (plieger at knmi.nl)
// Version     : 0.4 (September 2010)
// Description : Functions to calculate with ISO8601 dates in javascript
//============================================================================

/*
 Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

 Copyright (C) 2011 by Royal Netherlands Meteorological Institute (KNMI)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */


/***************************************************/
/* Object to store a time duration / time interval */
/***************************************************/
function DateInterval(year, month, day, hour, minute, second) {
    this.year = parseInt(year);
    this.month = parseInt(month);
    this.day = parseInt(day);
    this.hour = parseInt(hour);
    this.minute = parseInt(minute);
    this.second = parseInt(second);
    this.isRegularInterval = false;
    if (this.month == 0 && this.year == 0)this.isRegularInterval = true;
    this.getTime = function () {
        var timeres = 0;
        // Months and years are unequally distributed in time
        // So get time is not possible
        if (this.month != 0)throw "month != 0";
        if (this.year != 0)throw "year != 0";
        timeres += this.day * 60 * 60 * 24;
        timeres += this.hour * 60 * 60;
        timeres += this.minute * 60;
        timeres += this.second;
        timeres *= 1000;
        return timeres;
    }
    this.toISO8601 = function () {
        var isoTime = 'P';
        if (this.year != 0)isoTime += this.year + 'Y';
        if (this.month != 0)isoTime += this.month + 'M';
        if (this.day != 0)isoTime += this.day + 'D';
        if (this.hour != 0 && this.minute != 0 && this.second != 0)
            isoTime += 'T';
        if (this.hour != 0)isoTime += this.hour + 'H';
        if (this.minute != 0)isoTime += this.minute + 'M';
        if (this.second != 0)isoTime += this.second + 'S';
        return isoTime;
    }
};

/****************************************************/
/* Parses ISO8601 times to a Javascript Date Object */
/****************************************************/
function parseISO8601DateToDate(isotime) {
    /*
     The following functions are added to the standard Date object:
     - add(dateInterval) adds a DateInterval time to this time
     - substract(dateInterval) substracts a DateInterval time to this time
     - toISO8601() returns the date object as iso8601 string
     - clone() creates a copy of this object
     */
    try {
        var splittedOnT = isotime.split('T');
        var left = splittedOnT[0].split('-');
        var right = splittedOnT[1].split(':');
        var date = new Date(Date.UTC(left[0], left[1] - 1, left[2], right[0], right[1], right[2].split('Z')[0]));
        date.add = function (dateInterval) {
            if (dateInterval.isRegularInterval == false) {
                if (dateInterval.year != 0)  this.setUTCFullYear(this.getUTCFullYear() + dateInterval.year);
                if (dateInterval.month != 0) this.setUTCMonth(this.getUTCMonth() + dateInterval.month);
                if (dateInterval.day != 0)   this.setUTCDate(this.getUTCDate() + dateInterval.day);
                if (dateInterval.hour != 0)  this.setUTCHours(this.getUTCHours() + dateInterval.hour);
                if (dateInterval.minute != 0)this.setUTCMinutes(this.getUTCMinutes() + dateInterval.minute);
                if (dateInterval.second != 0)this.setUTCSeconds(this.getUTCSeconds() + dateInterval.second);
            } else {
                this.setTime(this.getTime() + dateInterval.getTime());
            }
        };
        date.substract = function (dateInterval) {
            if (dateInterval.isRegularInterval == false) {
                if (dateInterval.year != 0)  this.setUTCFullYear(this.getUTCFullYear() - dateInterval.year);
                if (dateInterval.month != 0) this.setUTCMonth(this.getUTCMonth() - dateInterval.month);
                if (dateInterval.day != 0)   this.setUTCDate(this.getUTCDate() - dateInterval.day);
                if (dateInterval.hour != 0)  this.setUTCHours(this.getUTCHours() - dateInterval.hour);
                if (dateInterval.minute != 0)this.setUTCMinutes(this.getUTCMinutes() - dateInterval.minute);
                if (dateInterval.second != 0)this.setUTCSeconds(this.getUTCSeconds() - dateInterval.second);
            } else {
                this.setTime(this.getTime() - dateInterval.getTime());
            }
        };
        date.addMultipleTimes = function (dateInterval, numberOfSteps) {
            if (dateInterval.isRegularInterval == false) {
                if (dateInterval.year != 0)  this.setUTCFullYear(this.getUTCFullYear() + dateInterval.year * numberOfSteps);
                if (dateInterval.month != 0) this.setUTCMonth(this.getUTCMonth() + dateInterval.month * numberOfSteps);
                if (dateInterval.day != 0)   this.setUTCDate(this.getUTCDate() + dateInterval.day * numberOfSteps);
                if (dateInterval.hour != 0)  this.setUTCHours(this.getUTCHours() + dateInterval.hour * numberOfSteps);
                if (dateInterval.minute != 0)this.setUTCMinutes(this.getUTCMinutes() + dateInterval.minute * numberOfSteps);
                if (dateInterval.second != 0)this.setUTCSeconds(this.getUTCSeconds() + dateInterval.second * numberOfSteps);
            } else {
                this.setTime(this.getTime() + dateInterval.getTime() * numberOfSteps);
            }
        };
        date.substractMultipleTimes = function (dateInterval, numberOfSteps) {
            if (dateInterval.isRegularInterval == false) {
                if (dateInterval.year != 0)  this.setUTCFullYear(this.getUTCFullYear() - dateInterval.year * numberOfSteps);
                if (dateInterval.month != 0) this.setUTCMonth(this.getUTCMonth() - dateInterval.month * numberOfSteps);
                if (dateInterval.day != 0)   this.setUTCDate(this.getUTCDate() - dateInterval.day * numberOfSteps);
                if (dateInterval.hour != 0)  this.setUTCHours(this.getUTCHours() - dateInterval.hour * numberOfSteps);
                if (dateInterval.minute != 0)this.setUTCMinutes(this.getUTCMinutes() - dateInterval.minute * numberOfSteps);
                if (dateInterval.second != 0)this.setUTCSeconds(this.getUTCSeconds() - dateInterval.second * numberOfSteps);
            } else {
                this.setTime(this.getTime() - dateInterval.getTime() * numberOfSteps);
            }
        };


        date.toISO8601 = function () {
            function prf(input, width) {
                //print decimal with fixed length (preceding zero's)
                var string = input + '';
                var len = width - string.length;
                var j, zeros = '';
                for (j = 0; j < len; j++)zeros += "0" + zeros;
                string = zeros + string;
                return string;
            }

            var iso = prf(this.getUTCFullYear(), 4) +
                "-" + prf(this.getUTCMonth() + 1, 2) +
                "-" + prf(this.getUTCDate(), 2) +
                "T" + prf(this.getUTCHours(), 2) +
                ":" + prf(this.getUTCMinutes(), 2) +
                ":" + prf(this.getUTCSeconds(), 2) + 'Z';
            return iso;
        }
        date.clone = function () {
            return parseISO8601DateToDate(date.toISO8601());
        }
        return date;
    }
    catch (e) {
        throw("In parseISO8601DateToDate:" + e);
    }
}

/*********************************************************/
/* Parses ISO8601 time duration to a DateInterval Object */
/*********************************************************/
function parseISO8601IntervalToDateInterval(isotime) {
    if (isotime.charAt(0) == 'P') {
        var splittedOnT = isotime.split('T');
        var years = 0, months = 0, days = 0, hours = 0, minutes, seconds;
        minutes = 0;
        seconds = 0;
        var YYYYMMDDPart = splittedOnT[0].split('P')[1];
        var HHMMSSPart = splittedOnT[1];
        //Parse the left part
        if (YYYYMMDDPart) {
            var yearIndex = YYYYMMDDPart.indexOf("Y");
            var monthIndex = YYYYMMDDPart.indexOf("M");
            var dayIndex = YYYYMMDDPart.indexOf("D");
            if (yearIndex != -1) {
                years = (YYYYMMDDPart.substring(0, yearIndex));
            }
            if (monthIndex != -1) {
                months = (YYYYMMDDPart.substring(yearIndex + 1, monthIndex));
            }
            if (dayIndex != -1) {
                var start = yearIndex;
                if (monthIndex != -1)start = monthIndex;
                days = (YYYYMMDDPart.substring(start + 1, dayIndex));
            }
        }
        //parse the right part
        if (HHMMSSPart) {
            var hourIndex = HHMMSSPart.indexOf("H");
            var minuteIndex = HHMMSSPart.indexOf("M");
            var secondIndex = HHMMSSPart.indexOf("S");
            if (hourIndex != -1) {
                hours = (HHMMSSPart.substring(0, hourIndex));
            }
            if (minuteIndex != -1) {
                minutes = (HHMMSSPart.substring(hourIndex + 1, minuteIndex));
            }
            if (secondIndex != -1) {
                var start = hourIndex;
                if (minuteIndex != -1)start = minuteIndex;
                seconds = (HHMMSSPart.substring(start + 1, secondIndex));
            }
        }
        // Assemble the dateInterval object
        return new DateInterval(years, months, days, hours, minutes, seconds);
    }
}

/**********************************************************/
/* Calculates the number of time steps with this interval */
/**********************************************************/
function getNumberOfTimeSteps(starttime /*Date*/, stoptime /*Date*/, interval /*DateInterval*/) {
    var steps = 0;
    if (interval.month != 0 || interval.year != 0) {
        //In case of unequally distributed time steps...
        var testtime = starttime.clone();
        var timestopms = stoptime.getTime();
        while (testtime.getTime() < timestopms) {
            testtime.add(interval);
            steps++;
        }

        //steps++;
        return steps;
    } else {
        //In case of equally distributed time steps
        steps = parseInt(((stoptime.getTime() - starttime.getTime()) / interval.getTime()) + 0.5);

        return steps;
    }
}

//Takes "1999-01-01T00:00:00Z/2009-12-01T00:00:00Z/PT60S" as input
function parseISOTimeRangeDuration(isoTimeRangeDuration) {
    var times = isoTimeRangeDuration.split('/');
    var timeStepDateArray = new Array();
    //Some safety checks
    if (times[2] == undefined) {
        times[2] = 'PT1M';
    }
    if (times[1] == undefined) {
        times[1] = times[0];
        times[2] = 'PT1M';
    }
    //Convert the dates
    this.startTime = parseISO8601DateToDate(times[0]);
    this.stopTime = parseISO8601DateToDate(times[1]);
    this.timeInterval = parseISO8601IntervalToDateInterval(times[2]);
    //Calculate the number if steps
    this.timeSteps = getNumberOfTimeSteps(this.startTime, this.stopTime, this.timeInterval);
    //
    this.getTimeSteps = function () {
        return this.timeSteps;
    };

    this.getDateAtTimeStep = function (currentStep) {
        if (this.timeInterval.isRegularInterval == false) {
            var temptime = this.startTime.clone();
            temptime.addMultipleTimes(this.timeInterval, currentStep);
            return temptime;
        } else {
            var temptime = this.startTime.clone();
            var dateIntervalTime = this.timeInterval.getTime();
            dateIntervalTime *= currentStep;
            temptime.setTime(temptime.getTime() + dateIntervalTime);
            return temptime;
        }
    };

    this.getTimeStepFromISODate = function (currentISODate) {
        try {
            currentDate = parseISO8601DateToDate(currentISODate);
        } catch (e) {
            throw("The date '" + currentISODate + "' is not a valid date");
        }
        return this.getTimeStepFromDate(currentDate);
    };

    /*Calculates the time step at the given date  */
    this.getTimeStepFromDate = function (currentDate, throwIfOutsideRange) {
        if (!throwIfOutsideRange)throwIfOutsideRange = false;

        var currentDateTime = currentDate.getTime();
        if (currentDateTime < this.startTime.getTime()) {
            if (throwIfOutsideRange == true) {
                throw "getTimeStepFromDate: requested date is earlier than this time range ";
            }
            return 0;
        }
        if (currentDateTime > this.stopTime.getTime()) {
            if (throwIfOutsideRange == true) {
                throw "getTimeStepFromDate: requested date is later than this time range ";
            }
            return this.timeSteps;
        }
        if (currentDateTime >= this.stopTime.getTime())return this.timeSteps;
        //alert(this.startTime.getTime()+"\n"+currentDateTime +"\n"+this.stopTime.getTime());
        var timeStep = 0;
        if (this.timeInterval.isRegularInterval == false) {
            var temptime = this.startTime.clone();
            for (j = 0; j <= this.timeSteps; j++) {
                var temptimeTime = temptime.getTime();
                temptime.add(this.timeInterval);
                var temptimeTime_1stepfurther = temptime.getTime();
                if (currentDateTime >= temptimeTime && currentDateTime < temptimeTime_1stepfurther)return j;
            }
            throw "Date " + currentDate.toISO8601() + " not found!";
        } else {
            timeStep = (currentDate.getTime() - this.startTime.getTime()) / this.timeInterval.getTime();
            timeStep = parseInt(timeStep + 0.5);
            return timeStep;
        }
        throw "Date " + currentDate.toISO8601() + " not found";
        return -1;
    };

    /*Returns the timestep at the currentDate, if currentdate is outside the range,
     a exception is thrown.  */
    this.getTimeStepFromDate_WithinRange = function (currentDate) {
        return this.getTimeStepFromDate(currentDate, true);
    };

    /*Returns the timestep at the currentDate, if currentdate is outside the range,
     a minimum or maximum step which lies within the time range is returned.  */
    this.getTimeStepFromDate_Clipped = function (currentDate) {
        return this.getTimeStepFromDate(currentDate, false);
    }
}

/*Example:
 function init(){
 var isodate="1999-01-01T00:00:00Z/2009-12-01T00:00:00Z/PT60S";
 //Split on '/'
 var times=isodate.split('/');
 //Some safety checks
 if(times[1]==undefined){times[1]=times[0];times[2]='PT1M';}
 //Convert the dates
 starttime=parseISO8601DateToDate(times[0]);
 stoptime=parseISO8601DateToDate(times[1]);
 interval=parseISO8601IntervalToDateInterval(times[2]);
 //Calculate the number if steps
 steps=getNumberOfTimeSteps(starttime,stoptime,interval);
 }
 */