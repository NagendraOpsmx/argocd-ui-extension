(()=>{
  "use strict";
  var n={
    56:(n,
    t,
    e)=>{
      n.exports=function(n){
        var t=e.nc;
        t&&n.setAttribute("nonce",
        t)
      }
      
    },
    72:n=>{
      var t=[];
      function e(n){
        for(var e=-1,
        o=0;
        o<t.length;
        o++)if(t[o].identifier===n){
          e=o;
          break
        }
        return e
      }
      function o(n,
      o){
        for(var r={
          
        },
        i=[],
        s=0;
        s<n.length;
        s++){
          var c=n[s],
          l=o.base?c[0]+o.base:c[0],
          f=r[l]||0,
          u="".concat(l,
          " ").concat(f);
          r[l]=f+1;
          var d=e(u),
          p={
            css:c[1],
            media:c[2],
            sourceMap:c[3],
            supports:c[4],
            layer:c[5]
          };
          if(-1!==d)t[d].references++,
          t[d].updater(p);
          else{
            var m=a(p,
            o);
            o.byIndex=s,
            t.splice(s,
            0,
            {
              identifier:u,
              updater:m,
              references:1
            })
          }
          i.push(u)
        }
        return i
      }
      function a(n,
      t){
        var e=t.domAPI(t);
        return e.update(n),
        function(t){
          if(t){
            if(t.css===n.css&&t.media===n.media&&t.sourceMap===n.sourceMap&&t.supports===n.supports&&t.layer===n.layer)return;
            e.update(n=t)
          }
          else e.remove()
        }
        
      }
      n.exports=function(n,
      a){
        var r=o(n=n||[],
        a=a||{
          
        });
        return function(n){
          n=n||[];
          for(var i=0;
          i<r.length;
          i++){
            var s=e(r[i]);
            t[s].references--
          }
          for(var c=o(n,
          a),
          l=0;
          l<r.length;
          l++){
            var f=e(r[l]);
            0===t[f].references&&(t[f].updater(),
            t.splice(f,
            1))
          }
          r=c
        }
        
      }
      
    },
    113:n=>{
      n.exports=function(n,
      t){
        if(t.styleSheet)t.styleSheet.cssText=n;
        else{
          for(;
          t.firstChild;
          )t.removeChild(t.firstChild);
          t.appendChild(document.createTextNode(n))
        }
        
      }
      
    },
    314:n=>{
      n.exports=function(n){
        var t=[];
        return t.toString=function(){
          return this.map(function(t){
            var e="",
            o=void 0!==t[5];
            return t[4]&&(e+="@supports (".concat(t[4],
            ") {")),
            t[2]&&(e+="@media ".concat(t[2],
            " {")),
            o&&(e+="@layer".concat(t[5].length>0?" ".concat(t[5]):"",
            " {")),
            e+=n(t),
            o&&(e+="}"),
            t[2]&&(e+="}"),
            t[4]&&(e+="}"),
            e
          }).join("")
        },
        t.i=function(n,
        e,
        o,
        a,
        r){
          "string"==typeof n&&(n=[[null,
          n,
          void 0]]);
          var i={
            
          };
          if(o)for(var s=0;
          s<this.length;
          s++){
            var c=this[s][0];
            null!=c&&(i[c]=!0)
          }
          for(var l=0;
          l<n.length;
          l++){
            var f=[].concat(n[l]);
            o&&i[f[0]]||(void 0!==r&&(void 0===f[5]||(f[1]="@layer".concat(f[5].length>0?" ".concat(f[5]):"",
            " {").concat(f[1],
            "}")),
            f[5]=r),
            e&&(f[2]?(f[1]="@media ".concat(f[2],
            " {").concat(f[1],
            "}"),
            f[2]=e):f[2]=e),
            a&&(f[4]?(f[1]="@supports (".concat(f[4],
            ") {").concat(f[1],
            "}"),
            f[4]=a):f[4]="".concat(a)),
            t.push(f))
          }
          
        },
        t
      }
      
    },
    489:(n,
    t,
    e)=>{
      e.d(t,
      {
        A:()=>s
      });
      var o=e(601),
      a=e.n(o),
      r=e(314),
      i=e.n(r)()(a());
      i.push([n.id,
      ".ai-chat-container {\n  width: 100%;\n  max-width: 100%;\n  margin: 0;\n  background: #f9fbfc;\n  padding: 30px;\n  font-family: 'Segoe UI', sans-serif;\n  border-radius: 0;\n  box-shadow: none;\n  display: flex;\n  flex-direction: column;\n  height: calc(100vh - 100px); \n}\n\n.ai-chat-title {\n  font-size: 26px;\n  margin-bottom: 20px;\n  color: #003366;\n  font-weight: 600;\n}\n\n.ai-chat-controls {\n  display: flex;\n  gap: 10px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n\n.ai-chat-input,\n.ai-chat-select {\n  flex: 1 1 300px;           \n  padding: 10px;\n  font-size: 14px;\n  border: 1px solid #bbb;\n  border-radius: 6px;\n  box-sizing: border-box;\n  min-width: 200px;\n}\n\n.ai-chat-select {\n  appearance: none;\n  background-color: #fff;\n  padding-right: 30px;\n  cursor: pointer;\n}\n\n\n.ai-chat-select.selected {\n  font-weight: 500;\n  color: #003366;\n}\n\n.ai-chat-loading {\n  font-style: italic;\n  color: #666;\n  margin-bottom: 15px;\n}\n\n.ai-agent-thinking{\n  font-style: italic;\n  color: #666;\n  margin-bottom: 15px;\n  padding-left: 8px; \n}\n.ai-agent-thinking::after {\n  content: '...';\n  animation: dots 1.5s steps(5, end) infinite;\n}\n\n@keyframes dots {\n  0%, 20% {\n    content: '';\n  }\n  40% {\n    content: '.';\n  }\n  60% {\n    content: '..';\n  }\n  80%, 100% {\n    content: '...';\n  }\n}\n.ai-chat-messages {\n  flex: 1;\n  overflow-y: auto;\n  background: #ffffff;\n  border: 1px solid #ddd;\n  padding: 15px;\n  border-radius: 6px;\n  margin-bottom: 10px;\n  scroll-behavior: smooth;\n}\n\n\n.ai-chat-message {\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 12px;\n  padding: 12px 16px;\n  border-radius: 18px;\n  max-width: 70%;\n  line-height: 1.5;\n  word-wrap: break-word;\n  font-size: 14px;\n  position: relative;\n  animation: fadeIn 0.3s ease;\n}\n\n.ai-chat-message.user {\n  background-color: #daf0e5;\n  color: #0f5132;\n  align-self: flex-end;\n  margin-left: auto;\n  border-radius: 18px 18px 4px 18px;\n}\n\n.ai-chat-message.agent {\n  background-color: #f1f3f5;\n  color: #333;\n  align-self: flex-start;\n  margin-right: auto;\n  border-radius: 18px 18px 18px 4px;\n}\n\n\n.ai-chat-footer {\n  display: flex;\n  gap: 10px;\n  padding: 10px;\n  background: #fff;\n  border-top: 1px solid #ccc;\n  position: sticky;\n  bottom: 0;\n  z-index: 10;\n}\n\n.ai-chat-textarea {\n  width: 100%;\n  min-height: 50px;\n  max-height: 200px;\n  padding: 10px;\n  font-size: 14px;\n  resize: none;\n  border: 1px solid #bbb;\n  border-radius: 6px;\n  flex: 1;\n}\n\n.ai-chat-button {\n  background-color: #004085;\n  color: white;\n  border: none;\n  padding: 10px 16px;\n  font-size: 14px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: background 0.3s;\n  white-space: nowrap;\n  height: fit-content;\n}\n\n.ai-chat-button:hover {\n  background-color: #003166;\n}\n\n\n.ai-chat-api-section {\n  margin-top: 20px;\n  background: #f0f4f8;\n  padding: 12px;\n  border-left: 4px solid #007bff;\n  border-radius: 6px;\n}\n\n\n.ai-chat-output {\n  margin-top: 20px;\n  background-color: #f8f9fa;\n  border: 1px solid #ccc;\n  padding: 15px;\n  border-radius: 6px;\n}\n\n.ai-chat-output pre {\n  background: #eef1f4;\n  padding: 12px;\n  border-radius: 4px;\n  max-height: 200px;\n  overflow-y: auto;\n  font-size: 13px;\n  line-height: 1.5;\n}\n\n\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(5px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n\n.ai-chat-message code {\n  background: #e8ecf0;\n  padding: 4px 6px;\n  border-radius: 4px;\n  font-family: monospace;\n  font-size: 13px;\n  display: block;\n  margin-top: 6px;\n  word-break: break-all;\n}\n\n\n.ai-chat-messages::-webkit-scrollbar {\n  width: 8px;\n}\n\n.ai-chat-messages::-webkit-scrollbar-thumb {\n  background-color: #ccc;\n  border-radius: 4px;\n}\n\n.ai-chat-messages::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n.ai-chat-info {\n  background-color: #e9f5ff;\n  color: #004085;\n  padding: 12px 16px;\n  border: 1px solid #b8daff;\n  border-radius: 6px;\n  font-size: 14px;\n  margin-top: 20px;\n}\n",
      ""]);
      const s=i
    },
    540:n=>{
      n.exports=function(n){
        var t=document.createElement("style");
        return n.setAttributes(t,
        n.attributes),
        n.insert(t,
        n.options),
        t
      }
      
    },
    601:n=>{
      n.exports=function(n){
        return n[1]
      }
      
    },
    659:n=>{
      var t={
        
      };
      n.exports=function(n,
      e){
        var o=function(n){
          if(void 0===t[n]){
            var e=document.querySelector(n);
            if(window.HTMLIFrameElement&&e instanceof window.HTMLIFrameElement)try{
              e=e.contentDocument.head
            }
            catch(n){
              e=null
            }
            t[n]=e
          }
          return t[n]
        }
        (n);
        if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
        o.appendChild(e)
      }
      
    },
    750:(n,
    t,
    e)=>{
      e.d(t,
      {
        A:()=>s
      });
      var o=e(601),
      a=e.n(o),
      r=e(314),
      i=e.n(r)()(a());
      i.push([n.id,
      ":root {\n  --toastify-color-light: #fff;\n  --toastify-color-dark: #121212;\n  --toastify-color-info: #3498db;\n  --toastify-color-success: #07bc0c;\n  --toastify-color-warning: #f1c40f;\n  --toastify-color-error: #e74c3c;\n  --toastify-color-transparent: rgba(255, 255, 255, 0.7);\n  --toastify-icon-color-info: var(--toastify-color-info);\n  --toastify-icon-color-success: var(--toastify-color-success);\n  --toastify-icon-color-warning: var(--toastify-color-warning);\n  --toastify-icon-color-error: var(--toastify-color-error);\n  --toastify-toast-width: 320px;\n  --toastify-toast-background: #fff;\n  --toastify-toast-min-height: 64px;\n  --toastify-toast-max-height: 800px;\n  --toastify-font-family: sans-serif;\n  --toastify-z-index: 9999;\n  --toastify-text-color-light: #757575;\n  --toastify-text-color-dark: #fff;\n  --toastify-text-color-info: #fff;\n  --toastify-text-color-success: #fff;\n  --toastify-text-color-warning: #fff;\n  --toastify-text-color-error: #fff;\n  --toastify-spinner-color: #616161;\n  --toastify-spinner-color-empty-area: #e0e0e0;\n  --toastify-color-progress-light: linear-gradient(\n    to right,\n    #4cd964,\n    #5ac8fa,\n    #007aff,\n    #34aadc,\n    #5856d6,\n    #ff2d55\n  );\n  --toastify-color-progress-dark: #bb86fc;\n  --toastify-color-progress-info: var(--toastify-color-info);\n  --toastify-color-progress-success: var(--toastify-color-success);\n  --toastify-color-progress-warning: var(--toastify-color-warning);\n  --toastify-color-progress-error: var(--toastify-color-error);\n}\n\n.Toastify__toast-container {\n  z-index: var(--toastify-z-index);\n  -webkit-transform: translate3d(0, 0, var(--toastify-z-index) px);\n  position: fixed;\n  padding: 4px;\n  width: var(--toastify-toast-width);\n  box-sizing: border-box;\n  color: #fff;\n}\n.Toastify__toast-container--top-left {\n  top: 1em;\n  left: 1em;\n}\n.Toastify__toast-container--top-center {\n  top: 1em;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.Toastify__toast-container--top-right {\n  top: 1em;\n  right: 1em;\n}\n.Toastify__toast-container--bottom-left {\n  bottom: 1em;\n  left: 1em;\n}\n.Toastify__toast-container--bottom-center {\n  bottom: 1em;\n  left: 50%;\n  transform: translateX(-50%);\n}\n.Toastify__toast-container--bottom-right {\n  bottom: 1em;\n  right: 1em;\n}\n\n@media only screen and (max-width : 480px) {\n  .Toastify__toast-container {\n    width: 100vw;\n    padding: 0;\n    left: 0;\n    margin: 0;\n  }\n  .Toastify__toast-container--top-left, .Toastify__toast-container--top-center, .Toastify__toast-container--top-right {\n    top: 0;\n    transform: translateX(0);\n  }\n  .Toastify__toast-container--bottom-left, .Toastify__toast-container--bottom-center, .Toastify__toast-container--bottom-right {\n    bottom: 0;\n    transform: translateX(0);\n  }\n  .Toastify__toast-container--rtl {\n    right: 0;\n    left: initial;\n  }\n}\n.Toastify__toast {\n  position: relative;\n  min-height: var(--toastify-toast-min-height);\n  box-sizing: border-box;\n  margin-bottom: 1rem;\n  padding: 8px;\n  border-radius: 4px;\n  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05);\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  max-height: var(--toastify-toast-max-height);\n  overflow: hidden;\n  font-family: var(--toastify-font-family);\n  cursor: pointer;\n  direction: ltr;\n}\n.Toastify__toast--rtl {\n  direction: rtl;\n}\n.Toastify__toast-body {\n  margin: auto 0;\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n  padding: 6px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n}\n.Toastify__toast-body > div:last-child {\n  -ms-flex: 1;\n      flex: 1;\n}\n.Toastify__toast-icon {\n  -webkit-margin-end: 10px;\n          margin-inline-end: 10px;\n  width: 20px;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.Toastify--animate {\n  animation-fill-mode: both;\n  animation-duration: 0.7s;\n}\n\n.Toastify--animate-icon {\n  animation-fill-mode: both;\n  animation-duration: 0.3s;\n}\n\n@media only screen and (max-width : 480px) {\n  .Toastify__toast {\n    margin-bottom: 0;\n    border-radius: 0;\n  }\n}\n.Toastify__toast-theme--dark {\n  background: var(--toastify-color-dark);\n  color: var(--toastify-text-color-dark);\n}\n.Toastify__toast-theme--light {\n  background: var(--toastify-color-light);\n  color: var(--toastify-text-color-light);\n}\n.Toastify__toast-theme--colored.Toastify__toast--default {\n  background: var(--toastify-color-light);\n  color: var(--toastify-text-color-light);\n}\n.Toastify__toast-theme--colored.Toastify__toast--info {\n  color: var(--toastify-text-color-info);\n  background: var(--toastify-color-info);\n}\n.Toastify__toast-theme--colored.Toastify__toast--success {\n  color: var(--toastify-text-color-success);\n  background: var(--toastify-color-success);\n}\n.Toastify__toast-theme--colored.Toastify__toast--warning {\n  color: var(--toastify-text-color-warning);\n  background: var(--toastify-color-warning);\n}\n.Toastify__toast-theme--colored.Toastify__toast--error {\n  color: var(--toastify-text-color-error);\n  background: var(--toastify-color-error);\n}\n\n.Toastify__progress-bar-theme--light {\n  background: var(--toastify-color-progress-light);\n}\n.Toastify__progress-bar-theme--dark {\n  background: var(--toastify-color-progress-dark);\n}\n.Toastify__progress-bar--info {\n  background: var(--toastify-color-progress-info);\n}\n.Toastify__progress-bar--success {\n  background: var(--toastify-color-progress-success);\n}\n.Toastify__progress-bar--warning {\n  background: var(--toastify-color-progress-warning);\n}\n.Toastify__progress-bar--error {\n  background: var(--toastify-color-progress-error);\n}\n.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--success, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning, .Toastify__progress-bar-theme--colored.Toastify__progress-bar--error {\n  background: var(--toastify-color-transparent);\n}\n\n.Toastify__close-button {\n  color: #fff;\n  background: transparent;\n  outline: none;\n  border: none;\n  padding: 0;\n  cursor: pointer;\n  opacity: 0.7;\n  transition: 0.3s ease;\n  -ms-flex-item-align: start;\n      align-self: flex-start;\n}\n.Toastify__close-button--light {\n  color: #000;\n  opacity: 0.3;\n}\n.Toastify__close-button > svg {\n  fill: currentColor;\n  height: 16px;\n  width: 14px;\n}\n.Toastify__close-button:hover, .Toastify__close-button:focus {\n  opacity: 1;\n}\n\n@keyframes Toastify__trackProgress {\n  0% {\n    transform: scaleX(1);\n  }\n  100% {\n    transform: scaleX(0);\n  }\n}\n.Toastify__progress-bar {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 5px;\n  z-index: var(--toastify-z-index);\n  opacity: 0.7;\n  transform-origin: left;\n}\n.Toastify__progress-bar--animated {\n  animation: Toastify__trackProgress linear 1 forwards;\n}\n.Toastify__progress-bar--controlled {\n  transition: transform 0.2s;\n}\n.Toastify__progress-bar--rtl {\n  right: 0;\n  left: initial;\n  transform-origin: right;\n}\n\n.Toastify__spinner {\n  width: 20px;\n  height: 20px;\n  box-sizing: border-box;\n  border: 2px solid;\n  border-radius: 100%;\n  border-color: var(--toastify-spinner-color-empty-area);\n  border-right-color: var(--toastify-spinner-color);\n  animation: Toastify__spin 0.65s linear infinite;\n}\n\n@keyframes Toastify__bounceInRight {\n  from, 60%, 75%, 90%, to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  from {\n    opacity: 0;\n    transform: translate3d(3000px, 0, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(-25px, 0, 0);\n  }\n  75% {\n    transform: translate3d(10px, 0, 0);\n  }\n  90% {\n    transform: translate3d(-5px, 0, 0);\n  }\n  to {\n    transform: none;\n  }\n}\n@keyframes Toastify__bounceOutRight {\n  20% {\n    opacity: 1;\n    transform: translate3d(-20px, 0, 0);\n  }\n  to {\n    opacity: 0;\n    transform: translate3d(2000px, 0, 0);\n  }\n}\n@keyframes Toastify__bounceInLeft {\n  from, 60%, 75%, 90%, to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  0% {\n    opacity: 0;\n    transform: translate3d(-3000px, 0, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(25px, 0, 0);\n  }\n  75% {\n    transform: translate3d(-10px, 0, 0);\n  }\n  90% {\n    transform: translate3d(5px, 0, 0);\n  }\n  to {\n    transform: none;\n  }\n}\n@keyframes Toastify__bounceOutLeft {\n  20% {\n    opacity: 1;\n    transform: translate3d(20px, 0, 0);\n  }\n  to {\n    opacity: 0;\n    transform: translate3d(-2000px, 0, 0);\n  }\n}\n@keyframes Toastify__bounceInUp {\n  from, 60%, 75%, 90%, to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  from {\n    opacity: 0;\n    transform: translate3d(0, 3000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0);\n  }\n  75% {\n    transform: translate3d(0, 10px, 0);\n  }\n  90% {\n    transform: translate3d(0, -5px, 0);\n  }\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes Toastify__bounceOutUp {\n  20% {\n    transform: translate3d(0, -10px, 0);\n  }\n  40%, 45% {\n    opacity: 1;\n    transform: translate3d(0, 20px, 0);\n  }\n  to {\n    opacity: 0;\n    transform: translate3d(0, -2000px, 0);\n  }\n}\n@keyframes Toastify__bounceInDown {\n  from, 60%, 75%, 90%, to {\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n  }\n  0% {\n    opacity: 0;\n    transform: translate3d(0, -3000px, 0);\n  }\n  60% {\n    opacity: 1;\n    transform: translate3d(0, 25px, 0);\n  }\n  75% {\n    transform: translate3d(0, -10px, 0);\n  }\n  90% {\n    transform: translate3d(0, 5px, 0);\n  }\n  to {\n    transform: none;\n  }\n}\n@keyframes Toastify__bounceOutDown {\n  20% {\n    transform: translate3d(0, 10px, 0);\n  }\n  40%, 45% {\n    opacity: 1;\n    transform: translate3d(0, -20px, 0);\n  }\n  to {\n    opacity: 0;\n    transform: translate3d(0, 2000px, 0);\n  }\n}\n.Toastify__bounce-enter--top-left, .Toastify__bounce-enter--bottom-left {\n  animation-name: Toastify__bounceInLeft;\n}\n.Toastify__bounce-enter--top-right, .Toastify__bounce-enter--bottom-right {\n  animation-name: Toastify__bounceInRight;\n}\n.Toastify__bounce-enter--top-center {\n  animation-name: Toastify__bounceInDown;\n}\n.Toastify__bounce-enter--bottom-center {\n  animation-name: Toastify__bounceInUp;\n}\n\n.Toastify__bounce-exit--top-left, .Toastify__bounce-exit--bottom-left {\n  animation-name: Toastify__bounceOutLeft;\n}\n.Toastify__bounce-exit--top-right, .Toastify__bounce-exit--bottom-right {\n  animation-name: Toastify__bounceOutRight;\n}\n.Toastify__bounce-exit--top-center {\n  animation-name: Toastify__bounceOutUp;\n}\n.Toastify__bounce-exit--bottom-center {\n  animation-name: Toastify__bounceOutDown;\n}\n\n@keyframes Toastify__zoomIn {\n  from {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n  50% {\n    opacity: 1;\n  }\n}\n@keyframes Toastify__zoomOut {\n  from {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0;\n    transform: scale3d(0.3, 0.3, 0.3);\n  }\n  to {\n    opacity: 0;\n  }\n}\n.Toastify__zoom-enter {\n  animation-name: Toastify__zoomIn;\n}\n\n.Toastify__zoom-exit {\n  animation-name: Toastify__zoomOut;\n}\n\n@keyframes Toastify__flipIn {\n  from {\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    animation-timing-function: ease-in;\n    opacity: 0;\n  }\n  40% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    animation-timing-function: ease-in;\n  }\n  60% {\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1;\n  }\n  80% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n  }\n  to {\n    transform: perspective(400px);\n  }\n}\n@keyframes Toastify__flipOut {\n  from {\n    transform: perspective(400px);\n  }\n  30% {\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1;\n  }\n  to {\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0;\n  }\n}\n.Toastify__flip-enter {\n  animation-name: Toastify__flipIn;\n}\n\n.Toastify__flip-exit {\n  animation-name: Toastify__flipOut;\n}\n\n@keyframes Toastify__slideInRight {\n  from {\n    transform: translate3d(110%, 0, 0);\n    visibility: visible;\n  }\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes Toastify__slideInLeft {\n  from {\n    transform: translate3d(-110%, 0, 0);\n    visibility: visible;\n  }\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes Toastify__slideInUp {\n  from {\n    transform: translate3d(0, 110%, 0);\n    visibility: visible;\n  }\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes Toastify__slideInDown {\n  from {\n    transform: translate3d(0, -110%, 0);\n    visibility: visible;\n  }\n  to {\n    transform: translate3d(0, 0, 0);\n  }\n}\n@keyframes Toastify__slideOutRight {\n  from {\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    visibility: hidden;\n    transform: translate3d(110%, 0, 0);\n  }\n}\n@keyframes Toastify__slideOutLeft {\n  from {\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    visibility: hidden;\n    transform: translate3d(-110%, 0, 0);\n  }\n}\n@keyframes Toastify__slideOutDown {\n  from {\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    visibility: hidden;\n    transform: translate3d(0, 500px, 0);\n  }\n}\n@keyframes Toastify__slideOutUp {\n  from {\n    transform: translate3d(0, 0, 0);\n  }\n  to {\n    visibility: hidden;\n    transform: translate3d(0, -500px, 0);\n  }\n}\n.Toastify__slide-enter--top-left, .Toastify__slide-enter--bottom-left {\n  animation-name: Toastify__slideInLeft;\n}\n.Toastify__slide-enter--top-right, .Toastify__slide-enter--bottom-right {\n  animation-name: Toastify__slideInRight;\n}\n.Toastify__slide-enter--top-center {\n  animation-name: Toastify__slideInDown;\n}\n.Toastify__slide-enter--bottom-center {\n  animation-name: Toastify__slideInUp;\n}\n\n.Toastify__slide-exit--top-left, .Toastify__slide-exit--bottom-left {\n  animation-name: Toastify__slideOutLeft;\n}\n.Toastify__slide-exit--top-right, .Toastify__slide-exit--bottom-right {\n  animation-name: Toastify__slideOutRight;\n}\n.Toastify__slide-exit--top-center {\n  animation-name: Toastify__slideOutUp;\n}\n.Toastify__slide-exit--bottom-center {\n  animation-name: Toastify__slideOutDown;\n}\n\n@keyframes Toastify__spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}",
      ""]);
      const s=i
    },
    825:n=>{
      n.exports=function(n){
        if("undefined"==typeof document)return{
          update:function(){
            
          },
          remove:function(){
            
          }
          
        };
        var t=n.insertStyleElement(n);
        return{
          update:function(e){
            !function(n,
            t,
            e){
              var o="";
              e.supports&&(o+="@supports (".concat(e.supports,
              ") {")),
              e.media&&(o+="@media ".concat(e.media,
              " {"));
              var a=void 0!==e.layer;
              a&&(o+="@layer".concat(e.layer.length>0?" ".concat(e.layer):"",
              " {")),
              o+=e.css,
              a&&(o+="}"),
              e.media&&(o+="}"),
              e.supports&&(o+="}");
              var r=e.sourceMap;
              r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))),
              " */")),
              t.styleTagTransform(o,
              n,
              t.options)
            }
            (t,
            n,
            e)
          },
          remove:function(){
            !function(n){
              if(null===n.parentNode)return!1;
              n.parentNode.removeChild(n)
            }
            (t)
          }
          
        }
        
      }
      
    }
    
  },
  t={
    
  };
  function e(o){
    var a=t[o];
    if(void 0!==a)return a.exports;
    var r=t[o]={
      id:o,
      exports:{
        
      }
      
    };
    return n[o](r,
    r.exports,
    e),
    r.exports
  }
  e.n=n=>{
    var t=n&&n.__esModule?()=>n.default:()=>n;
    return e.d(t,
    {
      a:t
    }),
    t
  },
  e.d=(n,
  t)=>{
    for(var o in t)e.o(t,
    o)&&!e.o(n,
    o)&&Object.defineProperty(n,
    o,
    {
      enumerable:!0,
      get:t[o]
    })
  },
  e.o=(n,
  t)=>Object.prototype.hasOwnProperty.call(n,
  t),
  e.nc=void 0;
  const o=React;
  var a=e.n(o),
  r=e(72),
  i=e.n(r),
  s=e(825),
  c=e.n(s),
  l=e(659),
  f=e.n(l),
  u=e(56),
  d=e.n(u),
  p=e(540),
  m=e.n(p),
  y=e(113),
  g=e.n(y),
  h=e(489),
  b={
    
  };
  function v(n){
    var t,
    e,
    o="";
    if("string"==typeof n||"number"==typeof n)o+=n;
    else if("object"==typeof n)if(Array.isArray(n))for(t=0;
    t<n.length;
    t++)n[t]&&(e=v(n[t]))&&(o&&(o+=" "),
    o+=e);
    else for(t in n)n[t]&&(o&&(o+=" "),
    o+=t);
    return o
  }
  b.styleTagTransform=g(),
  b.setAttributes=d(),
  b.insert=f().bind(null,
  "head"),
  b.domAPI=c(),
  b.insertStyleElement=m(),
  i()(h.A,
  b),
  h.A&&h.A.locals&&h.A.locals;
  const _=function(){
    for(var n,
    t,
    e=0,
    o="";
    e<arguments.length;
    )(n=arguments[e++])&&(t=v(n))&&(o&&(o+=" "),
    o+=t);
    return o
  },
  x=ReactDOM;
  function T(){
    return T=Object.assign||function(n){
      for(var t=1;
      t<arguments.length;
      t++){
        var e=arguments[t];
        for(var o in e)Object.prototype.hasOwnProperty.call(e,
        o)&&(n[o]=e[o])
      }
      return n
    },
    T.apply(this,
    arguments)
  }
  function E(n,
  t){
    if(null==n)return{
      
    };
    var e,
    o,
    a={
      
    },
    r=Object.keys(n);
    for(o=0;
    o<r.length;
    o++)e=r[o],
    t.indexOf(e)>=0||(a[e]=n[e]);
    return a
  }
  function O(n){
    return"number"==typeof n&&!isNaN(n)
  }
  function w(n){
    return"boolean"==typeof n
  }
  function k(n){
    return"string"==typeof n
  }
  function I(n){
    return"function"==typeof n
  }
  function R(n){
    return k(n)||I(n)?n:null
  }
  function A(n){
    return 0===n||n
  }
  var C=!("undefined"==typeof window||!window.document||!window.document.createElement);
  function S(n){
    return(0,
    o.isValidElement)(n)||k(n)||I(n)||O(n)
  }
  var N={
    TOP_LEFT:"top-left",
    TOP_RIGHT:"top-right",
    TOP_CENTER:"top-center",
    BOTTOM_LEFT:"bottom-left",
    BOTTOM_RIGHT:"bottom-right",
    BOTTOM_CENTER:"bottom-center"
  },
  L={
    INFO:"info",
    SUCCESS:"success",
    WARNING:"warning",
    ERROR:"error",
    DEFAULT:"default"
  };
  function P(n){
    var t=n.enter,
    e=n.exit,
    r=n.appendPosition,
    i=void 0!==r&&r,
    s=n.collapse,
    c=void 0===s||s,
    l=n.collapseDuration,
    f=void 0===l?300:l;
    return function(n){
      var r=n.children,
      s=n.position,
      l=n.preventExitTransition,
      u=n.done,
      d=n.nodeRef,
      p=n.isIn,
      m=i?t+"--"+s:t,
      y=i?e+"--"+s:e,
      g=(0,
      o.useRef)(),
      h=(0,
      o.useRef)(0);
      function b(n){
        if(n.target===d.current){
          var t=d.current;
          t.dispatchEvent(new Event("d")),
          t.removeEventListener("animationend",
          b),
          t.removeEventListener("animationcancel",
          b),
          0===h.current&&(t.className=g.current)
        }
        
      }
      function v(){
        var n=d.current;
        n.removeEventListener("animationend",
        v),
        c?function(n,
        t,
        e){
          void 0===e&&(e=300);
          var o=n.scrollHeight,
          a=n.style;
          requestAnimationFrame(function(){
            a.minHeight="initial",
            a.height=o+"px",
            a.transition="all "+e+"ms",
            requestAnimationFrame(function(){
              a.height="0",
              a.padding="0",
              a.margin="0",
              setTimeout(t,
              e)
            })
          })
        }
        (n,
        u,
        f):u()
      }
      return(0,
      o.useLayoutEffect)(function(){
        var n;
        n=d.current,
        g.current=n.className,
        n.className+=" "+m,
        n.addEventListener("animationend",
        b),
        n.addEventListener("animationcancel",
        b)
      },
      []),
      (0,
      o.useEffect)(function(){
        p||(l?v():function(){
          h.current=1;
          var n=d.current;
          n.className+=" "+y,
          n.addEventListener("animationend",
          v)
        }
        ())
      },
      [p]),
      a().createElement(a().Fragment,
      null,
      r)
    }
    
  }
  var j={
    list:new Map,
    emitQueue:new Map,
    on:function(n,
    t){
      return this.list.has(n)||this.list.set(n,
      []),
      this.list.get(n).push(t),
      this
    },
    off:function(n,
    t){
      if(t){
        var e=this.list.get(n).filter(function(n){
          return n!==t
        });
        return this.list.set(n,
        e),
        this
      }
      return this.list.delete(n),
      this
    },
    cancelEmit:function(n){
      var t=this.emitQueue.get(n);
      return t&&(t.forEach(clearTimeout),
      this.emitQueue.delete(n)),
      this
    },
    emit:function(n){
      for(var t=this,
      e=arguments.length,
      o=new Array(e>1?e-1:0),
      a=1;
      a<e;
      a++)o[a-1]=arguments[a];
      this.list.has(n)&&this.list.get(n).forEach(function(e){
        var a=setTimeout(function(){
          e.apply(void 0,
          o)
        },
        0);
        t.emitQueue.has(n)||t.emitQueue.set(n,
        []),
        t.emitQueue.get(n).push(a)
      })
    }
    
  },
  D=["delay",
  "staleId"];
  function z(n){
    return n.targetTouches&&n.targetTouches.length>=1?n.targetTouches[0].clientX:n.clientX
  }
  function M(n){
    return n.targetTouches&&n.targetTouches.length>=1?n.targetTouches[0].clientY:n.clientY
  }
  function B(n){
    var t=n.closeToast,
    e=n.theme,
    a=n.ariaLabel,
    r=void 0===a?"close":a;
    return(0,
    o.createElement)("button",
    {
      className:"Toastify__close-button Toastify__close-button--"+e,
      type:"button",
      onClick:function(n){
        n.stopPropagation(),
        t(n)
      },
      "aria-label":r
    },
    (0,
    o.createElement)("svg",
    {
      "aria-hidden":"true",
      viewBox:"0 0 14 16"
    },
    (0,
    o.createElement)("path",
    {
      fillRule:"evenodd",
      d:"M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
    })))
  }
  function F(n){
    var t,
    e,
    a=n.delay,
    r=n.isRunning,
    i=n.closeToast,
    s=n.type,
    c=n.hide,
    l=n.className,
    f=n.style,
    u=n.controlledProgress,
    d=n.progress,
    p=n.rtl,
    m=n.isIn,
    y=n.theme,
    g=T({
      
    },
    f,
    {
      animationDuration:a+"ms",
      animationPlayState:r?"running":"paused",
      opacity:c?0:1
    });
    u&&(g.transform="scaleX("+d+")");
    var h=_("Toastify__progress-bar",
    u?"Toastify__progress-bar--controlled":"Toastify__progress-bar--animated",
    "Toastify__progress-bar-theme--"+y,
    "Toastify__progress-bar--"+s,
    ((t={
      
    })["Toastify__progress-bar--rtl"]=p,
    t)),
    b=I(l)?l({
      rtl:p,
      type:s,
      defaultClassName:h
    }):_(h,
    l),
    v=((e={
      
    })[u&&d>=1?"onTransitionEnd":"onAnimationEnd"]=u&&d<1?null:function(){
      m&&i()
    },
    e);
    return(0,
    o.createElement)("div",
    Object.assign({
      role:"progressbar",
      "aria-hidden":c?"true":"false",
      "aria-label":"notification timer",
      className:b,
      style:g
    },
    v))
  }
  F.defaultProps={
    type:L.DEFAULT,
    hide:!1
  };
  var U=["theme",
  "type"],
  H=function(n){
    var t=n.theme,
    e=n.type,
    a=E(n,
    U);
    return(0,
    o.createElement)("svg",
    Object.assign({
      viewBox:"0 0 24 24",
      width:"100%",
      height:"100%",
      fill:"colored"===t?"currentColor":"var(--toastify-icon-color-"+e+")"
    },
    a))
  },
  q={
    info:function(n){
      return(0,
      o.createElement)(H,
      Object.assign({
        
      },
      n),
      (0,
      o.createElement)("path",
      {
        d:"M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z"
      }))
    },
    warning:function(n){
      return(0,
      o.createElement)(H,
      Object.assign({
        
      },
      n),
      (0,
      o.createElement)("path",
      {
        d:"M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z"
      }))
    },
    success:function(n){
      return(0,
      o.createElement)(H,
      Object.assign({
        
      },
      n),
      (0,
      o.createElement)("path",
      {
        d:"M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"
      }))
    },
    error:function(n){
      return(0,
      o.createElement)(H,
      Object.assign({
        
      },
      n),
      (0,
      o.createElement)("path",
      {
        d:"M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"
      }))
    },
    spinner:function(){
      return(0,
      o.createElement)("div",
      {
        className:"Toastify__spinner"
      })
    }
    
  },
  X=function(n){
    var t,
    e,
    a=function(n){
      var t=(0,
      o.useState)(!1),
      e=t[0],
      a=t[1],
      r=(0,
      o.useState)(!1),
      i=r[0],
      s=r[1],
      c=(0,
      o.useRef)(null),
      l=(0,
      o.useRef)({
        start:0,
        x:0,
        y:0,
        delta:0,
        removalDistance:0,
        canCloseOnClick:!0,
        canDrag:!1,
        boundingRect:null,
        didMove:!1
      }).current,
      f=(0,
      o.useRef)(n),
      u=n.autoClose,
      d=n.pauseOnHover,
      p=n.closeToast,
      m=n.onClick,
      y=n.closeOnClick;
      function g(t){
        if(n.draggable){
          l.didMove=!1,
          document.addEventListener("mousemove",
          _),
          document.addEventListener("mouseup",
          x),
          document.addEventListener("touchmove",
          _),
          document.addEventListener("touchend",
          x);
          var e=c.current;
          l.canCloseOnClick=!0,
          l.canDrag=!0,
          l.boundingRect=e.getBoundingClientRect(),
          e.style.transition="",
          l.x=z(t.nativeEvent),
          l.y=M(t.nativeEvent),
          "x"===n.draggableDirection?(l.start=l.x,
          l.removalDistance=e.offsetWidth*(n.draggablePercent/100)):(l.start=l.y,
          l.removalDistance=e.offsetHeight*(80===n.draggablePercent?1.5*n.draggablePercent:n.draggablePercent/100))
        }
        
      }
      function h(){
        if(l.boundingRect){
          var t=l.boundingRect,
          e=t.top,
          o=t.bottom,
          a=t.left,
          r=t.right;
          n.pauseOnHover&&l.x>=a&&l.x<=r&&l.y>=e&&l.y<=o?v():b()
        }
        
      }
      function b(){
        a(!0)
      }
      function v(){
        a(!1)
      }
      function _(t){
        var o=c.current;
        l.canDrag&&o&&(l.didMove=!0,
        e&&v(),
        l.x=z(t),
        l.y=M(t),
        "x"===n.draggableDirection?l.delta=l.x-l.start:l.delta=l.y-l.start,
        l.start!==l.x&&(l.canCloseOnClick=!1),
        o.style.transform="translate"+n.draggableDirection+"("+l.delta+"px)",
        o.style.opacity=""+(1-Math.abs(l.delta/l.removalDistance)))
      }
      function x(){
        document.removeEventListener("mousemove",
        _),
        document.removeEventListener("mouseup",
        x),
        document.removeEventListener("touchmove",
        _),
        document.removeEventListener("touchend",
        x);
        var t=c.current;
        if(l.canDrag&&l.didMove&&t){
          if(l.canDrag=!1,
          Math.abs(l.delta)>l.removalDistance)return s(!0),
          void n.closeToast();
          t.style.transition="transform 0.2s, opacity 0.2s",
          t.style.transform="translate"+n.draggableDirection+"(0)",
          t.style.opacity="1"
        }
        
      }
      (0,
      o.useEffect)(function(){
        f.current=n
      }),
      (0,
      o.useEffect)(function(){
        return c.current&&c.current.addEventListener("d",
        b,
        {
          once:!0
        }),
        I(n.onOpen)&&n.onOpen((0,
        o.isValidElement)(n.children)&&n.children.props),
        function(){
          var n=f.current;
          I(n.onClose)&&n.onClose((0,
          o.isValidElement)(n.children)&&n.children.props)
        }
        
      },
      []),
      (0,
      o.useEffect)(function(){
        return n.pauseOnFocusLoss&&(document.hasFocus()||v(),
        window.addEventListener("focus",
        b),
        window.addEventListener("blur",
        v)),
        function(){
          n.pauseOnFocusLoss&&(window.removeEventListener("focus",
          b),
          window.removeEventListener("blur",
          v))
        }
        
      },
      [n.pauseOnFocusLoss]);
      var T={
        onMouseDown:g,
        onTouchStart:g,
        onMouseUp:h,
        onTouchEnd:h
      };
      return u&&d&&(T.onMouseEnter=v,
      T.onMouseLeave=b),
      y&&(T.onClick=function(n){
        m&&m(n),
        l.canCloseOnClick&&p()
      }),
      {
        playToast:b,
        pauseToast:v,
        isRunning:e,
        preventExitTransition:i,
        toastRef:c,
        eventHandlers:T
      }
      
    }
    (n),
    r=a.isRunning,
    i=a.preventExitTransition,
    s=a.toastRef,
    c=a.eventHandlers,
    l=n.closeButton,
    f=n.children,
    u=n.autoClose,
    d=n.onClick,
    p=n.type,
    m=n.hideProgressBar,
    y=n.closeToast,
    g=n.transition,
    h=n.position,
    b=n.className,
    v=n.style,
    x=n.bodyClassName,
    T=n.bodyStyle,
    E=n.progressClassName,
    O=n.progressStyle,
    w=n.updateId,
    R=n.role,
    A=n.progress,
    C=n.rtl,
    S=n.toastId,
    N=n.deleteToast,
    L=n.isIn,
    P=n.isLoading,
    j=n.icon,
    D=n.theme,
    B=_("Toastify__toast",
    "Toastify__toast-theme--"+D,
    "Toastify__toast--"+p,
    ((t={
      
    })["Toastify__toast--rtl"]=C,
    t)),
    U=I(b)?b({
      rtl:C,
      position:h,
      type:p,
      defaultClassName:B
    }):_(B,
    b),
    H=!!A,
    X=q[p],
    Y={
      theme:D,
      type:p
    },
    J=X&&X(Y);
    return!1===j?J=void 0:I(j)?J=j(Y):(0,
    o.isValidElement)(j)?J=(0,
    o.cloneElement)(j,
    Y):k(j)?J=j:P&&(J=q.spinner()),
    (0,
    o.createElement)(g,
    {
      isIn:L,
      done:N,
      position:h,
      preventExitTransition:i,
      nodeRef:s
    },
    (0,
    o.createElement)("div",
    Object.assign({
      id:S,
      onClick:d,
      className:U
    },
    c,
    {
      style:v,
      ref:s
    }),
    (0,
    o.createElement)("div",
    Object.assign({
      
    },
    L&&{
      role:R
    },
    {
      className:I(x)?x({
        type:p
      }):_("Toastify__toast-body",
      x),
      style:T
    }),
    J&&(0,
    o.createElement)("div",
    {
      className:_("Toastify__toast-icon",
      (e={
        
      },
      e["Toastify--animate-icon Toastify__zoom-enter"]=!P,
      e))
    },
    J),
    (0,
    o.createElement)("div",
    null,
    f)),
    function(n){
      if(n){
        var t={
          closeToast:y,
          type:p,
          theme:D
        };
        return I(n)?n(t):(0,
        o.isValidElement)(n)?(0,
        o.cloneElement)(n,
        t):void 0
      }
      
    }
    (l),
    (u||H)&&(0,
    o.createElement)(F,
    Object.assign({
      
    },
    w&&!H?{
      key:"pb-"+w
    }
    :{
      
    },
    {
      rtl:C,
      theme:D,
      delay:u,
      isRunning:r,
      isIn:L,
      closeToast:y,
      hide:m,
      type:p,
      style:O,
      className:E,
      controlledProgress:H,
      progress:A
    }))))
  },
  Y=function(n){
    var t=function(n){
      var t=(0,
      o.useReducer)(function(n){
        return n+1
      },
      0)[1],
      e=(0,
      o.useState)([]),
      a=e[0],
      r=e[1],
      i=(0,
      o.useRef)(null),
      s=(0,
      o.useRef)(new Map).current,
      c=function(n){
        return-1!==a.indexOf(n)
      },
      l=(0,
      o.useRef)({
        toastKey:1,
        displayedToast:0,
        count:0,
        queue:[],
        props:n,
        containerId:null,
        isToastActive:c,
        getToast:function(n){
          return s.get(n)
        }
        
      }).current;
      function f(n){
        var t=n.containerId;
        !l.props.limit||t&&l.containerId!==t||(l.count-=l.queue.length,
        l.queue=[])
      }
      function u(n){
        r(function(t){
          return A(n)?t.filter(function(t){
            return t!==n
          }):[]
        })
      }
      function d(){
        var n=l.queue.shift();
        m(n.toastContent,
        n.toastProps,
        n.staleId)
      }
      function p(n,
      e){
        var a=e.delay,
        r=e.staleId,
        c=E(e,
        D);
        if(S(n)&&!function(n){
          return!i.current||l.props.enableMultiContainer&&n.containerId!==l.props.containerId||s.has(n.toastId)&&null==n.updateId
        }
        (c)){
          var f=c.toastId,
          p=c.updateId,
          y=c.data,
          g=l.props,
          h=function(){
            return u(f)
          },
          b=null==p;
          b&&l.count++;
          var v,
          _,
          x={
            toastId:f,
            updateId:p,
            isLoading:c.isLoading,
            theme:c.theme||g.theme,
            icon:null!=c.icon?c.icon:g.icon,
            isIn:!1,
            key:c.key||l.toastKey++,
            type:c.type,
            closeToast:h,
            closeButton:c.closeButton,
            rtl:g.rtl,
            position:c.position||g.position,
            transition:c.transition||g.transition,
            className:R(c.className||g.toastClassName),
            bodyClassName:R(c.bodyClassName||g.bodyClassName),
            style:c.style||g.toastStyle,
            bodyStyle:c.bodyStyle||g.bodyStyle,
            onClick:c.onClick||g.onClick,
            pauseOnHover:w(c.pauseOnHover)?c.pauseOnHover:g.pauseOnHover,
            pauseOnFocusLoss:w(c.pauseOnFocusLoss)?c.pauseOnFocusLoss:g.pauseOnFocusLoss,
            draggable:w(c.draggable)?c.draggable:g.draggable,
            draggablePercent:c.draggablePercent||g.draggablePercent,
            draggableDirection:c.draggableDirection||g.draggableDirection,
            closeOnClick:w(c.closeOnClick)?c.closeOnClick:g.closeOnClick,
            progressClassName:R(c.progressClassName||g.progressClassName),
            progressStyle:c.progressStyle||g.progressStyle,
            autoClose:!c.isLoading&&(v=c.autoClose,
            _=g.autoClose,
            !1===v||O(v)&&v>0?v:_),
            hideProgressBar:w(c.hideProgressBar)?c.hideProgressBar:g.hideProgressBar,
            progress:c.progress,
            role:c.role||g.role,
            deleteToast:function(){
              s.delete(f);
              var n=l.queue.length;
              if(l.count=A(f)?l.count-1:l.count-l.displayedToast,
              l.count<0&&(l.count=0),
              n>0){
                var e=A(f)?1:l.props.limit;
                if(1===n||1===e)l.displayedToast++,
                d();
                else{
                  var o=e>n?n:e;
                  l.displayedToast=o;
                  for(var a=0;
                  a<o;
                  a++)d()
                }
                
              }
              else t()
            }
            
          };
          I(c.onOpen)&&(x.onOpen=c.onOpen),
          I(c.onClose)&&(x.onClose=c.onClose),
          x.closeButton=g.closeButton,
          !1===c.closeButton||S(c.closeButton)?x.closeButton=c.closeButton:!0===c.closeButton&&(x.closeButton=!S(g.closeButton)||g.closeButton);
          var T=n;
          (0,
          o.isValidElement)(n)&&!k(n.type)?T=(0,
          o.cloneElement)(n,
          {
            closeToast:h,
            toastProps:x,
            data:y
          }):I(n)&&(T=n({
            closeToast:h,
            toastProps:x,
            data:y
          })),
          g.limit&&g.limit>0&&l.count>g.limit&&b?l.queue.push({
            toastContent:T,
            toastProps:x,
            staleId:r
          }):O(a)&&a>0?setTimeout(function(){
            m(T,
            x,
            r)
          },
          a):m(T,
          x,
          r)
        }
        
      }
      function m(n,
      t,
      e){
        var o=t.toastId;
        e&&s.delete(e),
        s.set(o,
        {
          content:n,
          props:t
        }),
        r(function(n){
          return[].concat(n,
          [o]).filter(function(n){
            return n!==e
          })
        })
      }
      return(0,
      o.useEffect)(function(){
        return l.containerId=n.containerId,
        j.cancelEmit(3).on(0,
        p).on(1,
        function(n){
          return i.current&&u(n)
        }).on(5,
        f).emit(2,
        l),
        function(){
          return j.emit(3,
          l)
        }
        
      },
      []),
      (0,
      o.useEffect)(function(){
        l.isToastActive=c,
        l.displayedToast=a.length,
        j.emit(4,
        a.length,
        n.containerId)
      },
      [a]),
      (0,
      o.useEffect)(function(){
        l.props=n
      }),
      {
        getToastToRender:function(t){
          var e=new Map,
          o=Array.from(s.values());
          return n.newestOnTop&&o.reverse(),
          o.forEach(function(n){
            var t=n.props.position;
            e.has(t)||e.set(t,
            []),
            e.get(t).push(n)
          }),
          Array.from(e,
          function(n){
            return t(n[0],
            n[1])
          })
        },
        containerRef:i,
        isToastActive:c
      }
      
    }
    (n),
    e=t.getToastToRender,
    a=t.containerRef,
    r=t.isToastActive,
    i=n.className,
    s=n.style,
    c=n.rtl,
    l=n.containerId;
    function f(n){
      var t,
      e=_("Toastify__toast-container",
      "Toastify__toast-container--"+n,
      ((t={
        
      })["Toastify__toast-container--rtl"]=c,
      t));
      return I(i)?i({
        position:n,
        rtl:c,
        defaultClassName:e
      }):_(e,
      R(i))
    }
    return(0,
    o.createElement)("div",
    {
      ref:a,
      className:"Toastify",
      id:l
    },
    e(function(n,
    t){
      var e=t.length?T({
        
      },
      s):T({
        
      },
      s,
      {
        pointerEvents:"none"
      });
      return(0,
      o.createElement)("div",
      {
        className:f(n),
        style:e,
        key:"container-"+n
      },
      t.map(function(n){
        var t=n.content,
        e=n.props;
        return(0,
        o.createElement)(X,
        Object.assign({
          
        },
        e,
        {
          isIn:r(e.toastId),
          key:"toast-"+e.key,
          closeButton:!0===e.closeButton?B:e.closeButton
        }),
        t)
      }))
    }))
  };
  Y.defaultProps={
    position:N.TOP_RIGHT,
    transition:P({
      enter:"Toastify--animate Toastify__bounce-enter",
      exit:"Toastify--animate Toastify__bounce-exit",
      appendPosition:!0
    }),
    rtl:!1,
    autoClose:5e3,
    hideProgressBar:!1,
    closeButton:B,
    pauseOnHover:!0,
    pauseOnFocusLoss:!0,
    closeOnClick:!0,
    newestOnTop:!1,
    draggable:!0,
    draggablePercent:80,
    draggableDirection:"x",
    role:"alert",
    theme:"light"
  };
  var J,
  Q,
  V,
  G=new Map,
  W=[],
  K=!1;
  function $(){
    return Math.random().toString(36).substring(2,
    9)
  }
  function Z(n){
    return n&&(k(n.toastId)||O(n.toastId))?n.toastId:$()
  }
  function nn(n,
  t){
    return G.size>0?j.emit(0,
    n,
    t):(W.push({
      content:n,
      options:t
    }),
    K&&C&&(K=!1,
    Q=document.createElement("div"),
    document.body.appendChild(Q),
    (0,
    x.render)((0,
    o.createElement)(Y,
    Object.assign({
      
    },
    V)),
    Q))),
    t.toastId
  }
  function tn(n,
  t){
    return T({
      
    },
    t,
    {
      type:t&&t.type||n,
      toastId:Z(t)
    })
  }
  function en(n){
    return function(t,
    e){
      return nn(t,
      tn(n,
      e))
    }
    
  }
  function on(n,
  t){
    return nn(n,
    tn(L.DEFAULT,
    t))
  }
  on.loading=function(n,
  t){
    return nn(n,
    tn(L.DEFAULT,
    T({
      isLoading:!0,
      autoClose:!1,
      closeOnClick:!1,
      closeButton:!1,
      draggable:!1
    },
    t)))
  },
  on.promise=function(n,
  t,
  e){
    var o,
    a=t.pending,
    r=t.error,
    i=t.success;
    a&&(o=k(a)?on.loading(a,
    e):on.loading(a.render,
    T({
      
    },
    e,
    a)));
    var s={
      isLoading:null,
      autoClose:null,
      closeOnClick:null,
      closeButton:null,
      draggable:null
    },
    c=function(n,
    t,
    a){
      if(null!=t){
        var r=T({
          type:n
        },
        s,
        e,
        {
          data:a
        }),
        i=k(t)?{
          render:t
        }
        :t;
        return o?on.update(o,
        T({
          
        },
        r,
        i)):on(i.render,
        T({
          
        },
        r,
        i)),
        a
      }
      on.dismiss(o)
    },
    l=I(n)?n():n;
    return l.then(function(n){
      return c("success",
      i,
      n)
    }).catch(function(n){
      return c("error",
      r,
      n)
    }),
    l
  },
  on.success=en(L.SUCCESS),
  on.info=en(L.INFO),
  on.error=en(L.ERROR),
  on.warning=en(L.WARNING),
  on.warn=on.warning,
  on.dark=function(n,
  t){
    return nn(n,
    tn(L.DEFAULT,
    T({
      theme:"dark"
    },
    t)))
  },
  on.dismiss=function(n){
    return j.emit(1,
    n)
  },
  on.clearWaitingQueue=function(n){
    return void 0===n&&(n={
      
    }),
    j.emit(5,
    n)
  },
  on.isActive=function(n){
    var t=!1;
    return G.forEach(function(e){
      e.isToastActive&&e.isToastActive(n)&&(t=!0)
    }),
    t
  },
  on.update=function(n,
  t){
    void 0===t&&(t={
      
    }),
    setTimeout(function(){
      var e=function(n,
      t){
        var e=t.containerId,
        o=G.get(e||J);
        return o?o.getToast(n):null
      }
      (n,
      t);
      if(e){
        var o=e.props,
        a=e.content,
        r=T({
          
        },
        o,
        t,
        {
          toastId:t.toastId||n,
          updateId:$()
        });
        r.toastId!==n&&(r.staleId=n);
        var i=r.render||a;
        delete r.render,
        nn(i,
        r)
      }
      
    },
    0)
  },
  on.done=function(n){
    on.update(n,
    {
      progress:1
    })
  },
  on.onChange=function(n){
    return I(n)&&j.on(4,
    n),
    function(){
      I(n)&&j.off(4,
      n)
    }
    
  },
  on.configure=function(n){
    void 0===n&&(n={
      
    }),
    K=!0,
    V=n
  },
  on.POSITION=N,
  on.TYPE=L,
  j.on(2,
  function(n){
    J=n.containerId||n,
    G.set(J,
    n),
    W.forEach(function(n){
      j.emit(0,
      n.content,
      n.options)
    }),
    W=[]
  }).on(3,
  function(n){
    G.delete(n.containerId||n),
    0===G.size&&j.off(0).off(1).off(5),
    C&&Q&&document.body.removeChild(Q)
  });
  var an=e(750),
  rn={
    
  };
  function sn(n){
    return sn="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){
      return typeof n
    }
    :function(n){
      return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n
    },
    sn(n)
  }
  function cn(n,
  t){
    var e=Object.keys(n);
    if(Object.getOwnPropertySymbols){
      var o=Object.getOwnPropertySymbols(n);
      t&&(o=o.filter(function(t){
        return Object.getOwnPropertyDescriptor(n,
        t).enumerable
      })),
      e.push.apply(e,
      o)
    }
    return e
  }
  function ln(n){
    for(var t=1;
    t<arguments.length;
    t++){
      var e=null!=arguments[t]?arguments[t]:{
        
      };
      t%2?cn(Object(e),
      !0).forEach(function(t){
        fn(n,
        t,
        e[t])
      }):Object.getOwnPropertyDescriptors?Object.defineProperties(n,
      Object.getOwnPropertyDescriptors(e)):cn(Object(e)).forEach(function(t){
        Object.defineProperty(n,
        t,
        Object.getOwnPropertyDescriptor(e,
        t))
      })
    }
    return n
  }
  function fn(n,
  t,
  e){
    return(t=function(n){
      var t=function(n){
        if("object"!=sn(n)||!n)return n;
        var t=n[Symbol.toPrimitive];
        if(void 0!==t){
          var e=t.call(n,
          "string");
          if("object"!=sn(e))return e;
          throw new TypeError("@@toPrimitive must return a primitive value.")
        }
        return String(n)
      }
      (n);
      return"symbol"==sn(t)?t:t+""
    }
    (t))in n?Object.defineProperty(n,
    t,
    {
      value:e,
      enumerable:!0,
      configurable:!0,
      writable:!0
    }):n[t]=e,
    n
  }
  function un(n){
    return function(n){
      if(Array.isArray(n))return mn(n)
    }
    (n)||function(n){
      if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)
    }
    (n)||pn(n)||function(){
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    ()
  }
  function dn(n,
  t){
    return function(n){
      if(Array.isArray(n))return n
    }
    (n)||function(n,
    t){
      var e=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];
      if(null!=e){
        var o,
        a,
        r,
        i,
        s=[],
        c=!0,
        l=!1;
        try{
          if(r=(e=e.call(n)).next,
          0===t){
            if(Object(e)!==e)return;
            c=!1
          }
          else for(;
          !(c=(o=r.call(e)).done)&&(s.push(o.value),
          s.length!==t);
          c=!0);
          
        }
        catch(n){
          l=!0,
          a=n
        }
        finally{
          try{
            if(!c&&null!=e.return&&(i=e.return(),
            Object(i)!==i))return
          }
          finally{
            if(l)throw a
          }
          
        }
        return s
      }
      
    }
    (n,
    t)||pn(n,
    t)||function(){
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }
    ()
  }
  function pn(n,
  t){
    if(n){
      if("string"==typeof n)return mn(n,
      t);
      var e={
        
      }
      .toString.call(n).slice(8,
      -1);
      return"Object"===e&&n.constructor&&(e=n.constructor.name),
      "Map"===e||"Set"===e?Array.from(n):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?mn(n,
      t):void 0
    }
    
  }
  function mn(n,
  t){
    (null==t||t>n.length)&&(t=n.length);
    for(var e=0,
    o=Array(t);
    e<t;
    e++)o[e]=n[e];
    return o
  }
  rn.styleTagTransform=g(),
  rn.setAttributes=d(),
  rn.insert=f().bind(null,
  "head"),
  rn.domAPI=c(),
  rn.insertStyleElement=m(),
  i()(an.A,
  rn),
  an.A&&an.A.locals&&an.A.locals;
  const yn=function(){
    var n=dn((0,
    o.useState)([]),
    2),
    t=n[0],
    e=n[1],
    a=dn((0,
    o.useState)(""),
    2),
    r=a[0],
    i=a[1],
    s=dn((0,
    o.useState)([]),
    2),
    c=s[0],
    l=s[1],
    f=dn((0,
    o.useState)("what is wrong with this app?"),
    2),
    u=f[0],
    d=f[1],
    p=dn((0,
    o.useState)(!1),
    2),
    m=p[0],
    y=p[1],
    g=dn((0,
    o.useState)("https://n8n.opencd.opsmx.org/webhook/050c1ae2-6cd1-4b93-b25e-08eefb970351"),
    2),
    h=g[0],
    b=g[1],
    v=dn((0,
    o.useState)(null),
    2),
    _=v[0],
    x=v[1],
    T=dn((0,
    o.useState)(null),
    2),
    E=T[0],
    O=T[1],
    w=dn((0,
    o.useState)(""),
    2),
    k=w[0],
    I=w[1],
    R=dn((0,
    o.useState)(""),
    2),
    A=R[0],
    C=R[1],
    S=dn((0,
    o.useState)(!1),
    2),
    N=S[0],
    L=S[1],
    P=dn((0,
    o.useState)(!1),
    2),
    j=P[0],
    D=P[1];
    (0,
    o.useEffect)(function(){
      fetch("".concat(window.location.origin,
      "/api/v1/applications")).then(function(n){
        return n.json()
      }).then(function(n){
        return e(n.items.map(function(n){
          return n.metadata.name
        }))
      }).catch(console.error),
      fetch("".concat(window.location.origin,
      "/api/v1/session/userinfo")).then(function(n){
        return n.json()
      }).then(function(n){
        return I(n.username||"unknown")
      }).catch(console.error)
    },
    []),
    (0,
    o.useEffect)(function(){
      var n=document.querySelector(".ai-chat-messages");
      n&&(n.scrollTop=n.scrollHeight)
    },
    [c]);
    var z=function(n){
      try{
        var t=new URL(n);
        return"http:"===t.protocol||"https:"===t.protocol
      }
      catch(n){
        return!1
      }
      
    },
    M=function(){
      if(u.trim())if(l(function(n){
        return[].concat(un(n),
        [{
          user:"You",
          text:u
        }
        ])
      }),
      d(""),
      z(h)){
        var n={
          message:u,
          sessionId:A,
          application:r,
          appData:{
            status:E.status,
            spec:E.spec
          }
          
        };
        D(!0),
        fetch(h,
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(n)
        }).then(function(n){
          return n.json()
        }).then(function(n){
          var t=n.output||{
            
          };
          l(function(n){
            return[].concat(un(n),
            [{
              user:"Agent",
              text:t.comment||JSON.stringify(t)
            }
            ],
            un(t.shouldRun&&t.url&&t.method?[{
              user:"Agent",
              isApiSuggestion:!0,
              method:t.method,
              url:t.url,
              body:t.body
            }
            ]:[]))
          }),
          t.shouldRun&&t.url&&t.method&&x({
            method:t.method,
            url:t.url,
            body:t.body
          }),
          D(!1)
        }).catch(function(){
          l(function(n){
            return[].concat(un(n),
            [{
              user:"Agent",
              text:"Backend error occurred."
            }
            ])
          }),
          D(!1)
        })
      }
      else on.error("Invalid Assistant URL.")
    },
    B=function(){
      if(_){
        var n=_.url.startsWith("http")?_.url:"".concat(window.location.origin).concat(_.url);
        D(!0),
        fetch(n,
        {
          method:_.method,
          headers:{
            "Content-Type":"application/json"
          },
          body:_.body?JSON.stringify(_.body):null
        }).then(function(n){
          return n.json()
        }).then(function(n){
          var t={
            user:"Agent",
            text:"✅ Successfully executed API and here is the response."
          },
          e={
            user:"Agent",
            isApiOutput:!0,
            apiOutput:JSON.stringify(n,
            null,
            2),
            sentToAI:!1
          };
          l(function(n){
            return[].concat(un(n),
            [t,
            e])
          }),
          x(null),
          L(!0),
          D(!1)
        }).catch(function(){
          var n={
            user:"Agent",
            text:"❌ API execution failed. Here's the error:"
          },
          t={
            user:"Agent",
            isApiOutput:!0,
            apiOutput:"API call failed.",
            sentToAI:!1
          };
          l(function(e){
            return[].concat(un(e),
            [n,
            t])
          }),
          x(null),
          L(!1),
          D(!1)
        })
      }
      
    };
    var renderText=function(t){var e=String(t||""),r=/(https?:\/\/[^\s]+)/g,o=e.split(r);return o.map(function(t,e){return r.test(t)?React.createElement("a",{key:e,href:t,target:"_blank",rel:"noopener noreferrer"},t):t})};
    return React.createElement("div",
    {
      className:"ai-chat-container"
    },
    React.createElement(Y,
    {
      position:"top-right",
      autoClose:4e3
    }),
    React.createElement("h2",
    {
      className:"ai-chat-title"
    },
    "💬 Argo CD Chat Assistant"),
    React.createElement("div",
    {
      className:"ai-chat-controls"
    },
    React.createElement("input",
    {
      className:"ai-chat-input",
      placeholder:"Enter Assistant URL",
      value:h,
      onChange:function(n){
        var t=n.target.value;
        ""!==t?b(t):(b(""),
        i(""),
        l([]))
      }
      
    }),
    z(h)&&React.createElement("select",
    {
      value:r,
      onChange:function(n){
        var t=n.target.value,
        e="".concat(k,
        "_").concat(Math.floor(Date.now()/1e3));
        C(e),
        i(t),
        l([]),
        d(""),
        x(null),
        O(null),
        z(h)?(y(!0),
        fetch("".concat(window.location.origin,
        "/api/v1/applications/").concat(t)).then(function(n){
          return n.json()
        }).then(O).catch(function(){
          l(function(n){
            return[].concat(un(n),
            [{
              user:"Agent",
              text:"Failed to load app data."
            }
            ])
          })
        }).finally(function(){
          return y(!1)
        })):on.warning("Please enter a valid Assistant URL.")
      },
      className:"ai-chat-select ".concat(r?"selected":"")
    },
    React.createElement("option",
    {
      value:"",
      disabled:!0
    },
    "📦 Select an ArgoCD Application"),
    t.map(function(n){
      return React.createElement("option",
      {
        key:n,
        value:n
      },
      n)
    }))),
    m&&React.createElement("div",
    {
      className:"ai-chat-loading"
    },
    "⏳ Analyzing app..."),
    h&&!z(h)&&React.createElement("p",
    {
      className:"ai-chat-info"
    },
    "⚠️ Please enter a valid Assistant URL to continue."),
    !h&&React.createElement("p",
    {
      className:"ai-chat-info",
      style:{
        opacity:.6
      }
      
    },
    "💡 Please provide your Assistant URL to begin."),
    r&&React.createElement(React.Fragment,
    null,
    React.createElement("div",
    {
      className:"ai-chat-messages"
    },
    c.map(function(n,
    t){
      return React.createElement("div",
      {
        key:t,
        className:"ai-chat-message ".concat("You"===n.user?"user":"agent")
      },
      React.createElement("div",
      {
        style:{
          display:"flex",
          alignItems:"center",
          gap:"8px",
          marginBottom:"4px"
        }
        
      },
      "You"===n.user?"🧑":"🤖",
      " ",
      React.createElement("strong",
      null,
      n.user,
      ":")),
      n.isApiSuggestion?React.createElement(React.Fragment,
      null,
      React.createElement("p",
      {
        style:{
          margin:"6px 0"
        }
        
      },
      "I recommend calling:"),
      React.createElement("code",
      null,
      n.method,
      " ",
      n.url),
      React.createElement("button",
      {
        onClick:B,
        className:"ai-chat-button",
        style:{
          marginTop:"10px"
        }
        
      },
      "🚀 Run This API")):n.isApiOutput?React.createElement(React.Fragment,
      null,
      React.createElement("pre",
      null,
      n.apiOutput),
      !n.sentToAI&&React.createElement("button",
      {
        onClick:function(){
          return function(n){
            var t=c[n];
            if(t&&t.apiOutput){
              var e=N?"I ran the API the agent suggested. Here is the result.":"I tried running the suggested API, but it failed.",
              o={
                user:"You",
                text:e
              },
              a={
                message:e,
                sessionId:A,
                application:r,
                appData:{
                  apiResult:t.apiOutput
                }
                
              };
              D(!0),
              l(function(t){
                var e=[].concat(un(t),
                [o]);
                return e[n]=ln(ln({
                  
                },
                e[n]),
                {
                  
                },
                {
                  sentToAI:!0
                }),
                e
              }),
              fetch(h,
              {
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify(a)
              }).then(function(n){
                return n.json()
              }).then(function(n){
                var t=n.output||{
                  
                };
                l(function(n){
                  return[].concat(un(n),
                  [{
                    user:"Agent",
                    text:t.comment||JSON.stringify(t)
                  }
                  ],
                  un(t.shouldRun&&t.url&&t.method?[{
                    user:"Agent",
                    isApiSuggestion:!0,
                    method:t.method,
                    url:t.url,
                    body:t.body
                  }
                  ]:[]))
                }),
                t.shouldRun&&t.url&&t.method&&x({
                  method:t.method,
                  url:t.url,
                  body:t.body
                }),
                D(!1)
              }).catch(function(){
                l(function(n){
                  return[].concat(un(n),
                  [{
                    user:"Agent",
                    text:"❌ Failed to send output to AI assistant. Please try again later."
                  }
                  ])
                }),
                D(!1)
              })
            }
            
          }
          (t)
        },
        className:"ai-chat-button",
        style:{
          marginTop:"10px"
        }
        
      },
      "📤 Send Output to AI")):React.createElement("span",null,renderText(n.text)))
    }),
    j&&React.createElement("div",
    {
      className:"ai-agent-thinking"
    },
    "🤖 Thinking...")),
    React.createElement("div",
    {
      className:"ai-chat-footer"
    },
    React.createElement("textarea",
    {
      className:"ai-chat-textarea",
      placeholder:"Ask anything",
      value:u,
      onChange:function(n){
        return d(n.target.value)
      },
      onKeyDown:function(n){
        return"Enter"===n.key&&!n.shiftKey&&(n.preventDefault(),
        M())
      }
      
    }),
    React.createElement("button",
    {
      onClick:M,
      className:"ai-chat-button",
      disabled:j
    },
    j?"⌛":"Send"))))
  };
  window.extensionsAPI.registerSystemLevelExtension(function(){
    return React.createElement(yn,
    null,
    " ")
  },
  "Chat",
  "/chat",
  "fa-comments")
})();
