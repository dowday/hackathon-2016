{"intl":"","src":"require( 'page-user', function(exports, module) {  var $ = require(\"dom\");\r\nvar WS = require(\"tfw.web-service\");\r\nvar Tpl = require(\"x-template\");\r\nvar Wdg = require(\"x-widget\");\r\nvar Gravatar = require(\"wdg.gravatar\");\r\n\r\n\r\nexports.activate = function( id ) {\r\n    var container = document.getElementById( 'user-container' );\r\n    $.clear( container );\r\n    Tpl.appendTo( \"user.wait\", container );\r\n    Wdg.onWidgetCreation( 'qrcode2', function( wdg ) {\r\n        wdg.id = id;\r\n    });\r\n    WS.get( 'registration', ['get', id] ).then(\r\n        function( data ) {\r\n            APP.data = data;\r\n            if( !data ) {\r\n                window.location = \"?#/book/main\";\r\n                return;\r\n            }\r\n            console.info(\"[page-user] data=...\", data);\r\n            $.clear( container );\r\n            var children = Tpl.appendTo( \"user.data\", container );\r\n            console.info(\"[page-user] children=...\", children);\r\n            children.img.src = Gravatar.url( id, 128 );\r\n            children.firstname.textContent = data.firstname;\r\n            children.lastname.textContent = data.lastname;\r\n            var planning = children.planning;\r\n            $.clear( planning );\r\n            if( Array.isArray( data.planning ) ) {\r\n                data.planning.forEach(function (visit) {\r\n                    var children = Tpl.appendTo( \"user.visit\", planning );\r\n                    children.visitName.textContent = visit.name;\r\n                    children.visitDate.textContent = visit.date;\r\n                    children.visitName.setAttribute(\r\n                        'href',\r\n                        \"https://www.google.ch/maps/search/\"\r\n                        + (\"\" + visit.address).replace( /[ ]/g, '+' )\r\n                    );\r\n                });\r\n\r\n            }\r\n        }\r\n    );\r\n};\r\n });\r\n","zip":"require(\"page-user\",function(e,t){var a=require(\"dom\"),n=require(\"tfw.web-service\"),r=require(\"x-template\"),i=require(\"x-widget\"),o=require(\"wdg.gravatar\");e.activate=function(e){var t=document.getElementById(\"user-container\");a.clear(t),r.appendTo(\"user.wait\",t),i.onWidgetCreation(\"qrcode2\",function(t){t.id=e}),n.get(\"registration\",[\"get\",e]).then(function(n){if(APP.data=n,!n)return void(window.location=\"?#/book/main\");console.info(\"[page-user] data=...\",n),a.clear(t);var i=r.appendTo(\"user.data\",t);console.info(\"[page-user] children=...\",i),i.img.src=o.url(e,128),i.firstname.textContent=n.firstname,i.lastname.textContent=n.lastname;var s=i.planning;a.clear(s),Array.isArray(n.planning)&&n.planning.forEach(function(e){var t=r.appendTo(\"user.visit\",s);t.visitName.textContent=e.name,t.visitDate.textContent=e.date,t.visitName.setAttribute(\"href\",\"https://www.google.ch/maps/search/\"+(\"\"+e.address).replace(/[ ]/g,\"+\"))})})}});\n//# sourceMappingURL=page-user.js.map","map":{"version":3,"file":"page-user.js.map","sources":["page-user.js"],"sourcesContent":["require( 'page-user', function(exports, module) {  var $ = require(\"dom\");\r\nvar WS = require(\"tfw.web-service\");\r\nvar Tpl = require(\"x-template\");\r\nvar Wdg = require(\"x-widget\");\r\nvar Gravatar = require(\"wdg.gravatar\");\r\n\r\n\r\nexports.activate = function( id ) {\r\n    var container = document.getElementById( 'user-container' );\r\n    $.clear( container );\r\n    Tpl.appendTo( \"user.wait\", container );\r\n    Wdg.onWidgetCreation( 'qrcode2', function( wdg ) {\r\n        wdg.id = id;\r\n    });\r\n    WS.get( 'registration', ['get', id] ).then(\r\n        function( data ) {\r\n            APP.data = data;\r\n            if( !data ) {\r\n                window.location = \"?#/book/main\";\r\n                return;\r\n            }\r\n            console.info(\"[page-user] data=...\", data);\r\n            $.clear( container );\r\n            var children = Tpl.appendTo( \"user.data\", container );\r\n            console.info(\"[page-user] children=...\", children);\r\n            children.img.src = Gravatar.url( id, 128 );\r\n            children.firstname.textContent = data.firstname;\r\n            children.lastname.textContent = data.lastname;\r\n            var planning = children.planning;\r\n            $.clear( planning );\r\n            if( Array.isArray( data.planning ) ) {\r\n                data.planning.forEach(function (visit) {\r\n                    var children = Tpl.appendTo( \"user.visit\", planning );\r\n                    children.visitName.textContent = visit.name;\r\n                    children.visitDate.textContent = visit.date;\r\n                    children.visitName.setAttribute(\r\n                        'href',\r\n                        \"https://www.google.ch/maps/search/\"\r\n                        + (\"\" + visit.address).replace( /[ ]/g, '+' )\r\n                    );\r\n                });\r\n\r\n            }\r\n        }\r\n    );\r\n};\r\n });\r\n"],"names":["require","exports","module","$","WS","Tpl","Wdg","Gravatar","activate","id","container","document","getElementById","clear","appendTo","onWidgetCreation","wdg","get","then","data","APP","window","location","console","info","children","img","src","url","firstname","textContent","lastname","planning","Array","isArray","forEach","visit","visitName","name","visitDate","date","setAttribute","address","replace"],"mappings":"AAAAA,QAAS,YAAa,SAASC,EAASC,GAAW,GAAIC,GAAIH,QAAQ,OAC/DI,EAAKJ,QAAQ,mBACbK,EAAML,QAAQ,cACdM,EAAMN,QAAQ,YACdO,EAAWP,QAAQ,eAGvBC,GAAQO,SAAW,SAAUC,GACzB,GAAIC,GAAYC,SAASC,eAAgB,iBACzCT,GAAEU,MAAOH,GACTL,EAAIS,SAAU,YAAaJ,GAC3BJ,EAAIS,iBAAkB,UAAW,SAAUC,GACvCA,EAAIP,GAAKA,IAEbL,EAAGa,IAAK,gBAAiB,MAAOR,IAAMS,KAClC,SAAUC,GAEN,GADAC,IAAID,KAAOA,GACNA,EAED,YADAE,OAAOC,SAAW,eAGtBC,SAAQC,KAAK,uBAAwBL,GACrChB,EAAEU,MAAOH,EACT,IAAIe,GAAWpB,EAAIS,SAAU,YAAaJ,EAC1Ca,SAAQC,KAAK,2BAA4BC,GACzCA,EAASC,IAAIC,IAAMpB,EAASqB,IAAKnB,EAAI,KACrCgB,EAASI,UAAUC,YAAcX,EAAKU,UACtCJ,EAASM,SAASD,YAAcX,EAAKY,QACrC,IAAIC,GAAWP,EAASO,QACxB7B,GAAEU,MAAOmB,GACLC,MAAMC,QAASf,EAAKa,WACpBb,EAAKa,SAASG,QAAQ,SAAUC,GAC5B,GAAIX,GAAWpB,EAAIS,SAAU,aAAckB,EAC3CP,GAASY,UAAUP,YAAcM,EAAME,KACvCb,EAASc,UAAUT,YAAcM,EAAMI,KACvCf,EAASY,UAAUI,aACf,OACA,sCACG,GAAKL,EAAMM,SAASC,QAAS,OAAQ"},"dependencies":["mod/page-user","mod/dom","mod/tfw.web-service","mod/x-template","mod/x-widget","mod/wdg.gravatar"]}