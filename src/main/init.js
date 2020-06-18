import {app , BrowserWindow} from "electron";

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
	? `http://localhost:9080`
	: `file://${__dirname}/index.html`

function createWindow () {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		height: 563,
		useContentSize: true,
		width: 1000,
		titleBarStyle: 'hidden',
		webPreferences: {
			devTools: true
		}
	})

	mainWindow.loadURL(winURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	mainWindow.on('resize' , (event) => {
		event.sender.send('resize', mainWindow.getContentSize());
	})
}
app.on('ready', createWindow)

//当所有窗口都被关闭后退出
app.on('window-all-closed', () => {
	// 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
	// 否则绝大部分应用及其菜单栏会保持激活。
	if (process.platform !== 'darwin') {
		app.quit()
	}
});

app.on('activate', () => {
	// 在macOS上，当单击dock图标并且没有其他窗口打开时，
	// 通常在应用程序中重新创建一个窗口。
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})