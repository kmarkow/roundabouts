import Direction from './Specification/Direction.js';
import RandomNumberGenerator from './RandomNumberGenerator.js';
import Path from './Path.js';
import {CurrentRules as CurrentEntranceRules} from './EntranceRules.js';
import {CurrentRules as CurrentExitRules} from './ExitRules.js';

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
            new CurrentEntranceRules(roundaboutLanesCount),
            new CurrentExitRules(roundaboutLanesCount)
        );
    }
}

export {DrivingRules};
