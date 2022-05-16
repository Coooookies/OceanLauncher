type iProtoServerList = {
  name: string,
  title: string,
  type: string,
  dispatchUrl: string
}

type iProtoServerRegion = {
  regionList: Array<iProtoServerList>,
  clientSecretKey: string,
  clientCustomConfigEncrypted: string,
  enableLoginPc: boolean
}

export {
  iProtoServerRegion,
  iProtoServerList
}