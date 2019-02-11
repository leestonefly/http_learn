var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var using = false;
var lineWidth = 5

autoSetCanvasSize(canvas);
litenToMouse(canvas);





/********/

function litenToMouse(canvas) {

    var lastPoint = {
        x: undefined,
        y: undefined
    }
    var eraserEnable = false
    pen.onclick = function () {
        eraserEnable = false;
        pen.classList.add('active')
        eraser.classList.remove('active')
        colors.className = 'colors'
    }
    eraser.onclick = function () {
        eraserEnable = true;
        eraser.classList.add('active')
        pen.classList.remove('active')
        colors.className = 'colors x'
    }
    clear.onclick = function(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
    save.onclick = function(){
        var url = canvas.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download='我的画板'
        a.target='_blank'
        a.click();
    }
    black.onclick = function () {
        ctx.fillstyle = 'black'
        ctx.strokeStyle = 'black'
        black.classList.add('active')
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.remove('active')
    }

    red.onclick = function () {
        ctx.fillstyle = 'red'
        ctx.strokeStyle = 'red'
        black.classList.remove('active')
        red.classList.add('active')
        green.classList.remove('active')
        blue.classList.remove('active')
    }
    green.onclick = function () {
        ctx.fillstyle = 'green'
        ctx.strokeStyle = 'green'
        black.classList.remove('active')
        red.classList.remove('active')
        green.classList.add('active')
        blue.classList.remove('active')
    }
    blue.onclick = function () {
        ctx.fillstyle = 'blue'
        ctx.strokeStyle = 'blue'
        black.classList.remove('active')
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.add('active')
    }

    thin.onclick = function () {
        lineWidth = 5
        thin.classList.add('x')
        thick.classList.remove('x')
    }
    thick.onclick = function () {
        lineWidth = 10
        thin.classList.remove('x')
        thick.classList.add('x')
    }
    //特性检测

    if (document.body.ontouchstart !== undefined) {

        canvas.ontouchstart = function (e) {

            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            using = true;
            if (eraserEnable) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    'x': x,
                    'y': y
                };
            }
        }
        canvas.ontouchmove = function (e) {

            var x = e.touches[0].clientX;
            var y = e.touches[0].clientY;
            if (!using) {
                return
            };
            if (eraserEnable) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    'x': x,
                    'y': y
                }
                drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function (e) {

            using = false;
        }


    } else {
        canvas.onmousedown = function (e) {

            var x = e.clientX;
            var y = e.clientY;
            using = true;
            if (eraserEnable) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    'x': x,
                    'y': y
                };
            }
        }

        canvas.onmousemove = function (e) {
            var x = e.clientX;
            var y = e.clientY;
            if (!using) {
                return
            };
            if (eraserEnable) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    'x': x,
                    'y': y
                }
                drawCircle(x, y, 1)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint;
            }
        }

        canvas.onmouseup = function (e) {
            using = false;
        }

    }


}

function autoSetCanvasSize(canvas) {
    setCanvasSize();
    window.onresize = function () {
        setCanvasSize();
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHight;
    }
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}