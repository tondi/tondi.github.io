!function(t){var e={};function r(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(n,i,function(e){return t[e]}.bind(null,i));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=1)}([,function(t,e,r){"use strict";r.r(e);var n=10,i="#000",o={startX:60,startY:50},s=6,c='36px "Source Sans Pro", sans-serif',u=40,a=function(t,e){return(a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */function h(t,e){function r(){this.constructor=t}a(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}function l(t){return"function"==typeof t}var f=!1,p={Promise:void 0,set useDeprecatedSynchronousErrorHandling(t){t&&(new Error).stack;f=t},get useDeprecatedSynchronousErrorHandling(){return f}};function d(t){setTimeout((function(){throw t}),0)}var b={closed:!0,next:function(t){},error:function(t){if(p.useDeprecatedSynchronousErrorHandling)throw t;d(t)},complete:function(){}},y=Array.isArray||function(t){return t&&"number"==typeof t.length};function v(t){return null!==t&&"object"==typeof t}function m(t){return Error.call(this),this.message=t?t.length+" errors occurred during unsubscription:\n"+t.map((function(t,e){return e+1+") "+t.toString()})).join("\n  "):"",this.name="UnsubscriptionError",this.errors=t,this}m.prototype=Object.create(Error.prototype);var w=m,x=function(){function t(t){this.closed=!1,this._parentOrParents=null,this._subscriptions=null,t&&(this._unsubscribe=t)}return t.prototype.unsubscribe=function(){var e;if(!this.closed){var r=this._parentOrParents,n=this._unsubscribe,i=this._subscriptions;if(this.closed=!0,this._parentOrParents=null,this._subscriptions=null,r instanceof t)r.remove(this);else if(null!==r)for(var o=0;o<r.length;++o){r[o].remove(this)}if(l(n))try{n.call(this)}catch(t){e=t instanceof w?_(t.errors):[t]}if(y(i)){o=-1;for(var s=i.length;++o<s;){var c=i[o];if(v(c))try{c.unsubscribe()}catch(t){e=e||[],t instanceof w?e=e.concat(_(t.errors)):e.push(t)}}}if(e)throw new w(e)}},t.prototype.add=function(e){var r=e;switch(typeof e){case"function":r=new t(e);case"object":if(r===this||r.closed||"function"!=typeof r.unsubscribe)return r;if(this.closed)return r.unsubscribe(),r;if(!(r instanceof t)){var n=r;(r=new t)._subscriptions=[n]}break;default:if(!e)return t.EMPTY;throw new Error("unrecognized teardown "+e+" added to Subscription.")}var i=r._parentOrParents;if(null===i)r._parentOrParents=this;else if(i instanceof t){if(i===this)return r;r._parentOrParents=[i,this]}else{if(-1!==i.indexOf(this))return r;i.push(this)}var o=this._subscriptions;return null===o?this._subscriptions=[r]:o.push(r),r},t.prototype.remove=function(t){var e=this._subscriptions;if(e){var r=e.indexOf(t);-1!==r&&e.splice(r,1)}},t.EMPTY=function(t){return t.closed=!0,t}(new t),t}();function _(t){return t.reduce((function(t,e){return t.concat(e instanceof w?e.errors:e)}),[])}var g="function"==typeof Symbol?Symbol("rxSubscriber"):"@@rxSubscriber_"+Math.random(),E=function(t){function e(r,n,i){var o=t.call(this)||this;switch(o.syncErrorValue=null,o.syncErrorThrown=!1,o.syncErrorThrowable=!1,o.isStopped=!1,arguments.length){case 0:o.destination=b;break;case 1:if(!r){o.destination=b;break}if("object"==typeof r){r instanceof e?(o.syncErrorThrowable=r.syncErrorThrowable,o.destination=r,r.add(o)):(o.syncErrorThrowable=!0,o.destination=new S(o,r));break}default:o.syncErrorThrowable=!0,o.destination=new S(o,r,n,i)}return o}return h(e,t),e.prototype[g]=function(){return this},e.create=function(t,r,n){var i=new e(t,r,n);return i.syncErrorThrowable=!1,i},e.prototype.next=function(t){this.isStopped||this._next(t)},e.prototype.error=function(t){this.isStopped||(this.isStopped=!0,this._error(t))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this))},e.prototype._next=function(t){this.destination.next(t)},e.prototype._error=function(t){this.destination.error(t),this.unsubscribe()},e.prototype._complete=function(){this.destination.complete(),this.unsubscribe()},e.prototype._unsubscribeAndRecycle=function(){var t=this._parentOrParents;return this._parentOrParents=null,this.unsubscribe(),this.closed=!1,this.isStopped=!1,this._parentOrParents=t,this},e}(x),S=function(t){function e(e,r,n,i){var o,s=t.call(this)||this;s._parentSubscriber=e;var c=s;return l(r)?o=r:r&&(o=r.next,n=r.error,i=r.complete,r!==b&&(l((c=Object.create(r)).unsubscribe)&&s.add(c.unsubscribe.bind(c)),c.unsubscribe=s.unsubscribe.bind(s))),s._context=c,s._next=o,s._error=n,s._complete=i,s}return h(e,t),e.prototype.next=function(t){if(!this.isStopped&&this._next){var e=this._parentSubscriber;p.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?this.__tryOrSetError(e,this._next,t)&&this.unsubscribe():this.__tryOrUnsub(this._next,t)}},e.prototype.error=function(t){if(!this.isStopped){var e=this._parentSubscriber,r=p.useDeprecatedSynchronousErrorHandling;if(this._error)r&&e.syncErrorThrowable?(this.__tryOrSetError(e,this._error,t),this.unsubscribe()):(this.__tryOrUnsub(this._error,t),this.unsubscribe());else if(e.syncErrorThrowable)r?(e.syncErrorValue=t,e.syncErrorThrown=!0):d(t),this.unsubscribe();else{if(this.unsubscribe(),r)throw t;d(t)}}},e.prototype.complete=function(){var t=this;if(!this.isStopped){var e=this._parentSubscriber;if(this._complete){var r=function(){return t._complete.call(t._context)};p.useDeprecatedSynchronousErrorHandling&&e.syncErrorThrowable?(this.__tryOrSetError(e,r),this.unsubscribe()):(this.__tryOrUnsub(r),this.unsubscribe())}else this.unsubscribe()}},e.prototype.__tryOrUnsub=function(t,e){try{t.call(this._context,e)}catch(t){if(this.unsubscribe(),p.useDeprecatedSynchronousErrorHandling)throw t;d(t)}},e.prototype.__tryOrSetError=function(t,e,r){if(!p.useDeprecatedSynchronousErrorHandling)throw new Error("bad call");try{e.call(this._context,r)}catch(e){return p.useDeprecatedSynchronousErrorHandling?(t.syncErrorValue=e,t.syncErrorThrown=!0,!0):(d(e),!0)}return!1},e.prototype._unsubscribe=function(){var t=this._parentSubscriber;this._context=null,this._parentSubscriber=null,t.unsubscribe()},e}(E);var T="function"==typeof Symbol&&Symbol.observable||"@@observable";function P(){}function M(t){return t?1===t.length?t[0]:function(e){return t.reduce((function(t,e){return e(t)}),e)}:P}var k=function(){function t(t){this._isScalar=!1,t&&(this._subscribe=t)}return t.prototype.lift=function(e){var r=new t;return r.source=this,r.operator=e,r},t.prototype.subscribe=function(t,e,r){var n=this.operator,i=function(t,e,r){if(t){if(t instanceof E)return t;if(t[g])return t[g]()}return t||e||r?new E(t,e,r):new E(b)}(t,e,r);if(n?i.add(n.call(i,this.source)):i.add(this.source||p.useDeprecatedSynchronousErrorHandling&&!i.syncErrorThrowable?this._subscribe(i):this._trySubscribe(i)),p.useDeprecatedSynchronousErrorHandling&&i.syncErrorThrowable&&(i.syncErrorThrowable=!1,i.syncErrorThrown))throw i.syncErrorValue;return i},t.prototype._trySubscribe=function(t){try{return this._subscribe(t)}catch(e){p.useDeprecatedSynchronousErrorHandling&&(t.syncErrorThrown=!0,t.syncErrorValue=e),!function(t){for(;t;){var e=t,r=e.closed,n=e.destination,i=e.isStopped;if(r||i)return!1;t=n&&n instanceof E?n:null}return!0}(t)?console.warn(e):t.error(e)}},t.prototype.forEach=function(t,e){var r=this;return new(e=O(e))((function(e,n){var i;i=r.subscribe((function(e){try{t(e)}catch(t){n(t),i&&i.unsubscribe()}}),n,e)}))},t.prototype._subscribe=function(t){var e=this.source;return e&&e.subscribe(t)},t.prototype[T]=function(){return this},t.prototype.pipe=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];return 0===t.length?this:M(t)(this)},t.prototype.toPromise=function(t){var e=this;return new(t=O(t))((function(t,r){var n;e.subscribe((function(t){return n=t}),(function(t){return r(t)}),(function(){return t(n)}))}))},t.create=function(e){return new t(e)},t}();function O(t){if(t||(t=p.Promise||Promise),!t)throw new Error("no Promise impl found");return t}var j=function(){function t(t,e){this.project=t,this.thisArg=e}return t.prototype.call=function(t,e){return e.subscribe(new V(t,this.project,this.thisArg))},t}(),V=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.project=r,i.count=0,i.thisArg=n||i,i}return h(e,t),e.prototype._next=function(t){var e;try{e=this.project.call(this.thisArg,t,this.count++)}catch(t){return void this.destination.error(t)}this.destination.next(e)},e}(E);Object.prototype.toString;function C(t,e,r,n){return l(r)&&(n=r,r=void 0),n?C(t,e,r).pipe((i=function(t){return y(t)?n.apply(void 0,t):n(t)},function(t){if("function"!=typeof i)throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");return t.lift(new j(i,o))})):new k((function(n){!function t(e,r,n,i,o){var s;if(function(t){return t&&"function"==typeof t.addEventListener&&"function"==typeof t.removeEventListener}(e)){var c=e;e.addEventListener(r,n,o),s=function(){return c.removeEventListener(r,n,o)}}else if(function(t){return t&&"function"==typeof t.on&&"function"==typeof t.off}(e)){var u=e;e.on(r,n),s=function(){return u.off(r,n)}}else if(function(t){return t&&"function"==typeof t.addListener&&"function"==typeof t.removeListener}(e)){var a=e;e.addListener(r,n),s=function(){return a.removeListener(r,n)}}else{if(!e||!e.length)throw new TypeError("Invalid event target");for(var h=0,l=e.length;h<l;h++)t(e[h],r,n,i,o)}i.add(s)}(t,e,(function(t){arguments.length>1?n.next(Array.prototype.slice.call(arguments)):n.next(t)}),n,r)}));var i,o}var A=new function(){var t=this;this.screenResizes=C(window,"resize"),this.init=function(){t.dpi=window.devicePixelRatio,t.virtualWidth=document.documentElement.clientWidth*t.dpi,t.virtualHeight=document.documentElement.clientHeight*t.dpi,t.canvas=document.querySelector("#canvas"),t.ctx=t.canvas.getContext("2d",{alpha:!1}),t.canvas.setAttribute("width",t.virtualWidth.toString()),t.canvas.setAttribute("height",t.virtualHeight.toString());var e=+getComputedStyle(t.canvas).getPropertyValue("height").slice(0,-2),r=+getComputedStyle(t.canvas).getPropertyValue("width").slice(0,-2);t.canvas.setAttribute("height",e*t.dpi+""),t.canvas.setAttribute("width",r*t.dpi+""),t.ctx.transform(1,0,0,-1,0,t.virtualHeight),t.ctx.lineWidth=s,t.ctx.font=c,t.ctx.lineCap="round"},this.init(),this.screenResizes.subscribe(this.init)},Y=function(){this.clear=function(){A.ctx.fillStyle="#FFF",A.ctx.fillRect(0,0,A.virtualWidth,A.virtualHeight),A.ctx.fillStyle=i}},I=function(t,e,r){return{x:t*Math.cos(e)*r,y:t*Math.sin(e)*r-n*Math.pow(r,2)/2}},D=function(){function t(t,e,r,n,i,s){var c=this;this.initialX=t,this.initialY=e,this.V0=r,this.angle=n,this.timeStarted=i,this.peakCoords=s,this.crashedWith=null,this.isExterminable=!1,this.numberOfCollisionMarksRendered=0,this.renderCollision=function(t){t.fillRect(c.x-20*Math.random(),o.startY+10*Math.random(),20*Math.random(),20*Math.random())},this.handleFloorCrash=function(t){if(c.numberOfCollisionMarksRendered<6)return c.renderCollision(t),void c.numberOfCollisionMarksRendered++;c.isExterminable=!0},this.x=t,this.y=e}return t.prototype.render=function(t,e){"floor"===this.crashedWith&&this.handleFloorCrash(t);var r=e-this.timeStarted,n=this.x,i=this.y,s=I(this.V0,this.angle,r),c=s.x,u=s.y;this.x=c+this.initialX,this.y=u+this.initialY;var a=this.x>A.virtualWidth,h=this.y<o.startY;if(a||h)return a&&(this.crashedWith="wall",this.isExterminable=!0),void(h&&(this.crashedWith="floor"));t.beginPath(),t.moveTo(n,i),t.lineTo(this.x,this.y),t.stroke()},t}(),H=function(t){function e(e,r){var n=t.call(this,e,r)||this;return n.scheduler=e,n.work=r,n.pending=!1,n}return h(e,t),e.prototype.schedule=function(t,e){if(void 0===e&&(e=0),this.closed)return this;this.state=t;var r=this.id,n=this.scheduler;return null!=r&&(this.id=this.recycleAsyncId(n,r,e)),this.pending=!0,this.delay=e,this.id=this.id||this.requestAsyncId(n,this.id,e),this},e.prototype.requestAsyncId=function(t,e,r){return void 0===r&&(r=0),setInterval(t.flush.bind(t,this),r)},e.prototype.recycleAsyncId=function(t,e,r){if(void 0===r&&(r=0),null!==r&&this.delay===r&&!1===this.pending)return e;clearInterval(e)},e.prototype.execute=function(t,e){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;var r=this._execute(t,e);if(r)return r;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))},e.prototype._execute=function(t,e){var r=!1,n=void 0;try{this.work(t)}catch(t){r=!0,n=!!t&&t||new Error(t)}if(r)return this.unsubscribe(),n},e.prototype._unsubscribe=function(){var t=this.id,e=this.scheduler,r=e.actions,n=r.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==n&&r.splice(n,1),null!=t&&(this.id=this.recycleAsyncId(e,t,null)),this.delay=null},e}(function(t){function e(e,r){return t.call(this)||this}return h(e,t),e.prototype.schedule=function(t,e){return void 0===e&&(e=0),this},e}(x)),X=function(){function t(e,r){void 0===r&&(r=t.now),this.SchedulerAction=e,this.now=r}return t.prototype.schedule=function(t,e,r){return void 0===e&&(e=0),new this.SchedulerAction(this,t).schedule(r,e)},t.now=function(){return Date.now()},t}(),W=new(function(t){function e(r,n){void 0===n&&(n=X.now);var i=t.call(this,r,(function(){return e.delegate&&e.delegate!==i?e.delegate.now():n()}))||this;return i.actions=[],i.active=!1,i.scheduled=void 0,i}return h(e,t),e.prototype.schedule=function(r,n,i){return void 0===n&&(n=0),e.delegate&&e.delegate!==this?e.delegate.schedule(r,n,i):t.prototype.schedule.call(this,r,n,i)},e.prototype.flush=function(t){var e=this.actions;if(this.active)e.push(t);else{var r;this.active=!0;do{if(r=t.execute(t.state,t.delay))break}while(t=e.shift());if(this.active=!1,r){for(;t=e.shift();)t.unsubscribe();throw r}}},e}(X))(H);function F(t,e){var r;return void 0===t&&(t=0),void 0===e&&(e=W),(y(r=t)||!(r-parseFloat(r)+1>=0)||t<0)&&(t=0),e&&"function"==typeof e.schedule||(e=W),new k((function(r){return r.add(e.schedule(U,t,{subscriber:r,counter:0,period:t})),r}))}function U(t){var e=t.subscriber,r=t.counter,n=t.period;e.next(r),this.schedule({subscriber:e,counter:r+1,period:n},n)}function L(){return Error.call(this),this.message="object unsubscribed",this.name="ObjectUnsubscribedError",this}L.prototype=Object.create(Error.prototype);var N=L,R=function(t){function e(e,r){var n=t.call(this)||this;return n.subject=e,n.subscriber=r,n.closed=!1,n}return h(e,t),e.prototype.unsubscribe=function(){if(!this.closed){this.closed=!0;var t=this.subject,e=t.observers;if(this.subject=null,e&&0!==e.length&&!t.isStopped&&!t.closed){var r=e.indexOf(this.subscriber);-1!==r&&e.splice(r,1)}}},e}(x),q=function(t){function e(e){var r=t.call(this,e)||this;return r.destination=e,r}return h(e,t),e}(E),z=function(t){function e(){var e=t.call(this)||this;return e.observers=[],e.closed=!1,e.isStopped=!1,e.hasError=!1,e.thrownError=null,e}return h(e,t),e.prototype[g]=function(){return new q(this)},e.prototype.lift=function(t){var e=new Z(this,this);return e.operator=t,e},e.prototype.next=function(t){if(this.closed)throw new N;if(!this.isStopped)for(var e=this.observers,r=e.length,n=e.slice(),i=0;i<r;i++)n[i].next(t)},e.prototype.error=function(t){if(this.closed)throw new N;this.hasError=!0,this.thrownError=t,this.isStopped=!0;for(var e=this.observers,r=e.length,n=e.slice(),i=0;i<r;i++)n[i].error(t);this.observers.length=0},e.prototype.complete=function(){if(this.closed)throw new N;this.isStopped=!0;for(var t=this.observers,e=t.length,r=t.slice(),n=0;n<e;n++)r[n].complete();this.observers.length=0},e.prototype.unsubscribe=function(){this.isStopped=!0,this.closed=!0,this.observers=null},e.prototype._trySubscribe=function(e){if(this.closed)throw new N;return t.prototype._trySubscribe.call(this,e)},e.prototype._subscribe=function(t){if(this.closed)throw new N;return this.hasError?(t.error(this.thrownError),x.EMPTY):this.isStopped?(t.complete(),x.EMPTY):(this.observers.push(t),new R(this,t))},e.prototype.asObservable=function(){var t=new k;return t.source=this,t},e.create=function(t,e){return new Z(t,e)},e}(k),Z=function(t){function e(e,r){var n=t.call(this)||this;return n.destination=e,n.source=r,n}return h(e,t),e.prototype.next=function(t){var e=this.destination;e&&e.next&&e.next(t)},e.prototype.error=function(t){var e=this.destination;e&&e.error&&this.destination.error(t)},e.prototype.complete=function(){var t=this.destination;t&&t.complete&&this.destination.complete()},e.prototype._subscribe=function(t){return this.source?this.source.subscribe(t):x.EMPTY},e}(z);function G(t,e,r){return function(n){return n.lift(new B(t,e,r))}}var B=function(){function t(t,e,r){this.nextOrObserver=t,this.error=e,this.complete=r}return t.prototype.call=function(t,e){return e.subscribe(new J(t,this.nextOrObserver,this.error,this.complete))},t}(),J=function(t){function e(e,r,n,i){var o=t.call(this,e)||this;return o._tapNext=P,o._tapError=P,o._tapComplete=P,o._tapError=n||P,o._tapComplete=i||P,l(r)?(o._context=o,o._tapNext=r):r&&(o._context=r,o._tapNext=r.next||P,o._tapError=r.error||P,o._tapComplete=r.complete||P),o}return h(e,t),e.prototype._next=function(t){try{this._tapNext.call(this._context,t)}catch(t){return void this.destination.error(t)}this.destination.next(t)},e.prototype._error=function(t){try{this._tapError.call(this._context,t)}catch(t){return void this.destination.error(t)}this.destination.error(t)},e.prototype._complete=function(){try{this._tapComplete.call(this._context)}catch(t){return void this.destination.error(t)}return this.destination.complete()},e}(E),K=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return h(e,t),e.prototype.notifyNext=function(t,e,r,n,i){this.destination.next(e)},e.prototype.notifyError=function(t,e){this.destination.error(t)},e.prototype.notifyComplete=function(t){this.destination.complete()},e}(E),Q=function(t){function e(e,r,n){var i=t.call(this)||this;return i.parent=e,i.outerValue=r,i.outerIndex=n,i.index=0,i}return h(e,t),e.prototype._next=function(t){this.parent.notifyNext(this.outerValue,t,this.outerIndex,this.index++,this)},e.prototype._error=function(t){this.parent.notifyError(t,this),this.unsubscribe()},e.prototype._complete=function(){this.parent.notifyComplete(this),this.unsubscribe()},e}(E);function $(){return"function"==typeof Symbol&&Symbol.iterator?Symbol.iterator:"@@iterator"}var tt=$();var et=function(t){if(t&&"function"==typeof t[T])return o=t,function(t){var e=o[T]();if("function"!=typeof e.subscribe)throw new TypeError("Provided object does not correctly implement Symbol.observable");return e.subscribe(t)};if((i=t)&&"number"==typeof i.length&&"function"!=typeof i)return n=t,function(t){for(var e=0,r=n.length;e<r&&!t.closed;e++)t.next(n[e]);t.complete()};if(function(t){return!!t&&"function"!=typeof t.subscribe&&"function"==typeof t.then}(t))return r=t,function(t){return r.then((function(e){t.closed||(t.next(e),t.complete())}),(function(e){return t.error(e)})).then(null,d),t};if(t&&"function"==typeof t[tt])return e=t,function(t){for(var r=e[tt]();;){var n=r.next();if(n.done){t.complete();break}if(t.next(n.value),t.closed)break}return"function"==typeof r.return&&t.add((function(){r.return&&r.return()})),t};var e,r,n,i,o,s=v(t)?"an invalid object":"'"+t+"'";throw new TypeError("You provided "+s+" where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.")};function rt(t){return function(e){return e.lift(new nt(t))}}var nt=function(){function t(t){this.notifier=t}return t.prototype.call=function(t,e){var r=new it(t),n=function(t,e,r,n,i){if(void 0===i&&(i=new Q(t,r,n)),!i.closed)return e instanceof k?e.subscribe(i):et(e)(i)}(r,this.notifier);return n&&!r.seenValue?(r.add(n),e.subscribe(r)):r},t}(),it=function(t){function e(e){var r=t.call(this,e)||this;return r.seenValue=!1,r}return h(e,t),e.prototype.notifyNext=function(t,e,r,n,i){this.seenValue=!0,this.complete()},e.prototype.notifyComplete=function(){},e}(K);var ot=function(){function t(t,e){this.predicate=t,this.thisArg=e}return t.prototype.call=function(t,e){return e.subscribe(new st(t,this.predicate,this.thisArg))},t}(),st=function(t){function e(e,r,n){var i=t.call(this,e)||this;return i.predicate=r,i.thisArg=n,i.count=0,i}return h(e,t),e.prototype._next=function(t){var e;try{e=this.predicate.call(this.thisArg,t,this.count++)}catch(t){return void this.destination.error(t)}e&&this.destination.next(t)},e}(E),ct=function(){function t(){t.mouseDowns.subscribe((function(){t.pointerPresses.next(),F(t.interval).pipe(G((function(){return t.pointerPresses.next()})),rt(t.mouseUps)).subscribe(null)})),t.touchStarts.subscribe((function(){t.pointerPresses.next(),F(t.interval).pipe(G((function(){return t.pointerPresses.next()})),rt(t.touchEnds)).subscribe(null)})),t.spaceUps.subscribe((function(){t.isSpacePressed=!1})),t.spaceDowns.subscribe((function(){t.isSpacePressed||(t.isSpacePressed=!0,t.spaceEvents.next(),F(t.interval).pipe(G((function(){return t.spaceEvents.next()})),rt(t.spaceUps)).subscribe(null))}))}var e,r;return t.keyDowns=C(document,"keydown"),t.keyUps=C(document,"keyup"),t.filterNonSpaces=(e=function(t){return"Space"===t.code},function(t){return t.lift(new ot(e,r))}),t.spaceDowns=t.keyDowns.pipe(t.filterNonSpaces),t.spaceUps=t.keyUps.pipe(t.filterNonSpaces),t.mouseMoves=C(A.canvas,"mousemove"),t.mouseDowns=C(A.canvas,"mousedown"),t.mouseUps=C(A.canvas,"mouseup"),t.touchMoves=C(A.canvas,"touchmove"),t.touchStarts=C(A.canvas,"touchstart"),t.touchEnds=C(A.canvas,"touchend"),t.pointerPresses=new z,t.spaceEvents=new z,t.isSpacePressed=!1,t.interval=200,t}();function ut(t,e,r,n,i){var o=Math.atan2(i-r,n-e);t.beginPath(),t.moveTo(e,r),t.lineTo(n,i),t.stroke(),t.beginPath(),t.moveTo(n,i),t.moveTo(n-15*Math.cos(o-Math.PI/7),i-15*Math.sin(o-Math.PI/7)),t.moveTo(n-15*Math.cos(o+Math.PI/7),i-15*Math.sin(o+Math.PI/7)),t.lineTo(n,i),t.lineTo(n-15*Math.cos(o-Math.PI/7),i-15*Math.sin(o-Math.PI/7)),t.stroke()}var at=function(t,e){t.save(),t.scale(1,-1),e(),t.stroke(),t.restore()},ht=o.startX-20,lt=o.startY-20;function ft(t,e){return{x:Math.cos(t)*e+o.startX,y:Math.sin(t)*e+o.startY}}var pt=function(){var t=this;this.angle=Math.PI/4,this.vectorValue=60,this.handleTouchMove=function(e){var r=e.touches[0].clientX,n=e.touches[0].clientY;t.handleMove(r,n)},this.handleMouseMove=function(e){var r=e.clientX,n=e.clientY;t.handleMove(r,n)},this.handleMove=function(e,r){var n=e*A.dpi,i=A.virtualHeight-r*A.dpi,o=t.calculateAngleFromZeroZero(n,i);t.angle=o;var s=t.calculateVectorLength(n,i);t.vectorValue=s},this.calculateAngleFromZeroZero=function(t,e){return Math.atan(e/t)},this.calculateVectorLength=function(t,e){return 10+.1*Math.sqrt(Math.pow(t,2)+Math.pow(e,2))},this.showAngle=function(e){var r,n=ft(t.angle/2,t.vectorValue/2),i=n.x,o=n.y,s=i,c=o/2,u=(r=t.angle,180*r/Math.PI).toFixed(0);at(e,(function(){e.fillText("α = "+u+"°",s-20,-(c+30))}))},this.showValue=function(e){var r=ft(t.angle,t.vectorValue/4),n=r.x,i=r.y;at(e,(function(){e.translate(n,-i),e.rotate(-t.angle),e.fillText(t.vectorValue.toFixed(0).toString()+"px/s",0,-u/2)}))},this.render=function(e){var r=ft(t.angle,t.vectorValue),n=r.x,i=r.y;ut(e,o.startX,o.startY,n,i),t.showValue(e)},ct.mouseMoves.subscribe(this.handleMouseMove),ct.touchMoves.subscribe(this.handleTouchMove)},dt=function(){function t(){this.x=A.virtualWidth,this.y=50,this.width=50,this.height=50,this.isExterminable=!1}return t.prototype.render=function(t,e){this.isExterminable||(this.x-=1,t.fillRect(this.x,this.y,this.width,this.height))},t}(),bt=function(t){var e=this;this.hud=t,this.calculateTimeToPeak=function(t,e){return e*Math.sin(t)/n},this.renderPrediction=function(t,r,n){var i=e.calculateTimeToPeak(r,n),s=2*i,c=I(n,r,i),u=c.x,a=c.y;u+=o.startX,a+=o.startY;var h=I(n,r,s),l=h.x,f=h.y;l+=o.startX,f+=o.startY,t.beginPath(),t.moveTo(o.startX,o.startY),t.globalAlpha=.08,t.quadraticCurveTo(u,2*(a-25),l,f),t.stroke(),t.globalAlpha=1},this.renderPeakPointProps=function(t,r,n){var i=e.calculateTimeToPeak(r,n),o=I(n,r,i),s=o.x,c=o.y;at(t,(function(){t.translate(s,-c-u),t.fillText("t = "+i.toFixed(2),0,-40)}))},this.renderEndPointProps=function(t,r,n){var i=2*e.calculateTimeToPeak(r,n),o=I(n,r,i),s=o.x,c=o.y;at(t,(function(){t.translate(s,-c),t.fillText("t = "+i.toFixed(2),0,-14),t.globalAlpha=.08}))},this.render=function(t,r,n){e.hud.isTrajectoryEnabled&&(e.renderPeakPointProps(t,r,n),e.renderPrediction(t,r,n),e.renderEndPointProps(t,r,n))}},yt=function(){var t=function(e,r){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(e,r)};return function(e,r){function n(){this.constructor=e}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n)}}(),vt=function(t){function e(e,r,n){var i=t.call(this)||this;return i.ctx=e,i.timeService=r,i.hud=n,i.bullets=[],i.tanks=[],i.spawnTank=function(){i.tanks.push(new dt)},i.fire=function(){var t=i.trajectoryPrediction.calculateTimeToPeak(i.startVector.angle,i.startVector.vectorValue),e=I(i.startVector.vectorValue,i.startVector.angle,t);i.bullets.push(new D(o.startX,o.startY,i.startVector.vectorValue,i.startVector.angle,i.timeService.absoluteTime,e)),i.hud.resetTime()},i.checkTankCollision=function(){i.bullets.forEach((function(t){i.tanks.forEach((function(e){var r=e.x+e.width,n=e.y+e.height;t.x>e.x&&t.x<r&&t.y>e.y&&t.y<n&&(e.isExterminable=!0)}))}))},i.checkWallCollision=function(){i.bullets.forEach((function(t){if("wall"===t.crashedWith){var e=t.peakCoords.x-t.x,r=t.peakCoords.y-t.y,n=Math.atan2(r,e);if(t.peakCoords.x+t.initialX>A.virtualWidth){var o=(n=Math.PI+n)-Math.PI/2;n=Math.PI-o}if(n>0&&n<Math.PI/4)return;i.bullets.push(new D(t.x-10,t.y,t.V0/3,n,i.timeService.absoluteTime,t.peakCoords))}}))},i.checkCollision=function(){i.checkTankCollision(),i.checkWallCollision()},i.performGC=function(){var t=function(t){return!t.isExterminable};i.tanks=i.tanks.filter(t),i.bullets=i.bullets.filter(t)},i.render=function(){i.clear(),i.timeService.incrementTime(),function(t,e,r){ut(t,o.startX,o.startY-lt,o.startX,r),ut(t,o.startX-ht,o.startY,e,o.startY),at(t,(function(){t.fillText("x",e-ht,-o.startY+lt),t.fillText("y",o.startX-ht,-r+lt)}))}(A.ctx,A.virtualWidth-o.startX,A.virtualHeight-o.startY),i.startVector.render(A.ctx),i.trajectoryPrediction.render(i.ctx,i.startVector.angle,i.startVector.vectorValue),i.hud.render(),i.bullets.forEach((function(t){return t.render(A.ctx,i.timeService.absoluteTime)})),i.tanks.forEach((function(t){return t.render(A.ctx,i.timeService.absoluteTime)})),i.checkCollision(),i.performGC(),window.requestAnimationFrame(i.render)},ct.spaceEvents.subscribe(i.fire),ct.pointerPresses.subscribe(i.fire),i.startVector=new pt,i.trajectoryPrediction=new bt(n),F(5e3).subscribe(i.spawnTank),i}return yt(e,t),e}(Y),mt=function(){function t(t){var e=this;this.timeService=t,this.snapshotTime=0,this.resetTime=function(){e.snapshotTime=e.timeService.absoluteTime},this.render=function(){},this.nativeElement=document.querySelector("#hud"),this.timeElement=this.nativeElement.querySelector(".hud__time"),this.showTrajectoryCheckbox=this.nativeElement.querySelector(".hud__show-trajectory-prediction"),this.showTrajectoryCheckbox.addEventListener("change",(function(t){t.stopPropagation(),t.preventDefault(),e.showTrajectoryCheckbox.blur()}))}return Object.defineProperty(t.prototype,"isTrajectoryEnabled",{get:function(){return this.showTrajectoryCheckbox.checked},enumerable:!1,configurable:!0}),t}(),wt=function(){var t=this;this.absoluteTime=0,this.incrementTime=function(){return t.absoluteTime+=1/6}};new ct;var xt=new wt,_t=new mt(xt);new vt(A.ctx,xt,_t).render()}]);