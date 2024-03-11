const videoBlock = document.querySelector('.video-inner');
// const video = videoBlock ? videoBlock.querySelector('video') : null;
const breakpoint = window.matchMedia('(min-width: 768px)');
let video;

const clickHandler = () => {
  video = breakpoint.matches ? videoBlock.querySelector('.video-inner__desktop') : videoBlock.querySelector('.video-inner__mobile');

  if (video.paused) {
    video.play();
  }
};

const scrollHandler = () => {
  video = breakpoint.matches ? videoBlock.querySelector('.video-inner__desktop') : videoBlock.querySelector('.video-inner__mobile');

  if (video.played) {
    video.pause();
  }
};

const initDesktopVideo = () => {
  if (!videoBlock) {
    return;
  }

  videoBlock.removeEventListener('click', clickHandler);
  videoBlock.removeEventListener('scroll', scrollHandler);

  video = videoBlock.querySelector('.video-inner__mobile');

  if (video.played) {
    video.pause();
  }

  video.currentTime = 0;
};

const initMobileVideo = () => {
  if (!videoBlock) {
    return;
  }

  videoBlock.addEventListener('click', clickHandler);
  document.addEventListener('scroll', scrollHandler);

  video = videoBlock.querySelector('.video-inner__mobile');

  video.currentTime = 0;
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    initDesktopVideo();
  } else {
    initMobileVideo();
  }
};

const initVideoInner = () => {
  // if (!videoBlock) {
  //   return;
  // }

  // breakpoint.addListener(breakpointChecker);
  // breakpointChecker();
};

export {initVideoInner};
