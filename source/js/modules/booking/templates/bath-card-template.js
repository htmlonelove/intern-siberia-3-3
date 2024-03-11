

export const bathCardTemplate = (bath) => {
  return `<div class="bath-option" data-min=${bath.guest.min} data-max=${bath.guest.max} data-guest-min=${bath.guestMin}>
            <input class="visually-hidden" type="radio" value=${bath.id} id=${bath.id} name="bath-choice">
            <label for=${bath.id}>
              <span class="bath-option__wrapper">
                <span class="bath-option__img">
                  <picture>
                    <source type="image/webp" media="(max-width: 767px)" srcset=${bath.cover.mobile.webp}, ${bath.cover.mobile.webp2x} 2x">
                    <source media="(max-width: 767px)" srcset=${bath.cover.mobile.jpg}, ${bath.cover.mobile.jpg2x} 2x">
                    <source type="image/webp" srcset=${bath.cover.desktop.webp}, ${bath.cover.desktop.webp2x} 2x">
                    <img src=${bath.cover.desktop.jpg}" srcset=${bath.cover.desktop.jpg2x} 2x" width="818" height="513" alt=${bath.name}>
                  </picture>
                </span>
                <span class="bath-option__icon">
                  <svg width="20" height="20" aria-hidden="true">
                    <use xlink:href="#icon-check"></use>
                  </svg>
                </span>
                <span class="bath-option__title title title--xxs-3">${bath.name}</span>
                <span class="bath-option__row"><span class="bath-option__info">
                  <span class="text text--small">Количество гостей</span>
                  <span class="text text--body-medium-1 text--color-not-opacity">${bath.guest.min} — ${bath.guest.max}</span>
                </span>
                <span class="bath-option__info">
                  <span class="text text--small">Стоимость</span>
                  <span class="text text--body-medium-1 text--color-not-opacity">
                    <span>${bath.price}</span></span>
                  </span>
                </span>
                <span class="bath-option__message">
                  <span class="bath-option__message-date text text--small">Баня недоступна для&nbsp;бронирования
                    <span data-error-date> 15 сентября</span>
                  </span>
                  <span class="bath-option__message-guests text text--small">Баня недоступна для&nbsp;бронирования при&nbsp;указанном количестве гостей</span>
                  <span class="bath-option__message-time text text--small">Баня недоступна для&nbsp;бронирования в&nbsp;указанный временной интервал</span>
                </span>
              </span>
              <a class="link text text--small-caps-3" href="#" data-open-modal="bath">Подробнее о бане</a>
            </label>
          </div>`;
};
