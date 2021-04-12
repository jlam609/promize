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
  if (promise) {
    return new Promise(async (res, rej, err) => {
      res(promise().then((data) => data));
    });
  } else {
    return new Promise(async (res, rej, err) => {
      res(promise);
    });
  }
};
const rejectedPromise = () =>
  new Promise((res, rej, err) => {
    throw rej(new Error("rejectedPromise"));
  });

module.exports = { basicPromise, chainedPromise, rejectedPromise, funcPromise };
