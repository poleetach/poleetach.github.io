$(function() {

  $('.switch a').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    $('.switch a').removeClass('active');
    if ($this.hasClass('active')) {
      $this.removeClass('active');
    } else {
      $this.addClass('active');
    }

    if ($this.hasClass('js-list-view')) {
      $('.chart-view').hide();
      $('.list-view').show();
    } else if ($this.hasClass('js-chart-view')) {
      $('.list-view').hide();
      $('.chart-view').show();
    }
  });


  var usd = [], dates = [], threads = [];

  var listView = '';

  $.each(data.obr, function(i, val) {
    usd.push(parseFloat(val.usd));
    dates.push(val.date);
    threads.push(val.threads);

    var th = '';
    var keys = Object.keys(val.threads).toString().split(',');
    for(var i=0; i<keys.length; i++) {
      th += '<div class="thread-item"><span>№' + keys[i] + ':</span> <a target="_blank" href="' + val.threads[keys[i]] + '">' + val.threads[keys[i]] + '</a></div>'
    }

    listView += '<ul>' +
                  '<li>' +
                    '<div class="list-view-header">' +
                      '<span class="date">' + val.date + '</span>' +
                      '<span class="usd">$1 = ' + val.usd + '&#8381;</span>' +
                    '</div>' +
                    '<div class="list-view-body">' + th + '</div>' +
                  '</li>' +
                '</ul>';
  });

  $('.list-view-container').html(listView);

  $('#chart').highcharts({
    chart: {
      animation: false,
      backgroundColor: null,
      selectionMarkerFill: '#eee',
      style: {
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontSize: '14px',
      }
    },
    plotOptions: {
      area: {
        dashStyle: "Dot"
      }
    },
    title: {
      text: ''
    },
    xAxis: {
      categories: dates,
      labels: {
        enabled: false
      }
    },
    yAxis: {
      gridLineWidth: 1,
      gridLineColor: '#eee',
      title: {
        text: ''
      }
    },
    tooltip: {
      useHTML: true,
      hideDelay: 5000,
      formatter: function () {
        var t = '';
        t += '<div class="tooltip-header">' + this.x + '</div>';
        t += '<div class="tooltip-value">' + this.y + '</div>';
        return t;
      },
      style: {
        color: '#333',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        fontSize: '14px',
        padding: '12px'
      },
      backgroundColor: '#f6f6f6',
      borderRadius: '2',
      borderColor: '#ddd',
      shadow: false,
      positioner: function () {
        return { x: 100, y: 40 };
      }
    },
    legend: {
      enabled: false
    },
    series: [{
      name: 'USD/RUB',
      data: usd,
      color: '#00d19f',
      marker: {
        fillColor: '#333',
        lineWidth: 3,
        lineColor: '#fff'
      },
      cursor: 'pointer',
      point: {
        events: {
          click: function() {
            var $el = $('.currency');
            $('.hint').hide();
            $el.show();
            $el.find('.date').html(dates[this.x]);
            $el.find('.value').html('<span>$1 = </span>' + usd[this.x] + '<span>&#8381;</span>');

            var thArr = threads[this.x];
            if (thArr) {
              var th = '';
              var keys = Object.keys(thArr).toString().split(',');
              for(var i=0; i<keys.length; i++) {
                th += '<span>№' + keys[i] + ':</span> <a target="_blank" href="' + thArr[keys[i]] + '">' + thArr[keys[i]] + '</a><br>'
              }
              $el.find('.threads').html(th);
            }

          }
        }
      }
    }]
  });
});
