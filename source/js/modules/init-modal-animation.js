const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
const breakpoint = window.matchMedia('(min-width: 768px)');

const calculatePos = (modalTrigger) => {
  const icon = modalTrigger.querySelector('[data-modal-animated]') || modalTrigger.closest('[data-modal-animated]');
  const iconTop = document.querySelector('.intro__content').getBoundingClientRect().top;
  const posY = window.innerHeight / 2 - iconTop;

  icon.style.top = `${posY}px`;
};

const scaleDownnTrigger = (modalTrigger) => {
  const modal = document.querySelector(`[data-modal="${modalTrigger.dataset.modalTrigger}"]`);
  const closeBtn = modal.querySelectorAll('[data-close-modal]');
  const icon = modalTrigger.querySelector('[data-modal-animated]') || modalTrigger.closest('[data-modal-animated]');

  closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        modalTrigger.classList.add('is-closing');
        modalTrigger.classList.remove('is-open');
        icon.removeAttribute('style');
      }, 1100);

      setTimeout(() => {
        modalTrigger.classList.remove('is-closing');
      }, 2000);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.preventDefault();
      setTimeout(() => {
        modalTrigger.classList.add('is-closing');
        modalTrigger.classList.remove('is-open');
        icon.removeAttribute('style');
      }, 1100);

      setTimeout(() => {
        modalTrigger.classList.remove('is-closing');
      }, 2000);
    }
  });
};

const scaleUpTrigger = (modalTrigger) => {
  modalTrigger.addEventListener('click', () => {
    modalTrigger.classList.add('is-open');
    calculatePos(modalTrigger);

    if (modalTrigger.classList.contains('video') && breakpoint.matches) {
      const modal = document.querySelector(`[data-modal="${modalTrigger.dataset.modalTrigger}"]`);

      modal.querySelector('video').play();
    }
  });
};

const breakpointChecker = () => {
  if (breakpoint.matches) {
    modalTriggers.forEach((modalTrigger) => {
      scaleUpTrigger(modalTrigger);
      scaleDownnTrigger(modalTrigger);
    });
  } else {
    modalTriggers.forEach((modalTrigger) => {
      modalTrigger.classList.remove('is-closing');
      modalTrigger.classList.remove('is-open');

      modalTrigger.addEventListener('click', () => {
        if (modalTrigger.classList.contains('video')) {
          const modal = document.querySelector(`[data-modal="${modalTrigger.dataset.modalTrigger}"]`);

          modal.querySelector('video').pause();
        }
      });
    });
  }
};

const initModalAnimation = () => {
  if (!modalTriggers) {
    return;
  }

  breakpoint.addListener(breakpointChecker);
  breakpointChecker();
};

export {initModalAnimation};
