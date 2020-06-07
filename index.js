const { app, BrowserWindow, Menu } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    })

    // https://stackoverflow.com/questions/39091964/remove-menubar-from-electron-app
    win.setMenu(null)

    win.loadFile('index.html')
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

