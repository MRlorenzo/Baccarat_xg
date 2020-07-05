import {app, ipcMain , dialog , BrowserWindow} from 'electron'
import unhandled from 'electron-unhandled';
import log from '../utils/log';
import { autoStart } from "./auto-start";
import "./init-window";
import UnknownException from "../exception/UnknownException";

// 取消警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

// 开机自启(windows)
if (process.platform === 'darwin' && process.env.NODE_ENV !== 'development'){
    autoStart().catch(e=>{
        log.error(e);
    });
}

// 捕获所有未处理的异常
unhandled({
    logger:log.error,
    showDialog:true
});

// 设置全屏
ipcMain.on('fullScreen', event => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window == null){
        throw new UnknownException('找不到窗口' , 500);
    }
    const { maxWidth , maxHeight} = event.sender.browserWindowOptions;
    const timer = setInterval(()=> {
		let [width , height] = window.getSize();
		let [x, y] = window.getPosition();
		x -= 100;
		y -= 50;
		width += 100;
		height += 100;
		window.setPosition(x , y);
		if (width >= maxWidth || height>= maxHeight){
			window.setFullScreen(true);
			event.sender.send('fullScreened');
			clearInterval(timer);
        }else{
			window.setSize(width , height);
        }
    }, 100);
});

// 打印页面
ipcMain.on('printPage' , event=> {
    const options = {
		silent: true,
		printBackground: false,
		deviceName: ''
	};
	event.sender.print(options , (success, errorType) => {
		if (success){
		    event.sender.send('printSuccess');
        }else{
			log.error(errorType);
			event.sender.send('printError' , errorType);
		}
	});
})

// 打开Json文件
ipcMain.on('openJsonFile' , (event , msg)=>{
    const options = {
        title: msg,
        filters: [
            {  name: "Json",  extensions: ['json']}
        ]
    };

    dialog.showOpenDialog( options , function (filePaths) {
        event.sender.send('jsonFilePath' , filePaths);
    })
});

// 保存Json文件
ipcMain.on('saveJsonFile' , (event , msg)=>{
    const options = {
        title: msg,
        filters: [
            {  name: "Json",  extensions: ['json']}
        ]
    };

    dialog.showSaveDialog( options , function (filePaths) {
        event.sender.send('jsonFilePath' , filePaths);
    })
});

// 发起关闭程序请求
ipcMain.on('exitSystem' , ()=>{
	app.quit();
});

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
