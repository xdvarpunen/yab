const { app, BrowserWindow, Menu } = require('electron')
// const autoUpdater = require("electron-updater");

function createWindow() {
    // autoUpdater.checkForUpdatesAndNotify();

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    })

    // https://stackoverflow.com/questions/39091964/remove-menubar-from-electron-app
    win.setMenu(null)

    win.loadFile('index.html')

    win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

