import useCurrentInstance from "@main/hook/useCurrentInstance";
import GameManager from '../game'


export function useGamaManager() {
  const { globalProperties } = useCurrentInstance();
  const instance: GameManager =
    globalProperties?.$GameManager;

  return instance
}