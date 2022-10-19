createControls();
const currentDuration = startDuration();

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
