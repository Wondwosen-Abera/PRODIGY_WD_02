let stopwatch = {
  running: false,
  startTime: 0,
  elapsedTime: 0,
  interval: null,
  lapTimes: [],
};

const timeDisplay = document.getElementById("timeDisplay");
const startStopButton = document.getElementById("startStopButton");
const lapButton = document.getElementById("lapButton");
const resetButton = document.getElementById("resetButton");
const lapTimesDiv = document.getElementById("lapTimes");

// Format time in milliseconds to hh:mm:ss:xx format
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((ms % 1000) / 10);

  // Return formatted time as hh:mm:ss.xx
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(
    2,
    "0"
  )}`;
}

// Update the time display
function updateTime() {
  const currentTime = Date.now();
  stopwatch.elapsedTime = currentTime - stopwatch.startTime;
  timeDisplay.textContent = formatTime(stopwatch.elapsedTime);
}

// Start or stop the stopwatch
function startStopStopwatch() {
  if (!stopwatch.running) {
    // Start the stopwatch
    stopwatch.startTime = Date.now() - stopwatch.elapsedTime;
    stopwatch.interval = setInterval(updateTime, 10);
    startStopButton.textContent = "Pause";
    lapButton.disabled = false;
    resetButton.disabled = false;
    stopwatch.running = true;
  } else {
    // Pause the stopwatch
    clearInterval(stopwatch.interval);
    startStopButton.textContent = "Start";
    lapButton.disabled = true;
    resetButton.disabled = false;
    stopwatch.running = false;
  }
}

// Record a lap time
function recordLap() {
  if (stopwatch.running) {
    const lapTime = formatTime(stopwatch.elapsedTime);
    stopwatch.lapTimes.push(lapTime);
    const lapElement = document.createElement("div");
    lapElement.textContent = `Lap ${stopwatch.lapTimes.length}: ${lapTime}`;
    lapTimesDiv.appendChild(lapElement);
  }
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(stopwatch.interval);
  stopwatch.running = false;
  stopwatch.startTime = 0;
  stopwatch.elapsedTime = 0;
  stopwatch.lapTimes = [];
  timeDisplay.textContent = "00:00:00.00";
  startStopButton.textContent = "Start";
  lapButton.disabled = true;
  resetButton.disabled = true;
  lapTimesDiv.innerHTML = "";
}

// Add event listeners to buttons
startStopButton.addEventListener("click", startStopStopwatch);
lapButton.addEventListener("click", recordLap);
resetButton.addEventListener("click", resetStopwatch);
