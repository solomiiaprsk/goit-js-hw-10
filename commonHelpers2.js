import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{i}from"./assets/vendor-77e16229.js";const n=document.querySelector(".form");n.addEventListener("submit",t=>{t.preventDefault();const s=parseInt(t.currentTarget.elements.delay.value),r=t.currentTarget.querySelector('input[name="state"]:checked'),o=r?r.value:null;r.disabled=!0,new Promise((e,l)=>{setTimeout(()=>{o==="fulfilled"?e(s):l(s)},s)}).then(e=>{i.success({title:"OK",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{i.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})})});
//# sourceMappingURL=commonHelpers2.js.map
