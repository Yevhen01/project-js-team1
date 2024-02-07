import { capitalizeFirstLetter, truncateText } from './helpers/string_utils';
import { getExercisesById } from './fitnesapi';
import { openExerciseModal } from './modal';

const favoritesList = document.querySelector('[data-name="favorites-list"]');
const favoritesEmpty = document.querySelector('[data-name="favorites-empty"]');
const modalWindow = document.querySelector('.modal');
const addToFavoritesBtn = modalWindow.querySelector('.js-btn-add');

addToFavoritesBtn.addEventListener('click', () => {
  checkFavorites();
});

const onExercisesClick = event => {
  event.preventDefault();
  const isArrowIcon = event.target.closest('.icon-arrow-container');

  if (isArrowIcon) {
    const exerciseItem = event.target.closest('[data-id]');

    if (exerciseItem) {
      const exerciseId = exerciseItem.dataset.id;
      onArrowClick(exerciseId);
    }
  }
};

const onArrowClick = async exerciseId => {
  try {
    const exerciseDetails = await getExercisesById(exerciseId);
    openExerciseModal(exerciseDetails);
  } catch (error) {
    console.log(error);
  }
};

const checkFavorites = () => {
  try {
    const favoritesExercises = JSON.parse(
      window.localStorage.getItem('favorites')
    );
    if (favoritesExercises.length === 0) {
      favoritesList.classList.add('favorites-visually-hidden');
      favoritesEmpty.classList.remove('favorites-visually-hidden');
      return;
    } else if (favoritesExercises.length > 0) {
      const markup = favoritesExercises
        .map(
          item => `
   <li class="exe-info-list-item" data-id="${item._id}">
        <div class="item-top-container">
          <div class="icon-star-container">
            <p class="workout">workout</p>
            <p class="rating">${Math.round(item.rating)}</p>
              <svg class="icon-star-svg" width="18" height="18">
                <use href="./img/icons.svg#icon-star-full"></use>
              </svg>
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
          <h3 class="exe-card-title">${truncateText(item.name)}</h3>
        </div>

        <div class="item-bottom-container">
          <div class="bottom-one-info-container">
            <p class="bottom-info-text">
              <span class="bottom-span-text">Burned calories:</span> ${
                item.burnedCalories
              } / ${item.time} min
            </p>
            <p class="bottom-info-text">
              <span class="bottom-span-text">Body part:</span> ${capitalizeFirstLetter(
                item.bodyPart
              )}
            </p>
          </div>
          <div class="bottom-two-info-container">
            <p class="bottom-info-text">
              <span class="bottom-span-text">Target:</span> ${capitalizeFirstLetter(
                item.target
              )}
            </p>
          </div>
        </div>
    </li>`
        )
        .join('');

      favoritesEmpty.classList.add('favorites-visually-hidden');
      favoritesList.innerHTML = markup;
      favoritesList.classList.remove('favorites-visually-hidden');

      favoritesList.addEventListener('click', onExercisesClick);
    }
  } catch (error) {
    favoritesEmpty.classList.remove('favorites-visually-hidden');
    favoritesList.innerHTML = '';
    favoritesList.classList.add('favorites-visually-hidden');
  }
};

checkFavorites();
