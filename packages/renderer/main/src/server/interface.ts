import type { iConfigServerType } from '../store/configStore';

type iServerStatus = 'loading' | 'online' | 'offline'

type iServerRegionStatus = {
  retcode: number,
  status: {
    playerCount: number,
    version: string
  }
}

type iServerRegionType = {
  name: string,
  title: string,
  type: string,
  dispatchUrl: string
}

type iServerType = ({
  status: 'loading' | 'offline',
  lastUpdateTime: number,
} | {
  status: 'online',
  lastUpdateTime: number,
} & iServerInformation
) & iConfigServerType

type iServerInformation = {
  ping: number,
  playerCount: number,
  allowPc: boolean,
  regions: Array<iServerRegionType>,
  version: string,
}

export {
  iServerRegionStatus,
  iServerInformation,
  iServerStatus,
  iServerType
}