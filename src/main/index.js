import { app, ipcMain } from 'electron'
import "./init-window";
import AngleEyeHelper from "../port/AngleEyeHelper";
import Storage from '../local-storage/Storage';
import DK from '../utils/DATA-KEY.json';
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

ipcMain.once('connect-serial-port', async event => {
	let comConfig = await Storage.lastOne(DK.COM_CONFIG);
	let angleConfig = await Storage.lastOne(DK.ANGLE_CONFIG);
	let helper = new AngleEyeHelper(angleConfig , comConfig);
	event.sender.send('connected-helper' , helper);
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
