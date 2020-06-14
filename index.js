const { app, BrowserWindow, Menu, session } = require('electron')
const { ElectronBlocker } = require('@cliqz/adblocker-electron');
const {fetch } = require('cross-fetch');

function createWindow() {
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

    // most sites work fine in maximize
    // most sites use bootstrap-ish framework to hide menu and that's it
    win.maximize()

    // comment out for development
    // win.webContents.openDevTools()
}

// https://github.com/cliqz-oss/adblocker/blob/master/packages/adblocker-electron-example/index.ts#L70
// https://www.electronjs.org/docs/api/app#appallowrendererprocessreuse
// https://github.com/electron/electron/issues/18397
app.allowRendererProcessReuse = false; 

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

