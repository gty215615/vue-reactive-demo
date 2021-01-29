import Watcher from "./Watcher";


type ComputerGetter = () => any

interface IComputer {
    value: any
}
const computedWatcherOptions = { lazy:true }
export default function computed(getter: ComputerGetter): IComputer {
    const def: IComputer = { value: null };
    const computedWatcher = new Watcher(getter,computedWatcherOptions)
    Reflect.defineProperty(def, 'value', {
        get() {
            //   将依赖当前computedWatcher的更新函数 收集起来
            computedWatcher.depend()
            if (computedWatcher.dirty) {
                computedWatcher.evaluate()

            }
            return computedWatcher.value
        }
    })

    return def
}