document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const delay = parseInt(form.elements.delay.value);
    const step = parseInt(form.elements.step.value);
    const amount = parseInt(form.elements.amount.value);

    const promises = [];

    for (let i = 1; i <= amount; i++) {
      const position = i;
      const promiseDelay = delay + (i - 1) * step;

      createPromise(position, promiseDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  });

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
});
