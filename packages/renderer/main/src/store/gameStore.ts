import { defineStore } from 'pinia'
import { iGameType } from '../game'
import { v4 as uuidv4 } from 'uuid'
import config, { iConfigGameType } from './configStore'

const gameVersionParser = window.game.gameVersionParser;

export type iStoreUpdateCall = (id: string) => void;
export type iGameStoreType = ReturnType<typeof useGameStore>;
export const useGameStore = defineStore({
  id: 'GameStore',

  state: () => ({
    clients: [] as iGameType[],
  }),

  actions: {
    load(call?: () => void) {
      config.getGameClients()
        .finally(call)
        .then(clients => clients.forEach(client => {
          gameVersionParser(client.path).then(version => {
            this.clients.push(!!version ? {
              ...client,
              version,
              available: true
            } : {
              ...client,
              available: false
            })
          })
        }))
    },


    add(remark: string, path: string, version: string) {
      const id = uuidv4();
      this.clients.push({
        available: true,
        id,
        remark,
        path,
        version
      })
      this.__update__();
    },

    delete(id: string) {
      this.clients = this.clients.filter(client => client.id !== id);
      this.__update__();
    },

    get(id: string) {
      return this.clients.find(client => client.id === id)
    },

    update(id: string, data: iConfigGameType, call?: iStoreUpdateCall) {
      this.clients.forEach((client, index) => {
        if (client.id === id) {
          this.clients[index] = {
            ...client,
            ...data,
            id: client.id
          }
          call?.call(this, client.id);
        }
      });
      this.__update__();
    },

    __update__() {
      config.saveGameClients(this.clients.map(({ id, path, remark }) =>
        ({ id, path, remark })))
    }
  }
})
