import {range} from '../../JsWhyYouNoImplement.js';
import Lane from './Lane.js';

class AdherentRoad {

    constructor(direction, length, entrancesLanes, exitLanes) {
        this._length = length;
        this._direction = direction;
        this._entrancesLanes = entrancesLanes;
        this._exitsLanes = exitLanes;
    }

    id() {
        return this._direction.id();
    }

    length() {
        return this._length;
    }

    allLanes() {
        return this._exitsLanes; //this._entrancesLanes.concat(this._exitsLanes); //TODO: Przywrócić jak dodane będzie rysowanie wjazdów
    }

    static newRoad(direction, length, laneWidth, entrancesLanesCount, exitLanesCount) {
        var entranceLanes = Array.from(range(0, entrancesLanesCount), entranceNumber => {
            return new Lane(`${direction.id()}_ENTRANCE_${entranceNumber}`, length, laneWidth, false)
        });
        var exitLanes = Array.from(range(0, exitLanesCount), exitNumber => {
            return new Lane(`${direction.id()}_EXIT_${exitNumber}`, length, laneWidth, false)
        });

        return new AdherentRoad(direction, length, entranceLanes, exitLanes);
    }
}

export default AdherentRoad;
