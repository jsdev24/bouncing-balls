
let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
myCanvas.height = height;
myCanvas.width = width;
let allBalls = [];



function Balls(x, y, size, color, stepX, stepY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.stepX = stepX;
    this.stepY = stepY;

    this.drawBalls = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.updatePosition = function () {
        if (this.x + this.size >= width) {
            this.stepX = -(this.stepX);
        }
        if (this.x - this.size <= 0) {
            this.stepX = -(this.stepX);
        }
        if (this.y + this.size >= height) {
            this.stepY = -(this.stepY);
        }
        if (this.y - this.size <= 0) {
            this.stepY = -(this.stepY);
        }

        this.x += this.stepX;
        this.y += this.stepY;
    }

    this.ballCollision = function () {
        for (let i = 0; i < allBalls.length; i++) {
            if (allBalls[i] != this) {
                let dx = this.x - allBalls[i].x;
                let dy = this.y - allBalls[i].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (this.size + allBalls[i].size > distance) {
                    let randomColor = "rgb(" + randomNumber(0, 255) + "," + randomNumber(0, 255) + "," + randomNumber(0, 255) + ")";
                    this.color = randomColor;
                    allBalls[i].color = randomColor;
                }
            }
        }
    }

}



while (allBalls.length < 10) {
    let x = randomNumber(15, width);
    let y = randomNumber(30, height);
    let size = randomNumber(15, 40);
    let color = "rgb(" + randomNumber(0, 255) + "," + randomNumber(0, 255) + "," + randomNumber(0, 255) + ")";
    let stepX = randomNumber(5, 10);
    let stepY = randomNumber(5, 10);

    let ball = new Balls(x, y, size, color, stepX, stepY);
    allBalls.push(ball);
}



function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



function startAnimation() {
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < allBalls.length; i++) {
        allBalls[i].drawBalls();
        allBalls[i].updatePosition();
        allBalls[i].ballCollision();
    }

    setTimeout(startAnimation, 15);
}


startAnimation();