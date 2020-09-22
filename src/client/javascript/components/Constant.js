export const CANVAS_WIDTH = window.innerWidth - window.innerWidth / 6;
export const CANVAS_HEIGHT = window.innerHeight - window.innerHeight / 6;

export const BACKGROUND_COLORS = [
    "rgb(1, 22, 39)",
    "rgb(231, 29, 54)",
    "rgb(255, 159, 28)",
    "rgb(46, 196, 182)",
];

const BRUSH_COLORS = [
    "rgb(255,255,255)",
    "rgb(0,0,0)",
    "rgb(255, 190, 11)",
    "rgb(251, 86, 7)",
    "rgb(255, 0, 110)",
    "rgb(131, 56, 236)",
    "rgb(58, 134, 255)",
];

const SOCKET_MESSAGES = {
    BRUSH_ORIGIN: "brush_origin",
    BRUSH_DRAW: "brush_draw",
};
