import { ipcRenderer } from 'electron'
import { TcpingResult } from '../../../main/utils/tcping'

export default {
  ping: (host: string, port: number, timeout: number):
    Promise<TcpingResult> => ipcRenderer.invoke("tcping:ping", { host, port, timeout }),
}