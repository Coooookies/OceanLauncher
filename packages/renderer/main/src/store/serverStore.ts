import { defineStore } from 'pinia'
import { iServerType } from '../server'
import { v4 as uuidv4 } from 'uuid'
import config from './configStore'

export type iStoreUpdateCall = (id: string) => void;
export type iServerStoreType = ReturnType<typeof useServerStore>;

export const useServerStore = defineStore({
  id: 'ServerStore',

  state: () => ({
    servers: [] as Array<iServerType>,
  }),

  actions: {
    load() {
      config.getServers()
        .then(servers => {
          this.servers = servers.map(server => ({
            ...server,
            status: 'offline',
            lastUpdateTime: 0,
          }))
        })
    },

    add(host: string, port: number, name: string) {
      this.servers.push({
        id: uuidv4(),
        status: 'offline',
        createTime: Math.round(new Date().getTime() / 1000),
        lastUpdateTime: 0,
        title: name,
        host,
        port
      })
      this.__update__();
    },

    get(id: string) {
      return this.servers.find(server => server.id === id)
    },

    update(id: string, data: iServerType, call?: iStoreUpdateCall) {
      this.servers.forEach((server, index) => {
        if (server.id === id) {
          this.servers[index] = {
            ...data,
            id: server.id
          }
          this.__update__();
          call?.call(this, server.id);
        }
      });
    },

    delete(id: string, call?: iStoreUpdateCall) {
      this.servers = this.servers.filter(server => server.id !== id);
      this.__update__();
      call?.call(this, id);
    },

    __update__() {
      config.saveServers(this.servers.map(({ id, title, host, port, createTime }) => ({
        id,
        title,
        host,
        port,
        createTime
      })));
    }
  }
})
