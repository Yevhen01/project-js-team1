// 1. firstLetterToUpper: Перетворює першу літеру в кожному слові рядка у верхній регістр.
// 2. compareDateWithToday: Порівнює дату з поточною датою.
// 3. setTime0: Встановлює час дати на 0.
// 4. splitArraytoParts: Розбиває масив на частини.

import _ from 'lodash';

export function firstLetterToUpper(str) {
  return str
    .split(' ')
    .map(m => m.charAt(0).toUpperCase() + m.slice(1).toLowerCase())
    .join(' ');
}

export function compareDateWithToday(timeStamp) {
  return timeStamp === new Date().setHours(0, 0, 0, 0) ? true : false;
}

export function setTime0(date) {
  return new Date(date).setHours(0, 0, 0, 0);
}

export function splitArraytoParts(arrayData, count) {
  return _.chunk(arrayData, count);
}