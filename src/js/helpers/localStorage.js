// імпорт класу ExercisesController та дві допоміжні функції
// створюю екземпляр класу ExercisesController та ініціалізую дані про вправи
// оголошую змінну storageKeys з ключами для зберігання даних в локальному сховищі

import { ExercisesController } from '../favoritesapi/EcersisesController.js';
import { setTime0, compareDateWithToday } from './utils';
const exerciseCntrl = new ExercisesController();
const exercise = exerciseCntrl.init();


export const storageKeys = {
  FAVORITE_EXERCISE: 'favorite-exercise',
  QUOTE: 'quote',
};

// зберігаю вправу (data) як улюблену в локальному сховищі браузера
export function addExerciseToFavorite(
    data,
    storageKey = storageKeys.FAVORITE_EXERCISE
  ) {
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify([data]));
    } else {
      const localStorageArray = JSON.parse(localStorage.getItem(storageKey));
      localStorageArray.push(data);
      localStorage.setItem(storageKey, JSON.stringify(localStorageArray));
    }
  }
//   видаляю вправу з улюблених на основі її унікального ID (exerciseId).
  export function removeExerciseFromFavoriteById(
    exerciseId,
    storageKey = storageKeys.FAVORITE_EXERCISE
  ) {
    if (!localStorage.getItem(storageKey)) return;
  
    let lStorage = parseLocalStorageByKey(storageKey);
    if (lStorage.length > 0) {
      let updArray = lStorage.filter(s => {
        return s._id !== exerciseId;
      });
      localStorage.setItem(storageKey, JSON.stringify(updArray));
      if (updArray.length === 0) {
        localStorage.removeItem(storageKey);
      }
    }
  }

//   отримую всі улюблені вправи як масив з заданого ключа сховища (за замовчуванням FAVORITE_EXERCISE).
  export function getFavoritCardsFromLocalStorage(
    storageKey = storageKeys.FAVORITE_EXERCISE
  ) {
    return parseLocalStorageByKey(storageKey);
  }
  
  export function getFavoritCardFromLocalStorageById(
    exerciseId,
    storageKey = storageKeys.FAVORITE_EXERCISE
  ) {
    return parseLocalStorageByKey(storageKey).filter(c => {
      return c._id === exerciseId;
    })[0];
  }
  
//   перевірка вправи з заданим ID в списку улюблених.
  export function isExerciseInFavorite(
    exerciseId,
    storageKey = storageKeys.FAVORITE_EXERCISE
  ) {
    if (!localStorage.getItem(storageKey)) return false;
  
    let lStorage = parseLocalStorageByKey(storageKey);
    if (lStorage.length > 0) {
      const isExercise = lStorage.filter(s => {
        return s._id === exerciseId;
      });
      return isExercise.length > 0 ? true : false;
    } else {
      return false;
    }
  }

// додаєм цитату до сховища браузера
async function addQuoteToStorage() {
    const quote = (await (await exercise).getQuote()).json();
    quote.timeStamp = setTime0(new Date());
    localStorage.setItem(storageKeys.QUOTE, JSON.stringify(quote));
  }
  
// отримує цитату з сховища браузера
  export async function getQuote() {
    if (!localStorage.getItem(storageKeys.QUOTE)) {
      await addQuoteToStorage();
    } else {
      const timeStampOldQuote = JSON.parse(
        localStorage.getItem(storageKeys.QUOTE)
      ).timeStamp;
      if (!compareDateWithToday(timeStampOldQuote)) {
        const newQuote = (await (await exercise).getQuote()).json();
        newQuote.timeStamp = setTime0(new Date());
        localStorage.setItem(storageKeys.QUOTE, JSON.stringify(newQuote));
      }
      const { author, quote } = JSON.parse(
        localStorage.getItem(storageKeys.QUOTE)
      );
      return {
        author,
        quote,
      };
    }
  }
  
  function parseLocalStorageByKey(storageKey) {
    try {
      return JSON.parse(localStorage.getItem(storageKey));
    } catch (error) {
      console.error('Parsing Error');
    }
  }
  