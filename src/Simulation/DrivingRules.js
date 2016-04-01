import Direction from './Specification/Direction.js';
import RandomNumberGenerator from './RandomNumberGenerator.js';
import Path from './Path.js';
import {CurrentRules as CurrentEntranceRules} from './EntranceRules.js';
import {SuggestedRules as SuggestedEntranceRules} from './EntranceRules.js';
import {CurrentRules as CurrentExitRules} from './ExitRules.js';
import {SuggestedRules as SuggestedExitRules} from './ExitRules.js';

class DrivingRules {
    constructor(adherentRoadLanesCount, entranceRules, exitRules) {
        this._entrancesExitsLanesCount = adherentRoadLanesCount/2;
        this.entranceRules = entranceRules;
        this.exitRules = exitRules;
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
            new CurrentExitRules(roundaboutLanesCount)
        );
    }

    static newRules2(roundaboutLanesCount, adherentRoadLanesCount) {
        return new DrivingRules(
            adherentRoadLanesCount,
            new SuggestedEntranceRules(roundaboutLanesCount),
            new CurrentExitRules(roundaboutLanesCount)
        );
    }

    static newRules3(roundaboutLanesCount, adherentRoadLanesCount) {
        return new DrivingRules(
            adherentRoadLanesCount,
            new CurrentEntranceRules(roundaboutLanesCount),
            new SuggestedExitRules(roundaboutLanesCount)
        );
    }

    static newRules4(roundaboutLanesCount, adherentRoadLanesCount) {
        return new DrivingRules(
            adherentRoadLanesCount,
            new SuggestedEntranceRules(roundaboutLanesCount),
            new SuggestedExitRules(roundaboutLanesCount)
        );
    }
}

export {DrivingRules};
