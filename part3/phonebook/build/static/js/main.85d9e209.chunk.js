(this.webpackJsonppart2=this.webpackJsonppart2||[]).push([[0],{39:function(e,n,t){"use strict";t.r(n);var r=t(2),c=t(5),u=t.n(c),i=t(7),a=t(3),o=t(4),l=t.n(o),s="/api/persons",d=function(){return l.a.get(s).then((function(e){return e.data}))},j=function(e){return l.a.post(s,e).then((function(e){return e.data}))},b=function(e){console.log("clicked for phone no"+e),l.a.delete(s+"/"+e)},f=function(e){return l.a.put(s+"/"+e.id,e).then((function(e){return e.data}))},h=t(0),m=function(e){var n=e.person,t=e.handleDeletePerson;return Object(h.jsxs)("li",{children:[n.name," ",n.number,Object(h.jsx)("button",{onClick:function(){!function(e){window.confirm("Delete "+e.name+" ?")&&(b(e.id),t(e.id))}(n)},children:"delete"})]})},O=function(e){var n=e.allpersons,t=e.newFilter,r=e.handleDeletePerson;return 0===t.length?n.map((function(e){return Object(h.jsx)(m,{person:e,handleDeletePerson:r},e.id)})):n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(h.jsx)(m,{person:e,handleDeletePerson:r},e.id)}))},p=function(e){return Object(h.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(h.jsxs)("div",{children:["name : ",Object(h.jsx)("input",{value:e.newName,onChange:e.namehandler}),"number : ",Object(h.jsx)("input",{value:e.newNumber,onChange:e.numberhandler})]}),Object(h.jsx)("br",{}),Object(h.jsx)("div",{children:Object(h.jsx)("button",{type:"submit",children:"add"})})]})},x=function(e){var n=e.msg,t=e.value,r=e.onChange;return Object(h.jsxs)("div",{children:[n,Object(h.jsx)("input",{value:t,onChange:r})]})},g=function(e){var n=e.message;if(null===n)return null;return Object(h.jsx)("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},children:n})},v=function(){var e=Object(r.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],u=Object(r.useState)(""),o=Object(a.a)(u,2),l=o[0],s=o[1],b=Object(r.useState)(""),m=Object(a.a)(b,2),v=m[0],w=m[1],S=Object(r.useState)(""),y=Object(a.a)(S,2),C=y[0],D=y[1],k=Object(r.useState)(null),P=Object(a.a)(k,2),N=P[0],B=P[1];Object(r.useEffect)((function(){d().then((function(e){return c(e)}))}),[]);var F=function(e){B(e),setTimeout((function(){B(null)}),5e3)};return Object(h.jsxs)("div",{children:[Object(h.jsx)("h2",{children:"PhoneBook"}),Object(h.jsx)(g,{message:N}),Object(h.jsx)(x,{msg:"Filter shown with",value:C,onChange:function(e){D(e.target.value)}}),Object(h.jsx)(p,{onSubmit:function(e){if(e.preventDefault(),!(l.length<1||v.length<1)){var n=t.filter((function(e){return e.name===l}));if(n.length>0){if(window.confirm("".concat(l," already exists. Do you want to replace the old number with the new one ?"))){var r=Object(i.a)(Object(i.a)({},n[0]),{},{number:v});f(r).then((function(e){c(t.map((function(n){return n.id==e.id?e:n}))),F("".concat(e.name," updated Successfully"))}))}}else{var u={name:l,number:v,id:t.reduce((function(e,n){return Math.max(n.id,e)}),0)+1};j(u).then((function(e){c(t.concat(e)),F("".concat(e.name," Added Successfully"))})),s(""),w("")}}},newName:l,namehandler:function(e){s(e.target.value)},newNumber:v,numberhandler:function(e){w(e.target.value)}}),Object(h.jsx)("h2",{children:"Numbers"}),Object(h.jsx)("div",{children:Object(h.jsx)("ul",{children:Object(h.jsx)(O,{allpersons:t,newFilter:C,handleDeletePerson:function(e){c(t.filter((function(n){return n.id!=e})))}})})})]})};u.a.render(Object(h.jsx)(v,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.85d9e209.chunk.js.map