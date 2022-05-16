import { BrowserWindow, ipcMain } from 'electron'
import electronStore from 'electron-store';

const store = new electronStore();

export function registerAppStore(win: BrowserWindow) {
  ipcMain.handle('appStore:get', (event, args) => store.get(args.key));
  ipcMain.handle('appStore:set', (event, args) => store.set(args.key, args.value));
  ipcMain.handle('appStore:delete', (event, args) => store.delete(args.key));
  ipcMain.handle('appStore:has', (event, args) => store.has(args.key))
}