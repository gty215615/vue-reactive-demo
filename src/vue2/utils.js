"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.isPlainObject = void 0;
function isPlainObject(target) {
    if (Object.prototype.toString.call(target).slice(8, -1) === 'Object') {
        return true;
    }
    return false;
}
exports.isPlainObject = isPlainObject;
function isArray(target) {
    return Array.isArray(target);
}
exports.isArray = isArray;
