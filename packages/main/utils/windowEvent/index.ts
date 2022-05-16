import { BrowserWindow, ipcMain } from 'electron'

export function registerWindowEvent(win: BrowserWindow) {
  ipcMain.on("mainwindow:window-commmand", (e, args) => {
    switch (args.type) {
      case 'close': {
        win.close();
        break;
      }
      case 'maximize': {
        if (win.isMaximized()) {
          win.unmaximize();
        } else {
          win.maximize();
        }
        break;
      }
      case 'minimize': {
        win.minimize()
        break;
      }
    }
  })

  win.webContents.on('did-finish-load', () => {
    win.on("maximize", () => {
      win!.webContents.send("mainwindow:window-event", { type: "maximize" })
    })

    win.on("unmaximize", () => {
      win!.webContents.send("mainwindow:window-event", { type: "unmaximize" })
    })

    win.on("focus", () => {
      win!.webContents.send("mainwindow:window-event", { type: "focus" })
    })

    win.on("blur", () => {
      win!.webContents.send("mainwindow:window-event", { type: "blur" })
    })
  });
}