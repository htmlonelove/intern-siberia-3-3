const breakpoint = matchMedia('(max-width: 767px)');

const breakpointChecker = () => {
  if (breakpoint.matches) {
    let browserHeight = window.innerHeight;
    document.documentElement.style.setProperty('--screen-height', `${browserHeight}px`);
  }
};

export const screenHeight = () => {
  breakpointChecker();
  window.addEventListener('resize', breakpointChecker);
};
