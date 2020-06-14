const { app, BrowserWindow, Menu, session } = require('electron')
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const {fetch } = require('cross-fetch'); // required 'fetch'
// const autoUpdater = require("electron-updater");

function createWindow() {
    // autoUpdater.checkForUpdatesAndNotify();

    const win = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true
        }
    })

    if (session.defaultSession === undefined) {
        throw new Error('defaultSession is undefined');
    }

    ElectronBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInSession(session.defaultSession);
    });

    // https://stackoverflow.com/questions/39091964/remove-menubar-from-electron-app
    win.setMenu(null)

    win.loadFile('index.html')

    // comment out for development
    // win.webContents.openDevTools()
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

