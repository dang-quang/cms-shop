_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[123],{"7dMZ":function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/shop/flash-sale-shop/components/TableFinished",function(){return a("F4W/")}])},"F4W/":function(e,t,a){"use strict";a.r(t);var r=a("nKUr"),s=a("o0o1"),n=a.n(s),c=a("HaE+"),o=a("ODXe"),i=a("q1tI"),u=a.n(i),d=a("sp93"),b=a("s/Ec"),l=a("oxre"),p=a("9kay"),j=a("Wgwc"),h=a.n(j),f=a("/MKj"),O=a("DzNn"),g=a("Orb1"),x=a("WztA"),m=a("20a2"),_=a("bgFo"),v=a("LvDl"),S=a("No4j");t.default=function(){var e="YYYY-MM-DD",t=(Object(m.useRouter)(),Object(f.useDispatch)()),a=Object(p.c)().t,s=Object(f.useSelector)((function(e){return e.app})),i=s.loading,j=s.showLoader,w=i||j,E=u.a.useState([]),C=Object(o.a)(E,2),D=C[0],y=C[1],I=u.a.useState(1),N=Object(o.a)(I,2),P=(N[0],N[1]),k=u.a.useState(0),F=Object(o.a)(k,2),M=F[0],W=F[1],H=u.a.useState([]),R=Object(o.a)(H,2),z=R[0],T=R[1],U=[a("time"),a("products"),a("status"),a("enable_disable"),a("actions")],Y=Object(l.usePagination)({total:M,limits:{outer:1,inner:2},initialState:{pageSize:50,isDisabled:!1,currentPage:1}}),G=Y.pages,L=Y.pagesCount,X=Y.currentPage,J=Y.setCurrentPage,K=Y.isDisabled;u.a.useEffect((function(){Object(c.a)(n.a.mark((function e(){var r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t(Object(O.v)(!0)),e.next=4,Object(S.h)({page:1,shopId:143,type:g.f.FINISHED});case 4:(r=e.sent).code===g.b.MSG_SUCCESS&&r.data&&r.data.results?(y(r.data.results),P(r.data.totalPages),W(r.data.totalRecords)):x.b.error({title:a("error"),message:a("no_data_exists")});case 6:return e.prev=6,t(Object(O.v)(!1)),e.finish(6);case 9:case"end":return e.stop()}}),e,null,[[0,,6,9]])})))()}),[]),u.a.useEffect((function(){Object(c.a)(n.a.mark((function r(){var s;return n.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(r.prev=0,!(z.length<2)){r.next=3;break}return r.abrupt("return");case 3:return t(Object(O.v)(!0)),r.next=6,Object(S.h)({page:1,shopId:143,type:g.f.FINISHED,fromDate:h()(z[0]).format(e),toDate:h()(z[1]).format(e)});case 6:(s=r.sent).code===g.b.MSG_SUCCESS&&s.data&&s.data.results?(y(s.data.results),P(s.data.totalPages),W(s.data.totalRecords)):x.b.error({title:a("error"),message:a("no_data_exists")});case 8:return r.prev=8,t(Object(O.v)(!1)),r.finish(8);case 11:case"end":return r.stop()}}),r,null,[[0,,8,11]])})))()}),[z]);var Z=u.a.useCallback(Object(c.a)(n.a.mark((function e(){var r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,T([]),t(Object(O.v)(!0)),e.next=5,Object(S.h)({page:1,shopId:143,type:g.f.FINISHED});case 5:(r=e.sent).code===g.b.MSG_SUCCESS&&r.data&&r.data.results?(y(r.data.results),P(r.data.totalPages),W(r.data.totalRecords)):x.b.error({title:a("error"),message:a("no_data_exists")});case 7:return e.prev=7,t(Object(O.v)(!1)),e.finish(7);case 10:case"end":return e.stop()}}),e,null,[[0,,7,10]])}))),[]);return Object(r.jsxs)(d.d,{children:[Object(r.jsx)(_.p,{selectedDates:z,onDateChange:T,onClear:Z}),Object(r.jsx)(d.d,{mt:"6",bg:"white",minH:Object(v.isEmpty)(D)||w?"300px":"unset",borderRadius:"4px",overflow:"auto",borderWidth:"1px",borderColor:"border-5",position:"relative",children:Object(r.jsxs)(b.a,{variant:"simple",children:[Object(r.jsx)(b.h,{h:"52px",bg:"primary.100",children:Object(r.jsx)(b.i,{children:U.map((function(e,t){return Object(r.jsx)(b.g,{borderBottomWidth:"0px",color:"white",textStyle:"b-md",textTransform:"capitalize",isNumeric:t===U.length-1,children:e},t)}))})}),w?Object(r.jsx)(_.f,{}):Object(v.isEmpty)(D)?Object(r.jsx)(_.b,{title:a("no_shop_flash_sales_found")}):Object(r.jsx)(r.Fragment,{children:D.map((function(e,t){return Object(r.jsx)(_.d,{item:e,isLast:t===D.length-1},t)}))})]})}),!Object(v.isEmpty)(D)&&!w&&Object(r.jsxs)(d.j,{justifyContent:"space-between",alignItems:"center",children:[Object(r.jsx)(_.m,{pagesCount:L,currentPage:X,isDisabled:K,onPageChange:function(e){y([]),J(e)},pages:G,mt:"24px",mb:"8px"}),Object(r.jsx)(d.C,{textStyle:"h4-m",children:a("results_page",{start:50*(X-1)+1,end:50*(X-1)+D.length,total:M})})]})]})}}},[["7dMZ",0,1,9,13,16,18,19,21,20,17,22,2,3,4,6,5,7,8,10,12,11,14,15,23]]]);