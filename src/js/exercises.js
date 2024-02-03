import { getFilter, getExercises } from './fitnesapi';

const refs = {
  musclesBtn: document.querySelector('.muscles-btn'),
  bodyPartsBtn: document.querySelector('.body-parts-btn'),
  equipmentBtn: document.querySelector('.equipment-btn'),
  paginationFilter: document.querySelector('.pagination-filter'),
  exercisesTitle: document.querySelector('.exercises-title-filter'),
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

let currentPage = 1;
let totalPages = 1;

window.addEventListener('load', () =>
  onFilterClick(refs.musclesBtn, 'Muscles')
);

function renderMarkup(data) {
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

  document.querySelector('.filter-list').innerHTML = markup;
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
    renderExercisesPagination(data.totalPages, filter, value);
  } catch (error) {
    console.log(error);
  }
}

function renderExercisesPagination(totalPages, filter, value) {
  const paginationExercises = document.querySelector('.pagination-filter');

  if (totalPages > 1) {
    paginationExercises.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
      const button = renderPaginationButtonExercises(i, filter, value);
      if (i === 1) {
        button.classList.add('active');
      }
      paginationExercises.appendChild(button);
    }
  } else {
    paginationExercises.innerHTML = '';
  }
}

function renderPaginationButtonExercises(i, filter, value) {
  const button = document.createElement('button');
  button.classList.add('pagination-btn');
  button.innerText = i;
  button.addEventListener('click', event =>
    onPageClickExercises(i, filter, event, value)
  );
  return button;
}

async function onPageClickExercises(page, filter, event, value) {
  const clickedButton = event.currentTarget;

  const currentActiveButton = document.querySelector('.pagination-btn.active');

  if (currentActiveButton) {
    currentActiveButton.classList.remove('active');
  }

  clickedButton.classList.add('active');

  try {
    const data = await getExercises(page, filter, value);
    renderMarkupExrcises(data.results);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 50);
  } catch (error) {
    console.log(error);
  }
}

function renderMarkupExrcises(data) {
  document.querySelector('.filter-list').innerHTML = '';
  const markup = data
    .map(
      item => `
   <li class="exercises-item" data-id="${item._id}">
      ${item.name}
    </li>`
    )
    .join('');

  document.querySelector('.filter-list').innerHTML = markup;
}

function attachClickEventToItem(item) {
  const filterListItem = document.querySelector(
    `[data-filter="${item.filter}"][data-name="${item.name}"]`
  );
  filterListItem.addEventListener('click', () =>
    onItemClickGetExercises(filterListItem)
  );
}
