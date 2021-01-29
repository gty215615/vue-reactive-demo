"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observe_1 = __importDefault(require("./Observe"));
var Watch_1 = __importDefault(require("./Watch"));
var Computed_1 = __importDefault(require("./Computed"));
var data = {
    count: 1
};
new Observe_1.default(data);
var plus = Computed_1.default(function () {
    return data.count + 1;
});
Watch_1.default(function () {
    return data.count;
}, function (newVal, oldVal) {
    console.log("\u65B0\u503C\u4E3A" + newVal + ",\u65E7\u503C\u4E3A" + oldVal);
    console.log(plus.value);
});
// document.getElementById('btn')?.addEventListener('click', () => {
//     data.count++
//     console.log(plus.value);
// })
// document.getElementById('btn1')?.addEventListener('click', () => {
//     console.log(plus.value);
// })
