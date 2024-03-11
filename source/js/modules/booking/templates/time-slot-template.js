export const timeSlotTemplate = ({id, interval}) => {
  // return `<button class="time-slot" type="button" data-time="slot" data-time-id=${id}>
  //           <span class="text text--small-caps">${interval.begin} — ${interval.end}</span>
  //         </button>`;
  return `<div class="time-slot" data-time="slot" data-time-id=${id}>
            <input class="visually-hidden" type="radio" value="${interval.begin} — ${interval.end}" id="time-${id}" name="time-choice">
            <label for="time-${id}">
            <span class="text text--small-caps">${interval.begin} — ${interval.end}</span>
            </label>
          </div>`;
};
