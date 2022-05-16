export * from './interface';
import type { iConfigServerType } from '../store/configStore';

type iGameManagerEv = 'load' | 'crash' | 'spawn' | 'close';
type iGameManagerEvCall = () => void;


export default class GameManager {
  private proxy = window.proxy;
  private game = window.game;
  private currentServer: iConfigServerType | null = null;
  private lastedServer: iConfigServerType | null = null;
  private calls: { ev: iGameManagerEv, call: iGameManagerEvCall, symbol: Symbol }[] = [];
  private isGameRuning: boolean = false;

  constructor() {
    this.game.on('close', () => {
      this.closeProxy();
      this.trigger('close');
      this.lastedServer = this.currentServer;
      this.currentServer = null;
      this.isGameRuning = false;
    })
  }

  private enableProxy(host: string, port: number) {
    this.proxy.setRouter(host, port);
    return this.proxy.enableSystemProxy();
  }

  private closeProxy() {
    this.proxy.closeSystemProxy();
  }

  start(path: string, server: iConfigServerType) {
    this.trigger('load');
    return new Promise<number>((resolve, reject) => {

      // -1 means proxy is not enabled
      // -2 server is not available
      // -3 game is not available

      const _reject = (err: { code: number }) => {
        this.trigger('crash');
        reject(err);
      }

      const _resolve = (pid: number) => {
        this.currentServer = server;
        this.isGameRuning = true;
        this.trigger('spawn');
        resolve(pid);
      }

      this.proxy.closeSystemProxy();
      this.enableProxy(server.host, server.port).then(state => {
        if (!state) return _reject({ code: -1 });

        this.proxy.getProxyAvailable()
          .then(available => {
            if (!available) return _reject({ code: -2 });
            this.game.startGame(path).then(pid => {
              if (pid === -1) return _reject({ code: -3 });
              else _resolve(pid);
            })
          })
      })
    })
  }

  stop() {
    this.game.stopGame();
  }

  getCurrentServer() {
    return this.currentServer;
  }

  getLastedServer() {
    return this.lastedServer;
  }

  getProxyInstance() {
    return this.proxy;
  }

  getGameInstance() {
    return this.game;
  }

  isRuning() {
    return this.isGameRuning;
  }

  on(ev: iGameManagerEv, call: iGameManagerEvCall) {
    const symbol = Symbol();
    this.calls.push({ ev, call, symbol });
    return {
      remove: () => this.off(symbol)
    }
  }

  off(symbol: Symbol) {
    this.calls = this.calls.filter(call => call.symbol !== symbol);
  }

  private trigger(ev: iGameManagerEv) {
    this.calls.forEach(call => {
      if (call.ev === ev) call.call.call(this);
    })
  }
}