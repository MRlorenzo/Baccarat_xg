import WinReg from 'winreg';

const RUN_LOCATION = '\\Software\\Microsoft\\Windows\\CurrentVersion\\Run';

async function getAutoStartValue(name) {
    let key = new WinReg({
        hive: WinReg.HKCU, //CurrentUser,
        key: RUN_LOCATION
    });
    return new Promise((resolve, reject) => {
        key.get(name, function (error, result) {
            if (error){
                reject(error);
                return ;
            }
            resolve(result);
        });
    })
}

async function enableAutoStart(name, file) {
    let key = new WinReg({
        hive: WinReg.HKCU, //CurrentUser,
        key: RUN_LOCATION
    });
    return new Promise((resolve, reject) => {
        key.set(name, WinReg.REG_SZ, file, function (error) {
            if (error){
                reject(error);
                return ;
            }
            resolve();
        })
    })
}

async function disableAutoStart(name) {
    let key = new WinReg({
        hive: WinReg.HKCU, //CurrentUser,
        key: RUN_LOCATION
    });
    key.remove(name, callback);
    return new Promise((resolve, reject) => {
        key.remove(name, function (error) {
            if (error){
                reject(error);
                return ;
            }
            resolve();
        })
    })
}

export async function autoStart() {
    const name = 'BACCARAT_XG_AUTOSTART';
    const value = await getAutoStartValue(name);
    if (!value){
        await enableAutoStart(name , process.execPath);
    }
}