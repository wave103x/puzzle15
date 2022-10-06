import 'normalize.css'
import './style.css'
import '../../assets/styles/general.css'


//      burger menu

const burgerIcon = document.querySelector('.header__burger');
const burgerMenu = document.querySelector('.burger-menu');
const overlay = document.querySelector('.overlay_menu');

burgerIcon.addEventListener('click', (event) => {
    burgerMenu.classList.toggle('burger-menu_active');
    overlay.classList.toggle('overlay_active')

    if (burgerIcon.firstElementChild.src.includes('burger.svg')) {
        burgerIcon.firstElementChild.src = './assets/close.svg';
    } else {
        burgerIcon.firstElementChild.src = './assets/burger.svg';
    }
});

document.addEventListener('click', (event) => {

    if (event.target === overlay) {

        burgerMenu.classList.toggle('burger-menu_active');
        overlay.classList.toggle('overlay_active');

        if (burgerIcon.firstElementChild.src.includes('burger.svg')) {
            burgerIcon.firstElementChild.src = './assets/close.svg';
        } else {
            burgerIcon.firstElementChild.src = './assets/burger.svg';
        }
    }
})


//      amount

const anotherAmountInput = document.querySelector('.input-text_number');
const radiosAmount = document.querySelector('.donate-form__amount');
const radioBtnsAmount = document.querySelectorAll('.donate-amount__item input');

radiosAmount.addEventListener('click', (event) => {
    event.target.previousElementSibling.checked = true;
    event.preventDefault();
    anotherAmountInput.value = +event.target.textContent.slice(1);
})


anotherAmountInput.addEventListener('input', () => {
    if (anotherAmountInput.value.length > 4) {
        anotherAmountInput.value = anotherAmountInput.value.slice(0,4);
    }

    let choosenElement = Array.from(radioBtnsAmount).find(e => +e.value === +anotherAmountInput.value);
    choosenElement.checked = true;
    anotherAmountInput.value = choosenElement.value;
})