import {app , BrowserWindow} from "electron";

let mainWindow
const mainURL = process.env.NODE_ENV === 'development'
	? `http://localhost:9080`
	: `file://${__dirname}/index.html`

function createWindow () {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		width:600,
		minWidth:600,
		maxWidth:1920,
		minHeight:400,
		maxHeight:1080,
		height:400,
		frame:false,    //无边框
		titleBarStyle: 'hiddenInset',
		useContentSize: true,
		webPreferences: {
			/*允许读写本地文件*/
			webSecurity: false
		}
	})

	mainWindow.loadURL(mainURL)

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	mainWindow.on('resize' , (event) => {
		event.sender.send('resize', mainWindow.getContentSize());
	})
}
app.on('ready', createWindow)

app.on('activate', () => {
	// 在macOS上，当单击dock图标并且没有其他窗口打开时，
	// 通常在应用程序中重新创建一个窗口。
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})