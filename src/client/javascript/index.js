import "../css/style.css";
import Canvas from "./components/Canvas";
import Socket from "./components/Socket";

const canvas = document.getElementById("canvas");
const refreshBtn = document.getElementById("refresh");
const fullScreeBtn = document.getElementById("fullscreen");
const changeBrushBtn = document.getElementById("change-brush");
const changeBgBtn = document.getElementById("change-bg");

const drawingBoard = new Canvas(canvas);
const socket = new Socket();

canvas.addEventListener("mousedown", () => {
    socket.writeMessage("message", "kurwa zajebiscie zbychu");
});
