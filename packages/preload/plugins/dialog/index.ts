import { ipcRenderer } from 'electron'
import type { OpenDialogOptions, OpenDialogReturnValue } from 'electron'
export default {
  showOpenDialog: (args: OpenDialogOptions): Promise<OpenDialogReturnValue> =>
    ipcRenderer.invoke("dialog:showOpenDialog", { args }),
}