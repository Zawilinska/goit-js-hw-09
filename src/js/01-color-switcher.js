const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timer = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', () => {
  startBtn.toggleAttribute('disabled');
  stopBtn.removeAttribute('disabled');
  timer = setInterval(() => {
    let bgColorSwitcher = getRandomHexColor();
    document.body.style.backgroundColor = bgColorSwitcher;
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.toggleAttribute('disabled');
  stopBtn.toggleAttribute('disabled');
  clearInterval(timer);
});
