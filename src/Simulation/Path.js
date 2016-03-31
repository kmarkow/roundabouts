class Path {
    constructor(entranceRoad, entranceLaneId, roundaboutLaneId, destinationExit, destinationExitLaneId) {
        this._entranceRoad = entranceRoad;
        this._entranceLaneId = entranceLaneId;
        this._roundaboutLaneId = roundaboutLaneId;
        this._destinationExit = destinationExit
        this._destinationExitLaneId = destinationExitLaneId;
    }

    entranceRoadId() {
        return this._entranceRoad.id();
    }

    entranceLaneId() {
        return this._entranceLaneId;
    }

    roundaboutLaneId() {
        return this._roundaboutLaneId;
    }

    destinationExit() {
        return this._destinationExit.id();
    }

    destinationExitLaneId() {
        return this._destinationExitLaneId;
    }
}

export default Path;