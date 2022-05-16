import { app, BrowserWindow } from 'electron'

// 防止多开
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

function bindWindow(window: BrowserWindow) {
  app.on('second-instance', () => {
    if (window) {
      // 当用户想要多开时，拒绝多开请求，然后呼出已经运行的程序
      if (window.isMinimized()) window.restore()
      window.focus()
    }
  })

  return window;
}

export default {
  bindWindow
}