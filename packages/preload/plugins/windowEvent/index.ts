import { contextBridge, ipcRenderer } from 'electron'

const sendWindowState = (type: string) => {
  ipcRenderer.send("mainwindow:window-commmand", { type })
}

export default {
  close: () => {
    sendWindowState("close")
  },
  maximize: () => {
    sendWindowState("maximize")
  },
  minimize: () => {
    sendWindowState("minimize")
  },
  on: (type: 'focus' | 'blur' | 'unmaximize' | 'maximize', callback: () => void) => {
    ipcRenderer.on("mainwindow:window-event", (event, args) => {
      if (type === args.type)
        callback.call(args);
    });
  }
}