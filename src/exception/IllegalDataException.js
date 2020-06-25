import Exception from './Exception';
import log from '../utils/log';

export default class IllegalDataException extends Exception {
    constructor(message, data) {
        super(message , 'warn');
        log.info(data);
    }
}