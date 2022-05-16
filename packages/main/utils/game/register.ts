import { BrowserWindow, ipcMain } from 'electron';

export function registerGameManager(win: BrowserWindow) {
  if (!global.GameManager) return;

  const Manager = global.GameManager;
  ipcMain.handle('gameManager:gameVersionParser', (event, args) =>
    Manager.gameVersionParser(args.path));

  ipcMain.handle('gameManager:startGame', (event, args) =>
    Manager.startGame(args.path));

  ipcMain.handle('gameManager:stopGame', (event, args) =>
    Manager.stopGame());

  win.webContents.on('did-finish-load', () => {
    Manager.on('spawn', () => {
      win.webContents.send("gameManager:event", { type: 'spawn' });
    })

    Manager.on('close', () => {
      win.webContents.send("gameManager:event", { type: 'close' });
    })
  })
}