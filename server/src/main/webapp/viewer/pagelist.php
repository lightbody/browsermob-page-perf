<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>HAR Viewer - Page List</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Pragma" content="no-cache">
<meta http-equiv="Expires" content="-1">
<meta http-Equiv="Cache-Control" Content="no-cache">
<script type="text/javascript" src="schema.js" preserve="true" xml:space="preserve"></script>
<style type="text/css" xml:space="preserve">
    body {
        overflow-y:auto !important;
        background-color:white;
        margin:0;
        padding:0;
    }
    #ajaxLoaderTable {
        width:100%;
    }
    #ajaxLoaderTable td {
        vertical-align:middle;
        text-align:center;
    }
    </style>
</head>
<body>
<div id="pageList" version="@VERSION@">
<table id="ajaxLoaderTable" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
<tr>
<td style="vertical-align:middle; text-align:center;" rowspan="1" colspan="1"><img src="images/ajax-loader.gif"></td>
</tr>
</table>
<script type="text/javascript" xml:space="preserve">
var table = document.getElementById("ajaxLoaderTable");
var height = 0;
if (!window.innerHeight) { //IE
    if (!(document.documentElement.clientHeight == 0)) //strict mode
        height = document.documentElement.clientHeight;
    else //quirks mode
        height = document.body.clientHeight;
} else //w3c
    height = window.innerHeight;
table.style.height = height + "px";
</script>
</div>
<script type="text/javascript" src="schema.js" preserve="true" xml:space="preserve"></script><script type="text/javascript" xml:space="preserve">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-3586722-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script');
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 
        'http://www') + '.google-analytics.com/ga.js';
    ga.setAttribute('async', 'true');
    document.documentElement.firstChild.appendChild(ga);
})();
</script>
<link rel="StyleSheet" href="har.css" type="text/css">
<script type="text/javascript" src="har.js"></script>
</body>
</html>
