import { ipcRenderer } from 'electron'

export default {
  get: () => ipcRenderer.invoke("clipboard:get"),
  set: (value: string) => ipcRenderer.invoke("clipboard:set", { value }),
}