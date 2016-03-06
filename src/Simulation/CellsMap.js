import {range} from '../JsWhyYouNoImplement.js';
import Cell from './Cell.js';
import CellsLane from './CellsLane.js';
import Vehicle from './Vehicle.js';
import Observable from './Observable.js';

class CellsMap extends Observable {

    constructor(roundaboutSpecification, unitConverter) {
        super();
        this._roundaboutSpecification = roundaboutSpecification;
        this._unitConverter = unitConverter;
        this._laneCells = {};
        this._cellsLane = {};
        this._vehiclesOnCells = {};
        this._divideLanesToCells();
    }

    _divideLanesToCells() {
        this._roundaboutSpecification.lanesNumbers().forEach(laneNumber => {
            this._laneCells[laneNumber] = [];
            var cellsCount = this._unitConverter.metersAsCells(
                this._roundaboutSpecification.lengthOfLane(laneNumber)
            );
            range(0, cellsCount).forEach(cellNumber => {
                this._laneCells[laneNumber].push(
                    new Cell(laneNumber, cellNumber)
                );
            });
            this._cellsLane[laneNumber] = new CellsLane(this._laneCells[laneNumber]);
        });
    }

    cellsOnLane(laneNumber) {
        return this._laneCells[laneNumber];
    }

    moveVehicleBy(vehicle, cellsToMove) {
        var oldVehicleCells = this._vehiclesOnCells[vehicle.id()];
        var oldVehicleFrontCell = oldVehicleCells[0];
        if (!oldVehicleFrontCell) {
            throw Error("Vehicle not added");
        }
        var newVehicleFrontCell = this._cellsLane[oldVehicleFrontCell.parentLane()].cellsNextTo(oldVehicleFrontCell, cellsToMove).slice(-1)[0];
        console.log("dupka", oldVehicleFrontCell, newVehicleFrontCell, cellsToMove);
        var newVehicleCells = this._cellsLane[newVehicleFrontCell.parentLane()].cellsPreviousTo(newVehicleFrontCell, vehicle.lengthCells());
        oldVehicleCells.forEach(cell => {
            cell.setTaken(false);
        })
        newVehicleCells.forEach(cell => {
            cell.setTaken(true);
        });

        this._vehiclesOnCells[vehicle.id()] = newVehicleCells;
    }

    addVehicle(vehicle, lane=0, cell=0) {
        var firstCell = this.cellsOnLane(lane)[cell];
        var vehicleCells = [firstCell];
        vehicleCells = vehicleCells.concat(this._cellsLane[lane].cellsPreviousTo(firstCell, vehicle.lengthCells()-1));
        this._vehiclesOnCells[vehicle.id()] = vehicleCells;
        vehicleCells.forEach(cell => {
            cell.setTaken(true);
        });
    }

    nothingInFrontOf(vehicle, numberOfCellsToCheck) {
        var vehiclesFirstCell = this._vehiclesOnCells[vehicle.id()][0];
        var nextCells = this._cellsLane[vehiclesFirstCell.parentLane()].cellsNextTo(vehiclesFirstCell, numberOfCellsToCheck);
        return nextCells.every(cell => {
            return cell.isEmpty()
        });
    }
}

export { CellsMap };
