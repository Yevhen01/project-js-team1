const modalWindow = document.querySelector('.modal');
const modalContainer = document.querySelector('.modal-box');
const modalCloseBtn = document.querySelector('.modal-close');

modalCloseBtn.addEventListener('click', closeModalContainer);

document.addEventListener('click', function (e) {
  if (!modalContainer.contains(e.target)) closeModalContainer();
});

function closeModalContainer() {
  modalWindow.classList.add('is-hidden');
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeModalContainer();
  }
});

export function openExerciseModal(exerciseDetails) {
  console.log(exerciseDetails);
  modalWindow.classList.remove('is-hidden');
  modalWindow.querySelector('.modal-title').innerHTML = exerciseDetails.name;
  modalWindow.querySelector(
    '.modal-gif'
  ).style.backgroundImage = `linear-gradient(rgba(27, 27, 27, 0.2), rgba(27, 27, 27, 0.2)), url(${exerciseDetails.gifUrl})`;
  modalWindow.querySelector('.average-rating').innerHTML =
    exerciseDetails.rating;
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

  const ratingValue = Math.round(exerciseDetails.rating);
  const stars = modalWindow.querySelectorAll('.star-icon');

  for (let i = 0; i < stars.length; i++) {
    const starSvg = stars[i].querySelector('.star-icon use');
    if (i < ratingValue) {
      starSvg.setAttribute('href', '../img/icons.svg#icon-star-full');
    } else {
      starSvg.setAttribute('href', '../img/icons.svg#icon-star');
    }
  }
}
