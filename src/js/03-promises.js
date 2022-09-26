import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const formEl = document.querySelector('.form');
const btnSubmitEl = document.querySelector('.form button');

btnSubmitEl.addEventListener('click', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  let delay = Number(formEl.delay.value);
  const step = Number(formEl.step.value);
  const amount = Number(formEl.amount.value);

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;

    createPromise(position, delay)
      .then(result => {
        Notify.success(result);
      })
      .catch(error => {
        Notify.failure(error);
      });

    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        reject(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
