class RoundaboutSpecification {

    constructor(laneWidth, lanesCount, islandRadius, adherentRoadSpecification) {
        this._laneWidth = laneWidth;
        this._lanesCount = lanesCount;
        this._islandRadius = islandRadius;
        this._adherentRoadSpecification = adherentRoadSpecification;
    }

    roundaboutDiameter() {
        let islandDiameter = 2 * this._islandRadius;
        return islandDiameter + this.lanesWidth() * 2;
    }

    roundaboutRadius() {
        return this.roundaboutDiameter() / 2;
    }

    roundaboutHeightWithRoads() {
        return this.roundaboutDiameter() + this.adherentRoadLength() * 2;
    }

    lanesCount() {
        return this._lanesCount;
    }

    lanesWidth() {
        return this.lanesCount() * this.laneWidth();
    }

    laneWidth() {
        return this._laneWidth;
    }

    islandRadius() {
        return this._islandRadius;
    }

    adherentRoadLength() {
        return NUMBER_OF_QUEUEING_CARS_TO_SHOW * METERS_PER_CELL;
    }

    adherentRoadWidth() {
        return (
            this._adherentRoadSpecification.ingoingLanes * this._adherentRoadSpecification.lanesWidth +
            this._adherentRoadSpecification.outgoingLanes * this._adherentRoadSpecification.lanesWidth
        );
    }
}
const NUMBER_OF_QUEUEING_CARS_TO_SHOW = 3;
const METERS_PER_CELL = 7.5;

var roundaboutBukowe = new RoundaboutSpecification(
    4.5,
    2,
    56/2,
    {
        ingoingLanes: 2,
        outgoingLanes: 2,
        lanesWidth: 3.5
    }
);

export {roundaboutBukowe};
