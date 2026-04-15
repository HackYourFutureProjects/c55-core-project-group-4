export const initMobileMenu = () => {
  const mobMenu = document.querySelector('.mob-menu');
  const closeMenuBtn = document.querySelector('.close-btn-menu');
  const openMenuBtn = document.querySelector('.header-btn-menu');
  const linkMobMenu = document.querySelectorAll('.mob-nav-list-item');

  const openMobMenu = () => {
    mobMenu.classList.add('is-open-menu');
    document.body.classList.add('no-scroll');
  };
  const closeMobMenu = () => {
    mobMenu.classList.remove('is-open-menu');
    document.body.classList.remove('no-scroll');
    openMenuBtn.blur();
  };

  openMenuBtn.addEventListener('click', openMobMenu);
  closeMenuBtn.addEventListener('click', closeMobMenu);
  linkMobMenu.forEach((link) => {
    link.addEventListener('click', closeMobMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobMenu();
    }
  });
};
