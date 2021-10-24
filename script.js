//console.log("myDhoon is running");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/arabic-dream-8928.mp3');
let mainPlay = document.getElementById('mainPlay');
let mainPlaySongName = document.getElementById('mainPlaySongName');
let previousSongButton = document.getElementById('previous');
let nextSongButton = document.getElementById('next');
let myProgressBar = document.getElementById('myProgressBar');
let playingGif = document.getElementById('playingGif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let specificPlay = Array.from(document.getElementsByClassName('specificPlay'));
let timeStamp = Array.from(document.getElementsByClassName('timeStamp'));


let songs = [
    { songName: "Arabic Dream", filePath: "songs/arabic-dream-8928.mp3", coverPath: "images/arabic dream.jpg" },
    { songName: "Hava Nagila Orchestra", filePath: "songs/hava-nagila-orchestra-clarinet-7671.mp3", coverPath: "images/orchestra.jpg" },
    { songName: "Middle East Desert", filePath: "songs/middle-east-desert-9090.mp3", coverPath: "images/desert.jpg" },
    { songName: "Midnight on Voe", filePath: "songs/midnight-on-voe-beach-8812.mp3", coverPath: "images/midnight.jpg" },
    { songName: "Out to Sea", filePath: "songs/out-to-sea-8533.mp3", coverPath: "images/sea.jpg" },
    { songName: "Persian Mystery", filePath: "songs/persian-mystery-9091.mp3", coverPath: "images/moonshine-g72521e9b5_1920.jpg" },
    { songName: "Spooky Choir", filePath: "songs/spooky-choir-8588.mp3", coverPath: "images/spooky.jpg" },
]

songItems.forEach((element, i) => {
    // console.log(element, i);
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});
const makeAllPlay = () => {
    specificPlay.forEach((element) => {
        element.src = "images/play.png";
    })
}

specificPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        //console.log(e.target.src);
        if(e.target.getAttribute("src") == "images/pause.png"){
           // console.log('paused')
                e.target.src = "images/play.png";
                audioElement.pause();
                playingGif.style.opacity = 0;
                mainPlay.src = "images/play.png";
            }
            else{
            makeAllPlay();
            songIndex = parseInt(e.target.id);
            e.target.src = 'images/pause.png';
            audioElement.src = songs[songIndex].filePath;
            mainPlaySongName.innerText = songs[songIndex].songName;
            currentTime = 0;
            audioElement.play();
            mainPlay.src = "images/pause.png";
            playingGif.style.opacity = 1;
            }
            
    })
})

nextSongButton.addEventListener('click', (element, i) => {
    if (songs.slice(-1)[0] === songs[songIndex]) {
        songIndex = 0;
        makeAllPlay();
        document.getElementById(songIndex).src = "images/pause.png";
        mainPlaySongName.innerText = songs[songIndex].songName;
        audioElement.src = songs[songIndex].filePath;
        currentTime = 0;
        audioElement.play();
        mainPlay.src = "images/pause.png";
    }
    else {
        songIndex += 1;
        audioElement.src = songs[songIndex].filePath;
        mainPlaySongName.innerText = songs[songIndex].songName;
        currentTime = 0;
        audioElement.play();
        makeAllPlay();
        document.getElementById(songIndex).src = 'images/pause.png';
        mainPlay.src = "images/pause.png";
    }
    playingGif.style.opacity = 1;

});

previousSongButton.addEventListener('click', (element, i) => {
    if (songIndex===0) {
        songIndex = songs.length-1;
        makeAllPlay();
        document.getElementById(songIndex).src = "images/pause.png";
        mainPlaySongName.innerText = songs[songIndex].songName;
        audioElement.src = songs[songIndex].filePath;
        currentTime = 0;
        audioElement.play();
        mainPlay.src = "images/pause.png";
    }
    else {
        songIndex += -1;
        audioElement.src = songs[songIndex].filePath;
        currentTime = 0;
        audioElement.play();
        makeAllPlay();
        document.getElementById(songIndex).src = 'images/pause.png';
        mainPlaySongName.innerText = songs[songIndex].songName;
        mainPlay.src = "images/pause.png";
    }
    playingGif.style.opacity = 1;

});


// audioElement.play();
// let play = document.getElementById('pause');
// play.addEventListener("click", function () {
//     audioElement.play();
// });

//Handle play/pause click
mainPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        mainPlay.src = 'images/pause.png';
        document.getElementById(songIndex).src = 'images/pause.png';
        playingGif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        mainPlay.src = 'images/play.png';
        makeAllPlay();
        playingGif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;
    if(audioElement.currentTime === audioElement.duration){
            if (songs.slice(-1)[0] === songs[songIndex]) {
                songIndex = 0;
                makeAllPlay();
                document.getElementById(songIndex).src = "images/pause.png";
                mainPlaySongName.innerText = songs[songIndex].songName;
                audioElement.src = songs[songIndex].filePath;
                currentTime = 0;
                audioElement.play();
                mainPlay.src = "images/pause.png";
            }
            else {
                songIndex += 1;
                audioElement.src = songs[songIndex].filePath;
                mainPlaySongName.innerText = songs[songIndex].songName;
                currentTime = 0;
                audioElement.play();
                makeAllPlay();
                document.getElementById(songIndex).src = 'images/pause.png';
                mainPlay.src = "images/pause.png";
            }
            playingGif.style.opacity = 1;
        }
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = audioElement.duration * myProgressBar.value / 100;

})