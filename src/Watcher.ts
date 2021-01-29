
import Dep, { pushTarget, popTarget } from './Dep'

type updateFC = () => any

interface IWatcherOption {
    lazy?: boolean;
    watch?: boolean;
    cb?: (newVal: any, oldVal: any) => void
}


export default class Watcher {
    updateFn: updateFC;
    value: any;// update 更新函数的结果值
    computed?: boolean; // 用来区分当前的watcher是否是惰性求值
    dirty?: boolean; // 用来判断当前的值是否为脏值 ，当dirty为true时表示脏值需要重新计算
    watch?: boolean;
    cb?: (newVal: any, oldVal: any) => void;
    dep?: Dep; // 计算属性 computedWatcher 用来收集依赖用的
    constructor(updateFn: updateFC, options?: IWatcherOption) {
        // 保存更新函数
        this.updateFn = updateFn
        this.computed = options?.lazy
        this.dirty = options?.lazy
        this.watch = options?.watch
        this.cb = options?.cb
        if (this.computed) {
            // 表示当前的watcher为computedWatcher ， 不需要初始化，
            this.dep = new Dep()
        } else {
            this.get()
        }

    }
    get() {
        pushTarget(this)
        const value = this.updateFn()
        popTarget()
        return value
    }
    updated() {
        if (this.computed) {
            //  惰性求值 ， 只需要此时将 dirty 重置为 true 即可，在下次访问依赖的时候再进行更新
            this.dirty = true
        } else if (this.watch) {
            //  watch , 在更新之前先保存上一次的结果值 ， 然后将新、旧值传入watch的回调函数中 
            const oldVal = this.value;
            this.value = this.get()
            this.cb && this.cb(this.value, oldVal)

        } else {

            this.get()
        }
    }
    depend() {
        if (Dep.target) {
            this.dep?.depend()
        }
    }

    evaluate() {
        this.value = this.get();
        this.dirty = false
        // 通知依赖于当前的 更新函数去执行更新操作
        this.dep?.notify()
    }
}