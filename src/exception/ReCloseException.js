import Exception from './Exception';

export default class ReCloseException extends Exception {
    constructor(message) {
        super(message , 'debug');
    }
}