import { i18ns } from '@/global/i18n'
import { defineStore } from 'pinia'

const localStore = window.appStore;
const getter = (key: string) => {
  return new Promise((resolve, reject) => {
    localStore.has(key).then(hasKey => {
      if (hasKey) localStore.get(key).then(resolve).catch(reject)
      else reject()
    })
  })
}

export type iConfigServerType = {
  id: string,
  title: string,
  host: string,
  port: number
  createTime: number
}

export type iConfigGameType = {
  remark: string,
  path: string,
  id: string,
}

const config = {
  saveServers: (servers: iConfigServerType[]) => {
    localStore.set('servers', servers);
  },

  getServers: () => {
    const storeKey = 'servers';

    return new Promise<iConfigServerType[]>(resolve => {
      getter(storeKey)
        .then(servers => resolve(Array.isArray(servers) ? servers : []))
        .catch(() => resolve([]))
    })
  },

  saveGameClients: (servers: iConfigGameType[]) => {
    localStore.set('clients', servers);
  },

  getGameClients: () => {
    const storeKey = 'clients';

    return new Promise<iConfigGameType[]>(resolve => {
      getter(storeKey)
        .then(clients => resolve(Array.isArray(clients) ? clients : []))
        .catch(() => resolve([]))
    })
  },

  saveI18nKey: (key: string) => {
    localStore.set('language', key);
  },

  getI18nKey: () => {
    const storeKey = 'language';
    const defaultKey = i18ns.length > 0 ? i18ns[0].key : '';

    return new Promise<string>(resolve => {
      getter(storeKey)
        .then(i18nKey =>
          resolve(typeof i18nKey === 'string' &&
            !!i18ns.find(i18n => i18n.key === i18nKey) ?
            i18nKey :
            defaultKey)
        )
        .catch(() => resolve(defaultKey))
    })
  },
}

export const useConfigStore = defineStore({
  id: 'ConfigStore',

  state: () => ({
    language: 'en-us',
  }),

  actions: {
    load() {
      config.getI18nKey()
        .then(language => this.language = language)
    }
  }
})

export default config