import { Base64 } from 'js-base64';

const marker = "freeshin::"

export function serverCodeParser(code: string): { name: string, host: string, port: number } | null {
  if (code.substring(0, marker.length) !== marker) return null;
  
  const code_base64 = code.substring(marker.length, code.length)
  const decode = Base64.decode(code_base64)

  try {
    const { host, port, name } = JSON.parse(decode);
    if (typeof host !== 'string' || typeof port !== 'number' || typeof name !== 'string') return null;
    return { host, port, name };
  } catch (error) {
    return null;
  }
}

export function serverCodeBuilder(name: string, host: string, port: number): string {
  const basic = JSON.stringify({ host, port, name });
  const encode = Base64.encode(basic);
  return `${marker}${encode}`
}