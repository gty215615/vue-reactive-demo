
import Watcher from './Watcher'
export default class Dep {
    static target: Watcher | null | undefined = null;
    subscribes: Set<Watcher>;
    constructor() {
        this.subscribes = new Set()
    }
    depend() {
        //  收集依赖于当前数据的更新函数
        if (Dep.target) {
            this.subscribes.add(Dep.target)
        }
    }
    notify() {
        //  通知依赖更新数据，重新计算值
        this.subscribes.forEach(watcher => watcher.updated())
    }
}

const targetStack: Array<Watcher> = [];
export function pushTarget(target: Watcher) {
    targetStack.push(target)
    Dep.target = target
}

export function popTarget() {
    targetStack.pop()
    Dep.target = targetStack[targetStack.length - 1]
}