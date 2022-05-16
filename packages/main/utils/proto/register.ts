import { BrowserWindow, ipcMain } from 'electron';
import { getServerRegion } from './proto';

export function registerProtoParser(win: BrowserWindow) {
  ipcMain.handle('proto:getServerRegion', (event, args) => getServerRegion(args.query_region_list));
}