/**
 * 兼容性处理
 */

export { }

import os from 'os'
import { app } from 'electron'

const isWin7 = os.release().startsWith('6.1');

// 禁用硬件加速
if (isWin7)
  app.disableHardwareAcceleration();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// app.commandLine.appendSwitch('ignore-certificate-errors', 'true');
// app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');
// app.commandLine.appendSwitch('no-sandbox');
// app.commandLine.appendSwitch('disable-gpu-sandbox');
app.commandLine.appendSwitch('in-process-gpu');
app.commandLine.appendSwitch('disable-blink-features', 'BlockCredentialedSubresources');
app.commandLine.appendSwitch('high-dpi-support', '1');


