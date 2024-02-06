import axios from 'axios';

const modalTarget = document.querySelector('.exercises-list');
const exercisesModal = document.querySelector('.modal');
const btnClose = document.querySelector('.modal-close');
const btnFavorites = document.querySelector('.js-btn-add');

modalTarget.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);

function openModal(e) {
  e.preventDefault();
  exercisesModal.classList.remove('is-hidden');
  getExercisesInfo();
}

function getExercisesInfo() {
  const BASE_URL = 'https://energyflow.b.goit.study/api';
  const END_POINT = '/exercises/';
  const url = BASE_URL + END_POINT;

  const params = {
    exercisesID: exercises.results._id,
  };
  return axios.get(url, { params }).then(res => res.data);
}

function closeModal(e) {
  e.preventDefault();
  exercisesModal.classList.add('is-hidden');
}
