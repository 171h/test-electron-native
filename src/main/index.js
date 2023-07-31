const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron')
const path = require('path')

console.log('Hello Electron from main index.js 👋')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
    }
  })

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

  const menu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          label: 'Increment',
          click: () => win.webContents.send('update-counter', 1),
        }, {
          label: 'Decrement',
          click: () => win.webContents.send('update-counter', -1),
        }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  win.loadFile('src/renderer/index.html')

  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  ipcMain.on('set-title', handleSetTitle)
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.on('counter-value', (event, count) => {
    console.log('counter-value', count)
  })
  createWindow()
})

function handleSetTitle(event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

async function handleFileOpen() {
  const { canceled, filePaths } = await dialog.showOpenDialog({})
  if (!canceled) {
    return filePaths[0]
  }
}
