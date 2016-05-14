import Direction from './Specification/Direction.js';
import RandomNumberGenerator from './RandomNumberGenerator.js';
import Path from './Path.js';
import {CurrentRules as CurrentEntranceRules} from './EntranceRules.js';
import {SuggestedRules as SuggestedEntranceRules} from './EntranceRules.js';
import {CurrentRules as CurrentExitRules} from './ExitRules.js';
import {SuggestedRules as SuggestedExitRules} from './ExitRules.js';
import {SuggestedRulesWithChangedRightOfWay as SuggestedExitRulesWithChangedRightOfWay} from './ExitRules.js';

class CurrentRoundaboutRules {
    isOnRightOfWay() {
        return true;
    }

    shouldYieldToVehicleOnTheLeft() {
        return false;
    }
}

class SuggestedRoundaboutRules {
    isOnRightOfWay(vehicle, cellsMap) {
        return false;
    }

    shouldYieldToVehicleOnTheLeft(cellsMap, cellsNeighbours, vehicle) {
        var vehicleOnTheLeft = cellsMap.vehicleOnTheLeftOnRoundabout(vehicle);
        if (!vehicleOnTheLeft) {
            return false;
        }
        if (
            vehicleOnTheLeft.destinationExit() == cellsNeighbours.closestExitId(vehicle) &&
            vehicle.destinationExit() != cellsNeighbours.closestExitId(vehicle)
        ) {
            return true;
        }
        return false;
    }
}


class DrivingRules {
    constructor(adherentRoadLanesCount, entranceRules, exitRules, roundaboutRules) {
        this._entrancesExitsLanesCount = adherentRoadLanesCount/2;
        this.entranceRules = entranceRules;
        this.exitRules = exitRules;
        this.roundaboutRules = roundaboutRules;
    }

    randomPath() {
        var randomNumberGenerator = new RandomNumberGenerator();
        var entranceRoad = this._randomElementFrom(Direction.allDirections());
        var exitRoad = this._randomElementFrom(Direction.allDirections());
        var entranceLaneId = randomNumberGenerator.intFromTo(0, this._entrancesExitsLanesCount - 1);
        var roundaboutLaneId = this._randomElementFrom(
            this.entranceRules.possibleRoundaboutLanesFrom(entranceLaneId)
        );
        var destinationExitLaneId = this._randomElementFrom(
            this.exitRules.possibleExitLanesFrom(roundaboutLaneId)
        );

        return new Path(
            entranceRoad,
            entranceLaneId,
            roundaboutLaneId,
            exitRoad,
            destinationExitLaneId
        );
    }

    _randomElementFrom(array) {
        return array[Math.floor(Math.random()*array.length)];
    }

    static newRules1(roundaboutLanesCount, adherentRoadLanesCount) {
        return new DrivingRules(
            adherentRoadLanesCount,
            new CurrentEntranceRules(roundaboutLanesCount),
            new CurrentExitRules(roundaboutLanesCount),
            new CurrentRoundaboutRules()
        );
    }

    static newRules2(roundaboutLanesCount, adherentRoadLanesCount) {
        return new DrivingRules(
            adherentRoadLanesCount,
            new SuggestedEntranceRules(roundaboutLanesCount),
            new CurrentExitRules(roundaboutLanesCount),
            new CurrentRoundaboutRules()
        );
    }

    static newRules3(roundaboutLanesCount, adherentRoadLanesCount) {
        return new DrivingRules(
            adherentRoadLanesCount,
            new CurrentEntranceRules(roundaboutLanesCount),
            new SuggestedExitRules(roundaboutLanesCount),
            new CurrentRoundaboutRules()
        );
    }

    static newRules4(roundaboutLanesCount, adherentRoadLanesCount) {
        return new DrivingRules(
            adherentRoadLanesCount,
            new SuggestedEntranceRules(roundaboutLanesCount),
            new SuggestedExitRules(roundaboutLanesCount),
            new CurrentRoundaboutRules()
        );
    }

    static newRules5(roundaboutLanesCount, adherentRoadLanesCount) {
        return new DrivingRules(
            adherentRoadLanesCount,
            new SuggestedEntranceRules(roundaboutLanesCount),
            new SuggestedExitRulesWithChangedRightOfWay(roundaboutLanesCount),
            new SuggestedRoundaboutRules()
        );
    }
}

export {DrivingRules};
