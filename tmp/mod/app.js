{"intl":"","src":"require( 'app', function(exports, module) {  /**********************************************************************\n **********************************************************************/\nvar $ = require(\"dom\");\nvar Data = require(\"data\");\nvar Hash = require(\"tfw.hash-watcher\");\nvar Actions = require(\"actions\");\nvar PerformActions = require('app.perform-actions');\n\n\n// Main div af the screen.\nvar WDG = {\n    demo: $.get( '#DEMO' ),\n    app: $.get( '#APP' ),\n    appBody: $.get( '#APP-BODY' )\n};\n\n\nHash( function( actionID, arg1, arg2, arg3 ) {\n    if( actionID == 'refresh' ) {\n        location.hash = arg1;\n        return;\n    }\n    var action = findAction( actionID, arg1, arg2, arg3 );\n    if( !action ) return;\n\n    Data.set( \"arg0\", actionID );\n    Data.set( \"arg1\", arg1 );\n    Data.set( \"arg2\", arg2 );\n    Data.set( \"arg3\", arg3 );\n    console.log( \"----------------------------------------\" );\n    console.info(\"[app] actionID=...\", actionID, Data.get( \"arg0\" ));\n    Data.log();\n\n    if( typeof action === 'undefined' ) {\n        console.error( 'Unknown action: \"' + actionID + '\"' );\n        console.error( Object.keys( Actions ) );\n        location.hash = \"#main\";\n        return;\n    }\n\n    var type = action[0].trim().toLowerCase();\n    var children = action[1];\n\n    document.body.className = type;\n    try {\n        switch( type ) {\n        case 'story': actionDemo( children ); break;\n        case 'demo': actionDemo( children ); break;\n        case 'app': actionApp( children ); break;\n        case 'msg': actionMsg( children ); break;\n        }\n    }\n    catch( ex ) {\n        console.error( \"Error in \" + type.toUpperCase() + \":\", children );\n        console.error( \"Action:\", action );\n        alert( \"There is an error!\" );\n    }\n\n    $.get( '#HEADER' ).innerHTML = Data.parse( \"Open Hackathon 2016 - Team 3 - <b>{{$today|datetime}}</b>\" );\n    Data.log();\n    Data.save();\n});\n\n\nfunction actionDemo( children ) {\n    $.clear( WDG.demo, PerformActions( children ) );\n}\n\n\nfunction actionApp( children ) {\n    var content = PerformActions( children );\n    $.addClass( content, 'app', 'hide' );\n    $.clear( WDG.appBody, content );\n    window.setTimeout(function() {\n        $.removeClass( content, 'hide' );\n    });\n}\n\n\nfunction actionMsg( children ) {\n    var content = PerformActions( children );\n    $.addClass( content, 'msg', 'hide' );\n    $.clear( WDG.appBody, content );\n    window.setTimeout(function() {\n        $.removeClass( content, 'hide' );\n    });\n}\n\n\n/**\n * `arg0` has the last actionID.\n * If `arg0 == \"A:B:C\"` and `actionID == \"foo:bar\"`,\n * the actions will be serach in this order:\n * * `A:B:foo:bar`\n * * `A:foo:bar`\n * * `foo:bar`\n */\nfunction findAction( actionID, arg1, arg2, arg3 ) {\n    var from = Data.get( \"arg0\" ) || '';\n    from = (\"\" + from).trim().split( \":\" );\n    if( from.length > 1 ) {\n        from.pop();\n        var i;\n        var hash;\n        var prefix;\n        var action;\n        for( i = from.length ; i > 0 ; i-- ) {\n            prefix = from.slice( 0, i ).join( ':' );\n            if( prefix.length > 0 ) prefix += \":\";\n            action = Actions[ prefix + actionID ];\n            if( action ) {\n                hash = \"#\" + prefix + actionID;\n                if( typeof arg1 !== 'undefined' ) {\n                    hash += \"/\" + arg1;\n                    if( typeof arg2 !== 'undefined' ) {\n                        hash += \"/\" + arg2;\n                        if( typeof arg3 !== 'undefined' ) {\n                            hash += \"/\" + arg3;\n                        }\n                    }\n                }\n                location.hash = hash;\n                return undefined;\n            }\n        }\n    }\n    action = Actions[actionID];\n    if( !action ) {\n        location.hash = \"#main\";\n    }\n    return action;\n}\n });\n","zip":"require(\"app\",function(e,o){function r(e){i.clear(l.demo,p(e))}function a(e){var o=p(e);i.addClass(o,\"app\",\"hide\"),i.clear(l.appBody,o),window.setTimeout(function(){i.removeClass(o,\"hide\")})}function n(e){var o=p(e);i.addClass(o,\"msg\",\"hide\"),i.clear(l.appBody,o),window.setTimeout(function(){i.removeClass(o,\"hide\")})}function t(e,o,r,a){var n=s.get(\"arg0\")||\"\";if(n=(\"\"+n).trim().split(\":\"),n.length>1){n.pop();var t,i,c,p;for(t=n.length;t>0;t--)if(c=n.slice(0,t).join(\":\"),c.length>0&&(c+=\":\"),p=d[c+e])return i=\"#\"+c+e,\"undefined\"!=typeof o&&(i+=\"/\"+o,\"undefined\"!=typeof r&&(i+=\"/\"+r,\"undefined\"!=typeof a&&(i+=\"/\"+a))),void(location.hash=i)}return p=d[e],p||(location.hash=\"#main\"),p}var i=require(\"dom\"),s=require(\"data\"),c=require(\"tfw.hash-watcher\"),d=require(\"actions\"),p=require(\"app.perform-actions\"),l={demo:i.get(\"#DEMO\"),app:i.get(\"#APP\"),appBody:i.get(\"#APP-BODY\")};c(function(e,o,c,p){if(\"refresh\"==e)return void(location.hash=o);var l=t(e,o,c,p);if(l){if(s.set(\"arg0\",e),s.set(\"arg1\",o),s.set(\"arg2\",c),s.set(\"arg3\",p),console.log(\"----------------------------------------\"),console.info(\"[app] actionID=...\",e,s.get(\"arg0\")),s.log(),\"undefined\"==typeof l)return console.error('Unknown action: \"'+e+'\"'),console.error(Object.keys(d)),void(location.hash=\"#main\");var f=l[0].trim().toLowerCase(),u=l[1];document.body.className=f;try{switch(f){case\"story\":r(u);break;case\"demo\":r(u);break;case\"app\":a(u);break;case\"msg\":n(u)}}catch(h){console.error(\"Error in \"+f.toUpperCase()+\":\",u),console.error(\"Action:\",l),alert(\"There is an error!\")}i.get(\"#HEADER\").innerHTML=s.parse(\"Open Hackathon 2016 - Team 3 - <b>{{$today|datetime}}</b>\"),s.log(),s.save()}})});\n//# sourceMappingURL=app.js.map","map":{"version":3,"file":"app.js.map","sources":["app.js"],"sourcesContent":["require( 'app', function(exports, module) {  /**********************************************************************\n **********************************************************************/\nvar $ = require(\"dom\");\nvar Data = require(\"data\");\nvar Hash = require(\"tfw.hash-watcher\");\nvar Actions = require(\"actions\");\nvar PerformActions = require('app.perform-actions');\n\n\n// Main div af the screen.\nvar WDG = {\n    demo: $.get( '#DEMO' ),\n    app: $.get( '#APP' ),\n    appBody: $.get( '#APP-BODY' )\n};\n\n\nHash( function( actionID, arg1, arg2, arg3 ) {\n    if( actionID == 'refresh' ) {\n        location.hash = arg1;\n        return;\n    }\n    var action = findAction( actionID, arg1, arg2, arg3 );\n    if( !action ) return;\n\n    Data.set( \"arg0\", actionID );\n    Data.set( \"arg1\", arg1 );\n    Data.set( \"arg2\", arg2 );\n    Data.set( \"arg3\", arg3 );\n    console.log( \"----------------------------------------\" );\n    console.info(\"[app] actionID=...\", actionID, Data.get( \"arg0\" ));\n    Data.log();\n\n    if( typeof action === 'undefined' ) {\n        console.error( 'Unknown action: \"' + actionID + '\"' );\n        console.error( Object.keys( Actions ) );\n        location.hash = \"#main\";\n        return;\n    }\n\n    var type = action[0].trim().toLowerCase();\n    var children = action[1];\n\n    document.body.className = type;\n    try {\n        switch( type ) {\n        case 'story': actionDemo( children ); break;\n        case 'demo': actionDemo( children ); break;\n        case 'app': actionApp( children ); break;\n        case 'msg': actionMsg( children ); break;\n        }\n    }\n    catch( ex ) {\n        console.error( \"Error in \" + type.toUpperCase() + \":\", children );\n        console.error( \"Action:\", action );\n        alert( \"There is an error!\" );\n    }\n\n    $.get( '#HEADER' ).innerHTML = Data.parse( \"Open Hackathon 2016 - Team 3 - <b>{{$today|datetime}}</b>\" );\n    Data.log();\n    Data.save();\n});\n\n\nfunction actionDemo( children ) {\n    $.clear( WDG.demo, PerformActions( children ) );\n}\n\n\nfunction actionApp( children ) {\n    var content = PerformActions( children );\n    $.addClass( content, 'app', 'hide' );\n    $.clear( WDG.appBody, content );\n    window.setTimeout(function() {\n        $.removeClass( content, 'hide' );\n    });\n}\n\n\nfunction actionMsg( children ) {\n    var content = PerformActions( children );\n    $.addClass( content, 'msg', 'hide' );\n    $.clear( WDG.appBody, content );\n    window.setTimeout(function() {\n        $.removeClass( content, 'hide' );\n    });\n}\n\n\n/**\n * `arg0` has the last actionID.\n * If `arg0 == \"A:B:C\"` and `actionID == \"foo:bar\"`,\n * the actions will be serach in this order:\n * * `A:B:foo:bar`\n * * `A:foo:bar`\n * * `foo:bar`\n */\nfunction findAction( actionID, arg1, arg2, arg3 ) {\n    var from = Data.get( \"arg0\" ) || '';\n    from = (\"\" + from).trim().split( \":\" );\n    if( from.length > 1 ) {\n        from.pop();\n        var i;\n        var hash;\n        var prefix;\n        var action;\n        for( i = from.length ; i > 0 ; i-- ) {\n            prefix = from.slice( 0, i ).join( ':' );\n            if( prefix.length > 0 ) prefix += \":\";\n            action = Actions[ prefix + actionID ];\n            if( action ) {\n                hash = \"#\" + prefix + actionID;\n                if( typeof arg1 !== 'undefined' ) {\n                    hash += \"/\" + arg1;\n                    if( typeof arg2 !== 'undefined' ) {\n                        hash += \"/\" + arg2;\n                        if( typeof arg3 !== 'undefined' ) {\n                            hash += \"/\" + arg3;\n                        }\n                    }\n                }\n                location.hash = hash;\n                return undefined;\n            }\n        }\n    }\n    action = Actions[actionID];\n    if( !action ) {\n        location.hash = \"#main\";\n    }\n    return action;\n}\n });\n"],"names":["require","exports","module","actionDemo","children","$","clear","WDG","demo","PerformActions","actionApp","content","addClass","appBody","window","setTimeout","removeClass","actionMsg","findAction","actionID","arg1","arg2","arg3","from","Data","get","trim","split","length","pop","i","hash","prefix","action","slice","join","Actions","location","Hash","app","set","console","log","info","error","Object","keys","type","toLowerCase","document","body","className","ex","toUpperCase","alert","innerHTML","parse","save"],"mappings":"AAAAA,QAAS,MAAO,SAASC,EAASC,GAgElC,QAASC,GAAYC,GACjBC,EAAEC,MAAOC,EAAIC,KAAMC,EAAgBL,IAIvC,QAASM,GAAWN,GAChB,GAAIO,GAAUF,EAAgBL,EAC9BC,GAAEO,SAAUD,EAAS,MAAO,QAC5BN,EAAEC,MAAOC,EAAIM,QAASF,GACtBG,OAAOC,WAAW,WACdV,EAAEW,YAAaL,EAAS,UAKhC,QAASM,GAAWb,GAChB,GAAIO,GAAUF,EAAgBL,EAC9BC,GAAEO,SAAUD,EAAS,MAAO,QAC5BN,EAAEC,MAAOC,EAAIM,QAASF,GACtBG,OAAOC,WAAW,WACdV,EAAEW,YAAaL,EAAS,UAahC,QAASO,GAAYC,EAAUC,EAAMC,EAAMC,GACvC,GAAIC,GAAOC,EAAKC,IAAK,SAAY,EAEjC,IADAF,GAAQ,GAAKA,GAAMG,OAAOC,MAAO,KAC7BJ,EAAKK,OAAS,EAAI,CAClBL,EAAKM,KACL,IAAIC,GACAC,EACAC,EACAC,CACJ,KAAKH,EAAIP,EAAKK,OAASE,EAAI,EAAIA,IAI3B,GAHAE,EAAST,EAAKW,MAAO,EAAGJ,GAAIK,KAAM,KAC9BH,EAAOJ,OAAS,IAAII,GAAU,KAClCC,EAASG,EAASJ,EAASb,GAavB,MAXAY,GAAO,IAAMC,EAASb,EACF,mBAATC,KACPW,GAAQ,IAAMX,EACM,mBAATC,KACPU,GAAQ,IAAMV,EACM,mBAATC,KACPS,GAAQ,IAAMT,UAI1Be,SAASN,KAAOA,GAS5B,MAJAE,GAASG,EAAQjB,GACZc,IACDI,SAASN,KAAO,SAEbE,EAhIX,GAAI5B,GAAIL,QAAQ,OACZwB,EAAOxB,QAAQ,QACfsC,EAAOtC,QAAQ,oBACfoC,EAAUpC,QAAQ,WAClBS,EAAiBT,QAAQ,uBAIzBO,GACAC,KAAMH,EAAEoB,IAAK,SACbc,IAAKlC,EAAEoB,IAAK,QACZZ,QAASR,EAAEoB,IAAK,aAIpBa,GAAM,SAAUnB,EAAUC,EAAMC,EAAMC,GAClC,GAAgB,WAAZH,EAEA,YADAkB,SAASN,KAAOX,EAGpB,IAAIa,GAASf,EAAYC,EAAUC,EAAMC,EAAMC,EAC/C,IAAKW,EAAL,CAUA,GARAT,EAAKgB,IAAK,OAAQrB,GAClBK,EAAKgB,IAAK,OAAQpB,GAClBI,EAAKgB,IAAK,OAAQnB,GAClBG,EAAKgB,IAAK,OAAQlB,GAClBmB,QAAQC,IAAK,4CACbD,QAAQE,KAAK,qBAAsBxB,EAAUK,EAAKC,IAAK,SACvDD,EAAKkB,MAEiB,mBAAXT,GAIP,MAHAQ,SAAQG,MAAO,oBAAsBzB,EAAW,KAChDsB,QAAQG,MAAOC,OAAOC,KAAMV,SAC5BC,SAASN,KAAO,QAIpB,IAAIgB,GAAOd,EAAO,GAAGP,OAAOsB,cACxB5C,EAAW6B,EAAO,EAEtBgB,UAASC,KAAKC,UAAYJ,CAC1B,KACI,OAAQA,GACR,IAAK,QAAS5C,EAAYC,EAAY,MACtC,KAAK,OAAQD,EAAYC,EAAY,MACrC,KAAK,MAAOM,EAAWN,EAAY,MACnC,KAAK,MAAOa,EAAWb,IAG3B,MAAOgD,GACHX,QAAQG,MAAO,YAAcG,EAAKM,cAAgB,IAAKjD,GACvDqC,QAAQG,MAAO,UAAWX,GAC1BqB,MAAO,sBAGXjD,EAAEoB,IAAK,WAAY8B,UAAY/B,EAAKgC,MAAO,6DAC3ChC,EAAKkB,MACLlB,EAAKiC"},"dependencies":["mod/app","mod/dom","mod/data","mod/tfw.hash-watcher","mod/actions","mod/app.perform-actions"]}