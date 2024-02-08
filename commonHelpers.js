import{i,c as o,r as d,g as v,o as h}from"./assets/fitnesapi-8fd4d366.js";import"./assets/vendor-0a7943b3.js";const a=document.querySelector('[data-name="favorites-list"]'),r=document.querySelector('[data-name="favorites-empty"]'),m=document.querySelector(".modal"),f=m.querySelector(".js-btn-add"),n=s=>{try{d(s),c()}catch(t){console.error(t)}};document.addEventListener("click",function(s){const t=s.target;if(t&&t.classList.contains("trash-icon")){const e=t.closest(".exe-info-list-item").dataset.id;n(e)}});f.addEventListener("click",()=>{c()});const p=s=>{const t=s.closest(".exe-info-list-item").dataset.id;selectedExerciseId=t,n(t)};a.querySelectorAll(".trash-link").forEach(s=>{s.addEventListener("click",()=>p(s))});const u=s=>{if(s.preventDefault(),s.target.closest(".icon-arrow-container")){const e=s.target.closest("[data-id]");if(e){const l=e.dataset.id;g(l)}}},g=async s=>{try{const t=await v(s);h(t)}catch(t){console.log(t)}},c=()=>{try{const s=JSON.parse(window.localStorage.getItem("favorites"));if(s.length===0){a.classList.add("favorites-visually-hidden"),r.classList.remove("favorites-visually-hidden");return}else if(s.length>0){const t=s.map(e=>`
   <li class="exe-info-list-item" data-id="${e._id}">
        <div class="item-top-container">
          <div class="icon-star-container">
          <p class="workout">workout</p>
            <a href="#" class="trash-link">
                <svg class="icon-trash-svg" width="16" height="36">
                  <use href="${i}#icon-trash" class="trash-icon"></use>
                </svg>
              </a>
          </div>
            <a href="#" class="icon-arrow-container >
            <p class="exe-top-text">Start</p>
              <svg class="icon-arrow-svg" width="13" height="13">
                <use href="${i}#icon-right-sm-arrow"></use>
              </svg>
            </a>
        </div>
        <div class="item-middle-container">
          <svg class="icon-run-svg" width="32" height="32">
            <use href="${i}#icon-run"></use>
          </svg>
          <h3 class="exe-card-title">${o(e.name)}</h3>
        </div>
        <div class="item-bottom-container">
          <div class="bottom-one-info-container">
            <p class="bottom-info-text">
              <span class="bottom-span-text">Burned calories:</span> ${e.burnedCalories} / ${e.time} min
            </p>
            <p class="bottom-info-text">
              <span class="bottom-span-text">Body part:</span> ${o(e.bodyPart)}
            </p>
          </div>
          <div class="bottom-two-info-container">
            <p class="bottom-info-text">
              <span class="bottom-span-text">Target:</span> ${o(e.target)}
            </p>
          </div>
        </div>
    </li>`).join("");r.classList.add("favorites-visually-hidden"),a.innerHTML=t,a.classList.remove("favorites-visually-hidden"),a.addEventListener("click",u)}}catch{r.classList.remove("favorites-visually-hidden"),a.innerHTML="",a.classList.add("favorites-visually-hidden")}};c();
//# sourceMappingURL=commonHelpers.js.map
