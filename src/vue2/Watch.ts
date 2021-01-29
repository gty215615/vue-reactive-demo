
import Watcher from './Watcher'
type WatchGetter<T> = () => T
export type WatchCallback<T> = (newVal: T, oldVal: T) => void
const watchWatcherOptions = { watch: true }
export default function watch<T>(getter: WatchGetter<T>, cb: WatchCallback<T>) {
    const watchWatcher = new Watcher(getter, { ...watchWatcherOptions, cb })
}