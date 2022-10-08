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
import pet8 from '../../assets/images/pets7.jpg'
import '../../assets/images/flower_foto1.png'
import '../../assets/images/palm_foto.png'
import userImg1 from '../../assets/images/user2.jpg'
import userImg2 from '../../assets/images/user3.jpg'
import userImg3 from '../../assets/images/user4.jpg'
import banana from '../../assets/icons/banana-bamboo_icon.svg'
import '../../assets/icons/arrow.svg'
import '../../assets/icons/card.svg'
import '../../assets/icons/zoo.svg'
import '../../assets/icons/monkey.svg'
import userIcon from '../../assets/icons/user_icon.svg'
import '../../assets/icons/fb-logo.svg'
import '../../assets/icons/instagram.svg'
import '../../assets/icons/twitter.svg'
import '../../assets/icons/youtube.svg'
import meat from '../../assets/icons/meet-fish_icon.svg'
import '../../assets/icons/burger.svg'
import '../../assets/icons/close.svg'
import '../../assets/icons/x_icon.svg'

// BURGER MENU

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



// TESTIMONIALS POPUP

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



// PETS SLIDER

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
const gorillaTwo = new Pet(pet8, 'Gorillas', 'Native to Congo', banana);
const sloth = new Pet(pet4, 'Two-toed Sloth', 'Mesoamerica, South America', banana);
const chester = new Pet(pet5, 'cheetahs', 'Native to Africa', meat);
const penguin = new Pet(pet6, 'Penguins', 'Native to Antarctica', meat);
const krok = new Pet(pet7, 'Alligators', 'Native to Southeastern U. S.', meat);
const petsArr = [panda, eagle, gorilla, sloth, chester, penguin, krok, gorillaTwo];

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
    randomizeArr(arrOfPets);
    let tempPets = arrOfPets.slice(0,6);
    tempPets.length = 6;
    tempPets.forEach(e => createPet(e, petsLayout));
    petsLayout.children[0].classList.add('pets__item_disable');
    petsLayout.children[1].classList.add('pets__item_disable');
    if (whatPend === 'append') petsContainer.append(petsLayout);
    if (whatPend ==='prepend') petsContainer.prepend(petsLayout);
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
        slides[1].remove();
        slides[2].style.position = 'relative';
        let left = createLayout(petsArr, 'prepend');
        let right = createLayout(petsArr, 'append');
        left.style.left = '-105%';
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
        slides[1].remove();
        slides[2].remove();
        slides[0].style.position = 'relative';
        let left = createLayout(petsArr, 'prepend');
        let right = createLayout(petsArr, 'append');
        left.style.left = '-105%';
        right.style.left = '105%';
        leftArrowPets.onclick = shiftLeft;
    }, 200);
}

function randomizeArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let k = Math.trunc(Math.random() * (i + 1));
        [arr[i], arr[k]] = [arr[k], arr[i]]
    }
}



// TESTIMONIALS SLIDER

const testimonialRangeInput = document.querySelector('.testimonials__range');
const testimonialLayout = document.querySelector('.testimonials__layout');

//create data for generating testimonials
function Testimonial(iconSrc, name, locale, date, text) {
    this.iconSrc = iconSrc;
    this.name = name;
    this.locale = locale;
    this.date = date;
    this.text = text;
    testims.push(this);
}

