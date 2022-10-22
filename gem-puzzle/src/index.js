'use strict'
import './scss/main.scss';
import clickSound from './assets/sounds/zn.wav'
import dropSound from './assets/sounds/Water_04.wav'
import dragSound from './assets/sounds/pa1.wav'


// let gameSize = 4;


let statsObj = {
    gameSize: 4,
    duration: 0,
    savedSteps: 0,
    steps: 0,
    layout: [],
    mute: false,
}

//create main container
const container = document.createElement('div');
container.classList.add('container');
document.body.append(container);


//generate game board, add drop behavior for cells
let empty = generateGame(statsObj.gameSize);


function drugNclick() {
    //create array of empty cell siblings,
    let epmtySiblings = findEmptySides(statsObj.gameSize);

    //make siblings draggable and add them a class during dragging
    makeDraggable(epmtySiblings);

    //make siblings clickable and swap cells, run findEmptySides();
    epmtySiblings.forEach(e => e.addEventListener('click', moveOnClick));
}

drugNclick();


//create h1
const h1 = document.createElement('h1');
h1.textContent = 'Pyatnashki';
h1.className = 'h1';
document.body.prepend(h1);

//create buttons, duration, score
const controls = createControls();

//create Steps div
const stepsDiv = document.querySelector('.scores__steps');
stepsDiv.textContent = 'Steps: 0';

//start timer
const durationDiv = document.querySelector('.scores__duration');
durationDiv.textContent = 'Duration: 0';


const buttons = document.createElement('div');
buttons.className = 'controls__btns';
controls.append(buttons);
buttons.innerHTML = `
    <button class="button button_controls reset">reset</button>
    <div>
        <button class="button button_controls save">save</button>
        <button class="button button_controls load">load</button>
    </div>
    <label class="button">
        <input class="sound-input" type="checkbox" checked>
        sound
    </label>
    <div>
        <button class="button button_controls x3">3 &#10005; 3</button>
        <button class="button button_controls x4">4 &#10005; 4</button>
        <button class="button button_controls x8">8 &#10005; 8</button>
    </div>
`;
const resetBtn = document.querySelector('.reset');
const saveBtn = document.querySelector('.save');
const loadBtn = document.querySelector('.load');
const x3Btn = document.querySelector('.x3');
const x4Btn = document.querySelector('.x4');
const x8Btn = document.querySelector('.x8');



durationDiv.textContent = 'Duration: 0';
let currentTime = 0;
setInterval(() => {
    currentTime++;
    if (currentTime < 60) {
        durationDiv.textContent = 'Duration: ' + currentTime;
    } else {
        let mins = Math.trunc(currentTime / 60);
        let sec = currentTime % 60;
        durationDiv.textContent = 'Duration: ' + mins + ':' + String(sec).padStart(2,0);
    }
}, 1000);


//add reset Button behavior
resetBtn.addEventListener('click', function () {
    statsObj.duration = 0;
    statsObj.steps = 0;
    currentTime = 0;
    durationDiv.textContent = 'Duration: 0';

    empty = generateGame(statsObj.gameSize);
    drugNclick();
    stepCountUp('reset');
})


saveBtn.addEventListener('click', function () {
    statsObj.duration = currentTime;
    statsObj.savedSteps = statsObj.steps;
    statsObj.layout = saveLayout();
})

loadBtn.addEventListener('click', () => {
    if (!statsObj.layout.length) {
        alert('Save game to load game')
        return false;
    }
    currentTime = statsObj.duration;
    if (currentTime < 60) {
        durationDiv.textContent = 'Duration: ' + currentTime;
    } else {
        let mins = Math.trunc(currentTime / 60);
        let sec = currentTime % 60;
        durationDiv.textContent = 'Duration: ' + mins + ':' + String(sec).padStart(2,0);
    }

    statsObj.steps = statsObj.savedSteps;
    stepsDiv.textContent = 'Steps: ' + statsObj.savedSteps;
    empty = generateGame(statsObj.gameSize, 'load');
    drugNclick();
})


const soundInput = document.querySelector('.sound-input');
soundInput.addEventListener('input', () => {
    statsObj.mute = !statsObj.mute;
})

x3Btn.addEventListener('click', () => {
    startNewGame(3);
})
x4Btn.addEventListener('click', () => {
    startNewGame(4);
})
x8Btn.addEventListener('click', () => {
    startNewGame(8);
})





function startNewGame(gameSize) {
    currentTime = 0;
    durationDiv.textContent = 'Duration: 0';
    statsObj.gameSize = gameSize;
    statsObj.duration = 0;
    statsObj.savedSteps = 0;
    empty = generateGame(statsObj.gameSize);
    drugNclick();
}

function saveLayout() {
    let layout = document.querySelector('.game-grid');
    let digitsArr = Array.from(layout.children).map(e => e.textContent)
    return digitsArr;
}


