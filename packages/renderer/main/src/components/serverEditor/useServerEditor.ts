import { inject } from 'vue'
import { iServerMethods } from './interface'

export const ServerEditorInjectKey = 'serverEditor:Api';
export function useServerEditor(): iServerMethods {
  const serverEditorApi = inject(ServerEditorInjectKey, null);
  if (serverEditorApi === null)
    throw new Error('serverEditorApi is not injected');

  return serverEditorApi;
}