let isPaperSerificate = false;
let isHorizontalPosition = false;
let isGift = false;
let currentSertificateNumber = 1;
const selectedPrice = document.querySelector('[data-price-value]');
const giftFieldset = document.querySelector('[data-certificates="gift"]');
const giftCheckbox = document.querySelector('[data-certificates="toggle"]').firstElementChild;
const paperCheckbox = giftCheckbox.parentElement.previousElementSibling;
const orientationRadio = document.querySelector('.certificates__orientation');
const sertificateList = document.querySelectorAll('input[name="certificate-option"]');
const sertificatesContainer = document.querySelector('.certificates__options');
const priceList = document.querySelectorAll('.certificate-option__text');
const nameInput = document.querySelector('input[name="certificates-name"]');

//модалка - сертификат
const previewButton = document.querySelector('[data-open-modal="certificate"]');
const sertificateModal = document.querySelector('.modal-certificate');
const sertificateDeposit = document.querySelector('[data-certificate="deposit"]');
const sertificateMessage = document.querySelector('[data-certificate="message"]');
const sertificateMessageAppeal = sertificateMessage.textContent.slice(0, 8);

// листенеры на чекбоксы и радио и кнопки
paperCheckbox.addEventListener('change', switchSertificatType);
giftCheckbox.addEventListener('change', switchGiftFieldset);
orientationRadio.addEventListener('change', switchSertificatOrientation);
sertificatesContainer.addEventListener('change', changeSelectedPrice);
previewButton.addEventListener('click', generateSertificate);


// устанавливает выбранный по умолчанию сертификат
function setDefaultSertificate() {
  sertificateList[0].checked = true;
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
  currentSertificateNumber = Number(evt.target.id.slice(-1));
  selectedPrice.textContent = priceList[currentSertificateNumber - 1].textContent;
}

// генерирует сертификат в соответствии с выбранными параметрами [в момент нажатия кнопки 'посмотреть сертификат']
function generateSertificate() {
  if (isHorizontalPosition) {
    if (sertificateModal.classList.contains('is-vertical')) {
      sertificateModal.classList.remove('is-vertical');
    }
    sertificateModal.classList.add('is-horisontal');
  } else {
    if (sertificateModal.classList.contains('is-horisontal')) {
      sertificateModal.classList.remove('is-horisontal');
    }
    sertificateModal.classList.add('is-vertical');
  }
  sertificateDeposit.textContent = priceList[currentSertificateNumber - 1].textContent;

  if (isGift) {
    const recieverNameInput = document.querySelector('input[name="certificates-reciever-name"]'); //дополнительные поля формы
    const messageInput = document.querySelector('textarea[name="certificates-comment"]'); //дополнительные поля формы
    let comma = ', ';
    if (messageInput.value.length === 0) {
      comma = '';
    }
    sertificateMessage.textContent = `${recieverNameInput.value}${comma}${messageInput.value}`;
  } else {
    sertificateMessage.textContent = `${sertificateMessageAppeal}${nameInput.value}!`;
  }
}

export {setDefaultSertificate};
