import axios from 'axios';

const refs = {
  musclesBtn: document.querySelector('.muscles-btn'),
  bodyPartsBtn: document.querySelector('.body-parts-btn'),
  equipmentBtn: document.querySelector('.equipment-btn'),
  paginationFilter: document.querySelector('.pagination-filter'),
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

const windowWidth = 768;
let currentPage = 1;
let totalPages = 1;
let limit = 8;

window.addEventListener('load', () =>
  onFilterClick(refs.musclesBtn, 'Muscles')
);

async function getFilter(filter) {
  const url = 'https://energyflow.b.goit.study/api/filters';
  if (window.screen.width > windowWidth) {
    limit = 12;
  }
  const response = await axios.get(url, {
    params: { filter, page: currentPage, limit },
  });

  currentPage = response.data.page;
  totalPages = response.data.totalPages;
  return response.data;
}

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
    const data = await getFilter(filter, currentPage);
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
  document
    .querySelectorAll('.exercises-btn')
    .forEach(btn => btn.classList.remove('active'));
  clickedBtn.classList.add('active');

  try {
    const data = await getFilter(filter);
    renderMarkup(data.results);
    renderPagination(filter);
  } catch (error) {
    console.log(error);
  }
}
