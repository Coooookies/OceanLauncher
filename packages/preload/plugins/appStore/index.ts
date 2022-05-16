import { ipcRenderer } from 'electron'

export default {
  get: (key: string) => ipcRenderer.invoke("appStore:get", { key }),
  set: (key: string, value: any) => ipcRenderer.invoke("appStore:set", { key, value }),
  has: (key: string): Promise<boolean> => ipcRenderer.invoke("appStore:has", { key }),
  delete: (key: string): Promise<boolean> => ipcRenderer.invoke("appStore:delete", { key })
}