const player = document.querySelector(".player");
const playBtn = document.querySelector(".play");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const audio = document.querySelector(".audio");
const progressContainer = document.querySelector(".progress__container");
const titleName = document.querySelector(".title__name");
const titleNameSong = document.querySelector(".title__name-song");
const progress = document.querySelector(".progress");
const circleImg = document.querySelector(".circle__img");
const imgSrc = document.querySelector(".img__src");
const current = document.querySelector(".current")
const length = document.querySelector(".length")

// Name Songs
let songIndex = 0;
const songs = [
    { 
        name: "Pharaoh",
        songName: "Sniper",
        audio: "./audio/pharaoh.mp3",
        img: "./img/pharaoh.png",
    },
    { 
        name: "Pharaoh",
        songName: "No heart",
        audio: "./audio/pharaoh_net_serdca.mp3",
        img: "./img/pharaoh_net_serdca.jpg",
    },
    { 
        name: "Dua Lipa",
        songName: "Don't Start Now",
        audio: "./audio/dontstartnow.mp3",
        img: "./img/dontstartnow.png",
    }
]


class Player {
    constructor ({name, songName, audio, img}) {
        this.name = name;
        this.songName = songName;
        this.audio = audio;
        this.img = img;
    }


    loadSong() {
        titleName.textContent = this.name;
        titleNameSong.textContent = this.songName;
        audio.src = this.audio;
        circleImg.src = this.img;
        const image = document.createElement('img');
        image.classList.add('background');
        image.src = this.img;
        document.body.appendChild(image);

  
    }
}

function playAudio() {
    player.classList.add("play")
    circleImg.classList.add("active")
    imgSrc.src ="./img/svg/pause.png"
    audio.currentTime = 0;
    audio.play();
  }

function pauseAudio() {
    player.classList.remove("play")
    circleImg.classList.remove("active")
    imgSrc.src ="./img/svg/play.png"
    audio.pause();
  }

const currentSong = new Player(songs[songIndex]);
currentSong.loadSong();

playBtn.addEventListener("click",() => {
    const isPlaying = player.classList.contains("play");
    if(isPlaying) {
        pauseAudio()
    } else {
        playAudio()
    }
})


// Next song
function nextSong() {
    songIndex++
    if(songIndex > songs.length - 1) {
        songIndex = 0;
    }
    const currentSong = new Player(songs[songIndex]);
    currentSong.loadSong();
    playAudio()

}

nextBtn.addEventListener("click", nextSong)

// Prev song
function prevSong() {
    songIndex--
    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }
    const currentSong = new Player(songs[songIndex]);
    currentSong.loadSong();
    playAudio()
}

prevBtn.addEventListener("click", prevSong)

// Progress bar

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    current.textContent = getTimeCodeFromNum(
        audio.currentTime
      );

}

function getTimeCodeFromNum(num) {
    const minutes = Math.floor(num / 60);
    const seconds = Math.floor(num % 60);
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return formattedTime;
}

audio.addEventListener("timeupdate", updateProgress)

// Set progress bar
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration
    
    audio.currentTime = (clickX / width) * duration


}
progressContainer.addEventListener("click", setProgress)

// Autoplay

audio.addEventListener("ended", nextSong)
audio.addEventListener("loadedmetadata", function() {
    length.textContent = getTimeCodeFromNum(audio.duration);
});

