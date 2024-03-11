const initPlayer = () => {
  const button = document.querySelector('[data-player="button"]');
  const container = document.querySelector('[data-player="container"]');
  const prevContainer = document.querySelector('[data-player="prev"]');
  let player = document.querySelector('[data-player="desktop"]');
  const breakpoint = window.matchMedia('(min-width: 768px)');


  if (!button || !container || !prevContainer) {
    return;
  }

  // const videoDesktop = container.querySelector('.video-inner__desktop');

  const onVideoClick = (e) => {
    e.preventDefault();
    container.classList.toggle('is-play');

    if (!player) {
      return;
    }

    if (container.classList.contains('is-play')) {
      setTimeout(() => {
        player.play();
      }, 0);
    } else {
      setTimeout(() => {
        player.pause();
      }, 0);
    }
  };

  const scrollHandler = () => {
    if (player) {
      setTimeout(() => {
        player.pause();
      }, 0);
    }
  };

  const initVideo = () => {
    // const YT = window.YT;

    // if (!YT) {
    //   return;
    // }

    // player = new window.YT.Player(videoDesktop, {
    //   videoId: videoDesktop.dataset.id,
    //   playerVars: {
    //     'rel': 0,
    //     'playsinline': 1,
    //   },
    //   events: {
    //     'onStateChange': () => {
    //       if (player.playerInfo.playerState === YT.PlayerState.PLAYING) {
    //         document.querySelector('.rotate-screen').classList.add('is-hidden');
    //       }

    //       if (player.playerInfo.playerState === YT.PlayerState.PAUSED) {
    //         document.querySelector('.rotate-screen').classList.remove('is-hidden');
    //       }
    //     },
    //     'onReady': () => {
    //       container.addEventListener('click', onVideoClick);
    //     },
    //   },
    // });

    document.addEventListener('scroll', scrollHandler);

    if (container) {
      container.addEventListener('click', onVideoClick);
    }
  };

  const setSource = (toggler) => {
    const videos = container.querySelectorAll('video');
    const set = toggler ? toggler : 'desktop';

    videos.forEach((item) => {
      if (item.getAttribute('data-src') === set) {
        item.src = item.getAttribute('data-video-src');
      } else {
        item.src = '';
      }
    });
  };

  const breakpointChecker = () => {
    if (breakpoint.matches) {
      setSource('desktop');
      // player = document.querySelector('[data-player="desktop"]');
    } else {
      // player = document.querySelector('[data-player="mobile"]');
      setSource('desktop');
    }
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
  initVideo();
};

export {initPlayer};
