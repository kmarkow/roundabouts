class ExitRules {
    constructor(numberOfRoundaboutLanes) {
        this._numberOfRoundaboutLanes = numberOfRoundaboutLanes;
    }

    shouldYieldTo(vehicle, another_vehicle) {
        if(this._isOnOuterLane(vehicle)) {
            return false;
        }

        if(!this._vehiclesLeaveAtTheSameExit(vehicle, another_vehicle)) {
            return this._isOnMiddleLane(vehicle);
        }

        if(this._vehiclesLeaveAtTheSameExit(vehicle, another_vehicle)) {
            if (this._vehiclesTakeTheSameLane(vehicle, another_vehicle)){
                return !this._isOnOuterLane(vehicle);
            } else {
                return false;
            }
        }
    }

    _vehiclesLeaveAtTheSameExit(vehicle, another_vehicle) {
        return vehicle.destinationExit() == another_vehicle.destinationExit();
    }

    _vehiclesTakeTheSameLane(vehicle, another_vehicle) {
        return vehicle.destinationExitLaneId() == another_vehicle.destinationExitLaneId();
    }

    _isOnMiddleLane(vehicle) {
        return !this._isOnOuterLane(vehicle);
    }

    _isOnOuterLane(vehicle) {
        return vehicle.currentLaneId() + 1 == this._numberOfRoundaboutLanes;
    }

    _isOuterLane(laneId) {
        return this._numberOfRoundaboutLanes - 1 == laneId;
    }

    _isMiddleLane(laneId) {
        if (this._numberOfRoundaboutLanes == 2 && laneId == 0) {
            return true;
        }
        if (this._numberOfRoundaboutLanes == 3 && laneId == 1) {
            return true;
        }
        return false;
    }
}

class CurrentRules extends ExitRules {
    possibleExitLanesFrom(roundaboutLane) {
        if (this._isOuterLane(roundaboutLane)) {
            return [0, 1];
        }
        if (this._isMiddleLane(roundaboutLane)) {
            return [1];
        }
        return [];
    }
}

class SuggestedRules extends ExitRules {
    possibleExitLanesFrom(roundaboutLane) {
        if (this._isOuterLane(roundaboutLane)) {
            return [0];
        }
        if (this._isMiddleLane(roundaboutLane)) {
            return [1];
        }
        return [];
    }
}

export {CurrentRules, SuggestedRules};