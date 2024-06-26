"use strict";(self.webpackChunknodebucket=self.webpackChunknodebucket||[]).push([[290],{7290:(M,u,o)=>{o.r(u),o.d(u,{SecurityModule:()=>S});var c=o(6814),a=o(2058),r=o(6223),d=o(9862),e=o(8926);let p=(()=>{class t{static#e=this.\u0275fac=function(s){return new(s||t)};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-security"]],decls:1,vars:0,template:function(s,i){1&s&&e._UZ(0,"router-outlet")},dependencies:[a.lC],encapsulation:2})}return t})();var m=o(459),h=o(3445);function f(t,l){if(1&t&&(e.TgZ(0,"div",16),e._uU(1),e.qZA()),2&t){const n=e.oxw();e.xp6(1),e.hij(" ",n.errMessage," ")}}function C(t,l){1&t&&(e.TgZ(0,"span"),e._uU(1,"Login"),e.qZA())}function v(t,l){1&t&&(e.TgZ(0,"span",17),e.O4$(),e.TgZ(1,"svg",18),e._UZ(2,"path",19)(3,"path",20),e.qZA()())}const y=function(t,l){return{"border-red-600":t,"placeholder-err":l}},b=function(){return["/"]},x=[{path:"",component:p,title:"Nodebucket: Security",children:[{path:"login",component:(()=>{class t{constructor(n,s,i,g,I){this.fb=n,this.cookieService=s,this.router=i,this.securityService=g,this.route=I,this.errMessage="",this.isLoading=!1,this.signinForm=this.fb.group({empId:[null,r.kI.compose([r.kI.required,r.kI.pattern("^[0-9]*$")])]}),this.errMessage="",this.sessionUser={}}signin(){this.isLoading=!0;const n=this.signinForm.controls.empId.value;return n?!n||isNaN(parseInt(n,10))?(this.errMessage="The employee ID you entered is invalid, please try again",void(this.isLoading=!1)):void this.securityService.findEmployeeById(n).subscribe({next:s=>{this.sessionUser=s,this.cookieService.set("session_user",n,1),this.cookieService.set("session_name",`${s.firstName} ${s.lastName}`,1),this.cookieService.set("session_first_name",s.firstName,1),console.log("session_first_name:",s.firstName);const i=this.route.snapshot.queryParamMap.get("returnUrl")||"/";this.isLoading=!1,this.router.navigate([i])},error:s=>{this.isLoading=!1,this.errMessage=s.error.message&&s.error.message||s.message}}):(this.errMessage="Please enter an ID",void(this.isLoading=!1))}static#e=this.\u0275fac=function(s){return new(s||t)(e.Y36(r.qu),e.Y36(m.N),e.Y36(a.F0),e.Y36(h.I),e.Y36(a.gz))};static#t=this.\u0275cmp=e.Xpm({type:t,selectors:[["app-signin"]],decls:20,vars:10,consts:[[1,"login-container","bg-color"],[1,"pt-6","border-slate-600","base-container"],["routerLink","/"],["src","../../../assets/images/logo2.png","alt","Node Bucket Logo",1,"w-56","pl-6","py-3"],[1,"page-container"],[1,"w-3/4","md:w-1/3","2xl:w-1/4","px-8","md:px-12","py-10","3xl:py-20","pb-8","border","rounded-lg","bg-white","shadow-lg"],[1,"text-3xl","3xl:text-4xl","md:ml-4","pt-3","primary-text","font-semibold"],[1,"my-2"],[1,"md:pt-3","md:px-4","pb-8","bg-white",3,"formGroup","ngSubmit"],[1,"text-medium","2lg:text-xl","font-bold","tracking-wide","pb-2","text-start"],["id","employeeId","formControlName","empId","placeholder","Enter Your ID",1,"block","w-full","p-2","border","border-gray-300","rounded-md","focus:outline-none","focus:shadow","focus:border-blue-200",3,"ngClass"],["class","bg-red-50 text-red-800 p-2 mt-2 rounded","role","alert",4,"ngIf"],["type","submit",1,"mt-3","w-full","font-bold","p-2.5","rounded"],[4,"ngIf"],["role","status","class","",4,"ngIf"],["routerLinkActive","router-link-active",1,"pl-4","font-semibold","secondary-text","hover:underline",3,"routerLink"],["role","alert",1,"bg-red-50","text-red-800","p-2","mt-2","rounded"],["role","status",1,""],["aria-hidden","true","viewBox","0 0 100 101","fill","none","xmlns","http://www.w3.org/2000/svg",1,"w-8","h-8","text-gray-200","animate-spin","dark:text-gray-600","fill-blue-600"],["d","M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z","fill","currentColor"],["d","M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z","fill","currentFill"]],template:function(s,i){1&s&&(e.TgZ(0,"div",0)(1,"div",1)(2,"a",2),e._UZ(3,"img",3),e.qZA()(),e.TgZ(4,"div",4)(5,"div",5)(6,"h2",6),e._uU(7,"Welcome Back!"),e.qZA(),e.TgZ(8,"div",7)(9,"form",8),e.NdJ("ngSubmit",function(){return i.signin(),i.signinForm.reset()}),e.TgZ(10,"h4",9),e._uU(11,"User ID"),e.qZA(),e.TgZ(12,"div"),e._UZ(13,"input",10),e.qZA(),e.YNc(14,f,2,1,"div",11),e.TgZ(15,"button",12),e.YNc(16,C,2,0,"span",13),e.YNc(17,v,4,0,"span",14),e.qZA()(),e.TgZ(18,"a",15),e._uU(19,"Return Home "),e.qZA()()()()()),2&s&&(e.xp6(9),e.Q6J("formGroup",i.signinForm),e.xp6(4),e.Q6J("ngClass",e.WLB(6,y,i.errMessage,i.errMessage)),e.xp6(1),e.Q6J("ngIf",i.errMessage),e.xp6(2),e.Q6J("ngIf",!i.isLoading),e.xp6(1),e.Q6J("ngIf",i.isLoading),e.xp6(1),e.Q6J("routerLink",e.DdM(9,b)))},dependencies:[c.mk,c.O5,a.rH,a.Od,r._Y,r.Fj,r.JJ,r.JL,r.sg,r.u],styles:[".login-container[_ngcontent-%COMP%]{min-height:100vh}.placeholder-err[_ngcontent-%COMP%]::placeholder{color:#991b1b}"]})}return t})(),title:"Nodebucket: Login"}]}];let Z=(()=>{class t{static#e=this.\u0275fac=function(s){return new(s||t)};static#t=this.\u0275mod=e.oAB({type:t});static#s=this.\u0275inj=e.cJS({imports:[a.Bz.forChild(x),a.Bz]})}return t})(),S=(()=>{class t{static#e=this.\u0275fac=function(s){return new(s||t)};static#t=this.\u0275mod=e.oAB({type:t});static#s=this.\u0275inj=e.cJS({imports:[c.ez,Z,r.u5,r.UX,d.JF,a.Bz,d.JF]})}return t})()}}]);