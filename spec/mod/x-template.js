require("x-template",function(e,t){var r={};e.register=function(e,t){r[e]=t},e.appendTo=function(e,t){var n=r[e];if("undefined"==typeof n)throw Error("[x-template.create] Template not found: "+e+"!");if("function"!=typeof n)throw Error("[x-template.create] Template is not a function: "+e+"!");return n(t)}});
//# sourceMappingURL=x-template.js.map