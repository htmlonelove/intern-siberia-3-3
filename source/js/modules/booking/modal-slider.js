import {initSlider} from '../sliders/init-baths-img-slider';
import {initSwiper} from '../sliders/init-mobile-slider';

export const modalSlider = (sliders, wrapper, breakpoint) => {
  const breakpointChecker = () => {
    if (breakpoint.matches) {
      if (sliders) {
        sliders.map((el) => {
          el.destroy(true, true);
        });
      }

      initSlider(wrapper);
    } else {
      if (sliders) {
        sliders.map((el) => {
          el.destroy(true, true);
        });
      }

      initSwiper(wrapper);
    }
  };

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};
