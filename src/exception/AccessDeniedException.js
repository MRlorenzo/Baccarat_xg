import ModuleException from './ModuleException';

export default class AccessDeniedException extends ModuleException {
	constructor(message){
		super(message);
	}
}