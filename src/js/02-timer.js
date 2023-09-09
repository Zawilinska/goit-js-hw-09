import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const datatimePicker = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let time = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    time = selectedDates[0] - new Date();
    if (time > 0) {
      startBtn.removeAttribute('disabled');
      websiteTimer(convertMs(time));
    } else {
      startBtn.setAttribute('disabled', '');
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

function updateTimer() {
  if (time > 1000) {
    time -= 1000;
    websiteTimer(convertMs(time));
  } else {
    clearInterval(timerId);
  }
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function websiteTimer(time) {
  days.textContent = addLeadingZero(time.days);
  hours.textContent = addLeadingZero(time.hours);
  minutes.textContent = addLeadingZero(time.minutes);
  seconds.textContent = addLeadingZero(time.seconds);
}

function startTimer() {
  timerId = setInterval(updateTimer, 1000);
  startBtn.setAttribute('disabled', '');
  datatimePicker.setAttribute('disabled', '');
}

startBtn.addEventListener('click', startTimer);
startBtn.setAttribute('disabled', '');
flatpickr(datatimePicker, options);
