import type { RequestDetail } from 'anyproxy'
import { ProxyServer, utils } from 'anyproxy'
import { routers } from './routers'
import { options } from './config'
import regedit from './regedit'
import child_proccess from 'child_process';
import axios from 'axios';
import https from 'https';
import path from 'path'
import os from 'os'

const proxyPath = `HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings`;
const proxyEnable = `ProxyEnable`;
const proxyServer = `ProxyServer`;
const proxyOverride = `ProxyOverride`;
const proxyLocalOverrideMap = 'localhost;127.*;10.*;172.16.*;172.17.*;172.18.*;172.19.*;172.20.*;172.21.*;172.22.*;172.23.*;172.24.*;172.25.*;172.26.*;172.27.*;172.28.*;172.29.*;172.30.*;172.31.*;192.168.*'
const DWORD = `REG_DWORD`;

const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

export * from './register'
export default class Proxy {
  private server = new ProxyServer({
    ...options,
    rule: this.getRouterRule()
  });
  private routerHost: string = '';
  private routerPort: number = 0;

  constructor() { }

  start() {
    this.server.start();
  }

  close() {
    this.closeSystemProxy();
    return this.server.close();
  }

  getInstance() {
    return this.server;
  }

  setRouter(host: string, port: number) {
    this.routerHost = host;
    this.routerPort = port;
  }

  getProxyAvailable() {
    const serverInfoApi = '//threeparty-launcher-os.mihoyo.com/'
    const timeout = 8000;

    return new Promise<boolean>((resolve) => {
      Promise.allSettled([
        axios.get(`http:${serverInfoApi}`, { httpsAgent, timeout }),
        axios.get(`https:${serverInfoApi}`, { httpsAgent, timeout })
      ])
        .then(([result_http, result_https]) => {
          if (result_http.status === 'fulfilled' && result_https.status === 'fulfilled') resolve(false);
          else resolve(true);
        })
    })
  }

  private getRouterRule(): any {
    const that = this;
    return {
      *beforeSendRequest(requestDetail: RequestDetail) {
        if (routers.some(router => (requestDetail.requestOptions.hostname + "").includes(router))) {
          // @ts-ignore
          requestDetail.requestOptions.rejectUnauthorized = false;
          requestDetail.requestOptions.hostname = that.routerHost;
          requestDetail.requestOptions.port = that.routerPort;
          if (!!requestDetail.requestOptions.headers) {
            requestDetail.requestOptions.headers.host = that.routerHost;
          }
          return requestDetail;
        }
        return null;
      },
      *beforeDealHttpsRequest() {
        return true;
      }
    }
  }

  enableSystemProxy() {
    // utils.systemProxyMgr.enableGlobalProxy('127.0.0.1', options.port);

    regedit.set(proxyPath, proxyEnable, DWORD, '1');
    regedit.setValue(proxyPath, proxyOverride, proxyLocalOverrideMap);
    regedit.setValue(proxyPath, proxyServer, `127.0.0.1:${options.port}`);
    return this.trustCertificate();
  }

  closeSystemProxy() {
    // utils.systemProxyMgr.disableGlobalProxy();
    regedit.set(proxyPath, proxyEnable, DWORD, '0');
  }

  trustCertificate() {
    if (!utils.certMgr.ifRootCAFileExists()) {
      utils.certMgr.generateRootCA((error, keyPath) => {
        if (!error) {
          const certDir = path.dirname(keyPath);
          return this.installCertificate(certDir);
        } else {
          return false
        }
      })
    }

    return true;
  }

  private installCertificate(certDir?: string): boolean {
    const userProfile = process.env.HOME || process.env.USERPROFILE || os.homedir();
    const certPath = `${!!certDir ? certDir : `${userProfile}\\.anyproxy\\certificates`}\\rootCA.crt`;

    try {
      child_proccess.execSync(`certutil -addstore root "${certPath}"`);
    } catch (e) {
      return false;
    }

    return true;
  }
}