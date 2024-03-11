const contactsBlock = document.querySelector('.contacts');
const breakpoint = window.matchMedia('(min-width: 768px)');

const switchContent = () => {
  const contactsButton = document.querySelector('.contacts__button');
  const map = contactsBlock.querySelector('.contacts__map');
  const slider = contactsBlock.querySelector('.contacts__content');

  map.classList.toggle('is-active');
  slider.classList.toggle('is-active');
  contactsButton.classList.toggle('is-active');
};

const addListener = () => {
  const contactsButton = document.querySelector('.contacts__button');

  contactsButton.addEventListener('click', switchContent);
};

const removeListener = () => {
  const contactsButton = document.querySelector('.contacts__button');
  contactsButton.classList.remove('is-active');

  contactsButton.removeEventListener('click', switchContent);
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    addListener();
  } else {
    removeListener();
  }
};

const initContactsMap = () => {
  if (!contactsBlock) {
    return;
  }

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

export {initContactsMap};
