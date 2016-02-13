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
}

export default UnitConverter;
