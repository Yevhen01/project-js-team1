import{c as o,r as l,g as d,o as v}from"./assets/fitnesapi-37575d4f.js";import"./assets/vendor-0a7943b3.js";const i=document.querySelector('[data-name="favorites-list"]'),a=document.querySelector('[data-name="favorites-empty"]'),m=document.querySelector(".modal"),h=m.querySelector(".js-btn-add"),c=s=>{try{l(s),r()}catch(t){console.error(t)}};document.addEventListener("click",function(s){const t=s.target;if(t&&t.classList.contains("trash-icon")){const e=t.closest(".exe-info-list-item").dataset.id;c(e)}});h.addEventListener("click",()=>{r()});const f=s=>{const t=s.closest(".exe-info-list-item").dataset.id;selectedExerciseId=t,c(t)};i.querySelectorAll(".trash-link").forEach(s=>{s.addEventListener("click",()=>f(s))});const g=s=>{if(s.preventDefault(),s.target.closest(".icon-arrow-container")){const e=s.target.closest("[data-id]");if(e){const n=e.dataset.id;p(n)}}},p=async s=>{try{const t=await d(s);v(t)}catch(t){console.log(t)}},r=()=>{try{const s=JSON.parse(window.localStorage.getItem("favorites"));if(s.length===0){i.classList.add("favorites-visually-hidden"),a.classList.remove("favorites-visually-hidden");return}else if(s.length>0){const t=s.map(e=>`
   <li class="exe-info-list-item" data-id="${e._id}">
        <div class="item-top-container">
          <div class="icon-star-container">
          <p class="workout">workout</p>
            <a href="#" class="trash-link">
                <svg class="icon-trash-svg" width="16" height="36">
                  <use href="../img/icons.svg#icon-trash" class="trash-icon"></use>
                </svg>
              </a>
          </div>

            <a href="#" class="icon-arrow-container >
            <p class="exe-top-text">Start</p>
              <svg class="icon-arrow-svg" width="13" height="13">
                <use href="./img/icons.svg#icon-right-sm-arrow"></use>
              </svg>
            </a>
        </div>

        <div class="item-middle-container">
          <svg class="icon-run-svg" width="32" height="32">
            <use href="./img/icons.svg#icon-run"></use>
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
    </li>`).join("");a.classList.add("favorites-visually-hidden"),i.innerHTML=t,i.classList.remove("favorites-visually-hidden"),i.addEventListener("click",g)}}catch{a.classList.remove("favorites-visually-hidden"),i.innerHTML="",i.classList.add("favorites-visually-hidden")}};r();
//# sourceMappingURL=commonHelpers.js.map
