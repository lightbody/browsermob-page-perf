<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Session: ${requestScope.sessionId}</title>
    <script type="text/javascript" src="/scripts/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" src="/scripts/flot-0.6/jquery.flot.min.js"></script>
    <script type="text/javascript">
        $(function() {
            $.ajax({
                type: "GET",
                url: "/har/${requestScope.sessionId}",
                dataType: "json",
                success: function(data) {
                }
            });

        })
    </script>
</head>

<body>

<h1>Session: ${requestScope.sessionId}</h1>

</body>
</html>