(() => {
  const refs = {
    pageHeader: document.querySelector('#page-header'),
    toggleMenuBtn: document.querySelector('#toggle-mobile-menu-btn'),
    menu: document.querySelector('#mobile-menu-container'),
    navLinks: document.querySelectorAll('.page-nav-link'),
    openMenuSvg: document.querySelector('#icon-burger'),
    closeMenuSvg: document.querySelector('#icon-close'),
    logo: document.querySelector('.logo'),
  };

  refs.toggleMenuBtn.addEventListener('click', toggleMenu);
  refs.navLinks.forEach(navLink => {
    navLink.addEventListener('click', closeMenu);
  });

  function closeMenu() {
    refs.menu.classList.add('is-hidden');
    refs.pageHeader.classList.remove('fixed');
    refs.closeMenuSvg.classList.add('is-hidden');
    refs.openMenuSvg.classList.remove('is-hidden');
    refs.logo.classList.remove('is-hidden');
  }

  function toggleMenu() {
    refs.pageHeader.classList.toggle('fixed');
    refs.menu.classList.toggle('is-hidden');
    refs.closeMenuSvg.classList.toggle('is-hidden');
    refs.openMenuSvg.classList.toggle('is-hidden');
    refs.logo.classList.toggle('is-hidden');
  }
})();

// ====================================

//
