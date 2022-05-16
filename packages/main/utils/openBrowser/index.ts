import { BrowserWindow, ipcMain } from 'electron'
import { exec } from 'child_process'

const openDefaultBrowser = function (url: string) {
  switch (process.platform) {
    case "darwin":
      exec(`open ${url}`);
      break;
    case "win32":
      exec(`start ${url}`);
      break;
    default:
      exec(`xdg-open ${url}`);
  }
}

export function registerOpenBrowser(win: BrowserWindow) {
  ipcMain.on("browser:open", (e, args) =>
    openDefaultBrowser(args.url))
}