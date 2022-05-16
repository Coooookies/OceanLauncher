import { ipcRenderer } from 'electron'
import { iProtoServerRegion } from '../../../main/utils/proto'

export default {
  getServerRegion: (query_region_list: string): Promise<iProtoServerRegion> => ipcRenderer.invoke("proto:getServerRegion", { query_region_list }),
}