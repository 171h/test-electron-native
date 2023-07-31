const { app, BrowserWindow } = require('electron')

console.log('Hello Electron from main index.js 👋')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800
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

  win.loadFile('src/renderer/index.html')
}

app.whenReady().then(createWindow)
