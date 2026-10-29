import * as bootstrap from "https://cdn.jsdelivr.net/npm/bootstrap@6.0.0-alpha.1/dist/js/bootstrap.bundle.min.js";

const element = document.querySelector('.strength')
const strength = new bootstrap.Strength(element,{
    input: '#password',
    minLength: 8,
    maxLength: 18,
    minDigits: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 1,
    showPopover: true,
    messages: {
        weak: 'Débil',
        fair: 'Puede mejorar',
        good: 'Buena',
        strong: 'Fuerte'
    },
})