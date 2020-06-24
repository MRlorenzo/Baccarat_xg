import Exception from './Exception';

export default class ModuleException extends Exception {
    constructor(message) {
        super(message , 'error');
    }
}