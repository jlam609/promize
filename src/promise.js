const basicPromise = new Promise((res, rej, err) => {
  if (err) {
    rej(err);
  } else res("basicPromise");
});
const funcPromise = () =>
  new Promise((res, rej, err) => {
    if (err) {
      rej(err);
    } else res("funcPromise");
  });
const chainedPromise = (promise) => {
  let promiseA = new Promise((res, rej, err) => {
    setTimeout(() => res(promise), 1000);
  });
  return promiseA
    .then((data) => {
        return setTimeout(() => Promise.resolve(data), 1000);
    }).then((data) => {
      return data;
    });
};
const rejectedPromise = () => new Promise((res, rej, err) => {
     throw rej(new Error("rejectedPromise"))
})

module.exports = { basicPromise, chainedPromise, rejectedPromise, funcPromise };
