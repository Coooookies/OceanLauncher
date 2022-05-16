import { app, BrowserWindow } from 'electron'
import { createMainWindow } from './createWindow'
import Proxy from './utils/proxy'
import Manager from './utils/game'
import singleInstance from './singleInstance'
import './compatibility'

app.setAppUserModelId('com.mitay.gslauncher');

// 窗口
let mainWindow: BrowserWindow | null = null;
let popupWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
  const GameProxy = new Proxy();
  const GameManager = new Manager();
  global.GameProxy = GameProxy;
  global.GameManager = GameManager;

  GameProxy.getInstance().on('ready', async () => {
    // 创建窗口，并且防止多开
    mainWindow = await createMainWindow();
    mainWindow = singleInstance.bindWindow(mainWindow);

    // GameProxy?.setRouter('jkt.game.yuuki.me', 443);
    // GameProxy?.enableSystemProxy();
  });
  GameProxy.start();
})

app.on('window-all-closed', () => {
  mainWindow = null;
  popupWindow = null;

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    mainWindow = await createMainWindow();
  }
})
