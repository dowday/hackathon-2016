{"intl":"","src":"require( 'data', function(exports, module) {  var WS = require(\"tfw.web-service\");\r\nvar Local = require(\"tfw.storage\").local;\r\n\r\n\r\nvar DATA = Local.get( 'data', {} ) || {};\r\n\r\nvar MONTHES = [ 'January', 'February', 'March', 'April',\r\n                'May', 'June', 'July', 'August',\r\n                'September', 'October', 'November', 'December' ];\r\n\r\nexports.get = function( name ) {\r\n    var data = DATA;\r\n    var path = explodePath( name );\r\n    var i;\r\n    for( i=0 ; i<path.length ; i++ ) {\r\n        while( Array.isArray( data ) ) {\r\n            // Take the last element of an array.\r\n            data = data[data.length - 1];\r\n        }\r\n        data = data[path[i]];\r\n        if( typeof data === 'undefined' ) return undefined;\r\n    }\r\n\r\n    return data;\r\n};\r\n\r\n\r\nexports.set = function( name, value ) {\r\n    checkValueArrays( value );\r\n\r\n    var data = DATA;\r\n    var path = explodePath( name );\r\n    var i;\r\n    for( i=0 ; i<path.length - 1 ; i++ ) {\r\n        if( typeof data[path[i]] === 'undefined' ) {\r\n            data[path[i]] = {};\r\n        }\r\n        data = data[path[i]];\r\n    }\r\n    data[path.pop()] = value;\r\n};\r\n\r\nexports.reset = function() {\r\n    data = {};\r\n    exports.save();\r\n};\r\n\r\nexports.save = function() {\r\n    Local.set( 'data', DATA );\r\n    /*\r\n     var data = APP.data || {};\r\n     data.id = APP.id;\r\n     console.info(\"[data] data=...\", data);\r\n     WS.get(\r\n     'registration',\r\n     ['set', data ]\r\n     );\r\n     */\r\n};\r\n\r\n\r\nexports.parse = function( input ) {\r\n    if( Array.isArray( input ) ) {\r\n        var i, item, result;\r\n        for (i = 0 ; i < input.length ; i++) {\r\n            item = input[i];\r\n            result = exports.parse( item );\r\n            if( typeof result !== 'undefined' && result !== 'null' ) return result;\r\n        }\r\n    }\r\n    else if( typeof input === 'function' ) {\r\n        return exports.parse( input.call( exports ) );\r\n    }\r\n    else if( typeof input === 'string' ) {\r\n        var cursor = 0;\r\n        var posStart;\r\n        var posEnd;\r\n        var output = '';\r\n        var variable;\r\n        while( true ) {\r\n            posStart = input.indexOf( '{{', cursor );\r\n            if( posStart == -1 ) break;\r\n            output += input.substr( cursor, posStart - cursor );\r\n            cursor = posStart + 2;\r\n            posEnd = input.indexOf( '}}', cursor );\r\n            if( posEnd == -1 ) break;\r\n            variable = input.substr( cursor, posEnd - cursor ).trim().split( '|' );\r\n            variable[0] = exports.get( variable[0] ) || '';\r\n            for( i = 1 ; i < variable.length ; i++ ) {\r\n                variable[0] = format( variable[0], variable[i] );\r\n            }\r\n            output += variable[0];\r\n            cursor = posEnd + 2;\r\n        }\r\n        return output + input.substr( cursor );\r\n    }\r\n\r\n    return undefined;\r\n};\r\n\r\n\r\n/**\r\n * Examples of numeric dates are: `20160501`, `201605011830`.\r\n * Time can be added, but just hours and minutes.\r\n */\r\nexports.num2dat = function( num ) {\r\n    var txt = \"\" + num;\r\n    while( txt.length < 12 ) txt += \"0\";\r\n    return new Date(\r\n        parseInt( txt.substr( 0, 4) ),\r\n        parseInt( txt.substr( 4, 2) ) - 1,\r\n        parseInt( txt.substr( 6, 2) ),\r\n        parseInt( txt.substr( 8, 2) ),\r\n        parseInt( txt.substr( 10, 2) ),\r\n        0\r\n    );\r\n};\r\n\r\n\r\nexports.pad = function( value, size, filler ) {\r\n    if( typeof size === 'undefined' ) size = 2;\r\n    if( typeof filler === 'undefined' ) filler = '0';\r\n\r\n    value = \"\" + value;\r\n    while( value.length < size ) value = filler + value;\r\n    return value;\r\n};\r\n\r\n\r\n/**\r\n * Push `value` into an array called `name`.\r\n */\r\nexports.push = function( name, value ) {\r\n    var arr = exports.get( name );\r\n    if( !Array.isArray( arr ) ) {\r\n        console.error( \"[Data.push] `\" + name + \"` is not an array!\" );\r\n        return 0;\r\n    }\r\n    checkValueArrays( arr );\r\n    value.$key = arr.$key++;\r\n    return value.$key;\r\n};\r\n\r\n\r\n\r\n/**\r\n * In  an array,  each item  must have  the `$key'  property. This  is\r\n * needed if you need to remove an element from that list.\r\n * Keys are just  incremenral numbers relative to the  array the items\r\n * belong. So  the array itself has  a `$key` attribute to  store this\r\n * increment.\r\n */\r\nfunction checkValueArrays( value ) {\r\n    if( Array.isArray( value ) ) {\r\n        if( typeof value.$key !== 'number' ) {\r\n            // New ID for elements of this array.\r\n            value.$key = 1;\r\n        }\r\n        value.forEach(function ( item ) {\r\n            if( typeof item.$key !== 'number' ) {\r\n                item.$key = value.$key++;\r\n            }\r\n            checkValueArrays( item );\r\n        });\r\n    }\r\n    else if( typeof value === 'object' ) {\r\n        var key;\r\n        for( key in value ) {\r\n            checkValueArrays( value[key] );\r\n        }\r\n    }\r\n}\r\n\r\n\r\nfunction format( value, type ) {\r\n    switch( type ) {\r\n    case 'date':\r\n        value = exports.num2dat( value );\r\n        return MONTHES[value.getMonth()] + \" \" + value.getDate() + \", \" + value.getFullYear();\r\n    case 'time':\r\n        value = exports.num2dat( value );\r\n        return value.getHours() + \":\" + exports.pad( value.getMinutes() );\r\n    case 'datetime':\r\n        value = exports.num2dat( value );\r\n        return MONTHES[value.getMonth()] + \" \" + value.getDate() + \", \" + value.getFullYear()\r\n            + \"  \" + value.getHours() + \":\" + exports.pad( value.getMinutes() );\r\n    }\r\n    return value;\r\n}\r\n\r\nfunction explodePath( name ) {\r\n    var start = 0;\r\n    var cursor = 0;\r\n    var mode = 0;\r\n    var path = [];\r\n    var c;\r\n    \r\n    while( cursor < name.length ) {\r\n        c = name.charAt( cursor );\r\n        if( mode == 0 ) {\r\n            if( c == '[' ) {\r\n                \r\n            }\r\n            else if ( c == '.' ) {\r\n\r\n            }\r\n        }\r\n    }\r\n\r\n    return path;\r\n}\r\n });\r\n","zip":"require(\"data\",function(e,r){function t(e){if(Array.isArray(e))\"number\"!=typeof e.$key&&(e.$key=1),e.forEach(function(r){\"number\"!=typeof r.$key&&(r.$key=e.$key++),t(r)});else if(\"object\"==typeof e){var r;for(r in e)t(e[r])}}function n(r,t){switch(t){case\"date\":return r=e.num2dat(r),s[r.getMonth()]+\" \"+r.getDate()+\", \"+r.getFullYear();case\"time\":return r=e.num2dat(r),r.getHours()+\":\"+e.pad(r.getMinutes());case\"datetime\":return r=e.num2dat(r),s[r.getMonth()]+\" \"+r.getDate()+\", \"+r.getFullYear()+\"  \"+r.getHours()+\":\"+e.pad(r.getMinutes())}return r}function a(e){for(var r,t=0,n=[];t<e.length;)r=e.charAt(t);return n}var u=(require(\"tfw.web-service\"),require(\"tfw.storage\").local),f=u.get(\"data\",{})||{},s=[\"January\",\"February\",\"March\",\"April\",\"May\",\"June\",\"July\",\"August\",\"September\",\"October\",\"November\",\"December\"];e.get=function(e){var r,t=f,n=a(e);for(r=0;r<n.length;r++){for(;Array.isArray(t);)t=t[t.length-1];if(t=t[n[r]],\"undefined\"==typeof t)return}return t},e.set=function(e,r){t(r);var n,u=f,s=a(e);for(n=0;n<s.length-1;n++)\"undefined\"==typeof u[s[n]]&&(u[s[n]]={}),u=u[s[n]];u[s.pop()]=r},e.reset=function(){data={},e.save()},e.save=function(){u.set(\"data\",f)},e.parse=function(r){if(Array.isArray(r)){var t,a,u;for(t=0;t<r.length;t++)if(a=r[t],u=e.parse(a),\"undefined\"!=typeof u&&\"null\"!==u)return u}else{if(\"function\"==typeof r)return e.parse(r.call(e));if(\"string\"==typeof r){for(var f,s,i,o=0,y=\"\";;){if(f=r.indexOf(\"{{\",o),-1==f)break;if(y+=r.substr(o,f-o),o=f+2,s=r.indexOf(\"}}\",o),-1==s)break;for(i=r.substr(o,s-o).trim().split(\"|\"),i[0]=e.get(i[0])||\"\",t=1;t<i.length;t++)i[0]=n(i[0],i[t]);y+=i[0],o=s+2}return y+r.substr(o)}}},e.num2dat=function(e){for(var r=\"\"+e;r.length<12;)r+=\"0\";return new Date(parseInt(r.substr(0,4)),parseInt(r.substr(4,2))-1,parseInt(r.substr(6,2)),parseInt(r.substr(8,2)),parseInt(r.substr(10,2)),0)},e.pad=function(e,r,t){for(\"undefined\"==typeof r&&(r=2),\"undefined\"==typeof t&&(t=\"0\"),e=\"\"+e;e.length<r;)e=t+e;return e},e.push=function(r,n){var a=e.get(r);return Array.isArray(a)?(t(a),n.$key=a.$key++,n.$key):(console.error(\"[Data.push] `\"+r+\"` is not an array!\"),0)}});\n//# sourceMappingURL=data.js.map","map":{"version":3,"file":"data.js.map","sources":["data.js"],"sourcesContent":["require( 'data', function(exports, module) {  var WS = require(\"tfw.web-service\");\r\nvar Local = require(\"tfw.storage\").local;\r\n\r\n\r\nvar DATA = Local.get( 'data', {} ) || {};\r\n\r\nvar MONTHES = [ 'January', 'February', 'March', 'April',\r\n                'May', 'June', 'July', 'August',\r\n                'September', 'October', 'November', 'December' ];\r\n\r\nexports.get = function( name ) {\r\n    var data = DATA;\r\n    var path = explodePath( name );\r\n    var i;\r\n    for( i=0 ; i<path.length ; i++ ) {\r\n        while( Array.isArray( data ) ) {\r\n            // Take the last element of an array.\r\n            data = data[data.length - 1];\r\n        }\r\n        data = data[path[i]];\r\n        if( typeof data === 'undefined' ) return undefined;\r\n    }\r\n\r\n    return data;\r\n};\r\n\r\n\r\nexports.set = function( name, value ) {\r\n    checkValueArrays( value );\r\n\r\n    var data = DATA;\r\n    var path = explodePath( name );\r\n    var i;\r\n    for( i=0 ; i<path.length - 1 ; i++ ) {\r\n        if( typeof data[path[i]] === 'undefined' ) {\r\n            data[path[i]] = {};\r\n        }\r\n        data = data[path[i]];\r\n    }\r\n    data[path.pop()] = value;\r\n};\r\n\r\nexports.reset = function() {\r\n    data = {};\r\n    exports.save();\r\n};\r\n\r\nexports.save = function() {\r\n    Local.set( 'data', DATA );\r\n    /*\r\n     var data = APP.data || {};\r\n     data.id = APP.id;\r\n     console.info(\"[data] data=...\", data);\r\n     WS.get(\r\n     'registration',\r\n     ['set', data ]\r\n     );\r\n     */\r\n};\r\n\r\n\r\nexports.parse = function( input ) {\r\n    if( Array.isArray( input ) ) {\r\n        var i, item, result;\r\n        for (i = 0 ; i < input.length ; i++) {\r\n            item = input[i];\r\n            result = exports.parse( item );\r\n            if( typeof result !== 'undefined' && result !== 'null' ) return result;\r\n        }\r\n    }\r\n    else if( typeof input === 'function' ) {\r\n        return exports.parse( input.call( exports ) );\r\n    }\r\n    else if( typeof input === 'string' ) {\r\n        var cursor = 0;\r\n        var posStart;\r\n        var posEnd;\r\n        var output = '';\r\n        var variable;\r\n        while( true ) {\r\n            posStart = input.indexOf( '{{', cursor );\r\n            if( posStart == -1 ) break;\r\n            output += input.substr( cursor, posStart - cursor );\r\n            cursor = posStart + 2;\r\n            posEnd = input.indexOf( '}}', cursor );\r\n            if( posEnd == -1 ) break;\r\n            variable = input.substr( cursor, posEnd - cursor ).trim().split( '|' );\r\n            variable[0] = exports.get( variable[0] ) || '';\r\n            for( i = 1 ; i < variable.length ; i++ ) {\r\n                variable[0] = format( variable[0], variable[i] );\r\n            }\r\n            output += variable[0];\r\n            cursor = posEnd + 2;\r\n        }\r\n        return output + input.substr( cursor );\r\n    }\r\n\r\n    return undefined;\r\n};\r\n\r\n\r\n/**\r\n * Examples of numeric dates are: `20160501`, `201605011830`.\r\n * Time can be added, but just hours and minutes.\r\n */\r\nexports.num2dat = function( num ) {\r\n    var txt = \"\" + num;\r\n    while( txt.length < 12 ) txt += \"0\";\r\n    return new Date(\r\n        parseInt( txt.substr( 0, 4) ),\r\n        parseInt( txt.substr( 4, 2) ) - 1,\r\n        parseInt( txt.substr( 6, 2) ),\r\n        parseInt( txt.substr( 8, 2) ),\r\n        parseInt( txt.substr( 10, 2) ),\r\n        0\r\n    );\r\n};\r\n\r\n\r\nexports.pad = function( value, size, filler ) {\r\n    if( typeof size === 'undefined' ) size = 2;\r\n    if( typeof filler === 'undefined' ) filler = '0';\r\n\r\n    value = \"\" + value;\r\n    while( value.length < size ) value = filler + value;\r\n    return value;\r\n};\r\n\r\n\r\n/**\r\n * Push `value` into an array called `name`.\r\n */\r\nexports.push = function( name, value ) {\r\n    var arr = exports.get( name );\r\n    if( !Array.isArray( arr ) ) {\r\n        console.error( \"[Data.push] `\" + name + \"` is not an array!\" );\r\n        return 0;\r\n    }\r\n    checkValueArrays( arr );\r\n    value.$key = arr.$key++;\r\n    return value.$key;\r\n};\r\n\r\n\r\n\r\n/**\r\n * In  an array,  each item  must have  the `$key'  property. This  is\r\n * needed if you need to remove an element from that list.\r\n * Keys are just  incremenral numbers relative to the  array the items\r\n * belong. So  the array itself has  a `$key` attribute to  store this\r\n * increment.\r\n */\r\nfunction checkValueArrays( value ) {\r\n    if( Array.isArray( value ) ) {\r\n        if( typeof value.$key !== 'number' ) {\r\n            // New ID for elements of this array.\r\n            value.$key = 1;\r\n        }\r\n        value.forEach(function ( item ) {\r\n            if( typeof item.$key !== 'number' ) {\r\n                item.$key = value.$key++;\r\n            }\r\n            checkValueArrays( item );\r\n        });\r\n    }\r\n    else if( typeof value === 'object' ) {\r\n        var key;\r\n        for( key in value ) {\r\n            checkValueArrays( value[key] );\r\n        }\r\n    }\r\n}\r\n\r\n\r\nfunction format( value, type ) {\r\n    switch( type ) {\r\n    case 'date':\r\n        value = exports.num2dat( value );\r\n        return MONTHES[value.getMonth()] + \" \" + value.getDate() + \", \" + value.getFullYear();\r\n    case 'time':\r\n        value = exports.num2dat( value );\r\n        return value.getHours() + \":\" + exports.pad( value.getMinutes() );\r\n    case 'datetime':\r\n        value = exports.num2dat( value );\r\n        return MONTHES[value.getMonth()] + \" \" + value.getDate() + \", \" + value.getFullYear()\r\n            + \"  \" + value.getHours() + \":\" + exports.pad( value.getMinutes() );\r\n    }\r\n    return value;\r\n}\r\n\r\nfunction explodePath( name ) {\r\n    var start = 0;\r\n    var cursor = 0;\r\n    var mode = 0;\r\n    var path = [];\r\n    var c;\r\n    \r\n    while( cursor < name.length ) {\r\n        c = name.charAt( cursor );\r\n        if( mode == 0 ) {\r\n            if( c == '[' ) {\r\n                \r\n            }\r\n            else if ( c == '.' ) {\r\n\r\n            }\r\n        }\r\n    }\r\n\r\n    return path;\r\n}\r\n });\r\n"],"names":["require","exports","module","checkValueArrays","value","Array","isArray","$key","forEach","item","key","format","type","num2dat","MONTHES","getMonth","getDate","getFullYear","getHours","pad","getMinutes","explodePath","name","c","cursor","path","length","charAt","Local","local","DATA","get","i","data","set","pop","reset","save","parse","input","result","call","posStart","posEnd","variable","output","indexOf","substr","trim","split","num","txt","Date","parseInt","size","filler","push","arr","console","error"],"mappings":"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"},"dependencies":["mod/data","mod/tfw.web-service","mod/tfw.storage"]}