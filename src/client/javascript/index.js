import "../css/style.css";
import {
    SOCKET_MESSAGES,
    CHOOSE_EVENT,
    TOGGLE_FULLSCREEN,
} from "./components/Constant";
import Canvas from "./components/Canvas";
import { listenForResponse, writeMessage } from "./components/Socket";
import Toolbar from "./components/Toolbar";

const canvas = document.getElementById("canvas");
const refreshBtn = document.getElementById("refresh");
const fullScreeBtn = document.getElementById("fullscreen");
const changeBrushBtn = document.getElementById("change-brush");
const changeBgBtn = document.getElementById("change-bg");

const drawingBoard = new Canvas(canvas);
const toolbar = new Toolbar();

const brushDown = drawingBoard.brushDown.bind(drawingBoard);
const brushDraw = drawingBoard.brushDraw.bind(drawingBoard);

listenForResponse(SOCKET_MESSAGES.BRUSH_DOWN, brushDown);
listenForResponse(SOCKET_MESSAGES.BRUSH_DRAW, brushDraw);

window.onload = () => {
    document.body.style.backgroundColor = toolbar.getBackgroundColor();
};

canvas.addEventListener("mousedown", (event) => {
    const { x, y, w, h } = CHOOSE_EVENT(event, canvas);
    writeMessage(SOCKET_MESSAGES.BRUSH_DOWN, { x: x, y: y, w: w, h: h });
    brushDown({ x: x, y: y, w: w, h: h });
});

canvas.addEventListener("mousemove", (event) => {
    const message = CHOOSE_EVENT(event, canvas, drawingBoard.getBrushColor());
    if (message !== null) {
        brushDraw(message);
        writeMessage(SOCKET_MESSAGES.BRUSH_DRAW, message);
    }
});

refreshBtn.addEventListener("click", () => {
    drawingBoard.clear();
});

fullScreeBtn.addEventListener("click", () => {
    TOGGLE_FULLSCREEN();
});

changeBrushBtn.addEventListener("click", (event) => {
    const brushColor = toolbar.getBrushColor();
    drawingBoard.setBrushColor(brushColor);
    event.target.style.color = brushColor;
    console.log(brushColor);
});

changeBgBtn.addEventListener("click", () => {
    document.body.style.backgroundColor = toolbar.getBackgroundColor();
});
