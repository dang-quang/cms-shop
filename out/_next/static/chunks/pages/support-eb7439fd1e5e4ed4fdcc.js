_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[115],{"8oxB":function(e,t){var i,n,c=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function o(e){if(i===setTimeout)return setTimeout(e,0);if((i===a||!i)&&setTimeout)return i=setTimeout,setTimeout(e,0);try{return i(e,0)}catch(t){try{return i.call(null,e,0)}catch(t){return i.call(this,e,0)}}}!function(){try{i="function"===typeof setTimeout?setTimeout:a}catch(e){i=a}try{n="function"===typeof clearTimeout?clearTimeout:r}catch(e){n=r}}();var s,l=[],d=!1,m=-1;function h(){d&&s&&(d=!1,s.length?l=s.concat(l):m=-1,l.length&&u())}function u(){if(!d){var e=o(h);d=!0;for(var t=l.length;t;){for(s=l,l=[];++m<t;)s&&s[m].run();m=-1,t=l.length}s=null,d=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===r||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function f(e,t){this.fun=e,this.array=t}function p(){}c.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var i=1;i<arguments.length;i++)t[i-1]=arguments[i];l.push(new f(e,t)),1!==l.length||d||o(u)},f.prototype.run=function(){this.fun.apply(null,this.array)},c.title="browser",c.browser=!0,c.env={},c.argv=[],c.version="",c.versions={},c.on=p,c.addListener=p,c.once=p,c.off=p,c.removeListener=p,c.removeAllListeners=p,c.emit=p,c.prependListener=p,c.prependOnceListener=p,c.listeners=function(e){return[]},c.binding=function(e){throw new Error("process.binding is not supported")},c.cwd=function(){return"/"},c.chdir=function(e){throw new Error("process.chdir is not supported")},c.umask=function(){return 0}},AqyA:function(e,t,i){"use strict";var n=i("wx14"),c=i("Ff2n"),a=i("q1tI"),r=i("iuhU"),o=i("H2TA"),s=i("NqtD"),l=a.forwardRef((function(e,t){var i=e.classes,o=e.className,l=e.color,d=void 0===l?"inherit":l,m=e.component,h=void 0===m?"span":m,u=e.fontSize,f=void 0===u?"medium":u,p=Object(c.a)(e,["classes","className","color","component","fontSize"]);return a.createElement(h,Object(n.a)({className:Object(r.a)("material-icons",i.root,o,"inherit"!==d&&i["color".concat(Object(s.a)(d))],"default"!==f&&"medium"!==f&&i["fontSize".concat(Object(s.a)(f))]),"aria-hidden":!0,ref:t},p))}));l.muiName="Icon",t.a=Object(o.a)((function(e){return{root:{userSelect:"none",fontSize:e.typography.pxToRem(24),width:"1em",height:"1em",overflow:"hidden",flexShrink:0},colorPrimary:{color:e.palette.primary.main},colorSecondary:{color:e.palette.secondary.main},colorAction:{color:e.palette.action.active},colorError:{color:e.palette.error.main},colorDisabled:{color:e.palette.action.disabled},fontSizeInherit:{fontSize:"inherit"},fontSizeSmall:{fontSize:e.typography.pxToRem(20)},fontSizeLarge:{fontSize:e.typography.pxToRem(36)}}}),{name:"MuiIcon"})(l)},"PH+m":function(e,t){e.exports="/_next/static/images/logo-fcf03ec999ac14a60c1ce49ac24441c8.png"},PiOk:function(e,t,i){"use strict";var n=i("l3v6"),c=(i("7tlc"),{mainContainer:{maxWidth:1160,width:"100%",margin:"0 auto"},topHeader:{width:"100%",backgroundColor:"rgba(51,143,250,1)",padding:"10px 0"},bottomHeader:{width:"100%",backgroundColor:n.z,padding:"10px 0"},flex_center:{display:"flex",alignItems:"center"},flex_center_between:{display:"flex",alignItems:"center",justifyContent:"space-between"},listItem:{listStyle:"none",margin:0,padding:0},item:{paddingRight:5,marginRight:5},item2:{paddingLeft:15,marginLeft:15},itemText:{color:n.z,fontSize:14,margin:0,fontWeight:400},icon:{fontSize:18,color:n.z,marginRight:5},itemText2:{fontSize:16,margin:0,fontWeight:500},icon2:{fontSize:18,marginLeft:5},logo:{width:60,height:"auto"},txtHover:{cursor:"pointer"},btnRegister:{marginLeft:"30px !important"},section_1:{width:"100%",height:"100%",backgroundColor:n.z,padding:"0 0 0",position:"relative"},image:{maxWidth:"100%",height:"auto"},mainTitle:{fontWeight:400},subTitle:{fontWeight:400,color:n.k[0],fontSize:18},txtLogo:{fontSize:"24px",fontWeight:400,marginLeft:"20px"},pPaddingLeft1:{paddingLeft:"40px"},pPaddingLeft2:{paddingLeft:"80px"},listStyle:{}});t.a=c},Szmw:function(e,t,i){"use strict";i.r(t),i.d(t,"default",(function(){return j}));var n=i("nKUr"),c=i("YFqc"),a=i.n(c),r=i("q1tI"),o=i("/MKj"),s=i("R/WZ"),l=i("Kg+a"),d=i("AqyA"),m=i("mtPR"),h=i("i4t8"),u=i("PH+m"),f=i.n(u),p=i("PiOk");function j(){var e=Object(s.a)(p.a)(),t=Object(o.useSelector)((function(e){return e.app.language})),i=[{id:"en"},{id:"vi"}],c=Object(r.useState)(i[0]),u=(c[0],c[1]);Object(r.useEffect)((function(){for(var e=0;e<i.length;e++)if(t==i[e].id){u(i[e]);break}}),[t]);return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsxs)("header",{className:e.header,children:[Object(n.jsx)("div",{className:e.topHeader,children:Object(n.jsxs)("div",{className:e.mainContainer+" "+e.flex_center_between,children:[Object(n.jsxs)("ul",{className:e.listItem+" "+e.flex_center,children:[Object(n.jsxs)("li",{className:e.item+" "+e.flex_center,children:[Object(n.jsx)(d.a,{className:e.icon,children:"phone"}),Object(n.jsx)("p",{className:e.itemText,children:"(+84) 928 868 858"})]}),Object(n.jsxs)("li",{className:e.item+" "+e.flex_center,children:[Object(n.jsx)(d.a,{className:e.icon,children:"alternate_email"}),Object(n.jsx)("p",{className:e.itemText,children:"hanoimicrotec@gmail.com"})]})]}),Object(n.jsx)(a.a,{href:"admin/login",children:Object(n.jsx)("p",{className:e.itemText+" "+e.txtHover,children:"Login"})})]})}),Object(n.jsx)("div",{className:e.bottomHeader,children:Object(n.jsxs)("div",{className:e.mainContainer+" "+e.flex_center_between,children:[Object(n.jsxs)("div",{className:e.flex_center,children:[Object(n.jsx)("img",{className:e.logo,src:f.a}),Object(n.jsx)("p",{className:e.txtLogo,children:"natcash"})]}),Object(n.jsxs)("div",{className:e.flex_center,children:[Object(n.jsxs)("ul",{className:e.listItem+" "+e.flex_center,children:[Object(n.jsxs)("li",{className:e.item2+" "+e.flex_center+" "+e.txtHover,children:[Object(n.jsx)("p",{className:e.itemText2,children:"Feature"}),Object(n.jsx)(d.a,{className:e.icon2,children:"keyboard_arrow_down"})]}),Object(n.jsxs)("li",{className:e.item2+" "+e.flex_center+" "+e.txtHover,children:[Object(n.jsx)("p",{className:e.itemText2,children:"Price list"}),Object(n.jsx)(d.a,{className:e.icon2,children:"keyboard_arrow_down"})]})]}),Object(n.jsx)(l.a,{color:"info",className:e.btnRegister,children:"Register"})]})]})})]}),Object(n.jsx)("div",{className:e.section_1,children:Object(n.jsx)(m.a,{children:Object(n.jsx)("div",{className:e.mainContainer+" "+e.flex_center_between,children:Object(n.jsxs)(h.a,{xs:12,sm:12,md:12,children:[Object(n.jsx)("h1",{children:"Resolve complaints"}),Object(n.jsx)("p",{children:"1. Purpose of customer inquiries - complaints:"}),Object(n.jsxs)("ul",{children:[Object(n.jsx)("li",{children:"natcash.com wishes to bring customers a satisfied care service experience and safe and reliable products."}),Object(n.jsx)("li",{children:"natcash.com will carefully verify each complaint and provide reasonable solutions in a timely, thoughtful and most dedicated manner to protect the interests of customers."}),Object(n.jsx)("li",{children:"Complaint settlement is the bridge connecting customers with natcash.com, helping us to become more and more perfect, a reliable destination for Vietnamese families."}),Object(n.jsx)("li",{children:"During the transaction process, if you have any questions about products or services, or detect deficiencies in the professional service, service style and spirit, natcash.com would like to receive feedback. feedback from customers."})]}),Object(n.jsx)("p",{children:"2. Process of receiving and handling customer inquiries - complaints:"}),Object(n.jsx)("p",{className:e.pPaddingLeft1,children:"Step 1"}),Object(n.jsx)("p",{className:e.pPaddingLeft2,children:"Customers send feedback to natcash.com by the following ways:"}),Object(n.jsx)("ul",{children:Object(n.jsx)("li",{className:e.listStyle,children:Object(n.jsxs)("ul",{children:[Object(n.jsx)("li",{children:"Directly: Customers please respond to staff at Microtec nationwide or Customer Care Department natcash.com"}),Object(n.jsx)("li",{children:"Phone: By calling the Customer Care hotline 0928 868 858 (24/7 all days of the week including holidays and New Year)."}),Object(n.jsx)("li",{children:"Email: Send email to: hanoimicrotec@gmail.com"})]})})}),Object(n.jsx)("p",{className:e.pPaddingLeft1,children:"Step 2"}),Object(n.jsx)("p",{className:e.pPaddingLeft2,children:"The Customer Care Specialist of Ha Noi Microtec receives customer feedback, conducts information verification of related issues."}),Object(n.jsx)("p",{className:e.pPaddingLeft1,children:"Step 3"}),Object(n.jsx)("p",{className:e.pPaddingLeft2,children:"Handling customer inquiries - complaints (during office hours)"}),Object(n.jsx)("p",{children:"3. Regulations on handling customer inquiries and complaints:"}),Object(n.jsx)("p",{className:e.pPaddingLeft1,children:"3.1 Time to resolve questions - complaints:"}),Object(n.jsx)("p",{className:e.pPaddingLeft2,children:"All inquiries - complaints from customers will be recorded and answered immediately within a period of 60 minutes (office hours 8:00 - 17:00), in some cases it is necessary to contact multiple departments to Maximum customer support is no later than 24 hours from the date of receipt (excluding Sundays) and will be handled effectively within 03 working days at the latest. In case of force majeure, the two parties will negotiate the time by themselves."}),Object(n.jsx)("p",{className:e.pPaddingLeft1,children:"3.2 Regulations on handling customer inquiries and complaints:"}),Object(n.jsx)("ul",{children:Object(n.jsx)("li",{className:e.listStyle,children:Object(n.jsxs)("ul",{children:[Object(n.jsx)("li",{children:"Customer Care Department of Ha Noi Microtec will receive and analyze in detail each customer's query - complaint, depending on the nature and extent of the inquiry - complaint, Tho Tho Shop will have Specific measures to support fully, conscientiously and thoughtfully, bring the highest satisfaction and peace of mind to customers."}),Object(n.jsx)("li",{children:"Regulations on handling inquiries and complaints from customers of Tho Tho Shop are based on agreement and respect for customers, in strict compliance with legal regulations. In case the complaint is beyond the ability of both parties to settle, the matter will be taken to the competent State agencies for settlement."}),Object(n.jsx)("li",{children:"Your honest and honest opinions are an extremely valuable asset to the development of natcash.com in accordance with our operating motto: \u201cRegarding customers as relatives - placing orders Customers are the center of all our thoughts and actions\u201d."})]})})}),Object(n.jsx)("p",{children:"ANY QUESTIONS PLEASE CONTACT:"}),Object(n.jsx)("p",{children:"Customer Care Department"}),Object(n.jsx)("p",{children:"Ha Noi Microtec Company - Mother and Baby supermarket system natcash.com"}),Object(n.jsx)("p",{children:"Hotline: 0928 868 858 / Email: hanoimicrotec@gmail.com"}),Object(n.jsx)("p",{children:"Sincerely thank you!"})]})})})})]})}},u16i:function(e,t,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/support",function(){return i("Szmw")}])}},[["u16i",0,1,2,3,4,34]]]);