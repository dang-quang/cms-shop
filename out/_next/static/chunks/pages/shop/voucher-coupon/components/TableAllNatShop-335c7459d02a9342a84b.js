_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[153],{LWFf:function(e,t,r){"use strict";r.d(t,"h",(function(){return h})),r.d(t,"g",(function(){return b})),r.d(t,"f",(function(){return j})),r.d(t,"e",(function(){return v})),r.d(t,"d",(function(){return O})),r.d(t,"a",(function(){return m})),r.d(t,"b",(function(){return g})),r.d(t,"c",(function(){return x}));var n=r("o0o1"),a=r.n(n),c=r("HaE+"),s=r("Orb1"),u=r("LvDl"),o=r.n(u),i=r("20a2"),p=r.n(i),f=r("WztA"),l=r("CXox"),d=r("DzNn");function h(e){return{type:s.a.SELECTED_VOUCHERS,selectedVouchers:e}}function b(e){return{type:s.a.SEARCH_VOUCHER_NAME,searchVoucherName:e}}function j(e){return{type:s.a.SEARCH_PROGRAM_VOUCHER_NAME,searchProgramVoucherName:e}}function v(e){return{type:s.a.SEARCH_PROGRAM_VOUCHER_DATE,searchProgramVoucherDate:e}}function O(e){return{type:s.a.DO_SEARCH_VOUCHER,doSearchVoucher:e}}var m=function(){return function(){var e=Object(c.a)(a.a.mark((function e(t,r){var n,c,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n=r().voucher.selectedVouchers,c=o.a.flatMap(n,"vouchers").map((function(e){return e.id})),t(Object(d.v)(!0)),!c.length){e.next=14;break}return e.next=7,Object(l.R)({ids:c,type:s.b.APPROVE});case 7:if(!(u=e.sent)||u.code!==s.b.MSG_SUCCESS){e.next=14;break}return!1||(t(Object(d.v)(!1)),f.b.success({title:"Successful",message:"The vouchers have been approved successfully"}),!0),e.next=13,new Promise((function(e){return setTimeout(e,2e3)}));case 13:p.a.push("/admin/voucher-program-approval");case 14:e.next=19;break;case 16:e.prev=16,e.t0=e.catch(0),console.log("approve vouchers error",e.t0);case 19:return e.prev=19,t(Object(d.v)(!1)),e.finish(19);case 22:case"end":return e.stop()}}),e,null,[[0,16,19,22]])})));return function(t,r){return e.apply(this,arguments)}}()},g=function(){return function(){var e=Object(c.a)(a.a.mark((function e(t,r){var n,c,u;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n=r().voucher.selectedVouchers,c=o.a.flatMap(n,"vouchers").map((function(e){return e.id})),t(Object(d.v)(!0)),!c.length){e.next=14;break}return e.next=7,Object(l.R)({ids:c,type:s.b.REJECT});case 7:if(!(u=e.sent)||u.code!==s.b.MSG_SUCCESS){e.next=14;break}return!1||(f.b.success({title:"Successful",message:"The vouchers have been rejected successfully"}),!0),e.next=13,new Promise((function(e){return setTimeout(e,2e3)}));case 13:p.a.push("/admin/voucher-program-approval");case 14:return e.prev=14,t(Object(d.v)(!1)),e.finish(14);case 17:case"end":return e.stop()}}),e,null,[[0,,14,17]])})));return function(t,r){return e.apply(this,arguments)}}()},x=function(){return function(){var e=Object(c.a)(a.a.mark((function e(t){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t(j("")),t(v([])),t(O(!0));case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}},"v7X+":function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/shop/voucher-coupon/components/TableAllNatShop",function(){return r("wrSA")}])},wrSA:function(e,t,r){"use strict";r.r(t);var n=r("nKUr"),a=r("o0o1"),c=r.n(a),s=r("HaE+"),u=r("ODXe"),o=r("q1tI"),i=r.n(o),p=r("sRqu"),f=r("sp93"),l=r("lsQ0"),d=r("oxre"),h=r("9kay"),b=r("/MKj"),j=r("DzNn"),v=r("20a2"),O=r("bgFo"),m=r("LvDl"),g=r("Orb1"),x=r("No4j"),_=r("LWFf"),S=r("Wgwc"),E=r.n(S),w=r("jA42");t.default=function(){var e="YYYY/MM/DD",t=Object(v.useRouter)(),r=Object(p.d)(),a=Object(b.useDispatch)(),o=Object(h.c)().t,S=Object(b.useSelector)((function(e){return e.app})),C=S.loading,y=S.showLoader,R=C||y,P=i.a.useState([]),D=Object(u.a)(P,2),k=D[0],A=D[1],V=i.a.useState(1),N=Object(u.a)(V,2),M=(N[0],N[1]),H=i.a.useState(0),T=Object(u.a)(H,2),U=T[0],L=T[1],G=Object(b.useSelector)((function(e){return e.voucher})),X=G.doSearchVoucher,F=G.searchProgramVoucherName,W=G.searchProgramVoucherDate,z=Object(d.usePagination)({total:U,limits:{outer:1,inner:2},initialState:{pageSize:50,isDisabled:!1,currentPage:1}}),I=z.pages,Y=z.pagesCount,q=z.currentPage,J=z.setCurrentPage,K=z.isDisabled;return i.a.useEffect((function(){Object(s.a)(c.a.mark((function e(){var t,n;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(Object(j.v)(!0)),t={page:1,shopId:143},e.next=5,Object(x.m)(t);case 5:(n=e.sent).code===g.b.MSG_SUCCESS?n.data&&n.data.results?(A(n.data.results),M(n.data.totalPages),L(n.data.totalRecords)):(A([]),M(1),L(0)):(A([]),M(1),L(0),r({position:"top",title:o("error"),description:o("no_data_exists"),status:"error",duration:2e3,isClosable:!0}));case 7:return e.prev=7,a(Object(j.v)(!1)),e.finish(7);case 10:case"end":return e.stop()}}),e,null,[[0,,7,10]])})))()}),[]),i.a.useEffect((function(){Object(s.a)(c.a.mark((function t(){var n,s;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,n={shopId:143,page:q},!X){t.next=11;break}return a(Object(j.v)(!0)),a(Object(j.o)(!0)),F&&(n.keyWord=F),W.length>1&&(n.fromDate=E()(W[0]).format(e),n.toDate=E()(W[1]).format(e)),t.next=9,Object(x.m)(n);case 9:(s=t.sent).code===g.b.MSG_SUCCESS?s.data&&s.data.results?(A(s.data.results),M(s.data.totalPages),L(s.data.totalRecords)):(A([]),M(1),L(0)):(A([]),M(1),L(0),r({position:"top",title:o("no_results_found"),description:o("no_results_found_for_your_search"),status:"error",duration:2e3,isClosable:!0}));case 11:return t.prev=11,a(Object(_.d)(!1)),a(Object(j.v)(!1)),setTimeout((function(){a(Object(j.o)(!1))}),2e3),t.finish(11);case 16:case"end":return t.stop()}}),t,null,[[0,,11,16]])})))()}),[143,X,q,F,W]),Object(n.jsxs)(f.d,{children:[Object(n.jsx)(f.d,{mt:"6",position:"relative",minH:Object(m.isEmpty)(k)||R?"300px":"unset",children:R?Object(n.jsx)(n.Fragment,{children:Array(4).fill(4).map((function(e,t){return Object(n.jsx)(O.g,{},t)}))}):Object(m.isEmpty)(k)?Object(n.jsx)(O.b,{title:o("no_data"),children:Object(n.jsx)(l.a,{as:w.d,w:"93px",h:"87px"})}):Object(n.jsx)(n.Fragment,{children:k.map((function(e,r){return Object(n.jsx)(O.w,{item:e,index:r,isLast:r===k.length-1,onClick:function(){return t.push({pathname:"/shop/voucher-coupon/program-voucher",query:e})}})}))})}),!Object(m.isEmpty)(k)&&!R&&Object(n.jsxs)(f.j,{justifyContent:"space-between",alignItems:"center",children:[Object(n.jsx)(O.m,{pagesCount:Y,currentPage:q,isDisabled:K,onPageChange:function(e){A([]),J(e)},pages:I,mt:"24px",mb:"8px"}),Object(n.jsx)(f.C,{textStyle:"h4-m",children:o("results_page",{start:50*(q-1)+1,end:50*(q-1)+k.length,total:U})})]})]})}}},[["v7X+",0,1,9,13,16,18,19,21,20,17,22,2,3,4,6,5,7,8,10,12,11,14,15,23]]]);