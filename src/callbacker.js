const syncCallbacker = (...args) => {
    if (args.length < 2) throw new Error
    if (typeof args[0] !== 'function') throw new Error
    let result = args[0]()
    for (let i = 1; i < args.length; i++){
        if (typeof args[i] !== 'function') {
            throw new Error
        }
        else result = args[i](result)
    }
    return result
    // if (typeof func1 !== 'function' || typeof func2 !== 'function') throw new Error
    // return func2(func1())
};

const done = () => {
    return 'done'
}
const asyncCallbacker = (...args) => {
    if (args.length < 2) throw new Error
    if (typeof args[0] !== 'function') throw new Error
    let result = args[0]()
    for (let i = 1; i < args.length; i++){
        if (typeof args[i] !== 'function') {
            throw new Error
        }
        else result = args[i](result, done)
    }
    return result
};

module.exports = { syncCallbacker, asyncCallbacker };
