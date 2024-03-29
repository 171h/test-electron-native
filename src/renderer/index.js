const information = document.getElementById('info')
information.innerText = `
本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})
test: ${versions.test}
`

const func = async () => {
  const response = await versions.ping()
  console.log(response)
}

func()

// test
console.log('renderer/index.js',window.versions)
console.log('renderer/index.js',window.versions.chrome())

// ipc pattern1 - renderer to main
const btnSetTitle = document.getElementById('set-title')
const inputTitle = document.getElementById('title')
btnSetTitle.addEventListener('click', () => {
  const title = inputTitle.value
  window.electronAPI.setTitle(title)
})

// ipc pattern2 - two-way
const btnOpenFile = document.getElementById('open-file')
const filePathElement = document.getElementById('file-path')
btnOpenFile.addEventListener('click', async () => {
  const filePath = await window.electronAPI.openFile()
  filePathElement.innerText = filePath
})

// ipc pattern3 - main to renderer
const counter = document.getElementById('counter')
window.electronAPI.onUpdateCounter((event, count) => {
  const oldValue = Number(counter.innerText)
  const newValue = oldValue + count
  counter.innerText = newValue
  event.sender.send('counter-value', newValue)
})
