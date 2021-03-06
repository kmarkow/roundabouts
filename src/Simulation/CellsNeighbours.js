import Cell from './Cell.js';
import Direction from './Specification/Direction.js';
import { range } from '../JsWhyYouNoImplement.js';

class CellsNeighbours  {

    constructor(roundaboutLaneCellsCount, entranceLanesCount, entranceLaneCellsCount) {
        this._maxCellIdOnEntrance = entranceLaneCellsCount - 1;
        this._exits = Array.from(roundaboutLaneCellsCount, laneCellsCount => {
            var roadEvery = laneCellsCount / 4;
            var firstRoadAt = roadEvery;
            var exits = new Map();
            exits.set('N', [Math.round(firstRoadAt + roadEvery * 0) - 3, Math.round(firstRoadAt + roadEvery * 0) - 2]);
            exits.set('W', [Math.round(firstRoadAt + roadEvery * 1) - 3, Math.round(firstRoadAt + roadEvery * 1) - 2]);
            exits.set('S', [Math.round(firstRoadAt + roadEvery * 2) - 3, Math.round(firstRoadAt + roadEvery * 2) - 2]);
            exits.set('E', [Math.round(firstRoadAt + roadEvery * 3) - 3, Math.round(firstRoadAt + roadEvery * 3) - 2]);
            return exits;
        });
        this._entrances = new Map();
        ["N", "W", "S", "E"].forEach((direction, multiplier) => {
            roundaboutLaneCellsCount.forEach((laneCellsCount, roundaboutLaneId) => {
                var roadEvery = laneCellsCount / 4;
                range(0, entranceLanesCount).forEach(entranceLaneId => {
                    var value = Math.round(roadEvery * (multiplier + 1) + 2 - entranceLaneId);
                    if (value >= laneCellsCount) {
                        value = value - laneCellsCount;
                    }
                    this._entrances.set(
                        `${direction} ${entranceLaneId} ${roundaboutLaneId}`,
                        value
                    );
                });
            });
        });
    }

    isApproachingDestinationExit(vehicle) {
        var closestDestinationExitOn = this._destinationExitCellIdFor(vehicle);
        if (closestDestinationExitOn == null) {
            return false;
        }
        return this._isApproachingExit(closestDestinationExitOn, vehicle);
    }

    isApproachingAnyExit(vehicle) {
        var approaches = Array.from(this._exits[vehicle.currentLaneId()].values(), exitsCells => {
            var exitApproaches = Array.from(exitsCells, exitCell => {
                return this._isApproachingExit(exitCell, vehicle);
            });
            return exitApproaches.some(approach=> {return approach});
        });
        return approaches.some(approach => {return approach});
    }
    
    closestExitId(vehicle) {
        var exits = Array.from(this._exits[vehicle.currentLaneId()].entries(), exit => {
            var exitCellId = exit[1][0];
            var exitName = exit[0];
            var distanceFromExit = exitCellId - vehicle.frontCell().number();
            return [exitName, distanceFromExit];
        });
        exits = exits.filter(element => {
           return element[1] >= 0;
        });
        exits.sort((a, b) => {
            if (a[1] > b[1]) {
                return 1;
            } else {
                return -1;
            }
        });
        if (exits.length == 0) {
            return Direction.newNorth().id();
        }
        return exits[0][0];
    }

    isApproachingRoundabout(vehicle) {
        var distanceFromEntrance = this._maxCellIdOnEntrance - vehicle.frontCell().number();
        return this._isApproaching(distanceFromEntrance, vehicle);
    }

    approachedDestinationExit(vehicle) {
        var destinationExitCellId = this._destinationExitCellIdFor(vehicle);
        if (destinationExitCellId == null) {
            return false;
        }
        var destinationExitCell = new Cell(destinationExitCellId);
        destinationExitCell.assignToLane(vehicle.frontCell().parentLane());
        return vehicle.currentCells().some(cell => {
           return cell.equals(destinationExitCell);
        });
    }

    approachedAnyExit(vehicle) {
        var approaches = Array.from(this._exits[vehicle.currentLaneId()].values(), exitsCells => {
            var exitApproaches = Array.from(exitsCells, exitCell => {
                if (Math.abs(exitCell - vehicle.frontCell().number()) <= 1) {
                    return true;
                }
                return false;
            });
            return exitApproaches.some(approach=> {return approach});
        });
        return approaches.some(approach => {return approach});
    }

    approachedEntrance(vehicle) {
        return vehicle.frontCell().parentLane().isEntranceLane() &&
            vehicle.frontCell().number() == this._maxCellIdOnEntrance;
    }

    firstCellNumberOnEntrance(entranceRoadId, entranceLaneId, roundaboutLaneId) {
        return this._entrances.get(`${entranceRoadId} ${entranceLaneId} ${roundaboutLaneId}`);
    }

    _destinationExitCellIdFor(vehicle) {
        var destinationExits = this._exits[vehicle.currentLaneId()];
        if (!destinationExits) {
            return null;
        }
        var destinationExit = destinationExits.get(vehicle.destinationExit());
        return destinationExit[vehicle.destinationExitLaneId()];
    }

    _isApproachingExit(exitCell, vehicle) {
        var distanceFromExit = exitCell - vehicle.frontCell().number();
        return this._isApproaching(distanceFromExit, vehicle);
    }

    _isApproaching(distanceFrom, vehicle) {
        var distanceTravelledIfStartsSlowingDown = range(
            vehicle.maxSpeedWhenTurning(), Math.max(0, vehicle.currentSpeed()-1)
        ).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, 0);
        if (distanceTravelledIfStartsSlowingDown >= distanceFrom && distanceFrom > 0) {
            return true;
        }
        return false;
    }
}

export default CellsNeighbours;
