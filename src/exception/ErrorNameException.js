import Exception from './Exception';

export default class ErrorNameException extends Exception {
    constructor(message) {
        super(message);
    }
}