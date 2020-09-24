export const CANVAS_WIDTH = window.innerWidth - window.innerWidth / 6;
export const CANVAS_HEIGHT = window.innerHeight - window.innerHeight / 6;

export const BACKGROUND_COLORS = [
    "rgb(1, 22, 39)",
    "rgb(231, 29, 54)",
    "rgb(255, 159, 28)",
    "rgb(46, 196, 182)",
];

export const BRUSH_COLORS = [
    "rgb(255,255,255)",
    "rgb(0,0,0)",
    "rgb(255, 190, 11)",
    "rgb(251, 86, 7)",
    "rgb(255, 0, 110)",
    "rgb(131, 56, 236)",
    "rgb(58, 134, 255)",
];

export const SOCKET_MESSAGES = {
    BRUSH_DOWN: "brush_down",
    BRUSH_DRAW: "brush_draw",
};

export const GET_RANDOM_NUMBER = (range) => {
    return Math.floor(Math.random() * range);
};

export const MAP = (value, istart, istop, ostart, ostop) => {
    return Math.round(
        ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
    );
};

export const CHOOSE_EVENT = (event, canvas, color) => {
    const boundaries = canvas.getBoundingClientRect();

    if (event.buttons === 1) {
        return {
            w: CANVAS_WIDTH,
            h: CANVAS_HEIGHT,
            x: event.clientX - boundaries.left,
            y: event.clientY - boundaries.top,
            color: color,
        };
    } else if (event.type === "touchmove" || event.type === "touchstart") {
        return {
            w: CANVAS_WIDTH,
            h: CANVAS_HEIGHT,
            x: event.touches[0].clientX - boundaries.left,
            y: event.touches[0].clientY - boundaries.top,
            color: color,
        };
    }
    return null;
};

export const TOGGLE_FULLSCREEN = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
        docEl.requestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.webkitRequestFullScreen ||
        docEl.msRequestFullscreen;
    const cancelFullScreen =
        doc.exitFullscreen ||
        doc.mozCancelFullScreen ||
        doc.webkitExitFullscreen ||
        doc.msExitFullscreen;

    if (
        !doc.fullscreenElement &&
        !doc.mozFullScreenElement &&
        !doc.webkitFullscreenElement &&
        !doc.msFullscreenElement
    ) {
        requestFullScreen.call(docEl);
    } else {
        cancelFullScreen.call(doc);
    }
};
