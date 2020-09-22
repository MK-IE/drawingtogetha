import io from "socket.io-client";
import { SOCKET_MESSAGES } from "./Constant";

const map = (value, istart, istop, ostart, ostop) => {
    return Math.round(
        ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
    );
};

const chooseEvent = (event) => {
    const boundaries = canvas.getBoundingClientRect();
    if (event.buttons === 1) {
        return {
            w: window.innerWidth,
            h: window.innerHeight,
            pX: pMouse.x,
            pY: pMouse.y,
            x: event.clientX - boundaries.left,
            y: event.clientY - boundaries.top,
            origin: origin,
            color: brushColors[shiftBrushColors],
        };
    } else if (event.type === "touchmove" || event.type === "touchstart") {
        return {
            w: window.innerWidth,
            h: window.innerHeight,
            pX: pMouse.x,
            pY: pMouse.y,
            x: event.touches[0].clientX - boundaries.left,
            y: event.touches[0].clientY - boundaries.top,
            origin: origin,
            color: brushColors[shiftBrushColors],
        };
    }
    return null;
};

export default class Socket {
    constructor() {
        this.socket = io("http://localhost:3000");
    }

    brushOrigin() {
        return socket.on(SOCKET_MESSAGES.BRUSH_ORIGIN, ({ x, y, w, h }) => {
            const screenAdjustedX = map(x, w, 0, window.innerWidth, 0);
            const screenAdjustedY = map(y, 0, h, 0, window.innerHeight);
            return {
                x: screenAdjustedX,
                y: screenAdjustedY,
            };
        });
    }

    brushDraw() {
        return socket.on(
            SOCKET_MESSAGES.BRUSH_DRAW,
            ({ pX, pY, x, y, w, h, color }) => {
                const screenAdjustedX = map(x, w, 0, window.innerWidth, 0);
                const screenAdjustedY = map(y, 0, h, 0, window.innerHeight);
                const prevScreenAdjustedX = map(pX, w, 0, window.innerWidth, 0);
                const prevScreenAdjustedY = map(
                    pY,
                    0,
                    h,
                    0,
                    window.innerHeight
                );

                return {
                    x: screenAdjustedX,
                    y: screenAdjustedY,
                    prevX: prevScreenAdjustedX,
                    prevY: prevScreenAdjustedY,
                    color: color,
                };
            }
        );
    }

    writeMessage(messageType, payload) {
        socket.compress(true).emit(messageType, payload);
    }
}
