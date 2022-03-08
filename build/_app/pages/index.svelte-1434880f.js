import{S as I,i as L,s as D,k as b,m as O,g as v,L as k,d as h,R as V,v as A,T as C,U as H,V as j,e as E,t as B,w as N,W as K,c as w,a as M,h as U,x,b as W,K as y,y as T,X,q as S,o as q,B as F,Y}from"../chunks/vendor-f0ecd93f.js";import z from"./Staff/staff.svelte-69eb34e5.js";function G(n){let t;return{c(){t=b()},l(e){t=O(e)},m(e,r){v(e,t,r)},p:k,i:k,o:k,d(e){e&&h(t)}}}function J(n){const t=V();let e=[],r=[],c=new Map;function p(){console.log("connecting to midi..."),navigator.requestMIDIAccess().then(s=>l(s),s=>console.log("Something went wrong",s))}function l(s){console.log("connected to midi"),_(s),s.addEventListener("statechange",u=>_(u.target))}function _(s){e=[],r=[];const u=s.inputs.values();for(let i=u.next();i&&!i.done;i=u.next())e.push(i.value);const o=s.outputs.values();for(let i=o.next();i&&!i.done;i=o.next())r.push(i.value);console.log("midi in",e),console.log("midi out",r),f()}function f(){for(const s of e)s.addEventListener("midimessage",a)}function g(){for(const s of e)s.removeEventListener("midimessage",a)}function a(s){console.log("eeeee",s);const i=s.data[0]>>4,d=s.data[1],$=s.data.length>2?s.data[2]:1,R=Date.now();i===8||i===9&&$===0?c.get(d)&&c.delete(d):i===9&&c.set(d,R),t("notesOn",c)}return A(()=>{p()}),C(()=>{g()}),[]}class P extends I{constructor(t){super();L(this,t,J,G,D,{})}}const Q=(...n)=>{let t=new Map;return n.forEach(e=>{e.forEach((r,c)=>t.set(c,r))}),t},m=(n,t,e)=>({clef:"treble",keys:[n],duration:"q"}),Z=n=>{let t=12*n+24;return new Map([[t++,m(`c/${n}`)],[t++,m(`c/${n}`)],[t++,m(`d/${n}`)],[t++,m(`d/${n}`)],[t++,m(`e/${n}`)],[t++,m(`f/${n}`)],[t++,m(`f/${n}`)],[t++,m(`g/${n}`)],[t++,m(`g/${n}`)],[t++,m(`a/${n}`)],[t++,m(`a/${n}`)],[t++,m(`b/${n}`)]])},ee=()=>{let n=[...Array(9).keys()].map(e=>Z(e));return Q(...n)};function te(n){let t,e,r,c,p,l,_,f,g,a;l=new P({}),l.$on("notesOn",n[1]);function s(o){n[4](o)}let u={};return n[0]!==void 0&&(u.voice=n[0]),f=new z({props:u}),H.push(()=>j(f,"voice",s)),{c(){t=b(),e=E("section"),r=E("h3"),c=B("Insert midi keyboard and play notes"),p=b(),N(l.$$.fragment),_=b(),N(f.$$.fragment),this.h()},l(o){K('[data-svelte="svelte-1f7jgic"]',document.head).forEach(h),t=O(o),e=w(o,"SECTION",{class:!0});var d=M(e);r=w(d,"H3",{});var $=M(r);c=U($,"Insert midi keyboard and play notes"),$.forEach(h),p=O(d),x(l.$$.fragment,d),_=O(d),x(f.$$.fragment,d),d.forEach(h),this.h()},h(){document.title="Home",W(e,"class","svelte-mn9hp2")},m(o,i){v(o,t,i),v(o,e,i),y(e,r),y(r,c),y(e,p),T(l,e,null),y(e,_),T(f,e,null),a=!0},p(o,[i]){const d={};!g&&i&1&&(g=!0,d.voice=o[0],X(()=>g=!1)),f.$set(d)},i(o){a||(S(l.$$.fragment,o),S(f.$$.fragment,o),a=!0)},o(o){q(l.$$.fragment,o),q(f.$$.fragment,o),a=!1},d(o){o&&h(t),o&&h(e),F(l),F(f)}}}const ie=!0;function ne(n,t,e){let r,c,p=Y.Flow,l=[];function _(a){let s=[...a.detail.keys()];e(2,l=s)}function f(a){var u;if(!!(a!=null&&a.keys)){var s=new p.Voice({num_beats:1,beat_value:4});return s.addTickable(new p.StaveNote({clef:"treble",keys:(u=a==null?void 0:a.keys)!=null?u:[],duration:"q"})),s}}function g(a){c=a,e(0,c),e(3,r),e(2,l),e(5,p)}return n.$$.update=()=>{n.$$.dirty&4&&e(3,r=()=>{if(l.length===0)return;let s=l.map(u=>ee().get(u)).flatMap(u=>u.keys);return console.log("nnnnn",s),new p.StaveNote({clef:"treble",keys:s,duration:"q"})}),n.$$.dirty&8&&e(0,c=f(r()))},[c,_,l,r,g]}class re extends I{constructor(t){super();L(this,t,ne,te,D,{})}}export{re as default,ie as prerender};
