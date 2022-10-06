'use strict'

import 'normalize.css'
import './style.css'
import '../../assets/styles/general.css'
import '../../assets/images/bamboo-cap.jpg'
import '../../assets/images/flower_foto1.png'
import '../../assets/images/pets-1.jpg'
import '../../assets/images/pets2.jpg'
import '../../assets/images/pets3.jpg'
import '../../assets/images/pets4.jpg'
import '../../assets/images/pets5.jpg'
import '../../assets/images/pets6.jpg'
import '../../assets/images/flower_foto1.png'
import '../../assets/images/palm_foto.png'
import '../../assets/images/user2.jpg'
import '../../assets/images/user3.jpg'
import '../../assets/images/user4.jpg'
import '../../assets/icons/banana-bamboo_icon.svg'
import '../../assets/icons/arrow.svg'
import '../../assets/icons/card.svg'
import '../../assets/icons/zoo.svg'
import '../../assets/icons/monkey.svg'
import '../../assets/icons/user_icon.svg'
import '../../assets/icons/fb-logo.svg'
import '../../assets/icons/instagram.svg'
import '../../assets/icons/twitter.svg'
import '../../assets/icons/youtube.svg'
import '../../assets/icons/meet-fish_icon.svg'
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
    let target = event.target.closest('.testimonials-layout__item');
    if (!target) return;
    overylayTestimonials.classList.toggle('overlay_active');

    let testimonial = target.cloneNode(true);
    testimonial.classList.add('testimonial_popup');
    overylayTestimonials.append(testimonial)
})

overylayTestimonials.addEventListener('click', (event) => {
    let testimonial = document.querySelector('.testimonial_popup');
    if (!event.target.closest('.testimonial_popup')) {
        testimonial.remove();
        overylayTestimonials.classList.toggle('overlay_active');
    }
})