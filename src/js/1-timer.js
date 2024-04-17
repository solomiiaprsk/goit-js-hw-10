import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const calendar = document.querySelector("#datetimepkr");
const btn = document.querySelector("[data-start]");

let userSelectedDate;
let intervalId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; 
    let ms = userSelectedDate - new Date(); 
    if (ms < 1) {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `Please choose a date in the future`,
      });
    } else {
      btn.disabled = false;
      calendar.disabled = true;
    }
  },
};

userSelectedDate = flatpickr(calendar, options);

console.log(userSelectedDate.selectedDates[0].getTime());

function timer() {
  clearInterval(intervalId);
  let currentDate = new Date();
  let targetDate = userSelectedDate.selectedDates[0];
  let ms = targetDate - currentDate; 
  updateTimerDisplay(ms);
  
  intervalId = setInterval(() => {
    ms -= 1000;
    updateTimerDisplay(ms);
    if (ms <= 0) {
      clearInterval(intervalId);
      showSuccessMessage('Success!');
    }
  }, 1000);
}

function showSuccessMessage(message) {
  iziToast.success({
    title: 'Success',
    message: message,
  });
}

function showErrorMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

function updateElement(selector, value) {
  document.querySelector(selector).textContent = value >= 0 ? addLeadingZero(value) : '00';
}

function updateTimerDisplay(ms) {
  const {days, hours, minutes, seconds } = convertMs(ms);
  updateElement("[data-days]", days);
  updateElement("[data-hours]", hours);
  updateElement("[data-minutes]", minutes);
  updateElement("[data-seconds]", seconds);
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

btn.addEventListener("click", timer);
document.addEventListener('DOMContentLoaded', () => { btn.disabled = true; });
