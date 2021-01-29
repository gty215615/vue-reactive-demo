"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Watcher_1 = __importDefault(require("./Watcher"));
var watchWatcherOptions = { watch: true };
function watch(getter, cb) {
    var watchWatcher = new Watcher_1.default(getter, __assign(__assign({}, watchWatcherOptions), { cb: cb }));
}
exports.default = watch;
