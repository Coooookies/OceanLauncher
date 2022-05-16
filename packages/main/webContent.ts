import { app, BrowserWindow } from 'electron'

// 忽略证书错误。
app.on(
  "certificate-error",
  (event, webContents, url, error, certificate, callback) => {
    callback(true);
  }
);

// webcontent过滤器
export function registerWebContentFilter(win: BrowserWindow) {
  // 接收到的response也要改header，不然会出现跨域问题
  win.webContents.session.webRequest.onHeadersReceived(
    {
      urls: [
        "*://*:*/*",
      ],
    },
    (details, callback) => {
      // 删除corsheader
      details.responseHeaders!["access-control-allow-origin"] ?
        details.responseHeaders!["access-control-allow-origin"] = ["*"] :
        details.responseHeaders!["Access-Control-Allow-Origin"] = ["*"];

      callback({
        cancel: false,
        responseHeaders: details.responseHeaders,
        statusLine: details.statusLine,
      });
    }
  );
}