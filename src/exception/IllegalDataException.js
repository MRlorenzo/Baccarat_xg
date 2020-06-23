import Exception from './Exception';

export default class IllegalDataException extends Exception{
	constructor(message , data){
		super(message);
		console.log(data);
	}
}