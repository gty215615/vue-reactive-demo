
const targetMap = new WeakMap()

type EffectGetter = () => void

let activeEffect: EffectGetter | null = null

class Ref<T>{
    private _value: T;
    constructor(value: T) {
        this._value = value;
    }
    get value() {
        //  收集依赖
        if (activeEffect) {

            let depsMap = targetMap.get(this);
            if (!depsMap) {
                depsMap = new Map()
                targetMap.set(this, depsMap)
            }
            let dep = depsMap.get('value');
            if (!dep) {
                dep = new Set();
                depsMap.set('value', dep)
            }

            if (!dep.has(activeEffect)) {
                //  收集当前正在执行的更新函数
                dep.add(activeEffect)
            }
        }
        return this._value
    }
    set value(newVal) {
        if (this._value != newVal) {
            this._value = newVal
            let depsMap = targetMap.get(this);
            let dep = depsMap.get('value');
            dep.forEach((effect: EffectGetter) => {
                effect()
            });
        }
    }
}

export function ref(value: any) {
    return new Ref(value)
}

const effectStack: Array<EffectGetter> = [];

export function effect(getter: EffectGetter) {

    const effect = createReactiveEffect(getter)
    effect()
}

function createReactiveEffect(getter: EffectGetter) {
    const effect = function () {
        effectStack.push(getter)
        activeEffect = getter
        getter()
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
    }

    return effect
}