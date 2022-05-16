export function argsChecker(host: string, port: string | number, name: string): number {
  const srvHost = host.trim();
  const srvPort = typeof port === 'number' ? port : +port.trim();
  const srvName = name.trim();

  if (!srvName) {
    return -1;
  }

  if (!srvHost || srvHost.indexOf('.') === -1) {
    return -2;
  }

  if (srvPort < 0 || srvPort > 65535 || Number.isNaN(srvPort)) {
    return -3;
  }

  if (srvPort === 0) {
    if (typeof port === 'string') {
      const portStrTrim = port.trim();

      switch (portStrTrim) {
        case '': {
          if (port === '') return 1;
          else return -3;
        }
        case '0': return -3;
      }
    } else return -3;
  }

  return 0;
}