import { inject } from 'vue'
import { iGameMethods } from './interface'

export const GameEditorInjectKey = 'gameEditor:Api';
export function useGameEditor(): iGameMethods {
  const gameEditorApi = inject(GameEditorInjectKey, null);
  if (gameEditorApi === null)
    throw new Error('gameEditorApi is not injected');

  return gameEditorApi;
}