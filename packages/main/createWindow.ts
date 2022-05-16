/**
 * 创建electron窗口，程序的所有窗口创建的操作都在这里
 */

import path from 'path'
import { app, BrowserWindow } from 'electron'
import { registerWebContentFilter } from './webContent'
import { registerWindowEvent } from './utils/windowEvent';
import { registerOpenBrowser } from './utils/openBrowser'
import { registerAppStore } from './utils/appStore'
import { registerClipboard } from './utils/clipboard'
import { registerProtoParser } from './utils/proto'
import { registerTcping } from './utils/tcping'
import { registerGameManager } from './utils/game'
import { registerGameProxy } from './utils/proxy'
import { registerDialog } from './utils/dialog'


export async function createMainWindow() {

  const width = 640; // 默认窗口宽度
  const height = 380; // 默认窗口高度
  const backgroundColor = "#EAEAEA"; //背景颜色
  const loadFile = "main"; // UI入口
  const title = "gslauncher"; //标题

  const win = new BrowserWindow({
    title,
    width,
    height,
    minWidth: width,
    minHeight: height,
    show: false,
    frame: false,
    resizable: false,
    backgroundColor: backgroundColor,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.cjs'),
      // nodeIntegration: true,
      // contextIsolation: false,
    },
  });

  // 加载完成后显示窗口
  win.on("ready-to-show", () => {
    win.show();
    win.restore();
    win.focus();
  })

  registerClipboard(win);
  registerWebContentFilter(win);
  registerWindowEvent(win);
  registerOpenBrowser(win);
  registerAppStore(win);
  registerProtoParser(win);
  registerTcping(win);
  registerGameManager(win);
  registerDialog(win);
  registerGameProxy(win);


  // app是否被打包
  if (app.isPackaged) {
    // 从打包的文件中读入UI
    win.loadFile(path.join(__dirname, `../renderer/${loadFile}.html`))
  } else {
    // 🚧 Use ['ENV_NAME'] avoid vite:define plugin
    // 从调试服务器读入UI
    const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}/${loadFile}.html`

    win.loadURL(url)
  }
  win.webContents.openDevTools({ mode: 'detach' });

  // 防止用户手欠用快捷键缩放
  win.webContents.on("did-finish-load", () => {
    win.webContents.setZoomFactor(1);
    win.webContents.setVisualZoomLevelLimits(1, 1);
  })

  return win;
}