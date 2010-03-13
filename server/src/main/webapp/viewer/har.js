/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

(function(){var _1=null;if((_1||(typeof djConfig!="undefined"&&djConfig.scopeMap))&&(typeof window!="undefined")){var _2="",_3="",_4="",_5={},_6={};_1=_1||djConfig.scopeMap;for(var i=0;i<_1.length;i++){var _8=_1[i];_2+="var "+_8[0]+" = {}; "+_8[1]+" = "+_8[0]+";"+_8[1]+"._scopeName = '"+_8[1]+"';";_3+=(i==0?"":",")+_8[0];_4+=(i==0?"":",")+_8[1];_5[_8[0]]=_8[1];_6[_8[1]]=_8[0];}eval(_2+"dojo._scopeArgs = ["+_4+"];");dojo._scopePrefixArgs=_3;dojo._scopePrefix="(function("+_3+"){";dojo._scopeSuffix="})("+_4+")";dojo._scopeMap=_5;dojo._scopeMapRev=_6;}(function(){if(typeof this["loadFirebugConsole"]=="function"){this["loadFirebugConsole"]();}else{this.console=this.console||{};var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];var i=0,tn;while((tn=cn[i++])){if(!console[tn]){(function(){var _c=tn+"";console[_c]=("log" in console)?function(){var a=Array.apply({},arguments);a.unshift(_c+":");console["log"](a.join(" "));}:function(){};})();}}}if(typeof dojo=="undefined"){this.dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};}var d=dojo;if(typeof dijit=="undefined"){this.dijit={_scopeName:"dijit"};}if(typeof dojox=="undefined"){this.dojox={_scopeName:"dojox"};}if(!d._scopeArgs){d._scopeArgs=[dojo,dijit,dojox];}d.global=this;d.config={isDebug:false,debugAtAllCosts:false};if(typeof djConfig!="undefined"){for(var _f in djConfig){d.config[_f]=djConfig[_f];}}dojo.locale=d.config.locale;var rev="$Rev: 17468 $".match(/\d+/);dojo.version={major:0,minor:0,patch:0,flag:"dev",revision:rev?+rev[0]:NaN,toString:function(){with(d.version){return major+"."+minor+"."+patch+flag+" ("+revision+")";}}};if(typeof OpenAjax!="undefined"){OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());}var _11={};dojo._mixin=function(obj,_13){for(var x in _13){if(_11[x]===undefined||_11[x]!=_13[x]){obj[x]=_13[x];}}if(d.isIE&&_13){var p=_13.toString;if(typeof p=="function"&&p!=obj.toString&&p!=_11.toString&&p!="\nfunction toString() {\n    [native code]\n}\n"){obj.toString=_13.toString;}}return obj;};dojo.mixin=function(obj,_17){if(!obj){obj={};}for(var i=1,l=arguments.length;i<l;i++){d._mixin(obj,arguments[i]);}return obj;};dojo._getProp=function(_1a,_1b,_1c){var obj=_1c||d.global;for(var i=0,p;obj&&(p=_1a[i]);i++){if(i==0&&this._scopeMap[p]){p=this._scopeMap[p];}obj=(p in obj?obj[p]:(_1b?obj[p]={}:undefined));}return obj;};dojo.setObject=function(_20,_21,_22){var _23=_20.split("."),p=_23.pop(),obj=d._getProp(_23,true,_22);return obj&&p?(obj[p]=_21):undefined;};dojo.getObject=function(_26,_27,_28){return d._getProp(_26.split("."),_27,_28);};dojo.exists=function(_29,obj){return !!d.getObject(_29,false,obj);};dojo["eval"]=function(_2b){return d.global.eval?d.global.eval(_2b):eval(_2b);};d.deprecated=d.experimental=function(){};})();(function(){var d=dojo;d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(_2d){var mp=this._modulePrefixes;return !!(mp[_2d]&&mp[_2d].value);},_getModulePrefix:function(_2f){var mp=this._modulePrefixes;if(this._moduleHasPrefix(_2f)){return mp[_2f].value;}return _2f;},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});dojo._loadPath=function(_31,_32,cb){var uri=((_31.charAt(0)=="/"||_31.match(/^\w+:/))?"":this.baseUrl)+_31;try{return !_32?this._loadUri(uri,cb):this._loadUriAndCheck(uri,_32,cb);}catch(e){console.error(e);return false;}};dojo._loadUri=function(uri,cb){if(this._loadedUrls[uri]){return true;}var _37=this._getText(uri,true);if(!_37){return false;}this._loadedUrls[uri]=true;this._loadedUrls.push(uri);if(cb){_37="("+_37+")";}else{_37=this._scopePrefix+_37+this._scopeSuffix;}if(d.isMoz){_37+="\r\n//@ sourceURL="+uri;}var _38=d["eval"](_37);if(cb){cb(_38);}return true;};dojo._loadUriAndCheck=function(uri,_3a,cb){var ok=false;try{ok=this._loadUri(uri,cb);}catch(e){console.error("failed loading "+uri+" with error: "+e);}return !!(ok&&this._loadedModules[_3a]);};dojo.loaded=function(){this._loadNotifying=true;this._postLoad=true;var mll=d._loaders;this._loaders=[];for(var x=0;x<mll.length;x++){mll[x]();}this._loadNotifying=false;if(d._postLoad&&d._inFlightCount==0&&mll.length){d._callLoaded();}};dojo.unloaded=function(){var mll=d._unloaders;while(mll.length){(mll.pop())();}};d._onto=function(arr,obj,fn){if(!fn){arr.push(obj);}else{if(fn){var _43=(typeof fn=="string")?obj[fn]:fn;arr.push(function(){_43.call(obj);});}}};dojo.addOnLoad=function(obj,_45){d._onto(d._loaders,obj,_45);if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){d._callLoaded();}};var dca=d.config.addOnLoad;if(dca){d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);}dojo._modulesLoaded=function(){if(d._postLoad){return;}if(d._inFlightCount>0){console.warn("files still in flight!");return;}d._callLoaded();};dojo._callLoaded=function(){if(typeof setTimeout=="object"||(dojo.config.useXDomain&&d.isOpera)){if(dojo.isAIR){setTimeout(function(){dojo.loaded();},0);}else{setTimeout(dojo._scopeName+".loaded();",0);}}else{d.loaded();}};dojo._getModuleSymbols=function(_47){var _48=_47.split(".");for(var i=_48.length;i>0;i--){var _4a=_48.slice(0,i).join(".");if((i==1)&&!this._moduleHasPrefix(_4a)){_48[0]="../"+_48[0];}else{var _4b=this._getModulePrefix(_4a);if(_4b!=_4a){_48.splice(0,i,_4b);break;}}}return _48;};dojo._global_omit_module_check=false;dojo.loadInit=function(_4c){_4c();};dojo._loadModule=dojo.require=function(_4d,_4e){_4e=this._global_omit_module_check||_4e;var _4f=this._loadedModules[_4d];if(_4f){return _4f;}var _50=this._getModuleSymbols(_4d).join("/")+".js";var _51=(!_4e)?_4d:null;var ok=this._loadPath(_50,_51);if(!ok&&!_4e){throw new Error("Could not load '"+_4d+"'; last tried '"+_50+"'");}if(!_4e&&!this._isXDomain){_4f=this._loadedModules[_4d];if(!_4f){throw new Error("symbol '"+_4d+"' is not defined after loading '"+_50+"'");}}return _4f;};dojo.provide=function(_53){_53=_53+"";return (d._loadedModules[_53]=d.getObject(_53,true));};dojo.platformRequire=function(_54){var _55=_54.common||[];var _56=_55.concat(_54[d._name]||_54["default"]||[]);for(var x=0;x<_56.length;x++){var _58=_56[x];if(_58.constructor==Array){d._loadModule.apply(d,_58);}else{d._loadModule(_58);}}};dojo.requireIf=function(_59,_5a){if(_59===true){var _5b=[];for(var i=1;i<arguments.length;i++){_5b.push(arguments[i]);}d.require.apply(d,_5b);}};dojo.requireAfterIf=d.requireIf;dojo.registerModulePath=function(_5d,_5e){d._modulePrefixes[_5d]={name:_5d,value:_5e};};dojo.requireLocalization=function(_5f,_60,_61,_62){d.require("dojo.i18n");d.i18n._requireLocalization.apply(d.hostenv,arguments);};var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$");var ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");dojo._Url=function(){var n=null;var _a=arguments;var uri=[_a[0]];for(var i=1;i<_a.length;i++){if(!_a[i]){continue;}var _69=new d._Url(_a[i]+"");var _6a=new d._Url(uri[0]+"");if(_69.path==""&&!_69.scheme&&!_69.authority&&!_69.query){if(_69.fragment!=n){_6a.fragment=_69.fragment;}_69=_6a;}else{if(!_69.scheme){_69.scheme=_6a.scheme;if(!_69.authority){_69.authority=_6a.authority;if(_69.path.charAt(0)!="/"){var _6b=_6a.path.substring(0,_6a.path.lastIndexOf("/")+1)+_69.path;var _6c=_6b.split("/");for(var j=0;j<_6c.length;j++){if(_6c[j]=="."){if(j==_6c.length-1){_6c[j]="";}else{_6c.splice(j,1);j--;}}else{if(j>0&&!(j==1&&_6c[0]=="")&&_6c[j]==".."&&_6c[j-1]!=".."){if(j==(_6c.length-1)){_6c.splice(j,1);_6c[j-1]="";}else{_6c.splice(j-1,2);j-=2;}}}}_69.path=_6c.join("/");}}}}uri=[];if(_69.scheme){uri.push(_69.scheme,":");}if(_69.authority){uri.push("//",_69.authority);}uri.push(_69.path);if(_69.query){uri.push("?",_69.query);}if(_69.fragment){uri.push("#",_69.fragment);}}this.uri=uri.join("");var r=this.uri.match(ore);this.scheme=r[2]||(r[1]?"":n);this.authority=r[4]||(r[3]?"":n);this.path=r[5];this.query=r[7]||(r[6]?"":n);this.fragment=r[9]||(r[8]?"":n);if(this.authority!=n){r=this.authority.match(ire);this.user=r[3]||n;this.password=r[4]||n;this.host=r[6]||r[7];this.port=r[9]||n;}};dojo._Url.prototype.toString=function(){return this.uri;};dojo.moduleUrl=function(_6f,url){var loc=d._getModuleSymbols(_6f).join("/");if(!loc){return null;}if(loc.lastIndexOf("/")!=loc.length-1){loc+="/";}var _72=loc.indexOf(":");if(loc.charAt(0)!="/"&&(_72==-1||_72>loc.indexOf("/"))){loc=d.baseUrl+loc;}return new d._Url(loc,url);};})();if(typeof window!="undefined"){dojo.isBrowser=true;dojo._name="browser";(function(){var d=dojo;if(document&&document.getElementsByTagName){var _74=document.getElementsByTagName("script");var _75=/dojo(\.xd)?\.js(\W|$)/i;for(var i=0;i<_74.length;i++){var src=_74[i].getAttribute("src");if(!src){continue;}var m=src.match(_75);if(m){if(!d.config.baseUrl){d.config.baseUrl=src.substring(0,m.index);}var cfg=_74[i].getAttribute("djConfig");if(cfg){var _7a=eval("({ "+cfg+" })");for(var x in _7a){dojo.config[x]=_7a[x];}}break;}}}d.baseUrl=d.config.baseUrl;var n=navigator;var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);if(dua.indexOf("Opera")>=0){d.isOpera=tv;}if(dua.indexOf("AdobeAIR")>=0){d.isAIR=1;}d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;var _80=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);if(_80&&!dojo.isChrome){d.isSafari=parseFloat(dav.split("Version/")[1]);if(!d.isSafari||parseFloat(dav.substr(_80+7))<=419.3){d.isSafari=2;}}if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){d.isMozilla=d.isMoz=tv;}if(d.isMoz){d.isFF=parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1]||dua.split("Shiretoko/")[1])||undefined;}if(document.all&&!d.isOpera){d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;if(d.isIE>=8&&document.documentMode!=5){d.isIE=document.documentMode;}}if(dojo.isIE&&window.location.protocol==="file:"){dojo.config.ieForceActiveXXhr=true;}var cm=document.compatMode;d.isQuirks=cm=="BackCompat"||cm=="QuirksMode"||d.isIE<6;d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();d._XMLHTTP_PROGIDS=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];d._xhrObj=function(){var _82,_83;if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){try{_82=new XMLHttpRequest();}catch(e){}}if(!_82){for(var i=0;i<3;++i){var _85=d._XMLHTTP_PROGIDS[i];try{_82=new ActiveXObject(_85);}catch(e){_83=e;}if(_82){d._XMLHTTP_PROGIDS=[_85];break;}}}if(!_82){throw new Error("XMLHTTP not available: "+_83);}return _82;};d._isDocumentOk=function(_86){var _87=_86.status||0;return (_87>=200&&_87<300)||_87==304||_87==1223||(!_87&&(location.protocol=="file:"||location.protocol=="chrome:"));};var _88=window.location+"";var _89=document.getElementsByTagName("base");var _8a=(_89&&_89.length>0);d._getText=function(uri,_8c){var _8d=this._xhrObj();if(!_8a&&dojo._Url){uri=(new dojo._Url(_88,uri)).toString();}if(d.config.cacheBust){uri+="";uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");}_8d.open("GET",uri,false);try{_8d.send(null);if(!d._isDocumentOk(_8d)){var err=Error("Unable to load "+uri+" status:"+_8d.status);err.status=_8d.status;err.responseText=_8d.responseText;throw err;}}catch(e){if(_8c){return null;}throw e;}return _8d.responseText;};var _w=window;var _90=function(_91,fp){var _93=_w[_91]||function(){};_w[_91]=function(){fp.apply(_w,arguments);_93.apply(_w,arguments);};};d._windowUnloaders=[];d.windowUnloaded=function(){var mll=d._windowUnloaders;while(mll.length){(mll.pop())();}};var _95=0;d.addOnWindowUnload=function(obj,_97){d._onto(d._windowUnloaders,obj,_97);if(!_95){_95=1;_90("onunload",d.windowUnloaded);}};var _98=0;d.addOnUnload=function(obj,_9a){d._onto(d._unloaders,obj,_9a);if(!_98){_98=1;_90("onbeforeunload",dojo.unloaded);}};})();dojo._initFired=false;dojo._loadInit=function(e){dojo._initFired=true;var _9c=e&&e.type?e.type.toLowerCase():"load";if(arguments.callee.initialized||(_9c!="domcontentloaded"&&_9c!="load")){return;}arguments.callee.initialized=true;if("_khtmlTimer" in dojo){clearInterval(dojo._khtmlTimer);delete dojo._khtmlTimer;}if(dojo._inFlightCount==0){dojo._modulesLoaded();}};if(!dojo.config.afterOnLoad){if(document.addEventListener){if(dojo.isWebKit>525||dojo.isOpera||dojo.isFF>=3||(dojo.isMoz&&dojo.config.enableMozDomContentLoaded===true)){document.addEventListener("DOMContentLoaded",dojo._loadInit,null);}window.addEventListener("load",dojo._loadInit,null);}if(dojo.isAIR){window.addEventListener("load",dojo._loadInit,null);}else{if((dojo.isWebKit<525)||dojo.isKhtml){dojo._khtmlTimer=setInterval(function(){if(/loaded|complete/.test(document.readyState)){dojo._loadInit();}},10);}}}if(dojo.isIE){if(!dojo.config.afterOnLoad){document.write("<scr"+"ipt defer src=\"//:\" "+"onreadystatechange=\"if(this.readyState=='complete'){"+dojo._scopeName+"._loadInit();}\">"+"</scr"+"ipt>");}try{document.namespaces.add("v","urn:schemas-microsoft-com:vml");document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML);  display:inline-block");}catch(e){}}}(function(){var mp=dojo.config["modulePaths"];if(mp){for(var _9e in mp){dojo.registerModulePath(_9e,mp[_9e]);}}})();if(dojo.config.isDebug){dojo.require("dojo._firebug.firebug");}if(dojo.config.debugAtAllCosts){dojo.config.useXDomain=true;dojo.require("dojo._base._loader.loader_xd");dojo.require("dojo._base._loader.loader_debug");dojo.require("dojo.i18n");}if(!dojo._hasResource["dojo._base.lang"]){dojo._hasResource["dojo._base.lang"]=true;dojo.provide("dojo._base.lang");dojo.isString=function(it){return !!arguments.length&&it!=null&&(typeof it=="string"||it instanceof String);};dojo.isArray=function(it){return it&&(it instanceof Array||typeof it=="array");};dojo.isFunction=(function(){var _a1=function(it){var t=typeof it;return it&&(t=="function"||it instanceof Function);};return dojo.isSafari?function(it){if(typeof it=="function"&&it=="[object NodeList]"){return false;}return _a1(it);}:_a1;})();dojo.isObject=function(it){return it!==undefined&&(it===null||typeof it=="object"||dojo.isArray(it)||dojo.isFunction(it));};dojo.isArrayLike=function(it){var d=dojo;return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=="form")&&(d.isArray(it)||isFinite(it.length));};dojo.isAlien=function(it){return it&&!dojo.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));};dojo.extend=function(_a9,_aa){for(var i=1,l=arguments.length;i<l;i++){dojo._mixin(_a9.prototype,arguments[i]);}return _a9;};dojo._hitchArgs=function(_ad,_ae){var pre=dojo._toArray(arguments,2);var _b0=dojo.isString(_ae);return function(){var _b1=dojo._toArray(arguments);var f=_b0?(_ad||dojo.global)[_ae]:_ae;return f&&f.apply(_ad||this,pre.concat(_b1));};};dojo.hitch=function(_b3,_b4){if(arguments.length>2){return dojo._hitchArgs.apply(dojo,arguments);}if(!_b4){_b4=_b3;_b3=null;}if(dojo.isString(_b4)){_b3=_b3||dojo.global;if(!_b3[_b4]){throw (["dojo.hitch: scope[\"",_b4,"\"] is null (scope=\"",_b3,"\")"].join(""));}return function(){return _b3[_b4].apply(_b3,arguments||[]);};}return !_b3?_b4:function(){return _b4.apply(_b3,arguments||[]);};};dojo.delegate=dojo._delegate=(function(){function TMP(){};return function(obj,_b7){TMP.prototype=obj;var tmp=new TMP();if(_b7){dojo._mixin(tmp,_b7);}return tmp;};})();(function(){var _b9=function(obj,_bb,_bc){return (_bc||[]).concat(Array.prototype.slice.call(obj,_bb||0));};var _bd=function(obj,_bf,_c0){var arr=_c0||[];for(var x=_bf||0;x<obj.length;x++){arr.push(obj[x]);}return arr;};dojo._toArray=dojo.isIE?function(obj){return ((obj.item)?_bd:_b9).apply(this,arguments);}:_b9;})();dojo.partial=function(_c4){var arr=[null];return dojo.hitch.apply(dojo,arr.concat(dojo._toArray(arguments)));};dojo.clone=function(o){if(!o){return o;}if(dojo.isArray(o)){var r=[];for(var i=0;i<o.length;++i){r.push(dojo.clone(o[i]));}return r;}if(!dojo.isObject(o)){return o;}if(o.nodeType&&o.cloneNode){return o.cloneNode(true);}if(o instanceof Date){return new Date(o.getTime());}r=new o.constructor();for(i in o){if(!(i in r)||r[i]!=o[i]){r[i]=dojo.clone(o[i]);}}return r;};dojo.trim=String.prototype.trim?function(str){return str.trim();}:function(str){return str.replace(/^\s\s*/,"").replace(/\s\s*$/,"");};}if(!dojo._hasResource["dojo._base.declare"]){dojo._hasResource["dojo._base.declare"]=true;dojo.provide("dojo._base.declare");dojo.declare=function(_cb,_cc,_cd){var dd=arguments.callee,_cf;if(dojo.isArray(_cc)){_cf=_cc;_cc=_cf.shift();}if(_cf){dojo.forEach(_cf,function(m,i){if(!m){throw (_cb+": mixin #"+i+" is null");}_cc=dd._delegate(_cc,m);});}var _d2=dd._delegate(_cc);_cd=_cd||{};_d2.extend(_cd);dojo.extend(_d2,{declaredClass:_cb,_constructor:_cd.constructor});_d2.prototype.constructor=_d2;return dojo.setObject(_cb,_d2);};dojo.mixin(dojo.declare,{_delegate:function(_d3,_d4){var bp=(_d3||0).prototype,mp=(_d4||0).prototype,dd=dojo.declare;var _d8=dd._makeCtor();dojo.mixin(_d8,{superclass:bp,mixin:mp,extend:dd._extend});if(_d3){_d8.prototype=dojo._delegate(bp);}dojo.extend(_d8,dd._core,mp||0,{_constructor:null,preamble:null});_d8.prototype.constructor=_d8;_d8.prototype.declaredClass=(bp||0).declaredClass+"_"+(mp||0).declaredClass;return _d8;},_extend:function(_d9){var i,fn;for(i in _d9){if(dojo.isFunction(fn=_d9[i])&&!0[i]){fn.nom=i;fn.ctor=this;}}dojo.extend(this,_d9);},_makeCtor:function(){return function(){this._construct(arguments);};},_core:{_construct:function(_dc){var c=_dc.callee,s=c.superclass,ct=s&&s.constructor,m=c.mixin,mct=m&&m.constructor,a=_dc,ii,fn;if(a[0]){if(((fn=a[0].preamble))){a=fn.apply(this,a)||a;}}if((fn=c.prototype.preamble)){a=fn.apply(this,a)||a;}if(ct&&ct.apply){ct.apply(this,a);}if(mct&&mct.apply){mct.apply(this,a);}if((ii=c.prototype._constructor)){ii.apply(this,_dc);}if(this.constructor.prototype==c.prototype&&(ct=this.postscript)){ct.apply(this,_dc);}},_findMixin:function(_e5){var c=this.constructor,p,m;while(c){p=c.superclass;m=c.mixin;if(m==_e5||(m instanceof _e5.constructor)){return p;}if(m&&m._findMixin&&(m=m._findMixin(_e5))){return m;}c=p&&p.constructor;}},_findMethod:function(_e9,_ea,_eb,has){var p=_eb,c,m,f;do{c=p.constructor;m=c.mixin;if(m&&(m=this._findMethod(_e9,_ea,m,has))){return m;}if((f=p[_e9])&&(has==(f==_ea))){return p;}p=c.superclass;}while(p);return !has&&(p=this._findMixin(_eb))&&this._findMethod(_e9,_ea,p,has);},inherited:function(_f1,_f2,_f3){var a=arguments;if(!dojo.isString(a[0])){_f3=_f2;_f2=_f1;_f1=_f2.callee.nom;}a=_f3||_f2;var c=_f2.callee,p=this.constructor.prototype,fn,mp;if(this[_f1]!=c||p[_f1]==c){mp=(c.ctor||0).superclass||this._findMethod(_f1,c,p,true);if(!mp){throw (this.declaredClass+": inherited method \""+_f1+"\" mismatch");}p=this._findMethod(_f1,c,mp,false);}fn=p&&p[_f1];if(!fn){throw (mp.declaredClass+": inherited method \""+_f1+"\" not found");}return fn.apply(this,a);}}});}if(!dojo._hasResource["dojo._base.connect"]){dojo._hasResource["dojo._base.connect"]=true;dojo.provide("dojo._base.connect");dojo._listener={getDispatcher:function(){return function(){var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;var r=t&&t.apply(this,arguments);var lls;lls=[].concat(ls);for(var i in lls){if(!(i in ap)){lls[i].apply(this,arguments);}}return r;};},add:function(_100,_101,_102){_100=_100||dojo.global;var f=_100[_101];if(!f||!f._listeners){var d=dojo._listener.getDispatcher();d.target=f;d._listeners=[];f=_100[_101]=d;}return f._listeners.push(_102);},remove:function(_105,_106,_107){var f=(_105||dojo.global)[_106];if(f&&f._listeners&&_107--){delete f._listeners[_107];}}};dojo.connect=function(obj,_10a,_10b,_10c,_10d){var a=arguments,args=[],i=0;args.push(dojo.isString(a[0])?null:a[i++],a[i++]);var a1=a[i+1];args.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);for(var l=a.length;i<l;i++){args.push(a[i]);}return dojo._connect.apply(this,args);};dojo._connect=function(obj,_113,_114,_115){var l=dojo._listener,h=l.add(obj,_113,dojo.hitch(_114,_115));return [obj,_113,h,l];};dojo.disconnect=function(_118){if(_118&&_118[0]!==undefined){dojo._disconnect.apply(this,_118);delete _118[0];}};dojo._disconnect=function(obj,_11a,_11b,_11c){_11c.remove(obj,_11a,_11b);};dojo._topics={};dojo.subscribe=function(_11d,_11e,_11f){return [_11d,dojo._listener.add(dojo._topics,_11d,dojo.hitch(_11e,_11f))];};dojo.unsubscribe=function(_120){if(_120){dojo._listener.remove(dojo._topics,_120[0],_120[1]);}};dojo.publish=function(_121,args){var f=dojo._topics[_121];if(f){f.apply(this,args||[]);}};dojo.connectPublisher=function(_124,obj,_126){var pf=function(){dojo.publish(_124,arguments);};return (_126)?dojo.connect(obj,_126,pf):dojo.connect(obj,pf);};}if(!dojo._hasResource["dojo._base.Deferred"]){dojo._hasResource["dojo._base.Deferred"]=true;dojo.provide("dojo._base.Deferred");dojo.Deferred=function(_128){this.chain=[];this.id=this._nextId();this.fired=-1;this.paused=0;this.results=[null,null];this.canceller=_128;this.silentlyCancelled=false;};dojo.extend(dojo.Deferred,{_nextId:(function(){var n=1;return function(){return n++;};})(),cancel:function(){var err;if(this.fired==-1){if(this.canceller){err=this.canceller(this);}else{this.silentlyCancelled=true;}if(this.fired==-1){if(!(err instanceof Error)){var res=err;var msg="Deferred Cancelled";if(err&&err.toString){msg+=": "+err.toString();}err=new Error(msg);err.dojoType="cancel";err.cancelResult=res;}this.errback(err);}}else{if((this.fired==0)&&(this.results[0] instanceof dojo.Deferred)){this.results[0].cancel();}}},_resback:function(res){this.fired=((res instanceof Error)?1:0);this.results[this.fired]=res;this._fire();},_check:function(){if(this.fired!=-1){if(!this.silentlyCancelled){throw new Error("already called!");}this.silentlyCancelled=false;return;}},callback:function(res){this._check();this._resback(res);},errback:function(res){this._check();if(!(res instanceof Error)){res=new Error(res);}this._resback(res);},addBoth:function(cb,cbfn){var _132=dojo.hitch.apply(dojo,arguments);return this.addCallbacks(_132,_132);},addCallback:function(cb,cbfn){return this.addCallbacks(dojo.hitch.apply(dojo,arguments));},addErrback:function(cb,cbfn){return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));},addCallbacks:function(cb,eb){this.chain.push([cb,eb]);if(this.fired>=0){this._fire();}return this;},_fire:function(){var _139=this.chain;var _13a=this.fired;var res=this.results[_13a];var self=this;var cb=null;while((_139.length>0)&&(this.paused==0)){var f=_139.shift()[_13a];if(!f){continue;}var func=function(){var ret=f(res);if(typeof ret!="undefined"){res=ret;}_13a=((res instanceof Error)?1:0);if(res instanceof dojo.Deferred){cb=function(res){self._resback(res);self.paused--;if((self.paused==0)&&(self.fired>=0)){self._fire();}};this.paused++;}};if(dojo.config.debugAtAllCosts){func.call(this);}else{try{func.call(this);}catch(err){_13a=1;res=err;}}}this.fired=_13a;this.results[_13a]=res;if((cb)&&(this.paused)){res.addBoth(cb);}}});}if(!dojo._hasResource["dojo._base.json"]){dojo._hasResource["dojo._base.json"]=true;dojo.provide("dojo._base.json");dojo.fromJson=function(json){return eval("("+json+")");};dojo._escapeString=function(str){return ("\""+str.replace(/(["\\])/g,"\\$1")+"\"").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");};dojo.toJsonIndentStr="\t";dojo.toJson=function(it,_145,_146){if(it===undefined){return "undefined";}var _147=typeof it;if(_147=="number"||_147=="boolean"){return it+"";}if(it===null){return "null";}if(dojo.isString(it)){return dojo._escapeString(it);}var _148=arguments.callee;var _149;_146=_146||"";var _14a=_145?_146+dojo.toJsonIndentStr:"";var tf=it.__json__||it.json;if(dojo.isFunction(tf)){_149=tf.call(it);if(it!==_149){return _148(_149,_145,_14a);}}if(it.nodeType&&it.cloneNode){throw new Error("Can't serialize DOM nodes");}var sep=_145?" ":"";var _14d=_145?"\n":"";if(dojo.isArray(it)){var res=dojo.map(it,function(obj){var val=_148(obj,_145,_14a);if(typeof val!="string"){val="undefined";}return _14d+_14a+val;});return "["+res.join(","+sep)+_14d+_146+"]";}if(_147=="function"){return null;}var _151=[],key;for(key in it){var _153,val;if(typeof key=="number"){_153="\""+key+"\"";}else{if(typeof key=="string"){_153=dojo._escapeString(key);}else{continue;}}val=_148(it[key],_145,_14a);if(typeof val!="string"){continue;}_151.push(_14d+_14a+_153+":"+sep+val);}return "{"+_151.join(","+sep)+_14d+_146+"}";};}if(!dojo._hasResource["dojo._base.array"]){dojo._hasResource["dojo._base.array"]=true;dojo.provide("dojo._base.array");(function(){var _155=function(arr,obj,cb){return [dojo.isString(arr)?arr.split(""):arr,obj||dojo.global,dojo.isString(cb)?new Function("item","index","array",cb):cb];};dojo.mixin(dojo,{indexOf:function(_159,_15a,_15b,_15c){var step=1,end=_159.length||0,i=0;if(_15c){i=end-1;step=end=-1;}if(_15b!=undefined){i=_15b;}if((_15c&&i>end)||i<end){for(;i!=end;i+=step){if(_159[i]==_15a){return i;}}}return -1;},lastIndexOf:function(_15f,_160,_161){return dojo.indexOf(_15f,_160,_161,true);},forEach:function(arr,_163,_164){if(!arr||!arr.length){return;}var _p=_155(arr,_164,_163);arr=_p[0];for(var i=0,l=arr.length;i<l;++i){_p[2].call(_p[1],arr[i],i,arr);}},_everyOrSome:function(_168,arr,_16a,_16b){var _p=_155(arr,_16b,_16a);arr=_p[0];for(var i=0,l=arr.length;i<l;++i){var _16f=!!_p[2].call(_p[1],arr[i],i,arr);if(_168^_16f){return _16f;}}return _168;},every:function(arr,_171,_172){return this._everyOrSome(true,arr,_171,_172);},some:function(arr,_174,_175){return this._everyOrSome(false,arr,_174,_175);},map:function(arr,_177,_178){var _p=_155(arr,_178,_177);arr=_p[0];var _17a=(arguments[3]?(new arguments[3]()):[]);for(var i=0,l=arr.length;i<l;++i){_17a.push(_p[2].call(_p[1],arr[i],i,arr));}return _17a;},filter:function(arr,_17e,_17f){var _p=_155(arr,_17f,_17e);arr=_p[0];var _181=[];for(var i=0,l=arr.length;i<l;++i){if(_p[2].call(_p[1],arr[i],i,arr)){_181.push(arr[i]);}}return _181;}});})();}if(!dojo._hasResource["dojo._base.Color"]){dojo._hasResource["dojo._base.Color"]=true;dojo.provide("dojo._base.Color");(function(){var d=dojo;dojo.Color=function(_185){if(_185){this.setColor(_185);}};dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]};dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){var t=this;t.r=r;t.g=g;t.b=b;t.a=a;},setColor:function(_18b){if(d.isString(_18b)){d.colorFromString(_18b,this);}else{if(d.isArray(_18b)){d.colorFromArray(_18b,this);}else{this._set(_18b.r,_18b.g,_18b.b,_18b.a);if(!(_18b instanceof d.Color)){this.sanitize();}}}return this;},sanitize:function(){return this;},toRgb:function(){var t=this;return [t.r,t.g,t.b];},toRgba:function(){var t=this;return [t.r,t.g,t.b,t.a];},toHex:function(){var arr=d.map(["r","g","b"],function(x){var s=this[x].toString(16);return s.length<2?"0"+s:s;},this);return "#"+arr.join("");},toCss:function(_191){var t=this,rgb=t.r+", "+t.g+", "+t.b;return (_191?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";},toString:function(){return this.toCss(true);}});dojo.blendColors=function(_194,end,_196,obj){var t=obj||new d.Color();d.forEach(["r","g","b","a"],function(x){t[x]=_194[x]+(end[x]-_194[x])*_196;if(x!="a"){t[x]=Math.round(t[x]);}});return t.sanitize();};dojo.colorFromRgb=function(_19a,obj){var m=_19a.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);};dojo.colorFromHex=function(_19d,obj){var t=obj||new d.Color(),bits=(_19d.length==4)?4:8,mask=(1<<bits)-1;_19d=Number("0x"+_19d.substr(1));if(isNaN(_19d)){return null;}d.forEach(["b","g","r"],function(x){var c=_19d&mask;_19d>>=bits;t[x]=bits==4?17*c:c;});t.a=1;return t;};dojo.colorFromArray=function(a,obj){var t=obj||new d.Color();t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));if(isNaN(t.a)){t.a=1;}return t.sanitize();};dojo.colorFromString=function(str,obj){var a=d.Color.named[str];return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);};})();}if(!dojo._hasResource["dojo._base"]){dojo._hasResource["dojo._base"]=true;dojo.provide("dojo._base");}if(!dojo._hasResource["dojo._base.window"]){dojo._hasResource["dojo._base.window"]=true;dojo.provide("dojo._base.window");dojo.doc=window["document"]||null;dojo.body=function(){return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];};dojo.setContext=function(_1aa,_1ab){dojo.global=_1aa;dojo.doc=_1ab;};dojo.withGlobal=function(_1ac,_1ad,_1ae,_1af){var _1b0=dojo.global;try{dojo.global=_1ac;return dojo.withDoc.call(null,_1ac.document,_1ad,_1ae,_1af);}finally{dojo.global=_1b0;}};dojo.withDoc=function(_1b1,_1b2,_1b3,_1b4){var _1b5=dojo.doc,_1b6=dojo._bodyLtr;try{dojo.doc=_1b1;delete dojo._bodyLtr;if(_1b3&&dojo.isString(_1b2)){_1b2=_1b3[_1b2];}return _1b2.apply(_1b3,_1b4||[]);}finally{dojo.doc=_1b5;if(_1b6!==undefined){dojo._bodyLtr=_1b6;}}};}if(!dojo._hasResource["dojo._base.event"]){dojo._hasResource["dojo._base.event"]=true;dojo.provide("dojo._base.event");(function(){var del=(dojo._event_listener={add:function(node,name,fp){if(!node){return;}name=del._normalizeEventName(name);fp=del._fixCallback(name,fp);var _1bb=name;if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){var ofp=fp;name=(name=="mouseenter")?"mouseover":"mouseout";fp=function(e){if(dojo.isFF<=2){try{e.relatedTarget.tagName;}catch(e2){return;}}if(!dojo.isDescendant(e.relatedTarget,node)){return ofp.call(this,e);}};}node.addEventListener(name,fp,false);return fp;},remove:function(node,_1bf,_1c0){if(node){_1bf=del._normalizeEventName(_1bf);if(!dojo.isIE&&(_1bf=="mouseenter"||_1bf=="mouseleave")){_1bf=(_1bf=="mouseenter")?"mouseover":"mouseout";}node.removeEventListener(_1bf,_1c0,false);}},_normalizeEventName:function(name){return name.slice(0,2)=="on"?name.slice(2):name;},_fixCallback:function(name,fp){return name!="keypress"?fp:function(e){return fp.call(this,del._fixEvent(e,this));};},_fixEvent:function(evt,_1c6){switch(evt.type){case "keypress":del._setKeyChar(evt);break;}return evt;},_setKeyChar:function(evt){evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):"";evt.charOrCode=evt.keyChar||evt.keyCode;},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});dojo.fixEvent=function(evt,_1c9){return del._fixEvent(evt,_1c9);};dojo.stopEvent=function(evt){evt.preventDefault();evt.stopPropagation();};var _1cb=dojo._listener;dojo._connect=function(obj,_1cd,_1ce,_1cf,_1d0){var _1d1=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);var lid=_1d1?(_1d0?2:1):0,l=[dojo._listener,del,_1cb][lid];var h=l.add(obj,_1cd,dojo.hitch(_1ce,_1cf));return [obj,_1cd,h,lid];};dojo._disconnect=function(obj,_1d6,_1d7,_1d8){([dojo._listener,del,_1cb][_1d8]).remove(obj,_1d6,_1d7);};dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145};if(dojo.isIE){var _1d9=function(e,code){try{return (e.keyCode=code);}catch(e){return 0;}};var iel=dojo._listener;var _1dd=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");if(!dojo.config._allow_leaks){_1cb=iel=dojo._ie_listener={handlers:[],add:function(_1de,_1df,_1e0){_1de=_1de||dojo.global;var f=_1de[_1df];if(!f||!f[_1dd]){var d=dojo._getIeDispatcher();d.target=f&&(ieh.push(f)-1);d[_1dd]=[];f=_1de[_1df]=d;}return f[_1dd].push(ieh.push(_1e0)-1);},remove:function(_1e4,_1e5,_1e6){var f=(_1e4||dojo.global)[_1e5],l=f&&f[_1dd];if(f&&l&&_1e6--){delete ieh[l[_1e6]];delete l[_1e6];}}};var ieh=iel.handlers;}dojo.mixin(del,{add:function(node,_1ea,fp){if(!node){return;}_1ea=del._normalizeEventName(_1ea);if(_1ea=="onkeypress"){var kd=node.onkeydown;if(!kd||!kd[_1dd]||!kd._stealthKeydownHandle){var h=del.add(node,"onkeydown",del._stealthKeyDown);kd=node.onkeydown;kd._stealthKeydownHandle=h;kd._stealthKeydownRefs=1;}else{kd._stealthKeydownRefs++;}}return iel.add(node,_1ea,del._fixCallback(fp));},remove:function(node,_1ef,_1f0){_1ef=del._normalizeEventName(_1ef);iel.remove(node,_1ef,_1f0);if(_1ef=="onkeypress"){var kd=node.onkeydown;if(--kd._stealthKeydownRefs<=0){iel.remove(node,"onkeydown",kd._stealthKeydownHandle);delete kd._stealthKeydownHandle;}}},_normalizeEventName:function(_1f2){return _1f2.slice(0,2)!="on"?"on"+_1f2:_1f2;},_nop:function(){},_fixEvent:function(evt,_1f4){if(!evt){var w=_1f4&&(_1f4.ownerDocument||_1f4.document||_1f4).parentWindow||window;evt=w.event;}if(!evt){return (evt);}evt.target=evt.srcElement;evt.currentTarget=(_1f4||evt.srcElement);evt.layerX=evt.offsetX;evt.layerY=evt.offsetY;var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;var _1f8=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;var _1f9=dojo._getIeDocumentElementOffset();evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(_1f8.scrollLeft||0)-_1f9.x;evt.pageY=evt.clientY+(_1f8.scrollTop||0)-_1f9.y;if(evt.type=="mouseover"){evt.relatedTarget=evt.fromElement;}if(evt.type=="mouseout"){evt.relatedTarget=evt.toElement;}evt.stopPropagation=del._stopPropagation;evt.preventDefault=del._preventDefault;return del._fixKeys(evt);},_fixKeys:function(evt){switch(evt.type){case "keypress":var c=("charCode" in evt?evt.charCode:evt.keyCode);if(c==10){c=0;evt.keyCode=13;}else{if(c==13||c==27){c=0;}else{if(c==3){c=99;}}}evt.charCode=c;del._setKeyChar(evt);break;}return evt;},_stealthKeyDown:function(evt){var kp=evt.currentTarget.onkeypress;if(!kp||!kp[_1dd]){return;}var k=evt.keyCode;var _1ff=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(_1ff||evt.ctrlKey){var c=_1ff?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else{if(c>95&&c<106){c-=48;}else{if((!evt.shiftKey)&&(c>=65&&c<=90)){c+=32;}else{c=del._punctMap[c]||c;}}}}var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});kp.call(evt.currentTarget,faux);evt.cancelBubble=faux.cancelBubble;evt.returnValue=faux.returnValue;_1d9(evt,faux.keyCode);}},_stopPropagation:function(){this.cancelBubble=true;},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;if(this.ctrlKey){_1d9(this,0);}this.returnValue=false;}});dojo.stopEvent=function(evt){evt=evt||window.event;del._stopPropagation.call(evt);del._preventDefault.call(evt);};}del._synthesizeEvent=function(evt,_204){var faux=dojo.mixin({},evt,_204);del._setKeyChar(faux);faux.preventDefault=function(){evt.preventDefault();};faux.stopPropagation=function(){evt.stopPropagation();};return faux;};if(dojo.isOpera){dojo.mixin(del,{_fixEvent:function(evt,_207){switch(evt.type){case "keypress":var c=evt.which;if(c==3){c=99;}c=c<41&&!evt.shiftKey?0:c;if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){c+=32;}return del._synthesizeEvent(evt,{charCode:c});}return evt;}});}if(dojo.isWebKit){del._add=del.add;del._remove=del.remove;dojo.mixin(del,{add:function(node,_20a,fp){if(!node){return;}var _20c=del._add(node,_20a,fp);if(del._normalizeEventName(_20a)=="keypress"){_20c._stealthKeyDownHandle=del._add(node,"keydown",function(evt){var k=evt.keyCode;var _20f=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(_20f||evt.ctrlKey){var c=_20f?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else{if(c>95&&c<106){c-=48;}else{if(!evt.shiftKey&&c>=65&&c<=90){c+=32;}else{c=del._punctMap[c]||c;}}}}var faux=del._synthesizeEvent(evt,{type:"keypress",faux:true,charCode:c});fp.call(evt.currentTarget,faux);}});}return _20c;},remove:function(node,_213,_214){if(node){if(_214._stealthKeyDownHandle){del._remove(node,"keydown",_214._stealthKeyDownHandle);}del._remove(node,_213,_214);}},_fixEvent:function(evt,_216){switch(evt.type){case "keypress":if(evt.faux){return evt;}var c=evt.charCode;c=c>=32?c:0;return del._synthesizeEvent(evt,{charCode:c,faux:true});}return evt;}});}})();if(dojo.isIE){dojo._ieDispatcher=function(args,_219){var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];var r=t&&t.apply(_219,args);var lls=[].concat(ls);for(var i in lls){var f=h[lls[i]];if(!(i in ap)&&f){f.apply(_219,args);}}return r;};dojo._getIeDispatcher=function(){return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");};dojo._event_listener._fixCallback=function(fp){var f=dojo._event_listener._fixEvent;return function(e){return fp.call(this,f(e,this));};};}}if(!dojo._hasResource["dojo._base.html"]){dojo._hasResource["dojo._base.html"]=true;dojo.provide("dojo._base.html");try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}if(dojo.isIE||dojo.isOpera){dojo.byId=function(id,doc){if(dojo.isString(id)){var _d=doc||dojo.doc;var te=_d.getElementById(id);if(te&&(te.attributes.id.value==id||te.id==id)){return te;}else{var eles=_d.all[id];if(!eles||eles.nodeName){eles=[eles];}var i=0;while((te=eles[i++])){if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){return te;}}}}else{return id;}};}else{dojo.byId=function(id,doc){return dojo.isString(id)?(doc||dojo.doc).getElementById(id):id;};}(function(){var d=dojo;var _22f=null;d.addOnWindowUnload(function(){_22f=null;});dojo._destroyElement=dojo.destroy=function(node){node=d.byId(node);try{if(!_22f||_22f.ownerDocument!=node.ownerDocument){_22f=node.ownerDocument.createElement("div");}_22f.appendChild(node.parentNode?node.parentNode.removeChild(node):node);_22f.innerHTML="";}catch(e){}};dojo.isDescendant=function(node,_232){try{node=d.byId(node);_232=d.byId(_232);while(node){if(node===_232){return true;}node=node.parentNode;}}catch(e){}return false;};dojo.setSelectable=function(node,_234){node=d.byId(node);if(d.isMozilla){node.style.MozUserSelect=_234?"":"none";}else{if(d.isKhtml||d.isWebKit){node.style.KhtmlUserSelect=_234?"auto":"none";}else{if(d.isIE){var v=(node.unselectable=_234?"":"on");d.query("*",node).forEach("item.unselectable = '"+v+"'");}}}};var _236=function(node,ref){var _239=ref.parentNode;if(_239){_239.insertBefore(node,ref);}};var _23a=function(node,ref){var _23d=ref.parentNode;if(_23d){if(_23d.lastChild==ref){_23d.appendChild(node);}else{_23d.insertBefore(node,ref.nextSibling);}}};dojo.place=function(node,_23f,_240){_23f=d.byId(_23f);if(d.isString(node)){node=node.charAt(0)=="<"?d._toDom(node,_23f.ownerDocument):d.byId(node);}if(typeof _240=="number"){var cn=_23f.childNodes;if(!cn.length||cn.length<=_240){_23f.appendChild(node);}else{_236(node,cn[_240<0?0:_240]);}}else{switch(_240){case "before":_236(node,_23f);break;case "after":_23a(node,_23f);break;case "replace":_23f.parentNode.replaceChild(node,_23f);break;case "only":d.empty(_23f);_23f.appendChild(node);break;case "first":if(_23f.firstChild){_236(node,_23f.firstChild);break;}default:_23f.appendChild(node);}}return node;};dojo.boxModel="content-box";if(d.isIE){var _dcm=document.compatMode;d.boxModel=_dcm=="BackCompat"||_dcm=="QuirksMode"||d.isIE<6?"border-box":"content-box";}var gcs;if(d.isWebKit){gcs=function(node){var s;if(node instanceof HTMLElement){var dv=node.ownerDocument.defaultView;s=dv.getComputedStyle(node,null);if(!s&&node.style){node.style.display="";s=dv.getComputedStyle(node,null);}}return s||{};};}else{if(d.isIE){gcs=function(node){return node.nodeType==1?node.currentStyle:{};};}else{gcs=function(node){return node instanceof HTMLElement?node.ownerDocument.defaultView.getComputedStyle(node,null):{};};}}dojo.getComputedStyle=gcs;if(!d.isIE){d._toPixelValue=function(_249,_24a){return parseFloat(_24a)||0;};}else{d._toPixelValue=function(_24b,_24c){if(!_24c){return 0;}if(_24c=="medium"){return 4;}if(_24c.slice&&_24c.slice(-2)=="px"){return parseFloat(_24c);}with(_24b){var _24d=style.left;var _24e=runtimeStyle.left;runtimeStyle.left=currentStyle.left;try{style.left=_24c;_24c=style.pixelLeft;}catch(e){_24c=0;}style.left=_24d;runtimeStyle.left=_24e;}return _24c;};}var px=d._toPixelValue;var astr="DXImageTransform.Microsoft.Alpha";var af=function(n,f){try{return n.filters.item(astr);}catch(e){return f?{}:null;}};dojo._getOpacity=d.isIE?function(node){try{return af(node).Opacity/100;}catch(e){return 1;}}:function(node){return gcs(node).opacity;};dojo._setOpacity=d.isIE?function(node,_257){var ov=_257*100;node.style.zoom=1;af(node,1).Enabled=!(_257==1);if(!af(node)){node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";}else{af(node,1).Opacity=ov;}if(node.nodeName.toLowerCase()=="tr"){d.query("> td",node).forEach(function(i){d._setOpacity(i,_257);});}return _257;}:function(node,_25b){return node.style.opacity=_25b;};var _25c={left:true,top:true};var _25d=/margin|padding|width|height|max|min|offset/;var _25e=function(node,type,_261){type=type.toLowerCase();if(d.isIE){if(_261=="auto"){if(type=="height"){return node.offsetHeight;}if(type=="width"){return node.offsetWidth;}}if(type=="fontweight"){switch(_261){case 700:return "bold";case 400:default:return "normal";}}}if(!(type in _25c)){_25c[type]=_25d.test(type);}return _25c[type]?px(node,_261):_261;};var _262=d.isIE?"styleFloat":"cssFloat",_263={"cssFloat":_262,"styleFloat":_262,"float":_262};dojo.style=function(node,_265,_266){var n=d.byId(node),args=arguments.length,op=(_265=="opacity");_265=_263[_265]||_265;if(args==3){return op?d._setOpacity(n,_266):n.style[_265]=_266;}if(args==2&&op){return d._getOpacity(n);}var s=gcs(n);if(args==2&&!d.isString(_265)){for(var x in _265){d.style(node,x,_265[x]);}return s;}return (args==1)?s:_25e(n,_265,s[_265]||n.style[_265]);};dojo._getPadExtents=function(n,_26d){var s=_26d||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);return {l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};};dojo._getBorderExtents=function(n,_272){var ne="none",s=_272||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);return {l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};};dojo._getPadBorderExtents=function(n,_278){var s=_278||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);return {l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};};dojo._getMarginExtents=function(n,_27d){var s=_27d||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);if(d.isWebKit&&(s.position!="absolute")){r=l;}return {l:l,t:t,w:l+r,h:t+b};};dojo._getMarginBox=function(node,_284){var s=_284||gcs(node),me=d._getMarginExtents(node,s);var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;if(d.isMoz){var sl=parseFloat(s.left),st=parseFloat(s.top);if(!isNaN(sl)&&!isNaN(st)){l=sl,t=st;}else{if(p&&p.style){var pcs=gcs(p);if(pcs.overflow!="visible"){var be=d._getBorderExtents(p,pcs);l+=be.l,t+=be.t;}}}}else{if(d.isOpera||(d.isIE>7&&!d.isQuirks)){if(p){be=d._getBorderExtents(p);l-=be.l;t-=be.t;}}}return {l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};};dojo._getContentBox=function(node,_28f){var s=_28f||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;if(!w){w=node.offsetWidth,h=node.offsetHeight;}else{h=node.clientHeight,be.w=be.h=0;}if(d.isOpera){pe.l+=be.l;pe.t+=be.t;}return {l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};};dojo._getBorderBox=function(node,_296){var s=_296||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);return {l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};};dojo._setBox=function(node,l,t,w,h,u){u=u||"px";var s=node.style;if(!isNaN(l)){s.left=l+u;}if(!isNaN(t)){s.top=t+u;}if(w>=0){s.width=w+u;}if(h>=0){s.height=h+u;}};dojo._isButtonTag=function(node){return node.tagName=="BUTTON"||node.tagName=="INPUT"&&node.getAttribute("type").toUpperCase()=="BUTTON";};dojo._usesBorderBox=function(node){var n=node.tagName;return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);};dojo._setContentSize=function(node,_2a5,_2a6,_2a7){if(d._usesBorderBox(node)){var pb=d._getPadBorderExtents(node,_2a7);if(_2a5>=0){_2a5+=pb.w;}if(_2a6>=0){_2a6+=pb.h;}}d._setBox(node,NaN,NaN,_2a5,_2a6);};dojo._setMarginBox=function(node,_2aa,_2ab,_2ac,_2ad,_2ae){var s=_2ae||gcs(node),bb=d._usesBorderBox(node),pb=bb?_2b2:d._getPadBorderExtents(node,s);if(d.isWebKit){if(d._isButtonTag(node)){var ns=node.style;if(_2ac>=0&&!ns.width){ns.width="4px";}if(_2ad>=0&&!ns.height){ns.height="4px";}}}var mb=d._getMarginExtents(node,s);if(_2ac>=0){_2ac=Math.max(_2ac-pb.w-mb.w,0);}if(_2ad>=0){_2ad=Math.max(_2ad-pb.h-mb.h,0);}d._setBox(node,_2aa,_2ab,_2ac,_2ad);};var _2b2={l:0,t:0,w:0,h:0};dojo.marginBox=function(node,box){var n=d.byId(node),s=gcs(n),b=box;return !b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);};dojo.contentBox=function(node,box){var n=d.byId(node),s=gcs(n),b=box;return !b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);};var _2bf=function(node,prop){if(!(node=(node||0).parentNode)){return 0;}var val,_2c3=0,_b=d.body();while(node&&node.style){if(gcs(node).position=="fixed"){return 0;}val=node[prop];if(val){_2c3+=val-0;if(node==_b){break;}}node=node.parentNode;}return _2c3;};dojo._docScroll=function(){var _b=d.body(),_w=d.global,de=d.doc.documentElement;return {y:(_w.pageYOffset||de.scrollTop||_b.scrollTop||0),x:(_w.pageXOffset||d._fixIeBiDiScrollLeft(de.scrollLeft)||_b.scrollLeft||0)};};dojo._isBodyLtr=function(){return ("_bodyLtr" in d)?d._bodyLtr:d._bodyLtr=gcs(d.body()).direction=="ltr";};dojo._getIeDocumentElementOffset=function(){var de=d.doc.documentElement;if(d.isIE<7){return {x:d._isBodyLtr()||window.parent==window?de.clientLeft:de.offsetWidth-de.clientWidth-de.clientLeft,y:de.clientTop};}else{if(d.isIE<8){return {x:de.getBoundingClientRect().left,y:de.getBoundingClientRect().top};}else{return {x:0,y:0};}}};dojo._fixIeBiDiScrollLeft=function(_2c9){var dd=d.doc;if(d.isIE<8&&!d._isBodyLtr()){var de=dd.compatMode=="BackCompat"?dd.body:dd.documentElement;return _2c9+de.clientWidth-de.scrollWidth;}return _2c9;};dojo._abs=function(node,_2cd){var db=d.body(),dh=d.body().parentNode,ret;if(node["getBoundingClientRect"]){var _2d1=node.getBoundingClientRect();ret={x:_2d1.left,y:_2d1.top};if(d.isFF>=3){var cs=gcs(dh);ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);}if(d.isIE){var _2d3=d._getIeDocumentElementOffset();ret.x-=_2d3.x+(d.isQuirks?db.clientLeft:0);ret.y-=_2d3.y+(d.isQuirks?db.clientTop:0);}}else{ret={x:0,y:0};if(node["offsetParent"]){ret.x-=_2bf(node,"scrollLeft");ret.y-=_2bf(node,"scrollTop");var _2d4=node;do{var n=_2d4.offsetLeft,t=_2d4.offsetTop;ret.x+=isNaN(n)?0:n;ret.y+=isNaN(t)?0:t;cs=gcs(_2d4);if(_2d4!=node){if(d.isFF){ret.x+=2*px(_2d4,cs.borderLeftWidth);ret.y+=2*px(_2d4,cs.borderTopWidth);}else{ret.x+=px(_2d4,cs.borderLeftWidth);ret.y+=px(_2d4,cs.borderTopWidth);}}if(d.isFF&&cs.position=="static"){var _2d7=_2d4.parentNode;while(_2d7!=_2d4.offsetParent){var pcs=gcs(_2d7);if(pcs.position=="static"){ret.x+=px(_2d4,pcs.borderLeftWidth);ret.y+=px(_2d4,pcs.borderTopWidth);}_2d7=_2d7.parentNode;}}_2d4=_2d4.offsetParent;}while((_2d4!=dh)&&_2d4);}else{if(node.x&&node.y){ret.x+=isNaN(node.x)?0:node.x;ret.y+=isNaN(node.y)?0:node.y;}}}if(_2cd){var _2d9=d._docScroll();ret.x+=_2d9.x;ret.y+=_2d9.y;}return ret;};dojo.coords=function(node,_2db){var n=d.byId(node),s=gcs(n),mb=d._getMarginBox(n,s);var abs=d._abs(n,_2db);mb.x=abs.x;mb.y=abs.y;return mb;};var _2e0=d.isIE<8;var _2e1=function(name){switch(name.toLowerCase()){case "tabindex":return _2e0?"tabIndex":"tabindex";case "readonly":return "readOnly";case "class":return "className";case "for":case "htmlfor":return _2e0?"htmlFor":"for";default:return name;}};var _2e3={colspan:"colSpan",enctype:"enctype",frameborder:"frameborder",method:"method",rowspan:"rowSpan",scrolling:"scrolling",shape:"shape",span:"span",type:"type",valuetype:"valueType",classname:"className",innerhtml:"innerHTML"};dojo.hasAttr=function(node,name){node=d.byId(node);var _2e6=_2e1(name);_2e6=_2e6=="htmlFor"?"for":_2e6;var attr=node.getAttributeNode&&node.getAttributeNode(_2e6);return attr?attr.specified:false;};var _2e8={},_ctr=0,_2ea=dojo._scopeName+"attrid",_2eb={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};dojo.attr=function(node,name,_2ee){node=d.byId(node);var args=arguments.length;if(args==2&&!d.isString(name)){for(var x in name){d.attr(node,x,name[x]);}return;}name=_2e1(name);if(args==3){if(d.isFunction(_2ee)){var _2f1=d.attr(node,_2ea);if(!_2f1){_2f1=_ctr++;d.attr(node,_2ea,_2f1);}if(!_2e8[_2f1]){_2e8[_2f1]={};}var h=_2e8[_2f1][name];if(h){d.disconnect(h);}else{try{delete node[name];}catch(e){}}_2e8[_2f1][name]=d.connect(node,name,_2ee);}else{if(typeof _2ee=="boolean"){node[name]=_2ee;}else{if(name==="style"&&!d.isString(_2ee)){d.style(node,_2ee);}else{if(name=="className"){node.className=_2ee;}else{if(name==="innerHTML"){if(d.isIE&&node.tagName.toLowerCase() in _2eb){d.empty(node);node.appendChild(d._toDom(_2ee,node.ownerDocument));}else{node[name]=_2ee;}}else{node.setAttribute(name,_2ee);}}}}}}else{var prop=_2e3[name.toLowerCase()];if(prop){return node[prop];}var _2f4=node[name];return (typeof _2f4=="boolean"||typeof _2f4=="function")?_2f4:(d.hasAttr(node,name)?node.getAttribute(name):null);}};dojo.removeAttr=function(node,name){d.byId(node).removeAttribute(_2e1(name));};dojo.create=function(tag,_2f8,_2f9,pos){var doc=d.doc;if(_2f9){_2f9=d.byId(_2f9);doc=_2f9.ownerDocument;}if(d.isString(tag)){tag=doc.createElement(tag);}if(_2f8){d.attr(tag,_2f8);}if(_2f9){d.place(tag,_2f9,pos);}return tag;};d.empty=d.isIE?function(node){node=d.byId(node);for(var c;c=node.lastChild;){d.destroy(c);}}:function(node){d.byId(node).innerHTML="";};var _2ff={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},_300=/<\s*([\w\:]+)/,_301={},_302=0,_303="__"+d._scopeName+"ToDomId";for(var _304 in _2ff){var tw=_2ff[_304];tw.pre=_304=="option"?"<select multiple=\"multiple\">":"<"+tw.join("><")+">";tw.post="</"+tw.reverse().join("></")+">";}d._toDom=function(frag,doc){doc=doc||d.doc;var _308=doc[_303];if(!_308){doc[_303]=_308=++_302+"";_301[_308]=doc.createElement("div");}frag+="";var _309=frag.match(_300),tag=_309?_309[1].toLowerCase():"",_30b=_301[_308],wrap,i,fc,df;if(_309&&_2ff[tag]){wrap=_2ff[tag];_30b.innerHTML=wrap.pre+frag+wrap.post;for(i=wrap.length;i;--i){_30b=_30b.firstChild;}}else{_30b.innerHTML=frag;}if(_30b.childNodes.length==1){return _30b.removeChild(_30b.firstChild);}df=doc.createDocumentFragment();while(fc=_30b.firstChild){df.appendChild(fc);}return df;};var _30f="className";dojo.hasClass=function(node,_311){return ((" "+d.byId(node)[_30f]+" ").indexOf(" "+_311+" ")>=0);};dojo.addClass=function(node,_313){node=d.byId(node);var cls=node[_30f];if((" "+cls+" ").indexOf(" "+_313+" ")<0){node[_30f]=cls+(cls?" ":"")+_313;}};dojo.removeClass=function(node,_316){node=d.byId(node);var t=d.trim((" "+node[_30f]+" ").replace(" "+_316+" "," "));if(node[_30f]!=t){node[_30f]=t;}};dojo.toggleClass=function(node,_319,_31a){if(_31a===undefined){_31a=!d.hasClass(node,_319);}d[_31a?"addClass":"removeClass"](node,_319);};})();}if(!dojo._hasResource["dojo._base.NodeList"]){dojo._hasResource["dojo._base.NodeList"]=true;dojo.provide("dojo._base.NodeList");(function(){var d=dojo;var ap=Array.prototype,aps=ap.slice,apc=ap.concat;var tnl=function(a){a.constructor=d.NodeList;dojo._mixin(a,d.NodeList.prototype);return a;};var _321=function(f,a,o){a=[0].concat(aps.call(a,0));o=o||d.global;return function(node){a[0]=node;return f.apply(o,a);};};var _326=function(f,o){return function(){this.forEach(_321(f,arguments,o));return this;};};var _329=function(f,o){return function(){return this.map(_321(f,arguments,o));};};var _32c=function(f,o){return function(){return this.filter(_321(f,arguments,o));};};var _32f=function(f,g,o){return function(){var a=arguments,body=_321(f,a,o);if(g.call(o||d.global,a)){return this.map(body);}this.forEach(body);return this;};};var _335=function(a){return a.length==1&&d.isString(a[0]);};var _337=function(node){var p=node.parentNode;if(p){p.removeChild(node);}};dojo.NodeList=function(){return tnl(Array.apply(null,arguments));};var nl=d.NodeList,nlp=nl.prototype;nl._wrap=tnl;nl._adaptAsMap=_329;nl._adaptAsForEach=_326;nl._adaptAsFilter=_32c;nl._adaptWithCondition=_32f;d.forEach(["slice","splice"],function(name){var f=ap[name];nlp[name]=function(){return tnl(f.apply(this,arguments));};});d.forEach(["indexOf","lastIndexOf","every","some"],function(name){var f=d[name];nlp[name]=function(){return f.apply(d,[this].concat(aps.call(arguments,0)));};});d.forEach(["attr","style"],function(name){nlp[name]=_32f(d[name],_335);});d.forEach(["connect","addClass","removeClass","toggleClass","empty"],function(name){nlp[name]=_326(d[name]);});dojo.extend(dojo.NodeList,{concat:function(item){var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){return a&&!d.isArray(a)&&(a.constructor===NodeList||a.constructor==nl)?aps.call(a,0):a;});return tnl(apc.apply(t,m));},map:function(func,obj){return tnl(d.map(this,func,obj));},forEach:function(_348,_349){d.forEach(this,_348,_349);return this;},coords:_329(d.coords),place:function(_34a,_34b){var item=d.query(_34a)[0];return this.forEach(function(node){d.place(node,item,_34b);});},orphan:function(_34e){return (_34e?d._filterQueryResult(this,_34e):this).forEach(_337);},adopt:function(_34f,_350){return d.query(_34f).place(item[0],_350);},query:function(_351){if(!_351){return this;}var ret=this.map(function(node){return d.query(_351,node).filter(function(_354){return _354!==undefined;});});return tnl(apc.apply([],ret));},filter:function(_355){var a=arguments,_357=this,_358=0;if(d.isString(_355)){_357=d._filterQueryResult(this,a[0]);if(a.length==1){return _357;}_358=1;}return tnl(d.filter(_357,a[_358],a[_358+1]));},addContent:function(_359,_35a){var c=d.isString(_359)?d._toDom(_359,this[0]&&this[0].ownerDocument):_359,i,l=this.length-1;for(i=0;i<l;++i){d.place(c.cloneNode(true),this[i],_35a);}if(l>=0){d.place(c,this[l],_35a);}return this;},instantiate:function(_35d,_35e){var c=d.isFunction(_35d)?_35d:d.getObject(_35d);_35e=_35e||{};return this.forEach(function(node){new c(_35e,node);});},at:function(){var t=new dojo.NodeList();d.forEach(arguments,function(i){if(this[i]){t.push(this[i]);}},this);return t;}});d.forEach(["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"],function(evt){var _oe="on"+evt;nlp[_oe]=function(a,b){return this.connect(_oe,a,b);};});})();}if(!dojo._hasResource["dojo._base.query"]){dojo._hasResource["dojo._base.query"]=true;if(typeof dojo!="undefined"){dojo.provide("dojo._base.query");}(function(d){var trim=d.trim;var each=d.forEach;var qlc=d._queryListCtor=d.NodeList;var _36b=d.isString;var _36c=function(){return d.doc;};var _36d=(d.isWebKit&&((_36c().compatMode)=="BackCompat"));var _36e=!!_36c().firstChild["children"]?"children":"childNodes";var _36f=">~+";var _370=false;var _371=function(){return true;};var _372=function(_373){if(_36f.indexOf(_373.slice(-1))>=0){_373+=" * ";}else{_373+=" ";}var ts=function(s,e){return trim(_373.slice(s,e));};var _377=[];var _378=-1,_379=-1,_37a=-1,_37b=-1,_37c=-1,inId=-1,_37e=-1,lc="",cc="",_381;var x=0,ql=_373.length,_384=null,_cp=null;var _386=function(){if(_37e>=0){var tv=(_37e==x)?null:ts(_37e,x);_384[(_36f.indexOf(tv)<0)?"tag":"oper"]=tv;_37e=-1;}};var _388=function(){if(inId>=0){_384.id=ts(inId,x).replace(/\\/g,"");inId=-1;}};var _389=function(){if(_37c>=0){_384.classes.push(ts(_37c+1,x).replace(/\\/g,""));_37c=-1;}};var _38a=function(){_388();_386();_389();};var _38b=function(){_38a();if(_37b>=0){_384.pseudos.push({name:ts(_37b+1,x)});}_384.loops=(_384.pseudos.length||_384.attrs.length||_384.classes.length);_384.oquery=_384.query=ts(_381,x);_384.otag=_384.tag=(_384["oper"])?null:(_384.tag||"*");if(_384.tag){_384.tag=_384.tag.toUpperCase();}if(_377.length&&(_377[_377.length-1].oper)){_384.infixOper=_377.pop();_384.query=_384.infixOper.query+" "+_384.query;}_377.push(_384);_384=null;};for(;lc=cc,cc=_373.charAt(x),x<ql;x++){if(lc=="\\"){continue;}if(!_384){_381=x;_384={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){return (_370)?this.otag:this.tag;}};_37e=x;}if(_378>=0){if(cc=="]"){if(!_cp.attr){_cp.attr=ts(_378+1,x);}else{_cp.matchFor=ts((_37a||_378+1),x);}var cmf=_cp.matchFor;if(cmf){if((cmf.charAt(0)=="\"")||(cmf.charAt(0)=="'")){_cp.matchFor=cmf.slice(1,-1);}}_384.attrs.push(_cp);_cp=null;_378=_37a=-1;}else{if(cc=="="){var _38d=("|~^$*".indexOf(lc)>=0)?lc:"";_cp.type=_38d+cc;_cp.attr=ts(_378+1,x-_38d.length);_37a=x+1;}}}else{if(_379>=0){if(cc==")"){if(_37b>=0){_cp.value=ts(_379+1,x);}_37b=_379=-1;}}else{if(cc=="#"){_38a();inId=x+1;}else{if(cc=="."){_38a();_37c=x;}else{if(cc==":"){_38a();_37b=x;}else{if(cc=="["){_38a();_378=x;_cp={};}else{if(cc=="("){if(_37b>=0){_cp={name:ts(_37b+1,x),value:null};_384.pseudos.push(_cp);}_379=x;}else{if((cc==" ")&&(lc!=cc)){_38b();}}}}}}}}}return _377;};var _38e=function(_38f,_390){if(!_38f){return _390;}if(!_390){return _38f;}return function(){return _38f.apply(window,arguments)&&_390.apply(window,arguments);};};var _391=function(i,arr){var r=arr||[];if(i){r.push(i);}return r;};var _395=function(n){return (1==n.nodeType);};var _397="";var _398=function(elem,attr){if(!elem){return _397;}if(attr=="class"){return elem.className||_397;}if(attr=="for"){return elem.htmlFor||_397;}if(attr=="style"){return elem.style.cssText||_397;}return (_370?elem.getAttribute(attr):elem.getAttribute(attr,2))||_397;};var _39b={"*=":function(attr,_39d){return function(elem){return (_398(elem,attr).indexOf(_39d)>=0);};},"^=":function(attr,_3a0){return function(elem){return (_398(elem,attr).indexOf(_3a0)==0);};},"$=":function(attr,_3a3){var tval=" "+_3a3;return function(elem){var ea=" "+_398(elem,attr);return (ea.lastIndexOf(_3a3)==(ea.length-_3a3.length));};},"~=":function(attr,_3a8){var tval=" "+_3a8+" ";return function(elem){var ea=" "+_398(elem,attr)+" ";return (ea.indexOf(tval)>=0);};},"|=":function(attr,_3ad){var _3ae=" "+_3ad+"-";return function(elem){var ea=" "+_398(elem,attr);return ((ea==_3ad)||(ea.indexOf(_3ae)==0));};},"=":function(attr,_3b2){return function(elem){return (_398(elem,attr)==_3b2);};}};var _3b4=(typeof _36c().firstChild.nextElementSibling=="undefined");var _ns=!_3b4?"nextElementSibling":"nextSibling";var _ps=!_3b4?"previousElementSibling":"previousSibling";var _3b7=(_3b4?_395:_371);var _3b8=function(node){while(node=node[_ps]){if(_3b7(node)){return false;}}return true;};var _3ba=function(node){while(node=node[_ns]){if(_3b7(node)){return false;}}return true;};var _3bc=function(node){var root=node.parentNode;var i=0,tret=root[_36e],ci=(node["_i"]||-1),cl=(root["_l"]||-1);if(!tret){return -1;}var l=tret.length;if(cl==l&&ci>=0&&cl>=0){return ci;}root["_l"]=l;ci=-1;for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_ns]){if(_3b7(te)){te["_i"]=++i;if(node===te){ci=i;}}}return ci;};var _3c5=function(elem){return !((_3bc(elem))%2);};var _3c7=function(elem){return ((_3bc(elem))%2);};var _3c9={"checked":function(name,_3cb){return function(elem){return !!d.attr(elem,"checked");};},"first-child":function(){return _3b8;},"last-child":function(){return _3ba;},"only-child":function(name,_3ce){return function(node){if(!_3b8(node)){return false;}if(!_3ba(node)){return false;}return true;};},"empty":function(name,_3d1){return function(elem){var cn=elem.childNodes;var cnl=elem.childNodes.length;for(var x=cnl-1;x>=0;x--){var nt=cn[x].nodeType;if((nt===1)||(nt==3)){return false;}}return true;};},"contains":function(name,_3d8){var cz=_3d8.charAt(0);if(cz=="\""||cz=="'"){_3d8=_3d8.slice(1,-1);}return function(elem){return (elem.innerHTML.indexOf(_3d8)>=0);};},"not":function(name,_3dc){var p=_372(_3dc)[0];var _3de={el:1};if(p.tag!="*"){_3de.tag=1;}if(!p.classes.length){_3de.classes=1;}var ntf=_3e0(p,_3de);return function(elem){return (!ntf(elem));};},"nth-child":function(name,_3e3){var pi=parseInt;if(_3e3=="odd"){return _3c7;}else{if(_3e3=="even"){return _3c5;}}if(_3e3.indexOf("n")!=-1){var _3e5=_3e3.split("n",2);var pred=_3e5[0]?((_3e5[0]=="-")?-1:pi(_3e5[0])):1;var idx=_3e5[1]?pi(_3e5[1]):0;var lb=0,ub=-1;if(pred>0){if(idx<0){idx=(idx%pred)&&(pred+(idx%pred));}else{if(idx>0){if(idx>=pred){lb=idx-idx%pred;}idx=idx%pred;}}}else{if(pred<0){pred*=-1;if(idx>0){ub=idx;idx=idx%pred;}}}if(pred>0){return function(elem){var i=_3bc(elem);return (i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);};}else{_3e3=idx;}}var _3ec=pi(_3e3);return function(elem){return (_3bc(elem)==_3ec);};}};var _3ee=(d.isIE)?function(cond){var clc=cond.toLowerCase();if(clc=="class"){cond="className";}return function(elem){return (_370?elem.getAttribute(cond):elem[cond]||elem[clc]);};}:function(cond){return function(elem){return (elem&&elem.getAttribute&&elem.hasAttribute(cond));};};var _3e0=function(_3f4,_3f5){if(!_3f4){return _371;}_3f5=_3f5||{};var ff=null;if(!("el" in _3f5)){ff=_38e(ff,_395);}if(!("tag" in _3f5)){if(_3f4.tag!="*"){ff=_38e(ff,function(elem){return (elem&&(elem.tagName==_3f4.getTag()));});}}if(!("classes" in _3f5)){each(_3f4.classes,function(_3f8,idx,arr){var re=new RegExp("(?:^|\\s)"+_3f8+"(?:\\s|$)");ff=_38e(ff,function(elem){return re.test(elem.className);});ff.count=idx;});}if(!("pseudos" in _3f5)){each(_3f4.pseudos,function(_3fd){var pn=_3fd.name;if(_3c9[pn]){ff=_38e(ff,_3c9[pn](pn,_3fd.value));}});}if(!("attrs" in _3f5)){each(_3f4.attrs,function(attr){var _400;var a=attr.attr;if(attr.type&&_39b[attr.type]){_400=_39b[attr.type](a,attr.matchFor);}else{if(a.length){_400=_3ee(a);}}if(_400){ff=_38e(ff,_400);}});}if(!("id" in _3f5)){if(_3f4.id){ff=_38e(ff,function(elem){return (!!elem&&(elem.id==_3f4.id));});}}if(!ff){if(!("default" in _3f5)){ff=_371;}}return ff;};var _403=function(_404){return function(node,ret,bag){while(node=node[_ns]){if(_3b4&&(!_395(node))){continue;}if((!bag||_408(node,bag))&&_404(node)){ret.push(node);}break;}return ret;};};var _409=function(_40a){return function(root,ret,bag){var te=root[_ns];while(te){if(_3b7(te)){if(bag&&!_408(te,bag)){break;}if(_40a(te)){ret.push(te);}}te=te[_ns];}return ret;};};var _40f=function(_410){_410=_410||_371;return function(root,ret,bag){var te,x=0,tret=root[_36e];while(te=tret[x++]){if(_3b7(te)&&(!bag||_408(te,bag))&&(_410(te,x))){ret.push(te);}}return ret;};};var _417=function(node,root){var pn=node.parentNode;while(pn){if(pn==root){break;}pn=pn.parentNode;}return !!pn;};var _41b={};var _41c=function(_41d){var _41e=_41b[_41d.query];if(_41e){return _41e;}var io=_41d.infixOper;var oper=(io?io.oper:"");var _421=_3e0(_41d,{el:1});var qt=_41d.tag;var _423=("*"==qt);var ecs=_36c()["getElementsByClassName"];if(!oper){if(_41d.id){_421=(!_41d.loops&&_423)?_371:_3e0(_41d,{el:1,id:1});_41e=function(root,arr){var te=d.byId(_41d.id,(root.ownerDocument||root));if(!te||!_421(te)){return;}if(9==root.nodeType){return _391(te,arr);}else{if(_417(te,root)){return _391(te,arr);}}};}else{if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&_41d.classes.length&&!_36d){_421=_3e0(_41d,{el:1,classes:1,id:1});var _428=_41d.classes.join(" ");_41e=function(root,arr,bag){var ret=_391(0,arr),te,x=0;var tret=root.getElementsByClassName(_428);while((te=tret[x++])){if(_421(te,root)&&_408(te,bag)){ret.push(te);}}return ret;};}else{if(!_423&&!_41d.loops){_41e=function(root,arr,bag){var ret=_391(0,arr),te,x=0;var tret=root.getElementsByTagName(_41d.getTag());while((te=tret[x++])){if(_408(te,bag)){ret.push(te);}}return ret;};}else{_421=_3e0(_41d,{el:1,tag:1,id:1});_41e=function(root,arr,bag){var ret=_391(0,arr),te,x=0;var tret=root.getElementsByTagName(_41d.getTag());while((te=tret[x++])){if(_421(te,root)&&_408(te,bag)){ret.push(te);}}return ret;};}}}}else{var _43e={el:1};if(_423){_43e.tag=1;}_421=_3e0(_41d,_43e);if("+"==oper){_41e=_403(_421);}else{if("~"==oper){_41e=_409(_421);}else{if(">"==oper){_41e=_40f(_421);}}}}return _41b[_41d.query]=_41e;};var _43f=function(root,_441){var _442=_391(root),qp,x,te,qpl=_441.length,bag,ret;for(var i=0;i<qpl;i++){ret=[];qp=_441[i];x=_442.length-1;if(x>0){bag={};ret.nozip=true;}var gef=_41c(qp);while(te=_442[x--]){gef(te,ret,bag);}if(!ret.length){break;}_442=ret;}return ret;};var _44b={},_44c={};var _44d=function(_44e){var _44f=_372(trim(_44e));if(_44f.length==1){var tef=_41c(_44f[0]);return function(root){var r=tef(root,new qlc());if(r){r.nozip=true;}return r;};}return function(root){return _43f(root,_44f);};};var nua=navigator.userAgent;var wk="WebKit/";var _456=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));var _457=d.isIE?"commentStrip":"nozip";var qsa="querySelectorAll";var _459=(!!_36c()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||_456));var _45a=function(_45b,_45c){if(_459){var _45d=_44c[_45b];if(_45d&&!_45c){return _45d;}}var _45e=_44b[_45b];if(_45e){return _45e;}var qcz=_45b.charAt(0);var _460=(-1==_45b.indexOf(" "));if((_45b.indexOf("#")>=0)&&(_460)){_45c=true;}var _461=(_459&&(!_45c)&&(_36f.indexOf(qcz)==-1)&&(!d.isIE||(_45b.indexOf(":")==-1))&&(!(_36d&&(_45b.indexOf(".")>=0)))&&(_45b.indexOf(":contains")==-1)&&(_45b.indexOf("|=")==-1));if(_461){var tq=(_36f.indexOf(_45b.charAt(_45b.length-1))>=0)?(_45b+" *"):_45b;return _44c[_45b]=function(root){try{if(!((9==root.nodeType)||_460)){throw "";}var r=root[qsa](tq);r[_457]=true;return r;}catch(e){return _45a(_45b,true)(root);}};}else{var _465=_45b.split(/\s*,\s*/);return _44b[_45b]=((_465.length<2)?_44d(_45b):function(root){var _467=0,ret=[],tp;while((tp=_465[_467++])){ret=ret.concat(_44d(tp)(root));}return ret;});}};var _46a=0;var _46b=d.isIE?function(node){if(_370){return (node.getAttribute("_uid")||node.setAttribute("_uid",++_46a)||_46a);}else{return node.uniqueID;}}:function(node){return (node._uid||(node._uid=++_46a));};var _408=function(node,bag){if(!bag){return 1;}var id=_46b(node);if(!bag[id]){return bag[id]=1;}return 0;};var _471="_zipIdx";var _zip=function(arr){if(arr&&arr.nozip){return (qlc._wrap)?qlc._wrap(arr):arr;}var ret=new qlc();if(!arr||!arr.length){return ret;}if(arr[0]){ret.push(arr[0]);}if(arr.length<2){return ret;}_46a++;if(d.isIE&&_370){var _475=_46a+"";arr[0].setAttribute(_471,_475);for(var x=1,te;te=arr[x];x++){if(arr[x].getAttribute(_471)!=_475){ret.push(te);}te.setAttribute(_471,_475);}}else{if(d.isIE&&arr.commentStrip){try{for(var x=1,te;te=arr[x];x++){if(_395(te)){ret.push(te);}}}catch(e){}}else{if(arr[0]){arr[0][_471]=_46a;}for(var x=1,te;te=arr[x];x++){if(arr[x][_471]!=_46a){ret.push(te);}te[_471]=_46a;}}}return ret;};d.query=function(_478,root){qlc=d._queryListCtor;if(!_478){return new qlc();}if(_478.constructor==qlc){return _478;}if(!_36b(_478)){return new qlc(_478);}if(_36b(root)){root=d.byId(root);if(!root){return new qlc();}}root=root||_36c();var od=root.ownerDocument||root.documentElement;_370=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));var r=_45a(_478)(root);if(r&&r.nozip&&!qlc._wrap){return r;}return _zip(r);};d.query.pseudos=_3c9;d._filterQueryResult=function(_47c,_47d){var _47e=new d._queryListCtor();var _47f=_3e0(_372(_47d)[0]);for(var x=0,te;te=_47c[x];x++){if(_47f(te)){_47e.push(te);}}return _47e;};})(this["queryPortability"]||this["acme"]||dojo);}if(!dojo._hasResource["dojo._base.xhr"]){dojo._hasResource["dojo._base.xhr"]=true;dojo.provide("dojo._base.xhr");(function(){var _d=dojo;function _483(obj,name,_486){var val=obj[name];if(_d.isString(val)){obj[name]=[val,_486];}else{if(_d.isArray(val)){val.push(_486);}else{obj[name]=_486;}}};dojo.formToObject=function(_488){var ret={};var _48a="file|submit|image|reset|button|";_d.forEach(dojo.byId(_488).elements,function(item){var _in=item.name;var type=(item.type||"").toLowerCase();if(_in&&type&&_48a.indexOf(type)==-1&&!item.disabled){if(type=="radio"||type=="checkbox"){if(item.checked){_483(ret,_in,item.value);}}else{if(item.multiple){ret[_in]=[];_d.query("option",item).forEach(function(opt){if(opt.selected){_483(ret,_in,opt.value);}});}else{_483(ret,_in,item.value);if(type=="image"){ret[_in+".x"]=ret[_in+".y"]=ret[_in].x=ret[_in].y=0;}}}}});return ret;};dojo.objectToQuery=function(map){var enc=encodeURIComponent;var _491=[];var _492={};for(var name in map){var _494=map[name];if(_494!=_492[name]){var _495=enc(name)+"=";if(_d.isArray(_494)){for(var i=0;i<_494.length;i++){_491.push(_495+enc(_494[i]));}}else{_491.push(_495+enc(_494));}}}return _491.join("&");};dojo.formToQuery=function(_497){return _d.objectToQuery(_d.formToObject(_497));};dojo.formToJson=function(_498,_499){return _d.toJson(_d.formToObject(_498),_499);};dojo.queryToObject=function(str){var ret={};var qp=str.split("&");var dec=decodeURIComponent;_d.forEach(qp,function(item){if(item.length){var _49f=item.split("=");var name=dec(_49f.shift());var val=dec(_49f.join("="));if(_d.isString(ret[name])){ret[name]=[ret[name]];}if(_d.isArray(ret[name])){ret[name].push(val);}else{ret[name]=val;}}});return ret;};dojo._blockAsync=false;dojo._contentHandlers={text:function(xhr){return xhr.responseText;},json:function(xhr){return _d.fromJson(xhr.responseText||null);},"json-comment-filtered":function(xhr){if(!dojo.config.useCommentedJson){console.warn("Consider using the standard mimetype:application/json."+" json-commenting can introduce security issues. To"+" decrease the chances of hijacking, use the standard the 'json' handler and"+" prefix your json with: {}&&\n"+"Use djConfig.useCommentedJson=true to turn off this message.");}var _4a5=xhr.responseText;var _4a6=_4a5.indexOf("/*");var _4a7=_4a5.lastIndexOf("*/");if(_4a6==-1||_4a7==-1){throw new Error("JSON was not comment filtered");}return _d.fromJson(_4a5.substring(_4a6+2,_4a7));},javascript:function(xhr){return _d.eval(xhr.responseText);},xml:function(xhr){var _4aa=xhr.responseXML;if(_d.isIE&&(!_4aa||!_4aa.documentElement)){var ms=function(n){return "MSXML"+n+".DOMDocument";};var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];_d.some(dp,function(p){try{var dom=new ActiveXObject(p);dom.async=false;dom.loadXML(xhr.responseText);_4aa=dom;}catch(e){return false;}return true;});}return _4aa;}};dojo._contentHandlers["json-comment-optional"]=function(xhr){var _4b1=_d._contentHandlers;if(xhr.responseText&&xhr.responseText.indexOf("/*")!=-1){return _4b1["json-comment-filtered"](xhr);}else{return _4b1["json"](xhr);}};dojo._ioSetArgs=function(args,_4b3,_4b4,_4b5){var _4b6={args:args,url:args.url};var _4b7=null;if(args.form){var form=_d.byId(args.form);var _4b9=form.getAttributeNode("action");_4b6.url=_4b6.url||(_4b9?_4b9.value:null);_4b7=_d.formToObject(form);}var _4ba=[{}];if(_4b7){_4ba.push(_4b7);}if(args.content){_4ba.push(args.content);}if(args.preventCache){_4ba.push({"dojo.preventCache":new Date().valueOf()});}_4b6.query=_d.objectToQuery(_d.mixin.apply(null,_4ba));_4b6.handleAs=args.handleAs||"text";var d=new _d.Deferred(_4b3);d.addCallbacks(_4b4,function(_4bc){return _4b5(_4bc,d);});var ld=args.load;if(ld&&_d.isFunction(ld)){d.addCallback(function(_4be){return ld.call(args,_4be,_4b6);});}var err=args.error;if(err&&_d.isFunction(err)){d.addErrback(function(_4c0){return err.call(args,_4c0,_4b6);});}var _4c1=args.handle;if(_4c1&&_d.isFunction(_4c1)){d.addBoth(function(_4c2){return _4c1.call(args,_4c2,_4b6);});}d.ioArgs=_4b6;return d;};var _4c3=function(dfd){dfd.canceled=true;var xhr=dfd.ioArgs.xhr;var _at=typeof xhr.abort;if(_at=="function"||_at=="object"||_at=="unknown"){xhr.abort();}var err=dfd.ioArgs.error;if(!err){err=new Error("xhr cancelled");err.dojoType="cancel";}return err;};var _4c8=function(dfd){var ret=_d._contentHandlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);return ret===undefined?null:ret;};var _4cb=function(_4cc,dfd){console.error(_4cc);return _4cc;};var _4ce=null;var _4cf=[];var _4d0=function(){var now=(new Date()).getTime();if(!_d._blockAsync){for(var i=0,tif;i<_4cf.length&&(tif=_4cf[i]);i++){var dfd=tif.dfd;var func=function(){if(!dfd||dfd.canceled||!tif.validCheck(dfd)){_4cf.splice(i--,1);}else{if(tif.ioCheck(dfd)){_4cf.splice(i--,1);tif.resHandle(dfd);}else{if(dfd.startTime){if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){_4cf.splice(i--,1);var err=new Error("timeout exceeded");err.dojoType="timeout";dfd.errback(err);dfd.cancel();}}}}};if(dojo.config.debugAtAllCosts){func.call(this);}else{try{func.call(this);}catch(e){dfd.errback(e);}}}}if(!_4cf.length){clearInterval(_4ce);_4ce=null;return;}};dojo._ioCancelAll=function(){try{_d.forEach(_4cf,function(i){try{i.dfd.cancel();}catch(e){}});}catch(e){}};if(_d.isIE){_d.addOnWindowUnload(_d._ioCancelAll);}_d._ioWatch=function(dfd,_4d9,_4da,_4db){var args=dfd.ioArgs.args;if(args.timeout){dfd.startTime=(new Date()).getTime();}_4cf.push({dfd:dfd,validCheck:_4d9,ioCheck:_4da,resHandle:_4db});if(!_4ce){_4ce=setInterval(_4d0,50);}if(args.sync){_4d0();}};var _4dd="application/x-www-form-urlencoded";var _4de=function(dfd){return dfd.ioArgs.xhr.readyState;};var _4e0=function(dfd){return 4==dfd.ioArgs.xhr.readyState;};var _4e2=function(dfd){var xhr=dfd.ioArgs.xhr;if(_d._isDocumentOk(xhr)){dfd.callback(dfd);}else{var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);err.status=xhr.status;err.responseText=xhr.responseText;dfd.errback(err);}};dojo._ioAddQueryToUrl=function(_4e6){if(_4e6.query.length){_4e6.url+=(_4e6.url.indexOf("?")==-1?"?":"&")+_4e6.query;_4e6.query=null;}};dojo.xhr=function(_4e7,args,_4e9){var dfd=_d._ioSetArgs(args,_4c3,_4c8,_4cb);dfd.ioArgs.xhr=_d._xhrObj(dfd.ioArgs.args);if(_4e9){if("postData" in args){dfd.ioArgs.query=args.postData;}else{if("putData" in args){dfd.ioArgs.query=args.putData;}}}else{_d._ioAddQueryToUrl(dfd.ioArgs);}var _4eb=dfd.ioArgs;var xhr=_4eb.xhr;xhr.open(_4e7,_4eb.url,args.sync!==true,args.user||undefined,args.password||undefined);if(args.headers){for(var hdr in args.headers){if(hdr.toLowerCase()==="content-type"&&!args.contentType){args.contentType=args.headers[hdr];}else{xhr.setRequestHeader(hdr,args.headers[hdr]);}}}xhr.setRequestHeader("Content-Type",args.contentType||_4dd);if(!args.headers||!args.headers["X-Requested-With"]){xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");}if(dojo.config.debugAtAllCosts){xhr.send(_4eb.query);}else{try{xhr.send(_4eb.query);}catch(e){dfd.ioArgs.error=e;dfd.cancel();}}_d._ioWatch(dfd,_4de,_4e0,_4e2);xhr=null;return dfd;};dojo.xhrGet=function(args){return _d.xhr("GET",args);};dojo.rawXhrPost=dojo.xhrPost=function(args){return _d.xhr("POST",args,true);};dojo.rawXhrPut=dojo.xhrPut=function(args){return _d.xhr("PUT",args,true);};dojo.xhrDelete=function(args){return _d.xhr("DELETE",args);};})();}if(!dojo._hasResource["dojo._base.fx"]){dojo._hasResource["dojo._base.fx"]=true;dojo.provide("dojo._base.fx");(function(){var d=dojo;var _4f3=d.mixin;dojo._Line=function(_4f4,end){this.start=_4f4;this.end=end;};dojo._Line.prototype.getValue=function(n){return ((this.end-this.start)*n)+this.start;};d.declare("dojo._Animation",null,{constructor:function(args){_4f3(this,args);if(d.isArray(this.curve)){this.curve=new d._Line(this.curve[0],this.curve[1]);}},duration:350,repeat:0,rate:10,_percent:0,_startRepeatCount:0,_fire:function(evt,args){if(this[evt]){if(dojo.config.debugAtAllCosts){this[evt].apply(this,args||[]);}else{try{this[evt].apply(this,args||[]);}catch(e){console.error("exception in animation handler for:",evt);console.error(e);}}}return this;},play:function(_4fa,_4fb){var _t=this;if(_t._delayTimer){_t._clearTimer();}if(_4fb){_t._stopTimer();_t._active=_t._paused=false;_t._percent=0;}else{if(_t._active&&!_t._paused){return _t;}}_t._fire("beforeBegin");var de=_4fa||_t.delay,_p=dojo.hitch(_t,"_play",_4fb);if(de>0){_t._delayTimer=setTimeout(_p,de);return _t;}_p();return _t;},_play:function(_4ff){var _t=this;if(_t._delayTimer){_t._clearTimer();}_t._startTime=new Date().valueOf();if(_t._paused){_t._startTime-=_t.duration*_t._percent;}_t._endTime=_t._startTime+_t.duration;_t._active=true;_t._paused=false;var _501=_t.curve.getValue(_t._percent);if(!_t._percent){if(!_t._startRepeatCount){_t._startRepeatCount=_t.repeat;}_t._fire("onBegin",[_501]);}_t._fire("onPlay",[_501]);_t._cycle();return _t;},pause:function(){var _t=this;if(_t._delayTimer){_t._clearTimer();}_t._stopTimer();if(!_t._active){return _t;}_t._paused=true;_t._fire("onPause",[_t.curve.getValue(_t._percent)]);return _t;},gotoPercent:function(_503,_504){var _t=this;_t._stopTimer();_t._active=_t._paused=true;_t._percent=_503;if(_504){_t.play();}return _t;},stop:function(_506){var _t=this;if(_t._delayTimer){_t._clearTimer();}if(!_t._timer){return _t;}_t._stopTimer();if(_506){_t._percent=1;}_t._fire("onStop",[_t.curve.getValue(_t._percent)]);_t._active=_t._paused=false;return _t;},status:function(){if(this._active){return this._paused?"paused":"playing";}return "stopped";},_cycle:function(){var _t=this;if(_t._active){var curr=new Date().valueOf();var step=(curr-_t._startTime)/(_t._endTime-_t._startTime);if(step>=1){step=1;}_t._percent=step;if(_t.easing){step=_t.easing(step);}_t._fire("onAnimate",[_t.curve.getValue(step)]);if(_t._percent<1){_t._startTimer();}else{_t._active=false;if(_t.repeat>0){_t.repeat--;_t.play(null,true);}else{if(_t.repeat==-1){_t.play(null,true);}else{if(_t._startRepeatCount){_t.repeat=_t._startRepeatCount;_t._startRepeatCount=0;}}}_t._percent=0;_t._fire("onEnd");_t._stopTimer();}}return _t;},_clearTimer:function(){clearTimeout(this._delayTimer);delete this._delayTimer;}});var ctr=0,_50c=[],_50d=null,_50e={run:function(){}};dojo._Animation.prototype._startTimer=function(){if(!this._timer){this._timer=d.connect(_50e,"run",this,"_cycle");ctr++;}if(!_50d){_50d=setInterval(d.hitch(_50e,"run"),this.rate);}};dojo._Animation.prototype._stopTimer=function(){if(this._timer){d.disconnect(this._timer);this._timer=null;ctr--;}if(ctr<=0){clearInterval(_50d);_50d=null;ctr=0;}};var _50f=d.isIE?function(node){var ns=node.style;if(!ns.width.length&&d.style(node,"width")=="auto"){ns.width="auto";}}:function(){};dojo._fade=function(args){args.node=d.byId(args.node);var _513=_4f3({properties:{}},args),_514=(_513.properties.opacity={});_514.start=!("start" in _513)?function(){return +d.style(_513.node,"opacity")||0;}:_513.start;_514.end=_513.end;var anim=d.animateProperty(_513);d.connect(anim,"beforeBegin",d.partial(_50f,_513.node));return anim;};dojo.fadeIn=function(args){return d._fade(_4f3({end:1},args));};dojo.fadeOut=function(args){return d._fade(_4f3({end:0},args));};dojo._defaultEasing=function(n){return 0.5+((Math.sin((n+1.5)*Math.PI))/2);};var _519=function(_51a){this._properties=_51a;for(var p in _51a){var prop=_51a[p];if(prop.start instanceof d.Color){prop.tempColor=new d.Color();}}};_519.prototype.getValue=function(r){var ret={};for(var p in this._properties){var prop=this._properties[p],_521=prop.start;if(_521 instanceof d.Color){ret[p]=d.blendColors(_521,prop.end,r,prop.tempColor).toCss();}else{if(!d.isArray(_521)){ret[p]=((prop.end-_521)*r)+_521+(p!="opacity"?prop.units||"px":0);}}}return ret;};dojo.animateProperty=function(args){args.node=d.byId(args.node);if(!args.easing){args.easing=d._defaultEasing;}var anim=new d._Animation(args);d.connect(anim,"beforeBegin",anim,function(){var pm={};for(var p in this.properties){if(p=="width"||p=="height"){this.node.display="block";}var prop=this.properties[p];prop=pm[p]=_4f3({},(d.isObject(prop)?prop:{end:prop}));if(d.isFunction(prop.start)){prop.start=prop.start();}if(d.isFunction(prop.end)){prop.end=prop.end();}var _527=(p.toLowerCase().indexOf("color")>=0);function _528(node,p){var v={height:node.offsetHeight,width:node.offsetWidth}[p];if(v!==undefined){return v;}v=d.style(node,p);return (p=="opacity")?+v:(_527?v:parseFloat(v));};if(!("end" in prop)){prop.end=_528(this.node,p);}else{if(!("start" in prop)){prop.start=_528(this.node,p);}}if(_527){prop.start=new d.Color(prop.start);prop.end=new d.Color(prop.end);}else{prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);}}this.curve=new _519(pm);});d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));return anim;};dojo.anim=function(node,_52d,_52e,_52f,_530,_531){return d.animateProperty({node:node,duration:_52e||d._Animation.prototype.duration,properties:_52d,easing:_52f,onEnd:_530}).play(_531||0);};})();}if(!dojo._hasResource["dojo._base.browser"]){dojo._hasResource["dojo._base.browser"]=true;dojo.provide("dojo._base.browser");dojo.forEach(dojo.config.require,function(i){dojo["require"](i);});}if(dojo.config.afterOnLoad&&dojo.isBrowser){window.setTimeout(dojo._loadInit,1000);}})();
/*
	Copyright (c) 2004-2009, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

/*
	This is a compiled version of Dojo, built for deployment and not for
	development. To get an editable version, please visit:

		http://dojotoolkit.org

	for documentation and information on getting the source.
*/

if(!dojo._hasResource["dojox.json.schema"]){dojo._hasResource["dojox.json.schema"]=true;dojo.provide("dojox.json.schema");dojox.json.schema.validate=function(_1,_2){return this._validate(_1,_2,false);};dojox.json.schema.checkPropertyChange=function(_3,_4){return this._validate(_3,_4,true);};dojox.json.schema.mustBeValid=function(_5){if(!_5.valid){throw new Error(dojo.map(_5.errors,function(_6){return _6.property+" "+_6.message;}).join(","));}};dojox.json.schema._validate=function(_7,_8,_9){var _a=[];function _b(_c,_d,_e,i){if(typeof _d!="object"){return null;}_e+=_e?typeof i=="number"?"["+i+"]":typeof i=="undefined"?"":"."+i:i;function _10(_11){_a.push({property:_e,message:_11});};if(_9&&_d.readonly){_10("is a readonly field, it can not be changed");}if(_d instanceof Array){if(!(_c instanceof Array)){return [{property:_e,message:"An array tuple is required"}];}for(i=0;i<_d.length;i++){_a.concat(_b(_c[i],_d[i],_e,i));}return _a;}if(_d["extends"]){_b(_c,_d["extends"],_e,i);}function _12(_13,_14){if(_13){if(typeof _13=="string"&&_13!="any"&&(_13=="null"?_14!==null:typeof _14!=_13)&&!(_14 instanceof Array&&_13=="array")&&!(_13=="integer"&&_14%1===0)){return [{property:_e,message:(typeof _14)+" value found, but a "+_13+" is required"}];}if(_13 instanceof Array){var _15=[];for(var j=0;j<_13.length;j++){if(!(_15=_12(_13[j],_14)).length){break;}}if(_15.length){return _15;}}else{if(typeof _13=="object"){_b(_14,_13,_e);}}}return [];};if(_c!==null){if(_c===undefined){if(!_d.optional){_10("is missing and it is not optional");}}else{_a=_a.concat(_12(_d.type,_c));if(_d.disallow&&!_12(_d.disallow,_c).length){_10(" disallowed value was matched");}if(_c instanceof Array){if(_d.items){for(i=0,l=_c.length;i<l;i++){_a.concat(_b(_c[i],_d.items,_e,i));}}if(_d.minItems&&_c.length<_d.minItems){_10("There must be a minimum of "+_d.minItems+" in the array");}if(_d.maxItems&&_c.length>_d.maxItems){_10("There must be a maximum of "+_d.maxItems+" in the array");}}else{if(_d.properties&&typeof _c=="object"){_a.concat(_17(_c,_d.properties,_e,_d.additionalProperties));}}if(_d.pattern&&typeof _c=="string"&&!_c.match(_d.pattern)){_10("does not match the regex pattern "+_d.pattern);}if(_d.maxLength&&typeof _c=="string"&&_c.length>_d.maxLength){_10("may only be "+_d.maxLength+" characters long");}if(_d.minLength&&typeof _c=="string"&&_c.length<_d.minLength){_10("must be at least "+_d.minLength+" characters long");}if(typeof _d.minimum!==undefined&&typeof _c==typeof _d.minimum&&_d.minimum>_c){_10("must have a minimum value of "+_d.minimum);}if(typeof _d.maximum!==undefined&&typeof _c==typeof _d.maximum&&_d.maximum<_c){_10("must have a maximum value of "+_d.maximum);}if(_d["enum"]){var _18=_d["enum"];l=_18.length;var _19;for(var j=0;j<l;j++){if(_18[j]===_c){_19=1;break;}}if(!_19){_10("does not have a value in the enumeration "+_18.join(", "));}}if(typeof _d.maxDecimal=="number"&&(_c*10^_d.maxDecimal)%1){_10("may only have "+_d.maxDecimal+" digits of decimal places");}}}return null;};function _17(_1b,_1c,_1d,_1e){if(typeof _1c=="object"){if(typeof _1b!="object"||_1b instanceof Array){_a.push({property:_1d,message:"an object is required"});}for(var i in _1c){if(_1c.hasOwnProperty(i)){var _20=_1b[i];var _21=_1c[i];_b(_20,_21,_1d,i);}}}for(i in _1b){if(_1b.hasOwnProperty(i)&&(i.charAt(0)!="_"||i.charAt(0)!="_")&&_1c&&!_1c[i]&&_1e===false){_a.push({property:_1d,message:(typeof _20)+"The property "+i+" is not defined in the schema and the schema does not allow additional properties"});}var _22=_1c&&_1c[i]&&_1c[i].requires;if(_22&&!(_22 in _1b)){_a.push({property:_1d,message:"the presence of the property "+i+" requires that "+_22+" also be present"});}_20=_1b[i];if(_1c&&typeof _1c=="object"&&!(i in _1c)){_b(_20,_1e,_1d,i);}if(!_9&&_20&&_20.$schema){_a=_a.concat(_b(_20,_20.$schema,_1d,i));}}return _a;};if(_8){_b(_7,_8,"","");}if(!_9&&_7.$schema){_b(_7,_7.$schema,"","");}return {valid:!_a.length,errors:_a};};}if(!dojo._hasResource["dojo.date.stamp"]){dojo._hasResource["dojo.date.stamp"]=true;dojo.provide("dojo.date.stamp");dojo.date.stamp.fromISOString=function(_23,_24){if(!dojo.date.stamp._isoRegExp){dojo.date.stamp._isoRegExp=/^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;}var _25=dojo.date.stamp._isoRegExp.exec(_23);var _26=null;if(_25){_25.shift();if(_25[1]){_25[1]--;}if(_25[6]){_25[6]*=1000;}if(_24){_24=new Date(_24);dojo.map(["FullYear","Month","Date","Hours","Minutes","Seconds","Milliseconds"],function(_27){return _24["get"+_27]();}).forEach(function(_28,_29){if(_25[_29]===undefined){_25[_29]=_28;}});}_26=new Date(_25[0]||1970,_25[1]||0,_25[2]||1,_25[3]||0,_25[4]||0,_25[5]||0,_25[6]||0);var _2a=0;var _2b=_25[7]&&_25[7].charAt(0);if(_2b!="Z"){_2a=((_25[8]||0)*60)+(Number(_25[9])||0);if(_2b!="-"){_2a*=-1;}}if(_2b){_2a-=_26.getTimezoneOffset();}if(_2a){_26.setTime(_26.getTime()+_2a*60000);}}return _26;};dojo.date.stamp.toISOString=function(_2c,_2d){var _=function(n){return (n<10)?"0"+n:n;};_2d=_2d||{};var _30=[];var _31=_2d.zulu?"getUTC":"get";var _32="";if(_2d.selector!="time"){var _33=_2c[_31+"FullYear"]();_32=["0000".substr((_33+"").length)+_33,_(_2c[_31+"Month"]()+1),_(_2c[_31+"Date"]())].join("-");}_30.push(_32);if(_2d.selector!="date"){var _34=[_(_2c[_31+"Hours"]()),_(_2c[_31+"Minutes"]()),_(_2c[_31+"Seconds"]())].join(":");var _35=_2c[_31+"Milliseconds"]();if(_2d.milliseconds){_34+="."+(_35<100?"0":"")+_(_35);}if(_2d.zulu){_34+="Z";}else{if(_2d.selector!="time"){var _36=_2c.getTimezoneOffset();var _37=Math.abs(_36);_34+=(_36>0?"-":"+")+_(Math.floor(_37/60))+":"+_(_37%60);}}_30.push(_34);}return _30.join("T");};}if(!dojo._hasResource["dojox.json.ref"]){dojo._hasResource["dojox.json.ref"]=true;dojo.provide("dojox.json.ref");dojox.json.ref={resolveJson:function(_38,_39){_39=_39||{};var _3a=_39.idAttribute||"id";var _3b=_39.idPrefix||"";var _3c=_39.assignAbsoluteIds;var _3d=_39.index||{};var _3e=_39.timeStamps;var ref,_40=[];var _41=/^(.*\/)?(\w+:\/\/)|[^\/\.]+\/\.\.\/|^.*\/(\/)/;var _42=this._addProp;var F=function(){};function _44(it,_46,_47,_48,_49){var _4a,val,id=_3a in it?it[_3a]:_47;if(id!==undefined){id=(_3b+id).replace(_41,"$2$3");}var _4d=_49||it;if(id!==undefined){if(_3c){it.__id=id;}if(_39.schemas&&(!(it instanceof Array))&&(val=id.match(/^(.+\/)[^\.\[]*$/))){_48=_39.schemas[val[1]];}if(_3d[id]&&((it instanceof Array)==(_3d[id] instanceof Array))){_4d=_3d[id];delete _4d.$ref;_4a=true;}else{var _4e=_48&&_48.prototype;if(_4e){F.prototype=_4e;_4d=new F();}}_3d[id]=_4d;if(_3e){_3e[id]=_39.time;}}var _4f=_48&&_48.properties;var _50=it.length;for(var i in it){if(i==_50){break;}if(it.hasOwnProperty(i)){val=it[i];var _52=_4f&&_4f[i];if(_52&&_52.format=="date-time"&&typeof val=="string"){val=dojo.date.stamp.fromISOString(val);}else{if((typeof val=="object")&&val&&!(val instanceof Date)){ref=val.$ref;if(ref){delete it[i];var _53=ref.replace(/(#)([^\.\[])/,"$1.$2").match(/(^([^\[]*\/)?[^#\.\[]*)#?([\.\[].*)?/);if((ref=(_53[1]=="$"||_53[1]=="this"||_53[1]=="")?_38:_3d[(_3b+_53[1]).replace(_41,"$2$3")])){if(_53[3]){_53[3].replace(/(\[([^\]]+)\])|(\.?([^\.\[]+))/g,function(t,a,b,c,d){ref=ref&&ref[b?b.replace(/[\"\'\\]/,""):d];});}}if(ref){val=ref;}else{if(!_46){var _59;if(!_59){_40.push(_4d);}_59=true;}else{val=_44(val,false,val.$ref,_52);val._loadObject=_39.loader;}}}else{if(!_46){val=_44(val,_40==it,id&&_42(id,i),_52,_4d!=it&&typeof _4d[i]=="object"&&_4d[i]);}}}}it[i]=val;if(_4d!=it&&!_4d.__isDirty){var old=_4d[i];_4d[i]=val;if(_4a&&val!==old&&!_4d._loadObject&&!(val instanceof Date&&old instanceof Date&&val.getTime()==old.getTime())&&!(typeof val=="function"&&typeof old=="function"&&val.toString()==old.toString())&&_3d.onUpdate){_3d.onUpdate(_4d,i,old,val);}}}}if(_4a){for(i in _4d){if(!_4d.__isDirty&&_4d.hasOwnProperty(i)&&!it.hasOwnProperty(i)&&i!="__id"&&i!="__clientId"&&!(_4d instanceof Array&&isNaN(i))){if(_3d.onUpdate&&i!="_loadObject"&&i!="_idAttr"){_3d.onUpdate(_4d,i,_4d[i],undefined);}delete _4d[i];while(_4d instanceof Array&&_4d.length&&_4d[_4d.length-1]===undefined){_4d.length--;}}}}else{if(_3d.onLoad){_3d.onLoad(_4d);}}return _4d;};if(_38&&typeof _38=="object"){_38=_44(_38,false,_39.defaultId);_44(_40,false);}return _38;},fromJson:function(str,_5c){function ref(_5e){return {$ref:_5e};};try{var _5f=eval("("+str+")");}catch(e){throw new SyntaxError("Invalid JSON string: "+e.message+" parsing: "+str);}if(_5f){return this.resolveJson(_5f,_5c);}return _5f;},toJson:function(it,_61,_62,_63){var _64=this._useRefs;var _65=this._addProp;_62=_62||"";var _66={};var _67={};function _68(it,_6a,_6b){if(typeof it=="object"&&it){var _6c;if(it instanceof Date){return "\""+dojo.date.stamp.toISOString(it,{zulu:true})+"\"";}var id=it.__id;if(id){if(_6a!="#"&&((_64&&!id.match(/#/))||_66[id])){var ref=id;if(id.charAt(0)!="#"){if(it.__clientId==id){ref="cid:"+id;}else{if(id.substring(0,_62.length)==_62){ref=id.substring(_62.length);}else{ref=id;}}}return _68({$ref:ref},"#");}_6a=id;}else{it.__id=_6a;_67[_6a]=it;}_66[_6a]=it;_6b=_6b||"";var _6f=_61?_6b+dojo.toJsonIndentStr:"";var _70=_61?"\n":"";var sep=_61?" ":"";if(it instanceof Array){var res=dojo.map(it,function(obj,i){var val=_68(obj,_65(_6a,i),_6f);if(typeof val!="string"){val="undefined";}return _70+_6f+val;});return "["+res.join(","+sep)+_70+_6b+"]";}var _76=[];for(var i in it){if(it.hasOwnProperty(i)){var _78;if(typeof i=="number"){_78="\""+i+"\"";}else{if(typeof i=="string"&&(i.charAt(0)!="_"||i.charAt(1)!="_")){_78=dojo._escapeString(i);}else{continue;}}var val=_68(it[i],_65(_6a,i),_6f);if(typeof val!="string"){continue;}_76.push(_70+_6f+_78+":"+sep+val);}}return "{"+_76.join(","+sep)+_70+_6b+"}";}else{if(typeof it=="function"&&dojox.json.ref.serializeFunctions){return it.toString();}}return dojo.toJson(it);};var _7a=_68(it,"#","");if(!_63){for(var i in _67){delete _67[i].__id;}}return _7a;},_addProp:function(id,_7d){return id+(id.match(/#/)?id.length==1?"":".":"#")+_7d;},_useRefs:false,serializeFunctions:false};}if(!dojo._hasResource["dojox.highlight._base"]){dojo._hasResource["dojox.highlight._base"]=true;dojo.provide("dojox.highlight._base");(function(){var dh=dojox.highlight,_7f="\\b(0x[A-Za-z0-9]+|\\d+(\\.\\d+)?)";dh.constants={IDENT_RE:"[a-zA-Z][a-zA-Z0-9_]*",UNDERSCORE_IDENT_RE:"[a-zA-Z_][a-zA-Z0-9_]*",NUMBER_RE:"\\b\\d+(\\.\\d+)?",C_NUMBER_RE:_7f,APOS_STRING_MODE:{className:"string",begin:"'",end:"'",illegal:"\\n",contains:["escape"],relevance:0},QUOTE_STRING_MODE:{className:"string",begin:"\"",end:"\"",illegal:"\\n",contains:["escape"],relevance:0},BACKSLASH_ESCAPE:{className:"escape",begin:"\\\\.",end:"^",relevance:0},C_LINE_COMMENT_MODE:{className:"comment",begin:"//",end:"$",relevance:0},C_BLOCK_COMMENT_MODE:{className:"comment",begin:"/\\*",end:"\\*/"},HASH_COMMENT_MODE:{className:"comment",begin:"#",end:"$"},C_NUMBER_MODE:{className:"number",begin:_7f,end:"^",relevance:0}};function esc(_81){return _81.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;");};function _82(_83){return dojo.every(_83.childNodes,function(_84){return _84.nodeType==3||String(_84.nodeName).toLowerCase()=="br";});};function _85(_86){var _87=[];dojo.forEach(_86.childNodes,function(_88){if(_88.nodeType==3){_87.push(_88.nodeValue);}else{if(String(_88.nodeName).toLowerCase()=="br"){_87.push("\n");}else{throw "Complex markup";}}});return _87.join("");};function _89(_8a){if(!_8a.keywordGroups){for(var key in _8a.keywords){var kw=_8a.keywords[key];if(kw instanceof Object){_8a.keywordGroups=_8a.keywords;}else{_8a.keywordGroups={keyword:_8a.keywords};}break;}}};function _8d(_8e){if(_8e.defaultMode&&_8e.modes){_89(_8e.defaultMode);dojo.forEach(_8e.modes,_89);}};var _8f=function(_90,_91){this.langName=_90;this.lang=dh.languages[_90];this.modes=[this.lang.defaultMode];this.relevance=0;this.keywordCount=0;this.result=[];if(!this.lang.defaultMode.illegalRe){this.buildRes();_8d(this.lang);}try{this.highlight(_91);this.result=this.result.join("");}catch(e){if(e=="Illegal"){this.relevance=0;this.keywordCount=0;this.partialResult=this.result.join("");this.result=esc(_91);}else{throw e;}}};dojo.extend(_8f,{buildRes:function(){dojo.forEach(this.lang.modes,function(_92){if(_92.begin){_92.beginRe=this.langRe("^"+_92.begin);}if(_92.end){_92.endRe=this.langRe("^"+_92.end);}if(_92.illegal){_92.illegalRe=this.langRe("^(?:"+_92.illegal+")");}},this);this.lang.defaultMode.illegalRe=this.langRe("^(?:"+this.lang.defaultMode.illegal+")");},subMode:function(_93){var _94=this.modes[this.modes.length-1].contains;if(_94){var _95=this.lang.modes;for(var i=0;i<_94.length;++i){var _97=_94[i];for(var j=0;j<_95.length;++j){var _99=_95[j];if(_99.className==_97&&_99.beginRe.test(_93)){return _99;}}}}return null;},endOfMode:function(_9a){for(var i=this.modes.length-1;i>=0;--i){var _9c=this.modes[i];if(_9c.end&&_9c.endRe.test(_9a)){return this.modes.length-i;}if(!_9c.endsWithParent){break;}}return 0;},isIllegal:function(_9d){var _9e=this.modes[this.modes.length-1].illegalRe;return _9e&&_9e.test(_9d);},langRe:function(_9f,_a0){var _a1="m"+(this.lang.case_insensitive?"i":"")+(_a0?"g":"");return new RegExp(_9f,_a1);},buildTerminators:function(){var _a2=this.modes[this.modes.length-1],_a3={};if(_a2.contains){dojo.forEach(this.lang.modes,function(_a4){if(dojo.indexOf(_a2.contains,_a4.className)>=0){_a3[_a4.begin]=1;}});}for(var i=this.modes.length-1;i>=0;--i){var m=this.modes[i];if(m.end){_a3[m.end]=1;}if(!m.endsWithParent){break;}}if(_a2.illegal){_a3[_a2.illegal]=1;}var t=[];for(i in _a3){t.push(i);}_a2.terminatorsRe=this.langRe("("+t.join("|")+")");},eatModeChunk:function(_a8,_a9){var _aa=this.modes[this.modes.length-1];if(!_aa.terminatorsRe){this.buildTerminators();}_a8=_a8.substr(_a9);var _ab=_aa.terminatorsRe.exec(_a8);if(!_ab){return {buffer:_a8,lexeme:"",end:true};}return {buffer:_ab.index?_a8.substr(0,_ab.index):"",lexeme:_ab[0],end:false};},keywordMatch:function(_ac,_ad){var _ae=_ad[0];if(this.lang.case_insensitive){_ae=_ae.toLowerCase();}for(var _af in _ac.keywordGroups){if(_ae in _ac.keywordGroups[_af]){return _af;}}return "";},buildLexemes:function(_b0){var _b1={};dojo.forEach(_b0.lexems,function(_b2){_b1[_b2]=1;});var t=[];for(var i in _b1){t.push(i);}_b0.lexemsRe=this.langRe("("+t.join("|")+")",true);},processKeywords:function(_b5){var _b6=this.modes[this.modes.length-1];if(!_b6.keywords||!_b6.lexems){return esc(_b5);}if(!_b6.lexemsRe){this.buildLexemes(_b6);}_b6.lexemsRe.lastIndex=0;var _b7=[],_b8=0,_b9=_b6.lexemsRe.exec(_b5);while(_b9){_b7.push(esc(_b5.substr(_b8,_b9.index-_b8)));var _ba=this.keywordMatch(_b6,_b9);if(_ba){++this.keywordCount;_b7.push("<span class=\""+_ba+"\">"+esc(_b9[0])+"</span>");}else{_b7.push(esc(_b9[0]));}_b8=_b6.lexemsRe.lastIndex;_b9=_b6.lexemsRe.exec(_b5);}_b7.push(esc(_b5.substr(_b8,_b5.length-_b8)));return _b7.join("");},processModeInfo:function(_bb,_bc,end){var _be=this.modes[this.modes.length-1];if(end){this.result.push(this.processKeywords(_be.buffer+_bb));return;}if(this.isIllegal(_bc)){throw "Illegal";}var _bf=this.subMode(_bc);if(_bf){_be.buffer+=_bb;this.result.push(this.processKeywords(_be.buffer));if(_bf.excludeBegin){this.result.push(_bc+"<span class=\""+_bf.className+"\">");_bf.buffer="";}else{this.result.push("<span class=\""+_bf.className+"\">");_bf.buffer=_bc;}this.modes.push(_bf);this.relevance+=typeof _bf.relevance=="number"?_bf.relevance:1;return;}var _c0=this.endOfMode(_bc);if(_c0){_be.buffer+=_bb;if(_be.excludeEnd){this.result.push(this.processKeywords(_be.buffer)+"</span>"+_bc);}else{this.result.push(this.processKeywords(_be.buffer+_bc)+"</span>");}while(_c0>1){this.result.push("</span>");--_c0;this.modes.pop();}this.modes.pop();this.modes[this.modes.length-1].buffer="";return;}},highlight:function(_c1){var _c2=0;this.lang.defaultMode.buffer="";do{var _c3=this.eatModeChunk(_c1,_c2);this.processModeInfo(_c3.buffer,_c3.lexeme,_c3.end);_c2+=_c3.buffer.length+_c3.lexeme.length;}while(!_c3.end);if(this.modes.length>1){throw "Illegal";}}});function _c4(_c5,_c6,_c7){if(String(_c5.tagName).toLowerCase()=="code"&&String(_c5.parentNode.tagName).toLowerCase()=="pre"){var _c8=document.createElement("div"),_c9=_c5.parentNode.parentNode;_c8.innerHTML="<pre><code class=\""+_c6+"\">"+_c7+"</code></pre>";_c9.replaceChild(_c8.firstChild,_c5.parentNode);}else{_c5.className=_c6;_c5.innerHTML=_c7;}};function _ca(_cb,str){var _cd=new _8f(_cb,str);return {result:_cd.result,langName:_cb,partialResult:_cd.partialResult};};function _ce(_cf,_d0){var _d1=_ca(_d0,_85(_cf));_c4(_cf,_cf.className,_d1.result);};function _d2(str){var _d4="",_d5="",_d6=2,_d7=str;for(var key in dh.languages){if(!dh.languages[key].defaultMode){continue;}var _d9=new _8f(key,_d7),_da=_d9.keywordCount+_d9.relevance,_db=0;if(!_d4||_da>_db){_db=_da;_d4=_d9.result;_d5=_d9.langName;}}return {result:_d4,langName:_d5};};function _dc(_dd){var _de=_d2(_85(_dd));if(_de.result){_c4(_dd,_de.langName,_de.result);}};dojox.highlight.processString=function(str,_e0){return _e0?_ca(_e0,str):_d2(str);};dojox.highlight.init=function(_e1){_e1=dojo.byId(_e1);if(dojo.hasClass(_e1,"no-highlight")){return;}if(!_82(_e1)){return;}var _e2=_e1.className.split(/\s+/),_e3=dojo.some(_e2,function(_e4){if(_e4.charAt(0)!="_"&&dh.languages[_e4]){_ce(_e1,_e4);return true;}return false;});if(!_e3){_dc(_e1);}};dh.Code=function(p,n){dh.init(n);};})();}if(!dojo._hasResource["dojox.highlight"]){dojo._hasResource["dojox.highlight"]=true;dojo.provide("dojox.highlight");}if(!dojo._hasResource["dojox.highlight.languages.javascript"]){dojo._hasResource["dojox.highlight.languages.javascript"]=true;dojo.provide("dojox.highlight.languages.javascript");(function(){var dh=dojox.highlight,dhc=dh.constants;dh.languages.javascript={defaultMode:{lexems:[dhc.UNDERSCORE_IDENT_RE],contains:["string","comment","number","regexp","function"],keywords:{"keyword":{"in":1,"if":1,"for":1,"while":1,"finally":1,"var":1,"new":1,"function":1,"do":1,"return":1,"void":1,"else":1,"break":1,"catch":1,"instanceof":1,"with":1,"throw":1,"case":1,"default":1,"try":1,"this":1,"switch":1,"continue":1,"typeof":1,"delete":1},"literal":{"true":1,"false":1,"null":1}}},modes:[dhc.C_LINE_COMMENT_MODE,dhc.C_BLOCK_COMMENT_MODE,dhc.C_NUMBER_MODE,dhc.APOS_STRING_MODE,dhc.QUOTE_STRING_MODE,dhc.BACKSLASH_ESCAPE,{className:"regexp",begin:"/.*?[^\\\\/]/[gim]*",end:"^"},{className:"function",begin:"function\\b",end:"{",lexems:[dhc.UNDERSCORE_IDENT_RE],keywords:{"function":1},contains:["title","params"]},{className:"title",begin:dhc.UNDERSCORE_IDENT_RE,end:"^"},{className:"params",begin:"\\(",end:"\\)",contains:["string","comment"]}]};})();}if(!dojo._hasResource["dojo.fx.Toggler"]){dojo._hasResource["dojo.fx.Toggler"]=true;dojo.provide("dojo.fx.Toggler");dojo.declare("dojo.fx.Toggler",null,{constructor:function(_e9){var _t=this;dojo.mixin(_t,_e9);_t.node=_e9.node;_t._showArgs=dojo.mixin({},_e9);_t._showArgs.node=_t.node;_t._showArgs.duration=_t.showDuration;_t.showAnim=_t.showFunc(_t._showArgs);_t._hideArgs=dojo.mixin({},_e9);_t._hideArgs.node=_t.node;_t._hideArgs.duration=_t.hideDuration;_t.hideAnim=_t.hideFunc(_t._hideArgs);dojo.connect(_t.showAnim,"beforeBegin",dojo.hitch(_t.hideAnim,"stop",true));dojo.connect(_t.hideAnim,"beforeBegin",dojo.hitch(_t.showAnim,"stop",true));},node:null,showFunc:dojo.fadeIn,hideFunc:dojo.fadeOut,showDuration:200,hideDuration:200,show:function(_eb){return this.showAnim.play(_eb||0);},hide:function(_ec){return this.hideAnim.play(_ec||0);}});}if(!dojo._hasResource["dojo.fx"]){dojo._hasResource["dojo.fx"]=true;dojo.provide("dojo.fx");(function(){var d=dojo,_ee={_fire:function(evt,_f0){if(this[evt]){this[evt].apply(this,_f0||[]);}return this;}};var _f1=function(_f2){this._index=-1;this._animations=_f2||[];this._current=this._onAnimateCtx=this._onEndCtx=null;this.duration=0;d.forEach(this._animations,function(a){this.duration+=a.duration;if(a.delay){this.duration+=a.delay;}},this);};d.extend(_f1,{_onAnimate:function(){this._fire("onAnimate",arguments);},_onEnd:function(){d.disconnect(this._onAnimateCtx);d.disconnect(this._onEndCtx);this._onAnimateCtx=this._onEndCtx=null;if(this._index+1==this._animations.length){this._fire("onEnd");}else{this._current=this._animations[++this._index];this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");this._current.play(0,true);}},play:function(_f4,_f5){if(!this._current){this._current=this._animations[this._index=0];}if(!_f5&&this._current.status()=="playing"){return this;}var _f6=d.connect(this._current,"beforeBegin",this,function(){this._fire("beforeBegin");}),_f7=d.connect(this._current,"onBegin",this,function(arg){this._fire("onBegin",arguments);}),_f9=d.connect(this._current,"onPlay",this,function(arg){this._fire("onPlay",arguments);d.disconnect(_f6);d.disconnect(_f7);d.disconnect(_f9);});if(this._onAnimateCtx){d.disconnect(this._onAnimateCtx);}this._onAnimateCtx=d.connect(this._current,"onAnimate",this,"_onAnimate");if(this._onEndCtx){d.disconnect(this._onEndCtx);}this._onEndCtx=d.connect(this._current,"onEnd",this,"_onEnd");this._current.play.apply(this._current,arguments);return this;},pause:function(){if(this._current){var e=d.connect(this._current,"onPause",this,function(arg){this._fire("onPause",arguments);d.disconnect(e);});this._current.pause();}return this;},gotoPercent:function(_fd,_fe){this.pause();var _ff=this.duration*_fd;this._current=null;d.some(this._animations,function(a){if(a.duration<=_ff){this._current=a;return true;}_ff-=a.duration;return false;});if(this._current){this._current.gotoPercent(_ff/this._current.duration,_fe);}return this;},stop:function(_101){if(this._current){if(_101){for(;this._index+1<this._animations.length;++this._index){this._animations[this._index].stop(true);}this._current=this._animations[this._index];}var e=d.connect(this._current,"onStop",this,function(arg){this._fire("onStop",arguments);d.disconnect(e);});this._current.stop();}return this;},status:function(){return this._current?this._current.status():"stopped";},destroy:function(){if(this._onAnimateCtx){d.disconnect(this._onAnimateCtx);}if(this._onEndCtx){d.disconnect(this._onEndCtx);}}});d.extend(_f1,_ee);dojo.fx.chain=function(_104){return new _f1(_104);};var _105=function(_106){this._animations=_106||[];this._connects=[];this._finished=0;this.duration=0;d.forEach(_106,function(a){var _108=a.duration;if(a.delay){_108+=a.delay;}if(this.duration<_108){this.duration=_108;}this._connects.push(d.connect(a,"onEnd",this,"_onEnd"));},this);this._pseudoAnimation=new d._Animation({curve:[0,1],duration:this.duration});var self=this;d.forEach(["beforeBegin","onBegin","onPlay","onAnimate","onPause","onStop"],function(evt){self._connects.push(d.connect(self._pseudoAnimation,evt,function(){self._fire(evt,arguments);}));});};d.extend(_105,{_doAction:function(_10b,args){d.forEach(this._animations,function(a){a[_10b].apply(a,args);});return this;},_onEnd:function(){if(++this._finished==this._animations.length){this._fire("onEnd");}},_call:function(_10e,args){var t=this._pseudoAnimation;t[_10e].apply(t,args);},play:function(_111,_112){this._finished=0;this._doAction("play",arguments);this._call("play",arguments);return this;},pause:function(){this._doAction("pause",arguments);this._call("pause",arguments);return this;},gotoPercent:function(_113,_114){var ms=this.duration*_113;d.forEach(this._animations,function(a){a.gotoPercent(a.duration<ms?1:(ms/a.duration),_114);});this._call("gotoPercent",arguments);return this;},stop:function(_117){this._doAction("stop",arguments);this._call("stop",arguments);return this;},status:function(){return this._pseudoAnimation.status();},destroy:function(){d.forEach(this._connects,dojo.disconnect);}});d.extend(_105,_ee);dojo.fx.combine=function(_118){return new _105(_118);};dojo.fx.wipeIn=function(args){args.node=d.byId(args.node);var node=args.node,s=node.style,o;var anim=d.animateProperty(d.mixin({properties:{height:{start:function(){o=s.overflow;s.overflow="hidden";if(s.visibility=="hidden"||s.display=="none"){s.height="1px";s.display="";s.visibility="";return 1;}else{var _11e=d.style(node,"height");return Math.max(_11e,1);}},end:function(){return node.scrollHeight;}}}},args));d.connect(anim,"onEnd",function(){s.height="auto";s.overflow=o;});return anim;};dojo.fx.wipeOut=function(args){var node=args.node=d.byId(args.node),s=node.style,o;var anim=d.animateProperty(d.mixin({properties:{height:{end:1}}},args));d.connect(anim,"beforeBegin",function(){o=s.overflow;s.overflow="hidden";s.display="";});d.connect(anim,"onEnd",function(){s.overflow=o;s.height="auto";s.display="none";});return anim;};dojo.fx.slideTo=function(args){var node=args.node=d.byId(args.node),top=null,left=null;var init=(function(n){return function(){var cs=d.getComputedStyle(n);var pos=cs.position;top=(pos=="absolute"?n.offsetTop:parseInt(cs.top)||0);left=(pos=="absolute"?n.offsetLeft:parseInt(cs.left)||0);if(pos!="absolute"&&pos!="relative"){var ret=d.coords(n,true);top=ret.y;left=ret.x;n.style.position="absolute";n.style.top=top+"px";n.style.left=left+"px";}};})(node);init();var anim=d.animateProperty(d.mixin({properties:{top:args.top||0,left:args.left||0}},args));d.connect(anim,"beforeBegin",anim,init);return anim;};})();}
var HAR={};
(function(){
var _16=[];
this.ns=function(fn){
var ns={};
_16.push(fn,ns);
return ns;
};
this.initialize=function(){
HAR.Rep={};
HAR.Tab={};
HAR.Lib={};
HAR.Page={};
HAR.Service={};
for(var i=0;i<_16.length;i+=2){
var fn=_16[i];
var ns=_16[i+1];
fn.apply(ns);
}
HAR.Lib.dispatch(this.modules,"initialize",[]);
};
this.getVersion=function(){
var _1c=HAR.$("content");
if(_1c){
return _1c.getAttribute("version");
}
};
this.modules=[];
this.registerModule=function(_1d){
this.modules.push(_1d);
};
this.log=function(){
};
this.error=function(){
};
this.exception=function(){
};
this.$=dojo.byId;
this.extend=function copyObject(l,r){
var m={};
extend(m,l);
extend(m,r);
return m;
};
function extend(l,r){
for(var n in r){
l[n]=r[n];
}
}
this.now=function(){
return (new Date()).getTime();
};
var _24="har"+this.now();
this.eventFix=function(_25){
if(_25[_24]==true){
return _25;
}
var _26=_25;
_25={originalEvent:_26};
var _27="altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which".split(" ");
for(var i=_27.length;i;i--){
_25[_27[i]]=_26[_27[i]];
}
_25[_24]=true;
_25.preventDefault=function(){
if(_26.preventDefault){
_26.preventDefault();
}
_26.returnValue=false;
};
_25.stopPropagation=function(){
if(_26.stopPropagation){
_26.stopPropagation();
}
_26.cancelBubble=true;
};
_25.timeStamp=_25.timeStamp||this.now();
if(!_25.target){
_25.target=_25.srcElement||document;
}
if(_25.target.nodeType==3){
_25.target=_25.target.parentNode;
}
if(!_25.relatedTarget&&_25.fromElement){
_25.relatedTarget=_25.fromElement==_25.target?_25.toElement:_25.fromElement;
}
if(_25.pageX==null&&_25.clientX!=null){
var doc=document.documentElement,body=document.body;
_25.pageX=_25.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);
_25.pageY=_25.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0);
}
if(!_25.which&&((_25.charCode||_25.charCode===0)?_25.charCode:_25.keyCode)){
_25.which=_25.charCode||_25.keyCode;
}
if(!_25.metaKey&&_25.ctrlKey){
_25.metaKey=_25.ctrlKey;
}
if(!_25.which&&_25.button){
_25.which=(_25.button&1?1:(_25.button&2?3:(_25.button&4?2:0)));
}
return _25;
};
dojo.addOnLoad(function(){
HAR.initialize();
});
}).apply(HAR);
HAR.ns(function(){
with(HAR){
HAR.Lib=extend({bind:function(){
var args=this.cloneArray(arguments),fn=args.shift(),object=args.shift();
return function(){
return fn.apply(object,HAR.Lib.arrayInsert(HAR.Lib.cloneArray(args),0,arguments));
};
},dispatch:function(_199,name,args){
for(var i=0;_199&&i<_199.length;i++){
var _19d=_199[i];
if(_19d[name]){
try{
_19d[name].apply(_19d,args);
}
catch(exc){
HAR.exception(exc);
}
}
}
},getBody:function(doc){
if(doc.body){
return doc.body;
}
var body=doc.getElementsByTagName("body")[0];
if(body){
return body;
}
return null;
},getOverflowParent:function(_1a0){
for(var _1a1=_1a0.parentNode;_1a1;_1a1=_1a1.offsetParent){
if(_1a1.scrollHeight>_1a1.offsetHeight){
return _1a1;
}
}
},formatSize:function(_1a2){
var _1a3=1;
_1a3=(_1a3>2)?2:_1a3;
_1a3=(_1a3<-1)?-1:_1a3;
if(_1a3==-1){
return _1a2+" B";
}
var a=Math.pow(10,_1a3);
if(_1a2==-1||_1a2==undefined){
return "?";
}else{
if(_1a2==0){
return "0";
}else{
if(_1a2<1024){
return _1a2+" B";
}else{
if(_1a2<(1024*1024)){
return Math.round((_1a2/1024)*a)/a+" KB";
}else{
return Math.round((_1a2/(1024*1024))*a)/a+" MB";
}
}
}
}
},formatTime:function(_1a5){
if(_1a5==-1){
return "-";
}else{
if(_1a5<1000){
return _1a5+"ms";
}else{
if(_1a5<60000){
return (Math.ceil(_1a5/10)/100)+"s";
}else{
return (Math.ceil((_1a5/60000)*100)/100)+"m";
}
}
}
},formatNumber:function(_1a6){
_1a6+="";
var x=_1a6.split(".");
var x1=x[0];
var x2=x.length>1?"."+x[1]:"";
var rgx=/(\d+)(\d{3})/;
while(rgx.test(x1)){
x1=x1.replace(rgx,"$1"+","+"$2");
}
return x1+x2;
},isLeftClick:function(_1ab){
return _1ab.button==0&&this.noKeyModifiers(_1ab);
},noKeyModifiers:function(_1ac){
return !_1ac.ctrlKey&&!_1ac.shiftKey&&!_1ac.altKey&&!_1ac.metaKey;
},getAncestorByClass:function(node,_1ae){
for(var _1af=node;_1af;_1af=_1af.parentNode){
if(this.hasClass(_1af,_1ae)){
return _1af;
}
}
return null;
},getElementByClass:function(node,_1b1){
var args=this.cloneArray(arguments);
args.splice(0,1);
for(var _1b3=node.firstChild;_1b3;_1b3=_1b3.nextSibling){
var _1b4=this.cloneArray(args);
_1b4.unshift(_1b3);
if(this.hasClass.apply(this,_1b4)){
return _1b3;
}else{
var _1b5=this.getElementByClass.apply(this,_1b4);
if(_1b5){
return _1b5;
}
}
}
return null;
},getElementsByClass:function(node,_1b7){
function iteratorHelper(node,_1b9,_1ba){
for(var _1bb=node.firstChild;_1bb;_1bb=_1bb.nextSibling){
var _1bc=HAR.Lib.cloneArray(_1b9);
_1bc.unshift(_1bb);
if(HAR.Lib.hasClass.apply(null,_1bc)){
_1ba.push(_1bb);
}
iteratorHelper(_1bb,_1b9,_1ba);
}
}
var _1bd=[];
var args=this.cloneArray(arguments);
args.shift();
iteratorHelper(node,args,_1bd);
return _1bd;
},getChildByClass:function(node){
for(var i=1;i<arguments.length;++i){
var _1c1=arguments[i];
var _1c2=node.firstChild;
node=null;
for(;_1c2;_1c2=_1c2.nextSibling){
if(this.hasClass(_1c2,_1c1)){
node=_1c2;
break;
}
}
}
return node;
},hasClass:function(node,name){
if(!node||node.nodeType!=1){
return false;
}else{
for(var i=1;i<arguments.length;++i){
var name=arguments[i];
var _1c6=node.className;
if(!_1c6||_1c6.indexOf(name)==-1){
return false;
}
}
return true;
}
},setClass:function(node,name){
if(node&&!this.hasClass(node,name)){
node.className+=" "+name;
}
},removeClass:function(node,name){
if(node&&node.className){
var _1cb=node.className.indexOf(name);
if(_1cb>=0){
var size=name.length;
node.className=node.className.substr(0,_1cb-1)+node.className.substr(_1cb+size);
}
}
},toggleClass:function(elt,name){
if(this.hasClass(elt,name)){
this.removeClass(elt,name);
return false;
}else{
this.setClass(elt,name);
return true;
}
},cancelEvent:function(_1cf){
var e=HAR.eventFix(_1cf||window.event);
e.stopPropagation();
e.preventDefault();
},cloneArray:function(_1d1,fn){
var _1d3=[];
if(fn){
for(var i=0;i<_1d1.length;++i){
_1d3.push(fn(_1d1[i]));
}
}else{
for(var i=0;i<_1d1.length;++i){
_1d3.push(_1d1[i]);
}
}
return _1d3;
},arrayInsert:function(_1d5,_1d6,_1d7){
for(var i=0;i<_1d7.length;++i){
_1d5.splice(i+_1d6,0,_1d7[i]);
}
return _1d5;
},remove:function(list,item){
for(var i=0;i<list.length;++i){
if(list[i]==item){
list.splice(i,1);
break;
}
}
},getRepObject:function(node){
var _1dd=null;
for(var _1de=node;_1de;_1de=_1de.parentNode){
if(this.hasClass(_1de,"repTarget")){
_1dd=_1de;
}
if(_1de.repObject){
if(!_1dd&&this.hasClass(_1de,"repIgnore")){
break;
}else{
return _1de.repObject;
}
}
}
},getElementPanel:function(_1df){
for(;_1df;_1df=_1df.parentNode){
if(_1df.ownerPanel){
return _1df.ownerPanel;
}
}
},trim:function(text){
return text.replace(/^\s*|\s*$/g,"");
},wrapText:function(text,_1e2){
var _1e3=/[^A-Za-z_$0-9'"-]/;
var html=[];
var _1e5=100;
var _1e6=this.splitLines(text);
for(var i=0;i<_1e6.length;++i){
var line=_1e6[i];
while(line.length>_1e5){
var m=_1e3.exec(line.substr(_1e5,100));
var _1ea=_1e5+(m?m.index:0);
var _1eb=line.substr(0,_1ea);
line=line.substr(_1ea);
if(!_1e2){
html.push("<pre>");
}
html.push(_1e2?_1eb:this.escapeHTML(_1eb));
if(!_1e2){
html.push("</pre>");
}
}
if(!_1e2){
html.push("<pre>");
}
html.push(_1e2?line:this.escapeHTML(line));
if(!_1e2){
html.push("</pre>");
}
}
return html.join(_1e2?"\n":"");
},insertWrappedText:function(text,_1ed,_1ee){
_1ed.innerHTML="<pre>"+this.wrapText(text,_1ee)+"</pre>";
},splitLines:function(text){
var _1f0=/\r\n|\r|\n/;
if(text.split){
return text.split(_1f0);
}else{
var str=text+"";
var _1f2=str.split(_1f0);
return _1f2;
}
},getPrettyDomain:function(url){
var m=/[^:]+:\/{1,3}(www\.)?([^\/]+)/.exec(url);
return m?m[2]:"";
},escapeHTML:function(_1f5){
function replaceChars(ch){
switch(ch){
case "<":
return "&lt;";
case ">":
return "&gt;";
case "&":
return "&amp;";
case "'":
return "&#39;";
case "\"":
return "&quot;";
}
return "?";
}
return String(_1f5).replace(/[<>&"']/g,replaceChars);
},getFileName:function(url){
var _1f8=this.splitURLBase(url);
return _1f8.name;
},getFileExtension:function(url){
if(!url){
return null;
}
var _1fa=url.indexOf("?");
if(_1fa!=-1){
url=url.substr(0,_1fa);
}
var _1fb=url.lastIndexOf(".");
return url.substr(_1fb+1);
},splitURLBase:function(url){
if(this.isDataURL(url)){
return this.splitDataURL(url);
}
return this.splitURLTrue(url);
},isDataURL:function(url){
return (url&&url.substr(0,5)=="data:");
},splitDataURL:function(url){
var mark=url.indexOf(":",3);
if(mark!=4){
return false;
}
var _200=url.indexOf(",",mark+1);
if(_200<mark){
return false;
}
var _201={encodedContent:url.substr(_200+1)};
var _202=url.substr(mark+1,_200);
var _203=_202.split(";");
for(var i=0;i<_203.length;i++){
var nv=_203[i].split("=");
if(nv.length==2){
_201[nv[0]]=nv[1];
}
}
if(_201.hasOwnProperty("fileName")){
var _206=decodeURIComponent(_201["fileName"]);
var _207=this.splitURLTrue(_206);
if(_201.hasOwnProperty("baseLineNumber")){
_201["path"]=_207.path;
_201["line"]=_201["baseLineNumber"];
var hint=decodeURIComponent(_201["encodedContent"].substr(0,200)).replace(/\s*$/,"");
_201["name"]="eval->"+hint;
}else{
_201["name"]=_207.name;
_201["path"]=_207.path;
}
}else{
if(!_201.hasOwnProperty("path")){
_201["path"]="data:";
}
if(!_201.hasOwnProperty("name")){
_201["name"]=decodeURIComponent(_201["encodedContent"].substr(0,200)).replace(/\s*$/,"");
}
}
return _201;
},splitURLTrue:function(url){
var _20a=/:\/{1,3}(.*?)\/([^\/]*?)\/?($|\?.*)/;
var m=_20a.exec(url);
if(!m){
return {name:url,path:url};
}else{
if(!m[2]){
return {path:m[1],name:m[1]};
}else{
return {path:m[1],name:m[2]+m[3]};
}
}
},eraseNode:function(node){
while(node.lastChild){
node.removeChild(node.lastChild);
}
},clearNode:function(node){
node.innerHTML="";
},cloneJSON:function(obj){
if(obj==null||typeof (obj)!="object"){
return obj;
}
try{
var temp=obj.constructor();
for(var key in obj){
temp[key]=cloneJSON(obj[key]);
}
return temp;
}
catch(err){
HAR.log(obj);
}
return null;
},cropString:function(text,_212){
text=text+"";
if(!_212){
var _213=50;
}else{
var _213=_212/2;
}
if(text.length>_212){
return this.escapeNewLines(text.substr(0,_213)+"..."+text.substr(text.length-_213));
}else{
return this.escapeNewLines(text);
}
},escapeNewLines:function(_214){
return _214.replace(/\r/g,"\\r").replace(/\n/g,"\\n");
},parseISO8601:function(text){
var _216=/(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/;
var reg=new RegExp(_216);
var m=text.toString().match(new RegExp(_216));
if(!m){
return null;
}
var date=new Date();
date.setUTCDate(1);
date.setUTCFullYear(parseInt(m[1],10));
date.setUTCMonth(parseInt(m[3],10)-1);
date.setUTCDate(parseInt(m[5],10));
date.setUTCHours(parseInt(m[7],10));
date.setUTCMinutes(parseInt(m[9],10));
date.setUTCSeconds(parseInt(m[11],10));
if(m[12]){
date.setUTCMilliseconds(parseFloat(m[12])*1000);
}else{
date.setUTCMilliseconds(0);
}
if(m[13]!="Z"){
var _21a=(m[15]*60)+parseInt(m[17],10);
_21a*=((m[14]=="-")?-1:1);
date.setTime(date.getTime()-_21a*60*1000);
}
return date.getTime();
},getURLParameter:function(_21b){
var _21c=window.location.search.substring(1);
var vars=_21c.split("&");
for(var i=0;i<vars.length;i++){
var pair=vars[i].split("=");
if(pair[0]==_21b){
return unescape(pair[1]);
}
}
return null;
},fireEvent:function(_220,_221){
if(document.createEvent){
var evt=document.createEvent("Events");
evt.initEvent(_221,true,false);
return !_220.dispatchEvent(evt);
}
},getCookie:function(name){
var _224=document.cookie.split(";");
for(var i=0;i<_224.length;i++){
var _226=_224[i].split("=");
if(this.trim(_226[0])==name){
return _226[1].length?unescape(this.trim(_226[1])):null;
}
}
},setCookie:function(name,_228,_229,path,_22b,_22c){
var _22d=new Date();
_22d.setTime(_22d.getTime());
if(_229){
_229=_229*1000*60*60*24;
}
var _22e=new Date(_22d.getTime()+_229);
document.cookie=name+"="+escape(_228)+(_229?";expires="+_22e.toGMTString():"")+(path?";path="+path:"")+(_22b?";domain="+_22b:"")+(_22c?";secure":"");
},deleteCookie:function(name,path,_231){
if(this.getCookie(name)){
document.cookie=name+"="+(path?";path="+path:"")+(_231?";domain="+_231:"")+";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}
}});
}
});
HAR.ns(function(){
with(Domplate){
HAR.Rep=domplate({className:"",inspectable:true,supportsObject:function(_e0,_e1){
return false;
},inspectObject:function(_e2,_e3){
_e3.chrome.select(_e2);
},browseObject:function(_e4,_e5){
},persistObject:function(_e6,_e7){
},getRealObject:function(_e8,_e9){
return _e8;
},getTitle:function(_ea){
if(dojo.isArray(_ea)){
return "Array";
}
var _eb=safeToString(_ea);
var re=/\[object (.*?)\]/;
var m=re.exec(_eb);
return m?m[1]:_eb;
},getTooltip:function(_ee){
return null;
},getContextMenuItems:function(_ef,_f0,_f1){
return [];
},STR:function(_f2){
return $STR(_f2);
},cropString:function(_f3){
return cropString(_f3);
},toLowerCase:function(_f4){
return _f4?_f4.toLowerCase():"";
},plural:function(n){
return n==1?"":"s";
}});
var _f6=A({"class":"objectLink objectLink-$className",_repObject:"$object"});
var _f7=SPAN({"class":"nodeAttr editGroup"},"&nbsp;",SPAN({"class":"nodeName editable"},"$attr.nodeName"),"=&quot;",SPAN({"class":"nodeValue editable"},"$attr.nodeValue"),"&quot;");
HAR.Rep.Nada=domplate(HAR.Rep,{tag:SPAN(""),className:"nada"});
HAR.Rep.Obj=domplate(HAR.Rep,{tag:_f6(SPAN({"class":"objectTitle"},"$object|getTitle")),propIterator:function(_f8){
if(!_f8){
return [];
}
var _f9=[];
var len=0;
try{
for(var _fb in _f8){
var val;
try{
val=_f8[_fb];
}
catch(exc){
continue;
}
var t=typeof (val);
if(t=="boolean"||t=="number"||(t=="string"&&val)||(t=="object"&&val&&val.toString)){
var _fe=(t=="object")?Obj.getTitle(val):val+"";
len+=_fb.length+_fe.length+1;
if(len<50){
_f9.push({name:_fb,value:_fe});
}else{
break;
}
}
}
}
catch(exc){
}
return _f9;
},className:"object",supportsObject:function(_ff,type){
return true;
}});
function safeToString(ob){
try{
return ob.toString();
}
catch(exc){
return "";
}
}
}
});
/* Downloadify 0.1 (c) 2009 by Douglas Neiner. Licensed under the MIT license */
/* See http://github.com/dcneiner/Downloadify for license and more info */
(function(){Downloadify=window.Downloadify={queue:{},uid:(new Date).getTime(),getTextForSave:function(b){if(b=Downloadify.queue[b])return b.getData();return""},getFileNameForSave:function(b){if(b=Downloadify.queue[b])return b.getFilename();return""},saveComplete:function(b){(b=Downloadify.queue[b])&&b.complete();return true},saveCancel:function(b){(b=Downloadify.queue[b])&&b.cancel();return true},saveError:function(b){(b=Downloadify.queue[b])&&b.error();return true},addToQueue:function(b){Downloadify.queue[b.queue_name]=
b},getUID:function(b){if(b.id=="")b.id="downloadify_"+Downloadify.uid++;return b.id}};Downloadify.create=function(b,c){b=typeof b=="string"?document.getElementById(b):b;return new Downloadify.Container(b,c)};Downloadify.Container=function(b,c){var a=this;a.el=b;a.enabled=true;a.dataCallback=null;a.filenameCallback=null;a.data=null;a.filename=null;function f(){a.options=c;if(!a.options.append)a.el.innerHTML="";a.flashContainer=document.createElement("span");a.el.appendChild(a.flashContainer);a.queue_name=
Downloadify.getUID(a.flashContainer);if(typeof a.options.filename==="function")a.filenameCallback=a.options.filename;else if(a.options.filename)a.filename=a.options.filename;if(typeof a.options.data==="function")a.dataCallback=a.options.data;else if(a.options.data)a.data=a.options.data;var d={queue_name:a.queue_name,width:a.options.width,height:a.options.height},e={allowScriptAccess:"always"},g={id:a.flashContainer.id,name:a.flashContainer.id};if(a.options.enabled===false)a.enabled=false;if(a.options.transparent===
true)e.wmode="transparent";if(a.options.downloadImage)d.downloadImage=a.options.downloadImage;swfobject.embedSWF(a.options.swf,a.flashContainer.id,a.options.width,a.options.height,"10",null,d,e,g);Downloadify.addToQueue(a)}a.enable=function(){var d=document.getElementById(a.flashContainer.id);d.setEnabled(true);a.enabled=true};a.disable=function(){var d=document.getElementById(a.flashContainer.id);d.setEnabled(false);a.enabled=false};a.getData=function(){if(!a.enabled)return"";return a.dataCallback?
a.dataCallback():a.data?a.data:""};a.getFilename=function(){return a.filenameCallback?a.filenameCallback():a.filename?a.filename:""};a.complete=function(){typeof a.options.onComplete==="function"&&a.options.onComplete()};a.cancel=function(){typeof a.options.onCancel==="function"&&a.options.onCancel()};a.error=function(){typeof a.options.onError==="function"&&a.options.onError()};f()};Downloadify.defaultOptions={swf:"media/downloadify.swf",downloadImage:"images/download.png",width:100,height:30,transparent:true,
append:false}})();typeof jQuery!="undefined"&&function(b){b.fn.downloadify=function(c){return this.each(function(){c=b.extend({},Downloadify.defaultOptions,c);var a=Downloadify.create(this,c);b(this).data("Downloadify",a)})}}(jQuery);/* SWFObject v2.1 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var swfobject=function(){var b="undefined",Q="object",n="Shockwave Flash",p="ShockwaveFlash.ShockwaveFlash",P="application/x-shockwave-flash",m="SWFObjectExprInst",j=window,K=document,T=navigator,o=[],N=[],i=[],d=[],J,Z=null,M=null,l=null,e=false,A=false;var h=function(){var v=typeof K.getElementById!=b&&typeof K.getElementsByTagName!=b&&typeof K.createElement!=b,AC=[0,0,0],x=null;if(typeof T.plugins!=b&&typeof T.plugins[n]==Q){x=T.plugins[n].description;if(x&&!(typeof T.mimeTypes!=b&&T.mimeTypes[P]&&!T.mimeTypes[P].enabledPlugin)){x=x.replace(/^.*\s+(\S+\s+\S+$)/,"$1");AC[0]=parseInt(x.replace(/^(.*)\..*$/,"$1"),10);AC[1]=parseInt(x.replace(/^.*\.(.*)\s.*$/,"$1"),10);AC[2]=/r/.test(x)?parseInt(x.replace(/^.*r(.*)$/,"$1"),10):0}}else{if(typeof j.ActiveXObject!=b){var y=null,AB=false;try{y=new ActiveXObject(p+".7")}catch(t){try{y=new ActiveXObject(p+".6");AC=[6,0,21];y.AllowScriptAccess="always"}catch(t){if(AC[0]==6){AB=true}}if(!AB){try{y=new ActiveXObject(p)}catch(t){}}}if(!AB&&y){try{x=y.GetVariable("$version");if(x){x=x.split(" ")[1].split(",");AC=[parseInt(x[0],10),parseInt(x[1],10),parseInt(x[2],10)]}}catch(t){}}}}var AD=T.userAgent.toLowerCase(),r=T.platform.toLowerCase(),AA=/webkit/.test(AD)?parseFloat(AD.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,q=false,z=r?/win/.test(r):/win/.test(AD),w=r?/mac/.test(r):/mac/.test(AD);/*@cc_on q=true;@if(@_win32)z=true;@elif(@_mac)w=true;@end@*/return{w3cdom:v,pv:AC,webkit:AA,ie:q,win:z,mac:w}}();var L=function(){if(!h.w3cdom){return }f(H);if(h.ie&&h.win){try{K.write("<script id=__ie_ondomload defer=true src=//:><\/script>");J=C("__ie_ondomload");if(J){I(J,"onreadystatechange",S)}}catch(q){}}if(h.webkit&&typeof K.readyState!=b){Z=setInterval(function(){if(/loaded|complete/.test(K.readyState)){E()}},10)}if(typeof K.addEventListener!=b){K.addEventListener("DOMContentLoaded",E,null)}R(E)}();function S(){if(J.readyState=="complete"){J.parentNode.removeChild(J);E()}}function E(){if(e){return }if(h.ie&&h.win){var v=a("span");try{var u=K.getElementsByTagName("body")[0].appendChild(v);u.parentNode.removeChild(u)}catch(w){return }}e=true;if(Z){clearInterval(Z);Z=null}var q=o.length;for(var r=0;r<q;r++){o[r]()}}function f(q){if(e){q()}else{o[o.length]=q}}function R(r){if(typeof j.addEventListener!=b){j.addEventListener("load",r,false)}else{if(typeof K.addEventListener!=b){K.addEventListener("load",r,false)}else{if(typeof j.attachEvent!=b){I(j,"onload",r)}else{if(typeof j.onload=="function"){var q=j.onload;j.onload=function(){q();r()}}else{j.onload=r}}}}}function H(){var t=N.length;for(var q=0;q<t;q++){var u=N[q].id;if(h.pv[0]>0){var r=C(u);if(r){N[q].width=r.getAttribute("width")?r.getAttribute("width"):"0";N[q].height=r.getAttribute("height")?r.getAttribute("height"):"0";if(c(N[q].swfVersion)){if(h.webkit&&h.webkit<312){Y(r)}W(u,true)}else{if(N[q].expressInstall&&!A&&c("6.0.65")&&(h.win||h.mac)){k(N[q])}else{O(r)}}}}else{W(u,true)}}}function Y(t){var q=t.getElementsByTagName(Q)[0];if(q){var w=a("embed"),y=q.attributes;if(y){var v=y.length;for(var u=0;u<v;u++){if(y[u].nodeName=="DATA"){w.setAttribute("src",y[u].nodeValue)}else{w.setAttribute(y[u].nodeName,y[u].nodeValue)}}}var x=q.childNodes;if(x){var z=x.length;for(var r=0;r<z;r++){if(x[r].nodeType==1&&x[r].nodeName=="PARAM"){w.setAttribute(x[r].getAttribute("name"),x[r].getAttribute("value"))}}}t.parentNode.replaceChild(w,t)}}function k(w){A=true;var u=C(w.id);if(u){if(w.altContentId){var y=C(w.altContentId);if(y){M=y;l=w.altContentId}}else{M=G(u)}if(!(/%$/.test(w.width))&&parseInt(w.width,10)<310){w.width="310"}if(!(/%$/.test(w.height))&&parseInt(w.height,10)<137){w.height="137"}K.title=K.title.slice(0,47)+" - Flash Player Installation";var z=h.ie&&h.win?"ActiveX":"PlugIn",q=K.title,r="MMredirectURL="+j.location+"&MMplayerType="+z+"&MMdoctitle="+q,x=w.id;if(h.ie&&h.win&&u.readyState!=4){var t=a("div");x+="SWFObjectNew";t.setAttribute("id",x);u.parentNode.insertBefore(t,u);u.style.display="none";var v=function(){u.parentNode.removeChild(u)};I(j,"onload",v)}U({data:w.expressInstall,id:m,width:w.width,height:w.height},{flashvars:r},x)}}function O(t){if(h.ie&&h.win&&t.readyState!=4){var r=a("div");t.parentNode.insertBefore(r,t);r.parentNode.replaceChild(G(t),r);t.style.display="none";var q=function(){t.parentNode.removeChild(t)};I(j,"onload",q)}else{t.parentNode.replaceChild(G(t),t)}}function G(v){var u=a("div");if(h.win&&h.ie){u.innerHTML=v.innerHTML}else{var r=v.getElementsByTagName(Q)[0];if(r){var w=r.childNodes;if(w){var q=w.length;for(var t=0;t<q;t++){if(!(w[t].nodeType==1&&w[t].nodeName=="PARAM")&&!(w[t].nodeType==8)){u.appendChild(w[t].cloneNode(true))}}}}}return u}function U(AG,AE,t){var q,v=C(t);if(v){if(typeof AG.id==b){AG.id=t}if(h.ie&&h.win){var AF="";for(var AB in AG){if(AG[AB]!=Object.prototype[AB]){if(AB.toLowerCase()=="data"){AE.movie=AG[AB]}else{if(AB.toLowerCase()=="styleclass"){AF+=' class="'+AG[AB]+'"'}else{if(AB.toLowerCase()!="classid"){AF+=" "+AB+'="'+AG[AB]+'"'}}}}}var AD="";for(var AA in AE){if(AE[AA]!=Object.prototype[AA]){AD+='<param name="'+AA+'" value="'+AE[AA]+'" />'}}v.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+AF+">"+AD+"</object>";i[i.length]=AG.id;q=C(AG.id)}else{if(h.webkit&&h.webkit<312){var AC=a("embed");AC.setAttribute("type",P);for(var z in AG){if(AG[z]!=Object.prototype[z]){if(z.toLowerCase()=="data"){AC.setAttribute("src",AG[z])}else{if(z.toLowerCase()=="styleclass"){AC.setAttribute("class",AG[z])}else{if(z.toLowerCase()!="classid"){AC.setAttribute(z,AG[z])}}}}}for(var y in AE){if(AE[y]!=Object.prototype[y]){if(y.toLowerCase()!="movie"){AC.setAttribute(y,AE[y])}}}v.parentNode.replaceChild(AC,v);q=AC}else{var u=a(Q);u.setAttribute("type",P);for(var x in AG){if(AG[x]!=Object.prototype[x]){if(x.toLowerCase()=="styleclass"){u.setAttribute("class",AG[x])}else{if(x.toLowerCase()!="classid"){u.setAttribute(x,AG[x])}}}}for(var w in AE){if(AE[w]!=Object.prototype[w]&&w.toLowerCase()!="movie"){F(u,w,AE[w])}}v.parentNode.replaceChild(u,v);q=u}}}return q}function F(t,q,r){var u=a("param");u.setAttribute("name",q);u.setAttribute("value",r);t.appendChild(u)}function X(r){var q=C(r);if(q&&(q.nodeName=="OBJECT"||q.nodeName=="EMBED")){if(h.ie&&h.win){if(q.readyState==4){B(r)}else{j.attachEvent("onload",function(){B(r)})}}else{q.parentNode.removeChild(q)}}}function B(t){var r=C(t);if(r){for(var q in r){if(typeof r[q]=="function"){r[q]=null}}r.parentNode.removeChild(r)}}function C(t){var q=null;try{q=K.getElementById(t)}catch(r){}return q}function a(q){return K.createElement(q)}function I(t,q,r){t.attachEvent(q,r);d[d.length]=[t,q,r]}function c(t){var r=h.pv,q=t.split(".");q[0]=parseInt(q[0],10);q[1]=parseInt(q[1],10)||0;q[2]=parseInt(q[2],10)||0;return(r[0]>q[0]||(r[0]==q[0]&&r[1]>q[1])||(r[0]==q[0]&&r[1]==q[1]&&r[2]>=q[2]))?true:false}function V(v,r){if(h.ie&&h.mac){return }var u=K.getElementsByTagName("head")[0],t=a("style");t.setAttribute("type","text/css");t.setAttribute("media","screen");if(!(h.ie&&h.win)&&typeof K.createTextNode!=b){t.appendChild(K.createTextNode(v+" {"+r+"}"))}u.appendChild(t);if(h.ie&&h.win&&typeof K.styleSheets!=b&&K.styleSheets.length>0){var q=K.styleSheets[K.styleSheets.length-1];if(typeof q.addRule==Q){q.addRule(v,r)}}}function W(t,q){var r=q?"visible":"hidden";if(e&&C(t)){C(t).style.visibility=r}else{V("#"+t,"visibility:"+r)}}function g(s){var r=/[\\\"<>\.;]/;var q=r.exec(s)!=null;return q?encodeURIComponent(s):s}var D=function(){if(h.ie&&h.win){window.attachEvent("onunload",function(){var w=d.length;for(var v=0;v<w;v++){d[v][0].detachEvent(d[v][1],d[v][2])}var t=i.length;for(var u=0;u<t;u++){X(i[u])}for(var r in h){h[r]=null}h=null;for(var q in swfobject){swfobject[q]=null}swfobject=null})}}();return{registerObject:function(u,q,t){if(!h.w3cdom||!u||!q){return }var r={};r.id=u;r.swfVersion=q;r.expressInstall=t?t:false;N[N.length]=r;W(u,false)},getObjectById:function(v){var q=null;if(h.w3cdom){var t=C(v);if(t){var u=t.getElementsByTagName(Q)[0];if(!u||(u&&typeof t.SetVariable!=b)){q=t}else{if(typeof u.SetVariable!=b){q=u}}}}return q},embedSWF:function(x,AE,AB,AD,q,w,r,z,AC){if(!h.w3cdom||!x||!AE||!AB||!AD||!q){return }AB+="";AD+="";if(c(q)){W(AE,false);var AA={};if(AC&&typeof AC===Q){for(var v in AC){if(AC[v]!=Object.prototype[v]){AA[v]=AC[v]}}}AA.data=x;AA.width=AB;AA.height=AD;var y={};if(z&&typeof z===Q){for(var u in z){if(z[u]!=Object.prototype[u]){y[u]=z[u]}}}if(r&&typeof r===Q){for(var t in r){if(r[t]!=Object.prototype[t]){if(typeof y.flashvars!=b){y.flashvars+="&"+t+"="+r[t]}else{y.flashvars=t+"="+r[t]}}}}f(function(){U(AA,y,AE);if(AA.id==AE){W(AE,true)}})}else{if(w&&!A&&c("6.0.65")&&(h.win||h.mac)){A=true;W(AE,false);f(function(){var AF={};AF.id=AF.altContentId=AE;AF.width=AB;AF.height=AD;AF.expressInstall=w;k(AF)})}}},getFlashPlayerVersion:function(){return{major:h.pv[0],minor:h.pv[1],release:h.pv[2]}},hasFlashPlayerVersion:c,createSWF:function(t,r,q){if(h.w3cdom){return U(t,r,q)}else{return undefined}},removeSWF:function(q){if(h.w3cdom){X(q)}},createCSS:function(r,q){if(h.w3cdom){V(r,q)}},addDomLoadEvent:f,addLoadEvent:R,getQueryParamValue:function(v){var u=K.location.search||K.location.hash;if(v==null){return g(u)}if(u){var t=u.substring(1).split("&");for(var r=0;r<t.length;r++){if(t[r].substring(0,t[r].indexOf("="))==v){return g(t[r].substring((t[r].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(A&&M){var q=C(m);if(q){q.parentNode.replaceChild(M,q);if(l){W(l,true);if(h.ie&&h.win){M.style.display="block"}}M=null;l=null;A=false}}}}}();
var Domplate={};(function(){function DomplateTag(tagName)
{this.tagName=tagName;}
this.DomplateTag=DomplateTag;function DomplateEmbed()
{}
function DomplateLoop()
{}
var womb=null;var domplate=function()
{var lastSubject;for(var i=0;i<arguments.length;++i)
lastSubject=lastSubject?copyObject(lastSubject,arguments[i]):arguments[i];for(var name in lastSubject)
{var val=lastSubject[name];if(isTag(val))
val.tag.subject=lastSubject;}
return lastSubject;};domplate.context=function(context,fn)
{var lastContext=domplate.lastContext;domplate.topContext=context;fn.apply(context);domplate.topContext=lastContext;};this.domplate=domplate;this.create=domplate;this.TAG=function()
{var embed=new DomplateEmbed();return embed.merge(arguments);};this.FOR=function()
{var loop=new DomplateLoop();return loop.merge(arguments);};DomplateTag.prototype={merge:function(args,oldTag)
{if(oldTag)
this.tagName=oldTag.tagName;this.context=oldTag?oldTag.context:null;this.subject=oldTag?oldTag.subject:null;this.attrs=oldTag?copyObject(oldTag.attrs):{};this.classes=oldTag?copyObject(oldTag.classes):{};this.props=oldTag?copyObject(oldTag.props):null;this.listeners=oldTag?copyArray(oldTag.listeners):null;this.children=oldTag?copyArray(oldTag.children):[];this.vars=oldTag?copyArray(oldTag.vars):[];var attrs=args.length?args[0]:null;var hasAttrs=typeof(attrs)=="object"&&!isTag(attrs);this.children=[];if(domplate.topContext)
this.context=domplate.topContext;if(args.length)
parseChildren(args,hasAttrs?1:0,this.vars,this.children);if(hasAttrs)
this.parseAttrs(attrs);return creator(this,DomplateTag);},parseAttrs:function(args)
{for(var name in args)
{var val=parseValue(args[name]);readPartNames(val,this.vars);if(name.indexOf("on")==0)
{var eventName=dojo.isIE?name:name.substr(2);if(!this.listeners)
this.listeners=[];this.listeners.push(eventName,val);}
else if(name.indexOf("_")==0)
{var propName=name.substr(1);if(!this.props)
this.props={};this.props[propName]=val;}
else if(name.indexOf("$")==0)
{var className=name.substr(1);if(!this.classes)
this.classes={};this.classes[className]=val;}
else
{if(name=="class"&&name in this.attrs)
this.attrs[name]+=" "+val;else
this.attrs[name]=val;}}},compile:function()
{if(this.renderMarkup)
return;this.compileMarkup();this.compileDOM();},compileMarkup:function()
{this.markupArgs=[];var topBlock=[],topOuts=[],blocks=[],info={args:this.markupArgs,argIndex:0};this.generateMarkup(topBlock,topOuts,blocks,info);this.addCode(topBlock,topOuts,blocks);var fnBlock=['(function (__code__, __context__, __in__, __out__'];for(var i=0;i<info.argIndex;++i)
fnBlock.push(', s',i);fnBlock.push(') {');if(this.subject)
fnBlock.push('with (this) {');if(this.context)
fnBlock.push('with (__context__) {');fnBlock.push('with (__in__) {');fnBlock.push.apply(fnBlock,blocks);if(this.subject)
fnBlock.push('}');if(this.context)
fnBlock.push('}');fnBlock.push('}})');function __link__(tag,code,outputs,args)
{tag.tag.compile();var tagOutputs=[];var markupArgs=[code,tag.tag.context,args,tagOutputs];markupArgs.push.apply(markupArgs,tag.tag.markupArgs);tag.tag.renderMarkup.apply(tag.tag.subject,markupArgs);outputs.push(tag);outputs.push(tagOutputs);}
function __escape__(value)
{function replaceChars(ch)
{switch(ch)
{case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";case"'":return"&#39;";case'"':return"&quot;";}
return"?";};return String(value).replace(/[<>&"']/g,replaceChars);}
function __loop__(iter,outputs,fn)
{var iterOuts=[];outputs.push(iterOuts);if(iter instanceof Array)
iter=new ArrayIterator(iter);try
{while(1)
{var value=iter.next();var itemOuts=[0,0];iterOuts.push(itemOuts);fn.apply(this,[value,itemOuts]);}}
catch(exc)
{if(exc!=StopIteration)
throw exc;}}
var js=dojo.isIE?'var f = '+fnBlock.join("")+';f':fnBlock.join("");this.renderMarkup=eval(js);},getVarNames:function(args)
{if(this.vars)
args.push.apply(args,this.vars);for(var i=0;i<this.children.length;++i)
{var child=this.children[i];if(isTag(child))
child.tag.getVarNames(args);else if(child instanceof Parts)
{for(var i=0;i<child.parts.length;++i)
{if(child.parts[i]instanceof Variable)
{var name=child.parts[i].name;var names=name.split(".");args.push(names[0]);}}}}},generateMarkup:function(topBlock,topOuts,blocks,info)
{topBlock.push(',"<',this.tagName,'"');for(var name in this.attrs)
{if(name!="class")
{var val=this.attrs[name];topBlock.push(', " ',name,'=\\""');addParts(val,',',topBlock,info,true);topBlock.push(', "\\""');}}
if(this.listeners)
{for(var i=0;i<this.listeners.length;i+=2)
readPartNames(this.listeners[i+1],topOuts);}
if(this.props)
{for(var name in this.props)
readPartNames(this.props[name],topOuts);}
if("class"in this.attrs||this.classes)
{topBlock.push(', " class=\\""');if("class"in this.attrs)
addParts(this.attrs["class"],',',topBlock,info,true);topBlock.push(', " "');for(var name in this.classes)
{topBlock.push(', (');addParts(this.classes[name],'',topBlock,info);topBlock.push(' ? "',name,'" + " " : "")');}
topBlock.push(', "\\""');}
topBlock.push(',">"');this.generateChildMarkup(topBlock,topOuts,blocks,info);topBlock.push(',"</',this.tagName,'>"');},generateChildMarkup:function(topBlock,topOuts,blocks,info)
{for(var i=0;i<this.children.length;++i)
{var child=this.children[i];if(isTag(child))
child.tag.generateMarkup(topBlock,topOuts,blocks,info);else
addParts(child,',',topBlock,info,true);}},addCode:function(topBlock,topOuts,blocks)
{if(topBlock.length)
blocks.push('__code__.push(""',topBlock.join(""),');');if(topOuts.length)
blocks.push('__out__.push(',topOuts.join(","),');');topBlock.splice(0,topBlock.length);topOuts.splice(0,topOuts.length);},addLocals:function(blocks)
{var varNames=[];this.getVarNames(varNames);var map={};for(var i=0;i<varNames.length;++i)
{var name=varNames[i];if(map.hasOwnProperty(name))
continue;map[name]=1;var names=name.split(".");blocks.push('var ',names[0]+' = '+'__in__.'+names[0]+';');}},compileDOM:function()
{var path=[];var blocks=[];this.domArgs=[];path.embedIndex=0;path.loopIndex=0;path.staticIndex=0;path.renderIndex=0;var nodeCount=this.generateDOM(path,blocks,this.domArgs);var fnBlock=['(function (root, context, o'];for(var i=0;i<path.staticIndex;++i)
fnBlock.push(', ','s'+i);for(var i=0;i<path.renderIndex;++i)
fnBlock.push(', ','d'+i);fnBlock.push(') {');for(var i=0;i<path.loopIndex;++i)
fnBlock.push('var l',i,' = 0;');for(var i=0;i<path.embedIndex;++i)
fnBlock.push('var e',i,' = 0;');if(this.subject)
fnBlock.push('with (this) {');if(this.context)
fnBlock.push('with (context) {');fnBlock.push(blocks.join(""));if(this.subject)
fnBlock.push('}');if(this.context)
fnBlock.push('}');fnBlock.push('return ',nodeCount,';');fnBlock.push('})');function __prop__(object,prop,value)
{object[prop]=value;}
function __bind__(object,fn)
{return function(event){return fn.apply(object,[event]);}}
function __link__(node,tag,args)
{tag.tag.compile();var domArgs=[node,tag.tag.context,0];domArgs.push.apply(domArgs,tag.tag.domArgs);domArgs.push.apply(domArgs,args);return tag.tag.renderDOM.apply(tag.tag.subject,domArgs);}
var self=this;function __loop__(iter,fn)
{var nodeCount=0;for(var i=0;i<iter.length;++i)
{iter[i][0]=i;iter[i][1]=nodeCount;nodeCount+=fn.apply(this,iter[i]);}
return nodeCount;}
function __path__(parent,offset)
{var root=parent;for(var i=2;i<arguments.length;++i)
{var index=arguments[i];if(i==3)
index+=offset;if(index==-1)
parent=parent.parentNode;else
parent=parent.childNodes[index];}
return parent;}
var js=dojo.isIE?'var f = '+fnBlock.join("")+';f':fnBlock.join("");this.renderDOM=eval(js);},generateDOM:function(path,blocks,args)
{if(this.listeners||this.props)
this.generateNodePath(path,blocks);if(this.listeners)
{for(var i=0;i<this.listeners.length;i+=2)
{var val=this.listeners[i+1];var arg=generateArg(val,path,args);if(window.addEventListener){blocks.push('node.addEventListener("',this.listeners[i],'", __bind__(this, ',arg,'), false);');}else if(window.attachEvent){blocks.push('node.attachEvent("',this.listeners[i],'", __bind__(this, ',arg,'));');}}}
if(this.props)
{for(var name in this.props)
{var val=this.props[name];var arg=generateArg(val,path,args);blocks.push("__prop__(node, '"+name+"', "+arg+");");}}
this.generateChildDOM(path,blocks,args);return 1;},generateNodePath:function(path,blocks)
{blocks.push("node = __path__(root, o");for(var i=0;i<path.length;++i)
blocks.push(",",path[i]);blocks.push(");");},generateChildDOM:function(path,blocks,args)
{path.push(0);for(var i=0;i<this.children.length;++i)
{var child=this.children[i];if(isTag(child))
path[path.length-1]+='+'+child.tag.generateDOM(path,blocks,args);else
path[path.length-1]+='+1';}
path.pop();}};DomplateEmbed.prototype=copyObject(DomplateTag.prototype,{merge:function(args,oldTag)
{this.value=oldTag?oldTag.value:parseValue(args[0]);this.attrs=oldTag?oldTag.attrs:{};this.vars=oldTag?copyArray(oldTag.vars):[];var attrs=args[1];for(var name in attrs)
{var val=parseValue(attrs[name]);this.attrs[name]=val;readPartNames(val,this.vars);}
return creator(this,DomplateEmbed);},getVarNames:function(names)
{if(this.value instanceof Parts)
names.push(this.value.parts[0].name);if(this.vars)
names.push.apply(names,this.vars);},generateMarkup:function(topBlock,topOuts,blocks,info)
{this.addCode(topBlock,topOuts,blocks);blocks.push('__link__(');addParts(this.value,'',blocks,info);blocks.push(', __code__, __out__, {');var lastName=null;for(var name in this.attrs)
{if(lastName)
blocks.push(',');lastName=name;var val=this.attrs[name];blocks.push('"',name,'":');addParts(val,'',blocks,info);}
blocks.push('});');},generateDOM:function(path,blocks,args)
{var embedName='e'+path.embedIndex++;this.generateNodePath(path,blocks);var valueName='d'+path.renderIndex++;var argsName='d'+path.renderIndex++;blocks.push(embedName+' = __link__(node, ',valueName,', ',argsName,');');return embedName;}});DomplateLoop.prototype=copyObject(DomplateTag.prototype,{merge:function(args,oldTag)
{this.isLoop=true;this.varName=oldTag?oldTag.varName:args[0];this.iter=oldTag?oldTag.iter:parseValue(args[1]);this.vars=[];this.children=oldTag?copyArray(oldTag.children):[];var offset=Math.min(args.length,2);parseChildren(args,offset,this.vars,this.children);return creator(this,DomplateLoop);},getVarNames:function(names)
{if(this.iter instanceof Parts)
names.push(this.iter.parts[0].name);DomplateTag.prototype.getVarNames.apply(this,[names]);},generateMarkup:function(topBlock,topOuts,blocks,info)
{this.addCode(topBlock,topOuts,blocks);var iterName;if(this.iter instanceof Parts)
{var part=this.iter.parts[0];iterName=part.name;if(part.format)
{for(var i=0;i<part.format.length;++i)
iterName=part.format[i]+"("+iterName+")";}}
else
iterName=this.iter;blocks.push('__loop__.apply(this, [',iterName,', __out__, function(',this.varName,', __out__) {');this.generateChildMarkup(topBlock,topOuts,blocks,info);this.addCode(topBlock,topOuts,blocks);blocks.push('}]);');},generateDOM:function(path,blocks,args)
{var iterName='d'+path.renderIndex++;var counterName='i'+path.loopIndex;var loopName='l'+path.loopIndex++;if(!path.length)
path.push(-1,0);var preIndex=path.renderIndex;path.renderIndex=0;var nodeCount=0;var subBlocks=[];var basePath=path[path.length-1];for(var i=0;i<this.children.length;++i)
{path[path.length-1]=basePath+'+'+loopName+'+'+nodeCount;var child=this.children[i];if(isTag(child))
nodeCount+='+'+child.tag.generateDOM(path,subBlocks,args);else
nodeCount+='+1';}
path[path.length-1]=basePath+'+'+loopName;blocks.push(loopName,' = __loop__.apply(this, [',iterName,', function(',counterName,',',loopName);for(var i=0;i<path.renderIndex;++i)
blocks.push(',d'+i);blocks.push(') {');blocks.push(subBlocks.join(""));blocks.push('return ',nodeCount,';');blocks.push('}]);');path.renderIndex=preIndex;return loopName;}});function Variable(name,format)
{this.name=name;this.format=format;}
function Parts(parts)
{this.parts=parts;}
function parseParts(str)
{var re=/\$([_A-Za-z][_A-Za-z0-9.|]*)/g;var index=0;var parts=[];var m;while(m=re.exec(str))
{var pre=str.substr(index,(re.lastIndex-m[0].length)-index);if(pre)
parts.push(pre);var expr=m[1].split("|");parts.push(new Variable(expr[0],expr.slice(1)));index=re.lastIndex;}
if(!index)
return str;var post=str.substr(index);if(post)
parts.push(post);return new Parts(parts);}
function parseValue(val)
{return typeof(val)=='string'?parseParts(val):val;}
function parseChildren(args,offset,vars,children)
{for(var i=offset;i<args.length;++i)
{var val=parseValue(args[i]);children.push(val);readPartNames(val,vars);}}
function readPartNames(val,vars)
{if(val instanceof Parts)
{for(var i=0;i<val.parts.length;++i)
{var part=val.parts[i];if(part instanceof Variable)
vars.push(part.name);}}}
function generateArg(val,path,args)
{if(val instanceof Parts)
{var vals=[];for(var i=0;i<val.parts.length;++i)
{var part=val.parts[i];if(part instanceof Variable)
{var varName='d'+path.renderIndex++;if(part.format)
{for(var j=0;j<part.format.length;++j)
varName=part.format[j]+'('+varName+')';}
vals.push(varName);}
else
vals.push('"'+part.replace(/"/g,'\\"')+'"');}
return vals.join('+');}
else
{args.push(val);return's'+path.staticIndex++;}}
function addParts(val,delim,block,info,escapeIt)
{var vals=[];if(val instanceof Parts)
{for(var i=0;i<val.parts.length;++i)
{var part=val.parts[i];if(part instanceof Variable)
{var partName=part.name;if(part.format)
{for(var j=0;j<part.format.length;++j)
partName=part.format[j]+"("+partName+")";}
if(escapeIt)
vals.push("__escape__("+partName+")");else
vals.push(partName);}
else
vals.push('"'+part+'"');}}
else if(isTag(val))
{info.args.push(val);vals.push('s'+info.argIndex++);}
else
vals.push('"'+val+'"');var parts=vals.join(delim);if(parts)
block.push(delim,parts);}
function isTag(obj)
{return(typeof(obj)=="function"||obj instanceof Function)&&!!obj.tag;}
function isDomplate(obj)
{return(typeof(obj)=="object")&&!!obj.render;}
function creator(tag,cons)
{var fn=new Function("var tag = arguments.callee.tag;"+"var cons = arguments.callee.cons;"+"var newTag = new cons();"+"return newTag.merge(arguments, tag);");fn.tag=tag;fn.cons=cons;extend(fn,Renderer);return fn;}
function copyArray(oldArray)
{var ary=[];if(oldArray)
for(var i=0;i<oldArray.length;++i)
ary.push(oldArray[i]);return ary;}
function copyObject(l,r)
{var m={};extend(m,l);extend(m,r);return m;}
function extend(l,r)
{for(var n in r)
l[n]=r[n];}
function ArrayIterator(array)
{var index=-1;this.next=function()
{if(++index>=array.length)
throw StopIteration;return array[index];};}
function StopIteration(){}
this.$break=function()
{throw StopIteration;};var Renderer={renderHTML:function(args,outputs,self)
{var code=[];var markupArgs=[code,this.tag.context,args,outputs];markupArgs.push.apply(markupArgs,this.tag.markupArgs);this.tag.renderMarkup.apply(self?self:this.tag.subject,markupArgs);return code.join("");},insertRows:function(args,before,self)
{this.tag.compile();var outputs=[];var html=this.renderHTML(args,outputs,self);var doc=before.ownerDocument;var tableParent=doc.createElement("div");tableParent.innerHTML="<table>"+html+"</table>";var tbody=tableParent.firstChild.firstChild;var parent=before.tagName.toLowerCase()=="tr"?before.parentNode:before;var after=before.tagName.toLowerCase()=="tr"?before.nextSibling:null;var firstRow=tbody.firstChild,lastRow;while(tbody.firstChild)
{lastRow=tbody.firstChild;if(after)
parent.insertBefore(lastRow,after);else
parent.appendChild(lastRow);}
var offset=0;if(this.tag.isLoop)
{var node=firstRow.parentNode.firstChild;for(;node&&node!=firstRow;node=node.nextSibling)
++offset;}
var domArgs=[firstRow,this.tag.context,offset];domArgs.push.apply(domArgs,this.tag.domArgs);domArgs.push.apply(domArgs,outputs);this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);return[firstRow,lastRow];},insertAfter:function(args,before,self)
{this.tag.compile();var outputs=[];var html=this.renderHTML(args,outputs,self);var doc=before.ownerDocument;var range=doc.createRange();range.selectNode(doc.body);var frag=range.createContextualFragment(html);var root=frag.firstChild;if(before.nextSibling)
before.parentNode.insertBefore(frag,before.nextSibling);else
before.parentNode.appendChild(frag);var domArgs=[root,this.tag.context,0];domArgs.push.apply(domArgs,this.tag.domArgs);domArgs.push.apply(domArgs,outputs);this.tag.renderDOM.apply(self?self:(this.tag.subject?this.tag.subject:null),domArgs);return root;},replace:function(args,parent,self)
{this.tag.compile();var outputs=[];var html=this.renderHTML(args,outputs,self);var root;if(parent.nodeType==1)
{parent.innerHTML=html;root=parent.firstChild;}
else
{if(!parent||parent.nodeType!=9)
parent=document;if(!womb||womb.ownerDocument!=parent)
womb=parent.createElement("div");womb.innerHTML=html;root=womb.firstChild;}
var domArgs=[root,this.tag.context,0];domArgs.push.apply(domArgs,this.tag.domArgs);domArgs.push.apply(domArgs,outputs);this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);return root;},append:function(args,parent,self)
{this.tag.compile();var outputs=[];var html=this.renderHTML(args,outputs,self);if(!womb||womb.ownerDocument!=parent.ownerDocument)
womb=parent.ownerDocument.createElement("div");womb.innerHTML=html;root=womb.firstChild;while(womb.firstChild)
parent.appendChild(womb.firstChild);var domArgs=[root,this.tag.context,0];domArgs.push.apply(domArgs,this.tag.domArgs);domArgs.push.apply(domArgs,outputs);this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);return root;},insertCols:function(args,parent,self)
{this.tag.compile();var outputs=[];var html=this.renderHTML(args,outputs,self);var table=parent.ownerDocument.createElement("table");var womb=parent.ownerDocument.createElement("tr");table.appendChild(womb);womb.innerHTML=html;var firstCol=womb.firstChild;while(womb.firstChild)
parent.appendChild(womb.firstChild);var offset=0;if(this.tag.isLoop)
{var node=firstCol.parentNode.firstChild;for(;node&&node!=firstCol;node=node.nextSibling)
++offset;}
var domArgs=[firstCol,this.tag.context,offset];domArgs.push.apply(domArgs,this.tag.domArgs);domArgs.push.apply(domArgs,outputs);this.tag.renderDOM.apply(self?self:this.tag.subject,domArgs);return firstCol;}};function defineTags()
{for(var i=0;i<arguments.length;++i)
{var tagName=arguments[i];var fn=new Function("var newTag = new Domplate.DomplateTag('"+tagName+"'); return newTag.merge(arguments);");var fnName=tagName.toUpperCase();this[fnName]=fn;}}
defineTags("a","button","br","canvas","col","colgroup","div","fieldset","form","h1","h2","h3","hr","img","input","label","legend","li","ol","optgroup","option","p","pre","select","span","strong","table","tbody","td","textarea","tfoot","th","thead","tr","tt","ul","code","iframe","canvas");}).apply(Domplate);HAR.ns(function(){
with(Domplate){
with(HAR){
with(HAR.Lib){
HAR.InfoTip=extend({maxWidth:100,maxHeight:80,infoTipMargin:10,infoTipWindowPadding:25,tags:domplate({infoTipTag:DIV({"class":"infoTip"})}),initialize:function(){
if(dojo.isIE){
return;
}
HAR.log("har; InfoTip.initialize");
dojo.connect(document,"mouseover",bind(this.onMouseMove,this));
dojo.connect(document,"mouseout",bind(this.onMouseOut,this));
dojo.connect(document,"mousemove",bind(this.onMouseMove,this));
return this.infoTip=this.tags.infoTipTag.append({},getBody(document));
},showInfoTip:function(_139,_13a,_13b,x,y,_13e,_13f){
var _140=getOverflowParent(_13b);
var _141=x+(_140?_140.scrollLeft:0);
if(_13a.showInfoTip(_139,_13b,_141,y,_13e,_13f)){
var _142=_139.ownerDocument.documentElement;
var _143=_142.clientWidth;
var _144=_142.clientHeight;
if(x+_139.offsetWidth+this.infoTipMargin>_143-this.infoTipWindowPadding){
_139.style.left="auto";
_139.style.right=((_143-x)+this.infoTipMargin)+"px";
}else{
_139.style.left=(x+this.infoTipMargin)+"px";
_139.style.right="auto";
}
if(y+_139.offsetHeight+this.infoTipMargin>_144){
_139.style.top=Math.max(0,_144-(_139.offsetHeight+this.infoTipMargin))+"px";
_139.style.bottom="auto";
}else{
_139.style.top=(y+this.infoTipMargin)+"px";
_139.style.bottom="auto";
}
_139.setAttribute("active","true");
}else{
this.hideInfoTip(_139);
}
},hideInfoTip:function(_145){
if(_145){
_145.removeAttribute("active");
}
},onMouseOut:function(_146){
if(!_146.relatedTarget){
this.hideInfoTip(this.infoTip);
}
},onMouseMove:function(_147){
var _148=HAR.Tab.Preview;
this.infoTip.setAttribute("multiline",false);
var x=_147.clientX,y=_147.clientY;
this.showInfoTip(this.infoTip,_148,_147.target,x,y,_147.rangeParent,_147.rangeOffset);
},populateTimingInfoTip:function(_14a,_14b){
this.tags.colorTag.replace({rgbValue:_14b},_14a);
return true;
}});
HAR.registerModule(HAR.InfoTip);
}
}
}
});
HAR.ns(function(){
with(HAR){
HAR.Model=extend({inputData:null,parseData:function(_16c){
try{
var _16d=HAR.now();
var _16e=dojo.fromJson(_16c);
HAR.log("har; parse data: "+HAR.Lib.formatTime(HAR.now()-_16d));
return _16e;
}
catch(err){
this.errors=[{"message":"Failed to parse JSON","property":"JSON evaluation"},{"message":err.name,"property":err.message}];
}
return null;
},setData:function(_16f){
return this.inputData=_16f;
},appendData:function(_170){
if(!_170){
return this.inputData;
}
if(this.inputData){
var _171=HAR.now();
for(var i=0;i<_170.log.pages.length;i++){
this.importPage(_170.log.pages[i],_170.log.entries);
}
HAR.log("har; Merge Data: "+HAR.Lib.formatTime(HAR.now()-_171));
}else{
this.inputData=_170;
}
return this.inputData;
},getPages:function(){
return this.inputData?this.inputData.log.pages:[];
},removePage:function(page){
var _174=this.inputData.log.pages;
for(var i=0;i<_174.length;i++){
if(page==_174[i]){
_174.splice(i,1);
break;
}
}
var _176=this.inputData.log.entries;
for(var i=0;i<_176.length;i++){
var _177=_176[i];
if(_176[i].pageref==page.id){
_176.splice(i,1);
i--;
}
}
return this.inputData;
},getPageEntries:function(page){
var _179=[];
var _17a=this.inputData?this.inputData.log.entries:null;
if(!_17a){
return _179;
}
for(var i=0;i<_17a.length;i++){
var _17c=_17a[i];
if(!_17c.pageref&&!page){
_179.push(_17c);
}
if(page&&_17c.pageref==page.id){
_179.push(_17c);
}
}
return _179;
},getParentPage:function(file){
var _17e=this.inputData.log.pages;
for(var i=0;i<_17e.length;i++){
if(_17e[i].id==file.pageref){
return _17e[i];
}
}
return null;
},importPage:function(page,_181){
var _182=this.getUniquePageID(page.id);
var _183=page.id;
page.id=_182;
this.inputData.log.pages.push(page);
for(var i=0;i<_181.length;i++){
var _185=_181[i];
if(_185.pageref==_183){
_185.pageref=_182;
this.inputData.log.entries.push(_185);
}
}
},getUniquePageID:function(_186){
var _187=this.inputData.log.pages;
var _188={};
for(var i=0;i<_187.length;i++){
_188[_187[i].id]=true;
}
if(!_188[_186]){
return _186;
}
var _18a=1;
while(true){
var _18b=_186+_18a;
if(!_188[_18b]){
return _18b;
}
_18a++;
}
},toJSON:function(){
if(!this.inputData){
return "";
}
var _18c=this.inputData.log.entries;
for(var i=0;i<_18c.length;i++){
var _18e=_18c[i];
if(_18e.response.content.text){
_18e.response.content.__json__=contentToUnicode;
}
}
var _18f=dojo.toJson(this.inputData,true);
var _190=_18f.replace(/\\\\u/g,"\\u");
return _190;
}});
function contentToUnicode(){
var _191={};
for(var prop in this){
if(prop!="__json__"){
_191[prop]=this[prop];
}
}
if(!this.text){
return _191;
}
_191.text=Array.map(this.text,function(x){
var _194=x.charCodeAt(0);
if((_194>=32&&_194<127)||_194==10||_194==13){
return x.charAt(0);
}
var _195=_194.toString(16).toUpperCase();
while(_195.length<4){
_195="0"+_195;
}
return "\\u"+_195;
}).join("");
return _191;
}
HAR.Model.Phase=function(file){
this.files=[];
this.addFile(file);
};
HAR.Model.Phase.prototype={addFile:function(file){
this.files.push(file);
file.phase=this;
},getLastStartTime:function(){
return this.files[this.files.length-1].startedDateTime;
}};
}
});
HAR.ns(function(){
with(Domplate){
with(HAR.Lib){
HAR.Page.Pie=domplate({tag:TABLE({"class":"pagePieTable",cellpadding:0,cellspacing:0,_repObject:"$pie"},TBODY(TR(TD({"class":"pieBox",title:"$pie.title"}),TD(FOR("item","$pie.data",DIV({"class":"pieLabel",_repObject:"$item"},SPAN({"class":"box",style:"background-color: $item.color"},"&nbsp;"),SPAN({"class":"label"},"$item.label"))))))),render:function(pie,_14d){
var root=this.tag.append({pie:pie},_14d);
var _14f=getElementByClass(root,"pieBox");
var el=document.createElement("canvas");
el.setAttribute("class","pieGraph");
el.setAttribute("height","100");
el.setAttribute("width","100");
_14f.appendChild(el);
if(typeof (G_vmlCanvasManager)!="undefined"){
G_vmlCanvasManager.initElement(el);
}
return root;
},draw:function(_151,pie){
if(!_151||!_151.getContext){
return;
}
var ctx=_151.getContext("2d");
var _154=Math.min(_151.width,_151.height)/2;
var _155=[_151.width/2,_151.height/2];
ctx.clearRect(0,0,_151.width,_151.height);
var _156=0;
var data=pie.data;
var _158=0;
for(var i in data){
_158+=data[i].value;
}
if(!_158){
ctx.beginPath();
ctx.moveTo(_155[0],_155[1]);
ctx.arc(_155[0],_155[1],_154,0,Math.PI*2,false);
ctx.closePath();
ctx.fillStyle="rgb(229,236,238)";
ctx.lineStyle="lightgray";
ctx.fill();
return;
}
for(var i=0;i<data.length;i++){
var _15a=data[i].value/_158;
ctx.beginPath();
ctx.moveTo(_155[0],_155[1]);
ctx.arc(_155[0],_155[1],_154,Math.PI*(-0.5+2*_156),Math.PI*(-0.5+2*(_156+_15a)),false);
ctx.lineTo(_155[0],_155[1]);
ctx.closePath();
ctx.fillStyle=data[i].color;
ctx.fill();
_156+=_15a;
}
},showInfoTip:function(_15b,_15c,x,y){
var _15f=getAncestorByClass(_15c,"pagePieTable");
if(!_15f){
return false;
}
var _160=getAncestorByClass(_15c,"pieLabel");
if(_160){
HAR.Page.PieInfoTip.render(_15f.repObject,_160.repObject,_15b);
return true;
}
}});
HAR.Page.PieInfoTip=domplate({tag:DIV({"class":"pieLabelInfoTip"},"$text"),getText:function(item){
return item.label+": "+formatTime(item.value);
},render:function(pie,item,_164){
var text=pie.getLabelTooltipText(item);
this.tag.replace({text:text},_164);
}});
}
}
});
HAR.ns(function(){
with(Domplate){
with(HAR.Lib){
function Pie(){
}
Pie.prototype={data:[],title:"",getLabelTooltipText:function(item){
return item.label+": "+formatSize(item.value);
},cleanUp:function(){
for(var i=0;i<this.data.length;i++){
this.data[i].value=0;
this.data[i].count=0;
}
}};
function TimingPie(){
}
TimingPie.prototype=HAR.extend(Pie.prototype,{title:"Summary of request times.",data:[{value:0,label:$STR("pie.label.DNS"),color:"rgb(119, 192, 203)"},{value:0,label:$STR("pie.label.Connect"),color:"rgb(179, 222, 93)"},{value:0,label:$STR("pie.label.Blocked"),color:"rgb(228, 214, 193)"},{value:0,label:$STR("pie.label.Send"),color:"rgb(224, 171, 157)"},{value:0,label:$STR("pie.label.Wait"),color:"rgb(163, 150, 190)"},{value:0,label:$STR("pie.label.Receive"),color:"rgb(194, 194, 194)"}],getLabelTooltipText:function(item){
return item.label+": "+formatTime(item.value);
}});
function ContentPie(){
}
ContentPie.prototype=HAR.extend(Pie.prototype,{title:"Summary of content types.",data:[{value:0,label:$STR("pie.label.HTML/Text"),color:"rgb(174, 234, 218)"},{value:0,label:$STR("pie.label.JavaScript"),color:"rgb(245, 230, 186)"},{value:0,label:$STR("pie.label.CSS"),color:"rgb(212, 204, 219)"},{value:0,label:$STR("pie.label.Image"),color:"rgb(220, 171, 181)"},{value:0,label:$STR("pie.label.Flash"),color:"rgb(166, 156, 222)"},{value:0,label:$STR("pie.label.Others"),color:"rgb(229, 171, 255)"}],getLabelTooltipText:function(item){
return item.count+"x"+" "+item.label+": "+formatSize(item.value);
}});
function TrafficPie(){
}
TrafficPie.prototype=HAR.extend(Pie.prototype,{title:"Summary of sent and received bodies & headers.",data:[{value:0,label:$STR("pie.label.Headers Sent"),color:"rgb(247, 179, 227)"},{value:0,label:$STR("pie.label.Bodies Sent"),color:"rgb(226, 160, 241)"},{value:0,label:$STR("pie.label.Headers Received"),color:"rgb(166, 232, 166)"},{value:0,label:$STR("pie.label.Bodies Received"),color:"rgb(168, 196, 173)"}]});
function CachePie(){
}
CachePie.prototype=HAR.extend(Pie.prototype,{title:"Comparison of downloaded data from the server and browser cache.",data:[{value:0,label:$STR("pie.label.Downloaded"),color:"rgb(182, 182, 182)"},{value:0,label:$STR("pie.label.Partial"),color:"rgb(218, 218, 218)"},{value:0,label:$STR("pie.label.From Cache"),color:"rgb(239, 239, 239)"}],getLabelTooltipText:function(item){
return item.count+"x"+" "+item.label+": "+formatSize(item.value);
}});
var _237=new TimingPie();
var _238=new ContentPie();
var _239=new TrafficPie();
var _23a=new CachePie();
var _23b={"text/javascript":1,"text/jscript":1,"application/javascript":1,"application/x-javascript":1,"text/js":1};
var _23c={"text/plain":1,"text/html":1};
var _23d={"text/css":1};
var _23e={"application/x-shockwave-flash":1};
var _23f={"text/x-json":1,"text/x-js":1,"application/json":1,"application/x-js":1};
var _240={"application/xml":1,"application/xhtml+xml":1,"application/vnd.mozilla.xul+xml":1,"text/xml":1,"text/xul":1,"application/rdf+xml":1};
var _241={"text/xsl":1,"text/sgml":1,"text/rtf":1,"text/x-setext":1,"text/richtext":1,"text/tab-separated-values":1,"text/rdf":1,"text/xif":1,"text/ecmascript":1,"text/vnd.curl":1,"text/vbscript":1,"view-source":1,"view-fragment":1,"application/x-httpd-php":1,"application/ecmascript":1,"application/http-index-format":1};
HAR.Page.Stats=domplate({rootNode:null,tag:DIV({"class":"pageStatsBody",style:"height: auto; display: none"}),render:function(_242){
HAR.log("har; Page statistics, render: ");
this.rootNode=this.tag.replace({},_242);
this.timingPie=HAR.Page.Pie.render(_237,this.rootNode);
this.contentPie=HAR.Page.Pie.render(_238,this.rootNode);
this.trafficPie=HAR.Page.Pie.render(_239,this.rootNode);
this.cachePie=HAR.Page.Pie.render(_23a,this.rootNode);
this.cachePie.style.borderRight=0;
return this.rootNode;
},update:function(page){
if(!this.isOpened()){
return;
}
this.cleanUp();
var _244=timingsType.timingsType.properties;
var _245=HAR.Model.getPageEntries(page);
for(var i=0;i<_245.length;i++){
var _247=_245[i];
var _248=0;
for(var _249 in _244){
_237.data[_248++].value+=_247.timings[_249];
}
var _24a=_247.response.bodySize>0?_247.response.bodySize:0;
var _24b=_247.response.content.mimeType;
if(_23c[_24b]){
_238.data[0].value+=_24a;
_238.data[0].count++;
}else{
if(_23b[_24b]){
_238.data[1].value+=_24a;
_238.data[1].count++;
}else{
if(_23d[_24b]){
_238.data[2].value+=_24a;
_238.data[2].count++;
}else{
if(_23d[_24b]){
_238.data[5].value+=_24a;
_238.data[5].count++;
}
}
}
}
_239.data[0].value+=_247.request.headersSize>0?_247.request.headersSize:0;
_239.data[1].value+=_247.request.bodySize>0?_247.request.bodySize:0;
_239.data[2].value+=_247.response.headersSize>0?_247.response.headersSize:0;
_239.data[3].value+=_24a;
if(_247.response.status==206){
_23a.data[1].value+=_24a;
_23a.data[1].count++;
}else{
if(_247.response.status==304){
_23a.data[2].value+=_24a;
_23a.data[2].count++;
}else{
if(_24a>0){
_23a.data[0].value+=_24a;
_23a.data[0].count++;
}
}
}
}
HAR.Page.Pie.draw(getElementByClass(this.timingPie,"pieGraph"),_237);
HAR.Page.Pie.draw(getElementByClass(this.contentPie,"pieGraph"),_238);
HAR.Page.Pie.draw(getElementByClass(this.trafficPie,"pieGraph"),_239);
HAR.Page.Pie.draw(getElementByClass(this.cachePie,"pieGraph"),_23a);
},cleanUp:function(){
_237.cleanUp();
_238.cleanUp();
_239.cleanUp();
_23a.cleanUp();
},showInfoTip:function(_24c,_24d,x,y){
return HAR.Page.Pie.showInfoTip(_24c,_24d,x,y);
},show:function(_250){
if(this.isOpened()){
return;
}
setClass(this.rootNode,"opened");
if(dojo.isIE||!_250){
this.rootNode.style.display="block";
}else{
dojo.fx.wipeIn({node:this.rootNode}).play();
}
if(!HAR.Page.Timeline.highlightedPage){
if(HAR.Model.input&&HAR.Model.input.log.pages.length){
HAR.Page.Timeline.highlightedPage=HAR.Model.input.log.pages[0];
}
}
HAR.Page.ShowStats.update();
HAR.Page.Stats.update(HAR.Page.Timeline.highlightedPage);
},hide:function(_251){
removeClass(this.rootNode,"opened");
if(dojo.isIE){
this.rootNode.style.display="none";
}else{
dojo.fx.wipeOut({node:this.rootNode}).play();
}
HAR.Page.ShowStats.update();
},isOpened:function(){
return hasClass(this.rootNode,"opened");
}});
HAR.Page.ShowStats=domplate({tag:SPAN({"class":"harButton harShowStats",onclick:"$onToggle"},$STR("button.Show_Page_Stats")),update:function(){
var _252=HAR.Tab.Preview.stats.isOpened();
var _253=getElementByClass(document.documentElement,"harShowStats");
_253.innerHTML=_252?$STR("button.Hide_Page_Stats"):$STR("button.Show_Page_Stats");
},onToggle:function(_254){
var e=HAR.eventFix(_254||window.event);
cancelEvent(_254);
var _256=e.target;
if(!hasClass(_256,"harButton")){
return;
}
var _257=HAR.Tab.Preview.stats;
var _258=_257.isOpened();
if(_258){
_257.hide(true);
}else{
_257.show(true);
}
setCookie("stats",!_258);
}});
}
}
});
HAR.ns(function(){
with(Domplate){
with(HAR.Lib){
HAR.Page.Timeline=domplate({rootNode:null,maxElapsedTime:-1,graphCols:FOR("page","$pages",TD({"class":"pageTimelineCol"},DIV({"class":"pageBar",style:"height: $page|getHeight\\px",onmousemove:"$onMouseMove",_repObject:"$page",onclick:"$onClick"}))),pageGraph:TABLE({"class":"pageTimelineTable",cellpadding:0,cellspacing:0},TBODY(TR({"class":"pageTimelineRow"},TAG("$graphCols",{pages:"$pages"})))),tag:DIV({"class":"pageTimelineBody",style:"height: auto; display: none"},TABLE({style:"margin: 7px;",cellpadding:0,cellspacing:0},TBODY(TR(TD(TAG("$pageGraph",{pages:"$pages"}))),TR(TD({"class":"pageDescContainer",colspan:2}))))),getHeight:function(_52){
var _53=Math.round((_52.pageTimings.onLoad/this.maxElapsedTime)*100);
return Math.max(1,_53);
},onClick:function(_54){
var e=HAR.eventFix(_54||window.event);
var _56=e.target;
if(!hasClass(_56,"pageBar")){
return;
}
HAR.Rep.PageList.togglePage(_56.repObject);
},onMouseMove:function(_57){
var e=HAR.eventFix(_57||window.event);
var _59=e.target;
if(hasClass(_59,"pageBar")){
this.updateDesc(_59);
}
},updateDesc:function(_5a){
var _5b=_5a.repObject;
this.highlightedPage=_5b;
if(hasClass(this.rootNode,"opened")){
var _5c=getElementByClass(this.rootNode,"pageDescContainer");
HAR.Page.Timeline.Desc.render(_5c,_5a);
}
HAR.Page.Stats.update(_5b);
},updateDescByPage:function(_5d){
var _5e=this.getPageBar(_5d);
if(_5e){
this.updateDesc(_5e);
}
},getPageBar:function(_5f){
if(!this.rootNode){
return;
}
var _60=getElementByClass(this.rootNode,"pageTimelineTable");
var col=_60.firstChild.firstChild.firstChild;
while(col){
if(col.firstChild.repObject==_5f){
return col.firstChild;
}
col=col.nextSibling;
}
},append:function(_62){
if(!this.rootNode){
return;
}
HAR.log("har; Page timeline, append inputData: ",_62);
this.recalcLayout();
var _63=getElementByClass(this.rootNode,"pageTimelineRow");
this.graphCols.insertCols({pages:_62.log.pages},_63);
this.updateSelection();
},recalcLayout:function(){
var _64=this.maxElapsedTime;
delete this.maxElapsedTime;
var _65=HAR.Model.getPages();
for(var i=0;i<_65.length;i++){
var _67=_65[i].pageTimings.onLoad;
if(!this.maxElapsedTime||this.maxElapsedTime<_67){
this.maxElapsedTime=_67;
}
}
if(_64!=this.maxElapsedTime){
var _68=getElementsByClass(this.rootNode,"pageBar");
for(var i=0;i<_68.length;i++){
_68[i].style.height=this.getHeight(_68[i].repObject)+"px";
}
}
},removePage:function(_69){
var _6a=this.getPageBar(_69);
if(!_6a){
return;
}
var col=_6a.parentNode;
col.parentNode.removeChild(col);
this.recalcLayout();
if(this.highlightedPage==_69){
this.highlightedPage=null;
this.updateSelection();
}
if(!this.highlightedPage){
var _6c=getElementByClass(this.rootNode,"pageDescBox");
_6c.style.visibility="hidden";
}
},render:function(_6d){
this.rootNode=this.tag.replace({pages:HAR.Model.getPages()},_6d);
this.recalcLayout();
},show:function(_6e){
if(this.isOpened()){
return;
}
if(dojo.isIE||!_6e){
this.rootNode.style.display="block";
}else{
dojo.fx.wipeIn({node:this.rootNode}).play();
}
setClass(this.rootNode,"opened");
HAR.Page.ShowTimeline.update();
this.updateSelection();
},updateSelection:function(){
if(!this.highlightedPage&&HAR.Model.getPages().length>0){
var _6f=getElementByClass(this.rootNode,"pageBar");
if(_6f){
HAR.Lib.fireEvent(_6f,"mousemove");
}
}
},hide:function(_70){
if(!this.isOpened()){
return;
}
if(dojo.isIE||!_70){
this.rootNode.style.display="none";
}else{
dojo.fx.wipeOut({node:this.rootNode}).play();
}
removeClass(this.rootNode,"opened");
HAR.Page.ShowTimeline.update();
},isOpened:function(){
return hasClass(this.rootNode,"opened");
}});
HAR.Page.Timeline.Desc=domplate({tag:DIV({"class":"pageDescBox"},DIV({"class":"connector"}),DIV({"class":"desc"},SPAN({"class":"summary"},"$page|getSummary"),SPAN({"class":"time"},"$page|getTime"),SPAN({"class":"title"},"$page|getTitle"),PRE({"class":"comment"},"$page|getComment"))),getSummary:function(_71){
var _72="";
if(_71.pageTimings.onLoad){
_72+=$STR("label.Page_Load")+": "+formatTime(_71.pageTimings.onLoad)+", ";
}
var _73=HAR.Model.getPageEntries(_71);
_72+=HAR.Tab.Preview.formatRequestCount(_73.length);
return _72;
},getTime:function(_74){
var _75=parseISO8601(_74.startedDateTime);
var _76=new Date(_75);
return _76.toLocaleString();
},getTitle:function(_77){
return _77.title;
},getComment:function(_78){
return _78._comment?_78._comment:"";
},render:function(_79,_7a){
var _7b=_7a.repObject;
var _7c=this.tag.replace({page:_7b},_79);
var _7d=getElementByClass(_7c,"connector");
_7d.style.marginLeft=_7a.parentNode.offsetLeft+"px";
}});
HAR.Page.ShowTimeline=domplate({tag:SPAN({"class":"harButton harShowTimeline",onclick:"$onToggle"},$STR("button.Show_Page_Timeline")),update:function(){
var _7e=HAR.Tab.Preview.timeline.isOpened();
var _7f=getElementByClass(document.documentElement,"harShowTimeline");
_7f.innerHTML=_7e?$STR("button.Hide_Page_Timeline"):$STR("button.Show_Page_Timeline");
},onToggle:function(_80){
var e=HAR.eventFix(_80||window.event);
cancelEvent(_80);
var _82=e.target;
if(!hasClass(_82,"harButton")){
return;
}
var _83=HAR.Tab.Preview.timeline;
var _84=_83.isOpened();
if(_84){
_83.hide(true);
}else{
_83.show(true);
}
setCookie("timeline",!_84);
}});
}
}
});
HAR.ns(function(){
with(Domplate){
with(HAR.Lib){
HAR.Rep.EntryBody=domplate({tag:DIV({"class":"netInfoBody",_repObject:"$file"},TAG("$infoTabs",{file:"$file"}),TAG("$infoBodies",{file:"$file"})),infoTabs:DIV({"class":"netInfoTabs"},A({"class":"netInfoParamsTab netInfoTab",onclick:"$onClickTab",view:"Params",$collapsed:"$file|hideParams"},$STR("URLParameters")),A({"class":"netInfoHeadersTab netInfoTab",onclick:"$onClickTab",view:"Headers"},$STR("Headers")),A({"class":"netInfoPostTab netInfoTab",onclick:"$onClickTab",view:"Post",$collapsed:"$file|hidePost"},$STR("Post")),A({"class":"netInfoPutTab netInfoTab",onclick:"$onClickTab",view:"Put",$collapsed:"$file|hidePut"},$STR("Put")),A({"class":"netInfoCookiesTab netInfoTab",onclick:"$onClickTab",view:"Cookies",$collapsed:"$file|hideCookies"},$STR("Cookies")),A({"class":"netInfoResponseTab netInfoTab",onclick:"$onClickTab",view:"Response",$collapsed:"$file|hideResponse"},$STR("Response")),A({"class":"netInfoCacheTab netInfoTab",onclick:"$onClickTab",view:"Cache",$collapsed:"$file|hideCache"},$STR("Cache")),A({"class":"netInfoHtmlTab netInfoTab",onclick:"$onClickTab",view:"Html",$collapsed:"$file|hideHtml"},$STR("HTML"))),infoBodies:DIV({"class":"netInfoBodies"},TABLE({"class":"netInfoParamsText netInfoText netInfoParamsTable",cellpadding:0,cellspacing:0},TBODY()),TABLE({"class":"netInfoHeadersText netInfoText netInfoHeadersTable",cellpadding:0,cellspacing:0},TBODY(TR({"class":"netInfoResponseHeadersTitle"},TD({colspan:2},DIV({"class":"netInfoHeadersGroup"},$STR("ResponseHeaders")))),TR({"class":"netInfoRequestHeadersTitle"},TD({colspan:2},DIV({"class":"netInfoHeadersGroup"},$STR("RequestHeaders")))))),DIV({"class":"netInfoPostText netInfoText"},TABLE({"class":"netInfoPostTable",cellpadding:0,cellspacing:0},TBODY())),DIV({"class":"netInfoPutText netInfoText"},TABLE({"class":"netInfoPutTable",cellpadding:0,cellspacing:0},TBODY())),DIV({"class":"netInfoCookiesText netInfoText"},TABLE({"class":"netInfoCookiesTable",cellpadding:0,cellspacing:0},TBODY(TR({"class":"netInfoResponseCookiesTitle"},TD({colspan:2},DIV({"class":"netInfoCookiesGroup"},$STR("Response Cookies")))),TR({"class":"netInfoRequestCookiesTitle"},TD({colspan:2},DIV({"class":"netInfoCookiesGroup"},$STR("Request Cookies"))))))),DIV({"class":"netInfoResponseText netInfoText"},DIV({"class":"loadResponseMessage"})),DIV({"class":"netInfoCacheText netInfoText"},TABLE({"class":"netInfoCacheTable",cellpadding:0,cellspacing:0},TBODY())),DIV({"class":"netInfoHtmlText netInfoText"},IFRAME({"class":"netInfoHtmlPreview"}))),headerDataTag:FOR("param","$headers",TR(TD({"class":"netInfoParamName"},"$param.name"),TD({"class":"netInfoParamValue"},PRE("$param|getParamValue")))),hideParams:function(file){
return !file.request.queryString||!file.request.queryString.length;
},hidePost:function(file){
return file.request.method.toUpperCase()!="POST";
},hidePut:function(file){
return file.request.method.toUpperCase()!="PUT";
},hideCookies:function(file){
return true;
},hideResponse:function(file){
return !file.response.content.size;
},hideCache:function(file){
if(!file.cache){
return true;
}
if(!file.cache.afterRequest){
return true;
}
if(file.category=="image"){
return true;
}
return false;
},hideHtml:function(file){
return (file.response.content.mimeType!="text/html")&&(file.mimeType!="application/xhtml+xml");
},onClickTab:function(_2b3){
var e=HAR.eventFix(_2b3||window.event);
this.selectTab(e.target);
},getParamValue:function(_2b5){
return wrapText(_2b5.value,true);
},selectTabByName:function(_2b6,_2b7){
var tab=getChildByClass(_2b6,"netInfoTabs","netInfo"+_2b7+"Tab");
if(tab){
this.selectTab(tab);
}
},selectTab:function(tab){
var _2ba=getAncestorByClass(tab,"netInfoBody");
var view=tab.getAttribute("view");
if(_2ba.selectedTab){
_2ba.selectedTab.removeAttribute("selected");
_2ba.selectedText.removeAttribute("selected");
}
var _2bc="netInfo"+view+"Text";
_2ba.selectedTab=tab;
_2ba.selectedText=getElementByClass(_2ba,_2bc);
_2ba.selectedTab.setAttribute("selected","true");
_2ba.selectedText.setAttribute("selected","true");
var file=getRepObject(_2ba);
if(file){
this.updateInfo(_2ba,file);
}
},updateInfo:function(_2be,file){
var tab=_2be.selectedTab;
if(hasClass(tab,"netInfoParamsTab")){
if(file.request.queryString&&!_2be.urlParamsPresented){
_2be.urlParamsPresented=true;
this.insertHeaderRows(_2be,file.request.queryString,"Params");
}
}
if(hasClass(tab,"netInfoHeadersTab")){
if(file.response.headers&&!_2be.responseHeadersPresented){
_2be.responseHeadersPresented=true;
this.insertHeaderRows(_2be,file.response.headers,"Headers","ResponseHeaders");
}
if(file.request.headers&&!_2be.requestHeadersPresented){
_2be.requestHeadersPresented=true;
this.insertHeaderRows(_2be,file.request.headers,"Headers","RequestHeaders");
}
}
if(hasClass(tab,"netInfoPostTab")){
var _2c1=getElementByClass(_2be,"netInfoPostText");
if(!_2be.postPresented){
_2be.postPresented=true;
this.setPostText(file.request.postData,_2be,_2c1);
}
}
if(hasClass(tab,"netInfoPutTab")){
var _2c2=getElementByClass(_2be,"netInfoPutText");
if(!_2be.putPresented){
_2be.putPresented=true;
this.setPostText(file.request.postData,_2be,_2c2);
}
}
if(hasClass(tab,"netInfoCookiesTab")){
if(file.response.cookies&&!_2be.responseCookiesPresented){
_2be.responseCookiesPresented=true;
this.insertHeaderRows(_2be,file.response.cookies,"Cookies","ResponseCookies");
}
if(file.request.cookies&&!_2be.requestCookiesPresented){
_2be.requestCookiesPresented=true;
this.insertHeaderRows(_2be,file.request.cookies,"Cookies","RequestCookies");
}
}
if(hasClass(tab,"netInfoResponseTab")&&!_2be.responsePresented){
var _2c3=getElementByClass(_2be,"netInfoResponseText");
if(file.category=="image"){
_2be.responsePresented=true;
var _2c4=_2be.ownerDocument.createElement("img");
_2c4.src=file.href;
clearNode(_2c3);
_2c3.appendChild(_2c4,_2c3);
}else{
this.setResponseText(file,_2be,_2c3);
}
}
if(hasClass(tab,"netInfoCacheTab")&&!_2be.cachePresented){
_2be.cachePresented=true;
var _2c3=getElementByClass(_2be,"netInfoCacheText");
if(file.cache&&file.cache.afterRequest){
var _2c5=file.cache.afterRequest;
var _2c6=[];
for(var prop in _2c5){
_2c6.push({name:prop,value:_2c5[prop]});
}
this.insertHeaderRows(_2be,_2c6,"Cache");
}
}
if(hasClass(tab,"netInfoHtmlTab")&&!_2be.htmlPresented){
_2be.htmlPresented=true;
var text=file.response.content.text;
var _2c9=getElementByClass(_2be,"netInfoHtmlPreview");
_2c9.contentWindow.document.body.innerHTML=text;
}
},setPostText:function(_2ca,_2cb,_2cc){
if(!_2ca){
return;
}
if(_2ca.mimeType=="application/x-www-form-urlencoded"){
this.insertHeaderRows(_2cb,_2ca.params,"Post");
}else{
insertWrappedText(_2ca.text,_2cc);
}
},setResponseText:function(file,_2ce,_2cf){
var text=file.response.content.text;
insertWrappedText(text,_2cf);
_2ce.responsePresented=true;
},insertHeaderRows:function(_2d1,_2d2,_2d3,_2d4){
var _2d5=getElementByClass(_2d1,"netInfo"+_2d3+"Table");
var _2d6=_2d5.firstChild;
var _2d7=getChildByClass(_2d6,"netInfo"+_2d4+"Title");
if(_2d2.length){
this.headerDataTag.insertRows({headers:_2d2},_2d7?_2d7:_2d6);
removeClass(_2d7,"collapsed");
}else{
setClass(_2d7,"collapsed");
}
}});
}
}
});
HAR.ns(function(){
with(Domplate){
with(HAR.Lib){
HAR.Rep.EntryTimeInfoTip=domplate({tableTag:TABLE({"class":"timeInfoTip"},TBODY()),timingsTag:FOR("time","$timings",TR({"class":"timeInfoTipRow",$collapsed:"$time|hideBar"},TD({"class":"$time|getBarClass timeInfoTipBar",$loaded:"$time.loaded",$fromCache:"$time.fromCache"}),TD({"class":"timeInfoTipCell startTime"},"$time.start|formatStartTime"),TD({"class":"timeInfoTipCell elapsedTime"},"$time.elapsed|formatTime"),TD("$time|getLabel"))),startTimeTag:TR(TD(),TD("$startTime.time|formatStartTime"),TD({"colspan":2},"$startTime|getLabel")),separatorTag:TR(TD({"colspan":4,"height":"10px"})),eventsTag:FOR("event","$events",TR({"class":"timeInfoTipEventRow"},TD({"class":"timeInfoTipBar",align:"center"},DIV({"class":"$event|getBarClass timeInfoTipEventBar"})),TD("$event.start|formatStartTime"),TD({"colspan":2},"$event|getLabel"))),hideBar:function(obj){
return !obj.elapsed&&obj.bar=="request.phase.Blocking";
},getBarClass:function(obj){
var _287=obj.bar.substr(obj.bar.lastIndexOf(".")+1);
return "net"+_287+"Bar";
},formatTime:function(time){
return HAR.Lib.formatTime(time);
},formatStartTime:function(time){
var _28a=time>0;
var _28b=HAR.Lib.formatTime(Math.abs(time));
if(!time){
return _28b;
}
return (_28a>0?"+":"-")+_28b;
},getLabel:function(obj){
return $STR(obj.bar);
},render:function(row,_28e){
var file=row.repObject;
var _290=parseISO8601(file.startedDateTime);
var _291=HAR.Rep.EntryTimeInfoTip.tableTag.replace({},_28e);
var _292={};
_292.time=_290-row.phase.startTime;
_292.bar="request.Started";
this.startTimeTag.insertRows({startTime:_292},_291.firstChild);
this.separatorTag.insertRows({},_291.firstChild);
var _292=0;
var _293=[];
_293.push({bar:"request.phase.Resolving",elapsed:file.timings.dns,start:_292});
_293.push({bar:"request.phase.Connecting",elapsed:file.timings.connect,start:_292+=file.timings.dns});
_293.push({bar:"request.phase.Blocking",elapsed:file.timings.blocked,start:_292+=file.timings.connect});
_293.push({bar:"request.phase.Sending",elapsed:file.timings.send,start:_292+=file.timings.blocked});
_293.push({bar:"request.phase.Waiting",elapsed:file.timings.wait,start:_292+=file.timings.send});
_293.push({bar:"request.phase.Receiving",elapsed:file.timings.receive,start:_292+=file.timings.wait,loaded:file.loaded,fromCache:file.fromCache});
this.timingsTag.insertRows({timings:_293},_291.firstChild);
var _294=[];
var page=HAR.Model.getParentPage(file);
var _296=page?parseISO8601(page.startedDateTime):null;
if(page&&page.pageTimings.onContentLoad>0){
_294.push({bar:"ContentLoad",start:_296+page.pageTimings.onContentLoad-_290});
}
if(page&&page.pageTimings.onLoad>0){
_294.push({bar:"WindowLoad",start:_296+page.pageTimings.onLoad-_290});
}
if(!_294.length){
return;
}
this.separatorTag.insertRows({},_291.firstChild);
this.eventsTag.insertRows({events:_294},_291.firstChild);
return true;
}});
HAR.Rep.EntrySizeInfoTip=domplate({tag:DIV({"class":"sizeInfoTip"},"$file|getSize"),getSize:function(file){
var _298=file.response.bodySize;
return $STRF("tooltip.size",[formatSize(_298),((file.size<0)?"?":formatNumber(_298))]);
}});
}
}
});
HAR.ns(function(){
with(Domplate){
with(HAR.Lib){
HAR.Rep.EntryList=domplate({tableTag:TABLE({"class":"netTable",cellpadding:0,cellspacing:0,onclick:"$onClick"},TBODY(TR(TD({width:"20%"}),TD({width:"10%"}),TD({width:"10%"}),TD({width:"10%"}),TD({width:"50%"})))),fileTag:FOR("file","$files",TR({"class":"netRow loaded",$hasHeaders:"$file|hasResponseHeaders",$responseError:"$file|isError",$fromCache:"$file|isFromCache"},TD({"class":"netHrefCol netCol"},DIV({"class":"netHrefLabel netLabel",style:"margin-left: $file|getIndent\\px"},"$file|getHref"),DIV({"class":"netFullHrefLabel netHrefLabel netLabel",style:"margin-left: $file|getIndent\\px"},"$file|getFullHref")),TD({"class":"netStatusCol netCol"},DIV({"class":"netStatusLabel netLabel"},"$file|getStatus")),TD({"class":"netDomainCol netCol"},DIV({"class":"netDomainLabel netLabel"},"$file|getDomain")),TD({"class":"netSizeCol netCol"},DIV({"class":"netSizeLabel netLabel"},"$file|getSize")),TD({"class":"netTimeCol netCol"},DIV({"class":"netBar"},"&nbsp;",DIV({"class":"netResolvingBar",style:"left: $file.offset"}),DIV({"class":"netConnectingBar",style:"left: $file.offset"}),DIV({"class":"netBlockingBar",style:"left: $file.offset"}),DIV({"class":"netSendingBar",style:"left: $file.offset"}),DIV({"class":"netWaitingBar",style:"left: $file.offset"}),DIV({"class":"netContentLoadBar",style:"left: $file.offset"}),DIV({"class":"netWindowLoadBar",style:"left: $file.offset"}),DIV({"class":"netReceivingBar",style:"left: $file.offset; width: $file.width"},SPAN({"class":"netTimeLabel"},"$file|getElapsedTime")))))),headTag:TR({"class":"netHeadRow"},TD({"class":"netHeadCol",colspan:5},DIV({"class":"netHeadLabel"},"$doc.rootFile.href"))),netInfoTag:TR({"class":"netInfoRow"},TD({"class":"netInfoCol",colspan:5})),activationTag:TR({"class":"netRow netActivationRow"},TD({"class":"netCol netActivationLabel",colspan:5},$STR("net.ActivationMessage"))),summaryTag:TR({"class":"netRow netSummaryRow"},TD({"class":"netCol",colspan:3},DIV({"class":"netCountLabel netSummaryLabel"},"-")),TD({"class":"netTotalSizeCol netCol"},DIV({"class":"netTotalSizeLabel netSummaryLabel"},"0KB")),TD({"class":"netTotalTimeCol netCol"},DIV({"class":"",style:"width: 100%"},DIV({"class":"netCacheSizeLabel netSummaryLabel"},"(",SPAN("0KB"),SPAN(" "+$STR("FromCache")),")"),DIV({"class":"netTimeBar"},SPAN({"class":"netTotalTimeLabel netSummaryLabel"},"0ms"))))),getIndent:function(file){
return 0;
},isError:function(file){
var _123=Math.floor(file.response.status/100);
return _123==4||_123==5;
},isFromCache:function(file){
return file.cache&&file.cache.afterRequest;
},getHref:function(file){
return file.request.method+" "+getFileName(this.getFullHref(file));
},getFullHref:function(file){
return file.request.url;
},getStatus:function(file){
var _128=file.response.status>0?(file.response.status+" "):"";
return _128+file.response.statusText;
},getDomain:function(file){
return getPrettyDomain(file.request.url);
},getSize:function(file){
return this.formatSize(file.response.bodySize);
},hasResponseHeaders:function(file){
return true;
},formatSize:function(_12c){
return formatSize(_12c);
},getElapsedTime:function(file){
return formatTime(file.time);
},onClick:function(_12e){
var e=HAR.eventFix(_12e||window.event);
if(isLeftClick(_12e)){
var row=getAncestorByClass(e.target,"netRow");
if(row){
this.toggleHeadersRow(row);
cancelEvent(_12e);
}
}
},clear:function(){
clearNode(this.panelNode);
this.table=null;
this.summaryRow=null;
this.limitRow=null;
this.queue=[];
this.invalidPhases=false;
},setFilter:function(_131){
this.filterCategory=_131;
var _132=this.panelNode;
for(var _133 in fileCategories){
if(_131!="all"&&_133!=_131){
setClass(_132,"hideCategory-"+_133);
}else{
removeClass(_132,"hideCategory-"+_133);
}
}
},toggleHeadersRow:function(row){
if(!hasClass(row,"hasHeaders")){
return;
}
var file=row.repObject;
toggleClass(row,"opened");
if(hasClass(row,"opened")){
var _136=HAR.Rep.EntryBody;
var _137=this.netInfoTag.insertRows({},row)[0];
_137.repObject=file;
var _138=_136.tag.replace({file:file},_137.firstChild);
_136.selectTabByName(_138,"Headers");
}else{
var _137=row.nextSibling;
var _138=getElementByClass(_137,"netInfoBody");
row.parentNode.removeChild(_137);
}
}});
}
}
});
HAR.ns(function(){
with(Domplate){
with(HAR.Lib){
HAR.Rep.PageList=domplate({tableTag:TABLE({"class":"pageTable",cellpadding:0,cellspacing:0,onclick:"$onClick"},TBODY(TAG("$rowTag",{groups:"$groups"}))),rowTag:FOR("group","$groups",TR({"class":"pageRow",_repObject:"$group",onmousemove:"$onMouseMove"},TD({"class":"groupName pageCol"},SPAN({"class":"pageName"},"$group|getPageTitle"),SPAN({"class":"pageRemoveAction",title:"Remove Page",onclick:"$onRemove"})))),bodyTag:TR({"class":"pageInfoRow",style:"height:auto;display:none;"},TD({"class":"pageInfoCol"})),getPageTitle:function(_33){
return _33.title;
},getPageID:function(_34){
return "["+_34.id+"]";
},onClick:function(_35){
var e=HAR.eventFix(_35||window.event);
if(isLeftClick(_35)){
var row=getAncestorByClass(e.target,"pageRow");
if(row){
this.toggleRow(row);
cancelEvent(_35);
}
}
},onRemove:function(_38){
var e=HAR.eventFix(_38||window.event);
cancelEvent(_38);
var row=getAncestorByClass(e.target,"pageRow");
if(hasClass(row,"opened")){
this.toggleRow(row);
}
row.parentNode.removeChild(row);
var _3b=row.repObject;
var _3c=HAR.Model.removePage(_3b);
HAR.Tab.Preview.timeline.removePage(_3b);
HAR.Tab.Preview.stats.update(HAR.Tab.Preview.timeline.highlightedPage);
var _3d=getElementByClass(document.documentElement,"tabDOMBody");
if(_3d){
_3d.updated=false;
}
},onMouseMove:function(_3e){
var e=HAR.eventFix(_3e||window.event);
cancelEvent(_3e);
},toggleRow:function(row,_41){
var _42=hasClass(row,"opened");
if(_42&&_41){
return;
}
toggleClass(row,"opened");
if(hasClass(row,"opened")){
var _43=this.bodyTag.insertRows({},row)[0];
HAR.Tab.Preview.buildPageContent(_43.firstChild,row.repObject);
dojo.fx.wipeIn({node:_43}).play();
}else{
var _43=row.nextSibling;
dojo.fx.wipeOut({node:_43}).play();
row.parentNode.removeChild(_43);
}
},expandAll:function(_44){
var row=_44.firstChild.firstChild;
while(row){
if(hasClass(row,"pageRow")){
this.toggleRow(row,true);
}
row=row.nextSibling;
}
},getPageRow:function(_46){
var _47=getElementsByClass(this.rootNode,"pageRow");
for(var i=0;i<_47.length;i++){
var row=_47[i];
if(row.repObject==_46){
return row;
}
}
},render:function(_4a,_4b){
this.rootNode=this.tableTag.append({groups:_4a},_4b);
return this.rootNode;
},togglePage:function(_4c){
var row=this.getPageRow(_4c);
this.toggleRow(row);
},expandPage:function(_4e){
var row=this.getPageRow(_4e);
this.toggleRow(row,true);
},collapsePage:function(_50){
var row=this.getPageRow(_50);
if(hasClass(row,"opened")){
this.toggleRow(row);
}
}});
}
}
});
HAR.ns(function(){
with(Domplate){
HAR.Rep.Schema=domplate({errorTable:TABLE({"class":"errorTable",cellpadding:0,cellspacing:5},TBODY(FOR("error","$errors",TR({"class":"errorRow",_repObject:"$error"},TD({"class":"errorProperty"},SPAN("$error.property")),TD("&nbsp;"),TD({"class":"errorMessage"},SPAN("$error.message")))))),parseInputData:function(_2a,_2b,_2c){
if(!_2a){
return;
}
var _2d=HAR.Model.parseData(_2a);
if(!_2d){
this.renderErrorList(_2b,HAR.Model.errors);
return null;
}
if(_2c){
var _2e=HAR.now();
dojo.require("dojox.json.schema");
dojo.require("dojox.json.ref");
var _2f=dojox.json.ref.resolveJson(schema);
HAR.log("har; resolvedSchema %o, %o",_2f,_2f.logType);
var _30=dojox.json.schema.validate(_2d,_2f.logType);
if(!_30.valid){
HAR.log("har; Validation failed.",_30.errors);
this.renderErrorList(_2b,_30.errors);
return null;
}
HAR.log("har; validate data: "+HAR.Lib.formatTime(HAR.now()-_2e));
}
return _2d;
},renderErrorList:function(_31,_32){
this.errorTable.append({errors:_32},_31,this);
}});
}
});
HAR.ns(function(){
with(Domplate){
HAR.Rep.TabView=domplate(HAR.Rep,{listeners:[],tag:TABLE({"class":"tabView",cellpadding:0,cellspacing:0},TBODY(TR({"class":"tabViewRow"},TD({"class":"tabViewCol",valign:"top"},TAG("$tabList"))))),hideTab:function(_1){
return false;
},onClickTab:function(_2){
var e=HAR.eventFix(_2||window.event);
var _4=HAR.Lib.getAncestorByClass(e.target,"tab");
if(_4){
this.selectTab(_4);
}
},selectTabByName:function(_5,_6){
var _7=HAR.Lib.getElementByClass(_5,_6+"Tab");
if(_7){
this.selectTab(_7);
}
},selectTab:function(_8){
if(!HAR.Lib.hasClass(_8,"tab")){
return;
}
var _9=_8.getAttribute("view");
var _a=HAR.Lib.getAncestorByClass(_8,"tabViewBody");
if(_a.selectedTab){
_a.selectedTab.removeAttribute("selected");
_a.selectedBody.removeAttribute("selected");
HAR.Lib.removeClass(_a.selectedTab,"selected");
HAR.Lib.removeClass(_a.selectedBody,"selected");
}
var _b=HAR.Lib.getElementByClass(_a,"tab"+_9+"Body");
_a.selectedTab=_8;
_a.selectedBody=_b;
_a.selectedTab.setAttribute("selected","true");
_a.selectedBody.setAttribute("selected","true");
HAR.Lib.setClass(_a.selectedBody,"selected");
HAR.Lib.setClass(_a.selectedTab,"selected");
this.updateTabBody(_a,_9,null);
},updateTabBody:function(_c,_d,_e){
var _f=_c.selectedTab;
for(var i=0;i<this.listeners.length;i++){
var _11=this.listeners[i];
if(_11.onUpdateTabBody){
_11.onUpdateTabBody(_c,_d,_e);
}
}
},appendUpdateListener:function(_12){
this.listeners.push(_12);
},removeUpdateListener:function(_13){
remove(this.listeners,_13);
},render:function(obj,_15){
return this.tag.replace(obj,_15,this);
}});
}
});
HAR.ns(function(){
with(HAR.Lib){
with(Domplate){
HAR.Service.PageList=domplate({initialize:function(){
var _2a7=HAR.$("pageList");
if(!_2a7){
return;
}
var _2a8=HAR.Lib.getURLParameter("path");
HAR.Viewer.loadLocalArchive(_2a8,function(_2a9){
var _2aa=HAR.Rep.Schema.parseInputData(_2a9,_2a7,false);
if(_2aa){
HAR.Model.appendData(_2aa);
clearNode(_2a7);
var _2ab=HAR.Tab.Preview.buildPageList(_2a7,_2aa);
if(HAR.Lib.getURLParameter("expand")){
HAR.Rep.PageList.expandAll(_2ab);
}
}
});
}});
HAR.registerModule(HAR.Service.PageList);
}
}
});
HAR.ns(function(){
with(Domplate){
with(HAR.Lib){
HAR.Tab.DomView=domplate({render:function(_102,_103){
HAR.log("har; Render DOM tab.");
var _104=this.tag.replace({object:_102},_103);
if(_104.firstChild.firstChild){
this.toggleRow(_104.firstChild.firstChild);
}
},tag:TABLE({"class":"domTable",cellpadding:0,cellspacing:0,onclick:"$onClick"},TBODY(FOR("member","$object|memberIterator",TAG("$member|getRowTag",{member:"$member"})))),rowTag:TR({"class":"memberRow $member.open $member.type\\Row $member|hasChildren",$hasChildren:"$member|hasChildren",_repObject:"$member",level:"$member.level"},TD({"class":"memberLabelCell",style:"padding-left: $member.indent\\px"},SPAN({"class":"memberLabel $member.type\\Label"},"$member.name")),TD({"class":"memberValueCell"},TAG("$member.tag",{object:"$member.value"}))),loop:FOR("member","$members",TAG("$member|getRowTag",{member:"$member"})),hasChildren:function(_105){
return _105.hasChildren?"hasChildren":"";
},memberIterator:function(_106){
return this.getMembers(_106);
},getRowTag:function(_107){
return this.rowTag;
},onClick:function(_108){
var e=HAR.eventFix(_108||window.event);
if(!isLeftClick(_108)){
return;
}
var row=getAncestorByClass(e.target,"memberRow");
var _10b=getAncestorByClass(e.target,"memberLabel");
if(_10b&&hasClass(row,"hasChildren")){
this.toggleRow(row);
}
},toggleRow:function(row){
var _10d=parseInt(row.getAttribute("level"));
if(hasClass(row,"opened")){
removeClass(row,"opened");
var _10e=row.parentNode;
for(var _10f=row.nextSibling;_10f;_10f=row.nextSibling){
if(parseInt(_10f.getAttribute("level"))<=_10d){
break;
}
_10e.removeChild(_10f);
}
}else{
setClass(row,"opened");
var _110=row.repObject;
if(_110){
var _111=this.getMembers(_110.value,_10d+1);
if(_111){
this.loop.insertRows({members:_111},row);
}
}
}
},getMembers:function(_112,_113){
if(!_113){
_113=0;
}
var _114=[];
for(var p in _112){
var _116=_112[p];
if(typeof (_116)!="function"){
_114.push(this.createMember("dom",p,_116,_113));
}
}
return _114;
},createMember:function(type,name,_119,_11a){
var rep=HAR.Rep.Obj;
var tag=rep.shortTag?rep.shortTag:rep.tag;
var _11d=typeof (_119);
var _11e=this.hasProperties(_119)&&(_11d=="object");
return {name:name,value:_119,type:type,rowClass:"memberRow-"+type,open:"",level:_11a,indent:_11a*16,hasChildren:_11e,tag:tag};
},hasProperties:function(ob){
try{
for(var name in ob){
return true;
}
}
catch(exc){
}
return false;
}});
}
}
});
HAR.ns(function(){
with(Domplate){
with(HAR.Lib){
HAR.Tab.InputView=domplate({render:function(_299){
HAR.log("har; Render Input tab.");
var _29a=HAR.$("InputTabTemplate");
_299.innerHTML=_29a.innerHTML;
clearNode(_29a);
},onAppendPreview:function(_29b){
HAR.log("har; onAppendPreview");
if(!_29b){
_29b=HAR.$("sourceEditor").value;
}
var _29c=HAR.$("validate").checked;
var _29d=document.documentElement;
var _29e=getElementByClass(_29d,"tabPreviewBody");
var _29f=getElementByClass(_29e,"pageList");
var _2a0=HAR.Rep.Schema.parseInputData(_29b,_29f,_29c);
if(_2a0){
HAR.Model.appendData(_2a0);
HAR.Tab.Preview.append(_2a0,_29f);
var _2a1=HAR.$("sourceEditor");
_2a1.value="";
var _2a2=getElementByClass(_29d,"tabDOMBody");
_2a2.updated=false;
}
HAR.Viewer.selectTabByName("Preview");
},onDrop:function(_2a3){
cancelEvent(_2a3);
try{
this.handleDrop(_2a3.dataTransfer);
}
catch(err){
HAR.log("har; HAR.Tab.InputView.onDrop EXCEPTION",err);
}
},handleDrop:function(_2a4){
if(!_2a4){
return false;
}
var _2a5=_2a4.files;
if(!_2a5){
return;
}
HAR.log("har; HAR.Tab.InputView.handleDrop "+_2a5.length,_2a5);
for(var i=0;i<_2a5.length;i++){
this.onAppendPreview(_2a5[i].getAsText(""));
}
},onAbout:function(){
HAR.Viewer.selectTabByName("Help");
}});
}
}
});
HAR.ns(function(){
with(Domplate){
with(HAR.Lib){
HAR.Tab.Preview=HAR.extend({timeline:HAR.Page.Timeline,stats:HAR.Page.Stats,render:function(_85){
this.timeline.render(getElementByClass(_85,"pageTimeline"));
this.stats.render(getElementByClass(_85,"pageStats"));
if(getCookie("timeline")=="true"){
this.timeline.show(false);
}
if(getCookie("stats")=="true"){
this.stats.show(false);
}
},append:function(_86,_87){
var _88=getElementsByClass(_87,"errorTable");
for(var i=0;i<_88.length;i++){
var _8a=_88[i];
_8a.parentNode.removeChild(_8a);
}
this.buildPageList(_87,_86);
this.timeline.append(_86);
},buildPageList:function(_8b,_8c){
if(!_8c){
return;
}
var _8d=HAR.now();
this.buildPageContent(_8b,null);
var _8e;
var _8f=_8c.log.pages;
if(_8f&&_8f.length){
var _90=HAR.Rep.PageList;
_8e=_90.render(_8f,_8b);
if(_8e.firstChild.firstChild&&_8f.length==1){
_90.toggleRow(_8e.firstChild.firstChild);
}
}
_8b.updated=true;
HAR.log("har; Render preview data: "+formatTime(HAR.now()-_8d));
return _8e;
},buildPageContent:function(_91,_92){
var _93=HAR.Model.getPageEntries(_92);
if(!_93.length){
return;
}
var _94=HAR.Rep.EntryList;
this.table=_94.tableTag.replace({},_91,_94);
this.summaryRow=_94.summaryTag.insertRows({},this.table.firstChild)[0];
var _95=this.table.firstChild;
var _96=_95.lastChild.previousSibling;
var row=this.firstRow=_94.fileTag.insertRows({files:_93},_96)[0];
this.phases=[];
phaseMap=[];
var _98=1000;
var _99=null;
var _9a=_92?parseISO8601(_92.startedDateTime):null;
var _9b=(_92&&_92.pageTimings)?_92.pageTimings.onLoad:0;
for(var i=0;i<_93.length;i++){
var _9d=_93[i];
row.repObject=_9d;
row=row.nextSibling;
if(!_9a){
pageSstartedDateTime=parseISO8601(_9d.startedDateTime);
}
var _9e=parseISO8601(_9d.startedDateTime);
var _9f=_99?parseISO8601(_99.getLastStartTime()):0;
if(!_99||((_9e-_9f)>=_98)&&(_9e>(_9a+_9b))){
_99=this.startPhase(_9d);
}else{
_99.addFile(_9d);
}
if(_99.startTime==undefined||_99.startTime>_9e){
_99.startTime=_9e;
}
if(_99.endTime==undefined||_99.endTime<_9e+_9d.time){
_99.endTime=_9e+_9d.time;
}
if(_9d.phase==this.phases[0]&&_99.endTime<_9a+_9b){
_99.endTime=_9a+_9b;
}
}
this.updateTimeline(_92);
this.updateSummaries(_92);
},startPhase:function(_a0){
var _a1=new HAR.Model.Phase(_a0);
this.phases.push(_a1);
return _a1;
},calculateFileTimes:function(_a2,_a3,_a4){
if(_a4!=_a3.phase){
_a4=_a3.phase;
this.phaseStartTime=_a4.startTime;
this.phaseEndTime=_a4.endTime;
this.phaseElapsed=this.phaseEndTime-_a4.startTime;
}
var _a5=((_a3.timings.dns<0)?0:_a3.timings.dns);
var _a6=_a5+((_a3.timings.connect<0)?0:_a3.timings.connect);
var _a7=_a6+((_a3.timings.blocked<0)?0:_a3.timings.blocked);
var _a8=_a7+((_a3.timings.send<0)?0:_a3.timings.send);
var _a9=_a8+((_a3.timings.wait<0)?0:_a3.timings.wait);
var _aa=_a9+((_a3.timings.receive<0)?0:_a3.timings.receive);
var _ab=_a3.time;
var _ac=parseISO8601(_a3.startedDateTime);
this.barOffset=Math.floor(((_ac-this.phaseStartTime)/this.phaseElapsed)*100);
this.barResolvingWidth=Math.round((_a5/this.phaseElapsed)*100);
this.barConnectingWidth=Math.round((_a6/this.phaseElapsed)*100);
this.barBlockingWidth=Math.round((_a7/this.phaseElapsed)*100);
this.barSendingWidth=Math.round((_a8/this.phaseElapsed)*100);
this.barWaitingWidth=Math.round((_a9/this.phaseElapsed)*100);
this.barReceivingWidth=Math.round((_aa/this.phaseElapsed)*100);
if(_a2){
var _ad=parseISO8601(_a2.startedDateTime);
var _ae=_a2.pageTimings.onContentLoad;
if(_a3.phase==this.phases[0]&&_ae>0){
this.contentLoadBarOffset=Math.floor(((_ad+_ae-_a4.startTime)/this.phaseElapsed)*100);
}
var _af=_a2.pageTimings.onLoad;
if(_a3.phase==this.phases[0]&&_af>0){
this.windowLoadBarOffset=Math.floor(((_ad+_af-_a4.startTime)/this.phaseElapsed)*100);
}
}
return _a4;
},updateTimeline:function(_b0){
var _b1=this.table.firstChild;
var _b2;
for(var row=this.firstRow;row;row=row.nextSibling){
var _b4=row.repObject;
if(!_b4){
continue;
}
_b2=this.calculateFileTimes(_b0,_b4,_b2);
row.phase=_b4.phase;
delete _b4.phase;
var _b5=row.childNodes[4].firstChild.childNodes[1];
var _b6=_b5.nextSibling;
var _b7=_b6.nextSibling;
var _b8=_b7.nextSibling;
var _b9=_b8.nextSibling;
var _ba=_b9.nextSibling;
var _bb=_ba.nextSibling;
var _bc=_bb.nextSibling;
_b5.style.left=_b6.style.left=_b7.style.left=_b8.style.left=_b9.style.left=_bc.style.left=this.barOffset+"%";
_b5.style.width=this.barResolvingWidth+"%";
_b6.style.width=this.barConnectingWidth+"%";
_b7.style.width=this.barBlockingWidth+"%";
_b8.style.width=this.barSendingWidth+"%";
_b9.style.width=this.barWaitingWidth+"%";
_bc.style.width=this.barReceivingWidth+"%";
if(this.contentLoadBarOffset){
_ba.style.left=this.contentLoadBarOffset+"%";
_ba.style.display="block";
this.contentLoadBarOffset=null;
}
if(this.windowLoadBarOffset){
_bb.style.left=this.windowLoadBarOffset+"%";
_bb.style.display="block";
this.windowLoadBarOffset=null;
}
}
},updateSummaries:function(_bd){
var _be=this.phases;
var _bf=0,totalSize=0,cachedSize=0,totalTime=0;
for(var i=0;i<_be.length;++i){
var _c1=_be[i];
_c1.invalidPhase=false;
var _c2=this.summarizePhase(_c1);
_bf+=_c2.fileCount;
totalSize+=_c2.totalSize;
cachedSize+=_c2.cachedSize;
totalTime+=_c2.totalTime;
}
var row=this.summaryRow;
if(!row){
return;
}
var _c4=row.firstChild.firstChild;
_c4.firstChild.nodeValue=this.formatRequestCount(_bf);
var _c5=row.childNodes[1].firstChild;
_c5.setAttribute("totalSize",totalSize);
_c5.firstChild.nodeValue=formatSize(totalSize);
var _c6=row.lastChild.firstChild.firstChild;
_c6.setAttribute("collapsed",cachedSize==0);
_c6.childNodes[1].firstChild.nodeValue=formatSize(cachedSize);
var _c7=row.lastChild.firstChild.lastChild.firstChild;
var _c8=formatTime(totalTime);
if(_bd&&_bd.pageTimings.onLoad>0){
_c8+=" (onload: "+formatTime(_bd.pageTimings.onLoad)+")";
}
_c7.innerHTML=_c8;
},formatRequestCount:function(_c9){
return (_c9==1)?$STR("Request"):$STRF("RequestCount",[_c9]);
},summarizePhase:function(_ca){
var _cb=0,totalSize=0;
var _cc="all";
if(_cc=="all"){
_cc=null;
}
var _cd=0;
var _ce=0,maxTime=0;
for(var i=0;i<_ca.files.length;i++){
var _d0=_ca.files[i];
var _d1=parseISO8601(_d0.startedDateTime);
if(!_cc||_d0.category==_cc){
++_cd;
var _d2=_d0.response.content.size;
totalSize+=_d2;
if(_d0.response.status==304){
_cb+=_d2;
}
if(!_ce||_d1<_ce){
_ce=_d1;
}
var _d3=_d1+_d0.time;
if(_d3>maxTime){
maxTime=_d3;
}
}
}
var _d4=maxTime-_ce;
return {cachedSize:_cb,totalSize:totalSize,totalTime:_d4,fileCount:_cd};
},showInfoTip:function(_d5,_d6,x,y){
var row=getAncestorByClass(_d6,"netRow");
if(row){
if(getAncestorByClass(_d6,"netTimeCol")){
_d5.setAttribute("multiline",true);
var _da=row.repObject.startedDateTime+"-nettime";
if(_da==this.infoTipURL){
return true;
}
this.infoTipURL=_da;
return this.populateTimeInfoTip(_d5,row);
}else{
if(hasClass(_d6,"netSizeLabel")){
var _da=row.repObject.startedDateTime+"-netsize";
if(_da==this.infoTipURL){
return true;
}
this.infoTipURL=_da;
return this.populateSizeInfoTip(_d5,row);
}
}
return;
}
var _db=getAncestorByClass(_d6,"pageStats");
if(_db){
return HAR.Page.Stats.showInfoTip(_d5,_d6,x,y);
}
},populateTimeInfoTip:function(_dc,row){
HAR.Rep.EntryTimeInfoTip.render(row,_dc);
return true;
},populateSizeInfoTip:function(_de,row){
var _de=HAR.Rep.EntrySizeInfoTip.tag.replace({file:row.repObject},_de);
return true;
}});
}
}
});
HAR.ns(function(){
with(Domplate){
with(HAR.Lib){
HAR.Viewer=domplate({tabView:null,initialize:function(){
var _259=HAR.$("content");
if(!_259){
return;
}
this.tabView=this.TabView.render(_259);
this.selectTabByName("Input");
var _25a=getURLParameter("example");
if(!_25a){
_25a=getURLParameter("path");
}
if(_25a){
this.loadLocalArchive(_25a);
}
var _25b=getURLParameter("inputUrl");
var _25c=getURLParameter("callback");
if(_25b){
this.loadRemoteArchive(_25b,_25c);
}
window.onresize=bind(this.onWindowResize,this);
this.onWindowResize();
HAR.Download.create();
fireEvent(_259,"onViewerInit");
HAR.log("har; Viewer initialized.",schema);
},onWindowResize:function(){
var _25d=HAR.$("sourceEditor");
var body=getBody(document);
_25d.style.width=(body.clientWidth-40)+"px";
},selectTabByName:function(_25f){
this.TabView.selectTabByName(this.tabView,_25f);
},loadLocalArchive:function(_260,_261){
HAR.log("har; loadLocalArchive "+_260);
var _262=HAR.$("sourceEditor");
if(_262){
_262.value="Loading...";
}
dojo.xhrGet({url:_260,handleAs:"text",load:function(_263,_264){
if(_261){
_261(_263);
}else{
HAR.Tab.InputView.onAppendPreview(_263);
}
},error:function(_265,_266){
HAR.error("har; loadLocalArchive ERROR "+_265);
if(_262){
_262.value=_265;
}
}});
},loadRemoteArchive:function(url,_268){
HAR.log("har; loadRemoteArchive: "+url+", "+_268);
if(!_268){
_268="onInputData";
}
var _269=HAR.$("sourceEditor");
_269.value="Loading...";
var head=document.getElementsByTagName("head")[0];
var _26b=document.createElement("script");
_26b.src=url;
window[_268]=new Function("HAR.Viewer.onRemoteArchiveLoaded.apply(HAR.Viewer, arguments);"+"if (!dojo.isIE) delete window["+_268+"];");
var done=false;
_26b.onload=_26b.onreadystatechange=function(){
if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){
done=true;
head.removeChild(_26b);
HAR.log("har; Remote archive loaded: "+url);
}
};
head.appendChild(_26b);
},onRemoteArchiveLoaded:function(data){
HAR.log("har; HAR.Viewer.onRemoteArchiveLoaded");
var _26e=dojo.toJson(data,true);
HAR.Tab.InputView.onAppendPreview(_26e);
},loadExample:function(path){
var href=document.location.href;
var _271=href.indexOf("?");
document.location=href.substr(0,_271)+"?path="+path;
setCookie("timeline",true);
setCookie("stats",true);
}});
HAR.Download=domplate({tag:SPAN({"class":"harDownloadButton",id:"harDownloadButton",title:$STR("tooltip.Download_HAR_File")}),create:function(){
Downloadify.create("harDownloadButton",{filename:function(){
return "netData.har";
},data:function(){
return HAR.Model.toJSON();
},onComplete:function(){
},onCancel:function(){
},onError:function(){
alert("Failed to save.");
},swf:"downloadify/media/downloadify.swf",downloadImage:"images/download-sprites.png",width:16,height:16,transparent:true,append:false});
}});
HAR.Viewer.TabView=domplate(HAR.Rep.TabView,{tabList:DIV({"class":"tabViewBody"},DIV({"class":"tabBar"},A({"class":"InputTab tab",onmousedown:"$onClickTab",view:"Input"},$STR("viewer.tab.Input")),A({"class":"PreviewTab tab",onmousedown:"$onClickTab",view:"Preview"},$STR("viewer.tab.Preview")),A({"class":"DOMTab tab",onmousedown:"$onClickTab",view:"DOM"},$STR("viewer.tab.DOM")),A({"class":"HelpTab tab",onmousedown:"$onClickTab",view:"Help"},$STR("viewer.tab.About"),SPAN("&nbsp;"),SPAN({"class":"red","style":"font-size:11px;"},"$version")),A({"class":"SchemaTab tab",onclick:"$onClickTab",view:"Schema"},$STR("viewer.tab.Schema"))),DIV({"class":"tabInputBody tabBody"},DIV({"class":"inputBody"})),DIV({"class":"tabPreviewBody tabBody"},TAG("$previewToolbar"),DIV({"class":"pageTimeline"}),DIV({"class":"pageStats"}),DIV({"class":"pageList"})),DIV({"class":"tabDOMBody tabBody"}),DIV({"class":"tabHelpBody tabBody"},DIV({"class":"helpBody"})),DIV({"class":"tabSchemaBody tabBody"},PRE({"class":"schemaPreview"}))),previewToolbar:DIV({"class":"previewToolbar"},TAG(HAR.Page.ShowTimeline.tag),SPAN({style:"color: gray;"}," | "),TAG(HAR.Page.ShowStats.tag),SPAN({style:"color: gray;"}," | "),SPAN({"class":"harButton",onclick:"$onClear",title:"Clean up the viewer."},$STR("button.Clear")),SPAN({style:"color: gray;"}," | "),TAG(HAR.Download.tag)),onClear:function(){
var href=document.location.href;
var _273=href.indexOf("?");
document.location=href.substr(0,_273);
},version:HAR.getVersion(),updateTabBody:function(_274,view,_276){
var tab=_274.selectedTab;
var _278=getElementByClass(_274,"tabInputBody");
if(hasClass(tab,"InputTab")&&!_278.updated){
var _279=getElementByClass(_278,"inputBody");
_278.updated=true;
HAR.Tab.InputView.render(_279);
}
var _27a=getElementByClass(_274,"tabPreviewBody");
if(hasClass(tab,"PreviewTab")&&!_27a.updated){
_27a.updated=true;
HAR.Tab.Preview.render(_27a);
}
var _27b=getElementByClass(_274,"tabDOMBody");
if(hasClass(tab,"DOMTab")&&!_27b.updated){
_27b.updated=true;
HAR.Tab.DomView.render(HAR.Model.inputData,_27b);
}
var _27c=getElementByClass(_274,"tabSchemaBody");
if(hasClass(tab,"SchemaTab")&&!_27c.updated){
_27c.updated=true;
dojo.xhrGet({url:"schema.js",load:function(_27d,_27e){
dojo.require("dojox.highlight");
dojo.require("dojox.highlight.languages.javascript");
var code=dojox.highlight.processString(_27d).result;
if(dojo.isIE){
code=code.replace(/\n/g,"<br/>");
}
dojo.attr(_27c.firstChild,{innerHTML:code});
}});
}
var _280=getElementByClass(_274,"tabHelpBody");
if(hasClass(tab,"HelpTab")&&!_280.updated){
_280.updated=true;
var _281=getElementByClass(_280,"helpBody");
var _282=HAR.$("HelpTabTemplate");
_281.innerHTML=_282.innerHTML;
}
},render:function(_283){
var _284=this.tag.replace({},_283,this);
return _284;
}});
HAR.registerModule(HAR.Viewer);
}
}
});
function $STR(name){
if(strings.hasOwnProperty(name)){
return strings[name];
}
var _167=name.lastIndexOf(".");
if(_167>0){
name=name.substr(_167+1);
}
return name;
}
function $STRF(name,args){
var _16a=$STR(name);
for(var i=0;i<args.length;i++){
_16a=_16a.replace("%S",args[i]);
}
return _16a;
}
var strings={"viewer.tab.Input":"Home","viewer.tab.Preview":"Preview","viewer.tab.DOM":"HAR","viewer.tab.About":"About","viewer.tab.Schema":"Schema","URLParameters":"Params","RequestHeaders":"Request Headers","ResponseHeaders":"Response Headers","net.file.SizeInfotip":"Size: %S (%S bytes)","Request":"1 request","RequestCount":"%S requests","FromCache":"From Cache","SourceTabDesc":"Paste HTML Archive source code (JSON) into the text box below and press Preview button.","request.phase.Resolving":"DNS Lookup","request.phase.Connecting":"Connecting","request.phase.Blocking":"Blocking","request.phase.Sending":"Sending","request.phase.Waiting":"Waiting","request.phase.Receiving":"Receiving","page.event.ContentLoad":"Page Content Loaded","page.event.Load":"Page Loaded","request.Started":"Started","tooltip.size":"%S (%S bytes)","button.Show_Page_Timeline":"Show Page Timeline","button.Hide_Page_Timeline":"Hide Page Timeline","button.Show_Page_Stats":"Show Statistics","button.Hide_Page_Stats":"Hide Statistics","button.Save":"Save To File","label.Page_Load":"Load","tooltip.Download_HAR_File":"Download Data As HAR File","pie.label.DNS":"DNS","pie.label.Connect":"Connect","pie.label.Blocked":"Blocked","pie.label.Send":"Send","pie.label.Wait":"Wait","pie.label.Receive":"Receive","pie.label.From_Cache":"From Cache","pie.label.From_Cache":"From Cache"};
