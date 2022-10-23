'use strict'
import './scss/main.scss';
import clickSound from './assets/sounds/zn.wav'
import dropSound from './assets/sounds/Water_04.wav'
import dragSound from './assets/sounds/pa1.wav'

let statsObj = {
    gameSize: 4,
    duration: 0,
    savedSteps: 0,
    steps: 0,
    layout: [],
    layoutStorage: [],
    mute: false,
    win: [],
    leaders: [],
}
if (localStorage.getItem('statsObj')) statsObj = JSON.parse(localStorage.getItem('statsObj'));


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

    if (isWin()) {
        statsObj.leaders.push({
            time: currentTime,
            steps: statsObj.steps,
        })
        leadersUpdate();
        winDiv.innerHTML = `<div class="hooray">Hooray!</div>You solved the puzzle <br>in <span>${formatTime(currentTime)}</span> and <span>${statsObj.steps}</span> moves<div class="exit-text">click anywhere to exit</div>`;
        winDiv.classList.toggle('blured');
        winDiv.classList.toggle('display-block');
        createFirework()
        window.onclick = () => {
            winDiv.classList.toggle('display-block');
            winDiv.classList.toggle('blured');
            window.onclick = null;
        }
    }
    saveStats();
}

drugNclick();


//create h1, buttons, duration, score
const h1 = document.createElement('h1');
h1.textContent = 'Pyatnashki';
h1.className = 'h1';
document.body.prepend(h1);
const controls = createControls();

//create Win message
const winDiv = document.createElement('div');
winDiv.className = 'win-message';
document.body.prepend(winDiv);

//create Steps div
const stepsDiv = document.querySelector('.scores__steps');
stepsDiv.textContent = 'Steps: 0';

//start timer
const durationDiv = document.querySelector('.scores__duration');


const buttons = document.createElement('div');
buttons.className = 'controls__btns';
controls.append(buttons);
buttons.innerHTML = `
    <div>
        <button class="button button_controls reset">reset</button>
        <button class="button button_controls win">win</button>
    </div>
    <div>
        <button class="button button_controls save">save</button>
        <button class="button button_controls load">load</button>
    </div>
        <label class="button">
            <input class="sound-input" type="checkbox" checked>
            sound </label>
    <div class="controls__btns-sizes">
        <input id="x3" type="radio" name="size" value="3" class="controls__input x3"></input>
        <label for="x3" class="button button_controls">3 &#10005; 3</label>

        <input id="x4" type="radio" name="size" value="4" class="controls__input x4"></input>
        <label for="x4" class="button button_controls">4 &#10005; 4</label>

        <input id="x5" type="radio" name="size" value="5" class="controls__input x5"></input>
        <label for="x5" class="button button_controls">5 &#10005; 5</label>

        <input id="x6" type="radio" name="size" value="6" class="controls__input x6"></input>
        <label for="x6" class="button button_controls">6 &#10005; 6</label>

        <input id="x7" type="radio" name="size" value="7" class="controls__input x7"></input>
        <label for="x7" class="button button_controls">7 &#10005; 7</label>

        <input id="x8" type="radio" name="size" value="8" class="controls__input x8"></input>
        <label for="x8" class="button button_controls">8 &#10005; 8</label>
    </div>
`;
const resetBtn = document.querySelector('.reset');
const saveBtn = document.querySelector('.save');
const loadBtn = document.querySelector('.load');
const winBtn = document.querySelector('.win');

//create and update duration
durationDiv.textContent = 'Duration: 00:00';
let currentTime = 0;
setInterval(() => {
    currentTime++;
    durationDiv.textContent = 'Duration: ' + formatTime(currentTime);
}, 1000);


//add reset Button behavior
resetBtn.addEventListener('click', function () {
    statsObj.duration = 0;
    statsObj.steps = 0;
    currentTime = 0;
    durationDiv.textContent = 'Duration: ' + formatTime(currentTime);

    saveStats();
    statsObj.layoutStorage = [];
    empty = generateGame(statsObj.gameSize);
    drugNclick();
    stepCountUp('reset');
})

//create win combination btn
winBtn.addEventListener('click', function () {
    statsObj.duration = 0;
    statsObj.steps = 0;
    currentTime = 0;
    durationDiv.textContent = 'Duration: ' + formatTime(currentTime);

    saveStats();
    statsObj.layoutStorage = [];
    empty = generateGame(statsObj.gameSize, 'win');
    drugNclick();
    stepCountUp('reset');
})


//save btn
saveBtn.addEventListener('click', function () {
    statsObj.duration = currentTime;
    statsObj.savedSteps = statsObj.steps;
    statsObj.layout = saveLayout();
})


//load btn
loadBtn.addEventListener('click', () => {
    if (!statsObj.layout.length) {
        alert('Save game to load game')
        return false;
    }
    if (statsObj.layout.length !== statsObj.gameSize ** 2) {
        alert('invalid game size');
        return false;
    }
    currentTime = statsObj.duration;
    if (currentTime < 60) {
        durationDiv.textContent = 'Duration: ' + formatTime(currentTime);
    }

    statsObj.steps = statsObj.savedSteps;
    stepsDiv.textContent = 'Steps: ' + statsObj.savedSteps;

    empty = generateGame(statsObj.gameSize, 'load');
    drugNclick();
})

