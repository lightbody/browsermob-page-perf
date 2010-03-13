<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Test: ${requestScope.testId}</title>
    <script type="text/javascript" src="/scripts/pageperf/util.js"></script>
    <script type="text/javascript" src="/scripts/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="/scripts/flot-0.6/jquery.flot.min.js"></script>
    <script type="text/javascript" src="/scripts/pageperf/chart.js"></script>
    <script type="text/javascript">
        $(function() {
            $.ajax({
                type: "GET",
                url: "/query",
                data: {
                    testId: '${requestScope.testId}',
                    type: 'SESSION'
                },
                dataType: "json",
                success: function(data) {
                    for (var i = 0; i < data.length; i++) {
                        var e = data[i];
                        $('<li><a href="/session/' + e.sessionId + '">' + e.sessionId + '</a></li>').appendTo("#ghetto");
                    }
                }
            });

        })
    </script>

    <style type="text/css">
        #mainChartHeader {
            padding: 5px;
            color: #333;
            font-size: 15px;
        }
        #mainChartViewLevel {
            line-height: 22px;
        }
        #mainChartLegend {
            float: right;
        }

        #noResults {
            position: absolute;
            top: 200px;
            left: 300px;
            font-size: 18px;
            color: #999;
        }

        .legendLabel {
            padding-right: 10px;
        }

        a.chartControl {
            text-decoration: none;
            color: #444;
            border: 1px solid #999;
            background-color: #fff;
            padding: 2px 5px;
        }

    </style>
</head>

<body>

<h1>Test: ${requestScope.testId}</h1>


<div class="clearfix" style="position: relative">
    <div id="mainChartHeader" class="ui-tabs-nav ui-corner-top ui-widget-header clearfix">
        <div id="mainChartNav" style="float:right">
            <table>
                <tr>
                    <td><a class="chartControl" onclick="chart.shiftRange(-.5)">&lt;</a>&nbsp;</td>
                    <td id="mainChartSelectContainer"></td>
                    <td>&nbsp;<a class="chartControl" onclick="chart.shiftRange(.5)">&gt;</a></td>
                    <td>&nbsp;<a class="chartControl" onclick="chart.chooseWindow($('#mainChartSelect')[0].selectedIndex, null, new Date())">&gt;&gt;</a></td>
                </tr>
            </table>
        </div>
        <span id="mainChartViewLevel"></span>
    </div>
    <div id="mainChart" style="height:400px;margin: 0 auto;"></div>
    <div id="mainChartLegend"></div>
    <div id="noResults" style="display:none">Nothing to display for this time period</div>
</div>

<script type="text/javascript">
    $(function() {
        chart = $.chart('${requestScope.testId}');
        chart.chooseWindow(2, null, new Date());
    });
</script>

<ul id="ghetto">

</ul>

</body>
</html>