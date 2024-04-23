import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// const calendar = document.querySelector("#datetimepkr");
// const btn = document.querySelector("[data-start]");

// let userSelectedDate;
// let intervalId;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     userSelectedDate = selectedDates[0]; 
//     let ms = userSelectedDate - new Date(); 
//     if (ms < 1) {
//       iziToast.error({
//         color: 'red',
//         position: 'topRight',
//         message: `Please choose a date in the future`,
//       });
//     } else {
//       btn.disabled = false;
//       calendar.disabled = true;
//     }
//   },
// };

// userSelectedDate = flatpickr(calendar, options);

// console.log(userSelectedDate.selectedDates[0].getTime());

// function timer() {
//   clearInterval(intervalId);
//   let currentDate = new Date();
//   let targetDate = userSelectedDate.selectedDates[0];
//   let ms = targetDate - currentDate; 
//   updateTimerDisplay(ms);
  
//   intervalId = setInterval(() => {
//     ms -= 1000;
//     updateTimerDisplay(ms);
//     if (ms <= 0) {
//       clearInterval(intervalId);
//       showSuccessMessage('Success!');
//     }
//   }, 1000);
// }

// function showSuccessMessage(message) {
//   iziToast.success({
//     title: 'Success',
//     message: message,
//   });
// }

// function showErrorMessage(message) {
//   iziToast.error({
//     title: 'Error',
//     message: message,
//   });
// }

// function updateElement(selector, value) {
//   document.querySelector(selector).textContent = value >= 0 ? addLeadingZero(value) : '00';
// }

// function updateTimerDisplay(ms) {
//   const {days, hours, minutes, seconds } = convertMs(ms);
//   updateElement("[data-days]", days);
//   updateElement("[data-hours]", hours);
//   updateElement("[data-minutes]", minutes);
//   updateElement("[data-seconds]", seconds);
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = Math.floor(ms / day);
//   // Remaining hours
//   const hours = Math.floor((ms % day) / hour);
//   // Remaining minutes
//   const minutes = Math.floor(((ms % day) % hour) / minute);
//   // Remaining seconds
//   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

// btn.addEventListener("click", timer);
// document.addEventListener('DOMContentLoaded', () => { btn.disabled = true; });


// Get the necessary elements from the HTML
const startButton = document.querySelector('[data-start]');
const daysField = document.querySelector('[data-days]');
const hoursField = document.querySelector('[data-hours]');
const minutesField = document.querySelector('[data-minutes]');
const secondsField = document.querySelector('[data-seconds]');

// Initialize Flatpickr on the input element
const inputElement = document.querySelector('#datetime-picker');
flatpickr(inputElement, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      // Show an error message if a past date is selected
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

// Add a click event listener to the start button
startButton.addEventListener('click', () => {
  // Disable the start button and input element
  startButton.disabled = true;
  inputElement.disabled = true;

  // Get the selected date from the input element
  const selectedDate = inputElement.valueAsNumber;

  // Initialize the interval for the timer
  const intervalId = setInterval(() => {
    // Calculate the remaining time until the selected date
    const remainingTime = selectedDate - new Date();
    if (remainingTime <= 0) {
      // Clear the interval and show a success message if the remaining time is zero
      clearInterval(intervalId);
      alert('Success!');
      return;
    }

    // Format the remaining time as a string
    const days = String(Math.floor(remainingTime / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
    const minutes = String(Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
    const seconds = String(Math.floor((remainingTime % (1000 * 60)) / 1000)).padStart(2, '0');

    // Update the timer fields with the formatted remaining time
    daysField.textContent = days;
    hoursField.textContent = hours;
    minutesField.textContent = minutes;
    secondsField.textContent = seconds;
  }, 1000);
});

