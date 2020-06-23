import Exception from './Exception';
export default class UnableCloseException extends Exception{
	constructor( message ){
		super(message);
	}
}