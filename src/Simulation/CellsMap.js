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
        var newVehicleCells = nextCells.reverse();
        var oldVehicleCells = vehicle.currentCells();
        newVehicleCells = newVehicleCells.concat(oldVehicleCells);
        vehicle.moveToCells(newVehicleCells.slice(0, vehicle.lengthCells()));
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

    nothingOnRoundaboutFrom(roundaboutLaneId, cellNumber, numberOfCellsToCheck) {
        var roundaboutLane = this._lanes.get(roundaboutLaneId);
        var nextCells = roundaboutLane.cellsNextToNumber(cellNumber, numberOfCellsToCheck);
        return nextCells.every(cell => {
            return cell.isEmpty()
        });
    }

    exitLaneEmpty(vehicle, numberOfCellsToCheck) {
        var exitLaneId = vehicle.destinationExit() + "_EXIT_" + vehicle.destinationExitLaneId().toString();
        var exitLane = this._lanes.get(exitLaneId);
        var exitLaneFirstCells = exitLane.firstCells(numberOfCellsToCheck);
        return exitLaneFirstCells.every(cell => {
            return cell.isEmpty() || cell.vehicle() == vehicle
        });
    }

    vehicleOnTheRight(vehicle) {
        var laneIdOnTheRight = null;
        var cellsDiff = 0;
        if (vehicle.frontCell().parentLane().isRoundaboutLane()) {
            laneIdOnTheRight = this._roundaboutSpecification.laneIdToTheRightOf(vehicle.currentLaneId());
            cellsDiff = 3;
        } else if (vehicle.frontCell().parentLane().isEntranceLane()) {
            laneIdOnTheRight = this._roundaboutSpecification.entranceLaneIdToTheRightOf(vehicle.currentLaneId());
        }
        if (laneIdOnTheRight == null) {
            return null;
        }
        var laneOnTheRight = this._lanes.get(laneIdOnTheRight);
        var cellOnTheRightId = vehicle.frontCell().number() + cellsDiff;
        var cellOnTheRight = laneOnTheRight.allCells()[cellOnTheRightId];
        var cellsOnTheRight = laneOnTheRight.cellsPreviousToInclusive(cellOnTheRight, 4);
        var cellWithAVehicle = cellsOnTheRight.find(cell => {
            if (cell.vehicle()) {
                return true;
            }
            return false;
        });
        if (cellWithAVehicle) {
            return cellWithAVehicle.vehicle();
        }

        return null;
    }

    vehiclesOnTheLeft(vehicle, cellsNeighbours) {
        var roundaboutLanes = this._roundaboutSpecification.lanesNumbers(); // [0,1]
        var vehiclesOnTheLeft = new Map();
        roundaboutLanes.forEach(laneId => {
            var lane = this._lanes.get(laneId); // CellsLane
            var cellAheadId = cellsNeighbours.firstCellNumberOnEntrance(
                vehicle.entranceRoadId(),
                vehicle.entranceLaneId(),
                laneId
            );
            var cellsOnTheLeft = lane.cellsPreviousToNumber(cellAheadId, 5);
            var cellWithAVehicle = cellsOnTheLeft.find(cell => {
                if (cell.vehicle()) {
                    return true;
                }
                return false;
            });
            if(cellWithAVehicle) {
                vehiclesOnTheLeft.set(laneId , cellWithAVehicle.vehicle());
            }
        });
        return vehiclesOnTheLeft;
    }

    takeExit(vehicle) {
        var oldVehicleCells = vehicle.currentCells();
        var sliceFrom = Math.max(0, vehicle.currentSpeed() - vehicle.lengthCells());
        var sliceTo = vehicle.currentSpeed();
        var newVehicleCells = this._lanes.get(
            vehicle.destinationExit() + "_EXIT_" + vehicle.destinationExitLaneId().toString()
        ).allCells().slice(sliceFrom, sliceTo).reverse();
        var newVehicleCells = newVehicleCells.concat(oldVehicleCells.slice(0, Math.max(0, oldVehicleCells.length - newVehicleCells.length)));
        vehicle.moveToCells(newVehicleCells);
    }

    takeEntrance(vehicle, cellsNeighbours) {
        var roundaboutLaneId = vehicle.roundaboutLaneId();
        var firstCellOnRoundaboutNumber = cellsNeighbours.firstCellNumberOnEntrance(
          vehicle.entranceRoadId(),
          vehicle.entranceLaneId(),
          roundaboutLaneId
        );
        var roundaboutLane = this._lanes.get(roundaboutLaneId);
        var sliceFrom = Math.max(0, vehicle.currentSpeed() - vehicle.lengthCells());
        var sliceTo = vehicle.currentSpeed();
        var newVehicleCells = roundaboutLane.cellsNextToNumber(firstCellOnRoundaboutNumber, vehicle.currentSpeed());
        newVehicleCells = newVehicleCells.slice(sliceFrom, sliceTo).reverse();
        var oldVehicleCells = vehicle.currentCells();
        newVehicleCells = newVehicleCells.concat(oldVehicleCells.slice(0, oldVehicleCells.length - newVehicleCells.length));
        vehicle.moveToCells(newVehicleCells);
    }
}

export { CellsMap, ExitRoadEnd };
