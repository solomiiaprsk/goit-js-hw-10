import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as m,i as f}from"./assets/vendor-77e16229.js";const s=document.querySelector("#datetime-picker"),n=document.querySelector("[data-start]"),r=document.querySelectorAll(".value");let i,o;const h={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){console.log(t[0]),i=t[0],o=i-new Date,o<=0?(f.error({color:"red",position:"topRight",message:"Please choose a date in the future"}),n.disabled=!0,s.disabled=!1):(n.disabled=!1,s.disabled=!0)}};m("#datetime-picker",h);n.disabled=!0;n.addEventListener("click",()=>{const t=setInterval(()=>{if(o=i-new Date,o<0){n.disabled=!0,s.disabled=!1,clearInterval(t);return}const e=a(o);r[0].textContent=e.days.toString().padStart(2,"0"),r[1].textContent=e.hours.toString().padStart(2,"0"),r[2].textContent=e.minutes.toString().padStart(2,"0"),r[3].textContent=e.seconds.toString().padStart(2,"0")},1e3)});function a(t){const l=Math.floor(t/864e5),d=Math.floor(t%864e5/36e5),c=Math.floor(t%864e5%36e5/6e4),u=Math.floor(t%864e5%36e5%6e4/1e3);return{days:l,hours:d,minutes:c,seconds:u}}console.log(a(2e3));console.log(a(14e4));console.log(a(2414e4));
//# sourceMappingURL=commonHelpers.js.map