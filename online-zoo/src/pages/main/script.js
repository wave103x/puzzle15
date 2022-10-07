'use strict'

import 'normalize.css'
import './style.css'
import '../../assets/styles/general.css'
import '../../assets/images/bamboo-cap.jpg'
import '../../assets/images/flower_foto1.png'
import pet1 from '../../assets/images/pets-1.jpg'
import pet2 from '../../assets/images/pets2.jpg'
import pet3 from '../../assets/images/pets3.jpg'
import pet4 from '../../assets/images/pets4.jpg'
import pet5 from '../../assets/images/pets5.jpg'
import pet6 from '../../assets/images/pets6.jpg'
import pet7 from '../../assets/images/krok.jpg'
import '../../assets/images/flower_foto1.png'
import '../../assets/images/palm_foto.png'
import '../../assets/images/user2.jpg'
import '../../assets/images/user3.jpg'
import '../../assets/images/user4.jpg'
import banana from '../../assets/icons/banana-bamboo_icon.svg'
import '../../assets/icons/arrow.svg'
import '../../assets/icons/card.svg'
import '../../assets/icons/zoo.svg'
import '../../assets/icons/monkey.svg'
import '../../assets/icons/user_icon.svg'
import '../../assets/icons/fb-logo.svg'
import '../../assets/icons/instagram.svg'
import '../../assets/icons/twitter.svg'
import '../../assets/icons/youtube.svg'
import meat from '../../assets/icons/meet-fish_icon.svg'
import '../../assets/icons/burger.svg'
import '../../assets/icons/close.svg'
import '../../assets/icons/x_icon.svg'

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



// testimonials pop-up

const testimonials = document.querySelector('.testimonials__layout');
const overylayTestimonials = document.querySelector('.overlay_testimonials')

testimonials.addEventListener('click', (event) => {
    if (window.innerWidth > 640) return;
    let target = event.target.closest('.testimonials-layout__item');

    if (!target) return;

    overylayTestimonials.classList.toggle('overlay_active');

    let testimonial = target.cloneNode(true);
    testimonial.classList.add('testimonial_popup');
    overylayTestimonials.append(testimonial);
})

overylayTestimonials.addEventListener('click', (event) => {
    let testimonial = document.querySelector('.testimonial_popup');
    // if (!event.target.closest('.testimonial_popup')) {
    testimonial.remove();
    overylayTestimonials.classList.toggle('overlay_active');

})



//      pets slider

const petsContainer = document.querySelector('.pets__container');
const rightArrowPets = document.querySelector('.button-arrow_right');
const leftArrowPets = document.querySelector('.button-arrow_left');

//create objects with pet's data
function Pet(imgSrc, name, desc, iconSrc) {
    this.imgSrc = imgSrc;
    this.name = name;
    this.desc = desc;
    this.iconSrc = iconSrc;
}

const panda = new Pet(pet1, 'GIANT PANDAS', 'Native to Southwest China', banana);
const eagle = new Pet(pet2, 'eagles', 'Native to South America', meat);
const gorilla = new Pet(pet3, 'Gorillas', 'Native to Congo', banana);
const sloth = new Pet(pet4, 'Two-toed Sloth', 'Mesoamerica, South America', banana);
const chester = new Pet(pet5, 'cheetahs', 'Native to Africa', meat);
const penguin = new Pet(pet6, 'Penguins', 'Native to Antarctica', meat);
const krok = new Pet(pet7, 'Alligators', 'Native to Southeastern U. S.', meat);
const petsArr = [panda, eagle, gorilla, sloth, chester, penguin, krok];

//create and set position of initial slides
let leftLayout = createLayout(petsArr, 'append');
let midLayout = createLayout(petsArr, 'append');
let rightLayout = createLayout(petsArr, 'append');

leftLayout.style.left = '-105%';
midLayout.style.position = 'relative';
midLayout.style.left = '0%';
rightLayout.style.left = '105%';

//shift slides via clicking on arrow buttons
rightArrowPets.onclick = shiftRight;
leftArrowPets.onclick = shiftLeft;



function createLayout(arrOfPets, whatPend) {
    const petsLayout = document.createElement('div');
    petsLayout.className = 'pets__layout';
    if (whatPend === 'append') petsContainer.append(petsLayout);
    if (whatPend ==='prepend') petsContainer.prepend(petsLayout);
    randomizeArr(arrOfPets);
    arrOfPets.length = 6;
    arrOfPets.forEach(e => createPet(e, petsLayout));
    petsLayout.children[0].classList.add('pets__item_disable')
    petsLayout.children[1].classList.add('pets__item_disable')
    return petsLayout;
}

function createPet(petObj, parent) {
    const figa = document.createElement('figure');
    figa.className = 'pets__item';
    figa.innerHTML = `<div class="pets-item__img-wrapper"><img class="pets-item__img" src="${petObj.imgSrc}"
    alt="pet-photo"></div>
<figcaption class="pets-item__caption">
<div>
    <div class="font-btn pets-caption__heading">${petObj.name}</div>
    <div class="font-smalltext pets-caption__text">${petObj.desc}</div>
</div>
<img src="${petObj.iconSrc}" alt="meal icon">
</figcaption>`;
    parent.append(figa);
}

function shiftRight() {
    rightArrowPets.onclick = null;
    let slides = document.querySelectorAll('.pets__layout');
    slides[0].style.left = parseInt(slides[0].style.left) - 105 + '%';
    slides[1].style.left = parseInt(slides[1].style.left) - 105 + '%';
    slides[2].style.left = parseInt(slides[2].style.left) - 105 + '%';

    setTimeout(() => {
        slides[0].remove();
        slides[1].style.position = 'relative';
        slides[2].style.position = 'absolute';
        let right = createLayout(petsArr, 'append');
        right.style.left = '105%';
        rightArrowPets.onclick = shiftRight;
    }, 200);
}

function shiftLeft() {
    leftArrowPets.onclick = null;
    let slides = document.querySelectorAll('.pets__layout');
    slides[0].style.left = parseInt(slides[0].style.left) + 105 + '%';
    slides[1].style.left = parseInt(slides[1].style.left) + 105 + '%';
    slides[2].style.left = parseInt(slides[2].style.left) + 105 + '%';

    setTimeout(() => {
        slides[2].remove();
        slides[0].style.position = 'absolute';
        slides[1].style.position = 'relative';
        let left = createLayout(petsArr, 'prepend');
        left.style.left = '-105%';
        leftArrowPets.onclick = shiftLeft;
    }, 200);
}

function randomizeArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let k = Math.trunc(Math.random() * (i + 1));
        [arr[i], arr[k]] = [arr[k], arr[i]]
    }
}
