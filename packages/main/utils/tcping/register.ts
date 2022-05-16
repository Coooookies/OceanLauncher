import { BrowserWindow, ipcMain } from 'electron';
import { tcping } from './ping'

export function registerTcping(win: BrowserWindow) {
  ipcMain.handle('tcping:ping', (event, args) => tcping({
    host: args.host,
    port: args.port,
    timeout: args.timeout,
  }));
}