require("tfw.web-service",function(e,n){function t(n,t,r){return console.info("[tfw.web-service]",n,t),new Promise(function(o,i){"undefined"==typeof r&&(r=s.url);var u=new XMLHttpRequest({mozSystem:!0});"withCredentials"in u?(u.open("POST",r+"/svc.php",!0),u.withCredentials=!0):(u=new XDomainRequest,u.open("POST",r+"/svc.php")),u.onload=function(){200!=u.status&&i({id:e.HTTP_ERROR,msg:"("+u.status+") "+u.statusText,status:u.status});var t=u.responseText;if("string"==typeof t){"!"==t.substr(0,1)&&i({id:e.BAD_ROLE,msg:Error('Service "'+n+'" needs role "'+t.substr(1)+'"!')});var r;try{r=JSON.parse(t)}catch(s){i({id:e.BAD_TYPE,msg:Error('Service "'+n+'" should return a valid JSON!\n'+s)})}o(r)}else i({id:e.BAD_TYPE,msg:Error('Service "'+n+'" should return a string!')})},u.onerror=function(){i({id:e.HTTP_ERROR,msg:"("+u.status+") "+u.statusText,status:u.status})};var l="s="+encodeURIComponent(n)+"&i="+encodeURIComponent(JSON.stringify(t));u.setRequestHeader("Content-type","application/x-www-form-urlencoded"),u.send(l)})}require("tfw.promise");var r=require("tfw.storage"),o=require("tfw.listeners"),i=null,u=new o,s={url:"tfw"},l=r.local.get("nigolotua");Array.isArray(l)&&(s.usr=l[0],s.pwd=l[1]),e.BAD_ROLE=-1,e.BAD_TYPE=-2,e.CONNECTION_FAILURE=-3,e.MISSING_AUTOLOGIN=-4,e.UNKNOWN_USER=-5,e.HTTP_ERROR=-6,e.changeEvent=u,e.logout=function(){return i=null,u.fire(),r.local.set("nigolotua",null),t("tfw.login.Logout")},e.login=function(n,o){return"undefined"==typeof n&&(n=s.usr),"undefined"==typeof o&&(o=s.pwd),new Promise(function(s,l){if("undefined"==typeof n){var f=r.local.get("nigolotua");if(!Array.isArray(f))return l({id:e.MISSING_AUTOLOGIN});n=f[0],o=f[1]}r.local.set("nigolotua",null),t("tfw.login.Challenge",n).then(function(e){var n,r,i,u,s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],l=0,f=[];for(n=0;n<o.length;n++)f.push(o.charCodeAt(n));for(256%f.length==0&&f.push(0),n=0;256>n;n++)s[n%16]^=n+f[n%f.length],r=e[l++%e.length]%16,i=e[l++%e.length]%16,u=e[l++%e.length]%16,s[u]^=(s[u]+16*i+u)%256,s[i]^=(s[r]+s[u])%256;return t("tfw.login.Response",s)},l).then(function(t){"object"==typeof t?(i={data:t,hasRole:function(e){for(var n=0;n<t.roles.length;n++){var r=t.roles[n];if(r==e)return!0}return!1}},r.local.set("nigolotua",[n,o]),u.fire(),s(t)):(i=null,l({id:e.UNKNOWN_USER}))},l)})},e.get=function(n,r,o){return new Promise(function(i,u){t(n,r,o).then(i,function(s){"object"==typeof s&&s.id==e.BAD_ROLE?e.login().then(function(){t(n,r,o).then(i,u)},u):u(s)})})},e.user=function(){return i},e.config=function(e,n){return"undefined"==typeof n?s[e]:(s[e]=n,n)},window.$$&&(window.$$.service=function(n,t,r,o,i){var u=e.get(n,t);u.then(function(e){return o?r[o].call(r,e):e},function(e){return i?r[i].call(r,e):e})})});
//# sourceMappingURL=tfw.web-service.js.map