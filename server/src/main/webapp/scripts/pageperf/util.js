function timeLabelFunction(value) {
    var min = value.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }

    var hour = value.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    }

    return hour + ":" + min;
}

function bytesLabelFunction(value) {
    if (value < 1024) {
        return value  + " B";
    }

    value = value / 1024;
    if (value < 1024) {
        if (value < 10) {
            return formatNumber(value, 2) + " KB";
        } else {
            return formatNumber(value, 1) + " KB";
        }
    }

    value = value / 1024;

    if (value < 1024) {
        if (value < 10) {
            return formatNumber(value, 2) + " MB";
        } else {
            return formatNumber(value, 1) + " MB";
        }
    }

    value = value / 1024;

    if (value < 10) {
        return formatNumber(value, 2) + " GB";
    } else {
        return formatNumber(value, 1) + " GB";
    }
}

function responseTimeLabelFunction(value) {
    if (value < 1000) {
        return value  + " ms";
    }

    value = value / 1000;
    if (value < 10) {
        return formatNumber(value, 2) + " secs";
    }

    if (value < 60) {
        return formatNumber(value, 1) + " secs";
    }

    value = value / 60
    return formatNumber(value, 1) + " min";
}

function formatNumber(value, decimalPlaces) {
    value = new Number(value);
    value = value.toFixed(decimalPlaces);

    var str = addCommas(new String(value));

    return str;
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function formatDate(d, fmt, monthNames) {
    var leftPad = function(n) {
        n = "" + n;
        return n.length == 1 ? "0" + n : n;
    };

    var r = [];
    var escape = false;
    if (monthNames == null)
        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (var i = 0; i < fmt.length; ++i) {
        var c = fmt.charAt(i);

        if (escape) {
            switch (c) {
            case 'h': c = "" + d.getHours(); break;
            case 'H': c = leftPad(d.getHours()); break;
            case 'M': c = leftPad(d.getMinutes()); break;
            case 'S': c = leftPad(d.getSeconds()); break;
            case 'd': c = "" + d.getDate(); break;
            case 'm': c = "" + (d.getMonth() + 1); break;
            case 'y': c = "" + d.getFullYear(); break;
            case 'b': c = "" + monthNames[d.getMonth()]; break;
            }
            r.push(c);
            escape = false;
        }
        else {
            if (c == "%")
                escape = true;
            else
                r.push(c);
        }
    }
    return r.join("");
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
}