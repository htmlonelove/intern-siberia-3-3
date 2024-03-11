const videoModal = document.querySelector('[data-modal="video"]');
const video = videoModal ? videoModal.querySelector('video') : null;
const breakpoint = window.matchMedia('(min-width: 768px)');

const initDesktopVideo = () => {
  //
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    initDesktopVideo();
  } else {
    video.pause();
  }
};


const initModalVideo = () => {
  if (!videoModal) {
    return;
  }

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

export {initModalVideo};
