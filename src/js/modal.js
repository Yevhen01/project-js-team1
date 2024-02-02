const exerciseModal = document.getElementById('exerciseModal');
const ratingModal = document.getElementById('ratingModal');
const closeExerciseModal = document.getElementById('closeExerciseModal');
const closeRatingModal = document.getElementById('closeRatingModal');
const addFavoriteBtn = document.getElementById('addFavoriteBtn');
const giveRatingBtn = document.getElementById('giveRatingBtn');

// Відкриття модального вікна для вправи
function openExerciseModal() {
  exerciseModal.style.display = 'block';
}

// Закриття модального вікна для вправи
closeExerciseModal.addEventListener('click', () => {
  exerciseModal.style.display = 'none';
});

// Відкриття модального вікна для рейтингу
function openRatingModal() {
  ratingModal.style.display = 'block';
}

// Закриття модального вікна для рейтингу
closeRatingModal.addEventListener('click', () => {
  ratingModal.style.display = 'none';
});

// Додавання вправи до Favorites
addFavoriteBtn.addEventListener('click', () => {
  // Логіка для додавання вправи до Favorites
});

// Відкриття модального вікна для рейтингу при кліку на кнопку Give a rating
giveRatingBtn.addEventListener('click', () => {
  openRatingModal();
  // Закриття модального вікна для вправи при відкритті модального вікна для рейтингу
  exerciseModal.style.display = 'none';
});

// Логіка для взаємодії з сервером при відправці рейтингу (необхідно додатково реалізувати)
document.getElementById('ratingForm').addEventListener('submit', event => {
  event.preventDefault();
  // Логіка для відправки рейтингу на сервер
  ratingModal.style.display = 'none'; // Закриття модального вікна для рейтингу
});
