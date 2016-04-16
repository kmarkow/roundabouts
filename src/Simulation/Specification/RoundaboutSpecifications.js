import {range} from '../../JsWhyYouNoImplement.js';
import Lane from './Lane.js';
import Direction from './Direction.js';
import AdherentRoad from './AdherentRoad.js';
import InnerRoad from './InnerRoad.js';

class RoundaboutSpecification {

    constructor(laneWidth, lanesCount, islandRadius, adherentRoadSpecification) {
        this._laneWidth = laneWidth;
        this._lanesCount = lanesCount;
        this._islandRadius = islandRadius;
        this._adherentRoadSpecification = adherentRoadSpecification;
        this._adherentRoads = Array.from(Direction.allDirections(), direction => {
            return AdherentRoad.newRoad(
                direction,
                this.adherentRoadLength(),
                laneWidth,
                adherentRoadSpecification.ingoingLanes,
                adherentRoadSpecification.outgoingLanes
            );
        });
        this._innerRoad = new InnerRoad(
            Array.from(range(0, lanesCount), laneNumber => {
                return new Lane(laneNumber, this.lengthOfLane(laneNumber), laneWidth, true)
            })
        );
    }

    roundaboutDiameter() {
        let islandDiameter = 2 * this._islandRadius;
        return islandDiameter + this.lanesWidth() * 2;
    }

    roundaboutRadius() {
        return this.roundaboutDiameter() / 2;
    }

    lanesCount() {
        return this._lanesCount;
    }

    adherentRoadLength()
    {
        return 35; // 35 meters
    }

    lanesWidth() {
        return this._innerRoad.lanesCount() * this.laneWidth();
    }

    lanesNumbers() {
        return range(0, this._innerRoad.lanesCount());
    }

    laneWidth() {
        return this._laneWidth;
    }

    islandRadius() {
        return this._islandRadius;
    }

    adherentRoadWidth() {
        return (
            this._adherentRoadSpecification.ingoingLanes * this._adherentRoadSpecification.lanesWidth +
            this._adherentRoadSpecification.outgoingLanes * this._adherentRoadSpecification.lanesWidth
        );
    }

    adherentLanesCount() {
        return this._adherentRoadSpecification.ingoingLanes + this._adherentRoadSpecification.outgoingLanes;
    }

    lengthOfLane(laneNumber) {
        if (laneNumber >= this.lanesCount()) {
            throw new Error("Incorrect lane number - 0 is the most inner, 1 is outer.");
        }
        return (2 * Math.PI * (this.islandRadius() + laneNumber * this.laneWidth()));
    }

    /**
     * Radius is counted to center of the lane
     */
    laneRadius(laneNumber) {
        if (laneNumber >= this._innerRoad.lanesCount()) {
            throw new Error("Incorrect lane number - 0 is the most inner, 1 is outer.");
        }

        return this.islandRadius() + this.laneWidth()*laneNumber + this.laneWidth()/2;
    }

    allLanes() {
        var allLanes = []
        this._adherentRoads.forEach(adherentRoad => {
            adherentRoad.allLanes().forEach(lane => {
                allLanes.push(lane);
            });
        });
        this._innerRoad.allLanes().forEach(lane => {
            allLanes.push(lane)
        });
        return allLanes;
    }

    innerRoadLanes() {
        return this._innerRoad.allLanes();
    }

    adherentRoads() {
        return this._adherentRoads;
    }

    laneIdToTheRightOf(laneId) {
        if (this.lanesCount() == 2 && laneId == 0) {
            return 1;
        }
        if (this.lanesCount() == 3 && laneId == 0) {
            return 1;
        }
        if (this.lanesCount() == 3 && laneId == 1) {
            return 2;
        }
        return null;
    }

    laneIdToTheLeftOf(laneId) {
        if (this.lanesCount() == 2 && laneId == 1) {
            return 0;
        }
        if (this.lanesCount() == 3 && laneId == 2) {
            return 1;
        }
        if (this.lanesCount() == 3 && laneId == 1) {
            return 0;
        }
        return null;
    }

    entranceLaneIdToTheRightOf(laneId) {
        if (laneId.includes("_ENTRANCE_1")) {
            return laneId.replace("_ENTRANCE_1", "_ENTRANCE_0");
        }
        return null;
    }
}


var roundaboutBukowe = new RoundaboutSpecification(
    4.5,
    2,
    56/2,
    {
        ingoingLanes: 2,
        outgoingLanes: 2,
        lanesWidth: 3.5
    }
);

var roundaboutThreeLanes = new RoundaboutSpecification(
    4.5,
    3,
    56/2,
    {
        ingoingLanes: 2,
        outgoingLanes: 2,
        lanesWidth: 3.5
    }
);

export {roundaboutBukowe, roundaboutThreeLanes, RoundaboutSpecification};
