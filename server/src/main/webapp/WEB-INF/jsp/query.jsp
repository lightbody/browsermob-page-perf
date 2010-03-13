<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Query Tool</title>
    <style type="text/css" title="currentStyle">
        @import "/scripts/dataTables-1.6/media/css/demo_page.css";
        @import "/scripts/dataTables-1.6/media/css/demo_table.css";
    </style>
    <script type="text/javascript" src="/scripts/jquery-1.4.2.min.js"></script>
    <script type="text/javascript" language="javascript" src="/scripts/dataTables-1.6/media/js/jquery.dataTables.js"></script>
    <script type="text/javascript">
        $(function() {
            $("#go").click(function() {
                $.ajax({
                    type: "POST",
                    url: "/query",
                    dataType: "json",
                    data: {
                        query: $("#query").val()
                    },
                    success: function(data) {
                        var aDataSet = data.rows;
                        var columnLabels = data.columns;
                        var columns = [];
                        for (var i = 0; i < columnLabels.length; i++) {
                            columns[i] = {"sTitle": columnLabels[i]}
                        }

                        $('#dynamic').html( '<table cellpadding="0" cellspacing="0" border="0" class="display" id="example"></table>' );
                        $('#example').dataTable( {
                            "aaData": aDataSet,
                            "aoColumns": columns
                        } );
                    }
                });
            });
        })
    </script>
</head>

<body>

<textarea id="query">SELECT COUNT(*) FROM session;</textarea>

<button id="go">Run Query</button>

<hr/>

<div id="dynamic"></div>

</body>
</html>