import { BrowserWindow, ipcMain, dialog } from 'electron';

export function registerDialog(win: BrowserWindow) {
  ipcMain.handle('dialog:showOpenDialog', (event, args) => dialog.showOpenDialog(win, args.args));
}