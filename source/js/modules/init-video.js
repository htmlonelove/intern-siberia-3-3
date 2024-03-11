const videoBlock = document.querySelector('.video');
const breakpoint = window.matchMedia('(min-width: 1024px)');

const clickHandler = () => {
  const cover = videoBlock.querySelector('.video__cover');
  const videoPlayer = videoBlock.querySelector('.video__mobile');

  videoBlock.removeAttribute('style');
  videoBlock.classList.remove('is-open');

  if (!cover.classList.contains('is-hidden')) {
    cover.classList.add('is-hidden');
    videoPlayer.play();
  }
};

const scrollHandler = () => {
  const video = videoBlock.querySelector('.video__mobile');

  if (video.played) {
    video.pause();
  }
};

const initDesktopVideo = () => {
  videoBlock.removeEventListener('click', clickHandler);
  videoBlock.removeEventListener('scroll', scrollHandler);

  const cover = videoBlock.querySelector('.video__cover');
  cover.classList.remove('is-hidden');
  videoBlock.removeAttribute('style');
  videoBlock.classList.remove('is-open');

  videoBlock.querySelector('.video__desktop').src = videoBlock.querySelector('.video__desktop').dataset.src;
};

const initMobileVideo = () => {
  const videoPlayer = videoBlock.querySelector('.video__mobile');
  videoPlayer.src = videoPlayer.dataset.src;

  videoBlock.addEventListener('click', clickHandler);
  document.addEventListener('scroll', scrollHandler);
  videoPlayer.currentTime = 0;
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    initDesktopVideo();
  } else {
    initMobileVideo();
  }
};

const initVideo = () => {
  if (!videoBlock) {
    return;
  }

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

export {initVideo};
