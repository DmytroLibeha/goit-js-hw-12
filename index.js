import{a as y,S as L,i as c}from"./assets/vendor-Dpd1z_xS.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(e){if(e.ep)return;e.ep=!0;const a=n(e);fetch(e.href,a)}})();async function u(i,s){return await y.get(`https://pixabay.com/api//?q=${i}&image_type=photo&orientation=horizontal&safesearch=true&key=47395064-b7fd47e3542f1aea6492dfd3a`,{params:{page:s,per_page:15}})}function f(i){return i.map(({webformatURL:s,largeImageURL:n,tags:t,likes:e,views:a,comments:l,downloads:g})=>`<li class="list-item" >
    <a href="${n}" alt="${t}" title=""/>
    <img src="${s}" alt="${t}" class="img-item">
    <div class="list-container">
    <p class="item"><span class="item-text">Likes</span> <span>${e}</span></p>
    <p class="item"><span class="item-text">Views</span> <span>${a}</span></p>
    <p class="item"><span class="item-text">Comments</span> <span>${l}</span></p>
    <p class="item"><span class="item-text">Downloads</span> <span>${g}</span></p>
    </div></a>
  </li>`).join("")}const h=new L(".list-js a",{captionsData:"alt",captionDelay:250,captionClass:"imageTitle"}),b=document.querySelector(".form-js"),d=document.querySelector(".list-js"),p=document.querySelector(".loader"),r=document.querySelector(".js-load-btn");b.addEventListener("submit",w);r.addEventListener("click",P);let o=1,m=1;function w(i){i.preventDefault();const{picture:s}=i.target.elements,n=s.value.trim();if(d.innerHTML="",!n||n===" "){c.show({title:"Error",message:"Please add request!",position:"center"}),d.innerHTML="";return}o=1,p.classList.remove("hidden"),r.classList.replace("more-btn","hidden"),u(n,o).then(({data:{hits:t,totalHits:e}})=>{m=Math.ceil(e/t.length),t.length?(d.innerHTML=f(t),h.refresh(),o>=m&&r.classList.replace("more-btn","hidden"),r.classList.replace("hidden","more-btn")):c.show({title:"No Results",message:"Please enter a valid search query!",position:"center"})}).catch(t=>{console.log(t.message),c.show({title:"Error",message:`Something went wrong: ${t.message}. Please try again later.`,position:"center"})}).finally(()=>{s.value="",p.classList.add("hidden")})}async function P(){o+=1,r.disabled=!0;try{const{data:{hits:i,totalHits:s}}=await u(o);d.insertAdjacentHTML("beforeend",f(i)),m=Math.ceil(s/i.length),(o>=m||!s)&&(r.classList.replace("more-btn","hidden"),c.show({title:"End of results",message:"Sorry, there are no more images matching your request.",position:"center"}));const t=document.querySelector(".list-item").getBoundingClientRect().height;window.scrollBy({left:0,top:t*2.5,behavior:"smooth"}),h.refresh()}catch(i){c.show({title:"Error",message:`Something went wrong: ${i.message}. Please try again later.`,position:"center"})}finally{r.disabled=!1}}
//# sourceMappingURL=index.js.map