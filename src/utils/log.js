import log from "electron-log";
const isDev = process.env.NODE_ENV === 'development';
/*
* 日志级别 error warn info verbose debug silly
* */
log.transports.file.level = isDev ? 'debug' : 'info';

log.transports.file.format = '日志级别:[{level}]时间:[{h}:{i}:{s}] 线程:[{processType}] 消息:{text}';
log.transports.console.level = isDev ? 'debug' : false; //false禁用console输出
/*
* 钩子方法.
* @msg :
*     data: any[] Arguments passed to log function
*     date: Date
*     level: 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly'
*     styles: string[] strings like 'color: red'
*     variables?: { [name: string]: any } When log message is created, values from log.variables are saved here (to make it possible to pass message between different processes)
* @transport: 日志类型,姑且这么叫吧.见下面的注释.
* */
log.hooks.push((msg, transport) => {
    /*console.log(
        transport == log.transports.console ,   //控制台输出
        transport == log.transports.file ,      //文件输出
        transport == log.transports.mainConsole ,   //主线程控制台
        transport == log.transports.rendererConsole,    //渲染线程控制台
        transport == log.transports.remote              //远程
        );*/
    /*if (transport !== log.transports.file) {
        return msg;
    }

    if (msg.data[0].includes('password')) {
        return false;
    }*/
    return msg;
});

export default log;