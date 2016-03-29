import Direction from './Specification/Direction.js';

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


class EntranceRule1 {

    constructor(numberOfRoundaboutLanes) {
        this._numberOfRoundaboutLanes = numberOfRoundaboutLanes;
    }

    shouldYieldTo(vehicle, another_vehicle) {
        if (this._isEnteringRoundabout(vehicle) && this._isOnRoundabout(another_vehicle)) {
            return this._isCrossingRoundaboutLaneOf(vehicle, another_vehicle);
        }
        if (this._bothAreEntering(vehicle, another_vehicle)) {
            return this._isOnTheLeftOf(vehicle, another_vehicle) &&
                    vehicle.roundaboutLaneId() >= another_vehicle.roundaboutLaneId();
        }
        throw new Error("Entrance Rule 1 unknown situation");
    }

    _bothAreEntering(vehicle, another_vehicle) {
        return vehicle.frontCell().parentLane().isEntranceLane() &&
            another_vehicle.frontCell().parentLane().isEntranceLane();
    }

   _isOnRoundabout(vehicle) {
       return vehicle.frontCell().parentLane().isRoundaboutLane();
   }

    _isEnteringRoundabout(vehicle) {
        return vehicle.frontCell().parentLane().isEntranceLane();
    }

    _isCrossingRoundaboutLaneOf(vehicle, another_vehicle) {
        return vehicle.roundaboutLaneId() <= another_vehicle.roundaboutLaneId();
    }

    _isOnTheLeftOf(vehicle, another_vehicle) {
        return vehicle.entranceLaneId() > another_vehicle.entranceLaneId();
    }
}

class DrivingRules {
    constructor(entranceRules, exitRules) {
        this.entranceRules = entranceRules;
        this.exitRules = exitRules;
    }

    static newRules1(roundaboutLanesCount) {
        return new DrivingRules(
            new EntranceRule1(roundaboutLanesCount),
            new ExitRule1(roundaboutLanesCount)
        );
    }
}


export {DrivingRules, ExitRule1, EntranceRule1};