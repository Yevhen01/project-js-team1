// ==================================================

// document.addEventListener('DOMContentLoaded', () => {
//   const path = window.location.pathname;
//   const page = path === '/' ? 'index.html' : path.split('/').pop();
//   const links = document.querySelectorAll('.page-nav-list a');

//   links.forEach(link => {
//     const href = link.getAttribute('href');
//     if (href.includes(page)) {
//       link.classList.add('current');
//     }
//   });
// });

// ====================================================
// ====================================================

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const page = path === '/' ? 'index.html' : path.split('/').pop();
  const links = document.querySelectorAll('.page-nav-list a');

  links.forEach(link => {
    const href = link.getAttribute('href');

    if (href.includes(page)) {
      link.classList.add('current');
    } else {
      link.classList.remove('current');
    }
  });
});
