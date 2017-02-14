// Grab Elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const ranges = player.querySelectorAll('[type="range"]');
const toggle = player.querySelector('button[title="Toggle Play"]');
const skipButtons = player.querySelectorAll('[data-skip]');

const fullScreen = player.querySelector('button.screenSize');
const container = document.documentElement;

// Build Functions

function togglePlay() {
  if(video.paused){video.play();}
  else {video.pause()}
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  console.log("I done got clicked!")
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function adjustSize() {
  if(window.innerHeight == screen.height) {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
  }
  else {
    if (container.requestFullscreen) {
    container.requestFullscreen();
    }
    else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    }
    else if (container.webkitRequestFullScreen) {
        container.webkitRequestFullScreen();
    }
    else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    }
  }
}

// Hook Up Event Listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);


skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

fullScreen.addEventListener('click', adjustSize);
