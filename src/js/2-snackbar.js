import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
form.addEventListener('submit', event => {
    event.preventDefault();

    const delay = parseInt(event.currentTarget.elements.delay.value);
    const selectedBtn = event.currentTarget.querySelector('input[name="state"]:checked');
    const state = selectedBtn ? selectedBtn.value : null;
    selectedBtn.disabled = true;
   
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise.then((delay) => {
        iziToast.success({
            title: 'OK',
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
        });
    }).catch((delay) => {
        iziToast.error({
            title: 'Error',
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
        });
    })
})
