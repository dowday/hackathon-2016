require("app",function(e,o){function r(e){i.clear(l.demo,p(e))}function a(e){var o=p(e);i.addClass(o,"app","hide"),i.clear(l.appBody,o),window.setTimeout(function(){i.removeClass(o,"hide")})}function n(e){var o=p(e);i.addClass(o,"msg","hide"),i.clear(l.appBody,o),window.setTimeout(function(){i.removeClass(o,"hide")})}function t(e,o,r,a){var n=s.get("arg0")||"";if(n=(""+n).trim().split(":"),n.length>1){n.pop();var t,i,c,p;for(t=n.length;t>0;t--)if(c=n.slice(0,t).join(":"),c.length>0&&(c+=":"),p=d[c+e])return i="#"+c+e,"undefined"!=typeof o&&(i+="/"+o,"undefined"!=typeof r&&(i+="/"+r,"undefined"!=typeof a&&(i+="/"+a))),void(location.hash=i)}return p=d[e],p||(location.hash="#main"),p}var i=require("dom"),s=require("data"),c=require("tfw.hash-watcher"),d=require("actions"),p=require("app.perform-actions"),l={demo:i.get("#DEMO"),app:i.get("#APP"),appBody:i.get("#APP-BODY")};c(function(e,o,c,p){if("refresh"==e)return void(location.hash=o);var l=t(e,o,c,p);if(l){if(s.set("arg0",e),s.set("arg1",o),s.set("arg2",c),s.set("arg3",p),console.log("----------------------------------------"),console.info("[app] actionID=...",e,s.get("arg0")),s.log(),"undefined"==typeof l)return console.error('Unknown action: "'+e+'"'),console.error(Object.keys(d)),void(location.hash="#main");var f=l[0].trim().toLowerCase(),u=l[1];document.body.className=f;try{switch(f){case"story":r(u);break;case"demo":r(u);break;case"app":a(u);break;case"msg":n(u)}}catch(h){console.error("Error in "+f.toUpperCase()+":",u),console.error("Action:",l),alert("There is an error!")}i.get("#HEADER").innerHTML=s.parse("Open Hackathon 2016 - Team 3 - <b>{{$today|datetime}}</b>"),s.log(),s.save()}})});
//# sourceMappingURL=app.js.map