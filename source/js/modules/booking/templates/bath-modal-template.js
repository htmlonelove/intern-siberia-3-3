const createSliderMarkup = (slidesMob, slidesDesktop) => {
  return slidesMob.map((slide, index) => {
    return `<div class="bath-card__slide swiper-slide">
              <picture>
                <source media="(max-width: 767px)" srcset=${slide.webp}, ${slide.webp2x} 2x">
                <source type="image/webp" media="(max-width: 767px)" srcset=${slide.jpg}, ${slide.jpg2x} 2x">
                <source type="image/webp" srcset=${slidesDesktop[index].webp}, ${slidesDesktop[index].webp2x} 2x">
                <img src=${slidesDesktop[index].jpg}" srcset=${slidesDesktop[index].jpg2x} 2x" width="600" height="480" alt="Слайд 1">
              </picture>
            </div>`;
  }).join('\n');
};

const createTableMarkaup = (table) => {
  return table.map((item) => {
    return `<li class="bath-card__specifications-item">
              <h3 class="bath-card__specifications-title text text--color-not-opacity text--body-medium-1">${item.key}</h3>
              <p class="bath-card__specifications-text text text--body">${item.value}</p>
            </li>`;
  }).join('\n');
};

export const bathModalTemplate = (bath) => {
  return `<div class="bath-card__img-wrapper">
            <div class="bath-card__slider-wrapper swiper" data-slider="mobile">
              <button class="bath-card__nav-btn bath-card__nav-btn--prev" aria-label="Предыдущий слайд"></button>
              <button class="bath-card__nav-btn bath-card__nav-btn--next" aria-label="Следующий слайд"></button>
              <div class="bath-card__nav-icon">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlink:href="#icon-arrow"></use>
                </svg>
              </div>
              <div class="bath-card__slider swiper-wrapper">
                ${createSliderMarkup(bath.gallery.mobile, bath.gallery.desktop)}
              </div>
              <div class="bath-card__pagination"></div>
            </div>
          </div>
          <div class="bath-card__content">
            <h2 class="title title--xs-1">${bath.name}</h2>
            <p class="bath-card__text text text--body">${bath.info.description}</p>
            <ul class="bath-card__specifications">
              ${createTableMarkaup(bath.info.table)}
            </ul>
          </div>`;
};
