"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.popTarget = exports.pushTarget = void 0;
var Dep = /** @class */ (function () {
    function Dep() {
        this.subscribes = new Set();
    }
    Dep.prototype.depend = function () {
        //  收集依赖于当前数据的更新函数
        if (Dep.target) {
            this.subscribes.add(Dep.target);
        }
    };
    Dep.prototype.notify = function () {
        //  通知依赖更新数据，重新计算值
        this.subscribes.forEach(function (watcher) { return watcher.updated(); });
    };
    Dep.target = null;
    return Dep;
}());
exports.default = Dep;
var targetStack = [];
function pushTarget(target) {
    targetStack.push(target);
    Dep.target = target;
}
exports.pushTarget = pushTarget;
function popTarget() {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
}
exports.popTarget = popTarget;
