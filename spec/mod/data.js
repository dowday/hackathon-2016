require("data",function(t,e){var n=require("tfw.web-service");t.get=function(t){var e,n=APP.data||{},r=t.split(".");for(e=0;e<r.length;e++)if(n=n[r[e]],"undefined"==typeof n)return;if("object"==typeof n){var a,i=[];for(a in n)i.push(a);return i}return n},t.set=function(t,e){var n,r=APP.data||{},a=t.split(".");for(n=0;n<a.length-1;n++)"undefined"==typeof r[a[n]]&&(r[a[n]]={}),r=r[a[n]];r[a.pop()]=e},t.save=function(){var t=APP.data||{};t.id=APP.id,console.info("[data] data=...",t),n.get("registration",["set",t])}});
//# sourceMappingURL=data.js.map