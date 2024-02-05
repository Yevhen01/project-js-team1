import { getFilter, getExercises } from './fitnesapi';

const refs = {
  musclesBtn: document.querySelector('.muscles-btn'),
  bodyPartsBtn: document.querySelector('.body-parts-btn'),
  equipmentBtn: document.querySelector('.equipment-btn'),
  paginationFilter: document.querySelector('.pagination-filter'),
  exercisesTitle: document.querySelector('.exercises-title-filter'),
  exercisesList: document.querySelector('.exercises-list'),
  filterList: document.querySelector('.filter-list'),
  searchForm: document.querySelector('.search-form'),
};

refs.musclesBtn.addEventListener('click', () =>
  onFilterClick(refs.musclesBtn, 'Muscles')
);
refs.bodyPartsBtn.addEventListener('click', () =>
  onFilterClick(refs.bodyPartsBtn, 'Body parts')
);
refs.equipmentBtn.addEventListener('click', () =>
  onFilterClick(refs.equipmentBtn, 'Equipment')
);
window.addEventListener('load', () =>
  onFilterClick(refs.musclesBtn, 'Muscles')
);

let currentPage = 1;
let totalPages = 1;

function renderMarkup(data) {
  refs.exercisesList.innerHTML = '';
  refs.searchForm.style.display = 'none';
  const markup = data
    .map(
      item => `
    <li class="filter-list-item"  data-filter="${item.filter}" data-name="${item.name}">
      <img src="${item.imgUrl}" />
      <div class="overlay">
        <p class="filter-list-item-name">${item.name}</p>
        <p class="filter-name">${item.filter}</p>
      </div>
    </li>`
    )
    .join('');

  refs.filterList.innerHTML = markup;
  data.forEach(item => attachClickEventToItem(item));
}

function renderPaginationButton(i, filter) {
  const button = document.createElement('button');
  button.classList.add('pagination-btn');
  button.innerText = i;
  button.addEventListener('click', event => onPageClick(i, filter, event));
  return button;
}

function renderPagination(filter) {
  const paginationFilter = refs.paginationFilter;

  if (totalPages > 1) {
    paginationFilter.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const button = renderPaginationButton(i, filter);
      paginationFilter.appendChild(button);
    }

    const activeButton = paginationFilter.querySelector(
      `.pagination-btn:nth-child(${currentPage})`
    );

    if (activeButton) {
      activeButton.classList.add('active');
    }
  } else {
    paginationFilter.innerHTML = '';
  }
}

async function onPageClick(page, filter, event) {
  const clickedButton = event.currentTarget;
  const currentActiveButton = document.querySelector('.pagination-btn.active');

  if (currentActiveButton) {
    currentActiveButton.classList.remove('active');
  }

  clickedButton.classList.add('active');
  currentPage = page;

  try {
    const { data } = await getFilter(filter, currentPage);
    renderMarkup(data.results);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  } catch (error) {
    console.log(error);
  }
}

async function onFilterClick(clickedBtn, filter) {
  currentPage = 1;
  refs.exercisesTitle.innerHTML = '';
  document
    .querySelectorAll('.exercises-btn')
    .forEach(btn => btn.classList.remove('active'));
  clickedBtn.classList.add('active');

  try {
    const { data, fetchedPage, fetchedTotalPages } = await getFilter(filter);
    currentPage = fetchedPage;
    totalPages = fetchedTotalPages;
    renderMarkup(data.results);
    renderPagination(filter);
  } catch (error) {
    console.log(error);
  }
}

async function onItemClickGetExercises(filterListItem) {
  let filter = filterListItem.dataset.filter.toLowerCase();

  if (filter === 'body parts') {
    filter = 'bodypart';
  }

  const value = filterListItem.dataset.name;
  refs.exercisesTitle.innerHTML = ` /<span class="exercises-title-grey"> ${value}</span>`;
  let page = 1;
  try {
    const data = await getExercises(page, filter, value);
    renderMarkupExrcises(data.results);
    refs.searchForm.addEventListener('submit', event =>
      onExercisesSearch(event, filter, value)
    );
    renderExercisesPagination(data.totalPages, filter, value);
  } catch (error) {
    console.log(error);
  }
}

function renderExercisesPagination(totalPages, filter, value, keyword) {
  const paginationExercises = refs.paginationFilter;

  if (totalPages > 1 && totalPages <= 3) {
    paginationExercises.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const button = renderPaginationButtonExercises(i, filter, value, keyword);
      if (i === 1) {
        button.classList.add('active');
      }
      paginationExercises.appendChild(button);
    }
  } else if (totalPages > 3) {
    totalPages = 3;
    paginationExercises.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
      const button = renderPaginationButtonExercises(i, filter, value, keyword);
      if (i === 1) {
        button.classList.add('active');
      }
      paginationExercises.appendChild(button);
    }
  } else {
    paginationExercises.innerHTML = '';
  }
}

function renderPaginationButtonExercises(i, filter, value, keyword) {
  const button = document.createElement('button');
  button.classList.add('pagination-btn');
  button.innerText = i;
  button.addEventListener('click', event =>
    onPageClickExercises(i, filter, event, value, keyword)
  );
  return button;
}

async function onPageClickExercises(page, filter, event, value, keyword) {
  const clickedButton = event.currentTarget;

  const currentActiveButton = document.querySelector('.pagination-btn.active');

  if (currentActiveButton) {
    currentActiveButton.classList.remove('active');
  }

  clickedButton.classList.add('active');

  try {
    const data = await getExercises(page, filter, value, keyword);
    renderMarkupExrcises(data.results);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  } catch (error) {
    console.log(error);
  }
}

function renderMarkupExrcises(data) {
  refs.filterList.innerHTML = '';
  refs.searchForm.style.display = 'block';
  const markup = data
    .map(
      item => `
   <li class="exercises-item" data-id="${item._id}">
      ${item.name}
    </li>`
    )
    .join('');

  refs.exercisesList.innerHTML = markup;
}

function attachClickEventToItem(item) {
  const filterListItem = document.querySelector(
    `[data-filter="${item.filter}"][data-name="${item.name}"]`
  );
  filterListItem.addEventListener('click', () =>
    onItemClickGetExercises(filterListItem)
  );
}

function onExercisesSearch(event, filter, value) {
  event.preventDefault();
  const searchValue =
    refs.searchForm.elements['search-exercises'].value.toLowerCase();
  filterExercisesBySearch(filter, value, searchValue);
}

async function filterExercisesBySearch(filter, value, keyword) {
  if (keyword === '') {
    return;
  }
  let page = 1;
  try {
    const data = await getExercises(page, filter, value, keyword);
    if (data.results.length !== 0) {
      renderMarkupExrcises(data.results);
      renderExercisesPagination(data.totalPages, filter, value, keyword);
    } else {
      refs.paginationFilter.innerHTML = '';
      refs.exercisesList.innerHTML = `<li>Unfortunately, no results were found. You may want to consider other search options to find the exercise you are looking for. Our range is wide and you have the opportunity to find more options that suit your needs.</li>`;
    }
  } catch (error) {
    console.log(error);
  } finally {
    refs.searchForm.reset();
  }
}
