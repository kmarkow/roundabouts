const METERS_PER_CELL = 2.5;

class UnitConverter {

    constructor(canvasInMeters, canvasInPixels) {
        this.canvasInMeters = canvasInMeters;
        this.canvasInPixels = canvasInPixels;
    }

    pixelsPerMeter() {
        return Math.floor(this.canvasInPixels / this.canvasInMeters);
    }

    metersAsPixels(meters) {
        return meters * this.pixelsPerMeter();
    }

    metersAsCells(meters) {
        return Math.floor(meters / METERS_PER_CELL);
    }

    cellsAsPixels(cells) {
        return this.metersAsPixels(cells * METERS_PER_CELL);
    }
}

export default UnitConverter;
