import{a as h,b as f,i as u,c as p,g as x,o as S}from"./assets/fitnesapi-8fd4d366.js";import{i as k}from"./assets/vendor-0a7943b3.js";(()=>{const e={pageHeader:document.querySelector("#page-header"),toggleMenuBtn:document.querySelector("#toggle-mobile-menu-btn"),menu:document.querySelector("#mobile-menu-container"),navLinks:document.querySelectorAll(".page-nav-link"),openMenuSvg:document.querySelector("#icon-burger"),closeMenuSvg:document.querySelector("#icon-close"),logo:document.querySelector(".logo")};e.toggleMenuBtn.addEventListener("click",t),e.navLinks.forEach(o=>{o.addEventListener("click",s)});function s(){e.menu.classList.add("is-hidden"),e.pageHeader.classList.remove("fixed"),e.closeMenuSvg.classList.add("is-hidden"),e.openMenuSvg.classList.remove("is-hidden"),e.logo.classList.remove("is-hidden")}function t(){e.pageHeader.classList.toggle("fixed"),e.menu.classList.toggle("is-hidden"),e.closeMenuSvg.classList.toggle("is-hidden"),e.openMenuSvg.classList.toggle("is-hidden"),e.logo.classList.toggle("is-hidden")}})();const n={musclesBtn:document.querySelector(".muscles-btn"),bodyPartsBtn:document.querySelector(".body-parts-btn"),equipmentBtn:document.querySelector(".equipment-btn"),paginationFilter:document.querySelector(".pagination-filter"),exercisesTitle:document.querySelector(".exercises-title-filter"),exercisesList:document.querySelector(".exercises-list"),filterList:document.querySelector(".filter-list"),searchForm:document.querySelector(".search-form"),removeBtn:document.querySelector(".remove-btn"),searchInput:document.querySelector(".search-exercise-input"),loader:document.querySelector(".loader"),exercisesSection:document.querySelector(".exercises-section")};n.musclesBtn.addEventListener("click",()=>l(n.musclesBtn,"Muscles"));n.bodyPartsBtn.addEventListener("click",()=>l(n.bodyPartsBtn,"Body parts"));n.equipmentBtn.addEventListener("click",()=>l(n.equipmentBtn,"Equipment"));window.addEventListener("load",()=>l(n.musclesBtn,"Muscles"));n.removeBtn.addEventListener("click",e=>{e.preventDefault(),$(n.searchInput)});n.searchForm.addEventListener("submit",H);n.searchInput.addEventListener("input",()=>{n.searchInput.value.trim()!==""?n.removeBtn.style.display="block":n.removeBtn.style.display="none"});let c=1,m=1;function L(e){n.searchForm.style.display="none";const s=e.map(t=>`
    <li class="filter-list-item"  data-filter="${t.filter}" data-name="${t.name}">
      <img src="${t.imgUrl}" />
      <div class="overlay">
        <p class="filter-list-item-name">${t.name}</p>
        <p class="filter-name">${t.filter}</p>
      </div>
    </li>`).join("");n.filterList.innerHTML=s,e.forEach(t=>B(t))}function E(e,s){const t=document.createElement("button");return t.classList.add("pagination-btn"),t.innerText=e,t.addEventListener("click",o=>M(e,s,o)),t}function T(e){const s=n.paginationFilter;if(m>1){s.innerHTML="";for(let o=1;o<=m;o++){const i=E(o,e);s.appendChild(i)}const t=s.querySelector(`.pagination-btn:nth-child(${c})`);t&&t.classList.add("active")}else s.innerHTML=""}async function M(e,s,t){const o=t.currentTarget,i=document.querySelector(".pagination-btn.active");i&&i.classList.remove("active"),o.classList.add("active"),c=e,n.exercisesList.innerHTML="",n.filterList.innerHTML="",n.loader.style.display="block";try{const{data:r}=await h(s,c);n.exercisesSection.scrollIntoView({behavior:"smooth"}),L(r.results)}catch(r){console.log(r)}finally{n.loader.style.display="none"}}async function l(e,s){c=1,n.exercisesTitle.innerHTML="",n.filterList.innerHTML="",n.exercisesList.innerHTML="",n.loader.style.display="block",document.querySelectorAll(".exercises-btn").forEach(t=>t.classList.remove("active")),e.classList.add("active");try{const{data:t,fetchedPage:o,fetchedTotalPages:i}=await h(s);c=o,m=i,L(t.results),T(s)}catch(t){console.log(t)}finally{n.loader.style.display="none"}}async function w(e){let s=e.dataset.filter.toLowerCase();s==="body parts"&&(s="bodypart");const t=e.dataset.name;n.exercisesTitle.innerHTML=` /<span class="exercises-title-grey"> ${t}</span>`;let o=1;n.filterList.innerHTML="",n.exercisesList.innerHTML="",n.loader.style.display="block";try{const i=await f(o,s,t);y(i.results),b(i.totalPages,s,t)}catch(i){console.log(i)}finally{n.loader.style.display="none"}}function b(e,s,t,o){const i=n.paginationFilter;if(e>1&&e<=3){i.innerHTML="";for(let r=1;r<=e;r++){const a=v(r,s,t,o);r===1&&a.classList.add("active"),i.appendChild(a)}}else if(e>3){e=3,i.innerHTML="";for(let r=1;r<=e;r++){const a=v(r,s,t,o);r===1&&a.classList.add("active"),i.appendChild(a)}}else i.innerHTML=""}function v(e,s,t,o){const i=document.createElement("button");return i.classList.add("pagination-btn"),i.innerText=e,i.addEventListener("click",r=>q(e,s,r,t,o)),i}async function q(e,s,t,o,i){const r=t.currentTarget,a=document.querySelector(".pagination-btn.active");a&&a.classList.remove("active"),r.classList.add("active"),n.exercisesList.innerHTML="",n.loader.style.display="block";try{const d=await f(e,s,o,i);n.exercisesSection.scrollIntoView({behavior:"smooth"}),y(d.results)}catch(d){console.log(d)}finally{n.loader.style.display="none"}}function y(e){n.searchForm.style.display="block";const s=e.map(t=>`
   <li class="exe-info-list-item" data-id="${t._id}">
        <div class="item-top-container">
          <div class="icon-star-container">
            <p class="workout">workout</p>
            <p class="rating">${Math.round(t.rating)+".0"}</p>
              <svg class="icon-star-svg" width="18" height="18">
                <use href="${u}#icon-star-full"></use>
              </svg>
           </div>
            <a href="#" class="icon-arrow-container >
            <p class="exe-top-text">Start</p>
              <svg class="icon-arrow-svg" width="13" height="13">
                <use href="${u}#icon-right-sm-arrow"></use>
              </svg>
            </a>
        </div>
        <div class="item-middle-container">
          <svg class="icon-run-svg" width="32" height="32">
            <use href="${u}#icon-run"></use>
          </svg>
          <h3 class="exe-card-title">${p(t.name)}</h3>
        </div>
        <div class="item-bottom-container">
            <p class="bottom-info-text">
              <span class="bottom-span-text">Burned calories:</span> ${t.burnedCalories} / ${t.time} min
            </p>
            <p class="bottom-info-text">
              <span class="bottom-span-text">Body part:</span> ${p(t.bodyPart)}
            </p>
            <p class="bottom-info-text">
              <span class="bottom-span-text">Target:</span> ${p(t.target)}
            </p>
        </div>
    </li>`).join("");n.exercisesList.innerHTML=s,n.exercisesList.addEventListener("click",I)}function B(e){const s=document.querySelector(`[data-filter="${e.filter}"][data-name="${e.name}"]`);s.addEventListener("click",()=>w(s))}function H(e){e.preventDefault(),n.removeBtn.style.display="none";const s=n.searchInput.value.trim().toLowerCase();if(s!==""){let t=document.querySelector(".exercises-btn.active").textContent.toLowerCase().trim();t==="body parts"&&(t="bodypart");const o=n.exercisesTitle.textContent.slice(3).toLowerCase().trim();console.log(o),C(t,o,s)}}function $(e){e.value="",n.removeBtn.style.display="none"}async function C(e,s,t){if(t==="")return;n.exercisesList.innerHTML="",n.loader.style.display="block";let o=1;try{const i=await f(o,e,s,t);i.results.length!==0?(y(i.results),b(i.totalPages,e,s,t)):(n.paginationFilter.innerHTML="",n.exercisesList.innerHTML='<li class="not-found-results"><p class="message-not-found-results">Unfortunately, <span class="no-results-grey">no results</span> were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</p></li>')}catch(i){console.log(i)}finally{n.searchForm.reset(),n.loader.style.display="none"}}function I(e){if(e.preventDefault(),e.target.closest(".icon-arrow-container")){const t=e.target.closest("[data-id]");if(t){const o=t.dataset.id;F(o)}}}async function F(e){try{const s=await x(e);S(s)}catch(s){console.log(s)}}const P=document.getElementById("subscriptionForm"),g=document.getElementById("email");P.addEventListener("submit",function(e){e.preventDefault();const s=g.value.trim();if(!A(s)){k.error({title:"error",message:"Sorry, not valid email. Please try again!",position:"bottomRight",messageColor:"#f6f6f6",backgroundColor:"#7e847f",maxWidth:300}),g.value="";return}R(s)});function A(e){return/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(e)}function R(e){console.log("POST");const s="https://energyflow.b.goit.study/api/subscription",t={email:e},o={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};fetch(s,o).then(i=>{if(!i.ok)throw new Error(`HTTP error! Status: ${i.status}`);return i.json()}).then(i=>{console.log("Відповідь від бекенду:",i),g.value=""}).catch(i=>{console.error("Помилка відправки запиту на бекенд:",i)})}
//# sourceMappingURL=commonHelpers2.js.map
