import Cell from './Cell.js';
import Direction from './Specification/Direction.js';
import { range } from '../JsWhyYouNoImplement.js';

class CellsNeighbours  {

    constructor(laneCellsCount) {
        var roadEvery = Math.floor(laneCellsCount / 4);
        var firstRoadAt = roadEvery - 3;
        if (!laneCellsCount) {
            throw new Error("Unknown cells number");
        }
        this._exits = {
            'N': [firstRoadAt + roadEvery * 0, firstRoadAt + 1 + roadEvery * 0],
            'W': [firstRoadAt + roadEvery * 1, firstRoadAt + 1 + roadEvery * 1],
            'S': [firstRoadAt + roadEvery * 2, firstRoadAt + 1 + roadEvery * 2],
            'E': [firstRoadAt + roadEvery * 3, firstRoadAt + 1 + roadEvery * 3]
        };
    }

    isApproachingExit(vehicle) {
        //TODO: Base on rules check if can leave roundabout from the lane number
        var closestDestinationExitOn = this._exits[vehicle.destinationExit()][vehicle.destinationExitLaneId()];
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

    canTakeExit(vehicle) {
        var destinationExitCell = new Cell(this._exits[vehicle.destinationExit()][vehicle.destinationExitLaneId()]);
        destinationExitCell.assignToLane(vehicle.frontCell().parentLane());
        return vehicle.currentCells().some(cell => {
           return cell.equals(destinationExitCell);
        });
    }
}

export default CellsNeighbours;
