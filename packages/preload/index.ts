import fs from 'fs'
import { domReady } from './plugins/loader/utils'
import { useLoading } from './plugins/loader/loading'
import { contextBridge, ipcRenderer } from 'electron'
import openBrowser from './plugins/openBrowser'
import appStore from './plugins/appStore'
import windowEvent from './plugins/windowEvent'
import clipboard from './plugins/clipboard'
import protoParser from './plugins/proto'
import tcping from './plugins/tcping'
import game from './plugins/game'
import proxy from './plugins/proxy'
import dialog from './plugins/dialog'

const isDev = process.env.NODE_ENV === 'development';
const { removeLoading, appendLoading } = useLoading();

domReady().then(() => {
  appendLoading()
})

// --------- 导出一些内置方法给渲染进程 ---------
contextBridge.exposeInMainWorld('openBrowser', openBrowser)
contextBridge.exposeInMainWorld('appStore', appStore)
contextBridge.exposeInMainWorld('windowEvent', windowEvent)
contextBridge.exposeInMainWorld('removeLoading', removeLoading)
contextBridge.exposeInMainWorld('clipboard', clipboard)
contextBridge.exposeInMainWorld('protoParser', protoParser)
contextBridge.exposeInMainWorld('tcping', tcping)
contextBridge.exposeInMainWorld('game', game)
contextBridge.exposeInMainWorld('proxy', proxy)
contextBridge.exposeInMainWorld('dialog', dialog)


