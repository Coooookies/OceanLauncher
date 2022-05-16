import { createI18n } from 'vue-i18n'
import i18nZhCn from './locales/zh-cn.json'
import i18nEnUs from './locales/en-us.json'

type i18nMapType = {
  [key: string]: {
    name: string,
    i18n: any
  }
}

type i18nItemMap = {
  [key: string]: any
}
type i18nItemType = {
  key: string,
  title: string
}

const i18ns: Array<i18nItemType> = [];
const i18nItems: i18nItemMap = {};
const i18nMap: i18nMapType = {
  "en-us": {
    name: 'English',
    i18n: i18nEnUs
  },
  "zh-cn": {
    name: '简体中文',
    i18n: i18nZhCn
  },
}


Object.keys(i18nMap).forEach(key => {
  i18nItems[key] = i18nMap[key].i18n;
  i18ns.push({
    key,
    title: i18nMap[key].name
  })
})

const i18n = createI18n({
  locale: 'en-us',
  messages: i18nItems,
})

export {
  i18n,
  i18ns,
}