require("input-boolean",function(e,a){var t=require("dom"),s=require("data");a.exports=function(e){var a=t.div("boolean",[e.text]);return s.get(e.data)&&t.addClass(a,"yes"),t.on(a,function(){s.get(e.data)?(t.removeClass(a,"yes"),s.set(e.data,0)):(t.addClass(a,"yes"),s.set(e.data,1)),s.save}),a}});
//# sourceMappingURL=input-boolean.js.map