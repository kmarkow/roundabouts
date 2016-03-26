import Cell from './Cell.js';
import CellsLane from './CellsLane.js';
import Vehicle from './Vehicle.js';
import Observable from './Observable.js';

class ExitRoadEnd extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = 'ExitRoadEnd';
    }
}

class CellsMap extends Observable {

    constructor(roundaboutSpecification, unitConverter) {
        super();
        this._roundaboutSpecification = roundaboutSpecification;
        this._unitConverter = unitConverter;
        this._lanes = new Map();
        this._divideLanesToCells();
    }

    _divideLanesToCells() {
        this._roundaboutSpecification.allLanes().forEach(lane => {
            this._lanes.set(
                lane.id(),
                CellsLane.newLane(lane.id(), this._unitConverter.metersAsCells(lane.length()), lane.isRounded())
            );
        });
    }

    _innerRoadLanes() {
        return Array.from(this._lanes.values(), lane => {
            if (lane.isRoundaboutLane()) {
                return lane;
            }
        }).filter(element => {return element !== undefined;});
    }

    cellsOnLane(laneNumber) {
        return this._lanes.get(laneNumber).allCells();
    }

    cellsCountsOnInnerRoadLanes() {
        return Array.from(this._innerRoadLanes(), lane => {
            return lane.allCells().length;
        });
    }

    moveVehicleBy(vehicle, cellsToMove) {
        if (cellsToMove == 0) {
            return;
        }
        var nextCells = vehicle.frontCell().parentLane().cellsNextTo(vehicle.frontCell(), cellsToMove);
        if (nextCells.length < cellsToMove && vehicle.frontCell().parentLane().isExitLane()) {
            throw new ExitRoadEnd("End of exit road");
        }
        var newVehicleFrontCell = nextCells.slice(-1)[0];
        var newVehicleCells = newVehicleFrontCell.parentLane().cellsPreviousToInclusive(newVehicleFrontCell, vehicle.lengthCells());
        var oldVehicleCells = vehicle.currentCells();
        if (newVehicleCells.length != oldVehicleCells.length) {
            //TODO: Hardcoded 2 for truck
            newVehicleCells = newVehicleCells.concat(oldVehicleCells.slice(2, 2 + oldVehicleCells.length - newVehicleCells.length));
        }
        vehicle.moveToCells(newVehicleCells);
    }

    addVehicle(vehicle, lane=0, cell=0) {
        var firstCell = this.cellsOnLane(lane)[cell];
        var vehicleCells = [firstCell];
        vehicleCells = vehicleCells.concat(firstCell.parentLane().cellsPreviousTo(firstCell, vehicle.lengthCells()-1));
        vehicle.moveToCells(vehicleCells);
    }

    nothingInFrontOf(vehicle, numberOfCellsToCheck) {
        var nextCells = vehicle.frontCell().parentLane().cellsNextTo(vehicle.frontCell(), numberOfCellsToCheck);
        return nextCells.every(cell => {
            return cell.isEmpty()
        });
    }

    takeExit(vehicle) {
        var oldVehicleCells = vehicle.currentCells();
        var sliceFrom = Math.max(0, vehicle.currentSpeed() - vehicle.lengthCells());
        var sliceTo = vehicle.currentSpeed();
        var newVehicleCells = this._lanes.get(
            vehicle.destinationExit() + "_EXIT_" + vehicle.destinationExitLaneId().toString()
        ).allCells().slice(sliceFrom, sliceTo).reverse();
        var newVehicleCells = newVehicleCells.concat(oldVehicleCells.slice(0, oldVehicleCells.length - newVehicleCells.length));
        vehicle.moveToCells(newVehicleCells);
    }
}

export { CellsMap, ExitRoadEnd };
