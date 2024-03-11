const initReadMore = () => {
  const readMoreBlock = document.querySelector('[data-read-more="block"]');
  const readMoreBtns = document.querySelectorAll('[data-read-more="button"]');

  if (!readMoreBlock || !readMoreBtns) {
    return;
  }

  const onReadMoreBtnClick = (evt) => {
    readMoreBlock.classList.toggle('is-active');
    evt.currentTarget.blur();
  };

  readMoreBtns.forEach((button) => {
    button.addEventListener('click', onReadMoreBtnClick);
  });

};

export {initReadMore};
