const bodyEl = document.body;
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
let timerId = null;

bodyEl.style.backgroundColor = '#ffffff';

// btnStopEl.toggleAttribute('disabled');
btnStopEl.disabled = true;

btnStartEl.addEventListener('click', onStartClick);
btnStopEl.addEventListener('click', onStopClick);

function onStartClick() {
  btnStartEl.disabled = true;
  btnStopEl.disabled = false;

  // btnStartEl.toggleAttribute('disabled');
  // btnStopEl.toggleAttribute('disabled');

  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopClick() {
  btnStartEl.disabled = false;
  btnStopEl.disabled = true;

  // btnStartEl.toggleAttribute('disabled');
  // btnStopEl.toggleAttribute('disabled');
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
