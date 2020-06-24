import Exception from './Exception';

export default class UnknownException extends Exception {
    constructor(message, code) {
        super(message);
        this.code = code;
    }

    getCode() {
        return this.code;
    }
}