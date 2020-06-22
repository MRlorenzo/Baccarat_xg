import SerialPort from "serialport";
// 获取串口名称列表
export async function getComNameList(){
    const ports = await SerialPort.list();
    return ports.map(port => port.comName);
}

export function newSerialPort(comName , options) {
    return new SerialPort(comName , options , false);
}