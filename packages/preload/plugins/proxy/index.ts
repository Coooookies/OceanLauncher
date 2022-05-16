import { ipcRenderer } from 'electron'
import { ChildProcessWithoutNullStreams } from 'child_process'

export default {
  setRouter: (host: string, port: number) =>
    ipcRenderer.invoke("gameProxy:setRouter", { host, port }),

  enableSystemProxy: (): Promise<boolean> =>
    ipcRenderer.invoke("gameProxy:enableSystemProxy"),

  closeSystemProxy: () =>
    ipcRenderer.invoke("gameProxy:closeSystemProxy"),

  getProxyAvailable: (): Promise<boolean> =>
    ipcRenderer.invoke("gameProxy:getProxyAvailable"),

}