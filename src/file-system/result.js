import moment from 'moment';
import path from 'path';
import {exists, mkdir, saveTxtFile, files, stat, readTxtFile} from "./index";

const gameResultPath = 'game-results';

/**
 * 追加游戏结果文件
 * @param string    数据
 * @param bootNumber    靴号
 * @returns {Promise<void>}
 */
export async function appendResultFile( string , bootNumber = 'x'){

    let fileName = `${moment().format('HH-mm-ss')}_b$${bootNumber}.txt`;

    let toDay = moment().format('YYYY-MM-DD');
    let folderPath = path.join( gameResultPath , toDay);

    //先检查一下保存游戏结果的主目录有没有
    if (!(await exists(gameResultPath))){
        await mkdir(gameResultPath);
    }

    /*再检查是否存在以今天日期命名的文件夹*/
    if (!(await exists(folderPath))){
        await mkdir(folderPath);
    }

    await saveTxtFile(path.join(folderPath , fileName) , string);
}

/**
 * 获取该文件夹下最新的文件
 * @param folderPath
 * @returns {Promise<*>}
 */
async function getNewestNoFolder( folderPath ) {
    const fileList = await files(folderPath);
    let statList = [];
    for (const name of fileList){
        let filePath = path.join(folderPath , name);
        const { birthtime } = await stat(filePath);
        statList.push({
            filePath , birthtime
        })
    }

    return statList.sort(function(a , b){
        return a.birthtime - b.birthtime;
    }).pop();
}

/**
 * 获取游戏记录数据列表
 * @returns {Promise<Array>}
 */
export async function gameResultDatas() {
    const folderNames = await files(gameResultPath);
    const folders = [];
    for (const folder of folderNames){
        const folderPath = path.join(gameResultPath , folder);
        if ((await stat(folderPath)).isDirectory()){
            const filenames = await files(folderPath);
            let children = [];
            for(const name of filenames){
                const filePath = path.join(folderPath , name);
                children.push({
                    name: name,
                    data: await readTxtFile(filePath)
                })
            }
            folders.push({
                name: folder,
                children: children
            })
        }
    }
    return folders;
}

/**
 * 最后一局游戏记录
 * @returns {Promise<*>}
 */
export async function lastOneHistory(){
    let rsTxt = null;

    if (!(await exists(gameResultPath)) || (await stat(gameResultPath)).isFile()){
        throw new Error('找不到存放游戏结果的文件夹[game-results]或者该目标不是文件夹!');
    }

    let toDay = moment().format('YYYY-MM-DD');

    let toDayResultFolderPath = path.join(gameResultPath , toDay);
    if (await exists(toDayResultFolderPath)){
        let newest = await getNewestNoFolder(toDayResultFolderPath);
        if(newest && newest.filePath){
            rsTxt = await readTxtFile(newest.filePath);
        }else{
            throw new Error(`在[game-results/${toDay}]该目录中找不到最新的存放游戏结果的文件`);
        }
    } else {
        let newestFolder = await getNewestNoFolder(gameResultPath);
        if (newestFolder && newestFolder.filePath){
            let newest2 = await getNewestNoFolder(newestFolder.filePath);
            if (newest2 && newest2.filePath){
                rsTxt = await readTxtFile(newest2.filePath);
            }else{
                throw new Error(`在[game-results/${newestFolder}]该目录中找不到最新的存放游戏结果的文件`);
            }
        }else{
            throw new Error(`在[game-results]目录中找不到最新的目录`);
        }
    }

    return rsTxt;

}