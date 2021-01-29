import Observe from './Observe'
import watch from './Watch'
import computed from './Computed'
const data = {
    count: 1
}

new Observe(data)


const plus = computed(() => {
    return data.count + 1
})

watch(() => {
    return data.count
}, (newVal, oldVal) => {
    console.log(`新值为${newVal},旧值为${oldVal}`);
    console.log(plus.value);
})

document.getElementById('btn')?.addEventListener('click', () => {
    data.count++
    console.log(plus.value);

})

document.getElementById('btn1')?.addEventListener('click', () => {

    console.log(plus.value);

})
