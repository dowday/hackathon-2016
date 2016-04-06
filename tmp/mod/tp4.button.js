{"intl":"var _intl_={\"en\":{\"cancel\":\"Cancel\",\"close\":\"Close\",\"delete\":\"Delete\",\"edit\":\"Edit\",\"no\":\"No\",\"ok\":\"OK\",\"save\":\"Save\",\"yes\":\"Yes\"},\"fr\":{\"cancel\":\"Annuler\",\"close\":\"Fermer\",\"delete\":\"Supprimer\",\"edit\":\"Editer\",\"no\":\"Non\",\"ok\":\"Valider\",\"save\":\"Sauver\",\"yes\":\"Oui\"}},_$=require(\"$\").intl;function _(){return _$(_intl_, arguments);}\n","src":"require( 'tp4.button', function(exports, module) { var _intl_={\"en\":{\"cancel\":\"Cancel\",\"close\":\"Close\",\"delete\":\"Delete\",\"edit\":\"Edit\",\"no\":\"No\",\"ok\":\"OK\",\"save\":\"Save\",\"yes\":\"Yes\"},\"fr\":{\"cancel\":\"Annuler\",\"close\":\"Fermer\",\"delete\":\"Supprimer\",\"edit\":\"Editer\",\"no\":\"Non\",\"ok\":\"Valider\",\"save\":\"Sauver\",\"yes\":\"Oui\"}},_$=require(\"$\").intl;function _(){return _$(_intl_, arguments);}\n var Widget = require(\"wdg\");\nvar W = require(\"tp4.wait\").create;\n\n\n/**\n * Liste des classes CSS applicables sur un bouton :\n * * __simple__ : Simple lien, sans l'aspect \"bouton\".\n * * __shadow__ : Bouton légèrement plus foncé.\n * * __warning__ : Bouton orangé pour indiquer une action potentiellement dangeureuse.\n * * __small__ : Bouton de petite taille (environ 70%).\n *\n * @param {object} opts\n * * {string} `caption`: Text à afficher dans le bouton.\n * * {string} `href`: Si défini, lien vers lequel dirigier la page en cas de click.\n * * {boolean} `enabled`: Mettre `false` pour désactiver le bouton.\n * * {boolean} `simple`: Si `true`, le bouton ressemble à un simple lien.\n * * {string} `help`: Si défini, un click sur le bouton emmène vers la page d'aide dans l'onglet `HELP`.\n * * {object} `email`: Associe le _Tap_ à l'envoi d'un mail.\n *   * {string} `to`: destinataire.\n *   * {string} `subject`: sujet du mail.\n *   * {string} `body`: corps du mail.\n *\n * @example\n * var Button = require(\"tp4.button\");\n * var instance = new Button();\n * @class Button\n */\nvar Button = function(opts) {\n    var that = this;\n    Widget.call(this, {tag: \"a\"});\n    this.addClass(\"tp4-button\").attr('href', '#');\n    \n    var t = typeof opts;\n    if (t === 'string') opts = {caption: opts};\n    else if (t !== 'object') opts = {};\n    if (typeof opts.caption === 'undefined') opts.caption = \"OK\";\n    if (opts.simple) {\n        this.addClass(\"simple\");\n    }\n    if (typeof opts.enabled === 'undefined') opts.enabled = true;\n    if (typeof opts.email === 'string') {\n        opts.email = {to: opts.email};\n    }\n    if (typeof opts.email === 'object') {\n        if (typeof opts.email.to !== 'string') {\n            opts.email.to = \"contact@trail-passion.net\";\n        }\n        if (typeof opts.email.subject !== 'string') {\n            opts.email.subject = \"Trail-Passion\";\n        }\n        if (typeof opts.email.body !== 'string') {\n            opts.email.body = \"\";\n        }\n        var href =\n                \"mailto:\" + opts.email.to\n                + \"?subject=\" + encodeURIComponent(opts.email.subject)\n                + \"&body=\" + encodeURIComponent(opts.email.body);\n        console.info(\"[tp4.button] href=...\", href);\n        opts.href = href;\n    }\n    if (typeof opts.href === 'string') {\n        that.attr(\"href\", opts.href);\n    }\n    if (typeof opts.target === 'string') {\n        that.attr(\"target\", opts.target);\n    }\n    this.enabled(opts.enabled);\n    if (typeof opts.help === 'string') {\n        this.Tap(\n            function() {\n                open(\"http://help.trail-passion.net/\" + opts.help, \"HELP\");\n            }\n        );\n    }\n\n    this.caption(opts.caption);\n\n    // Animate the pressing.\n    this.addEvent(\"mousedown\", function() {\n        that.addClass('press');\n    });\n    this.addEvent(\"mouseup\", function() {\n        that.removeClass('press');\n    });\n\n    this.element().addEventListener('keydown', function(evt) {\n        if (evt.keyCode == 13 || evt.keyCode == 32) {\n            evt.preventDefault();        \n            evt.stopPropagation();\n            that.fire();\n        }\n    }, false);\n};\n\nButton.prototype = Object.create(Widget.prototype);\nButton.prototype.constructor = Button;\n\n/**\n * @return void\n */\nButton.prototype.enabled = function(v) {\n    if (typeof v === 'undefined') return this._enabled;\n    if (v) {\n        this.removeAttr(\"disabled\");\n    } else {\n        this.attr(\"disabled\", \"yes\");\n    }\n    this._enabled = v;\n    return this;\n};\n\n/**\n * @return void\n */\nButton.prototype.Tap = function(slot, sender) {\n    if (typeof slot === 'undefined') return Widget.prototype.Tap.call(this);\n    var that = this;\n    if (typeof sender === 'undefined') sender = that;\n    if (typeof slot === 'string') slot = sender[slot];\n    var f = function() {\n        if (that._enabled) {\n            slot.call(sender, this);\n        }\n    };\n    Widget.prototype.Tap.call(this, f);\n    return this;\n};\n\n/**\n * @return void\n */\nButton.prototype.caption = function(v) {\n    if (typeof v === 'undefined') return this._caption;\n    this._caption = v;\n    this.attr('title', v).text(v);\n    return this;\n};\n\n/**\n * Disable the button and start a wait animation.\n */\nButton.prototype.waitOn = function(text) {\n    if (typeof text === 'undefined') text = this.caption();\n    this.enabled(false);\n    this.clear(W({size: '1em', caption: text}));\n};\n\n/**\n * Stop the wait animation and enable the button again.\n */\nButton.prototype.waitOff = function() {\n    this.caption(this.caption());\n    this.enabled(true);\n};\n\n\n/**\n * Simuler un click sur ce bouton.\n */\nButton.prototype.fire = function() {\n    var tap = this.Tap();\n    if (!Array.isArray(tap)) return this;\n    tap[0].call(tap[1], this);\n    return this;\n};\n\nButton.create = function(opts) {\n    return new Button(opts);\n};\nButton.createSimple = function(caption) {\n    return new Button({caption: caption, simple: true});\n};\n\nfunction genericButton( id, classes, defaults ) {\n    var btn = new Button({ caption: _(id) });\n    if ( classes.length > 0 ) {\n    var i, cls;\n    for (i = 0 ; i < classes.length ; i++) {\n        cls = classes[i];\n        btn.addClass( cls );\n    }\n    } else {\n        if (typeof defaults === 'undefined') return btn;\n        if (!Array.isArray(defaults)) {\n            defaults = [defaults];\n        }\n        defaults.forEach(function (cls) {\n            btn.addClass( cls );\n        });\n    }\n    return btn;\n}\n\nButton.Cancel = function() { return genericButton('cancel', arguments); };\nButton.Close = function() { return genericButton('close', arguments, 'simple'); };\nButton.Delete = function() { return genericButton('delete', arguments, 'warning'); };\nButton.No = function() { return genericButton('no', arguments); };\nButton.Ok = function() { return genericButton('ok', arguments); };\nButton.Edit = function() { return genericButton('edit', arguments); };\nButton.Save = function() { return genericButton('save', arguments, 'warning'); };\nButton.Yes = function() { return genericButton('yes', arguments); };\n\nmodule.exports = Button;\n });\n","zip":"require(\"tp4.button\",function(e,t){function n(){return r(o,arguments)}function i(e,t,i){var o=new p({caption:n(e)});if(t.length>0){var r,a;for(r=0;r<t.length;r++)a=t[r],o.addClass(a)}else{if(\"undefined\"==typeof i)return o;Array.isArray(i)||(i=[i]),i.forEach(function(e){o.addClass(e)})}return o}var o={en:{cancel:\"Cancel\",close:\"Close\",\"delete\":\"Delete\",edit:\"Edit\",no:\"No\",ok:\"OK\",save:\"Save\",yes:\"Yes\"},fr:{cancel:\"Annuler\",close:\"Fermer\",\"delete\":\"Supprimer\",edit:\"Editer\",no:\"Non\",ok:\"Valider\",save:\"Sauver\",yes:\"Oui\"}},r=require(\"$\").intl,a=require(\"wdg\"),s=require(\"tp4.wait\").create,p=function(e){var t=this;a.call(this,{tag:\"a\"}),this.addClass(\"tp4-button\").attr(\"href\",\"#\");var n=typeof e;if(\"string\"===n?e={caption:e}:\"object\"!==n&&(e={}),\"undefined\"==typeof e.caption&&(e.caption=\"OK\"),e.simple&&this.addClass(\"simple\"),\"undefined\"==typeof e.enabled&&(e.enabled=!0),\"string\"==typeof e.email&&(e.email={to:e.email}),\"object\"==typeof e.email){\"string\"!=typeof e.email.to&&(e.email.to=\"contact@trail-passion.net\"),\"string\"!=typeof e.email.subject&&(e.email.subject=\"Trail-Passion\"),\"string\"!=typeof e.email.body&&(e.email.body=\"\");var i=\"mailto:\"+e.email.to+\"?subject=\"+encodeURIComponent(e.email.subject)+\"&body=\"+encodeURIComponent(e.email.body);console.info(\"[tp4.button] href=...\",i),e.href=i}\"string\"==typeof e.href&&t.attr(\"href\",e.href),\"string\"==typeof e.target&&t.attr(\"target\",e.target),this.enabled(e.enabled),\"string\"==typeof e.help&&this.Tap(function(){open(\"http://help.trail-passion.net/\"+e.help,\"HELP\")}),this.caption(e.caption),this.addEvent(\"mousedown\",function(){t.addClass(\"press\")}),this.addEvent(\"mouseup\",function(){t.removeClass(\"press\")}),this.element().addEventListener(\"keydown\",function(e){(13==e.keyCode||32==e.keyCode)&&(e.preventDefault(),e.stopPropagation(),t.fire())},!1)};p.prototype=Object.create(a.prototype),p.prototype.constructor=p,p.prototype.enabled=function(e){return\"undefined\"==typeof e?this._enabled:(e?this.removeAttr(\"disabled\"):this.attr(\"disabled\",\"yes\"),this._enabled=e,this)},p.prototype.Tap=function(e,t){if(\"undefined\"==typeof e)return a.prototype.Tap.call(this);var n=this;\"undefined\"==typeof t&&(t=n),\"string\"==typeof e&&(e=t[e]);var i=function(){n._enabled&&e.call(t,this)};return a.prototype.Tap.call(this,i),this},p.prototype.caption=function(e){return\"undefined\"==typeof e?this._caption:(this._caption=e,this.attr(\"title\",e).text(e),this)},p.prototype.waitOn=function(e){\"undefined\"==typeof e&&(e=this.caption()),this.enabled(!1),this.clear(s({size:\"1em\",caption:e}))},p.prototype.waitOff=function(){this.caption(this.caption()),this.enabled(!0)},p.prototype.fire=function(){var e=this.Tap();return Array.isArray(e)?(e[0].call(e[1],this),this):this},p.create=function(e){return new p(e)},p.createSimple=function(e){return new p({caption:e,simple:!0})},p.Cancel=function(){return i(\"cancel\",arguments)},p.Close=function(){return i(\"close\",arguments,\"simple\")},p.Delete=function(){return i(\"delete\",arguments,\"warning\")},p.No=function(){return i(\"no\",arguments)},p.Ok=function(){return i(\"ok\",arguments)},p.Edit=function(){return i(\"edit\",arguments)},p.Save=function(){return i(\"save\",arguments,\"warning\")},p.Yes=function(){return i(\"yes\",arguments)},t.exports=p});\n//# sourceMappingURL=tp4.button.js.map","map":{"version":3,"file":"tp4.button.js.map","sources":["tp4.button.js"],"sourcesContent":["require( 'tp4.button', function(exports, module) { var _intl_={\"en\":{\"cancel\":\"Cancel\",\"close\":\"Close\",\"delete\":\"Delete\",\"edit\":\"Edit\",\"no\":\"No\",\"ok\":\"OK\",\"save\":\"Save\",\"yes\":\"Yes\"},\"fr\":{\"cancel\":\"Annuler\",\"close\":\"Fermer\",\"delete\":\"Supprimer\",\"edit\":\"Editer\",\"no\":\"Non\",\"ok\":\"Valider\",\"save\":\"Sauver\",\"yes\":\"Oui\"}},_$=require(\"$\").intl;function _(){return _$(_intl_, arguments);}\n var Widget = require(\"wdg\");\nvar W = require(\"tp4.wait\").create;\n\n\n/**\n * Liste des classes CSS applicables sur un bouton :\n * * __simple__ : Simple lien, sans l'aspect \"bouton\".\n * * __shadow__ : Bouton légèrement plus foncé.\n * * __warning__ : Bouton orangé pour indiquer une action potentiellement dangeureuse.\n * * __small__ : Bouton de petite taille (environ 70%).\n *\n * @param {object} opts\n * * {string} `caption`: Text à afficher dans le bouton.\n * * {string} `href`: Si défini, lien vers lequel dirigier la page en cas de click.\n * * {boolean} `enabled`: Mettre `false` pour désactiver le bouton.\n * * {boolean} `simple`: Si `true`, le bouton ressemble à un simple lien.\n * * {string} `help`: Si défini, un click sur le bouton emmène vers la page d'aide dans l'onglet `HELP`.\n * * {object} `email`: Associe le _Tap_ à l'envoi d'un mail.\n *   * {string} `to`: destinataire.\n *   * {string} `subject`: sujet du mail.\n *   * {string} `body`: corps du mail.\n *\n * @example\n * var Button = require(\"tp4.button\");\n * var instance = new Button();\n * @class Button\n */\nvar Button = function(opts) {\n    var that = this;\n    Widget.call(this, {tag: \"a\"});\n    this.addClass(\"tp4-button\").attr('href', '#');\n    \n    var t = typeof opts;\n    if (t === 'string') opts = {caption: opts};\n    else if (t !== 'object') opts = {};\n    if (typeof opts.caption === 'undefined') opts.caption = \"OK\";\n    if (opts.simple) {\n        this.addClass(\"simple\");\n    }\n    if (typeof opts.enabled === 'undefined') opts.enabled = true;\n    if (typeof opts.email === 'string') {\n        opts.email = {to: opts.email};\n    }\n    if (typeof opts.email === 'object') {\n        if (typeof opts.email.to !== 'string') {\n            opts.email.to = \"contact@trail-passion.net\";\n        }\n        if (typeof opts.email.subject !== 'string') {\n            opts.email.subject = \"Trail-Passion\";\n        }\n        if (typeof opts.email.body !== 'string') {\n            opts.email.body = \"\";\n        }\n        var href =\n                \"mailto:\" + opts.email.to\n                + \"?subject=\" + encodeURIComponent(opts.email.subject)\n                + \"&body=\" + encodeURIComponent(opts.email.body);\n        console.info(\"[tp4.button] href=...\", href);\n        opts.href = href;\n    }\n    if (typeof opts.href === 'string') {\n        that.attr(\"href\", opts.href);\n    }\n    if (typeof opts.target === 'string') {\n        that.attr(\"target\", opts.target);\n    }\n    this.enabled(opts.enabled);\n    if (typeof opts.help === 'string') {\n        this.Tap(\n            function() {\n                open(\"http://help.trail-passion.net/\" + opts.help, \"HELP\");\n            }\n        );\n    }\n\n    this.caption(opts.caption);\n\n    // Animate the pressing.\n    this.addEvent(\"mousedown\", function() {\n        that.addClass('press');\n    });\n    this.addEvent(\"mouseup\", function() {\n        that.removeClass('press');\n    });\n\n    this.element().addEventListener('keydown', function(evt) {\n        if (evt.keyCode == 13 || evt.keyCode == 32) {\n            evt.preventDefault();        \n            evt.stopPropagation();\n            that.fire();\n        }\n    }, false);\n};\n\nButton.prototype = Object.create(Widget.prototype);\nButton.prototype.constructor = Button;\n\n/**\n * @return void\n */\nButton.prototype.enabled = function(v) {\n    if (typeof v === 'undefined') return this._enabled;\n    if (v) {\n        this.removeAttr(\"disabled\");\n    } else {\n        this.attr(\"disabled\", \"yes\");\n    }\n    this._enabled = v;\n    return this;\n};\n\n/**\n * @return void\n */\nButton.prototype.Tap = function(slot, sender) {\n    if (typeof slot === 'undefined') return Widget.prototype.Tap.call(this);\n    var that = this;\n    if (typeof sender === 'undefined') sender = that;\n    if (typeof slot === 'string') slot = sender[slot];\n    var f = function() {\n        if (that._enabled) {\n            slot.call(sender, this);\n        }\n    };\n    Widget.prototype.Tap.call(this, f);\n    return this;\n};\n\n/**\n * @return void\n */\nButton.prototype.caption = function(v) {\n    if (typeof v === 'undefined') return this._caption;\n    this._caption = v;\n    this.attr('title', v).text(v);\n    return this;\n};\n\n/**\n * Disable the button and start a wait animation.\n */\nButton.prototype.waitOn = function(text) {\n    if (typeof text === 'undefined') text = this.caption();\n    this.enabled(false);\n    this.clear(W({size: '1em', caption: text}));\n};\n\n/**\n * Stop the wait animation and enable the button again.\n */\nButton.prototype.waitOff = function() {\n    this.caption(this.caption());\n    this.enabled(true);\n};\n\n\n/**\n * Simuler un click sur ce bouton.\n */\nButton.prototype.fire = function() {\n    var tap = this.Tap();\n    if (!Array.isArray(tap)) return this;\n    tap[0].call(tap[1], this);\n    return this;\n};\n\nButton.create = function(opts) {\n    return new Button(opts);\n};\nButton.createSimple = function(caption) {\n    return new Button({caption: caption, simple: true});\n};\n\nfunction genericButton( id, classes, defaults ) {\n    var btn = new Button({ caption: _(id) });\n    if ( classes.length > 0 ) {\n    var i, cls;\n    for (i = 0 ; i < classes.length ; i++) {\n        cls = classes[i];\n        btn.addClass( cls );\n    }\n    } else {\n        if (typeof defaults === 'undefined') return btn;\n        if (!Array.isArray(defaults)) {\n            defaults = [defaults];\n        }\n        defaults.forEach(function (cls) {\n            btn.addClass( cls );\n        });\n    }\n    return btn;\n}\n\nButton.Cancel = function() { return genericButton('cancel', arguments); };\nButton.Close = function() { return genericButton('close', arguments, 'simple'); };\nButton.Delete = function() { return genericButton('delete', arguments, 'warning'); };\nButton.No = function() { return genericButton('no', arguments); };\nButton.Ok = function() { return genericButton('ok', arguments); };\nButton.Edit = function() { return genericButton('edit', arguments); };\nButton.Save = function() { return genericButton('save', arguments, 'warning'); };\nButton.Yes = function() { return genericButton('yes', arguments); };\n\nmodule.exports = Button;\n });\n"],"names":["require","exports","module","_","_$","_intl_","arguments","genericButton","id","classes","defaults","btn","Button","caption","length","i","cls","addClass","Array","isArray","forEach","en","cancel","close","delete","edit","no","ok","save","yes","fr","intl","Widget","W","create","opts","that","this","call","tag","attr","t","simple","enabled","email","to","subject","body","href","encodeURIComponent","console","info","target","help","Tap","open","addEvent","removeClass","element","addEventListener","evt","keyCode","preventDefault","stopPropagation","fire","prototype","Object","constructor","v","_enabled","removeAttr","slot","sender","f","_caption","text","waitOn","clear","size","waitOff","tap","createSimple","Cancel","Close","Delete","No","Ok","Edit","Save","Yes"],"mappings":"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"},"dependencies":["mod/tp4.button","mod/$","mod/wdg","mod/tp4.wait"]}