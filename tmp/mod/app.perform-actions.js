{"intl":"","src":"require( 'app.perform-actions', function(exports, module) {  /**********************************************************************\n require( 'app.perform-actions' )\n -----------------------------------------------------------------------\n \n **********************************************************************/\nvar $ = require(\"dom\");\nvar Data = require('data');\nvar Tpl = require(\"x-template\");\nvar InputBool = require(\"input-boolean\");\nvar InputText = require(\"input-text\");\nvar InputFile = require(\"input-file\");\nvar InputDate = require(\"input-text\");\n\n\nmodule.exports = function( children ) {\n    var body = $.div();\n\n    children.forEach(function ( child ) {\n        var actionID = child[0];\n        var action = actions[actionID];\n        if( action ) {\n            var element = action.apply( body, child.slice( 1 ) );\n            if( typeof element === 'string' ) {\n                location.hash = '#' + element;\n                return;\n            }\n            if( element ) body.appendChild( element );\n        } else {\n            throw \"Unknonw type `\" + actionID + \"`!\";\n        }\n    });\n\n    return body;\n};\n\n\nvar actions = {\n    text: function( args ) {\n        var div = $.tag( 'p' );\n        div.innerHTML = parse( args );\n        return div;\n    },\n    button: function( args ) {\n        var btn = $.tag( 'a', 'button', { href: '#' + parse( args.action ) } );\n        btn.innerHTML = parse( args.text );\n        return btn;\n    },\n    nurse: function( args ) {\n        var content = $.div();\n        var children = Tpl.appendTo( \"nurse\", content );\n        children.text.innerHTML = parse( args );\n        return content;\n    },\n    reset: function( args ) {\n        Data.reset();\n        var key, val;\n        for( key in args ) {\n            val = args[key];\n            Data.set( key, val );\n        }\n    },\n    set: function( args ) {\n        var key, val;\n        for( key in args ) {\n            val = args[key];\n            Data.set( key, val );\n        }\n    },\n    \"input-bool\": function( args ) {\n        return InputBool( args );\n    },\n    \"input-text\": function( args ) {\n        return InputText( args );\n    },\n    \"input-file\": function( args ) {\n        return InputFile( args );\n    },\n    \"input-date\": function( args ) {\n        return InputDate( args );\n    },\n    loop: function( args, children ) {\n        var list = parse( args.list );\n        var item = parse( args.item );\n        var sort = parse( args.sort );\n        \n        var arr = Data.get( list );\n        if( !Array.isArray( arr ) ) arr = [arr];\n\n        if( sort.trim().length > 0 ) {\n\n        }\n\n        var content = $.div();\n        arr.forEach(function ( child ) {\n            Data.set( item, child );\n            content.appendChild( module.exports( children ) );\n        });\n\n        return content;\n    }\n};\n\n\nfunction parse( input ) {\n    if( Array.isArray( input ) ) {\n        var i, item;\n        for (i = 0 ; i < input.length ; i++) {\n            item = input[i];\n            if( typeof item !== 'undefined' && item !== 'null' ) return parse( item );\n        }\n    }\n    else if( typeof input === 'function' ) {\n        return parse( input.call( Data ) );\n    }\n    else if( typeof input === 'string' ) {\n        var cursor = 0;\n        var posStart;\n        var posEnd;\n        var output = '';\n        while( true ) {\n            posStart = input.indexOf( '{{', cursor );\n            if( posStart == -1 ) break;\n            output += input.substr( cursor, posStart - cursor );\n            cursor = posStart + 2;\n            posEnd = input.indexOf( '}}', cursor );\n            if( posEnd == -1 ) break;\n            output += Data.get( input.substr( cursor, posEnd - cursor ).trim() );\n            cursor = posEnd + 2;\n        }\n        return output + input.substr( cursor );\n    }\n\n    return \"\" + input;\n}\n });\n","zip":"require(\"app.perform-actions\",function(r,t){function n(r){if(Array.isArray(r)){var t,e;for(t=0;t<r.length;t++)if(e=r[t],\"undefined\"!=typeof e&&\"null\"!==e)return n(e)}else{if(\"function\"==typeof r)return n(r.call(i));if(\"string\"==typeof r){for(var u,o,a=0,f=\"\";;){if(u=r.indexOf(\"{{\",a),-1==u)break;if(f+=r.substr(a,u-a),a=u+2,o=r.indexOf(\"}}\",a),-1==o)break;f+=i.get(r.substr(a,o-a).trim()),a=o+2}return f+r.substr(a)}}return\"\"+r}var e=require(\"dom\"),i=require(\"data\"),u=require(\"x-template\"),o=require(\"input-boolean\"),a=require(\"input-text\"),f=require(\"input-file\"),p=require(\"input-text\");t.exports=function(r){var t=e.div();return r.forEach(function(r){var n=r[0],e=s[n];if(!e)throw\"Unknonw type `\"+n+\"`!\";var i=e.apply(t,r.slice(1));return\"string\"==typeof i?void(location.hash=\"#\"+i):void(i&&t.appendChild(i))}),t};var s={text:function(r){var t=e.tag(\"p\");return t.innerHTML=n(r),t},button:function(r){var t=e.tag(\"a\",\"button\",{href:\"#\"+n(r.action)});return t.innerHTML=n(r.text),t},nurse:function(r){var t=e.div(),i=u.appendTo(\"nurse\",t);return i.text.innerHTML=n(r),t},reset:function(r){i.reset();var t,n;for(t in r)n=r[t],i.set(t,n)},set:function(r){var t,n;for(t in r)n=r[t],i.set(t,n)},\"input-bool\":function(r){return o(r)},\"input-text\":function(r){return a(r)},\"input-file\":function(r){return f(r)},\"input-date\":function(r){return p(r)},loop:function(r,u){var o=n(r.list),a=n(r.item),f=n(r.sort),p=i.get(o);Array.isArray(p)||(p=[p]),f.trim().length>0;var s=e.div();return p.forEach(function(r){i.set(a,r),s.appendChild(t.exports(u))}),s}}});\n//# sourceMappingURL=app.perform-actions.js.map","map":{"version":3,"file":"app.perform-actions.js.map","sources":["app.perform-actions.js"],"sourcesContent":["require( 'app.perform-actions', function(exports, module) {  /**********************************************************************\n require( 'app.perform-actions' )\n -----------------------------------------------------------------------\n \n **********************************************************************/\nvar $ = require(\"dom\");\nvar Data = require('data');\nvar Tpl = require(\"x-template\");\nvar InputBool = require(\"input-boolean\");\nvar InputText = require(\"input-text\");\nvar InputFile = require(\"input-file\");\nvar InputDate = require(\"input-text\");\n\n\nmodule.exports = function( children ) {\n    var body = $.div();\n\n    children.forEach(function ( child ) {\n        var actionID = child[0];\n        var action = actions[actionID];\n        if( action ) {\n            var element = action.apply( body, child.slice( 1 ) );\n            if( typeof element === 'string' ) {\n                location.hash = '#' + element;\n                return;\n            }\n            if( element ) body.appendChild( element );\n        } else {\n            throw \"Unknonw type `\" + actionID + \"`!\";\n        }\n    });\n\n    return body;\n};\n\n\nvar actions = {\n    text: function( args ) {\n        var div = $.tag( 'p' );\n        div.innerHTML = parse( args );\n        return div;\n    },\n    button: function( args ) {\n        var btn = $.tag( 'a', 'button', { href: '#' + parse( args.action ) } );\n        btn.innerHTML = parse( args.text );\n        return btn;\n    },\n    nurse: function( args ) {\n        var content = $.div();\n        var children = Tpl.appendTo( \"nurse\", content );\n        children.text.innerHTML = parse( args );\n        return content;\n    },\n    reset: function( args ) {\n        Data.reset();\n        var key, val;\n        for( key in args ) {\n            val = args[key];\n            Data.set( key, val );\n        }\n    },\n    set: function( args ) {\n        var key, val;\n        for( key in args ) {\n            val = args[key];\n            Data.set( key, val );\n        }\n    },\n    \"input-bool\": function( args ) {\n        return InputBool( args );\n    },\n    \"input-text\": function( args ) {\n        return InputText( args );\n    },\n    \"input-file\": function( args ) {\n        return InputFile( args );\n    },\n    \"input-date\": function( args ) {\n        return InputDate( args );\n    },\n    loop: function( args, children ) {\n        var list = parse( args.list );\n        var item = parse( args.item );\n        var sort = parse( args.sort );\n        \n        var arr = Data.get( list );\n        if( !Array.isArray( arr ) ) arr = [arr];\n\n        if( sort.trim().length > 0 ) {\n\n        }\n\n        var content = $.div();\n        arr.forEach(function ( child ) {\n            Data.set( item, child );\n            content.appendChild( module.exports( children ) );\n        });\n\n        return content;\n    }\n};\n\n\nfunction parse( input ) {\n    if( Array.isArray( input ) ) {\n        var i, item;\n        for (i = 0 ; i < input.length ; i++) {\n            item = input[i];\n            if( typeof item !== 'undefined' && item !== 'null' ) return parse( item );\n        }\n    }\n    else if( typeof input === 'function' ) {\n        return parse( input.call( Data ) );\n    }\n    else if( typeof input === 'string' ) {\n        var cursor = 0;\n        var posStart;\n        var posEnd;\n        var output = '';\n        while( true ) {\n            posStart = input.indexOf( '{{', cursor );\n            if( posStart == -1 ) break;\n            output += input.substr( cursor, posStart - cursor );\n            cursor = posStart + 2;\n            posEnd = input.indexOf( '}}', cursor );\n            if( posEnd == -1 ) break;\n            output += Data.get( input.substr( cursor, posEnd - cursor ).trim() );\n            cursor = posEnd + 2;\n        }\n        return output + input.substr( cursor );\n    }\n\n    return \"\" + input;\n}\n });\n"],"names":["require","exports","module","parse","input","Array","isArray","i","item","length","call","Data","posStart","posEnd","cursor","output","indexOf","substr","get","trim","$","Tpl","InputBool","InputText","InputFile","InputDate","children","body","div","forEach","child","actionID","action","actions","element","apply","slice","location","hash","appendChild","text","args","tag","innerHTML","button","btn","href","nurse","content","appendTo","reset","key","val","set","input-bool","input-text","input-file","input-date","loop","list","sort","arr"],"mappings":"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"},"dependencies":["mod/app.perform-actions","mod/dom","mod/data","mod/x-template","mod/input-boolean","mod/input-text","mod/input-file"]}