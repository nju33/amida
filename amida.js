var Amida=function(){"use strict";var t=function(){return(t=Object.assign||function(e){for(var r,n=1,t=arguments.length;n<t;n++)for(var u in r=arguments[n])Object.prototype.hasOwnProperty.call(r,u)&&(e[u]=r[u]);return e}).apply(this,arguments)},b=function(n){return function(r){function e(e){return function(){return function(e){if(void 0===e)return"undefined";if(null===e)return"null";if(Array.isArray(e))return"array";switch(typeof e){case"string":return"string";case"number":return"number";case"boolean":return"boolean";case"function":return"function";case"symbol":return"symbol"}var r=e.toString();switch(!0){case"[object Object]"===r:return"object";case"[object Map]"===r:return"map";case"[object WeakMap]"===r:return"weakmap";case"[object Set]"===r:return"set";case"[object WeakSet]"===r:return"weakset"}if(e instanceof RegExp)return"regexp";if(e instanceof Date)return"date";if(e instanceof Error)return"error";throw new Error("unexpected value")}(n)===e?{type:e,value:r(n),called:!0}:{type:e,value:!1,called:!1}}}return e.undefined=function(){return e("undefined")},e.null=function(){return e("null")},e.boolean=function(){return e("boolean")},e.number=function(){return e("number")},e.string=function(){return e("string")},e.array=function(){return e("array")},e.object=function(){return e("object")},e.date=function(){return e("date")},e.regexp=function(){return e("regexp")},e.error=function(){return e("error")},e.function=function(){return e("function")},e.symbol=function(){return e("symbol")},e.map=function(){return e("map")},e.weakmap=function(){return e("weakmap")},e.set=function(){return e("set")},e.weakset=function(){return e("weakset")},{if:e}}};return function(){function e(s){this.adaptor=s;var l=Object.keys(s);this.handler={set:function(e,r,n,t){if("symbol"==typeof r)return Reflect.set(e,r,n,t);if("number"==typeof r&&(r=String(r)),-1===l.indexOf(r))return Reflect.set(e,r,n,t);for(var u,o=b(n),a=[],c=0,i=s[r](o);c<i.length;c++){var f=(0,i[c])();if(a.push(f.type),Boolean(f.called)){u=f.value;break}}if(void 0===u)throw new TypeError(r+" must be "+a);return Reflect.set(e,r,u,t)},get:function(e,r,n){return Reflect.get(e,r,n)}}}return e.prototype.from=function(r){var n=new Proxy(t({},r),this.handler);return Object.keys(r).forEach(function(e){n[e]=r[e]}),n},e}()}();