"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defineReactive = void 0;
var utils_1 = require("./utils");
var Dep_1 = __importDefault(require("./Dep"));
var Observe = /** @class */ (function () {
    function Observe(value) {
        this.value = value;
        if (utils_1.isPlainObject(this.value)) {
            this.walk();
        }
        else {
            //  劫持数组
        }
    }
    Observe.prototype.walk = function () {
        var _this = this;
        Object.keys(this.value).forEach(function (key) {
            defineReactive(_this.value, key);
        });
    };
    return Observe;
}());
exports.default = Observe;
function defineReactive(target, key) {
    var val = target[key];
    var dep = new Dep_1.default();
    Reflect.defineProperty(target, key, {
        get: function () {
            dep.depend();
            return val;
        },
        set: function (newVal) {
            if (val != newVal) {
                val = newVal;
                dep.notify();
            }
        }
    });
}
exports.defineReactive = defineReactive;
