import { clipboard } from 'electron';
import { BrowserWindow, ipcMain } from 'electron';

export function registerClipboard(win: BrowserWindow) {
  ipcMain.handle('clipboard:get', (event, args) => clipboard.readText());
  ipcMain.handle('clipboard:set', (event, args) => clipboard.writeText(args.value));
}