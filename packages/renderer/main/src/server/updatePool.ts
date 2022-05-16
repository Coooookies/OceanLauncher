import { iServerStoreType, useServerStore } from '@main/store/serverStore';
import { getServerInformation } from './connect';
import { iServerType } from './interface'
import { v4 as uuidv4 } from 'uuid';

type iServerUpdatePoolEvent = 'update';
type iServerUpdatePoolCall = (id: string) => void;

export class ServerUpdatePool {
  private store: iServerStoreType = useServerStore();
  private calls: {
    call: iServerUpdatePoolCall,
    ev: iServerUpdatePoolEvent,
    mark: Symbol,
  }[] = [];

  private updateQueues: {
    [key: string]: {
      mark: Symbol,
      cancel: () => void
    }
  } = {};

  updateServer(id: string) {
    const server = this.store.get(id);
    if (!!server) {
      this.addQueue(server)
    }
  }

  updateAllServer() {
    this.store.servers.forEach(server => this.addQueue(server));
  }

  on(ev: iServerUpdatePoolEvent, call: iServerUpdatePoolCall) {
    const mark = Symbol();
    this.calls.push({ ev, call, mark });
    return mark
  }

  off(mark: Symbol) {
    this.calls = this.calls.filter(call => call.mark !== mark);
  }

  trigger(ev: iServerUpdatePoolEvent, id: string) {
    this.calls.forEach(callEv => {
      if (callEv.ev === ev)
        callEv.call.call(this, id);
    });
  }

  private addQueue(server: iServerType) {
    const queue = getServerInformation(server.host, server.port);
    const queueMark = Symbol();
    const queueMatch = () => !!this.updateQueues[server.id] && this.updateQueues[server.id].mark === queueMark;
    const getTime = () => Math.round(new Date().getTime() / 1000);

    this.store.update(server.id, {
      ...server,
      status: 'loading'
    })

    queue.promise
      .then(data => {
        if (queueMatch())
          this.store.update(server.id, {
            ...server,
            ...data,
            lastUpdateTime: getTime(),
            status: 'online',
          })
      })
      .catch(() => {
        if (queueMatch())
          this.store.update(server.id, {
            ...server,
            status: 'offline',
            lastUpdateTime: getTime(),
          })
      })
      .finally(() => {
        if (queueMatch()) {
          delete this.updateQueues[server.id];
          this.trigger('update', server.id);
        }
      })

    if (!!this.updateQueues[server.id])
      this.updateQueues[server.id].cancel();

    this.updateQueues[server.id] = {
      mark: queueMark,
      cancel: queue.cancel,
    }
  }
}