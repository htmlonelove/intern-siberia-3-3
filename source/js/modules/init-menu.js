import {ScrollLock} from '../utils/scroll-lock';
import {accordions} from './init-accordions';

const initMenu = () => {
  const btnToogle = document.querySelector('[data-menu-toggle-btn]');
  const header = document.querySelector('header');
  const scrollLock = new ScrollLock();
  const overlay = document.querySelector('.header__overlay');

  if (!btnToogle) {
    return;
  }

  const openMenu = () => {
    header.classList.add('is-active');
    scrollLock.disableScrolling();
  };

  const closeMenu = () => {
    header.classList.remove('is-active');
    scrollLock.enableScrolling();

    const activeMenuItem = header.querySelector('[data-accordion="element"].is-active');

    if (activeMenuItem) {
      accordions.closeAllAccordion(activeMenuItem.closest('[data-accordion="parent"]'));
    }
  };

  const onBtnToggleMenuClick = () => {
    if (!header) {
      return;
    }

    if (header.classList.contains('is-active')) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  btnToogle.addEventListener('click', onBtnToggleMenuClick);

  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }
};

export {initMenu};
