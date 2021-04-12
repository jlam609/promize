class Promize {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new Error("Executor must be a function");
    }

    this.state = "pending";
    this.chained = [];
    const resolve = (res) => {
      if (this.state !== "pending") {
        return;
      }
      const then = res ? res.then: null
      if (typeof then == 'function'){
          return(then(resolve, reject))
      }
      this.state = "fulfilled";
      this.internalValue = res;
      for (const { onFulfilled } of this.chained) {
        onFulfilled(res);
      }
    };
    const reject = (err) => {
      if (this.state !== "pending") {
        return;
      }
      this.state = "rejected";
      this.internalValue = err;
      for (const { onRejected } of this.chained) {
        onRejected(err);
      }
      this.catch(err)
    };

    // Call the executor function with `resolve()` and `reject()` as in the spec.
    try {
      // If the executor function throws a sync exception, we consider that
      // a rejection. Keep in mind that, since `resolve()` or `reject()` can
      // only be called once, a function that synchronously calls `resolve()`
      // and then throws will lead to a fulfilled promise and a swallowed error
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  catch(err){
    throw new Error('error', err)
  }
  then(onFulfilled, onRejected) {
    return new Promize((resolve, reject) => {
      const _onFulfilled = (res) => {
        try {
          resolve(onFulfilled(res));
        } catch (err) {
          reject(err);
        }
      };
      const _onRejected = (rej) => {
        try {
          reject(onRejected(rej));
        } catch (err) {
          reject(err)
          this.catch(err);
        }
      };
      if (this.state === "fulfilled") {
        setTimeout(()=>_onFulfilled(this.internalValue), 1000);
      } else if (this.state === "rejected") {
        setTimeOut(()=>_onRejected(this.internalValue),1000);
      } else {
        this.chained.push({ onFulfilled: _onFulfilled, onRejected: _onRejected });
      }
    });
  }
}

module.exports = Promize;
