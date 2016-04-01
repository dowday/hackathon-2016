{"intl":"","src":"require( 'tp4.input', function(exports, module) {  var Widget = require(\"wdg\");\r\n\r\n/**\r\n * HTML5 text input with many options.\r\n *\r\n * @param {string} opts.value Initial value.\r\n * @param {string} opts.type Input's  type. Can be `text`, `password`,\r\n * `email`, ...\r\n * @param {string}  opts.name The name can  be used by the  browser to\r\n * give a help combo.\r\n * @param {string} opts.placeholder Text to display when input is empty.\r\n * @param  {function|regexp}  opts.validator  function  to  check  the\r\n * validity  of this  input. Takes  the  input value  as argument  and\r\n * returns a boolean. `onEnter` is not fired until input is valid. You\r\n * can use a RegExp instead of a function to check validity.\r\n * @param {function|object}  opts.onEnter function  to call  when user\r\n * hits  `enter` key.  `function(this)`. It  can be  an object  with a\r\n * function called `fire()`.\r\n * @param  {function|object}   opts.onValid  function  to   call  when\r\n * validator has been called. `function(validity, this)`. It can be an\r\n * object  with  a  function   `enabled({boolean})`.  For  instance  a\r\n * `tp4.Button`.\r\n *\r\n * @example\r\n * var Input = require(\"tp4.input\");\r\n * var opts = {\r\n *   placeholder: 'email address';\r\n *   validator: /[^@]+@([^@\\.]+\\.)*[^@\\.]+/,\r\n *   onEnter: function(wdg) {\r\n *     console.log(\"Enter has been hitten!\");\r\n *   },\r\n *   onValid: function(validity, wdg) {\r\n *     console.log(\"Validity: \", validity);\r\n *   }\r\n * }\r\n * var instance = new Input(opts);\r\n * @example\r\n * var I = require(\"tp4.input\").create;\r\n * var btnNext = B(_(\"next\")).Tap(\r\n *   function() {\r\n *     alert(\"Youpi!\");\r\n *   }\r\n * );\r\n * var login = I(\r\n *     {\r\n *         type: \"email\",\r\n *         name: \"email\",\r\n *         placeholder: _(\"email\"),\r\n *         validator: /^[^@]+@[^@]+$/,\r\n *         onEnter: btnNext,\r\n *         onValid: btnNext\r\n *     }\r\n * );\r\n\r\n * @class Input\r\n */\r\nvar Input = function(opts) {\r\n    Widget.call(this);\r\n    var input = Widget.tag(\"input\");\r\n    this._input = input;\r\n    var that = this;\r\n    this.addClass(\"tp4-input\");\r\n    if (typeof opts !== 'object') opts = {};\r\n    if (typeof opts.type !== 'string') opts.type = 'text';\r\n    input.attr(\"type\", opts.type);\r\n    if (typeof opts.size !== 'undefined') {\r\n        input.attr(\"size\", opts.size);\r\n        this.css(\"width\", (2 + opts.size) + \"em\");\r\n    }\r\n    if (typeof opts.placeholder === 'string') {\r\n        input.attr(\"placeholder\", opts.placeholder);\r\n    }\r\n    if (typeof opts.autofocus !== 'undefined') {\r\n        input.attr(\"autofocus\", 1);\r\n    }\r\n    if (typeof opts.width !== 'undefined') {\r\n        if (typeof opts.width === 'number') {\r\n            opts.width = \"\" + opts.width + \"em\";\r\n        }\r\n        this.css(\"width\", opts.width);\r\n    }\r\n    var onValid = opts.onValid;\r\n    if (typeof onValid === 'object' && typeof onValid.enabled === 'function') {\r\n        opts.onValid = function(v) {\r\n            onValid.enabled(v);\r\n        };\r\n    }\r\n    else if (typeof onValid !== 'function') opts.onValid = null;\r\n\r\n    if (typeof opts.validator === 'object') {\r\n        var rx = opts.validator;\r\n        opts.validator = function( v ) {\r\n            return rx.test( v );\r\n        };\r\n    }\r\n    else if (typeof opts.validator === 'function') {\r\n        var f = opts.validator;\r\n        opts.validator = function( v ) {\r\n            return f.call( that, v );\r\n        };\r\n    }\r\n    this._valid = 0;\r\n    input.addEvent(\r\n        \"keyup\",\r\n        function() {\r\n            that.validate();\r\n            that._onChange();\r\n        }\r\n    );\r\n    if (typeof opts.onEnter === 'object' && typeof opts.onEnter.fire === 'function') {\r\n        var onEnter = opts.onEnter;\r\n        opts.onEnter = function() {\r\n            onEnter.fire();\r\n        };\r\n    }\r\n    if (typeof opts.onEnter === 'function') {\r\n        input.addEvent(\r\n            \"keyup\",\r\n            function(evt) {\r\n                if (that._valid > -1 && evt.keyCode == 13) {\r\n                    // On  rend l'événement  asynchrone pour  éviter les\r\n                    // problèmes de clavier virtuel qui reste affiché.\r\n                    window.setTimeout(\r\n                        function() {\r\n                            opts.onEnter(that);\r\n                        }\r\n                    );\r\n                } else {\r\n                    that.validate();\r\n                }\r\n            }\r\n        );\r\n    }\r\n    if (typeof opts.value !== 'string') {\r\n        opts.value = \"\";\r\n    }\r\n    input.addEvent(\r\n        \"focus\",\r\n        function() {\r\n            that.selectAll();\r\n        }\r\n    );\r\n    this._opts = opts;\r\n    this.val(opts.value);\r\n\r\n    if (typeof opts.label !== 'undefined') {\r\n        var label = Widget.div(\"label\").text(opts.label).attr(\"title\", opts.label);\r\n        this.append(label);\r\n    }\r\n    this.append(input);\r\n};\r\n\r\n// Cette classe hérite de Widget\r\nInput.prototype = Object.create(Widget.prototype);\r\nInput.prototype.constructor = Input;\r\n\r\n/**\r\n * Force value validation.\r\n */\r\nInput.prototype.validate = function() {\r\n    var opts = this._opts;\r\n    if (typeof opts.validator !== 'function') return this;\r\n    var onValid = opts.onValid;\r\n    try {\r\n        if (opts.validator(this.val())) {\r\n            this._valid = 1;\r\n            this._input.removeClass(\"not-valid\").addClass(\"valid\");\r\n            if (onValid) onValid(true, this);\r\n        } else {\r\n            this._valid = -1;\r\n            this._input.removeClass(\"valid\").addClass(\"not-valid\");\r\n            if (onValid) onValid(false, this);\r\n        }\r\n    }\r\n    catch (ex) {\r\n        console.error(\"[tp4.input] Validation error: \", ex);\r\n    }\r\n    return this;\r\n};\r\n\r\n/**\r\n * @return void\r\n */\r\nInput.prototype.fireChange = function() {\r\n    this._onChange();\r\n    return this;\r\n};\r\n\r\n\r\n/**\r\n * @return void\r\n */\r\nInput.prototype._onChange = function() {\r\n    var slot = this._Change;\r\n    if (typeof slot === 'function') {\r\n        slot.call(this);\r\n    }\r\n};\r\n\r\n/**\r\n * Accessor for attribute Change.\r\n */\r\nInput.prototype.Change = function(slot) {\r\n    if (typeof slot === 'undefined') return this._Change;\r\n    if (typeof slot === 'function') {\r\n        this._Change = slot;\r\n    }\r\n    return this;\r\n};\r\n\r\n/**\r\n * Select whole text.\r\n * @return {this}\r\n */\r\nInput.prototype.selectAll = function() {\r\n    var e = this._input.element();\r\n    e.setSelectionRange(0, e.value.length);\r\n    return true;\r\n};\r\n\r\n/**\r\n * Accessor for textual content of this input.\r\n */\r\nInput.prototype.val = function(v) {\r\n    var e = this._input.element();\r\n    if (typeof v === 'undefined') return e.value;\r\n    e.value = v;\r\n    this.validate();\r\n    return this;\r\n};\r\n\r\n/**\r\n * @return void\r\n */\r\nInput.prototype.focus = function() {\r\n    var e = this._input.element();\r\n    window.setTimeout(\r\n        function() {\r\n            e.focus();\r\n        },\r\n        1\r\n    );\r\n    return this;\r\n};\r\n\r\n/**\r\n * @return void\r\n */\r\nInput.prototype.isValid = function() {\r\n    return this._valid == 1 ? true : false;\r\n};\r\n\r\n/**\r\n * @return void\r\n */\r\nInput.prototype.enabled = function(v) {\r\n    if (typeof v === 'undefined') {\r\n        return this._input.hasAttr(\"disabled\");\r\n    }\r\n    if (v) {\r\n        this._input.removeAttr(\"disabled\");\r\n    } else {\r\n        this._input.attr(\"disabled\", \"true\");\r\n    }\r\n    return this;\r\n};\r\n\r\nInput.create = function(opts) {\r\n    return new Input(opts);\r\n};\r\nmodule.exports = Input;\r\n });\r\n","zip":"require(\"tp4.input\",function(t,e){var i=require(\"wdg\"),n=function(t){i.call(this);var e=i.tag(\"input\");this._input=e;var n=this;this.addClass(\"tp4-input\"),\"object\"!=typeof t&&(t={}),\"string\"!=typeof t.type&&(t.type=\"text\"),e.attr(\"type\",t.type),\"undefined\"!=typeof t.size&&(e.attr(\"size\",t.size),this.css(\"width\",2+t.size+\"em\")),\"string\"==typeof t.placeholder&&e.attr(\"placeholder\",t.placeholder),\"undefined\"!=typeof t.autofocus&&e.attr(\"autofocus\",1),\"undefined\"!=typeof t.width&&(\"number\"==typeof t.width&&(t.width=\"\"+t.width+\"em\"),this.css(\"width\",t.width));var o=t.onValid;if(\"object\"==typeof o&&\"function\"==typeof o.enabled?t.onValid=function(t){o.enabled(t)}:\"function\"!=typeof o&&(t.onValid=null),\"object\"==typeof t.validator){var a=t.validator;t.validator=function(t){return a.test(t)}}else if(\"function\"==typeof t.validator){var r=t.validator;t.validator=function(t){return r.call(n,t)}}if(this._valid=0,e.addEvent(\"keyup\",function(){n.validate(),n._onChange()}),\"object\"==typeof t.onEnter&&\"function\"==typeof t.onEnter.fire){var u=t.onEnter;t.onEnter=function(){u.fire()}}if(\"function\"==typeof t.onEnter&&e.addEvent(\"keyup\",function(e){n._valid>-1&&13==e.keyCode?window.setTimeout(function(){t.onEnter(n)}):n.validate()}),\"string\"!=typeof t.value&&(t.value=\"\"),e.addEvent(\"focus\",function(){n.selectAll()}),this._opts=t,this.val(t.value),\"undefined\"!=typeof t.label){var l=i.div(\"label\").text(t.label).attr(\"title\",t.label);this.append(l)}this.append(e)};n.prototype=Object.create(i.prototype),n.prototype.constructor=n,n.prototype.validate=function(){var t=this._opts;if(\"function\"!=typeof t.validator)return this;var e=t.onValid;try{t.validator(this.val())?(this._valid=1,this._input.removeClass(\"not-valid\").addClass(\"valid\"),e&&e(!0,this)):(this._valid=-1,this._input.removeClass(\"valid\").addClass(\"not-valid\"),e&&e(!1,this))}catch(i){console.error(\"[tp4.input] Validation error: \",i)}return this},n.prototype.fireChange=function(){return this._onChange(),this},n.prototype._onChange=function(){var t=this._Change;\"function\"==typeof t&&t.call(this)},n.prototype.Change=function(t){return\"undefined\"==typeof t?this._Change:(\"function\"==typeof t&&(this._Change=t),this)},n.prototype.selectAll=function(){var t=this._input.element();return t.setSelectionRange(0,t.value.length),!0},n.prototype.val=function(t){var e=this._input.element();return\"undefined\"==typeof t?e.value:(e.value=t,this.validate(),this)},n.prototype.focus=function(){var t=this._input.element();return window.setTimeout(function(){t.focus()},1),this},n.prototype.isValid=function(){return 1==this._valid?!0:!1},n.prototype.enabled=function(t){return\"undefined\"==typeof t?this._input.hasAttr(\"disabled\"):(t?this._input.removeAttr(\"disabled\"):this._input.attr(\"disabled\",\"true\"),this)},n.create=function(t){return new n(t)},e.exports=n});\n//# sourceMappingURL=tp4.input.js.map","map":{"version":3,"file":"tp4.input.js.map","sources":["tp4.input.js"],"sourcesContent":["require( 'tp4.input', function(exports, module) {  var Widget = require(\"wdg\");\r\n\r\n/**\r\n * HTML5 text input with many options.\r\n *\r\n * @param {string} opts.value Initial value.\r\n * @param {string} opts.type Input's  type. Can be `text`, `password`,\r\n * `email`, ...\r\n * @param {string}  opts.name The name can  be used by the  browser to\r\n * give a help combo.\r\n * @param {string} opts.placeholder Text to display when input is empty.\r\n * @param  {function|regexp}  opts.validator  function  to  check  the\r\n * validity  of this  input. Takes  the  input value  as argument  and\r\n * returns a boolean. `onEnter` is not fired until input is valid. You\r\n * can use a RegExp instead of a function to check validity.\r\n * @param {function|object}  opts.onEnter function  to call  when user\r\n * hits  `enter` key.  `function(this)`. It  can be  an object  with a\r\n * function called `fire()`.\r\n * @param  {function|object}   opts.onValid  function  to   call  when\r\n * validator has been called. `function(validity, this)`. It can be an\r\n * object  with  a  function   `enabled({boolean})`.  For  instance  a\r\n * `tp4.Button`.\r\n *\r\n * @example\r\n * var Input = require(\"tp4.input\");\r\n * var opts = {\r\n *   placeholder: 'email address';\r\n *   validator: /[^@]+@([^@\\.]+\\.)*[^@\\.]+/,\r\n *   onEnter: function(wdg) {\r\n *     console.log(\"Enter has been hitten!\");\r\n *   },\r\n *   onValid: function(validity, wdg) {\r\n *     console.log(\"Validity: \", validity);\r\n *   }\r\n * }\r\n * var instance = new Input(opts);\r\n * @example\r\n * var I = require(\"tp4.input\").create;\r\n * var btnNext = B(_(\"next\")).Tap(\r\n *   function() {\r\n *     alert(\"Youpi!\");\r\n *   }\r\n * );\r\n * var login = I(\r\n *     {\r\n *         type: \"email\",\r\n *         name: \"email\",\r\n *         placeholder: _(\"email\"),\r\n *         validator: /^[^@]+@[^@]+$/,\r\n *         onEnter: btnNext,\r\n *         onValid: btnNext\r\n *     }\r\n * );\r\n\r\n * @class Input\r\n */\r\nvar Input = function(opts) {\r\n    Widget.call(this);\r\n    var input = Widget.tag(\"input\");\r\n    this._input = input;\r\n    var that = this;\r\n    this.addClass(\"tp4-input\");\r\n    if (typeof opts !== 'object') opts = {};\r\n    if (typeof opts.type !== 'string') opts.type = 'text';\r\n    input.attr(\"type\", opts.type);\r\n    if (typeof opts.size !== 'undefined') {\r\n        input.attr(\"size\", opts.size);\r\n        this.css(\"width\", (2 + opts.size) + \"em\");\r\n    }\r\n    if (typeof opts.placeholder === 'string') {\r\n        input.attr(\"placeholder\", opts.placeholder);\r\n    }\r\n    if (typeof opts.autofocus !== 'undefined') {\r\n        input.attr(\"autofocus\", 1);\r\n    }\r\n    if (typeof opts.width !== 'undefined') {\r\n        if (typeof opts.width === 'number') {\r\n            opts.width = \"\" + opts.width + \"em\";\r\n        }\r\n        this.css(\"width\", opts.width);\r\n    }\r\n    var onValid = opts.onValid;\r\n    if (typeof onValid === 'object' && typeof onValid.enabled === 'function') {\r\n        opts.onValid = function(v) {\r\n            onValid.enabled(v);\r\n        };\r\n    }\r\n    else if (typeof onValid !== 'function') opts.onValid = null;\r\n\r\n    if (typeof opts.validator === 'object') {\r\n        var rx = opts.validator;\r\n        opts.validator = function( v ) {\r\n            return rx.test( v );\r\n        };\r\n    }\r\n    else if (typeof opts.validator === 'function') {\r\n        var f = opts.validator;\r\n        opts.validator = function( v ) {\r\n            return f.call( that, v );\r\n        };\r\n    }\r\n    this._valid = 0;\r\n    input.addEvent(\r\n        \"keyup\",\r\n        function() {\r\n            that.validate();\r\n            that._onChange();\r\n        }\r\n    );\r\n    if (typeof opts.onEnter === 'object' && typeof opts.onEnter.fire === 'function') {\r\n        var onEnter = opts.onEnter;\r\n        opts.onEnter = function() {\r\n            onEnter.fire();\r\n        };\r\n    }\r\n    if (typeof opts.onEnter === 'function') {\r\n        input.addEvent(\r\n            \"keyup\",\r\n            function(evt) {\r\n                if (that._valid > -1 && evt.keyCode == 13) {\r\n                    // On  rend l'événement  asynchrone pour  éviter les\r\n                    // problèmes de clavier virtuel qui reste affiché.\r\n                    window.setTimeout(\r\n                        function() {\r\n                            opts.onEnter(that);\r\n                        }\r\n                    );\r\n                } else {\r\n                    that.validate();\r\n                }\r\n            }\r\n        );\r\n    }\r\n    if (typeof opts.value !== 'string') {\r\n        opts.value = \"\";\r\n    }\r\n    input.addEvent(\r\n        \"focus\",\r\n        function() {\r\n            that.selectAll();\r\n        }\r\n    );\r\n    this._opts = opts;\r\n    this.val(opts.value);\r\n\r\n    if (typeof opts.label !== 'undefined') {\r\n        var label = Widget.div(\"label\").text(opts.label).attr(\"title\", opts.label);\r\n        this.append(label);\r\n    }\r\n    this.append(input);\r\n};\r\n\r\n// Cette classe hérite de Widget\r\nInput.prototype = Object.create(Widget.prototype);\r\nInput.prototype.constructor = Input;\r\n\r\n/**\r\n * Force value validation.\r\n */\r\nInput.prototype.validate = function() {\r\n    var opts = this._opts;\r\n    if (typeof opts.validator !== 'function') return this;\r\n    var onValid = opts.onValid;\r\n    try {\r\n        if (opts.validator(this.val())) {\r\n            this._valid = 1;\r\n            this._input.removeClass(\"not-valid\").addClass(\"valid\");\r\n            if (onValid) onValid(true, this);\r\n        } else {\r\n            this._valid = -1;\r\n            this._input.removeClass(\"valid\").addClass(\"not-valid\");\r\n            if (onValid) onValid(false, this);\r\n        }\r\n    }\r\n    catch (ex) {\r\n        console.error(\"[tp4.input] Validation error: \", ex);\r\n    }\r\n    return this;\r\n};\r\n\r\n/**\r\n * @return void\r\n */\r\nInput.prototype.fireChange = function() {\r\n    this._onChange();\r\n    return this;\r\n};\r\n\r\n\r\n/**\r\n * @return void\r\n */\r\nInput.prototype._onChange = function() {\r\n    var slot = this._Change;\r\n    if (typeof slot === 'function') {\r\n        slot.call(this);\r\n    }\r\n};\r\n\r\n/**\r\n * Accessor for attribute Change.\r\n */\r\nInput.prototype.Change = function(slot) {\r\n    if (typeof slot === 'undefined') return this._Change;\r\n    if (typeof slot === 'function') {\r\n        this._Change = slot;\r\n    }\r\n    return this;\r\n};\r\n\r\n/**\r\n * Select whole text.\r\n * @return {this}\r\n */\r\nInput.prototype.selectAll = function() {\r\n    var e = this._input.element();\r\n    e.setSelectionRange(0, e.value.length);\r\n    return true;\r\n};\r\n\r\n/**\r\n * Accessor for textual content of this input.\r\n */\r\nInput.prototype.val = function(v) {\r\n    var e = this._input.element();\r\n    if (typeof v === 'undefined') return e.value;\r\n    e.value = v;\r\n    this.validate();\r\n    return this;\r\n};\r\n\r\n/**\r\n * @return void\r\n */\r\nInput.prototype.focus = function() {\r\n    var e = this._input.element();\r\n    window.setTimeout(\r\n        function() {\r\n            e.focus();\r\n        },\r\n        1\r\n    );\r\n    return this;\r\n};\r\n\r\n/**\r\n * @return void\r\n */\r\nInput.prototype.isValid = function() {\r\n    return this._valid == 1 ? true : false;\r\n};\r\n\r\n/**\r\n * @return void\r\n */\r\nInput.prototype.enabled = function(v) {\r\n    if (typeof v === 'undefined') {\r\n        return this._input.hasAttr(\"disabled\");\r\n    }\r\n    if (v) {\r\n        this._input.removeAttr(\"disabled\");\r\n    } else {\r\n        this._input.attr(\"disabled\", \"true\");\r\n    }\r\n    return this;\r\n};\r\n\r\nInput.create = function(opts) {\r\n    return new Input(opts);\r\n};\r\nmodule.exports = Input;\r\n });\r\n"],"names":["require","exports","module","Widget","Input","opts","call","this","input","tag","_input","that","addClass","type","attr","size","css","placeholder","autofocus","width","onValid","enabled","v","validator","rx","test","f","_valid","addEvent","validate","_onChange","onEnter","fire","evt","keyCode","window","setTimeout","value","selectAll","_opts","val","label","div","text","append","prototype","Object","create","constructor","removeClass","ex","console","error","fireChange","slot","_Change","Change","e","element","setSelectionRange","length","focus","isValid","hasAttr","removeAttr"],"mappings":"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"},"dependencies":["mod/tp4.input","mod/wdg"]}