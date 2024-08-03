let score = 0;
let cross = true;

audio = new Audio('/assets/audio/music.mp3')
audiogo = new Audio('/assets/audio/gameover.mp3')

setTimeout(() => {
    audio.play()
}, 1000)
document.onkeydown = function (e) {

    if (e.code == "ArrowUp") {
        let dino = document.getElementsByClassName('dino')[0];

        if (dino) {
            dino.classList.add('animateDino');
            setTimeout(() => {
                dino.classList.remove('animateDino');
            }, 700);
        } else {
            console.error("Element with class 'dino' not found.");
        }
    }
    else if (e.code == "ArrowRight") {
        let dino = document.getElementsByClassName('dino')[0];
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = dinoX + 112 + "px";
    }
    else if (e.code == "ArrowLeft") {
        let dino = document.getElementsByClassName('dino')[0];
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
        dino.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    let dino = document.getElementsByClassName('dino')[0];
    let gameOver = document.getElementsByClassName('gameOver')[0];
    let obstacle = document.getElementsByClassName('obstacle')[0];

    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    let offsetX = Math.abs(dx - ox)
    let offsetY = Math.abs(dy - oy)
    if (offsetX < 93 && offsetY < 53) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('obstacleAni')
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();

        }, 1000)
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score)
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000)
        setTimeout(() => {
            anidur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newdur = anidur - 0.01;
            obstacle.style.animationDuration = newdur + 's';
        })
    }
}, 100);

function updateScore(score) {
    let scoreCont = document.getElementById('scoreCont')
    scoreCont.innerHTML = "Your Score: " + score;
}
