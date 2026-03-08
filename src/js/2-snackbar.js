import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('.inp-delay');

form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = Number(inputDelay.value);
  if (isNaN(delay) || delay < 0) return;
  const selectedState = document.querySelector('input[name="state"]:checked');
  if (!selectedState) return alert('Оберіть стан!');
  const isPositive = selectedState.value === 'fulfilled';
  createPromise(delay, isPositive)
    .then(resolvedDelay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
      });
      form.reset();
    })
    .catch(rejectedDelay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${rejectedDelay}ms`,
      });
      form.reset();
    });
});

function createPromise(delay, isPositive) {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      if (isPositive) {
        res(delay);
      } else {
        rej(delay);
      }
    }, delay);
  });
  return promise;
}
