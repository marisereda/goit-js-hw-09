const bodyEl = document.body;
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
let timerId = null;

bodyEl.style.backgroundColor = '#ffffff';
btnStopEl.disabled = true;

btnStartEl.addEventListener('click', onStartClick);
btnStopEl.addEventListener('click', onStopClick);

function onStartClick() {
  btnStartEl.disabled = true;
  btnStopEl.disabled = false;

  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  btnStartEl.disabled = false;
  btnStopEl.disabled = true;
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
