import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

let timerID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    inputDateHandler(selectedDates);
  },
};

const refs = {
  btnStartEl: document.querySelector('[data-start]'),
  inputEl: document.querySelector('#datetime-picker'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const fp = flatpickr(refs.inputEl, options);

refs.btnStartEl.disabled = true;
refs.btnStartEl.addEventListener('click', onStartClick);

function onStartClick() {
  refs.btnStartEl.disabled = true;

  timerID = setInterval(() => {
    let timeRemained = fp.selectedDates[0] - Date.now();
    // timeRemained = timeRemained - 1000;
    if (timeRemained > 0) {
      renderTimer(timeRemained);
    } else {
      stopTimer();
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  days = days.toString().padStart(days.length > 2 ? days.length : 2, '0');
  hours = hours.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');
  return { days, hours, minutes, seconds };
}

function renderTimer(timeRemained) {
  const { days, hours, minutes, seconds } = addLeadingZero(
    convertMs(timeRemained)
  );
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}

function stopTimer() {
  renderTimer(0);
  clearInterval(timerID);
}

function inputDateHandler(selectedDates) {
  const remainedTime = selectedDates[0] - Date.now();
  if (remainedTime <= 0) {
    Report.failure('Warning!', 'Please choose a date in the future.', 'Ok', {
      width: '360px',
      svgSize: '50px',
    });
    refs.btnStartEl.disabled = true;
  } else {
    stopTimer();
    refs.btnStartEl.disabled = false;
  }
}
