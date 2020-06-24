import Exception from './Exception';

export default class ReOpenException extends Exception {
    constructor(message) {
        super(message);
    }
}