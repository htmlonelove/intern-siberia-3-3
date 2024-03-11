const calendar = document.querySelector('[data-calendar]');
let flatpickr;
let startX = null;
let endX = null;
let startY = null;
let endY = null;

const onTouchStart = (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;

  document.addEventListener('touchmove', onTouchMove);
};

const getDeltaX = () => {
  return startX - endX;
};

const getDeltaY = () => {
  return startY - endY;
};

const onTouchEnd = (e) => {
  e.preventDefault();

  if (Math.abs(getDeltaX()) < Math.abs(getDeltaY())) {
    return;
  }

  if (getDeltaX() > 0) {
    flatpickr.changeMonth(1);
  } else {
    flatpickr.changeMonth(-1);
  }

  document.removeEventListener('touchmove', onTouchMove);
};

const onTouchMove = (e) => {
  e.preventDefault();

  endX = e.touches[0].clientX;
  endY = e.touches[0].clientY;
};

export const initCalendarSwipe = (flatpickrInstance) => {
  if (!calendar) {
    return;
  }

  flatpickr = flatpickrInstance;

  calendar.addEventListener('touchstart', onTouchStart);
  window.addEventListener('touchend', onTouchEnd);
};
