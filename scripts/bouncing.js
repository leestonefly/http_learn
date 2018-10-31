// setup canvas

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// let Evils = new EvilCircle();
// Evils.setControls();
let balls = [];
loop();


Ball.prototype.draw = function () {

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
};

Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < this.size + balls[j].size) {
                // balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
                balls[j].velX = ((balls[j].size ** 2 - this.size ** 2) * balls[j].velX + 2 * this.size ** 2 * this.velX) / (balls[j].size ** 2 + this.size ** 2);
                this.velX = ((this.size ** 2 - balls[j].size ** 2) * this.velX + 2 * balls[j].size ** 2 * balls[j].velX) / (balls[j].size ** 2 + this.size ** 2);
                balls[j].velY = ((balls[j].size ** 2 - this.size ** 2) * balls[j].velY + 2 * this.size ** 2 * this.velY) / (balls[j].size ** 2 + this.size ** 2);
                this.velY = ((this.size ** 2 - balls[j].size ** 2) * this.velY + 2 * balls[j].size ** 2 * balls[j].velY) / (balls[j].size ** 2 + this.size ** 2);
            }
        }
    }
};

// EvilCircle.prototype.draw = function () {
//     ctx.beginPath();
//     ctx.strokeStyle = this.color;
//     ctx.lineWidth = 5;
//     ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
//     ctx.stroke();
// };

// EvilCircle.prototype.checkBounds = function () {
//     if ((this.x + this.size) >= width) {
//         this.x = -5;
//     }
//
//     if ((this.x - this.size) <= 0) {
//         this.x = -5;
//     }
//
//     if ((this.y + this.size) >= height) {
//         this.y = -5;
//     }
//
//     if ((this.y - this.size) <= 0) {
//         this.y = -5;
//     }
// };

// EvilCircle.prototype.setControls = function () {
//     let _this = this;
//     window.onkeydown = function (e) {
//         if (e.keyCode=== 65) {
//             _this.x -= _this.velX;
//         } else if (e.keyCode === 68) {
//             _this.x += _this.velX;
//         } else if (e.keyCode === 87) {
//             _this.y -= _this.velY;
//         } else if (e.keyCode === 83) {
//             _this.y += _this.velY;
//         }
//     }
// };

// EvilCircle.prototype.collisionDetect = function () {
//
//     for (let j = 0; j < balls.length; j++) {
//         if (balls[i].exists === true) {
//             let dx = this.x - balls[j].x;
//             let dy = this.y - balls[j].y;
//             let distance = Math.sqrt(dx * dx + dy * dy);
//             if (distance < this.size + balls[j].size) {
//                 balls[j].color = 'rgba(0,0,0,0.25)';
//                 balls[j].exists = false;
//             }
//         }
//     }
// };


// function to generate random number
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    // this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
    // Ball.prototype = Object.create(Shape.prototype);
    // Ball.prototype.constructor = Ball;
}

// function EvilCircle(x, y, exists, color, size, velX, velY) {
//     // Shape.call(this, x, y, exists);
//     EvilCircle.prototype = Object.create(Shape.prototype);
//     EvilCircle.prototype.constructor = EvilCircle;
//     color = 'white';
//     size = 10;
//     velX = 20;
//     velY = 20;
//     // this.color = color;
//     // this.size = size;
//     // this.velX = velX;
//     // this.velY = velY;
// }

function loop() {
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, 0, width, height);


    while (balls.length < 25) {

        let ball = new Ball(
            random(0, width),
            random(0, height),
            random(5, -5),
            random(5, -5),
            true,
            'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
            random(10, 20)
        );
        balls.push(ball);
    }

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists === true) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }
    //
    // Evils.draw();
    // Evils.checkBounds();
    // Evils.collisionDetect();
    requestAnimationFrame(loop);
}