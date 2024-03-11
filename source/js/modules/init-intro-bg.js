const bgBlock = document.querySelector('[data-bg]');

const randomIntNumber = (max) => {
  return Math.floor(Math.random() * max);
};

const addBackground = () => {
  const img = bgBlock.querySelector('img');
  const imgSourceWebp = bgBlock.querySelector('source[type="image/webp"]');
  const imgSourceWidth = bgBlock.querySelector('source[media="(max-width: 767px)"]');

  if (bgBlock.hasAttribute('data-bg')) {
    const bgData = bgBlock.dataset.bg;
    const bgArray = JSON.parse(bgData);
    const rundomNumber = randomIntNumber(bgArray.length);

    img.src = bgArray[rundomNumber].main;
    img.srcset = bgArray[rundomNumber].big;
    imgSourceWebp.srcset = bgArray[rundomNumber].sourceWebp;
    imgSourceWidth.srcset = bgArray[rundomNumber].sourceWidth;
    img.style.opacity = '0.7';
  }
};

const initIntroBg = () => {
  if (!bgBlock) {
    return;
  }

  addBackground();
};

export {initIntroBg};
