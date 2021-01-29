"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Dep_1 = __importStar(require("./Dep"));
var Watcher = /** @class */ (function () {
    function Watcher(updateFn, options) {
        // 保存更新函数
        this.updateFn = updateFn;
        this.computed = options === null || options === void 0 ? void 0 : options.lazy;
        this.dirty = options === null || options === void 0 ? void 0 : options.lazy;
        this.watch = options === null || options === void 0 ? void 0 : options.watch;
        this.cb = options === null || options === void 0 ? void 0 : options.cb;
        if (this.computed) {
            // 表示当前的watcher为computedWatcher ， 不需要初始化，
            this.dep = new Dep_1.default();
        }
        else {
            this.get();
        }
    }
    Watcher.prototype.get = function () {
        Dep_1.pushTarget(this);
        var value = this.updateFn();
        Dep_1.popTarget();
        return value;
    };
    Watcher.prototype.updated = function () {
        if (this.computed) {
            //  惰性求值 ， 只需要此时将 dirty 重置为 true 即可，在下次访问依赖的时候再进行更新
            this.dirty = true;
        }
        else if (this.watch) {
            //  watch , 在更新之前先保存上一次的结果值 ， 然后将新、旧值传入watch的回调函数中 
            var oldVal = this.value;
            this.value = this.get();
            this.cb && this.cb(this.value, oldVal);
        }
        else {
            this.get();
        }
    };
    Watcher.prototype.depend = function () {
        var _a;
        if (Dep_1.default.target) {
            (_a = this.dep) === null || _a === void 0 ? void 0 : _a.depend();
        }
    };
    Watcher.prototype.evaluate = function () {
        var _a;
        this.value = this.get();
        this.dirty = false;
        // 通知依赖于当前的 更新函数去执行更新操作
        (_a = this.dep) === null || _a === void 0 ? void 0 : _a.notify();
    };
    return Watcher;
}());
exports.default = Watcher;
