const createDescription = (descriptionDesktop, descriptionMobile) => {
  if (descriptionDesktop === null) {
    return descriptionDesktop;
  } else {
    return `<p class="menu-tab__description menu-tab__description--desktop text text--small">${descriptionDesktop}</p>
            <p class="menu-tab__description menu-tab__description--mobile text text--small">${descriptionMobile}</p>`;
  }
};

const createCover = (cover, name) => {
  if (cover === null) {
    return cover;
  } else {
    return `<div class="menu-tab__img">
              <picture>
                <source type="image/webp" srcset="${cover.webp}, ${cover.webp2x} 2x"><img src="${cover.jpg}" srcset="${cover.jpg2x} 2x" width="355" height="237" alt=${name}>
              </picture>
            </div>`;
  }
};

export const menuItemTemplate = (item) => {
  return `<li class="menu-tab__item">
            <div class="menu-tab__info">
              <p class="menu-tab__title menu-tab__title--desktop title title--xxs"><span>${item.desktop.name}</span></p>
              <p class="menu-tab__title menu-tab__title--mobile title title--xxs"><span>${item.mobile.name}</span></p>
              ${createDescription(item.desktop.description) ? createDescription(item.desktop.description, item.mobile.description) : '\n'}

              <p class="menu-tab__weight text text--small">${item.weight}</p>
            </div>
            <p class="menu-tab__price text text--body text--color-not-opacity"><span>${item.price}</span> ₽</p>
            ${createCover(item.cover, item.name) ? createCover(item.cover, item.name) : '\n'}
          </li>`;
};
