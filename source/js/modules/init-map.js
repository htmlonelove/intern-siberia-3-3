const mapSection = document.querySelectorAll('.map');

const createMap = (id) => {
  const init = () => {
    // eslint-disable-next-line no-undef
    const myMap = new ymaps.Map(id, {
      center: [55.792427, 37.608940],
      zoom: 17,
      controls: [],
    }, {
      autoFitToViewport: true,
      suppressMapOpenBlock: true,
    });

    // eslint-disable-next-line no-undef
    const myPlacemark = new ymaps.Placemark([55.792427, 37.608940], {}, {
      iconLayout: 'default#image',
      iconImageHref: '/img/svg/marker.svg',
      iconImageSize: [44, 58],
    });

    myMap.geoObjects.add(myPlacemark);
  };

  // eslint-disable-next-line no-undef
  ymaps.ready(init);
};

const initMap = () => {
  if (!mapSection) {
    return;
  }

  mapSection.forEach((map) => {
    const mapId = map.querySelector('.map__inner').id;
    createMap(mapId);
  });
};

export {initMap};
