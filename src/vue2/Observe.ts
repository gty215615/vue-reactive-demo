
import { isPlainObject, isArray } from './utils'
import Dep from './Dep'
interface IObserve {
    [key: string]: any
}

export default class Observe {
    value: IObserve | Array<any>;
    constructor(value: IObserve | Array<any>) {
        this.value = value
        if (isPlainObject(this.value)) {
            this.walk()
        } else {
            //  劫持数组
        }
    }
    walk() {
        Object.keys(this.value).forEach(key => {
            defineReactive(this.value, key)
        })
    }
}

export function defineReactive(target: IObserve, key: string) {
    let val = target[key];
    const dep = new Dep()
    Reflect.defineProperty(target, key, {
        get() {
            dep.depend()
            return val
        },
        set(newVal) {
            if (val != newVal) {
                val = newVal
                dep.notify()
            }
        }
    })
}