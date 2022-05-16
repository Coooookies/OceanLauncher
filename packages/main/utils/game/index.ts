import fs from 'fs'
import child_process, { ChildProcessWithoutNullStreams } from 'child_process'

const gameName = {
  ZH: 'YuanShen',
  EN: 'Genshinimpact'
}

type iGameCallbackEv = 'spawn' | 'close'
type iGameCallback = () => void;

export * from './register';
export default class GameManager {
  private gameProcess: ChildProcessWithoutNullStreams | null = null;
  private gameListenerInterval: NodeJS.Timer | null = null;
  private calls: {
    mark: Symbol,
    ev: iGameCallbackEv,
    call: iGameCallback
  }[] = []

  gameVersionParser(path: string) {
    const getVersion = (file: Buffer) => {
      const VERSION_REG = /(\d*\.\d*\.\d*\_\d*\_\d*)/;
      const fileString = file.toString();
      const fileversion = fileString.match(VERSION_REG);
      return fileversion && fileversion.length >= 2 ? fileversion[1].substring(0, fileversion[1].indexOf("_")) : null;
    }

    const FILENAME = 'globalgamemanagers';
    const FILEPATH_CN = `${path}\\${gameName.ZH}_Data\\${FILENAME}`;
    const FILEPATH_EN = `${path}\\${gameName.EN}_Data\\${FILENAME}`;

    const FILEPATH_CN_EXISTS = fs.existsSync(FILEPATH_CN)
    const FILEPATH_EN_EXISTS = fs.existsSync(FILEPATH_EN)

    // 判断文件是否存在
    if (FILEPATH_CN_EXISTS || FILEPATH_EN_EXISTS) {
      try {
        const FILE = fs.readFileSync(FILEPATH_CN_EXISTS ? FILEPATH_CN : FILEPATH_EN);
        return !!FILE ? getVersion(FILE) : null;
      } catch {
        return null;
      }
    } else return null;
  }

  startGame(path: string) {
    const FILEPATH_CN = `${path}\\${gameName.ZH}.exe`;
    const FILEPATH_EN = `${path}\\${gameName.EN}.exe`;

    const FILEPATH_CN_EXISTS = fs.existsSync(FILEPATH_CN)
    const FILEPATH_EN_EXISTS = fs.existsSync(FILEPATH_EN)

    if (FILEPATH_CN_EXISTS || FILEPATH_EN_EXISTS) {
      const proc = child_process.spawn(FILEPATH_CN_EXISTS ? FILEPATH_CN : FILEPATH_EN);
      if (typeof proc.pid === 'number') {
        this.gameProcess = proc;
        this._gameProcessListener();
        return proc.pid;
      } else return -1
    } else return -1;
  }

  stopGame() {
    this.gameProcess?.kill();
  }

  private _gameProcessListener() {
    this.trigger('spawn');
    this.gameProcess?.on('close', (code) => this.trigger('close'))
  }

  on(ev: iGameCallbackEv, call: iGameCallback) {
    const mark = Symbol();
    this.calls.push({ mark, ev, call });
    return mark;
  }

  off(mark: Symbol) {
    this.calls = this.calls.filter(call => call.mark !== mark);
  }

  trigger(ev: iGameCallbackEv) {
    this.calls.forEach(call => {
      if (call.ev === ev) call.call.call(this);
    })
  }
}   