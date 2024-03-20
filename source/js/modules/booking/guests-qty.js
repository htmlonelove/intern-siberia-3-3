export const guestsQtyControl = () => {
  if (document.querySelectorAll('[data-counter="parent"]').length > 0) {
    const decreaseBtns = document.querySelectorAll('[data-counter="decrease"]');
    const increaseBtns = document.querySelectorAll('[data-counter="increase"]');

    decreaseBtns.forEach((btn) => {
      btn.addEventListener('click', (evt) => {
        let count = Number(evt.target.parentElement.querySelector('input').value);
        const min = evt.target.dataset.min;
        const increaseBtn = evt.target.parentElement.querySelector('[data-counter="increase"]');
        const max = increaseBtn.dataset.max;

        if (count > min) {
          count--;
          checkDisabledBtn(count, min, max, btn, increaseBtn);
        }

        evt.target.parentElement.querySelector('input').value = count;
      });
    });

    increaseBtns.forEach((btn) => {
      btn.addEventListener('click', (evt) => {
        let count = Number(evt.target.parentElement.querySelector('input').value);
        const max = evt.target.dataset.max;
        const decreaseBtn = evt.target.parentElement.querySelector('[data-counter="decrease"]');
        const min = decreaseBtn.dataset.min;

        if (count < max) {
          count++;
          checkDisabledBtn(count, min, max, decreaseBtn, btn);
        }

        evt.target.parentElement.querySelector('input').value = count;
      });
    });
  }
};

function checkDisabledBtn(count, min, max, decreaseBtn, increaseBtn) {
  if (count <= min) {
    decreaseBtn.setAttribute('disabled', true);
  } else {
    decreaseBtn.removeAttribute('disabled');
  }

  if (count >= max) {
    increaseBtn.setAttribute('disabled', true);
  } else {
    increaseBtn.removeAttribute('disabled');
  }
}
