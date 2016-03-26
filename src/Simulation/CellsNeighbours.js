import Cell from './Cell.js';
import Direction from './Specification/Direction.js';
import { range } from '../JsWhyYouNoImplement.js';

class CellsNeighbours  {

    constructor(laneCellsCounts) {
        this._exits = Array.from(laneCellsCounts, laneCellsCount => {
            var roadEvery = Math.floor(laneCellsCount / 4);
            var firstRoadAt = roadEvery - 3;
            var exits = new Map();
            exits.set('N', [firstRoadAt + roadEvery * 0, firstRoadAt + 1 + roadEvery * 0]);
            exits.set('W', [firstRoadAt + roadEvery * 1, firstRoadAt + 1 + roadEvery * 1]);
            exits.set('S', [firstRoadAt + roadEvery * 2, firstRoadAt + 1 + roadEvery * 2]);
            exits.set('E', [firstRoadAt + roadEvery * 3, firstRoadAt + 1 + roadEvery * 3]);
            return exits;
        });
    }

    isApproachingExit(vehicle) {
        var closestDestinationExitOn = this._destinationExitCellIdFor(vehicle);
        if (closestDestinationExitOn == null) {
            return false;
        }
        var distanceFromExit = closestDestinationExitOn - vehicle.frontCell().number();
        var distanceTravelledIfStartsSlowingDown = range(
            vehicle.maxSpeedWhenTurning(), Math.max(0, vehicle.currentSpeed()-1)
        ).reduce((previousValue, currentValue) => {
            return previousValue + currentValue;
        }, 0);
        if (distanceTravelledIfStartsSlowingDown >= distanceFromExit && distanceFromExit > 0) {
            return true;
        }
        return false;
    }

    approachedExit(vehicle) {
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

    _destinationExitCellIdFor(vehicle) {
        var destinationExits = this._exits[vehicle.currentLaneId()];
        if (!destinationExits) {
            return null;
        }
        var destinationExit = destinationExits.get(vehicle.destinationExit());
        return destinationExit[vehicle.destinationExitLaneId()];
    }
}

export default CellsNeighbours;
