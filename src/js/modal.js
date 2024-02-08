const modalWindow = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-box');
const modalCloseBtn = document.querySelector('.modal-close');
const addToFavoritesBtn = modalWindow.querySelector('.js-btn-add');
const btnText = modalWindow.querySelector('.btn-text');
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let favorite = {};

function addListeners() {
  document.addEventListener('click', closeOnOutsideClick);
  document.addEventListener('keydown', closeOnEscape);
  modalCloseBtn.addEventListener('click', closeModalContainer);
}

function closeOnOutsideClick(e) {
  if (!modalContainer.contains(e.target)) closeModalContainer();
}

function closeOnEscape(e) {
  if (e.key === 'Escape') {
    closeModalContainer();
  }
}
function closeModalContainer() {
  modalWindow.classList.add('is-hidden');
  removeListeners();
}

function removeListeners() {
  modalCloseBtn.removeEventListener('click', closeModalContainer);
  document.removeEventListener('click', closeOnOutsideClick);
  document.removeEventListener('keydown', closeOnEscape);
}

addToFavoritesBtn.addEventListener('click', handleAddToFavorites);

export function openExerciseModal(exerciseDetails) {
  modalWindow.classList.remove('is-hidden');
  addListeners();
  modalWindow.querySelector('.modal-title').innerHTML = exerciseDetails.name;

  modalWindow.querySelector(
    '.modal-gif'
  ).style.backgroundImage = `linear-gradient(rgba(27, 27, 27, 0.2), rgba(27, 27, 27, 0.2)), url(${exerciseDetails.gifUrl})`;

  const modalRating = modalWindow.querySelector('.average-rating');
  const ratingValue = +exerciseDetails.rating;

  if (Number.isInteger(ratingValue)) {
    modalRating.textContent = ratingValue.toFixed(1);
  } else {
    modalRating.textContent = ratingValue;
  }

  modalWindow.querySelector('.modal-target').textContent =
    exerciseDetails.target;

  modalWindow.querySelector('.modal-dody-part').textContent =
    exerciseDetails.bodyPart;

  modalWindow.querySelector('.modal-equipment').textContent =
    exerciseDetails.equipment;

  modalWindow.querySelector('.modal-popular').textContent =
    exerciseDetails.popularity;

  modalWindow.querySelector('.modal-calories').textContent =
    exerciseDetails.burnedCalories;

  modalWindow.querySelector('.modal-description').textContent =
    exerciseDetails.description;

  const stars = modalWindow.querySelectorAll('.star-icon');

  for (let i = 0; i < stars.length; i++) {
    const ratingValue = Math.round(exerciseDetails.rating);
    const starSvg = stars[i].querySelector('.star-icon use');
    if (i < ratingValue) {
      starSvg.setAttribute('href', '../../img/icons.svg#icon-star-full');
    }
  }

  favorite = { ...exerciseDetails };

  const isFavorite = isExerciseInFavorites(exerciseDetails._id);
  btnText.textContent = isFavorite ? 'Remove from' : 'Add to Favorites';
}

function handleAddToFavorites() {
  const isFavorite = isExerciseInFavorites(favorite._id);

  if (isFavorite) {
    removeFromFavorites(favorite._id);
    btnText.textContent = 'Add to Favorites';
  } else {
    addToFavorites(favorite);
    btnText.textContent = 'Remove from';
  }
}

function addToFavorites(exerciseDetails) {
  const updatedFavorites = [...favorites, exerciseDetails];
  favorites = updatedFavorites;
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
}

export function removeFromFavorites(exerciseId) {
  const updatedFavorites = favorites.filter(
    exercise => exercise._id !== exerciseId
  );
  favorites = updatedFavorites;
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
}

function isExerciseInFavorites(exerciseId) {
  return (
    favorites.length > 0 &&
    favorites.map(exercise => exercise._id).includes(exerciseId)
  );
}
