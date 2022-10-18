import './scss/main.scss';
let gameSize = 4;
let empty = generateGame(gameSize);
emptySides(gameSize);


function emptySides(gameSize) {
    const gridArr = [...document.querySelectorAll('.cell')];
    const empty = document.querySelector('cell_empty');
    const res = [];
    const emptyIndex = gridArr.findIndex(e => e.classList.contains('cell_empty'));
    gridArr[emptyIndex - gameSize] && res.push(gridArr[emptyIndex - gameSize]);
    gridArr[emptyIndex + gameSize] && res.push(gridArr[emptyIndex + gameSize]);
    if (empty.nextElementSibling && empty.nextElementSibling)
    for (let i = 0; i < gridArr.length; i++) {

    }
    console.log(res)

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
        cell.style.height = cell.parentElement.offsetWidth / size + 'px';
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