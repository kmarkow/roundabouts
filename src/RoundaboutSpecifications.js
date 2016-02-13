class RoundaboutSpecification {

    constructor(lanesWidth, islandRadius) {
        this._lanesWidth = lanesWidth;
        this._islandRadius = islandRadius;
    }

    roundaboutDiameter() {
        let islandDiameter = 2 * this._islandRadius;
        let lanesWidth = this._lanesWidth.reduce(function(previousValue, currentValue) {
            return previousValue + currentValue;
        });
        return islandDiameter + lanesWidth * 2;
    }

    roundaboutRadius() {
        return this.roundaboutDiameter() / 2;
    }

    roundaboutHeightWithRoads() {
        return this.roundaboutDiameter() + this._incomingRoadLength() * 2;
    }

    lanesCount() {
        return this._lanesWidth.length;
    }

    islandRadius() {
        return this._islandRadius;
    }

    _incomingRoadLength() {
        return NUMBER_OF_QUEUEING_CARS_TO_SHOW * METERS_PER_CELL;
    }
}
const NUMBER_OF_QUEUEING_CARS_TO_SHOW = 3;
const METERS_PER_CELL = 7.5;

var roundaboutBukowe = new RoundaboutSpecification([4.5, 4.5], 56/2);

export {roundaboutBukowe};
