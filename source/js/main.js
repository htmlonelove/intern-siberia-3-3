/* eslint-disable no-undef */
/* eslint-disable no-new */
import './utils/scroll-lock';
import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {initAdvantagesSlider} from './modules/sliders/init-advantages-slider';
import {initBathsSlider} from './modules/sliders/init-baths-slider';
import {initCuisineSlider} from './modules/sliders/init-cuisine-slider';
import {initBathSlider} from './modules/sliders/init-bath-slider';
import {initMap} from './modules/init-map';
import {initContactsMap} from './modules/init-contacts-map';
import {initMapModal} from './modules/init-map-modal';
import {initMenu} from './modules/init-menu';
import {initAccordions} from './modules/init-accordions';
import {initMoveTo} from './modules/init-move-to';
import {initModalAnimation} from './modules/init-modal-animation';
import {cookieConsentChecker} from './modules/cookie/cookie-consent-checker';
import {initBathGallery} from './modules/sliders/init-baths-img-slider';
import {initAnimation} from './modules/init-animation';
import {initIntroBg} from './modules/init-intro-bg';
import {initAnimateCircleText} from './modules/init-animate-circle-text';
import {initServiceSwiper} from './modules/sliders/init-service-swiper';
import {initValuesSwiper} from './modules/sliders/init-values-swiper';
import {initVideo} from './modules/init-video';
import {initReadMore} from './modules/init-read-more';
import {initRotateScreen} from './modules/init-rotate-screen';
import {initFixLabel} from './modules/form/init-fix-label';
// import {initVideoInner} from './modules/init-inner-video';
import {initTabs} from './modules/init-tabs';
import {initIntroSlider} from './modules/sliders/init-intro-slider';
import {initHeader} from './modules/init-header';
import {initInnerContactsMap} from './modules/init-inner-contacts-map';
import {initMobileSlider} from './modules/sliders/init-mobile-slider';
import {initPlayer} from './modules/init-player';
import {initContactsSlider} from './modules/sliders/init-contacts-slider';
import {screenHeight} from './modules/init-screen-height';
import {initCertificates} from './certificates/certificates';
import {Form} from './vendor/form-validate/form'; // подтягиваем Валидацию

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  initAccordions();
  initMenu();
  initIntroBg();
  screenHeight();
  initBathSlider();
  initBathsSlider();
  initAdvantagesSlider();
  initCuisineSlider();
  initMobileSlider();
  initAnimation();
  initModals();
  initModalAnimation();
  initVideo();
  initMap();
  initMapModal();
  initMoveTo();
  initIntroSlider();
  initAnimateCircleText();
  initCertificates();

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {

    const form = new Form();
    window.form = form;
    form.init();

    initRotateScreen();
    initContactsMap();
    initContactsSlider();
    cookieConsentChecker();
    initBathGallery();
    initServiceSwiper();
    initValuesSwiper();
    // initVideo();
    initReadMore();
    initFixLabel();
    initTabs();
    initHeader();
    initInnerContactsMap();
    initPlayer();
    initCertificates();
  });
});

