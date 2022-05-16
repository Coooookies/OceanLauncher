import ffi from 'ffi-napi';
import os from 'os'
import path from 'path'
import * as protobuf from 'protobufjs';
import type { iProtoServerRegion } from './interface'

const isDev = process.env.NODE_ENV === 'development'
const protoPath = path.join(
  __dirname,
  `../../${isDev ? '' : '../'}proto`
);

export function getServerRegion(query_region_list: string): Promise<iProtoServerRegion> {
  return new Promise((resolve, reject) => {
    protobuf.load(
      `${protoPath}/QueryRegionListHttpRsp.proto`,
    )
      .then(root => {
        const testMessage = root.lookupType('QueryRegionListHttpRsp');
        const message = testMessage!
          .decode(Buffer.from(query_region_list, 'base64'))
          .toJSON();

        resolve(message as iProtoServerRegion)
      })
      .catch(reject)
  })
}