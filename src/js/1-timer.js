import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputTime = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const timeValueElements = document.querySelectorAll('.value');

let userSelectedDate;
let timeInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    timeInterval = userSelectedDate - new Date();

    if (timeInterval <= 0) {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `Please choose a date in the future`,
      });
      startBtn.disabled = true;
      inputTime.disabled = false;
    } else {
      startBtn.disabled = false;
      inputTime.disabled = true;
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);

startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  const repeatTime = setInterval(() => {
    timeInterval = userSelectedDate - new Date();
    
    if (timeInterval < 0) {
      startBtn.disabled = true;
      inputTime.disabled = false;
      clearInterval(repeatTime);
      return;
    }
    const timer = convertMs(timeInterval);
    timeValueElements[0].textContent = timer.days.toString().padStart(2, '0');
    timeValueElements[1].textContent = timer.hours.toString().padStart(2, '0');
    timeValueElements[2].textContent = timer.minutes.toString().padStart(2, '0');
    timeValueElements[3].textContent = timer.seconds.toString().padStart(2, '0');
  }, 1000);
});

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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}