const testims = [];
const testim1 = new Testimonial(userIcon, 'Michael John', 'Local Austria', 'Today', "The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.<br> The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.The best online zoo I’ve met. My son delighted very much ljves to watch gouillas. Online zoo is one jf the ways to instill a love for animals.");
const testim2 = new Testimonial(userImg1, 'Oskar Samborsky', 'Local Austria', 'Today', "Now is the winter of our discontent Made glorious summer by this sun of York; And all the clouds that lour'd upon our house In the deep bosom of the ocean buried. Now are our brows bound with victorious wreaths; Our bruised arms hung up for monuments; Our stern alarums changed to merry meetings, Our dreadful marches to delightful measures.");
const testim3 = new Testimonial(userImg2, 'Fredericka Michelin', 'Local Belgia', 'Today', "During the first part of your life, you only become aware of happiness once you have lost it. Then an age comes, a second one, in which you already know, at the moment when you begin to experience true happiness, that you are, at the end of the day, going to lose it. When I met Belle, I understood that I had just entered this second age. I also understood that I hadn’t reached the third age, in which anticipation of the loss of happiness prevents you from living.");
const testim4 = new Testimonial(userImg3, 'Mila Riksha', 'Local Turkey', 'Today', "Your only chance of survival, if you are sincerely smitten, lies in hiding this fact from the woman you love, of feigning a casual detachment under all circumstances. What sadness there is in this simple observation! What an accusation against man! However, it had never occurred to me to contest this law, nor to imagine disobeying it.");
const testim5 = new Testimonial(userIcon, 'Viktoria Loya', 'Local Turkey', 'Today', "Christ, he thinks, by my age I ought to know. You don’t get on by being original. You don’t get on by being bright. You don’t get on by being strong. You get on by being a subtle crook; somehow he thinks that’s what Norris is, and he feels an irrational dislike taking root, and he tries to dismiss it, because he prefers his dislikes rational, but after all, these circumstances are extreme, the cardinal in the mud, the humiliating tussle to get him back in the saddle.");
const testim6 = new Testimonial(userImg2, 'Peter Briffen', 'Local Singapur', 'Yesterday', "In the hospital men’s room, as I’m washing my hands, I glance in the mirror. The man I see is not so much me as my father. When did he show up? There is no soap; I rub hand sanitizer into my face–it burns. I nearly drown myself in the sink trying to rinse it off.");
const testim7 = new Testimonial(userImg3, 'Stewe Simptson', 'Local France', 'Today', "Everything failed to subdue me. Soon everything seemed dull: another sunrise, the lives of heroes, failing love, war, the discoveries people made about each other. The only thing that didn’t bore me, obviously enough, was how much money Tim Price made, and yet in its obviousness it did. There wasn’t a clear, identifiable emotion within me, except for greed and possibly, total disgust. I had all the characteristics of a human being–flesh, blood, skin, hair–but my depersonalization was so intense, had gone so deep, that the normal ability to feel compassion had been eradicated, the victim of a slow, purposeful erasure.");
const testim8 = new Testimonial(userIcon, 'Magnus Red', 'Local England', 'Today', "On foot, from necessity or in deference to his dismounted commander or associates, his conduct was the same. He would stand like a rock in the open when officers and men alike had taken to cover; while men older in service and years, higher in rank and of unquestionable intrepidity, were loyally preserving behind the crest of a hill lives infinitely precious to their country, this fellow would stand, equally idle, on the ridge, facing in the direction of the sharpest fire.");
const testim9 = new Testimonial(userImg2, 'Angela Verkel', 'Local England', 'Today', "For although a man is judged by his actions, by what he has said and done, a man judges himself by what he is willing to do, by what he might have said, or might have done – a judgment that is necessarily hampered, bot only by the scope and limits of his imagination, but by the ever-changing measure of his doubt and self-esteem.");
const testim10 = new Testimonial(userIcon, 'Mika Stoful', 'Local Nordmar', 'Today', "A secret always has a strengthening effect upon a newborn friendship, as does the shared impression than an external figure is to blame: the men of the Crown have become united less by their shared beliefs, we observe, than by their shared misgivings–which are, in the main, externally directed. In their analyses, variously made, of Alastair Lauderback.");
const testim11 = new Testimonial(userImg1, 'Diego Torres', 'Local Spain', 'Yesterdayay', "He stood over the body in the fading light, adjusting the hair and putting the finishing touches to the simple toilet, doing all mechanically, with soulless care. And still through his consciousness ran an undersense of conviction that all was right—that he should have her again as before, and everything explained. He had had no experience in grief; his capacity had not been enlarged by use.");

//generate testimonials
testims.forEach(e => createTestimonial(e));

//add class for hiding exceeding testimonials
Array.from(document.querySelectorAll('.testimonials-layout__item')).slice(3).forEach(e => e.classList.add('testimonial_hide'));

//tweak the input for dealing with smaller window and correct shift via winow resizing
window.addEventListener('resize', function(e) {
    drugInput();
    if (this.innerWidth < 1000) testimonialRangeInput.max = '8';
    else testimonialRangeInput.max = '7';
    if (this.innerWidth <= 640) testimonialLayout.style.left = 0;
})

//move testimonials via drugging input range
testimonialRangeInput.addEventListener('input', drugInput)


function drugInput() {
    testimonialLayout.style.left = testimonialRangeInput.value * -(document.querySelector('.testimonials-layout__item').offsetWidth + 30) + 'px';

}

function createTestimonial(dataObj) {
    let item = document.createElement('div');
    item.className = 'testimonials-layout__item';
    testimonialLayout.append(item);
    item.innerHTML = `<div class="testimonials-item__header">
    <img src="${dataObj.iconSrc}" alt="user-avatar">
    <div class="testimonials-item-header__text">
        <div class="font-body"><b>${dataObj.name}</b></div>
        <div class="testimonials-item-header__subtext font-smallparagraph"><span>${dataObj.locale}</span><span>•</span><span>${dataObj.date}</span></div>
    </div>
</div>
<p class="testimonials-layout__body font-smallparagraph">${dataObj.text}</p>`;
}