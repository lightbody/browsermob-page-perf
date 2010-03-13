<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Tests</title>
</head>

<body>

<ul>
    <c:forEach var="testId" items="${requestScope.testIds}">
        <li><a href="/tests/${testId}">${testId}</a></li>
    </c:forEach>
</ul>


</body>
</html>