//mute / unmute
const soundInput = document.querySelector('.sound-input');
if (statsObj.mute) soundInput.checked = false;
soundInput.addEventListener('input', () => {
    statsObj.mute = !statsObj.mute;
    saveStats();
})


//lister for click to change size
const btnsContols = document.querySelector('.controls__btns-sizes');
btnsContols.addEventListener('change', (e) => {
    startNewGame(e.target.value);
})
//check button of game size after page reload
Array.from(btnsContols.children).forEach(e => {
    e.value == statsObj.gameSize ? e.checked = true : null
})


//create and place the leaderboard
const leadersDiv = document.createElement('aside');
leadersDiv.className = 'leaders';
document.body.append(leadersDiv);
const leaderHeading = document.createElement('h2');
leaderHeading.textContent = 'Leaderboard';
leadersDiv.append(leaderHeading);

let layout = document.querySelector('.game-grid');
leadersDiv.style.left = layout.clientWidth + layout.offsetLeft + 32 + 'px';
leadersDiv.style.top = layout.offsetTop + 'px';

window.onresize = () => {
    if (window.innerWidth < 1000) {
        leadersDiv.style.left = layout.offsetLeft + 'px';
        leadersDiv.style.top = container.offsetTop + container.clientHeight + 24 + 'px';
    } else {
        layout = document.querySelector('.game-grid');
        leadersDiv.style.left = layout.clientWidth + layout.offsetLeft + 32 + 'px';
        leadersDiv.style.top = layout.offsetTop + 'px';
    }
}

if (window.innerWidth < 1000) {
    leadersDiv.style.left = layout.offsetLeft + 'px';
    leadersDiv.style.top = container.offsetTop + container.clientHeight + 24 + 'px';
}
leadersUpdate();








function saveStats() {
    statsObj.layoutStorage = saveLayout();
    localStorage.setItem('statsObj', JSON.stringify(statsObj));
}

function compareObjs(a, b) {
    if (a.steps > b.steps) return 1;
    if (a.steps < b.steps) return -1;
    return 0;
}

function leadersUpdate() {
    const leadersSorted = [...statsObj.leaders].sort(compareObjs).slice(0, 10);
    leadersDiv.innerHTML = null;
    const leaderHeading = document.createElement('h2');
    leaderHeading.textContent = 'Leaderboard';
    leadersDiv.append(leaderHeading);
    leadersSorted.forEach((e) => {
        const leader = document.createElement('div');
        leader.innerHTML = `<span>Steps:</span> ${e.steps}, <span>duration:</span> ${formatTime(e.time)}`;
        leadersDiv.append(leader);
    })
}

function startNewGame(gameSize) {
    currentTime = 0;
    durationDiv.textContent = 'Duration: 00:00';
    statsObj.gameSize = gameSize;
    statsObj.duration = 0;
    statsObj.savedSteps = 0;
    saveStats();
    statsObj.layoutStorage = [];
    empty = generateGame(statsObj.gameSize);
    drugNclick();
}

function saveLayout() {
    let layout = document.querySelector('.game-grid');
    let digitsArr = Array.from(layout.children).map(e => e.textContent);
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

    gridArr[emptyIndex - +statsObj.gameSize] && draggables.push(gridArr[emptyIndex - +statsObj.gameSize]);
    gridArr[emptyIndex + +statsObj.gameSize] && draggables.push(gridArr[emptyIndex + +statsObj.gameSize]);
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
    else if (statsObj.layoutStorage.length) {
        digitsArr = statsObj.layoutStorage.reverse();
    }
    let emptyCell = null;

    if (load === 'win') {
        digitsArr = createWinLayout()
    }

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

function isWin() {
    if (!document.querySelector('.button')) {
        return false;
    }
    statsObj.win = [];
    for (let i = 1; i < statsObj.gameSize ** 2; i++) {
        statsObj.win.push(i)
    }
    let digitsArr = saveLayout();
    return statsObj.win.every((e, i) => {
        return +e === +digitsArr[i]
    })
}

function formatTime(currentTime) {
    let res = '';
    if (currentTime < 60) {
        res = '00:' + String(currentTime).padStart(2, '0');
    } else {
        res = String(Math.trunc(currentTime / 60)).padStart(2, '0') + ':' + String(currentTime % 60).padStart(2, '0');
    }
    return res;
}


function createWinLayout() {
    const win = [];
    for (let i = 1; i < statsObj.gameSize ** 2 - 1; i++) {
        win.push(i)
    }
    win.push(' ')
    win.push(statsObj.gameSize ** 2 - 1)
    return win.reverse();
}


function createFirework() {
    const fireCount = Math.trunc(window.innerWidth/40);
    for (let i = 0; i < fireCount; i++) {
        let flak = document.createElement('div');
        flak.className = 'flak';
        flak.style.left = random(0, window.innerWidth) + 'px';
        flak.style.filter = `hue-rotate(${random(0,360)}deg) blur(7px)`;
        document.body.append(flak);
        flak.animate([
            {transform: `translateY(-${random(400,1400)}px) rotate(${random(40,160)}deg) scale(0.4)`, opacity: '0'}
        ], {
            duration: 5000,
            fill: 'forwards',
        })
    }

}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}