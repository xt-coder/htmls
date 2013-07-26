/*
YUI 3.8.0 (build 5744)
Copyright 2012 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/
YUI.add("transition",function(e,t){var n="",r="",i=e.config.doc,s="documentElement",o="transition",u="transition",a="transitionProperty",f="transform",l,c,h,p,d,v,m={},g=["Webkit","Moz"],y={Webkit:"webkitTransitionEnd"},b=function(){this.init.apply(this,arguments)};b._toCamel=function(e){return e=e.replace(/-([a-z])/gi,function(e,t){return t.toUpperCase()}),e},b._toHyphen=function(e){return e=e.replace(/([A-Z]?)([a-z]+)([A-Z]?)/g,function(e,t,n,r){var i=(t?"-"+t.toLowerCase():"")+n;return r&&(i+="-"+r.toLowerCase()),i}),e},b.SHOW_TRANSITION="fadeIn",b.HIDE_TRANSITION="fadeOut",b.useNative=!1,"transition"in i[s].style?(b.useNative=!0,b.supported=!0):e.Array.each(g,function(e){var t=e+"Transition";t in i[s].style&&(n=e,r=b._toHyphen(e)+"-",b.useNative=!0,b.supported=!0,b._VENDOR_PREFIX=e)}),n&&(u=n+"Transition",a=n+"TransitionProperty",f=n+"Transform"),l=r+"transition-property",c=r+"transition-duration",h=r+"transition-timing-function",p=r+"transition-delay",d="transitionend",v="on"+n.toLowerCase()+"transitionend",d=y[n]||d,b.fx={},b.toggles={},b._hasEnd={},b._reKeywords=/^(?:node|duration|iterations|easing|delay|on|onstart|onend)$/i,e.Node.DOM_EVENTS[d]=1,b.NAME="transition",b.DEFAULT_EASING="ease",b.DEFAULT_DURATION=.5,b.DEFAULT_DELAY=0,b._nodeAttrs={},b.prototype={constructor:b,init:function(e,t){var n=this;return n._node=e,!n._running&&t&&(n._config=t,e._transition=n,n._duration="duration"in t?t.duration:n.constructor.DEFAULT_DURATION,n._delay="delay"in t?t.delay:n.constructor.DEFAULT_DELAY,n._easing=t.easing||n.constructor.DEFAULT_EASING,n._count=0,n._running=!1),n},addProperty:function(t,n){var r=this,i=this._node,s=e.stamp(i),o=e.one(i),u=b._nodeAttrs[s],a,f,l,c,h;u||(u=b._nodeAttrs[s]={}),c=u[t],n&&n.value!==undefined?h=n.value:n!==undefined&&(h=n,n=m),typeof h=="function"&&(h=h.call(o,o)),c&&c.transition&&c.transition!==r&&c.transition._count--,r._count++,l=(typeof n.duration!="undefined"?n.duration:r._duration)||1e-4,u[t]={value:h,duration:l,delay:typeof n.delay!="undefined"?n.delay:r._delay,easing:n.easing||r._easing,transition:r},a=e.DOM.getComputedStyle(i,t),f=typeof h=="string"?a:parseFloat(a),b.useNative&&f===h&&setTimeout(function(){r._onNativeEnd.call(i,{propertyName:t,elapsedTime:l})},l*1e3)},removeProperty:function(t){var n=this,r=b._nodeAttrs[e.stamp(n._node)];r&&r[t]&&(delete r[t],n._count--)},initAttrs:function(t){var n,r=this._node;t.transform&&!t[f]&&(t[f]=t.transform,delete t.transform);for(n in t)t.hasOwnProperty(n)&&!b._reKeywords.test(n)&&(this.addProperty(n,t[n]),r.style[n]===""&&e.DOM.setStyle(r,n,e.DOM.getComputedStyle(r,n)))},run:function(t){var n=this,r=n._node,i=n._config,s={type:"transition:start",config:i};return n._running||(n._running=!0,i.on&&i.on.start&&i.on.start.call(e.one(r),s),n.initAttrs(n._config),n._callback=t,n._start()),n},_start:function(){this._runNative()},_prepDur:function(e){return e=parseFloat(e)*1e3,e+"ms"},_runNative:function(t){var n=this,r=n._node,i=e.stamp(r),s=r.style,o=r.ownerDocument.defaultView.getComputedStyle(r),u=b._nodeAttrs[i],a="",f=o[b._toCamel(l)],v=l+": ",m=c+": ",g=h+": ",y=p+": ",w,E,S;f!=="all"&&(v+=f+",",m+=o[b._toCamel(c)]+",",g+=o[b._toCamel(h)]+",",y+=o[b._toCamel(p)]+",");for(S in u)w=b._toHyphen(S),E=u[S],(E=u[S])&&E.transition===n&&(S in r.style?(m+=n._prepDur(E.duration)+",",y+=n._prepDur(E.delay)+",",g+=E.easing+",",v+=w+",",a+=w+": "+E.value+"; "):this.removeProperty(S));v=v.replace(/,$/,";"),m=m.replace(/,$/,";"),g=g.replace(/,$/,";"),y=y.replace(/,$/,";"),b._hasEnd[i]||(r.addEventListener(d,n._onNativeEnd,""),b._hasEnd[i]=!0),s.cssText+=v+m+g+y+a},_end:function(t){var n=this,r=n._node,i=n._callback,s=n._config,o={type:"transition:end",config:s,elapsedTime:t},u=e.one(r);n._running=!1,n._callback=null,r&&(s.on&&s.on.end?setTimeout(function(){s.on.end.call(u,o),i&&i.call(u,o)},1):i&&setTimeout(function(){i.call(u,o)},1))},_endNative:function(e){var t=this._node,n=t.ownerDocument.defaultView.getComputedStyle(t,"")[b._toCamel(l)];e=b._toHyphen(e),typeof n=="string"&&(n=n.replace(new RegExp("(?:^|,\\s)"+e+",?"),","),n=n.replace(/^,|,$/,""),t.style[u]=n)},_onNativeEnd:function(t){var n=this,r=e.stamp(n),i=t,s=b._toCamel(i.propertyName),o=i.elapsedTime,u=b._nodeAttrs[r],f=u[s],l=f?f.transition:null,c,h;l&&(l.removeProperty(s),l._endNative(s),h=l._config[s],c={type:"propertyEnd",propertyName:s,elapsedTime:o,config:h},h&&h.on&&h.on.end&&h.on.end.call(e.one(n),c),l._count<=0&&(l._end(o),n.style[a]=""))},destroy:function(){var e=this,t=e._node;t&&(t.removeEventListener(d,e._onNativeEnd,!1),e._node=null)}},e.Transition=b,e.TransitionNative=b,e.Node.prototype.transition=function(t,n,r){var i=b._nodeAttrs[e.stamp(this._node)],s=i?i.transition||null:null,o,u;if(typeof t=="string"){typeof n=="function"&&(r=n,n=null),o=b.fx[t];if(n&&typeof n!="boolean"){n=e.clone(n);for(u in o)o.hasOwnProperty(u)&&(u in n||(n[u]=o[u]))}else n=o}else r=n,n=t;return s&&!s._running?s.init(this,n):s=new b(this._node,n),s.run(r),this},e.Node.prototype.show=function(t,n,r){return this._show(),t&&e.Transition&&(typeof t!="string"&&!t.push&&(typeof n=="function"&&(r=n,n=t),t=b.SHOW_TRANSITION),this.transition(t,n,r)),this};var w=function(e,t,n){return function(){t&&t.call(e),n&&n.apply(e._node,arguments)}};e.Node.prototype.hide=function(t,n,r){return t&&e.Transition?(typeof n=="function"&&(r=n,n=null),r=w(this,this._hide,r),typeof t!="string"&&!t.push&&(typeof n=="function"&&(r=n,n=t),t=b.HIDE_TRANSITION),this.transition(t,n,r)):this._hide(),this},e.NodeList.prototype.transition=function(t,n){var r=this._nodes,i=0,s;while(s=r[i++])e.one(s).transition(t,n);return this},e.Node.prototype.toggleView=function(t,n,r){return this._toggles=this._toggles||[],r=arguments[arguments.length-1],typeof t=="boolean"&&(n=t,t=null),t=t||e.Transition.DEFAULT_TOGGLE,typeof n=="undefined"&&t in this._toggles&&(n=!this._toggles[t]),n=n?1:0,n?this._show():r=w(this,this._hide,r),this._toggles[t]=n,this.transition(e.Transition.toggles[t][n],r),this},e.NodeList.prototype.toggleView=function(t,n,r){var i=this._nodes,s=0,o;while(o=i[s++])e.one(o).toggleView(t,n,r);return this},e.mix(b.fx,{fadeOut:{opacity:0,duration:.5,easing:"ease-out"},fadeIn:{opacity:1,duration:.5,easing:"ease-in"},sizeOut:{height:0,width:0,duration:.75,easing:"ease-out"},sizeIn:{height:function(e){return e.get("scrollHeight")+"px"},width:function(e){return e.get("scrollWidth")+"px"},duration:.5,easing:"ease-in",on:{start:function(){var e=this.getStyle("overflow");e!=="hidden"&&(this.setStyle("overflow","hidden"),this._transitionOverflow=e)},end:function(){this._transitionOverflow&&(this.setStyle("overflow",this._transitionOverflow),delete this._transitionOverflow)}}}}),e.mix(b.toggles,{size:["sizeOut","sizeIn"],fade:["fadeOut","fadeIn"]}),b.DEFAULT_TOGGLE="fade"},"3.8.0",{requires:["node-style"]});

M.add("w-hovermark",function(Y){var _2=Y.mt.util,_3="mt-hovermark",_4={listContainer:_3+"-container",listItem:_3+"-item",overlay:_3+"-overlay",hoverItem:_3+"-hover",otherItem:_3+"-other"};var _5=function(){_5.superclass.constructor.apply(this,arguments);};_5.NAME="Hovermark";_5.CSS_PREFIX="widget-hovermark";_5.ATTRS={itemSelector:{value:"li",writenOnce:true},overlayBackgroundColor:{value:"#000",writenOnce:true},opacity:{value:0.2,writenOnce:true},delay:{value:60,writenOnce:true},showDuration:{value:200},hideDuration:{value:200}};Y.extend(_5,Y.Widget,{initializer:function(_6){var _7=this,_8=_6.node,_9=_7.get("itemSelector"),_a;_7._node=_8;if(!_8){throw new Error(_5.NAME+": \u6ca1\u6709\u76ee\u6807\u8282\u70b9");}else{_7._nlItems=_8.all(">"+_9);_a=_7._nlItems;if(_a.isEmpty()){throw new Error(_5.NAME+": list\u4e3a\u7a7a");}_a.some(function(nd){var _c=nd.get("tagName").toLowerCase();if(_c!=="a"){if(!nd.one(">a")){throw new Error(_5.NAME+": list\u4e2d\u4e0d\u5b58\u5728a\u6807\u7b7e");}}});}},destructor:function(){_2.detachHandle(this._handles);},renderUI:function(){var _d=this,_e=_d._node,_f=_d._nlItems,_10=_f.item(0),_11=_10.get("tagName").toLowerCase(),_12="<i class=\"{className}\" style=\"height:{height};width:{width};\"></i>",_13=this.get("overlayBackgroundColor"),_14;_e.addClass(_4.listContainer);if(_11==="a"){_12=Y.Lang.sub(_12,_d._getOverlayStyle(_10));_f.each(function(nd){_14=Y.Node.create(_12);_14.setStyles({opacity:0,backgroundColor:_13});nd.append(_14);nd.addClass(_4.listItem);});}else{_12=Y.Lang.sub(_12,_d._getOverlayStyle(_10.one(">a")));_14=Y.Node.create(_12);_f.each(function(nd){_14=Y.Node.create(_12);_14.setStyles({opacity:0,backgroundColor:_13});nd.one(">a").append(_14);nd.addClass(_4.listItem);});}},bindUI:function(){var _17=this,_18=_17._node;this._anim=this._getAnim();_18.delegate({mouseover:function(e){_17._handleMouseover(e);},mouseout:function(e){_17._handleMouseout(e);}},"."+_4.listItem);},_handleMouseover:function(e){var _1c=this,_1d=_1c._node,_1e=e.target,_1f;_1f=_1d.all("."+_4.overlay);_1f.splice(_1f.indexOf(_1e),1);_1c._anim(_1e,_1f);},_handleMouseout:function(e){var _21=this,_22=_21._node,_23=e.relatedTarget,_24=false,_25=_21.get("hideDuration")/1000;_24=!_22.contains(_23);if(_24){_21._timer=window.setTimeout(function(){_22.all("."+_4.overlay).transition({opacity:{value:0,duration:_25,easing:"ease-out"}});},_21.get("delay"));}},_getOverlayStyle:function(nd){var _27={className:_4.overlay,height:nd.getComputedStyle("height"),width:nd.getComputedStyle("width"),backgroundColor:this.get("overlayBackgroundColor")};return _27;},_getAnim:function(){var _28=this,_29,_2a=_28.get("opacity"),_2b={opacity:0},_2c=_28.get("showDuration")/1000,_2d=_28.get("hideDuration")/1000;_29=new Y.Anim({to:_2b||{},duration:_2c,easing:Y.Easing.easeBoth});return function(nd,_2f){_29.stop(true);_29.set("node",nd);if(_28._timer){window.clearTimeout(_28._timer);}_28._timer=window.setTimeout(function(){_29.run();_2f.transition({opacity:{value:_2a,duration:_2d,easing:"ease-out"}});_28._timer=null;},_28.get("delay"));};}});Y.mt.widget.Hovermark=_5;},"1.0.0",{requires:["mt-base","transition"],skinnable:true});