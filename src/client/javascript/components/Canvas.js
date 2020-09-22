import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./Constant";

export default class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;
    }

    clearCanvas() {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawBrush(x, y, color) {
        this.ctx.strokeStyle = color;
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
    }

    brushDown(x, y) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.closePath();
    }
}
