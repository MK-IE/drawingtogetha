const canvas = document.getElementById("canvas");
const fullScreeBtn = document.getElementById("fullscreen");
const ctx = canvas.getContext("2d");
const socket = io();
canvas.width = window.innerWidth - window.innerWidth / 6;
canvas.height = window.innerHeight - window.innerHeight / 6;

const brushMoveListener = (event) => {
    const boundaries = canvas.getBoundingClientRect();
    if (event.buttons === 1) {
        const pos = {
            w: window.innerWidth,
            h: window.innerHeight,
            x: event.clientX - boundaries.left,
            y: event.clientY - boundaries.top,
        };
        writeEvent(pos);
    } else if (event.type === "touchmove") {
        const pos = {
            w: window.innerWidth,
            h: window.innerHeight,
            x: event.touches[0].clientX - boundaries.left,
            y: event.touches[0].clientY - boundaries.top,
        };
        writeEvent(pos);
    }
};

const brushDownListener = (event) => {
    const boundaries = canvas.getBoundingClientRect();
    if (event.type === "touchstart") {
        const pos = {
            w: window.innerWidth,
            h: window.innerHeight,
            x: event.touches[0].clientX - boundaries.left,
            y: event.touches[0].clientY - boundaries.top,
        };
        socket.emit("mouseorigin", pos);
    } else {
        const pos = {
            x: event.clientX - boundaries.left,
            y: event.clientY - boundaries.top,
            w: window.innerWidth,
            h: window.innerHeight,
        };
        socket.emit("mouseorigin", pos);
    }
};

socket.on("mouseorigin", (pos) => {
    const x = map(pos.x, pos.w, 0, window.innerWidth, 0);
    const y = map(pos.y, 0, pos.h, 0, window.innerHeight);
    brushDown(x, y);
});

socket.on("message", (pos) => {
    const x = map(pos.x, pos.w, 0, window.innerWidth, 0);
    const y = map(pos.y, 0, pos.h, 0, window.innerHeight);
    drawBrush(x, y);
});

const writeEvent = (pos) => {
    socket.emit("message", pos);
};

const map = (value, istart, istop, ostart, ostop) => {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

const updateCanvasSize = () => {};

const brushDown = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.closePath();
};

const drawBrush = (x, y) => {
    ctx.lineTo(x, y);
    ctx.stroke();
};

canvas.addEventListener("mousedown", brushDownListener);
canvas.addEventListener("touchstart", brushDownListener);
canvas.addEventListener("touchmove", brushMoveListener);
canvas.addEventListener("mousemove", brushMoveListener);
fullScreeBtn.addEventListener("click", () => {
    document.body.requestFullscreen();
});
