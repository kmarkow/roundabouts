class ExitRule1 {
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
}

class CurrentRules extends ExitRule1 {

}

class SuggestedRules extends ExitRule1 {

}

export {CurrentRules, SuggestedRules};