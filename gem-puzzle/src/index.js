import './scss/main.scss';
// import './modules/controls.js'

let gameSize = 4;
let nearEmpty = [];
let empty = generateGame(gameSize);
findEmptySides(gameSize);

require('./modules/controls');


empty.addEventListener('dragover', (e) => {
    e.preventDefault();
})

empty.addEventListener('drop', () => {
    const dragging = document.querySelector('.draggable_dragging');
    let tmp = empty.previousElementSibling || empty.nextElementSibling;
    if (!empty.previousElementSibling) {
        dragging.after(empty);
        tmp.before(dragging);
    } else {
        dragging.before(empty);
        tmp.after(dragging);
    }
    findEmptySides(gameSize);
})



function moveOnClick(e) {
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
        [...document.querySelectorAll('.cell')].forEach(e => e.removeEventListener('click', moveOnClick))
        findEmptySides(gameSize);
    }, 300);

}


function findEmptySides(gameSize) {
    const gridArr = [...document.querySelectorAll('.cell')];
    const empty = document.querySelector('.cell_empty');
    const res = [];
    const emptyIndex = gridArr.findIndex(e => e.classList.contains('cell_empty'));
    const nextIndex = gridArr.indexOf(empty.nextElementSibling);
    const prevIndex = gridArr.indexOf(empty.previousElementSibling);
    gridArr[emptyIndex - gameSize] && res.push(gridArr[emptyIndex - gameSize]);
    gridArr[emptyIndex + gameSize] && res.push(gridArr[emptyIndex + gameSize]);
    if (empty.nextElementSibling && (nextIndex) % gameSize !== 0) res.push(empty.nextElementSibling);
    if (empty.previousElementSibling && (prevIndex + 1) % gameSize !== 0) res.push(empty.previousElementSibling);
    nearEmpty = res;
    gridArr.forEach(e => {
        e.draggable = false;
        e.classList.remove('draggable')
    })
    res.forEach(e => e.addEventListener('click', moveOnClick))
    highlightCells(res);
}

function highlightCells(arr) {
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