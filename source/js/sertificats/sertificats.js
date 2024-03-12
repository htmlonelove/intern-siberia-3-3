let isPaperSerificat = false;
let isHorizontalPosition = false;
const selectedPrice = document.querySelector('[data-price-value]');
const giftFieldset = document.querySelector('[data-certificates="gift"]');
const giftCheckbox = document.querySelector('[data-certificates="toggle"]').firstElementChild;
const paperCheckbox = giftCheckbox.parentElement.previousElementSibling;
const orientationRadio = document.querySelector('.certificates__orientation');
const sertificatsList = document.querySelectorAll('input[name="certificate-option"]');
const sertificatsContainer = document.querySelector('.certificates__options');
const priceList = document.querySelectorAll('.certificate-option__text');


// листенеры на чекбоксы и радио
paperCheckbox.addEventListener('change', switchSertificatType);
giftCheckbox.addEventListener('change', switchGiftFieldset);
orientationRadio.addEventListener('change', switchSertificatOrientation);
sertificatsContainer.addEventListener('change', changeSlectedPrice);


// устанавливает выбранный по умолчанию сертификат
function setDefaultSertificat() {
  sertificatsList[0].checked = true;
  selectedPrice.innerText = priceList[0].innerText;
}

// открывает/закрывает дополнительные поля формы для подарочного сертификата
function switchGiftFieldset() {
  if (getComputedStyle(giftFieldset).display === 'none') {
    giftFieldset.style.display = 'block';
  } else {
    giftFieldset.style.display = 'none';
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
  if (isPaperSerificat) {
    isPaperSerificat = false;
  } else {
    isPaperSerificat = true;
  }
}

// приводит цену сертификата в соответсвие с выбранным сертификатом
function changeSlectedPrice(evt) {
  let n = Number(evt.target.id.slice(-1));
  selectedPrice.innerText = priceList[n - 1].innerText;
}

export {setDefaultSertificat};
