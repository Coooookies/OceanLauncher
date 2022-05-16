import Proxy from './utils/proxy'
import Manager from './utils/game'

declare global {
  var GameProxy: Proxy | null;
  var GameManager: Manager | null;
}