/* Date slider element, Ajaxorized.com,  2008 */
var sliderReference;

/* Extend the date element a bit */
Date.prototype.getDiffDays = function (p_oDate)
{
  p_iOneDay = 1000 * 60 * 60 * 24;
  return Math.ceil((p_oDate.getTime() - this.getTime()) / (p_iOneDay));
};

/* The dateslider */
DateSlider = Class.create(
{
  initialize: function (p_sBarId, p_sStartDate, p_sEndDate, p_iStartYear, p_iEndYear, options)
  {
  
    this.startDate = '';
    this.endDate = '';
  
    /* Initialize the dateslider object:
     * - Set the start/end days
     * - Set options
     * - Create the seperate elements of the dateslider
     */
    
    
    this.barStartDate = new Date().set
    (
    {
      year: p_iStartYear,
      month: 0,
      day: 1
    });
    this.iStartYear = p_iStartYear;
    this.iEndYear = p_iEndYear;
    this.barEndDate = new Date().set(
    {
      year: p_iEndYear,
      month: 11,
      day: 31
    });

    /* Panel dates */
    //this.oStartDate = Date.parse(p_sStartDate);
    //this.oEndDate = Date.parse(p_sEndDate);
    this.oStartDate = p_sStartDate;
    this.oEndDate = p_sEndDate;

    /* The fields (set later) */
    this.oStartField = null;
    this.oEndField = null;

    /* Create globally available reference */
    sliderReference = this;

    // sliderBarMargin of 2 causes unwanted behavior (shift of left and right handles after first drag)
    this.sliderBarMargin = 0; //2;

    /* Set the start/end dates */
    //l_oStartDate = Date.parse(p_sStartDate);
    //l_oEndDate = Date.parse(p_sEndDate);
    l_oStartDate = p_sStartDate;
    l_oEndDate = p_sEndDate;

    
    /* The options */
    this.options = {
      dayWidth: 1,
      dragHandles: true,
      dragBar: true,
      zoom: false,
      onEnd: null,
      onStart: null
    };

    Object.extend(this.options, options || {});

    this.barId = p_sBarId;

    this.numberOfDays = null;
    if (this.options.dragHandles == false) this.numberOfDays = this.oStartDate.getDiffDays(this.oEndDate);
    this.centerDate = Date.today();
    if (this.options.centerDate != null) this.centerDate = Date.parse(options['centerDate']);

    this.iLeftOffsetLH = this.barStartDate.getDiffDays(l_oStartDate) * this.options.dayWidth;
    this.iLeftOffsetRH = this.barStartDate.getDiffDays(l_oEndDate) * this.options.dayWidth;

    this.createSliderBar(p_sBarId);
    this.createHandles(p_sBarId, p_sStartDate, p_sEndDate);
    this.createShiftPanel(p_sBarId, p_sStartDate, p_sEndDate);

    if (this.options.zoom) this.setZoom();
  },
  createSliderBar: function (p_sBarId)
  {
    /* Create the backgound (dategrid) :
     * - Set the width of day
     * - Loop through years/months to build the grid
     * - Make it (optionally) draggable
     */
    var sliderDayDivWidth = this.options.dayWidth;

    l_iYear = this.iStartYear;
    while (l_iYear <= this.iEndYear)
    {
      l_oData = Date.parse('01-01-' + l_iYear);
      if (l_oData.isLeapYear()) iDays = 366;
      else iDays = 365;

      divWidth = sliderDayDivWidth * iDays;
      
      // OLD CODE
      //l_oDiv = new Element('div',
      //{
      //  className: 'slideYear',
      //  style: 'width:' + (divWidth - 1) + 'px'
      //}).update(l_iYear);
      
      
      l_oDiv = document.createElement('div');
      l_oDiv.className = 'slideYear';
      l_oDiv.style.width = (divWidth - 1) + 'px';
      l_oDiv.innerHTML = l_iYear;
      

      iTotalDays = 0;
      (12).times(function (e)
      {
        monthDivWidth = l_oData.getDaysInMonth() * sliderReference.options.dayWidth;

        // OLD CODE
        //l_oMonthDiv = new Element('div',
        //{
        //  className: 'slideMonth', 
        //  style: 'width:' + (monthDivWidth) + 'px; left:' + iTotalDays + 'px'
        //});
        
        l_oMonthDiv = document.createElement('div');
        l_oMonthDiv.className = 'slideMonth';
        l_oMonthDiv.style.width = monthDivWidth + 'px';
        l_oMonthDiv.style.left = iTotalDays + 'px';
        
        
        if (e == 0)
        {
          $(l_oMonthDiv).addClassName('firstMonth');
        }
        else
        {
          $(l_oMonthDiv).update(l_oData.toString("MMM"));
        }
        
        l_oDiv.appendChild(l_oMonthDiv);
        
        //alert(l_oMonthDiv.style.width);
        
        iTotalDays += monthDivWidth;
        l_oData.addMonths(1);
      });
      $(p_sBarId).appendChild(l_oDiv);
      
      l_iYear++;
    }

    /* Set the the right position and length */
    l_iCorrection = $(p_sBarId).parentNode.offsetWidth / 2;
    l_shiftLeft = 0 - this.barStartDate.getDiffDays(this.centerDate) * sliderDayDivWidth + l_iCorrection;
    l_oFinishDate = Date.parse((this.iEndYear + 1) + '-01-01');
    iBarWidth = this.barStartDate.getDiffDays(l_oFinishDate);
    $(p_sBarId).setStyle(
    {
      left: l_shiftLeft + 'px',
      width: iBarWidth * sliderDayDivWidth + 'px'
    });

    /* Make the background grid draggable */
    if (this.options.dragBar)
    {
      new Draggable($(p_sBarId),
      {
        snap: this.sliderLimitPos,
        constraint: 'horizontal',
        starteffect: '',
        endeffect: '',
        zindex: '0'
      });
    }
  },
  
  _bgStopDrag: function ()
  {
    /* Move at right side? */
    //l_iDiff = $('righthandle').offsetLeft + ($('sliderbar').offsetLeft - 600);
    l_iDiff = $('righthandle').offsetLeft + ($('sliderbar').offsetLeft - $('slider-container').getWidth());

    if (l_iDiff > -2)
    {
      /* Move the bgbar */
      //var l_iLeft = '-' + ($('righthandle').offsetLeft - 590) + 'px';
      var l_iLeft = '-' + ($('righthandle').offsetLeft - $('slider-container').getWidth() + 10) + 'px';
           
      new Effect.Morph('sliderbar',
      {
        style: {
          left: l_iLeft
        },
        duration: .5
      });
    }

    /* Move at left side? */
    /*
    console.log ('lefthandle offsetLeft' + $('lefthandle').offsetLeft );
    console.log ('sliderbar offsetLeft' + $('sliderbar').offsetLeft );
    console.log ('hr-TimesliderPanel offsetLeft' + $('hr-TimesliderPanel').offsetLeft );
    */
   
    l_iDiff = $('lefthandle').offsetLeft + $('sliderbar').offsetLeft;

    if (l_iDiff < -2)
    {
      /* Move the bgbar */
      var l_iLeft = - ($('lefthandle').offsetLeft - 5) + 'px';
           
      new Effect.Morph('sliderbar',
      {
        style: {
          left: l_iLeft
        },
        duration: .5
      });
    }
 
    /* Call the callback function */
    if (sliderReference.options.onEnd) 
    {
      //alert(l_oDate.toString('dd-MM-yyyy'));
      this.startDate = l_oDate.toString('dd-MM-yyyy');
      this.endDate = l_oDate2.toString('dd-MM-yyyy');
      sliderReference.options.onEnd(this);
    }
  },
  
  createHandles: function (p_sBarId, p_sStartDate, p_sEndDate)
  {
    /* Create the left and the right handle */
    l_oLeftHandle = new Element('span',
    {
      className: 'leftHandle',
      id: 'lefthandle',
      style: 'left:' + this.iLeftOffsetLH + 'px'
    }).update('&nbsp;');
    l_oRightHandle = new Element('span',
    {
      className: 'rightHandle',
      id: 'righthandle',
      style: 'left:' + this.iLeftOffsetRH + 'px'
    }).update('&nbsp;');

    $(p_sBarId).appendChild(l_oLeftHandle);
    $(p_sBarId).appendChild(l_oRightHandle);

    if (this.options.dragHandles)
    {
      /* Make the left handler draggable */
      new Draggable(l_oLeftHandle,
      {
        snap: this.handleLimitPos,
        containment: p_sBarId,
        constraint: 'horizontal',
        onDrag: sliderReference._leftDrag,
        onEnd: sliderReference._leftDrag
      });

      /* Make the right handler draggable */
      new Draggable(l_oRightHandle,
      {
        snap: this.handleLimitPos,
        containment: p_sBarId,
        constraint: 'horizontal',
        onDrag: sliderReference._rightDrag,
        onEnd: sliderReference._rightDrag
      });
    }
    else
    {
      l_oLeftHandle.setStyle(
      {
        opacity: .01,
        cursor: 'pointer'
      });
      l_oRightHandle.setStyle(
      {
        opacity: .01,
        cursor: 'pointer'
      });
    }
  },
 dragShiftPanel: function ()
  {
    /* Set the handlers while dragging the shiftpanel */
    $('lefthandle').setStyle(
    {
      left: ($('shiftpanel').offsetLeft - sliderReference.sliderBarMargin) + 'px'
    });
    $('righthandle').setStyle(
    {
      left: ($('shiftpanel').offsetLeft + $('shiftpanel').offsetWidth - sliderReference.sliderBarMargin) + 'px'
    });
    sliderReference._setDates();
  },
  createShiftPanel: function (p_sBarId, p_sStartDate, p_sEndDate)
  {
    /* Calculate width */
    l_iBarWidth = (this.iLeftOffsetRH - this.iLeftOffsetLH) + (2 * this.sliderBarMargin);

    l_oShiftPanel = new Element('div',
    {
      id: 'shiftpanel',
      style: 'left:' + (this.iLeftOffsetLH) + 'px; width:' + l_iBarWidth + 'px'
    });
    $(p_sBarId).appendChild(l_oShiftPanel);
    new Draggable(l_oShiftPanel,
    {
      snap: this.handleLimitPos,
      constraint: 'horizontal',
      starteffect: '',
      endeffect: '',
      zindex: '0',
      onEnd: this._bgStopDrag.bindAsEventListener(this),
      change: function ()
      {
        //call to this.dragShiftPanel() is undefined ?? put code here
        /* Set the handlers while dragging the shiftpanel */
        $('lefthandle').setStyle(
        {
          left: ($('shiftpanel').offsetLeft - sliderReference.sliderBarMargin) + 'px'
        });
        $('righthandle').setStyle(
        {
          left: ($('shiftpanel').offsetLeft + $('shiftpanel').offsetWidth - sliderReference.sliderBarMargin) + 'px'
        });
        sliderReference._setDates();
      },
      onDrag: function ()
      {
        //call to this.dragShiftPanel() is undefined ?? put code here
        /* Set the handlers while dragging the shiftpanel */
        $('lefthandle').setStyle(
        {
          left: ($('shiftpanel').offsetLeft - sliderReference.sliderBarMargin) + 'px'
        });
        $('righthandle').setStyle(
        {
          left: ($('shiftpanel').offsetLeft + $('shiftpanel').offsetWidth - sliderReference.sliderBarMargin) + 'px'
        });
        sliderReference._setDates();
      },
      onStart: function ()
      {
        if (sliderReference.options.onStart) sliderReference.options.onStart();
      }
    });
  },
  sliderLimitPos: function (x, y, drag)
  {
    inbox = drag.element.getDimensions();
    outbox = Element.getDimensions(drag.element.parentNode);
    return [x > 0 ? 0 : (x > outbox.width - inbox.width ? x : outbox.width - inbox.width), y];
  },
  handleLimitPos: function (x, y, drag)
  {
    inbox = drag.element.getDimensions();
    outbox = Element.getDimensions(drag.element.parentNode);
    maxPos = drag.element.hasClassName('leftHandle') ? parseInt($('righthandle').style.left) - inbox.width : outbox.width - inbox.width;

    minPos = drag.element.hasClassName('rightHandle') ? parseInt($('lefthandle').style.left) + inbox.width : 0;
    return [x > maxPos ? maxPos : (x < minPos ? minPos : x), y];
  },
  _setDates: function ()
  {
    /* Get the position of the handles */
    l_iLeftPos = $('lefthandle').offsetLeft / this.options.dayWidth;
    l_iRightPos = $('righthandle').offsetLeft / this.options.dayWidth;

    l_oDate = this.barStartDate.clone().addDays(l_iLeftPos);
    if (this.numberOfDays == null)
    {
      l_oDate2 = this.barStartDate.clone().addDays(l_iRightPos);
    }
    else
    {
      l_oDate2 = l_oDate.clone().addDays(this.numberOfDays);
    }

    this.startDate = l_oDate.toString('dd-MM-yyyy');
    this.endDate = l_oDate2.toString('dd-MM-yyyy');
  
    if (this.oStartField && this.oEndField)
    {
      this.oStartField.setValue(l_oDate.toString('dd-MM-yyyy'));
      this.oEndField.setValue(l_oDate2.toString('dd-MM-yyyy'));
    }
  },
  _rightDrag: function (e, ev)
  {
    if (ev.type == "mouseup" && sliderReference.options.onEnd != null) 
    {
      this.startDate = l_oDate.toString('dd-MM-yyyy');
      this.endDate = l_oDate2.toString('dd-MM-yyyy');
      sliderReference.options.onEnd(this);
    }
    // Correction of -5 causes unwanted behavior
    //l_panelLength = $('righthandle').offsetLeft - $('lefthandle').offsetLeft - 5;
    l_panelLength = $('righthandle').offsetLeft - $('lefthandle').offsetLeft;
    $('shiftpanel').setStyle(
    {
      width: (l_panelLength + 2 * sliderReference.sliderBarMargin) + 'px'
    });
    sliderReference._setDates();
  },
  _leftDrag: function (e, ev)
  {
    if (ev.type == "mouseup" && sliderReference.options.onEnd != null) 
    {
      this.startDate = l_oDate.toString('dd-MM-yyyy');
      this.endDate = l_oDate2.toString('dd-MM-yyyy');
      sliderReference.options.onEnd(this);
    }
    // Correction of -4 can cause unwanted behavior
    //l_panelLength = $('righthandle').offsetLeft - $('lefthandle').offsetLeft - 4;
    l_panelLength = $('righthandle').offsetLeft - $('lefthandle').offsetLeft;
    $('shiftpanel').setStyle(
    {
      left: ($('lefthandle').offsetLeft + 4) + 'px',
      width: l_panelLength + 'px'
    });
    sliderReference._setDates();
  },
  morphTo: function (p_oDateStart, p_oDateEnd)
  {
    l_offsetLeftLH = this.barStartDate.getDiffDays(p_oDateStart) * this.options.dayWidth;
    l_offsetLeftRH = this.barStartDate.getDiffDays(p_oDateEnd) * this.options.dayWidth;
    l_panelLength = l_offsetLeftRH - l_offsetLeftLH - 4;
    $('lefthandle').morph('left:' + l_offsetLeftLH + 'px');
    $('righthandle').morph('left:' + l_offsetLeftRH + 'px');
    $('shiftpanel').morph('width : ' + (l_panelLength + 2 * sliderReference.sliderBarMargin) + 'px; left : ' + (l_offsetLeftLH + 2) + 'px');
  },
  attachFields: function (p_oStartField, p_oEndField)
  {
    this.oStartField = p_oStartField;
    this.oEndField = p_oEndField;

    p_oStartField.setValue(this.oStartDate.toString('dd-MM-yyyy'));
    p_oEndField.setValue(this.oEndDate.toString('dd-MM-yyyy'));

    [p_oStartField, p_oEndField].each(function (e)
    {
      e.observe('blur', function ()
      {
        l_oStartDate = Date.parse(p_oStartField.getValue());
        l_oEndDate = Date.parse(p_oEndField.getValue());
        sliderReference.morphTo(l_oStartDate, l_oEndDate);
      }); // end observe
    }); // end each
  },
  _removeSliderBar: function ()
  {
    $(this.barId).update('');
  },
  zoomIn: function ()
  {
    this._zoom(1);
  },
  zoomOut: function ()
  {
    this._zoom(-1);
  },
  _zoom: function (p_iFactor)
  {
    if ((this.options.dayWidth + p_iFactor) < 1) return;
    /* Get the current dates */
    l_iLeftPos = $('lefthandle').offsetLeft / this.options.dayWidth;
    l_iRightPos = $('righthandle').offsetLeft / this.options.dayWidth;

    l_oDateStart = this.barStartDate.clone().addDays(l_iLeftPos);
    l_oDateEnd = this.barStartDate.clone().addDays(l_iRightPos);

    this._removeSliderBar();
    this.options.dayWidth = this.options.dayWidth + p_iFactor;

    this.iLeftOffsetLH = this.barStartDate.getDiffDays(l_oDateStart) * this.options.dayWidth;
    this.iLeftOffsetRH = this.barStartDate.getDiffDays(l_oDateEnd) * this.options.dayWidth;

    this.createSliderBar(this.barId);
    this.createHandles(this.barId, l_oDateStart, l_oDateEnd);

    this.createShiftPanel(this.barId, l_oDateStart, l_oDateEnd);
    this.centerBar();
  },
  setZoom: function ()
  {
    l_oZoomIn = new Element('a',
    {
      className: 'zoom',
      href: '#'
    })
      .update('zoom in')
      .observe('click', function (ev)
    {
      sliderReference.zoomIn();
      ev.stop();
    });

    l_oZoomOut = new Element('a',
    {
      className: 'zoom',
      href: '#'
    })
      .update('zoom out')
      .observe('click', function (ev)
    {
      sliderReference.zoomOut();
      ev.stop();
    });


    l_oZoomPanel = new Element('div',
    {
      className: 'zoomPanel'
    });

    l_oZoomPanel.appendChild(l_oZoomIn);
    l_oZoomPanel.appendChild(document.createTextNode(' | '));
    l_oZoomPanel.appendChild(l_oZoomOut);

    $(this.barId).up().appendChild(l_oZoomPanel);
  },
  centerBar: function ()
  {

    var l_iPanelWidth = this.iLeftOffsetRH - this.iLeftOffsetLH;
    var l_iShiftContainerWidth = $('sliderbar').up().getWidth();

    $('sliderbar').setStyle(
    {
      left: (this.iLeftOffsetLH - (2 * this.iLeftOffsetLH) + (l_iShiftContainerWidth / 2) - (l_iPanelWidth / 2)) + 'px'
    });
  }
});