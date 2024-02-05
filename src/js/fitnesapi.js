// Fetch http requests to the server side
import axios from 'axios';

const BASE_URL = 'https://energyflow.b.goit.study/api';
const windowWidth = 768;
let limit = 8;

export async function getFilter(filter, currentPage) {
  const url = `${BASE_URL}/filters`;

  if (window.screen.width > windowWidth) {
    limit = 12;
  }

  const response = await axios.get(url, {
    params: { filter, page: currentPage, limit },
  });

  const fetchedPage = response.data.page;
  const fetchedTotalPages = response.data.totalPages;

  return { data: response.data, fetchedPage, fetchedTotalPages };
}

export async function getExercises(page, filter, value, keyword) {
  const url = `${BASE_URL}/exercises`;
  if (window.screen.width > windowWidth) {
    limit = 9;
  }
  let response;
  if (keyword === undefined) {
    response = await axios.get(url, {
      params: { [filter]: value, page, limit },
    });
  } else {
    response = await axios.get(url, {
      params: { [filter]: value, page, limit, keyword },
    });
  }

  return response.data;
}
