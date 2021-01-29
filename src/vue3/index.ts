import { ref, effect } from './Ref'

const a = ref(1)


effect(() => {
    console.log('update');
    return a.value + 1
})

a.value++
document.getElementById('btn')?.addEventListener('click', () => {
    a.value++
})

document.getElementById('btn1')?.addEventListener('click', () => {
    console.log(a);
})
