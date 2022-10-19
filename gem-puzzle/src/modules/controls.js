createControls();
createScores();
const currentDuration = startDuration();

function startDuration() {
    const duration = document.querySelector('.scores__duration');
    let now = new Date();
    duration.textContent = `${now.getMinutes()}:${now.getSeconds()}`
}

function createScores() {
    const scores = document.createElement('div');
    scores.className = 'scores';
    document.body.append(scores);
    scores.innerHTML = `
        <div class="scores__duration"></div>
        <div class="scores__steps"></div>
    `
}

function createControls() {
    const controls = document.createElement('div');
    controls.className = 'controls'
    document.body.append(controls);
}