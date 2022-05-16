import windowEvent from '@/../preload/plugins/windowEvent'
import openBrowser from 'packages/preload/plugins/openBrowser'
import appStore from '@/../preload/plugins/appStore'
import clipboard from '@/../preload/plugins/clipboard'
import protoParser from '@/../preload/plugins/proto'
import tcping from '@/../preload/plugins/tcping'
import game from '@/../preload/plugins/game'
import proxy from '@/../preload/plugins/proxy'
import dialog from '@/../preload/plugins/dialog'

export { }

declare global {
  interface Window {
    removeLoading: () => void,
    windowEvent: typeof windowEvent,
    openBrowser: typeof openBrowser,
    appStore: typeof appStore,
    clipboard: typeof clipboard,
    protoParser: typeof protoParser,
    tcping: typeof tcping,
    game: typeof game,
    proxy: typeof proxy,
    dialog: typeof dialog
  }
}
