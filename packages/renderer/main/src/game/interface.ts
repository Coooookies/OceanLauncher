import type { iConfigGameType } from '../store/configStore';

type iGameType = ({
  available: true,
  version: string
} | {
  available: false,
}) & iConfigGameType

export {
  iGameType
}