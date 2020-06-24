import SerialPort from "serialport";
import { clone } from "../../utils";

const opened = Symbol();

export default class XgSerialPort {

    constructor(comName, options , complete){
        this.port = new SerialPort(comName, options, false);
        this[opened] = false;
        this.complete = complete;
        return clone(this.port , this);
    }

    async open(...arg){
        if (!this[opened]){
            this[opened] = true;
            this.port.on('data', (data)=>{
                this.complete(data);
            })
        }
        return this.port.open(...arg);
    }

    async close(){
        return new Promise((resolve, reject) => {
            this.port.close(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        })
    }

    on(...arg){
        this.port.on(...arg);
    }

    isOpen(){
        return this.port.isOpen();
    }
}