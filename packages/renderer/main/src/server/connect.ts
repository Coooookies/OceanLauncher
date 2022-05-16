import { iServerInformation, iServerRegionStatus } from './interface'
import axios, { AxiosResponse } from 'axios'

const tcping = window.tcping;
const timeout = 8000;

type iPromiseRsp<T> = PromiseSettledResult<AxiosResponse<T>>;

export function getServerInformation(host: string, port: number) {
  const regionListApi = `//${host}:${port}/query_region_list`;
  const serverStatusApi = `//${host}:${port}/status/server`;
  const cancels = {
    regionList_http: axios.CancelToken.source(),
    serverStatus_http: axios.CancelToken.source(),
    regionList_https: axios.CancelToken.source(),
    serverStatus_https: axios.CancelToken.source(),
  }

  const cancel = () =>
    Object.values(cancels).forEach(c => c.cancel());

  return {
    cancel,
    promise: new Promise<iServerInformation>((resolve, reject) => {
      Promise.allSettled([
        axios.get(`http:${regionListApi}`, { timeout, cancelToken: cancels.regionList_http.token }),
        axios.get(`http:${serverStatusApi}`, { timeout, cancelToken: cancels.serverStatus_http.token }),
        axios.get(`https:${regionListApi}`, { timeout, cancelToken: cancels.regionList_https.token }),
        axios.get(`https:${serverStatusApi}`, { timeout, cancelToken: cancels.serverStatus_https.token }),
        tcping.ping(host, port, timeout)
      ]).then(async ([
        regionListData_http,
        serverStatusData_http,
        regionListData_https,
        serverStatusData_https,
        pingData
      ]) => {
        if (pingData.status !== 'fulfilled') return reject();

        const checkStatus = (rsp: iPromiseRsp<unknown>) => rsp.status === 'fulfilled' && rsp.value.status === 200;
        const resolveResponse = async (
          regionListData: iPromiseRsp<string>,
          serverStatusData: iPromiseRsp<iServerRegionStatus>,
        ) => {
          if (regionListData.status !== 'fulfilled') return reject();

          try {
            const pingResult = pingData.value;
            const regionData = regionListData.value.data;
            const regionMap = await window.protoParser.getServerRegion(regionData);
            const serverStatus = serverStatusData.status === 'fulfilled' ? serverStatusData.value.data : null;

            // timeout
            // if (pingResult.duration === -1) reject();

            resolve({
              ping: pingResult.duration,
              allowPc: regionMap.enableLoginPc,
              regions: regionMap.regionList,
              version: serverStatus ? serverStatus.status.version : '',
              playerCount: serverStatus ? serverStatus.status.playerCount : -1,
            })
          } catch (err) { reject(err) }
        }

        if (checkStatus(regionListData_http)) resolveResponse(regionListData_http, serverStatusData_http);
        else if (checkStatus(regionListData_https)) resolveResponse(regionListData_https, serverStatusData_https);
        else reject();
      })
    })
  }
}


// // aixos
// export function getServerInformation(host: string, port: number) {
//   const regionListApi = `http://${host}:${port}/query_region_list`;
//   const serverStatusApi = `http://${host}:${port}/status/server`;
//   const timeout = 8000;
//   const cancels = {
//     regionList: axios.CancelToken.source(),
//     serverStatus: axios.CancelToken.source(),
//   }

//   return {
//     cancel: () => {
//       cancels.regionList.cancel();
//       cancels.serverStatus.cancel();
//     },
//     promise: new Promise<iServerInformation>((resolve, reject) => {
//       Promise.allSettled([
//         axios.get(regionListApi, { timeout, cancelToken: cancels.regionList.token }),
//         axios.get(serverStatusApi, { timeout, cancelToken: cancels.serverStatus.token }),
//         tcping.ping(host, port, timeout)
//       ]).then(async ([regionListData, serverStatusData, pingData]) => {
//         if (regionListData.status === 'fulfilled' && pingData.status === 'fulfilled') {
//           try {
//             const pingResult = pingData.value;
//             const regionMap = await window.protoParser.getServerRegion(regionListData.value.data);
//             const serverStatusAvailable = serverStatusData.status === 'fulfilled';

//             // timeout
//             // if (pingResult.duration === -1) reject();

//             resolve({
//               ping: pingResult.duration,
//               allowPc: regionMap.enableLoginPc,
//               regions: regionMap.regionList,
//               version: serverStatusAvailable ? serverStatusData.value.data.status.version : '',
//               playerCount: serverStatusAvailable ? serverStatusData.value.data.status.playerCount : -1,
//             })
//           } catch (err) { reject(err) }
//         } else reject()
//       })
//     })
//   }
// }
