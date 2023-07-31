const { contextBridge, ipcRenderer } = require('electron')

console.log('Hello Electron from preload index.js 👋')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  test: 'test variable',
  ping: () => ipcRenderer.invoke('ping')
})


contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send, // error here
  loadPreferences: () => ipcRenderer.invoke('load-prefs'),
})

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
})
