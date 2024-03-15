let currentDistance1 = 0;
let currentDistance2 = 0;
let previousDistance2 = 0;
let isPaperSerificate = false;
let isHorizontalPosition = false;
let isGift = false;
let currentCertificateNumber = 1;
// let rotation = 0;
// let scale = 1;
let metaContent;
// const certificateForm = document.querySelector('form[action="/api/buy/certificate"]');
const selectedPrice = document.querySelector('[data-price-value]');
const giftFieldset = document.querySelector('[data-certificates="gift"]');
const giftCheckbox = document.querySelector('[data-certificates="toggle"]').firstElementChild;
const paperCheckbox = giftCheckbox.parentElement.previousElementSibling;
const orientationRadio = document.querySelector('.certificates__orientation');
const certificateList = document.querySelectorAll('input[name="certificate-option"]');
const certificatesContainer = document.querySelector('.certificates__options');
const priceList = document.querySelectorAll('.certificate-option__text');
const nameInput = document.querySelector('input[name="certificates-name"]');
const phoneInput = document.querySelector('input[name="certificates-phone"]');
const emailInput = document.querySelector('input[name="certificates-email"]');

//модалка - сертификат
const metaScaleInstruction = document.querySelector('meta[name="viewport"]');
console.log('metaScaleInstruction = ' + metaScaleInstruction);
console.log('metaScaleInstruction.content = ' + metaScaleInstruction.content);

const previewButton = document.querySelector('[data-open-modal="certificate"]');
const closeButton = document.querySelector('.modal__close-btn');
const certificateOverlay = document.querySelector('.modal__overlay');
const certificateModal = document.querySelector('.modal__content');
const certificateDeposit = document.querySelector('[data-certificate="deposit"]');
const certificateMessage = document.querySelector('[data-certificate="message"]');
const certificateMessageAppeal = certificateMessage.textContent.slice(0, 8);


// листенеры на чекбоксы,радио,кнопки, оверлей и на превью сертификата
paperCheckbox.addEventListener('change', switchSertificatType);
giftCheckbox.addEventListener('change', switchGiftFieldset);
orientationRadio.addEventListener('change', switchSertificatOrientation);
certificatesContainer.addEventListener('change', changeSelectedPrice);
previewButton.addEventListener('click', generateCertificate);
closeButton.addEventListener('click', allowPageScale);
certificateOverlay.addEventListener('click', allowPageScale);


// запрещает масштабирование страницы
function denyPageScale() {
  metaContent = metaScaleInstruction.content + ', maximum-scale=1.0, user-scalable=no';
  console.log('metaContent deny = ' + metaContent);
  metaScaleInstruction.setAttribute('content', metaContent);
}

// разрешает масштабирование страницы
function allowPageScale() {
  metaContent = metaScaleInstruction.content.slice(0, -37);
  console.log('metaContent allow = ' + metaContent);
  metaScaleInstruction.setAttribute('content', metaContent);
}

// ставит листенеры на движения пальцев поверх контента модалки с превью сертификата
function setGestureListeners() {
  // certificateModal.addEventListener('gesturechange', gestureCertificate);
  // certificateModal.addEventListener('gestureend', gestureEndCertificate);

  certificateModal.addEventListener('touchstart', start, false);
  certificateModal.addEventListener('touchmove', move, false);
  // certificateModal.addEventListener('gesturechange', (event) => {
  //   // Your code handling the gesturechange event goes here
  //   // event.target.innerHTML = ' Scale: ' + Math.round((event.scale * scale) * 100) / 100;
  //   // event.target.style.webkitTransform = ' scale(' + event.scale * scale + ')';
  //   event.target.style.webkitTransform = ' scale(' + event.scale * scale + ')';
  //   // eslint-disable-next-line no-alert
  //   alert('YES!');
  // });

  // certificateModal.addEventListener('gestureend', (event) => {
  // // Your code handling the gesturechange event goes here
  //   scale = event.scale * scale;
  //   // eslint-disable-next-line no-alert
  //   alert('YES!');
  // });
}

// удаляет листенеры на движения пальцев поверх контента модалки с превью сертификата
// function removeGestureListeners() {
//   сertificateModal.removeEventListener('gesturechange', gestureCertificate);
//   сertificateModal.removeEventListener('gestureend', gestureEndCertificate);
//   allowPageScale();
// }

// устанавливает выбранный по умолчанию сертификат
function initCertificates() {
  certificateList[0].checked = true;
  selectedPrice.textContent = priceList[0].textContent;
  // ставим листенеры на масштабирование сертификата жестом пальцев
  setGestureListeners();
}

// открывает/закрывает дополнительные поля формы для подарочного сертификата
// + меняет логическую переменную  ?это подарок? (по умолчанию = она в false = не подарок)
// + ставит / снимает data-required атрибут с полей name/phone/email
function switchGiftFieldset() {
  if (getComputedStyle(giftFieldset).display === 'none') {
    giftFieldset.style.display = 'block';
  } else {
    giftFieldset.style.display = 'none';
  }
  if (isGift) {
    isGift = false;
    nameInput.parentElement.parentElement.setAttribute('data-required', '');
    phoneInput.parentElement.parentElement.setAttribute('data-required', '');
    emailInput.parentElement.parentElement.setAttribute('data-required', '');
  } else {
    isGift = true;
    nameInput.parentElement.parentElement.removeAttribute('data-required');
    phoneInput.parentElement.parentElement.removeAttribute('data-required');
    emailInput.parentElement.parentElement.removeAttribute('data-required');
  }
}

