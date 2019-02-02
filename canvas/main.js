var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var using = false;

autoSetCanvasSize(canvas);
litenToMouse(canvas);

/********/

function litenToMouse(canvas) {
    var eraserEnable = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    //特性检测

    if (document.body.ontouchstart === undefined) {
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


    } else {
        canvas.ontouchstart = function (e) {
            console.log(e)
            var x = e.touches.clientX;
            var y = e.touches.clientY;
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
            var x = e.touches.clientX;
            var y = e.touches.clientY;
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

    }
    eraser.onclick = function () {
        eraserEnable = true;
        actions.className = 'actions x'

    }
    brush.onclick = function () {
        eraserEnable = false;
        actions.className = 'actions'
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
    ctx.lineWidth = 5;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}