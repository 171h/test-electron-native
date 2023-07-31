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

// ipc

const btnSetTitle = document.getElementById('set-title')
const inputTitle = document.getElementById('title')
btnSetTitle.addEventListener('click', () => {
  const title = inputTitle.value
  window.electronAPI.setTitle(title)
})
