(function($) {
    /**
     *  Main Test Chart
     */
    function PagePerfTestChart(testId) {
        var that = this;

        var RESOLUTION_HOUR   = 'HOUR',
            RESOLUTION_DAY    = 'DAY',
            RESOLUTION_NONE   = 'NONE';

        var WINDOWS     = [
            {id: 0, label: "1 hour", resolution: RESOLUTION_NONE, delta: 1000 * 60 * 60},
            {id: 1, label: "6 hours", resolution: RESOLUTION_NONE, delta: 1000 * 60 * 60 * 6},
            {id: 2, label: "1 day", resolution: RESOLUTION_HOUR, delta: 1000 * 60 * 60 * 24},
            {id: 3, label: "1 week", resolution: RESOLUTION_DAY, delta: 1000 * 60 * 60 * 24 * 7},
            {id: 4, label: "1 month", resolution: RESOLUTION_DAY, delta: 1000 * 60 * 60 * 24 * 30},
            {id: 5, label: "3 months", resolution: RESOLUTION_DAY, delta: 1000 * 60 * 60 * 24 * 30 * 3}
        ];

        var loadingHTML = '<img src="/images/icons/ajax-loader.gif" height="16" width="16" alt="Loading" />';
        var errorHTML = '<img src="/images/icons/error.png"/>';

        var localTimeLabelFunction = function (val, axis) {
            var date = new Date(val);
            var format = "%m/%d %H:%M";

            return formatDate (date, format);
        };

        var mainOptions = {
            xaxis: {mode: "time", timeformat: "%m/%d %H:%M", tickFormatter: localTimeLabelFunction},
            yaxis: {min: 0, labelWidth: 50, tickFormatter: responseTimeLabelFunction},
            grid: {
                hoverable: true,
                clickable: true,
                borderWidth: 1,
                borderColor: "#999"
            },
            shadowSize: 2,
            colors: ["#09c", "#0c6", "#90c", "#f60", "#c09", "#c90", "#cc9"],
            legend: {
                show: true,
                labelBoxBorderColor: "#ddd",
                noColumns: 7,
                container: $("#mainChartLegend")
            }
        };

        // Render window select box
        var windowSelect = $("<select>").attr("id", "mainChartSelect");
        for(var i = 0; i < WINDOWS.length; i++) {
            windowSelect.append($("<option>").attr("value", i).text(WINDOWS[i].label));
        }
        $("#mainChartSelectContainer").append(windowSelect);

        var mainChart = $.plot($("#mainChart"), [], mainOptions);

        var errorData = new Array();
        var respData = new Array();

        this.chooseWindow = function (index, from, to) {
            var range = WINDOWS[index];
            if(!range) return false;

            if(!from && !to) {
                if(this.currentFrom && this.currentTo) {
                    to = new Date((this.currentFrom.getTime() + (this.currentTo.getTime() - this.currentFrom.getTime())/2) + range.delta/2);

                    if(to.getTime() > new Date().getTime()) {
                        to = new Date();
                    }

                    from = new Date(to.getTime() - range.delta);
                } else {
                    to = new Date();
                    from = new Date(to.getTime() - range.delta);
                }
            } else if(!from) {
                if(to.getTime() > new Date().getTime()) to = new Date();
                from = new Date(to.getTime() - range.delta);
            } else {
                to = new Date(from.getTime() + range.delta);
                if(to.getTime() > new Date().getTime()) to = new Date();
            }

            $("#mainChartSelect").val(index);
            this.drawMainChart(from, to, range);
        }

        this.shiftRange = function (increment) {
            if(!increment || !this.currentFrom || !this.currentTo || !this.currentRange) return false;

            var from = new Date(this.currentFrom.getTime() + (this.currentRange.delta * increment));
            var to = new Date(this.currentTo.getTime() + (this.currentRange.delta * increment));

            if(to.getTime() > new Date().getTime()) {
                to = new Date();
                from = new Date(to.getTime() - (this.currentRange.delta * increment));
            }

            this.drawMainChart(from, to, this.currentRange);
        }

        this.drawMainChart = function(from, to, range) {
            this.currentFrom = from;
            this.currentTo = to;
            this.currentRange = range;
            var resolution = range.resolution || RESOLUTION_HOUR;

            $("#mainChartViewLevel").html(loadingHTML);

            this.lastQueryKey = that.lastQueryKey = range.id + "/" + from.getTime() + "/" + to.getTime();

            that.queryAjaxResults(from, to, resolution);
        };

        this.clear = function() {
            $.plot($("#mainChart"), [], mainOptions);
        }

        this.queryAjaxResults = function(from, to, resolution, attemptCount) {
            var attemptCount = attemptCount || 1;

            var lastQueryKey = this.lastQueryKey;

            var callback = function(results) {
                if (that.lastQueryKey != lastQueryKey) {
                    //BM.log("A more recent request has been made, tossing this one out");
                    return;
                }

                $.history.load(lastQueryKey);

                if (results.timeout) {
                    if (lastQueryKey == that.lastQueryKey && (attemptCount < 3)) {
                        setTimeout(function() {
                            that.queryAjaxResults(testId, from, to, resolution, attemptCount + 1);
                        }, 1000 * 3);
                    } else {
                        $("#statusMsg").show();
                        $("#mainChartViewLevel").html(errorHTML);
                    }
                } else {
                    $("#statusMsg").hide();
                    that.handleAjaxResults(from, to, resolution, results);
                }
            };

            $.ajax({
                type: "GET",
                url: "/query",
                data: {
                    testId: testId,
                    type: 'RESPONSE_TIME',
                    rollup: resolution,
                    timeZoneOffset: new Date().getTimezoneOffset(),
                    start: from.getTime(),
                    end: to.getTime()
                },
                dataType: "json",
                success: callback
            });
        };

        this.handleAjaxResults = function(from, to, resolution, results) {
            var data = this.currentData = new Array();
            var min = 999999,
                max = 0;
            var fromTime = this.currentFrom.getTime(),
                toTime = this.currentTo.getTime();
            var lineWidth = resolution == 's' ? 3 : resolution == 'h' ? 2 : 1;

            $('#mainChartViewLevel').html(from.toLocaleString() + " &mdash; " + to.toLocaleString());

            if(!results) {
                that.clear();
                $("#noResults").fadeIn(500);
                return;
            }
            $("#noResults").hide();

            var respTimes = new Array();

            for (var i in results) {
                var tx = results[i];

                console.log(tx);

                if((tx.date >= fromTime) && (tx.date <= toTime)) {
                    if(tx.responseTime > max) max = tx.responseTime;
                    if(tx.responseTime < min) min = tx.responseTime;
                }

                respTimes.push([tx.date, tx.responseTime, tx]);
            }

            data.push({
                lines: {show: true, lineWidth: lineWidth},
                points: {show: true, lineWidth: 5, radius: lineWidth},
                data: respTimes
            });

            mainOptions.xaxis.min = from.getTime();
            mainOptions.xaxis.max = to.getTime();

            this.currentData = data;
            $.plot($("#mainChart"), data, mainOptions);
        };

        var previousDataIndex = null;
        $("#mainChart").bind("plothover", function (event, pos, item) {
            if (item && (previousDataIndex != (item.seriesIndex + '-' + item.dataIndex))) {
                previousDataIndex = item.seriesIndex + '-' + item.dataIndex;

                $("#tooltip").remove();

                var tx = item.series.data[item.dataIndex][2];

                var content = "";
                var start = new Date(tx.date);

                content += "<strong>Date</strong>: " + formatDate(start, "%b %d %H:%M");
                content += "<br/>";

                if (tx.maxResponseTime || tx.minResponseTime) {
                    content += "<strong>Average Response Time</strong>: ";
                    content += responseTimeLabelFunction(tx.responseTime);

                    if (tx.errors) {
                        content += "<br/>";
                        content += "<strong>Errors</strong>: " + tx.errors;
                    }
                } else {
                    content += "<strong>Response Time</strong>: ";
                    content += responseTimeLabelFunction(tx.responseTime);

                    if (tx.errors) {
                        content += "<br/>";
                        content += "<strong>Error Encountered</strong>";
                    }
                }

                // Show the tooltip
                $('<div id="tooltip">' + content + '</div>').css( {
                    position: 'absolute',
                    display: 'none',
                    top: item.pageY + 5,
                    left: item.pageX + 5,
                    border: '1px solid #fdd',
                    padding: '2px',
                    'background-color': '#fee',
                    opacity: 0.80
                }).appendTo("body").fadeIn(200);
            }
            else if(!item) {
                $("#tooltip").remove();
                previousDataIndex = null;
            }
        });

        $("#mainChart").bind("plotclick", function (event, pos, item) {
            if (item == null) {
                return;
            }

            var tx = item.series.data[item.dataIndex][2];
            if(RESOLUTION_NONE == that.currentRange.resolution) {
                var txId =  objectMd5 ? tx.transactionId : tx.id;
                if (tx.id) window.location.href = "/monitoring-v2/tx/" + testId + "/" + txId;
            } else if(RESOLUTION_HOUR == that.currentRange.resolution) {
                var from = new Date(tx.date.getTime() - WINDOWS[1].delta/2);
                that.chooseWindow(1, from);
            } else if(RESOLUTION_DAY == that.currentRange.resolution) {
                var from = new Date(tx.date.getTime() - WINDOWS[2].delta/2);
                that.chooseWindow(2, from);
            }
        });

        $("#mainChartSelect").change(function () {
            that.chooseWindow(this.options[this.selectedIndex].value);
        });

        // count how many times we do this hash-based range selection. there were some strange situations
        // where we saw "infinite" loops with the chart toggling back and forth between two time ranges.
        // to have a safeguard against this, let's just stop doing back button support after 100 clicks
        var usedHash = false;
        this.hashBasedSelectionCounter = 0;
        $.history.init(function (hash) {
            var parts = hash.split("/");
            if (parts.length == 3) {
                var from = new Date(parseInt(parts[1]));
                var to = new Date(parseInt(parts[2]));

                if ((that.currentFrom || that.currentTo) && (that.currentFrom.getTime() != from.getTime() || that.currentTo.getTime() != to.getTime())) {
                    that.hashBasedSelectionCounter++;

                    if (that.hashBasedSelectionCounter < 100) {
                        usedHash = true;
                        that.drawMainChart(from, to, WINDOWS[parts[0]]);
                    }
                }
            }
        });
    }

    $.chart = function(testId) {
        return new PagePerfTestChart(testId);
    };
})(jQuery);