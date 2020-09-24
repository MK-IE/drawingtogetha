import { CANVAS_WIDTH, CANVAS_HEIGHT, MAP } from "./Constant";

export default class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
        this.color = "rgb(0,0,0)";
    }

    clear() {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    brushDown({ x, y, w, h }) {
        const screenAdjustedX = MAP(x, w, 0, CANVAS_WIDTH, 0);
        const screenAdjustedY = MAP(y, 0, h, 0, CANVAS_HEIGHT);
        this.ctx.beginPath();
        this.ctx.moveTo(screenAdjustedX, screenAdjustedY);
        this.ctx.closePath();
    }

    brushDraw({ x, y, w, h, color }) {
        const screenAdjustedX = MAP(x, w, 0, CANVAS_WIDTH, 0);
        const screenAdjustedY = MAP(y, 0, h, 0, CANVAS_HEIGHT);
        this.ctx.strokeStyle = color;
        this.ctx.lineTo(screenAdjustedX, screenAdjustedY);
        this.ctx.stroke();
    }

    getBrushColor() {
        return this.color;
    }

    setBrushColor(color) {
        this.color = color;
    }
}
