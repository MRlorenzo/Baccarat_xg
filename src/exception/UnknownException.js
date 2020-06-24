import Exception from './Exception';

export default class UnknownException extends Exception {
    constructor(message, code) {
        super(message , 'error');
        this.code = code;
    }

    getCode() {
        return this.code;
    }
}