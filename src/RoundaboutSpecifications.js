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

    adherentRoadWidth() {
        return (
            this._adherentRoadSpecification.ingoingLanes * this._adherentRoadSpecification.lanesWidth +
            this._adherentRoadSpecification.outgoingLanes * this._adherentRoadSpecification.lanesWidth
        );
    }

    adherentRoadsCount() {
        return this._adherentRoadSpecification.ingoingLanes + this._adherentRoadSpecification.outgoingLanes;
    }

    lengthOfLane(laneNumber) {
        if (laneNumber >= this.lanesCount()) {
            throw new Error("Incorrect lane number - 0 is the most inner, 1 is outer.");
        }
        return (2 * Math.PI * (this.islandRadius() + laneNumber * this.laneWidth()));
    }
}

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

var roundaboutThreeLanes = new RoundaboutSpecification(
    4.5,
    3,
    56/2,
    {
        ingoingLanes: 2,
        outgoingLanes: 2,
        lanesWidth: 3.5
    }
);

export {roundaboutBukowe, roundaboutThreeLanes};
