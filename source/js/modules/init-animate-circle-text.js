const initAnimateCircleText = () => {
  const btn = document.querySelector('[data-animate-circle-text="button"]');
  const text = document.querySelector('[data-animate-circle-text="text"]');
  const TEXT_LIMIT = 37;

  if (!btn || !text) {
    return;
  }

  const charsArray = text.innerText.split('');
  charsArray.unshift(' ', ' ');
  charsArray.push(' ', ' ');
  text.innerHTML = charsArray.map((char, i) => {
    if (i < TEXT_LIMIT) {
      return `<span style="transform:rotate(${i * 9.5}deg)">${char}</span>`;
    }
    // else if (i === TEXT_LIMIT) {
    //   return `<span style="transform:rotate(${i * 8.5}deg)">...</span>`;
    // }

    return '';
  }).join('');
};

export {initAnimateCircleText};
