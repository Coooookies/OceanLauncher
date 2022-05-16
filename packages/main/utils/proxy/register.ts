import { BrowserWindow, ipcMain } from 'electron';

export function registerGameProxy(win: BrowserWindow) {
  if (!global.GameProxy) return;

  const Proxy = global.GameProxy;
  ipcMain.handle('gameProxy:setRouter', (event, { host, port }) =>
    Proxy.setRouter(host, port));

  ipcMain.handle('gameProxy:enableSystemProxy', (event, args) =>
    Proxy.enableSystemProxy());

  ipcMain.handle('gameProxy:closeSystemProxy', (event, args) =>
    Proxy.closeSystemProxy());

  ipcMain.handle('gameProxy:getProxyAvailable', (event, args) =>
    Proxy.getProxyAvailable());
}