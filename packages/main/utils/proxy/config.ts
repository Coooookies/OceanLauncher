import type { ProxyOptions } from 'anyproxy'

export const options: ProxyOptions = {
  port: 9485,
  webInterface: { enable: false },
  forceProxyHttps: false,
  dangerouslyIgnoreUnauthorized: true, //false
  wsIntercept: false,
  silent: true
};