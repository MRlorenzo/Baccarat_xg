import Exception from './Exception';

export default class NullPointerException extends Exception {
    constructor(message) {
        super(message , 'error');
    }
}