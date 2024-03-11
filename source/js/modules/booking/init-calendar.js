import {initCalendarSwipe} from './calendar-swipe';
import {timeSlotTemplate} from './templates/time-slot-template';
import {renderElement} from './utils';

const calendarBlock = document.querySelector('[data-calendar]');
const container = document.querySelector('[data-time="parent"]');
const breakpoint = window.matchMedia('(min-width: 768px)');
let maxDays = 61;
let calendar;

const renderCalnedar = (disabledDates, firstStep, timeSlots) => {
  const input = calendarBlock.querySelector('input');
  const nextArrowSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">  <path d="M10 17.5L15 12.5M10 17.5L5 12.5M10 17.5L10 1.66669" stroke="currentColor" stroke-linecap="round"/>  </svg>';
  const prevArrowSvg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 17.5L15 12.5M10 17.5L5 12.5M10 17.5L10 1.66669" stroke="currentColor" stroke-linecap="round"/></svg>';
  let flag = true;

  const renderTimesSlots = () => {
    timeSlots.forEach((element) => {
      const el = timeSlotTemplate(element);

      renderElement(container, el);
    });
  };

  if (calendar && firstStep === 'bath') {
    calendar.destroy();
  }

  // eslint-disable-next-line no-undef
  flatpickr.localize(flatpickr.l10ns.ru);

  // eslint-disable-next-line no-unused-vars, no-undef
  calendar = flatpickr(input, {
    inline: true,
    conjunction: ' - ',
    dateFormat: 'Y-m-d',
    minDate: 'today',
    maxDate: new Date().fp_incr(maxDays),
    disable: disabledDates,
    nextArrow: nextArrowSvg,
    prevArrow: prevArrowSvg,
    monthSelectorType: 'static',
    disableMobile: false,
    position: 'auto center',

    onChange: () => {
      if (flag) {
        let activeTime;
        let id;

        if (container.querySelector('input:checked')) {
          activeTime = container.querySelector('input:checked').closest('[data-time="slot"]');
          id = activeTime.dataset.timeId;
        }

        container.innerHTML = '';
        renderTimesSlots();

        if (activeTime && !container.querySelector(`[data-time-id="${id}"]`).hasAttribute('disabled')) {
          container.querySelector(`[data-time-id="${id}"] input`).checked = true;
        }

        flag = false;
      }

      if (!breakpoint.matches) {
        window.accordions.updateAccordionsHeight();
      }
    },
  });

  initCalendarSwipe(calendar);
};

const initCalendar = (disabledDates, firstStep, timeSlots) => {
  if (!calendarBlock) {
    return;
  }

  renderCalnedar(disabledDates, firstStep, timeSlots);
};

export {initCalendar};
