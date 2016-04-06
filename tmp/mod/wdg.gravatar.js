{"intl":"","src":"require( 'wdg.gravatar', function(exports, module) {  // https://secure.gravatar.com/site/implement/images/\n\nvar Widget = require(\"wdg\");\nvar Md5 = require(\"md5\");\n\n/**\n * @param {string} md5 Email's MD5.\n * @param {number} size Side size in pixel of the image. Default = `32`.\n * @param {string} unknown Que faut-il afficher s'il n'y a pas de Gravatar. Default = `retro`.\n * \n * * `404` : Ne rien retourner. C'est la valeur par défaut.\n * * `mm` : Mystery Man, constant.\n * * `blank` : Blanc, constant.\n * * `identicon` : Dépend de l'e-mail.\n * * `monsterid` : Dépend de l'e-mail.\n * * `wavatar` : Dépend de l'e-mail.\n * * `retro` : Dépend de l'e-mail.\n * \n */\nvar getURL = function(md5, size, unknown) {\n    if (typeof size === 'undefined') size = 32;\n    if (typeof unknown === 'undefined') unknown = \"retro\";\n\n    return \"https://secure.gravatar.com/avatar/\"\n        + md5 + \"?s=\" + size + \"&r=pg&d=\" + unknown;\n};\n\n/**\n * @param {string} email Adresse mail ou MD5.\n * @param {string} unknown Que faut-il afficher s'il n'y a pas de Gravatar.\n * \n * * `404` : Ne rien retourner. C'est la valeur par défaut.\n * * `mm` : Mystery Man, constant.\n * * `blank` : Blanc, constant.\n * * `identicon` : Dépend de l'e-mail.\n * * `monsterid` : Dépend de l'e-mail.\n * * `wavatar` : Dépend de l'e-mail.\n * * `retro` : Dépend de l'e-mail.\n * \n * @example\n * var Gravatar = require(\"wdg.gravatar\");\n * var instance = new Gravatar(email, size);\n * @class Gravatar\n */\nvar Gravatar = function(email, size, unknown) {\n    var that = this;\n    Widget.call(this);\n    if (typeof unknown === 'undefined') unknown = 'retro';\n    var md5 = email;\n    if (email.indexOf(\"@\") > 0) {\n        md5 = Md5(email);\n    }\n    this.addClass(\"wdg-gravatar\", \"hide\");\n    if (typeof size !== 'number') size = 32;\n    this._loaded = false;\n    this._defined = false;\n    this._url = null;\n    this.css({width: size + \"px\", height: size + \"px\"});\n    var img = new Image();\n    img.onload = function() {\n        that.css({backgroundImage: \"url(\" + img.src + \")\"});\n        that._loaded = true;\n        that._defined = true;\n        that.removeClass(\"hide\");\n    };\n    img.onerror = function() {\n        that._loaded = true;\n        that._defined = false;\n    };\n    img.src = getURL(md5, size, unknown);\n    this._url = img.src;\n};\n\nGravatar.prototype = Object.create(Widget.prototype);\nGravatar.prototype.constructor = Gravatar;\n\n/**\n * @return void\n */\nGravatar.prototype.isLoaded = function() {\n    return this._loaded;\n};\n\n/**\n * @return void\n */\nGravatar.prototype.isDefined = function() {\n    return this._defined;\n};\n\nGravatar.create = function(email, size, unknown) {\n    return new Gravatar(email, size, unknown);\n};\n\nGravatar.url = getURL;\n\nmodule.exports = Gravatar;\n });\n","zip":"require(\"wdg.gravatar\",function(e,r){var t=require(\"wdg\"),n=require(\"md5\"),o=function(e,r,t){return\"undefined\"==typeof r&&(r=32),\"undefined\"==typeof t&&(t=\"retro\"),\"https://secure.gravatar.com/avatar/\"+e+\"?s=\"+r+\"&r=pg&d=\"+t},d=function(e,r,d){var i=this;t.call(this),\"undefined\"==typeof d&&(d=\"retro\");var a=e;e.indexOf(\"@\")>0&&(a=n(e)),this.addClass(\"wdg-gravatar\",\"hide\"),\"number\"!=typeof r&&(r=32),this._loaded=!1,this._defined=!1,this._url=null,this.css({width:r+\"px\",height:r+\"px\"});var s=new Image;s.onload=function(){i.css({backgroundImage:\"url(\"+s.src+\")\"}),i._loaded=!0,i._defined=!0,i.removeClass(\"hide\")},s.onerror=function(){i._loaded=!0,i._defined=!1},s.src=o(a,r,d),this._url=s.src};d.prototype=Object.create(t.prototype),d.prototype.constructor=d,d.prototype.isLoaded=function(){return this._loaded},d.prototype.isDefined=function(){return this._defined},d.create=function(e,r,t){return new d(e,r,t)},d.url=o,r.exports=d});\n//# sourceMappingURL=wdg.gravatar.js.map","map":{"version":3,"file":"wdg.gravatar.js.map","sources":["wdg.gravatar.js"],"sourcesContent":["require( 'wdg.gravatar', function(exports, module) {  // https://secure.gravatar.com/site/implement/images/\n\nvar Widget = require(\"wdg\");\nvar Md5 = require(\"md5\");\n\n/**\n * @param {string} md5 Email's MD5.\n * @param {number} size Side size in pixel of the image. Default = `32`.\n * @param {string} unknown Que faut-il afficher s'il n'y a pas de Gravatar. Default = `retro`.\n * \n * * `404` : Ne rien retourner. C'est la valeur par défaut.\n * * `mm` : Mystery Man, constant.\n * * `blank` : Blanc, constant.\n * * `identicon` : Dépend de l'e-mail.\n * * `monsterid` : Dépend de l'e-mail.\n * * `wavatar` : Dépend de l'e-mail.\n * * `retro` : Dépend de l'e-mail.\n * \n */\nvar getURL = function(md5, size, unknown) {\n    if (typeof size === 'undefined') size = 32;\n    if (typeof unknown === 'undefined') unknown = \"retro\";\n\n    return \"https://secure.gravatar.com/avatar/\"\n        + md5 + \"?s=\" + size + \"&r=pg&d=\" + unknown;\n};\n\n/**\n * @param {string} email Adresse mail ou MD5.\n * @param {string} unknown Que faut-il afficher s'il n'y a pas de Gravatar.\n * \n * * `404` : Ne rien retourner. C'est la valeur par défaut.\n * * `mm` : Mystery Man, constant.\n * * `blank` : Blanc, constant.\n * * `identicon` : Dépend de l'e-mail.\n * * `monsterid` : Dépend de l'e-mail.\n * * `wavatar` : Dépend de l'e-mail.\n * * `retro` : Dépend de l'e-mail.\n * \n * @example\n * var Gravatar = require(\"wdg.gravatar\");\n * var instance = new Gravatar(email, size);\n * @class Gravatar\n */\nvar Gravatar = function(email, size, unknown) {\n    var that = this;\n    Widget.call(this);\n    if (typeof unknown === 'undefined') unknown = 'retro';\n    var md5 = email;\n    if (email.indexOf(\"@\") > 0) {\n        md5 = Md5(email);\n    }\n    this.addClass(\"wdg-gravatar\", \"hide\");\n    if (typeof size !== 'number') size = 32;\n    this._loaded = false;\n    this._defined = false;\n    this._url = null;\n    this.css({width: size + \"px\", height: size + \"px\"});\n    var img = new Image();\n    img.onload = function() {\n        that.css({backgroundImage: \"url(\" + img.src + \")\"});\n        that._loaded = true;\n        that._defined = true;\n        that.removeClass(\"hide\");\n    };\n    img.onerror = function() {\n        that._loaded = true;\n        that._defined = false;\n    };\n    img.src = getURL(md5, size, unknown);\n    this._url = img.src;\n};\n\nGravatar.prototype = Object.create(Widget.prototype);\nGravatar.prototype.constructor = Gravatar;\n\n/**\n * @return void\n */\nGravatar.prototype.isLoaded = function() {\n    return this._loaded;\n};\n\n/**\n * @return void\n */\nGravatar.prototype.isDefined = function() {\n    return this._defined;\n};\n\nGravatar.create = function(email, size, unknown) {\n    return new Gravatar(email, size, unknown);\n};\n\nGravatar.url = getURL;\n\nmodule.exports = Gravatar;\n });\n"],"names":["require","exports","module","Widget","Md5","getURL","md5","size","unknown","Gravatar","email","that","this","call","indexOf","addClass","_loaded","_defined","_url","css","width","height","img","Image","onload","backgroundImage","src","removeClass","onerror","prototype","Object","create","constructor","isLoaded","isDefined","url"],"mappings":"AAAAA,QAAS,eAAgB,SAASC,EAASC,GAE3C,GAAIC,GAASH,QAAQ,OACjBI,EAAMJ,QAAQ,OAgBdK,EAAS,SAASC,EAAKC,EAAMC,GAI7B,MAHoB,mBAATD,KAAsBA,EAAO,IACjB,mBAAZC,KAAyBA,EAAU,SAEvC,sCACDF,EAAM,MAAQC,EAAO,WAAaC,GAoBxCC,EAAW,SAASC,EAAOH,EAAMC,GACjC,GAAIG,GAAOC,IACXT,GAAOU,KAAKD,MACW,mBAAZJ,KAAyBA,EAAU,QAC9C,IAAIF,GAAMI,CACNA,GAAMI,QAAQ,KAAO,IACrBR,EAAMF,EAAIM,IAEdE,KAAKG,SAAS,eAAgB,QACV,gBAATR,KAAmBA,EAAO,IACrCK,KAAKI,SAAU,EACfJ,KAAKK,UAAW,EAChBL,KAAKM,KAAO,KACZN,KAAKO,KAAKC,MAAOb,EAAO,KAAMc,OAAQd,EAAO,MAC7C,IAAIe,GAAM,GAAIC,MACdD,GAAIE,OAAS,WACTb,EAAKQ,KAAKM,gBAAiB,OAASH,EAAII,IAAM,MAC9Cf,EAAKK,SAAU,EACfL,EAAKM,UAAW,EAChBN,EAAKgB,YAAY,SAErBL,EAAIM,QAAU,WACVjB,EAAKK,SAAU,EACfL,EAAKM,UAAW,GAEpBK,EAAII,IAAMrB,EAAOC,EAAKC,EAAMC,GAC5BI,KAAKM,KAAOI,EAAII,IAGpBjB,GAASoB,UAAYC,OAAOC,OAAO5B,EAAO0B,WAC1CpB,EAASoB,UAAUG,YAAcvB,EAKjCA,EAASoB,UAAUI,SAAW,WAC1B,MAAOrB,MAAKI,SAMhBP,EAASoB,UAAUK,UAAY,WAC3B,MAAOtB,MAAKK,UAGhBR,EAASsB,OAAS,SAASrB,EAAOH,EAAMC,GACpC,MAAO,IAAIC,GAASC,EAAOH,EAAMC,IAGrCC,EAAS0B,IAAM9B,EAEfH,EAAOD,QAAUQ"},"dependencies":["mod/wdg.gravatar","mod/wdg","mod/md5"]}