import { saveJsonFile , readJsonFile } from "./index";
import { version } from '../../package.json';
import { ipcRenderer } from 'electron'
import Limit from '../renderer/assest/def/limit.json';
import { clone } from "../utils";
import UnknownException from "../exception/UnknownException";
/**
 * 导出配置文件
 * @param msg
 * @param userSettings
 * @param limitSettings
 * @returns {Promise<void>}
 */
export async function exportSettingsFile(msg , userSettings , limitSettings ) {
    return new Promise((resolve, reject) => {
        ipcRenderer.send('saveJsonFile', msg);

        ipcRenderer.once('jsonFilePath', (event , filePath)=>{
            if (filePath == null){
                reject(new UnknownException('canceled' , 500));
                return ;
            }
            _exportSettingsFile(filePath, userSettings , limitSettings)
                .then(resolve).catch(e=>{
                    reject(new UnknownException(e.message , -1));
                })
        });
    })
}

async function _exportSettingsFile(filePath , userSettings , limitSettings ) {
    const data = { version: version, userSettings , limitSettings};
    return await saveJsonFile(filePath , data);
}

/**
 * 加载配置文件
 * @returns {Promise<any>}
 */
export async function loadSettingsFile( msg ) {
    return new Promise((resolve, reject) => {
        ipcRenderer.send('openJsonFile' , msg);

        ipcRenderer.once('jsonFilePath', (event , filePaths)=> {
            if (filePaths == null || filePaths.length === 0){
                reject(new UnknownException('canceled' , 500));
                return null;
            }
            _loadSettingsFile(filePaths[0])
                .then(resolve).catch(e=>{
                    reject(new UnknownException(e.message , -1));
            })
        })
    })
}
export async function _loadSettingsFile( filePath ) {
    const settings = await readJsonFile( filePath );
    if ( settings.version !== version){
        return formatOldSettings(settings);
    }
    return settings;
}
/*历史版本*/
const historyVersion = {
    V_0_2_0M281: '0.0.2-HP-M281',
    V_2_0: '0.2.0' // 当前版本
}
function formatOldSettings( oldSettings ) {
    if (oldSettings.version == null){
        // historyVersion.V_0_2_0M281
        return formatM281(oldSettings);
    }

    return oldSettings;
}

function formatM281( oldSettings ) {
    const {
        backgroundColor,
        bootNo,
        tableName,
        marqueeText,
        orderMarqueeText,
        showResultTime,
        limitList
    } = oldSettings;
    const userSettings = {
        backgroundColor,
        bootNo,
        tableName,
        marqueeText,
        orderMarqueeText,
        showResultTime,
        limitGroup: 'default'
    };
    let limitSettings;
    if (limitList != null && Array.isArray(limitList)){
        const currencyNames = limitList.map(item=>item.currencyName);
        const limitItem = clone(Limit.default , { currencyNames });

        limitList.forEach(item=> {
            const {
                currencyName,
                betLimit,
                pairLimit,
                tieLimit
            } = item;
            limitItem[currencyName] = {
                bet: { max: betLimit.max, min: betLimit.min},
                pairs: { max: pairLimit.max, min: pairLimit.min},
                tie: { max: tieLimit.max, min: tieLimit.min}
            }
        });

        limitSettings = { default: limitItem };
    }

    return {
        userSettings,
        limitSettings
    }
}