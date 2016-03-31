import Direction from './Specification/Direction.js';
import RandomNumberGenerator from './RandomNumberGenerator.js';
import Path from './Path.js';
import {CurrentRules} from './EntranceRules.js';

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
            new CurrentRules(roundaboutLanesCount),
            new ExitRule1(roundaboutLanesCount)
        );
    }
}

export {DrivingRules, ExitRule1};
