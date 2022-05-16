import { ipcRenderer } from 'electron'
import { ChildProcessWithoutNullStreams } from 'child_process'

export default {
  gameVersionParser: (path: string): Promise<string | null> =>
    ipcRenderer.invoke("gameManager:gameVersionParser", { path }),

  startGame: (path: string): Promise<number> =>
    ipcRenderer.invoke("gameManager:startGame", { path }),

  stopGame: () =>
    ipcRenderer.invoke("gameManager:stopGame"),

  on: (type: 'spawn' | 'close', callback: () => void) => {
    ipcRenderer.on("gameManager:event", (event, args) => {
      if (type === args.type)
        callback.call(args);
    });
  }
}