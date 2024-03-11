const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

export const formatDate = (date) => {
  let month = date.slice(5, 7);
  const day = date.slice(8);

  if (month[0] === 0) {
    month = month.slice(1);
  }

  month = months[+month - 1];

  return `${day} ${month}`;
};

export const renderElement = (container, component, place = 'beforeend') => {
  container.insertAdjacentHTML(place, component);
};
