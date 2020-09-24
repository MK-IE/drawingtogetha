import { BRUSH_COLORS, BACKGROUND_COLORS, GET_RANDOM_NUMBER } from "./Constant";

export default class Toolbar {
    constructor() {
        this.colorIndex = 0;
        this.backgroundIndex = GET_RANDOM_NUMBER(BACKGROUND_COLORS.length);
    }

    getBrushColor() {
        this.colorIndex = ++this.colorIndex % BRUSH_COLORS.length;
        return BRUSH_COLORS[this.colorIndex];
    }

    getBackgroundColor() {
        this.backgroundIndex =
            ++this.backgroundIndex % BACKGROUND_COLORS.length;
        return BACKGROUND_COLORS[this.backgroundIndex];
    }
}