function stepCountUp(reset) {
    if (reset) {
        statsObj.steps = 0;
        stepsDiv.textContent = 'Steps: 0';
    } else {
        statsObj.steps++;
        stepsDiv.textContent = `Steps: ${statsObj.steps}`;
    }
}

function createControls() {
    const controls = document.createElement('div');
    controls.className = 'controls'
    document.querySelector('.container').append(controls);

    const scores = document.createElement('div');
    scores.className = 'scores';
    controls.append(scores);

    scores.innerHTML = `
        <div class="scores__duration"></div>
        <div class="scores__steps"></div>
    `;
    return controls;
}


function drop() {
    const dragging = document.querySelector('.draggable_dragging');
    let tmp = empty.previousElementSibling || empty.nextElementSibling;
    if (!empty.previousElementSibling) {
        dragging.after(empty);
        tmp.before(dragging);
    } else {
        dragging.before(empty);
        tmp.after(dragging);
    }
    stepCountUp();
    drugNclick();

    const soundDrop = new Audio(dropSound);
    soundDrop.volume = 0.5;
    if (!statsObj.mute) soundDrop.play();
}

function moveOnClick(elem) {
    this.style.left = empty.offsetLeft - this.offsetLeft + 'px';
    this.style.top = empty.offsetTop - this.offsetTop + 'px';
    let tmp = empty.previousElementSibling || empty.nextElementSibling;
    this.classList.toggle('cell-animation');

    const soundClick = new Audio(clickSound);
    soundClick.volume = 0.3;
    if (!statsObj.mute) soundClick.play();
    elem.onclick = null;
    stepCountUp();
    setTimeout(() => {
        if (!empty.previousElementSibling) {
            this.style.left = 0;
            this.style.top = 0;
            this.after(empty);
            tmp.before(this);
            this.classList.toggle('cell-animation');
        } else {
            this.style.left = 0;
            this.style.top = 0;
            this.before(empty);
            tmp.after(this);
            this.classList.toggle('cell-animation');
        }
        drugNclick();
    }, 300);

}


function findEmptySides(gameSize) {
    //create array of empty cell's siblings
    let gridArr = [...document.querySelectorAll('.cell')];
    const empty = document.querySelector('.cell_empty');
    let draggables = [];
    const emptyIndex = gridArr.findIndex(e => e.classList.contains('cell_empty'));
    const nextIndex = gridArr.indexOf(empty.nextElementSibling);
    const prevIndex = gridArr.indexOf(empty.previousElementSibling);
    gridArr[emptyIndex - gameSize] && draggables.push(gridArr[emptyIndex - gameSize]);
    gridArr[emptyIndex + gameSize] && draggables.push(gridArr[emptyIndex + gameSize]);
    if (empty.nextElementSibling && (nextIndex) % gameSize !== 0) draggables.push(empty.nextElementSibling);
    if (empty.previousElementSibling && (prevIndex + 1) % gameSize !== 0) draggables.push(empty.previousElementSibling);

    //clear draggable and clickable status of all cells
    gridArr.forEach(e => {
        e.draggable = false;
        e.classList.remove('draggable')
    })
    gridArr.forEach(e => e.removeEventListener('click', moveOnClick))
    return draggables;
}


function makeDraggable(arr) {
    arr.forEach(item => {
        item.draggable = true;
        item.classList.add('draggable');

        item.addEventListener('dragstart', () => {
            item.classList.add('draggable_dragging');

            const dragSounds = new Audio(dragSound);
            dragSounds.volume = 0.2;
            if (!statsObj.mute) dragSounds.play();
        })
        item.addEventListener('dragend', () => {
            item.classList.remove('draggable_dragging');
        })
    });
    return arr;
}

function generateGame(size, load) {
    if (container.hasChildNodes()) container.firstElementChild.remove();
    const grid = document.createElement('div');
    grid.classList.add('game-grid');
    container.prepend(grid);
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    let digitsArr = [];
    for (let i = 0; i < size ** 2 - 1; i++) {
        digitsArr.push(i + 1)
    }
    digitsArr.push(' ');
    shuffleArr(digitsArr);

    let layout = [...statsObj.layout];
    if (load) digitsArr = layout.reverse();
    let emptyCell = null;

    for (let i = 0; i < size ** 2; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = digitsArr.pop();
        if (cell.textContent === ' ') {
            emptyCell = cell;
            cell.classList.add('cell_empty')
        }
        grid.append(cell);
    }
    emptyCell.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
    emptyCell.addEventListener('drop', drop);
    return emptyCell;
}

function shuffleArr(arr) {
    let curr = arr.length, randomInd;
    while (curr != 0) {
        randomInd = Math.trunc(Math.random() * curr);
        curr--;
        [arr[curr], arr[randomInd]] = [arr[randomInd], arr[curr]];
    }
    return arr;
}

