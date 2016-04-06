{"intl":"","src":"require( 'main', function(exports, module) {  /**********************************************************************\n require( 'main' )\n -----------------------------------------------------------------------\n Global functions needed for the book.\n **********************************************************************/\n\nrequire(\"tp4.button\");\nrequire(\"page-new\");\nrequire(\"page-lost\");\n\nvar $ = require(\"dom\");\nvar Wdg = require(\"x-widget\");\nvar Md5 = require(\"md5\");\nvar Storage = require(\"tfw.storage\").local;\nvar PageUser = require(\"page-user\");\nvar PageEvent = require(\"page-event\");\nvar PageUserEdit = require(\"page-user-edit\");\n\n\nvar querystring = window.location.search.substr( 1 );\nif( Md5.isValid( querystring ) ) {\n    exports.id = querystring;\n    $.on( document.getElementById( 'lockscreen' ), function() {\n        window.location = \"?\" + querystring + \"#/book/user\";\n    });\n    window.location.hash = \"/book/lockscreen\";\n}\n\nexports.onActivateMain = function() {\n    var qrcode = Wdg.onWidgetCreation( 'qrcode', function( wdg ) {\n        wdg.id = Storage.get( 'id', Md5( \"contact@tolokoban.org\" ) );\n    });\n};\n\n\nexports.onActivateUser = function() {\n    PageUser.activate( APP.id );\n};\n\n\nexports.onActivateEvent = function() {\n    PageEvent.activate( APP.id );\n};\n\n\nexports.onActivateUserEdit = function() {\n    PageUserEdit.activate( APP.id );\n};\n\n\nexports.waitOn = function() {\n    var wait = document.getElementById( \"wait\" );\n    wait.style.display = \"block\";\n};\n\nexports.waitOff = function() {\n    var wait = document.getElementById( \"wait\" );\n    wait.style.display = \"none\";\n};\n });\n","zip":"require(\"main\",function(e,t){require(\"tp4.button\"),require(\"page-new\"),require(\"page-lost\");var i=require(\"dom\"),n=require(\"x-widget\"),o=require(\"md5\"),r=require(\"tfw.storage\").local,a=require(\"page-user\"),c=require(\"page-event\"),u=require(\"page-user-edit\"),d=window.location.search.substr(1);o.isValid(d)&&(e.id=d,i.on(document.getElementById(\"lockscreen\"),function(){window.location=\"?\"+d+\"#/book/user\"}),window.location.hash=\"/book/lockscreen\"),e.onActivateMain=function(){n.onWidgetCreation(\"qrcode\",function(e){e.id=r.get(\"id\",o(\"contact@tolokoban.org\"))})},e.onActivateUser=function(){a.activate(APP.id)},e.onActivateEvent=function(){c.activate(APP.id)},e.onActivateUserEdit=function(){u.activate(APP.id)},e.waitOn=function(){var e=document.getElementById(\"wait\");e.style.display=\"block\"},e.waitOff=function(){var e=document.getElementById(\"wait\");e.style.display=\"none\"}});\n//# sourceMappingURL=main.js.map","map":{"version":3,"file":"main.js.map","sources":["main.js"],"sourcesContent":["require( 'main', function(exports, module) {  /**********************************************************************\n require( 'main' )\n -----------------------------------------------------------------------\n Global functions needed for the book.\n **********************************************************************/\n\nrequire(\"tp4.button\");\nrequire(\"page-new\");\nrequire(\"page-lost\");\n\nvar $ = require(\"dom\");\nvar Wdg = require(\"x-widget\");\nvar Md5 = require(\"md5\");\nvar Storage = require(\"tfw.storage\").local;\nvar PageUser = require(\"page-user\");\nvar PageEvent = require(\"page-event\");\nvar PageUserEdit = require(\"page-user-edit\");\n\n\nvar querystring = window.location.search.substr( 1 );\nif( Md5.isValid( querystring ) ) {\n    exports.id = querystring;\n    $.on( document.getElementById( 'lockscreen' ), function() {\n        window.location = \"?\" + querystring + \"#/book/user\";\n    });\n    window.location.hash = \"/book/lockscreen\";\n}\n\nexports.onActivateMain = function() {\n    var qrcode = Wdg.onWidgetCreation( 'qrcode', function( wdg ) {\n        wdg.id = Storage.get( 'id', Md5( \"contact@tolokoban.org\" ) );\n    });\n};\n\n\nexports.onActivateUser = function() {\n    PageUser.activate( APP.id );\n};\n\n\nexports.onActivateEvent = function() {\n    PageEvent.activate( APP.id );\n};\n\n\nexports.onActivateUserEdit = function() {\n    PageUserEdit.activate( APP.id );\n};\n\n\nexports.waitOn = function() {\n    var wait = document.getElementById( \"wait\" );\n    wait.style.display = \"block\";\n};\n\nexports.waitOff = function() {\n    var wait = document.getElementById( \"wait\" );\n    wait.style.display = \"none\";\n};\n });\n"],"names":["require","exports","module","$","Wdg","Md5","Storage","local","PageUser","PageEvent","PageUserEdit","querystring","window","location","search","substr","isValid","id","on","document","getElementById","hash","onActivateMain","onWidgetCreation","wdg","get","onActivateUser","activate","APP","onActivateEvent","onActivateUserEdit","waitOn","wait","style","display","waitOff"],"mappings":"AAAAA,QAAS,OAAQ,SAASC,EAASC,GAMnCF,QAAQ,cACRA,QAAQ,YACRA,QAAQ,YAER,IAAIG,GAAIH,QAAQ,OACZI,EAAMJ,QAAQ,YACdK,EAAML,QAAQ,OACdM,EAAUN,QAAQ,eAAeO,MACjCC,EAAWR,QAAQ,aACnBS,EAAYT,QAAQ,cACpBU,EAAeV,QAAQ,kBAGvBW,EAAcC,OAAOC,SAASC,OAAOC,OAAQ,EAC7CV,GAAIW,QAASL,KACbV,EAAQgB,GAAKN,EACbR,EAAEe,GAAIC,SAASC,eAAgB,cAAgB,WAC3CR,OAAOC,SAAW,IAAMF,EAAc,gBAE1CC,OAAOC,SAASQ,KAAO,oBAG3BpB,EAAQqB,eAAiB,WACRlB,EAAImB,iBAAkB,SAAU,SAAUC,GACnDA,EAAIP,GAAKX,EAAQmB,IAAK,KAAMpB,EAAK,6BAKzCJ,EAAQyB,eAAiB,WACrBlB,EAASmB,SAAUC,IAAIX,KAI3BhB,EAAQ4B,gBAAkB,WACtBpB,EAAUkB,SAAUC,IAAIX,KAI5BhB,EAAQ6B,mBAAqB,WACzBpB,EAAaiB,SAAUC,IAAIX,KAI/BhB,EAAQ8B,OAAS,WACb,GAAIC,GAAOb,SAASC,eAAgB,OACpCY,GAAKC,MAAMC,QAAU,SAGzBjC,EAAQkC,QAAU,WACd,GAAIH,GAAOb,SAASC,eAAgB,OACpCY,GAAKC,MAAMC,QAAU"},"dependencies":["mod/main","mod/tp4.button","mod/page-new","mod/page-lost","mod/dom","mod/x-widget","mod/md5","mod/tfw.storage","mod/page-user","mod/page-event","mod/page-user-edit"]}