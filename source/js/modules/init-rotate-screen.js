import {ScrollLock} from '../utils/scroll-lock';

const scrollLock = new ScrollLock();

const initRotateScreen = () => {
  const rotateScreen = document.querySelector('.rotate-screen');
  const header = document.querySelector('.header');
  let scroll = null;

  if (!rotateScreen) {
    return;
  }

  const scrollHandler = () => {
    scroll = window.scrollY;
  };

  const checkOrientation = () => {
    const video = document.querySelector('[data-rotate-video]');
    const breakpointHeight = window.matchMedia('(max-height:550px)');
    const breakpointWidth = window.matchMedia('(max-width:1000px)');
    let isPlay = video ? video.classList.contains('is-play') : false;

    if (isPlay) {
      return;
    }

    if (rotateScreen.classList.contains('is-hidden')) {
      return;
    }

    if (!breakpointHeight.matches || !breakpointWidth.matches) {
      // rotateScreen.style.display = 'none';
      if (!rotateScreen.classList.contains('is-shown')) {
        return;
      }

      rotateScreen.classList.remove('is-shown');
      if (document.body.classList.contains('scroll-lock') || document.body.classList.contains('scroll-lock-ios') && !header.classList.contains('is-active')) {
        scrollLock.enableScrolling();
        window.scrollTo(0, scroll);
        window.addEventListener('scroll', scrollHandler);

        setTimeout(() => {
          header.classList.remove('is-hidden');
        }, 10);
      }

      return;
    }

    const orientation = (window.innerHeight < window.innerWidth) ? 'landscape-primary' : 'portrait-primary';

    if (orientation === 'landscape-primary') {
      window.removeEventListener('scroll', scrollHandler);
      // rotateScreen.style.display = 'flex';

      rotateScreen.classList.add('is-shown');

      scrollLock.disableScrolling();

      if (header) {
        header.classList.add('is-hidden');
      }
    } else {
      // rotateScreen.style.display = 'none';
      if (!rotateScreen.classList.contains('is-shown')) {
        return;
      }
      rotateScreen.classList.remove('is-shown');
      if (document.body.classList.contains('scroll-lock') || document.body.classList.contains('scroll-lock-ios')) {
        window.addEventListener('scroll', scrollHandler);
        scrollLock.enableScrolling();
        window.scrollTo(0, scroll);

        setTimeout(() => {
          header.classList.remove('is-hidden');
        }, 10);
      }
    }
  };

  checkOrientation();
  window.addEventListener('resize', checkOrientation);
  window.addEventListener('scroll', scrollHandler);
};

export {initRotateScreen};
