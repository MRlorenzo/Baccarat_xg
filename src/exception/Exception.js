import log from '../utils/log';
export default class Exception extends Error {

    constructor(message, level = 'error') {
        super(message);
        const fn = log[level];
        if (typeof fn === 'function'){
            fn(message);
        }
    }
}