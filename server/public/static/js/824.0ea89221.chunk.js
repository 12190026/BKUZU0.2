"use strict";(self.webpackChunkfacebook_clone_app_react_client=self.webpackChunkfacebook_clone_app_react_client||[]).push([[824],{4824:function(e,r,t){t.r(r);var n=t(3430),u=t(2791),c=t(1876),s=t(9538),a=t(6470),o=t(7635);r.default=function(){var e=(0,s.UO)(),r=(0,u.useContext)(c.St),t=r.userState,l=r.userDispatch,i=(0,u.useState)(null),f=(0,n.Z)(i,2),d=f[0],p=f[1];return(0,u.useEffect)((function(){if(t.currentUser.id==e.userId)p(t.currentUser);else{var r=t.users.findIndex((function(r){return r.id==e.userId}));-1!==r?p(t.users[r]):(0,a.Mi)(e.userId).then((function(e){e.data&&(p(e.data.user),l({type:"ADD_USER",payload:e.data.user})),e.error&&console.log(e.error)})).catch((function(e){return console.log(e)}))}}),[e.userId]),u.createElement("div",null,d&&u.createElement(o.Z,{user:d}))}}}]);
//# sourceMappingURL=824.0ea89221.chunk.js.map