// меняет логическую переменную, от которой зависит ориентация сертификата (по умолчанию = false = вертикальная )
function switchSertificatOrientation() {
  if (isHorizontalPosition) {
    isHorizontalPosition = false;
  } else {
    isHorizontalPosition = true;
  }
}

// меняет логическую переменную-запрос на бумажный сертификат (по умолчанию = false = бумажный сертификат не нужен) )
function switchSertificatType() {
  if (isPaperSerificate) {
    isPaperSerificate = false;
  } else {
    isPaperSerificate = true;
  }
}

// приводит цену сертификата рядом с кнопкой 'перейти к оплате' в соответсвие с выбранным сертификатом
function changeSelectedPrice(evt) {
  currentCertificateNumber = Number(evt.target.id.slice(-1));
  selectedPrice.textContent = priceList[currentCertificateNumber - 1].textContent;
}

// генерирует сертификат в соответствии с выбранными параметрами [в момент нажатия кнопки 'посмотреть сертификат']
function generateCertificate() {
  // проводим валидацию формы
  // window.form.validateForm(certificateForm);

  // запрещаем scale страницы
  denyPageScale();

  // ориентируем сертификат: вертикальный/горизонтальный
  if (isHorizontalPosition) {
    if (certificateModal.classList.contains('is-vertical')) {
      certificateModal.classList.remove('is-vertical');
    }
    certificateModal.classList.add('is-horisontal');
  } else {
    if (certificateModal.classList.contains('is-horisontal')) {
      certificateModal.classList.remove('is-horisontal');
    }
    certificateModal.classList.add('is-vertical');
  }
  // выставляем номинал сертификата
  certificateDeposit.textContent = priceList[currentCertificateNumber - 1].textContent;
  // готовим текста для сертификата
  if (isGift) {
    const recieverNameInput = document.querySelector('input[name="certificates-reciever-name"]'); //дополнительные поля формы
    const messageInput = document.querySelector('textarea[name="certificates-comment"]'); //дополнительные поля формы
    let comma = ', ';
    if (messageInput.value.length === 0) {
      comma = '';
    }
    certificateMessage.textContent = `${recieverNameInput.value}${comma}${messageInput.value}`;
  } else {
    certificateMessage.textContent = `${certificateMessageAppeal}${nameInput.value}!`;
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////


// // обработчик жестов пальцами
// function gestureCertificate(event) {
//   event.target.innerHTML = ' Scale: ' + Math.round((event.scale * scale) * 100) / 100;
//   // event.target.style.webkitTransform = ' scale(' + event.scale * scale + ')';
//   certificateDeposit.style.webkitTransform = ' scale(' + event.scale * scale + ')';
//   alert('YES!');
//   // console.log('Rotation: ' +
//   // Math.round((event.rotation + rotation) * 100) / 100
//   // + ' Scale: ' + Math.round((event.scale * scale) * 100) / 100);
//   // event.target.style.webkitTransform = 'rotate(' + (event.rotation + rotation) % 360
//   // + 'deg)' + ' scale(' + event.scale * scale + ')';
// }

// // обработчик окончания жеста
// function gestureEndCertificate(event) {
//   // rotation = event.rotation + rotation;
//   scale = event.scale * scale;
// }

// //////////////////////////////////////////////////////////////////////////////////////////////////


function start(evt) {
  if (evt.targetTouches.length === 2) {
    previousDistance2 = 0; // обнуляем исходные данные для нового жеста
    // Проверяем два ли пальца на экране
    currentDistance1 = Math.hypot(
        // Получаем приблизительную оценку расстояния между двумя пальцами
        evt.touches[0].pageX - evt.touches[1].pageX,
        evt.touches[0].pageY - evt.touches[1].pageY
    );
  }
}

function move(evt) {
  if (evt.targetTouches.length === 2 && evt.changedTouches.length === 2) {
    // Проверяем, совпадают ли касания
    currentDistance2 = Math.hypot(
        // Получаем приблизительную оценку нового расстояния между пальцами
        evt.touches[0].pageX - evt.touches[1].pageX,
        evt.touches[0].pageY - evt.touches[1].pageY
    );

    if (previousDistance2 === 0) { // когда оба пальца только прикоснулись к экрану - независимо от расстояния между ними - масштаб = 1
      previousDistance2 = currentDistance2;
    }

    if (currentDistance1 > currentDistance2) {
      // Если пальцы сейчас находятся ближе, чем когда они впервые коснулись экрана, они сжимаются (уменьшаем масштаб).
      // console.log('dist2 = ' + dist2);
      // console.log('previous dist2 = ' + previousDist2);
      // console.log('dist2 / previousDist2 = ' + (2 - previousDist2 / dist2).toFixed(1).toString());
      // console.log('уменьшение масштаба');
      if (2 - previousDistance2 / currentDistance2 > 0.3) { // ограничение минимального масштаба
        certificateModal.style.webkitTransform = ' scale(' + (2 - previousDistance2 / currentDistance2).toFixed(1).toString() + ')';
      }
    }

    if (currentDistance1 < currentDistance2) {
      // Если пальцы расставлены дальше, чем при первом прикосновении к экрану, они выполняют жест увеличения (увеличиваем масштаб).
      // console.log('dist2 = ' + dist2);
      // console.log('previous dist2 = ' + previousDist2);
      // console.log('dist2 / previousDist2 = ' + (dist2 / previousDist2).toFixed(1).toString());
      // console.log('увеличение масштаба');
      certificateModal.style.webkitTransform = ' scale(' + (currentDistance2 / previousDistance2).toFixed(1).toString() + ')';
    }
  }
}


export {initCertificates};
