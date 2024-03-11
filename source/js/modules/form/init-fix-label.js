const inputWrappers = document.querySelectorAll('.custom-input');

const initFixLabel = () => {
  if (!inputWrappers) {
    return;
  }

  inputWrappers.forEach((el) => {
    const input = el.querySelector('input') || el.querySelector('textarea');

    el.addEventListener('input', () => {
      if (input.value) {
        el.classList.add('not-empty');
      } else {
        el.classList.remove('not-empty');
      }
    });
  });
};

export {initFixLabel};
