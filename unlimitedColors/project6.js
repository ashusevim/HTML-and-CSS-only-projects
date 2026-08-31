const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const hexLabel = document.getElementById('hex');

let intervalId = null;

const randomColor = () => {
    const hex = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += hex[Math.floor(Math.random() * 16)];
    }
    return color;
};

const applyColor = (color) => {
    document.body.style.backgroundColor = color;
    hexLabel.textContent = color;
};

const start = () => {
    if (intervalId !== null) return;
    startBtn.classList.add('is-running');
    applyColor(randomColor());
    intervalId = setInterval(() => applyColor(randomColor()), 1000);
};

const stop = () => {
    clearInterval(intervalId);
    intervalId = null;
    startBtn.classList.remove('is-running');
    applyColor('#212121');
};

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
