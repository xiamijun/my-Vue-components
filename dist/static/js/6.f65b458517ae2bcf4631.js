webpackJsonp([6],{"/DDO":function(t,e){},GSCy:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a={name:"inputNumber",props:{inputContent:{type:String,default:""},minLength:{type:String,default:"1"},maxLength:{type:String,default:"10"}},data:function(){return{isRed:!1}},watch:{inputContent:{handler:function(){parseInt(this.inputContent.length)>parseInt(this.maxLength)?this.isRed=!0:this.isRed=!1},deep:!0}}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("span",{class:{red:t.isRed}},[t._v(t._s(t.inputContent.length))]),t._v(" "),n("span",[t._v("/")]),t._v(" "),n("span",[t._v(t._s(t.maxLength)+" (请填写"+t._s(t.minLength)+"-"+t._s(t.maxLength)+"字)")])])},staticRenderFns:[]};var r={name:"example",data:function(){return{inputText:"输入框回显长度"}},components:{inputNumber:n("VU/8")(a,i,!1,function(t){n("/DDO")},"data-v-21e2a4f3",null).exports}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.inputText,expression:"inputText"}],attrs:{name:"",id:"",cols:"30",rows:"10"},domProps:{value:t.inputText},on:{input:function(e){e.target.composing||(t.inputText=e.target.value)}}}),t._v(" "),n("inputNumber",{attrs:{inputContent:t.inputText,maxLength:10}})],1)},staticRenderFns:[]};var s=n("VU/8")(r,u,!1,function(t){n("cro2")},"data-v-eae66f76",null);e.default=s.exports},cro2:function(t,e){}});
//# sourceMappingURL=6.f65b458517ae2bcf4631.js.map