
// import { ExercisesController } from '../js/favoritesapi/EcersisesController.js';  // експортую контролер, який використовується для взаємодії з API Exercises
// import { renderFavoriteCards } from '../js/helpers/render.js'; // експорт функції, яка використовується для візуалізації карток улюблених вправ
// import {
//   getFavoritCardsFromLocalStorage, // Отримую масив карток улюблених вправ з локального сховища
//   isExerciseInFavorite, // Перевіряю, чи є вправа улюбленою
//   removeExerciseFromFavoriteById, // Видаляє вправу з улюблених за ID
// } from '../js/helpers/localStorage';
// import { splitArraytoParts } from '../js/helpers/utils.js';  // експортую функцію splitArraytoParts (названа умовно), яка використовується для розбиття масиву на частини
// import { renderPagination } from '../js/helpers/pagination'; // функція, використовується для рендерування пагінації (навігації між сторінками)
// import { createMarkupModalEx } from '../js/exercises.js'; // експорту функції, яка використовується для створення розмітки модального вікна вправи


// //   отримання списку вправ, додавання, видалення вправ.
// const exerciseCntrl = new ExercisesController();
// let exercise;
// const chunk = 8;

// // доступ до списку карток улюблених вправ та маніпуляцій з ними
// const listFavorites = document.querySelector(
//     '.favorites-container-content-items'
//   );
// // список елементів пагінації та дії з ним (напевно повнен бути в розділі пошуку)
// const paginationList = document.querySelector('.pagination-list');
// // відкриття та закриття модального вікна
// const modalWindow = document.querySelector('.backdrop');
// const body = document.body;
// let btnAddRemoveEl;

// // розбиття масиву карток улюблених вправ на частини
// const chunkArrayLs = splitArraytoParts(
//     getFavoritCardsFromLocalStorage(),
//     chunk
//   );

// //   код використовується для візуалізації списку карток улюблених вправ та пагінації. Код перевіряє ширину екрана та використовує різні макети для різних розмірів екрана.
//   document.addEventListener('DOMContentLoaded', () => {
//     if (window.innerWidth <= 767) {
//       let cards = splitArraytoParts(getFavoritCardsFromLocalStorage(), chunk)[0];
//       listFavorites.innerHTML = renderFavoriteCards(cards);
//       paginationList.innerHTML = renderPagination(chunkArrayLs.length, 1);
//     } else {
//       const favoriteInfoLs = renderFavoriteCards(
//         getFavoritCardsFromLocalStorage()
//       );
//       listFavorites.innerHTML = favoriteInfoLs;
//     }
//   });

// //    адаптації візуалізації списку карток улюблених вправ та пагінації до різних розмірів екрана
//   window.addEventListener('resize', () => {
//     if (window.matchMedia('(max-width: 767px)').matches) {
//       let chunkArrayLocal = splitArraytoParts(
//         getFavoritCardsFromLocalStorage(),
//         chunk
//       );
//       let cards = splitArraytoParts(getFavoritCardsFromLocalStorage(), chunk)[0];
//       listFavorites.innerHTML = renderFavoriteCards(cards);
//       paginationList.innerHTML = renderPagination(chunkArrayLocal.length, 1);
//     } else {
//       const favoriteInfoLs = renderFavoriteCards(
//         getFavoritCardsFromLocalStorage()
//       );
//       listFavorites.innerHTML = favoriteInfoLs;
//       paginationList.innerHTML = '';
//     }
//   });
  
// //   обробляє кліки на елементах всередині списку улюблених вправ. Він розпізнає кліки на:
// // Кнопках видалення вправ: видаляє вправу з улюблених, оновлює інтерфейс і може оновити пагінацію.
// // Кнопках запуску вправ: відкриває модальне вікно
//   listFavorites.addEventListener('click', async e => {
//     if (
//       e.target.ariaLabel !== 'icon-bucket' &&
//       e.target.className !== 'favorite-remove-btn' &&
//       e.target.className !== 'favorite-start-btn' &&
//       e.target.ariaLabel !== 'start-arrow'
//     )
//       return;
  
//     let id = Object.values(e.target.closest('[data-exerciseId]').dataset)[0];
  
//     if (
//       e.target.ariaLabel === 'icon-bucket' ||
//       e.target.className === 'favorite-remove-btn'
//     ) {
//       let allstorage;
//       try {
//         if (isExerciseInFavorite(id)) {
//           removeExerciseFromFavoriteById(id);
//           document.querySelector(`[data-exerciseId="${id}"]`).remove();
//           allstorage = getFavoritCardsFromLocalStorage()
//             ? getFavoritCardsFromLocalStorage().length
//             : 0;
//           if (allstorage % chunk === 0) {
//             paginationList.innerHTML = renderPagination(chunkArrayLs.length, 1);
//             window.location.reload();
//           }
//           if (allstorage === 0) {
//             paginationList.innerHTML = '';
//             window.location.reload();
//           }
//         }
//       } catch (error) {
//         console.log(`Exercise with ${id} can't be removed`, error);
//       }
//     }
  
//     if (
//       e.target.className === 'favorite-start-btn' ||
//       e.target.ariaLabel === 'start-arrow'
//     ) {
//       const exerciseInfo = await exerciseCntrl.getExerciseById(id);
//       createMarkupModalEx(exerciseInfo.json());
//       btnAddRemoveEl = document.querySelector('.js-add-remove-btn');
//       btnAddRemoveEl.addEventListener('click', e => {
//         if (
//           window.location.pathname !== '/favorites.html' &&
//           e.target.classList.contains('js-add-remove-btn')
//         )
//           return;
//         if (e.target.innerText.trim() === 'Remove from favorites') {
//           document.querySelector(`[data-exerciseId="${id}"]`).remove();
//         }
//       });
//     }
//   });

// //  оновлення списку улюблених вправ та пагінації при натисканні на номер сторінки
// function getCurrentPage(event) {
//     if (event.target.tagName === 'LI') {
//       paginationList.innerHTML = renderPagination(
//         chunkArrayLs.length,
//         event.target.value
//       );
//       listFavorites.innerHTML = renderFavoriteCards(
//         chunkArrayLs[event.target.value - 1]
//       );
//     }
//   }
  

// // закриття модального вікна з вправою при натисканні клавіші Escape
// const closeIconUse = document.querySelector('.modal-close-icon use');

// function closeModalOnEscape(event) {
//   if (event.key === 'Escape') {
//     closeExerciseModal(); 
//   }
// }

// // закриття модального вікна з вправою та оновлення списку улюблених вправ.
// function closeExerciseModal() {
//     modalWindow.classList.remove('is-open');
//     body.classList.remove('modal-open');
//     window.removeEventListener('keydown', closeModalOnEscape);
//     window.removeEventListener('click', closeModalOnMouse);
//     const favoriteInfoLs = renderFavoriteCards(getFavoritCardsFromLocalStorage());
//     listFavorites.innerHTML = favoriteInfoLs;
//   }

  
// // закриття модального вікна з вправою при натисканні на:
// // Кнопку закриття модального вікна
// // Іконку закриття модального вікна
// // Фон модального вікна 
// function closeModalOnMouse(e) {
//     e.preventDefault();
  
//     if (
//       e.target.classList.value === 'close-btn' ||
//       e.target.classList.value === 'modal-close-icon' ||
//       e.target.classList.value === 'backdrop is-open'
//     ) {
//       closeExerciseModal();
//     }
//   }
  
//   closeIconUse.addEventListener('click', function () {
//     closeExerciseModal();
//   });

 
// window.addEventListener('keydown', function () {
//     closeExerciseModal();
//   });
  
