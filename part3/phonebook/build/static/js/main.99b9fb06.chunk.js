(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{19:function(e,t,n){},20:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(14),o=n.n(r),i=(n(19),n(20),n(3)),u=n(0),s=function(e){var t=e.name,n=e.number,c=e.destroyContact,a=e.id;return Object(u.jsxs)("div",{className:"list",children:[Object(u.jsxs)("li",{children:[t," ",n]}),Object(u.jsx)("button",{onClick:function(e){return c(e,a)},children:"delete"})]})},d=function(e){var t=e.addPerson,n=e.newName,c=e.addName,a=e.newNumber,r=e.addNumber;return Object(u.jsx)("div",{children:Object(u.jsxs)("form",{onSubmit:t,children:[Object(u.jsxs)("div",{children:["name: ",Object(u.jsx)("input",{value:n,onChange:c,type:"text"})]}),Object(u.jsxs)("div",{children:["number: ",Object(u.jsx)("input",{value:a,onChange:r,type:"text"})]}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{type:"submit",children:"add"})})]})})},b=function(e){var t=e.filterContact;return Object(u.jsxs)("div",{children:[Object(u.jsx)("label",{htmlFor:"filter",children:"filter shown with"}),Object(u.jsx)("input",{name:"filter",id:"filter",type:"text",onChange:t})]})},j=n(4),l=n.n(j),f="/api/persons",h=function(){return l.a.get(f).then((function(e){return e.data}))},m=function(e){return l.a.post(f,e).then((function(e){return e.data}))},O=function(e){return l.a.delete(f+"/".concat(e)).then((function(e){return e.data}))},v=function(e,t){return l.a.put(f+"/".concat(e),t).then((function(e){return e.data}))},p=function(e){var t=e.message,n=e.messageType;return t?Object(u.jsx)("div",{className:n,children:t}):null},x=function(){var e=Object(c.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(""),o=Object(i.a)(r,2),j=o[0],l=o[1],f=Object(c.useState)(""),x=Object(i.a)(f,2),g=x[0],w=x[1],C=Object(c.useState)([]),y=Object(i.a)(C,2),N=y[0],S=y[1],k=Object(c.useState)(""),D=Object(i.a)(k,2),F=D[0],P=D[1],L=Object(c.useState)(""),T=Object(i.a)(L,2),B=T[0],E=T[1];Object(c.useEffect)((function(){h().then((function(e){a(e),S(e)}))}),[]);var I=function(e,t){e.preventDefault();var c=n.find((function(e){return e.id===t}));window.confirm("Delete ".concat(c.name," contact?"))&&O(t).then((function(){var e=n.filter((function(e){return e.id!==t}));a(e),S(e),P("".concat(c.name,"'s contact has been deleted.")),E("error")}))};return Object(u.jsxs)("div",{children:[Object(u.jsx)("h2",{children:"Phonebook"}),Object(u.jsx)(p,{message:F,messageType:B}),Object(u.jsx)(b,{filterContact:function(e){e.preventDefault();var t=e.target.value.toLowerCase();0===t.length?S(n):S(n.filter((function(e){return e.name.toLowerCase().includes(t)})))}}),Object(u.jsx)("h3",{children:"Add a new contact"}),Object(u.jsx)(d,{addPerson:function(e){e.preventDefault();var t={name:j,number:g},c=n.filter((function(e){return e.name===t.name})),r=c[0];if(c.length>0){var o="".concat(j," is already added to phonebook, replace the old number with \n                   a new one?");window.confirm(o)&&v(r.id,t).then((function(e){P("".concat(e.name," has been updated.")),E("success"),S(n.map((function(t){return t.name!==e.name?t:e})))})).catch((function(){P("".concat(t.name," contact has already been removed")),E("error"),S(n.filter((function(e){return e.name!==r.name})))}))}else m(t).then((function(e){P("".concat(e.name," has been added.")),E("success"),a(n.concat(e)),S(N.concat(e))})).catch((function(e){P("".concat(e.response.data.error)),E("error"),S(n)}));l(""),w("")},newName:j,addName:function(e){e.preventDefault(),l(e.target.value)},newNumber:g,addNumber:function(e){e.preventDefault(),w(e.target.value,10)}}),Object(u.jsx)("h2",{children:"Numbers"}),Object(u.jsx)("ul",{children:N.map((function(e){return Object(u.jsx)(s,{id:e.id,name:e.name,number:e.number,destroyContact:I},e.id)}))})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,41)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))};o.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(x,{})}),document.getElementById("root")),g()}},[[40,1,2]]]);
//# sourceMappingURL=main.99b9fb06.chunk.js.map