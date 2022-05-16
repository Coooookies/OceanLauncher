import { Socket } from 'net';

type TcpingError = NodeJS.ErrnoException | Error;

export interface TcpingOptions {
  host: string;
  port: number;
  timeout: number;
}

export interface TcpingResult extends TcpingOptions {
  duration: number;
  error?: TcpingError;
}

export const tcping = (options: TcpingOptions): Promise<TcpingResult> => {
  const socket = new Socket();
  const startTime = process.hrtime();

  const result = (error?: TcpingError) => {
    const end = process.hrtime(startTime);
    const duration = !!error ? -1 : Math.floor((end[0] * 1e9 + end[1]) / 1e6);
    socket.destroy();
    return { ...options, duration, error };
  };

  const { host, port, timeout } = options;
  return new Promise((resolve) => {
    socket.connect(port, host, () => resolve(result()));
    socket.on('error', (error) => resolve(result(error)));
    socket.setTimeout(timeout, () =>
      resolve(result(Error(`timeout (${timeout}ms)`)))
    );
  });
};