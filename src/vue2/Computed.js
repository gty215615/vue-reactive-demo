"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Watcher_1 = __importDefault(require("./Watcher"));
var computedWatcherOptions = { lazy: true };
function computed(getter) {
    var def = { value: null };
    var computedWatcher = new Watcher_1.default(getter, computedWatcherOptions);
    Reflect.defineProperty(def, 'value', {
        get: function () {
            //   将依赖当前computedWatcher的更新函数 收集起来
            computedWatcher.depend();
            if (computedWatcher.dirty) {
                computedWatcher.evaluate();
            }
            return computedWatcher.value;
        }
    });
    return def;
}
exports.default = computed;
