<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Test: ${requestScope.testId}</title>
    <script type="text/javascript" src="/scripts/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="/scripts/flot-0.6/jquery.flot.min.js"></script>
    <script type="text/javascript">
        $(function() {
            $.ajax({
                type: "GET",
                url: "/query",
                data: {
                    testId: '${requestScope.testId}',
                    type: 'RESPONSE_TIME',
                    rollup: 'NONE',
                    timeZone: 'PST',
                    start: new Date(1200000000000).getTime(),
                    end: new Date(1268443035952).getTime()
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
</head>

<body>

<h1>Test: ${requestScope.testId}</h1>

<div id="mainChart" style="height:400px;margin: 0 auto;"></div>

<ul id="ghetto">

</ul>

</body>
</html>