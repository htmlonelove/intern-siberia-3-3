
const initHeader = () => {
  const header = document.querySelector('.header');
  let lastScroll = 0;
  let blocked = false;
  const modalOpenButtons = document.querySelectorAll('[data-open-modal], [data-contacts-map]');
  const modalCloseButtons = document.querySelectorAll('[data-close-modal]');
  let isHidden = false;

  modalOpenButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (header.classList.contains('is-hidden')) {
        isHidden = true;
      } else {
        isHidden = false;
      }

      if (isHidden) {
        header.classList.add('is-none');
      } else {
        header.classList.add('is-transition-none');
      }
    });
  });

  modalCloseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setTimeout(() => {
        header.classList.remove('is-none');
        if (isHidden) {
          header.classList.add('is-hidden');
        } else {
          header.classList.remove('is-hidden');
          header.classList.remove('is-transition-none');
        }
      }, 1000);
    });
  });

  if (!header) {
    return;
  }

  const onScrollHeaderBehaviour = () => {
    setTimeout(() => {
      const currentScroll = window.pageYOffset;
      const modal = document.querySelector('.modal--certificate');

      if (modal) {
        const showButton = document.querySelector('[data-open-modal="certificate"]');
        const closeButton = modal.querySelector('.modal__close-btn');
        const overlay = modal.querySelector('.modal__overlay');

        if (showButton) {
          showButton.addEventListener('click', () => {
            header.classList.add('is-none');
          });
        }

        if (closeButton) {
          closeButton.addEventListener('click', () => {
            header.classList.remove('is-none');
          });
        }

        if (overlay) {
          overlay.addEventListener('click', () => {
            header.classList.remove('is-none');
          });
        }
      }

      if (currentScroll > lastScroll && !header.classList.contains('is-hidden') && !blocked) {
        header.classList.add('is-hidden');
        blocked = true;

        setTimeout(() => {
          blocked = false;
        }, 100);
      } else if (currentScroll < lastScroll && header.classList.contains('is-hidden') && !blocked) {
        header.classList.remove('is-hidden');
        blocked = true;
        setTimeout(() => {
          blocked = false;
        }, 100);
      }

      if (currentScroll === 0) {
        header.classList.remove('is-hidden');
      }

      lastScroll = currentScroll;
    }, 0);
  };

  const scrollReturn = () => {
    const modal = document.querySelector('.modal--certificate');
    let currentScroll = window.pageYOffset;

    if (!modal) {
      return;
    }

    const showButton = document.querySelector('[data-open-modal="certificate"]');
    const closeButton = modal.querySelector('.modal__close-btn');
    const overlay = modal.querySelector('.modal__overlay');

    if (!showButton) {
      return;
    }

    showButton.addEventListener('click', () => {
      currentScroll = window.pageYOffset;
    });

    const scroll = () => {
      setTimeout(() => {
        window.scrollTo(0, currentScroll);
      }, 500);
    };

    if (closeButton && overlay) {
      closeButton.addEventListener('click', scroll);
      overlay.addEventListener('click', scroll);
    }
  };

  window.addEventListener('scroll', () => {
    onScrollHeaderBehaviour();
  });
  scrollReturn();
};

export {initHeader};
