(()=>{"use strict";var e=function(e,t,n,r,o){var c=t.querySelector(".card").cloneNode(!0);return c.querySelector(".card__image").src=e.link,c.querySelector(".card__image").alt="Локация: ".concat(e.name),c.querySelector(".card__title").textContent=e.name,c.querySelector(".card__delete-button").addEventListener("click",n),c.querySelector(".card__like-button").addEventListener("click",r),c.querySelector(".card__image").addEventListener("click",(function(){o(e.name,e.link)})),c},t=function(e){e.target.closest(".card").remove()},n=function(e){e.target.classList.toggle("card__like-button_is-active")},r=function(e){e.classList.add("popup_is-animated","popup_is-opened"),document.addEventListener("keydown",c)},o=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)},c=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");o(t)}},a=document.querySelector("#card-template").content,d=document.querySelector(".places__list"),i=document.forms["new-place"],u=document.forms["edit-profile"],p=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),s=document.querySelector(".popup_type_image"),m=s.querySelector(".popup__image"),_=s.querySelector(".popup__caption"),v=document.querySelectorAll(".popup__close"),y=document.querySelector(".profile__edit-button"),f=document.querySelector(".profile__add-button"),k=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),S=u.name,g=u.description,E=i["place-name"],L=i.link,h=function(e,t){_.textContent=e,m.src=t,m.alt=e,r(s)};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){d.append(e(r,a,t,n,h))})),u.addEventListener("submit",(function(e){e.preventDefault();var t=document.querySelector(".profile__title"),n=document.querySelector(".profile__description");t.textContent=S.value,n.textContent=g.value,o(p)})),i.addEventListener("submit",(function(r){r.preventDefault();var c={name:E.value,link:L.value};d.prepend(e(c,a,t,n,h)),o(l),E.value="",L.value=""})),y.addEventListener("click",(function(){S.value=k.textContent,g.value=q.textContent,r(p)})),f.addEventListener("click",(function(){r(l)})),v.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){o(t)})),t.addEventListener("mousedown",(function(e){e.currentTarget===e.target&&o(t)}))}))})();