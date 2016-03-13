class Translator {

    constructor(roundaboutSpecification, unitConverter, two) {
        this._roundaboutSpecification = roundaboutSpecification;
        this._unitConverter = unitConverter;
        this._two = two;
        this._centerPoint =  {
            x: this._two.width / 2,
            y: this._two.height / 2
        };

        var roadLengthPx = this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.adherentRoadLength()
        );
        var roundaboutRadiusPx =  this._unitConverter.metersAsPixels(
            this._roundaboutSpecification.roundaboutRadius()
        );
        this._pixelsFromCenterToRoadCenter = roundaboutRadiusPx + roadLengthPx/2;
    }

    translateTo(elements, where) {
        if (where == 'N') {
            this.translateToNorthRoad(elements);
        } else if (where == 'S') {
            this.translateToSouthRoad(elements);
        } else if (where == 'E') {
            this.translateToEastRoad(elements);
        } else if (where == 'W') {
            this.translateToWestRoad(elements);
        } else {
            throw new Error("Unknown direction " + where);
        }
    }

    translateToSouthRoad(elements) {
        elements.translation.set(
            this._centerPoint.x,
            this._centerPoint.y + this._pixelsFromCenterToRoadCenter
        );
    }

    translateToWestRoad(elements) {
        elements.translation.set(
            this._centerPoint.x - this._pixelsFromCenterToRoadCenter,
            this._centerPoint.y
        );
        elements.rotation += 1*Math.PI / 2;
    }

    translateToNorthRoad(elements) {
        elements.translation.set(
            this._centerPoint.x,
            this._centerPoint.y - this._pixelsFromCenterToRoadCenter
        );
        elements.rotation += 2*Math.PI / 2;

    }

    translateToEastRoad(elements) {
        elements.translation.set(
            this._centerPoint.x + this._pixelsFromCenterToRoadCenter,
            this._centerPoint.y
        );
        elements.rotation += 3*Math.PI / 2;
    }
}

export default Translator;
