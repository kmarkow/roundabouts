import Direction from './Specification/Direction.js';
import RandomNumberGenerator from './RandomNumberGenerator.js';
import Path from './Path.js';

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

class DrivingRules {
    constructor(roundaboutLanesCount, adherentRoadLanesCount, entranceRules, exitRules) {
        this.roundaboutLanesCount = roundaboutLanesCount;
        this._entrancesExitsLanesCount = adherentRoadLanesCount/2;
        this.entranceRules = entranceRules;
        this.exitRules = exitRules;
    }

    randomPath() {
        var allDirections = Direction.allDirections();
        var entranceRoad = allDirections[Math.floor(Math.random()*allDirections.length)];
        var exitRoad = allDirections[Math.floor(Math.random()*allDirections.length)];

        var randomNumberGenerator = new RandomNumberGenerator();
        var entranceLaneId = randomNumberGenerator.intFromTo(0, this._entrancesExitsLanesCount - 1);
        var roundaboutLaneId = randomNumberGenerator.intFromTo(0, this.roundaboutLanesCount - 1);
        var destinationExitLaneId = randomNumberGenerator.intFromTo(0, this._entrancesExitsLanesCount - 1);

        return new Path(
            entranceRoad,
            entranceLaneId,
            roundaboutLaneId,
            exitRoad,
            destinationExitLaneId
        );
    }

    static newRules1(roundaboutLanesCount, adherentRoadLanesCount) {
        return new DrivingRules(
            roundaboutLanesCount,
            adherentRoadLanesCount,
            new EntranceRule1(roundaboutLanesCount),
            new ExitRule1(roundaboutLanesCount)
        );
    }
}


export {DrivingRules, ExitRule1, EntranceRule1};