class EntranceRule {

    constructor(numberOfRoundaboutLanes) {
        this._numberOfRoundaboutLanes = numberOfRoundaboutLanes;
    }

    shouldYieldTo(vehicle, another_vehicle) {
        if (this._isTakingExitRightBeforeEntrance(vehicle, another_vehicle)) {
            return false;
        }
        if (vehicle.isEnteringRoundabout() && another_vehicle.isOnRoundabout()) {
            return this._isCrossingRoundaboutLaneOf(vehicle, another_vehicle);
        }
        if (this._bothAreEntering(vehicle, another_vehicle)) {
            return this._isOnTheLeftOf(vehicle, another_vehicle) &&
                vehicle.roundaboutLaneId() >= another_vehicle.roundaboutLaneId();
        }
        throw new Error("Entrance Rule 1 unknown situation");
    }

    _isTakingExitRightBeforeEntrance(vehicle, another_vehicle) {
        return vehicle.entranceRoadId() == another_vehicle.destinationExit();
    }

    _bothAreEntering(vehicle, another_vehicle) {
        return vehicle.isEnteringRoundabout() &&
            another_vehicle.isEnteringRoundabout();
    }

    _isCrossingRoundaboutLaneOf(vehicle, another_vehicle) {
        return vehicle.roundaboutLaneId() <= another_vehicle.roundaboutLaneId();
    }

    _isOnTheLeftOf(vehicle, another_vehicle) {
        return vehicle.entranceLaneId() > another_vehicle.entranceLaneId();
    }
}


class CurrentRules extends EntranceRule {

}

class SuggestedRules extends EntranceRule {

}

export {CurrentRules, SuggestedRules};