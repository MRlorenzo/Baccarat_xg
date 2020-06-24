import log from '../utils/log';
export default class Exception extends Error {

    constructor(message) {
        super(message);
        log.error(message);
    }
}