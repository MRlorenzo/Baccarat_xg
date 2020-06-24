import Exception from './Exception';

export default class EmptyPortException extends Exception {
    constructor(message) {
        super(message);
    }
}