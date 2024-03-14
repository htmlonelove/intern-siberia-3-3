let isPaperSerificate = false;
let isHorizontalPosition = false;
let isGift = false;
let currentСertificateNumber = 1;
const selectedPrice = document.querySelector('[data-price-value]');
const giftFieldset = document.querySelector('[data-certificates="gift"]');
const giftCheckbox = document.querySelector('[data-certificates="toggle"]').firstElementChild;
const paperCheckbox = giftCheckbox.parentElement.previousElementSibling;
const orientationRadio = document.querySelector('.certificates__orientation');
const СertificateList = document.querySelectorAll('input[name="certificate-option"]');
const СertificatesContainer = document.querySelector('.certificates__options');
const priceList = document.querySelectorAll('.certificate-option__text');
const nameInput = document.querySelector('input[name="certificates-name"]');

//модалка - сертификат
const previewButton = document.querySelector('[data-open-modal="certificate"]');
const СertificateModal = document.querySelector('.modal-certificate');
const СertificateDeposit = document.querySelector('[data-certificate="deposit"]');
const СertificateMessage = document.querySelector('[data-certificate="message"]');
const СertificateMessageAppeal = СertificateMessage.textContent.slice(0, 8);

// листенеры на чекбоксы и радио и кнопки
paperCheckbox.addEventListener('change', switchSertificatType);
giftCheckbox.addEventListener('change', switchGiftFieldset);
orientationRadio.addEventListener('change', switchSertificatOrientation);
СertificatesContainer.addEventListener('change', changeSelectedPrice);
previewButton.addEventListener('click', generateСertificate);


// устанавливает выбранный по умолчанию сертификат
function setDefaultСertificate() {
  СertificateList[0].checked = true;
  selectedPrice.textContent = priceList[0].textContent;
}

// открывает/закрывает дополнительные поля формы для подарочного сертификата
// + меняет логическую переменную  ?это подарок? (по умолчанию = она в false = не подарок)
function switchGiftFieldset() {
  if (getComputedStyle(giftFieldset).display === 'none') {
    giftFieldset.style.display = 'block';
  } else {
    giftFieldset.style.display = 'none';
  }
  if (isGift) {
    isGift = false;
  } else {
    isGift = true;
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
  currentСertificateNumber = Number(evt.target.id.slice(-1));
  selectedPrice.textContent = priceList[currentСertificateNumber - 1].textContent;
}

// генерирует сертификат в соответствии с выбранными параметрами [в момент нажатия кнопки 'посмотреть сертификат']
function generateСertificate() {
  // ориентируем сертификат: вертикальный/горизонтальный
  if (isHorizontalPosition) {
    if (СertificateModal.classList.contains('is-vertical')) {
      СertificateModal.classList.remove('is-vertical');
    }
    СertificateModal.classList.add('is-horisontal');
  } else {
    if (СertificateModal.classList.contains('is-horisontal')) {
      СertificateModal.classList.remove('is-horisontal');
    }
    СertificateModal.classList.add('is-vertical');
  }
  // выставляем номинал сертификата
  СertificateDeposit.textContent = priceList[currentСertificateNumber - 1].textContent;
  // готовим текста для сертификата
  if (isGift) {
    const recieverNameInput = document.querySelector('input[name="certificates-reciever-name"]'); //дополнительные поля формы
    const messageInput = document.querySelector('textarea[name="certificates-comment"]'); //дополнительные поля формы
    let comma = ', ';
    if (messageInput.value.length === 0) {
      comma = '';
    }
    СertificateMessage.textContent = `${recieverNameInput.value}${comma}${messageInput.value}`;
  } else {
    СertificateMessage.textContent = `${СertificateMessageAppeal}${nameInput.value}!`;
  }
}

export {setDefaultСertificate};
