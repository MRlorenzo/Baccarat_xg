import SerialPort from "serialport";

const opened = Symbol();

export default class XgSerialPort {

    constructor(comName, options , complete){
        // 永远都不自动打开，因为我们要代理open()方法.
        options.autoOpen = false;
        this.port = new SerialPort(comName, options, false);
        this[opened] = false;
        this.complete = complete;
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
        return this.port.isOpen;
    }
}