const FOCUS_SECONDS = 25 * 60;

let remaining = FOCUS_SECONDS;
let timerId = null;

const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const stopBtn = document.getElementById("stopBtn");

function render() {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  timerEl.textContent =
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
}

function tick() {
  if (remaining <= 0) {
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = true;
    render();
    return;
  }

  remaining--;

  if (remaining <= 0) {
    remaining = 0;
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = true;
  }

  render();
}

startBtn.addEventListener("click", () => {
  if (timerId || remaining <= 0) return;

  startBtn.disabled = true;
  timerId = setInterval(tick, 1000);
});

stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  startBtn.disabled = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = null;
  remaining = FOCUS_SECONDS;
  startBtn.disabled = false;
  render();
});

render();
