import './scss/main.scss';

let gameSize = 4;

//generate game board, add drop behavior for cells
let empty = generateGame(gameSize);
empty.addEventListener('dragover', (e) => {
    e.preventDefault();
})
//swap elements after drop of cell. Run findEmptySides()
empty.addEventListener('drop', drop);

function drugNclick() {
    //create array of empty cell siblings,
    let epmtySiblings = findEmptySides(gameSize);

    //make siblings draggable and add them a class during dragging
    makeDraggable(epmtySiblings);

    //make siblings clickable and swap cells, run findEmptySides();
    epmtySiblings.forEach(e => e.addEventListener('click', moveOnClick));
}

drugNclick();




//create buttons, duration, score
createControls();

//start timer
const currentDuration = startDuration();


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

    drugNclick();
}

function moveOnClick() {
    this.style.left = empty.offsetLeft - this.offsetLeft + 'px';
    this.style.top = empty.offsetTop - this.offsetTop + 'px';
    let tmp = empty.previousElementSibling || empty.nextElementSibling;
    this.classList.toggle('cell-animation');
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
        })
        item.addEventListener('dragend', () => {
            item.classList.remove('draggable_dragging');
        })
    });
    return arr;
}

function generateGame(size) {
    const container = document.createElement('div');
    container.classList.add('container');
    const grid = document.createElement('div');
    grid.classList.add('game-grid');
    document.body.append(container);
    container.append(grid);
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

    const digitsArr = [];
    for (let i = 0; i < size ** 2 - 1; i++) {
        digitsArr.push(i + 1)
    }
    digitsArr.push(' ');
    shuffleArr(digitsArr);

    let empty = null;

    for (let i = 0; i < size ** 2; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = digitsArr.pop();
        if (cell.textContent === ' ') {
            empty = cell;
            cell.classList.add('cell_empty')
        }
        grid.append(cell);
    }
    return empty;
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







function startDuration() {
    const duration = document.querySelector('.scores__duration');
    let now = new Date();
    duration.textContent = `${now.getMinutes()}:${now.getSeconds()}`
}

function stepCount() {
    const stepsDiv = document.querySelector('.scores__steps');
    let steps = 0;
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
}