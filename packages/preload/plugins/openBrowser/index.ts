import { contextBridge, ipcRenderer } from 'electron'

export default {
  openDefaultBrowser: (url: string) => {
    ipcRenderer.send("browser:open", { url })
  }
}