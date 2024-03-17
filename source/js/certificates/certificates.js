let currentDistance1 = 0;
let currentDistance2 = 0;
let previousDistance2 = 0;
let isPaperSerificate = false;
let isHorizontalPosition = false;
let isGift = false;
let currentCertificateNumber = 1;
let metaContent;

const certificateForm = document.querySelector('form[action="/api/buy/certificate"]');
const FORM_ACTION = certificateForm.action;
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
const recieverNameInput = document.querySelector('input[name="certificates-reciever-name"]');
const recieverPhoneInput = document.querySelector('input[name="certificates-reciever-phone"]');
const messageInput = document.querySelector('textarea[name="certificates-comment"]');

// Модалка - сертификат
const metaScaleInstruction = document.querySelector('meta[name="viewport"]');
const previewButton = document.querySelector('[data-open-modal="certificate"]');
const closeButton = document.querySelector('.modal__close-btn');
const certificateOverlay = document.querySelector('.modal__overlay');
const certificateModalContent = document.querySelector('.modal__content');
const certificateModal = document.querySelector('.modal-certificate');
const certificateDeposit = document.querySelector('[data-certificate="deposit"]');
const certificateMessage = document.querySelector('[data-certificate="message"]');
const certificateMessageAppeal = certificateMessage.textContent.slice(0, 8);

// Листенеры на чекбоксы,радио,кнопки, оверлей и на превью сертификата
paperCheckbox.addEventListener('change', switchSertificatType);
giftCheckbox.addEventListener('change', switchGiftFieldset);
orientationRadio.addEventListener('change', switchSertificatOrientation);
certificatesContainer.addEventListener('change', changeSelectedPrice);
previewButton.addEventListener('click', generateCertificate);
closeButton.addEventListener('click', allowPageScale);
certificateOverlay.addEventListener('click', allowPageScale);

// Листенер на submit формы
certificateForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (window.form.validateForm(certificateForm)) {
    sendData(new FormData(evt.target));
  }
});

// Запрещает масштабирование страницы
function denyPageScale() {
  metaContent = metaScaleInstruction.content + ', maximum-scale=1.0, user-scalable=no';
  metaScaleInstruction.setAttribute('content', metaContent);
}

// Разрешает масштабирование страницы
function allowPageScale() {
  metaContent = metaScaleInstruction.content.slice(0, -37);
  metaScaleInstruction.setAttribute('content', metaContent);
}

// Ставит листенеры на движения пальцев поверх контента модалки с превью сертификата
function setGestureListeners() {
  certificateModalContent.addEventListener('touchstart', startScale, false);
  certificateModalContent.addEventListener('touchmove', moveScale, false);
}

// Инициализирует страницу сертификаты
function initCertificates() {
  certificateList[0].checked = true;
  selectedPrice.textContent = priceList[0].textContent;
  // ставим листенеры на масштабирование сертификата жестом пальцев
  setGestureListeners();
}

// Открывает/закрывает дополнительные поля формы для подарочного сертификата
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
    if (recieverNameInput.parentElement.parentElement.hasAttribute('data-required')) {
      recieverNameInput.parentElement.parentElement.removeAttribute('data-required');
    }
    if (recieverPhoneInput.parentElement.parentElement.hasAttribute('data-required')) {
      recieverPhoneInput.parentElement.parentElement.removeAttribute('data-required');
    }
  } else {
    isGift = true;
    nameInput.parentElement.parentElement.removeAttribute('data-required');
    phoneInput.parentElement.parentElement.removeAttribute('data-required');
    emailInput.parentElement.parentElement.removeAttribute('data-required');
    recieverNameInput.parentElement.parentElement.setAttribute('data-required', '');
    recieverPhoneInput.parentElement.parentElement.setAttribute('data-required', '');
  }
}

// Меняет логическую переменную, от которой зависит ориентация сертификата (по умолчанию = false = вертикальная )
function switchSertificatOrientation() {
  if (isHorizontalPosition) {
    isHorizontalPosition = false;
  } else {
    isHorizontalPosition = true;
  }
}

// Меняет логическую переменную-запрос на бумажный сертификат (по умолчанию = false = бумажный сертификат не нужен) )
function switchSertificatType() {
  if (isPaperSerificate) {
    isPaperSerificate = false;
  } else {
    isPaperSerificate = true;
  }
}

// Приводит цену сертификата рядом с кнопкой 'перейти к оплате' в соответсвие с выбранным сертификатом
function changeSelectedPrice(evt) {
  currentCertificateNumber = Number(evt.target.id.slice(-1));
  selectedPrice.textContent = priceList[currentCertificateNumber - 1].textContent;
}

// генерирует сертификат в соответствии с выбранными параметрами [в момент нажатия кнопки 'посмотреть сертификат']
function generateCertificate() {
  certificateMessage.textContent = '';
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

    let comma = ', ';
    if (messageInput.value.length === 0) {
      comma = '';
    }
    certificateMessage.textContent = `${recieverNameInput.value}${comma}${messageInput.value}`;
  } else {
    if (nameInput.value.length === 0) {
      certificateMessage.textContent = '';
    } else {
      certificateMessage.textContent = `${certificateMessageAppeal}${nameInput.value} !`;
    }
  }
}

// //////////////////////////////////////////////////////////////////////////////////////////////////

// Начало жеста двумя пальцами
function startScale(evt) {
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

// Функция масштабирования через жест двумя пальцами по экрану
function moveScale(evt) {
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
      if (2 - previousDistance2 / currentDistance2 > 0.3) { // ограничение минимального масштаба
        certificateModalContent.style.webkitTransform = ' scale(' + (2 - previousDistance2 / currentDistance2).toFixed(1).toString() + ')';
      }
    }

    if (currentDistance1 < currentDistance2) {
      // Если пальцы расставлены дальше, чем при первом прикосновении к экрану, они выполняют жест увеличения (увеличиваем масштаб).
      certificateModalContent.style.webkitTransform = ' scale(' + (currentDistance2 / previousDistance2).toFixed(1).toString() + ')';
    }
  }
}


// Функция показа страницы-ошибки
function showFormError() {
  window.open('./certificates-error.html');
}

// Функция показа страницы успешной отправки формы
function showFormSuccess() {
  window.open('./certificates-success.html');
  certificateForm.reset();
}

// Функция отправки данных формы на сервер
const sendData = (body) => fetch(`${FORM_ACTION}`,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (!response.ok) {
        showFormError();
      } else {
        showFormSuccess();
      }
    })
    .catch(() => {
      showFormError();
    });


export {initCertificates};
