// Fetch http requests to the server side
import axios from 'axios';

const windowWidth = 768;
let limit = 8;

export async function getFilter(filter, currentPage) {
  const url = 'https://energyflow.b.goit.study/api/filters';

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

export async function getExercises(page, filter, value) {
  const url = 'https://energyflow.b.goit.study/api/exercises';
  if (window.screen.width > windowWidth) {
    limit = 9;
  }

  const response = await axios.get(url, {
    params: { [filter]: value, page, limit },
  });

  return response.data;
}
